defineGame({
  id: 'spades',
  name: 'Spades',
  year: '1930s',
  designer: 'Traditional',
  family: 'trick',
  players: [4, 4], best: '4',
  time: [45, 90],
  age: 10,
  mechanics: ['trick-taking', 'team', 'auction', 'hand-management'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 3, talk: 3, planning: 3 },

  icons: {
    bid: { name: 'bid chip', draw: A => A.circle(12, 12, 10, '#5fa8e8', { sw: 1.4, stroke: '#0e1726' }) + A.text(12, 12.6, '#', { size: 12, weight: 800, fill: '#0e1726' }) },
    nil: { name: 'nil', draw: A => A.circle(12, 12, 10, '#f0a04b', { sw: 1.4, stroke: '#0e1726' }) + A.text(12, 12.6, '0', { size: 12, weight: 800, fill: '#0e1726' }) },
    bag: { name: 'bag', draw: A => A.path('M7.5 9 Q1.5 16 4 21 Q12 24 20 21 Q22.5 16 16.5 9 Z', { fill: '#c99a5b', sw: 1.3 }) + A.path('M8.5 9 L6 3.5 L10 5.5 L12 3 L14 5.5 L18 3.5 L15.5 9', { fill: '#c99a5b', sw: 1.2 }) + A.line(7.5, 9, 16.5, 9, { stroke: '#6b4a22', sw: 2 }) },
    trick: { name: 'trick', draw: A => A.rect(2.5, 3, 12, 17, '#fff', { rx: 2, sw: 1.2, rotate: -14 }) + A.rect(6, 3.5, 12, 17, '#fff', { rx: 2, sw: 1.2 }) + A.rect(9.5, 4, 12, 17, '#fff', { rx: 2, sw: 1.2, rotate: 14 }) + A.text(15.6, 13, '♠︎', { size: 10, weight: 400, fill: '#2b2b2b' }) },
  },

  pitch: 'Partners bid how many tricks they will take, then make it, with spades as trump. First team to 500 wins.',

  goal: { big: '500 points', text: 'First team to **500** wins. Take at least as many tricks as your team bid, but not many more.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'Deal all 52 cards: **13** each.' },
      { verb: 'Bid', text: 'From dealer’s left, one round, no passing: each player bids 1–13 tricks or {=nil}. Partners’ bids **add up** to the team contract.' },
      { verb: 'Play tricks', text: 'Dealer’s left leads any non-{=spade}. Clockwise, follow suit if you can, else play anything. Highest {=spade} wins, else highest card of the suit led.' },
      { verb: 'Score', text: 'Made it: 10 per trick bid, +1 per extra trick ({=bag}). Missed: −10 per trick bid.' },
    ],
  },

  tension: 'Bid low and extra tricks pile up as bags that cost 100; bid high and you risk losing the whole bid, so each late trick is a take-or-duck choice.',

  structure: [
    { label: 'Hand', repeat: 'until 500', text: 'Deal 13 each → bid → play 13 tricks → score both teams and add bags. Deal passes left.' },
    { label: 'Game end', text: 'A team reaches **500** after a hand: higher score wins.' },
  ],

  points: [
    ['Bid made', '10 × bid, +1 per {=bag}'],
    ['Bid missed', '−10 × bid'],
    ['{=nil} Nil made', '+100 to the nil bidder’s team'],
    ['{=nil} Nil failed', '−100; the nil bidder’s tricks count as {=bag}'],
    ['10 {=bag}', '−100, then remove 10 {=bag}'],
    ['Blind nil', '±200 (see Rules people miss)'],
  ],

  end: { trigger: 'a team reaches 500 points at the end of a hand', detail: 'If both teams pass 500 in the same hand, the higher score wins. A team at −500 or below loses.' },
  scoring: [
    { label: 'Made bids', share: 8 },
    { label: '{=nil} Nil bonuses', share: 2 },
    { label: '{=bag} Overtricks', share: 1 },
  ],

  ref: {
    title: 'Who wins the trick',
    rows: [
      ['Card rank', 'A K Q J 10 … 2'],
      ['Can follow suit', 'must; highest of the suit led wins'],
      ['Can’t follow', 'play anything; any {=spade} beats the suit led'],
      ['Several {=spade}', 'highest {=spade} wins'],
    ],
  },

  example: 'Ana bids 4 and partner Raj bids 3: the team needs **7**. They take 9: 70 + 2 {=bag} = 72. They already had 9 bags, now 11: they lose **100** and carry 1 {=bag} forward.',

  setup: [
    'Partners sit across. Deal all 52 cards, 13 each.',
    'Score pad: two columns per team, score and bags.',
    'The deal passes left after every hand.',
  ],

  terms: [
    ['{=trick} Trick', 'One card from each player; highest {=spade}, else highest of the suit led, wins.'],
    ['{=spade} Trump', 'Spades beat any card of another suit.'],
    ['{=bag} Bag', 'A trick above your team’s bid: +1, but every 10 cost 100.'],
    ['{=nil} Nil', 'A bid to take **zero** tricks: +100 if you do, −100 if not.'],
    ['Broken', 'Spades are broken once one has been played on a trick.'],
  ],

  gotchas: [
    'You can’t **lead** {=spade} until spades are broken, unless your hand is all spades.',
    'You may only trump when you **can’t** follow the suit led.',
    'A nil bidder’s tricks **don’t** count toward the partner’s bid; they count as {=bag}. Partner’s bid is scored on its own.',
    '**Blind nil** is bid before looking at your cards, usually only when your team is 100+ behind. After bidding, you and partner swap 2 cards face down.',
  ],

  tips: [
    'Count aces and kings as tricks, plus long or high {=spade}. A queen is not a sure trick.',
    'When partner bids {=nil}, play **high** to win the tricks they would be stuck with.',
    'Once your bid is safe, duck tricks to avoid {=bag}, and push extra tricks on opponents near 10.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', W = 30, H = 42, ic = this.icons;
    const face = (x, y, r, s, hi) => {
      const col = (s === '♥' || s === '♦') ? R : C.ink;
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fff', { rx: 4, sw: hi ? 2.4 : 1.2, stroke: hi ? '#ffd23f' : C.ink }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: col }) + A.text(x + W / 2 + 1, y + H / 2 + 4, s, { size: 18, fill: col });
    };
    const back = (x, y) => A.rect(x, y, 22, 30, '#1c2b44', { rx: 3, sw: 1.1, stroke: '#dfe6f2' }) + A.text(x + 11, y + 15, '♠', { size: 9, fill: '#8aa4cc' });
    // Bid chips are the bid icon, renumbered.
    const chip = (x, y, t) => A.use(ic.bid.draw(A).replace('>#<', `>${t}<`), x - 14.4, y - 14.4, 28.8);
    let board = A.bg('#13223a') + A.rect(5, 5, 310, 190, '#1f5384', { rx: 30, sw: 3, stroke: '#0b1526' });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 72) + back(270 + i * 6, 72) + back(130 + i * 8, 10);
    board += A.tag(40, 60, 'Lee') + A.tag(286, 60, 'Jo') + A.tag(76, 24, 'Raj (partner)', { fill: '#0b1526' }) + A.tag(44, 178, 'You (Ana)', { fill: '#0b1526' });
    const hand = (ids, hi) => ids.map(([r, s], i) => A.k('h' + r + s, face(88 + i * 34, 150, r, s, hi && r + s === '3♠'))).join('');
    const full = [['A', '♠'], ['J', '♠'], ['7', '♠'], ['3', '♠'], ['Q', '♣'], ['9', '♦']];
    const rest = full.filter(c => c[1] !== '♠' || c[0] !== '3');
    const anaBid = A.k('bidA', chip(44, 150, '4')), rajBid = A.k('bidR', chip(196, 24, '3'));
    const trick = A.k('t5H', face(102, 80, '5', '♥')) + A.k('tKH', face(145, 50, 'K', '♥')) + A.k('tAH', face(188, 80, 'A', '♥'));
    const pile = (n) => A.k('pile', A.use(ic.trick.draw(A), 214, 92, 52) + A.text(243, 155, n + ' tricks', { size: 9, weight: 800, fill: '#e6eef8' }));
    const sheet = A.k('sheet', A.rect(96, 52, 128, 80, '#f7f3e6', { rx: 4, sw: 1.2 }) +
      A.text(160, 66, 'Bid 7, took 9', { size: 9, weight: 700, fill: '#555' }) + A.text(160, 84, '70 + 2 bags = 72', { size: 10, weight: 800 }) +
      A.use(ic.bag.draw(A), 108, 92, 20) + A.text(166, 102, 'Bags 9 → 11', { size: 9, weight: 700, fill: '#555' }) + A.text(160, 119, '−100, keep 1 bag', { size: 10, weight: 800, fill: R }));
    return [
      { step: 0, say: 'Deal 13 each. Ana’s partner Raj sits across. She has **four {=spade}** and no {=heart}.', svg: board + hand(full) },
      { step: 1, say: 'Ana counts her likely winners and bids **4**.', svg: board + hand(full) + anaBid + A.glow(44, 150, 18) },
      { step: 1, say: 'Raj bids **3**. Partners’ bids add up: the team needs **7** tricks.', svg: board + hand(full) + anaBid + rajBid + A.glow(196, 24, 18) },
      { step: 2, say: 'Lee leads 5{=heart}; the others follow. Ana has **no hearts**, so she trumps with 3{=spade} and wins the trick.', svg: board + hand(rest) + anaBid + rajBid + trick + A.k('h3♠', face(145, 100, '3', '♠', true)) + A.glow(160, 121, 28) },
      { step: 2, say: 'After 13 tricks, Ana and Raj have **9**: two over their bid.', svg: board + anaBid + rajBid + pile('9') + A.glow(241, 119, 34) },
      { step: 3, say: '70 + 2 {=bag} = **72**. Bags go from 9 to 11, so they lose **100** and keep 1.', svg: board + anaBid + rajBid + pile('9') + sheet },
    ];
  },

  art(A) {
    const C = A.C, R = '#c8423b', team1 = '#5fa8e8', ic = this.icons;
    const pc = (x, y, r, s, o = {}) => {
      const w = o.w || 22, h = o.h || 31, col = (s === '♥' || s === '♦') ? R : C.ink;
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#fff', { rx: 3, sw: o.hi ? 2.2 : 1, stroke: o.hi ? '#ffd23f' : C.ink }) +
        A.text(x + 6, y + 7, r, { size: 8, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 3, s, { size: 13, fill: col });
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const bk = (x, y, w, h) => A.rect(x, y, w, h, '#1c2b44', { rx: 2.5, sw: 1, stroke: '#dfe6f2' }) + A.text(x + w / 2, y + h / 2, '♠', { size: 8, fill: '#8aa4cc' });
    // bid chips reuse the icons: blue = our bids, orange 0 = nil
    const chip = (x, y, t, key = 'bid') => A.use(ic[key].draw(A).replace('>#<', `>${t}<`), x - 12, y - 12, 24);
    let o = A.bg('#13223a');
    o += A.circle(118, 100, 90, '#1f5384', { sw: 3, stroke: '#0b1526' }) + A.circle(118, 100, 82, 'none', { sw: 1, stroke: '#3c74a8', dash: '3 3' });
    // opponents' and partner's hands
    for (let i = 0; i < 6; i++) o += bk(90 + i * 10, 12, 16, 22);
    for (let i = 0; i < 5; i++) o += bk(30, 66 + i * 10, 22, 16);
    for (let i = 0; i < 5; i++) o += bk(184, 66 + i * 10, 22, 16);
    // bids: N/S blue team, E/W orange team
    o += chip(166, 24, '3') + chip(160, 142, '4') + chip(41, 52, '0', 'nil') + chip(195, 52, '2', 'nil').replace('>0<', '>2<');
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
    o += A.use(ic.bag.draw(A), 206, 95, 20);
    o += A.note(262, 63, 274, 104, '10 bags = −100', { w: 84 });
    o += A.note(118, 114, 260, 132, 'Spades always trump', { w: 108 });
    o += A.note(171, 145, 260, 168, 'Team bid: 3 + 4 = 7', { w: 108 });
    o += A.note(41, 52, 46, 18, 'Nil: take zero', { w: 84 });
    return o;
  },
});
