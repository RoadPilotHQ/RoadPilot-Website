import { Feather, HandHeart, ScanEye, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';

const icons = [ScanEye, ShieldCheck, Feather, HandHeart];

export function Principles() {
  const { t } = useI18n();
  return (
    <section className="principles" aria-label={t.principles.label}>
      <ul className="container principles__list">
        {t.principles.items.map((item, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <li key={item.title} className="principles__item">
              <Icon size={22} aria-hidden="true" className="principles__icon" />
              <div>
                <h3 className="principles__title">{item.title}</h3>
                <p className="principles__text">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
