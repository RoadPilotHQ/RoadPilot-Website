import type { FeatureStatus } from './status';

/**
 * Support status per game, based on what has been verified in the game.
 * Texts live in src/i18n under games.<id>.
 */
export const games = [
  {
    id: 'ats',
    code: 'ATS',
    status: 'inDevelopment',
    capabilities: [
      { id: 'telemetry', status: 'inDevelopment' },
      { id: 'speedAssistant', status: 'inDevelopment' },
      { id: 'laneKeeping', status: 'inDevelopment' },
      { id: 'units', status: 'inDevelopment' },
    ],
  },
  {
    id: 'ets2',
    code: 'ETS2',
    status: 'inDevelopment',
    capabilities: [
      { id: 'detection', status: 'inDevelopment' },
      { id: 'telemetry', status: 'inDevelopment' },
      { id: 'laneKeeping', status: 'inDevelopment' },
      { id: 'units', status: 'inDevelopment' },
    ],
  },
] as const satisfies readonly {
  id: string;
  code: string;
  status: FeatureStatus;
  capabilities: readonly { id: string; status: FeatureStatus }[];
}[];

export type GameId = (typeof games)[number]['id'];
