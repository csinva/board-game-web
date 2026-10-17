# Game sheet schema

Every game lives in `js/games/<id>.js` and calls `defineGame({...})` once.
`js/games/catan.js` is the reference implementation. Copy its shape.
Run `tools/validate.sh <id>` to check a file.

## Page order: most important first

Rules come first, in the order you need them to play; strategy and opinion come last.

| # | Panel | Question it answers |
|---|-------|---------------------|
| 1 | What it is (illustration) | What does the table look like? |
| 2 | How you win | What am I trying to do? |
| 3 | How it ends | What ends the game? |
| 4 | Your turn (+ animated walkthrough) | What do I do on a turn? |
| 5 | How the game flows (`structure`) | Setup → rounds/phases → end-of-round events → end |
| 6 | Scoring (`points`) | Every way to earn points |
| – | Setup, quick reference, key terms | What's on the table; lookups |
| ! | Rules people miss | Rules that are easy to get wrong |
| – | Extended details (heavy games only) | Full detail for later games |
| – | **Strategy band:** key decision, first-game tips, where points usually come from | How to play well |
| – | **Is it for you? band:** feel profile, similar games | Should I play it? |

**Completeness rule:** someone with only this page and the components must be able to play a full game correctly.

Extras: "I already know X" bridges (`js/bridges/*.js`, for curated pairs in `js/kin.js`), and
collapsible "Extended details" for heavy games only.

## Fields

```js
defineGame({
  id: 'catan',                 // matches filename
  name: 'Catan', year: 1995, designer: 'Klaus Teuber',
  family: 'build',             // key of FAMILIES in js/core.js
  players: [3, 4], best: '4',  // best is an optional short string
  time: [60, 120],             // minutes
  age: 10,
  mechanics: [...],            // 3–7 keys from MECHANICS in js/core.js (similarity uses these)
  profile: { complexity, luck, interaction, conflict, talk, planning }, // each 1–5, see PROFILE_AXES
  color: '#hex',               // optional accent; defaults to the family colour

  pitch: '≤150 chars. One sentence: what you do and why it is fun.',
  theme: 'One sentence: "You are ..." (the story you are pretending).',

  goal: { big: '≤18 chars, e.g. "10 points" or "Kill the king"', text: 'One or two sentences.' },

  turn: {
    type: 'sequence' | 'choose' | 'simultaneous' | 'round',
    //  sequence: do every step in order (Catan: roll, trade, build)
    //  choose: pick ONE action (Ticket to Ride, Wingspan, Splendor)
    //  simultaneous: everyone acts at once (7 Wonders, Sushi Go)
    //  round: phases a whole round goes through (Secret Hitler, Codenames)
    intro: 'optional override of the line above the steps',
    outro: 'optional override of "Next player"',
    steps: [{ verb: '≤12 chars, imperative', text: 'one sentence; **bold** allowed' }], // 2–5 steps
  },

  tension: 'The key decision: the central dilemma that makes the game interesting, in one sentence.',
  // The whole game as a timeline (2–6 stages). Mark repeated stages with `repeat`.
  structure: [
    { label: 'Setup', text: '…' },
    { label: 'Rounds 1–4', repeat: '4 rounds', text: 'Turns: 8 in round 1, 7, 6, then 5. Each turn: one action.' },
    { label: 'End of each round', text: 'Score that round’s goal; take back your action cubes.' },
    { label: 'Final scoring', text: '…' },
  ],
  // Every way to earn points, as rules (required for points games):
  points: [['{bird} Birds', 'Points printed on each bird'], ['Bonus cards', '…'], ['Round goals', '…'], ['{egg} Eggs', '1 each'], …],

  end: { trigger: 'Short clause; it is also read as "The game ends when <trigger>"', detail: 'optional' ,
         results: [{ side: 'Liberals win', text: 'if ...' }] },   // results is for team / win-lose games
  scoring: [{ label: 'Birds', share: 4 }, ...],                     // STRATEGY: rough share of a typical winning score (shown in the Strategy band)

  ref: { title: 'Build costs', rows: [['Road', 'wood + brick'], ...] },  // optional lookup table, ≤6 rows
  example: 'A concrete narrated turn with names and numbers (2–3 sentences).',
  setup: ['3 short steps'],
  terms: [['Term', 'definition'], ...],   // 3–5
  gotchas: ['3 rules people get wrong'],
  tips: ['3 first-game strategy tips'],

  art(A) { return A.bg() + ...; },       // 320×200 SVG using the helpers in js/art.js
});
```

## Writing guidelines

- **Rules only.** No theme, story or flavor ("You are settlers racing to…", "a sinking island",
  "woodland animals") unless it directly explains a rule (e.g. "the robber steals" is fine because it
  says what the piece does). The `theme` field is no longer used: delete it.
- **Audit every word.** Shortest wording that stays unambiguous. Cut filler ("simply", "basically",
  "you will", "in order to", "note that"), hedges, repetition between panels, and marketing tone.
  Prefer numbers and nouns to adjectives. One idea per sentence.
- `pitch` = one plain sentence of what you do and how you win, ≤ 120 chars, no flavor.
  ("Collect sets of train cards to claim routes between cities; longest routes and completed tickets score.")
