import { de } from './de';
import { en, type Messages } from './en';
import { defaultLanguage, isLanguage, type Language } from './languages';
import { nl } from './nl';

export type { Language } from './languages';
export type { Messages } from './en';

const messages: Record<Language, Messages> = { en, de, nl };

/** Every page is a separate HTML file whose <html lang> names its language. */
function detectLanguage(): Language {
  const lang = document.documentElement.lang;
  return isLanguage(lang) ? lang : defaultLanguage;
}

let current: { lang: Language; t: Messages } | null = null;

export function useI18n() {
  if (!current) {
    const lang = detectLanguage();
    current = { lang, t: messages[lang] };
  }
  return current;
}

/** Replaces {name} tokens, e.g. format('© {year} RoadPilot', { year: 2026 }). */
export function format(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
