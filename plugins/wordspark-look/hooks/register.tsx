import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// WordSpark's palette: mint pages, deep-green ink, brand green, sunshine gold and sky cyan,
// in light and in dark.
const { theme, problems } = makeColors({
  label: 'WordSpark',
  roles: { accent: '#1f8f47', danger: '#d94a4a', success: '#2db232', warning: '#d99a00', pro: '#0e8fb0' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e6f4e3',
        'surface-1': '#f1faef',
        'surface-2': '#fafef9',
        'text-primary': '#1a2f24',
        'text-secondary': '#234236',
        'text-muted': '#4a6b5c',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0f1f1b',
        'surface-1': '#14271f',
        'surface-2': '#182d25',
        'surface-3': '#1c332a',
        'text-primary': '#edfff1',
        'text-secondary': '#dcf6e7',
        'text-muted': '#a2c9b4',
      },
    },
  },
})

const SCENE_NAME = 'wordspark-sparks'

const LOOK: ThemeSetArgs = { colors: theme, backdrop: { scene: SCENE_NAME } }

// Letter tiles float at the left and right edges; sparkles twinkle along the top. The middle
// (where the words sit) and the foot (where the message box sits) stay clear.
const tiles: [string, number, number, number, number][] = [
  // letter, x, y, tilt, delay (s)
  ['W', 90, 170, -10, 0],
  ['S', 230, 380, 8, 2.5],
  ['A', 120, 590, -6, 5],
  ['Z', 1460, 200, 9, 1.2],
  ['E', 1330, 420, -8, 3.8],
  ['Q', 1470, 630, 6, 6.2],
]

const sparkles: [number, number, number, number][] = [
  // x, y, size, delay (s)
  [420, 110, 16, 0],
  [610, 70, 10, 1.4],
  [1010, 95, 14, 2.6],
  [1190, 150, 9, 0.8],
  [300, 760, 11, 3.2],
  [1290, 740, 13, 1.9],
]

// On a tall phone the scene is cropped to roughly x 570-1030, so a smaller set sits there,
// up in the top corners, shown only in portrait.
const phoneTiles: [string, number, number, number, number][] = [
  ['W', 615, 150, -10, 0],
  ['S', 965, 150, 8, 2.5],
  ['A', 970, 340, -6, 5],
]

const tileGroup = (list: typeof tiles, scale: number) =>
  list
    .map(
      ([letter, x, y, tilt, delay]) => `
    <g transform="translate(${x} ${y}) rotate(${tilt}) scale(${scale})">
      <g class="float" style="animation-delay:-${delay}s">
        <rect class="tile" x="-46" y="-46" width="92" height="92" rx="24"/>
        <text class="letter" x="0" y="17" text-anchor="middle">${letter}</text>
      </g>
    </g>`,
    )
    .join('')

