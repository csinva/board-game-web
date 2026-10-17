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
      { verb: 'Birdsong', text: 'Do your faction’s start-of-turn steps, e.g. Cats place {=wood} at each {sawmill}, Eyrie add cards to the **Decree**, Alliance may revolt.' },
      { verb: 'Daylight', text: 'Your main actions, as your faction board lists them: usually **craft** cards first, then move, battle, recruit and build.' },
      { verb: 'Evening', text: 'Do your faction’s end-of-turn steps (some factions score here), **draw 1** {=card} (more if your faction board shows a draw bonus), then discard down to **5** cards.' },
    ],
  },

  tension: 'Each faction grows fastest when left alone, so you must choose when to attack the leader and when to let someone else pay for it.',

  structure: [
    { label: 'Setup', text: 'Deal 3 cards to each player. Factions set up one at a time in this order: Cats, Eyrie, Alliance, Vagabond.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn: Birdsong, Daylight, Evening, following your faction board.' },
    { label: 'Game end', text: 'The moment a player reaches **30 VP**, or when a player with an activated Dominance card meets its condition at the start of their Birdsong.' },
  ],

  points: [
    ['Faction track', 'Cats: VP for each building placed. Eyrie: VP each Evening, more for more {roost}s on the map. Alliance: VP for each {=sympathy} placed. Vagabond: VP for aiding factions, completing quests, and 1 VP for each piece of a hostile faction removed in battle.'],
    ['Removing pieces', 'Any player: +1 VP for each enemy building or token they remove (warriors score nothing)'],
    ['{=item} Crafting', 'Craft an item card: score the VP printed on it (Eyrie score only 1 VP per item)'],
  ],

  end: { trigger: 'someone reaches 30 VP', detail: 'Alternative: a player with 10+ VP may activate a Dominance card, giving up their score; from then on they win only by ruling the clearings it names at the start of their Birdsong (see Dominance cards).' },
  scoring: [
    { label: 'Faction engine', share: 6 },
    { label: 'Battles', share: 2 },
    { label: '{=item} Crafted items', share: 2 },
  ],

  ref: {
    title: 'Suits and base factions',
    rows: [
      ['Suits', '{=fox} {=rabbit} {=mouse} on clearings and cards; a {=bird} card can be spent as any suit'],
      ['{=cat} Marquise de Cat', 'Spend {wood} to build {=sawmill}{=workshop}{=recruiter}; score per building.'],
      ['{=eyrie} Eyrie Dynasties', 'Build {roost}s. Add cards to the **Decree** every turn and carry out all of it; if they can’t, they fall into Turmoil.'],
      ['{=alliance} Woodland Alliance', 'Spread {=sympathy} tokens, then revolt to build {base}s.'],
      ['{=vagabond} Vagabond', 'One pawn. Exhausts {=item} items to move, explore ruins, complete quests, and aid or attack any faction.'],
    ],
  },

  example: 'Cats’ Daylight, 3 actions. 1: spend 1 {=wood} to build a 2nd {workshop} (+2 {=vp}). 2: march, moving 4 {=cat} from a {fox} clearing the Cats rule into a {mouse} clearing. 3: battle the Eyrie there. The dice show 3 and 1. The attacker deals hits equal to the higher die, so the Eyrie lose 3 pieces (2 {=eyrie}, then the {roost}), and the Eyrie deal 1 hit, so the Cats lose 1 {=cat}. Removing the roost scores the Cats **1 VP**.',

  setup: [
    'Lay out the board, ruins and item supply. With 2 players, remove the 4 Dominance cards from the deck. Shuffle the deck and deal 3 cards to each player.',
    'Suggested factions: Cats vs Eyrie with 2 players; add the Alliance with 3 players and the Vagabond with 4. Pick the first player at random; turns then go clockwise.',
    'Each faction sets up in this order (Cats, Eyrie, Alliance, Vagabond), following the steps printed on the back of its faction board.',
  ],

  terms: [
    ['Clearing', 'A space on the map, marked {fox}, {rabbit} or {mouse}. A {=bird} bird card can be spent as any suit.'],
    ['Rule', 'You rule a clearing if you have the most warriors plus buildings there. Tokens and the Vagabond pawn do not count. If players tie, **no one** rules it (Eyrie exception: Lords of the Forest). You need rule to build there, and to move (see Rules people miss).'],
    ['{=item} Craft', 'Play a card from your hand by activating 1 of your crafting pieces ({=workshop}{=roost}{=sympathy}) in a clearing of each suit shown in its cost. Item cards score {=vp}.'],
    ['Defenseless', 'The defender has no warriors in the battle clearing, so the attacker deals 1 extra hit.'],
    ['Decree', 'The Eyrie’s row of cards, each one an action the Eyrie must take every Daylight; it grows every turn.'],
  ],

  gotchas: [
    'To move, you must **rule** the clearing you leave, the one you enter, or both.',
    'Battle: roll 2 dice. The **attacker deals hits equal to the higher** die, the defender hits equal to the lower. Each side deals at most as many hits as it has warriors in the clearing.',
    'Removing an enemy building or token scores **1 VP**; removing warriors scores nothing (exception: the Vagabond scores for warriors of a hostile faction).',
  ],

  extended: [
    { title: 'Marquise de Cat: industry', items: [
      '**Birdsong**: place 1 {=wood} at every {=sawmill}. To build, spend wood that is in the building’s clearing or in clearings connected to it through a chain of clearings you rule.',
      '**Daylight**: first you may craft by activating {workshop}s. Then take up to 3 actions, plus 1 more for each bird card you spend. Each action is one of: battle; march (up to 2 moves); recruit (place 1 warrior at each {=recruiter}; once per turn); build; overwork (spend a card matching a {=sawmill}’s clearing to place 1 extra {=wood} there).',
      'Each building type has its own track. Building costs rise along it (0, 1, 2, 3, 3, 4 {=wood}) and each later building scores more VP. {workshop}s are your crafting pieces. Building {recruiter}s uncovers track spaces that make you draw extra cards in Evening.',
      'The **Keep** stops other factions placing pieces in its clearing. **Field hospitals**: whenever Cat warriors are removed, you may spend a card matching their clearing to place them in the Keep’s clearing.',
    ] },
    { title: 'Eyrie Dynasties: the Decree', items: [
      'Birdsong: you must add 1 or 2 cards from your hand to the Decree’s four columns (**Recruit, Move, Battle, Build**); at most 1 of them may be a {=bird} card. If your hand is empty, draw 1 card first. If you have no roosts on the map, place a {=roost} and 3 warriors in a clearing with the fewest warriors where all 4 pieces can be placed.',
      'Daylight: carry out every Decree card, column by column from left to right; each card’s action must happen in a clearing of that card’s suit (a {=bird} card: any clearing). If you can’t carry out one, you fall into **Turmoil**: lose 1 VP per bird card in the Decree, discard every Decree card except your leader’s 2 loyal viziers (the bird cards it starts with), and choose a new leader.',
      'Evening: score the VP shown on the {=roost} track; the more roosts you have on the map, the more VP each turn. Roosts are your only buildings.',
      'Lords of the Forest: when the Eyrie are tied for rule of a clearing, they rule it if they have at least 1 piece there.',
    ] },
    { title: 'Woodland Alliance: sympathy & revolt', items: [
      '**Supporters** are cards in a stack on the Alliance board, separate from its hand. To spread {=sympathy}, spend supporters matching the clearing’s suit (the track shows how many) and place a token there; each token scores the VP shown on the track. **Martial law**: it costs 1 more supporter where another player has 3+ warriors.',
      '**Outrage**: when another player removes a {=sympathy} token, or moves warriors into a clearing that has one, they must give the Alliance a card from their hand matching that clearing, which goes to the supporters. If they have none, they show the Alliance their hand and the Alliance adds the top card of the deck to its supporters.',
      'Birdsong: the Alliance may **revolt** in a clearing with a {=sympathy} token by spending 2 supporters of its suit. Remove all enemy pieces there, place the {=base} of that suit, place warriors there equal to the number of {=sympathy} clearings of that suit, and put 1 warrior in the Officers box.',
      '**Guerrilla war**: when the Alliance defends, it deals hits equal to the higher die and the attacker the lower. **Officers** are warriors kept on the Alliance board; in Evening the Alliance gets 1 operation (move, battle, recruit or organize) per officer.',
    ] },
    { title: 'Vagabond: items & relationships', items: [
      'Each action **exhausts** (turns face down) 1 {=item} of the right type: boots to move, sword to battle, crossbow to strike (remove 1 enemy piece without dice), torch to explore a ruin (taking the item in it), hammer to repair a damaged item. Birdsong **refresh**: turn 2 exhausted items face up per face-up tea on your track, then 3 more. Damaged items can’t be used until repaired.',
      '**Aid**: exhaust any 1 item and give a card matching your clearing’s suit to a player with a piece in your clearing; you may then take 1 item from their crafted items. Each aid moves your relationship with them one step up the track, from indifferent toward allied, and scores VP. Once allied, you may move and battle together with their warriors.',
      'If you remove a faction’s warrior, that faction becomes **hostile** for the rest of the game. **Infamy**: from then on you score 1 extra VP for each of their pieces you remove in battle on your turn. Moving into a clearing with their warriors costs 1 extra boot.',
      '**Quests**: in a clearing matching a face-up quest’s suit, exhaust the 2 items it shows to complete it. Then either draw 2 cards or score 1 VP per quest of that suit you have completed (this one included).',
    ] },
    { title: 'Crafting & items', items: [
      'Activate 1 crafting piece in a clearing of each suit in the card’s cost: {=workshop} for Cats, {=roost} for Eyrie, {=sympathy} for Alliance. The Vagabond exhausts 1 hammer per suit symbol in the cost; his hammers count as the suit of his clearing.',
      'Crafting an item card scores its printed VP and takes the matching {=item} from the shared supply; if that item is gone, you can’t craft the card.',
      'Persistent effect cards (e.g. Royal Claim, Sappers, Better Burrow Bank) stay face up in front of you after crafting. Eyrie score only 1 VP per crafted item.',
    ] },
    { title: 'Battle in full', items: [
      'The attacker deals hits equal to the higher die, the defender hits equal to the lower. Each side deals at most as many hits as it has warriors in the clearing.',
      'A **defenseless** defender (no warriors in the clearing) takes 1 extra hit. Before the roll, the defender may play an ambush card matching the clearing to deal 2 hits at once; the attacker may cancel it by playing a matching ambush card of their own.',
      'Each player removes their own pieces for hits taken: warriors first, then, once no warriors are left, the buildings or tokens of their choice.',
    ] },
    { title: 'Dominance cards', text: 'The deck has 4 Dominance cards, one per suit. A player with **10+ VP** may play one face up in Daylight and remove their score marker from the track. From then on they win only if they rule 3 clearings of that suit (bird Dominance: 2 clearings in opposite corners of the map) at the **start** of their Birdsong. The activated card stays in front of them for the rest of the game. A Dominance card spent for its suit (instead of activated) goes face up beside the map; in Daylight, any player may take it into hand by spending a card of its suit. Dominance cards are removed in 2-player games. The Vagabond (only with 4+ players) may instead play one to form a coalition with the player with the lowest score, and wins only if that player wins.' },
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
