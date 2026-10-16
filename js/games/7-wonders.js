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

  // Components drawn once, used inline in text ({=green}, {gear}) and in the art + walkthrough.
  icons: (() => {
    const card = (name, fill) => ({ name, draw: A => A.rect(5, 1, 14, 22, fill, { rx: 2.5, sw: 1.3 }) + A.rect(7.5, 3.5, 9, 4.5, '#fff', { rx: 1, sw: 0, opacity: 0.8 }) });
    const sci = (name, inner) => ({ name, draw: A => A.circle(12, 12, 11, '#d6ead8', { sw: 1.1, stroke: '#3c8d4f' }) + inner(A) });
    const token = (name, fill, label) => ({ name, draw: A => A.rect(1.5, 5, 21, 14, fill, { rx: 3, sw: 1.3 }) + A.text(12, 12.4, label, { size: 10.5, weight: 800, fill: '#fff' }) });
    return {
      brown: card('brown card', '#8a5a33'),
      gray: card('gray card', '#8c877f'),
      blue: card('blue card', '#2f6db5'),
      yellow: card('yellow card', '#e2b33c'),
      red: card('red card', '#c8423b'),
      green: card('green card', '#3c8d4f'),
      purple: card('purple card', '#7d55b5'),
      wood: { name: 'wood', draw: A => A.rect(1.5, 7, 17, 10, '#8a5a33', { rx: 2, sw: 1.2 }) + A.circle(18, 12, 5, '#d4a56a', { sw: 1.2 }) + A.circle(18, 12, 2.2, 'none', { sw: 0.9, stroke: '#8a5a33' }) },
      stone: { name: 'stone', draw: A => A.poly([[2, 21], [4, 13], [11, 11], [12.5, 21]], '#a9a49b', { sw: 1.1 }) + A.poly([[11.5, 21], [13, 12], [20, 10.5], [22, 21]], '#8c877f', { sw: 1.1 }) + A.poly([[6.5, 12], [9.5, 4], [16, 3], [17.5, 11]], '#c9c4ba', { sw: 1.1 }) },
      clay: { name: 'clay', draw: A => A.rect(2, 5, 9.5, 6.5, '#c8653a', { rx: 1, sw: 1.1 }) + A.rect(12.5, 5, 9.5, 6.5, '#c8653a', { rx: 1, sw: 1.1 }) + A.rect(7.2, 13, 9.5, 6.5, '#c8653a', { rx: 1, sw: 1.1 }) },
      ore: { name: 'ore', draw: A => A.poly([[2, 20], [7, 7], [11.5, 13], [15.5, 4], [22, 20]], '#5d6168', { sw: 1.2 }) + A.poly([[11.5, 13], [15.5, 4], [17.2, 10.5]], '#a8adb4', { sw: 0 }) },
      glass: { name: 'glass', draw: A => A.path('M9 2.5 h6 v6 l4.5 8.5 q1.5 4.5 -3 4.5 h-9 q-4.5 0 -3 -4.5 l4.5 -8.5 z', { fill: '#a8daea', sw: 1.2 }) + A.line(9, 15, 15, 15, { stroke: '#fff', sw: 1.4 }) },
      loom: { name: 'loom (cloth)', draw: A => A.rect(3, 4, 18, 16, '#9b6fc4', { rx: 2, sw: 1.2 }) + A.line(3.5, 9.5, 20.5, 9.5, { stroke: '#d9c5ef', sw: 1.4 }) + A.line(3.5, 14.5, 20.5, 14.5, { stroke: '#d9c5ef', sw: 1.4 }) },
      papyrus: { name: 'papyrus', draw: A => A.rect(5, 5, 14, 14, '#f3e7c0', { rx: 0, sw: 1.1 }) + A.rect(3, 2.5, 18, 4, '#d8c08e', { rx: 2, sw: 1.1 }) + A.rect(3, 17.5, 18, 4, '#d8c08e', { rx: 2, sw: 1.1 }) + A.line(8, 10, 16, 10, { sw: 1 }) + A.line(8, 13.5, 14, 13.5, { sw: 1 }) },
      shield: { name: 'shield', draw: A => A.path('M12 2 l9 3 v7 q0 7 -9 10 q-9 -3 -9 -10 v-7 z', { fill: '#c8423b', sw: 1.3 }) + A.circle(12, 11, 3, '#e6e2da', { sw: 1 }) },
      compass: sci('compass', A => A.path('M12 6 L7 19 M12 6 L17 19 M8.6 15 Q12 17 15.4 15', { sw: 1.8 }) + A.circle(12, 5, 1.8, '#2a2420', { sw: 0 })),
      gear: sci('gear', A => [0, 1, 2, 3, 4, 5, 6, 7].map(i => A.group(A.rect(10.6, 3.4, 2.8, 4, '#2a2420', { rx: 0.5, sw: 0 }), `rotate(${i * 45} 12 12)`)).join('') + A.circle(12, 12, 5.3, '#2a2420', { sw: 0 }) + A.circle(12, 12, 2, '#d6ead8', { sw: 0 })),
      tablet: sci('tablet', A => A.path('M7.5 19 V9 q0 -5 4.5 -5 q4.5 0 4.5 5 V19 z', { fill: '#2a2420', sw: 0 }) + A.line(9.5, 10, 14.5, 10, { stroke: '#d6ead8', sw: 1.1 }) + A.line(9.5, 13, 14.5, 13, { stroke: '#d6ead8', sw: 1.1 }) + A.line(9.5, 16, 13, 16, { stroke: '#d6ead8', sw: 1.1 })),
      win1: token('+1 victory token', '#c8423b', '+1'),
      win3: token('+3 victory token', '#c8423b', '+3'),
      win5: token('+5 victory token', '#c8423b', '+5'),
      loss: token('−1 defeat token', '#5d6168', '−1'),
    };
  })(),

  pitch: 'Over 3 Ages, pick a card, pass the rest and build it into your city; most points across 7 categories wins.',

  goal: { big: 'Most points', text: 'Most **points** after Age III, summed from 7 categories on the score pad.' },

  turn: {
    type: 'simultaneous',
    intro: 'Everyone at once:',
    steps: [
      { verb: 'Pick', text: 'Choose **one** card from your hand; lay it face-down.' },
      { verb: 'Reveal', text: 'Reveal together. **Build** the card (pay its cost), tuck it to build a **Wonder stage**, or discard it for **3** {=coin}.' },
      { verb: 'Pass', text: 'Pass the rest of your hand: **left** in Ages I and III, **right** in Age II.' },
    ],
    outro: 'Repeat until 1 card is left; discard it. Resolve military, then start the next Age.',
  },

  tension: 'Each pick weighs a card you want against a card your neighbour needs, and you get only 18 picks all game, so you can’t chase every colour.',

  structure: [
    { label: 'Setup', text: 'Each player: a Wonder board and 3 {=coin}. Deal 7 Age I cards each.' },
    { label: 'Ages I–III', repeat: '3 Ages', text: '6 turns per Age: pick, reveal, pass. Pass **left** in Ages I and III, **right** in Age II. Discard the 7th card.' },
    { label: 'End of each Age', text: 'Military: compare {=shield} with each neighbour. More wins {=win1} / {=win3} / {=win5} (Age I / II / III); fewer takes {=loss}; a tie takes nothing.' },
    { label: 'Final scoring', text: 'After Age III’s military, add up the 7 categories below.' },
  ],

  points: [
    ['{=win3} Military', 'Sum of your victory and defeat tokens'],
    ['{=coin} Coins', '1 point per 3 coins'],
    ['Wonder', 'Points printed on the stages you built'],
    ['{=blue} Civic', 'Points printed on each blue card'],
    ['{=yellow} Commerce', 'Some Age III yellow cards: points per card or stage you own'],
    ['{=purple} Guilds', 'Points per matching card in your neighbours’ cities (or your own)'],
    ['{=green} Science', 'Each symbol type: count² ({=tablet}{=tablet}{=tablet} = 9). Plus 7 per full set of {=compass}{=gear}{=tablet}'],
  ],

  end: { trigger: 'Age III is played and its military resolved', detail: 'Tie: most coins wins.' },
  scoring: [
    { label: '{=blue} Civic', share: 3 },
    { label: '{=green} Science', share: 2 },
    { label: '{=red} Military', share: 1.5 },
    { label: 'Wonder', share: 1.5 },
    { label: '{=yellow}{=purple} Commerce & guilds', share: 1.5 },
    { label: '{=coin} Coins', share: 0.5 },
  ],

  ref: {
    title: 'Card colours',
    rows: [
      ['{=brown} {=gray} Brown / gray', 'produce {=wood}{=stone}{=clay}{=ore} / {=glass}{=loom}{=papyrus} each turn'],
      ['{=blue} Blue', 'points'],
      ['{=yellow} Yellow', 'coins, cheaper trading, or resources'],
      ['{=red} Red', '{=shield} shields for military'],
      ['{=green} Green', 'one science symbol: {=compass}, {=gear} or {=tablet}'],
      ['{=purple} Purple', 'guilds (Age III only): points for what you and your neighbours built'],
    ],
  },

  example: 'Age II: you pick a {=green} **Laboratory** (cost {=clay}{=clay}{=papyrus}). Your Age I Workshop **chains** to it, so it is free, and you gain a second {gear}. You pass the rest of your hand **right**.',

  setup: [
    'Each player takes a random Wonder board and 3 {coin}s.',
    'Use only the cards marked for your player count. Add {=purple} guilds to Age III: players + 2.',
    'Deal 7 Age I cards to each player. (Rules here: 1st edition, 2010.)',
  ],

  terms: [
    ['Age', 'One of 3 rounds: 7 cards dealt per player, 6 played.'],
    ['Wonder stage', 'Tuck a card under your board and pay the stage cost to gain its bonus.'],
    ['Chain', 'A card that is free to build because you own the named earlier card.'],
    ['Neighbours', 'The players to your left and right. You trade and fight only with them.'],
    ['{=shield} Shields', 'Symbols on {=red} cards. More than a neighbour wins that battle.'],
  ],

  gotchas: [
    'Buy a resource for 2 {=coin} **only from your 2 neighbours**, and only what their {=brown}{=gray} cards and Wonder’s starting resource produce (not yellow cards or Wonder stages).',
    'You can’t build **two identical** cards (same name). Wonder stages are built in order, left to right.',
    'Buying doesn’t use up the neighbour’s resource, and they can’t refuse. Coins received this turn can’t be spent until next turn. Resources never carry over between turns.',
  ],

  tips: [
    'Secure {=brown}{=gray} resources in Age I; buying them later drains your coins.',
    'Watch what your neighbours collect, and discard (or build) the card they need.',
    '{=green} Science scales fast if you commit, but expect others to hate-draft it.',
  ],

  walk(A) {
    const C = A.C, I = this.icons;
    const col = { brown: '#8a5a33', gray: '#8c877f', green: '#3c8d4f', blue: '#2f6db5', yellow: '#e2b33c', red: '#c8423b' };
        const big = (x, y, c, name, g) => {
      let s = A.card(x, y, 36, 50, col[c], {}) + A.rect(x + 3, y + 3, 30, 10, C.white, { rx: 2, sw: 0, opacity: 0.9 }) +
        A.text(x + 18, y + 8, name, { size: Math.min(5.5, 46 / name.length), weight: 800 });
      if (g) s += A.use(I.gear.draw(A), x + 10, y + 23, 16);
      return s;
    };
    const back = (x, y) => A.card(x, y, 30, 42, '#b99766', {}) + A.text(x + 15, y + 21, 'II', { size: 6, weight: 800, fill: C.white });
    const strip = (x, y, c, name, g, w = 34) => A.rect(x, y, w, 15, col[c], { rx: 2, sw: 1 }) +
      (name ? A.text(x + w / 2, y + 7.5, name, { size: Math.min(4.8, 50 / name.length), weight: 700, fill: C.white }) : '');
    const gears = (n) => A.use(I.gear.draw(A), 162, 138, 16) + A.text(186, 146, '×' + n, { size: 8, weight: 800 });
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
      { step: 0, say: 'Age II. Everyone looks at their hand at once. You have 4 cards.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', back(...LH(3))) + A.k('rp', back(...RH(3))) + lab(big(...H(0), 'green', 'Laboratory', 1)) + myRest + gears(1) },
      { step: 0, say: 'Everyone lays **one** card face-down. You pick the **Laboratory**.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', back(...LP)) + A.k('rp', back(...RP)) + lab(back(PICK[0] + 3, PICK[1] + 4)) + myRest + gears(1) },
      { step: 1, say: 'Reveal. Laboratory costs {=clay}{=clay}{=papyrus}, but your **Workshop** chains to it: **free**.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', big(LP[0] - 3, LP[1] - 4, 'red', 'Walls')) + A.k('rp', big(RP[0] - 3, RP[1] - 4, 'green', 'School', 1)) + lab(big(...PICK, 'green', 'Laboratory', 1)) + myRest +
        A.curve(196, 180, 222, 140, 182, 110, { sw: 1.6 }) + A.text(222, 124, 'chain', { size: 8, weight: 800 }) + A.glow(177, 182, 16, 'g-ws') + gears(1) },
      { step: 1, say: 'Cards join their cities. Your {=green} column now shows **2** {=gear}.', svg: base + left3(LH) + right3(RH) +
        A.k('lp', strip(38, 141, 'red', '', 0, 28)) + A.k('rp', strip(282, 141, 'green', '', 0, 28)) + lab(strip(160, 158, 'green', 'Laboratory', 1)) + myRest + gears(2) + A.glow(176, 146, 14, 'g-gear') },
      { step: 2, say: 'Age II passes **right**: your 3 cards go right; your left neighbour’s 3 come to you.', svg: base +
        A.k('lp', strip(38, 141, 'red', '', 0, 28)) + A.k('rp', strip(282, 141, 'green', '', 0, 28)) + lab(strip(160, 158, 'green', 'Laboratory', 1)) +
        mine.map(([k], i) => A.k(k, back(...RH(i)))).join('') +
        [['yellow', 'Forum'], ['green', 'Library'], ['blue', 'Temple']].map(([c, n], i) => A.k('l' + i, big(...H(i), c, n))).join('') +
        gears(2) + A.arrow(200, 70, 246, 70, { sw: 2 }) + A.arrow(74, 50, 92, 66, { sw: 2 }) },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
    let o = A.bg('#e4d3a8');
    // wonder board
    o += A.rect(14, 148, 196, 44, '#b99766', { rx: 4, sw: 1.4 });
    o += A.poly([[70, 168], [86, 152], [102, 168]], '#d8c08e', { sw: 1 }) + A.rect(64, 168, 44, 6, '#d8c08e', { sw: 1, rx: 1 });
    o += A.use(I.wood.draw(A), 26, 158, 26);
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
    o += A.use(I.win3.draw(A), 278, 104, 30);
    o += A.use(I.loss.draw(A), 278, 124, 30);
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
