import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { loadLegalConfig } from './config/legalConfig.mjs';

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Multi-page build: every page is a real HTML file, so a static file server can serve
// /imprint/ and /privacy/ without SPA rewrites.
//
// The legal details come from a local, ignored file. "vite build" stops with an error when
// they are missing or still placeholders; only the dev server shows [[placeholders]].
export default defineConfig(({ command }) => {
  const { config: legal } = loadLegalConfig({ root: __dirname, command });

  const legalHtml: Plugin = {
    name: 'roadpilot-legal-html',
    transformIndexHtml(html) {
      const responsible = escapeHtml([legal.name, ...legal.addressLines].join(', '));
      return html.replaceAll('{{legal.responsible}}', responsible);
    },
  };

  return {
    plugins: [react(), legalHtml],
    define: { __LEGAL__: JSON.stringify(legal) },
    build: {
      target: 'es2020',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          imprint: resolve(__dirname, 'imprint/index.html'),
          privacy: resolve(__dirname, 'privacy/index.html'),
        },
      },
    },
  };
});
