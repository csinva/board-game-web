defineGame({
  id: 'werewolf',
  name: 'One Night Ultimate Werewolf',
  year: 2014,
  designer: 'Ted Alspach & Akihisa Okui',
  family: 'hidden',
  players: [3, 10], best: '5–7',
  time: [10, 10],
  age: 8,
  mechanics: ['hidden-roles', 'bluffing', 'deduction', 'voting', 'team', 'variable-powers'],
  profile: { complexity: 2, luck: 3, interaction: 5, conflict: 3, talk: 5, planning: 1 },
  color: '#3b3f6b',

  pitch: 'One night of secret card swaps, then ten minutes of arguing about who is a werewolf now. Nobody is quite sure, not even you.',
  theme: 'You are villagers who must find and kill a werewolf hiding among you, after a single night.',

  goal: { big: 'Kill a werewolf', text: 'Your team is decided by the card in front of you **at the end**. Village wins if a werewolf dies; werewolves win if none does.' },

  turn: {
    type: 'round',
    intro: 'The whole game is one round:',
    steps: [
      { verb: 'Look', text: 'Each player secretly looks at their card and puts it face down.' },
      { verb: 'Night', text: 'Eyes closed. Roles are called **in order** and secretly act, often swapping or peeking at cards.' },
      { verb: 'Talk', text: 'Everyone wakes and argues for a few minutes. Claim, accuse, lie.' },
      { verb: 'Vote', text: 'On “3”, everyone **points** at once. Whoever gets the most votes dies.' },
    ],
    outro: 'Reveal & play again',
  },

  tension: 'You need to share what you saw at night to catch the wolves, but every truth you reveal also tells a liar exactly which story to tell.',

  flow: [
    { label: 'Night', items: ['Wolves see each other', 'Seer peeks', 'Robber & Troublemaker swap'] },
    { label: 'Day', items: ['Claim a role', 'Compare stories', 'Spot contradictions'] },
    { label: 'Vote', items: ['Point at once', 'Flip cards', 'Check teams'] },
  ],

  end: {
    trigger: 'The single vote is resolved and all cards are flipped',
    detail: 'Ties kill everyone tied. If nobody gets more than 1 vote, nobody dies.',
    results: [
      { side: 'Village wins', text: 'if at least one werewolf dies (or, with no werewolves among the players, if nobody dies).' },
      { side: 'Werewolves win', text: 'if a werewolf is among the players and no werewolf dies.' },
      { side: 'Tanner wins', text: 'if he dies (optional role who hates his job).' },
    ],
  },

  ref: {
    title: 'Night order (common roles)',
    rows: [
      ['Werewolves', 'see each other; a lone wolf may view 1 centre card'],
      ['Minion', 'sees the wolves (who don’t see him); on the wolf team'],
      ['Seer', 'views 1 player’s card or 2 centre cards'],
      ['Robber', 'swaps with a player, then views his new card'],
      ['Troublemaker', 'swaps two other players’ cards without looking'],
      ['Drunk · Insomniac', 'Drunk swaps with a centre card blind; Insomniac checks own card'],
    ],
  },

  example: 'Five players. Mia the **Robber** swapped with Leo and saw “Werewolf”, so Mia is now a werewolf and Leo a robber. In the day Leo says he’s the Robber; Mia calmly claims Seer and says Leo’s card is Werewolf. If the vote kills Leo, the werewolves (Mia) win.',

  setup: [
    'Choose roles: **players + 3** cards, including 2 werewolves and the Seer, Robber and Troublemaker.',
    'Shuffle, deal 1 card face down to each player and 3 face down to the centre.',
    'Use the free app or a narrator script to call the night roles in order.',
  ],

  terms: [
    ['Centre cards', 'The 3 unused roles. Some roles may look at or swap with them.'],
    ['Claim', 'Saying what role you are (true or not).'],
    ['Village team', 'Every non-werewolf role except the Minion and Tanner.'],
    ['Lone wolf', 'A werewolf with no partner; may peek at a centre card.'],
  ],

  gotchas: [
    'You are the role on the card in front of you **at the end**, even if you never saw it change.',
    'Never look at your card again after the night (only the Insomniac checks).',
    'Swapping roles act on cards, not powers: a robbed Seer doesn’t wake again; whoever started as a role does its action.',
  ],

  tips: [
    'Claim your role early as a villager; contradictions are how wolves get caught.',
    'As a werewolf, claim a role that is probably in the centre, or one that explains a swap.',
    'If you might have been swapped, say so: your old teammates may now be your enemies.',
  ],

  art(A) {
    const C = A.C, back = '#3b3f6b', moonC = '#f2e6cc';
    let o = A.bg('#1c2238');
    o += A.circle(292, 24, 15, moonC, { sw: 0 }) + A.circle(285, 19, 13, '#1c2238', { sw: 0 });
    for (const [x, y] of [[24, 18], [60, 40], [252, 14], [312, 60], [140, 12], [200, 30]]) o += A.star(x, y, 2.5, moonC, { sw: 0 });
    o += `<ellipse cx="160" cy="118" rx="140" ry="66" fill="#4a3a2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    const cardBack = (x, y, rot) => {
      const g = A.card(-11, -15, 22, 30, back) + A.circle(0, 0, 5, moonC, { sw: 0 }) + A.circle(2.5, -2, 4.4, back, { sw: 0 });
      return A.group(g, `translate(${x} ${y}) rotate(${rot})`);
    };
    // Players around the table, each with a face-down card.
    const seats = [[34, 104], [82, 48], [160, 34], [238, 48], [286, 104]];
    const cards = [[64, 116, -8], [100, 82, -4], [160, 72, 0], [220, 82, 4], [256, 116, 8]];
    seats.forEach(([x, y], i) => { o += A.person(x, y, 30, ['#6b7aa6', '#8a6aa6', '#5f8f8a', '#a6846b', '#7e8f5f'][i], { face: '#d9b48f' }); });
    cards.forEach(([x, y, r], i) => { if (i !== 1) o += cardBack(x, y, r); });
    // Seer peeking at one card: lifted to show a werewolf face.
    o += A.group(A.card(-11, -15, 22, 30, '#b3263e') + A.path('M-6 4 l3 -10 l3 6 l3 -6 l3 10 z', { fill: '#2b2b2b', sw: 0 }), 'translate(104 80) rotate(-18)');
    // Centre cards.
    for (let i = 0; i < 3; i++) o += cardBack(134 + i * 26, 134, 0);
    // Troublemaker swap arrows.
    o += A.curve(232, 76, 262, 76, 260, 98, { stroke: '#f2c14e', sw: 2, head: 6 });
    o += A.curve(244, 122, 214, 122, 216, 100, { stroke: '#f2c14e', sw: 2, head: 6 });
    o += A.note(160, 140, 160, 188, '3 centre cards');
    o += A.note(262, 128, 262, 166, 'Cards get swapped');
    o += A.note(104, 80, 60, 78, 'Seer peeks');
    o += A.note(160, 26, 100, 12, 'Roles act in order');
    return o;
  },
});
