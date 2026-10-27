// Ready-made, animated diagrams for the most common kinds of maths question.
// Each one draws itself in from a `start` frame (relative to its Sequence).
// Use them as they are, combine them, or copy one and adapt it.
import { useCurrentFrame } from "remotion";
import { fadeIn, grow, popIn, riseIn } from "./motion";
import { BLUE, DIM, GOLD, TYPE, WHITE, fontFamily, num, tint } from "./theme";

// ─── Bar ────────────────────────────────────────────────────────────────────

/**
 * A bar cut into `parts` equal pieces with `filled` of them shaded (may be
 * fractional, e.g. 3.5). Good for fractions, ratio, "how many ___ in ___",
 * and comparing amounts. The fill sweeps in from `start`.
 */
export const Bar: React.FC<{
  parts: number;
  filled: number;
  width?: number;
  height?: number;
  colour?: string;
  start?: number;
  label?: React.ReactNode;
}> = ({ parts, filled, width = 760, height = 88, colour = BLUE, start = 0, label }) => {
  const frame = useCurrentFrame();
  const share = Math.min(1, filled / parts) * grow(frame, start, 24);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          position: "relative",
          width,
          height,
          borderRadius: 14,
          border: `3px solid ${colour}`,
          background: tint(colour, 0.08),
          overflow: "hidden",
          opacity: fadeIn(frame, start - 10, 12),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${share * 100}%`,
            background: tint(colour, 0.75),
          }}
        />
        {Array.from({ length: parts - 1 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${((i + 1) / parts) * 100}%`,
              width: 2,
              marginLeft: -1,
              background: tint("#000000", 0.55),
            }}
          />
        ))}
      </div>
      {label !== undefined && (
        <div
          style={{
            fontFamily,
            fontSize: TYPE.small,
            fontWeight: 800,
            color: colour,
            opacity: fadeIn(frame, start + 18, 12),
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ─── NumberLine ─────────────────────────────────────────────────────────────

export type Jump = { from: number; to: number; label?: string; colour?: string };

/**
 * A number line from `min` to `max` with a tick every `step` (labelled every
 * `labelEvery` ticks). `marks` are highlighted points; `jumps` are arcs drawn
 * one after another from `start`. Good for counting on, differences,
 * negative numbers, rounding and timelines.
 */
export const NumberLine: React.FC<{
  min: number;
  max: number;
  step?: number;
  labelEvery?: number;
  width?: number;
  marks?: { value: number; colour?: string; label?: string }[];
  jumps?: Jump[];
  start?: number;
}> = ({
  min,
  max,
  step = 1,
  labelEvery = 1,
  width = 1080,
  marks = [],
  jumps = [],
  start = 0,
}) => {
  const frame = useCurrentFrame();
  const pad = 34;
  const h = 240;
  const y = 150;
  const x = (v: number) => pad + ((v - min) / (max - min)) * (width - 2 * pad);
  const ticks = Math.round((max - min) / step);
  const lineGrow = grow(frame, start, 20);
  return (
    <svg width={width} height={h} style={{ overflow: "visible", fontFamily }}>
      <line
        x1={x(min)}
        y1={y}
        x2={x(min) + (x(max) - x(min)) * lineGrow}
        y2={y}
        stroke={WHITE}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const v = min + i * step;
        const labelled = i % labelEvery === 0;
        return (
          <g key={i} opacity={fadeIn(frame, start + 6 + i * 0.6, 10)}>
            <line x1={x(v)} y1={y - (labelled ? 14 : 8)} x2={x(v)} y2={y + (labelled ? 14 : 8)} stroke={WHITE} strokeWidth={2.5} />
            {labelled && (
              <text x={x(v)} y={y + 50} fill={DIM} fontSize={TYPE.caption} fontWeight={700} textAnchor="middle">
                {num(v)}
              </text>
            )}
          </g>
        );
      })}
      {jumps.map((j, i) => {
        const s = start + 30 + i * 22;
        const x1 = x(j.from);
        const x2 = x(j.to);
        const lift = Math.min(90, 26 + Math.abs(x2 - x1) * 0.35);
        const d = `M ${x1} ${y - 4} Q ${(x1 + x2) / 2} ${y - lift * 2} ${x2} ${y - 4}`;
        const len = Math.abs(x2 - x1) * 1.6 + 40;
        const p = grow(frame, s, 18);
        const c = j.colour ?? GOLD;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
            {j.label && (
              <text x={(x1 + x2) / 2} y={y - lift - 14} fill={c} fontSize={TYPE.small} fontWeight={900} textAnchor="middle" opacity={fadeIn(frame, s + 12, 10)}>
                {j.label}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => {
        const c = m.colour ?? GOLD;
        const s = start + 24 + i * 8;
        return (
          <g key={i} opacity={fadeIn(frame, s, 10)}>
            <circle cx={x(m.value)} cy={y} r={12 * popIn(frame, s)} fill={c} />
            {m.label && (
              <text x={x(m.value)} y={y + 88} fill={c} fontSize={TYPE.small} fontWeight={900} textAnchor="middle">
                {m.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ─── CoordinateGrid ─────────────────────────────────────────────────────────

/**
 * A square grid with axes from (xMin, yMin) to (xMax, yMax). It sizes itself
 * so the grid is `height` px tall (default 600: most of the frame); pass
 * `unit` (px per square) instead to fix the square size. `children` receives `p(x, y)`, which converts maths coordinates to
 * SVG pixels, so you can draw points, lines and shapes on top:
 *
 *   <CoordinateGrid xMin={-5} xMax={5} yMin={-5} yMax={5}>
 *     {(p) => <circle cx={p(1, -2)[0]} cy={p(1, -2)[1]} r={9} fill={GOLD} />}
 *   </CoordinateGrid>
 *
 * Good for coordinates, reflections, rotations, translations and graphs.
 */
export const CoordinateGrid: React.FC<{
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  height?: number;
  unit?: number;
  start?: number;
  children?: (p: (x: number, y: number) => [number, number]) => React.ReactNode;
}> = ({ xMin, xMax, yMin, yMax, height = 600, unit: fixedUnit, start = 0, children }) => {
  const frame = useCurrentFrame();
  const pad = 34;
  const unit = fixedUnit ?? (height - pad * 2) / (yMax - yMin);
  // Axis numbers: as big as the squares allow, but never unreadable.
  const labelSize = Math.max(20, Math.min(TYPE.caption, unit * 0.42));
  const w = (xMax - xMin) * unit + pad * 2;
  const h = (yMax - yMin) * unit + pad * 2;
  const p = (x: number, y: number): [number, number] => [
    pad + (x - xMin) * unit,
    pad + (yMax - y) * unit,
  ];
  const xs = Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i);
  const ys = Array.from({ length: yMax - yMin + 1 }, (_, i) => yMin + i);
  const [ox, oy] = p(0, 0);
  const showX = yMin <= 0 && yMax >= 0;
  const showY = xMin <= 0 && xMax >= 0;
  return (
    <svg width={w} height={h} style={{ fontFamily, opacity: fadeIn(frame, start, 16), overflow: "visible" }}>
      {xs.map((x) => (
        <line key={`x${x}`} x1={p(x, 0)[0]} y1={pad} x2={p(x, 0)[0]} y2={h - pad} stroke={tint(WHITE, 0.14)} strokeWidth={1.5} />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} x1={pad} y1={p(0, y)[1]} x2={w - pad} y2={p(0, y)[1]} stroke={tint(WHITE, 0.14)} strokeWidth={1.5} />
      ))}
      {showX && <line x1={pad} y1={oy} x2={w - pad} y2={oy} stroke={WHITE} strokeWidth={3} />}
      {showY && <line x1={ox} y1={pad} x2={ox} y2={h - pad} stroke={WHITE} strokeWidth={3} />}
      {showX &&
        xs.filter((x) => x !== 0).map((x) => (
          <text key={`lx${x}`} x={p(x, 0)[0]} y={oy + labelSize + 8} fill={DIM} fontSize={labelSize} fontWeight={700} textAnchor="middle">
            {num(x)}
          </text>
        ))}
      {showY &&
        ys.filter((y) => y !== 0).map((y) => (
          <text key={`ly${y}`} x={ox - 10} y={p(0, y)[1] + labelSize * 0.35} fill={DIM} fontSize={labelSize} fontWeight={700} textAnchor="end">
            {num(y)}
          </text>
        ))}
      {children?.(p)}
    </svg>
  );
};

// ─── Counters ───────────────────────────────────────────────────────────────

/**
 * `count` discs in rows of `perRow`, popping in one by one from `start`.
 * The first `highlight` discs use `highlightColour`. Good for sharing,
 * grouping, multiplication as arrays, and counting people or objects
 * (draw people and objects as shapes like this, not emoji).
 */
export const Counters: React.FC<{
  count: number;
  perRow?: number;
  size?: number;
  colour?: string;
  highlight?: number;
  highlightColour?: string;
  start?: number;
  stagger?: number;
}> = ({
  count,
  perRow = 10,
  size = 44,
  colour = BLUE,
  highlight = 0,
  highlightColour = GOLD,
  start = 0,
  stagger = 3,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(perRow, count)}, ${size}px)`, gap: size * 0.35 }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: i < highlight ? highlightColour : colour,
            opacity: fadeIn(frame, start + i * stagger, 8),
            scale: String(popIn(frame, start + i * stagger)),
          }}
        />
      ))}
    </div>
  );
};

// ─── WorkingLines ───────────────────────────────────────────────────────────

/**
 * Lines of working that appear one after another, `gap` frames apart, from
 * `start`. The last line is the result and is drawn in `resultColour`.
 */
export const WorkingLines: React.FC<{
  lines: React.ReactNode[];
  start?: number;
  gap?: number;
  size?: number;
  resultColour?: string;
}> = ({ lines, start = 0, gap = 24, size = TYPE.body, resultColour = GOLD }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: size * 0.45, fontFamily }}>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontSize: size,
            fontWeight: i === lines.length - 1 ? 900 : 700,
            color: i === lines.length - 1 ? resultColour : WHITE,
            ...riseIn(frame, start + i * gap, 16),
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

// ─── BarModel ───────────────────────────────────────────────────────────────

export type BarPart = { value: number; label: React.ReactNode; colour?: string };

/**
 * A part–whole bar: one bar split into parts sized by `value`, each with its
 * own label, filling in left to right from `start`, with an optional `total`
 * label above. Good for "money spent vs change", shares, ratio and "what's
 * left" questions. Mark the unknown part in GOLD.
 */
export const BarModel: React.FC<{
  parts: BarPart[];
  total?: React.ReactNode;
  width?: number;
  height?: number;
  start?: number;
  stagger?: number;
}> = ({ parts, total, width = 1000, height = 96, start = 0, stagger = 14 }) => {
  const frame = useCurrentFrame();
  const sum = parts.reduce((s, p) => s + p.value, 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, fontFamily }}>
      {total !== undefined && (
        <div style={{ fontSize: TYPE.small, fontWeight: 800, color: WHITE, opacity: fadeIn(frame, start, 12) }}>
          {total}
        </div>
      )}
      <div style={{ display: "flex", width, height, borderRadius: 16, overflow: "hidden", border: `3px solid ${tint(WHITE, 0.35)}` }}>
        {parts.map((p, i) => {
          const c = p.colour ?? BLUE;
          return (
            <div
              key={i}
              style={{
                width: `${(p.value / sum) * 100}%`,
                background: tint(c, 0.7),
                borderLeft: i > 0 ? `3px solid ${tint("#000000", 0.45)}` : undefined,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: TYPE.small,
                fontWeight: 900,
                color: WHITE,
                whiteSpace: "nowrap",
                overflow: "hidden",
                opacity: fadeIn(frame, start + 8 + i * stagger, 12),
                scale: `${grow(frame, start + 8 + i * stagger, 16)} 1`,
                transformOrigin: "left center",
              }}
            >
              {p.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
