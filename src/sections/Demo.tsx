import { Play, Square, TriangleAlert, Wrench } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { useI18n } from '../i18n';
import {
  gearAt,
  initialState,
  injectFault,
  reset,
  segments,
  speedIn,
  start,
  step,
  stop,
  type DemoState,
  type Units,
} from '../lib/demoSim';

type Action = 'start' | 'stop' | 'fault' | 'reset' | { tick: number };

function reducer(state: DemoState, action: Action): DemoState {
  if (typeof action === 'object') return step(state, action.tick);
  switch (action) {
    case 'start':
      return start(state);
    case 'stop':
      return stop(state);
    case 'fault':
      return injectFault(state);
    case 'reset':
      return reset(state);
  }
}

const TICK_MS = 100;
const totalLength = segments.reduce((sum, s) => sum + s.length, 0);
const KM_PER_MI = 1.609344;
const FT_PER_M = 3.28084;

export function Demo() {
  const { t } = useI18n();
  const d = t.demo;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [units, setUnits] = useState<Units>('metric');

  // The simulation only advances while the tab is visible.
  useEffect(() => {
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.5, (now - last) / 1000);
      last = now;
      if (!document.hidden) dispatch({ tick: dt });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  // Esc stops the assistant, like in the real application.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch('stop');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const fault = state.mode === 'fault';
  const u = d.units[units];
  const speed = fault ? d.unknown : `${speedIn(units, state.speed)} ${u.speed}`;
  const limit = fault ? d.unknown : `${speedIn(units, state.limit)} ${u.speed}`;
  const gear = fault ? d.unknown : state.speed < 1 ? d.neutral : String(gearAt(state.speed));
  const offsetValue = units === 'metric' ? state.offset : state.offset * FT_PER_M;
  const offset = fault ? d.unknown : `${offsetValue >= 0 ? '+' : '−'}${Math.abs(offsetValue).toFixed(2)} ${u.offset}`;
  const km = state.distance / 1000;
  const distance = fault ? d.unknown : `${(units === 'metric' ? km : km / KM_PER_MI).toFixed(2)} ${u.distance}`;
  const note = state.mode === 'active' ? d.activeNote : fault ? d.faultNote : d.offNote;

  // Position of the truck on the looping road strip, as a percentage.
  const progress = ((state.distance % totalLength) / totalLength) * 100;
  const clampedOffset = Math.max(-1, Math.min(1, state.offset));

  return (
    <section id="demo" className="section demo" aria-labelledby="demo-title">
      <div className="container">
        <SectionHeader id="demo-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

        <div className="card demo__panel" role="group" aria-label={d.panelLabel}>
          <div className="demo__top">
            <span className="chip chip--dev demo__badge">{d.badge}</span>
            <div className="demo__units" role="group" aria-label={d.unitsLabel}>
              {(['metric', 'imperial'] as const).map((u2) => (
                <button
                  key={u2}
                  type="button"
                  className={`demo__unit${units === u2 ? ' demo__unit--on' : ''}`}
                  aria-pressed={units === u2}
                  onClick={() => setUnits(u2)}
                >
                  {d[u2]}
                </button>
              ))}
            </div>
          </div>

          <dl className="demo__stats">
            <div className="demo__stat demo__stat--main">
              <dt>{d.speed}</dt>
              <dd className={fault ? 'demo__missing' : undefined}>{speed}</dd>
            </div>
            <div className="demo__stat">
              <dt>{d.limit}</dt>
              <dd className={fault ? 'demo__missing' : undefined}>{limit}</dd>
            </div>
            <div className="demo__stat">
              <dt>{d.gear}</dt>
              <dd className={fault ? 'demo__missing' : undefined}>{gear}</dd>
            </div>
            <div className="demo__stat">
              <dt>{d.laneOffset}</dt>
              <dd className={fault ? 'demo__missing' : undefined}>{offset}</dd>
            </div>
            <div className="demo__stat">
              <dt>{d.distance}</dt>
              <dd className={fault ? 'demo__missing' : undefined}>{distance}</dd>
            </div>
            <div className="demo__stat">
              <dt>{d.status}</dt>
              <dd>
                <span className={`demo__mode demo__mode--${state.mode}`}>{d.modes[state.mode]}</span>
              </dd>
            </div>
          </dl>

          <div className="demo__road" role="img" aria-label={d.roadLabel}>
            <div className="demo__lane" />
            {segments.map((s, i) => {
              const before = segments.slice(0, i).reduce((sum, x) => sum + x.length, 0);
              return (
                <span key={i} className="demo__sign" style={{ left: `${(before / totalLength) * 100}%` }}>
                  {speedIn(units, s.limit)}
                </span>
              );
            })}
            {!fault && (
              <span
                className={`demo__truck${state.mode === 'active' ? ' demo__truck--active' : ''}`}
                style={{ left: `${progress}%`, transform: `translate(-50%, calc(-50% + ${clampedOffset * 14}px))` }}
              />
            )}
          </div>

          <p className="demo__note" aria-live="polite">
            {fault && <TriangleAlert size={16} aria-hidden="true" />}
            {note}
          </p>

          <div className="demo__controls">
            {state.mode === 'active' ? (
              <button type="button" className="btn btn--primary btn--md" onClick={() => dispatch('stop')}>
                <Square size={16} aria-hidden="true" />
                <span>{d.stop}</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary btn--md"
                disabled={fault}
                onClick={() => dispatch('start')}
              >
                <Play size={16} aria-hidden="true" />
                <span>{d.start}</span>
              </button>
            )}
            {fault ? (
              <button type="button" className="btn btn--secondary btn--md" onClick={() => dispatch('reset')}>
                <Wrench size={16} aria-hidden="true" />
                <span>{d.recover}</span>
              </button>
            ) : (
              <button type="button" className="btn btn--secondary btn--md" onClick={() => dispatch('fault')}>
                <TriangleAlert size={16} aria-hidden="true" />
                <span>{d.fault}</span>
              </button>
            )}
            <span className="demo__hint">{d.stopHint}</span>
          </div>
        </div>

        <p className="demo__disclaimer">{d.disclaimer}</p>
      </div>
    </section>
  );
}
