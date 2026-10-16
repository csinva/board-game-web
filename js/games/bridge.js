{
// Bidding-box card in a 24×24 icon box (the walkthrough's auction uses the same boxes).
const box = (A, fill, label, col, size = 11) => A.rect(1, 4.5, 22, 15, fill, { rx: 2.5, sw: 1.3 }) + A.text(12, 12.4, label, { size, weight: 800, fill: col });

defineGame({
  id: 'bridge',
  name: 'Contract Bridge',
  year: 1925,
  designer: 'Harold Vanderbilt (contract scoring)',
  family: 'trick',
  players: [4, 4], best: '4',
  time: [60, 120],
  age: 12,
  mechanics: ['trick-taking', 'auction', 'team', 'limited-communication', 'hand-management', 'deduction'],
  profile: { complexity: 4, luck: 2, interaction: 4, conflict: 2, talk: 1, planning: 4 },

  icons: {
    nt: { name: 'notrump', draw: A => box(A, '#fff', 'NT', '#2a2420') },
    pass: { name: 'pass', draw: A => box(A, '#3c8d4f', 'Pass', '#fff', 9) },
    dbl: { name: 'double', draw: A => box(A, '#c8423b', 'X', '#fff', 12) },
    rdbl: { name: 'redouble', draw: A => box(A, '#2f6db5', 'XX', '#fff', 11) },
    dummy: { name: 'dummy', draw: A => [0, 1, 2, 3].map(c => [0, 1, 2].map(j => A.rect(1.5 + c * 5.4, 2 + j * 6, 5, 9, '#fff', { rx: 1, sw: 0.9 })).join('') +
      A.circle(4 + c * 5.4, 18.5, 1.7, c === 1 || c === 2 ? '#c8423b' : '#2a2420', { sw: 0 })).join('') },
  },

  pitch: 'Partners bid for the right to name trump; declarer then plays both hands to make the contract. First to 2 games wins.',

  goal: { big: 'Win the rubber', text: 'First side to win **2 games** takes the rubber. A game is **100 points below the line**, scored only from contracts bid and made.' },

  turn: {
    type: 'round',
    intro: 'Each deal goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'Deal all 52 cards: **13** each.' },
      { verb: 'Bid', text: 'Dealer first, clockwise: bid a level and strain (1{=club} up to 7{=nt}), {pass}, {dbl} or {rdbl}. Each bid must outrank the last; **3 passes** in a row after a bid end the auction.' },
      { verb: 'Lead & dummy', text: 'The player left of the **declarer** leads; then declarer’s partner lays their hand face up as {=dummy} **dummy**.' },
      { verb: 'Play tricks', text: 'Follow suit if you can. Highest trump wins, else highest card of the suit led. The winner leads next. Declarer plays dummy’s cards too.' },
      { verb: 'Score', text: 'Made: trick points below the line. Down: defenders score a penalty above the line.' },
    ],
  },

  tension: 'Bids are your only way to describe your hand, so each one is both a message and a promise: stop too low and you miss game, go too high and you go down.',

  structure: [
    { label: 'Deals', repeat: 'until a rubber', text: 'Deal 13 each, auction, play 13 tricks, score above or below the line. If all 4 pass at once, redeal. Deal passes clockwise.' },
    { label: 'Game', text: '100+ below the line wins a game. Draw a new line: part-scores below it no longer count toward the next game.' },
    { label: 'Rubber', text: 'First side to win **2 games** gets the rubber bonus. Then total everything; higher wins.' },
  ],

  points: [
    ['Per trick bid {=club} {=diamond}', '20 below the line'],
    ['Per trick bid {=heart} {=spade}', '30 below the line'],
    ['Per trick bid {=nt}', '40 for the first, 30 each after'],
    ['Overtrick', 'same rate, above the line'],
    ['Undertrick', '50 each to defenders (100 vulnerable), above'],
    ['Slam / rubber', 'slam 500–1500; rubber +700 (2–0) or +500 (2–1)'],
  ],

  end: { trigger: 'one side wins two games (a rubber)', detail: 'Then total all points above and below the line; the higher total wins, usually the side that took the rubber.' },
  scoring: [
    { label: 'Contract tricks', share: 4 },
    { label: 'Rubber bonus', share: 3 },
    { label: 'Overtricks & penalties', share: 2 },
    { label: 'Slam bonuses', share: 1 },
  ],

  ref: {
    title: 'Bidding',
    rows: [
      ['Bid ladder', '1{=club} 1{=diamond} 1{=heart} 1{=spade} 1{=nt} 2{=club} … 7{=nt} (higher level, or same level and higher strain)'],
      ['Contract', 'level + 6 tricks: 4{=heart} = 10 tricks'],
      ['Other calls', '{pass} · {dbl} an opponent’s bid · {rdbl} an opponent’s double'],
      ['Game contracts', '3{=nt} · 4{=heart} 4{=spade} · 5{=club} 5{=diamond}'],
      ['Hand value', 'A 4 · K 3 · Q 2 · J 1; open with 12+'],
    ],
  },

  example: 'South opens **1{=heart}**, North raises to **4{=heart}**, and all pass. South is declarer: West leads, then North lays her hand face up as {=dummy} dummy. South takes 11 tricks: 4 × 30 = **120** below the line (a game) plus 30 above for the overtrick.',

  setup: [
    'Partners sit across: North–South against East–West. Deal 13 cards each.',
    'Score pad: a WE and a THEY column, with a horizontal line across the middle.',
    'The deal passes clockwise after each hand.',
  ],

  terms: [
    ['Strain', 'The trump suit named in a bid, or {=nt} notrump.'],
    ['Declarer', 'Plays the contract: whoever on the winning side first named its strain.'],
    ['{=dummy} Dummy', 'Declarer’s partner: lays cards face up and takes no part in the play.'],
    ['Vulnerable', 'A side that has won a game: bigger bonuses and bigger penalties.'],
    ['High-card points', 'A = 4, K = 3, Q = 2, J = 1 (40 in the deck). A quick hand count.'],
  ],

  gotchas: [
    'Declarer is whoever **first** named the final strain for their side, not whoever made the last bid.',
    'Going down costs **50** a trick (100 if vulnerable), more when doubled, scored above the line for the defenders.',
    'Only tricks you **bid** count toward game; overtricks go above the line. Part-scores below the line add up toward game.',
  ],

  tips: [
    'Open with 12+ high-card points. Partners with ~25 together should reach game: 3{=nt}, 4{=heart} or 4{=spade}.',
    'Look for an **8-card fit** in {=heart} or {=spade}; it is usually the safest trump suit.',
    'As declarer, before trick one: count sure winners and plan where the rest come from.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', trim = '#c9a96e', ic = this.icons;
    const face = (x, y, r, s, w = 28, h = 40) => {
      const col = (s === '♥' || s === '♦') ? R : C.ink;
      return A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, w, h, '#fff', { rx: 4, sw: 1.2 }) +
        A.text(x + 7.5, y + 8, r, { size: 9.5, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 4, s, { size: w * 0.6, fill: col });
    };
    const back = (x, y) => A.rect(x, y, 20, 28, '#24305e', { rx: 3, sw: 1, stroke: '#eae2cf' }) + A.rect(x + 3, y + 3, 14, 22, 'none', { rx: 1, sw: 0.6, stroke: trim });
    // Bidding cards: Pass is the pass icon; level bids use the same box shape.
    const k = 30 / 22;
    const bid = (x, y, t) => t === 'P' ? A.use(ic.pass.draw(A), x - k, y - 4.5 * k, 24 * k)
      : A.rect(x, y, 30, 20, '#fff', { rx: 3, sw: 1.2 }) + A.text(x + 15, y + 10, t, { size: 11, weight: 800, fill: t.includes('♥') ? R : C.ink });
    let board = A.bg('#3d1424') + A.rect(5, 5, 310, 190, '#6b2737', { rx: 18, sw: 2, stroke: trim });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 72) + back(272 + i * 6, 72);
    board += A.tag(38, 60, 'West') + A.tag(284, 60, 'East') + A.tag(34, 182, 'South');
    const northBacks = A.k('nb', [0, 1, 2, 3].map(i => back(136 + i * 7, 10)).join('') + A.tag(92, 24, 'North'));
    const dummyCols = [['♠', ['A', 'Q', '7']], ['♥', ['K', 'J', '9', '4']], ['♦', ['8', '5']], ['♣', ['A', '10', '6', '3']]];
    const dummy = (skipAS) => A.k('dum', A.tag(58, 24, 'North: dummy')) + dummyCols.map(([s, rs], c) => rs.map((r, j) => (skipAS && s === '♠' && r === 'A') ? '' : A.k('d' + r + s, face(114 + c * 34, 8 + j * 10, r, s, 26, 32))).join('')).join('');
    const hand = (skip) => [['J', '♠'], ['4', '♠'], ['A', '♥'], ['Q', '♥'], ['10', '♥'], ['7', '♥'], ['K', '♦']].filter(([r, s]) => r + s !== skip)
      .map(([r, s], i, a) => A.k('s' + r + s, face(178 - a.length * 15 + i * 30, 152, r, s))).join('');
    const bids = (list) => list.map((t, i) => A.k('bid' + i, bid(64 + (i % 4) * 34 + 18, 66 + Math.floor(i / 4) * 26, t))).join('') +
      ['S', 'W', 'N', 'E'].map((n, i) => A.k('bh' + i, A.text(97 + i * 34, 56, n, { size: 8, weight: 800, fill: '#f3e3c3' }))).join('');
    const lead = A.k('lead', face(112, 88, 'K', '♠'));
    const pile = A.k('pile', A.rect(222, 112, 30, 40, '#fff', { rx: 4, sw: 1.2 }) + A.rect(226, 116, 30, 40, '#fff', { rx: 4, sw: 1.2 }) + A.text(241, 136, '11', { size: 14, weight: 800 }));
    const pad = A.k('pad', A.rect(104, 80, 112, 84, '#f8f1e0', { rx: 3, sw: 1.2 }) + A.text(132, 90, 'WE', { size: 8, weight: 800, fill: '#6b2737' }) + A.text(188, 90, 'THEY', { size: 8, weight: 800, fill: '#6b2737' }) +
      A.line(160, 84, 160, 160, { sw: 0.8 }) + A.line(106, 124, 214, 124, { sw: 1.8 }) + A.text(132, 110, '30', { size: 11, weight: 800 }) + A.text(132, 142, '120', { size: 13, weight: 800, fill: R }));
    return [
      { step: 0, say: 'Deal 13 each. You are **South**; North, across, is your partner.', svg: board + northBacks + hand() },
      { step: 1, say: 'You open **1{=heart}**: “12+ points and at least 5 hearts.”', svg: board + northBacks + hand() + bids(['1♥']) },
      { step: 1, say: 'West {=pass}, North jumps to **4{=heart}**, then 3 passes end the auction. Contract 4{=heart}: **10 tricks**.', svg: board + northBacks + hand() + bids(['1♥', 'P', '4♥', 'P', 'P', 'P']) + A.glow(165, 76, 20) },
      { step: 2, say: 'You named hearts first, so you are **declarer**. West, on your left, leads K{=spade}.', svg: board + northBacks + hand() + lead },
      { step: 2, say: 'North lays her cards **face up**, sorted by suit: the {dummy}. You play her cards too.', svg: board + dummy() + hand() + lead + A.glow(171, 42, 46) },
      { step: 3, say: 'You play dummy’s **A{=spade}**, East 3{=spade}, you 4{=spade}. The ace wins.', svg: board + dummy(true) + hand('4♠') + lead + A.k('dA♠', face(146, 74, 'A', '♠')) + A.k('e3', face(180, 88, '3', '♠')) + A.k('s4♠', face(146, 104, '4', '♠')) + A.glow(160, 94, 26) },
      { step: 4, say: 'You take **11**. Bid 4{=heart} = 4 × 30 = **120** below the line: a game. The overtrick scores 30 above.', svg: board + dummy(true) + pile + pad },
    ];
  },

  extended: [
    { title: 'Valuing a hand', text: 'Count high-card points (A 4, K 3, Q 2, J 1). Add 1 for each card over four in a long suit. With 12–13+ you usually open; partners with about 25 between them belong in game, 33 in a small slam, 37 in a grand slam.' },
    { title: 'Opening bids (a simple standard system)', items: ['**1{=heart} / 1{=spade}**: 12–21 points with 5+ cards in the suit.', '**1{=club} / 1{=diamond}**: 12–21 points without a 5-card major; bid your longer minor.', '**1{=nt}**: 15–17 points, balanced hand (no singleton or void).', '**2{=club}**: 22+ points, artificial and forcing: “partner, don’t pass.”', '{=pass}: under about 12 points.'] },
    { title: 'Responding to partner', items: ['With 6+ points, don’t pass partner’s opening of one in a suit.', 'Raise partner’s major with 3+ card support: to 2 with 6–10, to 4 with a weak hand and many trumps, or show a strong raise.', 'A new suit by responder is **forcing**: opener must bid again.', 'Over 1{=nt}, add your points to 15–17 and place the contract (pass, 2 of a long suit, 3{=nt}, 4 of a major).'] },
    { title: 'Doubles and redoubles', text: 'A {=dbl} double of an opponent’s bid can be for **penalty** (you expect them to go down) or, at a low level, for **takeout** (asking partner to bid their best suit). Doubling doubles the trick score and raises undertrick penalties; a made doubled contract also earns 50 (“for the insult”). The declaring side may {=rdbl} redouble to raise the stakes again.' },
    { title: 'Penalties and bonuses (rubber)', items: ['Undertricks, undoubled: 50 each not vulnerable, 100 each vulnerable.', 'Doubled undertricks, not vulnerable: 100, 200, 200, then 300 each. Vulnerable: 200, then 300 each. Redoubled: twice these.',
      'Made doubled: trick points ×2, overtricks 100 each (200 vulnerable), +50. Redoubled: trick points ×4, overtricks 200 (400), +100.', 'Small slam (12 tricks) bonus: 500, or 750 vulnerable. Grand slam (13): 1000 or 1500.', 'Honors: 4 of the 5 top trumps in one hand scores 100; all 5 (or all 4 aces in {=nt}) scores 150.', 'Unfinished rubber: a side that has won one game scores 300; a side with the only part-score in an unfinished game scores 100.'] },
    { title: 'Declarer play basics', items: ['Before trick one, count sure winners (in NT) or losers (in a suit) and plan how to fix the gap.', '**Draw trumps** early unless you need them to ruff losers in dummy.', '**Finesse**: lead toward a broken honour (e.g. A-Q) hoping the missing king sits in front of it.', 'Establish a long suit by giving up a trick early while you still have control elsewhere.'] },
    { title: 'Rubber vs duplicate', text: 'This sheet teaches rubber bridge, the social form. Clubs and tournaments play **duplicate**: the same deals are replayed at other tables and you are scored against others who held your cards, which removes most of the luck. Each deal is scored on its own with fixed game and part-score bonuses instead of a running rubber.' },
  ],

  art(A) {
    const C = A.C, R = '#c8423b', trim = '#c9a96e', ic = this.icons;
    const pc = (x, y, r, s, o = {}) => {
      const w = o.w || 22, h = o.h || 31, col = (s === '♥' || s === '♦') ? R : C.ink;
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#fff', { rx: 3, sw: 1 }) +
        A.text(x + 6, y + 7, r, { size: 8, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 3, s, { size: 12, fill: col });
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const bk = (x, y, w, h) => A.rect(x, y, w, h, '#24305e', { rx: 2.5, sw: 1, stroke: '#eae2cf' }) + A.rect(x + 3, y + 3, w - 6, h - 6, 'none', { rx: 1, sw: 0.6, stroke: trim });
    let o = A.bg('#3d1424') + A.rect(5, 5, 310, 190, '#6b2737', { rx: 18, sw: 2, stroke: trim });
    // dummy (North) face up in suit columns
    const dummy = [['♠', ['A', 'Q', '7']], ['♥', ['K', 'J', '9', '4']], ['♦', ['8', '5']], ['♣', ['A', '10', '6', '3']]];
    dummy.forEach(([s, ranks], c) => ranks.forEach((r, j) => { o += pc(100 + c * 30, 8 + j * 9, r, s, { w: 24, h: 28 }); }));
    // defenders' hands
    for (let i = 0; i < 6; i++) o += bk(14, 100 + i * 10, 23, 16);
    for (let i = 0; i < 5; i++) o += bk(290, 124 + i * 10, 23, 16);
    // trick: West led, dummy and East followed
    o += pc(122, 88, 'K', '♠', { rot: -8 }) + pc(148, 72, 'A', '♠', { rot: -2 }) + pc(174, 88, '3', '♠', { rot: 7 });
    // declarer's hand
    [['J', '♠'], ['4', '♠'], ['A', '♥'], ['Q', '♥'], ['10', '♥'], ['7', '♥'], ['K', '♦'], ['9', '♦'], ['K', '♣']].forEach(([r, s], i) => { o += pc(86 + i * 16, 146 + Math.abs(i - 4) * 1.2, r, s, { rot: (i - 4) * 2.5 }); });
    // auction record
    o += A.rect(8, 10, 80, 54, '#f8f1e0', { rx: 2, sw: 1, rotate: -3 });
    ['S', 'W', 'N', 'E'].forEach((n, i) => { o += A.text(20 + i * 18, 19, n, { size: 7, weight: 800, fill: '#6b2737' }); });
    [['1♥', 'P', '4♥', 'P'], ['P', 'P', '', '']].forEach((row, j) => row.forEach((b, i) => { o += A.text(20 + i * 18, 33 + j * 13, b, { size: 8, weight: 700, fill: b.includes('♥') ? R : '#555' }); }));
    // rubber score pad
    o += A.rect(240, 10, 72, 72, '#f8f1e0', { rx: 2, sw: 1, rotate: 3 });
    o += A.text(258, 19, 'WE', { size: 7, weight: 800, fill: '#6b2737' }) + A.text(294, 19, 'THEY', { size: 7, weight: 800, fill: '#6b2737' });
    o += A.line(276, 14, 276, 78, { sw: 0.8 }) + A.line(242, 46, 310, 46, { sw: 1.6 });
    o += A.text(258, 36, '30', { size: 8, fill: '#444' }) + A.text(294, 36, '50', { size: 8, fill: '#444' });
    o += A.text(258, 58, '120', { size: 8, fill: '#444' }) + A.text(294, 58, '60', { size: 8, fill: '#444' });
    // bidding box beside the auction: the same cards as the inline icons
    o += A.use(ic.pass.draw(A), 6, 62, 26) + A.use(ic.dbl.draw(A), 32, 62, 26) + A.use(ic.nt.draw(A), 58, 62, 26);
    o += A.note(48, 46, 64, 98, 'Auction sets the contract', { w: 130 });
    o += A.note(212, 58, 202, 134, 'Dummy: face up', { w: 88 });
    o += A.note(259, 64, 266, 104, 'Below line = game', { w: 104 });
    o += A.note(160, 168, 160, 190, 'Declarer plays both hands', { w: 140 });
    return o;
  },
});
}
