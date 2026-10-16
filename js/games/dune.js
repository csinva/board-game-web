defineGame({
  id: 'dune',
  name: 'Dune',
  year: 2019,
  designer: 'Bill Eberle, Jack Kittredge & Peter Olotka',
  family: 'epic',
  players: [2, 6], best: '6',
  time: [120, 240],
  age: 14,
  mechanics: ['variable-powers', 'area-control', 'auction', 'negotiation', 'bluffing'],
  profile: { complexity: 4, luck: 2, interaction: 5, conflict: 5, talk: 5, planning: 4 },

  pitch: 'Six factions with wildly unequal powers fight for the desert planet’s strongholds, bidding spice for weapons and bribing each other’s leaders.',
  theme: 'You lead a great house or power of the Dune novels, fighting for control of the spice planet Arrakis.',

  goal: { big: '3 strongholds', text: 'At the end of a turn, control **3 of the 5 strongholds** alone, or **4** together with your ally, and you win.' },

  turn: {
    type: 'round',
    intro: 'Each game turn, everyone goes through these phases together (in storm order):',
    steps: [
      { verb: 'Storm', text: 'The storm moves around the planet, wiping out forces and spice in the open desert it crosses. Then **spice** appears.' },
      { verb: 'Bid', text: 'Treachery cards (weapons, defenses, tricks) are auctioned one at a time for **spice**.' },
      { verb: 'Ship & move', text: 'Each player may make **1 shipment** from off-planet and **1 move** of one group.' },
      { verb: 'Battle', text: 'Wherever two factions share a territory they fight with a secret **battle wheel**.' },
      { verb: 'Collect', text: 'Forces on spice collect **2** each (3 if you hold Arrakeen or Carthag). Then check for a win.' },
    ],
  },

  tension: 'Spice wins battles but you have to spend it to ship troops and buy cards, and every spice you pay goes to a rival faction.',

  flow: [
    { label: 'Earn', items: ['Collect spice in the desert', 'Faction income', 'Deals and bribes'] },
    { label: 'Spend', items: ['Ship forces (1 or 2 per force)', 'Bid on treachery cards', 'Revive dead forces'] },
    { label: 'Fight', items: ['Dial forces + leader', 'Weapons kill leaders', 'Call a traitor'] },
  ],

  end: {
    trigger: 'someone controls 3 strongholds (4 for an alliance) at the end of a turn, or turn 10 ends',
    detail: 'If nobody has won after 10 turns, the Fremen win if their special condition is met; otherwise the Spacing Guild wins if in play.',
    results: [
      { side: 'Solo win', text: 'hold 3 strongholds alone.' },
      { side: 'Alliance win', text: 'allies hold 4 strongholds between them and all win.' },
      { side: 'Bene Gesserit', text: 'steal the win if their secret prediction of winner and turn comes true.' },
    ],
  },

  ref: {
    title: 'The six factions',
    rows: [
      ['Atreides (green)', 'Foresight: see cards up for bid and part of each opponent’s battle plan.'],
      ['Harkonnen (black)', 'Keep **all 4** traitor cards; hold up to 8 treachery cards.'],
      ['Emperor (red)', 'Receives the spice others pay for treachery cards. Elite Sardaukar.'],
      ['Spacing Guild (orange)', 'Receives shipping payments; ships cheaply and out of turn. Wins if nobody else does.'],
      ['Fremen (tan)', 'Start on the planet, ship free near the Great Flat, ride sandworms.'],
      ['Bene Gesserit (blue)', 'Secretly predict the winner and turn; use the Voice in battle.'],
    ],
  },

  example: 'Atreides and Harkonnen both have forces in **Arrakeen**. Atreides dials **4** and picks Gurney Halleck (strength 4): total 8. Harkonnen dials 3 with Feyd-Rautha (6): total 9. But Gurney is one of Harkonnen’s **traitors**, so Harkonnen calls “Traitor!”: they win, lose nothing, collect **4 spice**, and every Atreides force there dies.',

  setup: [
    'Each player takes a faction and sets up as its sheet says (starting forces, spice and leaders).',
    'Deal 4 traitor cards each; keep 1 (Harkonnen keep all 4). Deal 1 treachery card (Harkonnen 2).',
    'Place the storm, then begin turn 1 with the Storm phase.',
  ],

  terms: [
    ['Stronghold', 'One of 5 cities: Arrakeen, Carthag, Sietch Tabr, Habbanya Sietch, Tuek’s Sietch.'],
    ['Battle wheel', 'Secret dial: forces you commit (lost even if you win) + your leader’s strength.'],
    ['Traitor', 'A card naming an enemy leader. If they lead against you, you win outright.'],
    ['Treachery card', 'Weapons, defenses and tricks bought at auction.'],
    ['Ornithopters', 'Hold Arrakeen or Carthag to move 3 territories instead of 1.'],
  ],

  gotchas: [
    'The battle **loser loses everything** in that territory; the winner loses only the forces dialed.',
    'A **weapon** kills the opposing leader unless they played the matching **defense**; a dead leader adds 0.',
    'No more than **two factions** can have forces in one stronghold at a time.',
  ],

  extended: [
    { title: 'Faction powers in more depth', items: [
      '**Atreides**: see each treachery card before it is bid on and peek at the next spice-blow card; in battle, force the opponent to reveal one element of their plan (leader, weapon, defense or dial). After losing 7 forces total, the **Kwisatz Haderach** adds +2 to one leader per battle.',
      '**Harkonnen**: keep all 4 traitors, hold up to 8 treachery cards and take a free extra card whenever you buy one. Win a battle and you may capture a random enemy leader (use it or kill it for 2 spice).',
      '**Emperor**: all spice paid for treachery cards comes to you. Advanced rule: Sardaukar forces count double in battle (except against Fremen).',
      '**Spacing Guild**: all shipping payments come to you; you ship at half price, may ship between territories or back off-planet, and may take your shipment at any point in the ship & move order.',
      '**Fremen**: start on the planet, bring in forces free near the Great Flat, move 2 territories, lose only half to the storm, and can ride a sandworm when Shai-Hulud appears. Free revival is 3 forces a turn.',
      '**Bene Gesserit**: secret prediction of winner and turn; the **Voice** orders an opponent to play (or not play) a specific card type in battle; whenever anyone ships, you may send 1 force free to the Polar Sink.',
    ] },
    { title: 'Battle plans in detail', items: [
      'A plan is: a number dialed (0 up to your forces there), a **leader** (or a Cheap Hero card), and optionally one **weapon** and one **defense**. You must play a leader or Cheap Hero if you have one available.',
      'Projectile weapons are stopped by **shields**, poison weapons by **snoopers**. A killed leader adds 0 and goes to the Tleilaxu Tanks; the winner collects spice equal to every leader killed in the battle.',
      '**Lasgun + shield** in the same battle: an explosion kills every force and leader in the territory, both sides.',
      'The loser discards every treachery card played; the winner may keep theirs. A leader who fought cannot fight in a different territory the same turn.',
      'Traitor called: that side wins and loses nothing; the betrayed side loses all forces there and the traitor leader dies. If both call traitor, both lose everything.',
    ] },
    { title: 'Storm, spice and sandworms', items: [
      'The storm moves 1–6 sectors counter-clockwise each turn (dialed by two players, or by storm card). Forces in open sand under it die; **rock** territories and strongholds are safe. You cannot move into or through a storm sector.',
      'Spice blow: turn the spice card and place its spice in the named territory, unless that sector is in the storm.',
      '**Shai-Hulud** (a sandworm card) devours all forces and spice in the territory of the last spice blow, then triggers a **Nexus**. Ignore worms on turn 1.',
    ] },
    { title: 'Bidding, shipping and revival', items: [
      'Cards are auctioned one per player each round; you cannot bid with a full hand (4, Harkonnen 8). Karama cards let you break a faction power once.',
      'Shipping costs **1 spice per force into a stronghold, 2 elsewhere**. One shipment and one move (1 territory, or 3 with Arrakeen/Carthag ornithopters) per turn.',
      'Revival from the Tleilaxu Tanks: a free amount each turn (Fremen 3, Atreides and Harkonnen 2, others 1), then 2 spice per extra force, max 3 forces a turn. Leaders revive only once all your leaders are dead.',
    ] },
    { title: 'Alliances and the Nexus', text: 'Alliances are made and broken only during a **Nexus**, after a sandworm. Allies may give each other spice, help pay for shipments, share some faction powers (e.g. Atreides prescience, Emperor paying for extra revivals) and cannot fight each other. An alliance wins by holding **4 strongholds** between its members at the end of a turn; all allies win together.' },
    { title: 'Special end conditions', items: [
      '**Bene Gesserit**: if the faction they predicted wins on the predicted turn, the Bene Gesserit win alone instead (even if it was an alliance win).',
      '**Fremen**: if nobody has won by the end of turn 10 and only Fremen (or nobody) occupy Sietch Tabr and Habbanya Sietch while no Harkonnen, Atreides or Emperor forces occupy Tuek’s Sietch, the Fremen (and allies) win.',
      '**Spacing Guild**: otherwise, if the Guild is in play and nobody has won after turn 10, the Guild (and allies) win: it pays them to stall the game.',
    ] },
  ],

  tips: [
    'Read every faction sheet: the game is really about how six cheaters break the rules.',
    'Alliances are formed and broken in the Nexus after worm appearances. Use them.',
    'Never commit a leader you have not checked against your opponent’s possible traitors.',
  ],

  walk(A) {
    const C = A.C, cx = 106, cy = 104, R = 88;
    const ATR = '#3c8d4f', HAR = '#2b2b2b', EMP = '#c8423b', GLD = '#e07b2e', FRE = '#e3c890';
    let sky = A.bg('#1d140d') + A.circle(cx, cy, R, '#e2ae66', { stroke: '#7a4a20', sw: 2 });
    for (let i = 0; i < 18; i++) { const a = Math.PI / 9 * i; sky += A.line(cx, cy, cx + R * Math.cos(a), cy + R * Math.sin(a), { stroke: '#7a4a20', sw: 0.6, opacity: 0.4 }); }
    sky += A.path('M74 52 q30 -20 64 -2 q6 18 -14 26 q-28 8 -50 -6 z', { fill: '#b07a44', stroke: '#7a4a20', sw: 1 });
    sky += A.city(106, 54, 16, '#8a5a33') + A.text(106, 64, 'Arrakeen', { size: 7, fill: '#3a2210' }) + A.text(152, 150, 'Hagga Basin', { size: 7, fill: '#5a3a18' });
    const rows = [['Atreides', ATR], ['Harkonnen', HAR], ['Emperor', EMP], ['Guild', GLD], ['Fremen', FRE]];
    rows.forEach(([n, c], i) => { sky += A.tag(244, 16 + i * 22, n, { fill: c, color: c === FRE ? C.ink : '#fff', w: 62 }); });
    const rowY = (n) => 16 + rows.findIndex(r => r[0] === n) * 22;
    const wedge = (d1, d2) => { const a1 = d1 * Math.PI / 180, a2 = d2 * Math.PI / 180; return A.k('storm', `<path d="M${cx} ${cy} L${(cx + R * Math.cos(a1)).toFixed(1)} ${(cy + R * Math.sin(a1)).toFixed(1)} A${R} ${R} 0 0 1 ${(cx + R * Math.cos(a2)).toFixed(1)} ${(cy + R * Math.sin(a2)).toFixed(1)} Z" fill="#6c7a8c" opacity="0.65" stroke="#4a5566" stroke-width="1"/>`); };
    const sp = (key, x, y) => A.k(key, A.circle(x, y, 3.2, '#d2611c', { stroke: '#7a3a10', sw: 0.7 }));
    const spice = (pre, n, at) => Array.from({ length: n }, (_, i) => sp(pre + i, ...(typeof at === 'function' ? at(i) : [at[0] + (i % 3) * 7, at[1] + Math.floor(i / 3) * 7]))).join('');
    const inRow = (name) => (i) => [283 + i * 6, rowY(name)];
    const force = (x, y, c, n) => A.circle(x, y, 8, c, { stroke: '#fff', sw: 1.4 }) + A.text(x, y + 0.5, n, { size: 9, weight: 800, fill: c === FRE ? C.ink : '#fff' });
    const har = A.k('har', force(122, 42, HAR, 5)), fre = A.k('fre', force(140, 132, FRE, 3));
    const blowAt = [114, 124];
    const tcard = (x, y, key) => A.k(key, A.card(x, y, 24, 34, '#5a6a7a', { label: '?', size: 13 }));
    const wheel = (x, dial, leader, lv, c) => A.circle(x, 160, 24, '#6b6b72', { stroke: c, sw: 2.5 }) + A.circle(x, 164, 14, '#c9c9cf', { stroke: C.ink, sw: 1 }) +
      A.rect(x - 7, 138, 14, 11, '#fff', { rx: 2, sw: 1 }) + A.text(x, 143.5, dial, { size: 8, weight: 800 }) + A.text(x, 161, leader, { size: 5.5, weight: 700 }) + A.text(x, 168, lv, { size: 7, weight: 800 });
    const wheels = A.k('wa', wheel(238, 4, 'Gurney', 4, ATR)) + A.k('wh', wheel(294, 3, 'Feyd', 6, '#888'));
    const totals = A.text(238, 194, '= 8', { size: 9, weight: 800, fill: '#fff' }) + A.text(294, 194, '= 9', { size: 9, weight: 800, fill: '#fff' });
    return [
      { step: 0, say: '**Storm**: the storm (grey) moves 2 sectors around the planet, wiping out spice and unprotected forces in open sand it crosses.',
        svg: sky + wedge(140, 180) + har + fre + spice('h', 3, inRow('Harkonnen')) + spice('a', 4, inRow('Atreides')) },
      { step: 0, say: 'Then a **spice blow**: 6 spice appear in Hagga Basin, safe from the storm for now.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Harkonnen')) + spice('a', 4, inRow('Atreides')) + A.glow(124, 130, 18, 'g-blow') },
      { step: 1, say: '**Bidding**: a face-down treachery card is auctioned. Harkonnen wins it for **3 spice**, paid to the Emperor.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Atreides')) + tcard(270, 128, 'tc') + A.text(282, 172, 'won by Harkonnen', { size: 7, fill: '#e2ae66' }) },
      { step: 2, say: '**Ship & move**: Atreides ships 4 forces into Arrakeen, paying **1 spice each** to the Guild. Now two factions share it.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + A.k('atr', force(90, 42, ATR, 4)) + A.glow(106, 44, 26, 'g-ark') },
      { step: 3, say: '**Battle** in Arrakeen. Atreides dials 4 + Gurney (4) = **8**; Harkonnen dials 3 + Feyd-Rautha (6) = **9**.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + A.k('atr', force(90, 42, ATR, 4)) + wheels + totals },
      { step: 3, say: 'But Gurney is Harkonnen’s **traitor**! Harkonnen wins outright, loses nothing, and takes **4 spice**. All Atreides forces there die.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + wheels +
          A.k('traitor', A.card(250, 128, 32, 46, '#5b2a6e', { title: 'TRAITOR', label: 'Gurney', size: 6 })) + spice('t', 4, inRow('Harkonnen')) },
      { step: 4, say: '**Collect**: Fremen’s 3 forces in Hagga Basin collect **2 spice each** (6). Nobody holds 3 strongholds, so on to the next turn.',
        svg: sky + wedge(180, 220) + har + fre + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + spice('t', 4, inRow('Harkonnen')) + spice('b', 6, inRow('Fremen')) + A.glow(298, rowY('Fremen'), 15, 'g-fre') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#1d140d');
    const cx = 150, cy = 100, R = 94;
    o += A.circle(cx, cy, R, '#e2ae66', { stroke: '#7a4a20', sw: 2 });
    // rock regions
    o += A.path('M112 40 q30 -16 62 -4 q12 20 -10 34 q-30 10 -52 -6 z', { fill: '#b07a44', stroke: '#7a4a20', sw: 1 });
    o += A.path('M188 120 q26 -6 40 14 q-6 22 -32 20 q-18 -12 -8 -34 z', { fill: '#b07a44', stroke: '#7a4a20', sw: 1 });
    o += A.path('M70 112 q18 -10 34 4 q2 20 -18 26 q-22 -6 -16 -30 z', { fill: '#b07a44', stroke: '#7a4a20', sw: 1 });
    // 18 sector lines
    for (let i = 0; i < 18; i++) { const a = Math.PI / 9 * i; o += A.line(cx, cy, cx + R * Math.cos(a), cy + R * Math.sin(a), { stroke: '#7a4a20', sw: 0.6, opacity: 0.45 }); }
    o += A.circle(cx, cy, 10, '#c99556', { stroke: '#7a4a20', sw: 1 });
    // storm wedge (two sectors) at upper left
    const a1 = Math.PI * (200 / 180), a2 = Math.PI * (240 / 180);
    o += `<path d="M${cx} ${cy} L${(cx + R * Math.cos(a1)).toFixed(1)} ${(cy + R * Math.sin(a1)).toFixed(1)} A${R} ${R} 0 0 1 ${(cx + R * Math.cos(a2)).toFixed(1)} ${(cy + R * Math.sin(a2)).toFixed(1)} Z" fill="#6c7a8c" opacity="0.6" stroke="#4a5566" stroke-width="1"/>`;
    o += A.path('M100 64 q-14 -4 -20 6 q-4 12 10 12 q10 -2 6 -10', { stroke: '#e8eef6', sw: 1.6 });
    // strongholds
    const sh = [[142, 44], [212, 134], [86, 126], [214, 62], [118, 168]];
    for (const [x, y] of sh) o += A.city(x, y + 6, 13, '#8a5a33');
    // forces
    const force = (x, y, c, n) => A.circle(x, y, 6.5, c, { stroke: '#fff', sw: 1.2 }) + A.text(x, y + 0.5, n, { size: 7.5, weight: 800, fill: c === '#e3c890' ? '#2a2420' : '#fff' });
    o += force(132, 52, '#3c8d4f', 6) + force(152, 52, '#2b2b2b', 5);
    o += force(204, 142, '#c8423b', 4) + force(96, 132, '#e3c890', 7) + force(224, 70, '#e07b2e', 3);
    // spice blow
    for (const [x, y] of [[178, 94], [184, 100], [176, 102], [190, 94], [184, 88]]) o += A.circle(x, y, 2.6, '#d2611c', { stroke: '#7a3a10', sw: 0.6 });
    // battle wheel
    const wx = 286, wy = 150;
    o += A.circle(wx, wy, 26, '#6b6b72', { stroke: '#2a2420', sw: 1.4 });
    o += A.circle(wx, wy, 17, '#c9c9cf', { stroke: '#2a2420', sw: 1 });
    o += A.rect(wx - 7, wy - 26, 14, 10, '#fff', { rx: 2, sw: 1 }) + A.text(wx, wy - 21, '4', { size: 8, weight: 800 });
    o += A.text(wx, wy + 1, '+4', { size: 10, weight: 800 });
    // traitor card
    o += A.card(268, 40, 34, 48, '#5b2a6e', { title: 'TRAITOR', label: '?', size: 18 });
    o += A.note(84, 70, 34, 18, 'Storm');
    o += A.note(142, 44, 228, 14, 'Stronghold (5 total)');
    o += A.note(184, 96, 250, 100, 'Spice blow');
    o += A.note(270, 162, 236, 188, 'Battle wheel');
    return o;
  },
});
