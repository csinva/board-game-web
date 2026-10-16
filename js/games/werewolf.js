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

  walk(A) {
    const C = A.C, back = '#3b3f6b', moonC = '#f2e6cc', yel = '#f2c14e';
    const P = { sue: [30, 96], tom: [100, 30], ada: [220, 30], leo: [288, 96], mia: [160, 172] };
    const slot = { sue: [50, 92], tom: [89, 60], ada: [209, 60], leo: [248, 92], mia: [149, 124] };
    const roles = { Werewolf: '#b3263e', Robber: '#6b5b8a', Villager: '#3c8d4f' };
    let board = A.bg('#1c2238') + A.circle(298, 20, 11, moonC, { sw: 0 }) + A.circle(292, 16, 10, '#1c2238', { sw: 0 });
    board += `<ellipse cx="160" cy="104" rx="128" ry="58" fill="#4a3a2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    for (const [n, [x, y]] of Object.entries(P)) board += A.person(x, y, 28, { sue: '#6b7aa6', tom: '#5f8f8a', ada: '#a6846b', leo: '#7e8f5f', mia: '#8a6aa6' }[n], { face: '#d9b48f' }) + A.text(x, y + 23, n[0].toUpperCase() + n.slice(1), { size: 8, weight: 700, fill: moonC });
    const bk = (x, y) => A.card(x, y, 22, 30, back) + A.circle(x + 11, y + 15, 4.5, moonC, { sw: 0 }) + A.circle(x + 13, y + 13, 4, back, { sw: 0 });
    const face = (x, y, r) => A.card(x - 6, y - 4, 34, 38, roles[r], { label: r.toUpperCase(), size: 4.4, labelFill: C.white });
    const card = (k, at, r) => A.k(k, r ? face(...at, r) : bk(...at));
    const centre = [123, 149, 175].map((x, i) => A.k('c' + i, bk(x, 88))).join('') + A.text(160, 126, 'centre', { size: 7, fill: '#cdb89a' });
    const others = card('cS', slot.sue) + card('cT', slot.tom) + card('cA', slot.ada);
    const seen = (who) => A.tag(64, 186, 'only ' + who + ' sees', { fill: '#5d4b7a' });
    const vote = (k, who, x, y) => A.k(k, A.circle(x, y, 7, { S: '#6b7aa6', T: '#5f8f8a', A: '#a6846b', M: '#8a6aa6', L: '#7e8f5f' }[who], { sw: 1.2, stroke: yel }) + A.text(x, y, who, { size: 7, weight: 800, fill: C.white }));
    return [
      { step: 0, say: 'Five players, three cards in the centre. Mia peeks at her card: **Robber**. Everyone else sees only backs.', svg: board + centre + others + card('cL', slot.leo) + card('cM', slot.mia, 'Robber') + seen('Mia') },
      { step: 1, say: 'Night. When the Robber is called, Mia **swaps** her card with Leo’s, without telling him.', svg: board + centre + others + card('cL', slot.mia) + card('cM', slot.leo) + A.glow(160, 166, 16, 'g-mia') },
      { step: 1, say: 'She looks at her new card: **Werewolf**. Mia is now a werewolf, and Leo is now the Robber.', svg: board + centre + others + card('cL', slot.mia, 'Werewolf') + card('cM', slot.leo) + seen('Mia') },
      { step: 2, say: 'Day. Leo says he was the Robber. Mia calmly claims **Seer** and says Leo’s card is a Werewolf.', svg: board + centre + others + card('cL', slot.mia) + card('cM', slot.leo) +
        A.bubble(254, 50, 64, 18, 'I’m Robber!', { size: 8 }) + A.bubble(172, 134, 132, 20, 'Seer here: Leo is a wolf!', { size: 8 }) },
      { step: 3, say: 'On “3” everyone points at once. **Four** fingers land on Leo; Leo points at Mia.', svg: board + centre + others + card('cL', slot.mia) + card('cM', slot.leo) +
        vote('vS', 'S', 260, 136) + vote('vT', 'T', 276, 136) + vote('vA', 'A', 292, 136) + vote('vM', 'M', 308, 136) + vote('vL', 'L', 186, 170) + A.glow(288, 96, 22, 'g-leo') },
      { step: 3, say: 'Flip every card. Leo dies, but his card says **Robber**. The werewolf is Mia, so the **werewolves win**.', svg: board + centre +
        card('cS', slot.sue, 'Villager') + card('cT', slot.tom, 'Villager') + card('cA', slot.ada, 'Villager') + card('cL', slot.mia, 'Werewolf') + card('cM', slot.leo, 'Robber') +
        A.k('dead', A.line(276, 82, 300, 108, { stroke: '#e0484f', sw: 3.5 }) + A.line(300, 82, 276, 108, { stroke: '#e0484f', sw: 3.5 })) + A.glow(160, 139, 20, 'g-wolf') },
    ];
  },

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
