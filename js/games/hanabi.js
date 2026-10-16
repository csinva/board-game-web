defineGame({
  id: 'hanabi',
  name: 'Hanabi',
  year: 2010,
  designer: 'Antoine Bauza',
  family: 'coop',
  players: [2, 5], best: '3–4',
  time: [20, 30],
  age: 8,
  mechanics: ['cooperative', 'limited-communication', 'hand-management', 'deduction', 'memory'],
  profile: { complexity: 1, luck: 3, interaction: 4, conflict: 1, talk: 2, planning: 3 },

  pitch: 'Hold your cards backwards: you see everyone’s hand but your own, and the team builds a fireworks show from careful, limited clues.',
  theme: 'You are clumsy fireworks makers who mixed up the powders and must put on the show anyway.',

  goal: { big: '25 points', text: 'Together, play each of the **5 colours** in order from 1 up to 5. Your score is the total of the top card in each colour; 25 is perfect.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, do exactly ONE of these:',
    steps: [
      { verb: 'Give a clue', text: 'Spend a clue token to point at **all** of one player’s cards of one colour, or of one number.' },
      { verb: 'Discard', text: 'Discard a card from your hand to win back 1 clue token, then draw.' },
      { verb: 'Play', text: 'Play a card to its colour’s pile. If it is not the **next number**, it is discarded and you lose a fuse token. Then draw.' },
    ],
  },

  tension: 'Clues are scarce, so every clue must say more than its words, and every discard might throw away a card you will never see again.',

  flow: [
    { label: 'Clue', items: ['8 clue tokens', 'Colour OR number', 'Point at every match'] },
    { label: 'Deduce', items: ['Remember your clues', 'Read why you got them', 'Track the discards'] },
    { label: 'Play', items: ['1 → 5 per colour', 'A 5 refunds a clue', 'Misplay = fuse'] },
  ],

  end: {
    trigger: 'the 3rd fuse burns, all five 5s are played, or the deck runs out',
    detail: 'When the last card is drawn, every player gets one more turn, then the show ends.',
    results: [
      { side: 'Show ends', text: 'Score the top card of each colour, 0 to 25. 25 is legendary; under 15 is a rough night.' },
      { side: 'Everyone loses', text: 'if the 3rd fuse token is lost: the fireworks explode and you score 0.' },
    ],
  },

  ref: {
    title: 'Each colour (10 cards)',
    rows: [
      ['1', '×3 copies'],
      ['2, 3, 4', '×2 copies each'],
      ['5', '×1 copy: never discard it'],
      ['Hand size', '5 cards (2–3 players), 4 cards (4–5)'],
    ],
  },

  example: 'Red is on 2. Lee spends a clue and tells Mia, “These two cards are **3s**.” Mia knows red 3 is wanted, guesses one is red because Lee chose to clue now, and plays it: it is the red 3. Ben has no safe play, so he discards his oldest card to get the clue token back.',

  setup: [
    'Shuffle the 50 cards. Put out 8 clue tokens and 3 fuse tokens.',
    'Deal 5 cards each with 2–3 players, 4 each with 4–5.',
    'Hold your hand facing **away** from you. Never look at it.',
  ],

  terms: [
    ['Clue token', 'Spent to give a clue, regained by discarding or completing a 5. Max 8.'],
    ['Fuse token', 'Lost on each misplay. Losing the 3rd ends the game.'],
    ['Critical card', 'The last surviving copy of a card, like any 5.'],
    ['Chop', 'Convention: your oldest unclued card, the one you discard first.'],
  ],

  gotchas: [
    'A clue must point at **every** matching card in that hand (“these two are blue”), and must touch at least one card.',
    'No hints by tone, faces or “are you sure?”. Only the clue itself is information.',
    'You **can’t discard** when all 8 clue tokens are available; you must clue or play.',
  ],

  tips: [
    'Clue cards that are playable **now** first; players tend to play what was just pointed at.',
    'Protect 5s and last copies: a quick number clue keeps them from being discarded.',
    'Discard your oldest unclued card, and keep newly clued cards in place so the table can track them.',
  ],

  art(A) {
    const C = A.C;
    const F = { r: '#e0473c', y: '#f2c230', g: '#3fae5a', b: '#3d7fe0', w: '#f4f1ea' };
    let o = A.bg('#1a1d3a');
    // sparkles / bursts
    const burst = (cx, cy, r, c) => { let s = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += A.line(cx + r * 0.35 * Math.cos(a), cy + r * 0.35 * Math.sin(a), cx + r * Math.cos(a), cy + r * Math.sin(a), { stroke: c, sw: 1.6, opacity: 0.7 }); } return s; };
    o += burst(28, 100, 15, F.y) + burst(298, 72, 13, F.r) + burst(40, 145, 10, F.b);
    // teammate's hand (visible faces)
    const hand = [['r', 3], ['b', 1], ['y', 5], ['g', 2]];
    hand.forEach(([c, n], i) => { o += A.card(150 + i * 32, 10, 28, 40, F[c], { label: n, labelFill: c === 'w' || c === 'y' ? C.ink : C.white, size: 17 }); });
    // played piles
    const piles = [['r', 2], ['y', 1], ['g', 3], ['b', 4], ['w', 0]];
    piles.forEach(([c, n], i) => {
      const x = 54 + i * 38, y = 70;
      if (n === 0) { o += A.rect(x, y, 30, 44, 'none', { stroke: F.w, dash: '3 3', sw: 1.2, rx: 4 }); return; }
      for (let k = 0; k < Math.min(n, 3); k++) o += A.rect(x + 1, y - 2 * k + 2 * (Math.min(n, 3) - 1), 30, 44, F[c], { rx: 4, sw: 1 });
      o += A.card(x, y - 4, 30, 44, F[c], { label: n, labelFill: c === 'y' ? C.ink : C.white, size: 18 });
    });
    // your hand: backs facing you
    for (let i = 0; i < 4; i++) {
      o += A.card(98 + i * 32, 140, 28, 40, '#3b3f6e', { label: '?', size: 16, labelFill: '#b8bce8' });
    }
    // tokens
    for (let i = 0; i < 8; i++) o += A.circle(272 + (i % 2) * 18, 138 + Math.floor(i / 2) * 15, 6.5, i < 5 ? '#4f8ff0' : '#2a2f55', { stroke: '#cfd8ff', sw: 1 });
    for (let i = 0; i < 3; i++) o += A.circle(32 + i * 18, 178, 7, i < 1 ? '#3a2020' : F.r, { stroke: '#ffd1c8', sw: 1 });
    o += A.note(151, 44, 70, 28, 'Teammate: you see it');
    o += A.note(158, 160, 248, 186, 'Your hand faces away');
    o += A.note(90, 108, 130, 128, 'Played piles, 1 → 5');
    o += A.note(281, 138, 282, 116, 'Clue tokens');
    return o;
  },
});
