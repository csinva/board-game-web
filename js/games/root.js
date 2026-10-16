defineGame({
  id: 'root',
  name: 'Root',
  year: 2018,
  designer: 'Cole Wehrle',
  family: 'conflict',
  players: [2, 4], best: '4',
  time: [60, 90],
  age: 10,
  mechanics: ['variable-powers', 'area-control', 'hand-management', 'dice', 'take-that', 'action-points'],
  profile: { complexity: 4, luck: 2, interaction: 5, conflict: 4, talk: 3, planning: 4 },

  pitch: 'Woodland factions fight over a forest, each playing by completely different rules: one game, four very different puzzles.',
  theme: 'You are a faction of woodland animals (industrial cats, proud birds, rebel critters or a lone wanderer) fighting for the forest.',

  goal: { big: '30 points', text: 'First to **30 victory points** wins at once. Each faction scores in its own way, so watch how the others score.' },

  turn: {
    type: 'sequence',
    intro: 'Every faction’s turn has the same three phases; what you do in each is printed on your faction board:',
    steps: [
      { verb: 'Birdsong', text: 'Start-of-turn upkeep: e.g. Cats place wood, Eyrie add cards to the **Decree**, Alliance revolts.' },
      { verb: 'Daylight', text: 'Your main actions: **craft** cards, then move, battle, recruit and build by your faction’s rules.' },
      { verb: 'Evening', text: 'Score or tidy up, **draw 1 card** (more with some bonuses), then discard down to **5**.' },
    ],
  },

  tension: 'Every faction is strongest where it is left alone, so you must decide when to hit the leader and when to let someone else pay to do it.',

  flow: [
    { label: 'Spread', items: ['Move warriors', 'Rule clearings', 'Place buildings / tokens'] },
    { label: 'Fight', items: ['Battle with 2 dice', '1 VP per building or token removed'] },
    { label: 'Score', items: ['Faction scoring', 'Craft items for VP', 'Dominance cards'] },
  ],

  end: { trigger: 'someone reaches 30 VP', detail: 'Or, after reaching 10 VP, a player may swap their score for a Dominance card and win by ruling its clearings at the start of their turn.' },
  scoring: [
    { label: 'Faction engine', share: 6 },
    { label: 'Battles', share: 2 },
    { label: 'Crafted items', share: 2 },
  ],

  ref: {
    title: 'The four base factions',
    rows: [
      ['Marquise de Cat (orange)', 'Industry: build sawmills, workshops and recruiters; score for each building.'],
      ['Eyrie Dynasties (blue)', 'Must carry out a growing **Decree** every turn; failing it causes turmoil.'],
      ['Woodland Alliance (green)', 'Spread sympathy tokens, then revolt and build bases.'],
      ['Vagabond (grey)', 'One pawn. Explore ruins, do quests, help or betray anyone.'],
    ],
  },

  example: 'The Cats take their 3 Daylight actions. They spend 1 wood to build a 2nd workshop (+2 VP), march 4 warriors into a mouse clearing, then battle the Eyrie there. They roll 3 and 1: the attacker uses the higher die, so the Eyrie lose 3 (2 warriors, then the roost) the Cats lose 1 warrior, and they score **1 VP** for the roost.',

  setup: [
    'Lay out the forest board and ruins; shuffle the shared deck and deal 3 cards each.',
    'Pick factions: 2 players use Cats vs Eyrie, add the Alliance at 3 and the Vagabond at 4.',
    'Set up in order (Cats, Eyrie, Alliance, Vagabond) following the back of each faction board.',
  ],

  terms: [
    ['Clearing', 'A space on the map, marked fox, rabbit or mouse. Birds are wild.'],
    ['Rule', 'Having the most warriors + buildings in a clearing. Needed to move and to build.'],
    ['Craft', 'Play a card by tapping crafting pieces of its suit; items score VP.'],
    ['Defenseless', 'No warriors in the clearing: the attacker deals +1 hit.'],
    ['Decree', 'The Eyrie’s programmed row of actions that grows every turn.'],
  ],

  gotchas: [
    'To move, you must **rule** the clearing you leave **or** the one you enter.',
    'In battle both roll 2 dice: the **attacker takes the higher**, the defender the lower; hits are capped by warriors present.',
    'You score **1 VP** for each enemy building or token you remove, but nothing for killing warriors.',
  ],

  extended: [
    { title: 'Marquise de Cat: the industry engine', items: [
      '**Birdsong**: 1 wood on every sawmill. Wood moves only through clearings you rule, so a broken supply line strands it.',
      '**Daylight**: 3 actions (+1 per bird card spent): battle, march (two moves), recruit (1 warrior per recruiter, once per turn), build, or overwork (spend a matching card for 1 extra wood at a sawmill).',
      'Each building track gets more expensive (0-1-2-3-3-4 wood) and scores more VP; uncovered spaces also raise your card draw (recruiters) or crafting power (workshops).',
      'The **Keep** protects its clearing from other factions’ placement; Field Hospitals let you spend a card to return warriors removed in a matching clearing to the Keep.',
    ] },
    { title: 'Eyrie Dynasties: the Decree', items: [
      'Birdsong: add 1–2 cards to the Decree’s four columns (**Recruit, Move, Battle, Build**); bird cards are wild.',
      'Daylight: resolve every card left to right, each in a clearing matching its suit. If you can’t, you fall into **Turmoil**: lose 1 VP per bird card in the Decree, discard it (except the leader’s loyal viziers), pick a new leader.',
      'Evening: score VP from the roost track; more roosts = more points each turn. Roosts are your only buildings, so losing them hurts doubly.',
      'Lords of the Forest: the Eyrie rule a clearing on ties.',
    ] },
    { title: 'Woodland Alliance: sympathy & revolt', items: [
      'Spread **sympathy** tokens by paying supporters (cards) matching the clearing; each token scores VP by the track. More cost where enemy warriors gather (martial law).',
      '**Outrage**: anyone who removes sympathy or moves into a sympathetic clearing must give you a matching card (or you draw one).',
      'Birdsong: **revolt** by spending 2 matching supporters in a sympathetic clearing: wipe out enemy pieces there, build a base, get warriors.',
      '**Guerrilla war**: when defending, the Alliance use the higher die. Officers set how many Evening operations (move, battle, recruit, organize) you get.',
    ] },
    { title: 'Vagabond: items & relationships', items: [
      'Every action exhausts an item: boots to move, sword to battle, torch to explore ruins (find items), crossbow, hammer to repair, tea to refresh. Damaged items can’t be used.',
      '**Aid** a faction by giving it a card: relationships climb from indifferent to allied, scoring VP; once allied you can move with and use their warriors.',
      'Attacking a faction makes it **hostile**: you score +1 VP for each of their pieces you remove (Infamy), but moving into a clearing with their warriors costs an extra boot.',
      '**Quests** need two specific items; complete them for 2 cards or VP.',
    ] },
    { title: 'Crafting & items', items: [
      'Craft by activating crafting pieces (Cat workshops, Eyrie roosts, Alliance sympathy, Vagabond hammers) matching the card’s suits.',
      'Item cards score the printed VP and put an item on the map’s shared track (the Vagabond loves them); if the item is gone, you can’t craft that card.',
      'Persistent effect cards (e.g. Royal Claim, Sappers, Better Burrow Bank) stay in front of you; Eyrie only score 1 VP per item crafted.',
    ] },
    { title: 'Battle in full', items: [
      'Attacker rolls 2 dice, takes the higher; defender takes the lower. Hits are capped by your warriors in the clearing.',
      '**Defenseless** defender (no warriors) takes +1 extra hit. Ambush cards (matching suit) deal 2 hits before the roll, and can be cancelled by another ambush.',
      'Defender chooses which of their own pieces to remove: warriors first, then buildings/tokens of their choice.',
    ] },
    { title: 'Dominance cards', text: 'Four suited Dominance cards are in the deck. A player with **10+ VP** can play one in Daylight, removing their score marker: they now win only by ruling 3 clearings of that suit (or 2 opposite corners with bird dominance) at the **start** of their Birdsong. Played dominance cards can be taken by others for a matching card. The Vagabond can instead form a coalition with the lowest-scoring player and win with them.' },
  ],

  tips: [
    'Read every faction board before starting: you need to know how each rival scores.',
    'Hit whoever is running away with points; the Alliance and Vagabond are easy to underestimate.',
    'Craft early: the shared cards’ items and effects add up quickly.',
  ],

  walk(A) {
    const C = A.C, CAT = '#e07b2e', EY = '#2f6db5';
    const L = [70, 76], M = [160, 148], R = [252, 76];
    const suitC = { f: '#d9472f', r: '#e9c43a', m: '#e88a3a' };
    const clearing = ([x, y], s, name) => A.circle(x, y, 30, '#f3ead2', { stroke: '#5a4630', sw: 1.8 }) +
      A.circle(x - 22, y - 22, 6, suitC[s], { sw: 1 }) + A.text(x, y + 38, name, { size: 8, fill: '#3e4a2a' });
    let board = A.bg('#cfe0a8') + `<ellipse cx="160" cy="70" rx="44" ry="24" fill="#8fb36a"/><ellipse cx="40" cy="165" rx="30" ry="18" fill="#8fb36a"/>`;
    board += A.line(...L, ...R, { stroke: '#f3ead2', sw: 6 }) + A.line(...L, ...M, { stroke: '#f3ead2', sw: 6 }) + A.line(...M, ...R, { stroke: '#f3ead2', sw: 6 });
    board += clearing(L, 'f', 'fox') + clearing(M, 'r', 'rabbit') + clearing(R, 'm', 'mouse');
    const bld = (x, y, f, l) => A.rect(x - 7, y - 7, 14, 14, f, { rx: 2, sw: 1.2 }) + A.text(x, y + 0.5, l, { size: 6, weight: 800, fill: '#fff' });
    const war = (x, y, f) => A.meeple(x, y, 15, f);
    const wood = (x, y) => A.rect(x - 4, y - 4, 8, 8, '#8a5a33', { rx: 1, sw: 1 });
    board += bld(L[0] - 10, L[1] - 12, CAT, 'SAW') + bld(M[0] - 10, M[1] - 10, CAT, 'SAW');
    board += A.rect(M[0] + 3, M[1] - 17, 14, 14, 'none', { rx: 2, sw: 1, dash: '2 2' });
    const vp = (n) => A.k('vp', A.tag(46, 14, 'Cats ' + n + ' VP', { fill: CAT }));
    const eyTag = A.tag(276, 14, 'Eyrie', { fill: EY });
    const catW = (i, at) => A.k('cw' + i, war(at === L ? L[0] - 17 + i * 11 : R[0] - 20 + i * 11, at === L ? L[1] + 12 : R[1] + 14, CAT));
    const cats = (at, n = 4) => [0, 1, 2, 3].slice(4 - n).map(i => catW(i, at)).join('');
    const eyrie = A.k('ew0', war(R[0] - 6, R[1] - 10, EY)) + A.k('ew1', war(R[0] + 6, R[1] - 10, EY)) + A.k('roost', A.rect(R[0] + 11, R[1] - 13, 14, 14, EY, { rx: 2, sw: 1.2 }) + A.bird(R[0] + 18, R[1] - 5, 11, '#fff'));
    const woodL = A.k('wood1', wood(L[0] + 10, L[1] - 12)), woodM = A.k('wood2', wood(M[0] - 10, M[1] + 6));
    const ws = A.k('ws', bld(M[0] + 10, M[1] - 10, CAT, 'WS'));
    const hand = (n) => [0, 1, 2, 3].slice(0, n).map(i => A.k('c' + i, A.card(234 + i * 14, 156, 22, 32, ['#e7a08f', '#f0d98a', '#f0b98a', '#a9c7e8'][i]))).join('');
    const dice = (a, b) => A.k('dice', A.die(110, 8, 20, a, '#fff6e6') + A.die(136, 8, 20, b, '#fff6e6'));
    const base = board + eyTag;
    return [
      { step: 0, say: '**Birdsong.** The Cats place **1 wood** at each sawmill.',
        svg: base + vp(10) + cats(L) + eyrie + woodL + woodM + hand(3) + A.glow(L[0] + 10, L[1] - 12, 10, 'g1') + A.glow(M[0] - 10, M[1] + 6, 10, 'g2') },
      { step: 1, say: '**Daylight**, action 1: spend 1 wood to build a 2nd **workshop**. It scores **+2 VP**.',
        svg: base + vp(12) + cats(L) + eyrie + woodL + ws + hand(3) + A.glow(M[0] + 10, M[1] - 10, 13, 'g-ws') },
      { step: 1, say: 'Action 2: **march** 4 warriors from the fox clearing (they rule it) into the Eyrie’s mouse clearing.',
        svg: base + vp(12) + cats(R) + eyrie + woodL + ws + hand(3) + A.arrow(104, 70, 214, 70, { stroke: CAT, sw: 2, dash: '4 3' }) },
      { step: 1, say: 'Action 3: **battle**. Roll 2 dice: **3** and **1**. The attacker takes the higher, so Cats deal 3 hits and the Eyrie deal 1.',
        svg: base + vp(12) + cats(R) + eyrie + woodL + ws + hand(3) + dice(3, 1) + A.text(120, 36, 'Cats', { size: 7, fill: CAT }) + A.text(146, 36, 'Eyrie', { size: 7, fill: EY }) + A.glow(R[0], R[1], 34, 'g-r') },
      { step: 1, say: 'The Eyrie lose both warriors, then the **roost** (+1 VP). The Cats lose 1 warrior.',
        svg: base + vp(13) + cats(R, 3) + woodL + ws + hand(3) + dice(3, 1) },
      { step: 2, say: '**Evening.** Draw 1 card (more if the recruiter track shows a bonus), then discard down to 5.',
        svg: base + vp(13) + cats(R, 3) + woodL + ws + hand(4) + A.glow(276, 170, 24, 'g-hand') + A.tag(262, 140, 'Cats’ hand', { fill: CAT }) },
    ];
  },

  art(A) {
    const C = A.C;
    const suit = { f: '#d9472f', r: '#e9c43a', m: '#e88a3a' };
    let o = A.bg('#cfe0a8');
    // forest patches
    const blobs = [[85, 70, 34, 22], [180, 60, 40, 22], [160, 135, 40, 24], [255, 110, 30, 24], [60, 140, 26, 18]];
    for (const [x, y, rx, ry] of blobs) o += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#8fb36a" stroke="none"/>`;
    // river
    o += A.path('M0 92 Q60 96 100 110 T200 104 T320 128', { stroke: '#6fb2d8', sw: 7 });
    const N = { a: [36, 42, 'f'], b: [130, 40, 'm'], c: [232, 42, 'r'], d: [294, 84, 'm'], e: [30, 104, 'r'], f: [118, 100, 'f'], g: [204, 100, 'm'], h: [292, 150, 'f'], i: [42, 160, 'm'], j: [130, 160, 'r'], k: [222, 160, 'f'] };
    const E = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'e'], ['a', 'f'], ['b', 'f'], ['c', 'g'], ['d', 'g'], ['d', 'h'], ['e', 'f'], ['f', 'g'], ['e', 'i'], ['i', 'j'], ['f', 'j'], ['g', 'k'], ['j', 'k'], ['k', 'h']];
    for (const [p, q] of E) o += A.line(N[p][0], N[p][1], N[q][0], N[q][1], { stroke: '#f3ead2', sw: 4 });
    for (const k in N) { const [x, y, sft] = N[k]; o += A.circle(x, y, 16, '#f3ead2', { stroke: '#5a4630', sw: 1.6 }) + A.circle(x - 11, y - 11, 4, suit[sft], { sw: 1 }); }
    const bld = (x, y, f) => A.rect(x - 5, y - 5, 10, 10, f, { rx: 1.5, sw: 1 });
    const war = (x, y, f) => A.meeple(x, y, 11, f);
    // Cats (orange) west
    o += bld(N.a[0] - 4, N.a[1] + 2, '#e07b2e') + bld(N.a[0] + 7, N.a[1] + 2, '#e07b2e') + war(N.e[0] - 5, N.e[1] + 2, '#e07b2e') + war(N.e[0] + 5, N.e[1] + 2, '#e07b2e');
    o += war(N.f[0] - 5, N.f[1] + 2, '#e07b2e') + war(N.f[0] + 5, N.f[1] + 2, '#e07b2e') + bld(N.i[0] + 3, N.i[1] + 2, '#e07b2e');
    // Eyrie (blue) east
    o += bld(N.d[0] + 2, N.d[1] + 2, '#2f6db5') + war(N.g[0] - 5, N.g[1] + 2, '#2f6db5') + war(N.g[0] + 5, N.g[1] + 2, '#2f6db5') + war(N.c[0], N.c[1] + 2, '#2f6db5');
    // Alliance sympathy (green tokens)
    o += A.circle(N.j[0] + 2, N.j[1] + 2, 6, '#3c8d4f', { sw: 1 }) + A.circle(N.k[0] + 2, N.k[1] + 2, 6, '#3c8d4f', { sw: 1 });
    // Vagabond
    o += A.pawn(N.b[0] + 2, N.b[1] - 1, 15, '#8c877f');
    o += A.note(N.a[0] - 11, N.a[1] - 11, 74, 11, 'Clearing suit: fox');
    o += A.note(N.f[0] + 5, N.f[1] - 5, 176, 130, 'Cat warriors');
    o += A.note(N.d[0] + 2, N.d[1] - 3, 280, 11, 'Eyrie roost');
    o += A.note(N.k[0] + 2, N.k[1] + 2, 230, 192, 'Alliance sympathy');
    return o;
  },
});
