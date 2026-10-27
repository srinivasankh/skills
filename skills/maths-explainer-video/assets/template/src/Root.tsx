import { Composition } from "remotion";
import { DURATION, SCENE_MARKERS, Video } from "./Video";

// The video is laid out at 1280×720. `npm run render` uses --scale=1.5 to
// output a sharp 1920×1080 MP4 without changing any layout numbers.
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="__ID__"
      component={Video}
      durationInFrames={DURATION}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{ markers: SCENE_MARKERS }}
    />
  );
};
