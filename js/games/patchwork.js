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

  // Buttons, time, patches and bonus pieces: used inline and drawn the same way in art + walk.
  icons: {
    button: { name: 'button', draw: A => A.circle(12, 12, 10, '#2f6db5', { sw: 1.3 }) + A.circle(12, 12, 6.8, 'none', { stroke: '#cfe0f3', sw: 1 }) + [[10, 10], [14, 10], [10, 14], [14, 14]].map(([x, y]) => A.circle(x, y, 1.1, '#cfe0f3', { sw: 0 })).join('') },
    time: { name: 'time', draw: A => A.path('M6 2.5 H18 M6 21.5 H18', { stroke: '#2a2420', sw: 1.8 }) + A.path('M7.5 3 L16.5 3 L12 12 L16.5 21 L7.5 21 L12 12 Z', { fill: '#f6efe0', sw: 1.3 }) + A.poly([[9, 20.2], [15, 20.2], [12, 15.5]], '#e2b33c', { sw: 0 }) },
    patch: { name: 'patch', draw: A => [[0, 0], [0, 1], [0, 2], [1, 2]].map(([i, j]) => A.rect(5 + i * 7, 1.5 + j * 7, 7, 7, '#c94f6d', { rx: 0.8, sw: 1.1 })).join('') + A.circle(15.5, 18.5, 2, '#2f6db5', { sw: 0.6, stroke: '#cfe0f3' }) },
    leather: { name: 'leather patch', draw: A => A.rect(5, 5, 14, 14, '#8a5a33', { rx: 1.5, sw: 1.3 }) + A.rect(7.5, 7.5, 9, 9, 'none', { stroke: '#e3c08f', sw: 0.9, dash: '1.6 1.4', rx: 0.8 }) },
    bonus: { name: '7×7 bonus tile', draw: A => A.rect(3, 3, 18, 18, '#e8b84a', { rx: 2, sw: 1.3 }) + A.text(12, 12.5, '7', { size: 12, weight: 800 }) },
    empty: { name: 'empty square', draw: A => A.rect(4, 4, 16, 16, '#f3ead6', { rx: 1, sw: 1.2, dash: '2.5 2' }) },
  },

  pitch: 'Two players buy patches with buttons and time to fill a 9×9 quilt; most buttons minus empty squares wins.',

  goal: { big: 'Most buttons', text: 'Have the higher final score: your **buttons**, minus **2 per empty square** on your 9×9 quilt board, plus 7 if you hold the 7×7 bonus tile.' },

  turn: {
    type: 'choose',
    intro: 'Whoever is **behind** on the time track takes a turn and does **one** of:',
    outro: 'Whoever is behind on time goes next',
    steps: [
      { verb: 'Buy a patch', text: 'Choose one of the **3** patches directly after the neutral pawn, going clockwise. Pay its {=button} cost, move the neutral pawn to that patch’s spot, place the patch on your quilt (you may rotate or flip it), and move your time token forward by its {=time} cost.' },
      { verb: 'Advance', text: 'Move your time token to the space just **ahead** of your opponent’s time token; take 1 {=button} per space moved.' },
    ],
  },

  tension: 'Each patch costs buttons and time: big button-earning patches cost so much time that your opponent gets several turns in a row.',

  structure: [
    { label: 'Setup', text: 'Patches in a circle with the neutral pawn just after the 2×1 patch; 5 {=button} each; both time tokens on the start space.' },
    { label: 'Turns', repeat: 'whoever is behind', text: 'The player behind on the time track buys a patch or advances. When your time token passes a {=button} space on the track, collect your button income. The first player to pass a {=leather} takes it as a free 1×1 patch.' },
    { label: 'Game end', text: 'When both time tokens are on the final space, score: buttons − 2 per empty square, + 7 for the bonus tile.' },
  ],

  points: [
    ['{=button} Buttons', '1 point each'],
    ['{=empty} Empty square', '−2 each'],
    ['{=bonus} 7×7 bonus', '+7 to the first player whose quilt has a 7×7 square with every space filled'],
  ],

  end: { trigger: 'both time tokens reach the final space', detail: 'A time token that would move past the final space stops on it. If tied, the player who reached the final space first wins.' },
  scoring: [
    { label: '{=button} Button income', share: 4 },
    { label: 'Buttons from advancing', share: 1 },
    { label: '{=bonus} 7×7 bonus', share: 1 },
  ],

  ref: {
    title: 'Numbers to know',
    rows: [
      ['Start', '5 {=button} each'],
      ['{=patch} Patch label', 'its {=button} cost · its {=time} cost · the {=button} printed on the patch itself (its income)'],
      ['Button income', 'each time your time token passes a {=button} space on the track: take 1 button per {=button} printed on the patches in your quilt'],
      ['{=leather} Leather patch', 'the first player whose time token passes its space takes it and places it on their quilt at once (a free 1×1 patch)'],
    ],
  },

  example: 'You’re 4 spaces behind Maya. You buy a 5-square patch for **3** {=button} and **4** {=time}, place it in a corner of your quilt and move your time token 4 spaces onto her space. Yours goes on top, so you go again. Then you advance 1 space past her and take **1** {=button}.',

  setup: [
    'Arrange the 33 patches in a circle; put the neutral pawn just after the small 2×1 patch (going clockwise).',
    'Each player takes a quilt board and 5 {button}s, and puts a time token on the start space of the time track. The player who most recently used a needle goes first: put their token on top.',
    'Put the 5 leather patches {=leather} on their marked track spaces and the {bonus} beside the board.',
  ],

  terms: [
    ['{=button} Buttons', 'Money and final score.'],
    ['Time track', 'Shared spiral track; your time token shows how much time you have used.'],
    ['Neutral pawn', 'Marks the current place in the patch circle; you may buy only the 3 patches directly after it, going clockwise.'],
    ['Button income', 'The buttons printed on the patches in your quilt; they pay out each time your time token passes a {=button} space on the track.'],
  ],

  gotchas: [
    'Turns don’t alternate: whoever is **behind** on time goes next, so you can take several turns in a row. If both time tokens are on the same space, the one on top (the one that arrived last) goes first.',
    'Each **empty square** costs 2 at the end; holes add up fast.',
    'Income pays only when your token **passes** a button space, and counts only buttons already on your quilt.',
    'A patch must fit wholly on your quilt without overlapping; you can’t move it later. If you can’t pay for or can’t fit any of the 3 patches, you must advance instead.',
    'The {=bonus} goes only to the **first** player to fill a 7×7 square; the other player can’t take it later.',
  ],

  tips: [
    'Buy button-making patches early; each pays at every income space after.',
    'Late in the game, skip button-makers: too few income spaces remain to pay them back.',
    'Leave room for awkward shapes; use leather patches to plug single holes.',
  ],

  walk(A) {
    const C = A.C;
    const fab = ['#c94f6d', '#3f8fc0', '#e8b84a', '#5aa36b', '#8a63b8', '#e07b42', '#47a8a4'];
    const patch = (ox, oy, k, cells, col) => cells.map(([i, j]) => A.rect(ox + i * k, oy + j * k, k, k, col, { rx: 1, sw: 0.9 })).join('');
    // Buttons are the inline {button} icon at radius r.
    const btn = (x, y, r = 4.5) => A.use(this.icons.button.draw(A), x - r * 1.2, y - r * 1.2, r * 2.4);
    let board = A.bg('#efe5d0');
    // Patch circle (a slice) with the neutral pawn.
    board += A.text(160, 10, 'Patches: buy one of the 3 after the pawn', { size: 7.5, fill: '#6d5a3a' });
    board += patch(10, 22, 10, [[0, 0], [1, 0]], fab[2]);
    const L = [[0, 0], [0, 1], [0, 2], [1, 2], [0, 3]];
    const T = [[0, 0], [1, 0], [2, 0], [1, 1]], I = [[0, 0], [1, 0], [2, 0], [3, 0]], Z = [[0, 0], [1, 0], [1, 1], [2, 1]];
    board += patch(92, 22, 10, T, fab[3]) + patch(140, 22, 10, I, fab[4]) + patch(200, 22, 10, Z, fab[1]);
    const cap = (x, b, t) => A.text(x, 64, b + ' btn · ' + t + ' time', { size: 5.5, fill: '#6d5a3a' });
    board += cap(107, 2, 2) + cap(160, 3, 3) + cap(215, 3, 2);
    // Quilt 9×9.
    const k = 12, qx = 12, qy = 78;
    board += A.rect(qx - 3, qy - 3, k * 9 + 6, k * 9 + 6, '#b98d5a', { rx: 4, sw: 1.2 }) + A.grid(qx, qy, 9, 9, k, () => '#f3ead6', { stroke: '#d8c7a4', sw: 0.6 });
    board += patch(qx, qy, k, [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1]], fab[6]) + patch(qx + 3 * k, qy, k, [[0, 0], [1, 0], [2, 0], [2, 1]], fab[5]) + btn(qx + 0.5 * k, qy + 0.5 * k, 3.5);
    board += A.text(qx + 4.5 * k, qy + k * 9 + 9, 'Your quilt', { size: 7.5, fill: '#6d5a3a' });
    // Time track: a straight stretch.
    const sp = (i) => [146 + i * 17, 112];
    board += A.text(228, 76, 'Time track', { size: 7.5, fill: '#6d5a3a' });
    for (let i = 0; i < 10; i++) board += A.rect(sp(i)[0] - 8, sp(i)[1] - 8, 16, 16, '#f3ead6', { rx: 2, sw: 0.9 });
    const tok = (key, i, col, up = 0) => A.k(key, A.circle(sp(i)[0], sp(i)[1] - up, 6, col, { sw: 1.3 }) + (key === 'you' ? A.tag(sp(i)[0], 92, 'You', { fill: '#3c8d4f' }) : ''));
    board += tok('maya', 5, C.yellow) + A.tag(sp(5)[0], 134, 'Maya', { fill: '#b8932a' });
    board += A.tag(232, 154, 'Your buttons', { fill: '#2f6db5' });
    const coins = (n) => { let s = ''; for (let i = 0; i < n; i++) s += A.k('b' + i, btn(198 + i * 14, 176, 5)); return s; };
    const lPatch = (x, y, kk) => A.k('L', patch(x, y, kk, L, fab[0]) + btn(x + kk / 2, y + 2.5 * kk, kk * 0.28));
    const pawn = (x) => A.k('pawn', A.pawn(x, 34, 16, C.black));
    const lMarket = lPatch(55, 21, 9) + A.k('capL', A.text(64, 64, '3 btn · 4 time', { size: 5.5, fill: '#6d5a3a' }));
    const lQuilt = lPatch(qx, qy + 5 * k, k);
    return [
      { step: 0, say: 'You’re **4 spaces behind** Maya on the time track. Whoever is behind goes, so it’s you.', svg: board + pawn(38) + lMarket + coins(5) + tok('you', 1, '#4fae5a') + A.k('gap', A.rect(sp(1)[0] - 10, sp(1)[1] - 10, 4 * 17 + 20, 20, 'none', { rx: 4, stroke: '#ffcf3f', sw: 3 })) },
      { step: 0, say: 'Buy the **5-square patch** after the pawn: **3** {=button} and **4** {=time}, with 1 {=button} printed on it.', svg: board + pawn(38) + lMarket + coins(5) + tok('you', 1, '#4fae5a') + A.glow(64, 37, 20, 'g-L') },
      { step: 0, say: 'Pay 3 buttons and place it in a corner of your quilt. The neutral pawn moves to that patch’s old spot.', svg: board + pawn(64) + lQuilt + coins(2) + tok('you', 1, '#4fae5a') },
      { step: 0, say: 'Move your time token **4 spaces**: onto Maya’s space, **on top**.', svg: board + pawn(64) + lQuilt + coins(2) + tok('you', 5, '#4fae5a', 6) },
      { step: 1, say: 'On top goes first, so you go again. **Advance** to just ahead of Maya: 1 space, **1** {=button}.', svg: board + pawn(64) + lQuilt + coins(3) + tok('you', 6, '#4fae5a') + A.glow(...sp(6), 12, 'g-6') },
      { step: 1, say: 'Maya is behind now, so she goes next.', svg: board + pawn(64) + lQuilt + coins(3) + tok('you', 6, '#4fae5a') + A.glow(...sp(5), 12, 'g-5') },
    ];
  },

  art(A) {
    const C = A.C;
    const fab = ['#c94f6d', '#3f8fc0', '#e8b84a', '#5aa36b', '#8a63b8', '#e07b42', '#47a8a4'], I = this.icons;
    const btn = (x, y, r) => A.use(I.button.draw(A), x - r * 1.2, y - r * 1.2, r * 2.4);
    const patch = (ox, oy, k, cells, col, buttons = 0) => {
      let s = '';
      for (const [i, j] of cells) s += A.rect(ox + i * k, oy + j * k, k, k, col, { rx: 1, sw: 0.9 });
      for (let b = 0; b < buttons; b++) { const [i, j] = cells[b]; s += btn(ox + i * k + k / 2, oy + j * k + k / 2, k * 0.3); }
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
    for (const t of [60, 150, 250, 340, 420, 500, 570]) { const [bx, by] = along(t); o += btn(bx, by, 4.5); }
    for (const t of [380, 470]) { const [bx, by] = along(t); o += A.use(I.leather.draw(A), bx - 6, by - 6, 12); }
    const [gx, gy] = along(205), [yx, yy] = along(232);
    o += A.circle(gx, gy, 6.5, '#4fae5a', { sw: 1.3 }) + A.circle(yx, yy, 6.5, C.yellow, { sw: 1.3 });
    o += A.note(110, 23, 216, 46, 'Buy one of the next 3', { fill: '#fffdf7' });
    o += A.note(qx + 2.5 * k, qy + 0.6 * k, 92, 80, 'Your 9×9 quilt');
    o += A.note(qx + 3.5 * k, qy + 6.5 * k, 64, 192, 'Buttons = income');
    o += A.note(gx - 4, gy, 236, 192, 'Time track: behind goes next');
    return o;
  },
});
