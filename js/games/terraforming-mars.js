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
