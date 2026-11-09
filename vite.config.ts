import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { loadLegalConfig } from './config/legalConfig.mjs';
import {
  defaultLanguage,
  languages,
  ogLocales,
  pageFile,
  pages,
  pageUrl,
  parsePagePath,
  type Language,
  type PageKey,
} from './src/i18n/languages';
import { noscriptText, pageMeta } from './src/i18n/meta';

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Alternate-language links of one page: every language plus x-default (English). */
function alternates(page: PageKey): { hreflang: string; href: string }[] {
  return [
    ...languages.map((l) => ({ hreflang: l, href: pageUrl(l, page) })),
    { hreflang: 'x-default', href: pageUrl(defaultLanguage, page) },
  ];
}

/** Title, description, canonical, hreflang and social tags of a page, in its own language. */
function seoHead(lang: Language, page: PageKey): string {
  const m = pageMeta[lang][page];
  const tags = [
    `<title>${escapeHtml(m.title)}</title>`,
    `<meta name="description" content="${escapeHtml(m.description)}" />`,
    `<link rel="canonical" href="${pageUrl(lang, page)}" />`,
    ...alternates(page).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="RoadPilot" />`,
    `<meta property="og:url" content="${pageUrl(lang, page)}" />`,
    `<meta property="og:title" content="${escapeHtml(m.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(m.description)}" />`,
    `<meta property="og:locale" content="${ogLocales[lang]}" />`,
    ...languages.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${ogLocales[l]}" />`),
    `<meta name="twitter:card" content="summary" />`,
  ];
  if (page === 'home') {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'RoadPilot',
      url: pageUrl(lang, 'home'),
      inLanguage: lang,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Windows 10, Windows 11',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      description: m.description,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.map((t) => `    ${t}`).join('\n').trimStart();
}

function sitemap(): string {
  const entries = pages.flatMap((page) =>
    languages.map((lang) => {
      const links = alternates(page)
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
        .join('\n');
      return `  <url>\n    <loc>${pageUrl(lang, page)}</loc>\n${links}\n  </url>`;
    }),
  );
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.join('\n') +
    '\n</urlset>\n'
  );
}

// Multi-page build: every page in every language is a real HTML file (see src/i18n/languages.ts),
// so a static file server can serve /, /de/, /nl/, /imprint/, ... without SPA rewrites.
//
// The legal details come from a local, ignored file. "vite build" stops with an error when
// they are missing or still placeholders; only the dev server shows [[placeholders]].
export default defineConfig(({ command }) => {
  const { config: legal } = loadLegalConfig({ root: __dirname, command });

  const sitePages: Plugin = {
    name: 'roadpilot-site-pages',
    transformIndexHtml(html, ctx) {
      const found = parsePagePath(ctx.path);
      if (!found) return html;
      const { lang, page } = found;
      const who = escapeHtml([legal.name, ...legal.addressLines].join(', '));
      const noscript =
        page === 'home'
          ? noscriptText[lang].home
          : page === 'imprint'
            ? noscriptText[lang].imprint.replace('{who}', who)
            : '';
      return html
        .replace('<!--seo-->', seoHead(lang, page))
        .replace(
          '<!--noscript-->',
          noscript ? `<noscript>\n      <p style="font-family: system-ui, sans-serif; padding: 24px">${noscript}</p>\n    </noscript>` : '',
        );
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
    },
  };

  const input = Object.fromEntries(
    pages.flatMap((page) => languages.map((lang) => [`${lang}-${page}`, resolve(__dirname, pageFile(lang, page))])),
  );

  return {
    plugins: [react(), sitePages],
    define: { __LEGAL__: JSON.stringify(legal) },
    build: { target: 'es2020', rollupOptions: { input } },
  };
});
