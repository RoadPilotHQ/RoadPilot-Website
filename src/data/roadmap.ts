/**
 * Development roadmap. No dates or percentages on purpose.
 * Texts live in src/i18n under roadmap.items.<id>.
 */
export type RoadmapStage = 'completed' | 'inProgress' | 'planned';

/** Columns shown on the page. Add 'completed' back once items are finished. */
export const roadmapStages: readonly RoadmapStage[] = ['inProgress', 'planned'];

export const roadmap = [
  { id: 'demoPreview', stage: 'inProgress' },
  { id: 'safety', stage: 'inProgress' },
  { id: 'ets2Integration', stage: 'inProgress' },
  { id: 'speedAssistant', stage: 'inProgress' },
  { id: 'mapData', stage: 'inProgress' },
  { id: 'steeringCalibration', stage: 'inProgress' },
  { id: 'overlay', stage: 'inProgress' },
  { id: 'laneKeeping', stage: 'inProgress' },
  { id: 'routeForks', stage: 'inProgress' },
  { id: 'driverOverride', stage: 'planned' },
  { id: 'atsIntegration', stage: 'planned' },
  { id: 'junctions', stage: 'planned' },
  { id: 'routePlanning', stage: 'planned' },
  { id: 'distanceKeeping', stage: 'planned' },
  { id: 'qualityOfLife', stage: 'planned' },
] as const satisfies readonly { id: string; stage: RoadmapStage }[];

export type RoadmapId = (typeof roadmap)[number]['id'];
