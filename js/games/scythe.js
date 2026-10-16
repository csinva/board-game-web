defineGame({
  id: 'scythe',
  name: 'Scythe',
  year: 2016,
  designer: 'Jamey Stegmaier',
  family: 'engine',
  players: [1, 5], best: '4',
  time: [90, 115],
  age: 14,
  mechanics: ['engine-building', 'area-control', 'variable-powers', 'resource-management'],
  profile: { complexity: 3, luck: 2, interaction: 3, conflict: 3, talk: 2, planning: 4 },
  color: '#7a6a3a',

  // Components drawn once, used inline in text ({oil}) and in the art / walkthrough.
  icons: {
    oil: { name: 'oil', draw: A => A.path('M12 2.5 C12 2.5 4.5 11.5 4.5 15.5 A7.5 7.5 0 0 0 19.5 15.5 C19.5 11.5 12 2.5 12 2.5Z', { fill: '#2b2b2b', sw: 1.3 }) + A.path('M8.5 15 q0 3 3 4', { stroke: '#8c877f', sw: 1.4 }) },
    metal: { name: 'metal', draw: A => A.poly([[2.5, 19.5], [6.5, 6], [17.5, 6], [21.5, 19.5]], '#8f939a', { sw: 1.3 }) + A.poly([[7.5, 9], [16.5, 9], [18, 13.5], [6, 13.5]], '#c9ccd1', { sw: 0 }) },
    wood: { name: 'wood', draw: A => A.rect(2.5, 7.5, 17, 10, '#8a5a33', { rx: 2, sw: 1.3 }) + A.circle(18.5, 12.5, 5, '#d9a66b', { sw: 1.3 }) + A.circle(18.5, 12.5, 2, 'none', { sw: 0.9, stroke: '#8a5a33' }) + A.line(5, 11, 13, 11, { stroke: '#5a3a1e', sw: 1 }) + A.line(6, 14.5, 12, 14.5, { stroke: '#5a3a1e', sw: 1 }) },
    food: { name: 'food', draw: A => A.path('M8.5 7.5 L7 3 H17 L15.5 7.5 C19.5 9.5 21.5 13 21.5 16 C21.5 20 17.5 22 12 22 C6.5 22 2.5 20 2.5 16 C2.5 13 4.5 9.5 8.5 7.5Z', { fill: '#e8c547', sw: 1.3 }) + A.line(8.5, 7.5, 15.5, 7.5, { stroke: '#8a5a33', sw: 1.6 }) + A.path('M12 20 V12 M12 14 l-2.5 -2.5 M12 14 l2.5 -2.5 M12 17 l-2.5 -2.5 M12 17 l2.5 -2.5', { stroke: '#a57d12', sw: 1.2 }) },
    power: { name: 'power', draw: A => A.circle(12, 12, 10, '#c8423b', { sw: 1.3 }) + A.poly([[13.5, 3.5], [7, 13.5], [11.5, 13.5], [10, 20.5], [17, 10], [12.5, 10]], '#f4d35e', { sw: 0.8 }) },
    popularity: { name: 'popularity', draw: A => A.heart(12, 14.5, 12.5, '#d9668f', { sw: 1.3 }) },
    star: { name: 'star', draw: A => A.star(12, 12.8, 10.5, '#c8423b', { sw: 1.3 }) },
    worker: { name: 'worker', draw: A => A.meeple(12, 12, 20, '#c8423b') },
    mech: { name: 'mech', draw: A => A.line(8.5, 14, 7, 21, { sw: 2.6 }) + A.line(15.5, 14, 17, 21, { sw: 2.6 }) + A.rect(4, 3.5, 16, 12, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.circle(12, 9.5, 2.6, '#f2e6cc', { sw: 1 }) },
    leader: { name: 'character', draw: A => A.pawn(12, 12, 22, '#c8423b') + A.star(12, 6.6, 2.6, '#f4d35e', { sw: 0.6 }) },
    structure: { name: 'structure', draw: A => A.rect(5, 12, 13, 10, '#8a5a33', { rx: 1, sw: 1.3 }) + A.poly([[3.5, 12], [11.5, 5], [19.5, 12]], '#5a4632', { sw: 1.3 }) + A.line(11.5, 6, 11.5, 1.5, { sw: 1.5 }) + A.line(6.5, 3, 16.5, 3, { sw: 1.5 }) },
    combat: { name: 'combat card', draw: A => A.rect(5, 2, 14, 20, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '+3', { size: 8.5, weight: 800, fill: '#fff' }) },
  },

  pitch: 'Pick one action section per turn to produce, build and expand; most coins wins once someone places a 6th star.',

  goal: { big: 'Most coins', text: 'Final coins = coins in hand + payouts for {star}s, territories and every 2 resources. Your **popularity** tier sets the payout rates.' },

  turn: {
    type: 'choose',
    intro: 'Move your token to a different section of your mat than last turn. Take its top action, its bottom action, or both (top first):',
    outro: 'Next player. There are no rounds.',
    steps: [
      { verb: 'Move', text: 'Move 2 different units ({worker}s, {mech}s, {leader}) 1 territory each, or gain 1 {=coin}. No crossing rivers or entering lakes without a mech ability; all tunnels are adjacent to each other.' },
      { verb: 'Produce', text: 'Pay the cost shown on your mat (it rises as you place workers). Each {=worker} on up to 2 territories you control produces 1 of that territory’s resource there; on a village it produces a **worker**.' },
      { verb: 'Trade', text: 'Pay 1 {=coin}: gain any 2 resources (placed with one of your workers), or 1 {popularity}.' },
      { verb: 'Bolster', text: 'Pay 1 {=coin}: gain 2 {power} or 1 {combat}.' },
    ],
  },

  tension: 'Each star you place brings the end closer. Race for stars, or slow down to build territory, popularity and coins?',

  structure: [
    { label: 'Setup', text: 'Each faction starts at its home base on the map edge. The lowest player-mat number goes first; play is clockwise.' },
    { label: 'Turns', repeat: 'clockwise', text: 'One mat section per turn. A {mech} or {leader} that enters a territory with rival units stops there; after all moves, it fights **combat** against any rival {=mech} or {=leader} there.' },
    { label: '6th star', text: 'The moment anyone places their 6th {=star}, the game ends.' },
    { label: 'Final scoring', text: 'Everyone counts coins at their **popularity** tier’s rates (below). Most coins wins.' },
  ],

  points: [
    ['{=popularity} Tier', 'Popularity 0–6 / 7–12 / 13–18 pays the 1st / 2nd / 3rd rate below'],
    ['{=star} Each star', '3 / 4 / 5 {=coin}'],
    ['Each territory you control', '2 / 3 / 4 {=coin} (lakes count; the Factory counts as 3; home bases don’t)'],
    ['Every 2 resources you control', '1 / 2 / 3 {=coin}'],
    ['{=structure} Structure bonus', 'coins per the bonus tile drawn at setup (same for every tier; your structures count even on territories you don’t control)'],
    ['{=coin} Coins in hand', '1 each'],
  ],

  end: { trigger: 'someone places their 6th star', detail: 'Play stops at once. Stars come from: all 6 upgrades, all 4 mechs, all 4 structures, all 4 recruits, all 8 workers, 1 objective, each combat win (max 2), 16 power, 18 popularity. Saxony has no limit on objective and combat stars. Ties: most workers + mechs + structures, then power, popularity, resources, territories, stars.' },
  scoring: [
    { label: '{=star} Stars', share: 4 },
    { label: 'Territories', share: 4 },
    { label: 'Resources', share: 1.5 },
    { label: '{=coin} Coins in hand', share: 2 },
  ],

  ref: {
    title: 'Bottom-row actions',
    rows: [
      ['Upgrade', '{oil} → move a cube: better top action, cheaper bottom'],
      ['Deploy', '{metal} → {mech} on a territory you control with your worker; unlocks a mech ability'],
      ['Build', '{wood} → {structure} on a territory you control with your worker; not lakes, 1 per territory'],
      ['Structures', 'Mill: its territory is a bonus Produce territory and produces like a worker. Armory: +1 {=power} on Trade. Monument: +1 {=popularity} on Bolster. Mine: a tunnel only you use'],
      ['Enlist', '{food} → recruit: one-time bonus now, then you gain a bonus whenever you or a neighbour takes that bottom action'],
      ['{=coin} bonus', 'printed on each bottom action; costs vary by mat'],
    ],
  },

  example: 'Last turn you used **Produce**, so you can’t pick it again; you pick Trade. Top: pay 1 {=coin} for {=wood}{=wood}. Bottom (**Build**): spend {=wood}{=wood}{=wood} to put a mill ({=structure}) on your farm and take the printed {=coin} bonus. From now on the mill produces like a worker.',

  setup: [
    'Each player takes a random faction board and player mat. Put your {leader} on your home base and 2 {worker}s on the 2 land territories next to it.',
    'Set {power}, {popularity}, {coin}s and starting {combat}s as the boards show. Take 2 objective cards (you may complete 1).',
    'Draw 1 structure bonus tile. Put an encounter token on each of the 11 encounter territories and (players + 1) random Factory cards face down on the Factory.',
  ],

  terms: [
    ['{=power} Combat', 'Each side secretly dials 0–7 {=power} (no more than it has) and adds up to 1 {combat} per {=mech}/{=leader} there. Higher total wins; the attacker wins ties.'],
    ['Control', 'You control a territory with your unit on it, or only your {=structure}. Resources stay on the map: you spend and score only those on territories you control.'],
    ['{=mech} Mech', 'Fighting unit that can carry workers. Each one deployed unlocks a mech ability.'],
    ['Factory', 'Centre hex. Counts as 3 territories at the end. The first time your character ends a Move there (after combat), take 1 Factory card: a 5th mat section.'],
    ['Home base', 'Where you start and where defeated units retreat. Units there are not on the map.'],
  ],

  gotchas: [
    'After combat both sides lose the dialled {=power} and discard their cards. The winner gets a {=star} (max 2) and the resources there; an attacker who wins loses 1 {=popularity} per enemy worker sent home. All the loser’s units retreat home; it gains 1 {combat} if it revealed any power (dial or cards).',
    'Moving a {=mech} or {=leader} onto territory with only **enemy workers** ends its move and sends them home; you lose 1 {=popularity} per worker.',
    'Only your {=leader} triggers **encounters**: its move ends; after any combat, draw a card and choose 1 option. Workers can’t move on their own into a territory with enemy units (a {=mech} can carry them).',
  ],

  tips: [
    'Chain sections: pick ones where the top action pays for the bottom action.',
    'Keep {=popularity} up: a low tier can cost more coins than a star is worth.',
    'Keep {=power} high: the threat of a fight often stops an attack.',
  ],

  walk(A) {
    const C = A.C, s = 28, I = this.icons, ic = (k, x, y, z) => A.use(I[k].draw(A), x, y, z);
    const coin = (x, y, z = 12) => A.use(A.ICONS.coin.draw(A), x - z / 2, y - z / 2, z);
    const at = (q, r) => [40 + s * 1.732 * (q + r / 2), 34 + 1.5 * s * r];
    let base = A.bg('#d8cfb4');
    const hexes = [[0, 0, '#7fb7d9', 'lake'], [1, 0, '#9aa0a8', 'mountain'], [2, 0, '#5a8a4a', 'forest'], [3, 0, '#d9e3e8', 'tundra'],
      [0, 1, '#e8c547', 'farm'], [1, 1, '#c8a46b', 'village'], [2, 1, '#5a8a4a', 'forest']];
    for (const [q, r, f] of hexes) { const [x, y] = at(q, r); base += A.hex(x, y, s, f, { sw: 1, stroke: '#4a4030' }); }
    const [fx, fy] = at(0, 1), [wx, wy] = at(2, 0), [mx, my] = at(1, 0);
    base += A.text(fx, fy + 18, 'farm', { size: 7, fill: '#5a4632' }) + A.text(wx, wy + 18, 'forest', { size: 7, fill: '#fff' });
    base += ic('worker', fx - 19, fy - 10, 16) + ic('worker', wx - 8, wy - 11, 16) + ic('mech', mx - 10, my - 11, 20);
    // Player panel
    base += A.rect(222, 8, 92, 102, '#efe3c8', { rx: 6, sw: 1.2 }) + A.tag(268, 20, 'You (red)', { fill: C.red });
    base += ic('power', 230, 66, 13) + A.text(247, 72.5, 'Power 3', { size: 9, anchor: 'start' });
    base += ic('popularity', 230, 85, 13) + A.text(247, 91.5, 'Popularity 4', { size: 9, anchor: 'start' });
    // Player mat: 4 sections, top and bottom actions
    base += A.rect(6, 116, 308, 80, '#b9ab86', { rx: 6, sw: 1.4 });
    const tops = ['Move', 'Produce', 'Trade', 'Bolster'], bots = ['Upgrade', 'Deploy', 'Build', 'Enlist'];
    const sx = i => 12 + i * 76;
    for (let i = 0; i < 4; i++) {
      base += A.rect(sx(i), 126, 70, 28, '#efe3c8', { rx: 3, sw: 1 }) + A.text(sx(i) + 35, 135, tops[i], { size: 9, weight: 800 });
      base += A.rect(sx(i), 158, 70, 32, '#d9cba6', { rx: 3, sw: 1 }) + A.text(sx(i) + 35, 167, bots[i], { size: 9, weight: 800 });
    }
    base += coin(sx(2) + 15, 146, 10) + A.text(sx(2) + 36, 146, '→ 2 any', { size: 7.5 });
    base += [0, 1, 2].map(i => A.rect(sx(2) + 3 + i * 11.5, 175, 10.5, 10.5, 'none', { rx: 2, sw: 0.7, dash: '1.5 1.5' })).join('') + A.text(sx(2) + 47, 180.5, '→ +2', { size: 7.5 }) + coin(sx(2) + 63, 180.5, 10);
    const token = i => A.k('token', A.rect(sx(i) + 10, 118, 50, 7, C.red, { rx: 3.5, sw: 1 }));
    const coins = n => { let r = ''; for (let i = 0; i < n; i++) r += A.k('c' + i, coin(236 + i * 13, 42)); return r; };
    const wood = (i, x, y) => A.k('w' + i, ic('wood', x, y, 12));
    const woodFarm = n => { let r = ''; for (let i = 0; i < n; i++) r += wood(i, fx + 0.5 + (i % 2) * 12.5, fy - 14 + Math.floor(i / 2) * 11); return r; };
    const woodBuild = () => [0, 1, 2].map(i => wood(i, sx(2) + 2.3 + i * 11.5, 174)).join('');
    const mill = A.k('mill', ic('structure', fx - 2, fy - 22, 20));
    return [
      { step: 1, say: 'Last turn you used **Produce**. You can’t pick the same section twice in a row.', svg: base + token(1) + coins(5) + woodFarm(1) + A.glow(sx(1) + 35, 121, 14, 'g-tok') },
      { step: 2, say: 'Move the token to **Trade**. Top action: pay 1 {=coin} for any 2 resources.', svg: base + token(2) + coins(5) + woodFarm(1) + A.glow(sx(2) + 35, 140, 22, 'g-trade') },
      { step: 2, say: 'Pay 1 {=coin}, take {=wood}{=wood}. They go on your farm, where a worker stands.', svg: base + token(2) + coins(4) + A.k('c4', coin(sx(2) + 60, 140)) + woodFarm(3) + A.glow(fx + 8, fy - 6, 16, 'g-farm') },
      { step: 2, say: 'Trade’s bottom action on your mat is **Build**: spend {=wood}{=wood}{=wood} from territories you control.', svg: base + token(2) + coins(4) + woodBuild() + A.glow(sx(2) + 35, 174, 22, 'g-build') },
      { step: 2, say: 'Place a **mill** on the farm and take the printed {=coin} bonus (here **+2**; varies by mat).', svg: base + token(2) + coins(6) + mill + A.glow(fx + 8, fy - 10, 16, 'g-farm') + A.glow(301, 42, 12, 'g-coin') },
      { step: 1, say: 'On a later **Produce**, the farm can be a bonus territory: the mill produces like a worker.', svg: base + token(2) + coins(6) + mill + A.glow(fx, fy, 22, 'g-farm2') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, ic = (k, x, y, z) => A.use(I[k].draw(A), x, y, z);
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
    const blue = svg => svg.split('#c8423b').join(C.blue);
    const mech = (x, y, b) => { const m = A.use(I.mech.draw(A), x - 8, y - 9, 16); return b ? blue(m) : m; };
    const worker = (x, y, b) => { const m = A.use(I.worker.draw(A), x - 7, y - 7, 14); return b ? blue(m) : m; };
    o += mech(ox + 1 * s * 1.732 + s * 0.866, oy + 1 * s * 1.5 - 2);
    o += mech(ox + 5 * s * 1.732, oy + 2 * s * 1.5 - 2, true);
    o += worker(ox + 2 * s * 1.732, oy + 3) + worker(ox + 2 * s * 1.732 + s * 0.866, oy + 1 * s * 1.5 + 2);
    o += worker(ox + 6 * s * 1.732, oy + 2 * s * 1.5 + 2, true);
    o += A.use(I.leader.draw(A), ox + 1 * s * 1.732 - 8, oy + 2 * s * 1.5 - 8, 16);
    // star track at right
    o += A.rect(282, 6, 32, 92, '#efe3c8', { rx: 5, sw: 1.2 });
    for (let i = 0; i < 6; i++) o += i < 3 ? A.use(I.star.draw(A), 291, 10 + i * 14.5, 14) : A.star(298, 17 + i * 14.5, 6, '#d8cfb4', { sw: 0.8 });
    // player mat with 4 sections, top and bottom rows
    o += A.rect(8, 128, 268, 66, '#b9ab86', { rx: 6, sw: 1.4 });
    const tops = ['#e8c547', '#9aa0a8', '#c8a46b', '#5a8a4a'];
    for (let i = 0; i < 4; i++) {
      const x = 14 + i * 65;
      o += A.rect(x, 133, 60, 26, '#efe3c8', { rx: 3, sw: 1 });
      o += A.rect(x, 162, 60, 26, '#d9cba6', { rx: 3, sw: 1 });
      o += A.circle(x + 14, 146, 6, tops[i], { sw: 0.8 }) + A.circle(x + 30, 146, 4, '#e2b33c', { sw: 0.8 });
      for (let k = 0; k < 3; k++) o += A.use(I[['oil', 'metal', 'wood', 'food'][i]].draw(A), x + 22 + k * 12, 166, 12);
    }
    // action token on section 2
    o += A.rect(86, 126, 36, 6, C.red, { rx: 3, sw: 1 });
    o += A.note(fx, fy, 175, 110, 'Factory');
    o += A.note(ox + 1 * s * 1.732 + s * 0.866, oy + 1 * s * 1.5 - 4, 38, 110, 'Mech');
    o += A.note(298, 89.5, 262, 110, '6th star ends it', { w: 96 });
    o += A.note(104, 146, 100, 110, 'Top action');
    o += A.note(150, 175, 230, 188, 'Bottom action');
    return o;
  },
});
