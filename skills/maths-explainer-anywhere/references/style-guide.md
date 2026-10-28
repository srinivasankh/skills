# Style guide and kit reference

Everything here is provided by the engine in `assets/player.html`. You write only the `EXPLAINER` object.

## Contents

1. The `EXPLAINER` object
2. Canvas, layout and timing
3. Colour and type
4. Writing maths on screen
5. Kit reference
6. Step-scene recipes

## 1. The `EXPLAINER` object

```js
const EXPLAINER = {
  title: "How Many More Quarters?",
  subtitle: "11+ Maths · Step-by-Step",
  question: "How many more quarters are there in 4.5 than in 2.75?",
  hint: "",                                  // optional dim line under the question
  options: [["A", "1.75"], ["B", "7"], ["C", "11"], ["D", "18"]],   // [] if none
  answer: "7",
  answerOption: "B",                         // "" if no options
  method: { name: "C.U.T.", steps: [
    { l: "C", w: "Count", d: "the quarters in each number" },
    { l: "U", w: "Use × 4", d: "4 quarters make 1 whole" },
    { l: "T", w: "Take away", d: "the smaller count from the bigger" },
  ] },
  steps: [                                   // your scenes, in order
    { name: "Quarters in 4.5", seconds: 8, badge: "C", title: "Count the quarters in 4.5",
      draw: (k, t) => { /* kit calls */ } },
  ],
  traps: [                                   // most common first; traps[0] gets its own scene
    { text: "Subtracting first: 4.5 − 2.75 = 1.75", option: "A",
      fix: "Count quarters, not wholes: 18 − 11 = 7" },
    { text: "Stopping at one count: 11 (C) or 18 (D)", option: "C, D" },   // several letters OK
  ],
  check: { lines: ["(4.5 − 2.75) × 4", "= 1.75 × 4 = 7"] },   // or { draw: (k, t) => … }
};
```

Engine-built scenes, in order: **Title** (3 s), **Question** (timed by its length, 6–12 s), **Method** (5.5 s), then your **steps**, then **The trap** (7 s, from `traps[0]`), **Check** (5.5 s, or `check.seconds`), **Answer** (8 s). Each step scene automatically gets a gold badge with `badge` and `title` at the top left (y ≈ 96), so your drawing starts below it.

On the answer scene, every option is shown: `answerOption` in green, each trap's `option` in red, the rest faded. A long answer such as "(−2, −4)" sits above the traps list.

**Questions with no options:** use `options: []`, `answerOption: ""` and `option: ""` on each trap. The answer can be written as the student would ("x = 8", "(−2, −4)").

**Traps:** the answer scene lists every trap's `text` in a narrow column, so keep each `text` short (under about 50 characters) and put the explanation in `fix`, which only `traps[0]` shows, on the trap scene.

**Helpers:** you may define small helper functions inside the content block, above `EXPLAINER`, when several steps share a drawing (e.g. the same grid and triangle). Keep them to kit calls.

Text values (`question`, `hint`, trap `text`/`fix`, `check.lines`, and any `k.text`) can be:
- a plain string (`"\n"` starts a new line in `question`, trap texts, `check` lines and `k.paragraph`);
- or a list of pieces for inline colour: `["Count up from ", ["£4.85", k.BLUE], " to £10"]`. A piece is `[text, colour, weight]`. Inside `EXPLAINER` (outside `draw`) write colours as hex: `"#60a5fa"`.

## 2. Canvas, layout and timing

- The canvas is **1280 × 720** (the download is 1920 × 1080). Keep content between **x 64 and 1216, y 64 and 656**. The engine warns if anything reaches the edge.
- **Fill the frame.** A finished scene should use about 70–85% of the width or height. Small content floating in empty space looks unfinished and is hard to read on a phone.
- In step scenes the badge takes y ≈ 70–120; use **y 150–650** for the content.
- **Two-column layout** for a diagram plus working: diagram in x 80–660, working from x 720 (or the diagram in the left 55%).
- **Times are seconds into the scene.** Every kit call takes `at` (when it appears). Stagger related items 0.5–0.8 s apart, in reading order: question before answer, working before result.
- **Finish early.** Everything should be on screen at least 1.5 s before the scene ends. Reading time is about 0.3 s per word.
- Motion should show the maths (a bar filling, a jump on a number line, an arrow to the image point), not decorate. Elements rise in by default; numbers that should land use `anim: "pop"`.

