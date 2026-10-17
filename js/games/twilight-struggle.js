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

  // Influence, DEFCON levels (same boxes as the board's track), battlegrounds, Ops stars and key cards.
  icons: (() => {
    const W = '#fff', cardf = (A, f) => A.rect(4, 1, 16, 22, f, { rx: 2.5, sw: 1.3 });
    const DC = { 5: '#3c8d4f', 4: '#9cc04a', 3: '#e2b33c', 2: '#e07b2e', 1: '#c8423b' };
    const ops = (n) => ({ name: n ? n + ' Ops' : 'Ops', draw: A => n ? A.circle(12, 12, 10, '#2a2420', { sw: 0 }) + A.text(12, 12.8, n, { size: 15, weight: 800, fill: W }) : A.star(12, 12.8, 12, '#f4efe2', { sw: 1.2 }) });
    const icons = {
      us: { name: 'US influence', draw: A => A.rect(3, 3, 18, 18, '#2f6db5', { rx: 2.5, sw: 1.3 }) + A.star(12, 12.5, 6.5, W, { sw: 0 }) },
      ussr: { name: 'USSR influence', draw: A => A.rect(3, 3, 18, 18, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.star(12, 12.5, 6.5, W, { sw: 0 }) },
      bg: { name: 'battleground', draw: A => A.rect(1.5, 5, 21, 14, '#7d5a9a', { rx: 2, sw: 1.3 }) + A.text(6.5, 12.3, '2', { size: 8.5, weight: 800, fill: W }) + A.line(11, 9.5, 19, 9.5, { stroke: W, sw: 1.2 }) + A.line(11, 14.5, 17, 14.5, { stroke: W, sw: 1.2 }) },
      score: { name: 'scoring card', draw: A => cardf(A, '#f6e0a6') + A.rect(6.5, 3.5, 11, 4, '#c8423b', { rx: 1, sw: 0 }) + A.rect(7, 16, 2.6, 4, '#2a2420', { rx: 0, sw: 0 }) + A.rect(10.7, 12.5, 2.6, 7.5, '#2a2420', { rx: 0, sw: 0 }) + A.rect(14.4, 9.5, 2.6, 10.5, '#2a2420', { rx: 0, sw: 0 }) },
      china: { name: 'China Card', draw: A => cardf(A, '#e2b33c') + A.star(12, 12.5, 6, '#c8423b', { sw: 0 }) },
      space: { name: 'Space Race', draw: A => A.poly([[8, 15], [5, 20], [9, 19]], '#c8423b', { sw: 1 }) + A.poly([[16, 15], [19, 20], [15, 19]], '#c8423b', { sw: 1 }) + A.path('M12 2 q5 5 4 14.5 h-8 q-1 -9.5 4 -14.5z', { fill: W, sw: 1.3 }) + A.circle(12, 9, 2, '#2f6db5', { sw: 0.8 }) + A.poly([[10, 17], [14, 17], [12, 22]], '#e07b2e', { sw: 0 }) },
      ops: ops(0),
    };
    for (let n = 1; n <= 4; n++) icons['ops' + n] = ops(n);
    for (let n = 1; n <= 5; n++) icons['dc' + n] = { name: 'DEFCON ' + n, draw: A => A.rect(1.5, 1.5, 21, 21, DC[n], { rx: 3, sw: 1.3 }) + A.text(12, 12.5, n, { size: 13, weight: 800, fill: W }) };
    return icons;
  })(),

  pitch: 'Two players play cards for events or Ops to spread influence, stage coups and score regions; reach 20 VP or lead after turn 10.',

  goal: { big: '20 VP', text: 'Push the shared VP track to **20 on your side** to win at once. Otherwise, whoever leads after final scoring at the end of **turn 10** wins.' },

  turn: {
    type: 'choose',
    intro: 'Each turn starts with a Headline: each player secretly picks 1 card, then both reveal at once. Then players alternate action rounds; in each round you play 1 card and use it for one of:',
    steps: [
      { verb: 'Event', text: 'Carry out the card’s text. You may choose this only for your own side’s events and neutral ones.' },
      { verb: 'Influence', text: 'Place influence equal to the card’s {=ops} **Ops**. Each point goes into a country where you had influence at the start of this round, a country next to one of those, or a country next to your superpower. Each influence placed in an enemy-controlled country costs 2 Ops.' },
      { verb: 'Coup', text: 'Pick a country with enemy influence. Roll {=die}, add the card’s Ops and subtract 2 × the country’s **stability**. For each point above 0, remove 1 enemy influence there; once none is left, add 1 of yours instead. A coup in a {=bg} lowers DEFCON by 1.' },
      { verb: 'Realign', text: 'For each Op, pick a country; both players roll {=die} and add modifiers (see Extended details). The player with the lower total removes their influence there equal to the difference.' },
      { verb: 'Space Race', text: 'Discard a card with enough Ops and roll {=die} to try to advance on the {=space} track, which gives VP and abilities. The card’s event doesn’t happen.' },
    ],
    outro: 'In each action round the USSR plays first, then the US. 6 action rounds per turn, 7 from turn 4',
  },

  tension: 'Half your hand is your opponent’s events: playing them for Ops triggers them anyway, so each turn you choose which harm to accept and when.',

  structure: [
    { label: 'Setup', text: 'Place the starting influence plus free placements (USSR 6, US 7). Deal 8 Early War cards to each player; the USSR takes the {china}.' },
    { label: 'Turn start', repeat: '10 turns', text: 'DEFCON improves by 1; each player draws until they hold 8 cards (9 from turn 4, when the Mid War cards are added to the deck; Late War cards are added on turn 8). **Headline**: each player plays 1 card face down for its event; the higher-Ops card resolves first (US first on a tie).' },
    { label: 'Action rounds', repeat: '6, then 7', text: 'Each round, the USSR plays 1 card, then the US plays 1 card.' },
    { label: 'Turn end', text: 'A player whose military ops are below the DEFCON level gives the opponent VP equal to the shortfall. No one may keep a {=score} in hand into the next turn. The {=china} turns face up.' },
    { label: 'Final scoring', text: 'After turn 10: every region scores, the China Card holder gains 1 VP, and the player ahead on VP wins.' },
  ],

  points: [
    ['{=score} Region scoring', 'Presence / Domination / Control VP printed on the card, +1 per {=bg} you control there, +1 per controlled country there next to the enemy superpower'],
    ['Events', 'Many cards award VP directly'],
    ['{=space} Space Race', 'VP boxes, worth more to whoever reaches them first'],
    ['Military ops', 'VP equal to your opponent’s shortfall below the DEFCON level at turn end'],
    ['{=china} China Card', '+1 VP to its holder at final scoring'],
  ],

  end: {
    trigger: 'turn 10 ends, or someone wins early',
    results: [
      { side: 'Instant win', text: 'push the VP marker to 20 on your side, or have Control of Europe when Europe is scored.' },
      { side: 'Instant loss', text: 'the player who causes DEFCON 1 (nuclear war) loses. Tournament rule only: a player holding a scoring card at the end of a turn loses.' },
      { side: 'Final scoring', text: 'after turn 10 every region scores (reaching 20 VP here is not an instant win); the player ahead on VP wins; a VP marker at 0 is a draw.' },
    ],
  },

  ref: {
    title: 'DEFCON: where coups and realignments are banned',
    rows: [
      ['{=dc5}', 'No restrictions.'],
      ['{=dc4}', 'Not in **Europe**.'],
      ['{=dc3}', 'Not in Europe or **Asia**.'],
      ['{=dc2}', 'Not in Europe, Asia or the **Middle East**.'],
      ['{=dc1}', 'Nuclear war: the player who caused it **loses**.'],
    ],
  },

  example: 'As the US you play **Decolonization**, a Soviet event worth {=ops2}. You take the Ops first: 1 {=us} into Nigeria and 1 into Zaire. Then the event happens for the USSR: the USSR adds 1 {=ussr} to each of 4 countries in Africa or Southeast Asia.',

  setup: [
    'Place the starting influence printed on the board, then free placements: USSR 6 in Eastern Europe, US 7 in Western Europe.',
    'Shuffle the Early War cards and deal 8 to each player. The USSR takes the {china} face up.',
    'Put the DEFCON marker on {=dc5}, the VP marker on 0 and the turn marker on turn 1.',
  ],

  terms: [
    ['{=ops} Ops', 'Operations points: the number on each card (1–4), saying how much you can do with it.'],
    ['Control', 'You control a country when your influence there is at least its stability number and exceeds the opponent’s influence there by at least its stability number.'],
    ['{=bg} Battleground', 'A key country (purple box). A coup there lowers DEFCON; region scoring gives extra VP for them.'],
    ['{=dc3} DEFCON', 'The nuclear tension track, from 5 (calm) to 1 (war). Coups in battlegrounds lower it.'],
    ['Military ops', 'A track counting the Ops you spent this turn on coups and some events.'],
    ['{=china} China Card', 'A shared card worth 4 Ops (+1 if all of them are spent in Asia). After you play it, it passes face down to your opponent.'],
  ],

  gotchas: [
    'Playing an **opponent’s event card for Ops still triggers their event**; you choose only whether the event happens before or after you use the Ops.',
    '{=score} **Scoring cards** must be played during the turn you draw them; you may never keep one into the next turn (tournament rule only: holding one at turn end loses the game).',
    'At turn end, each player needs **military ops** this turn (from coups and some events) at least equal to the DEFCON level, or the opponent gains the shortfall as VP.',
  ],

  extended: [
    { title: 'The Headline phase', text: 'Each player chooses 1 card face down, then both reveal at once. Headline cards are played **for the event only**: the higher-Ops card resolves first (US first on a tie). Headlining an opponent’s event triggers it for them. Scoring cards may be headlined; a headlined scoring card resolves after the other headline. The China Card can never be headlined.' },
    { title: 'The China Card', items: [
      'Starts face up with the USSR. Worth **4 Ops**, +1 if every Op is spent in Asia. Playable only for Ops, never as an event or headline.',
      'After use it passes **face down** to the opponent, who can use it from the next turn.',
      'It doesn’t count toward hand size and can’t be forced out of your hand; whoever holds it at the end of turn 10 gains **+1 VP**.',
    ] },
    { title: 'Regions, battlegrounds and scoring', items: [
      '**Presence**: you control at least 1 country in the region. **Domination**: you control more countries **and** more {=bg} there than the opponent, including at least 1 battleground and 1 non-battleground. **Control**: you control more countries there than the opponent, and **every** battleground there.',
      'VP for presence / domination / control: Europe 3 / 7 / **automatic win**; Asia 3 / 7 / 9; Middle East 3 / 5 / 7; Africa 1 / 4 / 6; Central America 1 / 3 / 5; South America 2 / 5 / 6.',
      'Bonuses: +1 per battleground you control in the region, +1 per controlled country there adjacent to the enemy superpower.',
      'Southeast Asia scoring (Mid War): 1 VP per controlled country there, 2 for Thailand; the card is then removed.',
    ] },
    { title: 'Coups and realignments in detail', items: [
      'A coup must target a country with enemy influence. Coups and realignments are allowed only where the DEFCON level allows (see the DEFCON table). Coup roll: {=die} + Ops − 2 × stability. Each point above 0 removes 1 enemy influence; points left after all enemy influence is gone each add 1 of yours.',
      'Every coup (successful or not) advances your **military ops** by the card’s Ops. A coup in a {=bg} lowers DEFCON by 1.',
      'Realignment: each Op is a separate roll by both players. Each player adds +1 per adjacent country they control, +1 if it has more influence in the target, +1 if the target is adjacent to its superpower. The loser removes influence equal to the difference.',
      'Realignments don’t lower DEFCON and don’t count as military ops.',
    ] },
    { title: 'The Space Race', items: [
      'Once per turn (twice with the two-attempts ability below), you may discard a card to the Space Race instead of using it: its event does **not** happen. To try for boxes 1–4 the card needs 2+ Ops, boxes 5–7 need 3+ Ops, and the last box needs 4 Ops.',
      'Roll {=die}: if the result is within the range printed on your next box (e.g. 1–3), move your marker into it. VP boxes pay more to whoever reaches them first.',
      'An ability box’s power lasts until the opponent reaches that box too. The abilities: two Space Race attempts per turn; the opponent reveals their headline first; you may discard 1 held card at turn end; you get eight action rounds per turn.',
    ] },
    { title: 'Turn bookkeeping', items: [
      'Start of turn: DEFCON improves by 1; each player draws until they hold **8** cards (9 from turn 4, when the Mid War cards are shuffled into the deck; Late War cards are added on turn 8).',
      'End of turn: check military ops (each player needs at least the DEFCON level, or the opponent scores the shortfall), then flip the China Card face up. Tournament rule only: both players reveal their held cards, and holding a scoring card loses.',
      'Events with a star (*) are removed from the game after their event happens; underlined events stay in effect afterwards. Playing **your own** event card for Ops does nothing extra; only the opponent’s events happen when played for Ops.',
    ] },
  ],

  tips: [
    'Take battlegrounds in Europe, Asia and the Middle East early; they score the most.',
    'Use the Space Race to dump an opponent event you can’t afford to trigger.',
    'Coup in non-battleground countries to meet military ops without lowering DEFCON.',
  ],

  walk(A) {
    const C = A.C, US = '#2f6db5', SU = '#c8423b';
    let map = A.bg('#e7e0cc');
    map += A.poly([[36, 40], [168, 34], [176, 168], [44, 176]], '#e8c9a4', { stroke: '#a89e86', sw: 1 }) + A.text(106, 172, 'AFRICA', { size: 7, fill: '#8a6a44', spacing: 2 });
    map += A.poly([[184, 46], [266, 44], [268, 138], [186, 140]], '#d6e4ec', { stroke: '#a89e86', sw: 1 }) + A.text(226, 54, 'SE ASIA', { size: 7, fill: '#5a7080', spacing: 2 });
    for (let i = 0; i < 21; i++) map += A.rect(12 + i * 11, 8, 10, 12, i === 10 ? '#d9d1b8' : (i < 10 ? '#f1d9d6' : '#d6e0f1'), { rx: 1, sw: 0.6 });
    map += A.text(12, 26, 'USSR VP', { size: 6, anchor: 'start', fill: SU }) + A.text(243, 26, 'US VP', { size: 6, anchor: 'end', fill: US });
    const dc = ['#3c8d4f', '#9cc04a', '#e2b33c', '#e07b2e', '#c8423b'];
    for (let i = 0; i < 5; i++) map += A.use(this.icons['dc' + (5 - i)].draw(A), 285, 10 + i * 26, 24);
    map += A.text(297, 4.5, 'DEFCON', { size: 6 });
    const space = [190, 160];
    for (let i = 0; i < 4; i++) map += A.rect(space[0] + i * 20, space[1], 18, 18, '#f4efe2', { rx: 2, sw: 0.8 }) + A.text(space[0] + 9 + i * 20, space[1] + 25, ['start', '2VP', '', '2VP'][i], { size: 5.5 });
    map += A.text(space[0], space[1] - 6, 'Space Race', { size: 7, anchor: 'start' });
    const B = { nig: [48, 48, 'Nigeria'], zai: [108, 76, 'Zaire'], ang: [52, 106, 'Angola'], sea: [108, 134, 'SE Afr. St.'], vie: [196, 66, 'Vietnam'], lao: [196, 104, 'Laos/Camb.'] };
    const BG = { nig: 1, zai: 1, ang: 1 };
    for (const k in B) { const [x, y, n] = B[k]; map += A.rect(x, y, 56, 26, BG[k] ? '#7d5a9a' : '#fbf6ec', { rx: 2, sw: 1 }) + A.text(x + 28, y + 6, n, { size: 6, weight: 700, fill: BG[k] ? '#fff' : C.ink }) + A.text(x + 6, y + 17, 1, { size: 8, weight: 800, fill: BG[k] ? '#fff' : C.ink }); }
    const inf = (k, side, n) => { const [x, y] = B[k]; return A.k(side + '-' + k, A.rect(x + (side === 'us' ? 16 : 34), y + 11, 13, 12, side === 'us' ? US : SU, { rx: 1.5, sw: 0.8, stroke: '#fff' }) + A.text(x + (side === 'us' ? 22.5 : 40.5), y + 17.5, n, { size: 8, weight: 800, fill: '#fff' })); };
    const defcon = (lvl) => A.k('defcon', A.circle(297, 22 + (5 - lvl) * 26, 13.5, 'none', { stroke: C.ink, sw: 2.6 }));
    const vp = (v) => A.k('vp', A.circle(12 + (10 + v) * 11 + 5, 14, 5, v > 0 ? US : (v < 0 ? SU : C.gray), { stroke: '#fff', sw: 1 }));
    const smark = (i) => A.k('space', A.use(this.icons.space.draw(A), space[0] + 1 + i * 20, space[1] + 1, 16));
    const card = (name, ops, side) => A.k('card', A.card(4, 140, 34, 50, '#f4efe2', {}) + A.circle(14, 150, 6, side === 'us' ? US : SU, { sw: 0.8 }) + A.text(14, 150.5, ops, { size: 7, weight: 800, fill: '#fff' }) +
      A.text(21, 168, name[0], { size: 5.5, weight: 700 }) + A.text(21, 175, name[1] || '', { size: 5.5, weight: 700 }));
    const st0 = defcon(5) + vp(0) + smark(0);
    return [
      { step: 1, say: 'US plays **Decolonization**, a Soviet event worth {=ops2}. Ops first: 1 {=us} each into Nigeria and Zaire.',
        svg: map + st0 + card(['Decolon-', 'ization'], 2, 'su') + inf('nig', 'us', 1) + inf('zai', 'us', 1) + A.glow(76, 61, 32, 'g-n') },
      { step: 0, say: 'It’s a Soviet card, so its **event still fires**: the USSR adds 1 {=ussr} to each of 4 countries in Africa or SE Asia.',
        svg: map + st0 + card(['Decolon-', 'ization'], 2, 'su') + inf('nig', 'us', 1) + inf('zai', 'us', 1) + inf('ang', 'su', 1) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) },
      { step: 2, say: 'USSR **coups** Nigeria with a {=ops3} card: {=d4} + 3 − 2 × stability 1 = **5**. Remove the US 1, add 4 Soviet.',
        svg: map + st0 + card(['Comecon', ''], 3, 'su') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('ang', 'su', 1) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) +
          A.k('die', A.die(110, 50, 18, 4, '#c8423b', { pip: '#fff' })) + A.glow(76, 61, 32, 'g-n') },
      { step: 2, say: 'Nigeria is a {=bg} **battleground**, so DEFCON drops to {=dc4}: no more coups or realignments in Europe.',
        svg: map + defcon(4) + vp(0) + smark(0) + card(['Comecon', ''], 3, 'su') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('ang', 'su', 1) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) + A.glow(297, 48, 18, 'g-dc') },
      { step: 3, say: 'US **realigns** Angola with 1 Op: US rolls {=d5} +1 (controls adjacent Zaire), USSR rolls {=d2} +1 (more influence there). US wins 6–3: the Soviet influence goes.',
        svg: map + defcon(4) + vp(0) + smark(0) + card(['Truman', 'Doctrine'], 1, 'us') + inf('zai', 'us', 1) + inf('nig', 'su', 4) + inf('sea', 'su', 1) + inf('vie', 'su', 1) + inf('lao', 'su', 1) +
          A.k('rd1', A.die(116, 108, 16, 5, '#fff')) + A.k('rd2', A.die(136, 108, 16, 2, '#c8423b', { pip: '#fff' })) + A.glow(80, 119, 32, 'g-a') },
      { step: 4, say: 'US sends **Fidel**, a Soviet event it doesn’t want, to the {=space}: rolls {=d2} (needs 1–3). First box: **+2 VP**; the event never happens.',
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
    for (let i = 0; i < 5; i++) o += A.use(this.icons['dc' + (5 - i)].draw(A), 285, 10 + i * 26, 24);
    o += A.circle(297, 74, 14.5, 'none', { stroke: C.ink, sw: 2.4 });
    // hand of cards with ops stars
    o += A.card(144, 148, 32, 44, '#f4efe2', { corner: '3', labelFill: SU, label: '★', size: 16 });
    o += A.card(176, 150, 32, 44, '#f4efe2', { corner: '2', labelFill: US, label: '★', size: 16 });
    o += A.use(this.icons.score.draw(A), 200, 150, 48);
    o += A.note(160, 14, 190, 34, 'VP track: ±20 wins');
    o += A.note(284, 82, 234, 140, 'DEFCON: 1 = war');
    o += A.note(72, 125, 70, 162, 'Influence vs stability');
    o += A.note(150, 172, 70, 186, 'Card: Ops or event');
    return o;
  },
});
