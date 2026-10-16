defineGame({
  id: 'brass-birmingham',
  name: 'Brass: Birmingham',
  year: 2018,
  designer: 'Gavan Brown, Matt Tolman, Martin Wallace',
  family: 'engine',
  players: [2, 4], best: '3–4',
  time: [60, 120],
  age: 14,
  mechanics: ['network', 'resource-management', 'hand-management', 'engine-building'],
  profile: { complexity: 4, luck: 2, interaction: 4, conflict: 2, talk: 1, planning: 5 },
  color: '#8a5a2b',

  // Resources, links and the six industries, drawn once and reused in the art and walkthrough.
  icons: (() => {
    const cube = (A, top, left, right) => A.poly([[12, 2], [21, 6.5], [12, 11], [3, 6.5]], top, { sw: 1.1 }) +
      A.poly([[3, 6.5], [12, 11], [12, 22], [3, 17.5]], left, { sw: 1.1 }) + A.poly([[21, 6.5], [12, 11], [12, 22], [21, 17.5]], right, { sw: 1.1 });
    const disc = (A, col) => A.circle(12, 12, 10.5, col, { sw: 1.4 });
    const gear = () => {
      const p = [];
      for (let i = 0; i < 8; i++) for (const [d, r] of [[-15, 5.6], [-8, 8], [8, 8], [15, 5.6]]) {
        const a = (i * 45 + d) * Math.PI / 180; p.push([+(12 + r * Math.cos(a)).toFixed(2), +(12 + r * Math.sin(a)).toFixed(2)]);
      }
      return p;
    };
    return {
      coal: { name: 'coal', draw: A => cube(A, '#6b6b6b', '#1d1d1d', '#3a3a3a') },
      iron: { name: 'iron', draw: A => cube(A, '#f6b27a', '#e07b2e', '#b85f1c') },
      beer: { name: 'beer', draw: A => A.path('M6.5 2.5 h11 q3.5 9.5 0 19 h-11 q-3.5 -9.5 0 -19z', { fill: '#b8762f', sw: 1.3 }) +
        A.path('M4.6 7.5 h14.8 M4.6 16.5 h14.8', { stroke: '#4a2f14', sw: 1.6 }) + A.path('M12 3 v18', { stroke: '#8a5520', sw: 0.9 }) },
      pound: { name: 'money', draw: A => A.circle(12, 12, 10, '#f2c84b', { sw: 1.4 }) + A.text(12, 12.8, '£', { size: 14, weight: 800, fill: '#7a5a12' }) },
      canal: { name: 'canal', draw: A => A.rect(1.5, 6.5, 21, 11, '#3a6f9a', { rx: 2, sw: 1.3 }) + A.path('M4 12 q2.67 -3.2 5.33 0 t5.33 0 t5.33 0', { stroke: '#d6e9f5', sw: 1.6 }) },
      rail: { name: 'rail', draw: A => A.rect(1.5, 6.5, 21, 11, '#4b4b4b', { rx: 2, sw: 1.3 }) +
        [5, 9.7, 14.3, 19].map(x => A.line(x, 8.3, x, 15.7, { stroke: '#b08a5c', sw: 1.8 })).join('') +
        A.line(3, 10.2, 21, 10.2, { stroke: '#eee', sw: 1.2 }) + A.line(3, 13.8, 21, 13.8, { stroke: '#eee', sw: 1.2 }) },
      coalmine: { name: 'coal mine', draw: A => disc(A, '#2b2b2b') +
        A.group(A.path('M5 10 Q12 3.4 19 10', { stroke: '#fff', sw: 2.4 }) + A.line(12, 6.8, 12, 19, { stroke: '#fff', sw: 2.4 }), 'rotate(-35 12 12)') },
      ironworks: { name: 'ironworks', draw: A => disc(A, '#e07b2e') +
        A.poly([[4.5, 8], [19, 8], [19, 11], [15.5, 12.5], [15, 15], [17.5, 17.5], [6.5, 17.5], [9, 15], [8.5, 12.5], [6.5, 11]], '#2b2b2b', { sw: 0.8, stroke: '#2b2b2b' }) },
      brewery: { name: 'brewery', draw: A => disc(A, '#b8762f') + A.path('M16 10 h1.8 q2 0 2 2 v1.6 q0 2 -2 2 H16', { stroke: '#fff', sw: 1.8 }) +
        A.rect(7, 9, 9.5, 10, '#fff', { rx: 1.2, sw: 0 }) + [8.4, 11.6, 14.8].map(x => A.circle(x, 8.6, 2, '#fff', { sw: 0 })).join('') + A.line(9.8, 12, 9.8, 17, { stroke: '#e2b33c', sw: 1.3 }) + A.line(13.6, 12, 13.6, 17, { stroke: '#e2b33c', sw: 1.3 }) },
      cotton: { name: 'cotton mill', draw: A => disc(A, '#cf6a87') + A.poly([[12, 14], [7.5, 19], [12, 17.5], [16.5, 19]], '#5d8a4a', { sw: 0.8 }) +
        [[8.6, 10.6], [15.4, 10.6], [12, 14.3], [12, 7.6]].map(([x, y]) => A.circle(x, y, 3.7, '#fff', { sw: 1 })).join('') },
      goods: { name: 'manufacturer', draw: A => disc(A, '#7d55b5') + A.poly(gear(), '#fff', { sw: 0 }) + A.circle(12, 12, 2.4, '#7d55b5', { sw: 0 }) },
      pottery: { name: 'pottery', draw: A => disc(A, '#2a9a96') +
        A.path('M9.6 5.5 h4.8 v1.6 q-1 1 0.2 2.4 q4.2 2 2.8 6.2 q-1 2.8 -5.4 2.8 q-4.4 0 -5.4 -2.8 q-1.4 -4.2 2.8 -6.2 q1.2 -1.4 0.2 -2.4z', { fill: '#fff', sw: 0 }) },
    };
  })(),

  pitch: 'Build industries and canal, then rail, links; flipped industry tiles and links to busy towns score over two eras.',

  goal: { big: 'Most VP', text: 'Most **victory points** after two eras wins. Points come from flipped industry tiles and from links. Ties: highest income, then most money.' },

  turn: {
    type: 'choose',
    intro: 'Take 2 actions (1 in the game’s first round). Each action, even a pass, discards 1 card:',
    outro: 'Refill your hand to 8 cards (while the deck lasts). Next player',
    steps: [
      { verb: 'Build', text: 'Place your **lowest-level** tile of an industry where your **card** allows; pay its £ cost plus any {coal} or {iron} it shows.' },
      { verb: 'Network', text: 'Lay a {canal} (£3), or in the rail era a {rail} (£5 + {=coal}), next to your network.' },
      { verb: 'Sell', text: 'Sell from any of your {=cotton} {=goods} {=pottery} tiles to a **connected** merchant that buys that good, using the {beer} each tile shows; each tile sold flips.' },
      { verb: 'Develop', text: 'Pay {=iron} per tile to remove 1–2 of your lowest-level tiles from your mat.' },
      { verb: 'Loan/Scout', text: 'Take a **£30 loan** (income drops 3 levels), or discard 3 cards for 2 wild cards.' },
    ],
  },

  tension: 'Rivals use your {=coal} {=iron} {=beer} for free: that flips your tiles sooner but also funds their builds.',

  structure: [
    { label: 'Setup', text: 'Deal 8 cards each; turn order is random for round 1.' },
    { label: 'Canal era', repeat: '8–10 rounds', text: 'Each round, in turn order, everyone takes 2 actions (1 in round 1). Links are {canal}s; **one** of your tiles per town.' },
    { label: 'End of each round', text: 'New turn order: least £ spent this round goes first (ties keep order). Everyone collects income, or pays it if negative; none after the game’s final round.' },
    { label: 'Canal-era scoring', text: 'After the round (and income) in which the last cards are played: score {=canal} links, then flipped tiles. Remove all canals and **level‑1** tiles, refill merchant {=beer}, shuffle all discard piles into a new deck and deal 8 each.' },
    { label: 'Rail era', repeat: '8–10 rounds', text: 'Same rounds. Links are {rail}s; several of your tiles may share a town.' },
    { label: 'Final scoring', text: 'Score {=rail} links, then flipped tiles again. Most VP wins; ties go to highest income, then most money, else shared.' },
  ],

  points: [
    ['{=canal} Canal', 'At canal-era end: the **link icons** in the 2 locations it joins (from flipped tiles, anyone’s, and 2 per merchant)'],
    ['{=rail} Rail', 'The same, at rail-era end'],
    ['{=cotton} Flipped tile', 'Its printed VP at each era end; level 2+ tiles stay and score **again** in the rail era'],
    ['Merchant {=beer}', 'Some merchants give VP as their bonus when you sell with their beer'],
    ['Unpaid income', '−1 VP per £1 you still can’t pay after selling tiles'],
    ['Unflipped tiles, money', '0 VP; income, then money, break ties'],
  ],

  end: { trigger: 'the rail era’s last cards are played', detail: 'Each era lasts until the deck and all hands are empty: 8 rounds with 4 players, 9 with 3, 10 with 2. No income is paid after the last round of the game.' },
  scoring: [
    { label: '{=cotton} Industry tiles', share: 6 },
    { label: '{=canal} Canal links', share: 2 },
    { label: '{=rail} Rail links', share: 3 },
  ],

  ref: {
    title: 'Where things come from',
    rows: [
      ['Industries', '{coalmine} {ironworks} {brewery} {cotton} {goods} {pottery}'],
      ['Resources', '{coal} {iron} {beer} {pound}'],
      ['{=coal} Coal', 'nearest connected {coalmine}, else the market via a connected merchant (£8 if empty)'],
      ['{=iron} Iron', 'any {ironworks}, no link needed, else the market (£6 if empty)'],
      ['{=beer} Beer', 'your own {brewery} anywhere, a connected rival’s, or (when selling) the merchant’s'],
      ['{=canal} {=rail} Links', 'canal £3 · rail £5 {=coal} · double rail £15 {=coal}{=coal} {=beer}'],
    ],
  },

  example: 'You discard a **Coalbrookdale** card and build a level‑2 {ironworks} there: £7 plus {=coal} from your connected mine. It makes {=iron}{=iron}{=iron}{=iron}; 2 sell into the iron market’s empty £1 spaces (£2) and 2 stay on the tile. Maya later develops twice, using those {=iron}{=iron}, so the tile is empty and **flips**: income +3, and the tile scores VP.',

  setup: [
    'Each player takes £17, a player mat of industry tiles, 14 link tiles, and puts their income marker on the 10 space (£0).',
    'Fill the {=coal} market except one £1 space and the {=iron} market except both £1 spaces. Put random merchant tiles (for the player count) and a {=beer} barrel on each trade post.',
    'Set the 8 wild cards aside face up. Remove cards for the player count, shuffle, and deal each player 8 cards plus 1 face-down discard.',
  ],

  terms: [
    ['Flip', 'An industry tile turns over when sold from or emptied: income rises and it scores VP.'],
    ['{=canal}{=rail} Link', 'A canal or rail tile; scores the link icons in the towns at both ends.'],
    ['Network', 'Your tiles plus every location touching your links.'],
    ['Merchant', 'Off-map buyer; selling to it needs a connection and {beer}.'],
    ['Overbuild', 'Replace a tile with a higher level of the same industry.'],
  ],

  gotchas: [
    'An **industry** card builds only in your network (anywhere if you have no tiles or links yet); a **location** card builds in that town, network or not.',
    '{=coal} must come from a **connected** mine (or the market, via a connected merchant); {=iron} needs **no** connection.',
    'Level 2+ tiles survive into the rail era and score **again**; only canals and level‑1 tiles are removed.',
  ],

  tips: [
    'An early loan is normal: the income it funds repays it many times over.',
    'Build where rivals need your {=coal} and {=beer}; their builds flip your tiles.',
    'In the rail era, rails between towns full of flipped tiles score most.',
  ],

  extended: [
    { title: 'Canal era vs rail era', items: [
      '**Canal era**: links are {canal}s at £3; you may have only **one** industry tile per town.',
      '**Rail era**: a {rail} costs £5 + {=coal}; a double rail costs £15 + {=coal}{=coal} + {=beer}. Rail coal comes from a mine connected to the rail; double-rail beer from a brewery connected to the 2nd rail. You may have several tiles per town.',
      'The map shows which routes take canals, rails or both. A tile with an era icon can be built only in that era; most **level‑1** tiles can’t be built in the rail era.',
      'Between eras: score, remove every canal and level‑1 tile (flipped or not), and reshuffle the deck. Your network restarts from the tiles left.',
    ] },
    { title: 'Flipping and income', items: [
      'A new {=coalmine} or {=ironworks} gets the cubes printed on it; a {=brewery} gets 1 {=beer} in the canal era, 2 in the rail era. They flip when the **last** one is used. {=cotton} {=goods} {=pottery} flip when you **sell** from them.',
      'Flipping raises your income marker by the number on the tile. Income, positive or negative, is paid at the **end of each round**, except the game’s last.',
      'If you can’t pay negative income, remove tiles for half their cost; lose 1 VP per £1 still owed.',
    ] },
    { title: 'Coal, iron and beer', items: [
      '{=coal} **Coal**: free from the **nearest** connected coal mine, anyone’s. If none is connected, buy from the market, only if the build location connects to a merchant.',
      '{=iron} **Iron**: free from **any** ironworks, no connection needed. If none has iron, buy from the market.',
      '{=beer} **Beer** (to sell or for a double rail): your own brewery anywhere, a rival’s connected brewery, or the barrel on the merchant you sell to (which also pays its bonus).',
      'New {=coal} and {=iron} sell at once into empty market spaces for the space’s price: iron always, coal only if the mine connects to a merchant.',
    ] },
    { title: 'Loans and scouting', items: [
      'A loan gives **£30** and moves your income marker back **3 income levels** (not 3 spaces). Loans are never repaid.',
      'No loan may push income below −10.',
      'Scout: discard 3 cards for 1 wild location + 1 wild industry card; not allowed while you hold a wild card.',
    ] },
    { title: 'Building rules', items: [
      'Each town slot shows the industries it allows; use a slot showing **only** your industry if one is free. With nothing of yours on the board, an industry card or a link may go anywhere.',
      'Develop skips tiles for {=iron} each; tiles with a lightbulb icon can’t be developed.',
      'Overbuild your own tile with a higher level of the same industry any time. Overbuild a rival’s {=coalmine} or {=ironworks} only when no cubes of that type remain on the board or market.',
    ] },
    { title: 'Era scoring', items: [
      'Links first: each of your links scores the **link icons** at both ends, from flipped tiles (anyone’s) and merchants.',
      'Then each of your **flipped** industry tiles scores its VP; unflipped tiles score nothing.',
      'Money never scores. Ties: highest income, then most money; still tied, they share the win.',
    ] },
  ],

  walk(A) {
    const C = A.C, RED = '#c8423b', BLU = '#2f6db5', I = this.icons, ic = (k, x, y, sz) => A.use(I[k].draw(A), x, y, sz);
    const town = (x, y, w, name) => A.rect(x, y, w, 34, '#efe3c8', { rx: 6, sw: 1.4 }) + A.text(x + w / 2, y + 42, name, { size: 8, weight: 700 });
    // Industry tile in a player colour (dark brown once flipped) showing the same industry icon as the text.
    const tile = (x, y, col, k, flipped, lv) => A.rect(x, y, 24, 28, flipped ? '#5a4632' : col, { rx: 2, sw: flipped ? 2.2 : 1.2, stroke: flipped ? col : undefined }) +
      ic(k, x + 2.5, y + 1.5, 19) + A.text(x + 12, y + 23.8, lv, { size: 6, weight: 800, fill: C.white });
    const cube = (x, y, k) => ic(k, x - 1.5, y - 1.5, 9);
    let board = A.bg('#d9c7a2') + A.rect(216, 0, 104, 200, '#f6efe0', { sw: 0, rx: 0 }) + A.line(216, 0, 216, 200, { sw: 2 });
    board += A.line(100, 60, 52, 112, { stroke: '#3a6f9a', sw: 6 }) + A.rect(70, 85, 11, 11, RED, { rx: 2, sw: 1 });
    board += town(14, 110, 70, 'Coalbrookdale') + town(96, 30, 70, 'Wolverhampton') + town(112, 136, 80, 'Birmingham');
    board += tile(102, 33, RED, 'coalmine', false, 'I') + A.rect(160, 141, 24, 24, 'rgba(0,0,0,.08)', { rx: 2, sw: 0.6, dash: '2 2' });
    board += A.tag(268, 12, 'You (red)', { fill: RED });
    board += A.rect(226, 128, 88, 46, '#efe3c8', { rx: 4, sw: 1.2 }) + A.text(270, 136, 'Iron market', { size: 7.5, weight: 700 });
    for (let i = 0; i < 6; i++) board += A.rect(232 + i * 13, 146, 10, 10, 'rgba(0,0,0,.06)', { rx: 1, sw: 0.6, dash: '2 1' }) + A.text(237 + i * 13, 165, '£' + (1 + (i >> 1)), { size: 6 });
    for (let i = 2; i < 6; i++) board += cube(234 + i * 13, 148, 'iron');
    const money = (m, inc) => A.text(250, 34, '£' + m, { size: 15, weight: 800 }) + A.text(294, 27, 'income', { size: 6.5 }) + A.k('inc', A.text(294, 40, (inc > 0 ? '+' : '') + inc, { size: 11, weight: 800, fill: C.green }));
    const card = (x, y, ls, f) => A.card(x, y, 26, 38, f, {}) + ls.map((l, i) => A.text(x + 13, y + 13 + i * 6.5, l, { size: 5.5, fill: C.white })).join('');
    const hand = A.k('c2', card(258, 56, ['Birm-', 'ing-', 'ham'], '#7d6a52')) + A.k('c3', card(286, 56, ['Coal', 'mine'], '#5a6f7a'));
    const cdale = (x, y) => A.k('card', card(x, y, ['Coal-', 'brook-', 'dale'], '#9c8a6e'));
    const iw = (fl) => A.k('iw', tile(37, 113, RED, 'ironworks', fl, 'II'));
    const mineCoal = A.k('coal2', cube(138, 40, 'coal'));
    const irons = (pos) => pos.map(([x, y], i) => A.k('iron' + i, cube(x, y, 'iron'))).join('');
    const onTile = [[66, 117], [74, 117], [66, 126], [74, 126]];
    const mkt = [[234, 148], [247, 148]];
    return [
      { step: 0, say: 'Action 1: discard your **Coalbrookdale** card. A location card builds in that town, even off your network.',
        svg: board + money(20, 2) + hand + cdale(230, 56) + A.k('coal1', cube(130, 40, 'coal')) + mineCoal + A.glow(243, 75, 24, 'g-card') },
      { step: 0, say: 'Build a level‑2 {ironworks} there: pay £7 plus {=coal} from the nearest connected mine (yours, along the canal).',
        svg: board + money(13, 2) + hand + iw(false) + A.k('coal1', cube(46, 126, 'coal')) + mineCoal + A.glow(49, 127, 22, 'g-iw') },
      { step: 0, say: 'The {=coal} is spent; the ironworks makes **4** {=iron} on its tile.',
        svg: board + money(13, 2) + hand + iw(false) + mineCoal + irons(onTile) },
      { step: 0, say: 'New {=iron} sells at once into empty market spaces: 2 fill the £1 slots and you earn **£2**.',
        svg: board + money(15, 2) + hand + iw(false) + mineCoal + irons([mkt[0], mkt[1], onTile[2], onTile[3]]) + A.glow(243.5, 151, 14, 'g-mkt') },
      { step: 0, say: 'Later Maya **develops** 2 tiles (1 {=iron} each). Iron needs **no connection**, so she takes your last {=iron}{=iron} free.',
        svg: board + money(15, 2) + hand + iw(false) + mineCoal + irons([mkt[0], mkt[1]]) + A.tag(160, 120, 'Maya', { fill: BLU }) +
          A.k('iron2', cube(152, 132, 'iron')) + A.k('iron3', cube(166, 132, 'iron')) },
      { step: 0, say: 'Your ironworks is empty, so it **flips**: income +3, and the tile scores VP at the era’s end.',
        svg: board + money(15, 5) + hand + iw(true) + mineCoal + irons([mkt[0], mkt[1]]) +
          A.tag(160, 120, 'Maya', { fill: BLU }) + A.glow(49, 127, 22, 'g-iw') + A.glow(294, 40, 8.5, 'g-inc') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, ic = (k, x, y, sz) => A.use(I[k].draw(A), x, y, sz);
    let o = A.bg('#d9c7a2');
    // river / ground texture
    o += A.path('M0 160 Q60 140 110 170 T220 160 T320 175', { stroke: '#a8bfc6', sw: 9, opacity: 0.6 });
    // towns: [x, y, w, label]
    const towns = { bir: [140, 92, 64], wol: [44, 48, 50], cov: [254, 104, 50], red: [232, 28, 46], dud: [46, 132, 48] };
    // links
    o += A.line(towns.wol[0] + 25, towns.wol[1] + 14, towns.bir[0], towns.bir[1] + 10, { stroke: '#3a6f9a', sw: 6 });
    o += A.line(towns.dud[0] + 24, towns.dud[1] + 10, towns.bir[0], towns.bir[1] + 22, { stroke: '#3a6f9a', sw: 6 });
    o += A.line(towns.bir[0] + 64, towns.bir[1] + 16, towns.cov[0], towns.cov[1] + 14, { stroke: '#4b4b4b', sw: 6, dash: '7 3' });
    o += A.line(towns.red[0] + 10, towns.red[1] + 24, towns.bir[0] + 52, towns.bir[1], { stroke: '#4b4b4b', sw: 6, dash: '7 3' });
    // link tiles (player-coloured squares on links)
    o += A.rect(88, 66, 12, 12, '#c8423b', { rx: 2, sw: 1 });
    o += A.rect(220, 108, 12, 12, '#e2b33c', { rx: 2, sw: 1 });
    // towns
    for (const [k, [x, y, w]] of Object.entries(towns)) {
      o += A.rect(x, y, w, 30, '#efe3c8', { rx: 6, sw: 1.4 });
      const n = Math.floor((w - 6) / 20);
      for (let i = 0; i < n; i++) o += A.rect(x + 4 + i * 20, y + 5, 17, 20, 'rgba(0,0,0,.08)', { rx: 2, sw: 0.6, dash: '2 2' });
    }
    // industry tiles in player colours (dark brown once flipped), with the same icons as the text
    const tile = (x, y, f, k, flipped) => A.rect(x, y, 17, 20, flipped ? '#5a4632' : f, { rx: 2, sw: flipped ? 1.8 : 1.1, stroke: flipped ? f : undefined }) + ic(k, x + 1.5, y + 1, 14);
    o += tile(144, 97, '#c8423b', 'coalmine', false);
    o += tile(164, 97, '#e2b33c', 'ironworks', false);
    o += tile(184, 97, '#c8423b', 'cotton', true);
    o += tile(48, 53, '#c8423b', 'brewery', true);
    o += tile(258, 109, '#e2b33c', 'goods', false);
    o += tile(50, 137, '#2f6db5', 'coalmine', false);
    // resource cubes on tiles
    o += ic('coal', 144.5, 111, 8) + ic('coal', 152.5, 111, 8);
    o += ic('iron', 164.5, 111, 8) + ic('iron', 172.5, 111, 8);
    // merchant trade post
    o += A.rect(282, 150, 34, 40, '#7a5a38', { rx: 4, sw: 1.4 });
    o += ic('beer', 290, 152, 17) + A.rect(290, 174, 18, 10, '#f2e6cc', { rx: 2, sw: 0.8 });
    o += A.line(279, 132, 289, 150, { stroke: '#4b4b4b', sw: 5, dash: '7 3' });
    // coal & iron market strip
    o += A.rect(6, 172, 104, 22, '#efe3c8', { rx: 4, sw: 1.2 });
    for (let i = 0; i < 6; i++) o += ic('coal', 10 + i * 8, 178, 9);
    for (let i = 0; i < 5; i++) o += ic('iron', 62 + i * 8, 178, 9);
    // hand of cards
    o += A.fan(170, 166, 3, 22, 30, ['#7d6a52', '#9c8a6e', '#5a6f7a']);
    o += A.note(152, 105, 112, 22, 'Industry tile + cubes', { w: 118 });
    o += A.note(94, 72, 34, 100, 'Canal link');
    o += A.note(191, 107, 232, 72, 'Flipped = scores');
    o += A.note(299, 162, 240, 188, 'Merchant: sell here');
    return o;
  },
});
