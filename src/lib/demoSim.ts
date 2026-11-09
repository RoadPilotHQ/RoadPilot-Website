/**
 * Simulation behind the interactive demo. Everything here is invented: it runs in the browser, uses no
 * game, no telemetry and no network, and the page labels every value as demo data.
 * Pure functions only, so the behaviour can be unit-tested without a browser.
 */

export type DemoMode = 'off' | 'active' | 'fault';

export interface DemoState {
  mode: DemoMode;
  /** Truck speed in km/h. */
  speed: number;
  /** Speed limit of the current road segment in km/h. */
  limit: number;
  /** Lateral distance from the lane centre in metres (positive = right). */
  offset: number;
  /** Distance driven in metres. */
  distance: number;
  /** Seconds of simulated time. */
  time: number;
  /** Index of the current road segment. */
  segment: number;
}

/** Speed limit per segment, in km/h, and the length of each segment in metres. */
export const segments = [
  { limit: 50, length: 600 },
  { limit: 80, length: 1200 },
  { limit: 60, length: 700 },
  { limit: 90, length: 1500 },
] as const;

export const maxSpeed = 100;
const accel = 4; // km/h per second while the assistant accelerates
const brake = 8; // km/h per second while the assistant brakes
const coast = 1.5; // km/h per second the truck slows down on its own with the assistant off
const driftLimit = 0.9; // metres the truck drifts at most when nobody steers

export const initialState: DemoState = {
  mode: 'off',
  speed: 0,
  limit: 50,
  offset: 0,
  distance: 0,
  time: 0,
  segment: 0,
};

const totalLength = segments.reduce((sum, s) => sum + s.length, 0);

function segmentAt(distance: number): number {
  let d = distance % totalLength;
  for (const [i, s] of segments.entries()) {
    if (d < s.length) return i;
    d -= s.length;
  }
  return 0;
}

function approach(value: number, target: number, up: number, down: number, dt: number): number {
  if (value < target) return Math.min(target, value + up * dt);
  return Math.max(target, value - down * dt);
}

/** Starts the assistant. A fault must be cleared with {@link reset} first. */
export function start(state: DemoState): DemoState {
  return state.mode === 'fault' ? state : { ...state, mode: 'active' };
}

/** Stops the assistant at once. The truck keeps rolling and slows down on its own. */
export function stop(state: DemoState): DemoState {
  return state.mode === 'active' ? { ...state, mode: 'off' } : state;
}

/** Simulates lost telemetry: the assistant releases all controls and the values become unknown. */
export function injectFault(state: DemoState): DemoState {
  return { ...state, mode: 'fault' };
}

/** Clears a fault and returns to the stopped state. */
export function reset(state: DemoState): DemoState {
  return state.mode === 'fault' ? { ...state, mode: 'off' } : state;
}

/** Advances the simulation by `dt` seconds (0 < dt <= 1). */
export function step(state: DemoState, dt: number): DemoState {
  const time = state.time + dt;
  if (state.mode === 'fault') return { ...state, time };

  const distance = state.distance + (state.speed / 3.6) * dt;
  const segment = segmentAt(distance);
  const limit = segments[segment]?.limit ?? initialState.limit;

  let speed: number;
  let offset: number;
  if (state.mode === 'active') {
    speed = approach(state.speed, limit, accel, brake, dt);
    // The lane keeping assistant holds the truck within about 0.1 m of the lane centre.
    offset = 0.1 * Math.sin(time * 0.9);
  } else {
    speed = Math.max(0, state.speed - coast * dt);
    // Without steering the truck slowly drifts to the side.
    const direction = state.offset >= 0 ? 1 : -1;
    offset = Math.max(-driftLimit, Math.min(driftLimit, state.offset + direction * 0.04 * (state.speed / maxSpeed) * dt));
  }
  return { mode: state.mode, speed, limit, offset, distance, time, segment };
}

const KMH_PER_MPH = 1.609344;

export type Units = 'metric' | 'imperial';

export function speedIn(units: Units, kmh: number): number {
  return Math.round(units === 'metric' ? kmh : kmh / KMH_PER_MPH);
}

/** Gear of a simulated 12-speed truck, derived from the speed. 0 means neutral. */
export function gearAt(speed: number): number {
  if (speed < 1) return 0;
  return Math.min(12, 1 + Math.floor(speed / 8.5));
}
