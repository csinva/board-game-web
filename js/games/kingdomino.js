defineGame({
  id: 'kingdomino',
  name: 'Kingdomino',
  year: 2016,
  designer: 'Bruno Cathala',
  family: 'tile',
  players: [2, 4], best: '4',
  time: [15, 20],
  age: 8,
  mechanics: ['tile-placement', 'drafting', 'spatial', 'set-collection'],
  profile: { complexity: 1, luck: 2, interaction: 3, conflict: 2, talk: 2, planning: 2 },

  pitch: 'Pick terrain dominoes and fit them into a 5×5 kingdom: big matching areas score, but only if they contain crowns.',
  theme: 'You are a lord expanding your kingdom with fields, lakes, forests and mines.',

  goal: { big: 'Most points', text: 'Each connected area of one terrain scores **squares × crowns** in it. Highest kingdom total wins.' },

  turn: {
    type: 'sequence',
    intro: 'In king order (top domino of the line first), on your turn:',
    steps: [
      { verb: 'Place', text: 'Add the domino your king is on to your kingdom. It must touch your castle or **match** a touching terrain, and fit inside 5×5.' },
      { verb: 'Pick', text: 'Move your king onto any free domino in the **next line**. Its position sets your turn order next round.' },
    ],
  },

  tension: 'Better dominoes carry higher numbers and sit lower in the line, so grabbing one now means you choose **last** next round.',

  flow: [
    { label: 'Pick', items: ['Dominoes sorted by number', 'High number = more crowns', 'Low number = pick first'] },
    { label: 'Place', items: ['Match one terrain', 'Stay within 5×5', 'Can’t fit = discard'] },
    { label: 'Score', items: ['Squares × crowns per area', 'No crowns = 0'] },
  ],

  end: { trigger: 'the last domino has been placed', detail: '12 rounds with 3–4 players; with 2, each player has two kings and builds over 6 rounds.' },
  scoring: [
    { label: 'Biggest crowned area', share: 5 },
    { label: 'Other areas', share: 3 },
    { label: 'Optional bonuses', share: 1 },
  ],

  ref: {
    title: 'Scoring',
    rows: [
      ['Area score', 'squares × crowns in it'],
      ['Area without crowns', '0 points'],
      ['Middle Kingdom (optional)', '+10 if castle is in the centre'],
      ['Harmony (optional)', '+5 for a full 5×5, no discards'],
      ['Tie', 'largest area, then most crowns'],
    ],
  },

  example: 'Your king is on domino **14**, two wheat squares, so you place it beside your wheat: the area grows to 4 squares with 1 crown, worth 4. Then you jump your king onto **46**, a swamp with 2 crowns, knowing you’ll place last next round.',

  setup: [
    'Each player takes a starting square and castle, plus a king (two kings each with 2 players).',
    'Shuffle the dominoes (remove 24 with 2 players, 12 with 3) and lay out a line of 4 (3 with 3 players), sorted lowest number on top, face up.',
    'Players randomly place kings on that line; then lay out the next line.',
  ],

  terms: [
    ['Domino', 'A two-square tile; its number on the back shows how valuable it is.'],
    ['Area', 'Squares of one terrain touching side by side.'],
    ['Crown', 'Printed on some squares. Multiplies an area’s size.'],
    ['Line', 'The row of dominoes on offer for the next round.'],
  ],

  gotchas: [
    'Only **one** side of the new domino needs to match a neighbour (or touch the castle). If it can’t legally fit anywhere, it is discarded.',
    'Your whole kingdom must fit inside a **5×5** square, castle included. Plan the edges early.',
    'Areas with **no crowns** score nothing, however big.',
  ],

  tips: [
    'Pick dominoes that join areas you already have crowns in.',
    'A mediocre low number buys you first choice next round, sometimes worth more.',
    'Watch what rivals need and take it if it also helps you.',
  ],

  walk(A) {
    const C = A.C;
    const TER = { w: '#e8c547', f: '#2f6b34', l: '#3d8fd1', g: '#8cc63f', s: '#8f8f5c', m: '#5b4d43' };
    const cs = 26, gx = 12, gy = 34;
    const crownAt = (x, y, n) => { let s = ''; for (let i = 0; i < n; i++) s += A.crown(x - (n - 1) * 4 + i * 8, y, 8, '#f4d23c'); return s; };
    const sq = (x, y, t, n = 0) => {
      let s = A.rect(x + 1, y + 1, cs - 2, cs - 2, TER[t], { rx: 3, sw: 1 });
      if (t === 'f') s += A.poly([[x + 8, y + 21], [x + 13, y + 9], [x + 18, y + 21]], '#1f4f26', { sw: 0 });
      if (t === 'w') for (let k = 0; k < 3; k++) s += A.line(x + 8 + k * 5, y + 22, x + 8 + k * 5, y + 15, { stroke: '#b8932a', sw: 1.3 });
      if (t === 'l') s += A.path(`M${x + 6} ${y + 18} q3.5 -3 7 0 q3.5 3 7 0`, { stroke: '#cfe6f7', sw: 1.3 });
      if (t === 'm') s += A.poly([[x + 6, y + 23], [x + 13, y + 11], [x + 20, y + 23]], '#3c322b', { sw: 0 });
      if (n) s += crownAt(x + cs / 2, y + 9, n);
      return s;
    };
    const dom = (x, y, [a, ca, b, cb]) => A.rect(x + 1.5, y + 2, 2 * cs, cs, C.shadow, { sw: 0, rx: 3 }) + sq(x, y, a, ca) + sq(x + cs, y, b, cb);
    const cell = (c, r) => [gx + c * cs, gy + r * cs];
    let board = A.bg('#efe6d2') + A.rect(gx - 4, gy - 4, cs * 5 + 8, cs * 5 + 8, '#d9ccad', { rx: 6, sw: 1 });
    board += A.text(gx + 2.5 * cs, 16, 'Your kingdom (5×5)', { size: 8, fill: '#6d5a3a' });
    const [kx, ky] = cell(2, 2);
    board += A.rect(kx + 2, ky + 2, cs - 4, cs - 4, '#cfc5b8', { rx: 3 }) + A.city(kx + cs / 2 + 1, ky + cs - 5, 16, '#e9e2d6');
    for (const [c, r, t, n] of [[0, 2, 'f', 1], [1, 2, 'f', 0], [2, 0, 'l', 1], [2, 1, 'l', 0], [3, 2, 'w', 1], [4, 2, 'w', 0], [1, 3, 'g', 0], [2, 3, 'g', 0]]) board += sq(...cell(c, r), t, n);
    // The two lines of dominoes: this round (left) and next round (right).
    const L1 = 176, L2 = 256, row = (i) => 34 + i * 38;
    board += A.text(L1 + cs, 16, 'This round', { size: 8, fill: '#6d5a3a' }) + A.text(L2 + cs, 16, 'Next round', { size: 8, fill: '#6d5a3a' });
    const cur = [[5, null], [14, ['w', 0, 'w', 0]], [27, ['l', 0, 'f', 1]], [38, ['m', 2, 's', 0]]];
    const nxt = [[3, ['f', 0, 'f', 0]], [19, ['w', 1, 'g', 0]], [33, ['l', 1, 'l', 1]], [46, ['s', 2, 'm', 0]]];
    cur.forEach(([n, d], i) => { board += A.text(L1 - 7, row(i) + cs / 2, n, { size: 7.5, weight: 800, fill: '#6d5a3a' }); if (!d) board += A.rect(L1, row(i), 2 * cs, cs, 'none', { rx: 3, dash: '3 2', sw: 1 }); else if (n !== 14) board += dom(L1, row(i), d); });
    nxt.forEach(([n, d], i) => { board += A.text(L2 - 7, row(i) + cs / 2, n, { size: 7.5, weight: 800, fill: '#6d5a3a' }) + dom(L2, row(i), d); });
    const king = (x, y, c) => A.pawn(x, y, 16, c) + A.crown(x, y - 7, 7, '#f4d23c');
    board += king(L2 + cs, row(0) + 13, C.blue) + king(L1 + cs, row(2) + 13, C.green) + king(L1 + cs, row(3) + 13, C.yellow);
    const d14 = (x, y) => A.k('d14', dom(x, y, ['w', 0, 'w', 0]));
    const mine = (x, y) => A.k('king', king(x, y, C.pink));
    const onLine = [L1 + cs, row(1) + 13], on46 = [L2 + cs, row(3) + 13], placed = cell(3, 3);
    const [ax, ay] = cell(3, 2);
    return [
      { step: 0, say: 'Your king (pink) sits on domino **14**: two wheat squares. Place it in your kingdom.', svg: board + d14(L1, row(1)) + mine(...onLine) + A.glow(L1 + cs, row(1) + 13, 30, 'g14') },
      { step: 0, say: 'One side must **match** a touching terrain: set it below your wheat. It stays inside the 5×5 square.', svg: board + d14(...placed) + mine(...onLine) },
      { step: 0, say: 'Your wheat area is now **4 squares** with **1 crown**: 4 × 1 = 4 points.', svg: board + d14(...placed) + mine(...onLine) + A.k('area', A.rect(ax - 1, ay - 1, 2 * cs + 2, 2 * cs + 2, 'none', { rx: 4, stroke: '#ffcf3f', sw: 3.5 })) + A.k('pts', A.tag(ax + cs, ay + 2 * cs + 14, '4 × 1 = 4', { fill: '#b8932a' })) },
      { step: 1, say: 'Now **pick** for next round: jump your king onto **46**, a swamp with 2 crowns.', svg: board + d14(...placed) + mine(...on46) + A.glow(L2 + cs, row(3) + 13, 30, 'g46') },
      { step: 1, say: 'Big numbers sit low in the line, so next round you place **last**. Strong tiles cost you turn order.', svg: board + d14(...placed) + mine(...on46) + A.k('order', A.arrow(L2 + 2 * cs + 8, row(0) + 4, L2 + 2 * cs + 8, row(3) + 22, { sw: 1.6, head: 5 })) },
    ];
  },

  art(A) {
    const C = A.C;
    const TER = { w: '#e8c547', f: '#2f6b34', l: '#3d8fd1', g: '#8cc63f', s: '#8f8f5c', m: '#5b4d43' };
    const cs = 28.5, gx = 14, gy = 25;
    const kingdom = [
      'ffwwl',
      'fgwwl',
      'gg.ll',
      'smmgl',
      'sm.gg',
    ];
    const crowns = { '0,0': 1, '2,1': 1, '4,1': 1, '1,3': 2, '0,3': 1 };
    const crownAt = (x, y, n) => { let s = ''; for (let i = 0; i < n; i++) s += A.crown(x - (n - 1) * 4 + i * 8, y, 8, '#f4d23c'); return s; };
    let o = A.bg('#efe6d2');
    o += A.rect(gx - 4, gy - 4, cs * 5 + 8, cs * 5 + 8, '#d9ccad', { rx: 6, sw: 1 });
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const t = kingdom[r][c], x = gx + c * cs, y = gy + r * cs;
      if (t === '.') { if (r === 2) { o += A.rect(x + 2, y + 2, cs - 4, cs - 4, '#cfc5b8', { rx: 3 }) + A.city(x + cs / 2, y + cs - 6, 18, '#e9e2d6'); } continue; }
      o += A.rect(x + 1, y + 1, cs - 2, cs - 2, TER[t], { rx: 3, sw: 1 });
      if (t === 'f') o += A.poly([[x + 10, y + 22], [x + 15, y + 9], [x + 20, y + 22]], '#1f4f26', { sw: 0 }) + A.poly([[x + 17, y + 25], [x + 22, y + 12], [x + 27, y + 25]], '#1f4f26', { sw: 0 });
      if (t === 'l') o += A.path(`M${x + 7} ${y + 20} q4 -3 8 0 q4 3 8 0`, { stroke: '#cfe6f7', sw: 1.4 });
      if (t === 'w') for (let k = 0; k < 3; k++) o += A.line(x + 9 + k * 7, y + 26, x + 9 + k * 7, y + 18, { stroke: '#b8932a', sw: 1.4 });
      if (t === 'm') o += A.poly([[x + 6, y + 26], [x + 16, y + 10], [x + 26, y + 26]], '#3c322b', { sw: 0 });
      const k = c + ',' + r;
      if (crowns[k]) o += crownAt(x + cs / 2, y + 11, crowns[k]);
    }
    // Empty square still open
    o += A.rect(gx + 2 * cs + 2, gy + 4 * cs + 2, cs - 4, cs - 4, 'none', { rx: 3, dash: '3 2', sw: 1 });
    // Domino lines
    const dom = (x, y, a, b, ca, cb, num) => {
      let s = A.rect(x + 1.5, y + 2, 52, 26, C.shadow, { sw: 0, rx: 3 });
      s += A.rect(x, y, 26, 26, TER[a], { rx: 3, sw: 1.2 }) + A.rect(x + 26, y, 26, 26, TER[b], { rx: 3, sw: 1.2 });
      if (ca) s += crownAt(x + 13, y + 9, ca);
      if (cb) s += crownAt(x + 39, y + 9, cb);
      return s;
    };
    const cur = [['w', 'w', 0, 0], ['g', 'l', 0, 1], ['w', 's', 0, 0], ['l', 'm', 0, 2]];
    const nxt = [['f', 'f', 0, 0], ['w', 'g', 1, 0], ['s', 's', 0, 1], ['m', 'w', 2, 0]];
    const kingC = [C.pink, C.blue, C.yellow, C.green];
    cur.forEach(([a, b, ca, cb], i) => { o += i ? dom(190, 30 + i * 38, a, b, ca, cb) : A.rect(190, 30, 52, 26, 'none', { rx: 3, dash: '3 2', sw: 1 }); });
    nxt.forEach(([a, b, ca, cb], i) => { o += dom(258, 30 + i * 38, a, b, ca, cb); });
    const king = (x, y, c) => A.pawn(x, y, 18, c) + A.crown(x, y - 8, 8, '#f4d23c');
    o += king(216, 84, kingC[1]) + king(216, 122, kingC[2]) + king(216, 160, kingC[3]);
    o += king(284, 122, kingC[0]);
    o += A.curve(226, 40, 258, 18, 274, 110, { sw: 1.4, dash: '3 2', head: 5 });
    o += A.note(gx + 2.5 * cs, gy + 2.5 * cs, 120, 11, 'Your castle');
    o += A.note(gx + 1.3 * cs, gy + 3.7 * cs, 60, 189, 'Mine: 3 squares × 2 = 6');
    o += A.note(206, 168, 252, 189, 'Place in king order');
    o += A.note(296, 136, 268, 11, 'Pick for next round');
    return o;
  },
});
