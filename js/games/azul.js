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

  pitch: 'Draft colourful tiles from shared factories and arrange them on your wall, scoring for tiles that link up, without taking more than you can use.',
  theme: 'You are an artisan tiling the walls of a Portuguese royal palace.',

  goal: { big: 'Most points', text: 'Score the most points by moving tiles onto your **wall**: each new tile scores for the tiles it joins in its row and column, plus end-game bonuses.' },

  turn: {
    type: 'round',
    intro: 'Each round (steps 1–2 go round the table until every tile is taken):',
    steps: [
      { verb: 'Take', text: 'Take **all** tiles of one colour from one factory (the rest slide to the centre), or all of one colour from the centre.' },
      { verb: 'Place', text: 'Put them all in **one** pattern line on your board. Tiles that don’t fit drop to your floor line.' },
      { verb: 'Tile', text: 'When no tiles are left, each **full** pattern line moves one tile to its row of the wall and scores; the rest of that line is discarded.' },
      { verb: 'Refill', text: 'Lose points for your floor line, then fill each factory with 4 new tiles from the bag.' },
    ],
  },

  tension: 'You must take every tile of the colour you pick, so the trick is grabbing exactly what fits your lines while leaving rivals only piles that will spill onto their floor.',

  flow: [
    { label: 'Draft', items: ['Factories', 'The centre', 'First-player marker'] },
    { label: 'Fill', items: ['Pattern lines (1–5)', 'Overflow to floor'] },
    { label: 'Score', items: ['Tile + linked neighbours', 'Floor penalties', 'Rows, columns, colours'] },
  ],

  end: { trigger: 'someone completes a horizontal row of their wall', detail: 'Finish that round’s tiling, then add end bonuses. Ties go to the player with more complete rows.' },
  scoring: [
    { label: 'Placing tiles', share: 6 },
    { label: 'Column bonuses', share: 2 },
    { label: 'Colour bonuses', share: 2 },
    { label: 'Row bonuses', share: 1 },
  ],

  ref: {
    title: 'Scoring',
    rows: [
      ['Tile with no neighbours', '1 point'],
      ['Tile joining others', '1 per tile in its linked row + linked column'],
      ['Floor line', '−1 −1 −2 −2 −2 −3 −3'],
      ['Full row (end)', '+2'],
      ['Full column (end)', '+7'],
      ['All 5 of a colour (end)', '+10'],
    ],
  },

  example: 'Ben takes the **3 red** tiles from a factory; its lone yellow slides to the centre. They exactly fill his 3-space line. At round end one red moves to his wall beside 2 blue tiles in that row, with 1 tile above it: 3 + 2 = **5 points**.',

  setup: [
    'Each player takes a board; use 5 factories for 2 players, 7 for 3, 9 for 4.',
    'Fill each factory with 4 random tiles from the bag.',
    'Put the first-player marker in the centre of the table; the start player goes first.',
  ],

  terms: [
    ['Factory', 'A round display holding 4 tiles at the start of the round.'],
    ['Centre', 'Where leftover tiles from factories collect.'],
    ['Pattern line', 'The 5 staging rows on the left of your board (1 to 5 spaces).'],
    ['Wall', 'The 5×5 grid on the right; each colour fits once per row and column.'],
    ['Floor line', 'Penalty row for tiles you can’t use.'],
  ],

  gotchas: [
    'A pattern line holds **one colour** only, and never a colour already on that row of your wall.',
    'The first player to take from the centre also takes the **first-player marker**: it goes on their floor (−1), but they start the next round.',
    'Unfinished lines stay put between rounds; only **full** lines move a tile to the wall.',
  ],

  tips: [
    'Fill the short lines first and build near the middle of the wall, where tiles link both ways.',
    'Columns (+7) and colour sets (+10) are worth far more than rows (+2).',
    'Count the centre late in the round so you are not the one forced to swallow a big pile.',
  ],

  art(A) {
    const C = A.C, cs = 16, g = 2.5, step = cs + g;
    const T = ['#2f6fbf', '#f2c12e', '#d7473b', '#2b2b2b', '#7fcfdc'];
    const tile = (x, y, k, o = {}) => A.tile(x, y, o.s || cs, T[k], { sw: 1 }) + (k === 3 ? A.circle(x + (o.s || cs) / 2, y + (o.s || cs) / 2, (o.s || cs) * 0.22, 'none', { stroke: '#7fcfdc', sw: 1.2 }) : '') + (k === 4 ? A.rect(x + (o.s || cs) * 0.3, y + (o.s || cs) * 0.3, (o.s || cs) * 0.4, (o.s || cs) * 0.4, 'none', { stroke: '#2f6fbf', sw: 1, rotate: 45 }) : '');
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
    o += A.tile(bx + 8, by + 116, 18, C.white, { sw: 1 }) + A.text(bx + 17, by + 125, '1', { size: 10, weight: 800 });
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
