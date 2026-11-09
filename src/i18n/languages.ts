/**
 * Languages, pages and URLs of the website. Pure data and helpers without any browser or
 * build-time dependency, so the app and vite.config.ts can both use them.
 *
 * URL structure: English is the default language and lives at the root.
 *   English  /            /imprint/            /privacy/
 *   German   /de/         /de/imprint/         /de/privacy/
 *   Dutch    /nl/         /nl/imprint/         /nl/privacy/
 */
export const languages = ['en', 'de', 'nl'] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = 'en';

/** Every page exists in every language under the same slug. */
export const pages = ['home', 'imprint', 'privacy'] as const;
export type PageKey = (typeof pages)[number];

const slugs: Record<PageKey, string> = { home: '', imprint: 'imprint', privacy: 'privacy' };

export const siteOrigin = 'https://roadpilot.cc';

/** Native names. Shown in the language selector and never translated. */
export const languageNames: Record<Language, string> = { en: 'English', de: 'Deutsch', nl: 'Nederlands' };
export const languageCodes: Record<Language, string> = { en: 'EN', de: 'DE', nl: 'NL' };
/** Open Graph locales. */
export const ogLocales: Record<Language, string> = { en: 'en_US', de: 'de_DE', nl: 'nl_NL' };

export function isLanguage(value: string | null | undefined): value is Language {
  return (languages as readonly string[]).includes(value ?? '');
}

/** Site-relative path of a page, always with a leading and a trailing slash. */
export function pagePath(lang: Language, page: PageKey): string {
  const prefix = lang === defaultLanguage ? '' : `/${lang}`;
  const slug = slugs[page];
  if (slug) return `${prefix}/${slug}/`;
  return prefix === '' ? '/' : `${prefix}/`;
}

/** Absolute URL of a page. Used for canonical, hreflang and the sitemap. */
export function pageUrl(lang: Language, page: PageKey): string {
  return `${siteOrigin}${pagePath(lang, page)}`;
}

/** Path of the HTML file of a page, relative to the project root. */
export function pageFile(lang: Language, page: PageKey): string {
  return pagePath(lang, page).slice(1) + 'index.html';
}

/** Finds the language and page of a built HTML path such as "/de/imprint/index.html". */
export function parsePagePath(path: string): { lang: Language; page: PageKey } | null {
  for (const lang of languages) {
    for (const page of pages) {
      if (`/${pageFile(lang, page)}` === path || pagePath(lang, page) === path) return { lang, page };
    }
  }
  return null;
}
