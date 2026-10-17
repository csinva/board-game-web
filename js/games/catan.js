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

  // Components drawn once, used inline in text ({wood}) and in the walkthrough.
  icons: {
    wood: { name: 'wood', draw: A => A.rect(4, 1, 16, 22, '#dcefd3', { rx: 2.5, sw: 1.3 }) + A.poly([[12, 4], [17.5, 13], [6.5, 13]], '#2f6b2c', { sw: 0.8 }) + A.poly([[12, 8], [18, 17], [6, 17]], '#3f8a39', { sw: 0.8 }) + A.rect(11, 17, 2, 4, '#7a4b25', { rx: 0, sw: 0 }) },
    brick: { name: 'brick', draw: A => A.rect(4, 1, 16, 22, '#f6dccd', { rx: 2.5, sw: 1.3 }) + [[6, 6], [12, 6], [9, 10.5], [15, 10.5], [6, 15], [12, 15]].map(([x, y]) => A.rect(x - (x === 9 ? 3 : 0), y, x === 9 ? 6 : 6, 3.6, '#b8562f', { rx: 0.5, sw: 0.6 })).join('') },
    wheat: { name: 'wheat', draw: A => A.rect(4, 1, 16, 22, '#fbf0c4', { rx: 2.5, sw: 1.3 }) + A.line(12, 20, 12, 6, { stroke: '#b58a12', sw: 1.4 }) + [7, 10.5, 14].map(y => A.path(`M12 ${y + 2} q-4 -1 -4 -4 q4 0 4 4 M12 ${y + 2} q4 -1 4 -4 q-4 0 -4 4`, { fill: '#e8c547', stroke: '#b58a12', sw: 0.8 })).join('') },
    sheep: { name: 'sheep', draw: A => A.rect(4, 1, 16, 22, '#e3f2cc', { rx: 2.5, sw: 1.3 }) + A.rect(9, 15, 1.6, 4, '#2b2b2b', { rx: 0, sw: 0 }) + A.rect(14, 15, 1.6, 4, '#2b2b2b', { rx: 0, sw: 0 }) + [[9, 12], [12, 10.5], [15, 12], [12, 14]].map(([x, y]) => A.circle(x, y, 3.3, '#fff', { sw: 0.8 })).join('') + A.circle(17.3, 9.5, 2, '#2b2b2b', { sw: 0 }) },
    ore: { name: 'ore', draw: A => A.rect(4, 1, 16, 22, '#e1e3e6', { rx: 2.5, sw: 1.3 }) + A.poly([[6, 19], [9.5, 9], [13, 14], [15.5, 7], [18.5, 19]], '#7d828a', { sw: 0.9 }) + A.poly([[13, 14], [15.5, 7], [16.6, 11]], '#a8adb4', { sw: 0 }) },
    road: { name: 'road', draw: A => A.rect(2, 9.5, 20, 5, '#c8423b', { rx: 1, sw: 1.3, rotate: -30 }) },
    settlement: { name: 'settlement', draw: A => A.house(12, 20, 15, '#c8423b') },
    city: { name: 'city', draw: A => A.city(13, 20, 15, '#c8423b') },
    devcard: { name: 'development card', draw: A => A.rect(4, 1, 16, 22, '#7d55b5', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '?', { size: 13, weight: 800, fill: '#fff' }) },
    robber: { name: 'robber', draw: A => A.pawn(12, 12, 22, '#8c877f') },
  },

  pitch: 'Roll for resources, trade for what you lack, and build roads, settlements and cities to reach 10 points.',

  goal: { big: '10 points', text: 'The first player to have **10 victory points** (VP) during their own turn wins. Each settlement is worth 1 VP and each city 2 VP; bonus cards and VP cards add more.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Roll', text: 'Roll 2 dice. Every hex showing that number pays its resource to **every** building on its corners, whoever owns it: 1 card per {=settlement}, 2 per {=city}. The hex under the {robber} pays nothing.' },
      { verb: 'Trade', text: 'You may trade resource cards with other players (every trade must include you), or with the bank: 4 cards of one resource for 1 of your choice, or 3:1 or 2:1 if you have a building on a harbor.' },
      { verb: 'Build', text: 'Pay the costs below to build any number of {road}s, {settlement}s and {city} upgrades and to buy {devcard}s, in any order.' },
    ],
  },

  tension: 'Dice give you resources you can’t use, so you must trade, and every trade helps a rival.',

  structure: [
    { label: 'Setup', text: 'Each player places a {settlement} and a {road} touching it, twice: first going clockwise, then counter-clockwise (so the last player places twice in a row). Your second {settlement} gives your starting resources.' },
    { label: 'Turns', repeat: 'clockwise', text: 'You roll; every player with a building on a corner of a hex showing that number collects. Then you trade, then build. Play passes clockwise; there are no rounds or phases.' },
    { label: 'Game end', text: 'The moment a player has **10 VP** during their own turn, they win.' },
  ],

  points: [
    ['{=settlement} Settlement', '1 VP'],
    ['{=city} City', '2 VP (it replaces one of your settlements)'],
    ['Longest Road', '2 VP card to the first player with an unbroken line of **5 or more** of their own roads (branches don’t add). If another player builds a longer line, the card moves to them.'],
    ['Largest Army', '2 VP card to the first player to have played **3** knights. If another player has played more knights than the holder, the card moves to them.'],
    ['{=devcard} VP card', '1 VP each; keep it face down until you reveal it to win'],
  ],

  end: { trigger: 'a player has 10 VP during their own turn', detail: 'That player wins at once; there is no final round.' },
  scoring: [
    { label: '{=settlement} Settlements', share: 2 },
    { label: '{=city} Cities', share: 4 },
    { label: 'Road / Army bonus', share: 2 },
    { label: '{=devcard} VP cards', share: 1 },
  ],

  ref: {
    title: 'Build costs',
    rows: [
      ['Resources', '{wood} {brick} {wheat} {sheep} {ore}'],
      ['{=road} Road', '{=wood} {=brick} (on an edge touching your own road, settlement or city)'],
      ['{=settlement} Settlement', '{=wood} {=brick} {=wheat} {=sheep} (on an empty corner touching your own road)'],
      ['{=city} City', '{=ore}{=ore}{=ore} {=wheat}{=wheat} (replaces one of your settlements; the settlement returns to your supply)'],
      ['{=devcard} Dev card', '{=ore} {=wheat} {=sheep}. Each card is a knight (move the {robber} and steal 1 card), a progress card (build 2 roads free / take any 2 resource cards from the bank / name a resource and every other player gives you all their cards of it) or 1 VP'],
    ],
  },

  example: 'You roll {=d3}{=d5} = **8**. Your {settlement} is on a corner of the 8 ore hex, so you take 1 {ore}; Maya’s {city} on the same hex takes 2. You trade Maya a {sheep} for a {brick}, then pay {=wood} {=brick} for a {road}.',

  setup: [
    'Lay out 19 terrain hexes and a number token on each except the desert; the {robber} starts on the desert.',
    'Each player takes 5 {settlement}s, 4 {city} pieces and 15 {road}s; you can’t build more than these.',
    'Everyone rolls 2 dice; the highest roller places first. Going clockwise, each player places 1 {settlement} on an empty corner and 1 {road} on an edge touching that {settlement}.',
    'Then going counter-clockwise (so the last player places twice in a row), each player places a second {settlement} and a {road} touching it. Every {settlement} must be at least 2 edges from every other building (the distance rule). Your two {settlement}s don’t need to connect.',
    'Each player takes 1 resource card for each hex touching their second {settlement} (none from the desert). The highest roller takes the first turn.',
  ],

  terms: [
    ['{=vp} VP', 'Victory point. 10 wins.'],
    ['{=robber} Robber', 'Starts on the desert. Whoever rolls a 7 or plays a knight must move it to a different hex, then takes 1 random card from a player of their choice with a building on that hex. The hex under the robber pays nothing.'],
    ['Harbor', 'A pair of coastal corners marked 3:1 or with a resource. A building on one lets you trade with the bank at 3:1 (any resource) or 2:1 (only the resource shown).'],
    ['Pips', 'Dots on a number token: more dots, rolled more often.'],
  ],

  gotchas: [
    'On a **7**, nobody collects. First, every player with **8 or more** resource cards discards half of them (round down). Then the roller must move the {robber} to a different hex and steals 1 random card from a player with a building there.',
    'A {settlement} must be at least **two edges** from every other settlement or city, yours or anyone’s (the distance rule). After setup it must also touch one of your own {road}s.',
    'You may play at most **one** {devcard} per turn, and not one you bought this turn. A knight may be played before you roll. VP cards are exempt: reveal them as soon as they bring you to 10 VP.',
  ],

  tips: [
    'Build your settlements on hexes with different numbers; **6 and 8** are rolled most often.',
    '{wood} + {brick} matter early ({road}s, {settlement}s); {ore} + {wheat} matter late ({city} upgrades).',
    'Don’t trade with the leader.',
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
    // Same drawings as the inline icons, so the cards here match the quick reference.
    const icons = this.icons, card = (x, y, fill, res) => A.use(icons[res].draw(A), x - 5, y - 1, 31);
    const dice = (a, b, x = 214, y = 150) => A.k('dice', A.die(x, y, 22, a) + A.die(x + 26, y, 22, b));
    // Hands: Maya top-right, you bottom-right.
    const maya = (i) => [208 + i * 24, 30];
    const you = (i) => [208 + i * 24, 124];
    const atOre = [oreX - 10, oreY - 14];
    const road = A.k('road', A.line(ox, oy - s, ox, oy - 2 * s, { stroke: C.red, sw: 6 }));
    const start = A.k('you-sheep', card(...you(0), C.sheep, 'sheep')) + A.k('you-wood', card(...you(1), C.forest, 'wood')) +
      A.k('maya-brick', card(...maya(0), C.brick, 'brick'));
    return [
      { step: 0, say: 'Roll: **3 + 5 = 8**.', svg: board + start + dice(3, 5, 150, 150) },
      { step: 0, say: 'Every **8** hex pays each building on its corners: your {settlement} gets 1 {ore}, Maya’s {city} gets 2.', svg: board + start + dice(3, 5, 150, 150) + A.glow(oreX, oreY, 26, 'glow-ore') +
        A.k('you-ore', card(...atOre, C.ore, 'ore')) + A.k('maya-ore1', card(atOre[0] - 6, atOre[1] + 4, C.ore, 'ore')) + A.k('maya-ore2', card(atOre[0] + 6, atOre[1] + 4, C.ore, 'ore')) },
      { step: 0, say: 'The cards go to each hand.', svg: board + start + dice(3, 5, 150, 150) +
        A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) },
      { step: 1, say: '**Trade.** You need a {brick} for a road. Maya accepts your {sheep} for it.', svg: board + dice(3, 5, 150, 150) +
        A.k('you-wood', card(...you(1), C.forest, 'wood')) + A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) +
        A.k('you-sheep', card(...maya(3), C.sheep, 'sheep')) + A.k('maya-brick', card(...you(0), C.brick, 'brick')) },
      { step: 2, say: '**Build.** Pay {=wood} {=brick} to the bank; place a {road} on an edge touching your own road or building.', svg: board + dice(3, 5, 150, 150) +
        A.k('you-ore', card(...you(2), C.ore, 'ore')) + A.k('maya-ore1', card(...maya(1), C.ore, 'ore')) + A.k('maya-ore2', card(...maya(2), C.ore, 'ore')) +
        A.k('you-sheep', card(...maya(3), C.sheep, 'sheep')) + road + A.glow(ox, oy - 1.5 * s, 14, 'glow-road') },
      { step: 2, say: 'Your turn is over. The dice pass clockwise to Maya.', svg: board + dice(3, 5, 214, 64) +
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
