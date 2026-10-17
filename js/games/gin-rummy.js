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
  const back = A => A.rect(4, 1, 16, 22, '#3a6a8c', { rx: 2.2, sw: 0.8 }) + A.rect(6, 3, 12, 18, 'none', { rx: 1.4, sw: 0.6, stroke: '#bcd6ea' });

  defineGame({
    id: 'gin-rummy',
    name: 'Gin Rummy',
    year: 'c. 1909',
    designer: 'Elwood T. Baker & C. Graham Baker',
    family: 'deck',
    players: [2, 2],
    time: [30, 60],
    age: 8,
    mechanics: ['melding', 'hand-management', 'set-collection'],
    profile: { complexity: 2, luck: 3, interaction: 2, conflict: 2, talk: 1, planning: 3 },

    icons: {
      ca: { name: 'ace', draw: A => rank(A, 'A') },
      c2: { name: '2', draw: A => rank(A, '2') },
      c10: { name: '10', draw: A => rank(A, '10') },
      cj: { name: 'jack', draw: A => rank(A, 'J') },
      cq: { name: 'queen', draw: A => rank(A, 'Q') },
      ck: { name: 'king', draw: A => rank(A, 'K') },
      stock: { name: 'stock', draw: back },
    },

    pitch: 'Draw and discard to form sets and runs, then knock when your leftover cards total 10 or less. First to 100 wins.',

    goal: { big: '100 points', text: '2 players. Group your cards into **melds**: sets (3–4 cards of one rank) and runs (3+ cards in a row in one suit). Cards not in a meld are **deadwood** and count their points against you. When a deal ends, the player with less deadwood scores. First to 100 points wins.' },

    turn: {
      type: 'sequence',
      steps: [
        { verb: 'Draw', text: 'Take 1 card: the top card of the face-down {stock} or the top card of the face-up **discard pile**.' },
        { verb: 'Discard', text: 'Put 1 card from your hand face up on the discard pile. Your turn ends.' },
        { verb: 'Knock', text: 'Optional, instead of a normal discard: if your deadwood after discarding totals **10 or less**, you may **knock**: discard face down, then lay your hand face up, split into melds and deadwood. The deal ends and is scored (see How the game flows).' },
      ],
    },

    tension: 'Knock early with a few points of deadwood, or wait for gin (0 deadwood) and risk your opponent knocking first or undercutting you.',

    structure: [
      { label: 'Deal', text: 'The dealer deals 10 cards each; the next card goes face up to start the discard pile.' },
      { label: 'Turns', repeat: 'until a knock', text: 'Players alternate turns, starting with the non-dealer: draw 1, discard 1.' },
      { label: 'Showdown', text: 'The knocker lays out melds and deadwood. The other player (the **defender**) lays out their melds, then may **lay off**: add deadwood cards to the knocker’s melds (e.g. 7{=heart} onto 4{=heart} 5{=heart} 6{=heart}) so they stop counting. Score the deal.' },
      { label: 'Next deal', repeat: 'until 100 points', text: 'The winner of the deal deals next.' },
      { label: 'Game end', text: 'The first player to reach 100 points wins. Add the bonuses (see Scoring); the winning margin is the difference between the two totals.' },
    ],

    end: {
      trigger: 'a player reaches 100 points',
      detail: 'The winner adds a 100 game bonus; line and shutout bonuses are optional. Some older rules use gin 20, undercut 10, line 20.',
    },
    scoring: [
      { label: 'Knock: deadwood difference', share: 5 },
      { label: 'Gin bonus (25)', share: 2 },
      { label: 'Undercut bonus (25)', share: 1 },
    ],

    points: [
      ['Knock', 'Knocker with less deadwood scores the defender’s deadwood (after lay-offs) minus the knocker’s'],
      ['Gin', 'Knock with 0 deadwood: score 25 + the opponent’s deadwood. The opponent may not lay off, and gin can’t be undercut'],
      ['Undercut', 'If the defender’s deadwood (after lay-offs) is less than or equal to the knocker’s, the defender scores 25 + the difference'],
      ['Game bonus', 'First player to 100: +100'],
      ['Line bonus (optional)', 'At game end, each player scores +25 for each deal they won'],
      ['Shutout (optional)', 'If the loser won no deals, the winner’s points from deals are doubled'],
    ],

    ref: {
      title: 'Melds & deadwood',
      rows: [
        ['Set', '9{=club} 9{=diamond} 9{=spade}'],
        ['Run', '4{=heart} 5{=heart} 6{=heart} 7{=heart}'],
        ['Not a run', 'Q{=spade} K{=spade} A{=spade} (ace is always low: A 2 3 is a run)'],
        ['{=ca} Ace', '1 point'],
        ['{=c2} … {=c10}', 'face value'],
        ['{=cj} {=cq} {=ck}', '10 points each'],
      ],
    },

    example: 'Maya discards Q{=spade}. You take it to complete three queens, discard K{=spade} face down and knock with 3 deadwood (the 3{=club}). Maya lays off her 7{=heart} on your heart run and has 15 left: you score 15 − 3 = **12**.',

    setup: [
      'Each player takes a random card from the deck; the lower card deals first. Keep score on paper.',
      'Deal 10 cards each. Turn the next card face up as the discard pile; the rest is the {stock}.',
      'First turn only: the non-dealer may take the face-up card (then discards). If they decline, the dealer may take it. If both decline, the non-dealer takes the top {=stock} card and play continues normally.',
    ],

    terms: [
      ['Meld', 'A set (3–4 cards of one rank) or a run (3+ consecutive cards of one suit).'],
      ['Deadwood', 'Cards not in a meld. Their points count against you.'],
      ['Knock', 'End the deal by discarding face down with 10 or less deadwood left.'],
      ['Gin', 'Knocking with 0 deadwood.'],
      ['Defender', 'The player who did not knock.'],
      ['Lay off', 'After a knock, the defender adds deadwood cards to the knocker’s melds.'],
    ],

    gotchas: [
      'You may not discard the card you just took from the discard pile.',
      'Only the defender lays off, and never on a gin hand.',
      'If only 2 cards remain in the {=stock} and the player who just drew discards without knocking, the deal is void: nobody scores and the same dealer deals again.',
    ],

    tips: [
      'Discard high cards early: a stray {=ck} costs 10, a stray 2 costs 2.',
      'Note what your opponent takes from the discard pile, and don’t discard cards that fit those melds.',
      'Knock as soon as you can early in a deal; wait for gin only when your deadwood is already near 0.',
    ],

    walk(A) {
      const C = A.C, Z = 40;
      const cd = (x, y, r, s, z = Z) => A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(face(A, r, s), x - 4 * z / 24, y - z / 24, z);
      const bk = (x, y, z = Z) => A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(back(A), x - 4 * z / 24, y - z / 24, z);
      const D = { h4: ['4', '♥'], h5: ['5', '♥'], h6: ['6', '♥'], c9: ['9', '♣'], d9: ['9', '♦'], s9: ['9', '♠'], cQ: ['Q', '♣'], dQ: ['Q', '♦'], sQ: ['Q', '♠'], sK: ['K', '♠'], c3: ['3', '♣'],
        s6: ['6', '♠'], s7: ['7', '♠'], s8: ['8', '♠'], hJ: ['J', '♥'], cJ: ['J', '♣'], dJ: ['J', '♦'], h7: ['7', '♥'], d2: ['2', '♦'], d3: ['3', '♦'], c10: ['10', '♣'] };
      // Lay out groups of card ids in a row; gap between groups.
      const row = (groups, y, x0, step, gap, z = Z) => { let x = x0, o = ''; groups.forEach(g => { g.forEach(id => { o += A.k(id, cd(x, y, ...D[id], z)); x += step; }); x += gap; }); return o; };
      let board = A.bg('#6b4a2e') + A.rect(5, 5, 310, 190, '#3f7d5a', { rx: 14, sw: 0 });
      board += A.tag(34, 26, 'Maya') + A.tag(34, 134, 'You');
      const stock = bk(14, 76) + bk(16, 74);
      const mayaBacks = n => { let o = ''; for (let i = 0; i < n; i++) o += A.k('mb' + i, bk(70 + i * 14, 8, 32)); return o; };
      const DX = [52, 74];
      const before = [['h4', 'h5', 'h6'], ['c9', 'd9', 's9'], ['cQ', 'dQ'], ['sK', 'c3']];
      const after = [['h4', 'h5', 'h6'], ['c9', 'd9', 's9'], ['cQ', 'dQ', 'sQ'], ['sK', 'c3']];
      const score = (t1, t2) => A.k('score', A.rect(228, 150, 82, 40, '#fbf6ec', { rx: 4, sw: 1.2 }) + A.text(269, 162, t1, { size: 9, weight: 700 }) + A.text(269, 178, t2, { size: 13, weight: 800, fill: RED }));
      const mine = row([['h4', 'h5', 'h6']], 112, 70, 18, 0, 34) + row([['c9', 'd9', 's9'], ['cQ', 'dQ', 'sQ'], ['c3']], 112, 154, 18, 8, 34);
      const mayaMelds = row([['s6', 's7', 's8'], ['hJ', 'cJ', 'dJ'], ['d2', 'd3', 'c10']], 14, 70, 18, 8, 34);
      return [
        { step: 0, say: 'Maya discards Q{=spade}. You hold a run, three 9s, and deadwood Q Q K 3 = **33**.',
          svg: board + stock + mayaBacks(10) + A.k('sQ', cd(...DX, 'Q', '♠')) + row(before, 150, 14, 21, 8) + A.glow(65, 94, 28) },
        { step: 0, say: 'Take the Q{=spade} from the discard pile: **three queens**. Deadwood is now K + 3 = 13.',
          svg: board + stock + mayaBacks(10) + row(after, 150, 14, 21, 8) + A.glow(190, 170, 36) },
        { step: 1, say: 'Discard the K{=spade}, face down because you will knock. Only the 3{=club} is deadwood: **3**.',
          svg: board + stock + mayaBacks(10) + A.k('sK', bk(...DX)) + row(after.slice(0, 3).concat([['c3']]), 150, 14, 21, 8) + A.glow(65, 94, 28) },
        { step: 2, say: '**Knock**: 3 is 10 or less. Lay out your melds; Maya lays out hers.',
          svg: board + stock + A.k('sK', bk(...DX)) + mayaMelds + A.k('h7', cd(248, 14, '7', '♥', 34)) + mine + A.glow(240, 32, 36, 'g-dw') },
        { step: 2, say: 'Maya **lays off** her 7{=heart} on your heart run. Her deadwood: 2 + 3 + 10 = **15**.',
          svg: board + stock + A.k('sK', bk(...DX)) + mayaMelds + A.k('h7', cd(124, 112, '7', '♥', 34)) + mine + A.glow(136, 134, 22) },
        { step: 2, say: 'You score the difference: 15 − 3 = **12** points.',
          svg: board + stock + A.k('sK', bk(...DX)) + mayaMelds + A.k('h7', cd(124, 112, '7', '♥', 34)) + mine + score('You score', '+12') },
      ];
    },

    art(A) {
      const C = A.C;
      const cd = (x, y, r, s, z = 38, rot = 0) => {
        const g = A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(face(A, r, s), x - 4 * z / 24, y - z / 24, z);
        return rot ? A.group(g, `rotate(${rot} ${x + 8 * z / 24} ${y + 11 * z / 24})`) : g;
      };
      const bk = (x, y, z = 38) => A.rect(x + 1.5, y + 2, 16 * z / 24, 22 * z / 24, C.shadow, { sw: 0, rx: 3 }) + A.use(back(A), x - 4 * z / 24, y - z / 24, z);
      let o = A.bg('#6b4a2e') + A.rect(5, 5, 310, 190, '#3f7d5a', { rx: 14, sw: 0 });
      // opponent's hand
      for (let i = 0; i < 10; i++) o += bk(92 + i * 12, 10, 30);
      // stock & discard
      o += bk(20, 76) + bk(22, 74) + cd(58, 76, '8', '♦', 38, 6);
      // your hand: run, set, deadwood
      const hand = [['5', '♣'], ['6', '♣'], ['7', '♣'], ['8', '♣'], null, ['J', '♥'], ['J', '♠'], ['J', '♦'], null, ['K', '♦'], ['4', '♠'], ['A', '♥']];
      let x = 62;
      hand.forEach(c => { if (!c) { x += 10; return; } o += cd(x, 140, c[0], c[1]); x += 19; });
      // score pad
      o += A.group(A.rect(230, 62, 72, 56, '#fbf6ec', { rx: 2, sw: 1 }) + A.line(230, 74, 302, 74, { sw: 0.7 }) + A.line(266, 62, 266, 118, { sw: 0.7 }) +
        A.text(248, 68, 'You', { size: 7, weight: 800 }) + A.text(284, 68, 'Maya', { size: 7, weight: 800 }) +
        ['12', '37', '62'].map((v, i) => A.text(248, 82 + i * 11, v, { size: 7, fill: '#555' })).join('') + ['25', '41'].map((v, i) => A.text(284, 82 + i * 11, v, { size: 7, fill: '#555' })).join(''), 'rotate(4 266 90)');
      o += A.note(96, 150, 70, 124, 'Run: one suit, in order');
      o += A.note(170, 150, 172, 118, 'Set: same rank');
      o += A.note(258, 160, 268, 188, 'Deadwood: 10+4+1 = 15');
      o += A.note(34, 88, 64, 58, 'Stock · discard');
      return o;
    },
  });
})();
