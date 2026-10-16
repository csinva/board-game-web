defineGame({
  id: 'patchwork',
  name: 'Patchwork',
  year: 2014,
  designer: 'Uwe Rosenberg',
  family: 'tile',
  players: [2, 2], best: '2',
  time: [15, 30],
  age: 8,
  mechanics: ['tile-placement', 'spatial', 'resource-management', 'engine-building'],
  profile: { complexity: 1, luck: 1, interaction: 2, conflict: 2, talk: 1, planning: 3 },

  pitch: 'A two-player race to sew the best quilt: buy oddly shaped patches with buttons and time, and fit them together like Tetris.',
  theme: 'You are a quilter competing to stitch the finest, fullest quilt.',

  goal: { big: 'Most buttons', text: 'At the end, score your **buttons** minus **2 for every empty square** on your 9×9 quilt. A 7×7 bonus tile adds 7.' },

  turn: {
    type: 'choose',
    intro: 'Whoever is <b>behind</b> on the time track takes a turn and does <b>one</b> of:',
    outro: 'Whoever is behind on time goes next',
    steps: [
      { verb: 'Buy a patch', text: 'Choose one of the **3** patches just after the neutral pawn, pay its button cost, sew it onto your quilt, and move your time token forward by its time cost.' },
      { verb: 'Advance', text: 'Move your time token to the space just **ahead** of your opponent’s and take 1 button per space moved.' },
    ],
  },

  tension: 'Every patch costs both buttons and time: cheap, awkward shapes leave holes, while big button-making patches cost so much time your opponent gets several turns in a row.',

  flow: [
    { label: 'Earn', items: ['Advance for buttons', 'Button income on the track'] },
    { label: 'Spend', items: ['Buttons buy patches', 'Patches cost time'] },
    { label: 'Fill', items: ['Cover the 9×9 quilt', 'Leather 1×1 patches', 'First full 7×7: +7'] },
  ],

  end: { trigger: 'both time tokens reach the centre of the time track', detail: 'A move that would overshoot just stops at the end. Ties go to whoever reached the end first.' },
  scoring: [
    { label: 'Button income', share: 4 },
    { label: 'Buttons from advancing', share: 1 },
    { label: '7×7 bonus', share: 1 },
  ],

  ref: {
    title: 'Numbers to know',
    rows: [
      ['Start', '5 buttons each'],
      ['Patch label', 'button cost · time cost · buttons on it'],
      ['Button income', 'pass a button space: +1 per button on your quilt'],
      ['Leather patch', 'first to pass it places a free 1×1'],
      ['Empty square', '−2 points at the end'],
      ['7×7 bonus', '+7 to the first to fill a 7×7 area'],
    ],
  },

  example: 'You’re 4 spaces behind Maya. You buy an L-shaped patch for **3 buttons** and **4 time**: you sew it in a corner and move 4 spaces, landing on her space on top, so you go again. This time you advance past her and take **1** button.',

  setup: [
    'Arrange the 33 patches in a circle; put the neutral pawn just after the small 2×1 patch.',
    'Each player takes a quilt board, 5 buttons, and a time token on the start of the time track.',
    'Place the 5 leather patches on their marked spaces of the time track and the 7×7 bonus tile nearby.',
  ],

  terms: [
    ['Buttons', 'The money, and your final score.'],
    ['Time track', 'The shared spiral; each player’s token shows how much time they have used.'],
    ['Neutral pawn', 'Marks where the patch circle is; you can buy only the 3 patches after it.'],
    ['Button income', 'Buttons printed on your patches; they pay out when you pass income spaces.'],
  ],

  gotchas: [
    'Turns don’t alternate: whoever is **behind** on time goes next, so you can take several turns in a row. If you land on the same space, the token on top goes first.',
    'Each **empty square** costs 2 at the end, so holes add up fast.',
    'Button income only pays when your time token **passes** a button space, and only counts buttons already on your quilt.',
  ],

  tips: [
    'Buy patches with buttons on them early; each pays out at every income space after.',
    'Late in the game, skip button-makers: there are too few income spaces left to pay them back.',
    'Leave yourself room for the awkward shapes, and grab leather patches to plug single holes.',
  ],

  art(A) {
    const C = A.C;
    const fab = ['#c94f6d', '#3f8fc0', '#e8b84a', '#5aa36b', '#8a63b8', '#e07b42', '#47a8a4'];
    const patch = (ox, oy, k, cells, col, buttons = 0) => {
      let s = '';
      for (const [i, j] of cells) s += A.rect(ox + i * k, oy + j * k, k, k, col, { rx: 1, sw: 0.9 });
      for (let b = 0; b < buttons; b++) { const [i, j] = cells[b]; s += A.circle(ox + i * k + k / 2, oy + j * k + k / 2, k * 0.26, '#2f6db5', { sw: 0.8, stroke: '#cfe0f3' }); }
      return s;
    };
    let o = A.bg('#efe5d0');
    // Patch circle (a slice of it) along the top, with the neutral pawn
    const market = [
      [[[0, 0], [1, 0]], 0, 0], [[[0, 0], [1, 0], [2, 0], [2, 1]], 1, 1], [[[0, 0], [0, 1], [1, 1], [1, 2]], 2, 0],
      [[[0, 0], [1, 0], [2, 0], [1, 1]], 3, 2], [[[0, 0], [1, 0], [0, 1], [1, 1], [2, 1]], 4, 1], [[[0, 0], [1, 0], [2, 0], [3, 0]], 5, 1],
    ];
    let mx = 10;
    market.forEach(([cells, ci, b], i) => {
      const w = Math.max(...cells.map(c => c[0])) + 1;
      if (i === 1) { o += A.pawn(mx + 4, 18, 16, C.black); mx += 14; o += A.rect(mx - 4, 4, 140, 38, 'none', { rx: 6, dash: '3 2', sw: 1.2 }); }
      o += patch(mx, 8, 10, cells, fab[ci], b);
      mx += w * 10 + 12;
    });
    // Quilt board 9×9
    const k = 14, qx = 10, qy = 56;
    o += A.rect(qx - 3, qy - 3, k * 9 + 6, k * 9 + 6, '#b98d5a', { rx: 4, sw: 1.2 });
    o += A.grid(qx, qy, 9, 9, k, () => '#f3ead6', { stroke: '#d8c7a4', sw: 0.6 });
    o += patch(qx, qy + 6 * k, k, [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [1, 1]], fab[0], 2);
    o += patch(qx + k, qy + 4 * k, k, [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1]], fab[1], 1);
    o += patch(qx + 3 * k, qy + 6 * k, k, [[0, 0], [1, 0], [0, 1], [0, 2], [1, 2], [2, 2]], fab[6], 3);
    o += patch(qx, qy + 2 * k, k, [[0, 0], [0, 1], [0, 2], [0, 3]], fab[4], 0);
    o += patch(qx + 4 * k, qy + 5 * k, k, [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3]], fab[3], 1);
    o += patch(qx + k, qy + 2 * k, k, [[0, 0], [1, 0], [1, 1]], fab[2], 0);
    o += patch(qx + 7 * k, qy + 7 * k, k, [[1, 0], [0, 1], [1, 1]], fab[5], 0);
    o += patch(qx + 5 * k, qy + 7 * k, k, [[0, 0]], '#8a5a33', 0);
    // Time track: square spiral
    const pts = []; let x0 = 160, y0 = 58, x1 = 306, y1 = 184; const d = 18;
    pts.push([x0, y0]);
    while (x1 - x0 > d && y1 - y0 > d) {
      pts.push([x1, y0], [x1, y1], [x0, y1], [x0, y0 + d]);
      x0 += d; y0 += d; x1 -= d; y1 -= d;
      pts.push([x0, y0 - 0]);
    }
    const dPath = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
    o += A.rect(150, 48, 166, 146, '#dcc9a0', { rx: 6, sw: 1.2 });
    o += A.path(dPath, { stroke: '#7a6a4c', sw: 14 }) + A.path(dPath, { stroke: '#f3ead6', sw: 11.5 });
    const along = (t) => { let rem = t; for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], L = Math.hypot(bx - ax, by - ay); if (rem <= L) return [ax + (bx - ax) * rem / L, ay + (by - ay) * rem / L]; rem -= L; } return pts[pts.length - 1]; };
    for (const t of [60, 150, 250, 340, 420, 500, 570]) { const [bx, by] = along(t); o += A.circle(bx, by, 4, '#2f6db5', { sw: 0.8, stroke: '#cfe0f3' }); }
    for (const t of [380, 470]) { const [bx, by] = along(t); o += A.rect(bx - 3.5, by - 3.5, 7, 7, '#8a5a33', { rx: 1, sw: 0.8 }); }
    const [gx, gy] = along(205), [yx, yy] = along(232);
    o += A.circle(gx, gy, 6.5, '#4fae5a', { sw: 1.3 }) + A.circle(yx, yy, 6.5, C.yellow, { sw: 1.3 });
    o += A.note(110, 23, 216, 46, 'Buy one of the next 3', { fill: '#fffdf7' });
    o += A.note(qx + 2.5 * k, qy + 0.6 * k, 92, 80, 'Your 9×9 quilt');
    o += A.note(qx + 3.5 * k, qy + 6.5 * k, 64, 192, 'Buttons = income');
    o += A.note(gx - 4, gy, 236, 192, 'Time track: behind goes next');
    return o;
  },
});
