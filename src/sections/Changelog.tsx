import { Bug, CircleAlert, Hourglass, Plus, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { links } from '../config/site';
import { releases } from '../data/releases';
import { useI18n } from '../i18n';
import { formatDate } from '../lib/format';

const groups = [
  { key: 'added', icon: Plus },
  { key: 'improved', icon: Sparkles },
  { key: 'fixed', icon: Bug },
  { key: 'limitations', icon: CircleAlert },
] as const;

export function Changelog() {
  const { t, lang } = useI18n();
  return (
    <section id="changelog" className="section" aria-labelledby="changelog-title">
      <div className="container container--narrow">
        <SectionHeader
          id="changelog-title"
          eyebrow={t.changelog.eyebrow}
          title={t.changelog.title}
          intro={t.changelog.intro}
        />

        {releases.length === 0 ? (
          <p className="card changelog__empty">
            <Hourglass size={20} aria-hidden="true" />
            {t.changelog.empty}
          </p>
        ) : (
          <ol className="changelog">
            {releases.map((release) => {
              const entry = t.changelog.entries[release.version];
              const tagUrl = links.releaseTag(release.version);
              return (
                <li key={release.version} className="card changelog__entry">
                  <header className="changelog__head">
                    <h3 className="changelog__version">
                      {tagUrl ? (
                        <a href={tagUrl} target="_blank" rel="noopener noreferrer">
                          RoadPilot {release.version}
                          <span className="sr-only"> {t.common.opensInNewTab}</span>
                        </a>
                      ) : (
                        `RoadPilot ${release.version}`
                      )}
                    </h3>
                    <time className="changelog__date" dateTime={release.date}>
                      {formatDate(release.date, lang)}
                    </time>
                  </header>
                  {entry && (
                    <>
                      <p className="changelog__summary">{entry.summary}</p>
                      <div className="changelog__groups">
                        {groups.map(({ key, icon: Icon }) =>
                          entry[key].length > 0 ? (
                            <div key={key} className={`changelog__group changelog__group--${key}`}>
                              <h4>
                                <Icon size={16} aria-hidden="true" />
                                {t.changelog[key]}
                              </h4>
                              <ul>
                                {entry[key].map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null,
                        )}
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
