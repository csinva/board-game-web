defineGame({
  id: 'monopoly-deal',
  name: 'Monopoly Deal',
  year: 2008,
  designer: 'Katharine Chapman',
  family: 'cards',
  players: [2, 5], best: '4',
  time: [15, 15],
  age: 8,
  mechanics: ['set-collection', 'take-that', 'hand-management'],
  profile: { complexity: 2, luck: 4, interaction: 5, conflict: 5, talk: 3, planning: 2 },
  color: '#2f7a55',

  // Card faces drawn once: used inline in text and (tinted) in art + walk, so they match.
  icons: (() => {
    const face = (A, inner) => A.rect(4, 1, 16, 22.6, '#fff', { rx: 2, sw: 1.3 }) + inner;
    const lines = A => A.rect(8, 13, 8, 1.6, '#c9c2b4', { sw: 0, rx: 0.8 }) + A.rect(8, 16.5, 8, 1.6, '#c9c2b4', { sw: 0, rx: 0.8 });
    const prop = (A, col, col2) => face(A, A.rect(5.7, 2.7, 12.6, 7.5, col, { rx: 1, sw: 0 }) + (col2 ? A.rect(12, 2.7, 6.3, 7.5, col2, { rx: 1, sw: 0 }) : '') + lines(A));
    const money = (A, v, fill) => face(A, A.rect(5.7, 2.7, 12.6, 19.2, fill, { rx: 1.4, sw: 0 }) + A.circle(12, 12.3, 5, '#fff', { sw: 0, opacity: 0.85 }) + A.text(12, 12.5, v + 'M', { size: v === '' ? 6 : 4, weight: 800 }));
    const cream = (A, inner) => face(A, A.rect(5.7, 2.7, 12.6, 19.2, '#efe3c8', { rx: 1.4, sw: 0 }) + inner);
    const rent = A => cream(A, A.path('M8 9.5 a4 4 0 0 1 8 0 z', { fill: '#2f8a4a', sw: 0.6 }) + A.path('M8 9.5 a4 4 0 0 0 8 0 z', { fill: '#1f4fa0', sw: 0.6 }) + A.text(12, 18, 'RENT', { size: 3.7, weight: 800 }));
    return {
      prop: { name: 'property card', draw: A => prop(A, '#2f8a4a'), tint: prop },
      wild: { name: 'property wild', draw: A => prop(A, '#2f8a4a', '#1f4fa0') },
      money: { name: 'money card', draw: A => money(A, '', '#e8d79a'), value: money },
      action: { name: 'action card', draw: A => cream(A, A.circle(12, 10, 5, '#b3263e', { sw: 0.8 }) + A.line(9, 7, 15, 13, { stroke: '#fff', sw: 1.6 }) + A.rect(8, 17, 8, 1.6, '#8c877f', { sw: 0, rx: 0.8 })) },
      rent: { name: 'rent card', draw: rent },
      house: { name: 'House', draw: A => cream(A, A.house(12, 17, 10, '#2fa84f')) },
      hotel: { name: 'Hotel', draw: A => cream(A, A.rect(7.5, 10, 9, 7, '#c8423b', { rx: 0.6, sw: 1 }) + A.poly([[7, 10.5], [12, 6.5], [17, 10.5]], '#c8423b', { sw: 1 })) },
    };
  })(),

  pitch: 'Bank money, lay property cards and charge rent; first to 3 complete colour sets wins.',

  goal: { big: '3 full sets', text: 'First to have **3 complete property sets**, each a **different colour**, on the table.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Draw', text: 'Draw **2** cards, or **5** if your hand is empty.' },
      { verb: 'Play', text: 'Play **up to 3** cards: {money}s or {action}s to your bank, {prop}s to the table, or {action}s such as {rent}s to the centre.' },
      { verb: 'Discard', text: 'Discard down to **7** cards.' },
    ],
  },

  tension: 'Every action card is also money: bank it for protection, or hold it to steal the set you need.',

  structure: [
    { label: 'Setup', text: 'Shuffle; deal 5 cards each.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Draw 2 (5 if your hand is empty), play up to 3, discard to 7. Deck empty: shuffle the discards.' },
    { label: 'Game end', text: 'The moment a player has 3 full sets of different colours, they win.' },
  ],

  end: {
    trigger: 'a player has 3 complete sets of different colours',
    detail: 'You win the moment you have 3 full sets, even mid-turn. Wilds can be moved to complete a set only on your turn.',
    results: [
      { side: 'Winner', text: 'the first player with 3 full sets of different colours.' },
      { side: 'Everyone else', text: 'loses; there is no score count.' },
    ],
  },

  ref: {
    title: 'Rent (M) for 1 / 2 / 3 / 4 properties owned',
    rows: [
      ['Brown · Utility', '1 / 2 · 1 / 2'],
      ['Light blue · Pink', '1 / 2 / 3 · 1 / 2 / 4'],
      ['Orange · Red', '1 / 3 / 5 · 2 / 3 / 6'],
      ['Yellow · Green', '2 / 4 / 6 · 2 / 4 / 7'],
      ['Dark blue', '3 / 8'],
      ['Railroad', '1 / 2 / 3 / 4'],
    ],
  },

  example: 'Dev has {=prop}{=prop} of the 3 greens. **Sly Deal** steals Lia’s lone green to complete the set. A green/blue {=rent}: Lia and Sam each owe 7M. Lia pays a 10M note and gets **no change**. That’s 2 of Dev’s 3 plays.',

  setup: [
    '110 cards: 4 quick-reference cards (set aside), 20 {money}s, 28 {prop}s, 11 {wild}s, 13 {rent}s, 34 other {action}s. Shuffle all but the reference cards.',
    'Deal **5 cards** each.',
    'Youngest goes first; play passes left.',
  ],

  terms: [
    ['{=money} Bank', 'Your face-up money pile; pays debts. M = millions; notes run 1M to 10M.'],
    ['{=prop}{=prop}{=prop} Full set', 'Every property of one colour (2–4 cards; the number is on the card).'],
    ['{=wild} Wild', 'Property for either colour shown. The 2 any-colour wilds have no money value. Move wilds between sets on your turn; it isn’t a play.'],
    ['{=rent} Rent', 'Two-colour: every other player pays rent for one of your sets in those colours. Any-colour: one player pays. **Double the Rent** doubles it.'],
    ['Sly Deal · Forced Deal', 'Steal one property · swap one of yours for one of theirs. Never from a full set.'],
    ['Deal Breaker', 'Steal a full set, with its House and Hotel.'],
    ['Debt Collector · Birthday · Pass Go', '5M from one player · 2M from every player · draw 2 cards.'],
    ['{=house} House · {=hotel} Hotel', '+3M / +4M rent on a full set; one each per set; Hotel needs a House. Not on railroads or utilities.'],
  ],

  gotchas: [
    'Pay from your **bank and properties** (your pick), never your hand. **No change** is given. Short: pay everything you have; nothing on the table: pay nothing.',
    'Paid money goes to the receiver’s bank; paid properties go to their table. Properties never go in a bank.',
    'Action cards banked as money **lose** their action for good.',
    'Every card played counts toward the 3, including Pass Go, Double the Rent, House and Hotel. Check the 7-card limit at the **end** of your turn.',
    '**Just Say No** cancels any action played against you, even on another player’s turn (then it isn’t one of your plays). Another Just Say No cancels it, and so on.',
  ],

  tips: [
    'Bank some money early so a rent card doesn’t strip your properties.',
    'Save Just Say No for a Deal Breaker or a big rent bill.',
    'Aim steals at whoever has two near-complete sets.',
  ],

  walk(A) {
    const C = A.C, G = '#2f8a4a', W = 24, H = 34;
    const face = (x, y, inner) => A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, W, H, C.white, { rx: 3, sw: 1.1 }) + inner;
    // Property, money and rent cards are the inline icons drawn at 24×34.
    const I = this.icons, big = (svg, x, y) => A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 3 }) + A.use(svg, x - 6, y - 1.5, 36);
    const prop = (x, y, col) => big(I.prop.tint(A, col), x, y);
    const money = (x, y, v, col) => big(I.money.value(A, v, col), x, y);
    const action = (x, y, a, b, col) => face(x, y, A.rect(x + 2.5, y + 2.5, W - 5, H - 5, '#efe3c8', { rx: 2, sw: 0 }) + A.circle(x + W / 2, y + 13, 6, col, { sw: 0.8 }) + A.text(x + W / 2, y + 24, a, { size: 5, weight: 800 }) + A.text(x + W / 2, y + 29.5, b, { size: 5, weight: 800 }));
    const rent = (x, y) => big(I.rent.draw(A), x, y);
    const back = (x, y) => face(x, y, A.rect(x + 2.5, y + 2.5, W - 5, H - 5, '#b3263e', { rx: 2, sw: 0 }));
    const MC = { 1: '#e8d79a', 2: '#e3b9a0', 3: '#a6d36b', 5: '#c7a2d6', 10: '#d9c38a' };
    const bank = (i) => [8 + (i % 3) * 30, 136 + Math.floor(i / 3) * 26], set = (i) => [112, 120 + i * 12], hand = (i) => [204 + i * 22, 150], disc = [196, 72];
    let board = A.bg('#2e6a4c') + A.rect(4, 4, 312, 192, '#357a57', { sw: 0, rx: 12 });
    board += A.tag(30, 13, 'Lia', { fill: '#a6846b' }) + A.tag(196, 13, 'Sam', { fill: '#a6846b' }) + A.tag(36, 122, 'Dev (you)', { fill: '#b3263e' });
    board += back(150, 75) + back(153, 72) + A.text(165, 116, 'deck', { size: 7, fill: C.white }) + A.text(208, 116, 'discard', { size: 7, fill: C.white });
    board += prop(56, 24, '#c8423b') + prop(56, 36, '#c8423b') + prop(176, 24, '#1f4fa0');
    board += prop(...set(0), G) + prop(...set(1), G) + money(...bank(0), 1, MC[1]);
    const k = (key, svg) => A.k(key, svg);
    // Every card that moves, by key: where it is is passed in per slide.
    const cards = {
      liaG: (x, y) => prop(x, y, G), lia10: (x, y) => money(x, y, 10, MC[10]), sam5: (x, y) => money(x, y, 5, MC[5]), sam2: (x, y) => money(x, y, 2, MC[2]),
      sly: (x, y) => action(x, y, 'SLY', 'DEAL', '#7d55b5'), rent: (x, y) => rent(x, y), brown: (x, y) => prop(x, y, '#8a5a33'),
      d1: (x, y) => money(x, y, 3, MC[3]), d2: (x, y) => prop(x, y, '#8a5a33'),
    };
    const at = (place, handList) => {
      let s = '';
      handList.forEach((name, i) => { s += k(name, cards[name](...hand(i))); });
      for (const name in place) s += k(name, cards[name](...place[name]));
      return s;
    };
    const opp = { liaG: [20, 24], lia10: [96, 24], sam5: [216, 24], sam2: [244, 24] };
    const stole = { liaG: set(2), lia10: [96, 24], sam5: [216, 24], sam2: [244, 24] };
    const paid = { liaG: set(2), lia10: bank(1), sam5: bank(2), sam2: bank(3) };
    const used = { sly: disc, rent: [disc[0] + 4, disc[1] + 3] };
    const owe = k('oweL', A.tag(60, 84, 'Lia owes 7M', { fill: '#b3263e' })) + k('oweS', A.tag(268, 84, 'Sam owes 7M', { fill: '#b3263e' }));
    return [
      { step: 0, say: 'Dev has **2 of 3** greens {=prop}{=prop}. Draw 2 cards.', svg: board + at(opp, ['sly', 'rent', 'brown']) + k('d1', back(153, 72)) + k('d2', back(153, 72)) + A.glow(124, 140, 26, 'g-set') },
      { step: 0, say: 'He draws a **3M** {=money} and a second brown property.', svg: board + at(opp, ['sly', 'rent', 'brown', 'd1', 'd2']) },
      { step: 1, say: '**Play 1: Sly Deal.** Steal one property not in a full set: Lia’s lone green.', svg: board + at({ ...opp, sly: disc }, ['rent', 'brown', 'd1', 'd2']) + A.glow(32, 41, 22, 'g-lia') },
      { step: 1, say: 'The green completes Dev’s set: **3 of 3**.', svg: board + at({ ...stole, sly: disc }, ['rent', 'brown', 'd1', 'd2']) + A.glow(124, 146, 30, 'g-set') },
      { step: 1, say: '**Play 2: green/blue {rent}.** A full green set charges **7M** to every other player.', svg: board + at({ ...stole, ...used }, ['brown', 'd1', 'd2']) + owe },
      { step: 1, say: 'Lia pays **10M** and gets **no change**. Sam pays 5M + 2M. All of it goes to Dev’s bank.', svg: board + at({ ...paid, ...used }, ['brown', 'd1', 'd2']) },
      { step: 2, say: '**Play 3:** bank the 3M. With 2 cards in hand, nothing to discard.', svg: board + at({ ...paid, ...used, d1: bank(4) }, ['brown', 'd2']) },
    ];
  },

  art(A) {
    const C = A.C;
    const P = { brown: '#8a5a33', dblue: '#1f4fa0', green: '#2f8a4a', red: '#c8423b', yellow: '#e8c547', lblue: '#8ec8ea', orange: '#e07b2e' };
    let o = A.bg('#2e6a4c');
    o += A.rect(6, 6, 308, 188, '#357a57', { sw: 0, rx: 14 });
    // Property card: white with a colour band.
    // Property and money cards: the inline icons drawn at 30×42.
    const I = this.icons;
    const prop = (x, y, col, r = 0) => A.group(A.rect(2, 3, 30, 42, C.shadow, { sw: 0, rx: 4 }) + A.use(I.prop.tint(A, col), -7.5, -1.9, 45), `translate(${x} ${y}) rotate(${r})`);
    // A column of cards fanned downward.
    const set = (x, y, col, n) => { let s = ''; for (let i = 0; i < n; i++) s += prop(x, y + i * 12, col); return s; };
    const money = (x, y, v, col, r = 0) => A.group(A.rect(2, 3, 30, 42, C.shadow, { sw: 0, rx: 4 }) + A.use(I.money.value(A, v, col), -7.5, -1.9, 45), `translate(${x} ${y}) rotate(${r})`);
    const back = (x, y) => A.rect(x + 2, y + 3, 30, 42, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, 30, 42, C.white, { rx: 4, sw: 1.2 }) + A.rect(x + 3, y + 3, 24, 36, '#b3263e', { rx: 3, sw: 0 }) + A.rect(x + 8, y + 12, 14, 18, 'none', { stroke: C.white, sw: 1.2, rx: 2 });

    // Opponent's side (top): a completed red set and a partial yellow.
    o += A.person(296, 30, 26, '#a6846b', { face: '#d9b48f' });
    o += set(150, 12, P.red, 3) + set(190, 12, P.yellow, 1) + set(230, 12, P.lblue, 2);
    o += money(108, 14, 10, '#d9c38a', -6);

    // Centre: draw pile + discard with an action card.
    o += back(22, 64) + back(25, 61);
    o += A.group(A.rect(2, 3, 34, 46, C.shadow, { sw: 0, rx: 4 }) + A.use(I.action.draw(A), -8.5, -2, 51), 'translate(62 60) rotate(8)');

    // Your side (bottom): bank + property sets.
    o += money(18, 136, 1, '#e8d79a') + money(24, 138, 2, '#e3b9a0') + money(30, 140, 5, '#c7a2d6') + money(36, 142, 3, '#a6d36b');
    o += set(112, 110, P.brown, 2) + set(150, 110, P.dblue, 2) + set(188, 110, P.green, 2);
    // Missing third green, dashed.
    o += A.rect(188, 134, 30, 42, 'none', { stroke: C.white, sw: 1.4, dash: '4 3', rx: 4 });
    // Your hand.
    o += A.fan(278, 168, 4, 26, 38, [P.orange, '#b3263e', '#d9c38a', P.dblue], { spread: 8, dx: 15 });
    o += A.curve(64, 106, 140, 90, 198, 130, { stroke: '#f2c14e', sw: 1.8, head: 6 });
    o += A.bubble(196, 66, 82, 22, 'Just Say No!', { size: 9.5, color: '#b3263e' });

    o += A.note(40, 150, 50, 190, 'Bank: money only');
    o += A.note(165, 150, 182, 190, 'Full sets win (need 3)');
    o += A.note(36, 82, 56, 46, 'Draw 2, play up to 3');
    o += A.note(266, 158, 270, 112, 'Max 7 in hand');
    return o;
  },
});
