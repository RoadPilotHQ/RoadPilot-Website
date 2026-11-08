import {
  Gauge,
  Layers,
  LayoutDashboard,
  type LucideIcon,
  Map,
  Radar,
  MonitorPlay,
  Route,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import type { FeatureStatus } from './status';

/**
 * Feature list. All features are currently shown as "in development".
 * Texts live in src/i18n under features.items.<id>.
 */
export const features = [
  { id: 'laneKeeping', icon: Route, status: 'inDevelopment' },
  { id: 'mapData', icon: Map, status: 'inDevelopment' },
  { id: 'speedAssistant', icon: Gauge, status: 'inDevelopment' },
  { id: 'dashboard', icon: LayoutDashboard, status: 'inDevelopment' },
  { id: 'safety', icon: ShieldCheck, status: 'inDevelopment' },
  { id: 'demoMode', icon: MonitorPlay, status: 'inDevelopment' },
  { id: 'configuration', icon: SlidersHorizontal, status: 'inDevelopment' },
  { id: 'overlay', icon: Layers, status: 'inDevelopment' },
  { id: 'distanceKeeping', icon: Radar, status: 'inDevelopment' },
] as const satisfies readonly { id: string; icon: LucideIcon; status: FeatureStatus }[];

export type FeatureId = (typeof features)[number]['id'];
