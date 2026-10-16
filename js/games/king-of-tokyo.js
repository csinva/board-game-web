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
