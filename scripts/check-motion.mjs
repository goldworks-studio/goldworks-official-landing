import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Exercise the actual shared timeline without a browser or another test runtime.
const source = readFileSync(
  new URL("../lib/experience-motion.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const { advanceMotion, sampleChapters, sampleFlight } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

for (const reduced of [false, true]) {
  const results = [30, 60, 120].map((fps) => {
    let state = { progress: 0, velocity: 0 };
    for (let frame = 0; frame < fps / 2; frame++)
      state = advanceMotion(state, 1, 1 / fps, reduced);
    return state.progress;
  });
  assert(
    Math.max(...results) - Math.min(...results) < 0.000001,
    "Frame rate must not change the scroll journey",
  );

  let state = { progress: 0, velocity: 0 };
  for (let frame = 0; frame < 360; frame++) {
    const target = frame < 30 ? 1 : frame < 90 ? 0.1 : 0.72;
    const next = advanceMotion(state, target, 1 / 60, reduced);
    assert(next.progress >= 0 && next.progress <= 1);
    assert(
      Math.abs(next.progress - state.progress) < 0.12,
      "Anchor jumps and scroll reversals must pass through intermediate poses",
    );
    state = next;
  }
  assert(
    Math.abs(state.progress - 0.72) < 0.00001,
    "The journey must settle at the actual scroll position",
  );

  for (const boundary of [0.25, 0.75]) {
    const before = sampleFlight(boundary - 0.0001, reduced);
    const after = sampleFlight(boundary + 0.0001, reduced);
    for (const key of Object.keys(before))
      assert(
        Math.abs(before[key] - after[key]) < 0.01,
        `No hard scene cut at ${boundary}, including reduced motion (${key})`,
      );
  }
  let previous = sampleFlight(0, reduced);
  for (let i = 1; i <= 2000; i++) {
    const current = sampleFlight(i / 2000, reduced);
    for (const key of Object.keys(current)) {
      assert(Number.isFinite(current[key]));
      assert(
        Math.abs(current[key] - previous[key]) < 0.025,
        "Camera and form must follow continuous paths",
      );
    }
    previous = current;
  }
}

const studio = sampleChapters(125 / 280);
assert(
  studio.studio === 1 && studio.lines.every((opacity) => opacity === 1),
  "The Studio link must land on a fully readable statement",
);
assert(sampleChapters(0).hero === 1 && sampleChapters(1).end === 1);
console.log(
  "Verified frame-rate independence, continuous camera paths in both motion modes, anchor jumps, scroll reversals and readable chapter destinations.",
);
