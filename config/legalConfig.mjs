// Local-only legal details (name, postal address, contact email) for the imprint and privacy pages.
//
// The values are never committed. They are read at build time from an ignored file, see
// config/legal.example.json and the README. A production build ("vite build") fails with a clear
// message when the details are missing, invalid or still placeholders. Only the development
// server falls back to visibly marked [[placeholders]].
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Environment variable that overrides the location of the local legal configuration. */
export const LEGAL_CONFIG_ENV = 'ROADPILOT_LEGAL_CONFIG';
/** Default location, relative to the project root. Matched by the "*.local.json" ignore rule. */
export const DEFAULT_LEGAL_CONFIG = 'config/legal.local.json';

const KNOWN_KEYS = ['name', 'addressLines', 'email'];

/** Values that look like template placeholders must never be published. */
function looksLikePlaceholder(value) {
  return /[<>]|\[\[|example\.(invalid|com|org)\b|^\s*(todo|tbd|changeme|replace)/i.test(value);
}

/**
 * Validates a parsed legal configuration.
 * @param {unknown} raw
 * @returns {{ errors: string[], config: { name: string, addressLines: string[], email: string } | null }}
 */
export function validateLegalConfig(raw) {
  const errors = [];
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { errors: ['The legal configuration must be a JSON object.'], config: null };
  }
  for (const key of Object.keys(raw)) {
    if (!KNOWN_KEYS.includes(key)) errors.push(`Unknown setting "${key}" (allowed: ${KNOWN_KEYS.join(', ')}).`);
  }

  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (name.length < 2) errors.push('"name" is missing: the full name of the person responsible for the website.');
  else if (looksLikePlaceholder(name)) errors.push('"name" is still a placeholder.');

  const lines = Array.isArray(raw.addressLines) ? raw.addressLines : [];
  const addressLines = lines.map((l) => (typeof l === 'string' ? l.trim() : ''));
  if (addressLines.length < 3 || addressLines.length > 6 || addressLines.some((l) => l.length === 0)) {
    errors.push('"addressLines" must list 3 to 6 non-empty lines (street and number, postal code and city, country).');
  } else if (addressLines.some(looksLikePlaceholder)) {
    errors.push('"addressLines" still contains a placeholder.');
  }

  const email = typeof raw.email === 'string' ? raw.email.trim() : '';
  if (!/^[^\s@<>[\]]+@[^\s@<>[\]]+\.[^\s@<>[\]]+$/.test(email)) errors.push('"email" is missing or not a valid email address.');
  else if (looksLikePlaceholder(email)) errors.push('"email" is still a placeholder.');

  return errors.length ? { errors, config: null } : { errors, config: { name, addressLines, email } };
}

/** Clearly marked values for the development server only. Never produced by a build. */
export const DEV_PLACEHOLDER = Object.freeze({
  name: '[[Name of the person responsible]]',
  addressLines: ['[[Street and number]]', '[[Postal code and city]]', '[[Country]]'],
  email: '[[Contact email address]]',
});

/**
 * Loads the legal configuration.
 * @param {{ root: string, command: 'build' | 'serve', env?: Record<string, string | undefined> }} options
 * @returns {{ config: { name: string, addressLines: string[], email: string, isPlaceholder: boolean }, source: string | null }}
 */
export function loadLegalConfig({ root, command, env = process.env }) {
  const strict = command === 'build';
  const override = env[LEGAL_CONFIG_ENV];
  const file = resolve(root, override && override.trim() ? override.trim() : DEFAULT_LEGAL_CONFIG);

  const fail = (reason) => {
    throw new Error(
      `Legal information is not configured: ${reason}\n` +
        `  Expected file: ${file}\n` +
        `  Copy config/legal.example.json to config/legal.local.json (ignored by Git) and fill in the real details,\n` +
        `  or point ${LEGAL_CONFIG_ENV} to your file. The production build refuses to publish placeholders.`,
    );
  };

  if (!existsSync(file)) {
    if (strict) fail('the file does not exist.');
    console.warn(`[legal] ${file} not found: the dev server shows [[placeholders]]. A production build would fail.`);
    return { config: { ...DEV_PLACEHOLDER, addressLines: [...DEV_PLACEHOLDER.addressLines], isPlaceholder: true }, source: null };
  }

  let raw;
  try {
    raw = JSON.parse(readFileSync(file, 'utf8').replace(/^﻿/, ''));
  } catch (e) {
    if (strict) fail(`the file is not valid JSON (${e instanceof Error ? e.message : String(e)}).`);
    console.warn(`[legal] ${file} is not valid JSON: the dev server shows [[placeholders]].`);
    return { config: { ...DEV_PLACEHOLDER, addressLines: [...DEV_PLACEHOLDER.addressLines], isPlaceholder: true }, source: file };
  }

  const { errors, config } = validateLegalConfig(raw);
  if (!config) {
    if (strict) fail(`\n    - ${errors.join('\n    - ')}`);
    console.warn(`[legal] ${file} is incomplete (${errors.join(' ')}): the dev server shows [[placeholders]].`);
    return { config: { ...DEV_PLACEHOLDER, addressLines: [...DEV_PLACEHOLDER.addressLines], isPlaceholder: true }, source: file };
  }
  return { config: { ...config, isPlaceholder: false }, source: file };
}
