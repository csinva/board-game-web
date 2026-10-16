(function () {
  const COL = { r: '#d8382e', y: '#f0bf1a', g: '#2f9a4a', b: '#1f68c4', k: '#222222' };
  // UNO card in a 24×24 box (card 15×22). sym: number string, 'skip', 'rev', '+2', 'wild', '+4'.
  const uno = (A, c, sym) => {
    const fill = COL[c];
    let s = A.rect(4.5, 1, 15, 22, fill, { rx: 2.2, sw: 0.8 }) + A.group(A.path('M12 5.2 C17.5 5.2 17.5 18.8 12 18.8 C6.5 18.8 6.5 5.2 12 5.2 Z', { fill: c === 'k' ? '#222' : '#fff', sw: 0 }), 'rotate(28 12 12)');
    const ink = c === 'k' ? '#fff' : fill;
    if (sym === 'wild' || sym === '+4') {
      const q = (d, f) => A.path(d, { fill: f, sw: 0 });
      s += A.group(q('M12 6.6 A3.6 5.4 0 0 1 15.6 12 L12 12 Z', COL.r) + q('M15.6 12 A3.6 5.4 0 0 1 12 17.4 L12 12 Z', COL.b) + q('M12 17.4 A3.6 5.4 0 0 1 8.4 12 L12 12 Z', COL.y) + q('M8.4 12 A3.6 5.4 0 0 1 12 6.6 L12 12 Z', COL.g), 'rotate(28 12 12)');
      if (sym === '+4') s += A.text(12, 12.3, '+4', { size: 6.2, weight: 900, fill: '#fff' });
    } else if (sym === 'skip') {
      s += A.circle(12, 12, 3.6, 'none', { stroke: ink, sw: 1.6 }) + A.line(9.6, 14.4, 14.4, 9.6, { stroke: ink, sw: 1.6 });
    } else if (sym === 'rev') {
      s += A.arrow(8.2, 13.2, 13.4, 8, { stroke: ink, sw: 1.4, head: 3 }) + A.arrow(15.8, 10.8, 10.6, 16, { stroke: ink, sw: 1.4, head: 3 });
    } else {
      s += A.text(12, 12.4, sym, { size: sym.length > 1 ? 7 : 9.5, weight: 900, fill: ink });
    }
    return s;
  };
  const back = A => A.rect(4.5, 1, 15, 22, '#222', { rx: 2.2, sw: 0.8 }) + A.group(A.path('M12 5.2 C17.5 5.2 17.5 18.8 12 18.8 C6.5 18.8 6.5 5.2 12 5.2 Z', { fill: COL.r, sw: 0 }), 'rotate(28 12 12)');

  defineGame({
    id: 'uno',
    name: 'UNO',
    year: 1971,
    designer: 'Merle Robbins',
    family: 'deck',
    players: [2, 10], best: '4–6',
    time: [15, 45],
    age: 7,
    mechanics: ['shedding', 'take-that', 'hand-management'],
    profile: { complexity: 1, luck: 4, interaction: 4, conflict: 4, talk: 3, planning: 1 },

    icons: {
      r7: { name: 'red 7', draw: A => uno(A, 'r', '7') },
      b7: { name: 'blue 7', draw: A => uno(A, 'b', '7') },
      skip: { name: 'Skip', draw: A => uno(A, 'r', 'skip') },
      reverse: { name: 'Reverse', draw: A => uno(A, 'y', 'rev') },
      draw2: { name: 'Draw Two', draw: A => uno(A, 'g', '+2') },
      wild: { name: 'Wild', draw: A => uno(A, 'k', 'wild') },
      wild4: { name: 'Wild Draw Four', draw: A => uno(A, 'k', '+4') },
    },

    pitch: 'Play a card matching the top card’s colour, number or symbol; first to empty your hand scores the cards others hold.',

    goal: { big: '500 points', text: 'Go out first in a round to score the cards left in everyone else’s hands. First to **500** wins.' },

    turn: {
      type: 'choose',
      intro: 'On your turn, do one:',
      outro: 'Down to 1 card? Say “UNO”. Next player',
      steps: [
        { verb: 'Match', text: 'Play a card matching the top card’s **colour**, **number** or **symbol**: {=b7} goes on any blue card or any 7.' },
        { verb: 'Play wild', text: '{=wild} goes on anything; name the next colour. {=wild4} too, but only if you hold **no card of the current colour**.' },
        { verb: 'Draw', text: 'Draw 1 (allowed even if you could play). You may play the drawn card if it matches, but no other card; then your turn ends.' },
      ],
    },

    tension: 'Save action cards and wilds to defend yourself late, or play them now to slow the player about to go out.',

    structure: [
      { label: 'Deal', text: '7 cards each. Flip the top card of the draw pile to start the discard pile.' },
      { label: 'Turns', repeat: 'until someone is out', text: 'Match or draw. Action cards change who goes next.' },
      { label: 'Score the round', text: 'The player who went out scores all cards left in opponents’ hands.' },
      { label: 'Next round', repeat: 'until 500 points', text: 'Shuffle all cards and deal again. The rules don’t name the next dealer; passing the deal left is usual.' },
    ],

    points: [
      ['Number cards', 'Face value (0–9)'],
      ['{=skip} {=reverse} {=draw2}', '20 each'],
      ['{=wild} {=wild4}', '50 each'],
      ['Who scores', 'Only the player who went out, from every opponent’s hand'],
      ['Going out on {=draw2} or {=wild4}', 'The next player still draws; those cards count too'],
    ],

    end: {
      trigger: 'a player reaches 500 points after a round',
      results: [{ side: 'Winner', text: 'the first player to 500.' }],
    },

    ref: {
      title: 'Action cards',
      rows: [
        ['{skip}', 'Next player loses their turn.'],
        ['{reverse}', 'Reverse direction. With 2 players, acts as Skip.'],
        ['{draw2}', 'Next player draws 2 and loses their turn.'],
        ['{wild}', 'Name any colour.'],
        ['{wild4}', 'Name a colour; next player draws 4 and loses their turn. Legal only with no card of the current colour.'],
      ],
    },

    example: 'The top card is {=r7}. You play {=b7} (same number); blue is now the colour. Ben plays a blue Draw Two: Lee draws 2 and is skipped.',

    setup: [
      'Each player draws a card; highest number deals. Shuffle the 108 standard cards (blank cards in newer decks are optional); deal 7 each. The rest is the draw pile.',
      'Flip the top card. If it is {=wild4}, shuffle it back and flip again. Any other action card applies to the first player (a {=wild}: first player names the colour). Sheets since 2022 just flip again for any action or wild card.',
      'Player left of the dealer starts, clockwise (a starting {=reverse}: dealer starts, going right).',
    ],

    terms: [
      ['UNO', 'Say it as you play your second-to-last card.'],
      ['Challenge', 'The player hit by {=wild4} may claim it was illegal. The player who played it shows their hand to the challenger.'],
      ['Draw pile', 'Face-down cards. When empty, shuffle the discard pile (except the top card) into a new one.'],
    ],

    gotchas: [
      '**Stacking** a Draw Two on a Draw Two (or a Draw Four on either) is a house rule; Mattel confirmed it isn’t allowed. Officially you draw and lose your turn.',
      '{=wild4} challenge: if it was illegal, the player who played it draws 4 instead. If legal, the challenger draws 6 and loses their turn. The named colour stands either way.',
      'Forget to say UNO and get caught before the next player starts their turn: draw 2.',
    ],

    tips: [
      'Hold a {=wild} for when you have no match.',
      'Play {=draw2} and {=skip} on the player with fewest cards.',
      'When someone has 1 card, get rid of wilds (50) and action cards (20) first: whatever you hold scores for the winner.',
    ],

    walk(A) {
      const C = A.C, Z = 44;
      const cd = (x, y, c, sym, z = Z) => A.rect(x + 1.5, y + 2, 15 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(uno(A, c, sym), x - 4.5 * z / 24, y - z / 24, z);
      const bk = (x, y, z = 30) => A.use(back(A), x - 4.5 * z / 24, y - z / 24, z);
      let board = A.bg('#2a2f4a') + A.rect(5, 5, 310, 190, '#353b5e', { rx: 24, sw: 0 });
      for (let i = 0; i < 4; i++) board += bk(130 + i * 9, 10);
      for (let i = 0; i < 4; i++) board += bk(14 + i * 5, 74) + bk(272 + i * 5, 74);
      board += A.tag(40, 62, 'Ben') + A.tag(160, 50, 'Lee') + A.tag(286, 62, 'Jo') + A.tag(40, 176, 'You');
      const DP = [104, 78], DS = [164, 78];
      board += bk(DP[0], DP[1] + 2, 44) + bk(DP[0] + 2, DP[1], 44) + A.text(DP[0] + 14, DP[1] + 52, 'draw', { size: 8, fill: '#c9cde6' });
      // drawn cards stacked on the draw pile until they move
      const onDeck = keys => keys.map(k => A.k(k, bk(DP[0] + 2, DP[1], 44))).join('');
      const H = ['yb7', 'yw4', 'yg3'];
      const mine = ids => { const x0 = 160 - ((ids.length - 1) * 30 + 27) / 2; return ids.map((id, i) => A.k(id, cd(x0 + i * 30, 146, ...{ yb7: ['b', '7'], yw4: ['k', '+4'], yg3: ['g', '3'] }[id]))).join(''); };
      const pile = (key, c, sym, n) => A.k(key, cd(DS[0] + n * 3, DS[1] + n * 2, c, sym));
      const r7 = pile('r7', 'r', '7', 0), b7 = pile('yb7', 'b', '7', 1), b2 = pile('b2', 'b', '+2', 2), w4 = pile('yw4', 'k', '+4', 3), g9 = pile('g9', 'g', '9', 4), g3 = pile('yg3', 'g', '3', 5);
      const leeGot = A.k('l1', bk(178, 22)) + A.k('l2', bk(187, 22));
      const joGot = A.k('j1', bk(290, 84)), jo2 = A.k('j2', bk(298, 88));
      const benGot = [0, 1, 2, 3].map(i => A.k('ben' + i, bk(34 + i * 6, 84))).join('');
      const colourDot = (c) => A.k('colour', A.circle(240, 98, 9, COL[c], { sw: 1.5 }) + A.text(240, 114, 'colour', { size: 7, fill: '#c9cde6' }));
      return [
        { step: 0, say: 'Top card: {=r7}. Your {=b7} matches by **number**, so you play it. The colour is now blue.',
          svg: board + onDeck(['l1', 'l2', 'j1', 'ben0', 'ben1', 'ben2', 'ben3']) + r7 + mine(['yb7', 'yw4', 'yg3']) + A.glow(DS[0] + 16, DS[1] + 22, 30) },
        { step: 0, say: 'Ben plays a blue **Draw Two**. Lee draws 2 and loses his turn.',
          svg: board + onDeck(['j1', 'ben0', 'ben1', 'ben2', 'ben3']) + r7 + b7 + b2 + leeGot + mine(['yw4', 'yg3']) + colourDot('b') + A.glow(184, 32, 20) },
        { step: 2, say: 'Jo has no blue card and no Draw Two. She **draws** 1; it doesn’t match, so her turn ends.',
          svg: board + onDeck(['ben0', 'ben1', 'ben2', 'ben3']) + r7 + b7 + b2 + leeGot + joGot + mine(['yw4', 'yg3']) + colourDot('b') + A.glow(296, 98, 18) },
        { step: 1, say: 'You hold no blue, so {=wild4} is legal. You name **green**; Ben draws 4 and is skipped. One card left: say **UNO**.',
          svg: board + onDeck(['j2']) + r7 + b7 + b2 + w4 + leeGot + joGot + benGot + mine(['yg3']) + colourDot('g') + A.k('uno', A.bubble(186, 118, 50, 22, 'UNO!', { size: 11 })) },
        { step: 0, say: 'Lee plays a green 9. Jo draws. Your green 3 matches: you are **out**.',
          svg: board + r7 + b7 + b2 + w4 + g9 + g3 + leeGot + joGot + jo2 + benGot + colourDot('g') + A.glow(DS[0] + 31, DS[1] + 32, 30) },
        { step: 0, say: 'You score every card left in the others’ hands: numbers at face value, actions 20, wilds 50.',
          svg: board + r7 + b7 + b2 + w4 + g9 + g3 + leeGot + joGot + jo2 + benGot +
            A.k('score', A.rect(112, 140, 96, 40, '#fbf6ec', { rx: 4, sw: 1.2 }) + A.text(160, 152, 'You score', { size: 9, weight: 700 }) + A.text(160, 168, '+ their cards', { size: 11, weight: 800, fill: COL.r })) },
      ];
    },

    art(A) {
      const C = A.C;
      const cd = (x, y, c, sym, z = 46, rot = 0) => {
        const g = A.rect(x + 1.5, y + 2, 15 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(uno(A, c, sym), x - 4.5 * z / 24, y - z / 24, z);
        return rot ? A.group(g, `rotate(${rot} ${x + 7.5 * z / 24} ${y + 11 * z / 24})`) : g;
      };
      const bk = (x, y, z = 46) => A.use(back(A), x - 4.5 * z / 24, y - z / 24, z);
      let o = A.bg('#2a2f4a') + A.rect(5, 5, 310, 190, '#353b5e', { rx: 24, sw: 0 });
      // direction arrows
      o += A.curve(250, 40, 290, 100, 250, 160, { stroke: '#8d93bf', sw: 2 }) + A.curve(70, 160, 30, 100, 70, 40, { stroke: '#8d93bf', sw: 2 });
      // draw pile
      o += bk(76, 62) + bk(78, 60) + bk(80, 58);
      // discard pile
      o += cd(138, 58, 'y', '4', 46, -14) + cd(146, 56, 'y', 'skip', 46, 6) + cd(156, 60, 'k', 'wild', 46, -4);
      o += A.circle(214, 82, 8, COL.b, { sw: 1.5 });
      // your hand
      [['r', '2'], ['b', '9'], ['g', '+2'], ['y', 'rev'], ['b', '5']].forEach(([c, s], i) => { o += cd(92 + i * 20, 136 + Math.abs(i - 2) * 2, c, s, 42, (i - 2) * 5); });
      // opponent with one card
      o += bk(250, 24, 40);
      o += A.bubble(262, 4, 46, 20, 'UNO!', { size: 10 });
      o += A.note(178, 84, 230, 124, 'Match colour or number');
      o += A.note(214, 82, 250, 100, 'Wild names the colour');
      o += A.note(90, 70, 44, 26, 'Draw pile');
      o += A.note(262, 46, 262, 172, '1 card left: say UNO');
      return o;
    },
  });
})();
