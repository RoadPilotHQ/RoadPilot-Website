import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { languageCodes, languageNames, languages, pagePath, type PageKey } from '../i18n/languages';

/**
 * Switches to the same page in another language. The current section (#hash) is kept, and each
 * link points to a real page, so it also works without JavaScript.
 */
export function LanguageSwitcher({ page, onNavigate }: { page: PageKey; onNavigate?: () => void }) {
  const { lang, t } = useI18n();
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return (
    <ul className="lang-switch" aria-label={t.nav.language}>
      {languages.map((code) => (
        <li key={code}>
          <a
            className="lang-switch__link"
            href={`${pagePath(code, page)}${hash}`}
            lang={code}
            hrefLang={code}
            title={languageNames[code]}
            aria-current={code === lang ? 'true' : undefined}
            onClick={onNavigate}
          >
            <span aria-hidden="true">{languageCodes[code]}</span>
            <span className="sr-only">{languageNames[code]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
