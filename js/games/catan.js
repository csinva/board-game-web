defineGame({
  id: 'catan',
  name: 'Catan',
  year: 1995,
  designer: 'Klaus Teuber',
  family: 'build',
  players: [3, 4], best: '4',
  time: [60, 120],
  age: 10,
  mechanics: ['dice', 'trading', 'negotiation', 'network', 'resource-management', 'set-collection'],
  profile: { complexity: 2, luck: 4, interaction: 5, conflict: 3, talk: 4, planning: 3 },

  pitch: 'Settle an island by trading for the resources the dice won’t give you, then turn them into roads, towns and cities.',
  theme: 'You are settlers racing to develop a newly discovered island.',

  goal: { big: '10 points', text: 'First to **10 victory points** on their own turn wins. A settlement is worth 1, a city 2, plus a few bonus cards.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Roll', text: 'Roll 2 dice. Every hex with that number pays its resource to **every** building touching it, for all players.' },
      { verb: 'Trade', text: 'Swap cards with anyone at the table, or with the bank at 4:1 (better at harbors).' },
      { verb: 'Build', text: 'Spend cards on roads, settlements, cities or development cards, as many as you can afford.' },
    ],
  },

  tension: 'The dice hand you resources you don’t need, so you must trade, but every trade also helps a rival.',

  flow: [
    { label: 'Collect', items: ['Dice payouts', 'Trades', 'Harbors'] },
    { label: 'Spend', items: ['Roads', 'Settlements', 'Cities', 'Dev cards'] },
    { label: 'Score', items: ['1 VP / settlement', '2 VP / city', 'Longest Road +2', 'Largest Army +2'] },
  ],

  end: { trigger: 'Someone reaches 10 VP on their turn', detail: 'The game ends immediately; there is no final round.' },
  scoring: [
    { label: 'Settlements', share: 2 },
    { label: 'Cities', share: 4 },
    { label: 'Road / Army bonus', share: 2 },
    { label: 'VP cards', share: 1 },
  ],

  ref: {
    title: 'Build costs',
    rows: [
      ['Road', 'wood + brick'],
      ['Settlement', 'wood + brick + wheat + sheep'],
      ['City (upgrade)', '3 ore + 2 wheat'],
      ['Dev card', 'ore + wheat + sheep'],
    ],
  },

  example: 'You roll an **8**. Your settlement touches the 8 ore hex, so you take 1 ore, and Maya’s city on the same hex takes 2. You trade Maya a spare sheep for a brick, then pay wood + brick to build a road toward an open corner.',

  setup: [
    'Build the island: shuffle 19 terrain hexes and lay number tokens on them.',
    'Snake draft: each player places a settlement + road, then a second pair in reverse order.',
    'Take one resource from each hex touching your second settlement.',
  ],

  terms: [
    ['VP', 'Victory point. 10 wins.'],
    ['Robber', 'Moved on a 7. Blocks its hex and lets you steal a card.'],
    ['Harbor', 'Coastal corner that improves your bank trades to 3:1 or 2:1.'],
    ['Pips', 'Dots on a number token: more dots = rolled more often.'],
  ],

  gotchas: [
    'On a **7** nobody collects. Anyone holding 8+ cards discards half, then the roller moves the robber and steals 1 card.',
    'Settlements must be at least **two edges apart** and (after setup) connected to your own road.',
    'You can’t play a dev card the turn you buy it, and only **one** per turn.',
  ],

  tips: [
    'Spread over many numbers. **6 and 8** are the best tokens.',
    'Wood + brick win the early game (expansion); ore + wheat win the late game (cities).',
    'Offer trades that help you more than them, and stop trading with the leader.',
  ],

  walk(A) {
    const C = A.C, s = 24, ox = 104, oy = 108;
    const hexes = [[0, 0, C.desert], [1, 0, C.forest, 6], [-1, 0, C.wheat, 9], [0, 1, C.sheep, 5], [0, -1, C.ore, 8], [1, -1, C.brick, 4], [-1, 1, C.forest, 10]];
    const [oreX, oreY] = A.hexAt(0, -1, s, ox, oy);
    let board = A.bg(C.sea) + A.rect(196, 0, 124, 200, '#f6efe0', { sw: 0, rx: 0 }) + A.line(196, 0, 196, 200, { sw: 2 });
    for (const [q, r, f, n] of hexes) { const [x, y] = A.hexAt(q, r, s, ox, oy); board += A.hex(x, y, s, f, { label: n }); }
    board += A.house(ox, oy - s + 5, 12, C.red) + A.city(oreX, oy - s / 2 + 5, 13, C.blue);
    board += A.pawn(ox, oy + 2, 18, C.gray);
    board += A.tag(258, 14, 'Maya (blue)', { fill: C.blue }) + A.tag(258, 112, 'You (red)', { fill: C.red });
    const card = (x, y, fill, lab) => A.card(x, y, 21, 29, fill, { label: lab, size: 5.6, labelFill: C.ink });
    const dice = (a, b, x = 214, y = 150) => A.k('dice', A.die(x, y, 22, a) + A.die(x + 26, y, 22, b));
    // Hands: Maya top-right, you bottom-right.
    const maya = (i) => [208 + i * 24, 30];
    const you = (i) => [208 + i * 24, 124];
    const atOre = [oreX - 10, oreY - 14];
    const road = A.k('road', A.line(ox, oy - s, ox, oy - 2 * s, { stroke: C.red, sw: 6 }));
    const start = A.k('you-sheep', card(...you(0), C.sheep, 'sheep')) + A.k('you-wood', card(...you(1), C.forest, 'wood')) +
      A.k('maya-brick', card(...maya(0), C.brick, 'brick'));
    return [
      { step: 0, say: 'Your turn. Roll both dice: **3 + 5 = 8**.', svg: board + start + dice(3, 5, 150, 150) },
      { step: 0, say: 'Every hex numbered **8** pays, to everyone. It’s the ore hex: your settlement touches it (1 ore) and so does Maya’s city (2 ore).', svg: board + start + dice(3, 5, 150, 150) + A.glow(oreX, oreY, 26, 'glow-ore') +
        A.k('you-ore', card(...atOre, C.ore, 'ore')) + A.k('maya-ore1', card(atOre[0] - 6, atOre[1] + 4, C.ore, 'ore')) + A.k('maya-ore2', card(atOre[0] + 6, atOre[1] + 4, C.ore, 'ore')) },
      { step: 0, say: 'The cards go into each hand. The dice give, but rarely exactly what you need.', svg: board + start + dice(3, 5, 150, 150) +
        A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) },
      { step: 1, say: '**Trade.** You need brick for a road. You offer Maya your sheep for her brick, and she agrees.', svg: board + dice(3, 5, 150, 150) +
        A.k('you-wood', card(...you(1), C.forest, 'wood')) + A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) +
        A.k('you-sheep', card(...maya(3), C.sheep, 'sheep')) + A.k('maya-brick', card(...you(0), C.brick, 'brick')) },
      { step: 2, say: '**Build.** Pay wood + brick back to the bank and place a road on an edge next to your settlement.', svg: board + dice(3, 5, 150, 150) +
        A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) +
        A.k('you-sheep', card(...maya(3), C.sheep, 'sheep')) + road + A.glow(ox, oy - 1.5 * s, 14, 'glow-road') },
      { step: 2, say: 'Done. The dice pass to Maya. Your road points toward a new corner for your next settlement.', svg: board + dice(3, 5, 214, 64) +
        A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) +
        A.k('you-sheep', card(...maya(3), C.sheep, 'sheep')) + road },
    ];
  },

  art(A) {
    const C = A.C, s = 27, ox = 120, oy = 108;
    const hexes = [[0, 0, C.desert], [1, 0, C.forest, 6], [-1, 0, C.wheat, 9], [0, 1, C.sheep, 5], [0, -1, C.ore, 8], [1, -1, C.brick, 4], [-1, 1, C.forest, 10]];
    let o = A.bg(C.sea);
    for (const [q, r, f, n] of hexes) { const [x, y] = A.hexAt(q, r, s, ox, oy); o += A.hex(x, y, s, f, { label: n }); }
    o += A.line(ox, oy - s, ox - s * 0.866, oy - s / 2, { stroke: C.red, sw: 6 });
    o += A.house(ox, oy - s + 6, 13, C.red);
    o += A.city(ox + s * 0.866, oy - s / 2 + 6, 14, C.blue);
    o += A.pawn(ox, oy + 2, 22, C.gray);
    o += A.die(248, 14, 24, 3) + A.die(278, 14, 24, 5);
    o += A.text(276, 52, '= 8', { size: 13, weight: 800 });
    o += A.curve(255, 52, 200, 40, ox - 3, oy - s * 1.5 - 12, { sw: 1.6 });
    o += A.note(ox, oy - s + 2, 46, 16, 'Settlement on a corner');
    o += A.note(ox - 12, oy - s * 0.75, 44, 182, 'Road on an edge');
    o += A.note(ox + 5, oy + 6, 240, 182, 'Robber blocks a hex');
    o += A.note(ox + s * 0.866 + 4, oy - s / 2, 262, 92, 'City pays double');
    return o;
  },
});
