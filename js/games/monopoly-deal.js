defineGame({
  id: 'monopoly-deal',
  name: 'Monopoly Deal',
  year: 2008,
  designer: 'Katharine Chapman',
  family: 'cards',
  players: [2, 5], best: '3–4',
  time: [15, 30],
  age: 8,
  mechanics: ['set-collection', 'take-that', 'hand-management'],
  profile: { complexity: 2, luck: 4, interaction: 5, conflict: 5, talk: 3, planning: 2 },
  color: '#2f7a55',

  pitch: 'Race to complete three colour sets of property while charging rent, stealing deeds and saying “No!” at the perfect moment.',
  theme: 'You are a cut-throat property tycoon squeezing the whole table for rent.',

  goal: { big: '3 full sets', text: 'Be the first to have **3 complete property sets**, each a **different colour**, on the table in front of you.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Draw', text: 'Draw **2** cards, or **5** if you start your turn with an empty hand.' },
      { verb: 'Play', text: 'Play **up to 3** cards: bank money, lay down properties, or play actions such as rent.' },
      { verb: 'Discard', text: 'If you hold more than **7** cards, discard down to 7.' },
    ],
  },

  tension: 'Every action card is also money: bank it now to protect yourself, or hold it to steal the set you need?',

  flow: [
    { label: 'Collect', items: ['Draw cards', 'Bank money', 'Charge rent', 'Debt Collector · Birthday'] },
    { label: 'Build', items: ['Lay properties', 'Wilds fill gaps', 'Add House · Hotel'] },
    { label: 'Steal', items: ['Sly Deal', 'Forced Deal', 'Deal Breaker'] },
  ],

  end: {
    trigger: 'a player has 3 complete sets of different colours',
    detail: 'You win the instant your third set is complete, even mid-turn.',
    results: [
      { side: 'Winner', text: 'the first player with 3 full sets of different colours.' },
      { side: 'Everyone else', text: 'loses; there is no score count.' },
    ],
  },

  ref: {
    title: 'Key action cards',
    rows: [
      ['Rent', '2-colour card: everyone pays · wild rent: one player'],
      ['Sly Deal · Forced Deal', 'steal 1 property · swap 1 (not from a full set)'],
      ['Deal Breaker', 'steal a whole complete set'],
      ['Debt Collector · Birthday', '5M from one player · 2M from everyone'],
      ['Just Say No', 'cancel an action played on you (can be re-countered)'],
      ['Double the Rent', 'play with a rent card; it counts as a play'],
    ],
  },

  example: 'Dev has 2 of the 3 greens. He plays a **Sly Deal** to steal Lia’s lone green, completing his set, then a green/blue Rent card: Lia and Sam each owe 7M for a full green set. Lia pays with a 10M note and gets **no change**. That’s Dev’s 3 plays.',

  setup: [
    'Remove the 4 quick-reference cards and shuffle the rest of the deck.',
    'Deal **5 cards** to each player.',
    'Youngest player goes first; play passes to the left.',
  ],

  terms: [
    ['Bank', 'Your face-up money pile; used to pay debts.'],
    ['Full set', 'All the property cards of one colour (2–4 cards, shown on the card).'],
    ['Wild', 'A property card that can count as one of two colours (or any colour).'],
    ['M', 'Millions, the money unit. Notes run 1M to 10M.'],
  ],

  gotchas: [
    'You pay from your **bank and properties**, never your hand, and **no change** is given. If you can’t cover it, pay all you have.',
    'Properties can’t go in the bank. Action cards banked as money **lose** their action.',
    '**Just Say No** doesn’t count as a play when used on someone else’s turn, and another Just Say No cancels it.',
  ],

  tips: [
    'Bank a little money early so a rent card doesn’t strip your properties.',
    'Save Just Say No for a Deal Breaker or a big rent bill.',
    'Watch who has two near-complete sets; that’s who your steals should hit.',
  ],

  walk(A) {
    const C = A.C, G = '#2f8a4a', W = 24, H = 34;
    const face = (x, y, inner) => A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, W, H, C.white, { rx: 3, sw: 1.1 }) + inner;
    const prop = (x, y, col) => face(x, y, A.rect(x + 2.5, y + 2.5, W - 5, 9, col, { rx: 1.5, sw: 0 }) + A.rect(x + 6, y + 17, 12, 2, '#c9c2b4', { sw: 0, rx: 1 }) + A.rect(x + 6, y + 22, 12, 2, '#c9c2b4', { sw: 0, rx: 1 }));
    const money = (x, y, v, col) => face(x, y, A.rect(x + 2.5, y + 2.5, W - 5, H - 5, col, { rx: 2, sw: 0 }) + A.circle(x + W / 2, y + H / 2, 7.5, C.white, { sw: 0, opacity: 0.85 }) + A.text(x + W / 2, y + H / 2, v + 'M', { size: 6, weight: 800 }));
    const action = (x, y, a, b, col) => face(x, y, A.rect(x + 2.5, y + 2.5, W - 5, H - 5, '#efe3c8', { rx: 2, sw: 0 }) + A.circle(x + W / 2, y + 13, 6, col, { sw: 0.8 }) + A.text(x + W / 2, y + 24, a, { size: 5, weight: 800 }) + A.text(x + W / 2, y + 29.5, b, { size: 5, weight: 800 }));
    const rent = (x, y) => face(x, y, A.rect(x + 2.5, y + 2.5, W - 5, H - 5, '#efe3c8', { rx: 2, sw: 0 }) + A.path(`M${x + 6} ${y + 13} a6 6 0 0 1 12 0 z`, { fill: G, sw: 0.8 }) + A.path(`M${x + 6} ${y + 13} a6 6 0 0 0 12 0 z`, { fill: '#1f4fa0', sw: 0.8 }) + A.text(x + W / 2, y + 27, 'RENT', { size: 5.5, weight: 800 }));
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
      { step: 0, say: 'Dev has **2 of the 3** greens. His turn starts: draw 2 cards.', svg: board + at(opp, ['sly', 'rent', 'brown']) + k('d1', back(153, 72)) + k('d2', back(153, 72)) + A.glow(124, 140, 26, 'g-set') },
      { step: 0, say: 'He draws a **3M** and a second brown property.', svg: board + at(opp, ['sly', 'rent', 'brown', 'd1', 'd2']) },
      { step: 1, say: '**Play 1: Sly Deal.** Steal one property that isn’t part of a full set: Lia’s lone green.', svg: board + at({ ...opp, sly: disc }, ['rent', 'brown', 'd1', 'd2']) + A.glow(32, 41, 22, 'g-lia') },
      { step: 1, say: 'The green joins Dev’s set: **a full set** of 3.', svg: board + at({ ...stole, sly: disc }, ['rent', 'brown', 'd1', 'd2']) + A.glow(124, 146, 30, 'g-set') },
      { step: 1, say: '**Play 2: green/blue Rent.** A full green set charges **7M** to every other player.', svg: board + at({ ...stole, ...used }, ['brown', 'd1', 'd2']) + owe },
      { step: 1, say: 'Lia pays with her **10M** note and gets **no change**. Sam pays 5M + 2M. It all goes to Dev’s bank.', svg: board + at({ ...paid, ...used }, ['brown', 'd1', 'd2']) },
      { step: 2, say: '**Play 3:** bank the 3M. That’s 3 plays, and with only 2 cards in hand there’s nothing to discard.', svg: board + at({ ...paid, ...used, d1: bank(4) }, ['brown', 'd2']) },
    ];
  },

  art(A) {
    const C = A.C;
    const P = { brown: '#8a5a33', dblue: '#1f4fa0', green: '#2f8a4a', red: '#c8423b', yellow: '#e8c547', lblue: '#8ec8ea', orange: '#e07b2e' };
    let o = A.bg('#2e6a4c');
    o += A.rect(6, 6, 308, 188, '#357a57', { sw: 0, rx: 14 });
    // Property card: white with a colour band.
    const prop = (x, y, col, r = 0) => A.group(
      A.rect(2, 3, 30, 42, C.shadow, { sw: 0, rx: 4 }) + A.rect(0, 0, 30, 42, C.white, { rx: 4, sw: 1.2 }) +
      A.rect(3, 3, 24, 12, col, { rx: 2, sw: 0 }) + A.rect(7, 21, 16, 2.5, '#c9c2b4', { sw: 0, rx: 1 }) + A.rect(7, 27, 16, 2.5, '#c9c2b4', { sw: 0, rx: 1 }) + A.rect(7, 33, 10, 2.5, '#c9c2b4', { sw: 0, rx: 1 }),
      `translate(${x} ${y}) rotate(${r})`);
    // A column of cards fanned downward.
    const set = (x, y, col, n) => { let s = ''; for (let i = 0; i < n; i++) s += prop(x, y + i * 12, col); return s; };
    const money = (x, y, v, col, r = 0) => A.group(
      A.rect(2, 3, 30, 42, C.shadow, { sw: 0, rx: 4 }) + A.rect(0, 0, 30, 42, C.white, { rx: 4, sw: 1.2 }) + A.rect(3, 3, 24, 36, col, { rx: 3, sw: 0 }) +
      A.circle(15, 21, 9.5, C.white, { sw: 0, opacity: 0.85 }) + A.text(15, 21.5, v + 'M', { size: 8.5, weight: 800 }),
      `translate(${x} ${y}) rotate(${r})`);
    const back = (x, y) => A.rect(x + 2, y + 3, 30, 42, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, 30, 42, C.white, { rx: 4, sw: 1.2 }) + A.rect(x + 3, y + 3, 24, 36, '#b3263e', { rx: 3, sw: 0 }) + A.rect(x + 8, y + 12, 14, 18, 'none', { stroke: C.white, sw: 1.2, rx: 2 });

    // Opponent's side (top): a completed red set and a partial yellow.
    o += A.person(296, 30, 26, '#a6846b', { face: '#d9b48f' });
    o += set(150, 12, P.red, 3) + set(190, 12, P.yellow, 1) + set(230, 12, P.lblue, 2);
    o += money(108, 14, 10, '#d9c38a', -6);

    // Centre: draw pile + discard with an action card.
    o += back(22, 64) + back(25, 61);
    o += A.group(A.rect(2, 3, 34, 46, C.shadow, { sw: 0, rx: 4 }) + A.rect(0, 0, 34, 46, C.white, { rx: 4, sw: 1.2 }) +
      A.rect(3, 3, 28, 40, '#efe3c8', { rx: 3, sw: 0 }) + A.circle(17, 18, 9, '#b3263e', { sw: 1 }) +
      A.line(11, 12, 23, 24, { stroke: C.white, sw: 2.4 }) + A.text(17, 35, 'ACTION', { size: 5.5, weight: 800 }), 'translate(62 60) rotate(8)');

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
