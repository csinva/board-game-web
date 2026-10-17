defineGame({
  id: 'splendor',
  name: 'Splendor',
  year: 2014,
  designer: 'Marc André',
  family: 'engine',
  players: [2, 4], best: '3',
  time: [30, 30],
  age: 10,
  mechanics: ['engine-building', 'set-collection', 'resource-management', 'tableau'],
  profile: { complexity: 1, luck: 2, interaction: 2, conflict: 2, talk: 1, planning: 3 },

  // Gem tokens, gold, development card and noble: used inline and drawn the same way in art + walk.
  icons: (() => {
    const G = { white: '#f4f2ee', blue: '#2f6db5', green: '#2f8a4f', red: '#c8423b', black: '#2b2b2b', gold: '#e2b33c' };
    const gem = (A, x, y, r, f) => A.poly([[x, y - r], [x + r, y - r * 0.2], [x + r * 0.6, y + r], [x - r * 0.6, y + r], [x - r, y - r * 0.2]], f, { sw: 0.8 });
    const tok = (c, name) => ({ name, draw: A => A.circle(12, 12, 10.5, G[c], { sw: 1.3 }) + gem(A, 12, 12, 5.2, c === 'white' ? '#c9d3e0' : 'rgba(255,255,255,.6)') });
    return {
      white: tok('white', 'diamond'), blue: tok('blue', 'sapphire'), green: tok('green', 'emerald'), red: tok('red', 'ruby'), black: tok('black', 'onyx'),
      gold: { name: 'gold', draw: A => A.circle(12, 12, 10.5, G.gold, { sw: 1.3 }) + A.star(12, 12.5, 6, '#fff3c4', { sw: 0.7 }) },
      dev: { name: 'development card', draw: A => A.rect(4, 1, 16, 22, '#fffdf7', { rx: 2, sw: 1.3 }) + A.rect(5.5, 2.5, 13, 7, G.red, { rx: 1, sw: 0 }) + A.text(8.5, 6.2, '2', { size: 6, weight: 800, fill: '#fff' }) + gem(A, 15, 6, 2.5, 'rgba(255,255,255,.75)') + A.circle(8.5, 19, 2.3, G.green, { sw: 0.6 }) + A.circle(8.5, 13.5, 2.3, G.red, { sw: 0.6 }) },
      noble: { name: 'noble', draw: A => A.rect(2, 3, 20, 18, '#e9dcc0', { rx: 2, sw: 1.3 }) + A.person(15, 13.5, 14, '#8a5a33', { face: '#e8c9a8' }) + A.text(6.5, 8, '3', { size: 7, weight: 800 }) + A.rect(4, 12, 5, 3, G.red, { rx: 0.5, sw: 0.5 }) + A.rect(4, 16, 5, 3, G.white, { rx: 0.5, sw: 0.5 }) },
    };
  })(),

  pitch: 'Take gem tokens to buy cards whose gems discount later buys; first to 15 points ends the game, most points wins.',

  goal: { big: '15 prestige', text: 'Reach **15 prestige points** from cards and nobles. The round is then finished, and the highest total wins.' },

  turn: {
    type: 'choose',
    steps: [
      { verb: 'Take 3', text: 'Take 1 gem token each of **3 different** colours from the bank, e.g. {=red}{=green}{=blue}. Never {=gold}.' },
      { verb: 'Take 2', text: 'Take **2 tokens of one colour** ({=red}{=red}), only if that pile has at least 4 tokens before you take. Never {=gold}.' },
      { verb: 'Reserve', text: 'Take 1 face-up card, or the top card of any level’s deck without showing it, into your hand. If you took a face-up card, refill its gap from that level’s deck. Also take 1 {gold} if any are left. You can’t reserve if you already hold 3 reserved cards.' },
      { verb: 'Buy', text: 'Buy 1 face-up {dev} or 1 of your reserved cards: pay its cost minus your **bonuses**; each {=gold} pays for 1 gem of any colour. Paid tokens go back to the bank. Place the card face up in front of you, and refill a face-up gap from that level’s deck.' },
    ],
    outro: 'Then: a noble may visit · cut tokens to 10 · next player clockwise',
  },

  tension: 'Cheap no-point cards build the discounts that make big cards affordable, but every building turn is a turn not scoring, and rivals can take the card you were saving for.',

  structure: [
    { label: 'Setup', text: 'Lay out 4 face-up cards per level; reveal 1 more {=noble} than there are players; set out tokens for the player count (see table).' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn, exactly 1 action: take 3, take 2, reserve or buy. Then a {=noble} may visit, and you return tokens above 10.' },
    { label: 'Last round', text: 'When a player reaches **15** or more points, finish the current round, so everyone has had the same number of turns.' },
    { label: 'Game end', text: 'Most prestige wins. Tie: the tied player with the fewest development cards wins.' },
  ],

  points: [
    ['{=dev} Development card', 'points printed on it: level 1 = 0–1, level 2 = 1–3, level 3 = 3–5'],
    ['{=noble} Noble', '3 points each; a noble visits you when your card bonuses meet its requirement'],
  ],

  end: { trigger: 'a player reaches 15 or more prestige', detail: 'Finish the round so everyone has had the same number of turns. Tie: the tied player with the fewest development cards wins.' },
  scoring: [
    { label: 'Level 2–3 cards', share: 6 },
    { label: '{=noble} Nobles', share: 3 },
    { label: 'Level 1 cards', share: 1 },
  ],

  ref: {
    title: 'Tokens by player count',
    rows: [
      ['Gems', '{white} {blue} {green} {red} {black}'],
      ['2 players', '4 of each gem · 3 {=noble}'],
      ['3 players', '5 of each gem · 4 {=noble}'],
      ['4 players', '7 of each gem · 5 {=noble}'],
      ['{=gold} Gold', 'always 5'],
    ],
  },

  example: 'A level 2 red card costs {=white} {=blue}{=blue}{=blue}{=blue} {=green}{=green} and is worth **2 points**. Your cards give bonuses of 3 white, 3 blue and 1 green, which cover 1 white, 3 blue and 1 green of the cost, so you pay only {=blue}{=green}. Its red bonus completes a noble’s requirement: she visits for **+3**.',

  setup: [
    'Shuffle each level’s deck separately; lay out 4 face-up cards from each level.',
    'Reveal noble tiles: 1 more than the number of players.',
    'Set out gem tokens for your player count (table), plus all 5 {gold}.',
    'Youngest player goes first; play passes clockwise.',
  ],

  terms: [
    ['Bonus', 'The gem printed on a card you own: a permanent discount of 1 gem of that colour on every purchase.'],
    ['{=noble} Noble', 'Visits automatically at the end of your turn when your bonuses meet its requirement; at most 1 per turn.'],
    ['Reserve', 'Take a card into your hand to buy later, plus 1 gold if any are left.'],
    ['{=gold} Gold', 'Wild token; spends as any gem.'],
  ],

  gotchas: [
    '**Take 2** needs at least 4 tokens in that pile before you take.',
    'Hold at most **10 tokens**, {=gold} included; return extras of your choice at the end of your turn.',
    'Nobles count **card bonuses only**, never tokens. You can’t refuse a noble. At most 1 noble visits you per turn; if you qualify for several, you choose which.',
    '{=gold} comes only from reserving. Reserved cards stay in your hand until bought; you can’t discard them.',
  ],

  tips: [
    'Early on, buy cheap level 1 cards in the colours nobles and level 3 cards want.',
    'Reserve to get gold or to block a card a rival is about to buy.',
    'At 10+ points, buy the biggest card you can, not more bonuses.',
  ],

  walk(A) {
    const C = A.C;
    const G = { white: '#f4f2ee', blue: '#2f6db5', green: '#2f8a4f', red: '#c8423b', black: '#2b2b2b', gold: '#e2b33c' };
    const ink = (c) => (c === 'white' || c === 'gold' ? C.ink : C.white);
    const gemIcon = (x, y, r, f) => A.poly([[x, y - r], [x + r, y - r * 0.2], [x + r * 0.6, y + r], [x - r * 0.6, y + r], [x - r, y - r * 0.2]], f, { sw: 0.8 });
    // Development card: bonus colour, points, cost [[colour, n], ...].
    const card = (x, y, bonus, pts, cost) => {
      let s = A.card(x, y, 36, 48, '#efe6d0', { face: '#fffdf7' }) + A.rect(x + 3, y + 3, 30, 11, G[bonus], { rx: 2, sw: 0 });
      if (pts) s += A.text(x + 9, y + 8.5, pts, { size: 9, weight: 800, fill: ink(bonus) });
      s += gemIcon(x + 27, y + 8.5, 4, 'rgba(255,255,255,.7)');
      cost.forEach(([c, n], k) => { s += A.circle(x + 9, y + 39 - k * 11, 4.5, G[c], { sw: 0.8 }) + A.text(x + 9, y + 39.5 - k * 11, n, { size: 6, weight: 800, fill: ink(c) }); });
      return s;
    };
    // Gem tokens are the inline token icons (radius 9).
    const I = this.icons, chip = (x, y, c, r) => A.use(I[c].draw(A), x - r * 12 / 10.5, y - r * 12 / 10.5, r * 24 / 10.5);
    const token = (x, y, c) => chip(x, y, c, 9);
    const noble = (x, y, req) => {
      let s = A.rect(x, y, 40, 36, '#e9dcc0', { rx: 3, sw: 1.2 }) + A.text(x + 8, y + 8, '3', { size: 9, weight: 800 }) + A.person(x + 28, y + 19, 18, '#8a5a33', { face: '#e8c9a8' });
      req.forEach(([c, n], k) => { s += A.rect(x + 3, y + 15 + k * 7, 11, 6, G[c], { rx: 1, sw: 0.6 }) + A.text(x + 8.5, y + 18 + k * 7, n, { size: 5, weight: 800, fill: ink(c) }); });
      return s;
    };
    // Bank: piles on the right.
    const bankOrder = ['white', 'blue', 'green', 'red', 'black', 'gold'];
    const bankAt = (c) => { const i = bankOrder.indexOf(c); return [262 + (i % 2) * 32, 20 + Math.floor(i / 2) * 30]; };
    let board = A.bg('#2f3b4a') + A.rect(4, 4, 226, 104, '#3b4a5c', { rx: 8, sw: 0 }) + A.rect(240, 4, 76, 104, '#3b4a5c', { rx: 8, sw: 0 });
    board += A.rect(4, 114, 312, 82, '#46566a', { rx: 8, sw: 0 });
    bankOrder.forEach((c) => { const [x, y] = bankAt(c); for (let k = 3; k >= 1; k--) board += A.circle(x, y + k * 2.5, 9, G[c], { sw: 1.2 }); board += chip(x, y, c, 9); });
    board += A.text(278, 100, 'bank', { size: 8, weight: 700, fill: '#dfe6ee' });
    board += A.k('noble-b', noble(10, 8, [['green', 4], ['black', 4]]));
    board += A.card(10, 54, 30, 48, '#e2b33c', { label: '••', size: 9 });
    board += A.k('c0', card(46, 54, 'blue', 1, [['blue', 2], ['green', 2], ['red', 3]])) + A.k('c2', card(130, 54, 'white', 2, [['red', 5]])) + A.k('c3', card(172, 54, 'black', 1, [['white', 3], ['blue', 2], ['green', 2]]));
    board += A.tag(30, 126, 'You', { w: 40 });
    // Your tableau: stacks of bonus cards by colour.
    const stack = (col, color, n) => { let s = ''; for (let k = 0; k < n; k++) s += card(64 + col * 42, 120 + k * 9, color, 0, []); return s; };
    board += stack(0, 'white', 3) + stack(1, 'blue', 3) + stack(2, 'green', 1) + stack(3, 'red', 2);
    const pts = (n) => A.k('pts' + n, A.text(30, 145, n + ' pts', { size: 11, weight: 800, fill: '#fff3c4' }));
    const target = (x, y) => A.k('target', card(x, y, 'red', 2, [['white', 1], ['blue', 4], ['green', 2]]));
    const nobleA = (x, y) => A.k('noble-a', noble(x, y, [['red', 3], ['white', 3], ['blue', 3]]));
    const tokBank = (c) => A.k('t-' + c, token(...bankAt(c), c));
    const tokYou = (c, i) => A.k('t-' + c, token(254 + i * 22, 168, c));
    const youTok = tokYou('red', 0) + tokYou('green', 1) + tokYou('blue', 2);
    return [
      { step: 0, say: 'Target: a level 2 red card costing {=white} {=blue}{=blue}{=blue}{=blue} {=green}{=green}, worth 2. First turn: **take 3** different gems.', svg: board + target(88, 54) + nobleA(56, 8) + pts(4) +
        tokBank('red') + tokBank('green') + tokBank('blue') + A.glow(106, 78, 28) },
      { step: 0, say: '{=red}{=green}{=blue} move from the bank to you. Next player.', svg: board + target(88, 54) + nobleA(56, 8) + pts(4) + youTok },
      { step: 3, say: 'Next turn, **buy**. Your bonus cards (3 white, 3 blue, 1 green) are permanent discounts: you pay only {=blue}{=green}.', svg: board + target(88, 54) + nobleA(56, 8) + pts(4) + youTok + A.glow(82, 150, 24) + A.glow(124, 150, 24) + A.glow(166, 144, 22) },
      { step: 3, say: 'The tokens return to the bank, the card joins your red stack (**+2 points**) and a new card fills the gap.', svg: board + nobleA(56, 8) + pts(6) + tokBank('blue') + tokBank('green') + tokYou('red', 0) +
        target(190, 138) + A.k('c1new', card(88, 54, 'green', 1, [['white', 2], ['blue', 3], ['black', 2]])) },
      { step: 3, say: 'Your bonuses now show 3 red, 3 white and 3 blue: the {=noble} **visits** for **+3**. Total 9.', svg: board + pts(9) + tokBank('blue') + tokBank('green') + tokYou('red', 0) +
        target(190, 138) + A.k('c1new', card(88, 54, 'green', 1, [['white', 2], ['blue', 3], ['black', 2]])) + nobleA(12, 158) + A.glow(32, 176, 24) },
    ];
  },

  art(A) {
    const C = A.C;
    const G = { white: '#f4f2ee', blue: '#2f6db5', green: '#2f8a4f', red: '#c8423b', black: '#2b2b2b', gold: '#e2b33c' };
    let o = A.bg('#2f3b4a');
    o += A.rect(4, 4, 232, 192, '#3b4a5c', { rx: 8, sw: 0 });
    const gemIcon = (x, y, r, f) => A.poly([[x, y - r], [x + r, y - r * 0.2], [x + r * 0.6, y + r], [x - r * 0.6, y + r], [x - r, y - r * 0.2]], f, { sw: 0.8 });
    // nobles
    const nobles = [[['red', 4], ['green', 4]], [['white', 3], ['blue', 3], ['black', 3]], [['blue', 4], ['white', 4]], [['green', 3], ['red', 3], ['black', 3]]];
    nobles.forEach((req, i) => {
      const x = 52 + i * 44, y = 8;
      o += A.rect(x, y, 36, 34, '#e9dcc0', { rx: 3, sw: 1.2 }) + A.text(x + 8, y + 9, '3', { size: 10, weight: 800 });
      o += A.person(x + 24, y + 17, 18, '#8a5a33', { face: '#e8c9a8' });
      req.forEach(([c, n], k) => { o += A.rect(x + 3, y + 16 + k * 6, 8, 5, G[c], { rx: 1, sw: 0.6 }); });
    });
    // decks and cards
    const lv = [['#2f6db5', 3], ['#e2b33c', 2], ['#3c8d4f', 1]];
    const cards = [
      [['white', 4, ['blue', 'red']], ['black', 3, ['green']], ['red', 5, ['green', 'white']], ['blue', 4, ['black']]],
      [['green', 2, ['red', 'blue']], ['blue', 1, ['white', 'black']], ['red', 2, ['green']], ['white', 3, ['red']]],
      [['red', 0, ['white', 'blue']], ['green', 0, ['red', 'black']], ['black', 1, ['blue']], ['white', 0, ['green', 'red']]],
    ];
    lv.forEach(([f, n], r) => {
      const y = 48 + r * 50;
      o += A.card(10, y, 34, 46, f, { label: '•'.repeat(n), size: 10 });
      cards[r].forEach(([bonus, pts, cost], i) => {
        const x = 52 + i * 44;
        o += A.card(x, y, 38, 46, '#efe6d0', {});
        o += A.rect(x + 3, y + 3, 32, 12, 'rgba(255,255,255,.7)', { rx: 2, sw: 0 });
        if (pts) o += A.text(x + 10, y + 9.5, pts, { size: 10, weight: 800 });
        o += gemIcon(x + 28, y + 9.5, 5, G[bonus]);
        cost.forEach((c, k) => { o += A.circle(x + 9, y + 38 - k * 11, 4.5, G[c], { sw: 0.8 }) + A.text(x + 9, y + 38.5 - k * 11, [[7, 3, 6, 5, 3, 7, 6, 3], [3, 2, 5, 3, 2, 4, 5, 2], [1, 2, 3, 1, 2, 2, 1, 3]][r][i * 2 + k], { size: 6, weight: 800, fill: c === 'white' || c === 'gold' ? C.ink : C.white }); });
      });
    });
    // token stacks
    // Token stacks: the top chip is the inline token icon.
    const order = ['white', 'blue', 'green', 'red', 'black', 'gold'];
    order.forEach((c, i) => {
      const x = 260 + (i % 2) * 34, y = 62 + Math.floor(i / 2) * 36;
      for (let k = 3; k >= 1; k--) o += A.circle(x, y + k * 2.5, 13, G[c], { sw: 1.2 });
      o += A.use(this.icons[c].draw(A), x - 13 * 12 / 10.5, y - 13 * 12 / 10.5, 13 * 24 / 10.5);
    });
    o += A.note(214, 26, 272, 16, 'Nobles: +3', { w: 70 });
    o += A.note(212, 157, 272, 178, 'Bonus = discount');
    o += A.note(268, 104, 276, 38, 'Gem tokens', { w: 70 });
    return o;
  },
});
