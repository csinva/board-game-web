# Board Game Field Guide

**Live site:** https://csinva.io/board-game-web/

Learn popular board games from one standardized, illustrated page each, and explore which games are alike on an interactive similarity map.

- **`index.html`**: every game, filterable by players, length and family.
- **`game.html?g=<id>`**: one illustrated page per game, with an animated walkthrough of a turn. If you already know a similar game, pick it and the page explains the new one in its terms. Heavy games add collapsible extended details. Prints on one landscape page.
- **`map.html`**: games linked by hand-curated "plays like" pairs (hover a line for why), by family, or on a chart of any two axes. Heavy games are ringed.
- **`deepdive.html`**: every game scored 0–100 on ten dimensions (rules, luck, meanness, table talk, depth…), plotted on any two, plus a "gamer profile" reading with recommendations (`?picks=catan,codenames,…` is shareable).

## The format

Each sheet answers the same eight questions, in teaching order:

1. **Story**: what are we pretending to be? (with an annotated illustration of the table)
2. **Goal**: how do I win?
3. **Clock**: when does it end?
4. **Turn**: what can I do? (a chain, a fork, or simultaneous play, plus an animated walkthrough)
5. **Engine**: how do I get stronger?
6. **Key decision**: what's the interesting choice?
7. **Exceptions**: the rules people miss
8. **Tips**: how to not flounder in your first game

Plus setup, a quick-reference table, key terms, a six-axis "feel" profile, and similar games with reasons.

## Adding a game

1. Add `js/games/<id>.js` following [`SCHEMA.md`](SCHEMA.md) (copy `js/games/catan.js`).
2. Add the id to `GAME_IDS` in `js/core.js`.
3. Add its scores to `js/deepdive-data.js`, and any genuine "plays like" pairs to `js/kin.js` (with a bridge in `js/bridges/`).
4. Run `tools/validate.sh <id>` (macOS JavaScriptCore; no build step, no dependencies). `walk-preview.html?g=<id>` shows all walkthrough slides at once.

The site is plain static HTML/JS. Serve locally with `python3 -m http.server`.
