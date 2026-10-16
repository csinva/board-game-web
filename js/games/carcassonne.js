defineGame({
  id: 'carcassonne',
  name: 'Carcassonne',
  year: 2000,
  designer: 'Klaus-Jürgen Wrede',
  family: 'tile',
  players: [2, 5], best: '2',
  time: [30, 45],
  age: 7,
  mechanics: ['tile-placement', 'area-control', 'spatial'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 3, talk: 2, planning: 2 },

  // Meeples, tile features and the pennant: used inline and drawn the same way in art + walk.
  icons: (() => {
    const tile = (A, inner) => A.rect(2, 2, 20, 20, '#8dbb4f', { rx: 1.5, sw: 1.2, stroke: '#5f7f34' }) + inner;
    const shield = (A) => A.path('M3 2 h18 v10 q0 8 -9 10.5 q-9 -2.5 -9 -10.5z', { fill: '#2f6db5', stroke: '#fff', sw: 2 }) + A.path('M3 2 h18 v10 q0 8 -9 10.5 q-9 -2.5 -9 -10.5z', { fill: 'none', stroke: '#2a2420', sw: 0.6 });
    return {
      meeple: { name: 'meeple', draw: A => A.meeple(12, 12, 22, '#c8423b') },
      farmer: { name: 'farmer', draw: A => A.group(A.meeple(12, 12, 20, '#c8423b'), 'rotate(-90 12 12)') },
      city: { name: 'city', draw: A => tile(A, A.path('M2 2 L22 2 L22 15 Q12 7 2 15Z', { fill: '#d0a867', stroke: '#7a5a33', sw: 1.4 }) + A.rect(7, 5, 4, 3.5, '#b5452f', { rx: 0.5, sw: 0.6 }) + A.rect(13.5, 6, 4, 3.5, '#b5452f', { rx: 0.5, sw: 0.6 })) },
      road: { name: 'road', draw: A => tile(A, A.path('M2 12 H22', { stroke: '#8f8466', sw: 6.5 }) + A.path('M2.5 12 H21.5', { stroke: '#f3ecd6', sw: 4 })) },
      monastery: { name: 'monastery', draw: A => tile(A, A.rect(7, 11, 10, 8, '#e6d8b8', { rx: 1, sw: 1 }) + A.poly([[5.5, 11], [12, 5], [18.5, 11]], '#b5452f', { sw: 1 })) },
      field: { name: 'field', draw: A => tile(A, [[7, 9], [15, 7], [10, 16], [17, 15]].map(([x, y]) => A.path(`M${x - 2} ${y + 2} l2 -3 l2 3`, { stroke: '#4f7a2a', sw: 1.2 })).join('')) },
      pennant: { name: 'pennant', draw: shield },
    };
  })(),

  pitch: 'Place a tile each turn and put meeples on roads, cities, monasteries and fields to score; most points wins.',

  goal: { big: 'Most points', text: 'Most points from **roads, cities, monasteries and fields** claimed with your meeples.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Place', text: 'Draw a tile and place it next to at least one tile so **every** touching edge matches: road to road, city to city, field to field. If it fits nowhere, discard it and draw again.' },
      { verb: 'Claim', text: 'You may put one {meeple} on a {=road} road, {=city} city, {=monastery} monastery or {=field} field **on that tile**, if that whole feature has no meeple yet.' },
      { verb: 'Score', text: 'Every road, city or monastery the tile **completed** scores now, for whoever holds it; those meeples return.' },
    ],
  },

  tension: 'You have only 7 meeples, and each one in a big project is stuck until it finishes.',

  structure: [
    { label: 'Setup', text: 'Start tile face up; 7 {meeple}s each.' },
    { label: 'Turns', repeat: 'until tiles run out', text: 'Place a tile, optionally a meeple, then score anything the tile completed.' },
    { label: 'Final scoring', text: 'After the last tile: unfinished roads, cities and monasteries score; then fields.' },
  ],

  points: [
    ['{=road} Road', '1 per tile, finished or not'],
    ['{=city} City', 'finished: 2 per tile + 2 per {pennant} (a 2-tile city = 4); unfinished at end: 1 per tile + 1 per {pennant}'],
    ['{=monastery} Monastery', 'finished (all 8 neighbours placed): 9; unfinished at end: 1 + 1 per neighbouring tile'],
    ['{=field} Field', 'end only: 3 per **finished** city it touches; unfinished cities give nothing'],
    ['Majority', 'most meeples in a feature takes all its points; tied players all score in full'],
  ],

  end: { trigger: 'the last tile is placed', detail: 'Unfinished roads, cities and monasteries score at a lower rate, then fields score.' },
  scoring: [
    { label: '{=city} Cities', share: 4 },
    { label: '{=road} Roads', share: 2 },
    { label: '{=monastery} Monasteries', share: 2 },
    { label: '{=field} Fields', share: 2 },
  ],

  ref: {
    title: 'Meeple roles',
    rows: [
      ['{=city} City', 'knight'],
      ['{=road} Road', 'thief'],
      ['{=monastery} Monastery', 'monk (only on the monastery tile itself)'],
      ['{=field} Field', '{farmer}: lies down, stays until game end'],
    ],
  },

  example: 'You draw a city edge and **close** a 3-tile city with one {=pennant}. Nobody holds it, so you place a knight {=meeple}: 3×2 + 2 = **8 points** now, and the knight returns.',

  setup: [
    'Place the start tile face up; shuffle the other 71 face down in stacks.',
    'Each player takes 7 {meeple}s of one colour; an 8th goes on 0 of the score track (lay it down after passing 50).',
    'Youngest player goes first.',
  ],

  terms: [
    ['{=meeple} Meeple', 'Your follower. Its role depends on the feature it stands on.'],
    ['Feature', 'One whole road, city, field or monastery, across all its tiles.'],
    ['{=pennant} Pennant', 'Shield on a city tile; adds points.'],
    ['Majority', 'Most meeples in a feature takes all its points.'],
  ],

  gotchas: [
    'Place a meeple only on the tile you **just** placed, and not on a feature that already has a meeple anywhere along it.',
    'A separately claimed piece can later **join** an occupied feature. Tied for most meeples: **all** tied players score in full.',
    'You can place a meeple on a feature your tile completes: it scores at once and the meeple comes straight back.',
    'Farmers {=farmer} never return: they lie in their field until final scoring.',
    'Roads, cities and the edge of the play area split fields. One city can score for several fields.',
  ],

  tips: [
    'Keep 2 meeples free to grab a great tile.',
    'Small cities and short roads finish fast and return your meeples.',
    'A farmer in a big field beside several cities can win, but place it mid-game, not turn one.',
  ],

  walk(A) {
    const C = A.C, s = 44, fieldC = '#8dbb4f', cityC = '#d0a867', wall = '#7a5a33', roadC = '#f3ecd6', I = this.icons;
    // Your red meeples are the {meeple} icon, centred at (x, y) and `size` px tall.
    const mp = (x, y, size) => A.use(I.meeple.draw(A), x - size * 12 / 22, y - size * 12 / 22, size * 24 / 22);
    const tile = (x, y, t) => {
      let o = A.rect(x, y, s, s, fieldC, { rx: 1, sw: 0.8, stroke: '#5f7f34' });
      const h = s / 2, P = (d) => A.path(d, { fill: cityC, stroke: wall, sw: 1.4 });
      if (t.city === 'E') o += P(`M${x + s} ${y} L${x + s} ${y + s} Q${x + s * 0.45} ${y + h} ${x + s} ${y}Z`) + A.rect(x + s - 9, y + h - 2, 5, 4, '#b5452f', { rx: 0.5, sw: 0.6 });
      if (t.city === 'W') o += P(`M${x} ${y} L${x} ${y + s} Q${x + s * 0.55} ${y + h} ${x} ${y}Z`) + A.rect(x + 4, y + h - 2, 5, 4, '#b5452f', { rx: 0.5, sw: 0.6 });
      if (t.city === 'WE') o += P(`M${x} ${y} Q${x + h} ${y + s * 0.3} ${x + s} ${y} L${x + s} ${y + s} Q${x + h} ${y + s * 0.7} ${x} ${y + s}Z`) + A.rect(x + h + 4, y + h - 2, 5, 4, '#b5452f', { rx: 0.5, sw: 0.6 });
      if (t.pennant) o += A.use(I.pennant.draw(A), x + h - 10.7, y + h - 7.1, 13.3);
      const mid = { N: [x + h, y], S: [x + h, y + s], E: [x + s, y + h], W: [x, y + h] };
      if (t.road) { const [a, b] = t.road, d = `M${mid[a][0]} ${mid[a][1]} Q${x + h} ${y + h} ${mid[b][0]} ${mid[b][1]}`; o += A.path(d, { stroke: '#8f8466', sw: 7 }) + A.path(d, { stroke: roadC, sw: 4.5 }); }
      if (t.mon) o += A.rect(x + h - 8, y + h - 5, 16, 12, '#e6d8b8', { rx: 1, sw: 1 }) + A.poly([[x + h - 10, y + h - 5], [x + h, y + h - 13], [x + h + 10, y + h - 5]], '#b5452f', { sw: 1 });
      return o;
    };
    const at = (i, j) => [18 + i * s, 16 + j * s];
    let board = A.bg('#e9e1cc');
    const map = [[0, 0, {}], [1, 0, { mon: true }], [2, 0, {}], [0, 1, { city: 'E' }], [1, 1, { city: 'WE', pennant: true }], [0, 2, { road: ['W', 'E'] }], [1, 2, { road: ['W', 'E'] }], [2, 2, { road: ['W', 'S'] }]];
    for (const [i, j, t] of map) board += tile(...at(i, j), t);
    const [sx, sy] = at(2, 1);
    board += A.rect(sx + 1, sy + 1, s - 2, s - 2, 'none', { rx: 2, dash: '3 2', sw: 1.4 });
    board += A.meeple(at(0, 2)[0] + 22, at(0, 2)[1] + 19, 15, C.blue);
    // Tile stack, your meeple supply, score track.
    board += A.text(268, 14, 'Tile stack', { size: 8, fill: '#6d5a3a' });
    for (let i = 0; i < 3; i++) board += A.rect(250 - i * 2, 22 + i * 2, 36, 36, '#9c8661', { rx: 2, sw: 1 });
    board += A.tag(266, 126, 'Your meeples', { fill: C.red });
    for (let i = 1; i < 4; i++) board += mp(232 + i * 18, 152, 15);
    for (let i = 0; i <= 10; i++) board += A.rect(10 + i * 18, 174, 16, 16, i % 5 ? '#efe4c6' : '#e2cf9a', { rx: 2, sw: 0.8 }) + A.text(18 + i * 18, 182, i, { size: 6, fill: '#6d5a3a' });
    const score = (n) => A.k('score', A.circle(18 + n * 18, 182, 6, C.red, { sw: 1.2, opacity: 0.85 }));
    const newT = (x, y) => A.k('new', tile(x, y, { city: 'W' }));
    const knight = (x, y) => A.k('knight', mp(x, y, 15));
    const home = [232, 152], onCity = [sx + 13, sy + 20];
    const cityMid = [at(1, 1)[0] + 22, at(1, 1)[1] + 22];
    return [
      { step: 0, say: 'Draw a tile. This one has a {=city} **city edge**.', svg: board + newT(246, 66) + knight(...home) + score(0) },
      { step: 0, say: 'Place it so **every** touching edge matches. Its city edge meets the open end of a 2-tile city and **closes** it.', svg: board + newT(sx, sy) + knight(...home) + score(0) + A.glow(sx + 8, sy + 22, 17, 'g-edge') },
      { step: 1, say: 'The city has no meeple, so place a **knight** {=meeple} in it, on the tile you just played.', svg: board + newT(sx, sy) + knight(...onCity) + score(0) },
      { step: 2, say: 'City finished: 3 tiles × 2 + 2 for the {=pennant} = **8 points**.', svg: board + newT(sx, sy) + knight(...onCity) + score(8) + A.glow(cityMid[0], cityMid[1], 54, 'g-city') },
      { step: 2, say: 'A finished feature returns its meeples: the knight goes back to your supply.', svg: board + newT(sx, sy) + knight(...home) + score(8) },
    ];
  },

  art(A) {
    const C = A.C, s = 38, ox = 8, oy = 24, I = this.icons;
    const fieldC = '#8dbb4f', cityC = '#d0a867', wall = '#7a5a33', roadC = '#f3ecd6';
    const at = (i, j) => [ox + i * s, oy + j * s];
    const draw = (i, j, t, dx = 0, dy = 0) => {
      let [x, y] = at(i, j); x += dx; y += dy;
      let o = A.rect(x, y, s, s, fieldC, { rx: 1, sw: 0.8, stroke: '#5f7f34' });
      const c = t.city || '', h = s / 2;
      const P = (d) => A.path(d, { fill: cityC, stroke: wall, sw: 1.4 });
      if (c === 'N') o += P(`M${x} ${y} L${x + s} ${y} Q${x + h} ${y + s * 0.5} ${x} ${y}Z`);
      if (c === 'S') o += P(`M${x} ${y + s} L${x + s} ${y + s} Q${x + h} ${y + s * 0.5} ${x} ${y + s}Z`);
      if (c === 'E') o += P(`M${x + s} ${y} L${x + s} ${y + s} Q${x + s * 0.5} ${y + h} ${x + s} ${y}Z`);
      if (c === 'NS') o += P(`M${x} ${y} L${x + s} ${y} Q${x + s * 0.72} ${y + h} ${x + s} ${y + s} L${x} ${y + s} Q${x + s * 0.28} ${y + h} ${x} ${y}Z`);
      if (c === 'NEW') o += P(`M${x} ${y} L${x + s} ${y} L${x + s} ${y + s * 0.8} Q${x + h} ${y + s * 0.4} ${x} ${y + s * 0.8}Z`);
      if (c === 'W') o += P(`M${x} ${y} L${x} ${y + s} Q${x + s * 0.5} ${y + h} ${x} ${y}Z`);
      if (c) for (const [a, b] of t.roofs || []) o += A.rect(x + a * s - 2.5, y + b * s - 2, 5, 4, '#b5452f', { rx: 0.5, sw: 0.6 });
      if (t.pennant) o += A.use(I.pennant.draw(A), x + 2.3, y + 2.9, 13.3);
      const mid = { N: [x + h, y], S: [x + h, y + s], E: [x + s, y + h], W: [x, y + h] };
      const rd = t.road || [];
      const roadPath = rd.length === 2 ? `M${mid[rd[0]][0]} ${mid[rd[0]][1]} Q${x + h} ${y + h} ${mid[rd[1]][0]} ${mid[rd[1]][1]}` : rd.map(e => `M${mid[e][0]} ${mid[e][1]} L${x + h} ${y + h}`).join(' ');
      if (rd.length) o += A.path(roadPath, { stroke: '#8f8466', sw: 7 }) + A.path(roadPath, { stroke: roadC, sw: 4.5 });
      if (rd.length === 3) o += A.rect(x + h - 5, y + h - 5, 10, 9, '#c9b48a', { rx: 1, sw: 1 });
      if (t.mon) o += A.rect(x + h - 8, y + h - 5, 16, 12, '#e6d8b8', { rx: 1, sw: 1 }) + A.poly([[x + h - 10, y + h - 5], [x + h, y + h - 13], [x + h + 10, y + h - 5]], '#b5452f', { sw: 1 });
      return o;
    };
    const map = [
      [1, 0, { city: 'NS', roofs: [[0.5, 0.3], [0.45, 0.7]] }], [2, 0, { mon: true, road: ['S'] }], [3, 0, {}], [4, 0, {}], [5, 0, { city: 'S', roofs: [[0.5, 0.86]] }],
      [0, 1, { city: 'E', roofs: [[0.85, 0.5]] }], [1, 1, { city: 'NEW', pennant: true, roofs: [[0.8, 0.2], [0.78, 0.6]] }], [2, 1, { city: 'W', road: ['N', 'S'], roofs: [[0.12, 0.5]] }],
      [3, 1, {}], [4, 1, { mon: true }], [5, 1, { city: 'N', roofs: [[0.5, 0.14]] }],
      [0, 2, {}], [1, 2, {}], [2, 2, { road: ['N', 'E'] }], [3, 2, { road: ['W', 'E'] }], [4, 2, { road: ['W', 'E', 'S'] }], [5, 2, { road: ['W', 'E'] }],
      [1, 3, {}], [2, 3, {}], [3, 3, { city: 'S', roofs: [[0.5, 0.86]] }], [4, 3, { road: ['N', 'S'] }],
    ];
    let o = A.bg('#e9e1cc');
    for (const [i, j, t] of map) o += draw(i, j, t);
    // Next tile: dashed slot and the drawn tile hovering above it
    const [sx, sy] = at(6, 2);
    o += A.rect(sx + 1, sy + 1, s - 2, s - 2, 'none', { rx: 2, dash: '3 2', sw: 1.4 });
    o += A.rect(sx + 12, sy - 40, s, s, C.shadow, { sw: 0, rx: 2 });
    o += draw(6, 2, { road: ['W', 'S'] }, 8, -44);
    o += A.arrow(sx + 30, sy - 4, sx + 22, sy + 12, { sw: 1.6, head: 5 });
    // Meeples
    const [kx, ky] = at(1, 1), [tx, ty] = at(3, 2), [mx, my] = at(4, 1), [fx, fy] = at(1, 2);
    o += A.use(I.meeple.draw(A), kx + 19 - 15 * 12 / 22, ky + 16 - 15 * 12 / 22, 15 * 24 / 22);
    o += A.meeple(tx + 19, ty + 16, 14, C.blue);
    o += A.meeple(mx + 30, my + 27, 13, C.yellow);
    o += A.group(A.meeple(0, 0, 14, '#2f8a3e'), `translate(${fx + 19} ${fy + 21}) rotate(-90)`);
    o += A.note(kx + 19, ky + 12, 62, 11, 'Knight in a city');
    o += A.note(mx + 30, my + 22, 180, 11, 'Monk in a monastery');
    o += A.note(fx + 12, fy + 21, 54, 189, 'Farmer in a field');
    o += A.note(tx + 22, ty + 18, 154, 189, 'Thief on a road');
    o += A.note(sx + 19, sy + 24, 262, 189, 'New tile must match');
    return o;
  },
});
