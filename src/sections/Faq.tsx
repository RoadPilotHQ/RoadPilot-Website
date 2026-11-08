import { ChevronDown } from 'lucide-react';
import { RichText } from '../components/RichText';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../i18n';

/** Native <details> elements: keyboard accessible and working without JavaScript. */
export function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq" className="section section--tinted" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <SectionHeader id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="faq">
          {t.faq.items.map((item, i) => (
            <details key={i} className="faq__item">
              <summary className="faq__question">
                <span>{item.q}</span>
                <ChevronDown size={20} aria-hidden="true" className="faq__chevron" />
              </summary>
              <p className="faq__answer">
                <RichText text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
