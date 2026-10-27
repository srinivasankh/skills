import { AbsoluteFill, Interactive, Sequence, useCurrentFrame } from "remotion";
import {
  BASE,
  Background,
  Card,
  Cross,
  DIM,
  Dots,
  GOLD,
  GREEN,
  INK,
  RED,
  SAFE,
  StepBadge,
  TYPE,
  Tick,
  WHITE,
  fadeIn,
  popIn,
  riseIn,
  tint,
} from "./style";

// ─── content ────────────────────────────────────────────────────────────────
// Fill these in first. The question is copied exactly as printed, including
// any names of people in it.

const TITLE = "__TITLE__";
const SUBTITLE = "__SUBTITLE__";

// A string, or JSX when it needs line breaks (<br />) or coloured numbers
// (<Em colour={BLUE}>3.5</Em>). The words themselves stay exactly as printed.
const QUESTION: React.ReactNode = "TODO: the question, word for word as printed.";

// Leave empty ([]) when the question has no answer options.
const OPTIONS: readonly (readonly [string, string])[] = [
  ["A", "TODO"],
  ["B", "TODO"],
  ["C", "TODO"],
  ["D", "TODO"],
];

const ANSWER = "TODO";
// The letter of the correct option, or "" when there are no options.
const ANSWER_OPTION = "TODO";

// The named method: a short memorable word, one letter per step.
const METHOD_NAME = "T.O.D.O.";
const METHOD_STEPS = [
  { l: "T", w: "TODO", d: "what this step means" },
  { l: "O", w: "TODO", d: "what this step means" },
  { l: "D", w: "TODO", d: "what this step means" },
  { l: "O", w: "TODO", d: "what this step means" },
];

// The most common wrong moves, most common first. `option` is the wrong
// option letter the mistake leads to ("" if none); it is shown in red.
const TRAPS: { text: React.ReactNode; option: string }[] = [
  { text: "TODO: the most common wrong move", option: "" },
  { text: "TODO: the next most common wrong move", option: "" },
];

// ─── scenes ─────────────────────────────────────────────────────────────────

const centred: React.CSSProperties = {
  ...BASE,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 34,
  padding: `0 ${SAFE}px`,
};

const leftAligned: React.CSSProperties = {
  ...BASE,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 36,
  padding: `0 ${SAFE + 16}px`,
};

const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={centred}>
      <Interactive.Div
        name="Main title"
        style={{
          fontSize: TYPE.hero,
          fontWeight: 900,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.1,
          ...riseIn(frame, 0, 18),
        }}
      >
        {TITLE}
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{ fontSize: 36, color: DIM, ...riseIn(frame, 18, 18) }}
      >
        {SUBTITLE}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const OptionChip: React.FC<{
  letter: string;
  value: string;
  colour?: string;
  faded?: boolean;
  style?: React.CSSProperties;
}> = ({ letter, value, colour, faded, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      padding: "14px 28px",
      borderRadius: 16,
      background: colour ? tint(colour, 0.16) : tint(WHITE, 0.06),
      border: `3px solid ${colour ?? tint(WHITE, 0.16)}`,
      opacity: faded ? 0.4 : 1,
      ...style,
    }}
  >
    <span style={{ fontSize: 26, fontWeight: 900, color: colour ?? DIM }}>
      {letter}
    </span>
    <span style={{ fontSize: 38, fontWeight: 900, color: colour ?? WHITE }}>
      {value}
    </span>
  </div>
);

const isShort = (q: React.ReactNode) => typeof q === "string" && q.length <= 40;
const SHORT_QUESTION = isShort(QUESTION);

const QuestionScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={centred}>
      <Interactive.Div
        name="Question label"
        style={{
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 4,
          color: GOLD,
          textTransform: "uppercase",
          opacity: fadeIn(frame, 0, 14),
        }}
      >
        The Question
      </Interactive.Div>

      <Interactive.Div
        name="Question text"
        style={{
          // A short question (a single equation) is shown big.
          fontSize: SHORT_QUESTION ? 72 : TYPE.body,
          fontWeight: SHORT_QUESTION ? 900 : 400,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.5,
          background: tint(WHITE, 0.07),
          borderRadius: 26,
          padding: "36px 56px",
          border: `2px solid ${tint(WHITE, 0.12)}`,
          maxWidth: 1120,
          ...riseIn(frame, 8, 20),
        }}
      >
        {QUESTION}
      </Interactive.Div>

      {OPTIONS.length > 0 && (
        <div style={{ display: "flex", gap: 18, opacity: fadeIn(frame, 46, 18) }}>
          {OPTIONS.map(([letter, value], i) => (
            <OptionChip
              key={letter}
              letter={letter}
              value={value}
              style={{ scale: String(popIn(frame, 46 + i * 6)) }}
            />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const MethodScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={leftAligned}>
      <Interactive.Div
        name="Method title"
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: GOLD,
          ...riseIn(frame, 0, 14),
        }}
      >
        The {METHOD_NAME} method
      </Interactive.Div>

      {METHOD_STEPS.map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            ...riseIn(frame, 22 + i * 24, 14),
          }}
        >
          <span
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: tint(GOLD, 0.16),
              border: `3px solid ${GOLD}`,
              color: GOLD,
              fontSize: 42,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.l}
          </span>
          <span
            style={{ fontSize: 46, fontWeight: 900, color: WHITE, width: 330 }}
          >
            {s.w}
          </span>
          <span style={{ fontSize: TYPE.small, color: DIM }}>{s.d}</span>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// One scene per method step. Copy it for each step and replace the body with
// that step's own visual (see references/style-guide.md in the skill). A
// visual and its working usually sit side by side, filling the frame.
const StepScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={leftAligned}>
      <StepBadge tag={METHOD_STEPS[0].l} label="TODO: what this step does" />
      <Interactive.Div
        name="Working"
        style={{
          fontSize: TYPE.math,
          fontWeight: 800,
          color: WHITE,
          ...riseIn(frame, 20, 18),
        }}
      >
        TODO: the working for this step
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const TrapScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={centred}>
      <Interactive.Div
        name="Trap title"
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: RED,
          opacity: fadeIn(frame, 0, 14),
          scale: String(popIn(frame, 0)),
        }}
      >
        Watch out!
      </Interactive.Div>
      <div style={{ display: "flex", gap: 30, ...riseIn(frame, 24, 16) }}>
        <Card colour={RED} style={{ width: 540 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Cross />
            <span style={{ fontSize: 28, fontWeight: 900, color: RED }}>
              THE TRAP
            </span>
          </div>
          <div style={{ fontSize: TYPE.small, color: WHITE, marginTop: 14, lineHeight: 1.4 }}>
            {TRAPS[0].text}
          </div>
        </Card>
        <Card colour={GREEN} style={{ width: 540, ...riseIn(frame, 50, 16) }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Tick />
            <span style={{ fontSize: 28, fontWeight: 900, color: GREEN }}>
              DO THIS INSTEAD
            </span>
          </div>
          <div style={{ fontSize: TYPE.small, color: WHITE, marginTop: 14, lineHeight: 1.4 }}>
            TODO: the right move
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

const CheckScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={centred}>
      <StepBadge tag={<Tick size={30} colour={INK} />} label="Check it" />
      <Interactive.Div
        name="Check"
        style={{
          fontSize: TYPE.math,
          fontWeight: 800,
          color: WHITE,
          textAlign: "center",
          ...riseIn(frame, 20, 18),
        }}
      >
        TODO: check the answer a second way (work backwards, estimate)
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const AnswerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const trapOptions = TRAPS.map((t) => t.option).filter(Boolean);
  return (
    <AbsoluteFill style={{ ...centred, gap: 40 }}>
      {OPTIONS.length > 0 && (
        <div style={{ display: "flex", gap: 16, opacity: fadeIn(frame, 0, 14) }}>
          {OPTIONS.map(([letter, value]) => {
            const right = letter === ANSWER_OPTION;
            const trap = trapOptions.includes(letter);
            return (
              <OptionChip
                key={letter}
                letter={letter}
                value={value}
                colour={right ? GREEN : trap ? RED : undefined}
                faded={!right && !trap}
                style={{ scale: String(right ? popIn(frame, 16) : 1) }}
              />
            );
          })}
        </div>
      )}

      {/* A long answer, like a coordinate pair, sits above the traps. */}
      <div
        style={{
          display: "flex",
          flexDirection: ANSWER.length > 6 ? "column" : "row",
          alignItems: "center",
          gap: ANSWER.length > 6 ? 30 : 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 28,
              letterSpacing: 5,
              color: DIM,
              textTransform: "uppercase",
              opacity: fadeIn(frame, 0, 14),
            }}
          >
            Answer
          </span>
          <span
            style={{
              fontSize: TYPE.answer,
              fontWeight: 900,
              color: GOLD,
              lineHeight: 1,
              opacity: fadeIn(frame, 10, 14),
              scale: String(popIn(frame, 10)),
            }}
          >
            {ANSWER}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 600 }}>
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: RED,
              letterSpacing: 2,
              opacity: fadeIn(frame, 40, 14),
            }}
          >
            TRAPS TO AVOID
          </span>
          {TRAPS.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                ...riseIn(frame, 52 + i * 20, 14),
              }}
            >
              <Cross size={32} />
              <span style={{ fontSize: 30, color: WHITE, lineHeight: 1.4 }}>
                {t.text}
              </span>
            </div>
          ))}
          <Interactive.Div
            name="Well done"
            style={{
              marginTop: 10,
              fontSize: 44,
              fontWeight: 800,
              color: GREEN,
              ...riseIn(frame, 52 + TRAPS.length * 20 + 20, 14),
            }}
          >
            Well done!
          </Interactive.Div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── timeline ───────────────────────────────────────────────────────────────
// Scene lengths in frames (30 fps). Start times are worked out from the order,
// so changing one scene's length shifts the rest instead of overlapping them.

const SCENES: { name: string; frames: number; Scene: React.FC }[] = [
  { name: "Title", frames: 90, Scene: TitleScene },
  { name: "Question", frames: 210, Scene: QuestionScene },
  { name: "Method", frames: 165, Scene: MethodScene },
  { name: "Step 1", frames: 210, Scene: StepScene },
  { name: "The trap", frames: 195, Scene: TrapScene },
  { name: "Check", frames: 150, Scene: CheckScene },
  { name: "Answer", frames: 225, Scene: AnswerScene },
];

const STARTS = SCENES.map((_, i) =>
  SCENES.slice(0, i).reduce((sum, s) => sum + s.frames, 0),
);

export const DURATION = SCENES.reduce((sum, s) => sum + s.frames, 0);

export type SceneMarker = { name: string; from: number; frames: number };

/** Scene names and timings; scripts/render-stills.mjs reads these. */
export const SCENE_MARKERS: SceneMarker[] = SCENES.map((s, i) => ({
  name: s.name,
  from: STARTS[i],
  frames: s.frames,
}));

export const Video: React.FC<{ markers: SceneMarker[] }> = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Dots />
      {SCENES.map(({ name, frames, Scene }, i) => (
        <Sequence key={name} name={name} from={STARTS[i]} durationInFrames={frames}>
          <Scene />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
