defineGame({
  id: 'terraforming-mars',
  name: 'Terraforming Mars',
  year: 2016,
  designer: 'Jacob Fryxelius',
  family: 'engine',
  players: [1, 5], best: '3',
  time: [120, 120],
  age: 12,
  mechanics: ['engine-building', 'tableau', 'hand-management', 'tile-placement', 'resource-management', 'drafting'],
  profile: { complexity: 4, luck: 3, interaction: 2, conflict: 2, talk: 1, planning: 4 },

  // Resources as coloured squares (like the player board), global parameters and map tiles.
  icons: {
    mc: { name: 'MegaCredits', draw: A => A.rect(2, 2, 20, 20, '#e2b33c', { rx: 4, sw: 1.3 }) + A.rect(4.5, 4.5, 15, 15, 'none', { rx: 2.5, sw: 0.9, stroke: '#a87d17' }) + A.text(12, 12.5, 'M', { size: 11, weight: 800, fill: '#5a3d06' }) },
    steel: { name: 'steel', draw: A => A.rect(2, 2, 20, 20, '#9a6a3a', { rx: 3.5, sw: 1.3 }) + A.rect(6, 6, 12, 3, '#ecd9b8', { rx: 0.5, sw: 0.8 }) + A.rect(10.5, 9, 3, 6, '#ecd9b8', { rx: 0, sw: 0.8 }) + A.rect(6, 15, 12, 3, '#ecd9b8', { rx: 0.5, sw: 0.8 }) },
    titanium: { name: 'titanium', draw: A => A.rect(2, 2, 20, 20, '#3a3a46', { rx: 3.5, sw: 1.3 }) + A.poly([[12, 4.5], [14, 10], [19.5, 12], [14, 14], [12, 19.5], [10, 14], [4.5, 12], [10, 10]], '#d6d9e0', { sw: 0.8 }) },
    plant: { name: 'plants', draw: A => A.rect(2, 2, 20, 20, '#4f9a3c', { rx: 3.5, sw: 1.3 }) + A.path('M6.5 17.5 C6.5 9.5 11 5.5 18 5.5 C18 12.5 14.5 17.5 6.5 17.5 Z', { fill: '#c4eba9', sw: 0.9, stroke: '#2a5a20' }) + A.path('M6.5 17.5 L13.5 10.5', { stroke: '#2a5a20', sw: 1.1 }) },
    energy: { name: 'energy', draw: A => A.rect(2, 2, 20, 20, '#a36be0', { rx: 3.5, sw: 1.3 }) + A.poly([[14, 3.5], [6.5, 13.5], [11.5, 13.5], [10, 20.5], [17.5, 10], [12.5, 10]], '#fff3a0', { sw: 0.9 }) },
    heat: { name: 'heat', draw: A => A.rect(2, 2, 20, 20, '#e0612f', { rx: 3.5, sw: 1.3 }) + A.path('M12 4 C16 8 18 11 18 14.5 A6 6 0 0 1 6 14.5 C6 11 8.5 9.5 9.5 7 C10.5 9.5 11 10.5 12 11 C12.8 8.5 12.8 6.5 12 4 Z', { fill: '#ffd36b', sw: 0.9, stroke: '#7a2a10' }) },
    temperature: { name: 'temperature', draw: A => A.rect(9, 1.5, 6, 16, '#fff', { rx: 3, sw: 1.3 }) + A.circle(12, 18, 4.5, '#e0442f', { sw: 1.3 }) + A.rect(10.6, 8, 2.8, 10, '#e0442f', { rx: 1, sw: 0 }) },
    oxygen: { name: 'oxygen', draw: A => A.circle(12, 12, 10, '#7fd0f0', { sw: 1.3 }) + A.text(11, 12.5, 'O', { size: 11, weight: 800, fill: '#163a5a' }) + A.text(17, 16, '2', { size: 6.5, weight: 800, fill: '#163a5a' }) },
    ocean: { name: 'ocean', draw: A => A.hex(12, 12, 10.5, '#3c86c9', { sw: 1.2 }) + A.path('M6 10 q3 -3 6 0 q3 3 6 0 M6 15 q3 -3 6 0 q3 3 6 0', { stroke: '#e3f2fb', sw: 1.5 }) },
    greenery: { name: 'greenery', draw: A => A.hex(12, 12, 10.5, '#4f9a3c', { sw: 1.2 }) + A.poly([[12, 4.5], [17, 14.5], [7, 14.5]], '#2c6a24', { sw: 0.8 }) + A.rect(11, 14.5, 2, 4, '#6b4220', { rx: 0, sw: 0 }) },
    city: { name: 'city', draw: A => A.hex(12, 12, 10.5, '#9aa0ab', { sw: 1.2 }) + A.city(12.5, 17.5, 11, '#eef0f4') },
    tr: { name: 'Terraform Rating', draw: A => A.circle(12, 12, 10, '#c8643a', { sw: 1.3 }) + A.path('M4 9 q5 2 9 -1 q4 -2 7 1', { stroke: '#9c3f22', sw: 1.2 }) + A.text(12, 14, 'TR', { size: 8.5, weight: 800, fill: '#fff' }) },
    building: { name: 'building tag', draw: A => A.circle(12, 12, 10, '#8a5a33', { sw: 1.3 }) + A.rect(7, 9, 10, 9, '#ecd9b8', { rx: 0.5, sw: 0.8 }) + A.poly([[6, 9.5], [12, 5], [18, 9.5]], '#ecd9b8', { sw: 0.8 }) },
    space: { name: 'space tag', draw: A => A.circle(12, 12, 10, '#2b2b2b', { sw: 1.3 }) + A.star(12, 12.5, 6.5, '#fff', { sw: 0 }) },
  },

  pitch: 'Play project cards to grow your income, then spend it raising temperature, oxygen and oceans; most points wins.',

  goal: { big: 'Most points', text: 'Most victory points. Your **Terraform Rating (TR)** is the base; add greenery, cities, card VP, milestones and awards.' },

  turn: {
    type: 'round',
    intro: 'Each generation (round):',
    outro: 'Next generation',
    steps: [
      { verb: 'Research', text: 'Each player draws 4 project cards, keeps any number of them by paying 3 {=mc} **per card kept**, and discards the rest.' },
      { verb: 'Act', text: 'Starting with the first player and going clockwise, each player on their turn takes **1 or 2 actions** or passes: play a card from your hand (pay its {=mc} cost), use a blue card’s action, buy a standard project, turn 8 {=plant} into a {greenery}, turn 8 {=heat} into +2°C {=temperature}, claim a milestone or fund an award. Turns keep going around, skipping players who passed, until everyone has passed.' },
      { verb: 'Produce', text: 'Everyone turns **all** their {energy} into {heat}. Then each player gains each resource equal to its production level; for {mc}, gain **your TR plus your MC production**.' },
    ],
  },

  tension: 'Production pays out every generation, but raising temperature, oxygen and oceans scores now and speeds the end: when do you stop investing and start scoring?',

  structure: [
    { label: 'Setup', text: 'Set {=oxygen} to 0% and {=temperature} to −30°C; put the 9 {=ocean} tiles beside the map; set every player’s {=tr} to 20. Each player picks a corporation and buys starting cards (see Setup).' },
    { label: 'Generations', repeat: 'until the end', text: 'Each generation: pass the first-player marker 1 seat to the left, then play the **research**, **action** and **production** phases (see Your turn). In generation 1, skip the marker pass and research.' },
    { label: 'Game end', text: 'When {=temperature} is at +8°C, {=oxygen} at 14% and all 9 {=ocean} are placed, finish the current generation, including production. No new generation starts.' },
    { label: 'Last greenery', text: 'Starting with the first player and going clockwise, each player may turn 8 {=plant} into a {=greenery}, as many times as they can pay for. These give no TR.' },
    { label: 'Final scoring', text: 'Add up every source in Scoring. Most VP wins; tie: the tied player with the most {=mc} wins.' },
  ],

  points: [
    ['{=tr} Terraform Rating', '1 VP per point of your final TR (starts at 20; +1 each time you raise a global parameter 1 step, and from some cards)'],
    ['{=greenery} Greenery', '1 VP per greenery tile you own'],
    ['{=city} City', '1 VP per greenery touching your city, **whoever owns** the greenery'],
    ['Cards', 'VP printed on your played cards, including per-resource VP (e.g. 1 VP per 2 animals on that card) and negative VP'],
    ['Milestones', '5 VP for each milestone you claimed'],
    ['Awards', 'For each funded award, 1st place gets 5 VP and 2nd place 2 VP, whoever funded it (2 players: 1st only)'],
  ],

  end: {
    trigger: 'temperature (+8°C), oxygen (14%) and oceans (all 9 placed) are **all** at their maximum',
    detail: 'Finish that generation, including production. Then, starting with the first player, each player may turn 8 plants into a greenery as many times as they can pay for, before scoring.',
  },
  scoring: [
    { label: '{=tr} Terraform Rating', share: 5 },
    { label: '{=greenery}{=city} Greenery & cities', share: 2 },
    { label: 'Card VP', share: 2 },
    { label: 'Milestones & awards', share: 1 },
  ],

  ref: {
    title: 'Standard projects',
    rows: [
      ['Resources', '{mc} {steel} {titanium} {plant} {energy} {heat}'],
      ['Sell patents', 'discard any number of cards from your hand → +1 {=mc} per card'],
      ['Power plant', '11 {=mc} → +1 {=energy} production'],
      ['Asteroid', '14 {=mc} → {temperature} +2°C'],
      ['Aquifer', '18 {=mc} → place an {ocean}'],
      ['Greenery', '23 {=mc} → place a {greenery} (+1% {=oxygen})'],
      ['City', '25 {=mc} → place a {city}, +1 {=mc} production'],
    ],
  },

  example: 'First action: you turn **8 {=plant}** into a {greenery} next to your {city}: {oxygen} rises 1% and your {=tr} goes 24 → 25. Second action: you pay 14 {=mc} for the **Asteroid** standard project: {temperature} rises 2°C and your TR goes to 26.',

  setup: [
    'Set {oxygen} to 0%, {temperature} to −30°C, the generation marker to 1, and each player’s {=tr} TR to 20.',
    'Standard game: remove the **Corporate Era** cards (marked with a red-and-white icon) from the deck; each player’s production of **each** of the 6 resources starts at 1. Corporate Era game: use all cards; all production starts at 0.',
    'The most recent winner goes first. Deal each player 2 corporations and 10 project cards. Each player keeps 1 corporation, discards the other, and takes the starting {=mc}, resources and production printed on it.',
    'Each player pays 3 {=mc} from that money for each of their 10 cards they keep, and discards the rest. First game: everyone uses the Beginner Corporation instead (start with 42 {=mc} and keep all 10 cards without paying).',
  ],

  terms: [
    ['Global parameter', 'Temperature, oxygen or oceans. Raising one by 1 step (+2°C, +1% or 1 ocean tile) gives you +1 TR.'],
    ['{=tr} TR', 'Terraform Rating: counts as VP at the end and adds to your MC income each generation. Starts at 20.'],
    ['{=mc} MC', 'MegaCredits (money).'],
    ['Production', 'Your income level of each resource, marked on your player board; you gain that much in every production phase.'],
    ['Tag', 'Icon on a card ({building}, {space}, …). Some cards count tags or require a number of them.'],
    ['Generation', 'One round.'],
  ],

  gotchas: [
    'Each card you keep in research costs **3** {=mc}, even if you never play it.',
    'At production, **all** your {energy} turns into {heat} before you gain new resources.',
    'A card’s requirement (min or max oxygen, temperature, oceans or tags) is checked only **when you play it**; later changes don’t matter. Oceans go only on blue reserved spaces; a city can’t be placed next to another city.',
  ],

  tips: [
    'Early on, **production** beats points: +1 MC production pays every generation.',
    'Buy only cards you expect to play soon. Sell patents for cash.',
    'Claim a milestone as soon as you qualify: only **3** per game.',
  ],

  extended: [
    { title: 'The generation, in full', items: [
      '**Player order**: the first-player marker moves 1 seat left each generation. Generation 1 skips research (you bought from your starting 10 cards).',
      '**Action phase**: on each of your turns, take 1 or 2 actions, or pass. Turns go around the table until everyone has passed; once you pass, you take no more turns this generation.',
      '**Production phase**: all {=energy} becomes {=heat}. Then gain {=mc} equal to your TR plus your MC production (MC production can be as low as −5), and {=steel} {=titanium} {=plant} {=energy} {=heat} equal to their production levels.',
    ] },
    { title: 'Global parameters', items: [
      '{=temperature} **Temperature**: −30°C to +8°C in 2° steps (19 steps). Bonuses for the player who raises it: to −24°C or −20°C, +1 {=heat} production; to 0°C, place an ocean.',
      '{=oxygen} **Oxygen**: 0% to 14% (14 steps). The player who raises it to 8% also raises temperature 1 step and gains +1 TR for that step too (none if temperature is already at +8°C).',
      '{=ocean} **Oceans**: 9 tiles, only on blue reserved spaces. Placing any tile next to an ocean gives **2** {=mc} per adjacent ocean.',
      'Each step you raise gives **+1** {=tr}. A maxed parameter can’t rise (no TR), but you may still play cards that would raise it.',
    ] },
    { title: 'Tiles and placement', items: [
      '{=greenery} **Greenery**: must go next to your own tile if possible; raises oxygen 1 step; 1 VP at the end.',
      '{=city} **City**: can’t be next to another city; scores 1 VP per adjacent greenery, **whoever owns** it.',
      'Bonuses printed on a space ({=steel} {=titanium} {=plant} or cards) go to whoever places a tile there.',
      '8 {=plant} → {=greenery}. 8 {=heat} → +1 {=temperature} step. Each conversion uses 1 action; you may repeat it with later actions.',
    ] },
    { title: 'Cards, tags and requirements', items: [
      '**Green** (automated) cards: production or one-time effects. **Blue** cards: ongoing effects, or actions usable once per generation. **Red** events: played face-down; their tags stop counting.',
      '{steel} pays 2 {=mc} each toward {=building} building-tag cards; {titanium} pays 3 {=mc} each toward {=space} space-tag cards.',
      'To play a card you must meet its requirement and be able to do **all** its effects, with 3 exceptions: you may play it even if a parameter it raises is maxed, or if you have nowhere to put resources it adds; and removing resources shown in a red border is optional (choose any one player, yourself included, and remove all, some or none). A tile that can’t be placed is skipped.',
      '**Red border** = any player, including you. A red-bordered **production** decrease is mandatory: if no opponent has that production, lower your own or don’t play the card.',
    ] },
    { title: 'Standard projects and selling', text: 'Always available, one action each (costs in the quick reference). Also **sell patents**: discard any number of cards for 1 {=mc} each. Standard projects are expensive, but they guarantee progress when your hand is weak and finish the last steps of a parameter.' },
    { title: 'Milestones and awards', items: [
      '**Milestones**: claiming one is an action that costs 8 {=mc} and is worth 5 {=vp}. You may claim it once you meet its requirement, e.g. Terraformer (35 TR), Mayor (3 cities), Gardener (3 greeneries), Builder (8 building tags), Planner (16 cards in hand). Each milestone can be claimed by only **1** player, and only **3** milestones per game.',
      '**Awards**: funding one is an action with no requirement, open to any player. The 1st award funded in the game costs 8 {=mc}, the 2nd 14, the 3rd 20; only 3 of the 5 can be funded. Landlord (most tiles), Banker (highest {=mc} production), Scientist (most science tags), Thermalist (most {=heat}), Miner (most {=steel} + {=titanium}).',
      'At the end, each funded award gives 1st place 5 {=vp} and 2nd place 2 {=vp}, whoever funded it; with 2 players there is no 2nd place. Tied players all get that place; a tie for 1st means no 2nd place.',
    ] },
    { title: 'Final scoring', text: 'After the last production, starting with the first player, each player may turn 8 plants into a greenery as many times as they can pay for (no TR, since oxygen is maxed, but they score VP and city adjacency). Score TR, milestones, awards, 1 VP per greenery, city adjacency, and card VP (including animals, microbes and other resources on cards). Most VP wins; tie: most MC.' },
    { title: 'Variants', items: [
      '**Draft**: in research (not generation 1), each player keeps 1 of their 4 drawn cards and passes the rest to a neighbour; keep 1 of the cards you receive and pass the rest on, until everyone has kept 4. Then buy as usual. Pass left in even generations, right in odd ones.',
      '**Solo** (Corporate Era): start {=tr} at 14 with no starting production; place 2 neutral cities, each with an adjacent neutral greenery (no oxygen); no milestones or awards. Play exactly 14 generations: you lose unless all 3 parameters are maxed by the end of generation 14; then convert plants and score as usual.',
    ] },
  ],

  walk(A) {
    const C = A.C, s = 20, ox = 105, oy = 108, I = this.icons, ic = (k, x, y, z) => A.use(I[k].draw(A), x, y, z);
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
    base += A.rect(10, 34, 16, 152, '#2c2a40', { rx: 6, stroke: '#8c8aa0', sw: 1 }) + ic('oxygen', 10, 15, 16);
    base += A.rect(186, 34, 16, 152, '#2c2a40', { rx: 6, stroke: '#8c8aa0', sw: 1 }) + ic('temperature', 186, 15, 16);
    // Player panel
    base += A.rect(214, 30, 102, 166, '#2c2a40', { rx: 6, stroke: '#8c8aa0', sw: 1 }) + A.tag(265, 16, 'You (red)', { fill: C.red });
    // Resource rows use the same icons as the quick reference.
    base += ic('mc', 220, 37, 18) + ic('plant', 220, 64, 18) + ic('energy', 220, 91, 18) + ic('heat', 220, 115, 18);
    base += A.text(222, 146, 'Hand', { size: 8, fill: '#cfc8e0', anchor: 'start', weight: 800 });

    const tr = v => A.k('tr', A.circle(60 + (v - 23) * 26, 14, 9, 'none', { stroke: '#ffcf3f', sw: 2 }));
    const o2 = v => A.rect(13, 176 - v * 10, 10, 8, '#7fd0f0', { rx: 2, sw: 0 });
    const oxy = v => { let r = ''; for (let i = 0; i < v; i++) r += o2(i); return r + A.k('o2', A.rect(11, 174 - v * 10, 14, 12, '#fff', { rx: 3, sw: 1 }) + A.text(18, 180 - v * 10, v, { size: 7, weight: 800 })); };
    const temp = c => { const v = (c + 30) / 2; let r = ''; for (let i = 0; i < v; i++) r += A.rect(189, 177 - i * 7.5, 10, 6, '#e0442f', { rx: 1.5, sw: 0 });
      return r + A.k('temp', A.rect(184, 175 - v * 7.5, 20, 11, '#fff', { rx: 3, sw: 1 }) + A.text(194, 180.5 - v * 7.5, c, { size: 7, weight: 800 })); };
    const mc = v => A.k('mc' + v, A.text(262, 46, v + ' MC', { size: 12, fill: '#fff', weight: 800 }));
    const cube = (x, y, f) => ic(f === '#4f9a3c' ? 'plant' : f === '#a36be0' ? 'energy' : 'heat', x - 0.5, y - 0.5, 10);
    const plants = (n, at) => { let r = ''; for (let i = 0; i < n; i++) r += A.k('p' + i, at ? cube(at[0] - 18 + (i % 4) * 9, at[1] - 9 + Math.floor(i / 4) * 9, '#4f9a3c') : cube(260 + (i % 4) * 11, 63 + Math.floor(i / 4) * 10, '#4f9a3c')); return r; };
    const energy = n => { let r = ''; for (let i = 0; i < n; i++) r += A.k('e' + i, cube(260 + i * 11, 96, '#a36be0')); return r; };
    const heat = (n, extra) => { let r = ''; for (let i = 0; i < n; i++) r += A.k('h' + i, cube(260 + (i % 5) * 11, 120, '#e0612f')); for (let i = 0; i < (extra || 0); i++) r += A.k('e' + i, cube(260 + ((n + i) % 5) * 11, 120 + 0, '#e0612f')); return r; };
    const card = (x, y, f, lab) => A.card(x, y, 26, 32, f, { title: lab, label: '' });
    const drawn = [['c1', '#4f9a3c', 'Trees'], ['c2', '#2f6db5', 'Mine'], ['c3', '#c8423b', 'Comet'], ['c4', '#4f9a3c', 'Lichen']];
    const hand = drawn.filter(d => d[0] === 'c1' || d[0] === 'c3').map((d, i) => A.k(d[0], card(226 + i * 30, 154, d[1], d[2]))).join('');
    const greenery = A.k('green', A.hex(gx, gy, s - 1, '#4f9a3c', { sw: 1.2, stroke: '#2a5a20' }) + A.rect(gx - 4, gy - 4, 8, 8, C.red, { rx: 1, sw: 1 }));
    const asteroid = A.k('ast', A.circle(170, 46, 9, '#8f939a', { sw: 1.2 }) + A.circle(167, 43, 2, '#6b6f75', { sw: 0 }) + A.line(158, 36, 146, 26, { stroke: '#f3a08f', sw: 2 }));

    return [
      { step: 0, say: '**Research.** Draw 4 project cards; each one you keep costs **3** {=mc}.', svg: base + tr(24) + oxy(5) + temp(-12) + mc(40) + plants(8) + energy(2) + heat(3) +
        drawn.map((d, i) => A.k(d[0], card(48 + i * 30, 162, d[1], d[2]))).join('') },
      { step: 0, say: 'Keep **Trees** and **Comet** for 6 {=mc} (40 → 34); discard the other 2.', svg: base + tr(24) + oxy(5) + temp(-12) + mc(34) + plants(8) + energy(2) + heat(3) + hand + A.glow(229, 46, 15, 'g-mc') },
      { step: 1, say: '**Action 1:** spend **8** {=plant} to place a {greenery} next to your city.', svg: base + tr(24) + oxy(5) + temp(-12) + mc(34) + plants(8, [gx, gy]) + energy(2) + heat(3) + hand + A.glow(gx, gy, 22, 'g-hex') },
      { step: 1, say: 'The greenery raises {oxygen} **1%**; each global step gives **+1** {=tr}: 24 → 25.', svg: base + tr(25) + oxy(6) + temp(-12) + mc(34) + greenery + energy(2) + heat(3) + hand + A.glow(18, 120, 12, 'g-o2') },
      { step: 1, say: '**Action 2:** pay 14 {=mc} for the **Asteroid** standard project: {=temperature} +2°C, TR 26.', svg: base + tr(26) + oxy(6) + temp(-10) + mc(20) + greenery + energy(2) + heat(3) + hand + asteroid + A.glow(194, 98, 13, 'g-temp') },
      { step: 2, say: '**Production.** Leftover {=energy} becomes {=heat}. Income: TR 26 + MC production 2 = **28** {=mc}.', svg: base + tr(26) + oxy(6) + temp(-10) + mc(48) + greenery + heat(3, 2) + hand + A.glow(229, 46, 15, 'g-mc') },
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
    o += A.use(this.icons.oxygen.draw(A), 13, 174, 18);
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
