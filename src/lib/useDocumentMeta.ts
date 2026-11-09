import { useEffect } from 'react';
import { useI18n } from '../i18n';
import type { PageKey } from '../i18n/languages';
import { pageMeta } from '../i18n/meta';

/** Keeps <title> and the meta description in the page's language (they are also set at build time). */
export function useDocumentMeta(page: PageKey) {
  const { lang } = useI18n();
  const { title, description } = pageMeta[lang][page];
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
