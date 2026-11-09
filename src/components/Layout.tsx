import type { ReactNode } from 'react';
import { useI18n } from '../i18n';
import type { PageKey } from '../i18n/languages';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ page, children }: { page: PageKey; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.common.skipToContent}
      </a>
      <Header page={page} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer page={page} />
    </>
  );
}
