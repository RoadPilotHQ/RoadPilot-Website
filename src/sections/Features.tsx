import { Info } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { features } from '../data/features';
import { useI18n } from '../i18n';

export function Features() {
  const { t } = useI18n();
  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="container">
        <SectionHeader
          id="features-title"
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          intro={t.features.intro}
        />
        <ul className="feature-grid">
          {features.map(({ id, icon: Icon, status }) => {
            const text = t.features.items[id];
            return (
              <li key={id} className={`card feature feature--${status}`}>
                <div className="feature__head">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <StatusBadge status={status} />
                </div>
                <h3 className="feature__title">{text.title}</h3>
                <p className="feature__text">{text.text}</p>
                <p className="feature__note">
                  <Info size={14} aria-hidden="true" />
                  {text.note}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
