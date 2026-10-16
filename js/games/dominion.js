defineGame({
  id: 'dominion',
  name: 'Dominion',
  year: 2008,
  designer: 'Donald X. Vaccarino',
  family: 'cards',
  players: [2, 4], best: '3',
  time: [30, 45],
  age: 13,
  mechanics: ['deck-building', 'hand-management', 'engine-building', 'take-that'],
  profile: { complexity: 2, luck: 2, interaction: 2, conflict: 2, talk: 1, planning: 4 },

  // Components drawn once, used inline in text ({copper}, {=c3}) and in the art + walkthrough.
  icons: (() => {
    const coin = n => ({ name: n + (n === 1 ? ' coin' : ' coins'), draw: A => A.circle(12, 12, 10, '#e8c547', { sw: 1.4 }) + A.circle(12, 12, 7.6, 'none', { sw: 0.8, stroke: '#b58a12' }) + A.text(12, 12.8, String(n), { size: 12.5, weight: 800 }) });
    const card = (name, fill, inner) => ({ name, draw: A => A.rect(4, 1, 16, 22, fill, { rx: 2.5, sw: 1.3 }) + inner(A) });
    const disc = (A, f) => A.circle(12, 12, 5.2, f, { sw: 1.1 });
    const plus = A => A.circle(18, 18, 5.6, '#2a2420', { sw: 0 }) + A.line(15, 18, 21, 18, { stroke: '#fff', sw: 1.8 }) + A.line(18, 15, 18, 21, { stroke: '#fff', sw: 1.8 });
    const o = {
      action: card('Action card', '#efe2c2', A => A.rect(6.5, 4, 11, 8, '#a7c4d9', { rx: 1, sw: 0.8 }) + A.line(7.5, 15.5, 16.5, 15.5, { sw: 1.1 }) + A.line(7.5, 18.5, 14, 18.5, { sw: 1.1 })),
      victory: card('Victory card', '#5ea25a', A => A.path('M8 6 h8 v5 q0 5 -4 7 q-4 -2 -4 -7 z', { fill: '#fff', sw: 1 })),
      curse: card('Curse', '#7d55b5', A => A.path('M8 8 l8 8 M16 8 l-8 8', { stroke: '#fff', sw: 2.2 })),
      copper: card('Copper', '#c08245', A => disc(A, '#e8a86a')),
      silver: card('Silver', '#b7bec7', A => disc(A, '#e6eaef')),
      gold: card('Gold', '#e2b33c', A => disc(A, '#f6d873')),
      estate: card('Estate', '#8fbf6a', A => A.house(12, 17, 9, '#fff')),
      duchy: card('Duchy', '#5ea25a', A => A.city(12.5, 17.5, 9, '#fff')),
      province: card('Province', '#2f7a3d', A => A.crown(12, 16, 11, '#e8c547')),
      vp: { name: 'victory point', draw: A => A.path('M4 3 h16 v8 q0 8 -8 11 q-8 -3 -8 -11 z', { fill: '#2f7a3d', sw: 1.3 }) + A.star(12, 11, 4.5, '#fff', { sw: 0 }) },
      'plus-card': { name: '+Card', draw: A => A.rect(2, 3, 13, 18, '#7d5532', { rx: 2, sw: 1.2 }) + A.rect(5, 6, 7, 12, 'none', { rx: 1, sw: 1, stroke: '#e8c547' }) + plus(A) },
      'plus-action': { name: '+Action', draw: A => A.rect(2, 3, 13, 18, '#efe2c2', { rx: 2, sw: 1.2 }) + A.rect(4, 5.5, 9, 6.5, '#a7c4d9', { rx: 1, sw: 0.7 }) + A.line(4.5, 15, 12, 15, { sw: 1 }) + plus(A) },
      'plus-buy': { name: '+Buy', draw: A => A.path('M5 9 Q8.5 1.5 12 9', { sw: 1.4 }) + A.poly([[1.5, 9], [15.5, 9], [13.5, 19], [3.5, 19]], '#c08245', { sw: 1.2 }) + plus(A) },
      trash: { name: 'trash', draw: A => A.rect(5, 7, 14, 15, '#8c877f', { rx: 1.5, sw: 1.3 }) + A.rect(3, 4, 18, 3.4, '#a9a49b', { rx: 1, sw: 1.2 }) + A.rect(9.5, 2, 5, 2.4, '#a9a49b', { rx: 1, sw: 1 }) + A.line(9, 10, 9, 19, { sw: 1 }) + A.line(15, 10, 15, 19, { sw: 1 }) },
    };
    [0, 1, 2, 3, 4, 5, 6, 8].forEach(n => { o['c' + n] = coin(n); });
    return o;
  })(),

  pitch: 'Start with 10 weak cards, buy better ones each turn, and finish with the most victory points in your deck.',

  goal: { big: 'Most VP in deck', text: 'Most **victory points** among all your cards when the game ends. {=province} Provinces (6 {=vp}) are the big prize.' },

  turn: {
    type: 'sequence',
    intro: 'Three phases, in order (A-B-C):',
    steps: [
      { verb: 'Action', text: 'Play **one** {=action} Action card and follow it: {plus-card} draws, each {plus-action} lets you play one more.' },
      { verb: 'Buy', text: 'Play {=copper}{=silver}{=gold} Treasures, total the coins, and buy **one** card from the Supply (more with {plus-buy}).' },
      { verb: 'Clean-up', text: 'Discard all cards in play and in hand, then draw **5**.' },
    ],
  },

  tension: 'Each card you buy dilutes your deck: {=action} Actions make turns stronger, {=victory} Victory cards do nothing in hand, so you must choose when to switch from building to buying points.',

  structure: [
    { label: 'Setup', text: 'Each player shuffles 7 {=copper} + 3 {=estate} into a deck and draws 5.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Action, Buy, Clean-up. When your deck runs out, shuffle your discard pile into a new deck.' },
    { label: 'Game end', text: 'After the turn that empties the {=province} pile or any 3 Supply piles, count {=vp} in your whole deck.' },
  ],

  points: [
    ['{=estate} Estate', '1 {=vp}'],
    ['{=duchy} Duchy', '3 {=vp}'],
    ['{=province} Province', '6 {=vp}'],
    ['{=curse} Curse', '−1 {=vp} (given to you by attacks like Witch)'],
    ['{=victory} Kingdom Victory cards', 'as printed (e.g. Gardens: 1 {=vp} per 10 cards in your deck)'],
  ],

  end: { trigger: 'the Province pile empties, or any 3 Supply piles empty', detail: 'Finish that turn. (5–6 players, with a second set: any 4 piles.) Tie: fewer turns wins; still tied, share the win.' },
  scoring: [
    { label: '{=province} Provinces', share: 6 },
    { label: '{=duchy} Duchies', share: 2 },
    { label: '{=estate} Estates', share: 1 },
  ],

  ref: {
    title: 'Basic Supply costs',
    rows: [
      ['{=copper} Copper', 'costs {=c0} → worth {=c1}'],
      ['{=silver} Silver', 'costs {=c3} → worth {=c2}'],
      ['{=gold} Gold', 'costs {=c6} → worth {=c3}'],
      ['{=estate} {=duchy} {=province}', 'cost {=c2} · {=c5} · {=c8}'],
      ['{=action} Kingdom cards', 'cost {=c2}–{=c6}, printed bottom-left'],
    ],
  },

  example: 'Hand: {=action} Village, {=action} Smithy, {=copper}{=copper}{=estate}. Play **Village** (+1 Card, +2 Actions) and draw {=silver}. Play **Smithy** (+3 Cards) and draw {=gold}{=copper}{=estate}. Treasures: 1+1+2+3+1 = **8 coins**; buy a {province}.',

  setup: [
    'Each player shuffles 7 {copper}s and 3 {estate}s into a deck and draws 5.',
    'Lay out 10 {=action} Kingdom piles (10 cards each) plus the {=copper}{=silver}{=gold} Treasure, {=estate}{=duchy}{=province} Victory and {=curse} Curse piles, and a Trash spot.',
    'Victory piles (including Kingdom ones like Gardens): 8 cards each with 2 players, 12 with 3–4. Curses: 10 per player beyond the first.',
  ],

  terms: [
    ['Supply', 'The face-up piles you buy from.'],
    ['{=action} Kingdom cards', 'The 10 piles (mostly Actions) chosen for this game.'],
    ['{=plus-action} +Action', 'Lets you play one more Action card this turn.'],
    ['{=trash} Trash', 'Remove a card from the game; it leaves your deck for good.'],
    ['Attack', 'Action that hurts other players (e.g. Militia: each discards down to 3). A Reaction such as Moat, revealed from hand, blocks it.'],
  ],

  gotchas: [
    'Bought cards go to your **discard pile**, not your hand. They reach your hand after a shuffle.',
    'Each Action played uses your 1 Action; “+1 Action” only replaces it. Play Villages **before** draw cards.',
    'Unspent coins are lost at Clean-up. Draw your next hand **before** the next player starts.',
  ],

  tips: [
    'First-game plan: 6–7 coins → **Gold**, 8 → **Province**, plus 1–2 good Actions early.',
    'Skip Estates and Duchies early; they clog your hand. Buy them once Provinces run low.',
    'Actions without +Action (terminals) collide in one hand. Pair them with Villages.',
  ],

  walk(A) {
    const C = A.C, I = this.icons;
    const T = {
      copper: ['#c08245', 'Copper', '1', 0], silver: ['#b7bec7', 'Silver', '2', 3], gold: ['#e2b33c', 'Gold', '3', 6],
      estate: ['#8fbf6a', 'Estate', '1VP', 2], province: ['#2f7a3d', 'Province', '6VP', 8],
      village: ['#efe2c2', 'Village', '+2 Act', 3], smithy: ['#efe2c2', 'Smithy', '+3 Card', 4],
    };
    const face = (x, y, t) => {
      const [f, n, v, cost] = T[t];
      let s = A.card(x, y, 30, 42, f, {}) + A.rect(x + 4, y + 4, 22, 9, C.white, { rx: 2, sw: 0, opacity: 0.9 }) + A.text(x + 15, y + 8.5, n, { size: 5, weight: 800 });
      if (v[0] === '+') s += A.text(x + 15, y + 24, v, { size: 5.5, weight: 800 });
      else if (v.indexOf('VP') > 0) s += A.use(A.path('M4 3 h16 v8 q0 8 -8 11 q-8 -3 -8 -11 z', { fill: '#2f7a3d', sw: 1.3 }), x + 7, y + 16, 16) + A.text(x + 15, y + 22.5, parseInt(v, 10), { size: 6.5, weight: 800, fill: C.white });
      else s += A.use(I['c' + v].draw(A), x + 7, y + 16, 16);
      return s + A.use(I['c' + cost].draw(A), x + 3.5, y + 30.5, 9);
    };
    const back = (x, y) => A.card(x, y, 30, 42, '#7d5532', {}) + A.rect(x + 8, y + 8, 14, 26, 'none', { rx: 2, stroke: '#e8c547', sw: 1.2 });
    const DECK = [8, 146], DISC = [282, 146], PROV = [8, 6];
    const P = (i) => [44 + i * 33, 63], H = (i) => [48 + i * 32, 146];
    let base = A.bg('#d8c69c') + A.rect(0, 0, 320, 52, '#cdb98b', { sw: 0, rx: 0 });
    ['province', 'gold', 'silver', 'village', 'smithy', 'estate'].forEach((t, i) => { base += A.rect(11 + i * 38, 3, 30, 42, '#efe6cf', { rx: 4, sw: 1 }) + face(8 + i * 38, 6, t); });
    base += A.rect(6, 58, 308, 52, 'rgba(255,255,255,.3)', { rx: 6, sw: 1, dash: '4 3' }) + A.text(24, 84, 'In play', { size: 8, weight: 700, rotate: -90 });
    base += A.rect(11, 149, 30, 42, '#6f4a2c', { rx: 5, sw: 1 }) + back(...DECK) + A.text(23, 195, 'Deck', { size: 7, weight: 700 });
    base += A.rect(282, 146, 30, 42, 'none', { rx: 5, sw: 1, dash: '3 2' }) + A.text(297, 195, 'Discard', { size: 7, weight: 700 });
    base += A.tag(160, 128, 'Your hand');
    const status = (a, b, c, hi) => A.rect(236, 5, 78, 42, C.paper, { rx: 4, sw: 1 }) + (hi ? A.rect(240, hi * 11 - 1.5, 70, 11, '#ffd76a', { rx: 3, sw: 0 }) : '') +
      A.text(275, 15, 'Actions ' + a, { size: 8 }) + A.text(275, 26, 'Buys ' + b, { size: 8 }) + A.text(275, 37, 'Coins ' + c, { size: 8, weight: 800 });
    const show = (list) => list.map(([k, [x, y], t]) => A.k(k, t ? face(x, y, t) : back(x, y))).join('');
    const NEW = ['n1', 'n2', 'n3', 'n4', 'n5'], NEWT = ['copper', 'silver', 'copper', 'estate', 'copper'];
    const deck = (keys) => keys.map(k => [k, DECK, null]);
    const prov = ['prov', PROV, 'province'];
    return [
      { step: 0, say: 'Hand: Village, Smithy, 2 Coppers, Estate. **Action phase**: you have 1 Action.', svg: base + status(1, 1, 0) +
        show([...deck(['silver', 'gold', 'c3', 'e2', ...NEW]), prov, ['village', H(0), 'village'], ['smithy', H(1), 'smithy'], ['c1', H(2), 'copper'], ['c2', H(3), 'copper'], ['e1', H(4), 'estate']]) + A.glow(63, 167, 24, 'g-hand') },
      { step: 0, say: 'Play **Village**: +1 Card (a Silver), +2 Actions.', svg: base + status(2, 1, 0, 1) +
        show([...deck(['gold', 'c3', 'e2', ...NEW]), prov, ['village', P(0), 'village'], ['smithy', H(0), 'smithy'], ['c1', H(1), 'copper'], ['c2', H(2), 'copper'], ['e1', H(3), 'estate'], ['silver', H(4), 'silver']]) },
      { step: 0, say: 'Spend an Action on **Smithy**: +3 Cards ({=gold}{=copper}{=estate}).', svg: base + status(1, 1, 0) +
        show([...deck(NEW), prov, ['village', P(0), 'village'], ['smithy', P(1), 'smithy'], ['c1', H(0), 'copper'], ['c2', H(1), 'copper'], ['e1', H(2), 'estate'], ['silver', H(3), 'silver'], ['gold', H(4), 'gold'], ['c3', H(5), 'copper'], ['e2', H(6), 'estate']]) },
      { step: 1, say: '**Buy phase.** Play Treasures: {=copper}{=copper}{=silver}{=gold}{=copper} = **8 coins**. Estates do nothing.', svg: base + status(1, 1, 8, 3) +
        show([...deck(NEW), prov, ['village', P(0), 'village'], ['smithy', P(1), 'smithy'], ['c1', P(2), 'copper'], ['c2', P(3), 'copper'], ['silver', P(4), 'silver'], ['gold', P(5), 'gold'], ['c3', P(6), 'copper'], ['e1', H(0), 'estate'], ['e2', H(1), 'estate']]) },
      { step: 1, say: 'Buy a {province} (6 {=vp}). It goes to your **discard pile**, not your hand.', svg: base + status(1, 0, 0) +
        show([...deck(NEW), ['village', P(0), 'village'], ['smithy', P(1), 'smithy'], ['c1', P(2), 'copper'], ['c2', P(3), 'copper'], ['silver', P(4), 'silver'], ['gold', P(5), 'gold'], ['c3', P(6), 'copper'], ['e1', H(0), 'estate'], ['e2', H(1), 'estate'], ['prov', DISC, 'province']]) + A.glow(297, 167, 21, 'g-disc') },
      { step: 2, say: '**Clean-up.** Discard everything played and held. Draw **5**.', svg: base + status(1, 1, 0) +
        show([['prov', DISC, 'province'], ...['village', 'smithy', 'c1', 'c2', 'silver', 'gold', 'c3', 'e1'].map((k, i) => [k, DISC, ['village', 'smithy', 'copper', 'copper', 'silver', 'gold', 'copper', 'estate'][i]]), ['e2', DISC, 'estate'],
          ...NEW.map((k, i) => [k, H(i), NEWT[i]])]) },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
    let o = A.bg('#d8c69c');
    o += A.rect(0, 0, 320, 106, '#cdb98b', { sw: 0, rx: 0 });
    const pile = (x, y, fill, cost, name, dark) => {
      let s = A.rect(x + 3, y - 3, 30, 40, '#efe6cf', { rx: 4, sw: 1 }) + A.rect(x + 1.5, y - 1.5, 30, 40, '#efe6cf', { rx: 4, sw: 1 });
      s += A.card(x, y, 30, 40, fill, {});
      s += A.text(x + 15, y + 15, name, { size: name.length > 6 ? 5.2 : 6, weight: 800, fill: dark ? C.ink : C.white });
      s += A.use(I['c' + cost].draw(A), x + 3, y + 26, 12);
      return s;
    };
    const basics = [['#c08245', 0, 'Copper'], ['#b7bec7', 3, 'Silver', 1], ['#e2b33c', 6, 'Gold', 1], ['#8fbf6a', 2, 'Estate', 1], ['#5ea25a', 5, 'Duchy'], ['#2f7a3d', 8, 'Province']];
    basics.forEach(([f, c, n, d], i) => { o += pile(6 + i * 36, 12, f, c, n, d); });
    const kingdom = [['Village', 3], ['Smithy', 4], ['Market', 5], ['Militia', 4], ['Moat', 2], ['Witch', 5]];
    kingdom.forEach(([n, c], i) => { o += pile(6 + i * 36, 60, '#efe2c2', c, n, 1); });
    // deck + discard
    o += A.rect(252, 70, 30, 42, '#6f4a2c', { rx: 4, sw: 1 }) + A.card(250, 66, 30, 42, '#7d5532', {}) + A.rect(256, 72, 18, 30, 'none', { rx: 2, stroke: '#e8c547', sw: 1.2 });
    o += A.group(A.card(286, 64, 30, 42, '#c08245', {}) + A.use(I.c1.draw(A), 291, 75, 20), 'rotate(8 301 85)');
    // hand of 5
    const hand = [['#efe2c2', 'Village', '', 1], ['#efe2c2', 'Smithy', '', 1], ['#c08245', 'Copper', '1'], ['#b7bec7', 'Silver', '2', 1], ['#8fbf6a', 'Estate', '1VP', 1]];
    hand.forEach(([f, n, v, d], i) => {
      const t = i - 2, x = 125 + t * 34, y = 128 + Math.abs(t) * 5;
      let s = A.card(x, y, 40, 58, f, { title: n });
      if (v === '1VP') s += A.use(I.vp.draw(A), x + 9, y + 24, 22);
      else if (v) s += A.use(I['c' + v].draw(A), x + 8, y + 24, 24);
      else s += A.rect(x + 9, y + 24, 22, 18, d ? '#a7c4d9' : C.cream, { rx: 2, sw: 0.8 }) + A.text(x + 20, y + 49, n === 'Village' ? '+2 Act' : '+3 Card', { size: 6, weight: 700 });
      o += A.group(s, `rotate(${t * 6} ${x + 20} ${y + 58})`);
    });
    o += A.note(212, 42, 268, 14, 'Province = 6 VP');
    o += A.note(210, 84, 268, 42, 'Buy from Supply');
    o += A.note(265, 104, 276, 128, 'Draw & discard');
    o += A.note(62, 160, 44, 120, 'Hand of 5');
    return o;
  },
});