const sparkleMarkup = sparkles
  .map(
    ([x, y, s, delay]) => `
    <path class="spark" style="animation-delay:-${delay}s"
      d="M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z"/>`,
  )
  .join('')

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
  <style>
    :root { --bg-a:#f2fbf1; --bg-b:#fff8de; --bg-c:#dff3ff; --green:#5ee568; --gold:#ffd257; --cyan:#2cc0e3;
            --tile:#ffffff; --tile-line:#9fd9b0; --ink:#1f8f47; --spark:#ffcc3a; --glow:.30; }
    @media (prefers-color-scheme: dark) {
      :root { --bg-a:#0f1f1b; --bg-b:#1d2a1a; --bg-c:#132833; --green:#63e85d; --gold:#ffd45d; --cyan:#3ec2e1;
              --tile:#1a3028; --tile-line:#3f7d5d; --ink:#7ff07a; --spark:#ffd45d; --glow:.22; }
    }
    .ground-a { stop-color: var(--bg-a); } .ground-b { stop-color: var(--bg-b); } .ground-c { stop-color: var(--bg-c); }
    .g-green { stop-color: var(--green); } .g-gold { stop-color: var(--gold); } .g-cyan { stop-color: var(--cyan); }
    .fade { stop-opacity: 0; }
    .glow { opacity: var(--glow); transform-box: fill-box; transform-origin: center; animation: breathe 14s ease-in-out infinite; }
    .pill { opacity: .55; }
    .tile { fill: var(--tile); stroke: var(--tile-line); stroke-width: 3; opacity: .78; }
    .letter { fill: var(--ink); font: 800 52px 'Baloo 2', 'Nunito', system-ui, sans-serif; opacity: .8; }
    .float { animation: drift 11s ease-in-out infinite; }
    .spark { fill: var(--spark); transform-box: fill-box; transform-origin: center; animation: twinkle 5s ease-in-out infinite; }
    @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
    @keyframes drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
    @keyframes twinkle { 0%,100% { opacity: .15; transform: scale(.6); } 50% { opacity: .95; transform: scale(1); } }
    .portrait { display: none; }
    @media (max-aspect-ratio: 4/5) { .landscape { display: none; } .portrait { display: inline; } }
    @media (prefers-reduced-motion: reduce) { .glow, .float, .spark { animation: none; } .spark { opacity: .6; } }
  </style>
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" class="ground-a"/><stop offset=".55" class="ground-b"/><stop offset="1" class="ground-c"/>
    </linearGradient>
    <radialGradient id="rg-green"><stop offset="0" class="g-green"/><stop offset="1" class="g-green fade"/></radialGradient>
    <radialGradient id="rg-gold"><stop offset="0" class="g-gold"/><stop offset="1" class="g-gold fade"/></radialGradient>
    <radialGradient id="rg-cyan"><stop offset="0" class="g-cyan"/><stop offset="1" class="g-cyan fade"/></radialGradient>
    <linearGradient id="pill-a" x1="0" x2="1"><stop offset="0" class="g-gold"/><stop offset="1" class="g-cyan fade"/></linearGradient>
    <linearGradient id="pill-b" x1="0" x2="1"><stop offset="0" class="g-green"/><stop offset="1" class="g-green fade"/></linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#ground)"/>
  <circle class="glow" cx="80" cy="90" r="430" fill="url(#rg-green)"/>
  <circle class="glow" cx="1490" cy="140" r="380" fill="url(#rg-gold)" style="animation-delay:-5s"/>
  <circle class="glow" cx="1250" cy="840" r="470" fill="url(#rg-cyan)" style="animation-delay:-9s"/>
  <rect class="pill" x="1180" y="250" width="440" height="96" rx="48" fill="url(#pill-a)" transform="rotate(-8 1400 298)"/>
  <rect class="pill" x="-80" y="700" width="360" height="86" rx="43" fill="url(#pill-b)" transform="rotate(-8 100 743)"/>
  <g class="landscape">${tileGroup(tiles, 1)}</g>
  <g class="portrait">${tileGroup(phoneTiles, 0.62)}</g>
  ${sparkleMarkup}
</svg>`

export const register: Register = on => {
  // A reload of this mod, or --resume, doesn't keep a theme, so set it every time a session starts.
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    await $.command.register({ name: 'wordspark-look', description: 'Turn on the WordSpark colours and backdrop' })

    return next(e)
  })

  // Applies the look on demand (e.g. in a session that was already running) and says whether
  // the app showing this session draws it.
  on('command.run', { command: 'wordspark-look' }, async $ => {
    const set = await $.theme.set(LOOK)

    if (set.isDrawn) {
      $.ui.status(undefined)
      return { text: 'WordSpark look is on.' }
    }

    return { text: `WordSpark look is set, but nothing draws it here: ${set.reason}` }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    // Every mod's backdrop comes through here: draw only our own scene.
    if (e.props.plugin !== $.plugin.name || e.props.scene !== SCENE_NAME) {
      return next(e)
    }
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={SCENE}
        alt="WordSpark letter tiles and sparkles floating gently over a mint and sunshine background"
        isInteractive
      />
    )
  })
}
