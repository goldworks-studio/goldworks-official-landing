export type MotionState = { progress: number; velocity: number };

export const clamp = (value: number, low = 0, high = 1) =>
  Math.max(low, Math.min(high, value));

export function smooth(start: number, end: number, value: number) {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}

// Analytic critically damped motion: the same path at 30, 60 or 120 Hz.
// A scroll event changes the destination, never the rendered pose directly.
export function advanceMotion(
  current: MotionState,
  destination: number,
  delta: number,
  reduced: boolean,
): MotionState {
  const target = clamp(destination);
  const dt = clamp(delta, 0, 0.064);
  const rate = reduced ? 18 : 12;
  const offset = current.progress - target;
  const decay = Math.exp(-rate * dt);
  const step = (current.velocity + rate * offset) * dt;
  const progress = target + (offset + step) * decay;
  const velocity = (current.velocity - rate * step) * decay;
  const overshot = (target - current.progress) * (target - progress) < 0;
  if (
    overshot ||
    (Math.abs(progress - target) < 0.00001 && Math.abs(velocity) < 0.0001)
  )
    return { progress: target, velocity: 0 };
  return { progress: clamp(progress), velocity };
}

export function sampleChapters(progress: number) {
  return {
    hero: 1 - smooth(0.07, 0.24, progress),
    studio: smooth(0.28, 0.41, progress) * (1 - smooth(0.56, 0.68, progress)),
    end: smooth(0.8, 0.91, progress),
    lines: [
      smooth(0.28, 0.37, progress),
      smooth(0.31, 0.4, progress),
      smooth(0.34, 0.43, progress),
    ],
  };
}

export function sampleFlight(progress: number, reduced: boolean) {
  const first = smooth(0.07, 0.41, progress);
  const second = smooth(0.56, 0.94, progress);
  const entrance = Math.sin(first * Math.PI);
  const exit = Math.sin(second * Math.PI);
  return {
    entrance,
    exit,
    travel: Math.max(entrance, exit),
    middle: smooth(0.12, 0.41, progress) * (1 - second),
    release: smooth(0.62, 0.94, progress),
    // Reduced motion keeps a stable viewpoint, with continuous user-driven
    // material changes instead of three hard cuts or an automatic orbit.
    turn: reduced
      ? entrance * 0.18 - exit * 0.18
      : (first + second) * Math.PI * 2,
    cameraTravel: reduced ? 0.12 : 1,
  };
}
