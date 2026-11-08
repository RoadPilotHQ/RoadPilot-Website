import { en } from './en';

/** The website is English only. Texts stay in en.ts, separate from components. */
export type Language = 'en';

const value = { lang: 'en' as Language, t: en };

export function useI18n() {
  return value;
}

/** Replaces {name} tokens, e.g. format('© {year} RoadPilot', { year: 2026 }). */
export function format(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
