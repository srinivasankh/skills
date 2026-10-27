import { useCurrentFrame } from "remotion";
import { riseIn } from "./motion";
import {
  BASE,
  GOLD,
  GREEN,
  INK,
  RED,
  TYPE,
  WHITE,
  fontFamily,
  tint,
} from "./theme";

/** Gold tag + heading at the top of a step scene. Rises in on its own. */
export const StepBadge: React.FC<{ tag: React.ReactNode; label: string }> = ({
  tag,
  label,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...BASE,
        display: "flex",
        alignItems: "center",
        gap: 16,
        ...riseIn(frame, 0, 14),
      }}
    >
      <div
        style={{
          minWidth: 54,
          height: 54,
          padding: "0 14px",
          borderRadius: 14,
          background: GOLD,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 28,
          color: INK,
          flexShrink: 0,
        }}
      >
        {tag}
      </div>
      <span style={{ fontSize: 38, fontWeight: 800, color: GOLD }}>{label}</span>
    </div>
  );
};

/** Bold, coloured inline text for the numbers and words that matter. */
export const Em: React.FC<{ colour?: string; children: React.ReactNode }> = ({
  colour = GOLD,
  children,
}) => <span style={{ color: colour, fontWeight: 900 }}>{children}</span>;

/** A rounded translucent panel. Use `colour` to tint the border and fill. */
export const Card: React.FC<{
  colour?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ colour = WHITE, style, children }) => (
  <div
    style={{
      background: tint(colour, 0.08),
      border: `2px solid ${tint(colour, 0.35)}`,
      borderRadius: 20,
      padding: "26px 34px",
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * A stacked fraction (numerator over a rule over denominator). Use this
 * instead of characters like ½ or ⅐: it reads better and every fraction
 * renders, whatever the font supports.
 */
export const Frac: React.FC<{
  top: React.ReactNode;
  bottom: React.ReactNode;
  colour?: string;
  size?: number;
}> = ({ top, bottom, colour = WHITE, size = TYPE.body }) => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      verticalAlign: "middle",
      margin: "0 6px",
      fontFamily,
      fontSize: size,
      fontWeight: 900,
      color: colour,
      lineHeight: 1.1,
    }}
  >
    <span>{top}</span>
    <span
      style={{
        alignSelf: "stretch",
        height: Math.max(2, size / 14),
        background: colour,
        borderRadius: 2,
        margin: "2px 0",
      }}
    />
    <span>{bottom}</span>
  </span>
);

/** A drawn tick. Fonts often lack ✓, so draw it. */
export const Tick: React.FC<{ size?: number; colour?: string }> = ({
  size = 36,
  colour = GREEN,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path
      d="M4 12.5l5 5L20 6.5"
      fill="none"
      stroke={colour}
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** A drawn cross. Fonts often lack ✗, so draw it. */
export const Cross: React.FC<{ size?: number; colour?: string }> = ({
  size = 36,
  colour = RED,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke={colour}
      strokeWidth={3.2}
      strokeLinecap="round"
    />
  </svg>
);
