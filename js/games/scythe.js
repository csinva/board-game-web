defineGame({
  id: 'scythe',
  name: 'Scythe',
  year: 2016,
  designer: 'Jamey Stegmaier',
  family: 'engine',
  players: [1, 5], best: '4',
  time: [90, 120],
  age: 14,
  mechanics: ['engine-building', 'area-control', 'variable-powers', 'resource-management'],
  profile: { complexity: 3, luck: 2, interaction: 3, conflict: 3, talk: 2, planning: 4 },
  color: '#7a6a3a',

  pitch: 'Grow a farming nation into a war machine: tune your action board, spread workers and giant mechs, and race to place six stars.',
  theme: 'You lead one of five factions in an alternate 1920s Europe, claiming land around a mysterious Factory with workers and walking mechs.',

  goal: { big: 'Most coins', text: 'The richest player wins. At the end you earn **coins** for stars, territories and resources, multiplied by how **popular** you are, plus any coins in hand.' },

  turn: {
    type: 'choose',
    intro: 'Move your token to a different section of your board than last turn, do its top action, then (optionally) its bottom action:',
    outro: 'Next player (no rounds, turns just go around)',
    steps: [
      { verb: 'Move', text: 'Move up to 2 units 1 territory each (workers, mechs, your leader), or gain $1.' },
      { verb: 'Produce', text: 'Each worker on up to 2 territories produces 1 of that land’s resource (villages make **workers**).' },
      { verb: 'Trade', text: 'Pay $1 for any 2 resources, or for 1 popularity.' },
      { verb: 'Bolster', text: 'Pay $1 for 2 power or 1 combat card.' },
    ],
  },

  tension: 'Every star you place ends the game sooner, so you must decide whether to race for stars or slow down to build territory, popularity and coins.',

  flow: [
    { label: 'Produce', items: ['Workers make resources', 'Trade with coins', 'More workers on villages'] },
    { label: 'Improve', items: ['Upgrade (oil)', 'Deploy mechs (metal)', 'Build (wood)', 'Enlist (food)'] },
    { label: 'Expand', items: ['Move onto new land', 'Encounters', 'Combat with power'] },
    { label: 'Score', items: ['Stars', 'Territories', 'Resources', '× popularity tier'] },
  ],

  end: { trigger: 'someone places their 6th star', detail: 'The game ends immediately. Stars come from finishing upgrades, mechs, structures, recruits or workers, an objective, combat wins (max 2), and maxing power or popularity.' },
  scoring: [
    { label: 'Stars', share: 4 },
    { label: 'Territories', share: 4 },
    { label: 'Resources', share: 1.5 },
    { label: 'Coins in hand', share: 2 },
  ],

  ref: {
    title: 'Bottom-row actions',
    rows: [
      ['Upgrade (oil)', 'stronger top action, cheaper bottom'],
      ['Deploy (metal)', 'a mech; unlocks a movement power'],
      ['Build (wood)', 'a structure with a bonus'],
      ['Enlist (food)', 'a recruit: ongoing bonus + one-off'],
      ['Coin bonus', 'printed on each bottom action'],
    ],
  },

  example: 'Last turn you used **Produce**, so you move to the Trade section. You pay $1 for 2 wood (top); on your mat Trade sits above **Build**, so you spend your wood to put a mill on your farm and take the printed coin bonus. The mill’s space now produces as if it had an extra worker.',

  setup: [
    'Each player takes a random faction board and player mat, placing pieces on the printed starting spaces.',
    'Set power, popularity and coins as the two boards show; take 2 objective cards.',
    'Put encounter tokens on the map and the Factory card deck in the centre.',
  ],

  terms: [
    ['Star', 'An achievement marker; the 6th one placed ends the game.'],
    ['Popularity', 'Sets your scoring tier: higher tiers pay more per star and hex.'],
    ['Power', 'Spent in combat, dialled secretly (max 7) plus combat cards.'],
    ['Mech', 'A war machine; carries workers and gives your faction new moves.'],
    ['Factory', 'Centre hex; worth 3 territories and a 5th action card.'],
  ],

  gotchas: [
    'You can’t pick the **same section** two turns in a row.',
    'Moving a mech or leader onto **enemy workers** alone scares them home, but you lose 1 popularity per worker.',
    'Only your leader triggers **encounters**, and workers can never move into a territory holding enemy units.',
  ],

  tips: [
    'Build a combo: pick sections whose top and bottom actions feed each other.',
    'Don’t ignore popularity; a low tier can cost you more coins than a star is worth.',
    'Keep power up so others think twice; often the threat of a fight is enough.',
  ],

  walk(A) {
    const C = A.C, s = 28;
    const at = (q, r) => [40 + s * 1.732 * (q + r / 2), 34 + 1.5 * s * r];
    let base = A.bg('#d8cfb4');
    const hexes = [[0, 0, '#7fb7d9', 'lake'], [1, 0, '#9aa0a8', 'mountain'], [2, 0, '#5a8a4a', 'forest'], [3, 0, '#d9e3e8', 'tundra'],
      [0, 1, '#e8c547', 'farm'], [1, 1, '#c8a46b', 'village'], [2, 1, '#5a8a4a', 'forest']];
    for (const [q, r, f] of hexes) { const [x, y] = at(q, r); base += A.hex(x, y, s, f, { sw: 1, stroke: '#4a4030' }); }
    const [fx, fy] = at(0, 1), [wx, wy] = at(2, 0), [mx, my] = at(1, 0);
    base += A.text(fx, fy + 18, 'farm', { size: 7, fill: '#5a4632' }) + A.text(wx, wy + 18, 'forest', { size: 7, fill: '#fff' });
    base += A.meeple(fx - 11, fy - 2, 15, C.red) + A.meeple(wx, wy - 3, 15, C.red);
    base += A.rect(mx - 7, my - 9, 14, 11, C.red, { rx: 2, sw: 1.1 }) + A.line(mx - 4, my + 2, mx - 5, my + 8, { sw: 2 }) + A.line(mx + 4, my + 2, mx + 5, my + 8, { sw: 2 });
    // Player panel
    base += A.rect(222, 8, 92, 102, '#efe3c8', { rx: 6, sw: 1.2 }) + A.tag(268, 20, 'You (red)', { fill: C.red });
    base += A.text(232, 42, '$', { size: 11, weight: 800, anchor: 'start' });
    base += A.text(232, 80, 'Power 3', { size: 9, anchor: 'start' }) + A.text(232, 96, 'Popularity 4', { size: 9, anchor: 'start' });
    // Player mat: 4 sections, top and bottom actions
    base += A.rect(6, 116, 308, 80, '#b9ab86', { rx: 6, sw: 1.4 });
    const tops = ['Move', 'Produce', 'Trade', 'Bolster'], bots = ['Upgrade', 'Deploy', 'Build', 'Enlist'];
    const sx = i => 12 + i * 76;
    for (let i = 0; i < 4; i++) {
      base += A.rect(sx(i), 126, 70, 28, '#efe3c8', { rx: 3, sw: 1 }) + A.text(sx(i) + 35, 135, tops[i], { size: 9, weight: 800 });
      base += A.rect(sx(i), 158, 70, 32, '#d9cba6', { rx: 3, sw: 1 }) + A.text(sx(i) + 35, 167, bots[i], { size: 9, weight: 800 });
    }
    base += A.text(sx(2) + 35, 146, 'pay $1 → 2 res.', { size: 7 }) + A.text(sx(2) + 35, 180, '3 wood → +$2', { size: 7 });
    const token = i => A.k('token', A.rect(sx(i) + 10, 118, 50, 7, C.red, { rx: 3.5, sw: 1 }));
    const coins = n => { let r = ''; for (let i = 0; i < n; i++) r += A.k('c' + i, A.circle(248 + i * 10, 42, 5.5, '#e2b33c', { sw: 1 })); return r; };
    const wood = (i, x, y) => A.k('w' + i, A.cube(x, y, 9, '#8a5a33'));
    const woodFarm = n => { let r = ''; for (let i = 0; i < n; i++) r += wood(i, fx + 1 + (i % 2) * 9, fy - 12 + Math.floor(i / 2) * 9); return r; };
    const woodBuild = () => [0, 1, 2].map(i => wood(i, sx(2) + 18 + i * 12, 175)).join('');
    const mill = A.k('mill', A.rect(fx + 2, fy - 8, 12, 12, '#8a5a33', { rx: 1, sw: 1 }) + A.poly([[fx + 1, fy - 8], [fx + 8, fy - 15], [fx + 15, fy - 8]], '#5a4632', { sw: 1 }) +
      A.line(fx + 8, fy - 14, fx + 8, fy - 22, { sw: 1.5 }) + A.line(fx + 2, fy - 18, fx + 14, fy - 18, { sw: 1.5 }));
    return [
      { step: 1, say: 'Last turn your token sat on **Produce**. You can’t pick the same section twice in a row.', svg: base + token(1) + coins(5) + woodFarm(1) + A.glow(sx(1) + 35, 121, 14, 'g-tok') },
      { step: 2, say: 'You move it to **Trade**. Its top action: pay **$1** for any 2 resources.', svg: base + token(2) + coins(5) + woodFarm(1) + A.glow(sx(2) + 35, 140, 22, 'g-trade') },
      { step: 2, say: 'You pay $1 and take **2 wood**, placed on your farm where a worker stands.', svg: base + token(2) + coins(4) + A.k('c4', A.circle(sx(2) + 60, 140, 5.5, '#e2b33c', { sw: 1 })) + woodFarm(3) + A.glow(fx + 8, fy - 6, 16, 'g-farm') },
      { step: 2, say: 'Trade’s bottom action on your mat is **Build**: spend 3 wood from any territory you control.', svg: base + token(2) + coins(4) + woodBuild() + A.glow(sx(2) + 35, 174, 22, 'g-build') },
      { step: 2, say: 'Place a **mill** on the farm and take the coin bonus printed under Build on your mat (here **+$2**; it varies by mat).', svg: base + token(2) + coins(6) + mill + A.glow(fx + 8, fy - 10, 16, 'g-farm') + A.glow(293, 42, 12, 'g-coin') },
      { step: 1, say: 'From now on, when you **Produce**, the mill counts as an extra worker on that farm.', svg: base + token(2) + coins(6) + mill + A.glow(fx, fy, 22, 'g-farm2') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#d8cfb4');
    // hex map
    const s = 18, ox = 26, oy = 20;
    const terr = ['#5a8a4a', '#9aa0a8', '#e8c547', '#d9e3e8', '#c8a46b', '#7fb7d9'];
    const map = [
      [0, 1, 2, 0, 5, 3, 1, 2],
      [2, 5, 0, 4, 2, 0, 3, 0],
      [3, 0, 2, 9, 1, 2, 5, 4],
    ];
    map.forEach((row, r) => row.forEach((t, q) => {
      const x = ox + q * s * 1.732 + (r % 2) * s * 0.866, y = oy + r * s * 1.5;
      o += A.hex(x, y, s, t === 9 ? '#8a5a33' : terr[t], { sw: 0.8, stroke: '#4a4030' });
    }));
    // factory in centre hex (q3, r2)
    const fx = ox + 3 * s * 1.732, fy = oy + 2 * s * 1.5;
    o += A.rect(fx - 7, fy - 6, 14, 12, '#5a4632', { rx: 1, sw: 1 }) + A.rect(fx + 2, fy - 12, 4, 7, '#5a4632', { rx: 0, sw: 1 });
    // units: mechs (blocky), workers, leader
    const mech = (x, y, f) => A.rect(x - 6, y - 7, 12, 10, f, { rx: 2, sw: 1.1 }) + A.line(x - 4, y + 3, x - 5, y + 8, { sw: 2 }) + A.line(x + 4, y + 3, x + 5, y + 8, { sw: 2 });
    o += mech(ox + 1 * s * 1.732 + s * 0.866, oy + 1 * s * 1.5 - 2, C.red);
    o += mech(ox + 5 * s * 1.732, oy + 2 * s * 1.5 - 2, C.blue);
    o += A.meeple(ox + 2 * s * 1.732, oy + 3, 14, C.red) + A.meeple(ox + 2 * s * 1.732 + s * 0.866, oy + 1 * s * 1.5 + 2, 14, C.red);
    o += A.meeple(ox + 6 * s * 1.732, oy + 2 * s * 1.5 + 2, 14, C.blue);
    o += A.pawn(ox + 1 * s * 1.732, oy + 2 * s * 1.5, 16, C.red);
    // star track at right
    o += A.rect(282, 6, 32, 92, '#efe3c8', { rx: 5, sw: 1.2 });
    for (let i = 0; i < 6; i++) o += A.star(298, 17 + i * 14.5, 6, i < 3 ? C.red : '#d8cfb4', { sw: 0.8 });
    // player mat with 4 sections, top and bottom rows
    o += A.rect(8, 128, 268, 66, '#b9ab86', { rx: 6, sw: 1.4 });
    const tops = ['#e8c547', '#9aa0a8', '#c8a46b', '#5a8a4a'];
    for (let i = 0; i < 4; i++) {
      const x = 14 + i * 65;
      o += A.rect(x, 133, 60, 26, '#efe3c8', { rx: 3, sw: 1 });
      o += A.rect(x, 162, 60, 26, '#d9cba6', { rx: 3, sw: 1 });
      o += A.circle(x + 14, 146, 6, tops[i], { sw: 0.8 }) + A.circle(x + 30, 146, 4, '#e2b33c', { sw: 0.8 });
      for (let k = 0; k < 3; k++) o += A.cube(x + 30 + k * 9, 166, 7, ['#2b2b2b', '#8f939a', '#8a5a33', '#e8c547'][i]);
    }
    // action token on section 2
    o += A.rect(86, 126, 36, 6, C.red, { rx: 3, sw: 1 });
    o += A.note(fx, fy, 175, 110, 'The Factory');
    o += A.note(ox + 1 * s * 1.732 + s * 0.866, oy + 1 * s * 1.5 - 4, 38, 110, 'Mech');
    o += A.note(298, 89.5, 262, 110, '6th star ends it', { w: 96 });
    o += A.note(104, 146, 100, 110, 'Top action');
    o += A.note(150, 175, 230, 188, 'Bottom action');
    return o;
  },
});
