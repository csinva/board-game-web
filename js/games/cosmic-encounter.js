defineGame({
  id: 'cosmic-encounter',
  name: 'Cosmic Encounter',
  year: 2008,
  designer: 'Eberle, Kittredge, Norton & Olotka',
  family: 'epic',
  players: [3, 5], best: '5',
  time: [60, 120],
  age: 12,
  mechanics: ['variable-powers', 'negotiation', 'take-that', 'hand-management', 'bluffing'],
  profile: { complexity: 3, luck: 3, interaction: 5, conflict: 4, talk: 5, planning: 2 },

  // Ships, colonies, the gate and warp, and the cosmic card types. `ship` takes a colour so the walk can reuse it.
  icons: (() => {
    const cardf = (A, f) => A.rect(4, 1, 16, 22, f, { rx: 2.5, sw: 1.3 });
    const W = '#fff';
    return {
      ship: { name: 'ship', draw: (A, c = '#c8423b', st = '#2a2420') => A.poly([[6, 21], [12, 3], [18, 21], [12, 17]], c, { sw: 1.3, stroke: st }) },
      colony: { name: 'colony', draw: A => A.circle(12, 14.5, 8.5, '#9fd2e8', { sw: 1.3 }) + A.poly([[8.5, 12], [12, 1.5], [15.5, 12], [12, 10]], '#c8423b', { sw: 1.1 }) },
      gate: { name: 'hyperspace gate', draw: A => A.poly([[2, 5], [2, 19], [22, 12.8], [22, 11.2]], '#cfd4ff', { sw: 1.2 }) + A.poly([[4.5, 13.5], [7, 8], [9.5, 13.5]], '#c8423b', { sw: 0.8 }) },
      warp: { name: 'warp', draw: A => A.circle(12, 12, 10.5, '#3a2a5e', { stroke: '#a88ae0', sw: 1.3 }) + A.path('M12 12 m-1.5 0 a1.5 1.5 0 1 1 3 0 a3.5 3.5 0 1 1 -7 0 a5.5 5.5 0 1 1 11 0 a7.5 7.5 0 1 1 -15 0', { stroke: '#cbb6f5', sw: 1.2 }) },
      destiny: { name: 'destiny card', draw: A => cardf(A, '#3c8d4f') + A.circle(12, 12, 4.8, 'none', { stroke: W, sw: 1.5 }) + A.circle(12, 12, 1.5, W, { sw: 0 }) },
      atk: { name: 'attack card', draw: A => cardf(A, '#c8423b') + A.rect(6.5, 3.5, 11, 3.5, W, { rx: 1, sw: 0, opacity: 0.85 }) + A.text(12, 14.5, '12', { size: 9.5, weight: 800, fill: W }) },
      nego: { name: 'negotiate card', draw: A => cardf(A, '#3c8d4f') + A.path('M7.5 10 h9 l-2.6 -2.6 M16.5 14.5 h-9 l2.6 2.6', { stroke: W, sw: 1.7 }) },
      morph: { name: 'morph card', draw: A => cardf(A, '#7d55b5') + A.circle(10, 12, 3.6, 'none', { stroke: W, sw: 1.5 }) + A.circle(14, 12, 3.6, 'none', { stroke: W, sw: 1.5 }) },
      reinf: { name: 'reinforcement card', draw: A => cardf(A, '#2f6db5') + A.text(12, 12, '+', { size: 17, weight: 800, fill: W }) },
      artifact: { name: 'artifact card', draw: A => cardf(A, '#8a5a33') + A.star(12, 12.5, 6, W, { sw: 0 }) },
      flare: { name: 'flare', draw: A => cardf(A, '#f2c84b') + A.path('M12 19.5 c-4 0 -5.2 -4 -3 -7.2 c0 2 1 2.6 2 2.6 c-1 -3 1 -6.2 3 -8.4 c0 3.2 4 5 3 9.3 c-0.5 2 -2 3.7 -5 3.7z', { fill: '#d8403a', sw: 0.9 }) },
    };
  })(),

  pitch: 'Attack rival planets with ships, allies and a hidden card; every alien breaks one rule. First to 5 foreign colonies wins.',

  goal: { big: '5 colonies', text: 'Have ships on **5 planets outside your home system**. Allies land with the winner, so several players often win **together**.' },

  turn: {
    type: 'sequence',
    intro: 'Your turn is an encounter with one other player:',
    steps: [
      { verb: 'Destiny', text: 'Take 1 {=ship} back from the warp, then draw a {destiny}: attack the system of that colour (wild: anyone; your own colour: a foreign colony in your system, or redraw).' },
      { verb: 'Launch', text: 'Aim the {=gate} **hyperspace gate** at one of that player’s planets and put **1–4** {=ship} in it.' },
      { verb: 'Ally', text: 'Invite allies, then the defender does. Each invited player may send **1–4** {=ship} to one side.' },
      { verb: 'Reveal', text: 'You and the defender each play an **encounter card** ({=atk} or {=nego}) face down, then flip. Total = card + ships on your side.' },
      { verb: 'Resolve', text: 'Higher total wins; ties go to the defender. The losing side’s ships, allies included, go to the {=warp}. A winning offense and its allies land; a winning defense’s allies earn **rewards**. Won or made a deal? Take **one more encounter**.' },
    ],
  },

  tension: 'You need allies’ ships to win, but each ally who lands with you also gains a colony, moving a rival closer to winning.',

  structure: [
    { label: 'Setup', text: 'Each player: 5 home planets with 4 {=ship} each, 1 alien power, 8 cards.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn is 1 encounter; win it (or make a deal) for a 2nd.' },
    { label: 'Game end', text: 'Someone has 5 foreign {=colony}; everyone reaching 5 in that encounter wins.' },
  ],

  end: {
    trigger: 'someone has 5 foreign colonies',
    detail: 'Check after each encounter.',
    results: [
      { side: 'Shared win', text: 'everyone who reaches 5 in the same encounter wins together.' },
    ],
  },

  ref: {
    title: 'Card types',
    rows: [
      ['{=atk} Attack 00–40', 'Add the number to your ships. Higher total wins.'],
      ['{=nego} Negotiate', 'Loses to an attack, but takes 1 card from the winner per ship lost. Two negotiates = make a deal.'],
      ['{=morph} Morph', 'Copies the opponent’s card.'],
      ['{=reinf} Reinforcement', 'After reveal, main players or allies add +2, +3 or +5 to either side.'],
      ['{=artifact} Artifact', 'One-off effect, e.g. cancel a power.'],
      ['{=flare} Flare', 'Bonus tied to one alien; stronger if it’s yours.'],
    ],
  },

  example: 'Maya draws a **green** {=destiny} and aims the gate at Ben’s ice planet with 3 {=ship}. She invites Raj, who adds 2. Maya flips **Attack 12**: 12 + 3 + 2 = **17**. Ben has 4 ships there and flips Attack 10: **14**. Maya and Raj land and gain 1 {=colony} each; Ben’s 4 ships go to the {=warp}.',

  setup: [
    'Each player takes 5 planets in their colour with 4 {=ship} on each (20 ships).',
    'Deal 2 flares each; take those 2 aliens, keep 1. Shuffle the flares into the cosmic deck (10 in total) and deal 8 cards each.',
    'Remove unused colours from the destiny deck and shuffle it. Draw until a player colour appears: that player goes first.',
  ],

  terms: [
    ['{=colony} Colony', 'Your ships on a planet. Colonies outside your home system count toward the 5.'],
    ['{=warp} Warp', 'Where lost ships go. Take 1 back at the start of each of your turns.'],
    ['{=gate} Hyperspace gate', 'The cone holding the attacking ships, pointed at the target planet.'],
    ['Defender reward', 'When the defense wins, each defensive **ally** gets 1 card or 1 ship back from the warp per ship it sent.'],
  ],

  gotchas: [
    'A {=nego} **negotiate** loses to an attack card, but its player takes **compensation**: 1 random card from the winner per ship lost.',
    'If both play negotiate, allies go home and you have one minute to deal (trade cards and/or let each other place a colony where you have one); if you fail, **both lose 3 ships** to the warp.',
    'You draw cards **only** when you need an encounter card and have none (start of your turn, or as defense): show and discard your hand, draw 8. Run out later as offense and your turn ends.',
    'With fewer than **3 colonies** in your home system you lose your alien power until you regain 3.',
  ],

  tips: [
    'Read every alien power aloud at the start; most surprises come from a forgotten power.',
    'Defensive allies earn rewards without landing: defending is cheap card draw.',
    'Watch colony counts. Never ally with anyone at 4 colonies.',
  ],

  walk(A) {
    const C = A.C, MAYA = C.red, RAJ = C.yellow, BEN = C.green;
    const ship = (x, y, c) => A.use(this.icons.ship.draw(A, c, '#fff'), x - 10, y - 10.5, 20);
    let sp = A.bg('#141a36');
    for (const [x, y] of [[12, 92], [96, 40], [150, 60], [204, 14], [312, 120], [214, 126], [250, 190], [92, 132], [180, 110], [300, 10]]) sp += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.8 });
    const PM = [40, 54], PR = [40, 146], PB = [262, 74], W = [282, 160];
    sp += A.circle(...PM, 18, '#e89a8a', { stroke: '#fff', sw: 1.2 }) + A.circle(...PR, 18, '#f0d98a', { stroke: '#fff', sw: 1.2 }) + A.circle(...PB, 26, '#9fd2e8', { stroke: '#fff', sw: 1.4 });
    sp += A.circle(...W, 24, '#3a2a5e', { stroke: '#a88ae0', sw: 1.2 }) + A.path(`M${W[0]} ${W[1]} m-3 0 a3 3 0 1 1 6 0 a7 7 0 1 1 -14 0 a11 11 0 1 1 22 0 a15 15 0 1 1 -30 0`, { stroke: '#cbb6f5', sw: 1.4, opacity: 0.6 });
    sp += A.text(W[0], W[1] + 32, 'warp', { size: 8, fill: '#cbb6f5' }) + A.text(PB[0], PB[1] + 34, 'Ben’s ice planet', { size: 8, fill: '#cfe6f2' });
    sp += A.tag(40, 14, 'Maya', { fill: MAYA }) + A.tag(40, 186, 'Raj', { fill: RAJ, color: C.ink }) + A.tag(262, 24, 'Ben', { fill: BEN });
    sp += A.card(112, 4, 24, 34, '#4a4f7a', {});
    // Ships that stay home
    sp += ship(PM[0] - 8, PM[1] - 8, MAYA) + ship(PR[0] - 8, PR[1] - 8, RAJ) + ship(PR[0] + 8, PR[1] - 8, RAJ);
    const homeM = [[PM[0] + 8, PM[1] - 8], [PM[0] - 8, PM[1] + 8], [PM[0] + 8, PM[1] + 8]], homeR = [[PR[0] - 8, PR[1] + 8], [PR[0] + 8, PR[1] + 8]];
    const gateM = [[96, 64], [108, 76], [96, 88]], gateR = [[130, 68], [130, 84]];
    const landM = [[250, 64], [262, 64], [274, 64]], landR = [[256, 84], [268, 84]];
    const benOn = [[256, 66], [268, 66], [256, 84], [268, 84]], benWarp = [[272, 154], [284, 148], [292, 162], [278, 168]];
    const ships = (pre, pos, c) => pos.map(([x, y], i) => A.k(pre + i, ship(x, y, c))).join('');
    const gate = A.k('gate', A.poly([[76, 48], [76, 104], [234, 80], [234, 68]], '#f2f2ff', { stroke: '#cfd4ff', sw: 1, opacity: 0.22 }) +
      A.line(76, 48, 234, 68, { stroke: '#cfd4ff', sw: 1 }) + A.line(76, 104, 234, 80, { stroke: '#cfd4ff', sw: 1 }));
    const destiny = A.k('destiny', A.use(this.icons.destiny.draw(A), 137, 2, 36));
    const back = (x, key) => A.k(key, A.card(x, 122, 34, 48, '#4a4f7a', { label: '?', size: 16 }));
    const atk = (x, n, key) => A.k(key, A.card(x, 122, 34, 48, C.red, { title: 'ATTACK', label: n, size: 15 }));
    const total = (x, s) => A.text(x, 182, s, { size: 9, weight: 800, fill: '#fff' });
    return [
      { step: 0, say: 'Maya takes 1 {=ship} back from the warp and draws a {=destiny} **destiny card**: green. She must attack Ben.',
        svg: sp + destiny + ships('m', homeM, MAYA) + ships('r', homeR, RAJ) + ships('b', benOn, BEN) + A.glow(154, 21, 22, 'g-dest') },
      { step: 1, say: 'She aims the **hyperspace gate** at Ben’s ice planet and puts **3** {=ship} in it.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', homeR, RAJ) + ships('b', benOn, BEN) },
      { step: 2, say: 'Maya invites allies; Raj sends **2 ships**. Ben invites allies too; nobody joins.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', gateR, RAJ) + ships('b', benOn, BEN) },
      { step: 3, say: 'Maya and Ben each pick an **encounter card** and lay it face down.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', gateR, RAJ) + ships('b', benOn, BEN) + back(118, 'cm') + back(176, 'cb') + A.text(166, 146, 'vs', { size: 10, fill: '#fff' }) },
      { step: 3, say: 'Flip: Maya **12 + 3 + 2 = 17**; Ben **10 + 4 = 14**.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', gateR, RAJ) + ships('b', benOn, BEN) + atk(118, 12, 'cm') + atk(176, 10, 'cb') + A.text(166, 146, 'vs', { size: 10, fill: '#fff' }) +
          total(135, '= 17') + total(193, '= 14') + A.glow(135, 182, 14, 'g-17') },
      { step: 4, say: 'Offense wins. Ben’s 4 ships go to the {=warp}; Maya and Raj land and gain a {=colony} each. Maya may have a 2nd encounter.',
        svg: sp + ships('m', landM, MAYA) + ships('r', landR, RAJ) + ships('b', benWarp, BEN) + A.glow(...PB, 32, 'g-pl') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#141a36');
    const stars = [[12, 12], [44, 30], [96, 10], [150, 22], [204, 14], [312, 18], [20, 96], [118, 104], [176, 92], [306, 160], [214, 126], [10, 180], [250, 186], [160, 196], [92, 132]];
    for (const [x, y] of stars) o += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.8 });
    const ship = (x, y, c) => A.use(this.icons.ship.draw(A, c, '#fff'), x - 7.3, y - 7.5, 14.5);
    // Defender's home system (yellow)
    const P = [[238, 64, 22, '#9fd2e8'], [292, 34, 14, '#c98a4b'], [288, 104, 16, '#7fbf6a'], [248, 140, 13, '#b48ad0']];
    for (const [x, y, r, f] of P) o += A.circle(x, y, r, f, { stroke: '#fff', sw: 1.2 });
    o += ship(232, 64, C.yellow) + ship(240, 66, C.yellow) + ship(248, 62, C.yellow) + ship(236, 56, C.yellow);
    o += ship(288, 32, C.yellow) + ship(296, 34, C.yellow);
    o += ship(282, 104, C.yellow) + ship(294, 104, C.red);   // a foreign colony (red)
    o += ship(246, 140, C.yellow);
    // Hyperspace gate: wide end with ships, tip at the target planet
    o += A.poly([[30, 34], [30, 96], [212, 70], [212, 60]], '#f2f2ff', { stroke: '#cfd4ff', sw: 1, opacity: 0.22 });
    o += A.line(30, 34, 212, 60, { stroke: '#cfd4ff', sw: 1 }) + A.line(30, 96, 212, 70, { stroke: '#cfd4ff', sw: 1 });
    o += ship(44, 56, C.red) + ship(56, 66, C.red) + ship(44, 76, C.red);
    o += ship(78, 60, C.green) + ship(78, 74, C.green);
    // Warp
    o += A.circle(54, 158, 24, '#3a2a5e', { stroke: '#a88ae0', sw: 1.2 });
    o += A.path('M54 158 m-3 0 a3 3 0 1 1 6 0 a7 7 0 1 1 -14 0 a11 11 0 1 1 22 0 a15 15 0 1 1 -30 0', { stroke: '#cbb6f5', sw: 1.4 });
    o += ship(44, 150, C.blue) + ship(66, 166, C.yellow);
    // Encounter cards: offense flipped, defense flipped
    o += A.card(118, 116, 34, 50, '#c8423b', { title: 'ATTACK', label: '12', size: 16 });
    o += A.text(166, 141, 'vs', { size: 11, weight: 800, fill: '#fff' });
    o += A.card(180, 116, 34, 50, '#c8423b', { title: 'ATTACK', label: '10', size: 16 });
    o += A.note(66, 40, 110, 14, 'Hyperspace gate: 1–4 ships');
    o += A.note(294, 100, 262, 186, 'Foreign colony');
    o += A.note(40, 136, 54, 120, 'Warp');
    o += A.note(152, 162, 150, 186, 'Encounter cards');
    return o;
  },
});
