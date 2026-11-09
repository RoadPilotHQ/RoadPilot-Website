// Tests for the simulation behind the interactive demo. Run with: npm run test:demo
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
let sim;
before(async () => {
  const result = await build({
    entryPoints: [resolve(root, 'src/lib/demoSim.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  });
  sim = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
});

const run = (state, seconds, dt = 0.1) => {
  for (let t = 0; t < seconds; t += dt) state = sim.step(state, dt);
  return state;
};

describe('demo simulation', () => {
  it('starts stopped and standing still', () => {
    assert.equal(sim.initialState.mode, 'off');
    assert.equal(sim.initialState.speed, 0);
    assert.equal(run(sim.initialState, 5).speed, 0);
  });

  it('accelerates to the limit and never exceeds the highest limit', () => {
    let s = run(sim.start(sim.initialState), 30);
    assert.equal(s.speed, 50, 'reaches the first limit');
    const highest = Math.max(...sim.segments.map((x) => x.limit));
    for (let i = 0; i < 4000; i++) {
      s = sim.step(s, 0.1);
      assert.ok(s.speed >= 0 && s.speed <= highest);
    }
    assert.ok(s.distance > 0);
  });

  it('keeps the truck near the lane centre while active', () => {
    const s = run(sim.start(sim.initialState), 120);
    assert.ok(Math.abs(s.offset) <= 0.1 + 1e-9);
  });

  it('stopping releases control: the truck slows down and never speeds up', () => {
    let s = run(sim.start(sim.initialState), 30);
    const before = s.speed;
    s = sim.stop(s);
    assert.equal(s.mode, 'off');
    s = run(s, 5);
    assert.ok(s.speed < before);
  });

  it('a fault cannot be started over and must be cleared first', () => {
    let s = run(sim.start(sim.initialState), 10);
    s = sim.injectFault(s);
    assert.equal(s.mode, 'fault');
    assert.equal(sim.start(s).mode, 'fault');
    assert.equal(sim.stop(s).mode, 'fault');
    assert.equal(sim.reset(s).mode, 'off');
  });

  it('does not move the truck during a fault', () => {
    const s = sim.injectFault(run(sim.start(sim.initialState), 10));
    const later = run(s, 5);
    assert.equal(later.distance, s.distance);
    assert.equal(later.speed, s.speed);
  });

  it('converts units and picks plausible gears', () => {
    assert.equal(sim.speedIn('metric', 80), 80);
    assert.equal(sim.speedIn('imperial', 80), 50);
    assert.equal(sim.gearAt(0), 0);
    assert.equal(sim.gearAt(1), 1);
    assert.ok(sim.gearAt(100) <= 12);
  });
});
