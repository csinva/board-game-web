{
// Mini playing card in a 24×24 icon box: rank on top, suit below.
const mini = (A, r, s) => {
  const col = (s === '♥' || s === '♦') ? '#c8423b' : '#2a2420';
  return A.rect(4, 1, 16, 22, '#fffdf7', { rx: 2.5, sw: 1.3 }) +
    A.text(12, 7.8, r, { size: r.length > 1 ? 8 : 10, weight: 800, fill: col }) + A.text(12, 16.5, s + '︎', { size: 11, weight: 400, fill: col });
};
// Green card back with a diamond.
const back = A => A.rect(4, 1, 16, 22, '#2f5d3a', { rx: 2.5, sw: 1.3 }) + A.rect(6.5, 3.5, 11, 17, 'none', { rx: 1.5, sw: 0.8, stroke: '#cfe3c8' }) +
  A.path('M12 6.5 L15.5 12 L12 17.5 L8.5 12 Z', { fill: '#cfe3c8', sw: 0 });
const card = (r, s) => ({ name: r + s, draw: A => mini(A, r, s) });
// Peg standing in a strip of board.
const peg = (A, col) => A.rect(2, 15, 20, 7, '#e7c48d', { rx: 2, sw: 1.2 }) + A.circle(7, 18.5, 1.2, '#6b4a26', { sw: 0 }) + A.circle(17, 18.5, 1.2, '#6b4a26', { sw: 0 }) +
  A.rect(9.5, 3, 5, 15, col, { rx: 2.5, sw: 1.2 }) + A.rect(8.5, 2, 7, 4, col, { rx: 2, sw: 1.2 });

defineGame({
  id: 'cribbage',
  name: 'Cribbage',
  year: 'c. 1630',
  designer: 'Sir John Suckling (traditional attribution)',
  family: 'deck',
  players: [2, 4], best: '2',
  time: [30, 45],
  age: 8,
  mechanics: ['set-collection', 'hand-management', 'melding'],
  profile: { complexity: 3, luck: 3, interaction: 3, conflict: 2, talk: 2, planning: 2 },

  icons: {
    '4d': card('4', '♦'), '5h': card('5', '♥'), '5c': card('5', '♣'), '6s': card('6', '♠'), '10s': card('10', '♠'),
    kc: card('K', '♣'), '9d': card('9', '♦'), '7c': card('7', '♣'), '7d': card('7', '♦'), jh: card('J', '♥'), '3h': card('3', '♥'), '5d': card('5', '♦'),
    back: { name: 'card back', draw: back },
    peg: { name: 'peg', draw: A => peg(A, '#c8423b') },
  },

  pitch: 'Score fifteens, pairs and runs while playing cards to 31 and again in your hand; first to peg 121 wins.',

  goal: { big: '121 points', text: 'First to move a {=peg} peg **121** holes around the board wins. Points come from card combinations.' },

  turn: {
    type: 'round',
    intro: 'Each deal goes through these phases; the deal alternates.',
    steps: [
      { verb: 'Deal', text: 'Dealer gives **6 cards** each. The other player is the **pone**.' },
      { verb: 'Crib', text: 'Each player puts 2 cards face down into the **crib**: an extra hand that scores for the dealer.' },
      { verb: 'Cut', text: 'Pone cuts; dealer turns up the top card as the **starter**. A Jack starter scores the dealer 2.' },
      { verb: 'Play to 31', text: 'From the pone, alternate laying one card face up and saying the **running total**. Score 15s, 31, pairs and runs as they form. If you can’t play without passing 31, say **go**: the other player must play every card they can, then scores 1 (2 for exactly 31).' },
      { verb: 'Show', text: 'Pick your 4 cards back up and score them with the starter: pone, then dealer, then the dealer’s **crib**.' },
    ],
  },

  tension: 'You keep 4 of 6 cards, and the 2 you throw away score for the dealer, so on the opponent’s deal you must discard cards that help nobody.',

  structure: [
    { label: 'Setup', text: 'Cut for deal; lower card deals. Pegs start at 0.' },
    { label: 'Deal & crib', repeat: 'every deal', text: '6 cards each. Both put 2 face down in the dealer’s **crib**.' },
    { label: 'Cut', repeat: 'every deal', text: 'Pone cuts; dealer turns the **starter**. A Jack: dealer pegs 2.' },
    { label: 'The play', repeat: 'every deal', text: 'Pone leads. Alternate cards, total ≤ 31. After 31 or a go, the count restarts at 0; whoever did not play last leads. Ends when all 8 cards are out.' },
    { label: 'The show', repeat: 'every deal', text: 'Score pone’s hand, dealer’s hand, then the crib (for the dealer), each with the starter. Deal passes.' },
    { label: 'Game end', text: 'First peg to **121** wins at once.' },
  ],

  points: [
    ['Fifteen', 'Show: each set of cards totalling 15, e.g. {=5h}{=10s} or {=4d}{=5c}{=6s} = **2** · play: count reaches 15 = **2**'],
    ['Pair', '{=7c}{=7d} = **2** · three of a kind 6 · four 12'],
    ['Run', '{=4d}{=5h}{=6s} = **1 per card**, any order; ace is low (A-2-3, not Q-K-A)'],
    ['Flush (show)', '4 hand cards of one suit = **4**, 5 with the starter'],
    ['{=jh} His nobs (show)', 'Jack of the starter’s suit in your hand = **1**'],
    ['His heels', 'Jack turned as the starter = **2** to the dealer'],
    ['31 / go (play)', 'exactly 31 = **2** · last card under 31 = **1**'],
  ],

  end: { trigger: 'a player’s front peg reaches hole 121', detail: 'The game stops at once, even mid-play or mid-count. Optional convention: the win counts double if the loser has under 91 (a **skunk**).' },
  scoring: [
    { label: 'Show (hands)', share: 4 },
    { label: 'Play to 31', share: 3 },
    { label: 'Crib (dealer)', share: 2 },
  ],

  ref: {
    title: 'Counting a hand (4 cards + starter)',
    rows: [
      ['{=4d}{=5h}{=5c}{=6s} + {=10s}', '15s: 4 × 2 = 8 · pair 2 · two runs of 3 = 6 · **16**'],
      ['{=5h}{=5c}{=jh}{=kc} + {=5d}', '15s: 7 × 2 = 14 · three 5s 6 · **20**'],
      ['{=3h}{=7c}{=9d}{=kc} + {=10s}', 'nothing: **0**'],
    ],
  },

  example: 'Ben deals. You keep {=4d}{=5h}{=5c}{=6s} and throw {=kc}{=9d} in his crib; the starter is {=10s}. In play you lead the 4, Ben plays a 6, your 5 makes **15 for 2** plus a run of 3 for 3. In the show your hand counts **16**: four fifteens (8), a pair (2), two runs of 3 (6).',

  setup: [
    '52-card deck, cribbage board, 2 {=peg} pegs per player. With 3 or 4, deal 5 each and discard 1 (3 players: add 1 card from the deck to the crib; 4: partners).',
    'Cut for deal: lower card deals first.',
    'Card values: A = 1, 2–10 face value, J Q K = 10.',
  ],

  terms: [
    ['Pone', 'The non-dealer. Plays first and counts first.'],
    ['Crib', 'The 4 discards; scored by the dealer after both hands.'],
    ['Starter', 'The cut card. Counts as a 5th card in both hands and the crib.'],
    ['Go', 'Said when you can’t play without passing 31; the other player plays on, and the last to play scores 1.'],
    ['{=peg} Leapfrog', 'Move your back peg past your front peg by the points scored.'],
  ],

  gotchas: [
    'The **pone counts first**. Reach 121 then and you win before the dealer counts.',
    'Crib flushes count only with **5** cards of one suit (starter included).',
    'After 31 or a go, the count **restarts at 0**. Runs in play count in any order (4-6-5) but break when an out-of-place card lands.',
  ],

  tips: [
    'Keep **5s**: 16 cards are worth 10, so 5s make fifteens. Never throw 5s into the opponent’s crib.',
    'In your own crib throw pairs or touching ranks; in theirs, far-apart cards like {=kc} and {=3h}.',
    'Lead a 4 or lower: nothing can make 15 off it. Avoid leaving the count at 5 or 21.',
  ],

  walk(A) {
    const C = A.C, BLUE = '#2f6db5', RED = '#c8423b', sz = 40;
    const put = (x, y, svg, s = sz) => A.use(svg, x - s / 6, y - s / 24, s); // top-left of the card at (x, y)
    const F = (r, s) => mini(A, r, s), B = back(A);
    const hx = i => 44 + i * 8 + Math.floor(i / 5) * 2.4;
    let scene = A.bg('#a8743f');
    for (let i = 0; i < 9; i++) scene += A.path(`M0 ${52 + i * 17} q80 ${i % 2 ? 5 : -5} 160 0 t160 0`, { stroke: '#8d5e30', sw: 1, opacity: 0.5 });
    scene += A.rect(8, 5, 304, 36, '#e7c48d', { rx: 9, sw: 1.4 });
    for (let i = 0; i <= 30; i++) scene += A.circle(hx(i), 16, 1.4, '#6b4a26', { sw: 0 }) + A.circle(hx(i), 30, 1.4, '#6b4a26', { sw: 0 });
    scene += A.text(24, 16, 'Ben', { size: 8, weight: 800, fill: BLUE }) + A.text(24, 30, 'You', { size: 8, weight: 800, fill: RED });
    for (let j = 0; j < 3; j++) scene += put(14 - j * 1.5, 102 - j * 1.5, B);
    scene += A.tag(52, 66, 'Ben (dealer)', { fill: BLUE }) + A.tag(44, 170, 'You (pone)', { fill: RED }) + A.tag(268, 108, 'Ben’s crib');
    const pg = (key, s, y, col) => A.k(key, A.circle(hx(s), y, 3.6, col, { sw: 1.1 }) + A.circle(hx(s) - 1, y - 1, 1.1, '#fff', { sw: 0, opacity: 0.7 }));
    const pegs = (r1, r2, b1 = 10, b2 = 7) => pg('rA', r1, 30, RED) + pg('rB', r2, 30, RED) + pg('bA', b1, 16, BLUE) + pg('bB', b2, 16, BLUE);
    const mine = { '4d': ['4', '♦'], '5h': ['5', '♥'], '5c': ['5', '♣'], '6s': ['6', '♠'], kc: ['K', '♣'], '9d': ['9', '♦'] };
    const order = ['4d', '5h', '5c', '6s', 'kc', '9d'];
    const you = ids => ids.map(id => A.k('y' + id, put(92 + order.indexOf(id) * 32, 150, F(...mine[id])))).join('');
    const ben = ids => ids.map(i => A.k('b' + i, put(112 + (i - 1) * 18, 48, B))).join('');
    const crib = A.k('ykc', put(252, 52, B)) + A.k('y9d', put(256, 54, B)) + A.k('b5', put(260, 56, B)) + A.k('b6', put(264, 58, B));
    const play = i => [72 + i * 24, 98];
    const starter = (x = 20, y = 96) => A.k('starter', put(x, y, F('10', '♠')));
    const total = (n, pts) => A.k('total', A.circle(214, 120, 15, '#fffdf7', { sw: 1.4 }) + A.text(214, 120, n, { size: 13, weight: 800 })) +
      A.k('pts', A.text(214, 146, pts, { size: 10, weight: 800, fill: '#fffdf7' }));
    return [
      { step: 0, say: 'Ben deals 6 each. Your hand: {=4d}{=5h}{=5c}{=6s}{=kc}{=9d}.', svg: scene + pegs(6, 2) + ben([1, 2, 3, 4, 5, 6]) + you(order) },
      { step: 1, say: 'Keep 4-5-5-6 for fifteens and runs. Throw {=kc}{=9d} into **Ben’s crib**: far apart, hard to combine. Ben throws 2 too.', svg: scene + pegs(6, 2) + ben([1, 2, 3, 4]) + you(order.slice(0, 4)) + crib + A.glow(272, 76, 30) },
      { step: 2, say: 'You cut; Ben turns the **starter** {=10s}. Not a Jack, so no points. It counts in every hand.', svg: scene + pegs(6, 2) + ben([1, 2, 3, 4]) + you(order.slice(0, 4)) + crib + starter() + A.glow(33, 114, 26) },
      { step: 3, say: 'You lead 4 (“four”), Ben plays 6 (“ten”), you play 5: “**fifteen** for 2, and a run of 3 for 3.” Leapfrog 5 holes.',
        svg: scene + pegs(6, 11) + ben([2, 3, 4]) + you(['5c', '6s']) + crib + starter() + A.k('y4d', put(...play(0), F('4', '♦'))) + A.k('b1', put(...play(1), F('6', '♣'))) + A.k('y5h', put(...play(2), F('5', '♥'))) + total('15', '+5 you') + A.glow(hx(11), 30, 8, 'gp') },
      { step: 3, say: 'Ben plays K (“twenty-five”); your 6 makes exactly **31 for 2**. The count restarts at 0; Ben leads the last 3 cards, and nobody scores.',
        svg: scene + pegs(13, 11) + ben([3, 4]) + you(['5c']) + crib + starter() + A.k('y4d', put(...play(0), F('4', '♦'))) + A.k('b1', put(...play(1), F('6', '♣'))) + A.k('y5h', put(...play(2), F('5', '♥'))) +
          A.k('b2', put(...play(3), F('K', '♦'))) + A.k('y6s', put(...play(4), F('6', '♠'))) + total('31', '+2 you') + A.glow(hx(13), 30, 8, 'gp') },
      { step: 4, say: 'Show: your 4 + the starter. Fifteen 2, 4, 6, 8, a pair is 10, two runs of 3 make **16**. Then Ben counts his hand and crib.',
        svg: scene + pegs(13, 29) + ben([1, 2, 3, 4]) + you(order.slice(0, 4)) + crib + starter(228, 150) + A.glow(hx(29), 30, 8, 'gp') +
          A.k('pts', A.text(276, 150, '+16', { size: 13, weight: 800, fill: '#fffdf7' })) },
    ];
  },

  art(A) {
    const BLUE = '#2f6db5', RED = '#c8423b';
    const put = (x, y, svg, s = 40) => A.use(svg, x - s / 6, y - s / 24, s);
    const F = (r, s) => mini(A, r, s), B = back(A);
    let o = A.bg('#9c6a3a');
    for (let i = 0; i < 12; i++) o += A.path(`M0 ${8 + i * 17} q80 ${i % 2 ? 6 : -6} 160 0 t160 0`, { stroke: '#82552c', sw: 1, opacity: 0.55 });
    // The board, tilted. Two lanes of holes per player, in groups of 5.
    const th = -4 * Math.PI / 180, rot = (x, y) => [160 + (x - 160) * Math.cos(th) - (y - 39) * Math.sin(th), 39 + (x - 160) * Math.sin(th) + (y - 39) * Math.cos(th)];
    const hx = i => 32 + i * 8.5 + Math.floor(i / 5) * 3;
    let b = A.rect(12, 12, 296, 54, '#e7c48d', { rx: 14, sw: 1.5 }) + A.rect(17, 17, 286, 44, 'none', { rx: 10, sw: 0.8, stroke: '#b88d55' });
    [26, 34, 44, 52].forEach(y => { for (let i = 0; i < 30; i++) b += A.circle(hx(i), y, 1.3, '#6b4a26', { sw: 0 }); });
    const pegAt = (i, y, col) => A.circle(hx(i) + 1, y + 1.6, 3.8, 'rgba(0,0,0,.25)', { sw: 0 }) + A.circle(hx(i), y, 3.8, col, { sw: 1.1 }) + A.circle(hx(i) - 1.2, y - 1.2, 1.2, '#fff', { sw: 0, opacity: 0.7 });
    b += pegAt(16, 26, RED) + pegAt(21, 26, RED) + pegAt(19, 44, BLUE) + pegAt(25, 44, BLUE);
    o += A.group(b, 'rotate(-4 160 39)');
    // Deck with the starter turned up.
    for (let j = 0; j < 3; j++) o += put(20 - j * 1.5, 104 - j * 1.5, B);
    o += A.group(put(28, 98, F('10', '♠')), 'rotate(8 41 116)');
    // The play: 4, 6, 5 = 15.
    o += put(98, 98, F('4', '♦'), 44) + put(124, 101, F('6', '♣'), 44) + put(150, 98, F('5', '♥'), 44);
    o += A.circle(214, 118, 16, '#fffdf7', { sw: 1.5 }) + A.text(214, 118, '15', { size: 14, weight: 800 });
    // The crib.
    for (let j = 0; j < 4; j++) o += A.group(put(250 + j * 6, 98 + j * 2, B), `rotate(${j * 5 - 6} ${263 + j * 6} ${116 + j * 2})`);
    // Pone's remaining cards.
    o += A.group(put(126, 150, F('5', '♣')), 'rotate(-6 139 168)') + A.group(put(150, 152, F('6', '♠')), 'rotate(6 163 170)');
    const [px, py] = rot(hx(21), 26), [sx, sy] = [214, 118];
    o += A.note(px, py, 74, 82, 'Pegs leapfrog to 121');
    o += A.note(sx, sy - 16, 236, 82, 'Fifteen = 2 points');
    o += A.note(274, 136, 262, 182, 'Crib: dealer’s bonus hand');
    o += A.note(40, 136, 56, 182, 'Starter: shared 5th card');
    return o;
  },
});
}
