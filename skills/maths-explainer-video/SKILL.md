---
name: maths-explainer-video
description: Turn a school maths question into a polished, animated worked-solution video (1080p MP4) with a consistent house style, built with Remotion. Use this whenever someone shares a maths or numeracy question (photo, screenshot or typed text) and wants a video, animation, explainer or visual walkthrough of how to solve it, for any level or exam (11+, SATs, GCSE, state tests, grade-school word problems, homework). Also use it when they ask to "make a video for this question", "animate this solution" or "explain this step by step as a video", even if they don't mention Remotion.
---

# Maths explainer video

Turns one maths question into a 45–75 second animated video that solves it step by step: title, the question, a named method, one scene per step, the common trap, a check, and the answer. Every video uses the same template, fonts, colours and animation, so a series of videos looks like it was made by one person.

The output is a finished `1920×1080` MP4, a thumbnail, and the editable Remotion project behind them.

**Requirements:** Node.js 18+ and npm. Remotion downloads its own headless browser on first render. If that's blocked (offline or a strict proxy), see "Rendering without a browser download" below.

## The non-negotiables

These matter more than anything visual, because a polished video that teaches the wrong thing does harm.

- **The maths must be right.** Solve the question, then check the answer a second, independent way (work backwards, estimate, substitute it back in, or count from a diagram) before building anything. If the two disagree, find out why.
- **Copy the question exactly.** Use the exact wording, numbers, units, currency, spelling and answer letters. Names of people *in the question* ("Ella buys 3 notebooks") are part of the question, so keep them as printed.
- **Keep real people out of it.** If the user mentions who the video is for (their child, a student, themselves), don't put that name in the video, file names, folder names, code or commit messages. Write "you" or "the student" instead. The same goes for any other real person, and for school names.
- **Keep tips generic.** Call them "Exam Tip" or "Top Tip", never "<name>'s Tip".
- **Ask when the question is unclear.** If a photo is blurry, a diagram is missing, or the question is ambiguous, ask instead of guessing.

## Workflow

### 1. Read and solve

1. Transcribe the question word for word, with any answer options and their letters. If it refers to a diagram, describe the diagram's measurements and labels precisely.
2. Solve it in the way a strong student at that level would; don't use a method above the level of the question. An 11+ student shouldn't see algebra the question doesn't need.
3. Check the answer a second way.
4. Work out the two or three wrong moves that most often cost marks. For multiple choice, work out where each wrong option comes from: they're usually built from exactly these mistakes, and naming them is the most useful part of the video.

### 2. Plan the scenes, then confirm with the user

Write a short plan and show it to the user before you build anything. Use this format:

```
Question:  How many more quarters are there in 4.5 than in 2.75?
           A 1.75   B 7   C 11   D 18
Title:     How Many More Quarters?
Subtitle:  11+ Maths · Step-by-Step
Method:    C.U.T. = Count the quarters · Use × 4 · Take away
Answer:    7 (option B)
Check:     (4.5 − 2.75) × 4 = 1.75 × 4 = 7
Traps:     A = subtracting without converting (4.5 − 2.75)
           C, D = stopping after counting one number (11 or 18)

#  Scene                 Secs  What's on screen
1  Title                 3     title + subtitle
2  Question              7     question card, 4 options
3  Method                5.5   C.U.T. steps
4  What a quarter is     5.5   bar cut into 4 pieces
5  Quarters in 4.5       8     4½ bars filling → 18
6  Quarters in 2.75      6.5   2¾ bars → 11
7  Take the difference   6.5   18 − 11 = 7
8  The trap              6.5   4.5 − 2.75 = 1.75 → option A is a trap
9  Answer                7     7, option B + traps to avoid
```
Guidance for the plan:

- **Title:** 2–5 words that name the idea, not the topic ("How Many More Quarters?", not "Fractions Question").
- **Subtitle:** "<Exam> Maths · Step-by-Step" when the user names the exam or level (11+, SATs, GCSE, Grade 5), otherwise "Maths · Step-by-Step".
- **Method:** a short, memorable name for the steps, ideally an acronym where each letter starts a step (C.U.T., B.A.S.E.). It should be reusable on similar questions. If no natural acronym fits, a plain name such as "The 3-step method" is better than a forced one.
- **One idea per scene.** Every step scene needs a visual: a bar, number line, grid, counters, a diagram of the shape, or working that builds line by line. Text alone is a slideshow, not an explainer.
- **Timing:** most scenes are 5–9 seconds and the whole video is 45–75 seconds. Allow about 0.3 seconds per word of new on-screen text, plus a 1.5-second hold before the scene ends; a long question gets a longer scene.

