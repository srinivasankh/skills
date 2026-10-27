import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GOLD, INK } from "./theme";

/** The indigo gradient every scene sits on. */
export const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(145deg, ${INK} 0%, #1a1050 40%, ${INK} 100%)`,
    }}
  />
);

/** Eight faint gold dots drifting up and down, laid out for 1280×720. */
export const Dots: React.FC = () => {
  const frame = useCurrentFrame();
  const positions = [
    [60, 60], [1200, 90], [100, 650], [1180, 610],
    [620, 40], [620, 680], [300, 350], [950, 350],
  ] as const;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {positions.map(([x, y], i) => {
        const drift = interpolate(
          (frame + i * 18) % 90,
          [0, 45, 90],
          [-8, 8, -8],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + drift,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: GOLD,
              opacity: 0.12,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
