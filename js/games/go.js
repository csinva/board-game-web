defineGame({
  id: 'go',
  name: 'Go',
  year: -500,
  designer: 'Traditional (ancient China)',
  family: 'classic',
  players: [2, 2], best: '2',
  time: [20, 90],
  age: 8,
  mechanics: ['area-control', 'spatial', 'pattern-building'],
  profile: { complexity: 1, luck: 1, interaction: 5, conflict: 4, talk: 1, planning: 5 },
  color: '#b8894a',

  // Stones, liberty ring, eye, territory markers and prisoner lid; the stones are reused on the art + walk boards.
  icons: (() => {
    const wood = '#dcb36b', line = '#4a3a24';
    const cross = A => A.rect(1, 1, 22, 22, wood, { rx: 3, sw: 1.1 }) + A.line(1.5, 12, 22.5, 12, { stroke: line, sw: 1.1 }) + A.line(12, 1.5, 12, 22.5, { stroke: line, sw: 1.1 });
    const stone = (A, x, y, r, black) => A.circle(x + r * 0.1, y + r * 0.15, r, 'rgba(42,36,32,.18)', { sw: 0 }) + A.circle(x, y, r, black ? '#1e1e1e' : '#fbfbf7', { stroke: black ? '#000' : '#7a7468', sw: 1.2 }) + (black ? A.circle(x - r * 0.31, y - r * 0.31, r * 0.25, '#555', { sw: 0, opacity: 0.6 }) : '');
    return {
      black: { name: 'black stone', draw: A => stone(A, 12, 12, 10, true) },
      white: { name: 'white stone', draw: A => stone(A, 12, 12, 10, false) },
      liberty: { name: 'liberty', draw: A => cross(A) + A.circle(12, 12, 6.5, 'none', { stroke: '#c8423b', sw: 2.2, dash: '2.4 1.8' }) },
      eye: { name: 'eye', draw: A => cross(A) + [[12, 4.5], [4.5, 12], [19.5, 12], [12, 19.5]].map(([x, y]) => stone(A, x, y, 4.3, true)).join('') },
      'terr-b': { name: 'Black territory', draw: A => cross(A) + A.rect(8, 8, 8, 8, '#1e1e1e', { rx: 0, sw: 0 }) },
      'terr-w': { name: 'White territory', draw: A => cross(A) + A.rect(8, 8, 8, 8, '#fbfbf7', { rx: 0, sw: 1, stroke: '#7a7468' }) },
      prisoner: { name: 'prisoner', draw: A => `<ellipse cx="12" cy="15" rx="11" ry="6.5" fill="#9a6a3a" stroke="#2a2420" stroke-width="1.3"/>` + stone(A, 8.5, 13, 4, false) + stone(A, 15, 13.5, 4, false) },
    };
  })(),

  pitch: 'Take turns placing stones to surround empty points and capture enemy stones; most territory plus captures wins.',

  goal: { big: 'Most territory', text: 'Score more than your opponent: empty points you surround plus enemy stones you capture.' },

  turn: {
    type: 'choose',
    intro: 'Black plays first. On your turn, do one:',
    steps: [
      { verb: 'Place', text: 'Put **one stone** on any empty intersection. Stones never move.' },
      { verb: 'Capture', text: 'Remove any enemy group your stone left with **no liberties** {=liberty}; keep the stones as prisoners.' },
      { verb: 'Or pass', text: 'Pass instead. Two passes in a row end the game.' },
    ],
  },

  tension: 'Each stone either claims new territory or strengthens a weak group, and you rarely have time for both.',

  structure: [
    { label: 'Setup', text: 'Empty board (9×9 to learn). {=black} Black plays first.' },
    { label: 'Moves', repeat: 'alternating', text: 'Place a stone or pass. Captured stones go in the captor’s lid.' },
    { label: 'Game end', text: 'Both players pass in a row. Agree which stones are dead and remove them as prisoners.' },
    { label: 'Counting', text: 'Japanese rules: territory + prisoners; White adds 6.5 komi. Higher score wins.' },
  ],

  points: [
    ['{=terr-b} Territory', '1 per empty point surrounded only by your stones'],
    ['{=prisoner} Prisoners', '1 per enemy stone captured, including dead stones removed at the end'],
    ['Komi', '+6.5 to White for moving second (the .5 prevents ties)'],
    ['Chinese rules', 'Instead count your stones on the board + your territory; prisoners don’t score; komi 7.5. The winner is almost always the same'],
  ],

  end: {
    trigger: 'both players pass in a row, or one resigns',
  },

  scoring: [
    { label: '{=terr-b} Territory', share: 8 },
    { label: '{=prisoner} Prisoners', share: 2 },
  ],

  ref: {
    title: 'Core rules',
    rows: [
      ['{=liberty} Liberty', 'an empty point next to a stone (not diagonal)'],
      ['{=black}{=black} Group', 'stones joined along lines share liberties'],
      ['{=prisoner} Capture', 'fill a group’s last liberty; remove it'],
      ['Suicide', 'illegal, unless the move captures'],
      ['Ko', 'no instant retake of a single stone'],
    ],
  },

  example: 'On 9×9, Ben’s two {=white} stones inside Ana’s area have one {=liberty} left (atari). Ana plays {=black} on that point and removes both: **2 prisoners**, and their points become her territory. Ben plays elsewhere, closing his top-right border.',

  setup: [
    'Learn on a **9×9** board (15–20 minutes), then move to 13×13 and 19×19.',
    'The board starts empty. The weaker player takes {black}s and plays first; between equals, pick colours at random.',
    'Keep your stones in a bowl and your prisoners in its lid.',
  ],

  terms: [
    ['Atari', 'A group with 1 liberty left; it can be captured next move.'],
    ['{=eye} Eye', 'An empty point enclosed by one group. A group with **two** eyes can never be captured.'],
    ['Dead stones', 'Stones that can’t escape capture. At the end they are removed as prisoners without playing it out.'],
    ['Seki', 'Rival groups sharing liberties that neither can fill without being captured. Both live; under Japanese rules their shared empty points score for no one.'],
  ],

  gotchas: [
    '**Ko**: after a single stone is captured, the opponent may not recapture at once if that repeats the board; they must play elsewhere first.',
    'A stone with no liberties is illegal **unless** it captures, which gives it liberties.',
    'Diagonal stones are **not** connected and don’t share liberties.',
  ],

  tips: [
    'Play the corners first: they need the fewest stones to enclose territory.',
    'Before attacking, make your own groups safe: aim for **two eyes**.',
    'Don’t chase every capture. Surrounding territory usually scores more than killing stones.',
  ],

  walk(A) {
    const C = A.C, I = this.icons, s = 19, x0 = 22, y0 = 24, n = 9;
    let base = A.bg('#efe4cf') + A.rect(x0 - 14, y0 - 16, s * 8 + 28, s * 8 + 30, '#dcb36b', { rx: 4, sw: 1.4 });
    for (let i = 0; i < n; i++) base += A.line(x0 + i * s, y0, x0 + i * s, y0 + 8 * s, { stroke: '#4a3a24', sw: 0.9 }) + A.line(x0, y0 + i * s, x0 + 8 * s, y0 + i * s, { stroke: '#4a3a24', sw: 0.9 });
    for (const [i, j] of [[2, 2], [6, 2], [4, 4], [2, 6], [6, 6]]) base += A.circle(x0 + i * s, y0 + j * s, 2, '#4a3a24', { sw: 0 });
    const P = (i, j) => [x0 + i * s, y0 + j * s];
    // Same stone drawings as the {=black} / {=white} icons (radius 10 in 24 → 8 here).
    const stoneAt = (x, y, black) => A.use(I[black ? 'black' : 'white'].draw(A), x - 9.6, y - 9.6, 19.2);
    const stone = (i, j, black) => stoneAt(...P(i, j), black);
    const B = [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [6, 8], [0, 6], [1, 5], [2, 5], [3, 6], [2, 7]];
    const W = [[3, 0], [3, 1], [3, 2], [4, 3], [6, 4], [6, 5], [7, 6], [8, 6]];
    for (const [i, j] of B) base += stone(i, j, true);
    for (const [i, j] of W) base += stone(i, j, false);
    // Prisoner lids.
    const lid = (cx, cy) => `<ellipse cx="${cx}" cy="${cy}" rx="38" ry="15" fill="#9a6a3a" stroke="#2a2420" stroke-width="1.4"/>`;
    base += A.tag(262, 36, 'Ana (Black)') + lid(262, 66) + A.tag(262, 120, 'Ben (White)', { fill: '#fbfbf7', color: C.ink }) + lid(262, 150);
    base += A.text(262, 90, 'prisoners', { size: 7, weight: 700, fill: C.gray }) + A.text(262, 174, 'prisoners', { size: 7, weight: 700, fill: C.gray });
    base += stoneAt(262, 150, true);
    const inv = (pos) => A.k('w1', stoneAt(...pos[0], false)) + A.k('w2', stoneAt(...pos[1], false));
    const onBoard = inv([P(1, 6), P(2, 6)]), inLid = inv([[250, 64], [272, 68]]);
    const [lx, ly] = P(1, 7);
    const libs = A.circle(lx, ly, 6, 'none', { stroke: C.red, sw: 2, dash: '2 1.5' });
    return [
      { step: 0, say: 'Ben’s two {=white} stones inside Ana’s area have **one liberty** {=liberty} left: atari.', svg: base + onBoard + libs + A.glow(lx, ly, 12, 'g-b') },
      { step: 0, say: 'Ana places a {=black} on that **last liberty**.', svg: base + onBoard + A.k('b-new', stone(1, 7, true)) + A.glow(lx, ly, 13, 'g-b') },
      { step: 1, say: 'The white pair has no liberties, so it is **captured**: Ana puts both in her lid as **2 prisoners**.', svg: base + inLid + A.k('b-new', stone(1, 7, true)) + A.glow(262, 66, 20, 'g-lid') },
      { step: 0, say: 'Ben plays elsewhere, sealing the border of his top-right territory.', svg: base + inLid + A.k('b-new', stone(1, 7, true)) + A.k('w-new', stone(5, 3, false)) + A.glow(...P(5, 3), 13, 'g-w2') },
      { step: 2, say: 'When neither side can gain, both **pass**. Score = surrounded empty points ({=terr-b} {=terr-w}) + prisoners.', svg: base + inLid + A.k('b-new', stone(1, 7, true)) + A.k('w-new', stone(5, 3, false)) +
        [[0, 4], [1, 4], [2, 4], [0, 5], [1, 6], [2, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 7], [3, 8], [4, 7], [4, 8], [5, 7], [5, 8]].map(([i, j]) => { const [x, y] = P(i, j); return A.rect(x - 3, y - 3, 6, 6, '#1e1e1e', { sw: 0, rx: 0 }); }).join('') +
        [[4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [6, 3], [7, 3], [8, 3], [7, 4], [8, 4], [7, 5], [8, 5]].map(([i, j]) => { const [x, y] = P(i, j); return A.rect(x - 3, y - 3, 6, 6, '#fbfbf7', { sw: 0.8, rx: 0, stroke: '#7a7468' }); }).join('') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, s = 19, x0 = 22, y0 = 24, n = 9;
    let o = A.bg('#efe4cf');
    // board
    o += A.rect(x0 - 14, y0 - 16, s * 8 + 28, s * 8 + 30, '#dcb36b', { rx: 4, sw: 1.4 });
    for (let i = 0; i < n; i++) {
      o += A.line(x0 + i * s, y0, x0 + i * s, y0 + 8 * s, { stroke: '#4a3a24', sw: 0.9 });
      o += A.line(x0, y0 + i * s, x0 + 8 * s, y0 + i * s, { stroke: '#4a3a24', sw: 0.9 });
    }
    for (const [i, j] of [[2, 2], [6, 2], [4, 4], [2, 6], [6, 6]]) o += A.circle(x0 + i * s, y0 + j * s, 2, '#4a3a24', { sw: 0 });
    const P = (i, j) => [x0 + i * s, y0 + j * s];
    const stone = (i, j, black) => { const [x, y] = P(i, j); return A.use(I[black ? 'black' : 'white'].draw(A), x - 9.6, y - 9.6, 19.2); };
    // Black: lower-left; White: upper-right. Two white stones invaded Black's area and are in atari.
    const B = [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [6, 8], [0, 6], [1, 5], [2, 5], [3, 6], [2, 7]];
    const W = [[3, 0], [3, 1], [3, 2], [4, 3], [5, 3], [6, 4], [6, 5], [7, 6], [8, 6], [1, 6], [2, 6]];
    for (const [i, j] of [[0, 4], [1, 4], [2, 4], [0, 5], [0, 8], [1, 8], [3, 8], [4, 8], [5, 8], [4, 7], [5, 7]]) { const [x, y] = P(i, j); o += A.rect(x - 3, y - 3, 6, 6, '#1e1e1e', { sw: 0, rx: 0 }); }
    for (const [i, j] of [[6, 1], [7, 1], [8, 1], [7, 2], [8, 2], [7, 0], [8, 0], [7, 3], [8, 3]]) { const [x, y] = P(i, j); o += A.rect(x - 3, y - 3, 6, 6, '#fbfbf7', { sw: 0.8, rx: 0, stroke: '#7a7468' }); }
    for (const [i, j] of B) o += stone(i, j, true);
    for (const [i, j] of W) o += stone(i, j, false);
    const [lx, ly] = P(1, 7);
    o += A.circle(lx, ly, 6, 'none', { stroke: C.red, sw: 2, dash: '2 1.5' });
    // bowls with prisoners
    o += `<ellipse cx="228" cy="176" rx="30" ry="12" fill="#7a4a24" stroke="#2a2420" stroke-width="1.4"/>`;
    o += `<ellipse cx="288" cy="176" rx="26" ry="11" fill="#9a6a3a" stroke="#2a2420" stroke-width="1.4"/>`;
    o += A.circle(220, 172, 6, '#fbfbf7', { stroke: '#7a7468', sw: 1 }) + A.circle(232, 174, 6, '#fbfbf7', { stroke: '#7a7468', sw: 1 });
    o += A.circle(286, 172, 6, '#1e1e1e', { stroke: '#000', sw: 1 });
    o += A.note(lx + 6, ly, 260, 120, 'Atari: last liberty');
    o += A.note(P(1, 4)[0], P(1, 4)[1], 256, 86, 'Black territory');
    o += A.note(P(8, 1)[0] + 3, P(8, 1)[1], 262, 28, 'White territory');
    o += A.note(226, 168, 258, 150, 'Prisoners: +1 each');
    return o;
  },
});
