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
  const back = A => A.rect(4, 1, 16, 22, '#8e2b2b', { rx: 2.2, sw: 0.8 }) + A.rect(6, 3, 12, 18, 'none', { rx: 1.4, sw: 0.6, stroke: '#eab3a8' });
  const chip = (A, col = '#c8423b') => A.circle(12, 12, 10, col, { sw: 1.2 }) + A.circle(12, 12, 10, 'none', { sw: 3.2, stroke: '#fff', dash: '3.3 4.5' }) + A.circle(12, 12, 5.6, col, { sw: 0.8, stroke: '#fff' });
  const button = A => A.circle(12, 12, 10, '#fffdf7', { sw: 1.3 }) + A.text(12, 12.5, 'D', { size: 11, weight: 800 });

  defineGame({
    id: 'texas-holdem',
    name: 'Texas Hold’em',
    year: 'Early 1900s',
    designer: 'Traditional (Robstown, Texas)',
    family: 'deck',
    players: [2, 10], best: '6–9',
    time: [30, 240],
    age: 16,
    mechanics: ['betting', 'bluffing', 'press-your-luck', 'player-elimination', 'hand-management'],
    profile: { complexity: 2, luck: 4, interaction: 5, conflict: 4, talk: 3, planning: 3 },

    icons: {
      chip: { name: 'chip', draw: A => chip(A) },
      button: { name: 'dealer button', draw: button },
      hole: { name: 'hole card', draw: back },
    },

    pitch: 'Bet on the best 5-card hand from 2 private and 5 shared cards; win chips by showing the best hand or making others fold.',

    goal: { big: 'Win the chips', text: 'Each hand, players bet chips into a central **pot**. Win it by holding the best 5-card hand when the remaining players reveal their cards (the **showdown**), or by betting until every other player gives up (**folds**). In a tournament, win every {chip}.' },

    turn: {
      type: 'round',
      intro: 'Each hand:',
      steps: [
        { verb: 'Blinds', text: 'The {button} marks the dealer’s seat. The player to its left puts in the **small blind** and the next player to the left puts in the **big blind**: forced bets of the agreed sizes. Deal each player 2 cards face down: their {hole}s.' },
        { verb: 'Preflop', text: 'Betting round 1 starts with the player to the left of the big blind and goes clockwise. On your turn: **fold** (drop your cards and leave the hand), **call** (put in chips to match the highest bet so far), or **raise** (match it and add more). If no one has bet this round, you may instead **check** (pass without betting) or **bet**. The big blind acts last and may raise even if everyone just called. The round ends when every player still in has had a turn and has put in the same amount.' },
        { verb: 'Flop', text: 'The dealer discards (**burns**) the top card face down, then deals 3 shared cards face up in the middle: the **flop**. Betting round 2 starts with the first player still in to the left of the {=button}.' },
        { verb: 'Turn, river', text: 'Burn 1 card, deal a 4th shared card (the **turn**), and hold betting round 3. Burn 1 card, deal a 5th shared card (the **river**), and hold betting round 4. Both rounds start like round 2.' },
        { verb: 'Showdown', text: 'If 2 or more players are still in, they reveal their hole cards, starting with the last player who bet or raised (if everyone checked, the first player still in to the left of the button). Each makes the **best 5-card hand from their 7 cards** (2 hole + 5 shared); the best hand wins the pot. Move the {=button} 1 seat left.' },
      ],
    },

    tension: 'Each bet asks a question: fold and lose what you put in, or pay more to see whether your hand beats a player who may be bluffing.',

    structure: [
      { label: 'Setup', text: 'Give everyone the same number of {chip}s; agree the blind sizes.' },
      { label: 'Hand', repeat: 'every hand', text: 'Blinds, 2 {hole}s each, 4 betting rounds (preflop, flop, turn, river), showdown. If every player but one folds, at any point, that player wins the pot without showing their cards.' },
      { label: 'Move button', text: 'The {=button} and blinds move 1 seat left.' },
      { label: 'Tournament', repeat: 'on a timer', text: 'Blinds rise on a schedule (e.g. every 20 min). Players with no chips are out.' },
      { label: 'End', text: 'Last player with chips wins.' },
    ],

    end: {
      trigger: 'one player has every chip (tournament)',
      detail: 'Tournament blinds rise on a timer. In a cash game there is no end: players buy chips and leave when they like.',
      results: [{ side: 'Winner', text: 'the last player with chips. Players who lose all their chips are out.' }],
    },

    ref: {
      title: 'Hand ranks, high to low',
      rows: [
        ['Straight flush', '9{=heart} 8{=heart} 7{=heart} 6{=heart} 5{=heart} (A-high = royal flush)'],
        ['Four of a kind', 'Q{=spade} Q{=heart} Q{=diamond} Q{=club} 3{=spade}'],
        ['Full house', 'K{=club} K{=diamond} K{=heart} 7{=spade} 7{=club}'],
        ['Flush', 'A{=spade} J{=spade} 9{=spade} 4{=spade} 2{=spade}'],
        ['Straight', '8{=club} 7{=heart} 6{=spade} 5{=diamond} 4{=club} (A can be high or low: 5 4 3 2 A)'],
        ['Three of a kind', '9{=club} 9{=heart} 9{=diamond} K{=spade} 2{=club}'],
        ['Two pair', 'J{=heart} J{=club} 4{=spade} 4{=diamond} A{=club}'],
        ['Pair', '10{=spade} 10{=heart} K{=club} 6{=diamond} 3{=spade}'],
        ['High card', 'A{=diamond} Q{=club} 9{=heart} 6{=spade} 2{=club}'],
      ],
    },

    example: 'You hold A{=spade} K{=spade} and raise to 6; Maya calls from the big blind. The flop is K{=heart} 9{=spade} 4{=spade}. You bet 8 and she calls. The turn 2{=spade} gives you a flush; at showdown it beats her pair of kings.',

    setup: [
      'One 52-card deck, a {button}, and equal {chip} stacks for everyone.',
      'Agree the blinds, e.g. small 1, big 2.',
      'Deal 1 card each; the highest card takes the {=button} first.',
    ],

    terms: [
      ['Blinds', 'Forced bets by the 2 players to the left of the button. With only 2 players, the button player puts in the small blind, acts first in betting round 1, and acts last in later rounds.'],
      ['Pot', 'All chips bet in the current hand, in the middle of the table.'],
      ['Check', 'Pass without betting. Only allowed if nobody has bet this round.'],
      ['All-in', 'Betting all your chips. You can win from each player only as much as you put in; bets beyond that form a side pot among the others.'],
      ['Kicker', 'A card in your 5-card hand that is not part of its pair, three or four of a kind. When two hands are otherwise equal, the higher kicker wins.'],
      ['No-limit', 'The betting style used here: any bet or raise may be from the size of the big blind up to all your chips.'],
    ],

    gotchas: [
      'Your hand is the best 5 of 7 cards: use 2, 1 or 0 of your hole cards.',
      'A raise must be at least the size of the previous bet or raise in that round.',
      'Suits never rank. If two hands are otherwise equal, compare kickers; if still equal, the tied players split the pot.',
    ],

    tips: [
      'Fold most starting hands. A pair, two high cards, or an ace with another card of its suit are worth playing.',
      'Act late when you can: the {=button} acts last after the flop and sees what others do first.',
      'Bet your strong hands for value; bluff rarely, and against few players.',
    ],

    walk(A) {
      const C = A.C, Z = 40, k = Z / 24;
      const cd = (x, y, r, s, z = Z) => A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(face(A, r, s), x - 4 * z / 24, y - z / 24, z);
      const bk = (x, y, z = 32) => A.use(back(A), x - 4 * z / 24, y - z / 24, z);
      const ch = (x, y) => A.use(chip(A), x - 8, y - 8, 16);
      let board = A.bg('#5a3a22') + A.path('M60 12 H260 A90 88 0 0 1 260 188 H60 A90 88 0 0 1 60 12 Z', { fill: '#2c7a52', sw: 4, stroke: '#3d2716' });
      board += A.tag(160, 14, 'Maya (big blind)') + A.tag(36, 64, 'Ben (SB)') + A.tag(284, 64, 'Jo') + A.tag(232, 180, 'You');
      board += A.use(button(A), 232, 140, 18);
      // board cards in the middle
      const B = i => [92 + i * 28, 72];
      const flop = A.k('f1', cd(...B(0), 'K', '♥')) + A.k('f2', cd(...B(1), '9', '♠')) + A.k('f3', cd(...B(2), '4', '♠'));
      const turn = A.k('f4', cd(...B(3), '2', '♠')), river = A.k('f5', cd(...B(4), '7', '♦'));
      const mine = A.k('yA', cd(134, 146, 'A', '♠')) + A.k('yK', cd(162, 146, 'K', '♠'));
      const maya = A.k('m1', bk(144, 26)) + A.k('m2', bk(166, 26));
      const ben = A.k('b1', bk(16, 76)) + A.k('b2', bk(32, 76));
      const jo = A.k('j1', bk(266, 76)) + A.k('j2', bk(282, 76));
      // chips: key per chip; spots in front of each player and in the pot
      const POT = i => [146 + (i % 5) * 7, 136 - Math.floor(i / 5) * 6];
      const chips = list => list.map(([key, x, y]) => A.k(key, ch(x, y))).join('');
      const pot = (keys) => chips(keys.map((key, i) => [key, ...POT(i)]));
      const pre = [['sb1', 70, 96], ['bb1', 196, 56], ['bb2', 204, 58]];
      return [
        { step: 0, say: 'Ben puts in the small blind (1), Maya the big blind (2). Everyone gets 2 face-down cards; yours are A{=spade} K{=spade}.',
          svg: board + ben + jo + maya + mine + chips(pre) + A.glow(162, 166, 34) },
        { step: 1, say: 'Jo folds. You **raise** to 6. Ben folds. Maya **calls**: 4 more.',
          svg: board + maya + mine + chips(pre.slice(1).concat([['y1', 210, 132], ['y2', 218, 134], ['y3', 226, 130], ['m3', 212, 60], ['m4', 220, 56]])) },
        { step: 2, say: 'Bets go to the pot. The **flop**: K{=heart} 9{=spade} 4{=spade}. You have a pair of kings and 4 spades.',
          svg: board + maya + mine + pot(['sb1', 'bb1', 'bb2', 'y1', 'y2', 'y3', 'm3', 'm4']) + flop + A.glow(134, 92, 46) },
        { step: 2, say: 'Maya **checks**. You **bet** 8; she **calls**.',
          svg: board + maya + mine + pot(['sb1', 'bb1', 'bb2', 'y1', 'y2', 'y3', 'm3', 'm4']) + flop + chips([['y4', 210, 132], ['y5', 218, 134], ['m5', 212, 60], ['m6', 220, 56]]) },
        { step: 3, say: 'The **turn** is 2{=spade}: five spades, a **flush**. Both check. The **river** is 7{=diamond}; both check again.',
          svg: board + maya + mine + pot(['sb1', 'bb1', 'bb2', 'y1', 'y2', 'y3', 'm3', 'm4', 'y4', 'y5', 'm5', 'm6']) + flop + turn + river + A.glow(190, 92, 18) },
        { step: 4, say: 'Showdown. Maya’s K{=diamond} Q{=diamond} make a pair of kings. Your best 5, A K 9 4 2 of spades, is a flush: the pot is yours.',
          svg: board + A.k('m1', cd(144, 24, 'K', '♦')) + A.k('m2', cd(168, 24, 'Q', '♦')) + mine + flop + turn + river +
            chips(['sb1', 'bb1', 'bb2', 'y1', 'y2', 'y3', 'm3', 'm4', 'y4', 'y5', 'm5', 'm6'].map((key, i) => [key, 214 + (i % 4) * 8, 160 - Math.floor(i / 4) * 6])) + A.glow(226, 152, 24) },
      ];
    },

    art(A) {
      const C = A.C;
      const cd = (x, y, r, s, z = 42, rot = 0) => {
        const g = A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(face(A, r, s), x - 4 * z / 24, y - z / 24, z);
        return rot ? A.group(g, `rotate(${rot} ${x + 8 * z / 24} ${y + 11 * z / 24})`) : g;
      };
      const bk = (x, y, z = 32, rot = 0) => A.group(A.use(back(A), x - 4 * z / 24, y - z / 24, z), `rotate(${rot} ${x + 8 * z / 24} ${y + 11 * z / 24})`);
      let o = A.bg('#5a3a22') + A.path('M60 12 H260 A90 88 0 0 1 260 188 H60 A90 88 0 0 1 60 12 Z', { fill: '#2c7a52', sw: 4, stroke: '#3d2716' });
      o += A.path('M70 26 H250 A74 74 0 0 1 250 174 H70 A74 74 0 0 1 70 26 Z', { sw: 1, stroke: '#7fbf98', dash: '3 4' });
      // community cards
      [['K', '♥'], ['9', '♠'], ['4', '♠'], ['2', '♠'], ['7', '♦']].forEach(([r, s], i) => { o += cd(86 + i * 31, 70, r, s); });
      // pot: chip stacks
      const stack = (x, y, n, col) => { let s = ''; for (let i = 0; i < n; i++) s += A.rect(x, y - i * 3.4, 18, 5, col, { rx: 2.5, sw: 1 }); return s; };
      o += stack(128, 140, 5, '#c8423b') + stack(148, 142, 3, '#2f6db5') + stack(168, 140, 6, '#2b2b2b');
      // hole cards
      o += cd(208, 136, 'A', '♠', 42, -8) + cd(228, 134, 'K', '♠', 42, 7);
      // opponents' hole cards
      o += bk(24, 84, 30, -80) + bk(24, 102, 30, -95) + bk(280, 84, 30, 80) + bk(280, 102, 30, 95) + bk(146, 22, 30, -6) + bk(162, 22, 30, 6);
      o += A.use(button(A), 186, 150, 18);
      o += A.note(242, 140, 268, 120, 'Your 2 hole cards');
      o += A.note(96, 74, 92, 54, 'Board: 5 shared cards');
      o += A.note(148, 132, 86, 176, 'Pot');
      o += A.note(195, 159, 190, 188, 'Dealer button');
      return o;
    },
  });
})();
