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

  pitch: 'Build mills, mines and breweries across the Industrial Revolution, linking towns by canal and then rail, and profit when rivals use your coal.',
  theme: 'You are entrepreneurs in 1770–1870 Birmingham, building industries and the canals and railways that connect them.',

  goal: { big: 'Most VP', text: 'After two eras, the player with the **most victory points** wins. Points come from your flipped industry tiles and from links next to busy towns. Money is not points.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, take 2 actions (only 1 on the very first turn). Each action discards 1 card:',
    steps: [
      { verb: 'Build', text: 'Place an industry tile in a town your **card** allows, paying money plus any coal or iron it needs.' },
      { verb: 'Network', text: 'Lay a canal (£3) or, in the rail era, a rail (£5 + 1 coal) next to your network.' },
      { verb: 'Sell', text: 'Sell cotton, goods or pottery to a **connected** merchant, consuming beer; the tile flips.' },
      { verb: 'Develop', text: 'Pay 1 iron per tile to remove 1–2 of your lowest tiles, skipping ahead to better ones.' },
      { verb: 'Loan/Scout', text: 'Take a **£30 loan** (income drops 3 levels), or discard 3 cards for 2 wild cards.' },
    ],
  },

  tension: 'Your coal, iron and beer help everyone who can reach them, so each build is a choice between flipping your own tiles faster and handing rivals what they need.',

  flow: [
    { label: 'Build', items: ['Mines and ironworks', 'Breweries', 'Mills, potteries, manufacturers'] },
    { label: 'Connect', items: ['Canals (era 1)', 'Rails (era 2)', 'Reach coal and merchants'] },
    { label: 'Flip', items: ['Sell goods or use up cubes', 'Tile flips: income rises', 'Flipped tiles score'] },
    { label: 'Score', items: ['Links: icons of both ends', 'Flipped industry VP', 'Twice: each era'] },
  ],

  end: { trigger: 'the rail era’s last cards are played', detail: 'Each era lasts until the deck and every hand are empty (8 rounds with 4 players, 9 with 3, 10 with 2). Both eras end with scoring; after the canal era, canals and level‑1 tiles are removed.' },
  scoring: [
    { label: 'Industry tiles', share: 6 },
    { label: 'Canal links', share: 2 },
    { label: 'Rail links', share: 3 },
  ],

  ref: {
    title: 'What a tile needs',
    rows: [
      ['Coal', 'from a connected mine, else the market'],
      ['Iron', 'from any ironworks, no link needed'],
      ['Beer', 'your own brewery anywhere, or a connected one'],
      ['Turn order', 'least money spent goes first'],
      ['Income', 'paid at the end of every round'],
    ],
  },

  example: 'You play a **Coalbrookdale** card and build a level‑2 ironworks there, paying £7 plus 1 coal from your connected mine. It makes 4 iron: 2 sell straight into the iron market for £2, and 2 stay on the tile. Later Maya builds with those last 2 iron, so the tile is empty and **flips**: your income jumps and the tile is worth VP.',

  setup: [
    'Each player takes £17, a player mat of industry tiles and 14 link tiles.',
    'Fill the coal and iron markets, and put beer barrels and merchant tiles on the trade posts.',
    'Shuffle the deck (remove cards for player count) and deal 8 cards plus 1 face-down discard to each.',
  ],

  terms: [
    ['Flip', 'An industry turns over when sold or emptied of cubes: +income and VP.'],
    ['Link', 'A canal or rail tile; it scores the link icons on the towns at each end.'],
    ['Network', 'Your tiles plus every location touching your links.'],
    ['Merchant', 'Off-map buyer; selling to it needs a connection and beer.'],
    ['Overbuild', 'Replacing a tile with a higher level of the same industry.'],
  ],

  gotchas: [
    'An **industry** card builds only in your network (anywhere if you have nothing on the board yet); a **location** card builds in that town even off your network.',
    'Spending money sets **turn order**: the player who spent least goes first next round.',
    'At the end of the canal era every canal and every **level‑1** industry tile leaves the board, and its VP is already scored.',
  ],

  tips: [
    'A loan early is normal; income you build pays it back many times.',
    'Build where others will need your coal and beer, so they flip your tiles for you.',
    'Rail links between towns with many flipped tiles score big in the second era.',
  ],

  extended: [
    { title: 'Canal era vs rail era', items: [
      '**Canal era** (first half): links are canals at £3 each, and you may have only **one** industry tile per town.',
      '**Rail era** (second half): a rail costs £5 + 1 coal; a double rail is £15 + 2 coal + 1 beer. You may build several tiles in one town.',
      'Some tiles show an era icon and can only be built in that era; most **level‑1** tiles can’t be built in the rail era.',
      'Between eras: score, then remove every canal and every level‑1 industry tile (flipped or not), and reshuffle the deck. Your network restarts from the tiles left.',
    ] },
    { title: 'Flipping and income', items: [
      'Coal mines, ironworks and breweries flip when their **last cube or barrel** is used. Cotton mills, manufacturers and potteries flip when you **sell** from them.',
      'Flipping moves your income marker up by the number on the tile. Income (positive or negative) is paid at the **end of each round**.',
      'If you can’t pay negative income, remove your tiles for half their cost; for any shortfall left, lose 1 VP per £1.',
    ] },
    { title: 'Coal, iron and beer', items: [
      '**Coal**: from the **nearest** connected coal mine (anyone’s, free). If none is connected, buy from the coal market, but only if the location connects to a merchant.',
      '**Iron**: from **any** ironworks on the board, no connection needed, free. If none has iron, buy from the iron market.',
      '**Beer** (to sell, or for a double rail): your own brewery anywhere, a rival’s connected brewery, or the beer barrel on the merchant you sell to (which also gives that merchant’s bonus).',
      'New coal and iron cubes sell straight into empty market spaces: iron always, coal only if the mine connects to a merchant. You earn the space’s price.',
    ] },
    { title: 'Loans and scouting', items: [
      'A loan gives **£30** and drops your income marker back **3 income levels** (not 3 spaces). Loans are never repaid.',
      'You can’t take a loan that would push income below −10.',
      'Scout: discard 3 cards to take 1 wild location + 1 wild industry card. Not allowed if you already hold a wild card.',
    ] },
    { title: 'Building rules', items: [
      'An industry card builds in your network; a location card builds in that town anywhere. With nothing on the board, an industry card works anywhere.',
      'You must build the **lowest** level tile left on your mat of that industry; Develop skips tiles for 1 iron each.',
      'Overbuild your own tile with a higher level of the same industry any time. A rival’s coal mine or ironworks can be overbuilt only when there are no cubes of that type left on the whole board and market.',
    ] },
    { title: 'Era scoring', items: [
      'Links first: each of your links scores the **link icons** at both ends, from flipped tiles (anyone’s) and merchant spaces.',
      'Then each of your **flipped** industry tiles scores its VP. Unflipped tiles score nothing.',
      'Money never scores, though it breaks ties.',
    ] },
  ],

  walk(A) {
    const C = A.C, RED = '#c8423b', BLU = '#2f6db5', COAL = '#1d1d1d', IRON = '#e07b2e';
    const town = (x, y, w, name) => A.rect(x, y, w, 34, '#efe3c8', { rx: 6, sw: 1.4 }) + A.text(x + w / 2, y + 42, name, { size: 8, weight: 700 });
    const tile = (x, y, col, ic, flipped, lv) => A.rect(x, y, 24, 28, flipped ? '#5a4632' : col, { rx: 2, sw: 1.2 }) +
      (flipped ? A.rect(x + 3, y + 3, 18, 4, col, { rx: 1, sw: 0 }) : '') + A.circle(x + 12, y + 11, 5.5, ic, { sw: 0.8 }) +
      A.text(x + 12, y + 22, lv, { size: 6, weight: 800, fill: C.white });
    const cube = (x, y, f) => A.rect(x, y, 6, 6, f, { rx: 1, sw: 0.6 });
    let board = A.bg('#d9c7a2') + A.rect(216, 0, 104, 200, '#f6efe0', { sw: 0, rx: 0 }) + A.line(216, 0, 216, 200, { sw: 2 });
    board += A.line(100, 60, 52, 112, { stroke: '#3a6f9a', sw: 6 }) + A.rect(70, 85, 11, 11, RED, { rx: 2, sw: 1 });
    board += town(14, 110, 70, 'Coalbrookdale') + town(96, 30, 70, 'Wolverhampton') + town(112, 136, 80, 'Birmingham');
    board += tile(102, 33, RED, COAL, false, 'I') + A.rect(160, 141, 24, 24, 'rgba(0,0,0,.08)', { rx: 2, sw: 0.6, dash: '2 2' });
    board += A.tag(268, 12, 'You (red)', { fill: RED });
    board += A.rect(226, 128, 88, 46, '#efe3c8', { rx: 4, sw: 1.2 }) + A.text(270, 136, 'Iron market', { size: 7.5, weight: 700 });
    for (let i = 0; i < 6; i++) board += A.rect(232 + i * 13, 146, 10, 10, 'rgba(0,0,0,.06)', { rx: 1, sw: 0.6, dash: '2 1' }) + A.text(237 + i * 13, 165, '£' + (1 + (i >> 1)), { size: 6 });
    for (let i = 2; i < 6; i++) board += cube(234 + i * 13, 148, IRON);
    const money = (m, inc) => A.text(250, 34, '£' + m, { size: 15, weight: 800 }) + A.text(294, 27, 'income', { size: 6.5 }) + A.k('inc', A.text(294, 40, (inc > 0 ? '+' : '') + inc, { size: 11, weight: 800, fill: C.green }));
    const card = (x, y, ls, f) => A.card(x, y, 26, 38, f, {}) + ls.map((l, i) => A.text(x + 13, y + 13 + i * 6.5, l, { size: 5.5, fill: C.white })).join('');
    const hand = A.k('c2', card(258, 56, ['Birm-', 'ing-', 'ham'], '#7d6a52')) + A.k('c3', card(286, 56, ['Coal', 'mine'], '#5a6f7a'));
    const cdale = (x, y) => A.k('card', card(x, y, ['Coal-', 'brook-', 'dale'], '#9c8a6e'));
    const iw = (fl) => A.k('iw', tile(37, 113, RED, IRON, fl, 'II'));
    const mineCoal = A.k('coal2', cube(138, 40, COAL));
    const irons = (pos) => pos.map(([x, y], i) => A.k('iron' + i, cube(x, y, IRON))).join('');
    const onTile = [[66, 117], [74, 117], [66, 126], [74, 126]];
    const mkt = [[234, 148], [247, 148]];
    return [
      { step: 0, say: 'First action: discard your **Coalbrookdale** card. A location card lets you build in that town, even off your network.',
        svg: board + money(20, 2) + hand + cdale(230, 56) + A.k('coal1', cube(130, 40, COAL)) + mineCoal + A.glow(243, 75, 24, 'g-card') },
      { step: 0, say: 'Build a level‑2 **ironworks** there: pay £7, plus 1 coal from the nearest connected mine (yours, along the canal).',
        svg: board + money(13, 2) + hand + iw(false) + A.k('coal1', cube(46, 126, COAL)) + mineCoal + A.glow(49, 127, 22, 'g-iw') },
      { step: 0, say: 'The coal is used up and the ironworks produces **4 iron** cubes on its tile.',
        svg: board + money(13, 2) + hand + iw(false) + mineCoal + irons(onTile) },
      { step: 0, say: 'New iron sells straight into the empty market spaces: 2 cubes fill the £1 slots and you earn **£2**.',
        svg: board + money(15, 2) + hand + iw(false) + mineCoal + irons([mkt[0], mkt[1], onTile[2], onTile[3]]) + A.glow(243.5, 151, 14, 'g-mkt') },
      { step: 0, say: 'Later, Maya builds a factory in Birmingham. Iron needs **no connection**, so she uses your last 2 iron for free.',
        svg: board + money(15, 2) + hand + iw(false) + mineCoal + irons([mkt[0], mkt[1]]) + A.k('maya', tile(160, 141, BLU, '#7d55b5', false, 'I')) +
          A.k('iron2', cube(186, 144, IRON)) + A.k('iron3', cube(186, 153, IRON)) + A.tag(160, 120, 'Maya', { fill: BLU }) },
      { step: 0, say: 'Your ironworks is empty, so it **flips**: income climbs 3 and the tile will score VP at the end of the era.',
        svg: board + money(15, 5) + hand + iw(true) + mineCoal + irons([mkt[0], mkt[1]]) + A.k('maya', tile(160, 141, BLU, '#7d55b5', false, 'I')) +
          A.tag(160, 120, 'Maya', { fill: BLU }) + A.glow(49, 127, 22, 'g-iw') + A.glow(294, 40, 8.5, 'g-inc') },
    ];
  },

  art(A) {
    const C = A.C;
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
    // industry tiles: [x, y, colour, icon colour, flipped]
    const tile = (x, y, f, ic, flipped) => {
      let s = A.rect(x, y, 17, 20, flipped ? '#5a4632' : f, { rx: 2, sw: 1.1 });
      s += A.circle(x + 8.5, y + 9, 4.5, ic, { sw: 0.8 });
      if (flipped) s += A.rect(x + 2, y + 2, 13, 4, f, { rx: 1, sw: 0 });
      return s;
    };
    o += tile(144, 97, '#c8423b', '#2b2b2b', false); // coal mine
    o += tile(164, 97, '#e2b33c', '#e07b2e', false); // ironworks
    o += tile(184, 97, '#c8423b', '#f2e6cc', true);  // flipped cotton
    o += tile(48, 53, '#c8423b', '#b88d4a', true);   // brewery flipped
    o += tile(258, 109, '#e2b33c', '#7d55b5', false);
    o += tile(50, 137, '#2f6db5', '#2b2b2b', false);
    // resource cubes on tiles
    o += A.rect(146, 112, 5, 5, '#1d1d1d', { rx: 1, sw: 0.5 }) + A.rect(153, 112, 5, 5, '#1d1d1d', { rx: 1, sw: 0.5 });
    o += A.rect(166, 112, 5, 5, '#e07b2e', { rx: 1, sw: 0.5 }) + A.rect(173, 112, 5, 5, '#e07b2e', { rx: 1, sw: 0.5 });
    // merchant trade post
    o += A.rect(282, 150, 34, 40, '#7a5a38', { rx: 4, sw: 1.4 });
    o += A.circle(299, 162, 7, '#b88d4a', { sw: 1 }) + A.rect(290, 174, 18, 10, '#f2e6cc', { rx: 2, sw: 0.8 });
    o += A.line(279, 132, 289, 150, { stroke: '#4b4b4b', sw: 5, dash: '7 3' });
    // coal & iron market strip
    o += A.rect(6, 172, 104, 22, '#efe3c8', { rx: 4, sw: 1.2 });
    for (let i = 0; i < 6; i++) o += A.rect(12 + i * 8, 180, 6, 6, '#1d1d1d', { rx: 1, sw: 0.4 });
    for (let i = 0; i < 5; i++) o += A.rect(64 + i * 8, 180, 6, 6, '#e07b2e', { rx: 1, sw: 0.4 });
    // hand of cards
    o += A.fan(170, 166, 3, 22, 30, ['#7d6a52', '#9c8a6e', '#5a6f7a']);
    o += A.note(152, 105, 112, 22, 'Industry tile + cubes', { w: 118 });
    o += A.note(94, 72, 34, 100, 'Canal link');
    o += A.note(191, 107, 232, 72, 'Flipped = scores');
    o += A.note(299, 162, 240, 188, 'Merchant: sell here');
    return o;
  },
});
