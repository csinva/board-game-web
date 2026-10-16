defineGame({
  id: 'scrabble',
  name: 'Scrabble',
  year: 1948,
  designer: 'Alfred Mosher Butts',
  family: 'classic',
  players: [2, 4], best: '2',
  time: [60, 90],
  age: 8,
  mechanics: ['word', 'tile-placement', 'spatial', 'hand-management'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 2, talk: 1, planning: 2 },

  // Letter tiles ({=l-q}), premium squares ({=tw}), blank, rack and bag; the bag is reused in art + walk.
  icons: (() => {
    const V = { a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10 };
    const sq = (name, fill, label, ink) => ({ name, draw: A => A.rect(1, 1, 22, 22, fill, { rx: 2, sw: 1.1 }) + A.text(12, 12.5, label, { size: 10.5, weight: 800, fill: ink, spacing: -0.3 }) });
    const o = {
      dl: sq('double letter', '#a9d3ea', 'DL', '#2a2420'),
      tl: sq('triple letter', '#3f74b8', 'TL', '#fff'),
      dw: sq('double word', '#f2a7a0', 'DW', '#2a2420'),
      tw: sq('triple word', '#d2463c', 'TW', '#fff'),
      star: { name: 'centre star', draw: A => A.rect(1, 1, 22, 22, '#f2a7a0', { rx: 2, sw: 1.1 }) + A.star(12, 12.5, 8.5, '#2a2420', { sw: 0 }) },
      blank: { name: 'blank tile', draw: A => A.rect(1.5, 1.5, 21, 21, '#f3e2b5', { rx: 3, sw: 1.2 }) },
      rack: { name: 'rack', draw: A => [0, 1, 2].map(i => A.rect(2.5 + i * 6.5, 6, 6, 7, '#f3e2b5', { rx: 1, sw: 0.9 })).join('') + A.poly([[1, 20], [23, 20], [21.5, 13], [2.5, 13]], '#7a5232', { sw: 1.2 }) },
      bag: { name: 'tile bag', draw: A => A.path('M12 7 q-10 2.5 -9 10.5 q1 5 9 5 q8 0 9 -5 q1 -8 -9 -10.5 z', { fill: '#5b3f8c', sw: 1.3 }) + A.path('M12 7 l-3 -5 h6 l-3 5', { fill: '#4a3275', sw: 1.1 }) },
    };
    for (const k in V) o['l-' + k] = { name: k.toUpperCase() + ' (' + V[k] + ')', draw: A => A.rect(1.5, 1.5, 21, 21, '#f3e2b5', { rx: 3, sw: 1.2 }) + A.text(10.5, 12, k.toUpperCase(), { size: 14, weight: 800 }) + A.text(19, 19, String(V[k]), { size: V[k] > 9 ? 5 : 6, weight: 800 }) };
    return o;
  })(),

  pitch: 'Place letter tiles to form crossword-style words, using premium squares to multiply scores; highest total wins.',

  goal: { big: 'Highest score', text: 'Most **points** when the tiles run out. A word scores its tile values, boosted by premium squares.' },

  turn: {
    type: 'choose',
    steps: [
      { verb: 'Play a word', text: 'Place tiles in **one row or column**, joined to tiles on the board. Score every new word formed, then refill to 7.' },
      { verb: 'Exchange', text: 'Set any number of tiles aside face-down, draw as many, then return them to the bag. Score 0.' },
      { verb: 'Pass', text: 'Score 0.' },
    ],
  },

  tension: 'A big word scores now but may open a {=tw} to your opponent or leave you a weak rack, so you weigh score against board and rack.',

  structure: [
    { label: 'Setup', text: 'All 100 tiles go in the {bag}; each player draws 7. The first word must cover the {star}.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Play a word, exchange or pass. After playing, draw back to 7 while the bag lasts.' },
    { label: 'Game end', text: 'The bag is empty and one player plays their last tile, or every player passes twice in a row.' },
    { label: 'Final scoring', text: 'Each player subtracts their unplayed tiles. A player who went out adds everyone else’s unplayed total.' },
  ],

  points: [
    ['{=l-a} Letters', 'The value printed on each tile; {=blank} scores 0'],
    ['{=dl} {=tl} Letter squares', 'Double / triple that tile’s value'],
    ['{=dw} {=tw} Word squares', 'Double / triple the whole word, after letter bonuses. Two word squares in one word multiply (×4 or ×9)'],
    ['{=star} Centre star', 'Double word for the first play'],
    ['Every new word', 'Each word your tiles form scores in full; premiums count only under new tiles'],
    ['Bingo', '+50 for playing all 7 tiles in one turn'],
  ],

  end: { trigger: 'the bag is empty and a player plays their last tile, or every player passes twice in a row', detail: 'Tie: the higher score before the unplayed-tile adjustment wins.' },
  scoring: [
    { label: 'Word scores', share: 7 },
    { label: '{=dl}{=tw} Premium squares', share: 3 },
    { label: '50-pt bingos', share: 1 },
  ],

  ref: {
    title: 'Tile values',
    rows: [
      ['1 point', '{=l-a}{=l-e}{=l-i}{=l-o}{=l-u}{=l-l}{=l-n}{=l-s}{=l-t}{=l-r}'],
      ['2 · 3 points', '{=l-d}{=l-g} · {=l-b}{=l-c}{=l-m}{=l-p}'],
      ['4 · 5 points', '{=l-f}{=l-h}{=l-v}{=l-w}{=l-y} · {=l-k}'],
      ['8 · 10 points', '{=l-j}{=l-x} · {=l-q}{=l-z}'],
      ['{=blank} Blank (×2)', '0 points; stands for any letter'],
    ],
  },

  example: '**BOARD** runs across the centre. You hold {=l-q}{=l-u}{=l-a} and place them above its D to spell **QUAD** downward: 10 + 1 + 1 + 2 = **14 points**. The D was already down, so it gets no premium. Draw 3 tiles back to 7.',

  setup: [
    'Put all 100 tiles in the {bag}. Each player draws 1 tile; nearest to A goes first ({=blank} beats all), then play goes clockwise. Return those tiles.',
    'In turn order, each player draws 7 onto a {rack}, hidden from the others.',
    'The first word needs 2+ letters and must cover the {star} (a double-word square).',
  ],

  terms: [
    ['{=rack} Rack', 'Your 7 tiles, hidden from the others.'],
    ['Bingo', 'Playing all 7 tiles in one turn: +50.'],
    ['{=blank} Blank', 'Wild tile worth 0; the letter you name stays fixed all game.'],
    ['Challenge', 'Dispute a play before the next turn starts; check the dictionary. Invalid: the player takes the tiles back and scores 0. Valid: the challenger loses their next turn.'],
  ],

  gotchas: [
    'Premium squares count **only on the turn** a tile is first placed on them.',
    'Every new word your tiles form scores, including side words made by touching tiles.',
    'All tiles in a turn go in a **single line** with no gaps (board tiles may fill gaps).',
  ],

  tips: [
    'Learn the 2-letter words (QI, ZA, XU, JO); they let you stack parallel words.',
    'Keep a balanced rack: save S and {=blank} blanks for big plays; dump awkward duplicates.',
    'Aim {=l-j}{=l-q}{=l-x}{=l-z} at {=tl} and {=dl}, ideally scoring 2 words at once.',
  ],

  walk(A) {
    const C = A.C, I = this.icons, s = 17, bx = 10, by = 12, c0 = 1, r0 = 2, T = 16, tileFill = '#f3e2b5';
    const key = (i, j) => i + ',' + j, P = {};
    [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]].forEach(([i, j]) => P[key(i, j)] = '#d2463c');
    for (let k = 1; k <= 4; k++) [[k, k], [14 - k, k], [k, 14 - k], [14 - k, 14 - k]].forEach(([i, j]) => P[key(i, j)] = '#f2a7a0');
    P[key(7, 7)] = '#f2a7a0';
    [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]].forEach(([i, j]) => P[key(i, j)] = '#3f74b8');
    [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]].forEach(([i, j]) => P[key(i, j)] = '#a9d3ea');
    const at = (i, j) => [bx + (i - c0) * s + 0.5, by + (j - r0) * s + 0.5];
    const tile = (x, y, l, v) => A.tile(x, y, T, tileFill, { letter: l, sub: v, sw: 0.9 });
    let base = A.bg('#b98a55') + A.rect(bx - 4, by - 4, 9 * s + 8, 9 * s + 8, '#1f5e4a', { rx: 4, sw: 1.2 });
    base += A.grid(bx, by, 9, 9, s, (i, j) => P[key(i + c0, j + r0)] || '#e9dfc4', { stroke: '#cfc3a4', sw: 0.6 });
    [['B', 3, 3], ['O', 4, 1], ['A', 5, 1], ['R', 6, 1], ['D', 7, 2]].forEach(([l, i, v]) => { base += tile(...at(i, 7), l, v); });
    base += A.tag(212, 14, 'You');
    // Rack and bag.
    const RK = (i) => [184 + i * 18, 166];
    base += A.poly([[180, 186], [312, 186], [308, 172], [184, 172]], '#7a5232', { sw: 1.2 }) + A.text(246, 194, 'Your rack', { size: 7, weight: 700, fill: C.ink });
    const BAG = [262, 110];
    const bag = A.use(I.bag.draw(A), 246, 84, 52) + A.text(272, 120, 'bag', { size: 8, weight: 700, fill: C.white });
    const keep = [['E', 1, 3], ['O', 1, 4], ['I', 1, 5], ['L', 1, 6]];
    const keepS = keep.map(([l, v, i]) => A.k('k' + i, tile(...RK(i), l, v))).join('');
    const quad = [['Q', 10], ['U', 1], ['A', 1]];
    const onRack = quad.map(([l, v], i) => A.k('p' + i, tile(...RK(i), l, v))).join('');
    const onBoard = quad.map(([l, v], i) => A.k('p' + i, tile(...at(7, 4 + i), l, v))).join('');
    const fresh = [['R', 1], ['N', 1], ['T', 1]];
    const inBag = fresh.map(([l, v], i) => A.k('n' + i, tile(BAG[0] + i * 2, BAG[1], l, v))).join('');
    const drawn = fresh.map(([l, v], i) => A.k('n' + i, tile(...RK(i), l, v))).join('');
    const score = (v, hi) => (hi ? A.rect(226, 5, 60, 18, '#ffd76a', { rx: 9, sw: 0 }) : '') + A.text(256, 14, 'Score ' + v, { size: 10, weight: 800 });
    const [dx, dy] = at(7, 7), [qx, qy] = at(7, 4);
    return [
      { step: 0, say: '**BOARD** runs across the centre. Your rack: Q, U, A, E, O, I, L. The {=l-q} is worth **10**.', svg: base + inBag + bag + score(31) + onRack + keepS + A.glow(192, 174, 14, 'g-q') },
      { step: 0, say: 'Place {=l-q}{=l-u}{=l-a} in one column above the **D** to spell **QUAD**, joined to BOARD.', svg: base + inBag + bag + score(31) + onBoard + keepS + A.glow(dx + 8, qy + 34, 40, 'g-word') },
      { step: 0, say: 'Score: 10 + 1 + 1 + 2 = **14**. The D was already down: face value, no premium.', svg: base + inBag + bag + score(45, 1) + onBoard + keepS +
        A.text(dx + 30, qy + 8, '10', { size: 9, weight: 800 }) + A.text(dx + 30, qy + 25, '1', { size: 9, weight: 800 }) + A.text(dx + 30, qy + 42, '1', { size: 9, weight: 800 }) + A.text(dx + 30, dy + 8, '2', { size: 9, weight: 800 }) +
        A.k('sum', A.bubble(186, 34, 64, 26, '+14', { size: 12 })) },
      { step: 0, say: 'Draw **3** tiles to refill your rack to 7. Turn over.', svg: base + bag + score(45) + onBoard + keepS + drawn },
      { step: 1, say: 'Instead of playing, you may **exchange** tiles with the bag or **pass**. Both score 0.', svg: base + bag + score(45) + onBoard + keepS + drawn +
        A.curve(230, 160, 214, 120, 248, 112, { sw: 1.6, dash: '3 2' }) },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, s = 12, bx = 10, by = 10;
    let o = A.bg('#b98a55');
    o += A.rect(bx - 4, by - 4, 15 * s + 8, 15 * s + 8, '#1f5e4a', { rx: 4, sw: 1.2 });
    const key = (i, j) => i + ',' + j, P = {};
    [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]].forEach(([i, j]) => P[key(i, j)] = '#d2463c');
    for (let k = 1; k <= 4; k++) [[k, k], [14 - k, k], [k, 14 - k], [14 - k, 14 - k]].forEach(([i, j]) => P[key(i, j)] = '#f2a7a0');
    P[key(7, 7)] = '#f2a7a0';
    [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]].forEach(([i, j]) => P[key(i, j)] = '#3f74b8');
    [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]].forEach(([i, j]) => P[key(i, j)] = '#a9d3ea');
    o += A.grid(bx, by, 15, 15, s, (i, j) => P[key(i, j)] || '#e9dfc4', { stroke: '#cfc3a4', sw: 0.6 });
    const tiles = [['B', 5, 7, 3], ['O', 6, 7, 1], ['A', 7, 7, 1], ['R', 8, 7, 1], ['D', 9, 7, 2], ['G', 7, 6, 2], ['M', 7, 8, 3], ['E', 7, 9, 1], ['A', 5, 9, 1], ['X', 6, 9, 8], ['Q', 9, 4, 10], ['U', 9, 5, 1], ['A', 9, 6, 1]];
    for (const [l, i, j, v] of tiles) o += A.tile(bx + i * s + 0.5, by + j * s + 0.5, s - 1, '#f3e2b5', { letter: l, sub: v, sw: 0.8 });
    // rack
    const rack = [['S', 1], ['T', 1], ['A', 1], ['R', 1], ['Z', 10], ['E', 1], ['N', 1]];
    o += A.poly([[204, 190], [314, 190], [310, 176], [208, 176]], '#7a5232', { sw: 1.2 });
    rack.forEach(([l, v], i) => { o += A.tile(207 + i * 15, 160, 14, '#f3e2b5', { letter: l, sub: v }); });
    // bag
    o += A.use(I.bag.draw(A), 230, 84, 48);
    o += A.note(bx + 14 * s + 6, by + 6, 262, 18, 'Triple word');
    o += A.note(bx + 9 * s + 11.5, by + 4 * s + 6, 262, 46, 'Letter value: Q = 10');
    o += A.note(bx + 7 * s + 11, by + 7 * s + 1, 262, 70, 'Words must connect');
    o += A.note(260, 182, 262, 146, 'Rack of 7 tiles', { w: 90 });
    return o;
  },
});
