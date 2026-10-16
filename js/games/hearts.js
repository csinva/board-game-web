{
// Mini playing card in a 24×24 icon box: rank on top, suit below.
const mini = (A, r, s, o = {}) => {
  const col = (s === '♥' || s === '♦') ? '#c8423b' : '#2a2420';
  return A.rect(3, 0.5, 18, 23, '#fffdf7', { rx: 2.5, sw: o.sw || 1.3, stroke: o.stroke }) +
    A.text(12, 7.2, r, { size: r.length > 1 ? 10 : 12.5, weight: 800, fill: col }) + A.text(12, 17.2, s + '\uFE0E', { size: 14, weight: 400, fill: col });
};
// Pass-direction badge: green felt square with a white arrow.
const badge = (A, inner) => A.rect(2, 2, 20, 20, '#2e6e4b', { rx: 4, sw: 1.3 }) + inner;
const arrow = (A, rot) => A.group(A.poly([[3.5, 12], [11, 4.5], [11, 9], [20, 9], [20, 15], [11, 15], [11, 19.5]], '#fff', { sw: 0 }), `rotate(${rot} 12 12)`);

defineGame({
  id: 'hearts',
  name: 'Hearts',
  year: '1880s',
  designer: 'Traditional',
  family: 'trick',
  players: [3, 5], best: '4',
  time: [30, 60],
  age: 10,
  mechanics: ['trick-taking', 'hand-management', 'take-that', 'press-your-luck'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 4, talk: 2, planning: 2 },

  icons: {
    qs: { name: 'Queen of Spades', draw: A => mini(A, 'Q', '♠', { stroke: '#c8423b', sw: 1.8 }) },
    c2: { name: '2 of clubs', draw: A => mini(A, '2', '♣') },
    moon: { name: 'shoot the moon', draw: A => A.circle(12, 12, 10, '#24304f', { sw: 1.3 }) + A.path('M14.5 4.5 a7.6 7.6 0 1 0 5 12.5 a6 6 0 1 1 -5 -12.5z', { fill: '#f2d675', sw: 0.9 }) },
    left: { name: 'pass left', draw: A => badge(A, arrow(A, 0)) },
    right: { name: 'pass right', draw: A => badge(A, arrow(A, 180)) },
    across: { name: 'pass across', draw: A => badge(A, arrow(A, 90)) },
    hold: { name: 'hold (no pass)', draw: A => badge(A, A.circle(12, 12, 6.5, 'none', { stroke: '#fff', sw: 2.8 }) + A.line(7.5, 16.5, 16.5, 7.5, { stroke: '#fff', sw: 2.8 })) },
  },

  pitch: 'Play tricks and avoid taking hearts and the Queen of Spades; lowest score when someone hits 100 wins.',

  goal: { big: 'Fewest points', text: 'Hearts cost **1** point each, the Queen of Spades **13**. Lowest total when someone reaches 100 wins.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'Deal all 52 cards: **13** each with 4 players.' },
      { verb: 'Pass', text: 'Everyone passes **3 cards** at once: {=left} left, {=right} right, {=across} across, {=hold} no pass, repeating (4 players).' },
      { verb: 'Play tricks', text: 'The {=c2} holder leads it. Clockwise, follow suit if you can, else play anything; the highest card of the suit led wins and leads next.' },
      { verb: 'Score', text: 'Add 1 per {=heart} and 13 for the {=qs} in your tricks to your total.' },
    ],
  },

  tension: 'High cards can catch the Queen of Spades, but dumping them all leaves you unable to stop a moon shot.',

  structure: [
    { label: 'Setup', text: 'Deal 13 each (4 players). Pass direction starts {=left} left.' },
    { label: 'Hands', repeat: 'until 100', text: 'Pass 3 cards ({=left} {=right} {=across} {=hold} in rotation), play 13 tricks, add penalty points.' },
    { label: 'Game end', text: 'Someone reaches **100** after a hand: lowest total wins.' },
  ],

  points: [
    ['{=heart} Each heart', '+1 (13 in the deck)'],
    ['{=qs} Queen of Spades', '+13'],
    ['{=moon} Shoot the moon', 'Take all 13 {=heart} and the {=qs}: you 0 and everyone else +26, or you −26 (your choice)'],
  ],

  end: {
    trigger: 'someone reaches 100 points at the end of a hand',
    results: [
      { side: 'Lowest score wins', text: 'the **fewest** points when anyone reaches 100.' },
    ],
  },

  ref: {
    title: 'Passing & leading',
    rows: [
      ['Card rank', 'A K Q J 10 … 2; no trump suit'],
      ['Pass cycle (4)', '{=left} → {=right} → {=across} → {=hold}'],
      ['Pass cycle (3)', '{=left} → {=right} → {=hold}'],
      ['First lead', '{c2}'],
    ],
  },

  example: 'On a {=left} hand, Maya passes **A{=spade} K{=spade} 10{=heart}** to Ben. Later, Ben leads 4{=diamond}; Maya has no diamonds and dumps the {qs}. Lee’s K{=diamond} is highest, so Lee takes the trick and 13 points.',

  setup: [
    'Standard 52-card deck. 4 players: 13 each. 3 players: remove 2{=diamond}, 17 each. 5 players: remove 2{=diamond} and 2{=club}, 10 each; the 3{=club} leads first.',
    'First hand passes {=left} left; the direction rotates each hand.',
    'Keep a running score per player on paper.',
  ],

  terms: [
    ['Trick', 'One card from each player; the highest card of the suit led takes them all.'],
    ['Follow suit', 'Play a card of the suit led. Required if you have one.'],
    ['Void', 'No cards of a suit, so you may discard anything on it.'],
    ['{=heart} Broken', 'Hearts are broken once a heart has been played to a trick; only then may hearts be led.'],
    ['{=moon} Moon', 'Take all 13 {=heart} and the {=qs}: +26 to everyone else, or −26 to you.'],
  ],

  gotchas: [
    'You can’t **lead** a heart until hearts are broken, unless your hand is all hearts.',
    'Standard rules allow hearts and the {=qs} on the **first trick**. Common house rule: no points on trick 1 unless you hold nothing else; another: the {=qs} also breaks hearts.',
    'Choose your 3 pass cards **before** you see what you receive.',
  ],

  tips: [
    'Pass A{=spade} and K{=spade} unless you hold several low spades to guard them: they catch the {=qs}.',
    'Pass away a short suit to make yourself **void**, so you can dump the {=qs} and hearts early.',
    'If one player is taking every heart, win one heart trick to stop the {=moon} moon shot.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', W = 30, H = 42, ic = this.icons;
    const face = (x, y, r, s) => {
      const col = (s === '♥' || s === '♦') ? R : C.ink;
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fffdf7', { rx: 4, sw: 1.2 }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: col }) + A.text(x + W / 2 + 1, y + H / 2 + 4, s, { size: 18, fill: col });
    };
    const back = (x, y, w = 22, h = 30) => A.rect(x, y, w, h, '#7a2638', { rx: 3, sw: 1.1, stroke: '#f3e6e0' }) + A.rect(x + 3, y + 3, w - 6, h - 6, 'none', { rx: 2, sw: 0.6, stroke: '#e3a9b4' });
    let board = A.bg('#1f4f36') + A.rect(5, 5, 310, 190, '#2e6e4b', { rx: 24, sw: 0 });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 64, 22, 30) + back(270 + i * 6, 64, 22, 30) + back(118 + i * 8, 10, 22, 30);
    board += A.tag(42, 52, 'Ben') + A.tag(282, 52, 'Jo') + A.tag(76, 24, 'Lee') + A.tag(42, 176, 'You (Maya)');
    const hand = { AS: ['A', '♠'], KS: ['K', '♠'], QS: ['Q', '♠'], TH: ['10', '♥'], C3: ['3', '♣'], C8: ['8', '♣'] };
    const mine = (ids) => ids.map((id, i) => A.k(id, face(96 + i * 34, 150, ...hand[id]))).join('');
    const passed = A.k('AS', face(10, 100, 'A', '♠')) + A.k('KS', face(28, 103, 'K', '♠')) + A.k('TH', face(46, 106, '10', '♥'));
    const dir = A.k('dir', A.use(ic.left.draw(A), 84, 112, 26));
    const left = ['QS', 'C3', 'C8'];
    const ben = A.k('D4', face(104, 80, '4', '♦')), lee = A.k('DK', face(145, 46, 'K', '♦')), jo = A.k('D7', face(186, 80, '7', '♦'));
    const queen = A.k('QS', face(145, 98, 'Q', '♠'));
    const pile = (x, y) => A.k('D4', face(x, y, '4', '♦')) + A.k('D7', face(x + 6, y + 2, '7', '♦')) + A.k('QS', face(x + 12, y + 4, 'Q', '♠')) + A.k('DK', face(x + 18, y + 6, 'K', '♦'));
    const rest = A.k('C3', face(130, 150, '3', '♣')) + A.k('C8', face(164, 150, '8', '♣'));
    return [
      { step: 0, say: 'Deal 13 each. Maya’s **A{=spade} K{=spade}** could catch the {qs}.', svg: board + mine(['AS', 'KS', 'QS', 'TH', 'C3', 'C8']) + A.glow(129, 171, 34) },
      { step: 1, say: '{=left} hand: Maya passes A{=spade} K{=spade} 10{=heart} face down to Ben and gets 3 from Jo.', svg: board + mine(left) + passed + dir + A.glow(43, 125, 32) },
      { step: 2, say: 'Later, Ben leads **4{=diamond}**. Lee plays K{=diamond}, Jo 7{=diamond}: everyone follows suit.', svg: board + mine(left) + passed + ben + lee + jo },
      { step: 2, say: 'Maya has **no diamonds**, so she may play anything. She dumps the {=qs}.', svg: board + rest + passed + ben + lee + jo + queen + A.glow(160, 119, 28) },
      { step: 2, say: 'K{=diamond} is the highest card of the suit led: **Lee** takes the trick, {=qs} included, and leads next.', svg: board + rest + passed + pile(200, 30) + A.glow(225, 55, 34) },
      { step: 3, say: 'End of hand: Lee scores **13** for the {=qs} plus 1 per {=heart} taken. Lowest total wins.', svg: board + rest + passed + pile(200, 30) +
        A.k('score', A.rect(112, 76, 96, 40, '#fbf6ec', { rx: 4, sw: 1.2 }) + A.text(146, 89, 'Lee', { size: 10, weight: 800 }) + A.text(146, 104, '+13', { size: 14, weight: 800, fill: R }) + A.use(ic.qs.draw(A), 168, 80, 32)) },
    ];
  },

  art(A) {
    const C = A.C, R = '#c8423b', back = '#7a2638', ic = this.icons;
    const pc = (x, y, r, s, o = {}) => {
      const w = o.w || 22, h = o.h || 31, col = (s === '♥' || s === '♦') ? R : C.ink;
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#fffdf7', { rx: 3, sw: 1 }) +
        A.text(x + 6, y + 7, r, { size: 8, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 3, s, { size: 13, fill: col });
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const bk = (x, y, w, h) => A.rect(x, y, w, h, back, { rx: 2.5, sw: 1, stroke: '#f3e6e0' }) + A.rect(x + 2.5, y + 2.5, w - 5, h - 5, 'none', { rx: 1.5, sw: 0.6, stroke: '#e3a9b4' });
    let o = A.bg('#1f4f36') + A.rect(5, 5, 310, 190, '#2e6e4b', { rx: 24, sw: 0 });
    // score pad
    o += A.group(A.rect(12, 12, 70, 50, '#fbf6ec', { rx: 2, sw: 1 }) + A.line(12, 24, 82, 24, { sw: 0.7 }) +
      ['M', 'B', 'L', 'J'].map((n, i) => A.text(21 + i * 17, 18, n, { size: 7, weight: 800 })).join('') +
      [[3, 13, 0, 10], [9, 16, 13, 14]].map((row, j) => row.map((v, i) => A.text(21 + i * 17, 32 + j * 11, v, { size: 7, fill: '#555' })).join('')).join('') +
      A.line(14, 54, 80, 54, { sw: 0.5, stroke: '#aaa' }), 'rotate(-4 47 37)');
    // other hands (backs)
    for (let i = 0; i < 7; i++) o += bk(122 + i * 11, 10, 16, 23);
    for (let i = 0; i < 5; i++) o += bk(12, 94 + i * 10, 23, 16);
    for (let i = 0; i < 5; i++) o += bk(285, 40 + i * 10, 23, 16);
    // trick in the centre: the Queen of Spades is the icon card, enlarged
    o += pc(148, 44, '10', '♦', { rot: -3 }) + pc(117, 76, '4', '♦', { rot: -8 }) + A.group(A.use(ic.qs.draw(A), 172, 75, 42), 'rotate(7 190 96)') + pc(148, 106, 'K', '♦', { rot: 2 });
    // my hand
    const hand = [['3', '♣'], ['7', '♣'], ['J', '♣'], ['2', '♥'], ['9', '♥'], ['5', '♠'], ['8', '♠']];
    hand.forEach(([r, s], i) => { o += pc(94 + i * 19, 150 + Math.abs(i - 3) * 1.5, r, s, { rot: (i - 3) * 3 }); });
    // taken tricks with hearts
    o += bk(246, 146, 22, 31) + bk(249, 143, 22, 31) + pc(262, 146, '6', '♥', { rot: 12 }) + pc(276, 150, 'A', '♥', { rot: 22 });
    // pass arrow + direction badge
    o += A.curve(92, 168, 56, 176, 40, 150, { sw: 1.6, stroke: '#f6efdc' }) + A.use(ic.left.draw(A), 54, 128, 20);
    o += A.note(206, 92, 252, 124, 'Queen of Spades = 13');
    o += A.note(274, 160, 252, 190, 'Each heart = 1');
    o += A.note(48, 46, 58, 78, 'Lowest total wins');
    o += A.note(62, 174, 50, 190, 'Pass 3, then play');
    return o;
  },
});
}