- **Unambiguous.** Every rule must read exactly one way: say who acts, when, exactly how many, where things
  go, in what order, and whether it is "may" or "must". No shorthand like "snake order": spell it out
  ("clockwise, then counter-clockwise, so the last player places twice in a row").
- Plain words. Define any jargon in `terms`, or where it is first used.
- `**bold**` is the only markup. Use it for the one word that matters in a sentence.
- Captions, callouts (`A.note`) and walkthrough `say` text follow the same rules.
- Keep the profile scores comparable across games. Calibrate against Catan:
  complexity 2, luck 4, interaction 5, conflict 3, talk 4, planning 3.

## Illustration guidelines

- Draw *the table at a glance*: the board, cards or tiles in a recognizable mid-game state, using `js/art.js` helpers.
- Add 2–4 `A.note(px, py, tx, ty, 'label')` callouts that name the parts a new player needs to know.
  Labels should be short (≤ 26 chars). Callouts are clamped to the canvas, but avoid overlaps.
- Use the game's real colour language (e.g. Catan resources, Ticket to Ride route colours).
- No text-heavy art and no logos or trademarks. Stylized only.

## Inline icons (`icons`)

Be visual wherever a picture is faster than a word. Define the game's recognisable components
once as small icons, then reference them in any text field:

```js
icons: {
  wood: { name: 'wood', draw: A => A.rect(4, 1, 16, 22, '#dcefd3', { rx: 2.5, sw: 1.3 }) + /* tree */ ... },
  road: { name: 'road', draw: A => A.rect(2, 9.5, 20, 5, '#c8423b', { rx: 1, sw: 1.3, rotate: -30 }) },
},
ref: { title: 'Build costs', rows: [
  ['Resources', '{wood} {brick} {wheat} {sheep} {ore}'],   // {key} = icon + name (use the first time / as a legend)
  ['{=road} Road', '{=wood} {=brick}'],                    // {=key} = icon only (repeat icons to show counts)
]},
```

- Each icon draws in a **24×24** box with the `A.*` helpers. Keep it bold and simple: it renders at text size.
- Use them where they replace words a newcomer must learn to recognise: resources, currencies, card
  types, suits, tokens, pieces, dice faces, tracks. Best places: `ref` (costs/values as rows of icons),
  `turn.steps`, `flow`, `terms` keys, `scoring` labels, `setup`, `example`, walkthrough `say`.
- Not in `name`, `pitch`, `theme` or `goal.big` (those show outside the sheet).
- Shared icons need no definition: `{spade}` `{heart}` `{diamond}` `{club}` `{vp}` `{coin}` `{card}` `{die}` `{d1}`…`{d6}`.
- **Reuse the same drawings in `art` and `walk`** so the icon in a table matches the piece on the board:
  `A.use(this.icons.wood.draw(A), x, y, size)` draws an icon at (x, y) scaled to `size` px
  (`this` is the game inside `art`/`walk`).
- Don't overdo it: prose stays prose. A row of 3 ore icons beats "3 ore"; an icon in every sentence is noise.

## Turn walkthrough (`walk`)

Every game should have an animated walkthrough that plays next to "Your turn".

```js
walk(A) {
  const board = A.bg() + ...;              // shared scene parts
  return [
    { step: 0, say: 'Roll both dice: **3 + 5 = 8**.', svg: board + A.k('dice', ...) },
    { step: 0, say: 'Every 8 hex pays ...',           svg: board + A.k('ore', cardOnHex) + A.glow(x, y, r) },
    { step: 1, say: '...',                             svg: board + A.k('ore', cardInHand) },
  ];
}
```

- 4–7 slides that play one concrete turn (ideally the same story as `example`). For `round` games, walk one round; for `simultaneous`, show everyone acting then the reveal.
- `step` = index into `turn.steps` that the slide illustrates (the step list highlights it).
- `say` = one or two short sentences; `**bold**` allowed.
- `svg` = the whole 320×200 scene for that slide.
- Wrap moving pieces in `A.k('key', svg)`: a piece with the same key in consecutive slides **slides**
  from its old spot to its new one; a new key **pops in**; a key that disappears **fades out**.
  This is how the board visibly changes (cards flying into a hand, a pawn moving, a tile being placed).
  Keys must be unique within a slide.
- `A.glow(cx, cy, r, key)` draws a pulsing ring to point at what matters on this slide.
- `A.tag(x, y, 'You')` labels player areas.
- Keep the scene simple and legible at ~600px wide: fewer, bigger pieces beat a faithful board.
  Text inside the scene must fit its shape (small cards need font size ≤ 6).

## Extended details (`extended`, heavy games only)

Only for games with complexity 4–5 (e.g. Magic, Twilight Imperium, Bridge). Rendered as a collapsed
"Extended details" section under the sheet. Everything a first game needs stays on the main sheet;
this is for game two onward.

```js
extended: [
  { title: 'The stack', text: 'One paragraph…' },
  { title: 'Common keywords', items: ['**Flying**: …', '**Trample**: …'] },
]
```
4–8 sections.
