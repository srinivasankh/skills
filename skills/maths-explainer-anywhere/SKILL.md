---
name: maths-explainer-anywhere
description: Turn a school maths question into an animated, step-by-step worked-solution video that needs nothing installed. It produces one self-contained HTML file that plays in any browser and saves itself as a video file (MP4 or WebM) with one click. Works in Claude chat (as an artifact), Claude Code or any agent, with no Node, npm, Remotion, libraries or tools. Use it whenever someone shares a maths or numeracy question (photo, screenshot or typed text) and wants a video, animation, explainer or visual walkthrough, for any level (11+, SATs, GCSE, state tests, homework), especially in chat, when nothing can be installed, or when they ask for a browser, HTML or no-install version. If Node and npm are available and they want a Remotion project, maths-explainer-video is the alternative.
---

# Maths explainer, anywhere

Turns one maths question into a 45–75 second animated explainer that solves it step by step: title, the question, a named method, one scene per step, the common trap, a check, and the answer. The result is **one HTML file** with no outside dependencies. It opens in any modern browser, plays like a video (play, pause, scrub, jump to a scene), and its **Download video** button turns it into an MP4 using the browser's built-in video encoder.

Everything is drawn by a small engine bundled with this skill (`assets/player.html`). You only write the content for the question, so every explainer has the same look, motion and structure.

## The non-negotiables

These matter more than anything visual, because a polished video that teaches the wrong thing does harm.

- **The maths must be right.** Solve the question, then check the answer a second, independent way (work backwards, estimate, substitute it back in, or count from a diagram) before building anything. If the two disagree, find out why.
- **Copy the question exactly.** Use the exact wording, numbers, units, currency, spelling and answer letters. Names of people *in the question* ("Ella buys 3 notebooks") are part of the question, so keep them as printed.
- **Keep real people out of it.** If the user mentions who the video is for (their child, a student, themselves), don't put that name in the video, the file name or anywhere in the HTML. Write "you" or "the student" instead. The same goes for any other real person, and for school names.
- **Keep tips generic.** Call them "Exam Tip" or "Top Tip", never "<name>'s Tip".
- **Ask when the question is unclear.** If a photo is blurry, a diagram is missing, or the question is ambiguous, ask instead of guessing.
- **No outside code.** The file must work offline: no `<script src>`, no CDN, no fonts or images from the web, no `fetch`. Everything you add goes inside the content block, using the engine's kit.

## Workflow

### 1. Read and solve

1. Transcribe the question word for word, with any answer options and their letters. If it refers to a diagram, describe its measurements and labels precisely.
2. Solve it the way a strong student at that level would; don't use a method above the level of the question.
3. Check the answer a second way.
4. Work out the two or three wrong moves that most often cost marks. For multiple choice, work out where each wrong option comes from; naming those mistakes is the most useful part of the video.

### 2. Plan the scenes, then confirm with the user

Show a short plan before building:

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

#  Scene (secs)              What's on screen
   Title, Question, Method   built in
1  Quarters in 4.5 (8)       a bar per whole, filling → 18
2  Quarters in 2.75 (6.5)    bars → 11
3  Take the difference (6.5) 18 − 11 = 7
   Trap, Check, Answer       built in
```

- **Title:** 2–5 words that name the idea, not the topic ("How Many More Quarters?", not "Fractions Question").
- **Subtitle:** "<Exam> Maths · Step-by-Step" when the user names the exam or level, otherwise "Maths · Step-by-Step".
- **Method:** a short, memorable name for the steps, ideally an acronym where each letter starts a step (C.U.T., B.A.S.E.). If no natural acronym fits, a plain name such as "The 3-step method" is better than a forced one. A step that needs two scenes can repeat its letter.
- **One idea per step scene,** each with a visual (bar, part–whole bar, number line, grid, counters, a drawn shape, or working that builds line by line). Text alone is a slideshow, not an explainer.
- **Timing:** step scenes are 5–9 seconds, and the whole video should stay within 45–75 seconds; the built-in scenes take about 35 seconds, so plan roughly 25–35 seconds of steps. Allow about 0.3 seconds per word of new text, plus a 1.5-second hold at the end.

Wait for the user's go-ahead or changes. If they say to just go ahead, proceed with your plan.

### 3. Build

1. Read `references/style-guide.md`. It's the kit reference: layout, sizes, colours, timing, how to write maths, and every drawing call with examples.
2. Take `assets/player.html` and copy it **exactly**. Replace only the block between the `CONTENT` and `END CONTENT` comments with your `EXPLAINER` object (plus any small helper functions above it). Never edit the engine below it: the shared engine is what keeps every video consistent and working. If you can copy the file directly (a copy command or file tool), do that rather than retyping it.
3. Fill in `title`, `subtitle`, `question`, `hint` (optional), `options`, `answer`, `answerOption`, `method`, `steps`, `traps` (each with the wrong `option` it leads to and a `fix`) and `check`. Leave out `method`, `traps` or `check` only if the plan does.
4. Write each step's `draw(k, t)` with the kit (`k.text`, `k.working`, `k.bar`, `k.barModel`, `k.numberLine`, `k.grid`, `k.counters`, `k.frac`, `k.arrow`, …). Give elements staggered `at` times so the scene builds in reading order.

**Fill the frame.** These are mostly watched on phones. A scene should be one large idea using most of the 1280×720 canvas: put a diagram and its working side by side, and use the big sizes (`k.TYPE.math` for the key line).

### 4. Check

You may have no way to run the file, so check by reading, carefully:

- Go through `references/quality-checklist.md`. For every step, work out where each element sits on the 1280×720 canvas (x from 64 to 1216, y from 64 to 656) and when it appears, and make sure nothing overlaps and the scene is fully built at least 1.5 seconds before it ends.
- Read the on-screen question, numbers, option letters and answer against the original once more.
- If you *can* open the file in a browser, do. Under the player, the engine runs a **layout check** of every scene; it must say "no problems found". Fix anything it lists.

### 5. Deliver

Name the file after the title, e.g. `how-many-more-quarters.html` (never a person's name).

- **You can write files** (Claude Code, an agent with file tools): save the HTML there and give the path.
- **You can make artifacts** (Claude chat): create an HTML artifact with the complete file.
- **Neither:** output the complete file in one ```html code block, and tell the user to save it as `<name>.html` and open it.

Always output or save the **whole** file, engine included; a file with the engine missing or cut short won't play.

Then tell the user how to use it, in a few lines:

- Open the file in Chrome, Edge, Firefox or Safari on a computer. **Play** watches it; the scene menu jumps around.
- **Download video** saves a 1920×1080 MP4 with the correct length, ready for sharing and social media, in under a minute in Chrome, Edge and Safari (about 5 MB per minute of video). Browsers without the built-in video encoder (some Firefox versions) record it in real time instead, as a WebM, so keep that tab open and visible.
- To change anything later, edit the text in the `EXPLAINER` block at the top of the file and reopen it.

## Files in this skill

- `assets/player.html`: the engine and player, with an example `EXPLAINER` block. Copy it whole.
- `references/style-guide.md`: the kit reference and house style. Read it before building.
- `references/quality-checklist.md`: the checks to run before delivering.
