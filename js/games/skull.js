defineGame({
  id: 'skull',
  name: 'Skull',
  year: 2011,
  designer: 'Hervé Marly',
  family: 'hidden',
  players: [3, 6], best: '5–6',
  time: [15, 45],
  age: 10,
  mechanics: ['bluffing', 'auction', 'press-your-luck', 'player-elimination', 'deduction'],
  profile: { complexity: 1, luck: 2, interaction: 5, conflict: 3, talk: 4, planning: 1 },
  color: '#7a2a3a',

  // Discs seen from above. `tint` redraws a disc in a player's colour for the art and walkthrough.
  icons: (() => {
    const ring = '#8a6a5a';
    const rose = (A, c) => {
      let s = A.circle(12, 12, 10.5, c, { sw: 1.2 }) + A.circle(12, 12, 8, '#f2e6cc', { sw: 0 });
      for (let i = 0; i < 5; i++) { const a = i * 72 * Math.PI / 180; s += A.circle(+(12 + 3.4 * Math.cos(a)).toFixed(2), +(12 + 3.4 * Math.sin(a)).toFixed(2), 2.9, '#d9446a', { sw: 0.6 }); }
      return s + A.circle(12, 12, 2.1, '#e8c547', { sw: 0.6 });
    };
    const skull = (A, c) => A.circle(12, 12, 10.5, c, { sw: 1.2 }) + A.circle(12, 12, 8, '#1e1a18', { sw: 0 }) + A.circle(12, 10.8, 4.9, '#fff', { sw: 0 }) + A.rect(9.2, 13.6, 5.6, 4, '#fff', { sw: 0, rx: 0.8 }) +
      A.circle(10, 10.6, 1.5, '#1e1a18', { sw: 0 }) + A.circle(14, 10.6, 1.5, '#1e1a18', { sw: 0 }) + A.line(11, 14.6, 11, 17, { stroke: '#1e1a18', sw: 0.7 }) + A.line(13, 14.6, 13, 17, { stroke: '#1e1a18', sw: 0.7 });
    const disc = (A, c) => A.circle(12, 12, 10.5, c, { sw: 1.2 }) + A.circle(12, 12, 5.5, 'none', { stroke: '#fff', sw: 1, opacity: 0.6 });
    const mat = (fill) => A => `<ellipse cx="12" cy="13" rx="11" ry="7.5" fill="${fill}" stroke="#2a2420" stroke-width="1.3"/>`;
    return {
      rose: { name: 'rose', draw: A => rose(A, ring), tint: rose },
      skull: { name: 'skull', draw: A => skull(A, ring), tint: skull },
      disc: { name: 'face-down disc', draw: A => disc(A, ring), tint: disc },
      mat: { name: 'mat', draw: mat('#7a5a4a') },
      'mat-won': { name: 'rose side', draw: A => mat('#f2e6cc')(A) + A.circle(5, 13, 1.8, '#d9668f', { sw: 0.6 }) + A.circle(19, 13, 1.8, '#d9668f', { sw: 0.6 }) + A.circle(12, 13, 2.2, '#d9446a', { sw: 0.6 }) },
    };
  })(),

  pitch: 'Place rose or skull discs face down, then bid how many roses you can flip; win 2 bids or be the last with discs.',

  goal: { big: 'Win 2 challenges', text: 'Win **two challenges** (as the highest bidder, flip as many discs as you bid without revealing a skull), or be the last player with discs.' },

  turn: {
    type: 'round',
    intro: 'Each round goes through these phases:',
    outro: 'Discs return to hands; the challenger starts the next round',
    steps: [
      { verb: 'Place', text: 'All at the same time, each player places **one disc** from their hand face down on their own mat.' },
      { verb: 'Add or bid', text: 'Clockwise from the round’s first player, each player either adds 1 disc from hand on top of their stack, or starts the bidding by naming how many discs they will flip. A player with no discs in hand **must** bid.' },
      { verb: 'Raise/pass', text: 'Once bidding starts, no more discs are added. Clockwise, each player must bid **higher** or pass; a player who passes can’t bid again this round. No bid may exceed the total discs on all mats. Bidding ends when everyone else has passed, or when someone bids that total.' },
      { verb: 'Flip', text: 'The highest bidder (the challenger) flips that many discs one at a time: **every disc in their own stack first**, then discs from the top of any other stacks (several from one stack is fine, top down), in any order they choose. Flipping a skull ends the challenge at once.' },
    ],
  },

  tension: 'Placing your skull lets you sink a bidder, but bidding past your own roses means trusting everyone else’s stacks.',

  structure: [
    { label: 'Setup', text: 'Each player takes a {=mat} and 4 discs in its colour: 3 {=rose} and 1 {=skull}.' },
    { label: 'Rounds', repeat: 'until someone wins', text: 'Place, add or bid, raise or pass, then the highest bidder flips. All discs return to their owners’ hands.' },
    { label: 'Game end', text: 'A second successful challenge wins; so does being the last player with discs.' },
  ],

  end: {
    trigger: 'a player wins their second challenge, or only one player still has discs',
    detail: 'Your first success flips your mat to its rose side; the second wins.',
    results: [
      { side: 'Winner', text: 'the first player to win 2 challenges, or the last player with any discs.' },
    ],
  },

  ref: {
    title: 'Challenge results',
    rows: [
      ['All {=rose}', 'success: flip your mat to {=mat-won}; a second success wins'],
      ['Another player’s {=skull}', 'its owner takes 1 of your discs at random and discards it unseen'],
      ['Your own {=skull}', 'you discard 1 disc of your choice, unseen'],
      ['Next round', 'the challenger starts. If the challenger was just eliminated, the skull’s owner starts; if it was the challenger’s own skull, the challenger chooses who starts'],
      ['No discs left', 'you are out of the game'],
    ],
  },

  example: 'Five discs are down. Ana bids **3**; Ben raises to 4; Cy and Ana pass. Ben flips his own 2 discs ({=rose}{=rose}), then Cy’s top disc: {=rose}. For his 4th disc he flips Ana’s top disc: {=skull}. Ana takes one of Ben’s 4 discs at random and discards it face down, so nobody else knows if it was his skull.',

  setup: [
    'Give each player a {mat} and **4 discs** in its colour: 3 {rose}s and 1 {skull}.',
    'Each player puts their mat plain side up in front of them.',
    'Pick a first player for round 1. Each player keeps their discs hidden in hand.',
  ],

  terms: [
    ['{=mat} Mat', 'Your coaster. Flips to the rose side ({=mat-won}) after your first success.'],
    ['{=disc} Stack', 'The face-down discs on your mat this round, one on top of another.'],
    ['Challenge', 'The highest bidder (the challenger) must flip as many discs as they bid without revealing a {=skull}.'],
  ],

  gotchas: [
    'The bidder flips **all of their own** discs first, so their own skull always sinks them.',
    'A disc lost to another player’s skull is taken **at random** and stays hidden, so nobody else knows if you still have your skull.',
    'From other stacks, flip only the current **top** disc, one at a time; you choose which stacks.',
  ],

  tips: [
    'Place roses, then bid no more than your own stack: the safest bid.',
    'Adding extra discs makes your stack look dangerous even when it holds only roses.',
    'A suspiciously high raise may protect the raiser’s own skull.',
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
    const inHand = (p, i) => A.k(p + i, A.use(this.icons.disc.tint(A, col(p)), P[p][0] - 27 + i * 18 - 8.6, 67.4, 17.2));
    const onMat = (p, i, h) => A.k(p + i, `<ellipse cx="${P[p][0]}" cy="${127 - h * 8 + 3}" rx="22" ry="8" fill="#1e1a18" stroke="${C.ink}" stroke-width="1"/><ellipse cx="${P[p][0]}" cy="${127 - h * 8}" rx="22" ry="8" fill="${col(p)}" stroke="${C.ink}" stroke-width="1"/>`);
    // Flipped discs are the inline icons, tinted to the owner's colour.
    const I = this.icons, D = 29.7;
    const rose = (k, x, y, c) => A.k(k, A.use(I.rose.tint(A, c), x - D / 2, y - D / 2, D));
    const skull = (k, x, y, c) => A.k(k, A.use(I.skull.tint(A, c), x - D / 2, y - D / 2, D));
    const say = (p, str) => A.k('b-' + p, A.bubble(P[p][0] + 8, 2, str.length * 5.5 + 14, 18, str, { size: 8.5 }));
    // Who has what on their mat.
    const hands = (n) => ['ana', 'cy', 'ben'].map(p => { let s = ''; for (let i = n[p]; i < 4; i++) s += inHand(p, i); return s; }).join('');
    const placed1 = onMat('ana', 0, 0) + onMat('cy', 0, 0) + onMat('ben', 0, 0);
    const five = placed1 + onMat('cy', 1, 1) + onMat('ben', 1, 1);
    const h1 = hands({ ana: 1, cy: 1, ben: 1 }), h2 = hands({ ana: 1, cy: 2, ben: 2 });
    const benFlips = rose('ben0', 238, 172, col('ben')) + rose('ben1', 282, 172, col('ben'));
    const cyFlip = rose('cy1', 160, 172, col('cy'));
    return [
      { step: 0, say: 'Each player holds 3 {=rose} and 1 {=skull}. All at once, each places **one disc** face down. Ana’s is her skull.', svg: board + h1 + placed1 },
      { step: 1, say: 'In turn, Ben and Cy each **add** a disc to their stack. Five discs are down.', svg: board + h2 + five },
      { step: 1, say: 'Ana **bids 3**: a bluff, since she would flip her own skull first.', svg: board + h2 + five + say('ana', 'Bid 3') },
      { step: 2, say: 'Ben **raises to 4**. Cy and Ana pass. Ben must flip 4 roses.', svg: board + h2 + five + say('ana', 'Pass') + say('cy', 'Pass') + say('ben', '4!') + A.glow(260, 36, 18, 'g-ben') },
      { step: 3, say: 'He flips **all his own discs first**: {=rose}{=rose}. Then Cy’s top disc: {=rose}. That’s 3.', svg: board + h2 + onMat('ana', 0, 0) + onMat('cy', 0, 0) + benFlips + cyFlip },
      { step: 3, say: 'He flips Ana’s top disc: {=skull}. The challenge **fails**.', svg: board + h2 + onMat('cy', 0, 0) + benFlips + cyFlip + skull('ana0', 60, 172, col('ana')) + A.glow(60, 172, 18, 'g-skull') },
      { step: 3, say: 'Discs return to hands. Ana takes one of Ben’s 4 discs **at random** and discards it unseen. Ben starts the next round.', svg: board + hands({ ana: 0, cy: 0, ben: 0 }).replace(/<g data-k="ben3">.*?<\/g>/, '') +
        A.k('ben3', A.use(this.icons.disc.tint(A, col('ben')), 281.4, 167.4, 17.2)) + A.text(290, 160, 'discarded', { size: 7, fill: '#e8d5c0' }) + A.glow(290, 176, 12, 'g-gone') + say('ben', '3 left') },
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
    const I = this.icons, D = 29.7;
    const rose = (x, y, col) => A.use(I.rose.tint(A, col), x - D / 2, y - D / 2, D);
    const skull = (x, y, col) => A.use(I.skull.tint(A, col), x - D / 2, y - D / 2, D);
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
    o += A.note(106, 122, 52, 150, 'Rose: safe');
    return o;
  },
});
