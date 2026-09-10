import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
await import("./check-motion.mjs");
await import("./check-translations.mjs");
const build = spawnSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_OUTPUT_MODE: "export",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
writeFileSync("out/.nojekyll", "");
await import("./check-export.mjs");
