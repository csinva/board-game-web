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

  pitch: 'Collect gem chips to buy cards; each card is a permanent gem discount, so cheap mines snowball into prestige.',
  theme: 'You are Renaissance gem merchants buying mines, ships and shops to win the patronage of nobles.',

  goal: { big: '15 prestige', text: 'Reach **15 prestige points** from cards and nobles. When someone does, finish the round; the highest total wins.' },

  turn: {
    type: 'choose',
    steps: [
      { verb: 'Take 3', text: 'Take **3 gem tokens of different colours**.' },
      { verb: 'Take 2', text: 'Take **2 of the same colour**, only if that pile has 4 or more.' },
      { verb: 'Reserve', text: 'Hold a face-up card (or the top of a deck) in your hand and take **1 gold** joker. Max 3 reserved.' },
      { verb: 'Buy', text: 'Pay for a face-up or reserved card, minus the **bonus gems** of cards you already own.' },
    ],
    outro: 'Then a noble visits if you meet its requirement. Next player.',
  },

  tension: 'Cheap cards with no points build the discounts that make big cards affordable, but every turn spent building is a turn not scoring, and rivals can buy or reserve the card you were saving for.',

  flow: [
    { label: 'Collect', items: ['Gem tokens', 'Gold jokers (by reserving)', 'Max 10 tokens held'] },
    { label: 'Build', items: ['Level 1 cards: cheap bonuses', 'Bonuses discount future buys'] },
    { label: 'Score', items: ['Level 2–3 cards: points', 'Nobles: 3 points each'] },
  ],

  end: { trigger: 'a player reaches 15 prestige', detail: 'Finish the round so everyone has had the same number of turns. Tie: fewest development cards wins.' },
  scoring: [
    { label: 'Level 2–3 cards', share: 6 },
    { label: 'Nobles', share: 3 },
    { label: 'Level 1 cards', share: 1 },
  ],

  ref: {
    title: 'Tokens by player count',
    rows: [
      ['2 players', '4 of each gem, 3 nobles'],
      ['3 players', '5 of each gem, 4 nobles'],
      ['4 players', '7 of each gem, 5 nobles'],
      ['Gold', 'always 5'],
    ],
  },

  example: 'A level 2 card costs 3 red + 2 green and is worth **2 points**. You own 2 red-bonus cards and 1 green-bonus card, so you only pay **1 red + 1 green** token. That gives you a third red bonus, which completes a noble’s requirement: she visits for **+3**.',

  setup: [
    'Shuffle the three development decks and lay out 4 face-up cards from each level.',
    'Reveal nobles equal to players + 1.',
    'Set out gem tokens for your player count, plus all 5 gold.',
  ],

  terms: [
    ['Bonus', 'Gem on a card you own; a permanent 1-gem discount of that colour.'],
    ['Noble', 'Tile that visits automatically when your bonuses meet its requirement.'],
    ['Reserve', 'Take a card into your hand to buy later, plus a gold joker.'],
    ['Gold', 'Wild token; spends as any gem.'],
  ],

  gotchas: [
    'You can’t **take 2** of a colour unless that pile has at least 4 tokens before you take.',
    'You may hold at most **10 tokens**; return extras at the end of your turn.',
    'Nobles count **card bonuses only**, never tokens, and only one noble can visit per turn.',
  ],

  tips: [
    'Early on, buy cheap level 1 cards in the colours the nobles and level 3 cards want.',
    'Reserve to grab gold or to block a card a rival is clearly about to buy.',
    'Count the turns: at 10+ points, buy the biggest card you can, not more bonuses.',
  ],

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
    const order = ['white', 'blue', 'green', 'red', 'black', 'gold'];
    order.forEach((c, i) => {
      const x = 260 + (i % 2) * 34, y = 62 + Math.floor(i / 2) * 36;
      for (let k = 3; k >= 0; k--) o += A.circle(x, y + k * 2.5, 13, G[c], { sw: 1.2 });
      o += c === 'gold' ? A.star(x, y, 6, '#fff3c4', { sw: 0.6 }) : gemIcon(x, y, 5.5, 'rgba(255,255,255,.55)');
    });
    o += A.note(214, 26, 272, 16, 'Nobles: +3', { w: 70 });
    o += A.note(212, 157, 272, 178, 'Bonus = discount');
    o += A.note(268, 104, 276, 38, 'Gem tokens', { w: 70 });
    return o;
  },
});
