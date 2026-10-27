# Quality checklist

Go through this with the stills from `npm run stills` open. Each still is taken near the end of its scene, when everything should be on screen. Fix every "no", re-run the stills, and check again.

## Correctness

- [ ] The question on screen matches the original word for word: numbers, units, names and option letters.
- [ ] Every number in the working is right, and the answer is the one you checked two ways.
- [ ] The answer scene shows the right option in green, and each trap's wrong option in red.
- [ ] Each trap really does lead to the wrong answer it claims (do the wrong calculation yourself).
- [ ] Diagrams agree with the numbers: bars filled to the right amount, points at the right coordinates, shapes in proportion.

## Readability

- [ ] Each scene fills the frame: content spans about 70–85% of the width or height, with no empty third. Small content should be scaled up.
- [ ] No text is cut off, overlapping, or touching the frame edge (content stays 64 px clear).
- [ ] No line of text is longer than about 12 words, and nothing is smaller than 24 px.
- [ ] Each scene has one clear focus; the eye knows where to look first.
- [ ] Nothing is rendered as an empty box (□) or a fallback glyph: fractions use `Frac`, ticks and crosses are the drawn components, and there are no emoji.
- [ ] Minus signs in maths are `−`, not `-`.

## Consistency

- [ ] Colours follow their meanings: gold = focus and answer, green = correct, red = trap, blue and purple = the two quantities being compared.
- [ ] A number keeps the same colour every time it appears.
- [ ] Every step scene has a `StepBadge` whose letter matches the method.
- [ ] The scene order is title → question → method → steps → trap → (check) → answer.

## Timing

- [ ] In the stills, each scene is fully built: nothing is still faded or mid-animation. If something is, it starts too late. Move it earlier or lengthen the scene.
- [ ] The total length is 45–75 seconds, and no scene is shorter than 4 seconds.

## Privacy and wording

- [ ] No real person's name (the user, a child, a teacher, a school) appears on screen, in file or folder names, or in the README. Character names from the question are fine.
- [ ] Tips are generic ("Exam Tip"), not personal.
- [ ] `grep -rn TODO src/ README.md` finds nothing.

## Deliverables

- [ ] `npm run lint` passes.
- [ ] `out/<name>.mp4` exists, is 1920×1080, and its length matches the scene plan.
- [ ] `out/thumbnail.png` shows the title scene.
- [ ] The project README has the question, the answer, the method and the scene table.