## 3. Colour and type

Each colour has one meaning in every video:

| Colour | Meaning |
| --- | --- |
| `k.GOLD` | the focus: the key number, the answer, the method letters |
| `k.GREEN` | correct, "do this", checks that pass, an operation done to both sides |
| `k.RED` | traps, wrong answers |
| `k.BLUE` | the first quantity when two are compared |
| `k.PURPLE` | the second quantity when two are compared |
| `k.WHITE` | normal text and working; amounts that are given but not compared |
| `k.GREY` | a given amount drawn as a filled shape (e.g. the change in a bar model), where white would hide the label |
| `k.DIM` | hints, labels, explanations |

Reference lines (axes, mirror lines) are white or dim, dashed when not part of the answer. A number keeps its colour every time it appears. Use `k.tint(colour, alpha)` for translucent fills (0.3–0.4 for shaded shapes); it takes the hex colours, not `k.DIM`.

Sizes (`k.TYPE`, px on the 1280 × 720 canvas): `hero` 84 · `answer` 170 · `math` 58 (the key line of working) · `heading` 46 · `body` 40 · `small` 32 · `caption` 26. Nothing goes below 24. `k.text` shrinks over-long text to fit, but never below 24, and warns instead.

## 4. Writing maths on screen

- **Minus:** type the true minus sign `−` (U+2212), never the hyphen `-`, in maths: `"5x − 15"`. For computed numbers use `k.num(v)`, which also removes floating-point noise.
- **× and ÷** at primary level; follow the question's own notation otherwise.
- **Fractions:** draw them with `k.frac(top, bottom, x, y)`, not ½-style characters or `3/8` (unless the question prints it that way).
- **Ticks and crosses:** `k.tick` and `k.cross`, which are drawn; don't type ✓ or ✗.
- **No emoji.** They differ from machine to machine. Draw objects as shapes: discs for people and counters, rectangles for cards and notebooks.
- Safe symbols to type: `× ÷ − ± ≤ ≥ ≠ √ π ° ² ³ → £ € $ % ·`.
- Copy units and money from the question (`£4.50`, `75p`, `3 cm`, `cm²`).

## 5. Kit reference

`k.t` is the time into the scene. Every call takes the options `at` (start time, default 0) and, for most calls, `anim` (`"rise"` default, `"fade"`, `"pop"`, `"none"`). Positions are canvas pixels.

| Call | Draws | Main options |
| --- | --- | --- |
| `k.text(s, x, y, o)` | one line; `y` is its middle | `size` (40), `weight` (700), `colour`, `align` (`"left"`/`"center"`/`"right"`), `maxWidth` |
| `k.paragraph(s, x, y, o)` | wrapped text from top `y`; returns its height | `width` (800), `size`, `weight` (400), `align`, `lineStagger` |
| `k.working({x, y, lines, …})` | lines appearing in turn; the last is the result, in gold | `size` (40), `gap` (0.8 s), `align`, `resultColour` |
| `k.card(x, y, w, h, o)` | rounded translucent panel | `colour`, `fill` (0.08) |
| `k.frac(top, bottom, x, y, o)` | stacked fraction centred on (x, y) | `size`, `colour` |
| `k.tick(x, y, o)` / `k.cross(x, y, o)` | drawn tick / cross | `size` (36), `colour` |
| `k.line(x1, y1, x2, y2, o)` | line that draws itself | `colour`, `width` (3), `dash` ([10, 8]), `dur` (0.6) |
| `k.arrow(x1, y1, x2, y2, o)` | arrow that draws itself | as `line`, `width` 4 |
| `k.polygon([[x, y], …], o)` | filled/outlined shape (fades in) | `fill`, `stroke`, `width` |
| `k.dot(x, y, o)` | dot with optional label (pops in) | `r` (10), `colour`, `label`, `dx`/`dy` (label offset, 16/−22) |
| `k.bar({x, y, parts, filled, …})` | bar cut into `parts`, `filled` shaded (fractional OK) | `width` (760), `height` (88), `colour`, `label` |
| `k.barModel({x, y, parts, …})` | part–whole bar; `parts: [{value, label, colour}]` | `width` (1000), `height` (96), `total` (label above) |
| `k.numberLine({x, y, min, max, …})` | number line; returns `X(v)` → x pixel | `step`, `labelEvery`, `width` (1080), `format` (label text, e.g. `(v) => "£" + v`), `marks: [{value, colour, label}]`, `jumps: [{from, to, label, colour}]` |
| `k.grid({x, y, xMin, xMax, yMin, yMax, …})` | coordinate grid; returns `p(x, y)` → `[px, py]` | `height` (560) or `unit` (px per square) |
| `k.counters({x, y, count, …})` | discs popping in | `perRow` (10), `size` (44), `colour`, `highlight`, `highlightColour`, `stagger` (0.1) |
| `k.badge(tag, label, x, y, o)` | gold step badge (steps get one automatically) | `tag` may be `"tick"` |

