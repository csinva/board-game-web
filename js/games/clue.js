defineGame({
  id: 'clue',
  name: 'Clue (Cluedo)',
  year: 1949,
  designer: 'Anthony E. Pratt',
  family: 'classic',
  players: [3, 6], best: '4–6',
  time: [45, 60],
  age: 8,
  mechanics: ['deduction', 'roll-and-move', 'memory', 'hand-management'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 1, talk: 2, planning: 2 },
  color: '#7a2e3a',

  // Card types, the six suspects (pawn colours), the six weapons, envelope and notepad; pawns and rope are reused in art + walk.
  icons: (() => {
    const card = (name, inner) => ({ name, draw: A => A.rect(4, 1, 16, 22, '#e9dcc0', { rx: 2.5, sw: 1.3 }) + inner(A) });
    const pawn = (name, fill) => ({ name, draw: A => A.pawn(12, 12, 22, fill) });
    const metal = '#8c877f';
    return {
      suspect: card('suspect card', A => A.pawn(12, 12.5, 13, '#7a2e3a')),
      weapon: card('weapon card', A => A.poly([[12, 4], [13.8, 13], [10.2, 13]], '#cfd5dc', { sw: 0.9 }) + A.rect(8, 13, 8, 2.2, '#8a5a33', { rx: 0.5, sw: 0.8 }) + A.rect(11, 15.2, 2, 4.5, '#8a5a33', { rx: 0.5, sw: 0.8 })),
      room: card('room card', A => A.rect(8.5, 6, 7, 12.5, '#8a6c4f', { rx: 0.8, sw: 1 }) + A.circle(14, 12.5, 0.9, '#e2b33c', { sw: 0 })),
      back: { name: 'card back', draw: A => A.rect(4, 1, 16, 22, '#7a2e3a', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '?', { size: 12, weight: 800, fill: '#f3ead6' }) },
      envelope: { name: 'case file', draw: A => A.rect(2, 5.5, 20, 14, '#f3ead6', { rx: 1.5, sw: 1.3 }) + A.path('M2.5 6 L12 13.5 L21.5 6', { sw: 1.2 }) + A.circle(12, 13.5, 2.2, '#7a2e3a', { sw: 0 }) },
      notepad: { name: 'notepad', draw: A => A.rect(5, 2, 14, 20, '#fff', { rx: 1.5, sw: 1.3 }) + [7, 11.5, 16].map(y => A.line(8, y, 16.5, y, { stroke: '#9fb6d3', sw: 1 })).join('') + A.text(9.5, 11.3, '×', { size: 9, weight: 800, fill: '#c8423b' }) },
      passage: { name: 'secret passage', draw: A => A.circle(12, 12, 10, '#2a2420', { sw: 0 }) + A.arrow(7.5, 16.5, 16.8, 7.2, { stroke: '#fff', sw: 2, head: 5 }) },
      scarlet: pawn('Scarlet', '#c8423b'),
      mustard: pawn('Mustard', '#e2b33c'),
      white: pawn('White', '#f4f1ea'),
      green: pawn('Green', '#3c8d4f'),
      peacock: pawn('Peacock', '#2f6db5'),
      plum: pawn('Plum', '#7d55b5'),
      candlestick: { name: 'candlestick', draw: A => A.path('M12 2 q3.2 3 0 6 q-3.2 -3 0 -6 z', { fill: '#f08a3a', sw: 0.9 }) + A.rect(10.5, 8.5, 3, 10, '#d9b54a', { rx: 0.5, sw: 1 }) + A.rect(6.5, 18.5, 11, 3, '#d9b54a', { rx: 1, sw: 1 }) },
      dagger: { name: 'dagger', draw: A => A.poly([[12, 1.5], [14.4, 14], [9.6, 14]], '#cfd5dc', { sw: 1.1 }) + A.rect(6.5, 14, 11, 2.6, '#8a5a33', { rx: 0.8, sw: 1 }) + A.rect(10.7, 16.6, 2.6, 6, '#8a5a33', { rx: 0.8, sw: 1 }) },
      pipe: { name: 'lead pipe', draw: A => A.line(5, 19, 19, 5, { stroke: '#2a2420', sw: 6 }) + A.line(5, 19, 19, 5, { stroke: metal, sw: 3.8 }) + A.circle(19, 5, 2.8, metal, { sw: 1 }) },
      revolver: { name: 'revolver', draw: A => A.path('M2.5 7.5 h18.5 v5 h-9 l-1.5 2.5 h-2 l-1 6.5 h-5 l2 -9 h-2 z', { fill: '#5d6168', sw: 1.1 }) },
      rope: { name: 'rope', draw: A => A.path('M2.5 12 q4 -7 8 0 q4 7 8 0', { stroke: '#a77b22', sw: 2.8 }) + A.circle(20.3, 11, 2.6, 'none', { stroke: '#a77b22', sw: 1.9 }) },
      wrench: { name: 'wrench', draw: A => A.line(5, 19, 13.5, 10.5, { stroke: metal, sw: 3.8 }) + A.path('M12.5 5.5 a5 5 0 1 0 6 6', { stroke: metal, sw: 3.4 }) },
    };
  })(),

  pitch: 'Move through rooms making suggestions; deduce the hidden suspect, weapon and room, then accuse correctly to win.',

  goal: { big: 'Solve the case', text: 'First to correctly name the **suspect, weapon and room** in the {=envelope} case file.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Move', text: 'Roll the dice and move that many squares (no diagonals), take a {=passage} **secret passage** from a corner room, or stay in your room. Entering a room ends your move.' },
      { verb: 'Suggest', text: 'In a room, name a suspect and weapon **with that room**; move both tokens there.' },
      { verb: 'Disprove', text: 'Going left, the first player holding any named card shows you **one** of them, secretly.' },
      { verb: 'Accuse', text: 'Optional, once per game, on your turn: name any suspect, weapon and room, then check the {=envelope} secretly.' },
    ],
  },

  tension: 'Build each suggestion to learn something new without teaching the others as much.',

  structure: [
    { label: 'Setup', text: 'Hide 1 {=suspect} + 1 {=weapon} + 1 {=room} in the {=envelope}; deal the other 18 cards. {=scarlet} Scarlet starts.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Move; in a room, suggest and get disproved. Accuse when sure.' },
    { label: 'Game end', text: 'The first correct accusation wins. A wrong accuser stops moving and suggesting but keeps showing cards.' },
  ],

  end: {
    trigger: 'someone makes a correct accusation',
    detail: 'If every player accuses wrongly, no one wins.',
    results: [
      { side: 'Correct accusation', text: 'you win immediately.' },
      { side: 'Wrong accusation', text: 'return the cards unseen; you no longer move or accuse, but still disprove.' },
    ],
  },

  ref: {
    title: 'The 21 cards',
    rows: [
      ['{=suspect} Suspects (6)', '{scarlet} {mustard} {white} {green} {peacock} {plum}'],
      ['{=weapon} Weapons (6)', '{candlestick} {dagger} {pipe} {revolver} {rope} {wrench}'],
      ['{=room} Rooms (9)', 'Kitchen, Ballroom, Conservatory, Dining Room, Billiard Room, Library, Lounge, Hall, Study'],
      ['{=envelope} Case file', '1 {=suspect} + 1 {=weapon} + 1 {=room}, unseen'],
    ],
  },

  example: 'Priya enters the **Library** and suggests “{=mustard} Mustard with the {rope} in the Library.” Tom, on her left, has none of the three and says so. Lena has the rope and shows it to Priya only, so Priya crosses it off her {notepad} and notes that Tom holds none of the three.',

  setup: [
    'Shuffle the {=suspect}, {=weapon} and {=room} cards separately; put 1 of each **unseen** in the {=envelope}.',
    'Shuffle the other 18 together and deal them all (some players may get 1 more). Each player takes a {notepad}.',
    'Put each weapon in a different random room and all 6 suspects on their start spaces, even unplayed ones. {=scarlet} Scarlet moves first, then clockwise.',
    'Current Hasbro sets use **2 dice**; remove the Clue cards for the classic game (a magnifying-glass face counts as 1). Older sets use 1 die. Some names differ by edition (e.g. Dr Orchid for Mrs White).',
  ],

  terms: [
    ['Suggestion', 'A test guess using your current room. Others must disprove it if they can.'],
    ['Accusation', 'Your final answer, checked against the case file. One try.'],
    ['{=envelope} Case file', 'The envelope holding the 3 solution cards.'],
    ['{=passage} Secret passage', 'Links opposite corner rooms; using it is your whole move.'],
  ],

  gotchas: [
    'You may suggest cards **you hold**, to bluff or to test others.',
    'A suggestion must use the room **you are in**; an accusation can name any room.',
    'You can’t move onto or through a square or doorway occupied by another token, or cross the same square twice in one turn.',
    'Current rules let you stay in a room and suggest there again. Older editions require you to leave first, unless another player’s suggestion moved you there.',
  ],

  tips: [
    'Track **who showed what** and who passed: a pass rules out all three cards for that player.',
    'Head for rooms you still need to test; use secret passages to save moves.',
    'Accuse only when all three are certain: a wrong guess ends your chance to win.',
  ],

  walk(A) {
    const C = A.C, I = this.icons, PLUM = '#7d55b5';
    const ic = (k, x, y, size) => A.use(I[k].draw(A), x - size / 2, y - size / 2, size);
    let base = A.bg('#efe4cc') + A.rect(4, 4, 174, 192, '#e3c46a', { rx: 4, sw: 1.6 });
    base += A.grid(6, 6, 17, 19, 10, () => '#e9cf7a', { sw: 0.35, stroke: '#c7a64c' });
    const rooms = [
      ['Study', 6, 6, 52, 46, '#c99b78'], ['Hall', 66, 6, 48, 38, '#b9c6a3'], ['Lounge', 122, 6, 54, 46, '#a9cbbf'],
      ['Library', 6, 62, 52, 54, '#d7b089'], ['Dining', 122, 62, 54, 54, '#9fb47f'],
      ['Conservatory', 6, 128, 52, 66, '#c5a5b9'], ['Ballroom', 66, 150, 48, 44, '#d2bf95'], ['Kitchen', 122, 128, 54, 66, '#b49a7a'],
    ];
    for (const [n, x, y, w, h, f] of rooms) base += A.rect(x, y, w, h, f, { rx: 1, sw: 1.4 }) + A.text(x + w / 2, y + 7, n, { size: 6, weight: 700 });
    for (const [x, y, w, h] of [[56, 86, 4, 10], [30, 50, 10, 4], [86, 42, 10, 4], [120, 86, 4, 10], [30, 126, 10, 4], [86, 148, 10, 4], [146, 126, 10, 4], [146, 50, 10, 4]]) base += A.rect(x, y, w, h, '#7a2e3a', { sw: 0, rx: 1 });
    base += A.rect(68, 56, 44, 78, '#8a6c4f', { rx: 2, sw: 1.4 }) + A.rect(74, 82, 32, 22, '#f3ead6', { rx: 2, sw: 1.1 }) + A.path('M74 82 L90 95 L106 82', { sw: 1.1 }) + A.text(90, 114, 'case file', { size: 6, weight: 700, fill: C.white });
    // Right panel: other players and Priya's notes.
    const BK = (x, y) => A.card(x, y, 14, 20, '#7a2e3a', {});
    base += A.tag(210, 50, 'Tom') + BK(230, 40) + BK(244, 40) + BK(258, 40);
    base += A.tag(210, 82, 'Lena') + BK(230, 72) + BK(244, 72);
    base += A.tag(210, 104, 'Priya', { fill: PLUM });
    base += A.rect(238, 96, 76, 98, C.white, { rx: 3, sw: 1.2 }) + A.text(276, 104, 'Priya’s notes', { size: 6.5, weight: 800 });
    const notes = ['Mustard', 'Plum', 'Rope', 'Wrench', 'Library', 'Hall'], done = { Plum: 1, Wrench: 1, Hall: 1 };
    notes.forEach((n, i) => {
      const y = 118 + i * 12.5;
      base += A.rect(244, y - 3.5, 7, 7, 'none', { sw: 0.8, rx: 1 }) + A.text(256, y, n, { size: 7, weight: 600, anchor: 'start' });
      if (done[n]) base += A.text(247.5, y, 'x', { size: 8, weight: 800 });
    });
    const rope = (x, y) => ic('rope', x, y, 22);
    // Pawns are the same drawings as the suspect icons (A.pawn at 22 in a 24 box → 15 px here).
    const priya = (x, y) => A.k('priya', ic('plum', x, y, 16.4));
    const must = (x, y) => A.k('must', ic('mustard', x, y, 16.4));
    const ropeT = (x, y) => A.k('rope', rope(x, y));
    const die = A.k('die', A.die(184, 118, 17, 2) + A.die(205, 118, 17, 3));
    const lenaRope = A.k('rope-card', BK(258, 72));
    const inLib = priya(20, 94) + must(42, 94) + ropeT(30, 108);
    const bub = A.k('bub', A.bubble(186, 4, 128, 22, 'Mustard + rope + Library?', { size: 7 }));
    return [
      { step: 0, say: 'Priya rolls {=d2}{=d3} = 5 and heads for the Library door.', svg: base + priya(62, 140) + must(150, 30) + ropeT(30, 170) + lenaRope + die + A.glow(58, 91, 12, 'g-door') },
      { step: 0, say: 'She enters the **Library**; entering a room ends her move.', svg: base + priya(26, 94) + must(150, 30) + ropeT(30, 170) + lenaRope + die },
      { step: 1, say: 'She suggests “{=mustard} **Mustard** with the {=rope} **rope** in the Library.” His pawn and the rope move into the room.', svg: base + inLib + lenaRope + bub },
      { step: 2, say: 'Going left, **Tom** checks first: he has none of the three and says so.', svg: base + inLib + lenaRope + bub + A.k('tom-no', A.tag(296, 50, 'none', { fill: C.gray })) },
      { step: 2, say: '**Lena** holds the rope, so she shows it to Priya alone.', svg: base + inLib + bub + A.k('tom-no', A.tag(296, 50, 'none', { fill: C.gray })) +
        A.k('rope-card', A.card(196, 142, 32, 44, '#d9c49a', { label: 'Rope', size: 6, labelFill: C.ink })) },
      { step: 3, say: 'Priya crosses off the rope and notes Tom has none of the three. Not sure yet: **no accusation**.', svg: base + inLib + A.k('tom-no', A.tag(296, 50, 'none', { fill: C.gray })) +
        A.k('rope-card', A.card(196, 142, 32, 44, '#d9c49a', { label: 'Rope', size: 6, labelFill: C.ink })) + A.k('x', A.text(247.5, 143, 'x', { size: 9, weight: 800, fill: C.red })) + A.glow(248, 143, 9, 'g-x') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
    let o = A.bg('#efe4cc');
    // Board frame and corridor tiles.
    o += A.rect(6, 6, 198, 188, '#e3c46a', { rx: 4, sw: 1.6 });
    o += A.grid(8, 8, 21, 20, 9.4, () => '#e9cf7a', { sw: 0.35, stroke: '#c7a64c' });
    const rooms = [
      [8, 8, 54, 48, '#c99b78'], [78, 8, 54, 40, '#b9c6a3'], [148, 8, 54, 48, '#a9cbbf'],
      [8, 72, 54, 50, '#d7b089'], [148, 72, 54, 50, '#9fb47f'],
      [8, 138, 54, 54, '#c5a5b9'], [78, 150, 54, 42, '#d2bf95'], [148, 138, 54, 54, '#b49a7a'],
    ];
    for (const [x, y, w, h, f] of rooms) {
      o += A.rect(x, y, w, h, f, { rx: 1, sw: 1.6 });
      o += A.grid(x + 3, y + 3, Math.floor((w - 6) / 8), Math.floor((h - 6) / 8), 8, (i, j) => (i + j) % 2 ? null : 'rgba(255,255,255,.18)', { sw: 0 });
    }
    // Doors.
    for (const [x, y] of [[50, 56], [100, 48], [160, 56], [62, 92], [148, 100], [40, 138], [92, 150], [170, 138]]) o += A.rect(x - 5, y - 2, 10, 4, '#7a2e3a', { sw: 0, rx: 1 });
    // Secret passages between corners.
    o += A.circle(18, 18, 5, C.ink, { sw: 0 }) + A.circle(192, 182, 5, C.ink, { sw: 0 });
    // Centre: case file envelope on the staircase.
    o += A.rect(78, 70, 54, 64, '#8a6c4f', { rx: 2, sw: 1.6 });
    o += A.rect(84, 86, 42, 30, '#f3ead6', { rx: 2, sw: 1.2 });
    o += A.path('M84 86 L105 103 L126 86', { sw: 1.2 });
    o += A.text(105, 108, '?', { size: 12, weight: 800, fill: '#7a2e3a', serif: true });
    // Suspect pawns.
    const sus = [[34, 36, 'scarlet'], [46, 30, 'plum'], [178, 98, 'mustard'], [140, 96, 'green'], [70, 104, 'peacock'], [30, 160, 'white']];
    for (const [x, y, k] of sus) o += A.use(I[k].draw(A), x - 8.2, y - 8.2, 16.4);
    // Weapon in the room (candlestick).
    o += A.use(I.candlestick.draw(A), 165, 14, 24);
    // Detective notepad.
    o += A.rect(214, 74, 98, 118, C.white, { rx: 3, sw: 1.3, rotate: 3 });
    let pad = '';
    const marks = ['x', '', 'x', 'x', '', 'x', '', 'x', 'x', '', '?'];
    for (let i = 0; i < marks.length; i++) {
      const y = 92 + i * 9;
      pad += A.line(222, y + 4, 304, y + 4, { stroke: '#b9cbe0', sw: 0.8 });
      pad += A.rect(222, y - 3, 6, 6, 'none', { sw: 0.8, rx: 0.5 });
      pad += A.rect(232, y - 1, 30 + (i * 13) % 26, 2.5, '#9a948a', { sw: 0, rx: 1 });
      if (marks[i]) pad += A.text(225, y, marks[i], { size: 8, weight: 800, fill: marks[i] === '?' ? C.red : C.ink });
    }
    o += A.group(pad, 'rotate(3 263 133)');
    // Shown card.
    o += A.card(250, 10, 34, 48, '#7a2e3a', { label: '?', size: 18, rotate: -8 });
    o += A.card(274, 14, 34, 48, '#d9c49a', { rotate: 6 });
    o += A.path('M282 28 v18 M278 46 h8', { stroke: '#6d6d6d', sw: 3 });
    o += A.note(105, 100, 105, 143, 'Case file = the answer');
    o += A.note(38, 30, 90, 62, 'Suggest inside a room');
    o += A.note(258, 150, 262, 186, 'Detective notes');
    o += A.note(266, 40, 262, 67, 'Shown in secret');
    return o;
  },
});
