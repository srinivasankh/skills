# Quality checklist

Run through this before delivering. If you can open the file in a browser, also check that the **layout check** under the player says "no problems found". Otherwise check by reading the code against the 1280 × 720 canvas.

## Correctness

- [ ] `question` matches the original word for word: numbers, units, names and option letters.
- [ ] Every number in the working is right, and `answer` is the one you checked two ways.
- [ ] `answerOption` is the right letter, and each trap's `option` names the wrong option(s) it really leads to (do the wrong calculation yourself).
- [ ] Diagrams agree with the numbers: bars filled to the right amount, points at the right coordinates, shapes in proportion.

## Layout (per step scene)

- [ ] Everything sits inside x 64–1216 and y 150–656 (the badge takes the top). Work out each element's extent: a `k.text` line is about `size × 0.55` px per character wide, and the diagrams' sizes are in the style guide.
- [ ] Nothing overlaps: in particular, dot labels against grid lines, and working against diagrams.
- [ ] The scene fills the frame: content spans about 70–85% of the width or height, with no empty half.
- [ ] Every `at` is in reading order, and the last element appears at least 1.5 s before the scene's `seconds` run out.

## Text and symbols

- [ ] True minus signs `−` in all maths (search the content block for ` - ` and `(-`), or `k.num()` for computed values.
- [ ] Fractions use `k.frac`; ticks and crosses use `k.tick`/`k.cross`; there's no emoji and no ½-style character.
- [ ] No line is longer than about 12 words; long text uses `k.paragraph`.
- [ ] Colours follow their meanings, and a number keeps the same colour throughout.

## Privacy and wording

- [ ] No real person's name (the user, a child, a teacher, a school) anywhere in the file or its name. Names in the question itself are fine.
- [ ] Tips are generic ("Exam Tip").
- [ ] No `TODO` left in the content block.

## The file

- [ ] The engine is copied exactly and completely, from `<!doctype html>` to `</html>`, and only the content block changed.
- [ ] No `<script src>`, links or other outside resources were added.
- [ ] The content block is valid JavaScript: every object and array closed, commas between items, strings quoted.
- [ ] The file is named after the title (e.g. `how-many-more-quarters.html`).
