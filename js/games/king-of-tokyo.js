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

  // The six die faces, energy cube, health and Tokyo. The walk and art draw dice with these.
  icons: (() => {
    const face = (A, inner, v = '') => A.die(2.5, 2.5, 19, v) + inner;
    return {
      k1: { name: '1', draw: A => face(A, A.text(12, 12.6, '1', { size: 14, weight: 800 })) },
      k2: { name: '2', draw: A => face(A, A.text(12, 12.6, '2', { size: 14, weight: 800 })) },
      k3: { name: '3', draw: A => face(A, A.text(12, 12.6, '3', { size: 14, weight: 800 })) },
      energy: { name: 'energy', draw: A => face(A, A.poly([[14, 5], [7, 13], [12, 13], [10, 19], [17, 11], [12, 11]], '#3fae5a', { sw: 0.8 })) },
      heal: { name: 'heart', draw: A => face(A, A.heart(12, 13, 9, '#d8403a', { sw: 0.8 })) },
      claw: { name: 'smash', draw: A => face(A, [-1, 0, 1].map(i => A.line(8 + i * 4, 17, 13 + i * 4, 7, { stroke: '#2a2420', sw: 2 })).join('')) },
      cube: { name: 'energy cube', draw: A => A.cube(4, 1.5, 16, '#3fae5a') },
      hp: { name: 'health', draw: A => A.heart(12, 14, 13, '#d8403a', { sw: 1.3 }) },
      tokyo: { name: 'Tokyo', draw: A => A.rect(4, 6, 4.5, 10, '#3e3570', { rx: 0, sw: 1 }) + A.rect(9.5, 2.5, 5, 13.5, '#3e3570', { rx: 0, sw: 1 }) + A.rect(15.5, 7, 4.5, 9, '#3e3570', { rx: 0, sw: 1 }) + A.poly([[2, 15.5], [22, 15.5], [19.5, 21.5], [4.5, 21.5]], '#d8403a', { sw: 1.3 }) },
    };
  })(),

  pitch: 'Roll 6 dice up to three times to score, gain energy, heal or attack; reach 20 points or be the last monster alive.',

  goal: { big: '20 points', text: 'First to **20 victory points** wins, or be the **last monster standing**.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Roll', text: 'Roll **6 dice**, then reroll any of them up to **2 more** times.' },
      { verb: 'Resolve', text: 'Score triples of {=k1}{=k2}{=k3}; take 1 {=cube} per {=energy}; heal 1 per {=heal}; deal 1 damage per {=claw}.' },
      { verb: 'Tokyo', text: 'If {=tokyo} Tokyo is empty, you **must** move in (+1 {=vp}). With 5–6 players, if Tokyo City is taken but Tokyo Bay is empty, move into the Bay.' },
      { verb: 'Buy', text: 'Spend {=cube} on any of the 3 face-up power cards (or 2 {=cube} to replace all 3).' },
    ],
  },

  tension: 'Tokyo pays the most points but makes you everyone’s target, and you can’t heal there.',

  structure: [
    { label: 'Setup', text: 'Monsters at 10 {=hp} and 0 VP; 3 power cards face up; Tokyo empty.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn: roll up to 3 times, resolve dice, enter Tokyo if empty, buy cards.' },
    { label: 'Game end', text: 'A monster reaches **20 VP**, or only one monster is left.' },
  ],

  points: [
    ['{=k1} {=k2} {=k3} triples', '1 / 2 / 3 VP; +1 per extra matching die'],
    ['{=tokyo} Enter Tokyo', '+1 VP'],
    ['Start turn in Tokyo', '+2 VP'],
    ['Power cards', 'VP as printed'],
  ],

  end: { trigger: 'a turn ends with a monster at 20 VP or only one monster left', detail: 'A monster at 0 health is out immediately and discards its cards and {=cube}. You must survive your turn to win; if every remaining monster is eliminated at once, everyone loses.' },
  scoring: [
    { label: '{=tokyo} Holding Tokyo', share: 4 },
    { label: '{=k3} Number triples', share: 3 },
    { label: 'Power cards', share: 3 },
  ],

  ref: {
    title: 'Dice faces',
    rows: [
      ['{=k1} {=k2} {=k3}', 'Score only as three (or more) of a kind'],
      ['{energy}', '1 {cube} each'],
      ['{heal}', 'heal 1 {=hp} (max 10); not in Tokyo'],
      ['{claw}', '1 damage to each monster on the other side (in / out of Tokyo)'],
    ],
  },

  example: 'Kai keeps {=k3}{=k3}{=k3}{=claw} and rerolls twice, ending with another {=k3} and an {=energy}. He scores **4 VP** (3 for the triple, +1 for the extra 3), takes 1 {=cube}, and his claw deals 1 damage to Meg in Tokyo. She yields, so Kai must enter Tokyo (+1 VP).',

  setup: [
    'Each player picks a monster: health dial at **10**, VP dial at **0**.',
    'Shuffle the power cards, deal 3 face up, and pile the {=cube} energy cubes.',
    'With 5–6 players, also use **Tokyo Bay**, a second spot in Tokyo that works like Tokyo City. Once 4 or fewer monsters remain, its monster leaves (or moves to an empty Tokyo City).',
    'Everyone rolls the 6 dice; most {=claw} goes first. No one starts in Tokyo.',
    'Optional 2-player rule: entering Tokyo or starting a turn there gives 1 {=cube} instead of VP.',
  ],

  terms: [
    ['{=tokyo} Tokyo', 'The centre spot. Its monster is hit by every other monster’s {=claw} and can’t heal with {=heal}.'],
    ['Yield', 'When hit in Tokyo you may leave; the attacker must take your place.'],
    ['{=cube} Energy', 'Cubes that buy power cards.'],
    ['Keep / Discard card', 'Keep cards are permanent powers; Discard cards work once.'],
  ],

  gotchas: [
    '{=claw} hits **everyone outside** if you are in Tokyo, but only the monster(s) **in Tokyo** if you are outside.',
    'You can’t heal with {=heal} in Tokyo (cards can still heal you).',
    'You may yield only right after losing health to another monster’s {=claw} dice (not card damage); the damage still counts.',
    'Monsters in Tokyo City and Tokyo Bay never hit each other.',
  ],

  tips: [
    'Leave Tokyo before your health gets low; 2 VP a turn isn’t worth dying for.',
    'Number triples are slow; claws and energy win more games.',
    'Buy Keep cards early: a permanent power pays every turn.',
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
    const FACE = { 1: 'k1', 2: 'k2', 3: 'k3', E: 'energy', H: 'heal', C: 'claw' };
    const face = (x, y, f) => A.use(this.icons[FACE[f]].draw(A), x - 2.63, y - 2.63, 25.26);
    const sky = A.bg('#2a2350') + A.rect(0, 118, 320, 82, '#f6efe0', { sw: 0, rx: 0 }) + A.line(0, 118, 320, 118, { sw: 1.5 }) +
      A.poly([[112, 70], [208, 70], [222, 90], [98, 90]], '#d8403a', { sw: 2 }) + A.text(160, 81, 'TOKYO', { size: 9, weight: 800, fill: '#fff', spacing: 2 }) +
      A.text(10, 134, 'Roll', { size: 9, anchor: 'start' }) + A.text(10, 172, 'Keep', { size: 9, anchor: 'start' });
    const stats = (x, hp, vp) => A.text(x, 104, `♥${hp}  ★${vp}`, { size: 10, weight: 800, fill: '#fff' });
    const kai = (inTokyo, hp, vp) => A.k('kai', monster(inTokyo ? 160 : 52, 74, 44, KAI) + stats(inTokyo ? 160 : 52, hp, vp)) + A.k('kai-tag', A.tag(inTokyo ? 160 : 52, 14, 'Kai', { fill: KAI }));
    const meg = (inTokyo, hp, vp) => A.k('meg', monster(inTokyo ? 160 : 268, 74, 44, MEG) + stats(inTokyo ? 160 : 268, hp, vp)) + A.k('meg-tag', A.tag(inTokyo ? 160 : 268, 14, 'Meg', { fill: MEG }));
    const cubes = (n) => [0, 1, 2, 3].slice(0, n).map(i => A.k('e' + i, A.use(this.icons.cube.draw(A), 5.5, 38 + i * 13, 15))).join('');
    // dice: [face, kept?]
    const dice = (fs) => fs.map(([f, kept], i) => A.k('d' + i, face(44 + i * 24, kept ? 162 : 124, f))).join('');
    const mcard = (x, name, cost, key) => A.k(key, A.card(x, 0, 30, 44, '#e9d6a7', {}) + A.text(x + 15, 16, name[0], { size: 5.5, weight: 700 }) + A.text(x + 15, 23, name[1], { size: 5.5, weight: 700 }) +
      A.circle(x + 15, 34, 5.5, '#3fae5a', { sw: 1 }) + A.text(x + 15, 34.5, cost, { size: 6, weight: 800, fill: '#fff' }));
    const market = (bought) => A.group((bought ? '' : mcard(0, ['Armor', 'Plating'], 4, 'armor')) + mcard(33, ['Energy', 'Hoarder'], 3, 'hoard') + mcard(66, ['Giant', 'Brain'], 5, 'brain'), 'translate(216 128)');
    const slash = A.k('slash', [0, 1, 2].map(i => A.line(146 + i * 7, 40, 156 + i * 7, 58, { stroke: '#fff', sw: 2.4 })).join(''));
    return [
      { step: 0, say: 'Kai rolls all 6 dice: {=k3}{=k3}{=k3}{=claw}{=k1}{=heal}.',
        svg: sky + kai(false, 10, 0) + meg(true, 7, 6) + cubes(3) + market() + dice([['3'], ['3'], ['3'], ['C'], ['1'], ['H']]) },
      { step: 0, say: 'He keeps 4 and rerolls 2: {=energy}{=k2}. He keeps the {=energy} too.',
        svg: sky + kai(false, 10, 0) + meg(true, 7, 6) + cubes(3) + market() + dice([['3', 1], ['3', 1], ['3', 1], ['C', 1], ['E', 1], ['2']]) },
      { step: 0, say: 'Last reroll: another {=k3}. That was roll 3, so the dice are final.',
        svg: sky + kai(false, 10, 0) + meg(true, 7, 6) + cubes(3) + market() + dice([['3', 1], ['3', 1], ['3', 1], ['C', 1], ['E', 1], ['3', 1]]) + A.glow(174, 172, 14, 'g-d5') },
      { step: 1, say: 'Four {=k3}: **4 VP** (3 for the triple, +1). {=energy} gives 1 {=cube}; {=claw} deals 1 damage to Meg in Tokyo.',
        svg: sky + kai(false, 10, 4) + meg(true, 6, 6) + cubes(4) + market() + dice([['3', 1], ['3', 1], ['3', 1], ['C', 1], ['E', 1], ['3', 1]]) + slash + A.glow(160, 52, 26, 'g-meg') },
      { step: 2, say: 'Meg **yields** and leaves Tokyo. Kai must move in: **+1 VP**. Now every other monster’s claws hit him.',
        svg: sky + kai(true, 10, 5) + meg(false, 6, 6) + cubes(4) + market() + A.glow(160, 52, 26, 'g-kai') },
      { step: 3, say: 'Kai spends 4 {=cube} on Armor Plating, a Keep card that ignores any 1-damage hit. A new card fills the gap.',
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
    const FACE = { 1: 'k1', 2: 'k2', 3: 'k3', E: 'energy', H: 'heal', C: 'claw' };
    const face = (x, y, f) => A.use(this.icons[FACE[f]].draw(A), x - 2.63, y - 2.63, 25.26);
    ['3', '3', '3', 'C', 'E', 'H'].forEach((f, i) => { o += face(92 + i * 23, 156, f); });
    // energy cubes
    for (let i = 0; i < 4; i++) o += A.use(this.icons.cube.draw(A), 232 + (i % 2) * 12, 152 + Math.floor(i / 2) * 12, 13.5);
    o += A.note(110, 140, 64, 14, 'Tokyo: +2 VP a turn');
    o += A.note(150, 176, 120, 189, '6 dice, 3 rolls');
    o += A.note(244, 176, 262, 189, 'Energy buys cards');
    return o;
  },
});
