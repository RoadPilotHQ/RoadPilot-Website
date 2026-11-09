import { Construction } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../i18n';

/** Placeholder until the roadmap is rebuilt from the verified status of the repositories. */
export function Roadmap() {
  const { t } = useI18n();
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="container">
        <SectionHeader id="roadmap-title" eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} intro={t.roadmap.intro} />
        <div className="card roadmap-placeholder" role="note">
          <Construction size={26} aria-hidden="true" />
          <div>
            <h3 className="roadmap-placeholder__title">{t.roadmap.placeholderTitle}</h3>
            <p>{t.roadmap.placeholderText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
