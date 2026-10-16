defineGame({
  id: 'twilight-struggle',
  name: 'Twilight Struggle',
  year: 2005,
  designer: 'Ananda Gupta & Jason Matthews',
  family: 'epic',
  players: [2, 2], best: '2',
  time: [120, 180],
  age: 13,
  mechanics: ['card-driven', 'area-control', 'hand-management', 'dice'],
  profile: { complexity: 4, luck: 3, interaction: 5, conflict: 5, talk: 1, planning: 4 },

  pitch: 'The Cold War as a two-player card duel: spread influence across the world while defusing your opponent’s history that lands in your hand.',
  theme: 'You are the United States or the Soviet Union, fighting the Cold War from 1945 to 1989 without starting World War III.',

  goal: { big: '20 VP', text: 'Push the shared VP track to **20 on your side** to win at once. Otherwise, whoever is ahead after final scoring at the end of **turn 10** wins.' },

  turn: {
    type: 'choose',
    intro: 'Each turn opens with both players secretly choosing a Headline card. Then you alternate action rounds, playing one card each and using it for one of these:',
    steps: [
      { verb: 'Event', text: 'Do the text on the card. Events marked for **your** side, or neutral ones, are yours to trigger.' },
      { verb: 'Influence', text: 'Place influence equal to the card’s **Ops** in or next to countries where you already have some.' },
      { verb: 'Coup', text: 'Roll 1 die + Ops − 2 × the country’s **stability**; each point over removes enemy influence, then adds yours.' },
      { verb: 'Realign', text: 'Each Op is a die-off: both roll, modified by neighbours, and the loser removes influence.' },
      { verb: 'Space Race', text: 'Discard a card with enough Ops and roll to advance on the space track for VP and perks.' },
    ],
    outro: 'USSR acts first each round; 6 rounds per turn early, 7 from turn 4.',
  },

  tension: 'Half your hand is your opponent’s history: if you play their card for Ops, their event happens too, so every turn is choosing which disaster you can survive.',

  flow: [
    { label: 'Spread', items: ['Place influence', 'Control countries', 'Battlegrounds matter most'] },
    { label: 'Contest', items: ['Coups and realignments', 'Each coup in a battleground lowers DEFCON', 'Meet military ops each turn'] },
    { label: 'Score', items: ['Play region scoring cards', 'Presence / Domination / Control', 'Final scoring after turn 10'] },
  ],

  end: {
    trigger: 'turn 10 ends, or someone wins early',
    results: [
      { side: 'Instant win', text: 'reach 20 VP, or Control Europe when it scores.' },
      { side: 'Instant loss', text: 'cause DEFCON 1 (nuclear war), or hold a scoring card at the end of a turn.' },
      { side: 'Final scoring', text: 'after turn 10 every region scores; the player ahead on VP wins.' },
    ],
  },

  ref: {
    title: 'DEFCON: what each level forbids',
    rows: [
      ['5', 'Nothing. Peace.'],
      ['4', 'No coups or realignments in **Europe**.'],
      ['3', 'Also none in **Asia**.'],
      ['2', 'Also none in the **Middle East**.'],
      ['1', 'Nuclear war: the player whose turn it is **loses**.'],
    ],
  },

  example: 'As the US you play **Decolonization**, a Soviet event worth 2 Ops. You choose to do the Ops first: 1 influence into Nigeria and 1 into Zaire. Then the event fires: the USSR adds **1 influence to 4** African or Southeast Asian countries, but you have already shored up the two you care about.',

  setup: [
    'Place starting influence printed on the board (USSR in Eastern Europe, US in the West), plus 6 USSR and 7 US free placements.',
    'Shuffle the Early War cards; deal 8 to each. The USSR takes the China Card.',
    'DEFCON starts at 5, VP at 0, and the turn marker on turn 1.',
  ],

  terms: [
    ['Ops', 'Operations value printed on each card (1–4): how much you can do with it.'],
    ['Control', 'Your influence ≥ stability and beats the enemy’s by at least the stability.'],
    ['Battleground', 'A key country. Coups there lower DEFCON; scoring counts them heavily.'],
    ['DEFCON', 'Nuclear tension, 5 (calm) to 1 (war). Coups lower it.'],
    ['China Card', 'Shared card worth 4 Ops (+1 in Asia) that passes to the opponent after use.'],
  ],

  gotchas: [
    'If you play an **opponent’s event card for Ops, their event still happens**; you only choose whether it goes before or after your Ops.',
    '**Scoring cards** must be played in the turn you draw them. Holding one at turn end loses the game.',
    'At turn end, each player must have done **military ops** equal to DEFCON or give the opponent VP for the shortfall.',
  ],

  extended: [
    { title: 'The Headline phase', text: 'At the start of each turn both players choose a card face down and reveal together. Headlines are played **for the event only**: the higher-Ops card resolves first (US first on a tie). Headlining an opponent’s event triggers it for them, so use it only for your own events or scoring cards. The China Card can never be headlined.' },
    { title: 'The China Card', items: [
      'Starts face up with the USSR. Worth **4 Ops**, +1 if every Op is spent in Asia. It can only be played for Ops, never as an event or in the headline.',
      'After it is played it passes **face down** to the opponent, who can use it from the next turn.',
      'It does not count toward hand size and you can never be forced to play it; whoever holds it at the end of turn 10 gets **+1 VP**.',
    ] },
    { title: 'Regions, battlegrounds and scoring', items: [
      '**Presence**: at least one controlled country. **Domination**: more countries **and** more battlegrounds than the opponent, with at least one battleground and one non-battleground. **Control**: more countries and **every** battleground.',
      'VP for presence / domination / control: Europe 3 / 7 / **automatic win**; Asia 3 / 7 / 9; Middle East 3 / 5 / 7; Africa 1 / 4 / 6; Central America 1 / 3 / 5; South America 2 / 5 / 6.',
      'Bonuses: +1 per battleground you control in the region, +1 per controlled country there adjacent to the enemy superpower.',
      'Southeast Asia scoring (Mid War) is different: 1 VP per controlled country there, 2 for Thailand, and the card is then removed.',
    ] },
    { title: 'Coups and realignments in detail', items: [
      'You can only target a country containing enemy influence, and only where DEFCON allows. Coup roll: d6 + Ops − 2 × stability; each point over 0 removes an enemy influence, then excess adds yours.',
      'Every coup (successful or not) moves your **military ops** marker by the card’s Ops. A coup in a battleground lowers DEFCON by 1.',
      'Realignment: each Op is a separate roll-off. Each side adds +1 per adjacent country it controls, +1 if it has more influence in the target, +1 if the target is adjacent to its superpower. The loser removes influence equal to the difference.',
      'Realignments do not lower DEFCON and do not count as military ops.',
    ] },
    { title: 'The Space Race', items: [
      'Once per turn (twice with the second box’s ability) discard a card instead of using it: its event does **not** happen. The first four boxes need a 2-Ops card, the next three 3 Ops, the last 4 Ops.',
      'Roll the number printed on the next box (e.g. 1–3) to advance. VP boxes pay more to whoever reaches them first.',
      'Ability boxes last until the opponent catches up: two attempts per turn, the opponent reveals their headline first, discard a held card at turn end, and eight action rounds per turn.',
    ] },
    { title: 'Turn bookkeeping', items: [
      'Hands are refilled to **8** cards (9 from turn 4, when the Mid War deck is shuffled in; the Late War joins on turn 8).',
      'End of turn: check military ops (each side must have done at least DEFCON’s level or the opponent scores the shortfall as VP), then DEFCON improves by 1.',
      'Starred events are removed after use; underlined events stay in effect. Playing **your own** event card for Ops does nothing extra; it is only the opponent’s that fire.',
    ] },
  ],

  tips: [
    'Grab battlegrounds in Europe, Asia and the Middle East early; they are worth the most at scoring.',
    'Use the Space Race to dump an opponent event you cannot afford to trigger.',
    'Coup in non-battleground countries to meet military ops without dropping DEFCON.',
  ],

  walk(A) {
    const C = A.C, US = '#2f6db5', SU = '#c8423b';
    let map = A.bg('#e7e0cc');
    map += A.poly([[36, 40], [168, 34], [176, 168], [44, 176]], '#e8c9a4', { stroke: '#a89e86', sw: 1 }) + A.text(106, 172, 'AFRICA', { size: 7, fill: '#8a6a44', spacing: 2 });
    map += A.poly([[184, 46], [266, 44], [268, 138], [186, 140]], '#d6e4ec', { stroke: '#a89e86', sw: 1 }) + A.text(226, 54, 'SE ASIA', { size: 7, fill: '#5a7080', spacing: 2 });
    for (let i = 0; i < 21; i++) map += A.rect(12 + i * 11, 8, 10, 12, i === 10 ? '#d9d1b8' : (i < 10 ? '#f1d9d6' : '#d6e0f1'), { rx: 1, sw: 0.6 });
    map += A.text(12, 26, 'USSR VP', { size: 6, anchor: 'start', fill: SU }) + A.text(243, 26, 'US VP', { size: 6, anchor: 'end', fill: US });
    const dc = ['#3c8d4f', '#9cc04a', '#e2b33c', '#e07b2e', '#c8423b'];
    for (let i = 0; i < 5; i++) map += A.rect(282, 12 + i * 26, 30, 22, dc[i], { rx: 3, sw: 1 }) + A.text(297, 23 + i * 26, 5 - i, { size: 11, weight: 800, fill: '#fff' });
    map += A.text(297, 6, 'DEFCON', { size: 6 });
    const space = [190, 160];
    for (let i = 0; i < 4; i++) map += A.rect(space[0] + i * 20, space[1], 18, 18, '#f4efe2', { rx: 2, sw: 0.8 }) + A.text(space[0] + 9 + i * 20, space[1] + 25, ['start', '2VP', '', '2VP'][i], { size: 5.5 });
    map += A.text(space[0], space[1] - 6, 'Space Race', { size: 7, anchor: 'start' });
    const B = { nig: [48, 48, 'Nigeria'], zai: [108, 76, 'Zaire'], ang: [52, 106, 'Angola'], sea: [108, 134, 'SE Afr. St.'], vie: [196, 66, 'Vietnam'], lao: [196, 104, 'Laos/Camb.'] };
    const BG = { nig: 1, zai: 1, ang: 1 };
    for (const k in B) { const [x, y, n] = B[k]; map += A.rect(x, y, 56, 26, BG[k] ? '#7d5a9a' : '#fbf6ec', { rx: 2, sw: 1 }) + A.text(x + 28, y + 6, n, { size: 6, weight: 700, fill: BG[k] ? '#fff' : C.ink }) + A.text(x + 6, y + 17, 1, { size: 8, weight: 800, fill: BG[k] ? '#fff' : C.ink }); }
    const inf = (k, side, n) => { const [x, y] = B[k]; return A.k(side + '-' + k, A.rect(x + (side === 'us' ? 16 : 34), y + 11, 13, 12, side === 'us' ? US : SU, { rx: 1.5, sw: 0.8, stroke: '#fff' }) + A.text(x + (side === 'us' ? 22.5 : 40.5), y + 17.5, n, { size: 8, weight: 800, fill: '#fff' })); };
    const defcon = (lvl) => A.k('defcon', A.circle(297, 23 + (5 - lvl) * 26, 14, 'none', { stroke: C.ink, sw: 2.6 }));
    const vp = (v) => A.k('vp', A.circle(12 + (10 + v) * 11 + 5, 14, 5, v > 0 ? US : (v < 0 ? SU : C.gray), { stroke: '#fff', sw: 1 }));
    const smark = (i) => A.k('space', A.circle(space[0] + 9 + i * 20, space[1] + 9, 6, US, { stroke: '#fff', sw: 1 }));
    const card = (name, ops, side) => A.k('card', A.card(4, 140, 34, 50, '#f4efe2', {}) + A.circle(14, 150, 6, side === 'us' ? US : SU, { sw: 0.8 }) + A.text(14, 150.5, ops, { size: 7, weight: 800, fill: '#fff' }) +
      A.text(21, 168, name[0], { size: 5.5, weight: 700 }) + A.text(21, 175, name[1] || '', { size: 5.5, weight: 700 }));
    const st0 = defcon(5) + vp(0) + smark(0);
    return [
      { step: 1, say: 'US plays **Decolonization**, a Soviet event worth 2 Ops. Ops first: **1 influence** each into Nigeria and Zaire.',
        svg: map + st0 + card(['Decolon-', 'ization'], 2, 'su') + inf('nig', 'us', 1) + inf('zai', 'us', 1) + A.glow(76, 61, 32, 'g-n') },
      { step: 0, say: 'It’s a Soviet card, so its **event still fires**: the USSR adds 1 influence to 4 countries in Africa or SE Asia.',
        svg: map + st0 + card(['Decolon-', 'ization'], 2, 'su') + inf('nig', 'us', 1) + inf('zai', 'us', 1) + inf('ang', 'su', 1) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) },
      { step: 2, say: 'USSR **coups** Nigeria with a 3-Ops card: roll **4** + 3 − 2×stability 1 = **5**. Remove the US 1, add 4 Soviet.',
        svg: map + st0 + card(['Comecon', ''], 3, 'su') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('ang', 'su', 1) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) +
          A.k('die', A.die(110, 50, 18, 4, '#c8423b', { pip: '#fff' })) + A.glow(76, 61, 32, 'g-n') },
      { step: 2, say: 'Nigeria is a **battleground**, so the coup drops **DEFCON** to 4: no more coups or realignments in Europe.',
        svg: map + defcon(4) + vp(0) + smark(0) + card(['Comecon', ''], 3, 'su') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('ang', 'su', 1) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) + A.glow(297, 49, 18, 'g-dc') },
      { step: 3, say: 'US **realigns** Angola with 1 Op: US rolls 5, USSR rolls 2 +1 (more influence there). US wins by 2: the Soviet marker goes.',
        svg: map + defcon(4) + vp(0) + smark(0) + card(['Truman', 'Doctrine'], 1, 'us') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) +
          A.k('rd1', A.die(116, 108, 16, 5, '#fff')) + A.k('rd2', A.die(136, 108, 16, 2, '#c8423b', { pip: '#fff' })) + A.glow(80, 119, 32, 'g-a') },
      { step: 4, say: 'US sends **Fidel**, a Soviet event it doesn’t want, to the **Space Race**: roll 2 (needs 1–3). First box: **+2 VP**, and the event never happens.',
        svg: map + defcon(4) + vp(2) + smark(1) + card(['Fidel', ''], 2, 'su') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) +
          A.k('sd', A.die(274, 156, 16, 2, '#fff')) + A.glow(149, 14, 10, 'g-vp') },
    ];
  },

  art(A) {
    const C = A.C;
    const US = '#2f6db5', SU = '#c8423b';
    let o = A.bg('#e7e0cc');
    // regions
    const reg = [
      ['#c9d8c0', [[12, 40], [86, 34], [96, 70], [70, 96], [30, 86]]],           // Americas N
      ['#d8cfa6', [[54, 104], [92, 100], [96, 140], [72, 150]]],                // S America
      ['#cdbfe0', [[110, 34], [170, 32], [176, 72], [120, 76]]],                 // Europe
      ['#e8c9a4', [[118, 84], [168, 82], [176, 140], [130, 148]]],               // Africa
      ['#f0d7a0', [[176, 76], [210, 70], [212, 108], [182, 104]]],               // Middle East
      ['#d6e4ec', [[214, 36], [262, 40], [266, 118], [220, 114]]],               // Asia
    ];
    for (const [f, p] of reg) o += A.poly(p, f, { stroke: '#a89e86', sw: 1 });
    // country boxes: [x, y, stab, us, su, battleground]
    const box = (x, y, stab, us, su, bg) => {
      let s = A.rect(x, y, 30, 14, bg ? '#7d5a9a' : '#fbf6ec', { rx: 1.5, sw: 1 }) + A.text(x + 5, y + 7, stab, { size: 7, weight: 800, fill: bg ? '#fff' : C.ink });
      if (us) s += A.rect(x + 10, y + 2, 9, 10, US, { rx: 1, sw: 0.6, stroke: '#fff' }) + A.text(x + 14.5, y + 7.3, us, { size: 7, weight: 800, fill: '#fff' });
      if (su) s += A.rect(x + 20, y + 2, 9, 10, SU, { rx: 1, sw: 0.6, stroke: '#fff' }) + A.text(x + 24.5, y + 7.3, su, { size: 7, weight: 800, fill: '#fff' });
      return s;
    };
    o += box(40, 52, 2, 4, 0, true) + box(60, 118, 2, 0, 2, true);
    o += box(118, 40, 4, 4, 0, true) + box(138, 56, 3, 0, 4, true);
    o += box(130, 98, 1, 1, 2, false) + box(140, 122, 2, 2, 0, true);
    o += box(180, 86, 2, 0, 3, true) + box(222, 52, 3, 2, 1, false) + box(228, 90, 2, 0, 0, true);
    // coup die
    // VP track along the top
    for (let i = 0; i < 21; i++) o += A.rect(12 + i * 11, 8, 10, 12, i === 10 ? '#d9d1b8' : (i < 10 ? '#f1d9d6' : '#d6e0f1'), { rx: 1, sw: 0.6 });
    o += A.circle(12 + 13 * 11 + 5, 14, 5, US, { stroke: '#fff', sw: 1 });
    // DEFCON track down the right
    const dc = ['#3c8d4f', '#9cc04a', '#e2b33c', '#e07b2e', '#c8423b'];
    for (let i = 0; i < 5; i++) {
      o += A.rect(282, 12 + i * 26, 30, 22, dc[i], { rx: 3, sw: 1 }) + A.text(297, 23 + i * 26, 5 - i, { size: 11, weight: 800, fill: '#fff' });
    }
    o += A.circle(297, 75, 13, 'none', { stroke: C.ink, sw: 2.4 });
    // hand of cards with ops stars
    o += A.card(144, 148, 32, 44, '#f4efe2', { corner: '3', labelFill: SU, label: '★', size: 16 });
    o += A.card(176, 150, 32, 44, '#f4efe2', { corner: '2', labelFill: US, label: '★', size: 16 });
    o += A.card(208, 152, 32, 44, '#f6e0a6', { title: 'SCORE', label: 'Asia', labelFill: C.ink, size: 9 });
    o += A.note(160, 14, 190, 34, 'VP track: ±20 wins');
    o += A.note(284, 82, 234, 140, 'DEFCON: 1 = war');
    o += A.note(72, 125, 70, 162, 'Influence vs stability');
    o += A.note(150, 172, 70, 186, 'Card: Ops or event');
    return o;
  },
});
