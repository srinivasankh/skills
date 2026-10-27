# Style guide

The house style that makes every video look like part of one series. Everything named here is exported from `src/style` in the project.

## Contents

1. Canvas and layout
2. Type
3. Colour
4. Motion and timing
5. Writing maths on screen
6. Diagrams
7. Scene patterns

## 1. Canvas and layout

- The layout canvas is **1280×720** at 30 fps, and the render scales it to 1920×1080. Write every size and position for 1280×720.
- Keep content at least `SAFE` (64 px) from every edge. The drifting `Dots` are decoration and may sit outside this margin.
- **Fill the frame.** A finished scene's content should span about 70–85% of the frame width or height. Small content floating in empty space looks unfinished, and it's hard to read on a phone. If a still shows an empty third of the frame, make the content bigger.
- Use one focal area per scene. Centre single-block scenes (title, question, trap, check) with the `centred` style. Left-align step scenes that build down the screen (`leftAligned`).
- For a step with a diagram, put the diagram and the working **side by side** (a row with a gap of 48–64 px), with the diagram taking 50–60% of the width and most of the height. Don't stack a small diagram above small text.
- Keep text blocks 1120 px wide or less, and lines under about 12 words. Break long lines yourself with `<br />` where the meaning splits; don't leave it to automatic wrapping.

## 2. Type

The fonts are Inter (words and numbers) and Noto Sans Math (symbols). Both are bundled and loaded in `src/style/fonts.ts`. Use the `TYPE` scale rather than one-off sizes:

| Token | px | Use |
| --- | --- | --- |
| `TYPE.hero` | 84 | the title |
| `TYPE.answer` | 170 | the answer reveal |
| `TYPE.math` | 58 | the key line of working in a scene |
| `TYPE.heading` | 46 | scene headings |
| `TYPE.body` | 40 | main text, the question, working |
| `TYPE.small` | 32 | supporting lines and explanations |
| `TYPE.caption` | 26 | labels on diagrams |

Nothing goes below 24 px (grid axis numbers on a crowded grid may go to 22). It has to be readable on a phone. Don't set `tabular-nums` on whole scenes: in Inter it also widens hyphens, brackets and signs. Spread `TABULAR` only onto columns of numbers that must line up. Weights: 900 for numbers that matter and headings, 800 for labels, 700 for working, 400 for running text.

## 3. Colour

Each colour has one meaning across all videos. Viewers learn the code quickly, so breaking it confuses them.

| Token | Meaning |
| --- | --- |
| `GOLD` | the focus: titles, the key number, the answer, the method letters |
| `GREEN` | correct, "do this", checks that pass |
| `RED` | traps, wrong answers, "don't do this" |
| `BLUE` | the first quantity when two are compared |
| `PURPLE` | the second quantity when two are compared |
| `WHITE` | normal text and working; amounts that are given but not being compared |
| `DIM` | hints, labels, explanations |

Two more conventions:

- **Reference lines** (axes, mirror lines, lines of symmetry, guide lines) are white or `DIM`, dashed when they're not part of the answer.
- **An operation done to both sides** (− 2x, + 15, ÷ 3 on a balance or in working) is `GREEN`, as the move that keeps the equation true.

When a number appears in the question and again in the working, give it the same colour both times (`<Em colour={BLUE}>3.5</Em>`), so viewers can follow it. Use `tint(colour, alpha)` for translucent fills (0.08 for cards, 0.3–0.75 for shaded regions). The background is always `Background` + `Dots`. Don't add new colours for meaning; if a diagram needs more categories, use tints of these.

## 4. Motion and timing

- Every element enters with a helper: `riseIn` (fade + rise, the default), `fadeIn`, `popIn` (for numbers and badges that should land), or `grow` (for lines, fills and count-ups). Nothing just appears.
- **Stagger** related items 15–25 frames apart, in reading order. Show the question before the answer, and the working before the result.
- **Finish building early.** Everything in a scene should be on screen at least 45 frames (1.5 s) before the scene ends, so viewers can read it.
- Reading time: allow roughly 9 frames (0.3 s) per word of new on-screen text, plus the 1.5 s hold. A long question needs it: a 30-word question is about 11 s (330 frames). Lengthen the scene rather than cutting the question.
- There are no transitions between scenes beyond the cut; the shared background makes cuts feel continuous. Don't add spins, bounces or idle wobbling. Motion should show the maths (a bar filling, a jump along a number line, a shape turning), not decorate.
- Scene lengths: title 90 frames; question 180–360 (by the reading-time rule); method 150–180; steps 150–270; trap 180–240; check 120–180; answer 210–240.

## 5. Writing maths on screen

