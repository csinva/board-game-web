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

  // Components drawn once, used inline in text ({spice}) and in the art / walkthrough.
  icons: {
    spice: { name: 'spice', draw: A => A.circle(12, 13, 9, '#e07b2e', { sw: 1.3 }) + A.path('M6 14.5 q3 -4 6 -1 t6 -1.5', { stroke: '#fde3c2', sw: 1.6 }) + A.circle(9.5, 9, 1.4, '#fde3c2', { sw: 0 }) },
    solari: { name: 'solari', draw: A => A.circle(12, 12, 9.5, '#c9cdd3', { sw: 1.4 }) + A.circle(12, 12, 5.5, 'none', { stroke: '#7d828a', sw: 1.2 }) + A.circle(12, 12, 1.8, '#7d828a', { sw: 0 }) },
    water: { name: 'water', draw: A => A.path('M12 2.5 C12 2.5 4.5 11 4.5 15.5 a7.5 7.5 0 0 0 15 0 C19.5 11 12 2.5 12 2.5z', { fill: '#7fb7d9', sw: 1.3 }) + A.path('M8.3 15.5 q0 3 3 4', { stroke: '#fff', sw: 1.5 }) },
    troop: { name: 'troop', draw: A => A.cube(5, 4, 14, '#3c8d4f') },
    agent: { name: 'agent', draw: A => A.rect(7.5, 2, 9, 20, '#3c8d4f', { rx: 4, sw: 1.3 }) + A.line(10.5, 6, 10.5, 17, { stroke: '#fff', sw: 1.3, opacity: 0.55 }) },
    persuasion: { name: 'persuasion', draw: A => A.poly([[12, 2], [21, 12], [12, 22], [3, 12]], '#4f6fc0', { sw: 1.3 }) + A.poly([[12, 6.5], [16.5, 12], [12, 17.5], [7.5, 12]], '#a9bcef', { sw: 0 }) },
    sword: { name: 'sword', draw: A => A.poly([[17, 3], [21, 3], [21, 7], [10, 18], [6, 14]], '#e3e6ea', { sw: 1.2 }) + A.line(4.5, 13, 11, 19.5, { stroke: '#c8423b', sw: 3.2 }) + A.line(7.5, 16.5, 3.8, 20.2, { stroke: '#8a5a33', sw: 2.6 }) },
    emperor: { name: 'Emperor', draw: A => A.rect(2.5, 2.5, 19, 19, '#c8423b', { rx: 4, sw: 1.3 }) + A.crown(12, 17, 12, '#fff') },
    guild: { name: 'Spacing Guild', draw: A => A.rect(2.5, 2.5, 19, 19, '#6a5aa8', { rx: 4, sw: 1.3 }) + A.circle(12, 12, 5.5, 'none', { stroke: '#fff', sw: 2 }) + A.circle(12, 12, 1.8, '#fff', { sw: 0 }) },
    bene: { name: 'Bene Gesserit', draw: A => A.rect(2.5, 2.5, 19, 19, '#4a4f6a', { rx: 4, sw: 1.3 }) + A.path('M5 12 q7 -7.5 14 0 q-7 7.5 -14 0z', { fill: '#fff', sw: 0 }) + A.circle(12, 12, 2.6, '#4a4f6a', { sw: 0 }) },
    fremen: { name: 'Fremen', draw: A => A.rect(2.5, 2.5, 19, 19, '#2f6db5', { rx: 4, sw: 1.3 }) + A.path('M9 17 Q7 9.5 16 5 Q11.5 11 12.2 17z', { fill: '#fff', sw: 0 }) + A.line(8, 18.5, 13.5, 18.5, { stroke: '#fff', sw: 2 }) },
    city: { name: 'city', draw: A => A.rect(2.5, 2.5, 19, 19, '#d9b46a', { rx: 4, sw: 1.3 }) + A.city(13, 18, 11, '#fbf6ec') },
    spicetrade: { name: 'spice trade', draw: A => A.rect(2.5, 2.5, 19, 19, '#e07b2e', { rx: 4, sw: 1.3 }) + A.path('M4 17 Q8 10 12 14 T20 11.5 V20 H4z', { fill: '#fde3c2', sw: 0 }) },
    intrigue: { name: 'intrigue card', draw: A => A.rect(5, 2, 14, 20, '#5b2a3a', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '?', { size: 12, weight: 800, fill: '#f2c84b' }) },
  },

  pitch: 'Play cards to send agents to board spaces, reveal the rest to buy cards and fight conflicts; most VP wins.',

  goal: { big: '10 VP', text: 'Most **victory points** at game end. VP come from conflicts, faction influence and alliances.' },

  turn: {
    type: 'choose',
    intro: 'Each round, in turn order, do ONE of these per turn until everyone has revealed:',
    outro: 'After all reveals: combat, makers, recall',
    steps: [
      { verb: 'Agent turn', text: 'Play 1 card and send an {agent} to an open space whose icon ({=city} {=spicetrade} {=fremen}…) is on the card; pay its cost, take its reward and the card’s agent effect (a faction space also gives +1 influence there); on a combat space deploy {troop}s (up to 2 from your garrison plus any just recruited).' },
      { verb: 'Reveal turn', text: 'Once out of agents (or earlier, by choice), **reveal** your hand: add its {sword}s to your strength and spend its {persuasion} on Imperium Row or reserve cards (the Row refills at once); you are done for the round.' },
    ],
  },

  tension: 'Each card either sends an agent now or adds persuasion and swords at your reveal, never both, so you choose which half to give up.',

  structure: [
    { label: 'Setup', text: 'Each player: starting deck, 2 {agent}s, 3 {troop}s in garrison. Conflict deck: 1 level I, 5 level II, 4 level III (10 rounds at most).' },
    { label: 'Round start', repeat: 'each round', text: 'Reveal the top conflict card. Everyone draws **5** cards (shuffle your discard pile when your deck runs out).' },
    { label: 'Player turns', repeat: 'each round', text: 'From the first player, clockwise: one agent turn or reveal turn each. Players who revealed are skipped until all have.' },
    { label: 'Combat', repeat: 'each round', text: 'Players with troops in the conflict may play combat {intrigue}s in turn order until all pass in a row. Highest strength takes the 1st reward, next the 2nd (4 players: also 3rd); 0 strength gets nothing. Tie for 1st: each tied player gets the 2nd reward; tie for 2nd: each gets the 3rd; tie for 3rd: nothing. Then every troop in the conflict returns to the supply.' },
    { label: 'Makers & recall', repeat: 'each round', text: 'Add 1 bonus {=spice} to each maker space (Imperial Basin, Hagga Basin, The Great Flat) with no agent; its next visitor takes it all. If the game is not over, take back agents, return the Mentat, and pass the first-player marker left.' },
    { label: 'Game end', text: 'If someone has **10+** {=vp} or the conflict deck is empty: play endgame {intrigue}s; most {=vp} wins.' },
  ],

  points: [
    ['Start', '4 players: everyone begins at 1 {=vp}; 1–3 players: 0'],
    ['{=sword} Conflicts', 'The {=vp} shown in the reward you earn; most 1st-place rewards include {=vp} (the level III battles: 2)'],
    ['Influence', '1 {=vp} per faction where you have **2+** influence; lost if you drop below 2'],
    ['Alliance', '1 {=vp} while you hold a faction’s alliance token: the first to **4** influence there takes it'],
    ['The Spice Must Flow', '1 {=vp} each time you buy one (reserve card, 9 {=persuasion})'],
    ['Cards', '{=intrigue} and Imperium cards whose text gives {=vp}'],
  ],

  end: { trigger: 'a round ends with someone at 10+ VP', detail: 'Or after the 10th conflict. Ties: most spice, then solari, water, garrisoned troops.' },
  scoring: [
    { label: '{=sword} Conflicts', share: 4 },
    { label: 'Faction influence', share: 3 },
    { label: 'Alliances', share: 1.5 },
    { label: '{=intrigue} Cards & intrigues', share: 1.5 },
  ],

  ref: {
    title: 'Icons & factions',
    rows: [
      ['Resources', '{spice} {solari} {water}'],
      ['Factions', '{emperor} {guild} {bene} {fremen}'],
      ['Strength', '{=troop} in the conflict = 2 · {=sword} = 1'],
      ['Reserve', 'Always buyable: Arrakis Liaison (2 {=persuasion}), The Spice Must Flow (9 {=persuasion}, +1 {=vp})'],
      ['High Council', '5 {=solari}, once: +2 {=persuasion} on every later reveal'],
      ['Extra agents', 'Swordmaster (8 {=solari}, once): 3rd {=agent} for the rest of the game, this round included · Mentat (2 {=solari}): draw 1, +1 {=agent} this round'],
    ],
  },

  example: 'You play a card with a {=city} icon and send an {=agent} to **Arrakeen**: +1 {=troop} and 1 card. You deploy that troop plus 2 from your garrison: **6 strength**. Next turn your other agent goes to **Foldspace** (+1 {=guild} influence). Then you reveal 4 cards for 5 {=persuasion} and 2 {=sword}, buy an Imperium Row card, and reach **8 strength** to win the 2‑VP conflict.',

  setup: [
    'Each player takes a leader (with a printed ability), a 10-card starting deck, 2 {agent}s, 1 {water} and 3 {troop}s in their garrison.',
    'Set influence markers to 0 on the four faction tracks ({=emperor} {=guild} {=bene} {=fremen}); put an alliance token at the top of each. VP markers start on 1 in a 4-player game, otherwise on 0.',
    'Shuffle the Imperium and intrigue decks; deal 5 Imperium cards face up as the Row. Lay out the reserve stacks (Arrakis Liaison, The Spice Must Flow, Foldspace).',
    'Conflict deck: shuffle each level separately; stack 1 level I card on top of 5 level II on top of all 4 level III. Return the rest unseen.',
    '1–2 players: add the House Hagal rival deck and follow the rulebook’s solo / 2-player section (in 2-player the rival takes spaces and fights conflicts but never scores).',
  ],

  terms: [
    ['{=agent} Agent', 'Your worker. You start with 2 per round.'],
    ['{=persuasion} Persuasion', 'Currency from revealed cards; buys cards, which go to your discard pile. Unspent persuasion is lost.'],
    ['{=troop} Garrison', 'Your troops off the board, ready to deploy to a conflict.'],
    ['Influence', 'Your position on a faction track.'],
    ['{=intrigue} Intrigue', 'Secret cards. Play **plot** cards on your turn, **combat** cards in combat, **endgame** cards at game end.'],
  ],

  gotchas: [
    'Deploy troops only on a turn your agent goes to a **combat space**; after that, only cards add more. Win or lose, troops in the conflict are **lost** after combat.',
    'Persuasion and swords count only from your **reveal**, and swords only if you have at least one troop in the conflict.',
    'Alliances move: anyone who rises **above** your influence on that faction takes the alliance token and its VP. The bonus printed at 4 influence is kept.',
    '**Sietch Tabr** needs 2+ {=fremen} influence. Swordmaster and High Council can each be taken once per game per player.',
    'Winning a conflict with a control reward puts your marker on Arrakeen, Carthag or Imperial Basin: you gain 1 {=solari} (Imperial Basin: 1 {=spice}) whenever anyone visits it.',
  ],

  tips: [
    'Focus on 1–2 factions: an alliance needs the lead on a track.',
    'Skip some conflicts; saving troops for a big one is often right.',
    'Trash weak starting cards so your good cards come up more often.',
  ],

  walk(A) {
    const C = A.C, you = C.green, foe = C.red, I = this.icons;
    const ic = (k, x, y, s) => A.use(I[k].draw(A), x, y, s);
    const panel = '#f2e2bd';
    let base = A.bg('#e7cf9c');
    // Board spaces, each marked with the agent icon a card needs to go there.
    base += A.rect(6, 6, 196, 96, panel, { rx: 6, sw: 1.3 });
    const spaces = [['Arrakeen', 'city', 14, 14, '#d9b46a'], ['Carthag', 'city', 108, 14, '#d9b46a'], ['Hagga Basin', 'spicetrade', 14, 58, '#c79a52'], ['Foldspace', 'guild', 108, 58, '#6a5aa8']];
    for (const [n, k, x, y, f] of spaces) base += A.rect(x, y, 86, 36, f, { rx: 4, sw: 1 }) + ic(k, x + 3, y + 3, 13) + A.text(x + 18, y + 10, n, { size: 8, anchor: 'start', weight: 700, fill: f === '#6a5aa8' ? C.white : C.ink });
    base += A.text(20, 44, '+1', { size: 6.5, anchor: 'start', weight: 700 }) + ic('troop', 28, 38, 11) + A.text(42, 44, '+1 card · combat', { size: 6.5, anchor: 'start', weight: 600 }) + A.text(114, 88, 'Foldspace · +1 inf.', { size: 6.5, anchor: 'start', weight: 600, fill: C.white });
    // Conflict
    base += A.rect(208, 6, 106, 96, '#d6b06e', { rx: 6, sw: 1.3 });
    base += A.rect(214, 12, 94, 20, '#8a5a33', { rx: 3, sw: 1 }) + A.text(261, 22, 'Conflict: 1st = 2 VP', { size: 7.5, fill: C.white });
    for (let k = 0; k < 3; k++) base += A.cube(286 + (k % 2) * 12, 44 + Math.floor(k / 2) * 14, 10, foe);
    base += ic('sword', 262, 85, 12) + A.text(276, 92, 'Rival 6', { size: 8, fill: foe, weight: 800, anchor: 'start' });
    // Garrison, played area, hand, Imperium Row
    base += A.rect(6, 108, 52, 50, panel, { rx: 5, sw: 1.2 }) + A.text(32, 116, 'Garrison', { size: 7 });
    base += A.rect(62, 108, 140, 50, panel, { rx: 5, sw: 1.2 }) + A.text(70, 116, 'In play', { size: 7, anchor: 'start' });
    base += A.rect(208, 108, 106, 86, panel, { rx: 5, sw: 1.2 }) + A.text(261, 117, 'Imperium Row', { size: 7.5 });
    base += A.tag(26, 178, 'Hand', { fill: you });
    // A band on a card holds either one icon key or [[n, iconKey], ...] pairs.
    const band = (x, y, w, c) => {
      let s = A.rect(x, y, w, 9, C.white, { rx: 1.5, sw: 0, opacity: 0.88 });
      if (typeof c === 'string') return s + ic(c, x + w / 2 - 4.5, y, 9);
      const seg = w / c.length;
      c.forEach(([n, k], j) => { const cx = x + seg * (j + 0.5); s += A.text(cx - 2.6, y + 4.7, n, { size: 6, weight: 800 }) + ic(k, cx - 0.6, y + 1.2, 6.6); });
      return s;
    };
    const card = (x, y, f, top, bot, w = 26, h = 34) => A.card(x, y, w, h, f) + band(x + 4, y + 4, w - 8, top) + (bot ? band(x + 4, y + h - 13, w - 8, bot) : '');
    const hand = (i) => [52 + i * 30, 162];
    const play = (i) => [66 + i * 22, 121];
    const row = (i) => [214 + i * 33, 126];
    const P = 'persuasion', S = 'sword';
    const H = [['h0', '#c8a46b', 'city', [[1, P]]], ['h1', '#e2b33c', 'spicetrade', [[2, P]]], ['h2', '#8f939a', 'guild', [[2, P]]], ['h3', '#c8a46b', 'city', [[1, P]]], ['h4', '#c8423b', 'emperor', [[2, S]]]];
    const hc = (id, pos) => { const c = H.find(h => h[0] === id); return A.k(id, card(...pos, c[1], c[2], c[3])); };
    const imp = [['i0', '#2a9a96', [[5, P]], 'fremen'], ['i1', '#6a5aa8', [[3, P]], 'guild'], ['i2', '#c8423b', [[6, P]], 'emperor']];
    const icard = (i, pos) => A.k(imp[i][0], card(...pos, imp[i][1], imp[i][2], imp[i][3], 28, 40));
    const rowAll = (skip) => [0, 1, 2].filter(i => i !== skip).map(i => icard(i, row(i))).join('');
    // Troops and agent use the same drawings as the inline {troop} / {agent} icons.
    const troop = (k, x, y) => A.k(k, ic('troop', x - 3.6, y - 2.9, 17));
    const garrison = (ks) => ks.map((k, i) => troop(k, 14 + (i % 2) * 12, 126 + Math.floor(i / 2) * 14)).join('');
    const inConflict = (ks) => ks.map((k, i) => troop(k, 222 + (i % 2) * 12, 44 + Math.floor(i / 2) * 14)).join('');
    const str = (n) => A.k('str', ic('sword', 216, 85, 12) + A.text(230, 92, 'You ' + n, { size: 8, fill: you, weight: 800, anchor: 'start' }));
    const agent = (x, y, k = 'agent') => A.k(k, ic('agent', x - 10, y - 10, 20));
    const pill = (parts) => {
      const w = parts.length * 22 + 10, x0 = 100 - w / 2;
      return A.rect(x0, 171, w, 16, C.brown, { rx: 8, sw: 0 }) + parts.map(([n, k], j) => A.text(x0 + 12 + j * 22, 179, n, { size: 9.5, weight: 800, fill: C.white }) + ic(k, x0 + 16 + j * 22, 173, 12)).join('');
    };
    const fullHand = ['h0', 'h1', 'h2', 'h3', 'h4'].map((id, i) => hc(id, hand(i))).join('');
    const rest = ['h1', 'h2', 'h3', 'h4'].map((id, i) => hc(id, hand(i + 1))).join('');
    const drawn = (pos) => A.k('draw', card(...pos, '#8f939a', 'guild', [[1, P]]));
    const reveal = ['h1', 'h2', 'h3', 'h4'].map((id, i) => hc(id, play(i + 2))).join('');
    const army = inConflict(['t1', 't2', 't3']) + garrison(['t0']);
    const placed = hc('h0', play(0)) + drawn(play(1)) + army + agent(90, 27) + agent(184, 76, 'agent2');
    const bought = A.k('i0', card(172, 162, imp[0][1], imp[0][2], imp[0][3])) + A.text(158, 176, 'discard', { size: 6, fill: C.ink });
    return [
      { step: 0, say: '**Agent turn**: play a card with a {city} icon.', svg: base + fullHand + garrison(['t0', 't1', 't2']) + rowAll() + agent(48, 128) + agent(48, 148, 'agent2') + str(0) + A.glow(65, 179, 18, 'g-card') },
      { step: 0, say: 'The card goes into play; your {=agent} goes to **Arrakeen**, a {=city} space.', svg: base + hc('h0', play(0)) + rest + garrison(['t0', 't1', 't2']) + rowAll() + agent(90, 27) + agent(48, 148, 'agent2') + str(0) + A.glow(90, 27, 13, 'g-arr') },
      { step: 0, say: 'Arrakeen gives +1 {=troop} and 1 card. It is a combat space: the new troop and 2 from your garrison deploy, **6 strength**.', svg: base + hc('h0', play(0)) + rest + drawn(hand(0)) + army + rowAll() + agent(90, 27) + agent(48, 148, 'agent2') + str(6) + A.glow(234, 60, 22, 'g-conf') },
      { step: 0, say: 'Next turn, play the drawn {=guild} card: your other {=agent} goes to **Foldspace** for a Foldspace card and +1 {=guild} influence.', svg: base + placed + rest + rowAll() + str(6) + A.glow(184, 76, 13, 'g-fold') },
      { step: 1, say: 'Out of agents, you **reveal** your other 4 cards: **5** {=persuasion} and **2** {=sword}.', svg: base + placed + reveal + rowAll() + str(6) + A.k('pers', pill([[5, P], [2, S]])) },
      { step: 1, say: 'Spend 5 {=persuasion} on a {=fremen} **Fremen card**. Bought cards go to your discard pile.', svg: base + placed + reveal + bought + rowAll(0) + str(6) + A.k('pers', pill([[2, S]])) },
      { step: 1, say: 'After everyone reveals, your **8 strength** beats the rival’s 6: you win the conflict and **2** {=vp}.', svg: base + placed + reveal + bought + rowAll(0) + str(8) + A.k('vp', A.star(258, 62, 12, C.yellow, { sw: 1 }) + A.text(258, 63, '+2', { size: 7, weight: 800 })) + A.glow(258, 62, 17, 'g-vp') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, ic = (k, x, y, s) => A.use(I[k].draw(A), x, y, s);
    let o = A.bg('#e7cf9c');
    // dunes texture
    o += A.path('M0 120 Q60 100 120 118 T240 112 T320 120', { stroke: '#d4b375', sw: 3 });
    // board spaces left column: 4 faction tracks, headed by the same faction icons as the text
    const fac = [['#c8423b', 'emperor'], ['#6a5aa8', 'guild'], ['#4a4f6a', 'bene'], ['#2f6db5', 'fremen']];
    o += A.rect(6, 8, 92, 104, '#f2e2bd', { rx: 6, sw: 1.3 });
    fac.forEach(([f, k], i) => {
      const x = 14 + i * 21;
      o += A.rect(x, 14, 16, 92, f, { rx: 3, sw: 1, opacity: 0.85 });
      for (let j = 0; j < 5; j++) o += A.line(x + 2, 34 + j * 15, x + 14, 34 + j * 15, { stroke: '#fff', sw: 1, opacity: 0.6 });
      o += ic(k, x, 15, 16);
    });
    o += A.cube(16, 66, 10, C.green) + A.cube(37, 81, 10, C.green) + A.cube(79, 51, 10, C.green);
    // board spaces centre
    o += A.rect(106, 8, 120, 104, '#f2e2bd', { rx: 6, sw: 1.3 });
    const spaces = [[114, 16], [168, 16], [114, 48], [168, 48], [114, 80], [168, 80]];
    spaces.forEach(([x, y], i) => { o += A.rect(x, y, 50, 26, ['#d9b46a', '#d9b46a', '#c79a52', '#c79a52', '#b5702e', '#b5702e'][i], { rx: 4, sw: 1 }); });
    // agents (tall cylinders): yours match the {agent} icon
    o += ic('agent', 120, 20, 20) + A.rect(180, 54, 8, 16, C.red, { rx: 3, sw: 1.1 }) + ic('agent', 130, 84, 20);
    o += ic('spice', 196, 20, 13) + ic('spice', 205, 23, 13) + ic('water', 199, 86, 14);
    // conflict zone
    o += A.rect(234, 8, 80, 104, '#d6b06e', { rx: 6, sw: 1.3 });
    o += A.card(246, 14, 56, 36, '#8a5a33', { label: '', title: '' });
    o += A.star(274, 34, 7, C.yellow, { sw: 0.8 });
    o += A.circle(274, 84, 22, '#c79a52', { sw: 1.2, dash: '3 2' });
    for (let k = 0; k < 4; k++) o += ic('troop', 255 + (k % 2) * 13, 67 + Math.floor(k / 2) * 13, 15);
    for (let k = 0; k < 3; k++) o += A.cube(282 + (k % 2) * 11, 72 + Math.floor(k / 2) * 13, 9, C.red);
    // Imperium row: cost in persuasion on each card
    o += A.rect(6, 130, 196, 66, '#f2e2bd', { rx: 6, sw: 1.3 });
    const cols = ['#8a5a33', '#6a5aa8', '#2a9a96', '#c8423b', '#b5702e'];
    cols.forEach((f, i) => {
      const x = 12 + i * 38;
      o += A.card(x, 150, 33, 40, f) + A.rect(x + 4, 153, 25, 12, C.white, { rx: 2, sw: 0, opacity: 0.88 }) + A.text(x + 11, 159.5, String(3 + i), { size: 9, weight: 800 }) + ic('persuasion', x + 16, 153.5, 11);
    });
    // hand
    o += A.fan(266, 162, 5, 26, 38, ['#e2b33c', '#c8a46b', '#8f939a', '#e2b33c', '#c8a46b'], { dx: 14 });
    o += A.note(130, 26, 162, 120, 'Agent on a space', { w: 98 });
    o += A.note(274, 84, 268, 120, 'Conflict', { w: 56 });
    o += A.note(50, 60, 52, 120, 'Influence tracks', { w: 98 });
    o += A.note(104, 176, 104, 141, 'Imperium Row', { w: 80 });
    return o;
  },
});