Also available: `k.W`, `k.H` (1280, 720), `k.SAFE` (64), `k.TYPE`, the colours, `k.tint`, `k.num`, and `k.ctx`, the raw canvas context, for anything unusual (draw inside `k.ctx.save()` / `k.ctx.restore()`).

## 6. Step-scene recipes

**Working beside a part–whole bar**

```js
draw: (k) => {
  k.barModel({ x: 140, y: 200, width: 1000, total: "Everything she bought: £5.15", at: 0.3, parts: [
    { value: 4.05, label: "3 notebooks £4.05", colour: k.PURPLE },
    { value: 1.10, label: "pen ?", colour: k.GOLD } ] });
  k.working({ x: 640, y: 430, align: "center", size: k.TYPE.math, at: 1.6,
    lines: [[["£5.15", k.BLUE], " − ", ["£4.05", k.PURPLE]], "= £1.10"] });
}
```

**A jump on a number line**

```js
draw: (k) => {
  k.numberLine({ x: 100, y: 330, min: 0, max: 5, step: 0.25, labelEvery: 4, width: 1080, at: 0.3,
    marks: [{ value: 2.75, colour: k.PURPLE, label: "2.75" }, { value: 4.5, colour: k.BLUE, label: "4.5" }],
    jumps: [{ from: 2.75, to: 4.5, label: "+1.75" }] });
  k.text(["That's ", ["1.75", k.GOLD], " wholes, or 7 quarters"], 640, 560, { align: "center", at: 3 });
}
```

**A reflection on a grid** (the diagram on the left, the working on the right)

```js
draw: (k) => {
  const p = k.grid({ x: 80, y: 140, xMin: -5, xMax: 5, yMin: -5, yMax: 5, height: 520, at: 0.2 });
  k.line(...p(-5, 5), ...p(5, -5), { colour: k.WHITE, dash: [10, 8], at: 0.6, dur: 0.8 });
  k.polygon([p(1, 2), p(4, 2), p(1, 4)], { fill: k.tint(k.BLUE, 0.35), stroke: k.BLUE, at: 1.2 });
  k.dot(...p(4, 2), { colour: k.BLUE, label: "(4, 2)", at: 1.6 });
  k.arrow(...p(4, 2), ...p(-2, -4), { colour: k.GOLD, at: 2.4, dur: 0.8 });
  k.dot(...p(-2, -4), { colour: k.GOLD, label: "(−2, −4)", dx: 18, dy: 0, at: 3.2 });
  k.working({ x: 720, y: 300, size: k.TYPE.math, at: 1.8, lines: ["(4, 2)", "swap → (2, 4)", "signs → (−2, −4)"] });
}
```

**Fractions as bars**

```js
draw: (k) => {
  [4, 4, 4, 4, 2].forEach((f, i) =>
    k.bar({ x: 90 + i * 225, y: 260, parts: 4, filled: f, width: 200, height: 70, at: 0.4 + i * 0.4 }));
  k.text(["4.5 = ", ["18", k.GOLD], " quarters"], 640, 470, { size: k.TYPE.math, align: "center", at: 2.8 });
}
```

**Counting objects** (draw people and things as shapes, never emoji)

```js
draw: (k) => {
  k.counters({ x: 120, y: 220, count: 12, perRow: 6, size: 64, highlight: 4, at: 0.3 });
  k.working({ x: 760, y: 260, size: k.TYPE.math, at: 1.8, lines: ["12 ÷ 3 = 4", "4 in each group"] });
}
```

For a shape question (area, angles, perimeter), draw the shape with `k.polygon` and `k.line` at a fixed scale (e.g. 1 cm = 40 px), label every given length with `k.text`, and draw what you're finding in gold. Draw it to scale whenever the numbers allow, so the picture never contradicts the maths.