- **Minus:** use the true minus sign `−` (U+2212), not the hyphen `-`, in all on-screen maths. `num(-3)` formats numbers this way. A hyphen is fine in words ("Step-by-Step").
- **Multiply and divide:** use `×` and `÷` in primary-level work. Use `·` or juxtaposition only if the question itself does.
- **Fractions:** use `<Frac top="3" bottom="8" />`, not ½-style characters (those exist for only a few fractions, and the font lacks most of them) and not `3/8` in working. Slash notation is fine only where the question prints it that way, inside the question text.
- **Ticks and crosses:** use the `<Tick />` and `<Cross />` components; the fonts lack ✓ and ✗.
- **No emoji.** They render differently or not at all from machine to machine, which breaks consistency. Draw objects as simple shapes (discs for people or counters, rectangles for cards or bars, SVG for anything else).
- **Units and money:** copy the question (`£4.50`, `$12`, `75p`, `3 cm`, `cm²`). Put a space between a number and a unit, but not after a currency sign.
- **Large numbers:** use digit grouping as the question does (`12,500` or `12 500`).
- **Decimals:** keep the precision of the question. Don't show floating-point noise (`num` handles it).
- `Em` highlights a word or number inside text; `WorkingLines` builds a sequence of lines.

## 6. Diagrams

These are in `src/style/diagrams.tsx`. Each draws itself in from a `start` frame relative to its scene.

| Component | Good for | Key props |
| --- | --- | --- |
| `Bar` | fractions, ratio, "how many ___ in ___", comparing amounts | `parts`, `filled` (can be fractional), `width` (default 760), `colour`, `label`, `start` |
| `NumberLine` | counting on, differences, negatives, rounding, timelines | `min`, `max`, `step`, `labelEvery`, `marks`, `jumps`, `start` |
| `CoordinateGrid` | coordinates, reflections, rotations, translations, straight-line graphs | `xMin`…`yMax`, `height` (default 600, most of the frame), or a fixed `unit`; children get `p(x, y)` → pixels |
| `BarModel` | part–whole: money spent vs change, shares, "what's left" | `parts` (`value`, `label`, `colour`), `total`, `width`, `start` |
| `Counters` | sharing, grouping, arrays, counting people or objects | `count`, `perRow`, `highlight`, `colour`, `start`, `stagger` |
| `WorkingLines` | multi-step calculations | `lines` (the last line is the result, in gold), `start`, `gap` |

Examples:

```tsx
// 4½ quarters-bars in a row, each filling in turn
<div style={{ display: "flex", gap: 14 }}>
  {[4, 4, 4, 4, 2].map((f, i) => (
    <Bar key={i} parts={4} filled={f} width={190} height={60} start={20 + i * 14} />
  ))}
</div>

// Part–whole: what she spent is the notebooks plus the unknown pen
<BarModel total="Everything she bought: £5.15" start={10} parts={[
  { value: 4.05, label: "3 notebooks £4.05", colour: PURPLE },
  { value: 1.10, label: "pen ?", colour: GOLD },
]} />

// A jump from 2.75 to 4.5 on a number line
<NumberLine min={0} max={5} step={0.25} labelEvery={4}
  marks={[{ value: 2.75, colour: PURPLE }, { value: 4.5, colour: BLUE }]}
  jumps={[{ from: 2.75, to: 4.5, label: "+1.75" }]} start={10} />

// A shape on a grid, reflected
<CoordinateGrid xMin={-5} xMax={5} yMin={-5} yMax={5} height={600}>
  {(p) => (
    <polygon points={[p(1, 1), p(3, 1), p(3, 2)].map((q) => q.join(",")).join(" ")}
      fill={tint(GOLD, 0.3)} stroke={GOLD} strokeWidth={3} />
  )}
</CoordinateGrid>

// Working, line by line
<WorkingLines start={20} lines={[
  <>4.5 × 4 = <Em colour={BLUE}>18</Em></>,
  <>2.75 × 4 = <Em colour={PURPLE}>11</Em></>,
  <>18 − 11 = 7</>,
]} />
```

For a shape question (areas, angles, perimeters), draw the shape as an inline SVG sized in "cm-to-px" units (for example 1 cm = 40 px). Label every given length, and draw what you're finding in gold. Animate by fading in labels and filling regions with `grow`. Draw the shape to scale whenever the question's numbers allow it, so the picture never contradicts the maths.

## 7. Scene patterns

- **Title:** title + subtitle only, centred. It's also the thumbnail (frame 60).
- **Question:** the "The Question" label, the question card, then the options popping in one by one. A short question (a single equation, 40 characters or fewer) is shown big automatically; add a `DIM` line under it saying what to find. If the question has a diagram, draw it beside the card, large enough that every label is at least 24 px; if it can't be that big, leave it for the first step scene.
- **Method:** the method name in gold, then one row per letter (letter tile, word, short meaning in `DIM`).
- **Step:** a `StepBadge` with the method letter and what this step does (a step that needs two scenes uses the same letter on both), then the visual and the working side by side, with the result in gold at `TYPE.math`. Show only one new idea per step.
- **Trap:** "Watch out!", then two `Card`s side by side: the wrong move in red (with the wrong answer it leads to, and the option letter if there is one), and the right move in green.
- **Check:** a `StepBadge` with the tick icon and a second, independent way to confirm the answer.
- **Answer:** for multiple choice, the row of options first, with the right one in green and each trap's option in red (set `ANSWER_OPTION`, and `option` on each trap). Then the big gold answer beside "Traps to avoid" (two or three, each with a cross), then "Well done!".
