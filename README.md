# Skills

[![skills.sh](https://skills.sh/b/srinivasankh/skills)](https://skills.sh/srinivasankh/skills)

Agent skills for [Claude Code](https://docs.claude.com/en/docs/claude-code) and other agents that support the open `SKILL.md` format.

| Skill | What it does |
| --- | --- |
| [`maths-explainer-video`](skills/maths-explainer-video/) | Turns a school maths question into an animated, step-by-step worked-solution video (1080p MP4) in a consistent house style, built with [Remotion](https://www.remotion.dev/). |
| [`maths-explainer-anywhere`](skills/maths-explainer-anywhere/) | The same explainer videos with nothing to install: one HTML file that plays in any browser and saves itself as an MP4. Works in Claude chat too. |

## Install

With the [`skills`](https://www.npmjs.com/package/skills) CLI:

```console
npx skills add srinivasankh/skills --skill maths-explainer-video        # this project
npx skills add srinivasankh/skills --skill maths-explainer-anywhere -g  # all your projects
```

Or copy a skill's folder yourself:

```console
git clone https://github.com/srinivasankh/skills.git
cp -R skills/skills/maths-explainer-anywhere ~/.claude/skills/
```

In Claude chat, zip a skill's folder and upload it as a custom skill in Claude's settings.

**Which maths skill?** Use `maths-explainer-anywhere` in Claude chat, or anywhere you can't (or don't want to) install anything. Use `maths-explainer-video` in Claude Code when you have Node and want an editable Remotion project.

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

## maths-explainer-anywhere

The same kind of video, made with nothing but Claude. Ask for an explainer the same way:

> make an explainer video for this, I don't have anything installed: Solve 5(x − 3) = 2x + 9

It solves and double-checks the question, agrees a scene plan with you, then writes **one HTML file**. That file contains a small, dependency-free animation engine plus the scenes for your question, so every video shares the same look: named method, step scenes with diagrams, the common trap, a check, and the answer with each wrong option marked.

Open the file in Chrome, Edge or Safari:

- **Play** watches it, and the scene menu jumps around.
- **Download video** saves a 1920×1080 MP4 with the correct length, usually in under a minute (about 5 MB per minute of video). It uses the browser's built-in video encoder; browsers without one record it in real time as a WebM.

No Node, npm, libraries, network access or other tools are needed, in Claude Code, Claude chat (as an artifact) or any agent that can write a file.

## License

MIT, except the bundled fonts (Inter and Noto Sans Math), which are under the SIL Open Font License 1.1.
