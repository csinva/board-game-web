# Board Game Field Guide

**Live site:** https://csinva.io/board-game-web/

Learn popular board games from one standardized, illustrated page each, and explore which games are alike on an interactive similarity map.

- **`index.html`**: the method (how to learn any board game), the anatomy of a sheet, and a filterable gallery.
- **`game.html?g=<id>`**: the one-page sheet for a game. It has a "learn in layers" toggle (30 seconds / 5 minutes / everything), a read-aloud teach script, and prints on one landscape page. Arrow keys switch games; keys 1–3 switch layers.
- **`map.html`**: similarity web, family clusters, or a scatter on any two axes (e.g. rules weight vs. interaction). Click a game to see its nearest neighbours and why they're similar.

## The format

Each sheet answers the same eight questions, in teaching order:

1. **Story**: what are we pretending to be? (with an annotated illustration of the table)
2. **Goal**: how do I win?
3. **Clock**: when does it end?
4. **Turn**: what can I do? (drawn as a chain, a fork, or simultaneous play)
5. **Engine + key decision**: how do I get stronger, and what's the interesting choice?
6. **Example**: one concrete turn, played out
7. **Exceptions**: the rules people miss
8. **Tips**: how to not flounder in your first game

Plus a quick-reference table, key terms, a six-axis "feel" profile, setup, and similar games.

## Adding a game

1. Add `js/games/<id>.js` following [`SCHEMA.md`](SCHEMA.md) (copy `js/games/catan.js`).
2. Add the id to `GAME_IDS` in `js/core.js`.
3. Run `tools/validate.sh <id>` (macOS JavaScriptCore; no build step, no dependencies).

The site is plain static HTML/JS. Serve locally with `python3 -m http.server`.
