import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { links } from '../config/site';
import { useI18n } from '../i18n';
import { useActiveSection } from '../lib/useActiveSection';
import { GithubIcon } from './GithubIcon';
import { Logo } from './Logo';

const sectionIds = ['home', 'features', 'roadmap', 'changelog', 'faq'] as const;
const noSections: readonly string[] = [];

/** On sub-pages, section links point back to the homepage. */
export function Header({ isHome }: { isHome: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(isHome ? sectionIds : noSections);
  const base = isHome ? '' : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}${open ? ' site-header--open' : ''}`}>
      <div className="container site-header__inner">
        <a className="site-header__brand" href={isHome ? '#home' : '/'} onClick={close}>
          <Logo size={32} />
          <span className="sr-only">{t.nav.home}</span>
        </a>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
        </button>

        <nav id="site-nav" className="site-nav" aria-label={t.nav.label}>
          <ul className="site-nav__list">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  className="site-nav__link"
                  href={`${base}#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={close}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
            <li>
              {links.github ? (
                <a className="site-nav__link" href={links.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={16} />
                  {t.nav.github}
                  <span className="sr-only"> {t.common.opensInNewTab}</span>
                </a>
              ) : (
                <span
                  className="site-nav__link site-nav__link--disabled"
                  aria-disabled="true"
                  title={t.common.notPublicYet}
                >
                  <GithubIcon size={16} />
                  {t.nav.github}
                  <span className="site-nav__soon">{t.common.comingSoon}</span>
                </span>
              )}
            </li>
          </ul>
          <div className="site-nav__actions">
            <a className="btn btn--primary btn--md" href={`${base}#download`} onClick={close}>
              <Download size={17} aria-hidden="true" />
              <span>{t.nav.download}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
