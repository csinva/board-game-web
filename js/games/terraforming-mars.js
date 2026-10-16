defineGame({
  id: 'terraforming-mars',
  name: 'Terraforming Mars',
  year: 2016,
  designer: 'Jacob Fryxelius',
  family: 'engine',
  players: [1, 5], best: '3',
  time: [90, 150],
  age: 12,
  mechanics: ['engine-building', 'tableau', 'hand-management', 'tile-placement', 'resource-management', 'drafting'],
  profile: { complexity: 4, luck: 3, interaction: 2, conflict: 2, talk: 1, planning: 4 },

  pitch: 'Run a corporation turning Mars green: play project cards that boost your income, then spend it raising heat, oxygen and oceans.',
  theme: 'You are a corporation hired to make Mars livable, competing for credit along the way.',

  goal: { big: 'Most points', text: 'Score the most victory points. Your **Terraform Rating (TR)** is the backbone; add points for greenery, cities, cards, milestones and awards.' },

  turn: {
    type: 'round',
    intro: 'Each generation (round):',
    outro: 'Next generation',
    steps: [
      { verb: 'Research', text: 'Everyone draws 4 project cards and **buys** any of them for 3 MC each; the rest are discarded.' },
      { verb: 'Act', text: 'Going around the table, take **1 or 2 actions** per turn: play a card, buy a standard project, turn 8 plants into a greenery, turn 8 heat into +2°C, claim a milestone or fund an award. Repeat until everyone has passed.' },
      { verb: 'Produce', text: 'Leftover energy becomes heat. Then everyone collects their production; your money income is **TR + MC production**.' },
    ],
  },

  tension: 'Building production makes every later generation richer, but raising temperature, oxygen and oceans scores now and brings the end closer, so you must judge when to stop investing and start cashing in.',

  flow: [
    { label: 'Collect', items: ['MC income (TR + production)', 'Plants & heat', 'Cards (3 MC each)'] },
    { label: 'Build', items: ['Project cards', 'Standard projects', 'Tiles on the map'] },
    { label: 'Score', items: ['+1 TR per global step', 'Greenery 1 VP', 'City: 1 VP per adjacent greenery', 'Card VP, milestones, awards'] },
  ],

  end: {
    trigger: 'Temperature, oxygen and oceans are **all** maxed out',
    detail: 'Finish that generation, including production. Everyone may then turn plants into greenery one last time before final scoring.',
  },
  scoring: [
    { label: 'Terraform Rating', share: 5 },
    { label: 'Greenery & cities', share: 2 },
    { label: 'Card VP', share: 2 },
    { label: 'Milestones & awards', share: 1 },
  ],

  ref: {
    title: 'Standard projects',
    rows: [
      ['Sell patents', 'discard cards, +1 MC each'],
      ['Power plant · 11 MC', '+1 energy production'],
      ['Asteroid · 14 MC', 'temperature +2°C'],
      ['Aquifer · 18 MC', 'place an ocean'],
      ['Greenery · 23 MC', 'place a greenery (+1% oxygen)'],
      ['City · 25 MC', 'place a city, +1 MC production'],
    ],
  },

  example: 'You have **8 plants**, so you turn them into a greenery next to your city: oxygen rises 1% and your TR goes from 24 to 25. For your second action you pay 14 MC for the **Asteroid** project: temperature +2°C, TR 26. Play passes left.',

  setup: [
    'Set oxygen to 0%, temperature to −30°C and every player’s TR to 20.',
    'Deal each player 2 corporations and 10 project cards; keep one corporation and buy any cards for 3 MC each.',
    'Take your corporation’s starting money and production. (First game: the Beginner Corporation gets 42 MC and keeps all 10 cards free.)',
  ],

  terms: [
    ['TR', 'Terraform Rating: your score track and income. Starts at 20; +1 per global step you raise.'],
    ['MC', 'MegaCredits, the money.'],
    ['Production', 'Your income levels on your player board, paid out every generation.'],
    ['Tag', 'Icon on a card (plant, space, …). Other cards count or require tags.'],
    ['Generation', 'One round of the game.'],
  ],

  gotchas: [
    'Cards are not free: in research you pay **3 MC** for each card you keep, even if you never play it.',
    'At production, unspent **energy turns into heat** before you collect anything.',
    'A card’s requirement (e.g. “oxygen 5%+”) only has to be met **when you play it**. Oceans go only on reserved spaces, and cities can’t touch each other.',
  ],

  tips: [
    'Early on, **production** beats points: an extra MC of income pays back every generation.',
    'Don’t hoard cards. Buy only what you expect to play soon; sell patents for spare cash.',
    'Claim a milestone the moment you qualify: only **3** can be claimed in the whole game.',
  ],

  extended: [
    { title: 'The generation, in full', items: [
      '**Player order**: the first-player marker moves one seat left each generation (skip it in generation 1, when you buy from your starting 10 cards instead of 4).',
      '**Action phase**: on your turn take 1 or 2 actions, or pass. Once you pass you are out until the next generation; everyone else keeps going.',
      '**Production phase**: all energy becomes heat, then collect MC (TR + MC production, which can be negative down to −5), steel, titanium, plants, energy and heat.',
    ] },
    { title: 'Global parameters', items: [
      '**Temperature** −30°C to +8°C in 2° steps (19 steps). Bonus: +1 heat production at −24 and −20, and a free ocean at 0°C.',
      '**Oxygen** 0% to 14% (14 steps). At 8% oxygen, also raise temperature one step.',
      '**Oceans**: 9 tiles, only on blue-reserved spaces. Placing any tile next to an ocean gives you **2 MC** per adjacent ocean.',
      'Every step you raise gives you **+1 TR**. Once a parameter is maxed, effects that would raise it do nothing (and give no TR), but you may still play the card.',
    ] },
    { title: 'Tiles and placement', items: [
      '**Greenery**: must go next to one of your own tiles if possible; raises oxygen 1 step; 1 VP at the end.',
      '**City**: may not be next to another city; at the end scores 1 VP per adjacent greenery, **whoever owns** the greenery.',
      'Printed bonuses on a space (steel, titanium, plants, cards) go to whoever places a tile there.',
      'Plants: 8 plants → greenery. Heat: 8 heat → +1 temperature step. Both are actions you can take any number of times.',
    ] },
    { title: 'Cards, tags and requirements', items: [
      '**Green** cards (automated) give production or one-off effects; **blue** cards stay active with ongoing effects or actions you can use once per generation; **red** events are played face-down and their tags no longer count.',
      '**Steel** pays 2 MC each toward building-tag cards; **titanium** pays 3 MC each toward space-tag cards.',
      'Requirements (min or max oxygen, temperature, oceans, or tags) only need to be true **when you play** the card.',
      'Attacks (“remove up to 3 plants from any player”) may target nobody if you choose; you can always resolve as much as possible.',
    ] },
    { title: 'Standard projects and selling', text: 'Standard projects are always available as one action each: sell patents (discard any number of cards for 1 MC each), power plant 11 MC, asteroid 14 MC, aquifer 18 MC, greenery 23 MC, city 25 MC. They are expensive but guarantee progress when your hand is weak, and they are how you finish off the last steps of a parameter late in the game.' },
    { title: 'Milestones and awards', items: [
      '**Milestones** (8 MC, worth 5 VP): claim one the moment you meet it, e.g. Terraformer (35 TR), Mayor (3 cities), Gardener (3 greeneries), Builder (8 building tags), Planner (16 cards in hand). Only **3** can be claimed per game.',
      '**Awards** cost 8, 14 and then 20 MC to fund; only 3 can be funded. At game end, 1st place gets 5 VP and 2nd gets 2 VP, even if someone else paid. Ties share the higher placing.',
    ] },
    { title: 'Final scoring', text: 'After the last production phase, everyone may convert plants into greenery one last time (oxygen is already maxed, so these give VP and city adjacency but no TR). Score TR, milestones and awards, 1 VP per greenery, city adjacency points, and VP printed on cards (including animals, microbes and other resources on cards). Most VP wins; ties go to the player with the most MC.' },
  ],

  walk(A) {
    const C = A.C, s = 20, ox = 105, oy = 108;
    const hx = (q, r) => A.hexAt(q, r, s, ox, oy);
    const sand = ['#c8643a', '#d27645', '#bd5833', '#d9834f'];
    let base = A.bg('#1d1830');
    for (let i = 0; i < 24; i++) base += A.circle((i * 83) % 180 + 30, (i * 47) % 200, 0.7, '#fff', { sw: 0, opacity: 0.5 });
    [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [-1, 1]].forEach(([q, r], i) => {
      const [x, y] = hx(q, r);
      const fill = q === -1 && r === 0 ? '#3c86c9' : sand[i % 4];
      base += A.hex(x, y, s, fill, { sw: 1, stroke: '#5a2a18' });
      if (fill === '#3c86c9') base += A.path(`M${x - 8} ${y} q4 -4 8 0 q4 4 8 0`, { stroke: '#cfe6f7', sw: 1.4 });
    });
    const [cx, cy] = hx(0, 0), [gx, gy] = hx(1, 0);
    base += A.city(cx + 2, cy + 8, 18, '#d8dbe2') + A.rect(cx - 4, cy - 14, 8, 8, C.red, { rx: 1, sw: 1 });
    // TR track
    base += A.text(36, 14, 'TR', { size: 10, weight: 800, fill: '#fff' });
    for (let i = 0; i < 5; i++) base += A.text(60 + i * 26, 14, 23 + i, { size: 10, fill: '#cfc8e0' });
    // Oxygen and temperature bars
    base += A.rect(10, 34, 16, 152, '#2c2a40', { rx: 6, stroke: '#8c8aa0', sw: 1 }) + A.text(18, 26, 'O₂', { size: 9, fill: '#cfe6f7', weight: 800 });
    base += A.rect(186, 34, 16, 152, '#2c2a40', { rx: 6, stroke: '#8c8aa0', sw: 1 }) + A.text(194, 26, '°C', { size: 9, fill: '#f3a08f', weight: 800 });
    // Player panel
    base += A.rect(214, 30, 102, 166, '#2c2a40', { rx: 6, stroke: '#8c8aa0', sw: 1 }) + A.tag(265, 16, 'You (red)', { fill: C.red });
    const row = (y, lab, col) => A.text(222, y, lab, { size: 8, fill: col, anchor: 'start', weight: 800 });
    base += row(46, 'MC', '#e2b33c') + row(72, 'Plant', '#7fd06b') + row(100, 'Energy', '#c58df0') + row(124, 'Heat', '#f08a5d');
    base += A.text(222, 146, 'Hand', { size: 8, fill: '#cfc8e0', anchor: 'start', weight: 800 });

    const tr = v => A.k('tr', A.circle(60 + (v - 23) * 26, 14, 9, 'none', { stroke: '#ffcf3f', sw: 2 }));
    const o2 = v => A.rect(13, 176 - v * 10, 10, 8, '#7fd0f0', { rx: 2, sw: 0 });
    const oxy = v => { let r = ''; for (let i = 0; i < v; i++) r += o2(i); return r + A.k('o2', A.rect(11, 174 - v * 10, 14, 12, '#fff', { rx: 3, sw: 1 }) + A.text(18, 180 - v * 10, v, { size: 7, weight: 800 })); };
    const temp = c => { const v = (c + 30) / 2; let r = ''; for (let i = 0; i < v; i++) r += A.rect(189, 177 - i * 7.5, 10, 6, '#e0442f', { rx: 1.5, sw: 0 });
      return r + A.k('temp', A.rect(184, 175 - v * 7.5, 20, 11, '#fff', { rx: 3, sw: 1 }) + A.text(194, 180.5 - v * 7.5, c, { size: 7, weight: 800 })); };
    const mc = v => A.k('mc' + v, A.circle(256, 46, 8, '#e2b33c', { sw: 1 }) + A.text(276, 46, v, { size: 11, fill: '#fff', weight: 800 }));
    const cube = (x, y, f) => A.rect(x, y, 8, 8, f, { rx: 1.5, sw: 0.8 });
    const plants = (n, at) => { let r = ''; for (let i = 0; i < n; i++) r += A.k('p' + i, at ? cube(at[0] - 18 + (i % 4) * 9, at[1] - 9 + Math.floor(i / 4) * 9, '#4f9a3c') : cube(260 + (i % 4) * 11, 63 + Math.floor(i / 4) * 10, '#4f9a3c')); return r; };
    const energy = n => { let r = ''; for (let i = 0; i < n; i++) r += A.k('e' + i, cube(260 + i * 11, 96, '#a36be0')); return r; };
    const heat = (n, extra) => { let r = ''; for (let i = 0; i < n; i++) r += A.k('h' + i, cube(260 + (i % 5) * 11, 120, '#e0612f')); for (let i = 0; i < (extra || 0); i++) r += A.k('e' + i, cube(260 + ((n + i) % 5) * 11, 120 + 0, '#e0612f')); return r; };
    const card = (x, y, f, lab) => A.card(x, y, 26, 32, f, { title: lab, label: '' });
    const drawn = [['c1', '#4f9a3c', 'Trees'], ['c2', '#2f6db5', 'Mine'], ['c3', '#c8423b', 'Comet'], ['c4', '#4f9a3c', 'Lichen']];
    const hand = drawn.filter(d => d[0] === 'c1' || d[0] === 'c3').map((d, i) => A.k(d[0], card(226 + i * 30, 154, d[1], d[2]))).join('');
    const greenery = A.k('green', A.hex(gx, gy, s - 1, '#4f9a3c', { sw: 1.2, stroke: '#2a5a20' }) + A.rect(gx - 4, gy - 4, 8, 8, C.red, { rx: 1, sw: 1 }));
    const asteroid = A.k('ast', A.circle(170, 46, 9, '#8f939a', { sw: 1.2 }) + A.circle(167, 43, 2, '#6b6f75', { sw: 0 }) + A.line(158, 36, 146, 26, { stroke: '#f3a08f', sw: 2 }));

    return [
      { step: 0, say: '**Research.** You draw 4 project cards. Each one you keep costs **3 MC**.', svg: base + tr(24) + oxy(5) + temp(-12) + mc(40) + plants(8) + energy(2) + heat(3) +
        drawn.map((d, i) => A.k(d[0], card(48 + i * 30, 162, d[1], d[2]))).join('') },
      { step: 0, say: 'You keep **Trees** and **Comet** for 6 MC (40 → 34). The other two are discarded.', svg: base + tr(24) + oxy(5) + temp(-12) + mc(34) + plants(8) + energy(2) + heat(3) + hand + A.glow(272, 46, 17, 'g-mc') },
      { step: 1, say: '**Action 1:** spend your **8 plants** to place a greenery next to your city.', svg: base + tr(24) + oxy(5) + temp(-12) + mc(34) + plants(8, [gx, gy]) + energy(2) + heat(3) + hand + A.glow(gx, gy, 22, 'g-hex') },
      { step: 1, say: 'The greenery raises **oxygen 1%**, and every global step gives **+1 TR**: 24 → 25.', svg: base + tr(25) + oxy(6) + temp(-12) + mc(34) + greenery + energy(2) + heat(3) + hand + A.glow(18, 120, 12, 'g-o2') },
      { step: 1, say: '**Action 2:** pay 14 MC for the **Asteroid** standard project: temperature +2°C, TR 26.', svg: base + tr(26) + oxy(6) + temp(-10) + mc(20) + greenery + energy(2) + heat(3) + hand + asteroid + A.glow(194, 98, 13, 'g-temp') },
      { step: 2, say: '**Production.** Leftover energy turns into **heat**, then you collect income: TR 26 + MC production 2 = **28 MC**.', svg: base + tr(26) + oxy(6) + temp(-10) + mc(48) + greenery + heat(3, 2) + hand + A.glow(272, 46, 17, 'g-mc') },
    ];
  },

  art(A) {
    const C = A.C, s = 10.6, ox = 160, oy = 101;
    const sand = ['#c8643a', '#d27645', '#bd5833', '#d9834f'];
    const tiles = {
      '-3,-1': 'o', '-2,-1': 'o', '-1,-2': 'o', '3,-3': 'o', '4,-3': 'o', '-4,2': 'o', '-3,2': 'o', '-1,4': 'o', '3,1': 'o',
      '0,-1': 'g', '1,-2': 'g', '0,0': 'c', '-1,0': 'g', '1,0': 'g', '-1,1': 'g',
      '2,1': 'c', '2,0': 'g', '-2,3': 'c', '-1,3': 'g', '2,-3': 'g',
    };
    const owner = { '0,-1': C.red, '1,-2': C.red, '0,0': C.red, '-1,0': C.blue, '1,0': C.red, '-1,1': C.blue, '2,1': C.blue, '2,0': C.green, '-2,3': C.green, '-1,3': C.green, '2,-3': C.blue };
    let o = A.bg('#1d1830');
    for (let i = 0; i < 40; i++) o += A.circle((i * 83) % 320, (i * 47) % 200, (i % 3) * 0.4 + 0.5, '#fff', { sw: 0, opacity: 0.6 });
    o += A.circle(ox, oy, 96, '#9c3f22', { sw: 0, opacity: 0.55 });
    for (let r = -4; r <= 4; r++) for (let q = Math.max(-4, -4 - r); q <= Math.min(4, 4 - r); q++) {
      const [x, y] = A.hexAt(q, r, s, ox, oy), k = q + ',' + r, t = tiles[k];
      const fill = t === 'o' ? '#3c86c9' : t === 'g' ? '#4f9a3c' : t === 'c' ? '#9aa0ab' : sand[(q * 7 + r * 3 + 40) % 4];
      o += A.hex(x, y, s, fill, { sw: 0.8, stroke: '#5a2a18' });
      if (t === 'c') o += A.city(x + 1, y + 5, 10, '#d8dbe2');
      if (t === 'o') o += A.path(`M${x - 5} ${y} q2.5 -2.5 5 0 q2.5 2.5 5 0`, { stroke: '#cfe6f7', sw: 1.1 });
      if (owner[k]) o += A.rect(x - 3, y - (t === 'c' ? 9 : 3), 6, 6, owner[k], { rx: 1, sw: 0.8 });
    }
    // Oxygen track (left) and temperature thermometer (right)
    o += A.rect(14, 22, 16, 150, '#2c2a40', { rx: 8, stroke: '#8c8aa0', sw: 1 });
    for (let i = 0; i < 14; i++) o += A.rect(17, 160 - i * 10, 10, 8, i < 6 ? '#7fd0f0' : '#3a3852', { rx: 2, sw: 0 });
    o += A.text(22, 182, 'O₂', { size: 10, fill: '#cfe6f7', weight: 800 });
    o += A.rect(292, 18, 14, 146, '#2c2a40', { rx: 7, stroke: '#8c8aa0', sw: 1 });
    o += A.rect(296, 92, 6, 76, '#e0442f', { rx: 3, sw: 0 });
    o += A.circle(299, 172, 10, '#e0442f', { stroke: '#8c8aa0', sw: 1 });
    for (let i = 0; i < 19; i++) o += A.line(306, 22 + i * 7.5, 309, 22 + i * 7.5, { stroke: '#8c8aa0', sw: 0.8 });
    const [cx, cy] = A.hexAt(0, 0, s, ox, oy), [gx, gy] = A.hexAt(-1, 1, s, ox, oy), [wx, wy] = A.hexAt(-4, 2, s, ox, oy);
    o += A.note(22, 112, 62, 14, 'Oxygen 0–14%');
    o += A.note(297, 95, 262, 186, 'Temperature −30 → +8°C');
    o += A.note(wx, wy, 52, 186, 'Ocean tile');
    o += A.note(gx, gy + 2, 120, 186, 'Greenery');
    o += A.note(cx + 2, cy - 4, 258, 14, 'City (cube = owner)');
    return o;
  },
});
