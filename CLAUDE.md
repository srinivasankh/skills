# skills

A public collection of agent skills in the open `SKILL.md` format. Each skill lives in `skills/<name>/` and installs with `npx skills add srinivasankh/skills --skill <name>`.

## Rules for every skill

- **Public and impersonal.** No names of the repo owner, their family or students, no private repo names or links, and no material copied from private sources. Examples and test questions are invented. Test prompts may use fictional names, for example to check that a skill keeps names out of its output.
- **Self-contained.** A skill brings everything it needs (templates, scripts, fonts, references) inside its own folder and works from any directory. Don't depend on another repo or on files outside the skill.
- **Licensing.** Code is MIT (root `LICENSE`). Bundled third-party assets keep their own licence, with the licence text next to them (e.g. the OFL fonts in `maths-explainer-video`).
- **Listed in the README.** Adding a skill means adding a row to the table in `README.md`, plus a short usage section.

## Changing a skill

- Build and improve skills with the `skill-creator` workflow: draft, run the test cases in `skills/<name>/evals/` with and without the skill, review the outputs, then revise.
- Explain the reasons in `SKILL.md` rather than piling up MUSTs, and keep `SKILL.md` under about 500 lines; detail goes in `references/`.

## maths-explainer-video

- Turns a maths question into a 1080p Remotion MP4. The template is in `assets/template/`, scaffolded by `scripts/scaffold.mjs`.
- After any template change: scaffold a throwaway project outside the repo, then run `npm run lint`, `npm run stills` and look at every still. If Remotion can't download its browser, pass `--browser-executable=<chrome>`.
- Keep the house style consistent: colours, type scale and motion are in `assets/template/src/style/`, and the rules are in `references/style-guide.md`. Change both together.
- Remotion is pinned to 4.0.522. Upgrade every `@remotion/*` package together.

## maths-explainer-anywhere

- Turns a maths question into one self-contained HTML file. The engine (`assets/player.html`) draws every scene on a canvas and exports an MP4 with WebCodecs, using its own small MP4 writer. The model only replaces the `EXPLAINER` content block.
- The engine stays hand-written with no outside code: no URLs, `<script src>`, imports or network calls. It has to work offline, pasted into a chat artifact.
- After any engine change, test in a real browser (headless Chromium works): screenshot each scene, confirm the layout check says "no problems found", export the bundled example, and check the MP4 with `ffprobe` (correct duration, 1920×1080, about 5–6 MB a minute). Then check the MediaRecorder fallback's WebM duration too.
- Keep its colours, type scale, diagrams and scene structure in step with `maths-explainer-video`, and `references/style-guide.md` in step with the kit's real API.

