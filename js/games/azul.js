defineGame({
  id: 'azul',
  name: 'Azul',
  year: 2017,
  designer: 'Michael Kiesling',
  family: 'tile',
  players: [2, 4], best: '2',
  time: [30, 45],
  age: 8,
  mechanics: ['drafting', 'pattern-building', 'set-collection', 'tile-placement'],
  profile: { complexity: 1, luck: 2, interaction: 3, conflict: 3, talk: 1, planning: 3 },

  // The 5 tile colours, first-player tile and factory: used inline and drawn the same way in art + walk.
  icons: (() => {
    const T = ['#2f6fbf', '#f2c12e', '#d7473b', '#2b2b2b', '#7fcfdc'];
    // Tile k with top-left (x, y) and side s; motifs on black and light blue as on the real tiles.
    const tile = (A, x, y, s, k) => A.tile(x, y, s, T[k], { sw: 1.2 }) + (k === 3 ? A.circle(x + s / 2, y + s / 2, s * 0.22, 'none', { stroke: '#7fcfdc', sw: 1.4 }) : '') + (k === 4 ? A.rect(x + s * 0.3, y + s * 0.3, s * 0.4, s * 0.4, 'none', { stroke: '#2f6fbf', sw: 1.2, rotate: 45 }) : '');
    const t = (k, name) => ({ name, draw: A => tile(A, 1.5, 1.5, 20, k) });
    return {
      blue: t(0, 'blue'), yellow: t(1, 'yellow'), red: t(2, 'red'), black: t(3, 'black'), teal: t(4, 'light blue'),
      first: { name: 'first-player tile', draw: A => A.tile(1.5, 1.5, 20, '#fff', { sw: 1.2 }) + A.text(11.5, 12, '1', { size: 13, weight: 800 }) },
      factory: { name: 'factory', draw: A => A.circle(12, 12, 11, '#f6f0e2', { sw: 1.3 }) + [2, 0, 1, 4].map((k, i) => A.rect(4.8 + (i % 2) * 7.6, 4.8 + Math.floor(i / 2) * 7.6, 6.8, 6.8, T[k], { rx: 1.2, sw: 0.9 })).join('') },
    };
  })(),

  pitch: 'Draft tiles from shared factories onto your wall; each tile scores for the tiles it links to. Most points wins.',

  goal: { big: 'Most points', text: 'Score the most points. Each tile you move to your **wall** scores for the tiles it connects to in its row and column; bonuses at game end add more.' },

  turn: {
    type: 'round',
    intro: 'Each round, players take turns clockwise doing steps 1–2, starting with the holder of the first-player tile, until every factory and the centre are empty. Then everyone does steps 3–4:',
    steps: [
      { verb: 'Take', text: 'Take **all** tiles of one colour from one {factory} and push that factory’s other tiles into the centre; or take all tiles of one colour from the centre.' },
      { verb: 'Place', text: 'Put them all in **one** of your pattern lines, or all straight onto your floor line. Tiles that don’t fit in the chosen line go on your floor line, filling it left to right.' },
      { verb: 'Tile', text: 'Going top to bottom, from each **full** pattern line move one tile to the space of its colour in the same wall row and score it. Discard that line’s other tiles.' },
      { verb: 'Refill', text: 'Lose the points shown by each filled floor space and discard those tiles. Whoever had the {=first} goes first next round. Fill each factory with 4 tiles from the bag.' },
    ],
  },

  tension: 'You must take every tile of the colour you pick, so take exactly what fits and leave rivals piles that spill onto their floor.',

  structure: [
    { label: 'Setup', text: 'Fill each {factory} with 4 tiles from the bag; put the {first} in the centre.' },
    { label: 'Factory offer', repeat: 'each round', text: 'Going clockwise, players take tiles one turn at a time until every factory and the centre are empty.' },
    { label: 'Wall-tiling', text: 'Each full pattern line moves a tile to the wall and scores; subtract floor penalties; refill the factories. The holder of the {=first} starts the next round.' },
    { label: 'Final scoring', text: 'After the round in which someone completes a horizontal wall row, add the row, column and colour bonuses.' },
  ],

  points: [
    ['New wall tile', '1 if it touches no other wall tile. Otherwise: the number of tiles in the unbroken horizontal line it is part of (if 2 or more) plus the number in its unbroken vertical line (if 2 or more), counting itself in each'],
    ['Floor line', '−1 −1 −2 −2 −2 −3 −3, left to right; score never drops below 0'],
    ['Full row (end)', '+2 per complete horizontal row'],
    ['Full column (end)', '+7 per complete vertical column'],
    ['{=red}{=red}{=red}{=red}{=red} (end)', '+10 per colour with all 5 of its tiles on your wall'],
  ],

  end: { trigger: 'someone completes a horizontal row of their wall', detail: 'Finish that round’s wall-tiling, then add end bonuses. If tied, the player with more complete horizontal rows wins.' },
  scoring: [
    { label: 'Placing tiles', share: 6 },
    { label: 'Column bonuses', share: 2 },
    { label: 'Colour bonuses', share: 2 },
    { label: 'Row bonuses', share: 1 },
  ],

  ref: {
    title: 'Tiles and factories',
    rows: [
      ['Tiles', '{blue} {yellow} {red} {black} {teal} (20 each)'],
      ['2 / 3 / 4 players', '5 / 7 / 9 {=factory}'],
      ['Bag empty', 'refill it with all the discarded tiles; if those run out too, fill the factories as far as you can'],
    ],
  },

  example: 'Ben takes the **3** {=red}{=red}{=red} from a factory; its lone {=yellow} slides to the centre. They exactly fill his 3-space line. At round end one red moves to his wall next to 2 tiles in its row and 1 in its column: 3 + 2 = **5 points**.',

  setup: [
    'Each player takes a board and puts a score marker on 0. Put out the number of factories shown in the table.',
    'Fill each factory with 4 random tiles from the bag.',
    'Put the {first} in the centre. The player who most recently visited Portugal goes first; turns pass clockwise. At the start of every later round, the {first} goes back to the centre.',
  ],

  terms: [
    ['{=factory} Factory', 'Round display that holds 4 tiles at the start of each round.'],
    ['Centre', 'The middle of the table, where leftover factory tiles collect. The {=first} starts each round there.'],
    ['Pattern line', 'The 5 staging rows left of your wall (1 to 5 spaces).'],
    ['Wall', '5×5 grid printed with colours; each colour has one space per row and column.'],
    ['Floor line', 'Penalty row for tiles you can’t use.'],
  ],

  gotchas: [
    'Each pattern line holds tiles of only **one colour** at a time, and never a colour already on your wall in that row.',
    'The first player each round to take from the centre also takes the {first}: it goes on their floor line like a tile (usually −1), and they go first next round.',
    'Unfinished lines stay between rounds; only **full** lines move a tile to the wall.',
    'The floor line has 7 spaces; once full, extra tiles are discarded with no further penalty. The {=first} counts as a floor tile.',
  ],

  tips: [
    'Fill short lines first and build near the wall’s middle, where tiles link both ways.',
    'Columns (+7) and colour sets (+10) beat rows (+2).',
    'Count the centre late in the round so you aren’t forced to take a big pile.',
  ],

  walk(A) {
    const C = A.C, cs = 20, g = 2.5, step = cs + g;
    const T = ['#2f6fbf', '#f2c12e', '#d7473b', '#2b2b2b', '#7fcfdc'], I = this.icons, KEY = ['blue', 'yellow', 'red', 'black', 'teal'];
    // Tiles are the inline tile icons: icon tile is 20 units wide at (1.5, 1.5).
    const ic = (key, x, y, s) => A.use(I[key].draw(A), x - 1.5 * s / 20, y - 1.5 * s / 20, 24 * s / 20);
    const tile = (x, y, k, s = cs) => ic(KEY[k], x, y, s);
    const bx = 6, by = 6, prx = 122, wx = 130;
    const pl = (r, k) => [prx - (k + 1) * step + g, by + 10 + r * step];
    const wl = (r, c) => [wx + c * step, by + 10 + r * step];
    let board = A.bg('#efe4cc') + A.rect(bx, by, 240, 126, '#d9c9a6', { rx: 8 });
    for (let r = 0; r < 5; r++) for (let k = 0; k <= r; k++) board += A.rect(...pl(r, k), cs, cs, '#c4b08a', { rx: 3, sw: 0.8 });
    const placed = new Set(['0,0', '0,1', '1,4', '2,2', '2,3', '3,0']);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) { const k = (c - r + 5) % 5; board += placed.has(r + ',' + c) ? tile(...wl(r, c), k) : A.rect(...wl(r, c), cs, cs, T[k], { rx: 3, sw: 0.6, opacity: 0.35 }); }
    board += tile(...pl(3, 0), 4) + tile(...pl(3, 1), 4);
    board += A.tag(52, 148, 'Ben’s board', { fill: '#6d5a3a' });
    // Factories and centre.
    const F1 = [284, 36], F2 = [284, 98];
    for (const [fx, fy] of [F1, F2]) board += A.circle(fx + 1.5, fy + 2, 25, C.shadow, { sw: 0 }) + A.circle(fx, fy, 25, '#f6f0e2', { sw: 1.4 });
    board += A.text(284, 136, 'centre', { size: 8, fill: '#6d5a3a' });
    const fpos = ([fx, fy], i) => [fx - 15 + (i % 2) * 16, fy - 15 + Math.floor(i / 2) * 16];
    const ft = (key, xy, k) => A.k(key, tile(...xy, k, 14));
    const f2 = [1, 1, 3, 0].map((k, i) => ft('f2-' + i, fpos(F2, i), k)).join('') + ft('c-1', [277, 146], 4);
    const fp = A.k('fp', ic('first', 296, 146, 14));
    const lifted = (n) => [126 + n * 24, 152], inLine = (n) => pl(2, n);
    const yel = (xy) => A.k('yel', tile(...xy, 1, 14));
    const score = (n) => A.k('s' + n, A.tag(262, 186, 'Ben: ' + n + ' points', { fill: '#2f6fbf' }));
    const redsF = [0, 1, 3].map(i => A.k('red' + i, tile(...fpos(F1, i), 2, 14))).join('');
    const redsAt = (fn) => [0, 1, 3].map((i, n) => A.k('red' + i, tile(...fn(n), 2))).join('');
    const [rx, ry] = wl(2, 4);
    const refill = [[0, 2, 2, 4], [3, 3, 1, 0]].map((ks, f) => ks.map((k, i) => ft('n' + f + i, fpos(f ? F2 : F1, i), k)).join('')).join('');
    return [
      { step: 0, say: 'Ben wants red. This {factory} holds **3** {=red} and 1 {=yellow}.', svg: board + redsF + yel(fpos(F1, 2)) + f2 + fp + score(12) + A.glow(...F1, 30, 'g-f1') },
      { step: 0, say: 'He must take **all 3 reds**. The leftover yellow slides to the centre.', svg: board + redsAt(lifted) + yel([258, 146]) + f2 + fp + score(12) },
      { step: 1, say: 'All 3 go in **one** pattern line: the 3-space line, filled exactly. Nothing spills to the floor.', svg: board + redsAt(inLine) + yel([258, 146]) + f2 + fp + score(12) + A.glow(pl(2, 1)[0] + cs / 2, pl(2, 1)[1] + cs / 2, 30, 'g-line') },
      { step: 2, say: 'When all tiles are taken, the full line moves **one red** to its wall space. The other two are discarded.', svg: board + A.k('red0', tile(rx, ry, 2)) + score(12) },
      { step: 2, say: 'It links **3** tiles in its row (itself included) and **2** in its column: **3 + 2 = 5 points**.', svg: board + A.k('red0', tile(rx, ry, 2)) + score(17) +
        A.k('hl-row', A.rect(wl(2, 2)[0] - 2, ry - 2, 3 * step + 1, cs + 4, 'none', { rx: 4, stroke: '#ffcf3f', sw: 3 })) + A.k('hl-col', A.rect(rx - 2, wl(1, 4)[1] - 2, cs + 4, 2 * step + 1, 'none', { rx: 4, stroke: '#ffcf3f', sw: 3 })) },
      { step: 3, say: 'Refill each factory with 4 tiles from the bag. Next round.', svg: board + A.k('red0', tile(rx, ry, 2)) + score(17) + refill },
    ];
  },

  art(A) {
    const C = A.C, cs = 16, g = 2.5, step = cs + g;
    const T = ['#2f6fbf', '#f2c12e', '#d7473b', '#2b2b2b', '#7fcfdc'], I = this.icons, KEY = ['blue', 'yellow', 'red', 'black', 'teal'];
    const ic = (key, x, y, s) => A.use(I[key].draw(A), x - 1.5 * s / 20, y - 1.5 * s / 20, 24 * s / 20);
    const tile = (x, y, k, o = {}) => ic(KEY[k], x, y, o.s || cs);
    let o = A.bg('#efe4cc');
    const bx = 6, by = 6, prx = 100, wx = 108;
    o += A.rect(bx, by, 202, 150, '#d9c9a6', { rx: 8 });
    // Pattern lines: row r has r+1 spaces, right-aligned at prx
    const pat = [[2], [0, 0], [4, 4, -1], [-1, -1, -1, -1], [1, 1, 1, -1, -1]];
    pat.forEach((row, r) => {
      const y = by + 8 + r * step;
      for (let k = 0; k <= r; k++) {
        const x = prx - (k + 1) * step + g;
        const v = row[k];
        o += v >= 0 ? tile(x, y, v) : A.rect(x, y, cs, cs, '#c4b08a', { rx: 3, sw: 0.8 });
      }
    });
    // Wall: colour of cell (r, c) is (c - r) mod 5
    const placed = new Set(['0,0', '0,1', '1,0', '1,2', '2,2', '2,3', '3,3', '4,4']);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const x = wx + c * step, y = by + 8 + r * step, k = (c - r + 5) % 5;
      o += placed.has(r + ',' + c) ? tile(x, y, k) : A.rect(x, y, cs, cs, T[k], { rx: 3, sw: 0.6, opacity: 0.38 });
    }
    // Floor line
    const pens = ['−1', '−1', '−2', '−2', '−2', '−3', '−3'];
    pens.forEach((p, i) => {
      const x = bx + 8 + i * 22, y = by + 116;
      o += A.text(x + 9, y - 6, p, { size: 7.5, fill: '#6d5a3a' });
      o += A.rect(x, y, 18, 18, '#c4b08a', { rx: 3, sw: 0.8 });
    });
    o += ic('first', bx + 8, by + 116, 18);
    o += tile(bx + 30, by + 116, 2, { s: 18 });
    // Factories
    const fac = [[236, 34, [0, 0, 3, 4]], [290, 34, [1, 2, 2, 4]], [236, 160, [3, 1, 1, 0]], [290, 160, [4, 4, 2, 3]]];
    for (const [fx, fy, ts] of fac) {
      o += A.circle(fx + 1.5, fy + 2, 24, C.shadow, { sw: 0 }) + A.circle(fx, fy, 24, '#f6f0e2', { sw: 1.4 });
      ts.forEach((k, i) => { o += tile(fx - 15 + (i % 2) * 15, fy - 15 + Math.floor(i / 2) * 15, k, { s: 13 }); });
    }
    // Centre pile
    [[0, 246, 98], [0, 260, 106], [1, 274, 96], [3, 254, 116], [2, 280, 114]].forEach(([k, x, y]) => { o += tile(x, y, k, { s: 13 }); });
    o += A.note(prx - 2 * step, by + 8 + 2 * step + 8, 44, 24, 'Pattern lines');
    o += A.note(wx + 2 * step + 8, by + 8 + 3 * step + 8, 178, 186, 'Wall: tiles score links');
    o += A.note(bx + 52, by + 125, 52, 186, 'Floor: −points');
    o += A.note(248, 50, 263, 76, 'Factory');
    return o;
  },
});
