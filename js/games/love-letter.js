defineGame({
  id: 'love-letter',
  name: 'Love Letter',
  year: 2012,
  designer: 'Seiji Kanai',
  family: 'hidden',
  players: [2, 6], best: '4',
  time: [20, 20],
  age: 10,
  mechanics: ['hand-management', 'deduction', 'player-elimination', 'bluffing', 'take-that', 'memory'],
  profile: { complexity: 1, luck: 4, interaction: 4, conflict: 3, talk: 2, planning: 1 },
  color: '#a3324a',

  // Each card: big red number (its strength) over a small symbol. Art and walkthrough deal these drawings.
  icons: (() => {
    const red = '#a3324a', ink = '#2a2420', gold = '#d4a63a';
    const card = (n, sym) => A => A.rect(4, 1, 16, 22, '#f6ead2', { rx: 2.5, sw: 1.3 }) + A.rect(5.3, 2.3, 13.4, 19.4, 'none', { rx: 1.8, stroke: red, sw: 0.9 }) +
      A.text(12, 8.6, n, { size: 12.5, weight: 800, fill: red }) + sym(A);
    const c = (n, name, sym) => ({ name, draw: card(n, sym) });
    return {
      spy: c('0', 'Spy', A => A.path('M7.5 15.5 h9 v1.6 q-2.2 2 -4.5 0.4 q-2.3 1.6 -4.5 -0.4z', { fill: ink, sw: 0 })),
      guard: c('1', 'Guard', A => A.line(12, 20.5, 12, 14, { stroke: '#8a5a33', sw: 1.4 }) + A.poly([[12, 12.5], [13.8, 15.5], [10.2, 15.5]], '#8c877f', { sw: 0.6 })),
      priest: c('2', 'Priest', A => A.path('M7 16.5 Q12 12.5 17 16.5 Q12 20.5 7 16.5z', { fill: '#fff', stroke: ink, sw: 0.9 }) + A.circle(12, 16.5, 1.5, ink, { sw: 0 })),
      baron: c('3', 'Baron', A => A.line(8.5, 13.5, 15.5, 20.5, { stroke: '#8c877f', sw: 1.5 }) + A.line(15.5, 13.5, 8.5, 20.5, { stroke: '#8c877f', sw: 1.5 })),
      handmaid: c('4', 'Handmaid', A => A.path('M8.5 13.5 h7 v3 q0 3 -3.5 4.3 q-3.5 -1.3 -3.5 -4.3z', { fill: '#7fb7d9', stroke: ink, sw: 0.8 })),
      prince: c('5', 'Prince', A => A.crown(12, 19.5, 7, '#e8d8b0')),
      chancellor: c('6', 'Chancellor', A => A.rect(8.5, 13.5, 7, 7, '#e8d8b0', { rx: 1, sw: 0.8 }) + A.line(10, 15.6, 14, 15.6, { stroke: red, sw: 0.8 }) + A.line(10, 17.8, 14, 17.8, { stroke: red, sw: 0.8 })),
      king: c('7', 'King', A => A.crown(12, 20.5, 9, gold)),
      countess: c('8', 'Countess', A => A.poly([[12, 13], [15.5, 16.5], [12, 20.5], [8.5, 16.5]], '#7d55b5', { sw: 0.8 })),
      princess: c('9', 'Princess', A => A.heart(12, 17.8, 5, '#e2425e', { sw: 0.8 })),
      favor: { name: 'favor token', draw: A => A.heart(12, 13.5, 13, '#e2425e', { sw: 1.3 }) },
    };
  })(),

  pitch: 'Hold one card, draw one, play one; knock rivals out or hold the highest card to win rounds and favor tokens.',

  goal: { big: 'Win favor tokens', text: 'Win rounds to collect {favor}s. The first player to reach the target wins the game: 6 with 2 players, 5 with 3, 4 with 4, 3 with 5–6.' },

  turn: {
    type: 'sequence',
    intro: 'Between turns you hold exactly 1 card. On your turn:',
    steps: [
      { verb: 'Draw', text: 'Draw the top card of the deck, so you hold **two**.' },
      { verb: 'Play', text: 'Choose **one** of the two, place it face up in your discard pile in front of you, and do what it says, even if it hurts you.' },
      { verb: 'Keep', text: 'Keep the other card in your hand, hidden from everyone.' },
    ],
  },

  tension: 'Each turn you give up one of two cards, and what you play and keep tells others what you might hold.',

  structure: [
    { label: 'Round setup', text: 'Shuffle all 21 cards, set the top card aside face down unseen (see Setup for 2 players), and deal 1 card to each player.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Each turn: draw 1, play 1. The round ends when only 1 player is left in it, or after the turn in which the last deck card is drawn. Cards such as {guard} and {baron} knock players out of the round; {priest} shows you a hand.' },
    { label: 'Round end', repeat: 'next round', text: 'Award {favor}s (see Scoring). The winner starts the next round (tie: pick randomly among the winners).' },
    { label: 'Game end', text: 'First to the target number of {=favor} wins: 6 / 5 / 4 / 3 for 2 / 3 / 4 / 5–6 players.' },
  ],
  points: [
    ['{=favor} Round win', '+1 {=favor} to the last player left in the round. If the deck runs out first, +1 to the remaining player with the highest card in hand (tie: every tied player gets 1)'],
    ['{=spy} Spy', '+1 {=favor} at round end if you are still in the round and are the only player who played or discarded a Spy this round'],
  ],

  end: {
    trigger: 'a player reaches the number of favor tokens needed',
    detail: 'A round ends when only one player is left in it, or after the turn in which the last deck card is drawn. In that case everyone still in reveals their hand and the highest card wins the round (ties: all tied players win).',
  },
  scoring: [
    { label: '{=favor} Round wins', share: 5 },
    { label: '{=spy} Spy bonus', share: 1 },
  ],

  ref: {
    title: 'The 21 cards, 2019 edition (×2 unless noted)',
    rows: [
      ['{spy}', 'no effect when played; may score a bonus {=favor} (see Scoring)'],
      ['{guard} ×6', 'choose another player and name any card except Guard; if that player holds it, they are out'],
      ['{priest}', 'secretly look at another player’s hand'],
      ['{baron}', 'you and another player secretly compare hands; the one with the lower card is out (tie: nothing happens)'],
      ['{handmaid}', 'other players’ cards can’t target you until your next turn'],
      ['{prince}', 'choose any player, you included; they discard their hand and draw a new card (if the deck is empty, they take the face-down set-aside card)'],
      ['{chancellor}', 'draw 2 cards; keep 1 of the 3 in your hand and put the other 2 on the bottom of the deck in any order'],
      ['{king} ×1', 'trade hands with another player'],
      ['{countess} ×1', 'no effect when played, but you **must** play her if your other card is the King or a Prince'],
      ['{princess} ×1', 'if you play or discard her for any reason, you are out'],
    ],
  },

  example: 'Ivy holds a {baron} and draws a {guard}. Last turn her {=priest} showed her Sam’s hand, so she plays the Guard on Sam and names **Countess**. Sam has it, so he is out of the round.',

  setup: [
    'Shuffle the 21 cards. Set the top card aside **face down** without anyone looking. With 2 players, also set the next 3 cards aside face up.',
    'Deal each player 1 card face down; look only at your own.',
    'Any player starts round 1; play goes clockwise. Later rounds start with the last round’s winner.',
  ],

  terms: [
    ['{=favor} Favor token', 'Won for winning a round, or for the Spy bonus.'],
    ['Out', 'Knocked out of this round: discard your hand face up and take no more turns until the next round.'],
    ['{=handmaid} Protected', 'Other players’ cards can’t target you until your next turn.'],
    ['Discard pile', 'Your played cards, face up in order so everyone can count.'],
  ],

  gotchas: [
    'If every other player is protected, you still must play a card. A card that targets another player then has no effect; a {=prince} must then target you.',
    'The {=countess} must be played if your other card is the King or Prince, so playing her doesn’t prove either.',
    'A card discarded because of a Prince, or by a player knocked out, has no effect, except that discarding the {=princess} for any reason knocks you out.',
  ],

  tips: [
    'Count visible cards: there are 6 {=guard} but only 1 {=princess}.',
    'Aim {=guard} guesses at a player whose card a Priest just showed or a King just traded.',
    'Keep high cards late in the round, when the deck is nearly empty.',
  ],

  walk(A) {
    const C = A.C, red = '#a3324a', cream = '#f6ead2', gold = '#d4a63a';
    let board = A.bg('#4a2230') + A.rect(6, 6, 308, 188, '#6b2d3e', { rx: 14, sw: 1.4 });
    board += A.person(34, 34, 26, '#7d55b5', { face: '#e6c7a8' }) + A.text(34, 56, 'Sam', { size: 8.5, weight: 700, fill: C.white });
    board += A.person(286, 34, 26, '#2f6db5', { face: '#e6c7a8' }) + A.text(286, 56, 'Max', { size: 8.5, weight: 700, fill: C.white });
    board += A.person(34, 164, 28, '#c8423b', { face: '#e6c7a8' }) + A.text(34, 186, 'Ivy', { size: 8.5, weight: 700, fill: C.white });
    // Face-up cards are the inline icons scaled to card size.
    const face = (x, y, n, name, w = 36) => { const s = w * 1.5; return A.use(this.icons[name.toLowerCase()].draw(A), x - s / 6, y - s / 24, s); };
    const back = (x, y, w = 32, h = 44) => A.card(x, y, w, h, red) + A.heart(x + w / 2, y + h / 2 + 2, 10, gold, { sw: 0 });
    const disc = (x, y, n, name) => face(x, y, n, name, 29);
    // Static: deck, set-aside card, discard rows.
    board += back(140, 76) + back(142, 73) + A.text(157, 64, 'deck', { size: 7, fill: '#f0c9d3' });
    board += A.group(back(188, 78), 'rotate(12 203 99)') + A.text(210, 68, 'set aside', { size: 7, fill: '#f0c9d3' });
    board += disc(12, 64, '1', 'GUARD') + disc(46, 64, '4', 'HANDMAID') + disc(276, 64, '1', 'GUARD');
    board += A.text(60, 112, 'Sam’s discards', { size: 6.5, fill: '#f0c9d3' }) + A.text(290, 112, 'Max', { size: 6.5, fill: '#f0c9d3' });
    board += disc(192, 142, '2', 'PRIEST') + A.text(244, 189, 'Ivy’s discards', { size: 6.5, fill: '#f0c9d3' });
    const maxHand = back(240, 14);
    const seen = A.tag(214, 130, 'only Ivy sees', { fill: '#5d3b6a' });
    const baron = A.k('baron', face(76, 142, '3', 'BARON'));
    const samHand = (up) => A.k('sam', up ? face(64, 14, '8', 'COUNTESS') : back(64, 14));
    return [
      { step: 0, say: 'Ivy holds a {baron}. Last turn her Priest showed her Sam’s hand: the **Countess**.', svg: board + maxHand + samHand() + baron + seen + A.k('guard', back(142, 73)) +
        A.bubble(22, 117, 92, 18, 'Sam has Countess…', { size: 7.5 }) },
      { step: 0, say: 'Her turn: she **draws** a {guard}. Now she holds two cards.', svg: board + maxHand + samHand() + baron + seen + A.k('guard', face(116, 142, '1', 'GUARD')) },
      { step: 1, say: 'She **plays the Guard** face up, targets Sam and names **Countess**.', svg: board + maxHand + samHand() + baron + A.k('guard', disc(226, 142, '1', 'GUARD')) +
        A.bubble(22, 117, 92, 18, 'Sam: Countess?', { size: 8.5 }) + A.glow(80, 36, 26, 'g-sam') },
      { step: 1, say: 'Right guess. Sam reveals the {=countess} Countess and is **out of the round**.', svg: board + maxHand + samHand(true) + baron + A.k('guard', disc(226, 142, '1', 'GUARD')) +
        A.k('out', A.tag(34, 12, 'OUT', { fill: '#2b1a20' })) },
      { step: 2, say: 'Ivy **keeps the Baron** secret. Play passes to Max.', svg: board + maxHand + A.k('sam', disc(80, 64, '8', 'COUNTESS')) + A.k('baron', back(78, 144)) + A.k('guard', disc(226, 142, '1', 'GUARD')) +
        A.k('out', A.tag(34, 12, 'OUT', { fill: '#2b1a20' })) + A.glow(286, 30, 20, 'g-max') },
    ];
  },

  art(A) {
    const C = A.C, red = '#a3324a', cream = '#f6ead2', gold = '#d4a63a';
    let o = A.bg('#4a2230');
    o += A.rect(8, 8, 304, 184, '#6b2d3e', { rx: 14, sw: 1.4 });
    const byNum = ['spy', 'guard', 'priest', 'baron', 'handmaid', 'prince', 'chancellor', 'king', 'countess', 'princess'];
    const face = (x, y, n, name, r = 0, s = 1) => { const z = 51 * s; return A.group(A.use(this.icons[byNum[+n]].draw(A), -z / 2, -z / 2, z), `translate(${x} ${y}) rotate(${r})`); };
    const back = (x, y, r = 0) => A.group(A.card(-17, -24, 34, 48, red) + A.heart(0, 2, 12, gold, { sw: 0 }), `translate(${x} ${y}) rotate(${r})`);
    // Deck and set-aside card.
    o += back(152, 98, 0) + back(154, 95, 0) + back(156, 92, 0);
    o += back(206, 96, 12);
    // Opponents with their face-up discard rows.
    o += A.person(58, 34, 28, '#7d55b5', { face: '#e6c7a8' }) + A.person(272, 34, 28, '#2f6db5', { face: '#e6c7a8' });
    ['1', '5', '2'].forEach((n, i) => { o += face(30 + i * 28, 88, n, null, 0, 0.9); });
    ['4', '1'].forEach((n, i) => { o += face(262 + i * 28, 88, n, null, 0, 0.9); });
    // Your hand.
    o += face(140, 154, '3', null, -7, 1.2) + face(186, 154, '1', null, 7, 1.2);
    // Favor tokens.
    for (let i = 0; i < 3; i++) o += A.use(this.icons.favor.draw(A), 240 + i * 20, 166, 22);
    o += A.note(30, 100, 66, 124, 'Discards stay face up');
    o += A.note(120, 160, 54, 162, 'Hold 1, draw 1, play 1');
    o += A.note(210, 92, 262, 128, 'Set aside, unseen');
    o += A.note(270, 174, 270, 154, 'Favor tokens');
    return o;
  },
});
