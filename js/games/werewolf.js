defineGame({
  id: 'werewolf',
  name: 'One Night Ultimate Werewolf',
  year: 2014,
  designer: 'Ted Alspach & Akihisa Okui',
  family: 'hidden',
  players: [3, 10], best: '6–8',
  time: [10, 10],
  age: 8,
  mechanics: ['hidden-roles', 'bluffing', 'deduction', 'voting', 'team', 'variable-powers'],
  profile: { complexity: 2, luck: 3, interaction: 5, conflict: 3, talk: 5, planning: 1 },
  color: '#3b3f6b',

  // Role cards: coloured card + one symbol. The walkthrough flips these same drawings face up.
  icons: {
    werewolf: { name: 'Werewolf', draw: A => A.rect(4, 1, 16, 22, '#b3263e', { rx: 2.5, sw: 1.3 }) + A.path('M6.5 17 l2.5 -10 l3 6 l3 -6 l2.5 10 z', { fill: '#2b2b2b', sw: 0 }) + A.circle(10, 13.5, 1, '#f2c14e', { sw: 0 }) + A.circle(14, 13.5, 1, '#f2c14e', { sw: 0 }) },
    minion: { name: 'Minion', draw: A => A.rect(4, 1, 16, 22, '#7a3048', { rx: 2.5, sw: 1.3 }) + A.person(12, 12, 15, '#2b2b2b', { face: '#2b2b2b' }) + A.poly([[8.5, 7.5], [9, 3.5], [10.8, 6.5]], '#2b2b2b', { sw: 0 }) + A.poly([[15.5, 7.5], [15, 3.5], [13.2, 6.5]], '#2b2b2b', { sw: 0 }) },
    seer: { name: 'Seer', draw: A => A.rect(4, 1, 16, 22, '#4a7ab0', { rx: 2.5, sw: 1.3 }) + A.path('M5.5 12 Q12 5 18.5 12 Q12 19 5.5 12z', { fill: '#fff', sw: 1 }) + A.circle(12, 12, 2.6, '#2b2b2b', { sw: 0 }) },
    robber: { name: 'Robber', draw: A => A.rect(4, 1, 16, 22, '#6b5b8a', { rx: 2.5, sw: 1.3 }) + A.path('M5.5 9 h13 v4.5 q-3.2 2 -6.5 0 q-3.3 2 -6.5 0z', { fill: '#2b2b2b', sw: 0 }) + A.circle(9.3, 11.2, 1.3, '#fff', { sw: 0 }) + A.circle(14.7, 11.2, 1.3, '#fff', { sw: 0 }) },
    troublemaker: { name: 'Troublemaker', draw: A => A.rect(4, 1, 16, 22, '#d27a2e', { rx: 2.5, sw: 1.3 }) + A.curve(7, 9, 12, 3, 17, 8.5, { stroke: '#fff', sw: 1.8, head: 4 }) + A.curve(17, 15, 12, 21, 7, 15.5, { stroke: '#fff', sw: 1.8, head: 4 }) },
    drunk: { name: 'Drunk', draw: A => A.rect(4, 1, 16, 22, '#4f8a8a', { rx: 2.5, sw: 1.3 }) + A.rect(10.5, 4, 3, 5, '#cfe7d0', { rx: 0.6, sw: 0.9 }) + A.rect(8, 8.5, 8, 11, '#a6d36b', { rx: 2.2, sw: 1 }) },
    insomniac: { name: 'Insomniac', draw: A => A.rect(4, 1, 16, 22, '#5b5f8f', { rx: 2.5, sw: 1.3 }) + A.circle(12, 12.5, 6, '#fff', { sw: 1 }) + A.path('M12 9 v3.5 l2.5 1.5', { stroke: '#2b2b2b', sw: 1.4 }) },
    villager: { name: 'Villager', draw: A => A.rect(4, 1, 16, 22, '#3c8d4f', { rx: 2.5, sw: 1.3 }) + A.house(12, 17.5, 11, '#f2e6cc') },
    mason: { name: 'Mason', draw: A => A.rect(4, 1, 16, 22, '#b07a3a', { rx: 2.5, sw: 1.3 }) + A.person(9.5, 12, 11, '#f2e6cc', { face: '#f2e6cc' }) + A.person(14.5, 12, 11, '#f2e6cc', { face: '#f2e6cc' }) },
    hunter: { name: 'Hunter', draw: A => A.rect(4, 1, 16, 22, '#4f6e3a', { rx: 2.5, sw: 1.3 }) + A.circle(12, 12, 5, 'none', { stroke: '#fff', sw: 1.5 }) + A.line(12, 5, 12, 19, { stroke: '#fff', sw: 1.3 }) + A.line(5, 12, 19, 12, { stroke: '#fff', sw: 1.3 }) },
    back: { name: 'face-down card', draw: A => A.rect(4, 1, 16, 22, '#3b3f6b', { rx: 2.5, sw: 1.3 }) + A.circle(12, 12, 4.5, '#f2e6cc', { sw: 0 }) + A.circle(14, 10, 4, '#3b3f6b', { sw: 0 }) },
  },

  pitch: 'Secret roles swap cards during one night, then everyone debates and votes once; the village wins if a werewolf dies.',

  goal: { big: 'Kill a werewolf', text: 'Your team is the card in front of you **at the end**. Village wins if a werewolf dies; werewolves win if none does.' },

  turn: {
    type: 'round',
    intro: 'The whole game is one round:',
    steps: [
      { verb: 'Look', text: 'Each player secretly looks at their own card, then places it face down in front of them.' },
      { verb: 'Night', text: 'Everyone closes their eyes. The narrator (app or a player) calls each role **in the night order**; only players whose **starting** card is that role open their eyes, act, and close them again.' },
      { verb: 'Talk', text: 'Everyone opens their eyes and discusses for a few minutes. Anyone may claim any role, true or not. Nobody looks at cards.' },
      { verb: 'Vote', text: 'On the count of 3, every player at once **points** at another player. The player with the most votes dies (see How it ends for ties).' },
    ],
    outro: 'Flip every card face up and check who won',
  },

  tension: 'To catch a wolf you must share what you saw at night, but every truth you share tells a liar which story to tell.',

  structure: [
    { label: 'Night', text: 'Eyes closed. Roles wake one at a time in the night order (table), act, and close their eyes again.' },
    { label: 'Day', text: 'A few minutes of open talk: claim roles, compare stories, spot contradictions.' },
    { label: 'Vote', text: 'One vote, everyone pointing at the same time. Then flip every player’s card face up and check which team won.' },
  ],

  end: {
    trigger: 'the one vote is resolved and all cards are flipped',
    detail: 'If two or more players tie for the most votes, all of them die. If no player gets more than 1 vote, nobody dies.',
    results: [
      { side: 'Village wins', text: 'if at least one {=werewolf} dies, or if no player is a werewolf and nobody dies.' },
      { side: 'Werewolves win', text: 'if at least one player holds a {=werewolf} and no werewolf dies. The {minion} wins with them, even if the Minion is the one who dies.' },
      { side: 'Tanner wins', text: 'if the Tanner dies (an optional role). If the Tanner dies and no {=werewolf} dies, the werewolves don’t win.' },
    ],
  },

  ref: {
    title: 'Night order, top to bottom (common roles)',
    rows: [
      ['{=werewolf} Werewolves', 'open eyes to see each other. A lone wolf (no other werewolf among players) may look at 1 centre card'],
      ['{=minion} Minion', 'opens eyes to see who the werewolves are (they don’t learn who the Minion is). Wolf team. If no player holds a werewolf, the Minion wins if any other player dies'],
      ['{=mason} Masons', 'open eyes to see each other. Village team'],
      ['{=seer} Seer', 'may look at 1 other player’s card **or** 2 of the centre cards'],
      ['{=robber} Robber', 'may swap own card with another player’s card, then looks at the new card'],
      ['{=troublemaker} Troublemaker', 'may swap the cards of 2 other players, without looking at either'],
      ['{=drunk} Drunk, then {=insomniac} Insomniac', 'Drunk **must** swap own card with 1 centre card without looking at it. Insomniac then looks at their own card to see if it changed'],
      ['{=hunter} Hunter (no night action)', 'if the Hunter dies, the player the Hunter pointed at also dies'],
    ],
  },

  example: 'Five players. Mia, the {robber}, swaps with Leo and sees {=werewolf}: Mia is now a werewolf and Leo the Robber. By day Leo claims Robber; Mia claims {=seer} Seer and says Leo is a wolf. If the vote kills Leo, the werewolves (Mia) win.',

  setup: [
    'Use exactly **players + 3** role cards: 2 {werewolf}s, the {seer}, {robber} and {troublemaker}, plus any other roles to make up the count.',
    'Shuffle. Deal 1 card face down to each player and 3 face down in the middle of the table (the centre cards).',
    'Use the free app, or have one player read the narrator script, to call night roles in order.',
  ],

  terms: [
    ['{=back} Centre cards', 'The 3 roles nobody was dealt, face down in the middle. Some roles look at or swap with them.'],
    ['Claim', 'Saying which role you are (true or not).'],
    ['{=villager} Village team', 'Every role except the Werewolves, Minion and Tanner.'],
    ['Lone wolf', 'A werewolf who sees no other werewolf at night (the other is in the centre); may look at 1 centre card.'],
  ],

  gotchas: [
    'You are the role on the card in front of you **at the end**, even if you never saw it change.',
    'After the night, nobody may look at or show their card until the final flip (only the {=insomniac} checks, and only at night).',
    'You wake and act only for the card you were **dealt**: if the Robber takes the Seer card, the Robber does not then act as Seer, and the old Seer (now holding the Robber card) does not act as Robber.',
  ],

  tips: [
    'As a villager, claim your role early; contradictions catch wolves.',
    'As a werewolf, claim a role that is likely in the centre, or one that explains a swap.',
    'If you may have been swapped, say so: your team may have changed.',
  ],

  walk(A) {
    const C = A.C, back = '#3b3f6b', moonC = '#f2e6cc', yel = '#f2c14e';
    const P = { sue: [30, 96], tom: [100, 30], ada: [220, 30], leo: [288, 96], mia: [160, 172] };
    const slot = { sue: [50, 92], tom: [89, 60], ada: [209, 60], leo: [248, 92], mia: [149, 124] };
    let board = A.bg('#1c2238') + A.circle(298, 20, 11, moonC, { sw: 0 }) + A.circle(292, 16, 10, '#1c2238', { sw: 0 });
    board += `<ellipse cx="160" cy="104" rx="128" ry="58" fill="#4a3a2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    for (const [n, [x, y]] of Object.entries(P)) board += A.person(x, y, 28, { sue: '#6b7aa6', tom: '#5f8f8a', ada: '#a6846b', leo: '#7e8f5f', mia: '#8a6aa6' }[n], { face: '#d9b48f' }) + A.text(x, y + 23, n[0].toUpperCase() + n.slice(1), { size: 8, weight: 700, fill: moonC });
    const bk = (x, y) => A.card(x, y, 22, 30, back) + A.circle(x + 11, y + 15, 4.5, moonC, { sw: 0 }) + A.circle(x + 13, y + 13, 4, back, { sw: 0 });
    const face = (x, y, r) => A.use(this.icons[r.toLowerCase()].draw(A), x - 10, y - 5.75, 42);
    const card = (k, at, r) => A.k(k, r ? face(...at, r) : bk(...at));
    const centre = [123, 149, 175].map((x, i) => A.k('c' + i, bk(x, 88))).join('') + A.text(160, 126, 'centre', { size: 7, fill: '#cdb89a' });
    const others = card('cS', slot.sue) + card('cT', slot.tom) + card('cA', slot.ada);
    const seen = (who) => A.tag(64, 186, 'only ' + who + ' sees', { fill: '#5d4b7a' });
    const vote = (k, who, x, y) => A.k(k, A.circle(x, y, 7, { S: '#6b7aa6', T: '#5f8f8a', A: '#a6846b', M: '#8a6aa6', L: '#7e8f5f' }[who], { sw: 1.2, stroke: yel }) + A.text(x, y, who, { size: 7, weight: 800, fill: C.white }));
    return [
      { step: 0, say: 'Five players, 3 centre cards. Mia looks at her card: {=robber}. Others see only backs.', svg: board + centre + others + card('cL', slot.leo) + card('cM', slot.mia, 'Robber') + seen('Mia') },
      { step: 1, say: 'Night. When the Robber is called, Mia **swaps** her card with Leo’s.', svg: board + centre + others + card('cL', slot.mia) + card('cM', slot.leo) + A.glow(160, 166, 16, 'g-mia') },
      { step: 1, say: 'She looks at her new card: {=werewolf}. Mia is now a werewolf; Leo is now the Robber.', svg: board + centre + others + card('cL', slot.mia, 'Werewolf') + card('cM', slot.leo) + seen('Mia') },
      { step: 2, say: 'Day. Leo claims Robber. Mia claims **Seer** and says Leo’s card is a werewolf.', svg: board + centre + others + card('cL', slot.mia) + card('cM', slot.leo) +
        A.bubble(254, 50, 64, 18, 'I’m Robber!', { size: 8 }) + A.bubble(172, 134, 132, 20, 'Seer here: Leo is a wolf!', { size: 8 }) },
      { step: 3, say: 'On “3” everyone points. **Four** votes land on Leo; Leo points at Mia.', svg: board + centre + others + card('cL', slot.mia) + card('cM', slot.leo) +
        vote('vS', 'S', 260, 136) + vote('vT', 'T', 276, 136) + vote('vA', 'A', 292, 136) + vote('vM', 'M', 308, 136) + vote('vL', 'L', 186, 170) + A.glow(288, 96, 22, 'g-leo') },
      { step: 3, say: 'Flip every card. Leo dies holding the {=robber}. Mia holds the {=werewolf}, so the **werewolves win**.', svg: board + centre +
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
    o += A.group(A.use(this.icons.werewolf.draw(A), -18, -16.5, 33), 'translate(104 80) rotate(-18)');
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
