// Tests for the local legal configuration (config/legalConfig.mjs). Run with: npm run test:legal
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LEGAL_CONFIG, LEGAL_CONFIG_ENV, loadLegalConfig, validateLegalConfig } from '../config/legalConfig.mjs';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const tempDirs = [];
const makeRoot = () => {
  const dir = mkdtempSync(join(tmpdir(), 'rp-legal-'));
  tempDirs.push(dir);
  return dir;
};
after(() => tempDirs.forEach((d) => rmSync(d, { recursive: true, force: true })));

// Synthetic, obviously fake values. They are not anyone's real details.
const valid = {
  name: 'Test Person',
  addressLines: ['1 Test Street', '1000 AA Testville', 'Testland'],
  email: 'person@test-mail.org',
};

function projectWith(value, raw) {
  const root = makeRoot();
  mkdirSync(join(root, 'config'));
  if (value !== undefined || raw !== undefined) writeFileSync(join(root, DEFAULT_LEGAL_CONFIG), raw ?? JSON.stringify(value));
  return root;
}

describe('validateLegalConfig', () => {
  it('accepts complete details and trims them', () => {
    const r = validateLegalConfig({ name: '  Test Person ', addressLines: [' 1 Test Street', '1000 AA Testville ', 'Testland'], email: ' person@test-mail.org ' });
    assert.deepEqual(r.errors, []);
    assert.deepEqual(r.config, valid);
  });

  it('rejects a missing or non-object configuration', () => {
    for (const bad of [null, undefined, 'text', 42, [], true]) assert.ok(validateLegalConfig(bad).errors.length > 0);
  });

  it('rejects every missing required field', () => {
    for (const key of Object.keys(valid)) {
      const copy = { ...valid };
      delete copy[key];
      const r = validateLegalConfig(copy);
      assert.equal(r.config, null, `missing ${key}`);
      assert.ok(r.errors.some((e) => e.includes(`"${key}"`)), `error mentions ${key}`);
    }
  });

  it('rejects empty, short and non-string values', () => {
    assert.equal(validateLegalConfig({ ...valid, name: '' }).config, null);
    assert.equal(validateLegalConfig({ ...valid, name: 'X' }).config, null);
    assert.equal(validateLegalConfig({ ...valid, name: 5 }).config, null);
    assert.equal(validateLegalConfig({ ...valid, addressLines: ['only one line'] }).config, null);
    assert.equal(validateLegalConfig({ ...valid, addressLines: ['a', '', 'c'] }).config, null);
    assert.equal(validateLegalConfig({ ...valid, addressLines: 'street, city' }).config, null);
    assert.equal(validateLegalConfig({ ...valid, email: 'not-an-email' }).config, null);
  });

  it('rejects placeholders in every field, so the example file can never be published', () => {
    for (const bad of [
      { ...valid, name: '<Full name>' },
      { ...valid, name: '[[Name of the person responsible]]' },
      { ...valid, addressLines: ['1 Test Street', '<Postal code and city>', 'Testland'] },
      { ...valid, addressLines: ['[[Street]]', '1000 AA Testville', 'Testland'] },
      { ...valid, email: 'me@example.invalid' },
      { ...valid, email: 'me@example.com' },
      { ...valid, email: '[[Contact email address]]' },
    ]) {
      const r = validateLegalConfig(bad);
      assert.equal(r.config, null, JSON.stringify(bad));
      assert.ok(r.errors.length > 0);
    }
    const example = JSON.parse(readFileSync(join(projectRoot, 'config/legal.example.json'), 'utf8'));
    assert.equal(validateLegalConfig(example).config, null, 'the committed example is rejected');
  });

  it('rejects unknown settings (typos never fall back silently)', () => {
    const r = validateLegalConfig({ ...valid, emial: 'person@test-mail.org' });
    assert.equal(r.config, null);
    assert.ok(r.errors.some((e) => e.includes('"emial"')));
  });
});

describe('loadLegalConfig', () => {
  it('a production build fails clearly when the file is missing', () => {
    const root = projectWith();
    assert.throws(() => loadLegalConfig({ root, command: 'build', env: {} }), (e) => {
      assert.match(e.message, /Legal information is not configured/);
      assert.match(e.message, /does not exist/);
      assert.match(e.message, /legal\.example\.json/);
      assert.ok(e.message.includes(LEGAL_CONFIG_ENV));
      return true;
    });
  });

  it('a production build fails for invalid JSON, incomplete values and placeholders', () => {
    for (const [value, raw, pattern] of [
      [undefined, '{ not json', /not valid JSON/],
      [{ name: 'Test Person' }, undefined, /"addressLines"/],
      [{ ...valid, email: 'me@example.invalid' }, undefined, /"email" is still a placeholder/],
    ]) {
      const root = projectWith(value, raw);
      assert.throws(() => loadLegalConfig({ root, command: 'build', env: {} }), pattern);
    }
  });

  it('a production build uses valid details and never reports placeholders', () => {
    const root = projectWith(valid);
    const { config, source } = loadLegalConfig({ root, command: 'build', env: {} });
    assert.equal(config.isPlaceholder, false);
    assert.equal(config.name, valid.name);
    assert.deepEqual(config.addressLines, valid.addressLines);
    assert.equal(config.email, valid.email);
    assert.ok(source.endsWith('legal.local.json'));
  });

  it('the development server shows marked placeholders instead of failing', () => {
    const root = projectWith();
    const { config, source } = loadLegalConfig({ root, command: 'serve', env: {} });
    assert.equal(config.isPlaceholder, true);
    assert.equal(source, null);
    assert.ok([config.name, config.email, ...config.addressLines].every((v) => v.startsWith('[[')));
  });

  it('the environment variable selects another file', () => {
    const root = projectWith();
    const other = join(root, 'elsewhere.json');
    writeFileSync(other, JSON.stringify(valid));
    const { config } = loadLegalConfig({ root, command: 'build', env: { [LEGAL_CONFIG_ENV]: 'elsewhere.json' } });
    assert.equal(config.name, valid.name);
  });
});

describe('production build', () => {
  it('stops with a clear error when the legal details are missing, and produces no output', () => {
    const root = makeRoot();
    const out = join(root, 'out');
    const vite = join(projectRoot, 'node_modules/vite/bin/vite.js');
    const result = spawnSync(process.execPath, [vite, 'build', '--outDir', out, '--emptyOutDir'], {
      cwd: projectRoot,
      env: { ...process.env, [LEGAL_CONFIG_ENV]: join(root, 'missing.json') },
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0, 'build exit code');
    assert.match(`${result.stderr}${result.stdout}`, /Legal information is not configured/);
    assert.throws(() => readFileSync(join(out, 'index.html')), 'no index.html was written');
  });
});

describe('repository hygiene', () => {
  it('ignores the local legal configuration but tracks the example', () => {
    const ignore = readFileSync(join(projectRoot, '.gitignore'), 'utf8').split(/\r?\n/);
    assert.ok(ignore.includes('*.local.json'), '*.local.json is ignored');
    const check = spawnSync('git', ['check-ignore', '-q', DEFAULT_LEGAL_CONFIG], { cwd: projectRoot });
    assert.equal(check.status, 0, 'config/legal.local.json is ignored by Git');
    const example = spawnSync('git', ['check-ignore', '-q', 'config/legal.example.json'], { cwd: projectRoot });
    assert.equal(example.status, 1, 'config/legal.example.json is not ignored');
  });
});
