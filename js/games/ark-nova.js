defineGame({
  id: 'ark-nova',
  name: 'Ark Nova',
  year: 2021,
  designer: 'Mathias Wigge',
  family: 'engine',
  players: [1, 4], best: '2',
  time: [90, 150],
  age: 14,
  mechanics: ['hand-management', 'engine-building', 'tableau', 'tile-placement', 'spatial'],
  profile: { complexity: 4, luck: 3, interaction: 2, conflict: 1, talk: 1, planning: 4 },
  color: '#3f7f6a',

  // Tokens and tracks drawn once: used inline ({appeal}) and on the board in art/walk.
  icons: {
    money: { name: 'money', draw: A => A.circle(12, 12, 9.5, '#e9b93a', { sw: 1.4 }) + A.circle(12, 12, 6.6, 'none', { sw: 0.9, stroke: '#a87f15' }) },
    appeal: { name: 'appeal', draw: A => A.path('M3 6.5 h18 v3.5 a2 2 0 0 0 0 4 v3.5 h-18 v-3.5 a2 2 0 0 0 0 -4 z', { fill: '#e07b2e', sw: 1.3 }) + A.line(15, 8.5, 15, 15.5, { stroke: '#fff', sw: 1.2, dash: '1.6 1.6' }) + A.star(9, 12, 3.6, '#fff', { sw: 0 }) },
    conservation: { name: 'conservation', draw: A => A.circle(12, 12, 9.5, '#2a9a96', { sw: 1.4 }) + A.path('M7 17 C6.5 10 11 6 17.5 6.5 C18 13 13.5 17.5 7 17 z', { fill: '#fff', sw: 0 }) + A.path('M7.5 16.5 L14 10', { stroke: '#2a9a96', sw: 1.2 }) },
    reputation: { name: 'reputation', draw: A => A.path('M12 2.5 L20 5.5 V11.5 C20 16.5 16.5 19.8 12 21.5 C7.5 19.8 4 16.5 4 11.5 V5.5 Z', { fill: '#7d55b5', sw: 1.3 }) + A.star(12, 11.5, 5, '#fff', { sw: 0 }) },
    xtoken: { name: 'X-token', draw: A => A.circle(12, 12, 9.5, '#f2e6cc', { sw: 1.4 }) + A.path('M8.3 8.3 L15.7 15.7 M15.7 8.3 L8.3 15.7', { stroke: '#2a2420', sw: 2.6 }) },
    enclosure: { name: 'enclosure', draw: A => A.hex(12, 12, 10.5, '#d8b878', { sw: 1.3, stroke: '#7a5a33' }) + A.circle(12, 14.5, 3, '#7a5a33', { sw: 0 }) + [[8, 10.5], [10.7, 8.2], [13.3, 8.2], [16, 10.5]].map(([x, y]) => A.circle(x, y, 1.35, '#7a5a33', { sw: 0 })).join('') },
    kiosk: { name: 'kiosk', draw: A => A.hex(12, 12, 10.5, '#e07b2e', { sw: 1.3 }) + A.text(12, 12.5, 'K', { size: 10, weight: 800, fill: '#fff' }) },
    water: { name: 'water', draw: A => A.hex(12, 12, 10.5, '#8cc0d9', { sw: 1.3, stroke: '#4d7f99' }) + A.path('M6 10 q1.5 -2 3 0 t3 0 t3 0 t3 0 M6 14.5 q1.5 -2 3 0 t3 0 t3 0 t3 0', { stroke: '#fff', sw: 1.4 }) },
    rock: { name: 'rock', draw: A => A.hex(12, 12, 10.5, '#9aa0a8', { sw: 1.3, stroke: '#5e636a' }) + A.poly([[5.5, 17], [10, 8], [13, 12.5], [15, 9.5], [18.5, 17]], '#6d727a', { sw: 0.9 }) },
  },

  pitch: 'Play animals into enclosures for appeal and fund projects for conservation; the two tracks crossing furthest wins.',

  goal: { big: 'Cross the tracks', text: 'Your **appeal** marker climbs one way and your **conservation** marker the other. Your score is how far they have passed each other; **highest** wins.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, use exactly ONE of your 5 action cards; the slot it sits in (1–5) is its strength. Instead, you may move any 1 action card to slot 1 and take 1 X-token; you can’t do this if you already hold 5. After either, the card you used or moved goes to slot 1, and each card that was to its left moves 1 slot right.',
    outro: 'Used card → slot 1 · next player clockwise',
    steps: [
      { verb: 'Animals', text: 'Play animals from your hand; the Animals card shows how many at this strength. For each, pay its {money} cost and place it in an **empty {=enclosure} standard enclosure** at least as large as its size, meeting any other requirements on the card; gain its {appeal}.' },
      { verb: 'Cards', text: 'Move the break token **2** spaces. Then draw from the deck as many cards as the Cards card shows for this strength (at some strengths you then discard 1). At strength 5 you may instead take any 1 face-up card from the display (**snap**).' },
      { verb: 'Build', text: 'Build **1** {enclosure}, {kiosk}, pavilion or petting zoo that covers at most as many spaces as the strength; pay 2 {=money} per space covered.' },
      { verb: 'Association', text: 'Place 1 worker on **1** task whose value is at most the strength: value **2** = gain 2 {reputation}, **3** = take a partner zoo, **4** = take a university, **5** = support a **conservation project** for {=conservation}.' },
      { verb: 'Sponsors', text: 'Play 1 sponsor card from your hand whose level is at most the strength, **or** move the break token as many spaces as the strength and take that much {=money}.' },
    ],
  },

  tension: 'Each turn: use a strong card now and reset it to strength 1, or a weak one so your strong cards keep climbing.',

  structure: [
    { label: 'Setup', text: 'Each player gets a zoo map, 5 action cards and 25 {=money}, keeps 4 of 8 drawn cards, and gets 2 final-scoring cards (see Setup).' },
    { label: 'Turns', repeat: 'clockwise', text: 'Players take turns clockwise. Each turn: use 1 action card, or take the X-token action. There are no rounds.' },
    { label: 'Break', repeat: 'when the break token reaches the end', text: 'Finish the turn in which the break token reached the last space; that player takes 1 {=xtoken} (if they hold fewer than 5). Then, in order: everyone discards down to **3** cards in hand; remove all multiplier, venom and constriction tokens; everyone takes back their association workers (and refill the partner zoos and universities); discard the cards in display folders 1 and 2 and refill the display; everyone takes income: {=money} for their appeal, kiosks and income icons. Move the break token back to its start space.' },
    { label: 'Tracks cross', text: 'When a player’s {=appeal} and {=conservation} markers share a scoring area or pass each other (checked at the end of a turn or in a break), the end is triggered.' },
    { label: 'Final scoring', text: 'Add final-scoring cards and end-of-game card effects. Score = your appeal minus the lowest appeal value in the scoring area where your conservation marker is; highest wins.' },
  ],

  points: [
    ['{=appeal} Appeal', 'Printed on animals (and some sponsors); 1 per pavilion; each reputation step you would gain past 15 gives 1 appeal instead; covering your whole map +7.'],
    ['{=conservation} Conservation (CP)', 'Supporting projects, donations, some animals, sponsors and bonuses.'],
    ['CP value', 'The 1st–10th CP are worth 2 points each, every later CP 3 (the scoring areas on the board).'],
    ['Final-scoring card', '1–4 CP for its condition. You hold 2. The first time any player reaches 10 CP, every player discards 1 of theirs; if no one reaches 10, everyone discards 1 at game end.'],
    ['End-of-game effects', 'Some sponsors give appeal or CP at game end.'],
    ['Final score', 'Your appeal minus the lowest appeal value in your conservation marker’s scoring area; can be negative. Tie: the tied player who supported the most conservation projects wins; if still tied, they share the win.'],
  ],

  end: { trigger: 'one player’s appeal and conservation markers meet in one scoring area or pass each other', detail: 'If this happens at the end of your turn, every other player takes one more turn; if during a break, everyone (you too) takes one more turn. Then final scoring.' },
  scoring: [
    { label: '{=appeal} Appeal (animals)', share: 6 },
    { label: '{=conservation} Conservation projects', share: 3 },
    { label: 'Final-scoring card', share: 1 },
  ],

  ref: {
    title: 'Tokens and scoring',
    rows: [
      ['Tokens', '{money} {appeal} {conservation} {reputation} {xtoken}'],
      ['{=enclosure} Build', '2 {=money} per space; size at most the strength'],
      ['{=conservation} 1st–10th CP', '{=vp}{=vp} each'],
      ['{=conservation} Every CP after 10', '{=vp}{=vp}{=vp} each'],
      ['{=reputation} Association', '**2** +2 reputation · **3** partner zoo · **4** university · **5** project'],
      ['{=xtoken} X-token', 'when using an action card, spend any number: +1 strength each; you can hold at most 5'],
    ],
  },

  example: 'Build is in slot **4**. You build a size‑4 enclosure for 8 money, ready for the big cat in your hand. Build drops to slot 1 and the cards that were left of it shift right, so next turn Animals is stronger: pay the cat’s cost and gain its **{appeal}**.',

  setup: [
    'Put the break token on the start space for your player count. Place 4 random bonus tiles, 6 face-up cards in display folders 1–6, and the association board with 1 partner zoo per continent, 1 university of each kind and 3 base conservation projects (4 with 4 players).',
    '2 players: cover the left level of the left project, the middle of the middle and the right of the right, plus the left column of donation spaces, with 6 tokens of an unused colour; these are blocked.',
    'Each player: zoo map (Map A in a first game, with its printed 3-space enclosure), 5 action cards side I (Animals in slot 1, the rest random), 25 {=money}, 7 player tokens on the map’s left edge, 1 active association worker (the other 3 lie below it, inactive until you activate them).',
    'Each player draws 8 cards, keeps 4 and discards 4; then draws 2 final-scoring cards and keeps both secret.',
    'Each player puts their conservation and reputation markers on the first space of those tracks, and their {=appeal} appeal marker on 0, 1, 2 or 3 by turn order (first player 0).',
  ],

  terms: [
    ['{=appeal} Appeal', 'Sets your break income; moves toward the conservation marker.'],
    ['{=conservation} Conservation (CP)', 'Points from projects; moves toward appeal from the other end.'],
    ['Strength', 'An action card’s slot number (1–5), +1 per X-token spent; higher is stronger.'],
    ['Break', 'Shared timer. Some actions move the break token; when it reaches the last space, a break (cleanup and income) follows that turn.'],
    ['Upgrade', 'Flip 1 action card of your choice to side II. You earn upgrades by reaching 2 CP, from some reputation spaces, and by taking your 2nd partner zoo and your 2nd university.'],
    ['{=reputation} Reputation', 'Sets your reach into the display: when an action lets you take display cards, you may take them from folders up to your reputation range. It can’t pass 9 until Cards is upgraded.'],
  ],

  gotchas: [
    'Using a card moves it to **slot 1**; only the cards that were left of it shift 1 slot right. Cards right of it stay put.',
    'Animals need an **empty** enclosure **at least their size**, sometimes next to {water} or {rock}; one animal per standard enclosure.',
    'Each conservation project level goes to only **one** player, and you may support each project only **once**.',
    'Every Cards action moves the break token **2** spaces; at each break, everyone discards down to **3** cards.',
    'Association: placing on a task where you already have 1 worker takes **2** workers; other players’ workers there don’t count.',
  ],

  tips: [
    'Upgrade Animals or Association early; their upgraded sides add strong effects.',
    'Small, cheap animals give steady {=appeal}; don’t hold out for a big one.',
    'Plan your card order a few turns ahead so the one you need sits in slot 4 or 5.',
  ],

  extended: [
    { title: 'Upgraded action cards', items: [
      'Each action card has a basic side (I) and an upgraded side (II). Upgrades come from 2 CP (or take a worker instead), the reputation track, and your 2nd partner zoo and 2nd university. You can’t upgrade all five.',
      '**Animals II**: may also play animals from the display within reputation range (pay the folder number extra); at strength 5+, gain 1 reputation first.',
      '**Build II**: several **different** buildings, total size at most the strength; adds the reptile house and large bird aviary (size 5) and lets you build on spaces marked II.',
      '**Association II**: several **different** tasks, total value at most the strength; a project card may come from the display (pay the folder number); you may also make 1 **donation**: pay the lowest uncovered amount on the donation track for 1 CP. 3rd and 4th partner zoos need this side.',
      '**Cards II**: draw from the display within reputation range and/or the deck; snap is allowed from strength 3; reputation can pass 9.',
      '**Sponsors II**: several sponsors with total level at most the strength + 1, also from the display (pay the folder number); the break option pays double money.',
    ] },
    { title: 'Card types', items: [
      '**Animals**: cost, enclosure size and requirements (water or rock nearby, petting zoo, reputation). They give appeal plus continent and category icons.',
      '**Sponsors**: a level (Sponsors strength must reach it) and ongoing effects, income or special buildings.',
      '**Conservation projects**: played with Association; they need a number of matching icons in your zoo.',
      '**Final scoring cards**: secret goals that add CP at game end.',
    ] },
    { title: 'Enclosures and buildings', items: [
      'Standard enclosures (size 1–5) hold one animal and flip when filled. Build ahead: each animal needs an empty one. Special enclosures (petting zoo, reptile house, large bird aviary; one each) hold several animals of their type.',
      '{kiosk}s: each kiosk must be at least 3 spaces from every other kiosk, so at least 2 spaces (empty or built on) lie between any 2 kiosks. At each break, each kiosk earns 1 money per adjacent pavilion, special enclosure, unique building or **occupied** standard enclosure. Pavilions give 1 appeal when built.',
      'Pay 2 money per space. Buildings can’t cover {=water} water or {=rock} rock. Your first building must cover a border space; each later one must touch one you have. Covering a bonus space gives its reward once.',
    ] },
    { title: 'Association tasks', items: [
      'You need an active worker. Place 1 on a task whose value is at most the strength: **2** +2 reputation, **3** partner zoo (−3 money per matching continent icon on animals; max 4), **4** university (research icons, reputation; one raises hand limit to 5), **5** support a conservation project.',
      'If 1 of your workers is already on that task, place 2; with 3 of yours there, it is closed until the break. Workers return at each break.',
      'Supporting a project: play a project card from hand (or support one in play), then cover one unclaimed level whose condition you meet (usually a count of icons on your cards, partner zoos and universities) with a token from your map’s left edge. Gain that level’s CP and the bonus printed on your map under the token you took.',
    ] },
    { title: 'What advances the break', items: [
      'Every Cards action (2), the Sponsors money option (strength) and some card effects. The X-token action does not. The player who moves it onto the last space takes 1 {xtoken}.',
    ] },
    { title: 'Conservation track bonuses', items: [
      '**2 CP**: upgrade an action card or activate a worker. **5 CP** and **8 CP**: 5 money, or a bonus tile placed there. **10 CP**: the first time anyone reaches it, all players discard 1 final-scoring card.',
      'Reputation counts to 15; each step you would gain past 15 gives 1 appeal instead.',
    ] },
  ],

  walk(A) {
    const C = A.C, r = 10.5, I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x - size / 2, y - size / 2, size);
    const hx = (q, rr) => [24 + q * r * 1.732 + (rr % 2) * r * 0.866, 22 + rr * r * 1.5];
    let board = A.bg('#dfe7d3') + A.rect(6, 6, 196, 132, '#c5d6a8', { rx: 6, sw: 1.4 });
    const water = ['6,1', '7,1', '6,2'], rock = ['1,5', '2,5'];
    for (let rr = 0; rr < 7; rr++) for (let q = 0; q < 9; q++) {
      const [x, y] = hx(q, rr), id = q + ',' + rr;
      board += water.includes(id) ? ic('water', x, y, 24) : rock.includes(id) ? ic('rock', x, y, 24) : A.hex(x, y, r, '#e8efd9', { sw: 0.6, stroke: '#7d8f68' });
    }
    // existing buildings: a bird enclosure on the border, a kiosk touching it; the new enclosure touches both
    board += A.hex(...hx(5, 6), r, '#d8b878', { sw: 1.2 }) + A.bird(...hx(5, 6), 12, '#3e7cb0');
    board += ic('kiosk', ...hx(5, 5), 24);
    const encl = [[3, 4], [4, 4], [3, 5], [4, 5]];
    const ex = encl.reduce((s, [q, rr]) => s + hx(q, rr)[0], 0) / 4, ey = encl.reduce((s, [q, rr]) => s + hx(q, rr)[1], 0) / 4;
    const enclosure = A.k('encl', encl.map(([q, rr]) => A.hex(...hx(q, rr), r, '#d8b878', { sw: 1.3, stroke: '#7a5a33' })).join(''));
    const ghost = A.k('ghost', encl.map(([q, rr]) => A.hex(...hx(q, rr), r, 'rgba(255,255,255,.55)', { sw: 1.4, dash: '3 2' })).join(''));
    // action card row
    board += A.rect(6, 146, 308, 50, '#f6f1e2', { rx: 5, sw: 1.2 });
    for (let i = 0; i < 5; i++) board += A.text(36 + i * 61, 153, 'slot ' + (i + 1), { size: 6.5, weight: 700, fill: '#6b6255' });
    const AC = { Cards: '#7d55b5', Animals: '#8a5a33', Association: '#2f6db5', Build: '#3c8d4f', Sponsors: '#c8423b' };
    const row = (order) => order.map((n, i) => A.k('ac-' + n, A.card(12 + i * 61, 158, 50, 34, AC[n], {}) + A.text(37 + i * 61, 175, n, { size: 6.5, weight: 800, fill: C.white }))).join('');
    const o1 = ['Cards', 'Animals', 'Association', 'Build', 'Sponsors'], o2 = ['Build', 'Cards', 'Animals', 'Association', 'Sponsors'], o3 = ['Animals', 'Build', 'Cards', 'Association', 'Sponsors'];
    // right panel: money, hand card, appeal
    board += A.text(214, 18, 'Money', { size: 7, anchor: 'start', fill: '#6b6255' }) + ic('money', 221, 32, 15);
    const money = (m) => A.text(232, 32, String(m), { size: 14, weight: 800, anchor: 'start' });
    const catCard = A.k('catcard', A.card(260, 10, 52, 74, '#e9d6a7', {}) + A.text(286, 22, 'Big cat', { size: 6, weight: 800 }) +
      A.text(286, 60, 'size 4 · cost 15', { size: 5.5 }) + A.text(286, 70, '+5 appeal', { size: 5.5, fill: C.orange }));
    const cat = (x, y) => A.k('cat', A.circle(x, y, 9, '#c98a2e', { sw: 1.2 }) + A.circle(x - 3, y - 2, 1, C.ink, { sw: 0 }) + A.circle(x + 3, y - 2, 1, C.ink, { sw: 0 }) + A.path(`M${x - 6} ${y - 6} l2 -5 l3 4 M${x + 6} ${y - 6} l-2 -5 l-3 4`, { sw: 1.1 }));
    board += A.rect(212, 96, 102, 40, '#f6f1e2', { rx: 5, sw: 1.2 }) + ic('appeal', 247, 105, 11) + A.text(266, 105, 'Appeal', { size: 7, weight: 700, fill: C.orange });
    for (let i = 0; i < 9; i++) board += A.line(220 + i * 11, 114, 220 + i * 11, 128, { stroke: '#c9c0a8', sw: 1 }) + (i % 2 ? '' : A.text(220 + i * 11, 132, 10 + i, { size: 5.5, fill: '#6b6255' }));
    const appeal = (v) => A.k('appeal', ic('appeal', 220 + (v - 10) * 11, 121, 13));
    const coins = (pos) => pos.map(([x, y], i) => A.k('coin' + i, A.circle(x, y, 5, '#e9b93a', { sw: 1 }) + A.text(x, y + 0.5, '2', { size: 6, weight: 800, fill: '#5e4508' }))).join('');
    const atBank = [0, 1, 2, 3].map(i => [218 + i * 11, 48]), atEncl = [0, 1, 2, 3].map(i => [ex - 16 + i * 11, ey]);
    return [
      { step: 2, say: '**Build** sits in slot 4: strength 4 this turn.',
        svg: board + row(o1) + money(25) + coins(atBank) + catCard + cat(286, 42) + appeal(11) + A.glow(220, 175, 24, 'g-build') },
      { step: 2, say: 'Strength 4 = an enclosure of up to **4 spaces**: room for the size‑4 cat in your hand.',
        svg: board + row(o1) + money(25) + coins(atBank) + ghost + catCard + cat(286, 42) + appeal(11) + A.glow(ex, ey, 30, 'g-encl') },
      { step: 2, say: 'Pay **2 money per space** (8) and place it touching your existing buildings.',
        svg: board + row(o1) + money(17) + enclosure + coins(atEncl) + catCard + cat(286, 42) + appeal(11) },
      { step: 2, say: 'Build drops to **slot 1**; the cards that were left of it shift right. Animals is now strength 3.',
        svg: board + row(o2) + money(17) + enclosure + catCard + cat(286, 42) + appeal(11) + A.glow(159, 175, 24, 'g-anim') },
      { step: 0, say: 'Next turn, use **Animals**: pay the cat’s 15 money and place it in the empty enclosure.',
        svg: board + row(o2) + money(2) + enclosure + cat(ex, ey) + appeal(11) + A.glow(ex, ey, 30, 'g-encl') },
      { step: 0, say: 'The cat gives **+5 {=appeal}**. Animals drops to slot 1; Build climbs to slot 2.',
        svg: board + row(o3) + money(2) + enclosure + cat(ex, ey) + appeal(16) + A.glow(286, 121, 9, 'g-app') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x - size / 2, y - size / 2, size);
    let o = A.bg('#dfe7d3');
    // zoo map board
    o += A.rect(6, 34, 196, 120, '#c5d6a8', { rx: 6, sw: 1.4 });
    const s = 12.5, ox = 22, oy = 48;
    const fill = (q, r) => {
      if (q >= 1 && q <= 3 && r <= 1) return '#d8b878';      // big enclosure
      if (q >= 7 && q <= 8 && r >= 2 && r <= 3) return 'water';  // water spaces
      if (q === 4 && r === 3) return 'kiosk';
      if (r === 4 && q >= 5 && q <= 6) return 'rock';
      return null;
    };
    for (let r = 0; r < 5; r++) for (let q = 0; q < 9; q++) {
      const x = ox + q * s * 1.732 + (r % 2) * s * 0.866, y = oy + r * s * 1.5;
      const f = fill(q, r);
      o += I[f] ? ic(f, x, y, s * 24 / 10.5) : A.hex(x, y, s, f || '#e8efd9', { sw: 0.6, stroke: '#7d8f68' });
    }
    // animals in enclosures
    o += A.circle(72, 56, 7, '#b5772e', { sw: 1 }) + A.circle(69, 54, 1, C.ink, { sw: 0 });
    o += A.path('M150 82 q8 -8 16 0 q-8 6 -16 0 z', { fill: '#3e7cb0', sw: 1 });
    // two tracks crossing
    o += A.rect(6, 6, 308, 22, '#f6f1e2', { rx: 5, sw: 1.2 });
    for (let i = 0; i < 20; i++) o += A.line(14 + i * 15, 10, 14 + i * 15, 24, { stroke: '#c9c0a8', sw: 1 });
    o += A.arrow(16, 17, 128, 17, { stroke: '#e07b2e', sw: 3 });
    o += A.arrow(306, 17, 204, 17, { stroke: '#2a9a96', sw: 3 });
    o += ic('appeal', 128, 17, 16) + ic('conservation', 204, 17, 15);
    // action cards row 1–5
    const names = ['#8a5a33', '#7d55b5', '#3c8d4f', '#2f6db5', '#c8423b'];
    names.forEach((f, i) => { o += A.card(8 + i * 39, 160, 35, 34, f, { label: i + 1, size: 15 }); });
    // hand of animal cards on the right
    o += A.card(214, 40, 44, 62, '#e9d6a7', { title: '' });
    o += A.circle(236, 70, 10, '#b5772e', { sw: 1 });
    o += A.card(264, 46, 44, 62, '#e9d6a7', {});
    o += A.path('M276 80 q10 -12 20 0 q-10 8 -20 0 z', { fill: '#3e7cb0', sw: 1 });
    // money and conservation project
    o += ic('money', 222, 130, 19) + ic('money', 236, 124, 19);
    o += A.rect(254, 116, 56, 40, '#f6f1e2', { rx: 4, sw: 1.2 });
    o += ic('conservation', 266, 132, 14) + A.rect(276, 126, 12, 12, '#e8efd9', { rx: 2, sw: 0.8 }) + A.rect(292, 126, 12, 12, '#e8efd9', { rx: 2, sw: 0.8 });
    o += A.note(128, 17, 72, 38, 'Appeal →', { w: 62 }) ;
    o += A.note(204, 17, 172, 38, '← Conservation', { w: 92 });
    o += A.note(60, 60, 100, 140, 'Enclosure', { w: 66 });
    o += A.note(186, 168, 256, 182, 'Strength 1–5', { w: 80 });
    return o;
  },
});
