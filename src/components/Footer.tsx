import { links } from '../config/site';
import { format, useI18n } from '../i18n';
import { pagePath, type PageKey } from '../i18n/languages';
import { Logo } from './Logo';
import { RichText } from './RichText';

export function Footer({ page }: { page: PageKey }) {
  const { t, lang } = useI18n();
  const base = page === 'home' ? '' : pagePath(lang, 'home');
  const year = new Date().getFullYear();

  const navItems = [
    ['features', t.nav.features],
    ['roadmap', t.nav.roadmap],
    ['download', t.nav.download],
    ['faq', t.nav.faq],
  ] as const;

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo size={34} />
          <p>{t.footer.description}</p>
        </div>

        <nav aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="site-footer__heading">
            {t.footer.navigation}
          </h2>
          <ul>
            {navItems.map(([id, label]) => (
              <li key={id}>
                <a href={`${base}#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">{t.footer.project}</h2>
          <ul>
            <li>
              {links.github ? (
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub<span className="sr-only"> {t.common.opensInNewTab}</span>
                </a>
              ) : (
                <span className="site-footer__muted">GitHub · {t.common.comingSoon}</span>
              )}
            </li>
            {links.organization && (
              <li>
                <a href={links.organization} target="_blank" rel="noopener noreferrer">
                  {t.footer.githubOrganization}
                  <span className="sr-only"> {t.common.opensInNewTab}</span>
                </a>
              </li>
            )}
            <li>
              <a href={`${base}#community`}>{t.footer.contact}</a>
            </li>
            <li>
              {links.email ? (
                <a href={links.email}>{links.email.replace('mailto:', '')}</a>
              ) : (
                <span className="site-footer__muted">
                  <RichText text={t.community.contactMissing} />
                </span>
              )}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">{t.footer.legal}</h2>
          <ul>
            <li>
              <a href={pagePath(lang, 'imprint')}>{t.footer.imprint}</a>
            </li>
            <li>
              <a href={pagePath(lang, 'privacy')}>{t.footer.privacy}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom-wrap">
        <div className="site-footer__bottom">
          <p>{format(t.footer.copyright, { year })}</p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
