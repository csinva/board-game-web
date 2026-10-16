defineGame({
  id: 'hearts',
  name: 'Hearts',
  year: 1880,
  designer: 'Traditional',
  family: 'trick',
  players: [3, 6], best: '4',
  time: [30, 60],
  age: 10,
  mechanics: ['trick-taking', 'hand-management', 'take-that', 'press-your-luck'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 4, talk: 2, planning: 2 },

  pitch: 'Dodge every heart and the deadly Queen of Spades, unless you dare to take them all and shoot the moon.',
  theme: 'You are a card player at a four-way table where every point is bad, so you dump trouble on your neighbours.',

  goal: { big: 'Fewest points', text: 'Avoid winning tricks that contain **hearts** (1 point each) or the **Queen of Spades** (13). Lowest total when the game ends wins.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'Deal the whole deck: **13 cards** each with 4 players.' },
      { verb: 'Pass', text: 'Everyone passes **3 cards** at once: left, then right, then across, then hold (no pass), repeating.' },
      { verb: 'Play tricks', text: 'The **2♣** leads the first trick. Follow suit if you can; the highest card of the suit led wins and leads next.' },
      { verb: 'Score', text: 'Count the hearts and the Q♠ in the tricks you took and add them to your total.' },
    ],
  },

  tension: 'Your high cards are liabilities that can catch the Queen of Spades, but if you dump all of them you lose the power to stop someone shooting the moon.',

  flow: [
    { label: 'Pass', items: ['Pass 3 dangerous cards', 'Empty a suit', 'Every 4th hand: hold'] },
    { label: 'Duck', items: ['Follow suit low', 'Discard when void', 'Hearts get broken'] },
    { label: 'Score', items: ['1 per heart', '13 for the Q♠', 'Moon: others +26'] },
  ],

  end: {
    trigger: 'someone reaches 100 points at the end of a hand',
    results: [
      { side: 'Lowest score wins', text: 'the player with the **fewest** penalty points when anyone hits 100.' },
    ],
  },

  ref: {
    title: 'Penalty points',
    rows: [
      ['Each heart', '1 point (13 in the deck)'],
      ['Queen of spades', '13 points'],
      ['Shoot the moon', 'take all 26: you score 0, everyone else +26'],
      ['Passing cycle', 'left → right → across → hold'],
      ['First lead', 'whoever holds the 2♣'],
    ],
  },

  example: 'It’s a pass-left hand, so Maya passes her **A♠, K♠** and 10♥ to Ben. Later Ben leads the 4♦; Maya has no diamonds and dumps the **Q♠**. Lee’s K♦ is the highest diamond, so Lee takes the trick and 13 points.',

  setup: [
    'Use a standard 52-card deck; with 4 players deal all of it, 13 each (with 3 or 5, remove a 2 or two so it divides evenly).',
    'Agree the pass direction for the first hand (left) and rotate it each hand.',
    'Keep a running score for each player on paper.',
  ],

  terms: [
    ['Trick', 'One card from each player; the highest card of the suit led takes all four.'],
    ['Follow suit', 'Play a card of the suit that was led. Required if you have one.'],
    ['Void', 'Having no cards of a suit, so you can discard anything on it.'],
    ['Breaking hearts', 'The first time a heart is discarded; only then may hearts be led.'],
    ['Shoot the moon', 'Take every heart and the Q♠: the 26 points go to everyone else.'],
  ],

  gotchas: [
    'You can’t **lead** a heart until hearts are broken, unless your hand is all hearts.',
    'On the **first trick** most tables ban hearts and the Q♠, even if you are void in clubs.',
    'Choose your 3 pass cards **before** you see what you receive.',
  ],

  tips: [
    'Pass the A♠ and K♠ unless you hold several low spades to guard them: they catch the Queen.',
    'Pass away a short suit to make yourself **void**, so you can dump the Q♠ and hearts early.',
    'If one player is quietly taking every heart, win one heart trick yourself to stop the moon shot.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', W = 30, H = 42;
    const face = (x, y, r, s) => {
      const col = (s === '♥' || s === '♦') ? R : C.ink;
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fffdf7', { rx: 4, sw: 1.2 }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: col }) + A.text(x + W / 2 + 1, y + H / 2 + 4, s, { size: 18, fill: col });
    };
    const back = (x, y, w = 22, h = 30) => A.rect(x, y, w, h, '#7a2638', { rx: 3, sw: 1.1, stroke: '#f3e6e0' }) + A.rect(x + 3, y + 3, w - 6, h - 6, 'none', { rx: 2, sw: 0.6, stroke: '#e3a9b4' });
    let board = A.bg('#1f4f36') + A.rect(5, 5, 310, 190, '#2e6e4b', { rx: 24, sw: 0 });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 64, 22, 30) + back(270 + i * 6, 64, 22, 30) + back(118 + i * 8, 10, 22, 30);
    board += A.tag(42, 52, 'Ben') + A.tag(282, 52, 'Jo') + A.tag(76, 24, 'Lee') + A.tag(42, 176, 'You (Maya)');
    const hand = { AS: ['A', '♠'], KS: ['K', '♠'], QS: ['Q', '♠'], TH: ['10', '♥'], C3: ['3', '♣'], C8: ['8', '♣'] };
    const mine = (ids) => ids.map((id, i) => A.k(id, face(96 + i * 34, 150, ...hand[id]))).join('');
    const passed = A.k('AS', face(10, 100, 'A', '♠')) + A.k('KS', face(28, 103, 'K', '♠')) + A.k('TH', face(46, 106, '10', '♥'));
    const left = ['QS', 'C3', 'C8'];
    const ben = A.k('D4', face(104, 80, '4', '♦')), lee = A.k('DK', face(145, 46, 'K', '♦')), jo = A.k('D7', face(186, 80, '7', '♦'));
    const queen = A.k('QS', face(145, 98, 'Q', '♠'));
    const pile = (x, y) => A.k('D4', face(x, y, '4', '♦')) + A.k('D7', face(x + 6, y + 2, '7', '♦')) + A.k('QS', face(x + 12, y + 4, 'Q', '♠')) + A.k('DK', face(x + 18, y + 6, 'K', '♦'));
    return [
      { step: 0, say: 'Deal 13 cards each. Maya looks at her hand: the **A♠ and K♠** could catch the Queen of Spades.', svg: board + mine(['AS', 'KS', 'QS', 'TH', 'C3', 'C8']) + A.glow(129, 171, 34) },
      { step: 1, say: 'It’s a pass-**left** hand, so Maya slides A♠, K♠ and 10♥ face down to Ben, and gets 3 cards from Jo.', svg: board + mine(left) + passed + A.glow(43, 125, 32) },
      { step: 2, say: 'Ben leads the **4♦**. Lee plays the K♦ and Jo the 7♦: everyone follows suit.', svg: board + mine(left) + passed + ben + lee + jo },
      { step: 2, say: 'Maya has **no diamonds**, so she may play anything. She dumps the **Q♠**.', svg: board + A.k('C3', face(130, 150, '3', '♣')) + A.k('C8', face(164, 150, '8', '♣')) + passed + ben + lee + jo + queen + A.glow(160, 119, 28) },
      { step: 2, say: 'The K♦ is the highest card of the suit led, so **Lee** takes the trick, Queen and all, and leads next.', svg: board + A.k('C3', face(130, 150, '3', '♣')) + A.k('C8', face(164, 150, '8', '♣')) + passed + pile(200, 30) + A.glow(225, 55, 34) },
      { step: 3, say: 'At the end of the hand Lee scores **13** for the Queen plus 1 per heart he took. Lowest total wins.', svg: board + A.k('C3', face(130, 150, '3', '♣')) + A.k('C8', face(164, 150, '8', '♣')) + passed + pile(200, 30) +
        A.k('score', A.rect(112, 76, 96, 40, '#fbf6ec', { rx: 4, sw: 1.2 }) + A.text(160, 89, 'Lee', { size: 10, weight: 800 }) + A.text(160, 104, '+13', { size: 14, weight: 800, fill: R })) },
    ];
  },

  art(A) {
    const C = A.C, R = '#c8423b', back = '#7a2638';
    const pc = (x, y, r, s, o = {}) => {
      const w = o.w || 22, h = o.h || 31, col = (s === '♥' || s === '♦') ? R : C.ink;
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#fffdf7', { rx: 3, sw: 1 }) +
        A.text(x + 6, y + 7, r, { size: 8, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 3, s, { size: 13, fill: col });
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const bk = (x, y, w, h) => A.rect(x, y, w, h, back, { rx: 2.5, sw: 1, stroke: '#f3e6e0' }) + A.rect(x + 2.5, y + 2.5, w - 5, h - 5, 'none', { rx: 1.5, sw: 0.6, stroke: '#e3a9b4' });
    let o = A.bg('#1f4f36') + A.rect(5, 5, 310, 190, '#2e6e4b', { rx: 24, sw: 0 });
    // score pad
    o += A.group(A.rect(12, 12, 70, 50, '#fbf6ec', { rx: 2, sw: 1 }) + A.line(12, 24, 82, 24, { sw: 0.7 }) +
      ['M', 'B', 'L', 'J'].map((n, i) => A.text(21 + i * 17, 18, n, { size: 7, weight: 800 })).join('') +
      [[3, 13, 0, 10], [9, 16, 26, 11]].map((row, j) => row.map((v, i) => A.text(21 + i * 17, 32 + j * 11, v, { size: 7, fill: '#555' })).join('')).join('') +
      A.line(14, 54, 80, 54, { sw: 0.5, stroke: '#aaa' }), 'rotate(-4 47 37)');
    // other hands (backs)
    for (let i = 0; i < 7; i++) o += bk(122 + i * 11, 10, 16, 23);
    for (let i = 0; i < 5; i++) o += bk(12, 94 + i * 10, 23, 16);
    for (let i = 0; i < 5; i++) o += bk(285, 40 + i * 10, 23, 16);
    // trick in the centre
    o += pc(148, 44, '10', '♦', { rot: -3 }) + pc(117, 76, '4', '♦', { rot: -8 }) + pc(179, 76, 'Q', '♠', { rot: 7 }) + pc(148, 106, 'K', '♦', { rot: 2 });
    // my hand
    const hand = [['3', '♣'], ['7', '♣'], ['J', '♣'], ['2', '♥'], ['9', '♥'], ['5', '♠'], ['8', '♠']];
    hand.forEach(([r, s], i) => { o += pc(94 + i * 19, 150 + Math.abs(i - 3) * 1.5, r, s, { rot: (i - 3) * 3 }); });
    // taken tricks with hearts
    o += bk(246, 146, 22, 31) + bk(249, 143, 22, 31) + pc(262, 146, '6', '♥', { rot: 12 }) + pc(276, 150, 'A', '♥', { rot: 22 });
    // pass arrow
    o += A.curve(92, 168, 56, 176, 40, 150, { sw: 1.6, stroke: '#f6efdc' });
    o += A.note(192, 92, 252, 124, 'Queen of spades = 13');
    o += A.note(274, 160, 252, 190, 'Each heart = 1 point');
    o += A.note(48, 46, 58, 78, 'Lowest total wins');
    o += A.note(62, 174, 50, 190, 'Pass 3, then play');
    return o;
  },
});
