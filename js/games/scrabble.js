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

  pitch: 'Build crossword-style words from seven letter tiles, aiming them at the bonus squares that multiply your score.',
  theme: 'You are a wordsmith filling one shared crossword, letter by letter.',

  goal: { big: 'Highest score', text: 'Score the **most points** by the time the tiles run out. Each word scores the letter values on its tiles, boosted by premium squares.' },

  turn: {
    type: 'choose',
    steps: [
      { verb: 'Play a word', text: 'Place tiles in **one row or column** so they form a word joined to the tiles already down. Score every new word you made, then refill to 7.' },
      { verb: 'Exchange', text: 'Swap any number of tiles with the bag instead of playing (only if 7+ tiles remain in it). You score 0.' },
      { verb: 'Pass', text: 'Do nothing and score 0.' },
    ],
  },

  tension: 'A long word with your best letters scores now, but it opens the triple-word squares to your opponent and leaves you with a weak rack, so you keep weighing score against board and rack.',

  flow: [
    { label: 'Draw', items: ['7 tiles on your rack', 'Refill after each play'] },
    { label: 'Place', items: ['One line only', 'Must touch existing tiles', 'Every new word must be valid'] },
    { label: 'Score', items: ['Letter values', 'Double / triple letter', 'Double / triple word', 'Use all 7: +50'] },
  ],

  end: { trigger: 'the bag is empty and one player uses their last tile (or no one can play)', detail: 'Everyone subtracts the value of tiles left on their rack. A player who went out adds everyone else’s leftover total.' },
  scoring: [
    { label: 'Word scores', share: 7 },
    { label: 'Premium squares', share: 3 },
    { label: '50-pt bingos', share: 1 },
  ],

  ref: {
    title: 'Tile values',
    rows: [
      ['1 point', 'A E I O U L N S T R'],
      ['2 / 3 points', 'D G / B C M P'],
      ['4 / 5 points', 'F H V W Y / K'],
      ['8 / 10 points', 'J X / Q Z'],
      ['Blank (×2)', '0 points, any letter'],
    ],
  },

  example: 'The board shows **BOARD** across the centre. You hold Q, U and A, and place them above its D to spell **QUAD** downward: Q10 + U1 + A1 + D2 = **14 points**. The D was already on the board, so it counts its face value but no premium. You draw 3 tiles back up to 7.',

  setup: [
    'Put all 100 tiles face-down in the bag; each player draws 7 onto their rack.',
    'Everyone draws a tile; the letter nearest A goes first (blank beats all).',
    'The first word must be 2+ letters and cover the **centre star**, which is a double-word square.',
  ],

  terms: [
    ['Rack', 'Your stand of 7 tiles, hidden from the others.'],
    ['Premium square', 'Coloured square that doubles or triples a letter or the whole word.'],
    ['Bingo', 'Using all 7 tiles in one turn: +50 points.'],
    ['Blank', 'Wild tile worth 0 that stands for any letter all game.'],
    ['Challenge', 'Disputing a word; check the agreed dictionary.'],
  ],

  gotchas: [
    'Premium squares count **only on the turn** a tile is first placed on them.',
    'Every new word formed by your tiles scores, including side words made by touching tiles.',
    'All tiles in one turn go in a **single line** with no gaps (existing tiles can fill gaps).',
  ],

  tips: [
    'Learn the two-letter words (QI, ZA, XU, JO…); they let you score sideways by stacking parallel words.',
    'Keep a balanced rack: save S and blanks for big plays, and dump awkward duplicates.',
    'Aim high-value letters (J, Q, X, Z) at triple-letter squares, ideally forming two words at once.',
  ],

  walk(A) {
    const C = A.C, s = 17, bx = 10, by = 12, c0 = 1, r0 = 2, T = 16, tileFill = '#f3e2b5';
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
    const bag = A.path('M262 96 q-16 4 -14 24 q2 12 24 12 q22 0 24 -12 q2 -20 -14 -24 z', { fill: '#5b3f8c', sw: 1.4 }) + A.path('M262 96 l-4 -8 h20 l-4 8', { fill: '#4a3275', sw: 1.2 }) + A.text(272, 118, 'bag', { size: 8, weight: 700, fill: C.white });
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
      { step: 0, say: '**BOARD** runs across the centre. Your rack holds Q, U, A, E, O, I, L, and the Q is worth **10**.', svg: base + inBag + bag + score(31) + onRack + keepS + A.glow(192, 174, 14, 'g-q') },
      { step: 0, say: 'Place Q, U, A in one column above the **D** to spell **QUAD** downward, joined to BOARD.', svg: base + inBag + bag + score(31) + onBoard + keepS + A.glow(dx + 8, qy + 34, 40, 'g-word') },
      { step: 0, say: 'Score it: Q10 + U1 + A1 + D2 = **14**. The D was already down, so it counts its face value but never a premium again.', svg: base + inBag + bag + score(45, 1) + onBoard + keepS +
        A.text(dx + 30, qy + 8, '10', { size: 9, weight: 800 }) + A.text(dx + 30, qy + 25, '1', { size: 9, weight: 800 }) + A.text(dx + 30, qy + 42, '1', { size: 9, weight: 800 }) + A.text(dx + 30, dy + 8, '2', { size: 9, weight: 800 }) +
        A.k('sum', A.bubble(186, 34, 64, 26, '+14', { size: 12 })) },
      { step: 0, say: 'Draw **3** tiles from the bag to refill your rack to 7. Your turn is over.', svg: base + bag + score(45) + onBoard + keepS + drawn },
      { step: 1, say: 'Other options on a turn: **exchange** tiles with the bag, or **pass**. Both score 0, so they’re for a hopeless rack.', svg: base + bag + score(45) + onBoard + keepS + drawn +
        A.curve(230, 160, 214, 120, 248, 112, { sw: 1.6, dash: '3 2' }) },
    ];
  },

  art(A) {
    const C = A.C, s = 12, bx = 10, by = 10;
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
    o += A.path('M252 98 q-14 4 -12 22 q2 11 22 11 q20 0 22 -11 q2 -18 -12 -22 z', { fill: '#5b3f8c', sw: 1.4 });
    o += A.path('M252 98 l-4 -8 h20 l-4 8', { fill: '#4a3275', sw: 1.2 });
    o += A.note(bx + 14 * s + 6, by + 6, 262, 18, 'Triple word ×3');
    o += A.note(bx + 9 * s + 11.5, by + 4 * s + 6, 262, 46, 'Letter value: Q = 10');
    o += A.note(bx + 7 * s + 11, by + 7 * s + 1, 262, 70, 'Words must cross');
    o += A.note(260, 182, 262, 146, 'Rack of 7 tiles', { w: 90 });
    return o;
  },
});
