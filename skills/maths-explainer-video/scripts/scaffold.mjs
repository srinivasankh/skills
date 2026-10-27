#!/usr/bin/env node
// Create a new maths explainer project from this skill's template.
//
//   node scaffold.mjs <dir> --id <CompositionId> --title "<Title>" [--subtitle "<Subtitle>"] [--no-install]
//
//   node scaffold.mjs ./fraction-of-amount --id FractionOfAmount --title "Fraction of an Amount"
//
// <dir> must not exist yet, or must be empty. --id is PascalCase and names the
// Remotion composition. --subtitle defaults to "Maths · Step-by-Step".
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const usage = () => {
  const lines = fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n");
  console.error(lines.slice(1, 9).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  process.exit(1);
};

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return undefined;
  const v = args[i + 1];
  if (v === undefined || v.startsWith("--")) usage();
  args.splice(i, 2);
  return v;
};
const id = flag("id");
const title = flag("title");
const subtitle = flag("subtitle") ?? "Maths · Step-by-Step";
const noInstall = args.includes("--no-install");
const dirArg = args.filter((a) => a !== "--no-install")[0];
if (!dirArg || !id || !title) usage();

if (!/^[A-Z][A-Za-z0-9]*$/.test(id)) {
  console.error(`--id must be PascalCase letters and digits, e.g. FractionOfAmount (got "${id}")`);
  process.exit(1);
}

const dir = path.resolve(dirArg);
if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) {
  console.error(`${dir} already exists and is not empty`);
  process.exit(1);
}
// Maths symbols become words, so "Reflecting in y = −x" names a file
// reflecting-in-y-equals-minus-x rather than the misleading reflecting-in-y-x.
const symbolWords = { "=": " equals ", "−": " minus ", "+": " plus ", "×": " times ", "÷": " divided by ", "%": " percent ", "√": " root ", "π": " pi ", "²": " squared ", "³": " cubed " };
const slugify = (s) =>
  s
    .replace(/[=−+×÷%√π²³]/g, (c) => symbolWords[c])
    .replace(/(^|\s)-(?=[\w(])/g, "$1 minus ")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
// The npm package is named after the folder; the video after the title.
const slug = slugify(path.basename(dir)) || "maths-explainer";
const file = slugify(title) || slug;

const template = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "template");
fs.cpSync(template, dir, { recursive: true });

// Fill placeholders in text files. JSON strings need escaping; TS strings use
// double quotes, so escape those too.
const fill = (text, quote) =>
  text
    .replaceAll("__ID__", id)
    .replaceAll("__SLUG__", slug)
    .replaceAll("__FILE__", file)
    .replaceAll("__TITLE__", quote(title))
    .replaceAll("__SUBTITLE__", quote(subtitle));
const jsonQuote = (s) => JSON.stringify(s).slice(1, -1);
const tsQuote = (s) => s.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
const plain = (s) => s;

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );
for (const file of walk(dir)) {
  const ext = path.extname(file);
  if (![".json", ".ts", ".tsx", ".md", ".mjs"].includes(ext)) continue;
  const quote = ext === ".json" ? jsonQuote : ext === ".md" ? plain : tsQuote;
  const before = fs.readFileSync(file, "utf8");
  const after = fill(before, quote);
  if (after !== before) fs.writeFileSync(file, after);
}

if (!noInstall) {
  console.log("Installing dependencies (npm install)…");
  execSync("npm install --no-audit --no-fund", { cwd: dir, stdio: "inherit" });
}

console.log(`\nCreated ${dir}`);
console.log(`Composition: ${id}`);
console.log(`Video file:  out/${file}.mp4`);
console.log(`Next: fill in the TODOs in src/Video.tsx, then npm run lint && npm run stills`);
