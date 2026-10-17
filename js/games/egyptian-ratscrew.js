{
// Mini playing card in a 24×24 icon box: rank on top, suit below.
const mini = (A, r, s) => {
  const col = (s === '♥' || s === '♦') ? '#c8423b' : '#2a2420';
  return A.rect(4, 1, 16, 22, '#fffdf7', { rx: 2.5, sw: 1.3 }) +
    A.text(12, 7.8, r, { size: r.length > 1 ? 8 : 10, weight: 800, fill: col }) + A.text(12, 16.5, s + '︎', { size: 11, weight: 400, fill: col });
};
// Red card back with white cross-hatch.
const back = A => A.rect(4, 1, 16, 22, '#b8322c', { rx: 2.5, sw: 1.3 }) + A.rect(6.5, 3.5, 11, 17, 'none', { rx: 1.5, sw: 0.8, stroke: '#fde6e2' }) +
  A.path('M7 8 L17 18 M7 13 L12 18 M12 4 L17 9 M17 8 L7 18 M17 13 L12 18 M12 4 L7 9', { stroke: '#f3b7af', sw: 0.7 });
// Open hand, fingers up, in a 24×24 box.
const hand = (A, fill = '#f2c6a0') => A.rect(0.5, 12.5, 9, 3.8, fill, { rx: 1.9, sw: 1.1, rotate: -35 }) +
  [6.8, 10.3, 13.8, 17.3].map((x, i) => A.rect(x, i === 0 || i === 3 ? 4.5 : 2.2, 3.4, 10, fill, { rx: 1.7, sw: 1.1 })).join('') +
  A.rect(6.3, 9.5, 15, 12.5, fill, { rx: 4, sw: 1.1 });
const card = (r, s) => ({ name: r + s, draw: A => mini(A, r, s) });

defineGame({
  id: 'egyptian-ratscrew',
  name: 'Egyptian Ratscrew',
  year: 'Late 20th c.',
  designer: 'Traditional (US)',
  family: 'deck',
  players: [2, 10], best: '3–4',
  time: [10, 30],
  age: 6,
  mechanics: ['speed', 'take-that', 'player-elimination'],
  profile: { complexity: 1, luck: 3, interaction: 5, conflict: 4, talk: 4, planning: 1 },

  icons: {
    as: card('A', '♠'), kh: card('K', '♥'), qc: card('Q', '♣'), jd: card('J', '♦'),
    '9s': card('9', '♠'), '9h': card('9', '♥'), '5s': card('5', '♠'), '5d': card('5', '♦'),
    back: { name: 'face-down card', draw: back },
    slap: { name: 'slap', draw: A => hand(A) },
  },

  pitch: 'Flip cards onto a central pile and slap doubles and sandwiches to win it; collect all 52 cards to win.',

  goal: { big: 'All 52 cards', text: 'Win all 52 cards. A player with no cards left is out, but may still **slap** (see Your turn) to win a pile and get back in.' },

  turn: {
    type: 'sequence',
    intro: 'Players flip in turn, clockwise:',
    outro: 'Next player flips',
    steps: [
      { verb: 'Flip', text: 'Turn the top card of your face-down stack face up onto the central **pile**, flipping it away from you so you see it no sooner than anyone else.' },
      { verb: 'Answer', text: 'If the previous player flipped an {=as}{=kh}{=qc}{=jd} ace or face card, you must **answer** it: flip cards one at a time until you flip an ace or face card, up to **4** cards (tries) after an A, 3 after a K, 2 after a Q, 1 after a J. If you flip one, stop: the next player must now answer your card.' },
      { verb: 'Collect', text: 'If you use up your tries without flipping an ace or face card, the player who flipped the last ace or face card takes the **whole pile**, puts it face down under their stack, and flips next.' },
      { verb: 'Slap', text: 'At any time, any player may **slap** (put a hand flat on the pile) when the top cards show a **double** (2 cards of the same rank in a row) or a **sandwich** (2 cards of the same rank with 1 card between). The first hand down takes the pile and flips next. If you slap when there is neither, **burn** a card: put your top card face down under the pile.' },
    ],
  },

  tension: 'Slap fast to win the pile, but a wrong slap costs you a card.',

  structure: [
    { label: 'Setup', text: 'Deal all 52 cards face down among the players.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Flip 1 card, or answer a face card; anyone may slap at any moment.' },
    { label: 'Knock-outs', text: 'A player with no cards is out unless they win a pile by slapping.' },
    { label: 'Game end', text: 'One player holds all **52** cards.' },
  ],

  end: {
    trigger: 'one player holds all 52 cards',
    results: [{ side: 'Winner', text: 'the last player holding cards.' }],
  },

  ref: {
    title: 'Tries to answer each card, and slaps',
    rows: [
      ['{=as} Ace', '{=back}{=back}{=back}{=back} 4 tries'],
      ['{=kh} King', '{=back}{=back}{=back} 3 tries'],
      ['{=qc} Queen', '{=back}{=back} 2 tries'],
      ['{=jd} Jack', '{=back} 1 try'],
      ['{=slap} Double', '{=9s}{=9h}: same rank twice in a row'],
      ['{=slap} Sandwich', '{=5s}{=kh}{=5d}: same rank, one card between'],
    ],
  },

  example: 'Ben flips {=kh}, so Lee gets 3 tries. Lee flips 4{=diamond}, 9{=spade}, then 9{=heart}: a **double**. You slap first and take all 6 cards. Had the third card missed, Ben would have taken them.',

  setup: [
    'Deal the whole deck face down, one at a time; uneven stacks are fine.',
    'Square your cards into a face-down stack. Don’t look at them.',
    'The player to the dealer’s left flips first.',
  ],

  terms: [
    ['Pile', 'The face-up cards in the middle.'],
    ['{=slap} Slap', 'Hand flat on the pile to claim it. The lowest hand (first down) wins.'],
    ['Double', 'Two cards of the same rank in a row: {=9s}{=9h}.'],
    ['Sandwich', 'Same rank with one card between: {=5s}{=kh}{=5d}.'],
    ['{=back} Burn', 'Penalty for a wrong slap: put your top card face down under the pile.'],
    ['Answer', 'After an ace or face card, the next player flips up to 4, 3, 2 or 1 cards (A, K, Q, J) trying to flip an ace or face card.'],
  ],

  gotchas: [
    'A slap beats an answer in progress: if a double or sandwich appears while someone is answering, the **first slapper** takes the pile, not the player who flipped the face card.',
    'Out of cards? You may still **slap** a double or sandwich to get back in.',
    'Slap rules vary by table: some also allow slaps on top-and-bottom (top card matches the bottom card of the pile), tens (two cards in a row that add up to 10) or K-Q (a king and queen in a row). Agree before dealing.',
  ],

  tips: [
    'Keep your slapping hand free and near the pile; flip with the other.',
    'Watch for **sandwiches**: new players look only for doubles.',
    'Count tries aloud while someone answers a face card.',
  ],

  walk(A) {
    const sz = 44, ic = this.icons;
    const put = (x, y, svg, s = sz) => A.use(svg, x - s / 6, y - s / 24, s);
    const F = (r, s) => mini(A, r, s), B = back(A), H = hand(A);
    let scene = A.bg('#f4f6fb');
    for (let i = 0; i < 16; i++) scene += A.rect(i * 20, 0, 10, 200, '#3d6fb6', { rx: 0, sw: 0, opacity: 0.28 });
    for (let j = 0; j < 10; j++) scene += A.rect(0, j * 20, 320, 10, '#3d6fb6', { rx: 0, sw: 0, opacity: 0.28 });
    const stack = (x, y, n = 3) => { let s = ''; for (let j = 0; j < n; j++) s += put(x + j * 1.5, y - j * 1.5, B, 40); return s; };
    scene += stack(146, 8) + stack(16, 80);
    scene += A.tag(208, 24, 'Lee') + A.tag(34, 136, 'Ben') + A.tag(210, 176, 'You');
    const mine = (n = 3) => A.k('mine', stack(146, 152, n));
    const R = [-6, 5, -3, 6, -5, 4], P = i => [100 + i * 17, 78 + (i % 2) * 4];
    const pc = (key, i, r, s) => { const [x, y] = P(i); return A.k(key, A.group(put(x, y, F(r, s)), `rotate(${R[i]} ${x + 14.7} ${y + 20})`)); };
    const pile = [['p0', '3', '♦'], ['p1', '7', '♣'], ['p2', 'K', '♥'], ['p3', '4', '♦'], ['p4', '9', '♠'], ['p5', '9', '♥']];
    const piles = n => pile.slice(0, n).map(([k, r, s], i) => pc(k, i, r, s)).join('');
    const tries = (used) => A.k('tries', A.rect(236, 70, 76, 52, '#fffdf7', { rx: 6, sw: 1.3 }) + A.use(ic.kh.draw(A), 238, 72, 26) +
      A.text(282, 84, '3 tries', { size: 9.5, weight: 800 }) + [0, 1, 2].map(i => A.use(B, 250 + i * 16, 96, 22) + (i < used ? A.path(`M${257 + i * 16} ${100} l9 13 M${266 + i * 16} ${100} l-9 13`, { stroke: '#2a2420', sw: 1.8 }) : '')).join(''));
    const at = (cx, cy, s, rot = 0) => A.group(A.use(H, cx - s / 2, cy - s / 2, s), `rotate(${rot} ${cx} ${cy})`);
    const slapped = A.k('hY', at(190, 108, 62)) + A.k('hB', at(170, 98, 52, 90));
    const toMe = pile.map(([k], i) => A.k(k, put(146 + i * 0.6, 152 - 5 - i * 0.6, B, 40))).join('');
    return [
      { step: 0, say: 'You flip **7{=club}**. No face card, no match. Ben is next.', svg: scene + mine() + piles(2) + A.glow(132, 102, 26) },
      { step: 0, say: 'Ben flips {=kh}: a King. Lee now has **3 tries** to play a face card or ace.', svg: scene + mine() + piles(3) + tries(0) + A.glow(149, 98, 26) },
      { step: 1, say: 'Lee flips 4{=diamond}, then 9{=spade}: no face card. One try left.', svg: scene + mine() + piles(5) + tries(2) },
      { step: 1, say: 'Lee’s third card: 9{=heart} on 9{=spade}, a **double**. Anyone may slap now.', svg: scene + mine() + piles(6) + tries(2) + A.glow(192, 100, 32) },
      { step: 3, say: 'You **slap** first. Ben’s hand lands on top of yours: too late, the lowest hand wins.', svg: scene + mine() + piles(6) + slapped },
      { step: 3, say: 'You put all **6 cards** face down under your stack and flip next.', svg: scene + mine(4) + toMe },
      { step: 3, say: 'Later: 6{=club} on 5{=spade}, and Lee slaps. **Wrong slap**: Lee burns a card face down under the pile.',
        svg: scene + mine(4) + A.k('burn', A.group(put(86, 96, B, 40), 'rotate(-25 99 114)')) + pc('n1', 0, '5', '♠') + pc('n2', 1, '6', '♣') +
          A.k('hL', at(146, 116, 44, 180)) + A.glow(94, 124, 18) },
    ];
  },

  art(A) {
    const put = (x, y, svg, s = 44) => A.use(svg, x - s / 6, y - s / 24, s);
    const F = (r, s) => mini(A, r, s), B = back(A), H = hand(A);
    let o = A.bg('#f4f6fb');
    for (let i = 0; i < 16; i++) o += A.rect(i * 20, 0, 10, 200, '#3d6fb6', { rx: 0, sw: 0, opacity: 0.28 });
    for (let j = 0; j < 10; j++) o += A.rect(0, j * 20, 320, 10, '#3d6fb6', { rx: 0, sw: 0, opacity: 0.28 });
    // Players' face-down stacks.
    const stack = (x, y, n, rot) => { let s = ''; for (let j = 0; j < n; j++) s += put(x + j * 1.5, y - j * 1.5, B, 40); return A.group(s, `rotate(${rot} ${x + 14} ${y + 18})`); };
    o += stack(20, 30, 4, -12) + stack(264, 34, 3, 10) + stack(40, 140, 5, 6);
    // Burned card peeking out under the pile.
    o += A.group(put(118, 104, B, 40), 'rotate(-28 132 122)');
    // The pile: messy, the top two are 9s.
    const pile = [['Q', '♣', -16], ['3', '♦', 12], ['A', '♠', -5], ['8', '♣', 20], ['9', '♠', -9], ['9', '♥', 6]];
    pile.forEach(([r, s, rot], i) => { const x = 140 + (i % 3) * 6 - 6, y = 70 + (i % 2) * 5; o += A.group(put(x, y, F(r, s), 48), `rotate(${rot} ${x + 16} ${y + 22})`); });
    // A hand coming down from the right, with motion lines.
    o += A.group(A.use(H, 200, 84, 64), 'rotate(-55 232 116)');
    [0, 1, 2].forEach(i => { o += A.line(258 + i * 6, 136 + i * 10, 280 + i * 8, 150 + i * 12, { sw: 2.2, stroke: '#2a2420' }); });
    o += A.note(160, 74, 196, 18, 'Double 9s: slap it!');
    o += A.note(128, 132, 92, 186, 'Bad slap: burn a card');
    o += A.note(36, 50, 66, 110, 'Face-down stack');
    o += A.note(240, 112, 262, 186, 'First hand down wins');
    return o;
  },
});
}
