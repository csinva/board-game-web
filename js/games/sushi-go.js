defineGame({
  id: 'sushi-go',
  name: 'Sushi Go!',
  year: 2013,
  designer: 'Phil Walker-Harding',
  family: 'cards',
  players: [2, 5], best: '4–5',
  time: [15, 20],
  age: 8,
  mechanics: ['drafting', 'set-collection', 'simultaneous', 'hand-management'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 2, talk: 2, planning: 2 },

  // Each dish drawn once: `food` is the dish alone (reused on the cards in art + walk), `draw` adds the card colour.
  icons: (() => {
    const F = {
      tempura: ['Tempura', '#9b74c9', A => A.path('M3.5 18 q4 -15 8.5 -10 q4.5 -5 8.5 10 z', { fill: '#e8b04a', sw: 1.2 })],
      sashimi: ['Sashimi', '#93c45e', A => A.rect(3, 9, 18, 9, '#f08a6a', { rx: 3, sw: 1.2 }) + A.line(8, 10.5, 6.5, 16.5, { stroke: '#fbe0d4', sw: 1.2 }) + A.line(13, 10.5, 11.5, 16.5, { stroke: '#fbe0d4', sw: 1.2 }) + A.line(18, 10.5, 16.5, 16.5, { stroke: '#fbe0d4', sw: 1.2 })],
      dumpling: ['Dumpling', '#4aa3d8', A => A.path('M2.5 18 q9.5 -17 19 0 z', { fill: '#fbf6ec', sw: 1.2 }) + A.path('M9 11 l1 3 M12 9.5 v3.5 M15 11 l-1 3', { sw: 0.9 })],
      maki: ['Maki roll', '#e0524a', A => A.circle(12, 13, 9, '#2b2b2b', { sw: 1.2 }) + A.circle(12, 13, 5.8, '#fbf6ec', { sw: 0 }) + A.circle(12, 13, 2.4, '#e85d3a', { sw: 0 })],
      egg: ['Egg Nigiri', '#f2c14e', A => A.rect(4, 13, 16, 7, '#fbf6ec', { rx: 3, sw: 1.2 }) + A.rect(3, 7.5, 18, 6.5, '#f6dc5a', { rx: 3, sw: 1.2 }) + A.rect(10, 7, 4, 13.5, '#2b2b2b', { rx: 0.5, sw: 0 })],
      salmon: ['Salmon Nigiri', '#f2c14e', A => A.rect(4, 13, 16, 7, '#fbf6ec', { rx: 3, sw: 1.2 }) + A.rect(3, 7.5, 18, 6.5, '#e85d3a', { rx: 3, sw: 1.2 })],
      squid: ['Squid Nigiri', '#f2c14e', A => A.rect(4, 13, 16, 7, '#fbf6ec', { rx: 3, sw: 1.2 }) + A.rect(3, 7.5, 18, 6.5, '#f4efe6', { rx: 3, sw: 1.2 }) + A.line(7, 10.7, 17, 10.7, { stroke: '#b8b0a2', sw: 1 })],
      wasabi: ['Wasabi', '#86b84a', A => A.path('M4.5 18 q7.5 -16 15 0 z', { fill: '#b7dc6a', sw: 1.2 })],
      chopsticks: ['Chopsticks', '#4fbfae', A => A.line(4, 20, 17, 5, { sw: 2.4, stroke: '#8a5a33' }) + A.line(8, 21, 20, 7, { sw: 2.4, stroke: '#8a5a33' })],
      pudding: ['Pudding', '#f19bb4', A => A.path('M5.5 20 l3 -12 h7 l3 12 z', { fill: '#f6d27a', sw: 1.2 }) + A.rect(8, 5, 8, 4, '#8a5a33', { rx: 2, sw: 0.9 })],
    };
    const o = {};
    for (const k in F) {
      const [name, fill, food] = F[k];
      o[k] = { name, food, draw: A => A.rect(1, 1, 22, 22, fill, { rx: 5, sw: 1.2 }) + A.use(food(A), 0.5, 0.5, 23) };
    }
    return o;
  })(),

  pitch: 'Pick one card, pass the rest; after 3 rounds, the most points from dish sets and combos wins.',

  goal: { big: 'Most points', text: 'Have the most points after **3 rounds**. Each kind of card scores differently (see Scoring); most score only in sets.' },

  turn: {
    type: 'simultaneous',
    intro: 'All players do each step at the same time:',
    steps: [
      { verb: 'Pick', text: 'Choose **1** card from your hand and place it face down in front of you.' },
      { verb: 'Reveal', text: 'Everyone turns their card face up at once. It stays in front of you, next to the cards you picked earlier this round.' },
      { verb: 'Pass', text: 'Hand the cards still in your hand to the player on your **left**.' },
    ],
    outro: 'Repeat with the hand you receive until all cards are played, then score the round.',
  },

  tension: 'You see which cards go to your neighbour, so each pick is a choice between finishing your own set and taking the card they need.',

  structure: [
    { label: 'Setup', text: 'Shuffle the deck. Deal 10 / 9 / 8 / 7 cards to each player for 2 / 3 / 4 / 5 players.' },
    { label: 'Rounds 1–3', repeat: '3 rounds', text: 'Pick, reveal, pass left, until every card is played.' },
    { label: 'End of each round', text: 'Each player scores the cards in front of them except {=pudding}, then discards those cards. Keep {=pudding} in front of you. Deal a new hand to each player.' },
    { label: 'Game end', text: 'After scoring round 3, score {=pudding}. The player with the most points wins.' },
  ],

  points: [
    ['{=tempura} Tempura', '5 for each pair (2 cards)'],
    ['{=sashimi} Sashimi', '10 for each set of 3 cards'],
    ['{=dumpling} Dumplings', '1 / 3 / 6 / 10 / 15 for 1 / 2 / 3 / 4 / 5 or more dumplings'],
    ['Nigiri', '{=egg} 1 · {=salmon} 2 · {=squid} 3; ×3 on a {=wasabi}'],
    ['{=maki} Maki', 'Each round: the player with the most rolls scores 6; second most scores 3. Tied players split the points (rounded down). If players tie for most, they split 6 and no one scores for second.'],
    ['{=pudding} Pudding', 'Game end: the player with the most puddings scores 6; the player with the fewest loses 6. Tied players split the points (rounded down). With 2 players, no one loses 6. If everyone has the same number, no one scores.'],
  ],

  end: { trigger: 'round 3 and {pudding} are scored', detail: 'Tie: the tied player with the most {=pudding} wins.' },
  scoring: [
    { label: '{=squid}{=wasabi} Nigiri + Wasabi', share: 3 },
    { label: '{=tempura}{=sashimi}{=dumpling} Sets', share: 4 },
    { label: '{=maki} Maki rolls', share: 2 },
    { label: '{=pudding} Pudding', share: 1 },
  ],

  example: 'You hold a {squid} and have an empty {wasabi} in front of you. Pick the Squid; when you reveal it, it goes on the Wasabi: 3 × 3 = **9 points**. Pass the rest left, including a {=tempura} that would complete your neighbour’s pair.',

  setup: [
    'Shuffle the whole deck.',
    'Deal cards face down to each player: 10 each with 2 players, 9 with 3, 8 with 4, 7 with 5.',
    'Keep score on paper. Deal a new hand of the same size at the start of each round.',
  ],

  terms: [
    ['Draft', 'Keep 1 card from a hand, then pass the rest of the hand on.'],
    ['{=wasabi} Wasabi', 'The next nigiri you play goes on top of it and scores triple. Each Wasabi holds 1 nigiri.'],
    ['{=chopsticks} Chopsticks', 'Once it is in front of you, on any later turn you may keep 2 cards from your hand instead of 1; then put the Chopsticks into the hand you pass on.'],
    ['{=maki} Maki', 'Each Maki card shows 1–3 rolls; count rolls, not cards.'],
  ],

  gotchas: [
    'Incomplete sets score **0**: a lone {=tempura} or {=sashimi}{=sashimi} is worth nothing.',
    '{wasabi} only boosts nigiri played **after** it; an empty Wasabi scores 0.',
    '{pudding} cards stay in front of you for all 3 rounds; every other card in front of you is discarded at the end of each round.',
  ],

  tips: [
    '{sashimi} is a gamble: start it only early in a round, with time to finish.',
    'Each {dumpling} adds more points than the last, up to the 5th, so they never go to waste.',
    'Before you pass, check what your left neighbour is collecting.',
  ],

  walk(A) {
    const C = A.C, I = this.icons, W = 34, H = 46;
    const D = {
      tempura: ['#9b74c9', 'Tempura'], dumpling: ['#4aa3d8', 'Dumpling'], maki: ['#e0524a', 'Maki'], squid: ['#f2c14e', 'Squid Nigiri'],
      salmon: ['#f2c14e', 'Salmon Nigiri'], wasabi: ['#86b84a', 'Wasabi'], pudding: ['#f19bb4', 'Pudding'], sashimi: ['#93c45e', 'Sashimi'], chop: ['#4fbfae', 'Chopsticks'],
    };
    const dish = (x, y, k) => {
      const [f, t] = D[k];
      let s = A.card(x, y, W, H, f, {}) + A.rect(x + 3, y + 3, W - 6, 10, C.white, { rx: 2, sw: 0, opacity: 0.9 }) + A.text(x + W / 2, y + 8, t, { size: Math.min(5.5, 46 / t.length), weight: 800 });
      const cx = x + W / 2, cy = y + H / 2 + 6;
      s += A.use(I[k === 'chop' ? 'chopsticks' : k].food(A), cx - 13, cy - 14, 26);
      return s;
    };
    const back = (x, y) => A.card(x, y, W, H, '#d9503f', {}) + A.circle(x + W / 2, y + H / 2, 8, '#fbf6ec', { sw: 1 }) + A.text(x + W / 2, y + H / 2, '?', { size: 6, weight: 800 });
    const KH = (i) => [146 + i * 12, 8], YH = (i) => [10 + i * 40, 144], MH = (i) => [236 + i * 12, 144];
    let base = A.bg('#f7e3cf') + A.rect(0, 0, 320, 62, '#efd3b6', { sw: 0, rx: 0 }) + A.line(0, 62, 320, 62, { stroke: '#c9a988', sw: 1 });
    base += A.tag(296, 50, 'Kai') + A.tag(296, 92, 'You') + A.tag(296, 132, 'Mo');
    base += dish(10, 8, 'tempura') + dish(48, 8, 'maki') + dish(10, 70, 'wasabi') + dish(48, 70, 'dumpling');
    const kaiHand = [0, 1, 2].map(i => A.k('k' + i, back(...KH(i)))).join('');
    const moHand = [0, 1, 2].map(i => A.k('m' + i, back(...MH(i)))).join('');
    const rest = (pos) => A.k('tem', dish(...pos(0), 'tempura')) + A.k('mak', dish(...pos(1), 'maki')) + A.k('pud', dish(...pos(2), 'pudding'));
    const YR = (i) => YH(i + 1), KR = (i) => [96 + i * 40, 8];
    const squidOn = A.k('squid', dish(14, 86, 'squid'));
    return [
      { step: 0, say: 'You hold Squid Nigiri, Tempura, Maki and Pudding. An empty **Wasabi** sits in front of you.', svg: base + kaiHand + moHand + A.k('mp', back(...MH(3))) +
        A.k('kp', back(...KH(3))) + A.k('squid', dish(...YH(0), 'squid')) + rest(YR) + A.glow(27, 167, 26, 'g1') + A.glow(27, 93, 26, 'g2') },
      { step: 0, say: 'Everyone places 1 card face down at the same time. You pick the **Squid**.', svg: base + kaiHand + moHand +
        A.k('kp', back(96, 8)) + A.k('squid', back(96, 70)) + rest(YR) },
      { step: 1, say: 'Reveal. {=squid} on {=wasabi}: 3 × 3 = **9 points**. Kai revealed a Dumpling.', svg: base + kaiHand + moHand +
        A.k('kp', dish(96, 8, 'dumpling')) + squidOn + rest(YR) + A.k('pts', A.bubble(60, 104, 66, 24, '3 × 3 = 9', { size: 9 })) },
      { step: 2, say: 'Pass the rest **left** to Kai (top), including a {=tempura} that would complete Kai’s pair.', svg: base + moHand +
        A.k('kp', dish(96, 8, 'dumpling')) + squidOn + A.k('tem', dish(146, 8, 'tempura')) + A.k('mak', dish(184, 8, 'maki')) + A.k('pud', dish(222, 8, 'pudding')) +
        A.glow(27, 31, 24, 'g3') + A.glow(163, 31, 24, 'g4') },
      { step: 2, say: 'Mo, on your right, passes you 3 cards. Pick again: {=salmon} now scores only 2, since your Wasabi is used.', svg: base +
        A.k('kp', dish(96, 8, 'dumpling')) + squidOn + A.k('tem', dish(146, 8, 'tempura')) + A.k('mak', dish(184, 8, 'maki')) + A.k('pud', dish(222, 8, 'pudding')) +
        A.k('m0', dish(...YH(0), 'salmon')) + A.k('m1', dish(...YH(1), 'sashimi')) + A.k('m2', dish(...YH(2), 'chop')) },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
    let o = A.bg('#f7e3cf');
    // conveyor belt
    o += A.rect(-4, 10, 328, 74, '#5b5f6b', { rx: 0, sw: 0 });
    o += A.rect(-4, 16, 328, 62, '#7d8290', { rx: 0, sw: 0 });
    for (let x = 4; x < 320; x += 24) o += A.line(x, 16, x, 78, { stroke: '#6b707d', sw: 1.4 });
    const D = {
      tempura: ['#9b74c9', 'Tempura'], sashimi: ['#93c45e', 'Sashimi'], dumpling: ['#4aa3d8', 'Dumpling'], maki: ['#e0524a', 'Maki'],
      nigiri: ['#f2c14e', 'Nigiri'], wasabi: ['#86b84a', 'Wasabi'], pudding: ['#f19bb4', 'Pudding'], chop: ['#4fbfae', 'Chopsticks'],
    };
    const dish = (x, y, k, w, h) => {
      const [f, t] = D[k];
      let s = A.card(x, y, w, h, f, { title: t });
      const cx = x + w / 2, cy = y + h / 2 + 6;
      s += A.use(I[{ nigiri: 'salmon', chop: 'chopsticks' }[k] || k].food(A), cx - 14, cy - 15, 28);
      return s;
    };
    // hand passing along the belt
    ['maki', 'nigiri', 'tempura', 'dumpling', 'sashimi', 'pudding', 'chop'].forEach((k, i) => { o += dish(14 + i * 43, 22, k, 38, 52); });
    o += A.arrow(300, 96, 250, 96, { sw: 2.2, stroke: '#5b5f6b' });
    // your tableau
    o += A.rect(8, 112, 304, 82, '#e8c9a8', { rx: 8, sw: 1.2 });
    const mine = [['tempura', 18], ['tempura', 30], ['wasabi', 80], ['nigiri', 100], ['dumpling', 150], ['dumpling', 162], ['dumpling', 174], ['pudding', 238]];
    for (const [k, x] of mine) o += dish(x, 124, k, 40, 56);
    o += A.note(110, 48, 160, 96, 'Pick 1, pass the rest', { w: 126 });
    o += A.note(40, 150, 40, 106, 'Pair = 5', { w: 56 });
    o += A.note(116, 160, 106, 194, 'Wasabi ×3 Nigiri', { w: 104 });
    o += A.note(258, 160, 280, 194, 'Kept till game end', { w: 110 });
    return o;
  },
});
