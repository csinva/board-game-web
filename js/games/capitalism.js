(function () {
  const RED = '#c8423b';
  const isRed = s => s === '♥' || s === '♦';
  // Playing card in a 24×24 box (card 16×22). Shared by icons and scenes.
  const face = (A, r, s) => {
    const col = isRed(s) ? RED : A.C.ink;
    return A.rect(4, 1, 16, 22, '#fffdf7', { rx: 2.2, sw: 0.8 }) +
      A.text(r.length > 1 ? 8.8 : 7.6, 5.8, r, { size: 5.8, weight: 800, fill: col }) +
      A.text(12.6, 14.6, s + '︎', { size: 10.5, fill: col, weight: 400 });
  };
  const rank = (A, r) => A.rect(4, 1, 16, 22, '#fffdf7', { rx: 2.2, sw: 1.1 }) + A.text(12, 12.5, r, { size: r.length > 1 ? 9 : 11, weight: 800 });
  const back = A => A.rect(4, 1, 16, 22, '#2d4f8e', { rx: 2.2, sw: 0.8 }) + A.rect(6, 3, 12, 18, 'none', { rx: 1.4, sw: 0.6, stroke: '#a9bde6' });
  const crown = A => A.crown(12, 19, 18, '#e2b33c');
  const broom = A => A.line(17, 2.5, 10, 14, { stroke: '#8a5a33', sw: 2 }) + A.poly([[7.5, 11.5], [12.5, 15], [9, 22], [2.5, 19.5]], '#d9b45a', { sw: 1 }) +
    A.line(5, 20.5, 7.6, 15, { stroke: '#a8843a', sw: 0.7 }) + A.line(7.4, 21.4, 9.8, 16.4, { stroke: '#a8843a', sw: 0.7 });

  defineGame({
    id: 'capitalism',
    name: 'Capitalism (President)',
    year: 'Late 20th c.',
    designer: 'Traditional (from Japan’s Dai Hin Min)',
    family: 'deck',
    players: [4, 7], best: '5–6',
    time: [20, 60],
    age: 8,
    mechanics: ['shedding', 'hand-management', 'take-that'],
    profile: { complexity: 1, luck: 4, interaction: 4, conflict: 3, talk: 4, planning: 2 },

    icons: {
      r3: { name: '3', draw: A => rank(A, '3') },
      r4: { name: '4', draw: A => rank(A, '4') },
      r9: { name: '9', draw: A => rank(A, '9') },
      rk: { name: 'king', draw: A => rank(A, 'K') },
      ra: { name: 'ace', draw: A => rank(A, 'A') },
      r2: { name: '2', draw: A => rank(A, '2') },
      president: { name: 'President', draw: crown },
      scum: { name: 'Scum', draw: broom },
    },

    pitch: 'Beat the last play with the same number of higher cards; first to empty your hand becomes President.',

    goal: { big: 'Go out first', text: 'Be the first to play all your cards (**go out**). The order in which players go out sets everyone’s rank for the next hand, from {president} (first out) down to {scum} (last).' },

    turn: {
      type: 'round',
      intro: 'Each hand:',
      steps: [
        { verb: 'Swap', text: 'Before play (not in the first hand): the {=scum} Scum gives their **highest** card to the {=president} President, who then gives the Scum any 1 card of their choice.' },
        { verb: 'Lead', text: 'The **leader** (first hand: the player to the dealer’s left; later hands: the {=president} President) starts a pile by playing 1 card, or 2, 3 or 4 cards of the same rank, face up in the middle.' },
        { verb: 'Beat or pass', text: 'Going clockwise, each player either plays the **same number** of cards, all of one rank **higher** than the last play, onto the pile, or passes. Passing does not stop you from playing when your turn comes round again.' },
        { verb: 'Clear', text: 'When every other player still holding cards passes in a row, the last player to play **clears** the pile (sets it aside) and leads any new play. If that player has gone out, the next player still holding cards leads.' },
        { verb: 'Go out', text: 'Players drop out as their hands empty. The first out becomes {=president} President, the second Vice-President, and the last player still holding cards {=scum} Scum.' },
      ],
    },

    tension: 'Spend high cards early to keep control of the lead, or save them so you can still beat plays when your hand is small.',

    structure: [
      { label: 'Deal', text: 'Deal all the cards clockwise. First hand: the player to the dealer’s left leads.' },
      { label: 'Swap', text: 'From the second hand on: the {scum} gives their highest card to the {president}, who gives back any 1 card.' },
      { label: 'Piles', repeat: 'until hands empty', text: 'Lead, beat or pass, clear, then lead again. Players drop out as their hands empty.' },
      { label: 'New ranks', text: 'The order players went out sets their ranks. Everyone changes seats: the President picks a seat, the Vice-President sits on the President’s left, and so on clockwise in finishing order, so the Scum sits on the President’s right.' },
      { label: 'Next hand', repeat: 'as long as you like', text: 'The {scum} deals; after the swap, the {president} leads.' },
    ],

    end: {
      trigger: 'the group stops; there is no fixed end',
      detail: 'Play any number of hands. Or score each hand (President 2 points, Vice-President 1, everyone else 0); the first player to reach 11 points wins.',
      results: [{ side: 'Winner', text: 'whoever is {president} when you stop, or has the most points if you keep score.' }],
    },

    ref: {
      title: 'Ranks & swaps',
      rows: [
        ['Low → high', '{=r3} {=r4} … {=rk} {=ra} {=r2}'],
        ['Legal plays', '1 card {=r9}, or 2, 3 or 4 cards of one rank {=r9}{=r9}'],
        ['To beat', 'same number of cards, higher rank'],
        ['{=scum} → {=president}', 'Scum gives their highest card; President gives back any 1 card'],
        ['Everyone else', 'No swap'],
        ['Next hand', 'Scum deals; President leads'],
      ],
    },

    example: 'Jo was {scum}, so Jo gives you ({=president}) the 2{=spade}, their highest card; you return the 4{=club}. You lead a pair of 6s, Ben passes, Lee beats it with a pair of 9s, and Jo plays a pair of kings. Nobody beats the kings, so Jo clears the pile and leads.',

    setup: [
      'Use a standard 52-card deck; suits don’t matter.',
      'Choose a dealer, who deals all the cards clockwise; some players may get 1 more card than others.',
      'First hand: the player to the dealer’s left leads. Later hands: the {president} leads.',
    ],

    terms: [
      ['{=president} President', 'First out. Receives the Scum’s highest card and leads the next hand.'],
      ['{=scum} Scum', 'Last out. Gives away their highest card and deals the next hand.'],
      ['Lead', 'Play the first cards onto an empty pile. Any legal play is allowed.'],
      ['Clear', 'Everyone else passed: the pile is set aside and the last player to play leads. If they are out, the next player still holding cards leads.'],
      ['Citizens', 'Everyone between Vice-President and Scum. They swap nothing.'],
    ],

    gotchas: [
      '**2s** are the highest rank. A play must have the same number of cards as the last play: a single 2 can’t beat a pair of 3s.',
      'Passing doesn’t lock you out: if your turn comes round again before the pile is cleared, you may play.',
      'Common house rules (agree before dealing): Scum and President swap 2 cards each way, and Vice-Scum (second to last) and Vice-President swap 1; a pass locks you out until the pile clears; an equal rank may be played and skips the next player; jokers rank above 2s; the 3{=club} holder leads the first hand.',
    ],

    tips: [
      'Lead your low pairs and triples early: later they can only go on lower sets of the same size.',
      'Keep a 2 or an ace to win back the lead late in the hand.',
      'Splitting a pair to beat a single often leaves you an unplayable card.',
    ],

    walk(A) {
      const C = A.C, Z = 44, k = Z / 24;
      const cd = (x, y, r, s, z = Z) => A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(face(A, r, s), x - 4 * z / 24, y - z / 24, z);
      const bk = (x, y, z = 30) => A.use(back(A), x - 4 * z / 24, y - z / 24, z);
      let board = A.bg('#24533d') + A.rect(5, 5, 310, 190, '#2f6e4f', { rx: 24, sw: 0 });
      for (let i = 0; i < 6; i++) board += bk(128 + i * 9, 10);
      for (let i = 0; i < 5; i++) board += bk(12 + i * 5, 72) + bk(268 + i * 5, 72);
      board += A.tag(40, 60, 'Ben') + A.tag(160, 50, 'Lee') + A.tag(286, 60, 'Jo') + A.tag(32, 176, 'You');
      const C0 = { c4: ['4', '♣'], h5: ['5', '♥'], s6: ['6', '♠'], d6: ['6', '♦'], c9: ['9', '♣'], hJ: ['J', '♥'], dA: ['A', '♦'], s2: ['2', '♠'] };
      const hand = ids => { const x0 = 172 - ((ids.length - 1) * 21 + 16 * k) / 2; return ids.map((id, i) => A.k(id, cd(x0 + i * 21, 150, ...C0[id]))).join(''); };
      const P = i => [84 + i * 42, 70 + i * 4];
      const pair = (i, a, b, ra, sa, rb, sb) => { const [x, y] = P(i); return A.k(a, cd(x, y, ra, sa)) + A.k(b, cd(x + 16, y + 2, rb, sb)); };
      const joGets = A.k('c4', cd(272, 108, '4', '♣', 36));
      const p0 = pair(0, 's6', 'd6', '6', '♠', '6', '♦'), p1 = pair(1, 's9', 'h9', '9', '♠', '9', '♥'), p2 = pair(2, 'sK', 'cK', 'K', '♠', 'K', '♣');
      const pass = (key, x, y) => A.k(key, A.bubble(x, y, 40, 20, 'Pass', { size: 9.5 }));
      const rest = hand(['h5', 'c9', 'hJ', 's2']);
      return [
        { step: 0, say: 'Jo was {=scum} Scum last hand, so Jo hands you ({=president} President) their **highest** card: 2{=spade}.',
          svg: board + hand(['c4', 'h5', 's6', 'd6', 'c9', 'hJ']) + A.k('s2', cd(272, 108, '2', '♠', 36)) + A.glow(284, 128, 26) },
        { step: 0, say: 'You return **any 1** card. You give back your lowest: 4{=club}.',
          svg: board + joGets + hand(['h5', 's6', 'd6', 'c9', 'hJ', 's2']) + A.glow(284, 128, 26, 'g-jo') },
        { step: 1, say: 'As President you lead: a **pair** of 6s. Each player must now play a higher pair or pass.',
          svg: board + joGets + rest + p0 + A.glow(106, 92, 30) },
        { step: 2, say: 'Ben passes. Lee plays a pair of **9s**.',
          svg: board + joGets + rest + p0 + p1 + pass('pb', 46, 140) },
        { step: 2, say: 'Jo plays a pair of **kings**. You have no pair above kings, so you pass; Ben and Lee pass too.',
          svg: board + joGets + rest + p0 + p1 + p2 + pass('pb', 46, 140) + pass('py', 226, 128) + pass('pl', 200, 22) + A.glow(190, 100, 30) },
        { step: 3, say: 'Everyone passed after Jo, so Jo **clears** the pile and leads anything: a single 3.',
          svg: board + joGets + rest +
            A.k('s6', cd(28, 114, '6', '♠', 30)) + A.k('d6', cd(31, 116, '6', '♦', 30)) + A.k('s9', cd(34, 118, '9', '♠', 30)) + A.k('h9', cd(37, 120, '9', '♥', 30)) + A.k('sK', cd(40, 122, 'K', '♠', 30)) + A.k('cK', cd(43, 124, 'K', '♣', 30)) +
            A.k('d3', cd(146, 76, '3', '♦')) + A.glow(158, 96, 26) },
        { step: 4, say: 'Play continues until hands are empty. Jo goes out first: {=president} **President** next hand. Ben is last: {=scum} **Scum**.',
          svg: board + joGets + rest + A.k('d3', cd(146, 76, '3', '♦')) +
            A.k('crown', A.use(crown(A), 238, 46, 28)) + A.k('broom', A.use(broom(A), 62, 46, 28)) + A.glow(252, 60, 18, 'g-jo2') },
      ];
    },

    art(A) {
      const C = A.C;
      const cd = (x, y, r, s, z = 40, rot = 0) => {
        const g = A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(face(A, r, s), x - 4 * z / 24, y - z / 24, z);
        return rot ? A.group(g, `rotate(${rot} ${x + 8 * z / 24} ${y + 11 * z / 24})`) : g;
      };
      const bk = (x, y, z = 30) => A.use(back(A), x - 4 * z / 24, y - z / 24, z);
      let o = A.bg('#24533d') + A.rect(5, 5, 310, 190, '#2f6e4f', { rx: 24, sw: 0 });
      // President (top) with crown, Scum (right) with broom
      for (let i = 0; i < 4; i++) o += bk(140 + i * 9, 14);
      o += A.use(crown(A), 108, 8, 30);
      for (let i = 0; i < 6; i++) o += bk(262 + i * 5, 74);
      o += A.use(broom(A), 274, 112, 30);
      for (let i = 0; i < 5; i++) o += bk(14 + i * 5, 74);
      // the pile: pairs climbing
      o += cd(104, 74, '5', '♣', 40, -12) + cd(116, 76, '5', '♦', 40, -8) + cd(132, 70, '9', '♠', 40, -2) + cd(144, 72, '9', '♥', 40, 3) + cd(162, 74, 'Q', '♣', 40, 8) + cd(175, 77, 'Q', '♥', 40, 12);
      // your hand
      [['3', '♥'], ['7', '♣'], ['7', '♠'], ['J', '♦'], ['A', '♣'], ['2', '♠']].forEach(([r, s], i) => { o += cd(70 + i * 19, 148 + Math.abs(i - 2.5) * 1.6, r, s, 40, (i - 2.5) * 4); });
      // swap arrow: Scum -> President
      o += A.curve(272, 70, 260, 28, 194, 26, { sw: 1.8, stroke: '#f6efdc' });
      o += A.note(112, 112, 88, 128, 'Beat: same count, higher');
      o += A.note(175, 162, 262, 186, '2 is the top card');
      o += A.note(118, 22, 62, 46, 'First out: President');
      o += A.note(284, 134, 262, 160, 'Last out: Scum');
      return o;
    },
  });
})();
