import { fontFamily } from "./fonts";

export { fontFamily };

/** Spread into every scene's root style. */
export const BASE: React.CSSProperties = { fontFamily };

/**
 * Equal-width digits, for columns of numbers that must line up (a sum laid
 * out vertically, a table). Only use it there: in Inter it also widens
 * hyphens, brackets and signs, which looks odd in ordinary text.
 */
export const TABULAR: React.CSSProperties = { fontVariantNumeric: "tabular-nums" };

// ─── palette ────────────────────────────────────────────────────────────────
// Each colour has one job. Keep to it so viewers learn what colour means.

/** Deep indigo of the backdrop; also text on gold badges. */
export const INK = "#0d0b2b";
/** The focus: titles, the key number, the answer. */
export const GOLD = "#fbbf24";
/** Correct, checks that pass, "do this". */
export const GREEN = "#4ade80";
/** Traps, wrong answers, "don't do this". */
export const RED = "#f87171";
/** First quantity when two are compared. */
export const BLUE = "#60a5fa";
/** Second quantity when two are compared. */
export const PURPLE = "#c084fc";
/** Supporting text: hints, labels, explanations. */
export const DIM = "rgba(255,255,255,0.62)";
export const WHITE = "#ffffff";

/** Translucent fills for cards and highlighted regions. */
export const tint = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};

// ─── type scale (px at 1280×720) ────────────────────────────────────────────
// Big on purpose: the video is often watched on a phone, and a scene should
// read as one large idea, not a page of small text. Nothing goes below CAPTION.

export const TYPE = {
  hero: 84, // title scene
  answer: 170, // the answer reveal
  math: 58, // the key line of working in a scene
  heading: 46, // scene headings
  body: 40, // main text and working
  small: 32, // supporting lines
  caption: 26, // labels on diagrams
} as const;

/** Keep content this far from every edge. */
export const SAFE = 64;

/**
 * A number as it should appear on screen: a true minus sign (−, not the
 * hyphen -) and no floating-point noise (0.1 + 0.2 shows as 0.3).
 */
export const num = (v: number) =>
  String(Number(v.toFixed(6))).replace("-", "−");
