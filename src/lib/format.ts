import type { Language } from '../i18n';

const locales: Record<Language, string> = { en: 'en-GB' };

export function formatDate(iso: string, lang: Language): string {
  // Parse as a calendar date, independent of the visitor's time zone.
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  return new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

export function formatMegabytes(bytes: number, lang: Language): string {
  const mb = bytes / 1_000_000;
  return `${new Intl.NumberFormat(locales[lang], { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(mb)} MB`;
}
