defineGame({
  id: 'dune',
  name: 'Dune',
  year: 2019,
  designer: 'Bill Eberle, Jack Kittredge & Peter Olotka',
  family: 'epic',
  players: [2, 6], best: '6',
  time: [120, 180],
  age: 14,
  mechanics: ['variable-powers', 'area-control', 'auction', 'negotiation', 'bluffing'],
  profile: { complexity: 4, luck: 2, interaction: 5, conflict: 5, talk: 5, planning: 4 },

  // Spice, faction forces, strongholds, storm, worm and the card types. Forces/spice are reused in art and walk.
  icons: (() => {
    const W = '#fff', cardf = (A, f) => A.rect(4, 1, 16, 22, f, { rx: 2.5, sw: 1.3 });
    const dagger = (A, hilt = '#e2ae66') => A.line(12, 5, 12, 15, { stroke: W, sw: 2.2 }) + A.line(8.5, 15, 15.5, 15, { stroke: W, sw: 1.8 }) + A.line(12, 15.5, 12, 19.5, { stroke: hilt, sw: 2.4 });
    const force = (name, col) => ({ name: name + ' forces', draw: (A, c = col, st = '#2a2420') => A.circle(12, 12, 9, c, { stroke: st, sw: 1.6 }) });
    return {
      spice: { name: 'spice', draw: A => A.circle(12, 12, 8, '#d2611c', { stroke: '#7a3a10', sw: 1.3 }) + A.circle(9.4, 9.4, 2, '#f0a066', { sw: 0 }) },
      atr: force('Atreides', '#3c8d4f'), har: force('Harkonnen', '#2b2b2b'), emp: force('Emperor', '#c8423b'),
      gld: force('Guild', '#e07b2e'), fre: force('Fremen', '#e3c890'), bg: force('Bene Gesserit', '#2f6db5'),
      stronghold: { name: 'stronghold', draw: A => A.city(12.5, 20.5, 15.5, '#8a5a33') },
      storm: { name: 'storm', draw: A => A.circle(12, 12, 10, '#6c7a8c', { stroke: '#4a5566', sw: 1.3 }) + A.path('M16 7.5 q-7 -3.5 -9.5 2.5 q-1.5 6.5 5 5.5 q4.5 -1 2.5 -5', { stroke: W, sw: 1.8 }) },
      worm: { name: 'sandworm', draw: A => A.path('M3 21 q3 -12 9.5 -8.5 q5.5 3 7 -6', { stroke: '#7a4a20', sw: 6 }) + A.path('M3 21 q3 -12 9.5 -8.5 q5.5 3 7 -6', { stroke: '#d9a35c', sw: 3.6 }) + A.circle(19.7, 5.5, 2.6, '#3a2210', { sw: 0 }) },
      thopter: { name: 'ornithopter', draw: A => A.path('M2 9 q10 -5 20 0 M2 9 q10 3 20 0', { stroke: '#4a5566', sw: 1.4 }) + A.rect(8.5, 9.5, 8, 5, '#8c877f', { rx: 2.4, sw: 1.2 }) + A.line(8.5, 12, 4, 15, { sw: 1.4 }) },
      wheel: { name: 'battle wheel', draw: A => A.circle(12, 12.5, 10, '#6b6b72', { sw: 1.3 }) + A.circle(12, 14, 5.5, '#c9c9cf', { sw: 1 }) + A.rect(9, 2.5, 6, 5, W, { rx: 1, sw: 0.8 }) },
      traitor: { name: 'traitor card', draw: A => cardf(A, '#5b2a6e') + dagger(A) },
      tcard: { name: 'treachery card', draw: A => cardf(A, '#5a6a7a') + A.text(12, 12.5, '?', { size: 13, weight: 800, fill: W }) },
      weapon: { name: 'weapon', draw: A => cardf(A, '#c8423b') + dagger(A, '#2a2420') },
      defense: { name: 'defense', draw: A => cardf(A, '#2f6db5') + A.path('M12 5 l5.5 2.3 v4.4 q0 4.8 -5.5 7.3 q-5.5 -2.5 -5.5 -7.3 v-4.4 z', { fill: W, sw: 0 }) },
    };
  })(),

  pitch: 'Asymmetric factions bid spice for cards, ship forces and fight with secret dials; hold 3 of the 5 strongholds to win.',

  goal: { big: '3 strongholds', text: 'At the end of a turn, control **3 of the 5 strongholds** alone, or **4** with your ally, to win.' },

  turn: {
    type: 'round',
    intro: 'Each game turn, all players go through these phases together, in storm order:',
    steps: [
      { verb: 'Storm', text: 'The {=storm} storm moves; forces and {=spice} in open sand it crosses are lost. Then a **spice blow** puts spice on the map.' },
      { verb: 'Bid', text: 'Players with 0–1 {=spice} take charity up to 2. Then {tcard}s are auctioned one at a time for spice.' },
      { verb: 'Revive, ship', text: 'Revive forces from the tanks. Each player makes **1 shipment** onto the planet (1 {=spice} per force into a {=stronghold}, 2 elsewhere) and **1 move** of one group.' },
      { verb: 'Battle', text: 'Wherever two factions share a territory, they fight with a secret {=wheel} **battle wheel**.' },
      { verb: 'Collect', text: 'Forces on spice collect **2** {=spice} each (**3** if you hold Arrakeen or Carthag). Then check for a win.' },
    ],
  },

  tension: 'Spice wins battles, but you must spend it to ship forces and buy cards, and every payment goes to a rival.',

  structure: [
    { label: 'Setup', text: 'Set up each faction per its sheet. Deal 4 {=traitor} (keep 1) and 1 {=tcard} each. Bene Gesserit secretly predict a winner and turn.' },
    { label: 'Game turn', repeat: 'up to 10', text: 'Storm → spice blow → charity (0–1 {=spice} tops up to 2) → bidding → revival → shipment & movement → battles → spice collection → win check.' },
    { label: 'Nexus', text: 'When a {=worm} appears in a spice blow (not turn 1): it eats the last blow’s territory, then alliances may form or break.' },
    { label: 'Game end', text: 'Win at a turn’s end with 3 {=stronghold} (alliance 4). No winner after turn 10: Fremen or Guild special victory.' },
  ],

  end: {
    trigger: 'someone controls 3 strongholds (4 for an alliance) at the end of a turn, or turn 10 ends',
    detail: 'No winner after turn 10: the Fremen win if their special condition is met; otherwise the Spacing Guild wins if in play.',
    results: [
      { side: 'Solo win', text: 'hold 3 strongholds alone.' },
      { side: 'Alliance win', text: 'allies hold 4 strongholds between them and all win.' },
      { side: 'Bene Gesserit', text: 'win instead if their secret prediction (winner and turn) comes true.' },
    ],
  },

  ref: {
    title: 'The six factions',
    rows: [
      ['{=atr} Atreides', 'See cards up for bid and part of each opponent’s battle plan.'],
      ['{=har} Harkonnen', 'Keep **all 4** traitors; hold up to 8 {=tcard}.'],
      ['{=emp} Emperor', 'Receives all {=spice} paid for {=tcard}; may buy up to 3 extra revivals for an ally.'],
      ['{=gld} Spacing Guild', 'Receives all shipping {=spice}; ships at half price, also planet to planet or back to reserves. Wins if nobody has by turn 10.'],
      ['{=fre} Fremen', 'Start on the planet; bring forces in free near the Great Flat; move 2; immune to and ride {=worm}.'],
      ['{=bg} Bene Gesserit', 'Secretly predict the winner and turn; use the Voice in battle.'],
    ],
  },

  example: 'Atreides and Harkonnen both have forces in **Arrakeen**. Atreides dials **4** with Gurney Halleck (4): 8. Harkonnen dials 3 with Feyd-Rautha (6): 9. Gurney is one of Harkonnen’s {traitor}s, so Harkonnen calls “Traitor!”: they win, lose nothing and collect **4** {=spice} for the dead Gurney. Every Atreides force there dies.',

  setup: [
    'Each player takes a faction and sets up as its sheet says: starting forces, {=spice} and leaders.',
    'Deal 4 {=traitor} each; keep 1 (Harkonnen keep all 4). Deal 1 {=tcard} each (Harkonnen 2).',
    'Turn 1 storm: the two players nearest the storm start sector each secretly dial 0–20; move the storm that many sectors from the start.',
    'Two-player game: you need **4** strongholds to win (Atreides vs Harkonnen, or 2 factions each).',
  ],

  terms: [
    ['{=stronghold} Stronghold', 'One of 5 cities: Arrakeen, Carthag, Sietch Tabr, Habbanya Sietch, Tuek’s Sietch. Safe from the storm.'],
    ['{=wheel} Battle wheel', 'Secret dial: forces you commit (lost even if you win) + your leader’s strength.'],
    ['{=traitor} Traitor', 'Card naming an enemy leader. If that leader fights against you, you win outright.'],
    ['{=tcard} Treachery card', '{weapon}s, {defense}s and special cards bought at auction.'],
    ['{=thopter} Ornithopters', 'Have forces in Arrakeen or Carthag when you move: move 3 territories instead of 1.'],
  ],

  gotchas: [
    'The battle **loser loses every force** in that territory; the winner loses only the forces dialed.',
    'A {=weapon} kills the opposing leader unless they played the matching {=defense}; a dead leader adds 0.',
    'At most **two factions** may have forces in one stronghold.',
    'No battles in the Polar Sink, or between forces in storm or separated by a storm sector. Everywhere else, sharing a territory means a battle.',
  ],

  extended: [
    { title: 'Faction powers in depth', items: [
      '{=atr} **Atreides**: see each {=tcard} before bidding and, at the start of movement, the top spice card. In battle, make the opponent reveal one element of their plan (leader, weapon, defense or dial). Advanced: after losing 7 forces in battle, the **Kwisatz Haderach** adds +2 to one leader per turn.',
      '{=har} **Harkonnen**: keep all 4 traitors, hold up to 8 treachery cards, and draw a free extra card with each one bought. Advanced: win a battle to capture a random enemy leader (use it once, or kill it for 2 {=spice}).',
      '{=emp} **Emperor**: all {=spice} paid for treachery cards comes to you. Advanced: 5 Sardaukar count double in battle (except against Fremen); revive only 1 per turn.',
      '{=gld} **Spacing Guild**: all shipping payments come to you. Your one shipment (half price) may go from reserves, between two territories, or back to reserves (1 {=spice} per 2 forces). Advanced: take your ship & move at any point in the order.',
      '{=fre} **Fremen**: start on the planet; bring reserves in free to the Great Flat or within 2 territories of it; move 2 territories; worms don’t eat you, and you may ride one after the Nexus. Free revival: 3 forces a turn, and you can’t buy more. Advanced: lose only half to the storm; 3 Fedaykin count double.',
      '{=bg} **Bene Gesserit**: secret prediction of winner and turn (not a Fremen or Guild special victory). The **Voice** orders an opponent to play (or not play) a card type in battle. Whenever another faction ships from off-planet, you may send 1 force free to the Polar Sink.',
    ] },
    { title: 'Battle plans in detail', items: [
      'A plan: a dial (0 up to your forces there), a **leader** (or Cheap Hero), and optionally one {=weapon} and one {=defense}. You must play a leader or Cheap Hero if you have one.',
      'Projectile weapons are stopped by **shields**, poison by **snoopers**. A killed leader adds 0 and goes to the tanks; the winner collects {=spice} equal to the strength of every leader killed, **including their own**. Ties go to the aggressor (earlier in storm order).',
      '**Lasgun + shield** in one battle: an explosion kills every force and leader there, both sides.',
      'The loser discards every treachery card played; the winner may keep theirs. A leader who fought can’t fight in another territory that turn.',
      'Traitor called: that side wins and loses nothing; the betrayed side loses all forces there and the traitor leader dies. Both call traitor: both lose everything.',
    ] },
    { title: 'Storm, spice and sandworms', items: [
      'The {=storm} moves counter-clockwise **2–6 sectors** each turn: the two players who last used battle wheels each dial 1–3 (advanced: a Fremen storm card, 1–6). Forces and {=spice} in sand it passes or stops on are lost; **rock** territories, strongholds and the Imperial Basin are safe. No one moves into, out of or through a storm sector.',
      'Spice blow: turn the top spice card and place its {=spice} in the named territory, unless that sector is in the storm. Advanced: two blows a turn (piles A and B).',
      '{=worm} **Shai-Hulud** devours all forces (not Fremen) and spice in the territory of the previous spice blow; keep drawing until a territory card. It triggers a **Nexus**. Turn 1: set worms aside and reshuffle them in.',
    ] },
    { title: 'Bidding, shipping and revival', items: [
      'One {=tcard} is auctioned per player who can bid; full hands (4, Harkonnen 8) can’t bid. A Karama card breaks a faction power once.',
      'Shipping costs **1 {=spice} per force into a stronghold, 2 elsewhere**. One shipment and one move (1 territory, or 3 with {=thopter}) per turn.',
      'Revival from the Tleilaxu Tanks: free forces each turn (Fremen 3, Atreides and Harkonnen 2, others 1), then 2 {=spice} per extra force, max 3 a turn. Once all 5 of your leaders are in the tanks, revive 1 per turn for its strength in {=spice}.',
    ] },
    { title: 'Alliances and the Nexus', text: 'Alliances are made and broken only in a **Nexus**, after a sandworm. Allies may pay for each other’s {=tcard} bids and shipments, share some faction powers (e.g. Atreides prescience, Emperor paying for extra revivals), and can’t enter a territory (except the Polar Sink) holding an ally’s forces, so never fight each other. An alliance wins by holding **4 strongholds** between its members at the end of a turn; all allies win together.' },
    { title: 'Special end conditions', items: [
      '{=bg} **Bene Gesserit**: if the faction they predicted wins on the predicted turn, the Bene Gesserit win alone instead (even over an alliance win).',
      '{=fre} **Fremen**: if nobody has won by the end of turn 10, and only Fremen (or nobody) occupy Sietch Tabr and Habbanya Sietch while no Harkonnen, Atreides or Emperor forces occupy Tuek’s Sietch, the Fremen (and allies) win.',
      '{=gld} **Spacing Guild**: otherwise, if the Guild is in play and nobody has won after turn 10, the Guild (and allies) win.',
      'Neither Fremen nor Guild in play (rulebook Q&A): whoever occupies the most strongholds wins; ties share the win.',
    ] },
  ],

  tips: [
    'Read every faction sheet: each faction breaks the rules differently.',
    'Alliances form and break in the Nexus after a worm appears. Use them.',
    'Before committing a leader, check whether it could be an opponent’s traitor.',
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
    const I = this.icons, sp = (key, x, y) => A.k(key, A.use(I.spice.draw(A), x - 4.8, y - 4.8, 9.6));
    const spice = (pre, n, at) => Array.from({ length: n }, (_, i) => sp(pre + i, ...(typeof at === 'function' ? at(i) : [at[0] + (i % 3) * 7, at[1] + Math.floor(i / 3) * 7]))).join('');
    const inRow = (name) => (i) => [283 + i * 6, rowY(name)];
    const force = (x, y, c, n) => A.use(I.atr.draw(A, c, '#fff'), x - 10.67, y - 10.67, 21.33) + A.text(x, y + 0.5, n, { size: 9, weight: 800, fill: c === FRE ? C.ink : '#fff' });
    const har = A.k('har', force(122, 42, HAR, 5)), fre = A.k('fre', force(140, 132, FRE, 3));
    const blowAt = [114, 124];
    const tcard = (x, y, key) => A.k(key, A.use(I.tcard.draw(A), x - 6, y - 1.5, 36));
    const wheel = (x, dial, leader, lv, c) => A.circle(x, 160, 24, '#6b6b72', { stroke: c, sw: 2.5 }) + A.circle(x, 164, 14, '#c9c9cf', { stroke: C.ink, sw: 1 }) +
      A.rect(x - 7, 138, 14, 11, '#fff', { rx: 2, sw: 1 }) + A.text(x, 143.5, dial, { size: 8, weight: 800 }) + A.text(x, 161, leader, { size: 5.5, weight: 700 }) + A.text(x, 168, lv, { size: 7, weight: 800 });
    const wheels = A.k('wa', wheel(238, 4, 'Gurney', 4, ATR)) + A.k('wh', wheel(294, 3, 'Feyd', 6, '#888'));
    const totals = A.text(238, 194, '= 8', { size: 9, weight: 800, fill: '#fff' }) + A.text(294, 194, '= 9', { size: 9, weight: 800, fill: '#fff' });
    return [
      { step: 0, say: '**Storm**: the {=storm} storm (grey) moves 2 sectors, destroying spice and forces in the open sand it crosses.',
        svg: sky + wedge(140, 180) + har + fre + spice('h', 3, inRow('Harkonnen')) + spice('a', 4, inRow('Atreides')) },
      { step: 0, say: 'Then a **spice blow**: 6 {=spice} appear in Hagga Basin.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Harkonnen')) + spice('a', 4, inRow('Atreides')) + A.glow(124, 130, 18, 'g-blow') },
      { step: 1, say: '**Bidding**: a face-down {=tcard} is auctioned. Harkonnen wins it for **3** {=spice}, paid to the Emperor.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Atreides')) + tcard(270, 128, 'tc') + A.text(282, 172, 'won by Harkonnen', { size: 7, fill: '#e2ae66' }) },
      { step: 2, say: '**Ship & move**: Atreides ships 4 {=atr} into Arrakeen, paying **1** {=spice} each to the Guild. Two factions now share it.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + A.k('atr', force(90, 42, ATR, 4)) + A.glow(106, 44, 26, 'g-ark') },
      { step: 3, say: '**Battle** in Arrakeen. Atreides dials 4 + Gurney (4) = **8**; Harkonnen dials 3 + Feyd-Rautha (6) = **9**.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + A.k('atr', force(90, 42, ATR, 4)) + wheels + totals },
      { step: 3, say: 'Gurney is Harkonnen’s {=traitor} **traitor**: Harkonnen wins outright, loses nothing and takes **4** {=spice}. All Atreides forces there die.',
        svg: sky + wedge(180, 220) + har + fre + spice('b', 6, blowAt) + spice('h', 3, inRow('Emperor')) + spice('a', 4, inRow('Guild')) + wheels +
          A.k('traitor', A.card(250, 128, 32, 46, '#5b2a6e', { title: 'TRAITOR', label: 'Gurney', size: 6 })) + spice('t', 4, inRow('Harkonnen')) },
      { step: 4, say: '**Collect**: Fremen’s 3 {=fre} in Hagga Basin collect **2** {=spice} each (6). Nobody holds 3 strongholds; next turn.',
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
    const I = this.icons;
    for (const [x, y] of sh) o += A.use(I.stronghold.draw(A), x - 10.4, y - 11, 20);
    // forces
    const force = (x, y, c, n) => A.use(I.atr.draw(A, c, '#fff'), x - 8.67, y - 8.67, 17.33) + A.text(x, y + 0.5, n, { size: 7.5, weight: 800, fill: c === '#e3c890' ? '#2a2420' : '#fff' });
    o += force(132, 52, '#3c8d4f', 6) + force(152, 52, '#2b2b2b', 5);
    o += force(204, 142, '#c8423b', 4) + force(96, 132, '#e3c890', 7) + force(224, 70, '#e07b2e', 3);
    // spice blow
    for (const [x, y] of [[178, 94], [184, 100], [176, 102], [190, 94], [184, 88]]) o += A.use(I.spice.draw(A), x - 3.9, y - 3.9, 7.8);
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
