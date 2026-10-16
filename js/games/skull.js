defineGame({
  id: 'skull',
  name: 'Skull',
  year: 2011,
  designer: 'Hervé Marly',
  family: 'hidden',
  players: [3, 6], best: '4–6',
  time: [15, 45],
  age: 10,
  mechanics: ['bluffing', 'auction', 'press-your-luck', 'player-elimination', 'deduction'],
  profile: { complexity: 1, luck: 2, interaction: 5, conflict: 3, talk: 4, planning: 1 },
  color: '#7a2a3a',

  pitch: 'Hide a skull among roses, then bid on how many flowers you can flip without hitting one. Pure nerve with four discs.',
  theme: 'You are a biker-gang member daring your rivals to call your bluff, one skull at a time.',

  goal: { big: 'Win 2 challenges', text: 'Win **two challenges** (flip as many roses as you bid), or be the last player with discs left.' },

  turn: {
    type: 'round',
    intro: 'Each round goes through these phases:',
    outro: 'Then a new round; the skull’s owner starts it',
    steps: [
      { verb: 'Place', text: 'Everyone puts **one disc** face down on their mat at the same time.' },
      { verb: 'Add or bid', text: 'In turn, either add another disc to your own stack or open the bidding with a number.' },
      { verb: 'Raise/pass', text: 'Once a bid is made, each player must **raise** it or pass out of the round. Bids can’t exceed the discs on the table.' },
      { verb: 'Flip', text: 'The top bidder flips that many discs, **all of their own first**, then the top discs of anyone else’s stacks.' },
    ],
  },

  tension: 'Putting your skull down lets you sabotage a bidder, but a bid you can’t back with your own roses forces you to trust everyone else’s.',

  flow: [
    { label: 'Hide', items: ['Rose or skull?', 'Add more discs', 'Read the others'] },
    { label: 'Bid', items: ['Open low', 'Raise or pass', 'Highest bidder flips'] },
    { label: 'Reveal', items: ['All roses: flip your mat', 'Skull: lose a disc at random'] },
  ],

  end: {
    trigger: 'a player wins their second challenge, or only one player still has discs',
    detail: 'The first success flips your mat to its rose side; the second wins outright.',
    results: [
      { side: 'Winner', text: 'the first player to win 2 challenges, or the last player with any discs.' },
      { side: 'Out', text: 'a player who has lost all 4 discs.' },
    ],
  },

  ref: {
    title: 'Challenge results',
    rows: [
      ['All roses', 'success: flip your mat (2nd success wins)'],
      ['Hit someone else’s skull', 'its owner takes 1 of your discs at random, unseen'],
      ['Hit your own skull', 'you discard 1 disc of your choice'],
      ['Next round', 'skull owner starts; if it was yours, you pick who starts'],
      ['Lost all 4 discs', 'you are out of the game'],
    ],
  },

  example: 'Five discs are down. Ana bids **3**; Ben raises to 4, Cy passes, Ana passes. Ben flips his own 2 discs (roses), then Cy’s top disc: rose. He needs one more and flips Ana’s top disc: **skull**. Ana removes one of Ben’s 4 discs at random and discards it face down, so only Ben knows if he lost his skull.',

  setup: [
    'Give each player a mat and **4 discs**: 3 roses and 1 skull, matching the mat.',
    'Mats start plain side up.',
    'Pick a first player; everyone holds their discs hidden in hand.',
  ],

  terms: [
    ['Mat', 'Your coaster. Flipped to the rose side after your first success.'],
    ['Stack', 'The face-down discs you have played this round.'],
    ['Challenge', 'Your bid: the number of roses you claim you can flip.'],
    ['Disc', 'One of your 4 pieces: a rose (safe) or the skull.'],
  ],

  gotchas: [
    'The bidder must flip **all of their own** discs first, so your own skull always sinks you.',
    'Lost discs are taken **at random** and kept hidden, so nobody else knows if you still have your skull.',
    'You can only flip the **top** disc of another stack, one at a time; you choose which stacks to flip from.',
  ],

  tips: [
    'Play a rose, then bid on your own stack: it’s the safest bid in the game.',
    'Stacking extra discs makes your mat look dangerous even when it holds only roses.',
    'When someone raises suspiciously high, ask yourself if they’re protecting their own skull.',
  ],

  walk(A) {
    const C = A.C;
    const P = { ana: [60, '#c8423b', 'Ana'], cy: [160, '#3c8d4f', 'Cy'], ben: [260, '#2f6db5', 'Ben'] };
    let board = A.bg('#2b2421') + A.rect(6, 92, 308, 104, '#5b3a28', { rx: 14, sw: 1.4 });
    for (const [x, col, n] of Object.values(P)) {
      board += A.person(x, 36, 26, '#8a7a6a', { face: '#d9b48f' }) + A.text(x, 57, n, { size: 8.5, weight: 700, fill: C.white });
      board += `<ellipse cx="${x}" cy="130" rx="44" ry="20" fill="${col}" stroke="${C.ink}" stroke-width="1.3"/>`;
    }
    const col = (p) => P[p][1];
    const inHand = (p, i) => A.k(p + i, A.circle(P[p][0] - 27 + i * 18, 76, 7.5, col(p), { sw: 1.1 }));
    const onMat = (p, i, h) => A.k(p + i, `<ellipse cx="${P[p][0]}" cy="${127 - h * 8 + 3}" rx="22" ry="8" fill="#1e1a18" stroke="${C.ink}" stroke-width="1"/><ellipse cx="${P[p][0]}" cy="${127 - h * 8}" rx="22" ry="8" fill="${col(p)}" stroke="${C.ink}" stroke-width="1"/>`);
    const rose = (k, x, y, c) => {
      let s = A.circle(x, y, 13, c, { sw: 1.2 }) + A.circle(x, y, 10, C.cream, { sw: 0 });
      for (let i = 0; i < 5; i++) { const a = i * 72 * Math.PI / 180; s += A.circle(+(x + 4.2 * Math.cos(a)).toFixed(1), +(y + 4.2 * Math.sin(a)).toFixed(1), 3.6, '#d9446a', { sw: 0.7 }); }
      return A.k(k, s + A.circle(x, y, 2.6, '#e8c547', { sw: 0.7 }));
    };
    const skull = (k, x, y, c) => A.k(k, A.circle(x, y, 13, c, { sw: 1.2 }) + A.circle(x, y, 10, '#1e1a18', { sw: 0 }) + A.circle(x, y - 1.5, 6, C.white, { sw: 0 }) + A.rect(x - 3.5, y + 2, 7, 5, C.white, { sw: 0, rx: 1 }) +
      A.circle(x - 2.4, y - 1.8, 1.8, '#1e1a18', { sw: 0 }) + A.circle(x + 2.4, y - 1.8, 1.8, '#1e1a18', { sw: 0 }));
    const say = (p, str) => A.k('b-' + p, A.bubble(P[p][0] + 8, 2, str.length * 5.5 + 14, 18, str, { size: 8.5 }));
    // Who has what on their mat.
    const hands = (n) => ['ana', 'cy', 'ben'].map(p => { let s = ''; for (let i = n[p]; i < 4; i++) s += inHand(p, i); return s; }).join('');
    const placed1 = onMat('ana', 0, 0) + onMat('cy', 0, 0) + onMat('ben', 0, 0);
    const five = placed1 + onMat('cy', 1, 1) + onMat('ben', 1, 1);
    const h1 = hands({ ana: 1, cy: 1, ben: 1 }), h2 = hands({ ana: 1, cy: 2, ben: 2 });
    const benFlips = rose('ben0', 238, 172, col('ben')) + rose('ben1', 282, 172, col('ben'));
    const cyFlip = rose('cy1', 160, 172, col('cy'));
    return [
      { step: 0, say: 'Everyone holds 3 roses and 1 skull. All at once, each player puts **one disc** face down on their mat. Ana’s is her skull.', svg: board + h1 + placed1 },
      { step: 1, say: 'In turn, Ben and then Cy each **add** a disc to their own stack. Five discs are down.', svg: board + h2 + five },
      { step: 1, say: 'Ana **opens the bidding at 3**. A bluff: she’d have to flip her own skull first.', svg: board + h2 + five + say('ana', 'Bid 3') },
      { step: 2, say: 'Ben **raises to 4**. Cy passes, then Ana passes. Ben must flip 4 roses.', svg: board + h2 + five + say('ana', 'Pass') + say('cy', 'Pass') + say('ben', '4!') + A.glow(260, 36, 18, 'g-ben') },
      { step: 3, say: 'He flips **all his own discs first**: 2 roses. Then Cy’s top disc: a rose. That’s 3.', svg: board + h2 + onMat('ana', 0, 0) + onMat('cy', 0, 0) + benFlips + cyFlip },
      { step: 3, say: 'He needs one more and flips Ana’s top disc: **the skull**. The challenge fails.', svg: board + h2 + onMat('cy', 0, 0) + benFlips + cyFlip + skull('ana0', 60, 172, col('ana')) + A.glow(60, 172, 18, 'g-skull') },
      { step: 3, say: 'Discs go back to hands. Ana takes one of Ben’s 4 discs **at random** and discards it unseen; only Ben will know if it was his skull.', svg: board + hands({ ana: 0, cy: 0, ben: 0 }).replace(/<g data-k="ben3">.*?<\/g>/, '') +
        A.k('ben3', A.circle(290, 176, 7.5, col('ben'), { sw: 1.1 })) + A.text(290, 160, 'discarded', { size: 7, fill: '#e8d5c0' }) + A.glow(290, 176, 12, 'g-gone') + say('ben', '3 left') },
    ];
  },

  art(A) {
    const C = A.C;
    const cols = { ana: '#c8423b', ben: '#2f6db5', cy: '#3c8d4f', dee: '#e2b33c' };
    let o = A.bg('#2b2421');
    o += `<ellipse cx="160" cy="108" rx="156" ry="90" fill="#5b3a28" stroke="${C.ink}" stroke-width="1.5"/>`;
    o += `<ellipse cx="160" cy="108" rx="144" ry="80" fill="#6b4630"/>`;
    // A mat (coaster) with a face-down stack of n discs.
    const mat = (x, y, col, n, won) => {
      let s = `<ellipse cx="${x}" cy="${y + 4}" rx="30" ry="14" fill="${won ? '#f2e6cc' : col}" stroke="${C.ink}" stroke-width="1.3"/>`;
      if (won) s += A.circle(x - 18, y + 6, 3.2, C.pink, { sw: 0.8 }) + A.circle(x + 18, y + 6, 3.2, C.pink, { sw: 0.8 });
      for (let i = 0; i < n; i++) {
        const yy = y - i * 4;
        s += `<ellipse cx="${x}" cy="${yy + 2}" rx="15" ry="6" fill="#1e1a18" stroke="${C.ink}" stroke-width="1"/>`;
        s += `<ellipse cx="${x}" cy="${yy}" rx="15" ry="6" fill="${col}" stroke="${C.ink}" stroke-width="1"/>`;
        s += `<ellipse cx="${x}" cy="${yy}" rx="8" ry="3" fill="none" stroke="#fff" stroke-width="0.9" opacity="0.6"/>`;
      }
      return s;
    };
    // A face-up disc seen from above: rose or skull.
    const rose = (x, y, col) => {
      let s = A.circle(x, y, 13, col, { sw: 1.2 }) + A.circle(x, y, 10, C.cream, { sw: 0 });
      for (let i = 0; i < 5; i++) { const a = i * 72 * Math.PI / 180; s += A.circle(+(x + 4.2 * Math.cos(a)).toFixed(1), +(y + 4.2 * Math.sin(a)).toFixed(1), 3.6, '#d9446a', { sw: 0.7 }); }
      return s + A.circle(x, y, 2.6, '#e8c547', { sw: 0.7 });
    };
    const skull = (x, y, col) => {
      let s = A.circle(x, y, 13, col, { sw: 1.2 }) + A.circle(x, y, 10, '#1e1a18', { sw: 0 });
      s += A.circle(x, y - 1.5, 6, C.white, { sw: 0 }) + A.rect(x - 3.5, y + 2, 7, 5, C.white, { sw: 0, rx: 1 });
      s += A.circle(x - 2.4, y - 1.8, 1.8, '#1e1a18', { sw: 0 }) + A.circle(x + 2.4, y - 1.8, 1.8, '#1e1a18', { sw: 0 });
      s += A.line(x - 1.2, y + 3.5, x - 1.2, y + 6.5, { stroke: '#1e1a18', sw: 0.8 }) + A.line(x + 1.2, y + 3.5, x + 1.2, y + 6.5, { stroke: '#1e1a18', sw: 0.8 });
      return s;
    };
    // Players around the table.
    o += A.person(26, 92, 28, '#6b7aa6', { face: '#d9b48f' });
    o += A.person(160, 24, 26, '#5f8f8a', { face: '#d9b48f' });
    o += A.person(294, 92, 28, '#a6846b', { face: '#d9b48f' });
    o += A.person(160, 186, 30, '#8a6aa6', { face: '#d9b48f' });
    // Mats.
    o += mat(76, 100, cols.cy, 1, false);         // left: one disc left on stack
    o += mat(160, 62, cols.dee, 2, true);         // top: already won once
    o += mat(244, 100, cols.ana, 0, false);       // right: top disc flipped -> skull
    o += mat(160, 150, cols.ben, 0, false);       // bidder: own stack flipped
    // Bidder's own flipped roses.
    o += rose(138, 146, cols.ben) + rose(182, 146, cols.ben);
    // Left stack top disc flipped: rose.
    o += rose(106, 122, cols.cy);
    // Right: the skull!
    o += skull(244, 96, cols.ana);
    o += A.curve(196, 140, 230, 128, 236, 112, { stroke: '#f2c14e', sw: 1.8, head: 6 });
    // Talk.
    o += A.bubble(6, 6, 96, 22, 'I can flip 4!', { size: 9.5 });
    o += A.note(182, 146, 248, 176, 'Own discs flip first');
    o += A.note(250, 92, 274, 40, 'Skull: bid fails');
    o += A.note(144, 64, 66, 48, 'Mat flipped = 1 win');
    o += A.note(106, 122, 52, 150, 'Rose = safe');
    return o;
  },
});
