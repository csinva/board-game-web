defineGame({
  id: '7-wonders',
  name: '7 Wonders',
  year: 2010,
  designer: 'Antoine Bauza',
  family: 'cards',
  players: [3, 7], best: '4–5',
  time: [30, 40],
  age: 10,
  mechanics: ['drafting', 'simultaneous', 'set-collection', 'tableau', 'engine-building', 'resource-management'],
  profile: { complexity: 2, luck: 2, interaction: 3, conflict: 2, talk: 2, planning: 3 },

  pitch: 'Everyone picks a card at the same time and passes the rest; over three ages, grow an ancient city with the cards you keep.',
  theme: 'You lead an ancient city, raising its economy, army, science and great Wonder.',

  goal: { big: 'Most points', text: 'After three Ages, the player with the **most points** wins. Points come from seven sources: military, coins, Wonder, civic buildings, science, commerce and guilds.' },

  turn: {
    type: 'simultaneous',
    intro: 'Everyone does this at the same time:',
    steps: [
      { verb: 'Pick', text: 'Choose **one** card from your hand and place it face-down.' },
      { verb: 'Reveal', text: 'Everyone reveals and either **builds** it (pay its cost), uses it to build a **Wonder stage**, or discards it for **3 coins**.' },
      { verb: 'Pass', text: 'Pass the rest of your hand to your neighbour: **left** in Ages I and III, **right** in Age II.' },
    ],
    outro: 'Repeat until 1 card remains, which is discarded. Then resolve military and start the next Age.',
  },

  tension: 'Each pick is a card you want versus a card you must deny your neighbour, and you only get 18 picks in the whole game, so you can’t chase every colour.',

  flow: [
    { label: 'Produce', items: ['Brown: raw materials', 'Gray: manufactured goods', 'Buy from neighbours: 2 coins'] },
    { label: 'Build', items: ['Blue: civic points', 'Green: science', 'Yellow: commerce', 'Red: shields', 'Wonder stages'] },
    { label: 'Score', items: ['Military tokens', 'Coins (1 per 3)', 'Science sets', 'Guilds (Age III)'] },
  ],

  end: { trigger: 'Age III has been played and its military resolved', detail: 'Add up all seven categories on the score pad. Ties go to the player with more coins.' },
  scoring: [
    { label: 'Civic (blue)', share: 3 },
    { label: 'Science', share: 2 },
    { label: 'Military', share: 1.5 },
    { label: 'Wonder', share: 1.5 },
    { label: 'Commerce & guilds', share: 1.5 },
    { label: 'Coins', share: 0.5 },
  ],

  ref: {
    title: 'Military & science',
    rows: [
      ['Win a battle', '+1 / +3 / +5 in Age I / II / III'],
      ['Lose a battle', '−1 point'],
      ['Science: same symbol', 'count² (2 tablets = 4)'],
      ['Science: set of 3 kinds', '+7 per set'],
      ['Buying a resource', '2 coins to a neighbour'],
    ],
  },

  example: 'In Age II you pick a **Laboratory** (green, costs 2 clay + papyrus). You built a Workshop in Age I, which **chains** to it, so you build it for free and gain a second gear symbol. You pass the rest of your hand to the **right**, as Age II requires.',

  setup: [
    'Each player takes a random Wonder board and 3 coins.',
    'Use only the cards marked for your player count in each Age deck (add guilds to Age III: players + 2).',
    'Deal 7 Age I cards to everyone.',
  ],

  terms: [
    ['Age', 'One of three rounds; each deals 7 cards per player.'],
    ['Wonder stage', 'Tuck a card under your board and pay the stage cost for its bonus.'],
    ['Chain', 'A card that’s free to build because you own a named earlier card.'],
    ['Neighbours', 'The players to your left and right: you trade and fight only with them.'],
    ['Shields', 'Red-card symbols; more than a neighbour wins that battle.'],
  ],

  gotchas: [
    'You can buy resources **only from your two neighbours**, and only what their brown/gray cards (and Wonder) produce.',
    'You can’t build **two identical** cards (same name) in your city.',
    'Coins spent trading are kept by the neighbour, and buying doesn’t take the resource away from them.',
  ],

  tips: [
    'Secure brown and gray resources in Age I; buying everything later drains your coins.',
    'Watch what your neighbours are collecting and discard (or build) the card they need.',
    'Science scales fast if you commit, but someone at the table will try to hate-draft it.',
  ],

  art(A) {
    const C = A.C;
    let o = A.bg('#e4d3a8');
    // wonder board
    o += A.rect(14, 148, 196, 44, '#b99766', { rx: 4, sw: 1.4 });
    o += A.poly([[70, 168], [86, 152], [102, 168]], '#d8c08e', { sw: 1 }) + A.rect(64, 168, 44, 6, '#d8c08e', { sw: 1, rx: 1 });
    o += A.rect(26, 162, 24, 18, '#8a5a33', { rx: 2, sw: 1 });
    for (let i = 0; i < 3; i++) o += A.rect(122 + i * 28, 160, 26, 16, i === 0 ? '#d8c08e' : 'rgba(255,255,255,.3)', { rx: 2, sw: 1, dash: i === 0 ? undefined : '2 2' });
    o += A.rect(124, 154, 22, 8, '#8c877f', { rx: 1, sw: 0.8 });
    // built city: columns of tucked cards by colour
    const cols = [['#8a5a33', 3], ['#8c877f', 2], ['#e2b33c', 1], ['#c8423b', 2], ['#2f6db5', 3], ['#3c8d4f', 2]];
    cols.forEach(([f, n], i) => {
      const x = 14 + i * 35;
      for (let k = 0; k < n; k++) o += A.card(x, 136 - (n - k) * 22 - 16, 32, 46, f, {});
    });
    // coins and war tokens
    o += A.circle(244, 128, 9, '#e2b33c', { sw: 1.2 }) + A.text(244, 128.5, '3', { size: 9, weight: 800 });
    o += A.circle(258, 140, 9, '#e2b33c', { sw: 1.2 }) + A.text(258, 140.5, '1', { size: 9, weight: 800 });
    o += A.circle(252, 116, 8, '#c4c8cc', { sw: 1.2 }) + A.text(252, 116.5, '1', { size: 8, weight: 800 });
    o += A.rect(280, 112, 26, 14, '#c8423b', { rx: 3, sw: 1.2 }) + A.text(293, 119, '+3', { size: 9, weight: 800, fill: C.white });
    o += A.rect(280, 132, 26, 14, '#8c877f', { rx: 3, sw: 1.2 }) + A.text(293, 139, '−1', { size: 9, weight: 800, fill: C.white });
    // hand being passed
    o += A.fan(276, 50, 4, 28, 40, ['#3c8d4f', '#2f6db5', '#8a5a33', '#7d55b5'], { spread: 7, dx: 14 });
    o += A.curve(244, 84, 232, 100, 220, 98, { sw: 1.6 });
    o += A.note(30, 62, 64, 22, 'City grows by colour', { w: 122 });
    o += A.note(250, 44, 194, 22, 'Pick 1, pass the rest', { w: 124 });
    o += A.note(164, 174, 160, 194, 'Wonder stages', { w: 84 });
    o += A.note(268, 146, 266, 182, 'Coins & military', { w: 100 });
    return o;
  },
});
