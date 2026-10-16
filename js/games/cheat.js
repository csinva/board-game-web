{
// Mini playing card in a 24×24 icon box: rank on top, suit below.
const mini = (A, r, s) => {
  const col = (s === '♥' || s === '♦') ? '#c8423b' : '#2a2420';
  return A.rect(4, 1, 16, 22, '#fffdf7', { rx: 2.5, sw: 1.3 }) +
    A.text(12, 7.8, r, { size: r.length > 1 ? 8 : 10, weight: 800, fill: col }) + A.text(12, 16.5, s + '︎', { size: 11, weight: 400, fill: col });
};
// Mustard card back with a dotted frame.
const back = A => A.rect(4, 1, 16, 22, '#d19a2a', { rx: 2.5, sw: 1.3 }) + A.rect(6.5, 3.5, 11, 17, 'none', { rx: 1.5, sw: 0.9, stroke: '#7a5410', dash: '1.2 1.2' }) +
  A.circle(12, 12, 3, '#7a5410', { sw: 0 });
// "Cheat!" speech bubble.
const call = A => A.path('M3 3 h18 q2 0 2 2 v9 q0 2 -2 2 h-10 l-5 5 v-5 h-3 q-2 0 -2 -2 v-9 q0 -2 2 -2z', { fill: '#c8423b', sw: 1.3 }) +
  A.text(12, 9.5, '!', { size: 11, weight: 800, fill: '#fff' });
const card = (r, s) => ({ name: r + s, draw: A => mini(A, r, s) });

defineGame({
  id: 'cheat',
  name: 'Cheat',
  year: 'Traditional',
  designer: 'Unknown (also BS, I Doubt It)',
  family: 'deck',
  players: [3, 10], best: '4–6',
  time: [15, 30],
  age: 8,
  mechanics: ['bluffing', 'shedding', 'deduction', 'hand-management'],
  profile: { complexity: 1, luck: 3, interaction: 5, conflict: 3, talk: 5, planning: 2 },

  icons: {
    '7s': card('7', '♠'), '7h': card('7', '♥'), '3d': card('3', '♦'), '9c': card('9', '♣'),
    back: { name: 'face-down card', draw: back },
    call: { name: '“Cheat!”', draw: call },
  },

  pitch: 'Play cards face down claiming the next rank, lying when you must; call out liars; first to empty your hand wins.',

  goal: { big: 'Empty your hand', text: 'First player with **no cards** wins, if their last play survives a challenge.' },

  turn: {
    type: 'sequence',
    outro: 'Next player claims the next rank (after K comes A)',
    steps: [
      { verb: 'Claim', text: 'Play **1–4 cards** {=back} face down on the pile and announce them as the next rank: “two 7s”. The count must be true; the cards need not be.' },
      { verb: 'Doubt', text: 'Before the next player plays, anyone may call {=call} “**Cheat!**”' },
      { verb: 'Reveal', text: 'Turn the claimed cards up. Any card not of the claimed rank: the player takes the **whole pile**. All true: the caller takes it.' },
    ],
  },

  tension: 'Lying sheds cards you can’t play honestly, but every lie risks picking up the whole pile.',

  structure: [
    { label: 'Setup', text: 'Deal all 52 cards, one at a time. Uneven hands are fine.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Left of the dealer claims aces, the next player 2s, then 3s … K, A, 2 … Each claim may be challenged.' },
    { label: 'Game end', text: 'A player plays their last cards and nobody catches a lie.' },
  ],

  end: {
    trigger: 'a player’s hand is empty and their last play is not caught',
    results: [{ side: 'Winner', text: 'first to empty their hand. Caught lying on the last play? Take the pile and play on.' }],
  },

  ref: {
    title: 'Who takes the pile',
    rows: [
      ['Claim “two 7s” → {=7s}{=7h}', 'Truth: the **caller** takes it'],
      ['Claim “two 7s” → {=7s}{=3d}', 'Lie: the **player** takes it'],
      ['No call', 'Cards stay face down in the pile'],
      ['Rank order', 'A 2 3 4 5 6 7 8 9 10 J Q K, then A again'],
    ],
  },

  example: 'Jo claims one 6, so you must claim 7s. You hold one: you play {=7s} and {=3d} face down and say “two 7s”. Lee calls **Cheat!**; the 3 shows, so you pick up all 9 cards. Ben then claims 8s.',

  setup: [
    'Deal the whole deck. With 5+ players, many tables shuffle two decks together.',
    'Sort your hand by rank.',
    'Player left of the dealer starts with aces.',
  ],

  terms: [
    ['Pile', 'All cards played face down since the last pickup.'],
    ['Claim', 'The count and rank you announce: “three Jacks”.'],
    ['{=call} Call', 'Saying “Cheat!” to challenge the most recent claim.'],
  ],

  gotchas: [
    'You must claim the **next** rank even if you hold none; that forces lies.',
    'Only the **latest** claim can be challenged, and only before the next player plays.',
    'Variant (not standard): some tables allow the same rank or one rank up or down instead of only the next; agree before dealing.',
  ],

  tips: [
    'Lie early, while the pile is small: getting caught costs little.',
    'Count what you hold. With three {=9c} in hand, anyone claiming two 9s is lying.',
    'With 4 players you claim every 4th rank, so you know which ranks you will need next.',
  ],

  walk(A) {
    const put = (x, y, svg, s = 40) => A.use(svg, x - s / 6, y - s / 24, s);
    const F = (r, s) => mini(A, r, s), B = back(A);
    let scene = A.bg('#2b2f3b') + `<ellipse cx="160" cy="100" rx="150" ry="92" fill="#454f66" stroke="#1d2029" stroke-width="2"/>`;
    // Opponents' hands (backs).
    for (let i = 0; i < 6; i++) scene += put(122 + i * 10, 8, B, 30) + put(286, 50 + i * 9, B, 30);
    for (let i = 2; i < 6; i++) scene += put(10, 50 + i * 9, B, 30);
    scene += A.tag(100, 20, 'Lee') + A.tag(296, 44, 'Jo') + A.tag(30, 44, 'Ben') + A.tag(290, 184, 'You');
    const P = i => [118 + (i * 9) % 30, 74 + (i * 7) % 16], R = i => (i * 37) % 30 - 15;
    const pc = (key, i, svg) => { const [x, y] = P(i); return A.k(key, A.group(put(x, y, svg, 36), `rotate(${R(i)} ${x + 12} ${y + 16})`)); };
    const old = n => Array.from({ length: n }, (_, i) => pc('p' + i, i, B)).join('');
    const hand = { '7s': ['7', '♠'], '3d': ['3', '♦'], jc: ['J', '♣'], qh: ['Q', '♥'], '2s': ['2', '♠'] };
    const order = ['7s', '3d', 'jc', 'qh', '2s'];
    const mine = ids => ids.map(id => A.k('y' + id, put(86 + order.indexOf(id) * 30, 152, F(...hand[id])))).join('');
    const bub = (key, x, y, w, str, red) => A.k(key, A.bubble(x, y, w, 22, str, { size: 10.5, fill: red ? '#c8423b' : '#fffdf7', color: red ? '#fff' : '#2a2420' }));
    const jo = bub('bj', 222, 84, 58, 'One 6');
    const played = pc('y7s', 7, B) + pc('y3d', 8, B);
    const lee = bub('bl', 150, 34, 54, 'Cheat!', true);
    // After pickup: 12 cards in your hand.
    const got = [['p0', 'A', '♣'], ['p1', '2', '♦'], ['p2', '3', '♠'], ['p3', '4', '♥'], ['p4', '5', '♣'], ['p5', '6', '♦'], ['p6', '9', '♠'], ['y7s', '7', '♠'], ['y3d', '3', '♦'], ['yjc', 'J', '♣'], ['yqh', 'Q', '♥'], ['y2s', '2', '♠']];
    const big = got.map(([k, r, s], i) => A.k(k, put(34 + i * 19, 152, F(r, s), 38))).join('');
    return [
      { step: 0, say: 'Jo claimed one 6, so you must claim **7s**. You hold one: {=7s}.', svg: scene + old(7) + jo + mine(order) + A.glow(99, 170, 22) },
      { step: 0, say: 'Play {=7s} and {=3d} face down: “**two 7s**”. The count is true; one card is a lie.', svg: scene + old(7) + played + mine(order.slice(2)) + bub('by', 196, 118, 62, 'Two 7s') },
      { step: 1, say: 'Lee doubts you and calls “**Cheat!**”', svg: scene + old(7) + played + mine(order.slice(2)) + bub('by', 196, 118, 62, 'Two 7s') + lee },
      { step: 2, say: 'Turn your 2 cards up: {=3d} is not a 7. **Caught.**', svg: scene + old(7) + A.k('y7s', put(184, 76, F('7', '♠'))) + A.k('y3d', put(214, 76, F('3', '♦'))) + mine(order.slice(2)) + lee + A.glow(227, 94, 22) },
      { step: 2, say: 'The liar takes the **whole pile**: 9 cards join your hand.', svg: scene + big },
      { step: 0, say: 'Ben claims **two 8s**. Nobody calls, so they stay face down. Lee claims 9s next.', svg: scene + big + pc('b1', 0, B) + pc('b2', 1, B) + bub('bb', 46, 74, 60, 'Two 8s') },
    ];
  },

  art(A) {
    const put = (x, y, svg, s = 40) => A.use(svg, x - s / 6, y - s / 24, s);
    const F = (r, s) => mini(A, r, s), B = back(A);
    let o = A.bg('#2b2f3b');
    o += A.circle(160, 96, 120, '#3b4357', { sw: 0 }) + A.circle(160, 96, 84, '#4a5570', { sw: 0 }) + A.circle(160, 96, 48, '#56627f', { sw: 0 });
    // Opponents' hands fanned.
    const fan = (cx, cy, n, rot) => { let s = ''; for (let i = 0; i < n; i++) s += A.group(put(cx - 12, cy - 16, B, 34), `rotate(${(i - (n - 1) / 2) * 12} ${cx} ${cy + 26})`); return A.group(s, `rotate(${rot} ${cx} ${cy})`); };
    o += fan(40, 70, 5, -70) + fan(160, 18, 6, 180) + fan(282, 70, 4, 70);
    // The pile.
    for (let i = 0; i < 8; i++) { const x = 128 + (i * 11) % 34, y = 74 + (i * 7) % 18; o += A.group(put(x, y, B, 38), `rotate(${(i * 37) % 36 - 18} ${x + 12} ${y + 17})`); }
    // The last play, one card half-turned: a 3, not a 7.
    o += A.group(put(170, 70, B, 40), 'rotate(14 183 88)') + A.group(put(184, 82, F('3', '♦'), 40), 'rotate(24 197 100)');
    o += A.bubble(196, 34, 64, 24, 'Two 7s', { size: 11 });
    o += A.bubble(64, 108, 58, 24, 'Cheat!', { size: 11, fill: '#c8423b', color: '#fff' });
    // My hand.
    [['7', '♥'], ['8', '♣'], ['8', '♦'], ['J', '♠'], ['K', '♥']].forEach(([r, s], i) => { o += A.group(put(150 + i * 24, 150, F(r, s), 42), `rotate(${(i - 2) * 6} ${164 + i * 24} ${192})`); });
    o += A.note(204, 112, 258, 132, 'Claimed 7s, but a 3');
    o += A.note(140, 114, 64, 168, 'Liar takes the pile');
    o += A.note(250, 40, 262, 12, 'Claim the next rank');
    return o;
  },
});
}
