import { Easing, interpolate } from "remotion";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** Opacity 0 → 1 over `duration` frames from `start`. */
export const fadeIn = (frame: number, start = 0, duration = 20) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

/** Vertical offset in px, `dist` → 0. Pair with `fadeIn` for a rise-in. */
export const slideUp = (frame: number, start = 0, duration = 20, dist = 28) =>
  interpolate(frame, [start, start + duration], [dist, 0], {
    ...clamp,
    easing: easeOut,
  });

/** Scale 0.6 → 1 with a slight overshoot, over 14 frames from `start`. */
export const popIn = (frame: number, start = 0) =>
  interpolate(frame, [start, start + 14], [0.6, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

/** Progress 0 → 1, for drawing lines, filling bars and counting up. */
export const grow = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: easeOut,
  });

/** Style for an element that rises in at `start`. */
export const riseIn = (frame: number, start = 0, duration = 18) => ({
  opacity: fadeIn(frame, start, duration),
  translate: `0px ${slideUp(frame, start, duration)}px`,
});
