import { CircleCheck, Download } from 'lucide-react';
import { Fragment } from 'react';
import { ActionLink } from '../components/ActionLink';
import { GithubIcon } from '../components/GithubIcon';
import { RoadScene } from '../components/RoadScene';
import { links } from '../config/site';
import { useI18n } from '../i18n';

export function Hero() {
  const { t } = useI18n();
  // "Your truck. Your road. Your control." – the last sentence is set in orange.
  const sentences = t.hero.title.split(/(?<=\.)\s+/);
  const last = sentences.pop();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__copy">
        <p className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          {t.hero.eyebrow}
        </p>
        <h1 id="hero-title" className="hero__title">
          {sentences.map((s) => (
            <Fragment key={s}>
              <span>{s}</span>{' '}
            </Fragment>
          ))}
          <span className="hero__title-accent">{last}</span>
        </h1>
        <p className="hero__text">{t.hero.text}</p>
        <div className="hero__actions">
          <ActionLink href="#download" size="lg" icon={<Download size={19} aria-hidden="true" />}>
            {t.hero.download}
          </ActionLink>
          <ActionLink href={links.github} variant="secondary" size="lg" icon={<GithubIcon size={18} />}>
            {t.hero.github}
          </ActionLink>
        </div>
        <p className="hero__compat">
          <CircleCheck size={16} aria-hidden="true" />
          {t.hero.compatibility}
        </p>
      </div>

      <div className="hero__stage">
        <RoadScene />
      </div>
    </section>
  );
}
