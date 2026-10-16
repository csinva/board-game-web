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

  pitch: 'Each alien breaks one rule of the game in its own way. Fly at a rival’s planet, beg allies for ships and bluff with a hidden card.',
  theme: 'You are an alien race, each with one rule-breaking power, trying to plant colonies across the galaxy.',

  goal: { big: '5 colonies', text: 'Have ships on **5 planets outside your home system**. Several players often win **together**, because allies land alongside the attacker.' },

  turn: {
    type: 'sequence',
    intro: 'Your turn is an encounter with one other player, in these phases:',
    steps: [
      { verb: 'Destiny', text: 'Take back 1 ship from the warp, then draw a **destiny card**: its colour says whose system you attack.' },
      { verb: 'Launch', text: 'Aim the **hyperspace gate** at one of that player’s planets and put **1–4** of your ships in it.' },
      { verb: 'Ally', text: 'You invite allies, then the defender does. Each invited player may send **1–4** ships to one side.' },
      { verb: 'Reveal', text: 'You and the defender each play an **encounter card** face down, then flip. Total = card + ships on your side.' },
      { verb: 'Resolve', text: 'Higher total wins. If you won (or made a deal), you may take **one more encounter**.' },
    ],
  },

  tension: 'You need allies’ ships to win, but every ally who lands with you also gets a colony, so each invitation pushes a rival closer to winning too.',

  flow: [
    { label: 'Attack', items: ['Win on offense: you and allies land', 'Second encounter if you won'] },
    { label: 'Defend', items: ['Win on defense: helpers draw cards or free ships', 'Lose: ships go to the warp'] },
    { label: 'Deal', items: ['Negotiate: trade cards or colonies', 'No deal: both lose 3 ships'] },
  ],

  end: {
    trigger: 'someone has 5 foreign colonies',
    detail: 'Check after each encounter. Everyone who reaches 5 at the same moment wins together.',
    results: [
      { side: 'Shared win', text: 'if you and your allies reach 5 colonies on the same encounter, you all win.' },
    ],
  },

  ref: {
    title: 'Card types',
    rows: [
      ['Attack (00–40)', 'Add the number to your ships. Higher total wins.'],
      ['Negotiate', 'Loses to an attack, but you take a card from the winner per ship you lost. Two negotiates = make a deal.'],
      ['Morph', 'Copies the opponent’s card.'],
      ['Reinforcement', 'Played after reveal: +2 to +5 to one side.'],
      ['Artifact', 'One-off rule-breaking effect, e.g. cancel a power.'],
      ['Flare', 'A bonus tied to an alien; stronger if it’s yours.'],
    ],
  },

  example: 'Maya draws a **green** destiny card and aims the gate at Ben’s ice planet with 3 ships. She invites Raj, who adds 2. Maya flips **Attack 12**: 3 + 2 + 12 = **17**. Ben has 4 ships there and flips Attack 10 = **14**. Maya and Raj both land: 1 new colony each, and Ben’s 4 ships go to the warp.',

  setup: [
    'Each player takes 5 planets in their colour with 4 ships on each (20 ships).',
    'Deal 2 alien powers each; pick 1 and reveal it. Deal 8 cards from the cosmic deck.',
    'Shuffle the destiny deck; the player with the highest-numbered alien goes first.',
  ],

  terms: [
    ['Colony', 'Any of your ships on a planet. Foreign colonies (outside your home system) count toward the 5.'],
    ['Warp', 'Where lost ships go. You get 1 back at the start of each of your turns.'],
    ['Hyperspace gate', 'The cone that holds the attacking ships, pointed at the target planet.'],
    ['Defensive reward', 'Each ship that helped defend earns 1 card or 1 ship back from the warp.'],
  ],

  gotchas: [
    'A **negotiate** card loses to an attack card, but the loser takes **compensation**: 1 random card from the winner per ship lost.',
    'If both play negotiate you have one minute to make a deal; if you fail, **both lose 3 ships** to the warp.',
    'When your hand has **no encounter cards**, show it, discard it and draw a fresh 8.',
  ],

  tips: [
    'Read every alien power at the table out loud; most surprises come from a power nobody remembered.',
    'Defending allies get rewards even when they don’t get colonies: helping defense is cheap card draw.',
    'Watch the colony counts. Refuse to ally with anyone at 4 colonies.',
  ],

  walk(A) {
    const C = A.C, MAYA = C.red, RAJ = C.yellow, BEN = C.green;
    const ship = (x, y, c) => A.poly([[x - 5, y + 7], [x, y - 8], [x + 5, y + 7]], c, { sw: 1, stroke: '#fff' });
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
    const destiny = A.k('destiny', A.card(142, 4, 24, 34, BEN, {}));
    const back = (x, key) => A.k(key, A.card(x, 122, 34, 48, '#4a4f7a', { label: '?', size: 16 }));
    const atk = (x, n, key) => A.k(key, A.card(x, 122, 34, 48, C.red, { title: 'ATTACK', label: n, size: 15 }));
    const total = (x, s) => A.text(x, 182, s, { size: 9, weight: 800, fill: '#fff' });
    return [
      { step: 0, say: 'Maya takes 1 ship back from the warp, then draws a **destiny card**: green. She must attack Ben’s system.',
        svg: sp + destiny + ships('m', homeM, MAYA) + ships('r', homeR, RAJ) + ships('b', benOn, BEN) + A.glow(154, 21, 22, 'g-dest') },
      { step: 1, say: 'She aims the **hyperspace gate** at Ben’s ice planet and launches **3 ships** into it.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', homeR, RAJ) + ships('b', benOn, BEN) },
      { step: 2, say: 'Maya invites allies. Raj agrees and sends **2 ships**. Ben asks for help too, but nobody joins him.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', gateR, RAJ) + ships('b', benOn, BEN) },
      { step: 3, say: 'Maya and Ben each pick an **encounter card** and lay it face down.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', gateR, RAJ) + ships('b', benOn, BEN) + back(118, 'cm') + back(176, 'cb') + A.text(166, 146, 'vs', { size: 10, fill: '#fff' }) },
      { step: 3, say: 'Flip! Maya: **12 + 3 + 2 = 17**. Ben: **10 + 4 ships = 14**.',
        svg: sp + destiny + gate + ships('m', gateM, MAYA) + ships('r', gateR, RAJ) + ships('b', benOn, BEN) + atk(118, 12, 'cm') + atk(176, 10, 'cb') + A.text(166, 146, 'vs', { size: 10, fill: '#fff' }) +
          total(135, '= 17') + total(193, '= 14') + A.glow(135, 182, 14, 'g-17') },
      { step: 4, say: 'Offense wins. Ben’s 4 ships go to the **warp**; Maya and Raj land and each gain a **colony**. Maya may now have a 2nd encounter.',
        svg: sp + ships('m', landM, MAYA) + ships('r', landR, RAJ) + ships('b', benWarp, BEN) + A.glow(...PB, 32, 'g-pl') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#141a36');
    const stars = [[12, 12], [44, 30], [96, 10], [150, 22], [204, 14], [312, 18], [20, 96], [118, 104], [176, 92], [306, 160], [214, 126], [10, 180], [250, 186], [160, 196], [92, 132]];
    for (const [x, y] of stars) o += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.8 });
    const ship = (x, y, c) => A.poly([[x - 4, y + 5], [x, y - 6], [x + 4, y + 5]], c, { sw: 0.8, stroke: '#fff' });
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
