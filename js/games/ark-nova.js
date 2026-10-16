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

  pitch: 'Design a modern zoo: build enclosures, house animals from 255 unique cards, and fund conservation projects until your two score tracks meet.',
  theme: 'You are planning a scientifically run zoo that draws visitors and supports conservation projects around the world.',

  goal: { big: 'Cross the tracks', text: 'Your **appeal** marker climbs one way and your **conservation** marker the other. The player whose markers have crossed **furthest** (score = how far past each other they are) wins.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, use ONE of your 5 action cards. Its slot (1–5) is its strength:',
    outro: 'Used card moves to slot 1; the others shift right',
    steps: [
      { verb: 'Animals', text: 'Play an animal card into a **free enclosure** big enough for it, paying its cost; gain appeal.' },
      { verb: 'Cards', text: 'Draw cards from the deck (more at higher strength); at full strength take one from the display instead.' },
      { verb: 'Build', text: 'Place an enclosure or kiosk on your zoo map; strength is the **max size**, £2 per space.' },
      { verb: 'Association', text: 'Send a worker for reputation, a partner zoo, a university, or to support a **conservation project**.' },
      { verb: 'Sponsors', text: 'Play a sponsor card of level up to the strength, or take that much money and advance the break.' },
    ],
  },

  tension: 'The card you just used drops to strength 1, so every turn you trade a strong action now against setting up stronger ones next turn.',

  flow: [
    { label: 'Fund', items: ['Money at each break', 'Appeal raises income', 'Kiosks and sponsors'] },
    { label: 'Build', items: ['Enclosures on the map', 'Animals in enclosures', 'Partner zoos, universities'] },
    { label: 'Score', items: ['Appeal from animals', 'Conservation from projects', 'Upgrade action cards'] },
  ],

  end: { trigger: 'one player’s appeal and conservation markers cross', detail: 'Everyone else then takes one final turn. Final-scoring cards and endgame conservation bonuses are added before comparing.' },
  scoring: [
    { label: 'Appeal (animals)', share: 6 },
    { label: 'Conservation projects', share: 3 },
    { label: 'Final-scoring card', share: 1 },
  ],

  ref: {
    title: 'Conservation points',
    rows: [
      ['First 10 CP', '2 VP each'],
      ['Every CP after 10', '3 VP each'],
      ['Break', 'income from appeal, refill display'],
      ['X-token', '+1 strength on any one action'],
    ],
  },

  example: 'Your Build card sits in slot **4**. You build a size‑4 enclosure, paying £8, ready for the big cat in your hand. Build slides back to slot 1 and your other cards shift right, so next turn Animals is stronger and you can house the cat for its cost and gain its **appeal**.',

  setup: [
    'Each player takes a zoo map, 5 action cards (Animals starts in slot 1), £25 and 8 starting cards, keeping 4.',
    'Place appeal markers on the track and conservation markers at 0 on the opposite side.',
    'Lay out the 6-card display, base conservation projects and the association board.',
  ],

  terms: [
    ['Appeal', 'Visitors; raises income and moves toward the conservation marker.'],
    ['Conservation (CP)', 'Points from projects; moves toward appeal from the other side.'],
    ['Strength', 'The slot number (1–5) of an action card; higher is better.'],
    ['Upgrade', 'Flip an action card to its stronger side (unlocked via conservation).'],
    ['Reputation', 'How far into the card display you may reach.'],
  ],

  gotchas: [
    'Using a card resets it to **slot 1**; strength comes from not using it for a while.',
    'Animals need an enclosure **at least their size** and often icons like water or rock next to it.',
    'Each conservation project level can be supported by only **one** player.',
  ],

  tips: [
    'Upgrade your Animals or Association card early; upgrades unlock strong extra effects.',
    'Small, cheap animals give steady appeal; don’t wait too long for the perfect big one.',
    'Plan the order of your 5 cards a few turns ahead so the one you need is in slot 4 or 5.',
  ],

  extended: [
    { title: 'Upgraded action cards', items: [
      'Each action card has a basic side (I) and an upgraded side (II). You upgrade by reaching marked spaces on the conservation track and from some card or project rewards.',
      '**Animals II**: plays more animals at lower strength and can take an animal from the display within your reputation range.',
      '**Build II**: lets you build several different buildings in one action and unlocks the special enclosures (reptile house, large bird aviary).',
      '**Association II**: several different tasks in one action (total value up to the strength) and lets you **donate** money for conservation points.',
      '**Cards II** draws more and snaps from the display at lower strength; **Sponsors II** can play several sponsors at once.',
    ] },
    { title: 'Card types', items: [
      '**Animals**: cost, enclosure size, and requirements (water or rock spaces nearby, a petting zoo, reputation). They give appeal, plus icons for continents and animal categories.',
      '**Sponsors**: a level (played with Sponsors of at least that strength), and ongoing effects, income or special buildings.',
      '**Conservation projects**: played with the Association action; they need a number of matching icons in your zoo.',
      '**Final scoring cards**: secret goals you keep in hand; they add conservation points at game end.',
    ] },
    { title: 'Enclosures and buildings', items: [
      'Standard enclosures (size 1–5) hold one animal and flip to their occupied side when filled; an empty one can be needed later, so build ahead.',
      'Kiosks earn money at the break from adjacent pavilions and other buildings; pavilions give 1 appeal.',
      'Every building after the first must touch one you already have. Covering bonus spaces on the map gives one-time rewards.',
    ] },
    { title: 'Association tasks', items: [
      'Place 1 association worker on a task of value up to the strength: **2** reputation, **3** partner zoo (a continent), **4** university, **5** support a conservation project.',
      'If a task area already has workers, you need extra workers to use it again this break.',
      'Supporting a project: show the required icons, take the level you qualify for (more icons = more CP). Each level can be claimed by **one** player only.',
    ] },
    { title: 'The break', items: [
      'Taking the X-token action, some sponsors and the Sponsors money option push the break marker. When it reaches the end, the break happens.',
      'Discard down to the hand limit, take workers back, remove the 2 leftmost display cards and refill.',
      'Income: money from your appeal level, plus kiosks and sponsor income.',
    ] },
    { title: 'X-tokens and reputation', items: [
      'Instead of an action, you may move any card to slot 1 to take an **X-token**. Spend X-tokens to add +1 strength each to a later action.',
      'Reputation sets how far into the 6-card display you can reach and gives bonuses at marked levels.',
    ] },
    { title: 'Final score', items: [
      'Appeal counts up from one end; conservation points count down from the other at 2 VP per CP up to 10, then 3 VP per CP.',
      'When anyone’s markers cross, everyone else gets one last turn. Add final scoring cards and endgame bonuses; your score is how far your two markers have passed each other (it can be negative).',
    ] },
  ],

  walk(A) {
    const C = A.C, r = 10.5;
    const hx = (q, rr) => [24 + q * r * 1.732 + (rr % 2) * r * 0.866, 22 + rr * r * 1.5];
    let board = A.bg('#dfe7d3') + A.rect(6, 6, 196, 132, '#c5d6a8', { rx: 6, sw: 1.4 });
    const water = ['6,1', '7,1', '6,2'], rock = ['1,5', '2,5'];
    for (let rr = 0; rr < 7; rr++) for (let q = 0; q < 9; q++) {
      const [x, y] = hx(q, rr), id = q + ',' + rr;
      board += A.hex(x, y, r, water.includes(id) ? '#8cc0d9' : rock.includes(id) ? '#9aa0a8' : '#e8efd9', { sw: 0.6, stroke: '#7d8f68' });
    }
    // existing small enclosure with a bird, and a kiosk
    board += A.hex(...hx(5, 4), r, '#d8b878', { sw: 1.2 }) + A.bird(...hx(5, 4), 12, '#3e7cb0');
    board += A.hex(...hx(7, 5), r, '#e07b2e', { sw: 1.2 }) + A.text(...hx(7, 5), 'K', { size: 7, weight: 800, fill: C.white });
    const encl = [[2, 2], [3, 2], [2, 3], [3, 3]];
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
    board += A.text(214, 18, 'Money', { size: 7, anchor: 'start', fill: '#6b6255' });
    const money = (m) => A.text(214, 32, '£' + m, { size: 14, weight: 800, anchor: 'start' });
    const catCard = A.k('catcard', A.card(260, 10, 52, 74, '#e9d6a7', {}) + A.text(286, 22, 'Big cat', { size: 6, weight: 800 }) +
      A.text(286, 60, 'size 4 · £15', { size: 5.5 }) + A.text(286, 70, '+5 appeal', { size: 5.5, fill: C.orange }));
    const cat = (x, y) => A.k('cat', A.circle(x, y, 9, '#c98a2e', { sw: 1.2 }) + A.circle(x - 3, y - 2, 1, C.ink, { sw: 0 }) + A.circle(x + 3, y - 2, 1, C.ink, { sw: 0 }) + A.path(`M${x - 6} ${y - 6} l2 -5 l3 4 M${x + 6} ${y - 6} l-2 -5 l-3 4`, { sw: 1.1 }));
    board += A.rect(212, 96, 102, 40, '#f6f1e2', { rx: 5, sw: 1.2 }) + A.text(263, 105, 'Appeal', { size: 7, weight: 700, fill: C.orange });
    for (let i = 0; i < 9; i++) board += A.line(220 + i * 11, 114, 220 + i * 11, 128, { stroke: '#c9c0a8', sw: 1 }) + (i % 2 ? '' : A.text(220 + i * 11, 132, 10 + i, { size: 5.5, fill: '#6b6255' }));
    const appeal = (v) => A.k('appeal', A.circle(220 + (v - 10) * 11, 121, 5, C.orange, { sw: 1.2 }));
    const coins = (pos) => pos.map(([x, y], i) => A.k('coin' + i, A.circle(x, y, 5, C.yellow, { sw: 1 }) + A.text(x, y + 0.5, '2', { size: 6, weight: 800 }))).join('');
    const atBank = [0, 1, 2, 3].map(i => [218 + i * 11, 48]), atEncl = [0, 1, 2, 3].map(i => [ex - 16 + i * 11, ey]);
    return [
      { step: 2, say: 'Your **Build** card sits in slot 4, so this turn it has strength 4.',
        svg: board + row(o1) + money(25) + coins(atBank) + catCard + cat(286, 42) + appeal(11) + A.glow(220, 175, 24, 'g-build') },
      { step: 2, say: 'Strength 4 = an enclosure of up to **4 spaces**. You pick a spot big enough for the size‑4 cat in your hand.',
        svg: board + row(o1) + money(25) + coins(atBank) + ghost + catCard + cat(286, 42) + appeal(11) + A.glow(ex, ey, 30, 'g-encl') },
      { step: 2, say: 'Pay **£2 per space** (£8) and place the enclosure.',
        svg: board + row(o1) + money(17) + enclosure + coins(atEncl) + catCard + cat(286, 42) + appeal(11) },
      { step: 2, say: 'Build drops to **slot 1** and the cards before it shift right. Animals is now strength 3.',
        svg: board + row(o2) + money(17) + enclosure + catCard + cat(286, 42) + appeal(11) + A.glow(159, 175, 24, 'g-anim') },
      { step: 0, say: 'Next turn, use **Animals**: pay the cat’s £15 and put it in the empty enclosure, which is big enough.',
        svg: board + row(o2) + money(2) + enclosure + cat(ex, ey) + appeal(11) + A.glow(ex, ey, 30, 'g-encl') },
      { step: 0, say: 'The cat adds **+5 appeal**, and Animals now goes back to slot 1 while Build climbs to 2.',
        svg: board + row(o3) + money(2) + enclosure + cat(ex, ey) + appeal(16) + A.glow(286, 121, 9, 'g-app') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#dfe7d3');
    // zoo map board
    o += A.rect(6, 34, 196, 120, '#c5d6a8', { rx: 6, sw: 1.4 });
    const s = 12.5, ox = 22, oy = 48;
    const fill = (q, r) => {
      if (q >= 1 && q <= 3 && r <= 1) return '#d8b878';      // big enclosure
      if (q >= 7 && q <= 8 && r >= 2 && r <= 3) return '#8cc0d9'; // water enclosure
      if (q === 5 && r === 0) return '#e07b2e';               // kiosk
      if (r === 4 && q >= 5 && q <= 6) return '#9aa0a8';      // rock
      return null;
    };
    for (let r = 0; r < 5; r++) for (let q = 0; q < 9; q++) {
      const x = ox + q * s * 1.732 + (r % 2) * s * 0.866, y = oy + r * s * 1.5;
      o += A.hex(x, y, s, fill(q, r) || '#e8efd9', { sw: 0.6, stroke: '#7d8f68' });
    }
    // animals in enclosures
    o += A.circle(72, 56, 7, '#b5772e', { sw: 1 }) + A.circle(69, 54, 1, C.ink, { sw: 0 });
    o += A.path('M150 82 q8 -8 16 0 q-8 6 -16 0 z', { fill: '#3e7cb0', sw: 1 });
    // two tracks crossing
    o += A.rect(6, 6, 308, 22, '#f6f1e2', { rx: 5, sw: 1.2 });
    for (let i = 0; i < 20; i++) o += A.line(14 + i * 15, 10, 14 + i * 15, 24, { stroke: '#c9c0a8', sw: 1 });
    o += A.arrow(16, 17, 128, 17, { stroke: '#e07b2e', sw: 3 });
    o += A.arrow(306, 17, 204, 17, { stroke: '#2a9a96', sw: 3 });
    o += A.circle(128, 17, 6, '#e07b2e', { sw: 1.2 }) + A.circle(204, 17, 6, '#2a9a96', { sw: 1.2 });
    // action cards row 1–5
    const names = ['#8a5a33', '#7d55b5', '#3c8d4f', '#2f6db5', '#c8423b'];
    names.forEach((f, i) => { o += A.card(8 + i * 39, 160, 35, 34, f, { label: i + 1, size: 15 }); });
    // hand of animal cards on the right
    o += A.card(214, 40, 44, 62, '#e9d6a7', { title: '' });
    o += A.circle(236, 70, 10, '#b5772e', { sw: 1 });
    o += A.card(264, 46, 44, 62, '#e9d6a7', {});
    o += A.path('M276 80 q10 -12 20 0 q-10 8 -20 0 z', { fill: '#3e7cb0', sw: 1 });
    // money and conservation project
    o += A.circle(222, 128, 8, C.yellow, { sw: 1 }) + A.circle(234, 124, 8, C.yellow, { sw: 1 });
    o += A.rect(254, 116, 56, 40, '#f6f1e2', { rx: 4, sw: 1.2 });
    o += A.rect(260, 126, 12, 12, '#2a9a96', { rx: 2, sw: 0.8 }) + A.rect(276, 126, 12, 12, '#e8efd9', { rx: 2, sw: 0.8 }) + A.rect(292, 126, 12, 12, '#e8efd9', { rx: 2, sw: 0.8 });
    o += A.note(128, 17, 72, 38, 'Appeal →', { w: 62 }) ;
    o += A.note(204, 17, 172, 38, '← Conservation', { w: 92 });
    o += A.note(60, 60, 100, 140, 'Enclosure', { w: 66 });
    o += A.note(186, 168, 256, 182, 'Strength 1–5', { w: 80 });
    return o;
  },
});
