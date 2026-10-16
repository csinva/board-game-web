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

  pitch: 'Roam a mansion, make suggestions, and cross off clues until you can name the murderer, the weapon and the room.',
  theme: 'You are guests at a country house where the host has been murdered, and the culprit is one of you.',

  goal: { big: 'Solve the case', text: 'Be the first to correctly name the **suspect, weapon and room** hidden in the case file envelope.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Move', text: 'Roll and move toward a room, or take a **secret passage** from a corner room.' },
      { verb: 'Suggest', text: 'If you entered a room, name a suspect and weapon **in that room**; move both tokens there.' },
      { verb: 'Disprove', text: 'Going left, the first player holding any named card shows you **one** of them, secretly.' },
      { verb: 'Accuse', text: 'Optional: if you are sure, name all three and check the envelope.' },
    ],
  },

  tension: 'Each suggestion should be built to learn something new, without letting everyone else at the table learn as much as you do.',

  flow: [
    { label: 'Collect', items: ['Your dealt cards', 'Cards shown to you', 'Who couldn’t disprove'] },
    { label: 'Deduce', items: ['Cross off notes', 'Narrow 6 · 6 · 9', 'Test with suggestions'] },
    { label: 'Solve', items: ['Make an accusation', 'Check the envelope'] },
  ],

  end: {
    trigger: 'Someone makes a correct accusation',
    detail: 'A wrong accusation knocks you out of guessing, but you stay in to show cards. If everyone else is out, the last player wins.',
    results: [
      { side: 'Correct accusation', text: 'you win immediately.' },
      { side: 'Wrong accusation', text: 'put the cards back secretly; you can no longer move or win, but still disprove.' },
    ],
  },

  ref: {
    title: 'The 21 cards',
    rows: [
      ['Suspects (6)', 'Scarlet, Mustard, White/Orchid, Green, Peacock, Plum'],
      ['Weapons (6)', 'candlestick, dagger, lead pipe, revolver, rope, wrench'],
      ['Rooms (9)', 'kitchen, ballroom, conservatory, dining, billiard, library, lounge, hall, study'],
      ['Case file', '1 of each type, unseen'],
    ],
  },

  example: 'Priya moves into the **Library** and suggests “Colonel Mustard with the rope in the Library.” Tom, on her left, has none of those cards and says so. Lena has the rope and slips it to Priya face down, so Priya crosses off the rope and notes that Tom holds none of the three.',

  setup: [
    'Shuffle each type separately; put 1 suspect, 1 weapon and 1 room card **unseen** in the envelope.',
    'Shuffle the other 18 cards together and deal them all out (some players may get one more).',
    'Put weapons in rooms and suspects on their start spaces. Miss Scarlet goes first.',
  ],

  terms: [
    ['Suggestion', 'A test guess made in your current room. Others must disprove it if they can.'],
    ['Accusation', 'Your final answer. You check the envelope; one try only.'],
    ['Case file', 'The envelope with the 3 solution cards.'],
    ['Secret passage', 'Diagonal shortcut linking opposite corner rooms.'],
  ],

  gotchas: [
    'You may suggest cards **you hold yourself**, to bluff or to test the others.',
    'A suggestion must use the room **you are in**; an accusation can name any room.',
    'If your token is moved into a room by someone else’s suggestion, you may suggest there on your next turn without moving.',
  ],

  tips: [
    'Track **who showed what** and who passed: a pass rules out all three cards for that player.',
    'Head for rooms you still need to test, and use secret passages to save moves.',
    'Don’t accuse until all three are certain: a wrong guess ends your chance to win.',
  ],

  walk(A) {
    const C = A.C, PLUM = '#7d55b5', MUST = '#e2b33c';
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
    const rope = (x, y) => A.path(`M${x - 9} ${y} q4 -7 8 0 q4 7 8 0`, { stroke: '#a77b22', sw: 2.6 }) + A.circle(x + 9, y - 1, 2.6, 'none', { stroke: '#a77b22', sw: 1.8 });
    const priya = (x, y) => A.k('priya', A.pawn(x, y, 15, PLUM));
    const must = (x, y) => A.k('must', A.pawn(x, y, 15, MUST));
    const ropeT = (x, y) => A.k('rope', rope(x, y));
    const die = A.k('die', A.die(192, 116, 20, 5));
    const lenaRope = A.k('rope-card', BK(258, 72));
    const inLib = priya(20, 94) + must(42, 94) + ropeT(30, 108);
    const bub = A.k('bub', A.bubble(186, 4, 128, 22, 'Mustard + rope + Library?', { size: 7 }));
    return [
      { step: 0, say: 'Priya rolls a **5** and heads for the Library door.', svg: base + priya(62, 140) + must(150, 30) + ropeT(30, 170) + lenaRope + die + A.glow(58, 91, 12, 'g-door') },
      { step: 0, say: 'She enters the **Library**. A room ends her move.', svg: base + priya(26, 94) + must(150, 30) + ropeT(30, 170) + lenaRope + die },
      { step: 1, say: 'She suggests “**Colonel Mustard** with the **rope** in the Library.” His pawn and the rope are moved into the room.', svg: base + inLib + lenaRope + bub },
      { step: 2, say: 'Going left, **Tom** checks first: he has none of the three, so he says so.', svg: base + inLib + lenaRope + bub + A.k('tom-no', A.tag(296, 50, 'none', { fill: C.gray })) },
      { step: 2, say: '**Lena** holds the rope, so she shows it to Priya alone, face down to everyone else.', svg: base + inLib + bub + A.k('tom-no', A.tag(296, 50, 'none', { fill: C.gray })) +
        A.k('rope-card', A.card(196, 142, 32, 44, '#d9c49a', { label: 'Rope', size: 6, labelFill: C.ink })) },
      { step: 3, say: 'Priya crosses off the rope and notes Tom has none of the three. Not sure yet, so **no accusation**.', svg: base + inLib + A.k('tom-no', A.tag(296, 50, 'none', { fill: C.gray })) +
        A.k('rope-card', A.card(196, 142, 32, 44, '#d9c49a', { label: 'Rope', size: 6, labelFill: C.ink })) + A.k('x', A.text(247.5, 143, 'x', { size: 9, weight: 800, fill: C.red })) + A.glow(248, 143, 9, 'g-x') },
    ];
  },

  art(A) {
    const C = A.C;
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
    const sus = [[34, 36, '#c8423b'], [46, 30, '#7d55b5'], [178, 98, '#e2b33c'], [140, 96, '#3c8d4f'], [70, 104, '#2f6db5'], [30, 160, '#f4f1ea']];
    for (const [x, y, f] of sus) o += A.pawn(x, y, 15, f);
    // Weapon in the room (candlestick).
    o += A.path('M176 20 v14 M170 36 h12 M172 20 h8', { stroke: '#b38b2a', sw: 2.4 });
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
