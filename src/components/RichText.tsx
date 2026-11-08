import { Fragment } from 'react';

/**
 * Renders text and highlights [[placeholders]] so unconfirmed
 * information can never be mistaken for real content.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="placeholder">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
