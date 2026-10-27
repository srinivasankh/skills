# Skills

Agent skills for [Claude Code](https://docs.claude.com/en/docs/claude-code) and other agents that support the open `SKILL.md` format.

| Skill | What it does |
| --- | --- |
| [`maths-explainer-video`](skills/maths-explainer-video/) | Turns a school maths question into an animated, step-by-step worked-solution video (1080p MP4) in a consistent house style, built with [Remotion](https://www.remotion.dev/). |

## Install

With the [`skills`](https://www.npmjs.com/package/skills) CLI:

```console
npx skills add srinivasankh/skills --skill maths-explainer-video        # this project
npx skills add srinivasankh/skills --skill maths-explainer-video -g     # all your projects
```

Or copy the folder yourself:

```console
git clone https://github.com/srinivasankh/skills.git
cp -R skills/skills/maths-explainer-video ~/.claude/skills/
```

## maths-explainer-video

Give it a maths question (a photo, a screenshot or typed text) and ask for a video:

> make an explainer video for this: How many more quarters are there in 4.5 than in 2.75?

It will:

1. transcribe the question exactly, solve it, and check the answer a second way;
2. propose a scene plan (title, question, a named method, one scene per step, the common trap, a check, the answer) and wait for your OK;
3. build a Remotion project from its template, with bundled fonts, a fixed colour code and ready-made diagrams (fraction bars, number lines, coordinate grids, counters, step-by-step working);
4. render a still of every scene and check it against a quality checklist;
5. render `out/<name>.mp4` (1920×1080) and `out/thumbnail.png`.

The project stays editable: `npm run dev` opens Remotion Studio.

**Requirements:** Node.js 18 or later, and npm. The first render downloads a headless Chrome. The skill explains how to use an existing Chrome if that download is blocked.

It works for any level, from 11+ and SATs to GCSE and grade-school word problems. It never puts a real person's name (yours, or the student's) into the video or its files.

## License

MIT, except the bundled fonts (Inter and Noto Sans Math), which are under the SIL Open Font License 1.1.
