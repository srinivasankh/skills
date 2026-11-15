# wordspark-look

A Claude Code **mod** that gives the Claude Desktop app's Code tab and the Claude mobile app WordSpark's look: mint, cream and sky colours in light mode, deep forest greens in dark mode, and a gentle animated backdrop of floating letter tiles and twinkling sparkles behind the conversation.

- The tiles and sparkles stay near the edges, so the conversation and the message box are never covered.
- On a phone held upright, a smaller set of tiles sits in the top corners.
- Animation stops if your device asks for reduced motion.
- `/wordspark-look` turns the look on again (for example in a session that was already running) and tells you whether the app you're using draws it.

The terminal and the VS Code extension don't draw themes, so the mod changes nothing there.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install wordspark-look --marketplace srinivasankh/skills
```

Answer `y` to add the marketplace, then pick a scope (user scope makes it load in every session).

From a shell:

```console
claude plugin marketplace add srinivasankh/skills
claude plugin install wordspark-look@srinivasankh-skills
```

In the Desktop app, where `/plugin` doesn't run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `srinivasankh/skills`, then **Add plugin**.

Then start a new session in the Desktop app's Code tab or open one in the mobile app. Mod colours need a recent Claude Code (v2.1.324 or later) and an up-to-date Desktop app.

## Remove it

Disable or uninstall the plugin (`/plugin`, or **Manage plugins** in the Desktop app), then start a new session. If the colours stay, open **Settings** in the Code tab, search for `code appearance` and select **Remove colors**.

## Files

| File | What it is |
| --- | --- |
| `hooks/register.tsx` | The mod: sets the colours and backdrop when a session starts, draws the animated scene, and adds `/wordspark-look`. |
| `hooks/make-colors.js`, `hooks/make-colors.d.ts` | The colour helper from Claude Code's plugin-authoring skill, copied unchanged as Claude Code's docs ask. It builds the full theme from a few colours. It is Anthropic's generated code and is **not** covered by this repository's MIT licence. |
| `.claude-plugin/plugin.json`, `hooks/hooks.json` | The plugin manifest and the list of hook modules. |
| `tsconfig.json` | Lets an editor type-check the mod once Claude Code has loaded it (Claude Code writes the types it points to). |

The rest of the mod's code is MIT, like the rest of this repository.
