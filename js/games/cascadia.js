defineGame({
  id: 'cascadia',
  name: 'Cascadia',
  year: 2021,
  designer: 'Randy Flynn',
  family: 'tile',
  players: [1, 4], best: '2–3',
  time: [30, 45],
  age: 10,
  mechanics: ['tile-placement', 'drafting', 'pattern-building', 'spatial', 'set-collection'],
  profile: { complexity: 2, luck: 2, interaction: 2, conflict: 1, talk: 1, planning: 3 },

  // Wildlife tokens, habitats and the nature token: used inline and drawn the same way in art + walk.
  icons: (() => {
    const tok = (col, ch, name) => ({ name, draw: A => A.circle(12, 12, 10.5, '#f5ecd6', { sw: 1.2 }) + A.circle(12, 12, 8.4, col, { sw: 0 }) + A.text(12, 12.7, ch, { size: 11.5, weight: 800, fill: '#fff' }) });
    const hab = (col, name) => ({ name, draw: A => A.hex(12, 12, 11, col, { sw: 1.3 }) });
    return {
      bear: tok('#6b4a2f', 'B', 'bear'), elk: tok('#c08a4e', 'E', 'elk'), salmon: tok('#d65a5a', 'S', 'salmon'), hawk: tok('#6fb1d9', 'H', 'hawk'), fox: tok('#e07b2e', 'F', 'fox'),
      mountain: hab('#9aa1a8', 'mountain'), forest: hab('#2f6b34', 'forest'), prairie: hab('#d9c45a', 'prairie'), wetland: hab('#7fc0a0', 'wetland'), river: hab('#4a8fcb', 'river'),
      nature: { name: 'nature token', draw: A => A.path('M12 2 C19 6 20 15 12 22 C4 15 5 6 12 2Z', { fill: '#8a5a33', sw: 1.2 }) + A.path('M8.2 9 l3.8 2.5 l3.8 -2.5 M7.6 13.5 l4.4 2.8 l4.4 -2.8 M9.5 18 l2.5 1.5 l2.5 -1.5', { stroke: '#e3c08f', sw: 1.1 }) },
    };
  })(),

  pitch: 'Draft a habitat tile and wildlife token each turn; score animal patterns and your largest habitat areas.',

  goal: { big: 'Most points', text: 'Score the most points from **wildlife patterns** (each animal has one scoring card saying which pattern scores) and from your **largest area** of each habitat.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Pick', text: 'Take one of the 4 **pairs** on display (a habitat tile and the wildlife token beside it). Or spend 1 {nature} to take any one display tile together with any one display token.' },
      { verb: 'Place tile', text: 'Add the habitat tile so it touches at least one of your tiles; you may turn it any way.' },
      { verb: 'Place animal', text: 'Put the wildlife token on any one of your tiles that shows that animal and has **no token** yet, or return it to the bag. If that tile is a keystone tile, take 1 {nature}.' },
      { verb: 'Refill', text: 'Fill the empty display slot with the top tile of the stack and a token drawn from the bag.' },
    ],
  },

  tension: 'The tile you want usually comes with the wrong animal, so each pick trades habitat growth against wildlife patterns.',

  structure: [
    { label: 'Setup', text: 'Each player takes a 3-tile starter habitat. Stack 20 tiles per player plus 3 face down. Display 4 pairs.' },
    { label: 'Turns', repeat: '20 each', text: 'Pick a pair, place the tile, place or return the token, refill the display.' },
    { label: 'Final scoring', text: 'When the tile stack runs out, score the wildlife cards, each largest habitat area and its bonus, and each unspent {=nature}.' },
  ],

  points: [
    ['{=bear} Bears (A)', 'count your groups of exactly 2 bears touching no other bear: 1 / 2 / 3 / 4 such pairs = 4 / 11 / 19 / 27'],
    ['{=elk} Elk (A)', 'each straight line of touching elk scores by its length: 1 / 2 / 3 / 4 = 2 / 5 / 9 / 13'],
    ['{=salmon} Salmon (A)', 'each run (a group of touching salmon in which no salmon touches more than 2 others) scores by its length 1 / 2 / 3 / 4 / 5 / 6 / 7+ = 2 / 5 / 8 / 12 / 16 / 20 / 25'],
    ['{=hawk} Hawks (A)', 'count your hawks that touch no other hawk: 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8+ = 2 / 5 / 8 / 11 / 14 / 18 / 22 / 26'],
    ['{=fox} Foxes (A)', 'each fox scores 1 per different animal type on the tiles around it (other foxes count as a type)'],
    ['Habitats', 'for each of the 5 habitats, 1 per tile in your largest area of it. Bonus per habitat: +3 for the largest such area at the table, +1 for the second largest. If 2 players tie for largest: +2 each; if 3 or more tie: +1 each; then no second-place bonus. With 2 players: +2 for the largest only, +1 each if tied'],
    ['{=nature} Nature tokens', '1 per unspent token'],
  ],

  end: { trigger: 'the tile stack runs out', detail: 'By then each player has had exactly 20 turns. If tied, the player with more unspent nature tokens wins.' },
  scoring: [
    { label: 'Wildlife cards', share: 6 },
    { label: 'Habitat areas', share: 3 },
    { label: 'Habitat bonuses', share: 1 },
    { label: '{=nature} Nature tokens', share: 0.5 },
  ],

  ref: {
    title: 'Tokens, tiles and the display',
    rows: [
      ['Wildlife', '{bear} {elk} {salmon} {hawk} {fox}'],
      ['Habitats', '{mountain} {forest} {prairie} {wetland} {river}'],
      ['{=nature} Spend: unpair', 'take any one display tile with any one display token'],
      ['{=nature} Spend: wipe', 'return any number of display tokens to the bag and draw replacements'],
    ],
  },

  example: 'The display offers a forest/river tile with a {=bear}. You place the tile beside your forest, growing it to 6 tiles, then set the bear next to your lone bear: a pair for the Bear card.',

  setup: [
    'Each player takes a random 3-tile starter habitat.',
    'Choose one scoring card per animal (all “A” cards for a first game). Shuffle the habitat tiles and stack 20 per player plus 3 face down.',
    'Turn up 4 tiles from the stack and put a token drawn from the bag beside each: this is the display.',
    'Return unused habitat tiles to the box. Pick a random first player; turns pass clockwise.',
  ],

  terms: [
    ['Pair', 'A display tile with the token beside it.'],
    ['{=nature} Nature token', 'Earned by placing a token on a keystone tile. Spend it (table) or keep it for 1 point.'],
    ['Keystone tile', 'Single-habitat tile showing one animal.'],
    ['Overpopulation', '3 or 4 display tokens of the same animal (see Rules people miss).'],
    ['Area', 'Your tiles of one habitat joined by edges showing that habitat.'],
  ],

  gotchas: [
    'Each tile holds **one** token, and only an animal pictured on that tile. Placed tokens never move.',
    'The token may go on any of your tiles, not only the one you just placed.',
    'Tile edges don’t have to match. Touching edges of different habitats just don’t join areas.',
    'If all 4 display tokens show the same animal, return them to the bag and draw 4 new ones at once. If exactly **3** match, at the start of your turn you may return those 3 and draw 3 new ones for free.',
    'You may spend several nature tokens in one turn.',
  ],

  tips: [
    'Focus on 2–3 animals; you can’t score all five well.',
    'Grow one or two habitats big rather than all five a little.',
    'Spend nature tokens to fix a big play; each unspent one is still 1 point.',
  ],

  walk(A) {
    const C = A.C, s = 26, ox = 110, oy = 80;
    const H = { m: '#9aa1a8', f: '#2f6b34', p: '#d9c45a', w: '#7fc0a0', r: '#4a8fcb' };
    const W = { bear: ['#6b4a2f', 'B'], elk: ['#c08a4e', 'E'], salmon: ['#d65a5a', 'S'], hawk: ['#6fb1d9', 'H'], fox: ['#e07b2e', 'F'] };
    const verts = (x, y, r) => { const p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 30); p.push([+(x + r * Math.cos(a)).toFixed(1), +(y + r * Math.sin(a)).toFixed(1)]); } return p; };
    const hexTile = (x, y, r, a, b) => {
      const v = verts(x, y, r);
      if (!b) return A.poly(v, H[a], { sw: 1.2 });
      return A.poly([v[0], v[1], v[2], v[3]], H[a], { sw: 0 }) + A.poly([v[3], v[4], v[5], v[0]], H[b], { sw: 0 }) + A.poly(v, 'none', { sw: 1.2 });
    };
    // Wildlife tokens are the inline token icons (radius r).
    const token = (x, y, an, r = 9) => A.circle(x + 1, y + 1.5, r, C.shadow, { sw: 0 }) + A.use(this.icons[an].draw(A), x - r * 12 / 10.5, y - r * 12 / 10.5, r * 24 / 10.5);
    const hx = (q, r) => A.hexAt(q, r, s, ox, oy);
    const area = [[0, 0, 'f', null, 'bear'], [-1, 0, 'f', null, null], [-1, 1, 'm', 'f', 'hawk'], [0, 1, 'w', 'f', null], [1, -1, 'f', null, null],
      [0, -1, 'm', null, null], [1, 1, 'r', null, 'salmon'], [2, -1, 'p', null, 'elk'], [-2, 1, 'w', null, null], [-1, 2, 'r', 'w', 'salmon']];
    let board = A.bg('#e7eadb');
    for (const [q, r, a, b, an] of area) { const [x, y] = hx(q, r); board += hexTile(x, y, s, a, b); if (an) board += token(x, y, an); }
    const [nx, ny] = hx(1, 0);
    board += A.poly(verts(nx, ny, s - 1.5), 'none', { dash: '3 2', sw: 1.4 });
    board += A.rect(236, 6, 80, 188, '#f6f1e3', { rx: 8 }) + A.text(276, 18, 'Display', { size: 8, fill: '#6d5a3a' });
    const row = (i) => 52 + i * 40;
    const disp = [['p', null, 'fox'], ['w', 'm', 'hawk'], ['f', 'p', 'salmon']];
    disp.forEach(([a, b, an], i) => { board += hexTile(258, row(i + 1), 15, a, b) + token(294, row(i + 1), an); });
    const newTile = (x, y, r) => A.k('tile', hexTile(x, y, r, 'r', 'f'));
    const bear = (x, y) => A.k('bear', token(x, y, 'bear'));
    const inDisp = newTile(258, row(0), 15), bearDisp = bear(294, row(0));
    const [bx, by] = hx(0, 0);
    // Outline of the forest area once the new tile joins it.
    const forest = [[0, 0], [-1, 0], [-1, 1], [0, 1], [1, -1], [1, 0]].map(([q, r]) => A.poly(verts(...hx(q, r), s - 3), 'none', { stroke: '#ffcf3f', sw: 2.5 })).join('');
    return [
      { step: 0, say: 'Pick one of the 4 pairs: the **forest/river tile** with a {=bear}.', svg: board + inDisp + bearDisp + A.glow(276, row(0), 30, 'g-pick') },
      { step: 1, say: 'Place the tile touching your area, turned so its **forest** side joins your forest.', svg: board + newTile(nx, ny, s) + bearDisp },
      { step: 1, say: 'Your forest is now one area of **6 tiles**. Largest areas score at game end.', svg: board + newTile(nx, ny, s) + bearDisp + A.k('forest', forest) + A.k('lab', A.tag(56, 186, 'Forest: 6 tiles', { fill: '#2f6b34' })) },
      { step: 2, say: 'Put the bear on the new tile next to your lone bear: **a pair** for the Bear card.', svg: board + newTile(nx, ny, s) + bear(nx, ny) + A.glow((bx + nx) / 2, by, 38, 'g-bears') },
      { step: 3, say: 'Refill the empty slot with a new tile and a token from the bag. Next player.', svg: board + newTile(nx, ny, s) + bear(nx, ny) + A.k('t2', hexTile(258, row(0), 15, 'm', 'w')) + A.k('k2', token(294, row(0), 'elk')) },
    ];
  },

  art(A) {
    const C = A.C, s = 21, ox = 112, oy = 98;
    const H = { m: '#9aa1a8', f: '#2f6b34', p: '#d9c45a', w: '#7fc0a0', r: '#4a8fcb' };
    const W = { bear: ['#6b4a2f', 'B'], elk: ['#c08a4e', 'E'], salmon: ['#d65a5a', 'S'], hawk: ['#6fb1d9', 'H'], fox: ['#e07b2e', 'F'] };
    const verts = (x, y, r) => { const p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 30); p.push([+(x + r * Math.cos(a)).toFixed(1), +(y + r * Math.sin(a)).toFixed(1)]); } return p; };
    const hexTile = (x, y, r, a, b) => {
      const v = verts(x, y, r);
      if (!b) return A.poly(v, H[a], { sw: 1.2 });
      return A.poly([v[0], v[1], v[2], v[3]], H[a], { sw: 0 }) + A.poly([v[3], v[4], v[5], v[0]], H[b], { sw: 0 }) + A.poly(v, 'none', { sw: 1.2 });
    };
    const token = (x, y, an, r = 7.5) => A.circle(x + 1, y + 1.5, r, C.shadow, { sw: 0 }) + A.use(this.icons[an].draw(A), x - r * 12 / 10.5, y - r * 12 / 10.5, r * 24 / 10.5);
    const area = [
      [0, 0, 'f', null, 'bear'], [1, 0, 'f', 'r', 'bear'], [-1, 1, 'f', 'm', null], [0, 1, 'w', 'r', 'salmon'], [1, 1, 'r', null, 'salmon'],
      [2, 0, 'p', 'f', 'fox'], [2, -1, 'p', null, 'elk'], [1, -1, 'm', 'p', 'elk'], [-1, 0, 'f', null, null], [0, -1, 'm', null, 'hawk'],
      [-2, 1, 'w', 'p', null], [-1, 2, 'm', 'w', 'hawk'], [0, 2, 'r', 'w', null], [3, -1, 'p', 'f', 'elk'],
    ];
    let o = A.bg('#e7eadb');
    for (const [q, r, a, b, an] of area) {
      const [x, y] = A.hexAt(q, r, s, ox, oy);
      o += hexTile(x, y, s, a, b);
      if (an) o += token(x, y, an);
    }
    // Display of 4 pairs on the right
    o += A.rect(246, 8, 68, 166, '#f6f1e3', { rx: 8 });
    const disp = [['r', 'f', 'bear'], ['p', null, 'fox'], ['w', 'm', 'hawk'], ['f', 'p', 'salmon']];
    disp.forEach(([a, b, an], i) => {
      const y = 30 + i * 40;
      o += hexTile(268, y, 15, a, b) + token(298, y, an, 8);
    });
    // Nature token (pinecone)
    const [bx, by] = A.hexAt(0, 0, s, ox, oy), [hx, hy] = A.hexAt(-1, 1, s, ox, oy), [ex, ey] = A.hexAt(2, -1, s, ox, oy);
    const [tx2, ty2] = A.hexAt(-1, 2, s, ox, oy);
    o += A.note(tx2 - 3, ty2 + 4, 70, 189, 'Wildlife token');
    o += A.note(hx - 8, hy - 6, 54, 30, 'Habitat tile');
    o += A.note(ex - 10, ey - 8, 160, 14, 'Elk in a line');
    o += A.note(283, 166, 270, 189, 'Pick one pair');
    return o;
  },
});
