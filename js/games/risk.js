defineGame({
  id: 'risk',
  name: 'Risk',
  year: 1959,
  designer: 'Albert Lamorisse, Michael I. Levin',
  family: 'conflict',
  players: [2, 5], best: '4',
  time: [120, 240],
  age: 10,
  mechanics: ['dice', 'area-control', 'player-elimination', 'take-that', 'set-collection', 'negotiation'],
  profile: { complexity: 2, luck: 4, interaction: 5, conflict: 5, talk: 3, planning: 3 },

  // Risk card symbols, armies and the two colours of dice. Reused in art and walk.
  icons: {
    army: { name: 'army', draw: A => A.circle(12, 12, 10, '#c8423b', { sw: 1.3 }) + A.circle(12, 12, 6.8, 'none', { stroke: '#fff', sw: 1.6 }) },
    inf: { name: 'infantry', draw: A => A.rect(4, 1, 16, 22, '#f2e6cc', { rx: 2.5, sw: 1.3 }) + A.line(15.5, 15, 17, 5.5, { sw: 1.3, stroke: '#5a4030' }) + A.person(11.5, 13, 13, '#3d5a3a') },
    cav: { name: 'cavalry', draw: A => A.rect(4, 1, 16, 22, '#f2e6cc', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '\u265E\uFE0E', { size: 20, weight: 400, fill: '#3d5a3a' }) },
    cannon: { name: 'artillery', draw: A => A.rect(4, 1, 16, 22, '#f2e6cc', { rx: 2.5, sw: 1.3 }) + A.rect(7, 9.5, 12, 3.6, '#3d5a3a', { rx: 1, sw: 1, rotate: -25 }) + A.circle(10, 15.5, 3.6, '#8a5a33', { sw: 1.1 }) + A.circle(10, 15.5, 1, '#2a2420', { sw: 0 }) },
    wild: { name: 'wild card', draw: A => A.rect(4, 1, 16, 22, '#f2e6cc', { rx: 2.5, sw: 1.3 }) + A.star(12, 12.5, 6.5, '#e2b33c', { sw: 1 }) },
    att: { name: 'attack die', draw: A => A.die(2.5, 2.5, 19, 5, '#d8403a', { pip: '#fff' }) },
    def: { name: 'defence die', draw: A => A.die(2.5, 2.5, 19, 5) },
    ...Object.fromEntries([1, 2, 3, 4, 5, 6].map(v => ['att' + v, { name: String(v), draw: A => A.die(2.5, 2.5, 19, v, '#d8403a', { pip: '#fff' }) }])),
  },

  pitch: 'Place armies, roll dice to attack neighbouring territories and hold continents for bonus armies; take all 42 to win.',

  goal: { big: 'Conquer world', text: 'Occupy **all 42 territories** by eliminating every other player. (Secret Mission variant: complete your mission card instead.)' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Reinforce', text: 'Take {=army} armies: territories ÷ 3 (min **3**) + continent bonuses + any card set you trade in. Place them on your territories.' },
      { verb: 'Attack', text: 'Attack adjacent enemy territories as often as you like. Roll up to {=att}{=att}{=att}; the defender rolls up to {=def}{=def}.' },
      { verb: 'Fortify', text: 'Make **one** move of armies between two of your territories that connect through your own territories.' },
    ],
    outro: 'If you conquered a territory, draw a card. Next player',
  },

  tension: 'Spreading out for territories and continents leaves you thin; turtling gives rivals time to grow.',

  structure: [
    { label: 'Setup', text: 'Claim all 42 territories 1 army at a time, then place the rest of your starting armies.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn: reinforce, attack, fortify. Conquered a territory? Draw a card.' },
    { label: 'Elimination', text: 'Lose your last territory and you are out; the eliminator takes your cards (at 6+, they trade sets at once).' },
    { label: 'Game end', text: 'One player holds all 42 territories.' },
  ],

  end: {
    trigger: 'one player controls all 42 territories',
    detail: 'A player with no territories is out; whoever eliminated them takes their cards. With 2 players, eliminating your opponent wins; neutral armies may remain.',
    results: [
      { side: 'World domination', text: 'the last player standing wins.' },
      { side: 'Secret Mission (variant)', text: 'deal each player 1 secret mission card (remove cards naming unused colours); the first to complete theirs and reveal it wins at once, even if someone else made it happen.' },
    ],
  },

  ref: {
    title: 'Dice, cards & bonuses',
    rows: [
      ['{=att} Attack', 'up to {=att}{=att}{=att}, one fewer than the armies there'],
      ['{=def} Defend', 'up to {=def}{=def}; highest vs highest, ties to defender'],
      ['Card sets', 'three alike {=cav}{=cav}{=cav} or one each {=inf}{=cav}{=cannon}; a {=wild} is any'],
      ['Set values', '4, 6, 8, 10, 12, 15, then +5 {=army} each; +2 on a pictured territory you own'],
      ['Big continents', 'Asia +7 · N. America +5 · Europe +5'],
      ['Small continents', 'Africa +3 · S. America +2 · Australia +2'],
    ],
  },

  example: 'Ana has 10 armies in Ukraine and attacks Ben’s 3 in Ural. She rolls {=att6}{=att4}{=att2}, Ben rolls {=d5}{=d4}. 6 beats 5; the 4s tie and **ties go to the defender**, so each loses 1. She keeps rolling, takes Ural, moves 4 armies in, then fortifies 3 more from Ukraine.',

  setup: [
    'Rules here are Hasbro’s 2016 edition (unchanged in the 2020 printing), for 2–5 players.',
    'Starting armies: 35 each (3 players), 30 (4), 25 (5).',
    'Take turns claiming empty territories with 1 army each until all 42 are taken, then keep placing 1 army per turn until all starting armies are down.',
    'Shuffle the 42 territory cards and 2 {wild} cards into a face-down deck.',
    '**2 players**: you, your opponent and a neutral colour get 40 armies each. Remove the wilds, deal the territory cards 14 each and put 1 army on each. Take turns placing 2 of your armies, then take turns placing 1 neutral army each. Shuffle the wilds back in.',
  ],

  terms: [
    ['{=army} Army', 'One unit on the map. Larger pieces count as 5 or 10.'],
    ['Continent bonus', 'Extra armies each turn for owning a whole continent.'],
    ['{=inf} Card set', 'Three alike, one each of {=inf}{=cav}{=cannon}, or any two plus a {wild}. Trade in for armies.'],
    ['Fortify', 'Your one free army move at the end of your turn.'],
  ],

  gotchas: [
    '**1 army** must always stay behind: attacking needs 2+ armies, and you roll one die per army beyond the first (max 3).',
    'After taking a territory, move in **at least as many armies as dice** you rolled in the last battle.',
    'Draw **one card** per turn, only if you conquered a territory. Start a turn with 5+ cards and you must trade a set.',
    'Dashed sea-lines connect territories: Alaska borders Kamchatka.',
    '2 players: the neutral army never attacks or gets reinforcements; when you attack it, your opponent rolls its defence.',
  ],

  tips: [
    'Australia and South America are small and easy to hold.',
    'Take one territory every turn to earn a card.',
    'Stack armies on choke points instead of spreading them thin.',
  ],

  walk(A) {
    const C = A.C, ANA = C.red, BEN = C.green;
    const ukrP = [[70, 28], [168, 22], [176, 70], [160, 124], [96, 132], [62, 90]];
    const uraP = [[168, 22], [262, 14], [282, 66], [250, 92], [176, 70]];
    const afgP = [[176, 70], [250, 92], [276, 122], [214, 136], [160, 124]];
    const scaP = [[10, 20], [70, 28], [62, 90], [16, 84]];
    const land = (ural) => A.bg('#9ccbe0') +
      A.poly(scaP, '#e9a49c', { stroke: '#4a4030', sw: 1.4 }) + A.poly(ukrP, '#e9a49c', { stroke: '#4a4030', sw: 1.4 }) +
      A.poly(uraP, ural, { stroke: '#4a4030', sw: 1.4 }) + A.poly(afgP, '#a8d39a', { stroke: '#4a4030', sw: 1.4 }) +
      A.text(110, 40, 'Ukraine', { size: 9, fill: '#5a2a24' }) + A.text(228, 30, 'Ural', { size: 9, fill: '#3a2a20' }) +
      A.text(220, 124, 'Afghanistan', { size: 8, fill: '#2a4a24' }) + A.text(38, 32, 'Scand.', { size: 8, fill: '#5a2a24' }) +
      A.rect(0, 150, 320, 50, '#f6efe0', { sw: 0, rx: 0 }) + A.line(0, 150, 320, 150, { sw: 1.5 }) +
      A.tag(40, 14, 'Ana (red)', { fill: ANA }) + A.tag(276, 140, 'Ben (green)', { fill: BEN });
    const army = (x, y, n, c, r = 11) => A.circle(x, y, r, c, { stroke: '#fff', sw: 2 }) + A.text(x, y + 0.5, n, { size: r * 1.05, weight: 800, fill: '#fff' });
    const U = [118, 82], R = [226, 52];
    const fixed = army(36, 60, 2, ANA, 9) + army(214, 106, 4, BEN, 9);
    const rd = (x, v) => A.die(x, 160, 20, v, '#d8403a', { pip: '#fff' });
    const wd = (x, v) => A.die(x, 160, 20, v);
    const dice = (r, w) => A.k('rdice', rd(70, r[0]) + rd(94, r[1]) + rd(118, r[2])) + A.text(155, 170, 'vs', { size: 10, weight: 800 }) + A.k('wdice', wd(172, w[0]) + wd(196, w[1]));
    const res = (i, x, y) => A.k('res' + i, army(x, y, '+1', ANA, 7));
    const arrow = A.curve(150, 60, 180, 36, 206, 46, { stroke: ANA, sw: 3, head: 8 });
    const card = A.k('card', A.use(this.icons.inf.draw(A), 254, 154, 40));
    return [
      { step: 0, say: 'Ana owns 11 territories: 11 ÷ 3 = **3 armies**. She puts all 3 on Ukraine, next to Ben’s Ural.',
        svg: land('#a8d39a') + fixed + A.k('ukr', army(...U, 7, ANA)) + A.k('ural', army(...R, 3, BEN)) +
          A.text(10, 175, 'Reinforcements:', { size: 9, anchor: 'start' }) + res(1, 102, 175) + res(2, 120, 175) + res(3, 138, 175) },
      { step: 0, say: 'Ukraine now holds **10 armies**; Ural holds 3.',
        svg: land('#a8d39a') + fixed + res(1, U[0] - 3, U[1]) + res(2, U[0], U[1]) + res(3, U[0] + 3, U[1]) + A.k('ukr', army(...U, 10, ANA, 13)) + A.k('ural', army(...R, 3, BEN)) + A.glow(...U, 20, 'g-ukr') },
      { step: 1, say: 'Attack: Ana rolls {=att6}{=att4}{=att2}, Ben rolls {=d5}{=d4}. 6 beats 5; the 4s tie and **ties go to the defender**. Each loses 1.',
        svg: land('#a8d39a') + fixed + arrow + A.k('ukr', army(...U, 9, ANA, 13)) + A.k('ural', army(...R, 2, BEN)) + dice([6, 4, 2], [5, 4]) +
          A.text(80, 191, 'win', { size: 7, fill: ANA }) + A.text(104, 191, 'lose', { size: 7, fill: C.gray }) + A.text(182, 191, 'lose', { size: 7, fill: C.gray }) + A.text(206, 191, 'win', { size: 7, fill: BEN }) },
      { step: 1, say: 'She rolls again: {=att5}{=att3}{=att1} vs {=d2}{=d1}. Ben loses his last 2 armies; Ural is Ana’s.',
        svg: land('#e9a49c') + fixed + arrow + A.k('ukr', army(...U, 9, ANA, 13)) + dice([5, 3, 1], [2, 1]) + A.glow(R[0], R[1] + 6, 20, 'g-ural') },
      { step: 1, say: 'She must move in at least as many armies as dice rolled (3); she moves **4**.',
        svg: land('#e9a49c') + fixed + A.k('ukr', army(...R, 4, ANA)) + A.k('ukr2', army(...U, 5, ANA)) + A.k('ural-arrow', A.arrow(140, 72, 204, 56, { stroke: ANA, sw: 2, dash: '4 3' })) },
      { step: 2, say: '**Fortify**: one move of 3 armies from Ukraine to Ural. She conquered a territory, so she **draws a card**.',
        svg: land('#e9a49c') + fixed + A.k('ukr2', army(...R, 7, ANA, 13)) + A.k('ukr3', army(...U, 2, ANA)) + card + A.glow(274, 173, 22, 'g-card') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#9ccbe0');
    const land = [
      ['#e7c64a', [[14, 24], [96, 14], [112, 40], [92, 64], [66, 84], [44, 70], [22, 52]]],             // N America
      ['#d9743a', [[66, 92], [98, 90], [106, 116], [86, 160], [70, 138]]],                               // S America
      ['#5f86c9', [[128, 22], [166, 18], [172, 48], [146, 60], [126, 46]]],                              // Europe
      ['#9a6a3c', [[132, 70], [174, 66], [192, 92], [174, 146], [152, 136], [134, 100]]],                // Africa
      ['#78a94e', [[176, 14], [288, 16], [304, 48], [276, 80], [234, 92], [198, 76], [180, 50]]],        // Asia
      ['#8d5fae', [[252, 130], [296, 124], [304, 152], [266, 160]]],                                     // Australia
    ];
    for (const [f, p] of land) o += A.poly(p, f, { stroke: '#4a4030', sw: 1.4 });
    // internal territory borders
    const B = [[40, 30, 70, 60], [96, 20, 66, 52], [82, 98, 92, 128], [146, 22, 150, 56], [150, 70, 168, 120], [216, 16, 212, 82], [256, 18, 248, 88], [190, 50, 300, 46], [270, 128, 280, 156]];
    for (const [a, b, c, d] of B) o += A.line(a, b, c, d, { stroke: '#4a4030', sw: 0.8, opacity: 0.6 });
    // sea connections
    o += A.line(112, 34, 128, 32, { stroke: '#4a4030', sw: 1, dash: '3 3' }) + A.line(98, 100, 134, 96, { stroke: '#4a4030', sw: 1, dash: '3 3' });
    const army = (x, y, n, c) => A.circle(x, y, 8, c, { stroke: '#fff', sw: 1.5 }) + A.text(x, y + 0.5, n, { size: 9, weight: 800, fill: '#fff' });
    o += army(50, 46, 5, C.red) + army(78, 34, 3, C.red) + army(88, 118, 4, C.black) + army(146, 36, 2, C.blue) + army(160, 46, 8, C.blue);
    o += army(160, 96, 3, C.black) + army(198, 34, 10, C.blue) + army(232, 46, 3, C.green) + army(266, 50, 6, C.green) + army(278, 143, 5, C.green);
    // attack arrow Europe -> Asia
    o += A.curve(168, 40, 182, 22, 190, 32, { stroke: C.red, sw: 2.5, head: 7 });
    // dice
    o += A.die(112, 158, 17, 6, '#d8403a', { pip: '#fff' }) + A.die(133, 158, 17, 4, '#d8403a', { pip: '#fff' }) + A.die(154, 158, 17, 2, '#d8403a', { pip: '#fff' });
    o += A.text(184, 167, 'vs', { size: 10, weight: 800 });
    o += A.die(196, 158, 17, 5) + A.die(217, 158, 17, 4);
    // cards
    o += A.use(this.icons.inf.draw(A), 2, 148, 44) + A.use(this.icons.cav.draw(A), 24, 152, 44);
    o += A.note(165, 98, 240, 104, 'Armies on a territory');
    o += A.note(150, 176, 140, 189, 'Attack: 3 dice vs 2');
    o += A.note(288, 150, 262, 186, 'Continent = bonus');
    o += A.note(30, 152, 36, 128, 'Card sets');
    return o;
  },
});
