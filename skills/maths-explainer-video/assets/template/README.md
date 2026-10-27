# __TITLE__

An animated worked solution to a maths question. 1920×1080, 30 fps, about TODO s, no audio.

## The question

> TODO: the question, word for word as printed.

**Answer:** **TODO**

## How it's solved

TODO: the method (spell out its name), the key working, and the traps the video covers.

## Scenes

| # | Scene | Time |
| --- | --- | --- |
| 1 | Title | 0:00–0:03 |
| … | TODO | |

## Make the video

```console
npm install
npm run dev        # preview and tweak in Remotion Studio
npm run stills     # one still per scene in out/stills/
npm run render     # out/__FILE__.mp4 (1920×1080)
npm run thumbnail  # out/thumbnail.png
```

The scenes are in `src/Video.tsx`. The shared look (fonts, colours, animation helpers, backdrop, badges, fractions, ticks and crosses) is in `src/style/`. The fonts in `public/fonts/` are under the SIL Open Font License.
