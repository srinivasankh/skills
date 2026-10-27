// Renders one still per scene into out/stills/, taken near the end of each
// scene when everything has appeared. Look at every one before rendering
// the full video.
//
//   npm run stills
//   npm run stills -- --browser-executable=/path/to/chrome   (if Remotion
//   can't download its own browser, e.g. offline or behind a proxy)
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const arg = process.argv.find((a) => a.startsWith("--browser-executable="));
const browserExecutable =
  arg?.split("=")[1] ?? process.env.REMOTION_BROWSER_EXECUTABLE ?? null;

const root = process.cwd();
const outDir = path.join(root, "out", "stills");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(root, "src", "index.ts") });
// The project has exactly one composition (see src/Root.tsx).
const [composition] = await getCompositions(serveUrl, { browserExecutable });

const markers = composition.props.markers ?? [];
for (const [i, m] of markers.entries()) {
  const frame = m.from + Math.max(0, m.frames - 20);
  const name = `${String(i + 1).padStart(2, "0")}-${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  await renderStill({
    serveUrl,
    composition,
    frame,
    output: path.join(outDir, name),
    browserExecutable,
  });
  console.log(`${name}  (frame ${frame})`);
}
console.log(`\n${markers.length} stills in ${path.relative(root, outDir)}/`);
