defineGame({
  id: 'cascadia',
  name: 'Cascadia',
  year: 2021,
  designer: 'Randy Flynn',
  family: 'tile',
  players: [1, 4], best: '2–4',
  time: [30, 45],
  age: 10,
  mechanics: ['tile-placement', 'drafting', 'pattern-building', 'spatial', 'set-collection'],
  profile: { complexity: 2, luck: 2, interaction: 2, conflict: 1, talk: 1, planning: 3 },

  pitch: 'Draft a habitat tile and an animal each turn, growing a Pacific Northwest landscape that scores for big habitats and clever wildlife patterns.',
  theme: 'You are shaping a corner of the Pacific Northwest wilderness and filling it with wildlife.',

  goal: { big: 'Most points', text: 'Score the most points from **wildlife patterns** (set by 5 scoring cards) and from your **largest connected area** of each habitat.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Pick', text: 'Take one of the 4 **tile + token pairs** on display (spend a nature token to take any tile with any token).' },
      { verb: 'Place tile', text: 'Add the habitat tile to your area, touching at least one of your tiles, in any rotation.' },
      { verb: 'Place animal', text: 'Put the wildlife token on one of your **empty** tiles that shows that animal, or return it to the bag.' },
      { verb: 'Refill', text: 'Fill the empty display slot with a new tile and token.' },
    ],
  },

  tension: 'The tile you want usually comes paired with the wrong animal, so every pick trades growing your habitats against completing wildlife patterns.',

  flow: [
    { label: 'Draft', items: ['Tile + token pair', 'Nature tokens to unpair', 'Swap out 3–4 matching animals'] },
    { label: 'Build', items: ['Grow habitat corridors', 'Place animals in patterns', 'Keystone tile → nature token'] },
    { label: 'Score', items: ['Wildlife cards', 'Largest area of each habitat', 'Majority bonus', 'Leftover nature tokens'] },
  ],

  end: { trigger: 'the tile stack runs out', detail: 'That is exactly 20 turns each. Then score wildlife, habitats, bonuses and nature tokens.' },
  scoring: [
    { label: 'Wildlife cards', share: 6 },
    { label: 'Habitat areas', share: 3 },
    { label: 'Habitat bonuses', share: 1 },
    { label: 'Nature tokens', share: 0.5 },
  ],

  ref: {
    title: 'Scoring (first game: “A” cards)',
    rows: [
      ['Bear', 'pairs of exactly 2 bears'],
      ['Elk', 'straight lines of elk'],
      ['Salmon', 'single-file runs of salmon'],
      ['Hawk', 'hawks not next to other hawks'],
      ['Fox', 'different animals next to each fox'],
      ['Habitats', '1 per tile in largest area; +3 most, +1 second'],
    ],
  },

  example: 'The display offers a **forest/river tile with a bear**. You place the tile beside your forest, growing that area to 6 tiles, then set the bear next to your lone bear, completing a pair for the Bear card.',

  setup: [
    'Each player takes a random 3-tile starter habitat.',
    'Pick one scoring card per animal (all “A” cards for a first game) and stack 20 tiles per player + 3 face down.',
    'Reveal 4 tiles and pair each with a token drawn from the bag.',
  ],

  terms: [
    ['Pair', 'A habitat tile with the wildlife token drawn beside it.'],
    ['Nature token', 'Pinecone earned by putting an animal on a keystone tile; spend for flexibility or keep for 1 point.'],
    ['Keystone tile', 'A single-habitat tile showing one animal.'],
    ['Overpopulation', 'When 4 (or optionally 3) display tokens match, they are swapped out.'],
  ],

  gotchas: [
    'Each tile holds **one** animal, and only an animal pictured on that tile.',
    'Tiles don’t have to match their neighbours; mismatched edges just don’t join habitat areas.',
    'If all 4 displayed tokens are the same animal they are replaced automatically; if **3** match, you may replace those 3 for free before your turn.',
  ],

  tips: [
    'Pick 2–3 animals to focus on; you can’t score all five well.',
    'Grow one or two habitats big rather than all five a little.',
    'Spend nature tokens when they fix a big play, but each unspent one is still 1 point.',
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
    const token = (x, y, an, r = 9) => A.circle(x + 1, y + 1.5, r, C.shadow, { sw: 0 }) + A.circle(x, y, r, '#f5ecd6', { sw: 1 }) + A.circle(x, y, r * 0.72, W[an][0], { sw: 0 }) + A.text(x, y + 0.5, W[an][1], { size: r * 0.95, weight: 800, fill: C.white });
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
      { step: 0, say: 'Pick one of the 4 pairs. You take the **forest/river tile** with the **bear** token.', svg: board + inDisp + bearDisp + A.glow(276, row(0), 30, 'g-pick') },
      { step: 1, say: 'Place the tile touching your area, turned so its **forest** side joins your forest.', svg: board + newTile(nx, ny, s) + bearDisp },
      { step: 1, say: 'Your forest is now one area of **6 tiles**. Largest areas score at the end.', svg: board + newTile(nx, ny, s) + bearDisp + A.k('forest', forest) + A.k('lab', A.tag(56, 186, 'Forest: 6 tiles', { fill: '#2f6b34' })) },
      { step: 2, say: 'Put the bear on the new tile, next to your lone bear: **a pair** for the Bear scoring card.', svg: board + newTile(nx, ny, s) + bear(nx, ny) + A.glow((bx + nx) / 2, by, 38, 'g-bears') },
      { step: 3, say: 'Refill the empty slot with a new tile and token from the bag. Next player.', svg: board + newTile(nx, ny, s) + bear(nx, ny) + A.k('t2', hexTile(258, row(0), 15, 'm', 'w')) + A.k('k2', token(294, row(0), 'elk')) },
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
    const token = (x, y, an, r = 7.5) => A.circle(x + 1, y + 1.5, r, C.shadow, { sw: 0 }) + A.circle(x, y, r, '#f5ecd6', { sw: 1 }) + A.circle(x, y, r * 0.72, W[an][0], { sw: 0 }) + A.text(x, y + 0.5, W[an][1], { size: r * 0.95, weight: 800, fill: C.white });
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
