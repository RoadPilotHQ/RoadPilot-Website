import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { Layout } from '../components/Layout';
import { RichText } from '../components/RichText';
import { useI18n } from '../i18n';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export type LegalPageKind = 'imprint' | 'privacy';

interface LegalSection {
  heading: string;
  /** Postal address lines, rendered in an <address> element. */
  address?: readonly string[];
  paragraphs: readonly string[];
}

interface LegalContent {
  title: string;
  lead?: string;
  lastUpdated?: string;
  sections: readonly LegalSection[];
}

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const { t } = useI18n();
  const content: LegalContent = t.legal[kind];
  useDocumentMeta(t.meta[`${kind}Title`], t.meta[`${kind}Description`]);

  // The "incomplete" notice only appears while the page still has [[placeholders]].
  const hasPlaceholders = JSON.stringify(content).includes('[[');

  return (
    <Layout isHome={false}>
      <article className="legal container container--narrow" aria-labelledby="legal-title">
        <a className="legal__back" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          {t.common.backToHome}
        </a>
        <h1 id="legal-title" className="legal__title">
          {content.title}
        </h1>
        {hasPlaceholders && (
          <p className="notice notice--warn" role="note">
            <TriangleAlert size={18} aria-hidden="true" />
            <span>{t.legal.draftNotice}</span>
          </p>
        )}
        {content.lead && <p className="legal__lead">{content.lead}</p>}
        {content.sections.map((section) => (
          <section key={section.heading} className="legal__section">
            <h2>
              <RichText text={section.heading} />
            </h2>
            {section.address && (
              <address className="legal__address">
                {section.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            )}
            {section.paragraphs.map((p) => (
              <p key={p}>
                <RichText text={p} />
              </p>
            ))}
          </section>
        ))}
        {content.lastUpdated && (
          <p className="legal__updated">
            <RichText text={content.lastUpdated} />
          </p>
        )}
      </article>
    </Layout>
  );
}
