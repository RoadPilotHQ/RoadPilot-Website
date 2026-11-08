import type { ReactNode } from 'react';
import { useI18n } from '../i18n';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ isHome, children }: { isHome: boolean; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.common.skipToContent}
      </a>
      <Header isHome={isHome} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer isHome={isHome} />
    </>
  );
}
