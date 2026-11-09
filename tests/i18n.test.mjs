// Tests for the multilingual site: message completeness, routes, SEO metadata and the built pages.
// Run with: npm run test:i18n
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { LEGAL_CONFIG_ENV } from '../config/legalConfig.mjs';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const tempDirs = [];
const makeTemp = () => {
  const dir = mkdtempSync(join(tmpdir(), 'rp-i18n-'));
  tempDirs.push(dir);
  return dir;
};
after(() => tempDirs.forEach((d) => rmSync(d, { recursive: true, force: true })));

// Synthetic legal details so the tests never depend on (or expose) the real local file.
const legal = {
  name: 'Test Person',
  addressLines: ['1 Test Street', '1000 AA Testville', 'Testland'],
  email: 'person@test-mail.org',
  isPlaceholder: false,
};

let mod;
before(async () => {
  const entry = `
    export { en } from './src/i18n/en.ts';
    export { de } from './src/i18n/de.ts';
    export { nl } from './src/i18n/nl.ts';
    export * from './src/i18n/languages.ts';
    export { pageMeta, noscriptText } from './src/i18n/meta.ts';
  `;
  const result = await build({
    stdin: { contents: entry, resolveDir: projectRoot, loader: 'ts' },
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    define: { __LEGAL__: JSON.stringify(legal) },
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  mod = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
});

/** All string leaves as { path: value }; arrays are indexed. */
function leaves(value, prefix = '', out = {}) {
  if (typeof value === 'string') out[prefix] = value;
  else if (Array.isArray(value)) value.forEach((v, i) => leaves(v, `${prefix}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) leaves(v, prefix ? `${prefix}.${k}` : k, out);
  else throw new Error(`Unexpected value at ${prefix}: ${typeof value}`);
  return out;
}

// Texts that are legitimately identical in every language: names, acronyms and the legal details.
const sameInAllLanguages = new Set([
  'GitHub',
  'Status', // same word in German and Dutch
  'Navigation', // same word in German
  'Hosting', // same word in German and Dutch
  'Demo', // same word in German and Dutch
  'Imperial', // same word in German
  'N', // neutral gear
  '—', // value shown when data is missing
  'km/h',
  'km',
  'm',
  'mph',
  'mi',
  'ft',
  'Platform', // same word in Dutch
  'Windows 10 / 11, 64-bit',
  'Is RoadPilot open source?', // same wording in Dutch
  'FAQ',
  'Roadmap',
  'Download',
  'Community',
  'GitHub Issues',
  'GitHub Discussions',
  'American Truck Simulator',
  'Euro Truck Simulator 2',
  'Project',
  'Contact',
  '© {year} RoadPilot',
  legal.name,
  ...legal.addressLines,
]);

describe('messages', () => {
  it('German and Dutch have exactly the structure of English', () => {
    const en = Object.keys(leaves(mod.en));
    for (const code of ['de', 'nl']) {
      const other = Object.keys(leaves(mod[code]));
      assert.deepEqual(other.filter((k) => !en.includes(k)), [], `${code}: keys that English does not have`);
      assert.deepEqual(en.filter((k) => !other.includes(k)), [], `${code}: keys missing compared with English`);
    }
  });

  it('has no empty texts and no stray placeholders', () => {
    for (const code of ['en', 'de', 'nl']) {
      for (const [path, text] of Object.entries(leaves(mod[code]))) {
        assert.ok(text.trim().length > 0, `${code} ${path} is empty`);
        if (!path.endsWith('contactMissing')) assert.ok(!text.includes('[['), `${code} ${path} still has a placeholder`);
        assert.ok(!/\bTODO\b|lorem ipsum/i.test(text), `${code} ${path} looks unfinished`);
      }
    }
  });

  it('keeps the format tokens of the English texts', () => {
    const tokens = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join(',');
    const en = leaves(mod.en);
    for (const code of ['de', 'nl']) {
      for (const [path, text] of Object.entries(leaves(mod[code]))) assert.equal(tokens(text), tokens(en[path]), `${code} ${path}`);
    }
  });

  it('translates every text: nothing is left in English except names and legal details', () => {
    const en = leaves(mod.en);
    for (const code of ['de', 'nl']) {
      const untranslated = Object.entries(leaves(mod[code])).filter(([path, text]) => text === en[path] && !sameInAllLanguages.has(text));
      assert.deepEqual(untranslated.map(([p]) => p), [], `${code}: texts identical to English`);
    }
  });

  it('contains no typical English words in the long German and Dutch texts', () => {
    const english = /\b(the|and|with|your|you|is not|are|this|that|will be|has not)\b/i;
    for (const code of ['de', 'nl']) {
      for (const [path, text] of Object.entries(leaves(mod[code]))) {
        if (text.length < 40) continue;
        assert.ok(!english.test(text), `${code} ${path} contains English words: ${text.slice(0, 80)}`);
      }
    }
  });

  it('uses the agreed terminology', () => {
    assert.equal(mod.de.features.items.laneKeeping.title, 'Spurhalteassistent');
    assert.equal(mod.nl.features.items.laneKeeping.title, 'Rijstrookassistent');
    assert.match(mod.de.hero.text, /Fahrassistenz/);
    assert.match(mod.nl.hero.text, /rijassistentie/);
    assert.match(mod.de.download.comingSoonText, /Release/);
    assert.match(mod.nl.download.comingSoonText, /release/);
    for (const code of ['en', 'de', 'nl']) {
      for (const name of ['RoadPilot']) assert.ok(JSON.stringify(mod[code]).includes(name));
      // Product names are never translated.
      assert.equal(mod[code].games.items.ats.name, 'American Truck Simulator');
      assert.equal(mod[code].games.items.ets2.name, 'Euro Truck Simulator 2');
    }
  });

  it('the legal pages use the configured details in every language', () => {
    for (const code of ['en', 'de', 'nl']) {
      const text = JSON.stringify(mod[code].legal);
      assert.ok(text.includes(legal.name) && text.includes(legal.email) && text.includes(legal.addressLines[1]), code);
    }
  });
});

describe('routes and metadata', () => {
  it('English is the default and lives at the root, German at /de/, Dutch at /nl/', () => {
    assert.equal(mod.defaultLanguage, 'en');
    assert.deepEqual([...mod.languages], ['en', 'de', 'nl']);
    assert.equal(mod.pagePath('en', 'home'), '/');
    assert.equal(mod.pagePath('de', 'home'), '/de/');
    assert.equal(mod.pagePath('nl', 'home'), '/nl/');
    assert.equal(mod.pagePath('en', 'imprint'), '/imprint/');
    assert.equal(mod.pagePath('de', 'imprint'), '/de/imprint/');
    assert.equal(mod.pagePath('nl', 'privacy'), '/nl/privacy/');
  });

  it('every page of every language has an HTML file with the right lang attribute and a distinct path', () => {
    const seen = new Set();
    for (const lang of mod.languages) {
      for (const page of mod.pages) {
        const file = join(projectRoot, mod.pageFile(lang, page));
        assert.ok(existsSync(file), `${mod.pageFile(lang, page)} exists`);
        assert.match(readFileSync(file, 'utf8'), new RegExp(`<html lang="${lang}">`), `${file} lang`);
        assert.ok(!seen.has(mod.pagePath(lang, page)), 'unique path');
        seen.add(mod.pagePath(lang, page));
        assert.deepEqual(mod.parsePagePath(mod.pagePath(lang, page)), { lang, page });
        assert.deepEqual(mod.parsePagePath(`/${mod.pageFile(lang, page)}`), { lang, page });
      }
    }
    assert.equal(seen.size, 9);
  });

  it('has language-specific, distinct and reasonably sized titles and descriptions', () => {
    for (const page of mod.pages) {
      const titles = new Set();
      for (const lang of mod.languages) {
        const m = mod.pageMeta[lang][page];
        assert.ok(m.title.length > 5 && m.title.length <= 70, `${lang} ${page} title length`);
        assert.ok(m.description.length > 20 && m.description.length <= 200, `${lang} ${page} description length`);
        titles.add(m.title);
      }
      assert.equal(titles.size, 3, `${page}: titles differ between languages`);
    }
  });

  it('no component hard-codes a page path: links go through pagePath', () => {
    const files = [];
    const walk = (dir) =>
      readdirSync(dir).forEach((n) => {
        const p = join(dir, n);
        statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(n) && files.push(p);
      });
    walk(join(projectRoot, 'src'));
    for (const f of files) {
      const text = readFileSync(f, 'utf8');
      assert.ok(!/href=["'](\/(de|nl)?\/?|\/(imprint|privacy)\/?)["']/.test(text), `${f} has a hard-coded page link`);
    }
  });
});

describe('built pages', () => {
  let out;
  before(() => {
    const root = makeTemp();
    out = join(root, 'dist');
    const legalFile = join(root, 'legal.json');
    writeFileSync(legalFile, JSON.stringify({ name: legal.name, addressLines: legal.addressLines, email: legal.email }));
    const vite = join(projectRoot, 'node_modules/vite/bin/vite.js');
    const r = spawnSync(process.execPath, [vite, 'build', '--outDir', out, '--emptyOutDir'], {
      cwd: projectRoot,
      env: { ...process.env, [LEGAL_CONFIG_ENV]: legalFile },
      encoding: 'utf8',
    });
    assert.equal(r.status, 0, `build failed:\n${r.stdout}\n${r.stderr}`);
  });

  const read = (lang, page) => readFileSync(join(out, mod.pageFile(lang, page)), 'utf8');
  const count = (text, re) => (text.match(re) ?? []).length;

  it('writes all nine pages with lang, title, description and a single canonical URL of their own', () => {
    for (const lang of mod.languages) {
      for (const page of mod.pages) {
        const html = read(lang, page);
        const m = mod.pageMeta[lang][page];
        assert.match(html, new RegExp(`<html lang="${lang}">`));
        assert.ok(html.includes(`<title>${m.title.replace(/&/g, '&amp;')}</title>`), `${lang} ${page} title`);
        assert.ok(html.includes(`<meta name="description" content="${m.description}" />`), `${lang} ${page} description`);
        assert.equal(count(html, /rel="canonical"/g), 1, 'one canonical');
        assert.ok(html.includes(`<link rel="canonical" href="${mod.pageUrl(lang, page)}" />`), `${lang} ${page} canonical`);
        assert.ok(html.includes(`<meta property="og:url" content="${mod.pageUrl(lang, page)}" />`));
        assert.ok(html.includes(`<meta property="og:locale" content="${mod.ogLocales[lang]}" />`));
        assert.equal(count(html, /og:locale:alternate/g), 2);
        assert.ok(!html.includes('<!--seo-->') && !html.includes('<!--noscript-->'), 'no template marker left');
        assert.ok(!html.includes('og:image'), 'no outdated social image');
      }
    }
  });

  it('declares hreflang for en, de, nl and x-default (English) on every page', () => {
    for (const lang of mod.languages) {
      for (const page of mod.pages) {
        const html = read(lang, page);
        for (const code of mod.languages) {
          assert.ok(html.includes(`<link rel="alternate" hreflang="${code}" href="${mod.pageUrl(code, page)}" />`), `${lang} ${page} hreflang ${code}`);
        }
        assert.ok(html.includes(`<link rel="alternate" hreflang="x-default" href="${mod.pageUrl('en', page)}" />`));
        assert.equal(count(html, /hreflang=/g), 4);
      }
    }
  });

  it('the home pages carry language-specific structured data and noscript text', () => {
    for (const lang of mod.languages) {
      const html = read(lang, 'home');
      const ld = JSON.parse(/<script type="application\/ld\+json">(.*?)<\/script>/s.exec(html)[1]);
      assert.equal(ld.inLanguage, lang);
      assert.equal(ld.url, mod.pageUrl(lang, 'home'));
      assert.equal(ld.description, mod.pageMeta[lang].home.description);
      assert.ok(html.includes(mod.noscriptText[lang].home));
    }
  });

  it('the imprint noscript text is in the page language and contains the configured details', () => {
    for (const lang of mod.languages) {
      const html = read(lang, 'imprint');
      const who = [legal.name, ...legal.addressLines].join(', ');
      assert.ok(html.includes(mod.noscriptText[lang].imprint.replace('{who}', who)), lang);
    }
  });

  it('writes a sitemap with every page in every language and its alternates', () => {
    const xml = readFileSync(join(out, 'sitemap.xml'), 'utf8');
    assert.equal(count(xml, /<url>/g), 9);
    for (const lang of mod.languages) for (const page of mod.pages) assert.ok(xml.includes(`<loc>${mod.pageUrl(lang, page)}</loc>`));
    assert.equal(count(xml, /<xhtml:link /g), 9 * 4);
    assert.ok(xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'));
    assert.ok(!xml.includes('/demo/'), 'no demo page yet');
  });

  it('makes no request to an external API', () => {
    const files = [];
    const walk = (dir) =>
      readdirSync(dir).forEach((n) => {
        const p = join(dir, n);
        statSync(p).isDirectory() ? walk(p) : /\.(js|html|css)$/.test(n) && files.push(p);
      });
    walk(out);
    for (const f of files) assert.ok(!readFileSync(f, 'utf8').includes('api.github.com'), `${f} mentions api.github.com`);
  });
});
