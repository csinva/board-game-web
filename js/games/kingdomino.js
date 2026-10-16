defineGame({
  id: 'kingdomino',
  name: 'Kingdomino',
  year: 2016,
  designer: 'Bruno Cathala',
  family: 'tile',
  players: [2, 4], best: '2 or 4',
  time: [15, 25],
  age: 8,
  mechanics: ['tile-placement', 'drafting', 'spatial', 'set-collection'],
  profile: { complexity: 1, luck: 2, interaction: 3, conflict: 2, talk: 2, planning: 2 },

  // Terrain squares, crown, king, castle and domino: used inline and drawn the same way in art + walk.
  icons: (() => {
    const TER = { w: '#e8c547', f: '#2f6b34', l: '#3d8fd1', g: '#8cc63f', s: '#8f8f5c', m: '#5b4d43' };
    // One terrain square in a 26-unit box (the walkthrough's square size).
    const sq = (A, t) => {
      let s = A.rect(1, 1, 24, 24, TER[t], { rx: 3, sw: 1.2 });
      if (t === 'f') s += A.poly([[5, 20], [9.5, 8], [14, 20]], '#1f4f26', { sw: 0 }) + A.poly([[12, 22], [16.5, 10], [21, 22]], '#1f4f26', { sw: 0 });
      if (t === 'w') for (let k = 0; k < 3; k++) s += A.line(8 + k * 5, 22, 8 + k * 5, 13, { stroke: '#b8932a', sw: 1.4 }) + A.circle(8 + k * 5, 11, 1.8, '#f6dd7a', { sw: 0.8, stroke: '#b8932a' });
      if (t === 'l') s += A.path('M5 11 q4 -3 8 0 q4 3 8 0', { stroke: '#cfe6f7', sw: 1.5 }) + A.path('M5 18 q4 -3 8 0 q4 3 8 0', { stroke: '#cfe6f7', sw: 1.5 });
      if (t === 'g') for (const [x, y] of [[8, 11], [17, 13], [11, 20]]) s += A.path(`M${x - 3} ${y} l1.5 -4 l1.5 4 l1.5 -4 l1.5 4`, { stroke: '#4f8a24', sw: 1.2 });
      if (t === 's') for (const x of [8, 13, 18]) s += A.line(x, 22, x, 9, { stroke: '#4f4f30', sw: 1.4 }) + A.rect(x - 1.3, 7, 2.6, 6, '#6b4a2b', { rx: 1.3, sw: 0 });
      if (t === 'm') s += A.poly([[5, 23], [13, 9], [21, 23]], '#3c322b', { sw: 0 }) + A.poly([[11.3, 12], [13, 9], [14.7, 12]], '#d8d2c8', { sw: 0 });
      return s;
    };
    const square = (t, name) => ({ name, draw: A => A.group(sq(A, t), 'scale(0.923)') });
    return {
      wheat: square('w', 'wheat'), forest: square('f', 'forest'), lake: square('l', 'lake'), grass: square('g', 'grassland'), swamp: square('s', 'swamp'), mine: square('m', 'mine'),
      crown: { name: 'crown', draw: A => A.crown(12, 20, 20, '#f4d23c') },
      king: { name: 'king', draw: A => A.pawn(12, 15.5, 20, '#d9668f') + A.crown(12, 7, 9, '#f4d23c') },
      castle: { name: 'castle', draw: A => A.rect(1, 1, 22, 22, '#cfc5b8', { rx: 3, sw: 1.2 }) + A.city(13, 19.5, 16, '#e9e2d6') },
      domino: { name: 'domino', draw: A => A.group(sq(A, 'w'), 'translate(0 6) scale(0.4615)') + A.group(sq(A, 'l'), 'translate(12 6) scale(0.4615)') },
    };
  })(),

  pitch: 'Draft dominoes into a 5×5 kingdom; each terrain area scores squares × crowns, and most points wins.',

  goal: { big: 'Most points', text: 'Each connected area of one terrain scores **squares × {=crown}** in it. Highest total wins.' },

  turn: {
    type: 'sequence',
    intro: 'In king order (top domino of the line first), on your turn:',
    steps: [
      { verb: 'Place', text: 'Add the {domino} under your {king} to your kingdom. It must touch your {=castle} or **match** a touching terrain, and stay inside 5×5.' },
      { verb: 'Pick', text: 'Move your {=king} onto any free domino in the **next line**. Its position sets your turn order next round.' },
    ],
  },

  tension: 'Dominoes with more crowns have higher numbers and sit lower in the line, so taking one means you choose **last** next round.',

  structure: [
    { label: 'Setup', text: 'Lay out the first line. Draw kings at random; each owner puts theirs on a domino in it.' },
    { label: 'Rounds', repeat: '12 (6 with 2 players)', text: 'Lay out the next line, lowest number on top. Down the current line: place your domino, then pick from the next line.' },
    { label: 'Last round', text: 'No new line: just place your domino.' },
    { label: 'Final scoring', text: 'Each area scores squares × {=crown}, plus any optional bonuses.' },
  ],

  points: [
    ['Area', 'squares × {=crown} in it'],
    ['Area with no {=crown}', '0'],
    ['Middle Kingdom (optional)', '+10 if {=castle} is in the centre'],
    ['Harmony (optional)', '+5 for a full 5×5 with no discards'],
    ['Tie', 'largest area wins, then most crowns'],
  ],

  end: { trigger: 'the last domino is placed', detail: '12 rounds with 3–4 players. With 2, each player has two kings and plays 6 rounds.' },
  scoring: [
    { label: 'Biggest crowned area', share: 5 },
    { label: 'Other areas', share: 3 },
    { label: 'Optional bonuses', share: 1 },
  ],

  ref: {
    title: 'By player count',
    rows: [
      ['Terrains', '{wheat} {forest} {lake} {grass} {swamp} {mine}'],
      ['2 players', '24 dominoes · {=king}{=king} each · line of 4'],
      ['3 players', '36 dominoes · {=king} each · line of 3'],
      ['4 players', '48 dominoes · {=king} each · line of 4'],
    ],
  },

  example: 'Your {=king} is on domino **2** ({=wheat}{=wheat}). Placed beside your crowned wheat, the area grows to 3 squares with 1 {=crown}: 3 points. Then you move your king to **46** ({=swamp} + {=mine} with 2 crowns), so you place last next round.',

  setup: [
    'Each player takes a {castle}, a starting square and their {king}s (table).',
    'Shuffle the dominoes face down, removing extras for 2–3 players (table).',
    'Draw one domino per king, sort them lowest number on top, and turn them face up.',
    'Draw kings at random; each owner puts theirs on a domino in that line. Then lay out the next line.',
  ],

  terms: [
    ['{=domino} Domino', 'Two-square tile; the number on its back ranks its value.'],
    ['Area', 'Squares of one terrain joined edge to edge.'],
    ['{=crown} Crown', 'Printed on some squares. Multiplies an area’s size.'],
    ['Line', 'Row of dominoes on offer for the next round.'],
  ],

  gotchas: [
    'Only **one** side of the new domino must match a neighbour (or touch the castle). If it can’t fit anywhere, discard it.',
    'The whole kingdom, castle included, must fit in **5×5**. Plan the edges early.',
    'Areas with **no crowns** score 0, however big.',
    'Turn order each round follows the kings’ places in the line, not seating.',
    'With 2 players, take both turns for your two kings each round.',
  ],

  tips: [
    'Pick dominoes that extend areas that already have crowns.',
    'A weak low number buys first choice next round, which can be worth more.',
    'Take what a rival needs when it also helps you.',
  ],

  walk(A) {
    const C = A.C;
    const TER = { w: '#e8c547', f: '#2f6b34', l: '#3d8fd1', g: '#8cc63f', s: '#8f8f5c', m: '#5b4d43' };
    const cs = 26, gx = 12, gy = 34;
    const crownAt = (x, y, n) => { let s = ''; for (let i = 0; i < n; i++) s += A.crown(x - (n - 1) * 4 + i * 8, y, 8, '#f4d23c'); return s; };
    // Terrain squares are the inline terrain icons at 26 px.
    const I = this.icons, KEY = { w: 'wheat', f: 'forest', l: 'lake', g: 'grass', s: 'swamp', m: 'mine' };
    const sq = (x, y, t, n = 0) => A.use(I[KEY[t]].draw(A), x, y, cs) + (n ? crownAt(x + cs / 2, y + 9, n) : '');
    const dom = (x, y, [a, ca, b, cb]) => A.rect(x + 1.5, y + 2, 2 * cs, cs, C.shadow, { sw: 0, rx: 3 }) + sq(x, y, a, ca) + sq(x + cs, y, b, cb);
    const cell = (c, r) => [gx + c * cs, gy + r * cs];
    let board = A.bg('#efe6d2') + A.rect(gx - 4, gy - 4, cs * 5 + 8, cs * 5 + 8, '#d9ccad', { rx: 6, sw: 1 });
    board += A.text(gx + 2.5 * cs, 16, 'Your kingdom (5×5)', { size: 8, fill: '#6d5a3a' });
    const [kx, ky] = cell(2, 2);
    board += A.use(I.castle.draw(A), kx + 1, ky + 1, cs - 2);
    for (const [c, r, t, n] of [[0, 2, 'f', 1], [1, 2, 'g', 0], [2, 0, 'f', 0], [2, 1, 'l', 1], [3, 2, 'w', 1], [4, 2, 's', 0], [1, 3, 'g', 0], [2, 3, 'g', 0]]) board += sq(...cell(c, r), t, n);
    // The two lines of dominoes: this round (left) and next round (right).
    const L1 = 176, L2 = 256, row = (i) => 34 + i * 38;
    board += A.text(L1 + cs, 16, 'This round', { size: 8, fill: '#6d5a3a' }) + A.text(L2 + cs, 16, 'Next round', { size: 8, fill: '#6d5a3a' });
    const cur = [[1, null], [2, ['w', 0, 'w', 0]], [27, ['f', 1, 'w', 0]], [38, ['w', 0, 's', 1]]];
    const nxt = [[3, ['f', 0, 'f', 0]], [19, ['w', 1, 'f', 0]], [33, ['l', 1, 'f', 0]], [46, ['s', 0, 'm', 2]]];
    cur.forEach(([n, d], i) => { board += A.text(L1 - 7, row(i) + cs / 2, n, { size: 7.5, weight: 800, fill: '#6d5a3a' }); if (!d) board += A.rect(L1, row(i), 2 * cs, cs, 'none', { rx: 3, dash: '3 2', sw: 1 }); else if (n !== 2) board += dom(L1, row(i), d); });
    nxt.forEach(([n, d], i) => { board += A.text(L2 - 7, row(i) + cs / 2, n, { size: 7.5, weight: 800, fill: '#6d5a3a' }) + dom(L2, row(i), d); });
    const king = (x, y, c) => A.pawn(x, y, 16, c) + A.crown(x, y - 7, 7, '#f4d23c');
    board += king(L2 + cs, row(0) + 13, C.blue) + king(L1 + cs, row(2) + 13, C.green) + king(L1 + cs, row(3) + 13, C.yellow);
    const d14 = (x, y) => A.k('d14', dom(x, y, ['w', 0, 'w', 0]));
    const mine = (x, y) => A.k('king', A.use(I.king.draw(A), x - 9.6, y - 12.4, 19.2));
    const onLine = [L1 + cs, row(1) + 13], on46 = [L2 + cs, row(3) + 13], placed = cell(3, 3);
    const [ax, ay] = cell(3, 2);
    return [
      { step: 0, say: 'Your {=king} (pink) is on domino **2**: {=wheat}{=wheat}. Place it in your kingdom.', svg: board + d14(L1, row(1)) + mine(...onLine) + A.glow(L1 + cs, row(1) + 13, 30, 'g14') },
      { step: 0, say: 'One side must **match** a touching terrain: set it below your wheat, inside the 5×5.', svg: board + d14(...placed) + mine(...onLine) },
      { step: 0, say: 'The wheat area is now **3 squares** with **1** {=crown}: 3 × 1 = 3 points.', svg: board + d14(...placed) + mine(...onLine) + A.k('area', A.path(`M${ax - 1} ${ay - 1} H${ax + cs + 1} V${ay + cs - 1} H${ax + 2 * cs + 1} V${ay + 2 * cs + 1} H${ax - 1} Z`, { fill: 'none', stroke: '#ffcf3f', sw: 3.5 })) + A.k('pts', A.tag(ax + cs, ay + 2 * cs + 14, '3 × 1 = 3', { fill: '#b8932a' })) },
      { step: 1, say: '**Pick** for next round: move your king to **46**, {=swamp} + {=mine} with {=crown}{=crown}.', svg: board + d14(...placed) + mine(...on46) + A.glow(L2 + cs, row(3) + 13, 30, 'g46') },
      { step: 1, say: 'High numbers sit low in the line, so next round you go **last**. Strong dominoes cost turn order.', svg: board + d14(...placed) + mine(...on46) + A.k('order', A.arrow(L2 + 2 * cs + 8, row(0) + 4, L2 + 2 * cs + 8, row(3) + 22, { sw: 1.6, head: 5 })) },
    ];
  },

  art(A) {
    const C = A.C;
    const TER = { w: '#e8c547', f: '#2f6b34', l: '#3d8fd1', g: '#8cc63f', s: '#8f8f5c', m: '#5b4d43' };
    const cs = 28.5, gx = 14, gy = 25;
    const I = this.icons, KEY = { w: 'wheat', f: 'forest', l: 'lake', g: 'grass', s: 'swamp', m: 'mine' };
    const kingdom = [
      'ffwwl',
      'fgwwl',
      'gg.ll',
      'smggl',
      'sm..g',
    ];
    const crowns = { '1,0': 1, '1,3': 2, '1,4': 2, '4,4': 1 };
    const crownAt = (x, y, n) => { let s = ''; for (let i = 0; i < n; i++) s += A.crown(x - (n - 1) * 4 + i * 8, y, 8, '#f4d23c'); return s; };
    let o = A.bg('#efe6d2');
    o += A.rect(gx - 4, gy - 4, cs * 5 + 8, cs * 5 + 8, '#d9ccad', { rx: 6, sw: 1 });
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const t = kingdom[r][c], x = gx + c * cs, y = gy + r * cs;
      if (t === '.') { if (r === 2) o += A.use(I.castle.draw(A), x + 1, y + 1, cs - 2); continue; }
      o += A.use(I[KEY[t]].draw(A), x, y, cs);
      const k = c + ',' + r;
      if (crowns[k]) o += crownAt(x + cs / 2, y + 11, crowns[k]);
    }
    // Empty square still open
    o += A.rect(gx + 2 * cs + 2, gy + 4 * cs + 2, 2 * cs - 4, cs - 4, 'none', { rx: 3, dash: '3 2', sw: 1 });
    // Domino lines
    const dom = (x, y, a, b, ca, cb, num) => {
      let s = A.rect(x + 1.5, y + 2, 52, 26, C.shadow, { sw: 0, rx: 3 });
      s += A.use(I[KEY[a]].draw(A), x - 1.1, y - 1.1, 28.2) + A.use(I[KEY[b]].draw(A), x + 24.9, y - 1.1, 28.2);
      if (ca) s += crownAt(x + 13, y + 9, ca);
      if (cb) s += crownAt(x + 39, y + 9, cb);
      return s;
    };
    const cur = [['w', 'w', 0, 0], ['w', 's', 0, 0], ['l', 'g', 0, 1], ['s', 'm', 0, 2]];
    const nxt = [['f', 'f', 0, 0], ['w', 'g', 1, 0], ['g', 's', 0, 1], ['m', 'w', 2, 0]];
    const kingC = [C.pink, C.blue, C.yellow, C.green];
    cur.forEach(([a, b, ca, cb], i) => { o += i ? dom(190, 30 + i * 38, a, b, ca, cb) : A.rect(190, 30, 52, 26, 'none', { rx: 3, dash: '3 2', sw: 1 }); });
    nxt.forEach(([a, b, ca, cb], i) => { o += dom(258, 30 + i * 38, a, b, ca, cb); });
    const king = (x, y, c) => A.pawn(x, y, 18, c) + A.crown(x, y - 8, 8, '#f4d23c');
    o += king(216, 84, kingC[1]) + king(216, 122, kingC[2]) + king(216, 160, kingC[3]);
    o += king(284, 122, kingC[0]);
    o += A.curve(226, 40, 258, 18, 274, 110, { sw: 1.4, dash: '3 2', head: 5 });
    o += A.note(gx + 2.5 * cs, gy + 2.5 * cs, 120, 11, 'Your castle');
    o += A.note(gx + 1.5 * cs, gy + 4 * cs, 60, 189, 'Mine: 2 squares × 4 = 8');
    o += A.note(206, 168, 252, 189, 'Place in king order');
    o += A.note(296, 136, 268, 11, 'Pick for next round');
    return o;
  },
});
