defineGame({
  id: 'spades',
  name: 'Spades',
  year: 1930,
  designer: 'Traditional',
  family: 'trick',
  players: [4, 4], best: '4',
  time: [45, 90],
  age: 10,
  mechanics: ['trick-taking', 'team', 'auction', 'hand-management'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 3, talk: 3, planning: 3 },

  pitch: 'Team up, bid how many tricks you will take, then hit it: spades always trump, and extra tricks come back to bite you.',
  theme: 'You and the player across the table are partners who must take the number of tricks you promised together.',

  goal: { big: '500 points', text: 'First team to **500** wins. You score by taking at least as many tricks as your team bid, but not too many more.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'Deal the whole deck: **13 cards** each.' },
      { verb: 'Bid', text: 'Starting left of the dealer, each player says how many tricks they expect (0–13). Partners’ bids **add up** to the team’s contract.' },
      { verb: 'Play tricks', text: 'Left of dealer leads. Follow suit if you can, otherwise play anything. The highest **spade** wins, or else the highest card of the suit led.' },
      { verb: 'Score', text: 'Made it: 10 per trick bid plus 1 per extra trick (a **bag**). Missed it: lose 10 per trick bid.' },
    ],
  },

  tension: 'Bid low and the extra tricks pile up as bags that eventually cost you 100; bid high and you risk losing the whole bid, so late in a hand you must decide whether to take a trick or duck it.',

  flow: [
    { label: 'Bid', items: ['Count sure winners', 'Add partner’s bid', 'Nil if hopeless'] },
    { label: 'Play', items: ['Follow suit', 'Trump with spades', 'Protect a nil partner'] },
    { label: 'Score', items: ['10 × bid if made', '+1 per bag', '10 bags = −100'] },
  ],

  end: { trigger: 'a team reaches 500 points at the end of a hand', detail: 'If both teams pass 500 in the same hand, the higher score wins. Many tables also end the game when a team falls to −200.' },
  scoring: [
    { label: 'Made bids', share: 8 },
    { label: 'Nil bonuses', share: 2 },
    { label: 'Overtricks', share: 1 },
  ],

  ref: {
    title: 'Scoring',
    rows: [
      ['Bid made', '10 × bid, +1 per overtrick (bag)'],
      ['Bid missed', '−10 × bid'],
      ['Nil made', '+100 for the nil bidder’s team'],
      ['Nil failed', '−100 (tricks taken may count as bags)'],
      ['10 bags', '−100, then the bag count drops by 10'],
      ['Blind nil (optional)', '±200, bid before looking'],
    ],
  },

  example: 'Ana bids 4 and her partner Raj bids 3, so their team needs **7**. They take 9 tricks: 70 + 2 bags = 72 points. They already had 9 bags, so they now have 11: they lose **100** and carry 1 bag forward.',

  setup: [
    'Partners sit across from each other; deal all 52 cards, 13 each.',
    'Use a score pad with two columns per team: score and bags.',
    'The deal passes to the left after every hand.',
  ],

  terms: [
    ['Trick', 'One card from each player; highest spade, or else highest of the suit led, wins.'],
    ['Trump', 'Spades: they beat any card of another suit.'],
    ['Bag', 'A trick taken above your team’s bid. Worth 1, but 10 of them cost 100.'],
    ['Nil', 'A bid to take **zero** tricks: +100 if you do, −100 if you don’t.'],
    ['Broken', 'Spades are broken once one has been played on a trick.'],
  ],

  gotchas: [
    'You can’t **lead** spades until they are broken, unless you hold nothing but spades.',
    'You may only trump when you **can’t** follow the suit led.',
    'A nil bidder’s tricks **don’t** help the partner make their bid; the partner still has to make their own number.',
  ],

  tips: [
    'Count aces and kings as tricks, plus extra for long or high spades. Don’t count a queen as a sure trick.',
    'When your partner bids nil, play **high** to win tricks they would otherwise be stuck with.',
    'Once your contract is safe, duck tricks to avoid bags, and push extra tricks on opponents near 10 bags.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', W = 30, H = 42, blue = '#5fa8e8';
    const face = (x, y, r, s, hi) => {
      const col = (s === '♥' || s === '♦') ? R : C.ink;
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fff', { rx: 4, sw: hi ? 2.4 : 1.2, stroke: hi ? '#ffd23f' : C.ink }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: col }) + A.text(x + W / 2 + 1, y + H / 2 + 4, s, { size: 18, fill: col });
    };
    const back = (x, y) => A.rect(x, y, 22, 30, '#1c2b44', { rx: 3, sw: 1.1, stroke: '#dfe6f2' }) + A.text(x + 11, y + 15, '♠', { size: 9, fill: '#8aa4cc' });
    const chip = (x, y, t) => A.circle(x, y, 12, blue, { sw: 1.4, stroke: '#0e1726' }) + A.text(x, y + 0.5, t, { size: 11, weight: 800, fill: '#0e1726' });
    let board = A.bg('#13223a') + A.rect(5, 5, 310, 190, '#1f5384', { rx: 30, sw: 3, stroke: '#0b1526' });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 72) + back(270 + i * 6, 72) + back(130 + i * 8, 10);
    board += A.tag(40, 60, 'Lee') + A.tag(286, 60, 'Jo') + A.tag(76, 24, 'Raj (partner)', { fill: '#0b1526' }) + A.tag(44, 178, 'You (Ana)', { fill: '#0b1526' });
    const hand = (ids, hi) => ids.map(([r, s], i) => A.k('h' + r + s, face(88 + i * 34, 150, r, s, hi && r + s === '3♠'))).join('');
    const full = [['A', '♠'], ['J', '♠'], ['7', '♠'], ['3', '♠'], ['Q', '♣'], ['9', '♦']];
    const rest = full.filter(c => c[1] !== '♠' || c[0] !== '3');
    const anaBid = A.k('bidA', chip(44, 150, '4')), rajBid = A.k('bidR', chip(196, 24, '3'));
    const trick = A.k('t5H', face(102, 80, '5', '♥')) + A.k('tKH', face(145, 50, 'K', '♥')) + A.k('tAH', face(188, 80, 'A', '♥'));
    const pile = (n) => A.k('pile', A.rect(222, 96, 34, 46, '#fff', { rx: 4, sw: 1.2 }) + A.rect(226, 100, 34, 46, '#fff', { rx: 4, sw: 1.2 }) + A.text(243, 123, n, { size: 16, weight: 800 }) + A.text(243, 155, 'tricks', { size: 8, weight: 700, fill: '#e6eef8' }));
    const sheet = A.k('sheet', A.rect(96, 52, 128, 80, '#f7f3e6', { rx: 4, sw: 1.2 }) +
      A.text(160, 66, 'Bid 7, took 9', { size: 9, weight: 700, fill: '#555' }) + A.text(160, 84, '70 + 2 bags = 72', { size: 10, weight: 800 }) +
      A.text(160, 102, 'Bags 9 → 11', { size: 9, weight: 700, fill: '#555' }) + A.text(160, 119, '−100, keep 1 bag', { size: 10, weight: 800, fill: R }));
    return [
      { step: 0, say: 'Deal 13 each. Ana sits across from her partner Raj. She has **four spades** and no hearts.', svg: board + hand(full) },
      { step: 1, say: 'Ana counts the tricks she expects to win and bids **4**.', svg: board + hand(full) + anaBid + A.glow(44, 150, 18) },
      { step: 1, say: 'Raj bids **3**. Partners’ bids add up, so the team needs **7** tricks between them.', svg: board + hand(full) + anaBid + rajBid + A.glow(196, 24, 18) },
      { step: 2, say: 'Lee leads the 5♥ and the others follow with hearts. Ana has **none**, so she trumps with the 3♠ and wins the trick.', svg: board + hand(rest) + anaBid + rajBid + trick + A.k('h3♠', face(145, 100, '3', '♠', true)) + A.glow(160, 121, 28) },
      { step: 2, say: 'After all 13 tricks, Ana and Raj have taken **9**: two more than they bid.', svg: board + anaBid + rajBid + pile('9') + A.glow(241, 121, 34) },
      { step: 3, say: 'They score 70 + 2 bags = **72**. That pushes their bag count from 9 to 11, so they lose **100** and keep 1 bag.', svg: board + anaBid + rajBid + pile('9') + sheet },
    ];
  },

  art(A) {
    const C = A.C, R = '#c8423b', team1 = '#5fa8e8', team2 = '#f0a04b';
    const pc = (x, y, r, s, o = {}) => {
      const w = o.w || 22, h = o.h || 31, col = (s === '♥' || s === '♦') ? R : C.ink;
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#fff', { rx: 3, sw: o.hi ? 2.2 : 1, stroke: o.hi ? '#ffd23f' : C.ink }) +
        A.text(x + 6, y + 7, r, { size: 8, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 3, s, { size: 13, fill: col });
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const bk = (x, y, w, h) => A.rect(x, y, w, h, '#1c2b44', { rx: 2.5, sw: 1, stroke: '#dfe6f2' }) + A.text(x + w / 2, y + h / 2, '♠', { size: 8, fill: '#8aa4cc' });
    const chip = (x, y, t, f) => A.circle(x, y, 10, f, { sw: 1.4, stroke: '#0e1726' }) + A.text(x, y + 0.5, t, { size: t.length > 2 ? 6.5 : 9, weight: 800, fill: '#0e1726' });
    let o = A.bg('#13223a');
    o += A.circle(118, 100, 90, '#1f5384', { sw: 3, stroke: '#0b1526' }) + A.circle(118, 100, 82, 'none', { sw: 1, stroke: '#3c74a8', dash: '3 3' });
    // opponents' and partner's hands
    for (let i = 0; i < 6; i++) o += bk(90 + i * 10, 12, 16, 22);
    for (let i = 0; i < 5; i++) o += bk(30, 66 + i * 10, 22, 16);
    for (let i = 0; i < 5; i++) o += bk(184, 66 + i * 10, 22, 16);
    // bids: N/S blue team, E/W orange team
    o += chip(166, 24, '3', team1) + chip(160, 142, '4', team1) + chip(41, 52, 'NIL', team2) + chip(195, 52, '2', team2);
    // trick: hearts led, South trumps
    o += pc(107, 42, 'K', '♥', { rot: -4 }) + pc(74, 74, '5', '♥', { rot: -9 }) + pc(140, 74, 'A', '♥', { rot: 8 }) + pc(107, 98, '3', '♠', { rot: 3, hi: true });
    // my hand
    [['A', '♠'], ['J', '♠'], ['7', '♠'], ['Q', '♣'], ['9', '♦'], ['6', '♦'], ['2', '♣']].forEach(([r, s], i) => { o += pc(58 + i * 17, 158 + Math.abs(i - 3) * 1.5, r, s, { rot: (i - 3) * 3 }); });
    // score sheet with bag tally
    o += A.rect(238, 8, 76, 64, '#f7f3e6', { rx: 3, sw: 1.2, rotate: 2 });
    o += A.text(257, 19, 'US', { size: 8, weight: 800, fill: '#1f5384' }) + A.text(295, 19, 'THEM', { size: 8, weight: 800, fill: '#a3611f' });
    o += A.line(240, 27, 312, 27, { sw: 0.8 }) + A.line(276, 12, 276, 70, { sw: 0.8 });
    o += A.text(257, 36, '72', { size: 8, fill: '#333' }) + A.text(295, 36, '-40', { size: 8, fill: '#333' });
    for (let i = 0; i < 4; i++) o += A.line(247 + i * 4, 50, 247 + i * 4, 62, { sw: 1.2, stroke: '#1f5384' });
    o += A.line(244, 60, 263, 52, { sw: 1.2, stroke: '#1f5384' }) + A.line(268, 50, 268, 62, { sw: 1.2, stroke: '#1f5384' });
    o += A.line(290, 50, 290, 62, { sw: 1.2, stroke: '#a3611f' }) + A.line(294, 50, 294, 62, { sw: 1.2, stroke: '#a3611f' });
    o += A.note(262, 63, 262, 92, 'Bags: 10 cost 100', { w: 100 });
    o += A.note(118, 114, 260, 132, 'Spades always trump', { w: 108 });
    o += A.note(171, 145, 260, 168, 'Team bid: 3 + 4 = 7', { w: 108 });
    o += A.note(41, 52, 46, 18, 'Nil: take zero', { w: 84 });
    return o;
  },
});
