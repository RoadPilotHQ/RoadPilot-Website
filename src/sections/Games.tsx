import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { games } from '../data/games';
import { useI18n } from '../i18n';

export function Games() {
  const { t } = useI18n();
  return (
    <section id="games" className="section section--tinted" aria-labelledby="games-title">
      <div className="container">
        <SectionHeader id="games-title" eyebrow={t.games.eyebrow} title={t.games.title} intro={t.games.intro} />
        <div className="games">
          {games.map((game) => {
            const text = t.games.items[game.id];
            return (
              <article key={game.id} className={`card game game--${game.id}`} aria-labelledby={`game-${game.id}`}>
                <div className="game__banner" aria-hidden="true">
                  <span className="game__code">{game.code}</span>
                </div>
                <div className="game__body">
                  <div className="game__head">
                    <h3 id={`game-${game.id}`} className="game__name">
                      {text.name}
                    </h3>
                    <StatusBadge status={game.status} />
                  </div>
                  <p className="game__summary">{text.summary}</p>
                  <h4 className="game__label">{t.games.capabilitiesLabel}</h4>
                  <ul className="game__caps">
                    {game.capabilities.map((cap) => (
                      <li key={cap.id}>
                        <span>{text.capabilities[cap.id]}</span>
                        <StatusBadge status={cap.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