Wait for the user's go-ahead or changes. If they say to just go ahead, proceed with your plan.

### 3. Scaffold the project

```console
node <this-skill>/scripts/scaffold.mjs <dir> --id <CompositionId> --title "<Title>" --subtitle "<Subtitle>"
# e.g.
node <this-skill>/scripts/scaffold.mjs ./quarters-difference --id QuartersDifference --title "How Many More Quarters?" --subtitle "11+ Maths · Step-by-Step"
```

`<this-skill>` is the folder this SKILL.md is in. The script copies `assets/template/`, fills in the names and runs `npm install`. Put the project wherever the user wants it; if they don't say, use a new folder named after the topic in the current directory. Don't name the folder after a person.

### 4. Build

All the editing happens in `src/Video.tsx`. Before you start, read `references/style-guide.md`: it covers layout, type sizes, what each colour means, timing, and how to write numbers, fractions and symbols. It also lists the ready-made diagrams in `src/style/diagrams.tsx` (`Bar`, `NumberLine`, `CoordinateGrid`, `Counters`, `WorkingLines`).

1. Fill in the content constants at the top of the file (`QUESTION` can be JSX for line breaks and coloured numbers, `OPTIONS`, `ANSWER`, `ANSWER_OPTION`, `METHOD_NAME`, `METHOD_STEPS`, `TRAPS`). Give each trap the wrong option letter it leads to; the answer scene then shows every option, with the right one in green and the traps in red.
2. Copy `StepScene` once per step in the plan. Give each copy its own visual, and add it to `SCENES` with its length in frames (seconds × 30).
3. Fill in the trap and check scenes. If the plan has no check scene, remove it from `SCENES`.
4. Make sure no `TODO` is left: `grep -rn TODO src/` returns nothing.

**Fill the frame.** These videos are mostly watched on phones, so each scene should be one large idea, not a small block floating in empty space. Use the `TYPE` sizes (key working in `TYPE.math`), let diagrams take most of the height, and put a diagram and its working side by side rather than stacking small pieces. If a still shows a large empty area, scale the content up.

Import everything visual from `./style`, so the look stays identical across videos. If a question needs something new (a pie chart, a clock face, a 3D net), build it as a small component in `Video.tsx` using the same palette, type scale and motion helpers.

### 5. Check

1. `npm run lint` must pass (ESLint and TypeScript).
2. `npm run stills` renders one still per scene into `out/stills/`, taken near the end of each scene when everything has appeared. **Open and look at every still** and go through `references/quality-checklist.md`. Fix what you find and re-run until a pass finds nothing.
3. Read the on-screen question, numbers and answer against the original once more.

### 6. Render

```console
npm run render     # out/<title>.mp4, 1920×1080
npm run thumbnail  # out/thumbnail.png from the title scene
```

Check the MP4 exists and that its length matches the plan.

### 7. Hand over

- Fill in the project's `README.md`: the question, the answer, how it's solved, and a scene table with start–end times (m:ss, or m:ss.s for half seconds).
- Tell the user where the MP4, the thumbnail and the project are. Give one line on how to change things later: `npm run dev` opens Remotion Studio, where text and timing can be edited live.
- If the project is in a git repo and the user wants it committed, use a message like `Add explainer video for <topic>`, with no personal names.

## Rendering without a browser download

If `npm run stills` or `npm run render` fails while downloading Chrome Headless Shell, look for a Chrome or Chromium that's already installed and pass it in. Likely places are a Playwright cache (`~/.cache/ms-playwright/*/chrome-linux/headless_shell`, or `/opt/pw-browsers/`), or `google-chrome`/`chromium` on the PATH:

```console
npm run stills -- --browser-executable=/path/to/chrome
npm run render -- --browser-executable=/path/to/chrome
npm run thumbnail -- --browser-executable=/path/to/chrome
```

## Files in this skill

- `scripts/scaffold.mjs`: creates a project from the template.
- `assets/template/`: the Remotion project. `src/Video.tsx` holds the scenes; `src/style/` holds the house style and diagrams; `public/fonts/` holds the Inter and Noto Sans Math fonts (SIL Open Font License); `scripts/render-stills.mjs` renders the per-scene stills.
- `references/style-guide.md`: read before building.
- `references/quality-checklist.md`: use when checking the stills.
