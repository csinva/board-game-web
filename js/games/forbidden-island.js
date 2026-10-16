defineGame({
  id: 'forbidden-island',
  name: 'Forbidden Island',
  year: 2010,
  designer: 'Matt Leacock',
  family: 'coop',
  players: [2, 4], best: '4',
  time: [30, 30],
  age: 10,
  mechanics: ['cooperative', 'action-points', 'set-collection', 'hand-management', 'variable-powers', 'grid-movement'],
  profile: { complexity: 1, luck: 3, interaction: 4, conflict: 1, talk: 5, planning: 3 },

  // Components drawn once, used inline in text ({earth}) and in the art / walkthrough.
  icons: {
    earth: { name: 'Earth Stone', draw: A => A.poly([[12, 3], [3, 19], [12, 21.5]], '#a07c52', { sw: 1.3 }) + A.poly([[12, 3], [21, 19], [12, 21.5]], '#6f5232', { sw: 1.3 }) },
    wind: { name: 'Statue of the Wind', draw: A => A.circle(12, 12, 9.5, '#c9a227', { sw: 1.3 }) + A.path('M6 9.5 q4 -3 8 0 q2.5 1.6 4 -0.5', { stroke: '#fff', sw: 1.6 }) + A.path('M6 14 q4 -3 8 0 q2.5 1.6 4 -0.5', { stroke: '#fff', sw: 1.6 }) },
    fire: { name: 'Crystal of Fire', draw: A => A.poly([[12, 2], [19.5, 9], [16, 21.5], [8, 21.5], [4.5, 9]], '#c94c3a', { sw: 1.3 }) + A.poly([[12, 2], [15, 9], [12, 21.5], [9, 9]], '#e57a5f', { sw: 0.8 }) + A.line(4.5, 9, 19.5, 9, { sw: 0.8 }) },
    ocean: { name: 'Ocean’s Chalice', draw: A => A.path('M4.5 3.5 h15 q0 10 -7.5 10.5 q-7.5 -0.5 -7.5 -10.5z', { fill: '#3db0b0', sw: 1.3 }) + A.rect(10.8, 13.5, 2.4, 5, '#3db0b0', { rx: 0, sw: 1 }) + A.rect(7, 18.5, 10, 3, '#3db0b0', { rx: 1.2, sw: 1.2 }) },
    tcard: { name: 'treasure card', draw: A => A.rect(4, 1, 16, 22, '#8b2f3a', { rx: 2.5, sw: 1.3 }) + A.star(12, 12, 5.5, '#f2c84b', { sw: 0.6 }) },
    rise: { name: 'Waters Rise!', draw: A => A.rect(4, 1, 16, 22, '#1d4e6e', { rx: 2.5, sw: 1.3 }) + A.path('M7 17 q2.5 -2.5 5 0 q2.5 2.5 5 0', { stroke: '#8fd0ee', sw: 1.5 }) + A.arrow(12, 13, 12, 4.5, { stroke: '#fff', sw: 1.6, head: 4 }) },
    tile: { name: 'dry tile', draw: A => A.rect(2.5, 2.5, 19, 19, '#e3cf9a', { rx: 2.5, stroke: '#7a5a2e', sw: 1.3 }) + A.rect(5, 5, 14, 14, '#a7c87a', { rx: 1.5, sw: 0, opacity: 0.7 }) },
    flooded: { name: 'flooded tile', draw: A => A.rect(2.5, 2.5, 19, 19, '#5aa9d6', { rx: 2.5, stroke: '#1d4e6e', sw: 1.3 }) + A.path('M6 12 q3 -3 6 0 q3 3 6 0', { stroke: '#fff', sw: 1.6 }) },
    sunk: { name: 'sunk tile', draw: A => A.rect(2.5, 2.5, 19, 19, '#cfeaf6', { rx: 2.5, stroke: '#2f86b5', sw: 1.3, dash: '3 2' }) + A.path('M6 12 q3 -3 6 0 q3 3 6 0', { stroke: '#2f86b5', sw: 1.4 }) },
    level: { name: 'water level', draw: A => A.rect(8, 1.5, 13, 21, '#e9f5fb', { rx: 3.5, sw: 1.4 }) + A.rect(9.5, 10, 10, 11, '#2a6c96', { rx: 2.5, sw: 0 }) + A.line(8.5, 6, 13, 6, { sw: 1.1 }) + A.line(8.5, 10, 13, 10, { sw: 1.1, stroke: '#fff' }) + A.line(8.5, 14, 13, 14, { sw: 1.1, stroke: '#fff' }) + A.poly([[1, 6.5], [7, 10], [1, 13.5]], '#c8423b', { sw: 0.8 }) },
    heli: { name: 'Helicopter Lift', draw: A => A.circle(12, 12, 9.5, '#fff', { sw: 1.3 }) + A.text(12, 12.5, 'H', { size: 12, weight: 800 }) },
  },

  pitch: 'Move, shore up flooding tiles and trade cards to capture 4 treasures, then all fly off Fools’ Landing together.',

  goal: { big: '4 treasures', text: 'Capture all **4 treasures**, gather everyone on **Fools’ Landing**, and play a {heli} to leave. Everyone wins or loses together.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Act ×3', text: 'Take up to **3 actions**: move 1 tile, shore up a {=flooded} tile, give a {tcard} to a player on your tile, or capture a treasure.' },
      { verb: 'Draw 2', text: 'Draw 2 {tcard}s; hand limit 5. {rise} is not replaced: it raises the {level} and puts the flood discards back on top of the flood deck.' },
      { verb: 'Flood', text: 'Draw flood cards equal to the **water level**. Each named tile flips {=tile} → {=flooded}; one already flooded **sinks**.' },
    ],
  },

  tension: 'Each action spent shoring up is one not spent reaching the treasures, and tiles sink every turn.',

  structure: [
    { label: 'Setup', text: 'Lay the island, flood 6 tiles, put each pawn on its role’s start tile, deal 2 {=tcard} each.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Up to 3 actions → draw 2 {=tcard} → draw flood cards equal to the {level}.' },
    { label: 'Waters Rise!', text: 'When drawn: {=level} +1; shuffle the flood discards and put them on top of the flood deck; discard the card.' },
    { label: 'Sinking', text: 'A {=flooded} tile that floods again is removed with its flood card. Pawns on it swim to an adjacent tile at once.' },
    { label: 'Game end', text: 'Win: everyone on Fools’ Landing with all 4 treasures, then play {=heli}. Lose: an uncaptured treasure’s 2 tiles sink, Fools’ Landing sinks, a pawn can’t swim off, or the water hits the skull.' },
  ],

  end: {
    trigger: 'the team escapes with all 4 treasures, or a loss condition hits',
    results: [
      { side: 'Team wins', text: 'when everyone is on Fools’ Landing with all 4 treasures and someone plays {heli}.' },
      { side: 'Team loses', text: 'if both tiles of an uncaptured treasure sink, Fools’ Landing sinks, a player can’t swim off a sinking tile, or the water reaches the **skull**.' },
    ],
  },

  ref: {
    title: 'Roles',
    rows: [
      ['Pilot', 'once a turn, fly to any tile (1 action)'],
      ['Engineer', 'shore up 2 tiles for 1 action'],
      ['Explorer', 'moves and shores up diagonally'],
      ['Diver', 'moves through any adjacent {=flooded} and {=sunk} tiles for 1 action'],
      ['Navigator', 'moves another player up to 2 tiles per action'],
      ['Messenger', 'gives {=tcard} from anywhere'],
    ],
  },

  example: 'Water level is 3. Sam (Engineer) moves onto Moon Temple (1 action), shores up 2 flooded tiles beside him (1 action), and moves again. He draws an {=earth} card and {rise}: level 4. He flips 4 flood cards; Coral Palace was already {=flooded}, so it **sinks**.',

  setup: [
    'Lay the 24 tiles in the island shape; place the 4 treasures {=earth}{=wind}{=fire}{=ocean} beside it.',
    'Flood 6 tiles: draw 6 flood cards and flip those tiles to {=flooded}.',
    'Deal roles; each pawn starts on the tile showing its icon. Deal 2 {=tcard} each (replace and reshuffle any Waters Rise!). Set the {level} at Novice (first game), Normal, Elite or Legendary.',
  ],

  terms: [
    ['Shore up', 'Flip a {=flooded} tile back to {=tile}: yours or an adjacent one.'],
    ['{=flooded} Flooded', 'Still usable (you may stand on it); the next flood sinks it.'],
    ['{=sunk} Sunk', 'Tile removed for good, with its flood card.'],
    ['{=level} Water level', 'Flood cards drawn per turn. Rises with each Waters Rise!'],
    ['Treasures', '{=earth}{=wind}{=fire}{=ocean}: 2 tiles each; capture with 4 matching {=tcard}.'],
  ],

  gotchas: [
    'Movement and shoring up are **orthogonal only** unless you’re the Explorer.',
    'Capturing needs **4 matching cards**, discarded while on one of **its 2** tiles (flooded is fine). {heli} and Sandbags can’t be given.',
    '{heli} (fly any pawns on one tile to any tile) and Sandbags (shore up any tile) play **any time**, even on others’ turns, for no action. Sandbags can’t save a tile once its flood card is drawn.',
  ],

  tips: [
    'Keep **Fools’ Landing** and 1 tile per uncaptured treasure dry: losing them loses the game.',
    'After a Waters Rise!, the just-flooded tiles come up again soon: shore those up first.',
    'Discard cards of treasures already captured.',
  ],

  walk(A) {
    const C = A.C, s = 34, ox = 14, oy = 24, ic = this.icons;
    const names = [['Watchtower', 'Bronze Gate', 'Twilight', 'Observatory'], ['Lost Lagoon', 'Moon Temple', 'Coral Palace', 'Cliffs'],
      ['Iron Gate', 'Phantom Rock', 'Misty Marsh', 'Dunes'], ['Fools’ Land.', 'Copper Gate', 'Silver Gate', 'Gold Gate']];
    const at = (i, j) => [ox + i * (s + 4), oy + j * (s + 4)];
    const earth = '#8a6a45', ocean = '#3db0b0';
    let board = A.bg('#2f86b5');
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) board += A.path(`M${214 + (j % 2) * 12 + i * 20} ${70 + j * 14} q4 -4 8 0 q4 4 8 0`, { stroke: '#8fd0ee', sw: 1.1, opacity: 0.5 });
    // Sunk outlines show through wherever a tile is gone.
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const [x, y] = at(i, j); board += A.rect(x, y, s, s, 'none', { stroke: '#bfe6f7', dash: '3 3', sw: 1 }); }
    const tile = (i, j) => {
      const [x, y] = at(i, j); let t = A.rect(x, y, s, s, '#e3cf9a', { stroke: '#7a5a2e' }) + A.rect(x + 3, y + 3, s - 6, s - 13, '#a7c87a', { rx: 2, sw: 0, opacity: 0.55 });
      if (i === 1 && j === 1) t += A.use(ic.earth.draw(A), x + 3, y + 3, 15);
      if (i === 2 && j === 1) t += A.use(ic.ocean.draw(A), x + 3, y + 3, 15);
      if (i === 0 && j === 3) t += A.use(ic.heli.draw(A), x + 10, y + 5, 14);
      return t + A.text(x + s / 2, y + s - 6, names[j][i], { size: 5, weight: 700 });
    };
    const flood = (i, j) => {
      const [x, y] = at(i, j);
      return A.k(`fl-${i}-${j}`, A.rect(x, y, s, s, '#4f9fd0', { stroke: '#1d4e6e', opacity: 0.92 }) + A.path(`M${x + 9} ${y + 12} q4 -4 8 0 q4 4 8 0`, { stroke: '#fff', sw: 1.3 }) +
        A.text(x + s / 2, y + s - 6, names[j][i], { size: 5, weight: 700, fill: C.white }));
    };
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) if (!(i === 2 && j === 1)) board += tile(i, j);
    // Right panel: treasure deck, Sam's hand, water meter.
    board += A.use(ic.tcard.draw(A), 173.5, 14.4, 39.3);
    board += A.tag(222, 124, 'Sam · Engineer', { fill: C.red });
    board += A.rect(286, 16, 24, 160, '#e9f5fb', { rx: 6 }) + A.text(298, 10, 'Water', { size: 6.5, fill: C.white });
    const lv = [2, 2, 3, 3, 3, 4, 4, 5, 5, '☠'], ly = (i) => 164 - i * 15.5;
    lv.forEach((v, i) => { board += A.text(298, ly(i), v, { size: i === 9 ? 9 : 7, weight: 800, fill: v >= 4 || i === 9 ? C.red : '#1d4e6e' }); });
    const level = (i) => A.k('lvl', A.poly([[272, ly(i) - 5], [283, ly(i)], [272, ly(i) + 5]], C.red, { sw: 1 }));
    const hc = (i, res, key) => A.k(key, A.card(180 + i * 26, 136, 24, 34, '#8b2f3a') + A.use(ic[res].draw(A), 183 + i * 26, 144, 18));
    const hand = hc(0, 'ocean', 'h1') + hc(1, 'earth', 'h2');
    const coral = A.k('tile-cp', tile(2, 1));
    const sam = (i, j) => { const [x, y] = at(i, j); return A.k('sam', A.pawn(x + s - 9, y + 13, 15, C.red)); };
    const pre = board + coral + flood(2, 1) + hand;
    return [
      { step: 0, say: 'The {level} shows **3**. Sam (**Engineer**) is on Phantom Rock with 3 actions.',
        svg: pre + flood(0, 1) + flood(1, 0) + sam(1, 2) + level(4) },
      { step: 0, say: '**Action 1: move** up onto Moon Temple, one of the 2 {=earth} tiles.',
        svg: pre + flood(0, 1) + flood(1, 0) + sam(1, 1) + level(4) + A.glow(at(1, 1)[0] + s / 2, at(1, 1)[1] + s / 2, 24) },
      { step: 0, say: '**Action 2: shore up.** An Engineer dries **2** tiles per action: Lost Lagoon and Bronze Gate flip to {=tile}.',
        svg: pre + sam(1, 1) + level(4) + A.glow(at(0, 1)[0] + s / 2, at(0, 1)[1] + s / 2, 22, 'g1') + A.glow(at(1, 0)[0] + s / 2, at(1, 0)[1] + s / 2, 22, 'g2') },
      { step: 0, say: '**Action 3: move** up to Bronze Gate. Coral Palace stays {=flooded}.',
        svg: pre + sam(1, 0) + level(4) + A.glow(at(2, 1)[0] + s / 2, at(2, 1)[1] + s / 2, 24, 'gc') },
      { step: 1, say: '**Draw 2:** an {=earth} card, then {rise}: level **4**.',
        svg: pre + sam(1, 0) + hc(2, 'earth', 'h3') + A.k('wr', A.use(ic.rise.draw(A), 204.7, 14.2, 43.6)) + level(5) + A.glow(277, ly(5), 12) },
      { step: 2, say: '**Flood:** draw 4 flood cards. Watchtower, Dunes and Silver Gate flip to {=flooded}…',
        svg: pre + sam(1, 0) + hc(2, 'earth', 'h3') + level(5) + flood(0, 0) + flood(3, 2) + flood(2, 3) },
      { step: 2, say: '…and the 4th is **Coral Palace**. Already flooded, it **sinks**.',
        svg: board + hand + sam(1, 0) + hc(2, 'earth', 'h3') + level(5) + flood(0, 0) + flood(3, 2) + flood(2, 3) + A.glow(at(2, 1)[0] + s / 2, at(2, 1)[1] + s / 2, 24, 'gc') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#2f86b5');
    // waves
    for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) o += A.path(`M${8 + i * 36 + (j % 2) * 18} ${14 + j * 28} q4 -4 8 0 q4 4 8 0`, { stroke: '#8fd0ee', sw: 1.2, opacity: 0.6 });
    const rows = [2, 4, 6, 6, 4, 2], s = 23, g = 3, ox = 62, oy = 10;
    const sunk = { '1,1': 1, '4,4': 1 };
    const flooded = { '2,0': 1, '3,2': 1, '1,3': 1, '4,3': 1 };
    const treas = { '2,1': 'wind', '5,2': 'fire', '0,3': 'ocean', '3,4': 'earth' }, ic = this.icons;
    const pos = {};
    rows.forEach((n, j) => {
      const start = (6 - n) / 2;
      for (let k = 0; k < n; k++) {
        const i = start + k, key = i + ',' + j, x = ox + i * (s + g), y = oy + j * (s + g);
        pos[key] = [x, y];
        if (sunk[key]) { o += A.rect(x, y, s, s, 'none', { stroke: '#bfe6f7', dash: '3 3', sw: 1, rx: 3 }); continue; }
        if (flooded[key]) o += A.rect(x, y, s, s, '#5aa9d6', { rx: 3, stroke: '#1d4e6e' }) + A.path(`M${x + 4} ${y + 13} q4 -4 8 0 q4 4 8 0`, { stroke: '#fff', sw: 1.2 });
        else o += A.rect(x, y, s, s, '#e3cf9a', { rx: 3, stroke: '#7a5a2e' }) + A.rect(x + 3, y + 3, s - 6, s - 6, '#a7c87a', { rx: 2, sw: 0, opacity: 0.55 });
        if (treas[key]) o += A.use(ic[treas[key]].draw(A), x + 4, y + 4, 15);
      }
    });
    // Fools' Landing marker
    const [fx, fy] = pos['2,5'];
    o += A.use(ic.heli.draw(A), fx + 3.5, fy + 3.5, 16);
    // pawns
    const pawn = (k, c) => { const [x, y] = pos[k]; return A.pawn(x + s / 2, y + s / 2 - 2, 15, c); };
    o += pawn('3,1', C.red) + pawn('2,3', C.green) + pawn('4,2', C.yellow);
    // water meter
    o += A.rect(262, 30, 22, 140, '#e9f5fb', { rx: 6 });
    for (let i = 0; i < 9; i++) o += A.line(262, 40 + i * 14, 272, 40 + i * 14, { sw: 1 });
    o += A.rect(265, 100, 16, 68, '#2a6c96', { rx: 3, sw: 0 });
    o += A.text(273, 41, '☠', { size: 11 });
    o += A.poly([[256, 100], [262, 96], [262, 104]], C.red, { sw: 0 });
    const [ax, ay] = pos['3,2'], [bx, by] = pos['4,4'], [tx, ty] = pos['2,1'];
    o += A.note(ax + s / 2, ay + s - 3, 120, 186, 'Flooded: shore it up');
    o += A.note(bx + s / 2, by + s / 2, 246, 186, 'Sunk: gone for good');
    o += A.note(260, 100, 238, 14, 'Water level');
    o += A.note(tx + s / 2, ty + s / 2, 46, 14, 'Treasure tile');
    return o;
  },
});
