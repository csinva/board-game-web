defineGame({
  id: 'coup',
  name: 'Coup',
  year: 2012,
  designer: 'Rikki Tahta',
  family: 'hidden',
  players: [2, 6], best: '5',
  time: [15, 15],
  age: 13,
  mechanics: ['bluffing', 'hidden-roles', 'take-that', 'player-elimination', 'variable-powers', 'deduction'],
  profile: { complexity: 2, luck: 2, interaction: 5, conflict: 5, talk: 4, planning: 2 },
  color: '#8a2f2f',

  // Character cards: card colour + one symbol; the same drawings are dealt in the art and walkthrough.
  icons: {
    duke: { name: 'Duke', draw: A => A.rect(4, 1, 16, 22, '#7d55b5', { rx: 2.5, sw: 1.3 }) + A.crown(12, 16, 12, '#e2b33c') },
    assassin: { name: 'Assassin', draw: A => A.rect(4, 1, 16, 22, '#3b3b3b', { rx: 2.5, sw: 1.3 }) + A.poly([[12, 3.5], [14, 13], [10, 13]], '#e6e8ec', { sw: 0.8 }) + A.line(8.5, 13.5, 15.5, 13.5, { stroke: '#e2b33c', sw: 1.8 }) + A.line(12, 14, 12, 19.5, { stroke: '#b07a3a', sw: 2 }) },
    captain: { name: 'Captain', draw: A => A.rect(4, 1, 16, 22, '#2f6db5', { rx: 2.5, sw: 1.3 }) + A.circle(12, 5.5, 1.8, 'none', { stroke: '#fff', sw: 1.4 }) + A.line(12, 7.3, 12, 18.5, { stroke: '#fff', sw: 1.6 }) + A.line(9, 10, 15, 10, { stroke: '#fff', sw: 1.6 }) + A.path('M7.2 14 q0 4.6 4.8 4.6 q4.8 0 4.8 -4.6', { stroke: '#fff', sw: 1.6 }) },
    ambassador: { name: 'Ambassador', draw: A => A.rect(4, 1, 16, 22, '#3c8d4f', { rx: 2.5, sw: 1.3 }) + A.rect(7.5, 5, 9, 14, '#f2e6cc', { rx: 1.2, sw: 1 }) + A.line(9.5, 9, 14.5, 9, { stroke: '#8a5a33', sw: 1 }) + A.line(9.5, 12, 14.5, 12, { stroke: '#8a5a33', sw: 1 }) + A.line(9.5, 15, 13, 15, { stroke: '#8a5a33', sw: 1 }) },
    contessa: { name: 'Contessa', draw: A => A.rect(4, 1, 16, 22, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.path('M12 18 L6 9.5 A7.4 7.4 0 0 1 18 9.5 Z', { fill: '#e2b33c', sw: 1 }) + A.line(12, 18, 9, 7, { stroke: '#a07a1f', sw: 0.8 }) + A.line(12, 18, 12, 5.8, { stroke: '#a07a1f', sw: 0.8 }) + A.line(12, 18, 15, 7, { stroke: '#a07a1f', sw: 0.8 }) },
    influence: { name: 'influence', draw: A => A.rect(4, 1, 16, 22, '#5a2a2a', { rx: 2.5, sw: 1.3 }) + A.rect(7.5, 4.5, 9, 15, 'none', { stroke: '#e2b33c', sw: 1.1, rx: 1.5 }) },
  },

  pitch: 'Claim any character to use its power, bluffing or not; call out lies, and be the last player with cards left.',

  goal: { big: 'Last one standing', text: 'Be the **last player** with any influence (face-down cards) left.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, take exactly one action:',
    steps: [
      { verb: 'Act', text: 'Take Income, Foreign Aid or Coup, or **claim** any character and use its action, whatever you hold.' },
      { verb: 'Challenge', text: 'Anyone may challenge a claim. A caught liar **loses an influence** and the action fails (coins refunded); otherwise the challenger loses one.' },
      { verb: 'Block', text: 'Anyone may block Foreign Aid; only the target may block stealing or assassination. A block is a claim too, so it can be challenged.' },
      { verb: 'Resolve', text: 'If the action stands, it happens: take {=coin}, steal, swap cards, or a player loses an influence.' },
    ],
  },

  tension: 'The truth is safe but slow; bluffing a strong character gets you ahead, but one lost challenge costs half your life.',

  structure: [
    { label: 'Setup', text: 'Each player gets 2 face-down {=influence} and 2 {=coin}.' },
    { label: 'Turns', repeat: 'clockwise', text: 'One action per turn; others may challenge or block. Save {=coin} for a 7-coin Coup.' },
    { label: 'Elimination', text: 'Each lost influence flips face up; both up and you are out. Last player with a face-down card wins.' },
  ],

  end: {
    trigger: 'Only one player has influence left',
    detail: 'Losing an influence means turning one of your cards face up (your choice). Both face up: you are out.',
    results: [{ side: 'Winner', text: 'the last player with a face-down card.' }],
  },

  ref: {
    title: 'Characters and actions',
    rows: [
      ['Anyone', 'Income: take {=coin} · Foreign aid: take {=coin}{=coin} · Coup: pay 7 {=coin}, a player loses 1 {=influence} (unblockable)'],
      ['{duke}', 'Tax: take {=coin}{=coin}{=coin} · blocks Foreign aid'],
      ['{assassin}', 'pay 3 {=coin}: a player loses 1 {=influence}'],
      ['{captain}', 'steal {=coin}{=coin} from a player (1 if they have 1) · blocks stealing'],
      ['{ambassador}', 'draw 2 cards, return 2 · blocks stealing'],
      ['{contessa}', 'blocks assassination'],
    ],
  },

  example: 'Nora has 2 {=coin} and claims {duke} to take 3. Eli challenges. Nora reveals a real Duke, so Eli loses an influence. Nora shuffles the Duke into the deck, draws a new card and takes {=coin}{=coin}{=coin}: 5 total.',

  setup: [
    'Shuffle the 15 character cards: 3 each of {duke}, {assassin}, {captain}, {ambassador}, {contessa}.',
    'Deal each player **2 face-down** cards: their {influence}. Look at yours secretly.',
    'Give each player **2** {=coin} (with 2 players, the first player gets 1); the rest form the treasury. Remaining cards form the Court deck.',
  ],

  terms: [
    ['{=influence} Influence', 'A face-down character card. You have 2: lose both and you are out.'],
    ['Claim', 'Saying you hold a character, to use its action or block.'],
    ['Challenge', 'Calling a claim a lie. A caught liar, or a wrong challenger, loses an influence.'],
    ['Court deck', 'The face-down pile of unused characters.'],
  ],

  gotchas: [
    'If you **start your turn with 10+** {=coin}, you must Coup.',
    'A player who wins a challenge shuffles the revealed card back and draws a **replacement**, so the reveal tells you less than it seems.',
    'A blocked assassination still costs 3 {=coin}. A target who bluffs {=contessa} and is caught, or wrongly challenges the Assassin, loses **both** influence.',
  ],

  tips: [
    'Pick one or two characters and claim them consistently.',
    'Don’t challenge early unless the action hurts you: a lost card is half your life.',
    'Watch coins: whoever nears 7 is the threat. Steal from them or assassinate them first.',
  ],

  walk(A) {
    const C = A.C, gold = '#e2b33c', backC = '#5a2a2a';
    let board = A.bg('#3a2b26') + `<ellipse cx="160" cy="100" rx="156" ry="96" fill="#6e2f2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    board += A.person(36, 44, 28, '#6b7aa6', { face: '#d9b48f' }) + A.text(36, 66, 'Eli', { size: 8.5, weight: 700, fill: C.white });
    board += A.person(284, 44, 28, '#8a7a5b', { face: '#d9b48f' }) + A.text(284, 66, 'Tia', { size: 8.5, weight: 700, fill: C.white });
    board += A.person(46, 168, 30, '#a6846b', { face: '#d9b48f' }) + A.text(46, 192, 'Nora', { size: 8.5, weight: 700, fill: C.white });
    const W = 32, H = 44;
    // Cards and coins are the inline icon drawings scaled up.
    const I = this.icons, ic = (k, x, y) => A.use(I[k].draw(A), x - 8, y - 2, 48);
    const back = (x, y) => ic('influence', x, y);
    const face = (x, y, n, dead) => ic(n.toLowerCase(), x, y) + (dead ? A.rect(x, y, W, H, '#000', { sw: 0, rx: 2.5, opacity: 0.4 }) : '');
    const coin = (x, y) => A.use(A.ICONS.coin.draw(A), x - 6.3, y - 6.3, 12.6);
    // Static: Tia's cards and coins, Eli's coins, deck.
    board += back(204, 18) + back(240, 18);
    for (let i = 0; i < 4; i++) board += coin(214 + i * 11, 74);
    for (let i = 0; i < 3; i++) board += coin(70 + i * 11, 74);
    board += back(118, 88) + back(116, 85) + A.text(132, 141, 'Court deck', { size: 7, weight: 700, fill: '#e8c9a8' });
    board += A.text(236, 141, 'Treasury', { size: 7, weight: 700, fill: '#e8c9a8' });
    let treas = '';
    for (let i = 3; i < 12; i++) treas += coin(214 + (i % 5) * 10, 100 + Math.floor(i / 5) * 10);
    board += treas;
    const tc = (i, at) => A.k('t' + i, coin(...(at || [214 + i * 10, 100])));
    const tre = tc(0) + tc(1) + tc(2);
    const nora = A.k('n0', coin(200, 164)) + A.k('n1', coin(211, 164));
    const eli1 = A.k('e1', back(64, 18)), eli2 = (up) => A.k('e2', up ? face(100, 22, 'Contessa', true) : back(100, 18));
    const cap = A.k('cap', face(140, 148, 'Captain'));
    const seen = A.tag(268, 186, 'only Nora sees', { fill: '#5d4b7a' });
    return [
      { step: 0, say: 'Nora has 2 {=coin} and holds {=duke}{=captain} (only she sees them). She claims **Duke**: “Tax, take 3.”', svg: board + tre + nora + eli1 + eli2() + A.k('duke', face(104, 148, 'Duke')) + cap + seen +
        A.bubble(34, 116, 70, 20, 'Duke: tax!', { size: 9 }) },
      { step: 1, say: '**Eli challenges**: he thinks she is bluffing. One of them will lose an influence.', svg: board + tre + nora + eli1 + eli2() + A.k('duke', face(104, 148, 'Duke')) + cap + seen +
        A.bubble(4, 2, 72, 18, 'Challenge!', { size: 9, color: C.red }) + A.glow(36, 40, 18, 'g-eli') },
      { step: 1, say: 'Nora **reveals a real Duke**. The challenge fails.', svg: board + tre + nora + eli1 + eli2() + A.k('duke', face(164, 76, 'Duke')) + cap + A.glow(180, 98, 30, 'g-duke') },
      { step: 1, say: 'Eli loses an influence: one of his cards turns face up for good. Nora shuffles her Duke into the deck and **draws a new card**.', svg: board + tre + nora + eli1 + eli2(true) +
        A.k('duke', back(116, 85)) + A.k('new', face(104, 148, 'Assassin')) + cap + seen + A.glow(116, 44, 26, 'g-eli2') },
      { step: 3, say: 'Tax can’t be blocked, so it resolves: {=coin}{=coin}{=coin} from the treasury. Nora now has 5.', svg: board + nora + eli1 + eli2(true) + A.k('new', face(104, 148, 'Assassin')) + cap + seen +
        tc(0, [222, 164]) + tc(1, [233, 164]) + tc(2, [244, 164]) + A.glow(222, 164, 15, 'g-coins') },
    ];
  },

  art(A) {
    const C = A.C, gold = '#e2b33c', back = '#5a2a2a';
    const I = this.icons;
    let o = A.bg('#3a2b26');
    o += `<ellipse cx="160" cy="104" rx="152" ry="92" fill="#6e2f2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    o += `<ellipse cx="160" cy="104" rx="140" ry="82" fill="#7d3a35"/>`;
    const backCard = (x, y, r) => A.group(A.use(I.influence.draw(A), -21, -21.75, 42), `translate(${x} ${y}) rotate(${r})`);
    const faceCard = (x, y, r, name, o2 = {}) => {
      let g = A.use(I[name.toLowerCase()].draw(A), -25.5, -26.1, 51);
      if (o2.dead) g += A.rect(-17, -24, 34, 46.75, '#000', { sw: 0, rx: 3.5, opacity: 0.35 });
      return A.group(g, `translate(${x} ${y}) rotate(${r})`);
    };
    const coins = (x, y, n) => { let s = ''; for (let i = 0; i < n; i++) s += A.circle(x + (i % 3) * 7, y - Math.floor(i / 3) * 4, 5, gold, { sw: 1 }); return s; };
    // Opponents.
    o += A.person(42, 52, 28, '#6b7aa6', { face: '#d9b48f' }) + backCard(78, 56, -8) + backCard(100, 58, 6) + coins(62, 92, 5);
    o += A.person(278, 52, 28, '#8a7a5b', { face: '#d9b48f' }) + backCard(240, 58, 8) + faceCard(208, 60, -10, 'Assassin', { dead: true }) + coins(244, 92, 2);
    // Treasury.
    for (let i = 0; i < 14; i++) o += A.circle(144 + (i * 37) % 34, 104 + (i * 13) % 16 - 8, 6, gold, { sw: 1 });
    o += backCard(100, 122, 90) + backCard(102, 118, 92);
    // Your hand (face up to you).
    o += faceCard(138, 166, -6, 'Duke') + faceCard(176, 166, 6, 'Captain') + coins(212, 172, 3);
    // Talk.
    o += A.bubble(10, 4, 104, 22, 'I’m the Duke: tax!', { size: 9.5 });
    o += A.bubble(214, 4, 74, 22, 'Challenge!', { size: 10, color: C.red });
    o += A.note(122, 160, 56, 152, '2 cards = 2 lives');
    o += A.note(212, 72, 272, 120, 'Lost influence');
    o += A.note(160, 98, 160, 76, 'Treasury');
    o += A.note(90, 118, 44, 114, 'Court deck');
    return o;
  },
});
