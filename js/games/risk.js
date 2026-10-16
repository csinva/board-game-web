defineGame({
  id: 'risk',
  name: 'Risk',
  year: 1959,
  designer: 'Albert Lamorisse',
  family: 'conflict',
  players: [2, 6], best: '4–5',
  time: [120, 240],
  age: 10,
  mechanics: ['dice', 'area-control', 'player-elimination', 'take-that', 'set-collection', 'negotiation'],
  profile: { complexity: 2, luck: 4, interaction: 5, conflict: 5, talk: 3, planning: 3 },

  pitch: 'Mass armies, roll dice to invade your neighbours, and grab whole continents for bigger reinforcements, until one player rules the world.',
  theme: 'You are a general commanding an army in a war to conquer the entire world map.',

  goal: { big: 'Conquer world', text: 'Occupy **all 42 territories** by eliminating every other player. (Many groups play the Secret Mission variant to finish sooner.)' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Reinforce', text: 'Get armies: territories ÷ 3 (min **3**), plus continent bonuses, plus any card set you trade in. Place them on your territories.' },
      { verb: 'Attack', text: 'Attack adjacent enemy territories as often as you like. Roll up to **3** dice; the defender rolls up to **2**.' },
      { verb: 'Fortify', text: 'Make **one** move of armies from one territory to another connected through your own territories.' },
    ],
    outro: 'If you conquered at least one territory, draw a card. Next player',
  },

  tension: 'Spreading out to grab territory and continents leaves you thin, while turtling up gives your rivals time to grow.',

  flow: [
    { label: 'Reinforce', items: ['Territories ÷ 3', 'Continent bonuses', 'Card sets'] },
    { label: 'Attack', items: ['3 dice vs 2', 'Highest pairs compared', 'Ties go to defender'] },
    { label: 'Hold', items: ['Fortify one move', 'Guard borders', 'Earn a card'] },
  ],

  end: {
    trigger: 'one player controls all 42 territories',
    detail: 'Players are knocked out when they lose their last territory; whoever knocks you out takes your cards.',
    results: [
      { side: 'World domination', text: 'the last player standing, holding every territory, wins.' },
      { side: 'Secret Mission (variant)', text: 'the first player to complete the goal on their secret mission card wins at once.' },
    ],
  },

  ref: {
    title: 'Continent bonuses',
    rows: [
      ['Asia', '+7 armies'],
      ['North America, Europe', '+5 each'],
      ['Africa', '+3'],
      ['South America, Australia', '+2 each'],
      ['Card sets', '4, 6, 8, 10, 12, 15, then +5 each'],
    ],
  },

  example: 'Ana has 10 armies in Ukraine and attacks Ben’s 3 in Ural. She rolls 6-4-2, Ben rolls 5-4. Her 6 beats his 5, but the 4s tie and **ties go to the defender**: each loses 1 army. She keeps rolling, wins Ural, moves 4 armies in, then fortifies by moving 3 more from Ukraine to Ural.',

  setup: [
    'Each player takes starting armies: 40 (2 players, plus a neutral), 35 (3), 30 (4), 25 (5), 20 (6).',
    'Claim territories one army at a time in turn (or deal the territory cards), until all 42 are taken.',
    'Keep taking turns placing one army at a time until all starting armies are down.',
  ],

  terms: [
    ['Army', 'A unit on the map. Larger pieces count as 5 or 10.'],
    ['Continent bonus', 'Extra armies each turn for owning every territory of a continent.'],
    ['Card set', '3 cards of one picture, one of each, or with a wild. Trade for growing bonuses.'],
    ['Fortify', 'Your one free repositioning move at the end of the turn.'],
  ],

  gotchas: [
    'You must leave **at least 1 army** behind, so you need 2+ armies to attack, and as many dice as armies minus one (max 3).',
    'After winning a territory, move in **at least as many armies as dice** you rolled in the last battle.',
    'You draw **only one card** per turn, and only if you conquered something. Holding 5+ cards at turn start forces a trade.',
  ],

  tips: [
    'Australia or South America are small and easy to hold: a classic first foothold.',
    'Take one territory every turn just to earn a card.',
    'Don’t spread out: a big stack on a choke point beats armies sprinkled everywhere.',
  ],

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
    o += A.card(10, 150, 26, 38, C.cream, { label: '★', labelFill: C.ink, size: 14 }) + A.card(30, 154, 26, 38, C.cream, { label: '♞', labelFill: C.ink, size: 14 });
    o += A.note(165, 98, 240, 104, 'Armies on a territory');
    o += A.note(150, 176, 140, 189, 'Attack: 3 dice vs 2');
    o += A.note(288, 150, 262, 186, 'Continent = bonus');
    o += A.note(30, 152, 36, 128, 'Card sets');
    return o;
  },
});
