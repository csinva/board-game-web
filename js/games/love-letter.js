defineGame({
  id: 'love-letter',
  name: 'Love Letter',
  year: 2012,
  designer: 'Seiji Kanai',
  family: 'hidden',
  players: [2, 6], best: '4',
  time: [20, 30],
  age: 10,
  mechanics: ['hand-management', 'deduction', 'player-elimination', 'bluffing', 'take-that', 'memory'],
  profile: { complexity: 1, luck: 4, interaction: 4, conflict: 3, talk: 2, planning: 1 },
  color: '#a3324a',

  pitch: 'Hold one card, draw one, play one. Guess, peek and duel your way to the last card standing in a 21-card game of nerve.',
  theme: 'You are suitors trying to get your love letter to the princess through the people of the palace.',

  goal: { big: 'Win favor tokens', text: 'Win rounds to collect **favor tokens**. First to the target wins: 6 with 2 players, 5 with 3, 4 with 4, 3 with 5–6.' },

  turn: {
    type: 'sequence',
    intro: 'You always hold 1 card. On your turn:',
    steps: [
      { verb: 'Draw', text: 'Draw the top card, so you hold **two**.' },
      { verb: 'Play', text: 'Play **one** of them face up in front of you and do what it says (even if it hurts you).' },
      { verb: 'Keep', text: 'Keep the other card secret until your next turn.' },
    ],
  },

  tension: 'Each turn you choose which of two cards to give up, and both what you play and what you keep tell everyone what you might be holding.',

  flow: [
    { label: 'Gather info', items: ['Count discards', 'Priest peeks', 'Watch what they keep'] },
    { label: 'Strike', items: ['Guard guesses', 'Baron duels', 'Prince forces discards'] },
    { label: 'Win the round', items: ['Last player in', 'Or highest card', 'Spy bonus'] },
  ],

  end: {
    trigger: 'A player reaches the number of favor tokens needed',
    detail: 'A round ends when only one player is left, or the deck runs out: then the highest card in hand wins the round.',
  },
  scoring: [
    { label: 'Round wins', share: 5 },
    { label: 'Spy bonus', share: 1 },
  ],

  ref: {
    title: 'The 21 cards (number = strength)',
    rows: [
      ['0 Spy ×2', 'end of round: a token if you’re the only player still in who played a Spy'],
      ['1 Guard ×6', 'name a non-Guard card; if that player has it, they’re out'],
      ['2 Priest · 3 Baron', 'look at a hand · compare hands, lower card is out'],
      ['4 Handmaid · 5 Prince', 'untargetable till your next turn · a player discards hand and redraws'],
      ['6 Chancellor · 7 King', 'draw 2, keep 1, put 2 on the bottom · trade hands'],
      ['8 Countess · 9 Princess', 'must play if you hold King/Prince · out if you discard her'],
    ],
  },

  example: 'Ivy holds a Baron (3) and draws a Guard (1). Sam has played two Princes, so she guesses Sam’s hand: she plays the Guard and names **Countess**. Sam has the Countess, so he is out of the round.',

  setup: [
    'Shuffle the 21 cards and remove the top card **face down** unseen (with 2 players also set aside 3 face up).',
    'Deal each player 1 card.',
    'The most recently romantic player goes first; after that, the last round’s winner starts.',
  ],

  terms: [
    ['Favor token', 'Won for winning a round (or the Spy bonus).'],
    ['Out', 'Knocked out of this round: discard your hand and wait.'],
    ['Protected', 'Under Handmaid: no card can target you.'],
    ['Discard pile', 'Your played cards, kept face up in order so everyone can count.'],
  ],

  gotchas: [
    'If every other player is protected, you must still play a card; if it needs a target, it does nothing (Prince must then target yourself).',
    'The **Countess** must be played if your other card is the King or Prince, so playing her is not proof of either.',
    'Discarding the **Princess** for any reason, even when forced by a Prince, knocks you out.',
  ],

  tips: [
    'Count what is visible: 6 Guards and only 1 Princess, so think about what is left.',
    'Guard guesses are best aimed at someone who just kept a card after a Priest or King revealed it.',
    'Keep high cards late in the round when the deck is nearly empty.',
  ],

  art(A) {
    const C = A.C, red = '#a3324a', cream = '#f6ead2', gold = '#d4a63a';
    let o = A.bg('#4a2230');
    o += A.rect(8, 8, 304, 184, '#6b2d3e', { rx: 14, sw: 1.4 });
    const face = (x, y, n, name, r = 0, s = 1) => {
      const w = 34 * s, h = 48 * s;
      let g = A.card(-w / 2, -h / 2, w, h, cream, { face: red });
      g += A.circle(-w / 2 + 9 * s, -h / 2 + 10 * s, 7 * s, red, { sw: 0 }) + A.text(-w / 2 + 9 * s, -h / 2 + 10.5 * s, n, { size: 9 * s, weight: 800, fill: C.white });
      g += A.circle(0, 2 * s, 8 * s, '#e6c7a8', { sw: 1 }) + A.path(`M${-11 * s} ${17 * s} q${11 * s} -${12 * s} ${22 * s} 0`, { fill: red, sw: 1 });
      if (name) g += A.text(0, h / 2 - 7 * s, name, { size: 5.5 * s, weight: 800, fill: red });
      return A.group(g, `translate(${x} ${y}) rotate(${r})`);
    };
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
    for (let i = 0; i < 3; i++) o += A.heart(250 + i * 20, 180, 14, '#e2425e', { sw: 1, stroke: C.ink });
    o += A.note(30, 100, 66, 124, 'Discards stay face up');
    o += A.note(120, 160, 54, 162, 'Hold 1, draw 1, play 1');
    o += A.note(210, 92, 262, 128, 'Set aside, unseen');
    o += A.note(270, 174, 270, 154, 'Favor tokens');
    return o;
  },
});
