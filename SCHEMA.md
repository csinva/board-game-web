# Game sheet schema

Every game lives in `js/games/<id>.js` and calls `defineGame({...})` once.
`js/games/catan.js` is the reference implementation. Copy its shape.
Run `tools/validate.sh <id>` to check a file.

## Why the sheet is ordered this way

The panels follow the order an experienced teacher explains a game.
The usual mistake is to start with components and edge cases. This order starts with purpose instead:

| # | Panel | Question it answers | Layer |
|---|-------|---------------------|-------|
| 1 | What it is (art + theme) | What are we pretending to be? What does the table look like? | 30 sec |
| 2 | How you win | What am I trying to do? | 30 sec |
| 3 | How it ends | How long is this, and what's the clock? | 30 sec |
| 4 | Your turn | What can I actually do? | 30 sec |
| 5 | How it flows + key decision | How do I get stronger, and what's the interesting choice? | 5 min |
| 6 | One turn, played out | Show me a concrete example. | 5 min |
| – | Quick reference, key terms | The lookup table you keep on the table. | 5 min |
| 7 | Rules people miss | The exceptions, saved until now. | Everything |
| 8 | First-game tips | How not to flounder. | Everything |
| – | Profile, setup, similar games | Is this for me? How do I start? | Everything |

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
  flow: [ { label: 'Collect', items: [...] }, { label: 'Spend', items: [...] }, { label: 'Score', items: [...] } ], // 2–4 stages, 2–5 short items each

  end: { trigger: 'Short clause; it is also read as "The game ends when <trigger>"', detail: 'optional' ,
         results: [{ side: 'Liberals win', text: 'if ...' }] },   // results is for team / win-lose games
  scoring: [{ label: 'Birds', share: 4 }, ...],                     // for points games: rough share of a typical winning score

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

- Plain words. Define any jargon in `terms`.
- Every sentence should help a first-time player. Cut lore.
- `**bold**` is the only markup. Use it for the one word that matters in a sentence.
- Keep the profile scores comparable across games. Calibrate against Catan:
  complexity 2, luck 4, interaction 5, conflict 3, talk 4, planning 3.

## Illustration guidelines

- Draw *the table at a glance*: the board, cards or tiles in a recognizable mid-game state, using `js/art.js` helpers.
- Add 2–4 `A.note(px, py, tx, ty, 'label')` callouts that name the parts a new player needs to know.
  Labels should be short (≤ 26 chars). Callouts are clamped to the canvas, but avoid overlaps.
- Use the game's real colour language (e.g. Catan resources, Ticket to Ride route colours).
- No text-heavy art and no logos or trademarks. Stylized only.
