# Board Game Web

**Live site:** https://csinva.io/board-game-web/

One illustrated page per board game, with every rule needed to play, plus tools to find similar games.

- **`index.html`**: every game, filterable by players, length and family.
- **`game.html?g=<id>`**: the game's page (see below). Prints on one landscape page.
- **`map.html`**: games linked by hand-curated "plays like" pairs (hover a line for why), grouped by family, or on a chart of any two traits. Heavy games are ringed.
- **`deepdive.html`** ("Explore games by their traits"): every game scored 0–100 on 11 traits, plotted on any two, plus a player-type profile with recommendations (`?picks=catan,codenames,…` is shareable).

## A game page

Most important first. Rules, in the order you need them:

1. **What it is**: an annotated illustration of the table.
2. **How you win.**
3. **How it ends.**
4. **Your turn**: a chain (do every step), a fork (choose one) or simultaneous play, with an animated walkthrough of a real turn.
5. **How the game flows**: the whole game as a timeline (setup → rounds/phases → end-of-round events → end).
6. **Scoring**: every way to earn points.
7. Setup, a quick-reference table, key terms, and rules people miss. Heavy games add collapsible extended details.

Then **Strategy** (the key decision, first-game tips, where points usually come from) and **Is it for you?** (a feel profile and similar games).

Components appear as icons inline (`{wood}` in the data), drawn the same as in the illustrations. If you know a closely related game, an "Already know…" bar explains only what differs.

## Adding a game

1. Add `js/games/<id>.js` following [`SCHEMA.md`](SCHEMA.md) (copy `js/games/catan.js`).
2. Add the id to `GAME_IDS` in `js/core.js`.
3. Add its trait scores to `js/deepdive-data.js`, and any genuine "plays like" pairs to `js/kin.js` (with a bridge in `js/bridges/` if knowing one teaches the other).
4. Run `tools/validate.sh <id>` (macOS JavaScriptCore; no build step, no dependencies). `walk-preview.html?g=<id>` shows all walkthrough slides at once.

The site is plain static HTML/JS. Serve locally with `python3 -m http.server`.
