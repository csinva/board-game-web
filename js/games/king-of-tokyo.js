defineGame({
  id: 'king-of-tokyo',
  name: 'King of Tokyo',
  year: 2011,
  designer: 'Richard Garfield',
  family: 'conflict',
  players: [2, 6], best: '4–5',
  time: [20, 30],
  age: 8,
  mechanics: ['dice', 'press-your-luck', 'take-that', 'player-elimination', 'tableau'],
  profile: { complexity: 1, luck: 4, interaction: 5, conflict: 4, talk: 4, planning: 1 },

  pitch: 'Giant monsters roll dice Yahtzee-style to smash each other, heal, grab energy for power cards, and hold Tokyo for points.',
  theme: 'You are a giant monster stomping into Tokyo to prove you are the king of them all.',

  goal: { big: '20 points', text: 'Be the first to **20 victory points**, or be the **last monster standing**.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Roll', text: 'Roll **6 dice**, then reroll any of them up to **2 more** times.' },
      { verb: 'Resolve', text: 'Score number triples, take energy, heal with hearts, and deal damage with claws.' },
      { verb: 'Tokyo', text: 'If Tokyo is empty, you **must** move in (+1 VP).' },
      { verb: 'Buy', text: 'Spend energy on any of the 3 face-up power cards (or 2 energy to replace all 3).' },
    ],
  },

  tension: 'Tokyo pays the most points but makes you everyone’s target, and you can’t heal while you are there.',

  flow: [
    { label: 'Roll', items: ['Keep and reroll', '3 rolls total', 'Chase a combo'] },
    { label: 'Gain', items: ['Triples = VP', 'Energy cubes', 'Hearts heal'] },
    { label: 'Fight', items: ['Claws hit Tokyo', 'Tokyo hits everyone', 'Yield and flee'] },
  ],

  end: { trigger: 'a monster reaches 20 VP or only one monster is left alive', detail: 'A monster at 0 health is out at once.' },
  scoring: [
    { label: 'Holding Tokyo', share: 4 },
    { label: 'Number triples', share: 3 },
    { label: 'Power cards', share: 3 },
  ],

  ref: {
    title: 'Dice faces',
    rows: [
      ['Triple 1s / 2s / 3s', '1 / 2 / 3 VP, +1 per extra matching die'],
      ['Energy', '1 energy cube each'],
      ['Heart', 'heal 1 (max 10); not in Tokyo'],
      ['Claw', '1 damage to each monster on the other side'],
      ['Start turn in Tokyo', '+2 VP'],
    ],
  },

  example: 'Kai rolls and keeps 3-3-3 plus a claw, then rerolls twice into another 3 and an energy. He scores **4 VP** (3 for the triple, +1 for the extra 3), takes 1 energy, and his claw hits the monster in Tokyo for 1. She yields, so Kai must move into Tokyo (+1 VP).',

  setup: [
    'Each player picks a monster: health dial at **10**, VP dial at **0**.',
    'Shuffle the power cards and deal 3 face up; put the energy cubes in a pile.',
    'With 5–6 players also use **Tokyo Bay**, a second spot inside Tokyo.',
  ],

  terms: [
    ['Tokyo', 'The centre spot. +1 VP to enter, +2 VP for each turn you start there.'],
    ['Yield', 'When hit in Tokyo you may leave; the attacker must take your place.'],
    ['Energy', 'Green cubes used to buy power cards.'],
    ['Keep / Discard card', 'Keep cards stay as permanent powers; discard cards work once.'],
  ],

  gotchas: [
    'Claws hit **everyone outside** if you are in Tokyo, but only the monster(s) **in Tokyo** if you are outside.',
    'You can’t heal with hearts while in Tokyo (cards can still heal you).',
    'You may yield only when you are **damaged**, and only after the hit; you still take that damage.',
  ],

  tips: [
    'Leave Tokyo before your health gets low; 2 VP per turn isn’t worth dying for.',
    'Number triples are slow; claws and energy usually win more games.',
    'Buy Keep cards early: a permanent power pays off every turn.',
  ],

  walk(A) {
    const C = A.C, KAI = '#5fb04a', MEG = '#8d5fae';
    const monster = (x, y, s, f) => {
      const k = s / 40;
      let m = A.path(`M${x - 14 * k} ${y} q-4 ${-22 * k} ${6 * k} ${-30 * k} l${-2 * k} ${-8 * k} l${7 * k} ${4 * k} l${3 * k} ${-8 * k} l${4 * k} ${8 * k} l${6 * k} ${-5 * k} l${-1 * k} ${9 * k} q${10 * k} ${8 * k} ${6 * k} ${30 * k} z`, { fill: f, sw: 1.6 });
      m += A.circle(x - 4 * k, y - 22 * k, 3.5 * k, C.white, { sw: 1 }) + A.circle(x + 5 * k, y - 22 * k, 3.5 * k, C.white, { sw: 1 });
      m += A.circle(x - 4 * k, y - 22 * k, 1.4 * k, C.ink, { sw: 0 }) + A.circle(x + 5 * k, y - 22 * k, 1.4 * k, C.ink, { sw: 0 });
      return m + A.path(`M${x - 5 * k} ${y - 12 * k} q${5 * k} ${4 * k} ${10 * k} 0`, { stroke: C.ink, sw: 1.4 });
    };
    const face = (x, y, f) => {
      let d = A.die(x, y, 20, /^[123]$/.test(f) ? f : '', C.white);
      const cx = x + 10, cy = y + 10;
      if (f === 'E') d += A.poly([[cx + 2, cy - 7], [cx - 5, cy + 1], [cx, cy + 1], [cx - 2, cy + 7], [cx + 5, cy - 1], [cx, cy - 1]], '#3fae5a', { sw: 0.8 });
      if (f === 'H') d += A.heart(cx, cy + 1, 9, '#d8403a', { sw: 0.8 });
      if (f === 'C') for (let i = -1; i <= 1; i++) d += A.line(cx - 4 + i * 4, cy + 5, cx + 1 + i * 4, cy - 5, { stroke: C.ink, sw: 2 });
      return d;
    };
    const sky = A.bg('#2a2350') + A.rect(0, 118, 320, 82, '#f6efe0', { sw: 0, rx: 0 }) + A.line(0, 118, 320, 118, { sw: 1.5 }) +
      A.poly([[112, 70], [208, 70], [222, 90], [98, 90]], '#d8403a', { sw: 2 }) + A.text(160, 81, 'TOKYO', { size: 9, weight: 800, fill: '#fff', spacing: 2 }) +
      A.text(10, 134, 'Roll', { size: 9, anchor: 'start' }) + A.text(10, 172, 'Keep', { size: 9, anchor: 'start' });
    const stats = (x, hp, vp) => A.text(x, 104, `♥${hp}  ★${vp}`, { size: 10, weight: 800, fill: '#fff' });
    const kai = (inTokyo, hp, vp) => A.k('kai', monster(inTokyo ? 160 : 52, 74, 44, KAI) + stats(inTokyo ? 160 : 52, hp, vp)) + A.k('kai-tag', A.tag(inTokyo ? 160 : 52, 14, 'Kai', { fill: KAI }));
    const meg = (inTokyo, hp, vp) => A.k('meg', monster(inTokyo ? 160 : 268, 74, 44, MEG) + stats(inTokyo ? 160 : 268, hp, vp)) + A.k('meg-tag', A.tag(inTokyo ? 160 : 268, 14, 'Meg', { fill: MEG }));
    const cubes = (n) => [0, 1, 2, 3].slice(0, n).map(i => A.k('e' + i, A.cube(8, 40 + i * 13, 10, '#3fae5a'))).join('');
    // dice: [face, kept?]
    const dice = (fs) => fs.map(([f, kept], i) => A.k('d' + i, face(44 + i * 24, kept ? 162 : 124, f))).join('');
    const mcard = (x, name, cost, key) => A.k(key, A.card(x, 0, 30, 44, '#e9d6a7', {}) + A.text(x + 15, 16, name[0], { size: 5.5, weight: 700 }) + A.text(x + 15, 23, name[1], { size: 5.5, weight: 700 }) +
      A.circle(x + 15, 34, 5.5, '#3fae5a', { sw: 1 }) + A.text(x + 15, 34.5, cost, { size: 6, weight: 800, fill: '#fff' }));
    const market = (bought) => A.group((bought ? '' : mcard(0, ['Armor', 'Plating'], 4, 'armor')) + mcard(33, ['Energy', 'Hoarder'], 3, 'hoard') + mcard(66, ['Giant', 'Brain'], 5, 'brain'), 'translate(216 128)');
    const slash = A.k('slash', [0, 1, 2].map(i => A.line(146 + i * 7, 40, 156 + i * 7, 58, { stroke: '#fff', sw: 2.4 })).join(''));
    return [
      { step: 0, say: 'Kai rolls all 6 dice: **3-3-3**, a claw, a 1 and a heart.',
        svg: sky + kai(false, 10, 0) + meg(true, 7, 6) + cubes(3) + market() + dice([['3'], ['3'], ['3'], ['C'], ['1'], ['H']]) },
      { step: 0, say: 'He keeps those 4 and rerolls the other two: an **energy** and a 2. He keeps the energy too.',
        svg: sky + kai(false, 10, 0) + meg(true, 7, 6) + cubes(3) + market() + dice([['3', 1], ['3', 1], ['3', 1], ['C', 1], ['E', 1], ['2']]) },
      { step: 0, say: 'Last reroll: another **3**! Three rolls total, and the dice are locked.',
        svg: sky + kai(false, 10, 0) + meg(true, 7, 6) + cubes(3) + market() + dice([['3', 1], ['3', 1], ['3', 1], ['C', 1], ['E', 1], ['3', 1]]) + A.glow(174, 172, 14, 'g-d5') },
      { step: 1, say: 'Four 3s: **4 VP** (3 for the triple +1). The energy die gives 1 cube, and the claw hits Meg in Tokyo for 1.',
        svg: sky + kai(false, 10, 4) + meg(true, 6, 6) + cubes(4) + market() + dice([['3', 1], ['3', 1], ['3', 1], ['C', 1], ['E', 1], ['3', 1]]) + slash + A.glow(160, 52, 26, 'g-meg') },
      { step: 2, say: 'Meg **yields** and leaves Tokyo. Kai must move in: **+1 VP**. Now everyone else’s claws will hit him.',
        svg: sky + kai(true, 10, 5) + meg(false, 6, 6) + cubes(4) + market() + A.glow(160, 52, 26, 'g-kai') },
      { step: 3, say: 'Kai spends **4 energy** on Armor Plating, a Keep card that blocks any 1-damage hit. A new card refills the market.',
        svg: sky + kai(true, 10, 5) + meg(false, 6, 6) + market(true) + A.k('armor', A.card(196, 26, 30, 44, '#e9d6a7', {}) + A.text(211, 42, 'Armor', { size: 5.5, weight: 700 }) + A.text(211, 49, 'Plating', { size: 5.5, weight: 700 }) + A.circle(211, 60, 5.5, '#3fae5a', { sw: 1 }) + A.text(211, 60.5, 4, { size: 6, weight: 800, fill: '#fff' })) +
          A.k('new', A.group(A.card(0, 0, 30, 44, '#e9d6a7', {}) + A.text(15, 16, 'Fire', { size: 5.5, weight: 700 }) + A.text(15, 23, 'Breathing', { size: 5, weight: 700 }) + A.circle(15, 34, 5.5, '#3fae5a', { sw: 1 }) + A.text(15, 34.5, 4, { size: 6, weight: 800, fill: '#fff' }), 'translate(216 128)')) },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#2a2350');
    // skyline
    const bld = [[0, 40, 26], [24, 60, 22], [44, 30, 30], [72, 70, 18], [88, 45, 28], [214, 55, 24], [236, 28, 30], [264, 62, 20], [282, 38, 38]];
    for (const [x, y, w] of bld) {
      o += A.rect(x, y, w, 120 - y, '#3e3570', { rx: 0, sw: 0 });
      for (let wy = y + 8; wy < 110; wy += 12) for (let wx = x + 5; wx < x + w - 4; wx += 8) o += A.rect(wx, wy, 4, 5, '#f2c95a', { rx: 0, sw: 0, opacity: 0.55 });
    }
    // Tokyo platform
    o += A.path('M86 120 L234 120 L260 150 L60 150 Z', { fill: '#d8403a', sw: 2 });
    o += A.path('M110 122 L210 122 L222 136 L98 136 Z', { fill: '#f2e6cc', sw: 1 });
    const monster = (x, y, s, f, eye) => {
      const k = s / 40;
      let m = A.path(`M${x - 14 * k} ${y} q-4 ${-22 * k} ${6 * k} ${-30 * k} l${-2 * k} ${-8 * k} l${7 * k} ${4 * k} l${3 * k} ${-8 * k} l${4 * k} ${8 * k} l${6 * k} ${-5 * k} l${-1 * k} ${9 * k} q${10 * k} ${8 * k} ${6 * k} ${30 * k} z`, { fill: f, sw: 1.6 });
      m += A.path(`M${x - 14 * k} ${y - 16 * k} l${-9 * k} ${-8 * k}`, { stroke: C.ink, sw: 4 }) + A.path(`M${x - 14 * k} ${y - 16 * k} l${-9 * k} ${-8 * k}`, { stroke: f, sw: 2.4 });
      m += A.path(`M${x + 14 * k} ${y - 16 * k} l${9 * k} ${-9 * k}`, { stroke: C.ink, sw: 4 }) + A.path(`M${x + 14 * k} ${y - 16 * k} l${9 * k} ${-9 * k}`, { stroke: f, sw: 2.4 });
      m += A.circle(x - 4 * k, y - 22 * k, 3.5 * k, eye || C.white, { sw: 1 }) + A.circle(x + 5 * k, y - 22 * k, 3.5 * k, eye || C.white, { sw: 1 });
      m += A.circle(x - 4 * k, y - 22 * k, 1.4 * k, C.ink, { sw: 0 }) + A.circle(x + 5 * k, y - 22 * k, 1.4 * k, C.ink, { sw: 0 });
      m += A.path(`M${x - 5 * k} ${y - 12 * k} q${5 * k} ${4 * k} ${10 * k} 0`, { stroke: C.ink, sw: 1.4 });
      return m;
    };
    o += monster(160, 132, 54, '#5fb04a');
    o += monster(36, 172, 36, '#8d5fae') + monster(290, 172, 36, '#e07b2e');
    // claw slash toward Tokyo
    for (let i = 0; i < 3; i++) o += A.line(62 + i * 6, 120 + i * 3, 80 + i * 6, 104 + i * 3, { stroke: '#fff', sw: 2.2 });
    // dice
    const face = (x, y, f) => {
      let d = A.die(x, y, 20, typeof f === 'string' && /^[123]$/.test(f) ? f : '', C.white);
      const cx = x + 10, cy = y + 10;
      if (f === 'E') d += A.poly([[cx + 2, cy - 7], [cx - 5, cy + 1], [cx, cy + 1], [cx - 2, cy + 7], [cx + 5, cy - 1], [cx, cy - 1]], '#3fae5a', { sw: 0.8 });
      if (f === 'H') d += A.heart(cx, cy + 1, 9, '#d8403a', { sw: 0.8 });
      if (f === 'C') for (let i = -1; i <= 1; i++) d += A.line(cx - 4 + i * 4, cy + 5, cx + 1 + i * 4, cy - 5, { stroke: C.ink, sw: 2 });
      return d;
    };
    ['3', '3', '3', 'C', 'E', 'H'].forEach((f, i) => { o += face(92 + i * 23, 156, f); });
    // energy cubes
    for (let i = 0; i < 4; i++) o += A.cube(234 + (i % 2) * 11, 154 + Math.floor(i / 2) * 11, 9, '#3fae5a');
    o += A.note(110, 140, 64, 14, 'Tokyo: +2 VP a turn');
    o += A.note(150, 176, 120, 189, '6 dice, 3 rolls');
    o += A.note(244, 176, 262, 189, 'Energy buys cards');
    return o;
  },
});
