defineGame({
  id: 'carcassonne',
  name: 'Carcassonne',
  year: 2000,
  designer: 'Klaus-Jürgen Wrede',
  family: 'tile',
  players: [2, 5], best: '2–3',
  time: [30, 45],
  age: 7,
  mechanics: ['tile-placement', 'area-control', 'spatial'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 3, talk: 2, planning: 2 },

  pitch: 'Draw a tile, add it to a growing medieval map, and drop a meeple on a road, city or field to score it.',
  theme: 'You are a lord building the countryside around a French walled city, one tile at a time.',

  goal: { big: 'Most points', text: 'Score the most points by claiming **roads, cities, monasteries and fields** with your meeples as the map grows.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Place', text: 'Draw a tile and add it to the map so **every** touching edge matches: road to road, city to city, field to field.' },
      { verb: 'Claim', text: 'You may put one meeple on a road, city, monastery or field **on that tile**, if no one already has a meeple in that whole feature.' },
      { verb: 'Score', text: 'Any road, city or monastery the tile **completed** scores now, and its meeples come back.' },
    ],
  },

  tension: 'Meeples are your only way to score, but each one you commit to a big project is stuck until it is finished, and you only have seven.',

  flow: [
    { label: 'Place', items: ['One tile per turn', 'Edges must match', 'Grow or close features'] },
    { label: 'Claim', items: ['Knight in a city', 'Thief on a road', 'Monk in a monastery', 'Farmer in a field'] },
    { label: 'Score', items: ['When a feature is finished', 'Meeple returns', 'Fields at the very end'] },
  ],

  end: { trigger: 'the last tile is placed', detail: 'Then score everything unfinished at a lower rate, and score the fields.' },
  scoring: [
    { label: 'Cities', share: 4 },
    { label: 'Roads', share: 2 },
    { label: 'Monasteries', share: 2 },
    { label: 'Fields', share: 2 },
  ],

  ref: {
    title: 'Scoring',
    rows: [
      ['Road', '1 per tile (finished or not)'],
      ['Finished city', '2 per tile + 2 per pennant'],
      ['Unfinished city (end)', '1 per tile + 1 per pennant'],
      ['Monastery', '1 + 1 per surrounding tile (9 max)'],
      ['Field (end only)', '3 per finished city it touches'],
    ],
  },

  example: 'You draw a city edge and use it to **close** a 3-tile city with one pennant. Nobody is in it, so you place a knight there: it scores 3×2 + 2 = **8 points** at once and the knight comes straight back to you.',

  setup: [
    'Place the start tile face up; shuffle the other 71 tiles face down in stacks.',
    'Each player takes 7 meeples of one colour and puts an 8th on 0 of the score track.',
    'The youngest player goes first.',
  ],

  terms: [
    ['Meeple', 'Your wooden follower; its role depends on where you put it.'],
    ['Feature', 'One whole road, city, field or monastery, however many tiles it spans.'],
    ['Pennant', 'Shield on a city tile; worth extra points.'],
    ['Majority', 'Whoever has the most meeples in a feature takes all its points.'],
  ],

  gotchas: [
    'You can’t place a meeple into a feature someone already holds, but you can claim a separate piece that later **joins** it. Ties for most meeples: **all** tied players score in full.',
    '**Farmers** never come back: they lie in their field until the final scoring.',
    'You may only place a meeple on the tile you **just** placed, never on older tiles.',
  ],

  tips: [
    'Don’t place all seven meeples early; keep a couple free to grab a great tile.',
    'Small cities and short roads finish fast and recycle your meeples.',
    'A farmer in a big field next to several cities can win the game, but place it mid-game, not first turn.',
  ],

  art(A) {
    const C = A.C, s = 38, ox = 8, oy = 24;
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
      if (t.pennant) o += A.path(`M${x + 4} ${y + 4} h10 v6 q0 5 -5 7 q-5 -2 -5 -7z`, { fill: C.blue, stroke: C.white, sw: 1.2 });
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
    o += A.meeple(kx + 19, ky + 16, 15, C.red);
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
