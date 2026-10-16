defineGame({
  id: 'dune-imperium',
  name: 'Dune: Imperium',
  year: 2020,
  designer: 'Paul Dennen',
  family: 'engine',
  players: [1, 4], best: '3–4',
  time: [60, 120],
  age: 14,
  mechanics: ['deck-building', 'worker-placement', 'area-control', 'hand-management', 'variable-powers'],
  profile: { complexity: 3, luck: 3, interaction: 4, conflict: 3, talk: 2, planning: 3 },
  color: '#b5702e',

  pitch: 'Play a card to send an agent to the board, then reveal the rest to buy better cards and fight for the desert planet each round.',
  theme: 'You lead a Great House on the desert planet Arrakis, winning favour with the factions and fighting for spice and control.',

  goal: { big: '10 VP', text: 'Be the first to reach **10 victory points** (or have the most when the conflict deck runs out). VP comes from conflicts, faction influence and alliances.' },

  turn: {
    type: 'choose',
    intro: 'Each round, players take turns doing ONE of these until everyone has revealed:',
    outro: 'After all reveals: fight the conflict, then recall agents',
    steps: [
      { verb: 'Agent turn', text: 'Play 1 card and send an **agent** to a free space matching an icon on it; pay the cost, take the reward. On a combat space, also deploy troops to the conflict (up to 2 from your garrison, plus any just recruited).' },
      { verb: 'Reveal turn', text: 'When out of agents (or by choice), **reveal** your remaining hand: spend its persuasion on new cards and add its swords to your strength. You’re done for the round.' },
    ],
  },

  tension: 'Each card can either send an agent now or add persuasion and swords at your reveal, so you must decide which half of every card you will give up.',

  flow: [
    { label: 'Agent', items: ['Play a card', 'Claim a board space', 'Spice, water, solari, troops'] },
    { label: 'Reveal', items: ['Persuasion buys cards', 'Swords add strength', 'Better deck next round'] },
    { label: 'Conflict', items: ['Troops 2 strength each', 'Rewards for 1st and 2nd', 'Intrigue surprises'] },
    { label: 'Score', items: ['Conflict VP', '2 influence = 1 VP', 'Alliances +1 VP'] },
  ],

  end: { trigger: 'a round ends with someone at 10+ VP', detail: 'Or after the 10th conflict card. Most VP wins; ties go to most spice, then solari, water and garrisoned troops.' },
  scoring: [
    { label: 'Conflicts', share: 4 },
    { label: 'Faction influence', share: 3 },
    { label: 'Alliances', share: 1.5 },
    { label: 'Cards & intrigues', share: 1.5 },
  ],

  ref: {
    title: 'Factions',
    rows: [
      ['Influence 2', '+1 VP on that faction'],
      ['Influence 4', 'Alliance (+1 VP) if you lead'],
      ['High Council', '+2 persuasion every reveal'],
      ['Swordmaster', 'a 3rd agent from next round'],
      ['Mentat', 'an extra agent for one round'],
    ],
  },

  example: 'You play a starting card with a city icon and send an agent to **Arrakeen**: you gain 1 troop and a card, and deploy that troop plus 2 from your garrison into the conflict (**6 strength**). Later you reveal 3 cards with 5 persuasion, buy a card from the Imperium Row, and add 2 swords for **8 strength**, winning the 2‑VP conflict.',

  setup: [
    'Each player takes a leader, a 10-card starting deck, 2 agents, and 3 troops in their garrison.',
    'Put influence markers at 0 on the four faction tracks and VP markers at 1.',
    'Shuffle the Imperium deck, lay 5 cards in the Imperium Row, and build the 10-card conflict deck.',
  ],

  terms: [
    ['Agent', 'Your worker; each round you have 2 (more later) to place on spaces.'],
    ['Persuasion', 'Revealed currency for buying cards from the Imperium Row.'],
    ['Garrison', 'Your troops waiting off-board, ready to deploy into a conflict.'],
    ['Influence', 'Standing with the Emperor, Guild, Bene Gesserit or Fremen.'],
    ['Intrigue', 'Secret cards for plots, combat boosts or endgame points.'],
  ],

  gotchas: [
    'You may only deploy troops on a turn your agent goes to a **combat space**; troops can’t be added later except by cards.',
    'Swords and persuasion come only from your **reveal**; the agent box of a card is used only when you play it as an agent.',
    'Alliances move: if someone passes your influence on that faction, they take the alliance and its VP.',
  ],

  tips: [
    'Pick one or two factions to climb; spreading out wins nothing.',
    'Don’t fight every conflict; letting one go to save troops for a big one is often right.',
    'Trash weak starting cards when you can, so your good cards come up more.',
  ],

  walk(A) {
    const C = A.C, you = C.green, foe = C.red;
    const panel = '#f2e2bd';
    let base = A.bg('#e7cf9c');
    // Board spaces
    base += A.rect(6, 6, 196, 96, panel, { rx: 6, sw: 1.3 });
    const spaces = [['Arrakeen', 'city', 14, 14, '#d9b46a'], ['Carthag', 'city', 108, 14, '#d9b46a'], ['Hagga Basin', 'spice', 14, 58, '#c79a52'], ['Spacing Guild', 'guild', 108, 58, '#6a5aa8']];
    for (const [n, ic, x, y, f] of spaces) base += A.rect(x, y, 86, 36, f, { rx: 4, sw: 1 }) + A.text(x + 6, y + 10, n, { size: 8, anchor: 'start', weight: 700, fill: f === '#6a5aa8' ? C.white : C.ink }) + A.text(x + 6, y + 22, ic, { size: 6, anchor: 'start', fill: f === '#6a5aa8' ? C.white : C.ink });
    base += A.text(20, 46, '+1 troop, draw 1, combat', { size: 5.5, anchor: 'start', weight: 600 });
    // Conflict
    base += A.rect(208, 6, 106, 96, '#d6b06e', { rx: 6, sw: 1.3 });
    base += A.rect(214, 12, 94, 20, '#8a5a33', { rx: 3, sw: 1 }) + A.text(261, 22, 'Conflict: 1st = 2 VP', { size: 7.5, fill: C.white });
    for (let k = 0; k < 3; k++) base += A.cube(286 + (k % 2) * 12, 44 + Math.floor(k / 2) * 14, 10, foe);
    base += A.text(292, 92, 'Rival 6', { size: 8, fill: foe, weight: 800 });
    // Garrison, played area, hand, Imperium Row
    base += A.rect(6, 108, 52, 50, panel, { rx: 5, sw: 1.2 }) + A.text(32, 116, 'Garrison', { size: 7 });
    base += A.rect(62, 108, 140, 50, panel, { rx: 5, sw: 1.2 }) + A.text(70, 116, 'In play', { size: 7, anchor: 'start' });
    base += A.rect(208, 108, 106, 86, panel, { rx: 5, sw: 1.2 }) + A.text(261, 117, 'Imperium Row', { size: 7.5 });
    base += A.tag(26, 178, 'Hand', { fill: you });
    const card = (x, y, f, top, bot, w = 26, h = 34) => A.card(x, y, w, h, f) +
      A.rect(x + 4, y + 4, w - 8, 9, C.white, { rx: 1.5, sw: 0, opacity: 0.85 }) + A.text(x + w / 2, y + 8.5, top, { size: 5.5 }) +
      (bot ? A.rect(x + 4, y + h - 13, w - 8, 9, C.white, { rx: 1.5, sw: 0, opacity: 0.85 }) + A.text(x + w / 2, y + h - 8.5, bot, { size: 5 }) : '');
    const hand = (i) => [52 + i * 30, 162];
    const play = (i) => [70 + i * 30, 121];
    const row = (i) => [214 + i * 33, 126];
    const H = [['h0', '#c8a46b', 'city', '1 pers'], ['h1', '#e2b33c', 'spice', '2 pers'], ['h2', '#8f939a', 'guild', '2 pers'], ['h3', '#c8a46b', 'city', '2 sword'], ['h4', '#e2b33c', 'spice', '1 pers']];
    const hc = (id, pos) => { const c = H.find(h => h[0] === id); return A.k(id, card(...pos, c[1], c[2], c[3])); };
    const imp = [['i0', '#2a9a96', 'cost 5', 'Fremen'], ['i1', '#6a5aa8', 'cost 3', 'Guild'], ['i2', '#c8423b', 'cost 6', 'Emperor']];
    const ic = (i, pos) => A.k(imp[i][0], card(...pos, imp[i][1], imp[i][2], imp[i][3], 28, 40));
    const rowAll = (skip) => [0, 1, 2].filter(i => i !== skip).map(i => ic(i, row(i))).join('');
    const troop = (k, x, y) => A.k(k, A.cube(x, y, 10, you));
    const garrison = (ks) => ks.map((k, i) => troop(k, 14 + i * 12, 126 + (i % 2) * 6)).join('');
    const inConflict = (ks) => ks.map((k, i) => troop(k, 222 + (i % 2) * 12, 44 + Math.floor(i / 2) * 14)).join('');
    const str = (n) => A.k('str', A.text(232, 92, 'You ' + n, { size: 8, fill: you, weight: 800 }));
    const agent = (x, y) => A.k('agent', A.rect(x - 4, y - 9, 8, 18, you, { rx: 3, sw: 1.1 }));
    const fullHand = ['h0', 'h1', 'h2', 'h3', 'h4'].map((id, i) => hc(id, hand(i))).join('');
    const reveal = ['h1', 'h2', 'h3'];
    return [
      { step: 0, say: 'Your **agent turn**: play a card with a **city** icon from your hand.', svg: base + fullHand + garrison(['t1', 't2']) + rowAll() + agent(48, 140) + str(0) + A.glow(65, 175, 18, 'g-card') },
      { step: 0, say: 'The card goes into play and your agent walks to **Arrakeen**.', svg: base + hc('h0', play(0)) + ['h1', 'h2', 'h3', 'h4'].map((id, i) => hc(id, hand(i + 1))).join('') + garrison(['t1', 't2']) + rowAll() + agent(84, 32) + str(0) + A.glow(84, 32, 12, 'g-arr') },
      { step: 0, say: 'Arrakeen gives **1 troop** and a card. It is a combat space, so the new troop and 2 from your garrison join the conflict: **6 strength**.', svg: base + hc('h0', play(0)) + ['h1', 'h2', 'h3', 'h4'].map((id, i) => hc(id, hand(i + 1))).join('') + A.k('draw', card(...hand(0), '#c8a46b', 'city', '1 pers')) + inConflict(['t1', 't2', 't3']) + rowAll() + agent(84, 32) + str(6) + A.glow(234, 60, 22, 'g-conf') },
      { step: 1, say: 'Later, out of agents, you **reveal** your last 3 cards: **5 persuasion** and **2 swords**.', svg: base + hc('h0', play(0)) + reveal.map((id, i) => hc(id, play(i + 1))).join('') + inConflict(['t1', 't2', 't3']) + rowAll() + agent(84, 32) + str(6) + A.k('pers', A.tag(100, 179, '5 pers · 2 swords', { fill: C.brown })) },
      { step: 1, say: 'Spend the persuasion on a **cost-5 Fremen card** from the Imperium Row. It goes to your discard, to show up in later hands.', svg: base + hc('h0', play(0)) + reveal.map((id, i) => hc(id, play(i + 1))).join('') + A.k('i0', card(172, 162, imp[0][1], imp[0][2], imp[0][3])) + A.text(158, 176, 'discard', { size: 6, fill: C.ink }) + inConflict(['t1', 't2', 't3']) + rowAll(0) + agent(84, 32) + str(6) + A.k('pers', A.tag(100, 179, '2 swords left', { fill: C.brown })) },
      { step: 1, say: 'Swords add to your troops: **8 strength** beats the rival’s 6. You win the conflict and **2 VP**.', svg: base + hc('h0', play(0)) + reveal.map((id, i) => hc(id, play(i + 1))).join('') + A.k('i0', card(172, 162, imp[0][1], imp[0][2], imp[0][3])) + A.text(158, 176, 'discard', { size: 6, fill: C.ink }) + inConflict(['t1', 't2', 't3']) + rowAll(0) + agent(84, 32) + str(8) + A.k('vp', A.star(258, 62, 12, C.yellow, { sw: 1 }) + A.text(258, 63, '+2', { size: 7, weight: 800 })) + A.glow(232, 92, 16, 'g-str') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#e7cf9c');
    // dunes texture
    o += A.path('M0 120 Q60 100 120 118 T240 112 T320 120', { stroke: '#d4b375', sw: 3 });
    // board spaces left column: 4 faction tracks
    const fac = ['#c8423b', '#6a5aa8', '#4a4f6a', '#2f6db5'];
    o += A.rect(6, 8, 92, 104, '#f2e2bd', { rx: 6, sw: 1.3 });
    fac.forEach((f, i) => {
      const x = 14 + i * 21;
      o += A.rect(x, 14, 16, 92, f, { rx: 3, sw: 1, opacity: 0.85 });
      for (let k = 0; k < 5; k++) o += A.line(x + 2, 26 + k * 16, x + 14, 26 + k * 16, { stroke: '#fff', sw: 1, opacity: 0.6 });
    });
    o += A.cube(16, 64, 10, C.green) + A.cube(37, 80, 10, C.green) + A.cube(79, 48, 10, C.green);
    // board spaces centre
    o += A.rect(106, 8, 120, 104, '#f2e2bd', { rx: 6, sw: 1.3 });
    const spaces = [[114, 16], [168, 16], [114, 48], [168, 48], [114, 80], [168, 80]];
    spaces.forEach(([x, y], i) => { o += A.rect(x, y, 50, 26, ['#d9b46a', '#d9b46a', '#c79a52', '#c79a52', '#b5702e', '#b5702e'][i], { rx: 4, sw: 1 }); });
    // agents (tall cylinders)
    const agent = (x, y, f) => A.rect(x - 4, y - 9, 8, 16, f, { rx: 3, sw: 1.1 });
    o += agent(130, 31, C.green) + agent(184, 63, C.red) + agent(140, 95, C.green);
    o += A.circle(204, 27, 5, '#e07b2e', { sw: 0.8 }) + A.circle(212, 30, 5, '#e07b2e', { sw: 0.8 }) + A.circle(207, 95, 5, '#7fb7d9', { sw: 0.8 });
    // conflict zone
    o += A.rect(234, 8, 80, 104, '#d6b06e', { rx: 6, sw: 1.3 });
    o += A.card(246, 14, 56, 36, '#8a5a33', { label: '', title: '' });
    o += A.star(274, 34, 7, C.yellow, { sw: 0.8 });
    o += A.circle(274, 84, 22, '#c79a52', { sw: 1.2, dash: '3 2' });
    for (let k = 0; k < 4; k++) o += A.cube(258 + (k % 2) * 13, 70 + Math.floor(k / 2) * 13, 9, C.green);
    for (let k = 0; k < 3; k++) o += A.cube(282 + (k % 2) * 11, 72 + Math.floor(k / 2) * 13, 9, C.red);
    // Imperium row
    o += A.rect(6, 130, 196, 66, '#f2e2bd', { rx: 6, sw: 1.3 });
    const ic = ['#8a5a33', '#6a5aa8', '#2a9a96', '#c8423b', '#b5702e'];
    ic.forEach((f, i) => { o += A.card(12 + i * 38, 150, 33, 40, f, { title: String(3 + i), size: 10 }); });
    // hand
    o += A.fan(266, 162, 5, 26, 38, ['#e2b33c', '#c8a46b', '#8f939a', '#e2b33c', '#c8a46b'], { dx: 14 });
    o += A.note(130, 26, 162, 120, 'Agent on a space', { w: 98 });
    o += A.note(274, 84, 268, 120, 'Conflict', { w: 56 });
    o += A.note(50, 60, 52, 120, 'Influence tracks', { w: 98 });
    o += A.note(104, 160, 104, 141, 'Imperium Row: buy here', { w: 132 });
    return o;
  },
});
