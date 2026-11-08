import { useEffect } from 'react';

/** Keeps <title> and the meta description in the selected language. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
