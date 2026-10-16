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

  pitch: 'Attract birds to your wildlife preserve; each bird you play powers up the forest, grassland or wetland row it lives in.',
  theme: 'You are bird enthusiasts (researchers, watchers and collectors) attracting the best birds to your preserve.',

  goal: { big: 'Most points', text: 'After 4 rounds, the player with the **most points** wins: printed bird points, bonus cards, end-of-round goals, plus 1 point per egg, cached food and tucked card.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, place an action cube to do ONE of these:',
    steps: [
      { verb: 'Play a bird', text: 'Pay its **food** (and eggs for later columns) and put it in the leftmost empty slot of a habitat it can live in.' },
      { verb: 'Gain food', text: 'Forest row: take food dice from the birdfeeder, then activate your forest birds **right to left**.' },
      { verb: 'Lay eggs', text: 'Grassland row: lay eggs on your birds (up to each nest’s limit), then activate grassland birds.' },
      { verb: 'Draw cards', text: 'Wetland row: draw bird cards from the tray or deck, then activate wetland birds.' },
    ],
  },

  tension: 'Every bird you play makes one row stronger, but the game is only 26 turns long, so you must decide when to stop building your engine and start running it for points.',

  flow: [
    { label: 'Gather', items: ['Food from the birdfeeder', 'Bird cards', 'Eggs'] },
    { label: 'Build', items: ['Play birds into 3 habitats', 'Each bird boosts its row', 'Brown powers chain'] },
    { label: 'Score', items: ['Bird points', 'Bonus cards', 'Round goals', 'Eggs, cache, tucked: 1 each'] },
  ],

  end: { trigger: 'the 4th round ends', detail: 'Rounds get shorter: 8, then 7, 6 and 5 turns each, because you spend one action cube per round on the goal board.' },
  scoring: [
    { label: 'Bird cards', share: 5 },
    { label: 'Eggs', share: 2 },
    { label: 'Bonus cards', share: 1.5 },
    { label: 'Round goals', share: 1.5 },
    { label: 'Cache / tucked', share: 1 },
  ],

  ref: {
    title: 'Egg cost to play a bird',
    rows: [
      ['Column 1', 'food only'],
      ['Columns 2–3', 'food + 1 egg'],
      ['Columns 4–5', 'food + 2 eggs'],
      ['Action strength', 'grows as birds fill the row'],
    ],
  },

  example: 'You play a duck whose brown power reads “draw 1 card” into your **second** wetland slot, paying its food plus **1 egg**. Next turn you take the wetland action: with two birds in the row you draw **2** cards, then the duck’s power fires and you draw 1 more.',

  setup: [
    'Deal each player 5 bird cards, 2 bonus cards and 5 food tokens (one of each type).',
    'Keep any birds you like, discarding 1 food per bird kept; keep 1 bonus card.',
    'Roll the 5 food dice into the birdfeeder and lay 3 face-up birds in the tray.',
  ],

  terms: [
    ['Habitat', 'One of your three rows: forest, grassland or wetland.'],
    ['Birdfeeder', 'Dice tower; the dice showing are the food you can take.'],
    ['Brown power', '“When activated” ability that fires when you use that row.'],
    ['Cache / tuck', 'Food or cards stored on a bird, each worth 1 point.'],
    ['Action cube', 'Your 8 cubes; one is spent per turn and one per round on goals.'],
  ],

  gotchas: [
    'A bird’s power fires only when you take **that row’s action**, not when you play the bird (unless it says “when played”).',
    'Birds in later columns cost **eggs** as well as food.',
    'If every die in the birdfeeder shows the same face, you may reroll them all before taking food; when it empties, reroll all 5.',
  ],

  tips: [
    'Build one row early; a strong egg-laying grassland is a reliable first engine.',
    'Read your bonus card and round goals before choosing birds; they point to good picks.',
    'In round 4, stop building and convert actions straight into points (eggs are an easy source).',
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
    board += A.circle(18, rowY(0) + 24, 6, '#e2b33c', { sw: 1 });
    board += A.path(`M18 ${rowY(1) + 15} q-6 0 -6 9 q0 8 6 8 q6 0 6 -8 q0 -9 -6 -9 z`, { fill: '#f4ecd6', sw: 1.1 });
    board += A.rect(11, rowY(2) + 14, 14, 20, '#f4ecd6', { rx: 2, sw: 1.1 });
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
    const egg = (x, y, f = '#f4ecd6') => A.path(`M${x} ${y - 4} q-3.5 0 -3.5 4.5 q0 3.5 3.5 3.5 q3.5 0 3.5 -3.5 q0 -4.5 -3.5 -4.5 z`, { fill: f, sw: 0.9 });
    const fixed = A.k('b-f0', bird(...slot(0, 0), '#c8423b')) + A.k('b-f1', bird(...slot(0, 1), '#6d6a62')) +
      A.k('b-g0', bird(...slot(1, 0), '#8a5a33')) + A.k('egg1', egg(slotX(0) + 10, rowY(1) + 37)) +
      A.k('b-w0', bird(...slot(2, 0), '#2f6db5')) + A.k('h-0', bird(...hand(0), '#e07b2e', '', 28, 40)) + A.k('fish', A.circle(286, 177, 6, '#2f6db5', { sw: 1 }));
    const trayB = (n) => [A.k('t0', bird(...tray(0), '#3c8d4f', '', 28, 40)), A.k('t1', bird(...tray(1), '#d6578a', '', 28, 40)), A.k('t2', bird(...tray(2), '#7d55b5', '', 28, 40))].slice(n).join('');
    const duckHand = A.k('duck', bird(...hand(1), '#2a9a96', 'draw 1', 28, 40));
    const duckBoard = A.k('duck', bird(...slot(2, 1), '#2a9a96', 'draw 1'));
    const food = A.k('seed', A.circle(250, 177, 6, '#e2b33c', { sw: 1 })) + A.k('worm', A.circle(268, 177, 6, '#d6578a', { sw: 1 })) + A.k('egg2', egg(slotX(0) + 20, rowY(1) + 37, '#bcd7e6'));
    const cubeHome = A.k('cube', A.cube(268, 138, 11, C.blue));
    const cubeRow = A.k('cube', A.cube(slotX(2) + 10.5, rowY(2) + 24, 11, C.blue));
    const deckTop = A.k('d3', back(254, 70));
    return [
      { step: 0, say: 'Your action: **play a bird**. The duck in your hand can only live in the wetland.', svg: board + fixed + trayB(0) + deckTop + food + cubeHome + duckHand + A.glow(96, 177, 24) },
      { step: 0, say: 'It goes in the leftmost empty wetland slot, **column 2**, so you pay its food **plus 1 egg**.', svg: board + fixed + trayB(0) + deckTop + cubeHome + duckBoard + A.glow(slotX(1) + 16, rowY(2) + 24, 26) },
      { step: 3, say: 'Next turn: **draw cards**. Your cube goes on the first open wetland space, which now says **draw 2**.', svg: board + fixed + trayB(0) + deckTop + cubeRow + duckBoard + A.glow(slotX(2) + 16, rowY(2) + 24, 22) },
      { step: 3, say: 'You take 2 birds from the face-up tray.', svg: board + fixed + trayB(2) + deckTop + cubeRow + duckBoard +
        A.k('t0', bird(...hand(1), '#3c8d4f', '', 28, 40)) + A.k('t1', bird(...hand(2), '#d6578a', '', 28, 40)) },
      { step: 3, say: 'Then wetland birds activate **right to left**: the duck’s brown power draws 1 more card.', svg: board + fixed + trayB(2) + cubeRow + duckBoard +
        A.k('t0', bird(...hand(1), '#3c8d4f', '', 28, 40)) + A.k('t1', bird(...hand(2), '#d6578a', '', 28, 40)) + A.k('d3', back(...hand(3))) + A.glow(slotX(1) + 16, rowY(2) + 24, 26) },
      { step: 3, say: '**3 cards** from one action. Every bird you add makes its row stronger next time.', svg: board + fixed + trayB(2) + cubeRow + duckBoard +
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
    // action icons on the left
    o += A.circle(mx + 15, my + 22, 6, '#c8423b', { sw: 1 }) + A.circle(mx + 15, my + 36, 4, '#7d55b5', { sw: 1 });
    o += A.path(`M${mx + 15} ${my + rh + 16} q-6 0 -6 9 q0 8 6 8 q6 0 6 -8 q0 -9 -6 -9 z`, { fill: '#f4ecd6', sw: 1.1 });
    o += A.rect(mx + 7, my + 2 * rh + 16, 16, 22, '#f4ecd6', { rx: 2, sw: 1.1 });
    // bird cards
    const birds = [[0, 0, '#c8423b'], [0, 1, '#6d6a62'], [0, 2, '#2f6db5'], [1, 0, '#8a5a33'], [1, 1, '#e07b2e'], [2, 0, '#3c8d4f'], [2, 1, '#2a9a96'], [2, 2, '#ffffff']];
    const eggs = { '1,0': 3, '1,1': 2, '0,1': 1 };
    for (const [r, c, f] of birds) {
      const x = mx + 31 + c * sw, y = my + r * rh + 4;
      o += A.card(x, y, sw - 4, rh - 10, '#f6efdc', {});
      o += A.rect(x + 3, y + 3, sw - 10, 8, '#e3d6b8', { rx: 1, sw: 0 });
      o += A.bird(x + 16, y + 26, 22, f);
      const n = eggs[r + ',' + c] || 0;
      for (let k = 0; k < n; k++) o += A.circle(x + 8 + k * 7, y + 40, 3, ['#f4ecd6', '#bcd7e6', '#f1c9a6'][k % 3], { sw: 0.8 });
    }
    // birdfeeder dice tower
    o += A.poly([[246, 30], [275, 8], [304, 30]], '#8a5a33', { sw: 1.4 });
    o += A.rect(252, 30, 46, 52, '#c8a675', { rx: 2, sw: 1.4 });
    o += A.rect(262, 44, 26, 30, '#7a5a38', { rx: 13, sw: 1 });
    o += A.rect(240, 82, 70, 58, '#b8955f', { rx: 5, sw: 1.4 });
    const foods = ['#d6578a', '#e2b33c', '#c8423b', '#2f6db5'];
    foods.forEach((f, i) => { const x = 248 + (i % 2) * 30, y = 88 + Math.floor(i / 2) * 25; o += A.die(x, y, 22, '', '#f4ecd6') + A.circle(x + 11, y + 11, 6, f, { sw: 1 }); });
    // food tokens in supply
    o += A.circle(254, 180, 6, '#e2b33c', { sw: 1 }) + A.circle(268, 184, 6, '#d6578a', { sw: 1 }) + A.circle(282, 178, 6, '#2f6db5', { sw: 1 }) + A.circle(296, 184, 6, '#c8423b', { sw: 1 });
    o += A.note(150, my + 27, 187, my + 27, 'Forest: food', { w: 78 });
    o += A.note(116, my + rh + 27, 170, my + rh + 27, 'Grassland: eggs', { w: 96 });
    o += A.note(150, my + 2 * rh + 27, 189, my + 2 * rh + 27, 'Wetland: cards', { w: 84 });
    o += A.note(270, 124, 275, 156, 'Food dice', { w: 62 });
    return o;
  },
});
