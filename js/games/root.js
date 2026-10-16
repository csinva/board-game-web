defineGame({
  id: 'root',
  name: 'Root',
  year: 2018,
  designer: 'Cole Wehrle',
  family: 'conflict',
  players: [2, 4], best: '4',
  time: [60, 90],
  age: 10,
  mechanics: ['variable-powers', 'area-control', 'hand-management', 'dice', 'take-that', 'action-points'],
  profile: { complexity: 4, luck: 2, interaction: 5, conflict: 4, talk: 3, planning: 4 },

  pitch: 'Woodland factions fight over a forest, each playing by completely different rules: one game, four very different puzzles.',
  theme: 'You are a faction of woodland animals (industrial cats, proud birds, rebel critters or a lone wanderer) fighting for the forest.',

  goal: { big: '30 points', text: 'First to **30 victory points** wins at once. Each faction scores in its own way, so watch how the others score.' },

  turn: {
    type: 'sequence',
    intro: 'Every faction’s turn has the same three phases; what you do in each is printed on your faction board:',
    steps: [
      { verb: 'Birdsong', text: 'Start-of-turn upkeep: e.g. Cats place wood, Eyrie add cards to the **Decree**, Alliance revolts.' },
      { verb: 'Daylight', text: 'Your main actions: **craft** cards, then move, battle, recruit and build by your faction’s rules.' },
      { verb: 'Evening', text: 'Score or tidy up, **draw 1 card** (more with some bonuses), then discard down to **5**.' },
    ],
  },

  tension: 'Every faction is strongest where it is left alone, so you must decide when to hit the leader and when to let someone else pay to do it.',

  flow: [
    { label: 'Spread', items: ['Move warriors', 'Rule clearings', 'Place buildings / tokens'] },
    { label: 'Fight', items: ['Battle with 2 dice', '1 VP per building or token removed'] },
    { label: 'Score', items: ['Faction scoring', 'Craft items for VP', 'Dominance cards'] },
  ],

  end: { trigger: 'someone reaches 30 VP', detail: 'Or, after reaching 10 VP, a player may swap their score for a Dominance card and win by ruling its clearings at the start of their turn.' },
  scoring: [
    { label: 'Faction engine', share: 6 },
    { label: 'Battles', share: 2 },
    { label: 'Crafted items', share: 2 },
  ],

  ref: {
    title: 'The four base factions',
    rows: [
      ['Marquise de Cat (orange)', 'Industry: build sawmills, workshops and recruiters; score for each building.'],
      ['Eyrie Dynasties (blue)', 'Must carry out a growing **Decree** every turn; failing it causes turmoil.'],
      ['Woodland Alliance (green)', 'Spread sympathy tokens, then revolt and build bases.'],
      ['Vagabond (grey)', 'One pawn. Explore ruins, do quests, help or betray anyone.'],
    ],
  },

  example: 'The Cats take their 3 Daylight actions. They spend 1 wood to build a 2nd workshop (+2 VP), march 4 warriors into a mouse clearing, then battle the Eyrie there. They roll 3 and 1: the attacker uses the higher die, so the Eyrie lose 3 (2 warriors, then the roost) the Cats lose 1 warrior, and they score **1 VP** for the roost.',

  setup: [
    'Lay out the forest board and ruins; shuffle the shared deck and deal 3 cards each.',
    'Pick factions: 2 players use Cats vs Eyrie, add the Alliance at 3 and the Vagabond at 4.',
    'Set up in order (Cats, Eyrie, Alliance, Vagabond) following the back of each faction board.',
  ],

  terms: [
    ['Clearing', 'A space on the map, marked fox, rabbit or mouse. Birds are wild.'],
    ['Rule', 'Having the most warriors + buildings in a clearing. Needed to move and to build.'],
    ['Craft', 'Play a card by tapping crafting pieces of its suit; items score VP.'],
    ['Defenseless', 'No warriors in the clearing: the attacker deals +1 hit.'],
    ['Decree', 'The Eyrie’s programmed row of actions that grows every turn.'],
  ],

  gotchas: [
    'To move, you must **rule** the clearing you leave **or** the one you enter.',
    'In battle both roll 2 dice: the **attacker takes the higher**, the defender the lower; hits are capped by warriors present.',
    'You score **1 VP** for each enemy building or token you remove, but nothing for killing warriors.',
  ],

  tips: [
    'Read every faction board before starting: you need to know how each rival scores.',
    'Hit whoever is running away with points; the Alliance and Vagabond are easy to underestimate.',
    'Craft early: the shared cards’ items and effects add up quickly.',
  ],

  art(A) {
    const C = A.C;
    const suit = { f: '#d9472f', r: '#e9c43a', m: '#e88a3a' };
    let o = A.bg('#cfe0a8');
    // forest patches
    const blobs = [[85, 70, 34, 22], [180, 60, 40, 22], [160, 135, 40, 24], [255, 110, 30, 24], [60, 140, 26, 18]];
    for (const [x, y, rx, ry] of blobs) o += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#8fb36a" stroke="none"/>`;
    // river
    o += A.path('M0 92 Q60 96 100 110 T200 104 T320 128', { stroke: '#6fb2d8', sw: 7 });
    const N = { a: [36, 42, 'f'], b: [130, 40, 'm'], c: [232, 42, 'r'], d: [294, 84, 'm'], e: [30, 104, 'r'], f: [118, 100, 'f'], g: [204, 100, 'm'], h: [292, 150, 'f'], i: [42, 160, 'm'], j: [130, 160, 'r'], k: [222, 160, 'f'] };
    const E = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'e'], ['a', 'f'], ['b', 'f'], ['c', 'g'], ['d', 'g'], ['d', 'h'], ['e', 'f'], ['f', 'g'], ['e', 'i'], ['i', 'j'], ['f', 'j'], ['g', 'k'], ['j', 'k'], ['k', 'h']];
    for (const [p, q] of E) o += A.line(N[p][0], N[p][1], N[q][0], N[q][1], { stroke: '#f3ead2', sw: 4 });
    for (const k in N) { const [x, y, sft] = N[k]; o += A.circle(x, y, 16, '#f3ead2', { stroke: '#5a4630', sw: 1.6 }) + A.circle(x - 11, y - 11, 4, suit[sft], { sw: 1 }); }
    const bld = (x, y, f) => A.rect(x - 5, y - 5, 10, 10, f, { rx: 1.5, sw: 1 });
    const war = (x, y, f) => A.meeple(x, y, 11, f);
    // Cats (orange) west
    o += bld(N.a[0] - 4, N.a[1] + 2, '#e07b2e') + bld(N.a[0] + 7, N.a[1] + 2, '#e07b2e') + war(N.e[0] - 5, N.e[1] + 2, '#e07b2e') + war(N.e[0] + 5, N.e[1] + 2, '#e07b2e');
    o += war(N.f[0] - 5, N.f[1] + 2, '#e07b2e') + war(N.f[0] + 5, N.f[1] + 2, '#e07b2e') + bld(N.i[0] + 3, N.i[1] + 2, '#e07b2e');
    // Eyrie (blue) east
    o += bld(N.d[0] + 2, N.d[1] + 2, '#2f6db5') + war(N.g[0] - 5, N.g[1] + 2, '#2f6db5') + war(N.g[0] + 5, N.g[1] + 2, '#2f6db5') + war(N.c[0], N.c[1] + 2, '#2f6db5');
    // Alliance sympathy (green tokens)
    o += A.circle(N.j[0] + 2, N.j[1] + 2, 6, '#3c8d4f', { sw: 1 }) + A.circle(N.k[0] + 2, N.k[1] + 2, 6, '#3c8d4f', { sw: 1 });
    // Vagabond
    o += A.pawn(N.b[0] + 2, N.b[1] - 1, 15, '#8c877f');
    o += A.note(N.a[0] - 11, N.a[1] - 11, 74, 11, 'Clearing suit: fox');
    o += A.note(N.f[0] + 5, N.f[1] - 5, 176, 130, 'Cat warriors');
    o += A.note(N.d[0] + 2, N.d[1] - 3, 280, 11, 'Eyrie roost');
    o += A.note(N.k[0] + 2, N.k[1] + 2, 230, 192, 'Alliance sympathy');
    return o;
  },
});
