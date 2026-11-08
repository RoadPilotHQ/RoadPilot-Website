import { CircleCheck, CircleDashed, Construction } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { roadmap, type RoadmapStage, roadmapStages } from '../data/roadmap';
import { useI18n } from '../i18n';

const stageIcons: Record<RoadmapStage, typeof CircleCheck> = {
  completed: CircleCheck,
  inProgress: Construction,
  planned: CircleDashed,
};

export function Roadmap() {
  const { t } = useI18n();
  return (
    <section id="roadmap" className="section" aria-labelledby="roadmap-title">
      <div className="container">
        <SectionHeader id="roadmap-title" eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} intro={t.roadmap.intro} />
        <div className="roadmap">
          {roadmapStages.map((stage) => {
            const Icon = stageIcons[stage];
            const items = roadmap.filter((item) => item.stage === stage);
            return (
              <section key={stage} className={`roadmap__lane roadmap__lane--${stage}`} aria-labelledby={`lane-${stage}`}>
                <h3 id={`lane-${stage}`} className="roadmap__heading">
                  <Icon size={20} aria-hidden="true" />
                  {t.roadmap.stages[stage]}
                  <span className="roadmap__count">{items.length}</span>
                </h3>
                <ol className="roadmap__list">
                  {items.map((item) => {
                    const text = t.roadmap.items[item.id];
                    return (
                      <li key={item.id} className={`roadmap__item roadmap__item--${item.id}`}>
                        <h4 className="roadmap__title">{text.title}</h4>
                        <p className="roadmap__text">{text.text}</p>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
