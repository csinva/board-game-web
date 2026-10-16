defineGame({
  id: '7-wonders',
  name: '7 Wonders',
  year: 2010,
  designer: 'Antoine Bauza',
  family: 'cards',
  players: [3, 7], best: '4–5',
  time: [30, 40],
  age: 10,
  mechanics: ['drafting', 'simultaneous', 'set-collection', 'tableau', 'engine-building', 'resource-management'],
  profile: { complexity: 2, luck: 2, interaction: 3, conflict: 2, talk: 2, planning: 3 },

  pitch: 'Everyone picks a card at the same time and passes the rest; over three ages, grow an ancient city with the cards you keep.',
  theme: 'You lead an ancient city, raising its economy, army, science and great Wonder.',

  goal: { big: 'Most points', text: 'After three Ages, the player with the **most points** wins. Points come from seven sources: military, coins, Wonder, civic buildings, science, commerce and guilds.' },

  turn: {
    type: 'simultaneous',
    intro: 'Everyone does this at the same time:',
    steps: [
      { verb: 'Pick', text: 'Choose **one** card from your hand and place it face-down.' },
      { verb: 'Reveal', text: 'Everyone reveals and either **builds** it (pay its cost), uses it to build a **Wonder stage**, or discards it for **3 coins**.' },
      { verb: 'Pass', text: 'Pass the rest of your hand to your neighbour: **left** in Ages I and III, **right** in Age II.' },
    ],
    outro: 'Repeat until 1 card remains, which is discarded. Then resolve military and start the next Age.',
  },

  tension: 'Each pick is a card you want versus a card you must deny your neighbour, and you only get 18 picks in the whole game, so you can’t chase every colour.',

  flow: [
    { label: 'Produce', items: ['Brown: raw materials', 'Gray: manufactured goods', 'Buy from neighbours: 2 coins'] },
    { label: 'Build', items: ['Blue: civic points', 'Green: science', 'Yellow: commerce', 'Red: shields', 'Wonder stages'] },
    { label: 'Score', items: ['Military tokens', 'Coins (1 per 3)', 'Science sets', 'Guilds (Age III)'] },
  ],

  end: { trigger: 'Age III has been played and its military resolved', detail: 'Add up all seven categories on the score pad. Ties go to the player with more coins.' },
  scoring: [
    { label: 'Civic (blue)', share: 3 },
    { label: 'Science', share: 2 },
    { label: 'Military', share: 1.5 },
    { label: 'Wonder', share: 1.5 },
    { label: 'Commerce & guilds', share: 1.5 },
    { label: 'Coins', share: 0.5 },
  ],

  ref: {
    title: 'Military & science',
    rows: [
      ['Win a battle', '+1 / +3 / +5 in Age I / II / III'],
      ['Lose a battle', '−1 point'],
      ['Science: same symbol', 'count² (2 tablets = 4)'],
      ['Science: set of 3 kinds', '+7 per set'],
      ['Buying a resource', '2 coins to a neighbour'],
    ],
  },

  example: 'In Age II you pick a **Laboratory** (green, costs 2 clay + papyrus). You built a Workshop in Age I, which **chains** to it, so you build it for free and gain a second gear symbol. You pass the rest of your hand to the **right**, as Age II requires.',

  setup: [
    'Each player takes a random Wonder board and 3 coins.',
    'Use only the cards marked for your player count in each Age deck (add guilds to Age III: players + 2).',
    'Deal 7 Age I cards to everyone.',
  ],

  terms: [
    ['Age', 'One of three rounds; each deals 7 cards per player.'],
    ['Wonder stage', 'Tuck a card under your board and pay the stage cost for its bonus.'],
    ['Chain', 'A card that’s free to build because you own a named earlier card.'],
    ['Neighbours', 'The players to your left and right: you trade and fight only with them.'],
    ['Shields', 'Red-card symbols; more than a neighbour wins that battle.'],
  ],

  gotchas: [
    'You can buy resources **only from your two neighbours**, and only what their brown/gray cards (and Wonder) produce.',
    'You can’t build **two identical** cards (same name) in your city.',
    'Coins spent trading are kept by the neighbour, and buying doesn’t take the resource away from them.',
  ],

  tips: [
    'Secure brown and gray resources in Age I; buying everything later drains your coins.',
    'Watch what your neighbours are collecting and discard (or build) the card they need.',
    'Science scales fast if you commit, but someone at the table will try to hate-draft it.',
  ],

  walk(A) {
    const C = A.C;
    const col = { brown: '#8a5a33', gray: '#8c877f', green: '#3c8d4f', blue: '#2f6db5', yellow: '#e2b33c', red: '#c8423b' };
    const gear = (x, y, f) => A.circle(x, y, 3.4, 'none', { stroke: f, sw: 2, dash: '1.5 1.1' }) + A.circle(x, y, 1.2, f, { sw: 0 });
    const big = (x, y, c, name, g) => {
      let s = A.card(x, y, 36, 50, col[c], {}) + A.rect(x + 3, y + 3, 30, 10, C.white, { rx: 2, sw: 0, opacity: 0.9 }) +
        A.text(x + 18, y + 8, name, { size: Math.min(5.5, 46 / name.length), weight: 800 });
      if (g) s += A.circle(x + 18, y + 31, 7, C.paper, { sw: 1 }) + gear(x + 18, y + 31, C.ink);
      return s;
    };
    const back = (x, y) => A.card(x, y, 30, 42, '#b99766', {}) + A.text(x + 15, y + 21, 'II', { size: 6, weight: 800, fill: C.white });
    const strip = (x, y, c, name, g, w = 34) => A.rect(x, y, w, 15, col[c], { rx: 2, sw: 1 }) +
      (name ? A.text(x + w / 2, y + 7.5, name, { size: Math.min(4.8, 50 / name.length), weight: 700, fill: C.white }) : '');
    const gears = (n) => A.circle(170, 146, 6, C.paper, { sw: 1 }) + gear(170, 146, C.ink) + A.text(185, 146, '×' + n, { size: 8, weight: 800 });
    const H = (i) => [82 + i * 40, 12], PICK = [142, 66];
    const LH = (i) => [8 + i * 7, 24], RH = (i) => [258 + i * 7, 24], LP = [20, 74], RP = [270, 74];
    let base = A.bg('#e4d3a8');
    base += A.rect(78, 132, 164, 64, '#b99766', { rx: 4, sw: 1.2 }) + A.rect(4, 132, 68, 64, '#b99766', { rx: 4, sw: 1.2 }) + A.rect(248, 132, 68, 64, '#b99766', { rx: 4, sw: 1.2 });
    base += A.tag(38, 10, 'Left') + A.tag(282, 10, 'Right') + A.tag(104, 124, 'You');
    base += A.rect(PICK[0] - 3, PICK[1] - 3, 42, 56, 'none', { rx: 5, sw: 1, dash: '3 2' });
    base += strip(84, 175, 'brown', 'Lumber Yard') + strip(84, 158, 'brown', 'Clay Pool') + strip(122, 175, 'gray', 'Press') + strip(160, 175, 'green', 'Workshop', 1) + strip(198, 175, 'blue', 'Baths');
    base += strip(8, 175, 'brown', '', 0, 28) + strip(38, 175, 'gray', '', 0, 28) + strip(8, 158, 'blue', '', 0, 28);
    base += strip(252, 175, 'brown', '', 0, 28) + strip(282, 175, 'yellow', '', 0, 28) + strip(252, 158, 'green', '', 0, 28);
    const mine = [['aq', 'blue', 'Aqueduct'], ['car', 'yellow', 'Caravansery'], ['sta', 'red', 'Stables']];
    const left3 = (pos) => [0, 1, 2].map(i => A.k('l' + i, back(...pos(i)))).join('');
    const right3 = (pos) => [0, 1, 2].map(i => A.k('r' + i, back(...pos(i)))).join('');
    const myRest = mine.map(([k, c, n], i) => A.k(k, big(...H(i + 1), c, n))).join('');
    const lab = (svg) => A.k('lab', svg);
    return [
      { step: 0, say: 'Age II. Everyone looks at their hand at the same time. Yours has 4 cards left.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', back(...LH(3))) + A.k('rp', back(...RH(3))) + lab(big(...H(0), 'green', 'Laboratory', 1)) + myRest + gears(1) },
      { step: 0, say: 'Everyone picks **one** card and lays it face-down. You choose the **Laboratory**.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', back(...LP)) + A.k('rp', back(...RP)) + lab(back(PICK[0] + 3, PICK[1] + 4)) + myRest + gears(1) },
      { step: 1, say: 'Reveal. Laboratory costs 2 clay + papyrus, but your **Workshop** chains to it, so you build it **free**.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', big(LP[0] - 3, LP[1] - 4, 'red', 'Walls')) + A.k('rp', big(RP[0] - 3, RP[1] - 4, 'green', 'School', 1)) + lab(big(...PICK, 'green', 'Laboratory', 1)) + myRest +
        A.curve(196, 180, 222, 140, 182, 110, { sw: 1.6 }) + A.text(222, 124, 'chain', { size: 8, weight: 800 }) + A.glow(177, 182, 16, 'g-ws') + gears(1) },
      { step: 1, say: 'Each card joins its owner’s city. Your green column now shows **2 gears** for science.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', strip(38, 141, 'red', '', 0, 28)) + A.k('rp', strip(282, 141, 'green', '', 0, 28)) + lab(strip(160, 158, 'green', 'Laboratory', 1)) + myRest + gears(2) + A.glow(176, 146, 14, 'g-gear') },
      { step: 2, say: 'Age II passes **right**: your 3 cards go to your right neighbour, and your left neighbour’s 3 come to you.', svg: base +
        A.k('lp', strip(38, 141, 'red', '', 0, 28)) + A.k('rp', strip(282, 141, 'green', '', 0, 28)) + lab(strip(160, 158, 'green', 'Laboratory', 1)) +
        mine.map(([k], i) => A.k(k, back(...RH(i)))).join('') +
        [['yellow', 'Forum'], ['green', 'Library'], ['blue', 'Temple']].map(([c, n], i) => A.k('l' + i, big(...H(i), c, n))).join('') +
        gears(2) + A.arrow(200, 70, 246, 70, { sw: 2 }) + A.arrow(74, 50, 92, 66, { sw: 2 }) },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#e4d3a8');
    // wonder board
    o += A.rect(14, 148, 196, 44, '#b99766', { rx: 4, sw: 1.4 });
    o += A.poly([[70, 168], [86, 152], [102, 168]], '#d8c08e', { sw: 1 }) + A.rect(64, 168, 44, 6, '#d8c08e', { sw: 1, rx: 1 });
    o += A.rect(26, 162, 24, 18, '#8a5a33', { rx: 2, sw: 1 });
    for (let i = 0; i < 3; i++) o += A.rect(122 + i * 28, 160, 26, 16, i === 0 ? '#d8c08e' : 'rgba(255,255,255,.3)', { rx: 2, sw: 1, dash: i === 0 ? undefined : '2 2' });
    o += A.rect(124, 154, 22, 8, '#8c877f', { rx: 1, sw: 0.8 });
    // built city: columns of tucked cards by colour
    const cols = [['#8a5a33', 3], ['#8c877f', 2], ['#e2b33c', 1], ['#c8423b', 2], ['#2f6db5', 3], ['#3c8d4f', 2]];
    cols.forEach(([f, n], i) => {
      const x = 14 + i * 35;
      for (let k = 0; k < n; k++) o += A.card(x, 136 - (n - k) * 22 - 16, 32, 46, f, {});
    });
    // coins and war tokens
    o += A.circle(244, 128, 9, '#e2b33c', { sw: 1.2 }) + A.text(244, 128.5, '3', { size: 9, weight: 800 });
    o += A.circle(258, 140, 9, '#e2b33c', { sw: 1.2 }) + A.text(258, 140.5, '1', { size: 9, weight: 800 });
    o += A.circle(252, 116, 8, '#c4c8cc', { sw: 1.2 }) + A.text(252, 116.5, '1', { size: 8, weight: 800 });
    o += A.rect(280, 112, 26, 14, '#c8423b', { rx: 3, sw: 1.2 }) + A.text(293, 119, '+3', { size: 9, weight: 800, fill: C.white });
    o += A.rect(280, 132, 26, 14, '#8c877f', { rx: 3, sw: 1.2 }) + A.text(293, 139, '−1', { size: 9, weight: 800, fill: C.white });
    // hand being passed
    o += A.fan(276, 50, 4, 28, 40, ['#3c8d4f', '#2f6db5', '#8a5a33', '#7d55b5'], { spread: 7, dx: 14 });
    o += A.curve(244, 84, 232, 100, 220, 98, { sw: 1.6 });
    o += A.note(30, 62, 64, 22, 'City grows by colour', { w: 122 });
    o += A.note(250, 44, 194, 22, 'Pick 1, pass the rest', { w: 124 });
    o += A.note(164, 174, 160, 194, 'Wonder stages', { w: 84 });
    o += A.note(268, 146, 266, 182, 'Coins & military', { w: 100 });
    return o;
  },
});
