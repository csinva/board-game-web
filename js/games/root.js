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

  // Clearing / card suits, each faction's warrior and buildings, wood and items. Reused in art and walk.
  icons: (() => {
    const ink = '#2a2420', W = '#fff';
    const disc = (A, f) => A.circle(12, 12, 10.5, f, { sw: 1.3 });
    const eyes = (A, y) => A.circle(10, y, 0.95, ink, { sw: 0 }) + A.circle(14, y, 0.95, ink, { sw: 0 });
    const ear = (cx, rot) => `<ellipse cx="${cx}" cy="8" rx="2" ry="4.6" fill="#fff" stroke="${ink}" stroke-width="0.8" transform="rotate(${rot} ${cx} 8)"/>`;
    const sq = (A, f) => A.rect(3, 3, 18, 18, f, { rx: 2.5, sw: 1.3 });
    return {
      fox: { name: 'fox', draw: A => disc(A, '#d9472f') + A.poly([[6, 5.5], [9.5, 9], [14.5, 9], [18, 5.5], [17.5, 12.5], [12, 19], [6.5, 12.5]], W, { sw: 0.8 }) + eyes(A, 12.2) + A.circle(12, 17.4, 1, ink, { sw: 0 }) },
      rabbit: { name: 'rabbit', draw: A => disc(A, '#e9c43a') + ear(9.6, -12) + ear(14.4, 12) + A.circle(12, 15, 4.7, W, { sw: 0.8 }) + eyes(A, 14.3) },
      mouse: { name: 'mouse', draw: A => disc(A, '#e88a3a') + A.circle(7.4, 9.4, 3.3, W, { sw: 0.8 }) + A.circle(16.6, 9.4, 3.3, W, { sw: 0.8 }) + A.circle(12, 14, 5, W, { sw: 0.8 }) + eyes(A, 13.3) + A.circle(12, 16.6, 0.9, ink, { sw: 0 }) },
      bird: { name: 'bird', draw: A => disc(A, '#5b9bd5') + A.bird(12.5, 13.5, 20, W) },
      cat: { name: 'Marquise warrior', draw: A => A.meeple(12, 12.5, 21, '#e07b2e') },
      eyrie: { name: 'Eyrie warrior', draw: A => A.meeple(12, 12.5, 21, '#2f6db5') },
      alliance: { name: 'Alliance warrior', draw: A => A.meeple(12, 12.5, 21, '#3c8d4f') },
      vagabond: { name: 'Vagabond', draw: A => A.pawn(12, 12, 22, '#8c877f') },
      sawmill: { name: 'sawmill', draw: A => sq(A, '#e07b2e') + A.path('M5.5 15 l2.2 -5 l2.2 5 l2.2 -5 l2.2 5 l2.2 -5 l1.5 3.4', { stroke: W, sw: 2 }) },
      workshop: { name: 'workshop', draw: A => sq(A, '#e07b2e') + A.line(8, 18, 14, 10, { stroke: W, sw: 2.4 }) + A.rect(10.5, 6, 9.5, 4.5, W, { rx: 1, sw: 0, rotate: 37 }) },
      recruiter: { name: 'recruiter', draw: A => sq(A, '#e07b2e') + A.meeple(12, 12.5, 14, W) },
      roost: { name: 'roost', draw: A => sq(A, '#2f6db5') + A.bird(12.5, 13, 15, W) },
      sympathy: { name: 'sympathy token', draw: A => A.circle(12, 12, 10, '#3c8d4f', { sw: 1.3 }) + A.circle(12, 14.5, 3.2, W, { sw: 0 }) + A.circle(8.4, 10.2, 1.6, W, { sw: 0 }) + A.circle(12, 8.4, 1.6, W, { sw: 0 }) + A.circle(15.6, 10.2, 1.6, W, { sw: 0 }) },
      base: { name: 'base', draw: A => sq(A, '#3c8d4f') + A.house(12, 18, 12, W) },
      wood: { name: 'wood', draw: A => A.rect(4, 6.5, 16, 11, '#a06a3c', { rx: 1.5, sw: 1.3 }) + A.line(7, 10, 17, 10, { stroke: '#6e4524', sw: 1 }) + A.line(7, 14, 14, 14, { stroke: '#6e4524', sw: 1 }) },
      item: { name: 'item', draw: A => A.rect(3, 3, 18, 18, '#e9d6a7', { rx: 2.5, sw: 1.3 }) + A.line(7.5, 16.5, 16.5, 7.5, { stroke: '#5a6270', sw: 2.4 }) + A.line(7.5, 12.5, 11.5, 16.5, { stroke: '#8a5a33', sw: 2.2 }) },
    };
  })(),

  pitch: 'Each player runs a faction with its own rules for moving, fighting and scoring; first to 30 points wins.',

  goal: { big: '30 points', text: 'First to **30 victory points** wins immediately. Each faction scores differently, so track how your rivals score.' },

  turn: {
    type: 'sequence',
    intro: 'Every faction has the same three phases; your faction board says what to do in each:',
    steps: [
      { verb: 'Birdsong', text: 'Start-of-turn upkeep, e.g. Cats place {=wood}, Eyrie add cards to the **Decree**, Alliance revolt.' },
      { verb: 'Daylight', text: 'Main actions: **craft** cards, then move, battle, recruit and build by your faction’s rules.' },
      { verb: 'Evening', text: 'Score or clean up, **draw 1** {=card} (more with some bonuses), then discard down to **5**.' },
    ],
  },

  tension: 'Each faction grows fastest when left alone, so you must choose when to attack the leader and when to let someone else pay for it.',

  structure: [
    { label: 'Setup', text: 'Set up factions in order (Cats, Eyrie, Alliance, Vagabond); deal 3 cards each.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn: Birdsong, Daylight, Evening, following your faction board.' },
    { label: 'Game end', text: 'The moment someone reaches **30 VP**, or a Dominance holder starts their turn meeting its condition.' },
  ],

  points: [
    ['Faction track', 'Cats: each building placed. Eyrie: each Evening, by {roost}s on the map. Alliance: each {=sympathy} placed. Vagabond: aiding factions, quests, and +1 per piece of a hostile faction removed in battle.'],
    ['Removing pieces', '+1 VP per enemy building or token removed (not warriors)'],
    ['{=item} Crafting', 'VP printed on item cards (Eyrie: 1 each)'],
  ],

  end: { trigger: 'someone reaches 30 VP', detail: 'Alternative: at 10+ VP a player may trade their score for a Dominance card, then win by ruling its clearings at the start of their turn.' },
  scoring: [
    { label: 'Faction engine', share: 6 },
    { label: 'Battles', share: 2 },
    { label: '{=item} Crafted items', share: 2 },
  ],

  ref: {
    title: 'Suits and base factions',
    rows: [
      ['Suits', '{=fox} {=rabbit} {=mouse} on clearings and cards; {=bird} cards are wild'],
      ['{=cat} Marquise de Cat', 'Spend {wood} to build {=sawmill}{=workshop}{=recruiter}; score per building.'],
      ['{=eyrie} Eyrie Dynasties', 'Build {roost}s; carry out a growing **Decree** every turn or fall into turmoil.'],
      ['{=alliance} Woodland Alliance', 'Spread {=sympathy} tokens, then revolt to build {base}s.'],
      ['{=vagabond} Vagabond', 'One pawn. Spends {=item} items to explore ruins, quest, and aid or attack anyone.'],
    ],
  },

  example: 'Cats’ Daylight, 3 actions: spend 1 {=wood} to build a 2nd {workshop} (+2 {=vp}); march 4 {=cat} into a {mouse} clearing; battle the Eyrie there. Dice show 3 and 1. The attacker takes the higher, so the Eyrie lose 3 pieces (2 {=eyrie}, then the {roost}) and the Cats lose 1 {=cat}. The roost scores the Cats **1 VP**.',

  setup: [
    'Lay out the board, ruins and item supply. With 2 players, remove the 4 Dominance cards. Shuffle the deck and deal 3 cards each.',
    'Suggested factions: Cats vs Eyrie with 2 players; add the Alliance at 3 and the Vagabond at 4. Pick the first player at random.',
    'Set up in order (Cats, Eyrie, Alliance, Vagabond) as printed on the back of each faction board.',
  ],

  terms: [
    ['Clearing', 'A space on the map, marked {fox}, {rabbit} or {mouse}. {=bird} Bird cards are wild.'],
    ['Rule', 'Most warriors + buildings in a clearing. Needed to move and to build.'],
    ['{=item} Craft', 'Play a card by activating crafting pieces ({=workshop}{=roost}{=sympathy}) of its suit. Items score {=vp}.'],
    ['Defenseless', 'No defending warriors in the clearing: the attacker deals +1 hit.'],
    ['Decree', 'The Eyrie’s row of required actions; it grows every turn.'],
  ],

  gotchas: [
    'To move, you must **rule** the clearing you leave **or** the one you enter.',
    'Battle: roll 2 dice; the **attacker takes the higher**, the defender the lower. Hits are capped by your warriors in the clearing.',
    'Removing an enemy building or token scores **1 VP**; removing warriors scores nothing (except the Vagabond vs a hostile faction).',
  ],

  extended: [
    { title: 'Marquise de Cat: industry', items: [
      '**Birdsong**: place 1 {=wood} at every {=sawmill}. Building spends wood from clearings connected to the site through clearings you rule.',
      '**Daylight**: 3 actions (+1 per bird card spent): battle, march (two moves), recruit (1 warrior per {=recruiter}, once per turn), build, or overwork (spend a card matching a {=sawmill} clearing for 1 extra {=wood} there).',
      'Each building track costs more {=wood} (0-1-2-3-3-4) and scores more VP. {workshop}s are your crafting pieces; uncovering {=recruiter} spaces adds card draw.',
      'The **Keep** stops other factions placing pieces in its clearing. **Field hospitals**: when Cat warriors are removed, spend a matching card to return them to the Keep.',
    ] },
    { title: 'Eyrie Dynasties: the Decree', items: [
      'Birdsong: add 1–2 cards to the Decree’s four columns (**Recruit, Move, Battle, Build**); at most one may be a {=bird} card. Empty hand: draw 1 first. No roosts on the map: place a {=roost} and 3 warriors in a clearing with the fewest warriors.',
      'Daylight: resolve every card left to right, each in a clearing of its suit ({=bird} = any). If you can’t, you fall into **Turmoil**: lose 1 VP per bird card in the Decree, discard it (except the leader’s loyal viziers), choose a new leader.',
      'Evening: score VP from the {=roost} track; more roosts = more VP each turn. Roosts are your only buildings.',
      'Lords of the Forest: the Eyrie win ties for rule if they have a piece there.',
    ] },
    { title: 'Woodland Alliance: sympathy & revolt', items: [
      'Spread {=sympathy} by paying supporters (cards) matching the clearing; each token scores more VP from the track. It costs 1 more where another faction has 3+ warriors (martial law).',
      '**Outrage**: anyone who removes {=sympathy} or moves warriors into a sympathetic clearing must add a matching card from hand to your supporters; if they can’t, they show their hand and you add the top deck card to your supporters.',
      'Birdsong: **revolt** by spending 2 matching supporters at a sympathetic clearing: remove all enemy pieces there, build a {=base}, place warriors.',
      '**Guerrilla war**: when defending, the Alliance use the higher die. Officers set how many Evening operations (move, battle, recruit, organize) you get.',
    ] },
    { title: 'Vagabond: items & relationships', items: [
      'Every action exhausts an {=item}: boots move, sword battles, crossbow strikes, torch explores ruins (for items), hammer repairs, tea refreshes more. Damaged items can’t be used.',
      '**Aid** a faction by giving it a card: relationships climb from indifferent to allied, scoring VP. Once allied, you can move and battle with their warriors.',
      'Remove a faction’s warrior and it turns **hostile**: from then on +1 extra VP per piece of theirs you remove in battle on your turn (Infamy), but entering a clearing with their warriors costs an extra boot.',
      '**Quests** need two specific items; complete one for 2 cards or VP.',
    ] },
    { title: 'Crafting & items', items: [
      'Activate crafting pieces matching the card’s suits: {=workshop} Cats, {=roost} Eyrie, {=sympathy} Alliance, hammers for the Vagabond.',
      'Item cards score their printed VP and take an {=item} from the shared supply; if that item is gone, you can’t craft the card.',
      'Persistent effect cards (e.g. Royal Claim, Sappers, Better Burrow Bank) stay in front of you. Eyrie score only 1 VP per crafted item.',
    ] },
    { title: 'Battle in full', items: [
      'Attacker takes the higher die, defender the lower. Hits are capped by each side’s warriors in the clearing.',
      '**Defenseless** defender (no warriors) takes +1 hit. An ambush card (matching suit) deals 2 hits before the roll; the attacker can cancel it with their own ambush.',
      'Each side chooses which of its pieces to remove: warriors first, then buildings or tokens.',
    ] },
    { title: 'Dominance cards', text: 'The deck has four suited Dominance cards. A player with **10+ VP** can play one in Daylight and remove their score marker: they now win only by ruling 3 clearings of that suit (bird: 2 opposite corners) at the **start** of their Birdsong. An activated card stays put. A Dominance card spent for its suit goes face up beside the map; in Daylight anyone may take it into hand by spending a matching card. Removed in 2-player games. The Vagabond (4+ players only) instead forms a coalition with the lowest-scoring player and wins with them.' },
  ],

  tips: [
    'Read every faction board first: you need to know how each rival scores.',
    'Attack whoever is pulling ahead; the Alliance and Vagabond are easy to underestimate.',
    'Craft early: item VP and card effects add up.',
  ],

  walk(A) {
    const C = A.C, CAT = '#e07b2e', EY = '#2f6db5';
    const L = [70, 76], M = [160, 148], R = [252, 76];
    const I = this.icons, ic = (k, x, y, sz) => A.use(I[k].draw(A), x - sz / 2, y - sz / 2, sz);
    const clearing = ([x, y], s, name) => A.circle(x, y, 30, '#f3ead2', { stroke: '#5a4630', sw: 1.8 }) +
      ic(s, x - 23, y - 23, 17) + A.text(x, y + 38, name, { size: 8, fill: '#3e4a2a' });
    let board = A.bg('#cfe0a8') + `<ellipse cx="160" cy="70" rx="44" ry="24" fill="#8fb36a"/><ellipse cx="40" cy="165" rx="30" ry="18" fill="#8fb36a"/>`;
    board += A.line(...L, ...R, { stroke: '#f3ead2', sw: 6 }) + A.line(...L, ...M, { stroke: '#f3ead2', sw: 6 }) + A.line(...M, ...R, { stroke: '#f3ead2', sw: 6 });
    board += clearing(L, 'fox', 'fox') + clearing(M, 'rabbit', 'rabbit') + clearing(R, 'mouse', 'mouse');
    const bld = (x, y, k) => ic(k, x, y, 17);
    const war = (x, y, f) => ic(f === CAT ? 'cat' : 'eyrie', x, y - 0.4, 17);
    const wood = (x, y) => ic('wood', x, y, 12);
    board += bld(L[0] - 10, L[1] - 12, 'sawmill') + bld(M[0] - 10, M[1] - 10, 'sawmill');
    board += A.rect(M[0] + 3, M[1] - 17, 14, 14, 'none', { rx: 2, sw: 1, dash: '2 2' });
    const vp = (n) => A.k('vp', A.tag(46, 14, 'Cats ' + n + ' VP', { fill: CAT }));
    const eyTag = A.tag(276, 14, 'Eyrie', { fill: EY });
    const catW = (i, at) => A.k('cw' + i, war(at === L ? L[0] - 17 + i * 11 : R[0] - 20 + i * 11, at === L ? L[1] + 12 : R[1] + 14, CAT));
    const cats = (at, n = 4) => [0, 1, 2, 3].slice(4 - n).map(i => catW(i, at)).join('');
    const eyrie = A.k('ew0', war(R[0] - 6, R[1] - 10, EY)) + A.k('ew1', war(R[0] + 6, R[1] - 10, EY)) + A.k('roost', bld(R[0] + 18, R[1] - 6, 'roost'));
    const woodL = A.k('wood1', wood(L[0] + 10, L[1] - 12)), woodM = A.k('wood2', wood(M[0] - 10, M[1] + 6));
    const ws = A.k('ws', bld(M[0] + 10, M[1] - 10, 'workshop'));
    const hand = (n) => [0, 1, 2, 3].slice(0, n).map(i => A.k('c' + i, A.card(234 + i * 14, 156, 22, 32, ['#e7a08f', '#f0d98a', '#f0b98a', '#a9c7e8'][i]))).join('');
    const dice = (a, b) => A.k('dice', A.die(110, 8, 20, a, '#fff6e6') + A.die(136, 8, 20, b, '#fff6e6'));
    const base = board + eyTag;
    return [
      { step: 0, say: '**Birdsong.** The Cats place 1 {=wood} at each {sawmill}.',
        svg: base + vp(10) + cats(L) + eyrie + woodL + woodM + hand(3) + A.glow(L[0] + 10, L[1] - 12, 10, 'g1') + A.glow(M[0] - 10, M[1] + 6, 10, 'g2') },
      { step: 1, say: '**Daylight**, action 1: spend 1 {=wood} to build a 2nd {workshop}: **+2** {=vp}.',
        svg: base + vp(12) + cats(L) + eyrie + woodL + ws + hand(3) + A.glow(M[0] + 10, M[1] - 10, 13, 'g-ws') },
      { step: 1, say: 'Action 2: **march** 4 {=cat} from the {=fox} clearing (they rule it) into the Eyrie’s {=mouse} clearing.',
        svg: base + vp(12) + cats(R) + eyrie + woodL + ws + hand(3) + A.arrow(104, 70, 214, 70, { stroke: CAT, sw: 2, dash: '4 3' }) },
      { step: 1, say: 'Action 3: **battle**. Dice: **3** and **1**. The attacker takes the higher: Cats deal 3 hits, Eyrie deal 1.',
        svg: base + vp(12) + cats(R) + eyrie + woodL + ws + hand(3) + dice(3, 1) + A.text(120, 36, 'Cats', { size: 7, fill: CAT }) + A.text(146, 36, 'Eyrie', { size: 7, fill: EY }) + A.glow(R[0], R[1], 34, 'g-r') },
      { step: 1, say: 'The Eyrie lose both {=eyrie}, then the {roost} (+1 {=vp}). The Cats lose 1 {=cat}.',
        svg: base + vp(13) + cats(R, 3) + woodL + ws + hand(3) + dice(3, 1) },
      { step: 2, say: '**Evening.** Draw 1 card (more if the recruiter track shows a bonus); discard down to 5.',
        svg: base + vp(13) + cats(R, 3) + woodL + ws + hand(4) + A.glow(276, 170, 24, 'g-hand') + A.tag(262, 140, 'Cats’ hand', { fill: CAT }) },
    ];
  },

  art(A) {
    const C = A.C;
    const I = this.icons, ic = (k, x, y, sz) => A.use(I[k].draw(A), x - sz / 2, y - sz / 2, sz);
    const suit = { f: 'fox', r: 'rabbit', m: 'mouse' };
    let o = A.bg('#cfe0a8');
    // forest patches
    const blobs = [[85, 70, 34, 22], [180, 60, 40, 22], [160, 135, 40, 24], [255, 110, 30, 24], [60, 140, 26, 18]];
    for (const [x, y, rx, ry] of blobs) o += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#8fb36a" stroke="none"/>`;
    // river
    o += A.path('M0 92 Q60 96 100 110 T200 104 T320 128', { stroke: '#6fb2d8', sw: 7 });
    const N = { a: [36, 42, 'f'], b: [130, 40, 'm'], c: [232, 42, 'r'], d: [294, 84, 'm'], e: [30, 104, 'r'], f: [118, 100, 'f'], g: [204, 100, 'm'], h: [292, 150, 'f'], i: [42, 160, 'm'], j: [130, 160, 'r'], k: [222, 160, 'f'] };
    const E = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'e'], ['a', 'f'], ['b', 'f'], ['c', 'g'], ['d', 'g'], ['d', 'h'], ['e', 'f'], ['f', 'g'], ['e', 'i'], ['i', 'j'], ['f', 'j'], ['g', 'k'], ['j', 'k'], ['k', 'h']];
    for (const [p, q] of E) o += A.line(N[p][0], N[p][1], N[q][0], N[q][1], { stroke: '#f3ead2', sw: 4 });
    for (const k in N) { const [x, y, sft] = N[k]; o += A.circle(x, y, 16, '#f3ead2', { stroke: '#5a4630', sw: 1.6 }) + ic(suit[sft], x - 12, y - 12, 11); }
    const bld = (x, y, k) => ic(k, x, y, 12);
    const war = (x, y, f) => ic(f === '#e07b2e' ? 'cat' : 'eyrie', x, y, 12.5);
    // Cats (orange) west
    o += bld(N.a[0] - 4, N.a[1] + 2, 'sawmill') + bld(N.a[0] + 7, N.a[1] + 2, 'workshop') + war(N.e[0] - 5, N.e[1] + 2, '#e07b2e') + war(N.e[0] + 5, N.e[1] + 2, '#e07b2e');
    o += war(N.f[0] - 5, N.f[1] + 2, '#e07b2e') + war(N.f[0] + 5, N.f[1] + 2, '#e07b2e') + bld(N.i[0] + 3, N.i[1] + 2, 'recruiter');
    // Eyrie (blue) east
    o += bld(N.d[0] + 2, N.d[1] + 2, 'roost') + war(N.g[0] - 5, N.g[1] + 2, '#2f6db5') + war(N.g[0] + 5, N.g[1] + 2, '#2f6db5') + war(N.c[0], N.c[1] + 2, '#2f6db5');
    // Alliance sympathy (green tokens)
    o += ic('sympathy', N.j[0] + 2, N.j[1] + 2, 13) + ic('sympathy', N.k[0] + 2, N.k[1] + 2, 13);
    // Vagabond
    o += ic('vagabond', N.b[0] + 2, N.b[1] - 1, 16);
    o += A.note(N.a[0] - 12, N.a[1] - 12, 74, 11, 'Clearing suit: fox');
    o += A.note(N.f[0] + 5, N.f[1] - 5, 176, 130, 'Cat warriors');
    o += A.note(N.d[0] + 2, N.d[1] - 3, 280, 11, 'Eyrie roost');
    o += A.note(N.k[0] + 2, N.k[1] + 2, 230, 192, 'Alliance sympathy');
    return o;
  },
});
