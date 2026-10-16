defineGame({
  id: 'wingspan',
  name: 'Wingspan',
  year: 2019,
  designer: 'Elizabeth Hargrave',
  family: 'engine',
  players: [1, 5], best: '3',
  time: [40, 70],
  age: 10,
  mechanics: ['engine-building', 'tableau', 'hand-management', 'dice', 'set-collection'],
  profile: { complexity: 3, luck: 3, interaction: 2, conflict: 1, talk: 1, planning: 4 },

  // Components drawn once, used inline in text ({seed}) and reused in the art and walkthrough.
  icons: {
    invertebrate: { name: 'invertebrate', draw: A => A.circle(12, 12, 10.5, '#f6ead8', { sw: 1.2 }) + A.path('M5.5 14.5 q2.5 -6 5 -1 q2.5 5 5 0 q1.5 -3.5 3 -2.5', { stroke: '#2a2420', sw: 4.6 }) + A.path('M5.5 14.5 q2.5 -6 5 -1 q2.5 5 5 0 q1.5 -3.5 3 -2.5', { stroke: '#d6578a', sw: 2.8 }) },
    seed: { name: 'seed', draw: A => A.circle(12, 12, 10.5, '#f6ead8', { sw: 1.2 }) + A.line(12, 20, 12, 5, { stroke: '#8a6a12', sw: 1.4 }) + [6.5, 10, 13.5].map(y => A.path(`M12 ${y + 2.5} q-4.5 -1 -4.5 -4.5 q4.5 0 4.5 4.5 M12 ${y + 2.5} q4.5 -1 4.5 -4.5 q-4.5 0 -4.5 4.5`, { fill: '#e2b33c', stroke: '#8a6a12', sw: 0.8 })).join('') },
    fish: { name: 'fish', draw: A => A.circle(12, 12, 10.5, '#f6ead8', { sw: 1.2 }) + A.poly([[15.5, 12], [20.5, 7.5], [20.5, 16.5]], '#2f6db5', { sw: 1 }) + A.path('M3.8 12 q6 -7.5 12.5 0 q-6.5 7.5 -12.5 0 z', { fill: '#2f6db5', sw: 1 }) + A.circle(7.6, 11, 1, '#fff', { sw: 0 }) },
    fruit: { name: 'fruit', draw: A => A.circle(12, 12, 10.5, '#f6ead8', { sw: 1.2 }) + A.path('M8.5 13 q1 -6 6 -9 M15.5 14 q0 -6 -1 -10', { stroke: '#3c6d2f', sw: 1.3 }) + A.path('M14.5 4 q3 -1 4.5 1.5 q-3 1 -4.5 -1.5 z', { fill: '#3c8d4f', sw: 0.8 }) + A.circle(8.3, 15.5, 4, '#c8423b', { sw: 1 }) + A.circle(15.5, 16.3, 4, '#c8423b', { sw: 1 }) },
    rodent: { name: 'rodent', draw: A => A.circle(12, 12, 10.5, '#f6ead8', { sw: 1.2 }) + A.path('M6 16.5 q-3.5 0 -3 -3.5', { stroke: '#2a2420', sw: 1.2 }) + A.path('M6 17 q0.5 -8 8.5 -8 q5.5 0 6.5 6 q0 2 -2.5 2 z', { fill: '#8c877f', sw: 1.1 }) + A.circle(14, 9.2, 2.6, '#b9b4ab', { sw: 1 }) + A.circle(17.4, 13, 0.9, '#2a2420', { sw: 0 }) },
    wild: { name: 'wild (any food)', draw: A => ['#d6578a', '#e2b33c', '#2f6db5', '#c8423b'].map((f, i) => { const a = i * Math.PI / 2, b = a + Math.PI / 2, r = 10.5, p = (t) => (12 + r * Math.sin(t)).toFixed(2) + ' ' + (12 - r * Math.cos(t)).toFixed(2); return A.path(`M12 12 L${p(a)} A${r} ${r} 0 0 1 ${p(b)} Z`, { fill: f, sw: 0 }); }).join('') + A.circle(12, 12, 10.5, 'none', { sw: 1.2 }) + A.circle(12, 12, 4.2, '#f6ead8', { sw: 1 }) },
    egg: { name: 'egg', draw: A => A.path('M12 2.5 q-7.5 0 -7.5 11.5 q0 7.5 7.5 7.5 q7.5 0 7.5 -7.5 q0 -11.5 -7.5 -11.5 z', { fill: '#e9cf98', sw: 1.4 }) + A.path('M8.2 10 q1 -3.5 3.5 -4.5', { stroke: '#fbf3e0', sw: 1.8 }) },
    forest: { name: 'forest', draw: A => A.rect(2, 2, 20, 20, '#7fae6a', { rx: 4, sw: 1.2 }) + A.poly([[12, 4.5], [17.5, 13], [6.5, 13]], '#2f6b2c', { sw: 0.9 }) + A.poly([[12, 8.5], [18.5, 17.5], [5.5, 17.5]], '#3f8a39', { sw: 0.9 }) + A.rect(11, 17.5, 2, 3, '#7a4b25', { rx: 0, sw: 0 }) },
    grassland: { name: 'grassland', draw: A => A.rect(2, 2, 20, 20, '#e6cf7a', { rx: 4, sw: 1.2 }) + A.path('M5 19 q1 -6 -1 -10 M9 19 q0 -7 3 -12 M13 19 q1 -6 -1 -9 M16 19 q0 -6 4 -10 M19 19 q0 -3 -2 -5', { stroke: '#7a6a1f', sw: 1.5 }) },
    wetland: { name: 'wetland', draw: A => A.rect(2, 2, 20, 20, '#86bcd6', { rx: 4, sw: 1.2 }) + [8, 12.5, 17].map(y => A.path(`M5 ${y} q2 -2.5 3.5 0 t3.5 0 t3.5 0 t3.5 0`, { stroke: '#1f5f8a', sw: 1.5 })).join('') },
    birdcard: { name: 'bird card', draw: A => A.rect(4.5, 1.5, 15, 21, '#f6efdc', { rx: 2.5, sw: 1.3 }) + A.rect(6.5, 3.5, 11, 3, '#e3d6b8', { rx: 0.5, sw: 0 }) + A.bird(12, 13.5, 13, '#2a9a96') },
    cube: { name: 'action cube', draw: A => A.cube(4.5, 3, 15, '#2f6db5') },
  },

  pitch: 'Play birds into 3 rows that power your food, egg and card actions; most points after 4 rounds wins.',

  goal: { big: 'Most points', text: '**Most points** after 4 rounds wins. Birds, bonus cards, round goals, {egg}s, cached food and tucked cards all score.' },

  turn: {
    type: 'choose',
    intro: 'Place an action cube to do ONE of these:',
    steps: [
      { verb: 'Play a bird', text: 'Pay its food (plus {=egg} in columns 2–5) and place it in the leftmost empty slot of a habitat it can live in.' },
      { verb: 'Gain food', text: '{=forest} Take food dice from the birdfeeder (a two-food face gives one of them), then activate forest birds **right to left**.' },
      { verb: 'Lay eggs', text: '{=grassland} Lay {egg}s on your birds (up to each bird’s egg limit), then activate grassland birds right to left.' },
      { verb: 'Draw cards', text: '{=wetland} Draw {birdcard}s from the tray or deck (refill the tray after your turn), then activate wetland birds right to left.' },
    ],
  },

  tension: 'Each bird strengthens its row, but you get only 26 turns: when do you stop building and start scoring?',

  structure: [
    { label: 'Setup', text: 'Deal hands (see Setup). Put 4 random goal tiles on the goal board. Random first player.' },
    { label: 'Rounds 1–4', repeat: '4 rounds', text: 'Clockwise, 1 action per turn until all your {cube}s are placed: **8** turns in round 1, then 7, 6, 5.' },
    { label: 'End of each round', text: 'Clear your mat; place 1 {=cube} on the goal board to score that round’s goal. Discard and refill the bird tray. Pass the first-player token left.' },
    { label: 'Final scoring', text: 'Add up every source below. Tie: most unused food tokens.' },
  ],

  points: [
    ['{=birdcard} Birds', 'The points printed on each bird you played'],
    ['Bonus cards', 'As printed on each bonus card you hold'],
    ['Round goals', 'The points under your {=cube} on the goal board, for each round'],
    ['{=egg} Eggs', '1 each, on your birds'],
    ['Cached food', '1 per food token on a bird'],
    ['Tucked cards', '1 per card tucked under a bird'],
  ],

  end: { trigger: 'round 4 ends', detail: '26 turns per player in all, then final scoring.' },
  scoring: [
    { label: '{=birdcard} Bird cards', share: 5 },
    { label: '{=egg} Eggs', share: 2 },
    { label: 'Bonus cards', share: 1.5 },
    { label: 'Round goals', share: 1.5 },
    { label: 'Cache / tuck', share: 1 },
  ],

  ref: {
    title: 'Food, rows and egg costs',
    rows: [
      ['Food', '{invertebrate} {seed} {fish} {fruit} {rodent} {wild}'],
      ['Rows', '{=forest} food · {=grassland} {=egg} · {=wetland} {=birdcard}; the amount grows with each bird in the row'],
      ['Egg cost', 'column 1: none · 2–3: {=egg} · 4–5: {=egg}{=egg}, removed from any of your birds'],
      ['Paying food', 'when playing a bird, any 2 food = 1 food of your choice; {=wild} = any 1 food'],
      ['Bonus spaces', 'optional, once: {=forest} discard 1 {=birdcard} → +1 food · {=grassland} 1 food → +1 {=egg} · {=wetland} 1 {=egg} → +1 {=birdcard}'],
      ['Round goals', 'Green side: 1st/2nd/3rd place by count (need at least 1); tied players split the tied places’ points, rounded down. Blue side: 1 per item, max 5.'],
    ],
  },

  example: 'You play a duck (brown power: “draw 1 card”) into wetland column 2, paying {=invertebrate}{=seed} + {=egg}. Next turn you take the {=wetland} action: 2 birds in the row means you draw **2** cards, then the duck draws 1 more.',

  setup: [
    'Deal each player 5 {birdcard}s, 2 bonus cards and 5 food: {=invertebrate}{=seed}{=fish}{=fruit}{=rodent}.',
    'Keep any number of birds; discard 1 food per bird kept. Keep 1 bonus card.',
    'Roll the 5 food dice into the birdfeeder. Deal 3 face-up birds to the tray.',
  ],

  terms: [
    ['Habitat', 'One of your 3 rows: {forest}, {grassland}, {wetland}.'],
    ['{=die} Birdfeeder', 'Dice tower. The faces showing are the food you can take.'],
    ['Bird powers', '**Brown**: fires each time you take that row’s action. **White**: once, when played. **Pink**: once between your turns, when a rival does what it names. All powers are optional.'],
    ['Cache / tuck', 'Food or cards stored on a bird; 1 point each.'],
    ['{=cube} Action cube', '8 per player, 1 per turn. Each round 1 stays on the goal board, so you have 1 fewer next round.'],
  ],

  gotchas: [
    'A brown power fires only when you take **that row’s action**, not when you play the bird.',
    'Birds in columns 2–5 cost **eggs** ({=egg}) on top of food.',
    'If the feeder dice all show one face (even a single die), you may reroll all 5 before taking food. When the feeder empties, reroll all 5.',
  ],

  tips: [
    'Build one row first; an egg-laying {grassland} is a reliable first engine.',
    'Pick birds that fit your bonus card and the round goals.',
    'In round 4, stop building: turn actions straight into points ({egg}s are easiest).',
  ],

  walk(A) {
    const C = A.C;
    const rows = [['#7fae6a', '#5f9150', ['food 1', 'food 1', 'food 2', 'food 2', 'food 3']],
      ['#e6cf7a', '#cdb15a', ['lay 2', 'lay 2', 'lay 3', 'lay 3', 'lay 4']],
      ['#86bcd6', '#5f9fc0', ['draw 1', 'draw 1', 'draw 2', 'draw 2', 'draw 3']]];
    const rowY = (r) => 4 + r * 50, slotX = (c) => 34 + c * 36;
    let board = A.bg('#e9e0cc') + A.rect(2, 2, 214, 152, '#cfc0a0', { rx: 6, sw: 1.2 });
    rows.forEach(([f, d, lab], r) => {
      const y = rowY(r);
      board += A.rect(4, y, 210, 48, f, { rx: 4, sw: 0.8 }) + A.rect(6, y + 2, 24, 44, d, { rx: 3, sw: 0 });
      for (let c = 0; c < 5; c++) board += A.rect(slotX(c), y + 3, 32, 42, 'rgba(255,255,255,.3)', { rx: 3, sw: 0.6, dash: '2 2' }) + A.text(slotX(c) + 16, y + 15, lab[c], { size: 6, weight: 700, fill: '#2a2420' });
    });
    // Same drawings as the inline icons: habitat on top, its action below.
    const I = (k, x, y, sz) => A.use(this.icons[k].draw(A), x, y, sz);
    [['forest', 'seed'], ['grassland', 'egg'], ['wetland', 'birdcard']].forEach(([h, act], r) => { board += I(h, 7, rowY(r) + 3, 22) + I(act, 8, rowY(r) + 25, 20); });
    board += A.text(268, 10, 'Bird tray', { size: 8, weight: 800 });
    board += A.card(254, 70, 28, 40, '#5d7f8f', {}) + A.text(268, 117, 'deck', { size: 7, weight: 700 });
    board += A.text(268, 132, 'Your cubes', { size: 7, weight: 700 });
    board += A.cube(282, 138, 11, C.blue);
    board += A.tag(22, 177, 'Hand', { w: 34 });
    const bird = (x, y, fill, power, w = 30, h = 42) => {
      let s = A.card(x, y, w, h, '#f6efdc', { face: '#f6efdc' }) + A.bird(x + w / 2, y + h * 0.42, 20, fill);
      if (power) s += A.rect(x + 3, y + h - 11, w - 6, 8, '#a7774a', { sw: 0, rx: 1 }) + A.text(x + w / 2, y + h - 7, power, { size: 5, fill: C.white });
      return s;
    };
    const back = (x, y) => A.card(x, y, 28, 40, '#5d7f8f', {});
    const slot = (r, c) => [slotX(c) + 1, rowY(r) + 3];
    const hand = (i) => [50 + i * 32, 157];
    const tray = (i) => [223 + i * 31, 18];
    const egg = (x, y) => I('egg', x - 5, y - 6, 11);
    const fixed = A.k('b-f0', bird(...slot(0, 0), '#c8423b')) + A.k('b-f1', bird(...slot(0, 1), '#6d6a62')) +
      A.k('b-g0', bird(...slot(1, 0), '#8a5a33')) + A.k('egg1', egg(slotX(0) + 10, rowY(1) + 37)) +
      A.k('b-w0', bird(...slot(2, 0), '#2f6db5')) + A.k('h-0', bird(...hand(0), '#e07b2e', '', 28, 40)) + A.k('fish', I('fish', 279, 170, 15));
    const trayB = (n) => [A.k('t0', bird(...tray(0), '#3c8d4f', '', 28, 40)), A.k('t1', bird(...tray(1), '#d6578a', '', 28, 40)), A.k('t2', bird(...tray(2), '#7d55b5', '', 28, 40))].slice(n).join('');
    const duckHand = A.k('duck', bird(...hand(1), '#2a9a96', 'draw 1', 28, 40));
    const duckBoard = A.k('duck', bird(...slot(2, 1), '#2a9a96', 'draw 1'));
    const food = A.k('seed', I('seed', 243, 170, 15)) + A.k('worm', I('invertebrate', 261, 170, 15)) + A.k('egg2', egg(slotX(0) + 20, rowY(1) + 37));
    const cubeHome = A.k('cube', A.cube(268, 138, 11, C.blue));
    const cubeRow = A.k('cube', A.cube(slotX(2) + 10.5, rowY(2) + 24, 11, C.blue));
    const deckTop = A.k('d3', back(254, 70));
    return [
      { step: 0, say: 'Action: **play a bird**. The duck in your hand lives only in the {wetland}.', svg: board + fixed + trayB(0) + deckTop + food + cubeHome + duckHand + A.glow(96, 177, 24) },
      { step: 0, say: 'The leftmost empty wetland slot is **column 2**: pay its food **plus 1** {=egg}.', svg: board + fixed + trayB(0) + deckTop + cubeHome + duckBoard + A.glow(slotX(1) + 16, rowY(2) + 24, 26) },
      { step: 3, say: 'Next turn: **draw cards**. Your cube goes on the first open wetland space: **draw 2**.', svg: board + fixed + trayB(0) + deckTop + cubeRow + duckBoard + A.glow(slotX(2) + 16, rowY(2) + 24, 22) },
      { step: 3, say: 'Take 2 birds from the face-up tray.', svg: board + fixed + trayB(2) + deckTop + cubeRow + duckBoard +
        A.k('t0', bird(...hand(1), '#3c8d4f', '', 28, 40)) + A.k('t1', bird(...hand(2), '#d6578a', '', 28, 40)) },
      { step: 3, say: 'Wetland birds activate **right to left**: the duck’s brown power draws 1 more.', svg: board + fixed + trayB(2) + cubeRow + duckBoard +
        A.k('t0', bird(...hand(1), '#3c8d4f', '', 28, 40)) + A.k('t1', bird(...hand(2), '#d6578a', '', 28, 40)) + A.k('d3', back(...hand(3))) + A.glow(slotX(1) + 16, rowY(2) + 24, 26) },
      { step: 3, say: '**3 cards** from one action. Each bird added strengthens its row.', svg: board + fixed + trayB(2) + cubeRow + duckBoard +
        A.k('t0', bird(...hand(1), '#3c8d4f', '', 28, 40)) + A.k('t1', bird(...hand(2), '#d6578a', '', 28, 40)) + A.k('d3', back(...hand(3))) },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#e9e0cc');
    const rows = [['#7fae6a', '#5f9150'], ['#e6cf7a', '#cdb15a'], ['#86bcd6', '#5f9fc0']];
    const mx = 8, my = 8, rh = 58, sw = 37;
    o += A.rect(mx - 3, my - 3, 228, rh * 3 + 6, '#cfc0a0', { rx: 6, sw: 1.2 });
    rows.forEach(([f, d], r) => {
      const y = my + r * rh;
      o += A.rect(mx, y, 222, rh - 2, f, { rx: 4, sw: 0.8 });
      o += A.rect(mx + 2, y + 2, 26, rh - 6, d, { rx: 3, sw: 0 });
      for (let c = 0; c < 5; c++) o += A.rect(mx + 31 + c * sw, y + 4, sw - 4, rh - 10, 'rgba(255,255,255,.28)', { rx: 3, sw: 0.6, dash: '2 2' });
    });
    // habitat + action icons on the left (same drawings as the inline icons)
    const I = (k, x, y, sz) => A.use(this.icons[k].draw(A), x, y, sz);
    [['forest', 'seed'], ['grassland', 'egg'], ['wetland', 'birdcard']].forEach(([h, act], r) => { o += I(h, mx + 3, my + r * rh + 4, 24) + I(act, mx + 4, my + r * rh + 29, 22); });
    // bird cards
    const birds = [[0, 0, '#c8423b'], [0, 1, '#6d6a62'], [0, 2, '#2f6db5'], [1, 0, '#8a5a33'], [1, 1, '#e07b2e'], [2, 0, '#3c8d4f'], [2, 1, '#2a9a96'], [2, 2, '#ffffff']];
    const eggs = { '1,0': 3, '1,1': 2, '0,1': 1 };
    for (const [r, c, f] of birds) {
      const x = mx + 31 + c * sw, y = my + r * rh + 4;
      o += A.card(x, y, sw - 4, rh - 10, '#f6efdc', {});
      o += A.rect(x + 3, y + 3, sw - 10, 8, '#e3d6b8', { rx: 1, sw: 0 });
      o += A.bird(x + 16, y + 26, 22, f);
      const n = eggs[r + ',' + c] || 0;
      for (let k = 0; k < n; k++) o += I('egg', x + 2 + k * 8, y + 33, 11);
    }
    // birdfeeder dice tower
    o += A.poly([[246, 30], [275, 8], [304, 30]], '#8a5a33', { sw: 1.4 });
    o += A.rect(252, 30, 46, 52, '#c8a675', { rx: 2, sw: 1.4 });
    o += A.rect(262, 44, 26, 30, '#7a5a38', { rx: 13, sw: 1 });
    o += A.rect(240, 82, 70, 58, '#b8955f', { rx: 5, sw: 1.4 });
    ['invertebrate', 'seed', 'fruit', 'fish'].forEach((f, i) => { const x = 248 + (i % 2) * 30, y = 88 + Math.floor(i / 2) * 25; o += A.die(x, y, 22, '', '#f4ecd6') + I(f, x + 2, y + 2, 18); });
    // food tokens in supply
    o += I('seed', 245, 172, 15) + I('invertebrate', 259, 177, 15) + I('rodent', 273, 171, 15) + I('fruit', 287, 177, 15);
    o += A.note(150, my + 27, 187, my + 27, 'Forest: food', { w: 78 });
    o += A.note(116, my + rh + 27, 170, my + rh + 27, 'Grassland: eggs', { w: 96 });
    o += A.note(150, my + 2 * rh + 27, 189, my + 2 * rh + 27, 'Wetland: cards', { w: 84 });
    o += A.note(270, 124, 275, 156, 'Food dice', { w: 62 });
    return o;
  },
});
