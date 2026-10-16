defineGame({
  id: 'coup',
  name: 'Coup',
  year: 2012,
  designer: 'Rikki Tahta',
  family: 'hidden',
  players: [2, 6], best: '5–6',
  time: [10, 20],
  age: 13,
  mechanics: ['bluffing', 'hidden-roles', 'take-that', 'player-elimination', 'variable-powers', 'deduction'],
  profile: { complexity: 2, luck: 2, interaction: 5, conflict: 5, talk: 4, planning: 2 },
  color: '#8a2f2f',

  pitch: 'Claim to be any character you like and take their power. Just don’t get called out when you’re lying.',
  theme: 'You are a scheming noble in a corrupt city-state, manipulating the court to wipe out your rivals.',

  goal: { big: 'Last one standing', text: 'Be the **last player** with any influence (face-down cards) left.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, take exactly one action:',
    steps: [
      { verb: 'Act', text: 'Take Income, Foreign Aid or Coup, or **claim** any character and use its power, whatever you really hold.' },
      { verb: 'Challenge', text: 'Anyone may challenge a character claim. The loser of the challenge **loses an influence**.' },
      { verb: 'Block', text: 'Some actions can be blocked by claiming a blocking character, and blocks can be challenged too.' },
      { verb: 'Resolve', text: 'If the action survives, it happens: take coins, steal, swap cards, or make a player lose an influence.' },
    ],
  },

  tension: 'Telling the truth is safe but slow; bluffing a strong character gets you ahead, but one challenge can cost you half your life.',

  flow: [
    { label: 'Collect', items: ['Income +1', 'Foreign aid +2', 'Tax +3', 'Steal 2'] },
    { label: 'Spend', items: ['Assassinate (3)', 'Coup (7)'] },
    { label: 'Eliminate', items: ['Lost influence flips face up', '0 cards = out'] },
  ],

  end: {
    trigger: 'Only one player has influence left',
    detail: 'Losing an influence means turning one of your cards face up (your choice which). Both face up and you are out.',
    results: [
      { side: 'Winner', text: 'the last player with at least one face-down card.' },
      { side: 'Out', text: 'everyone who lost both influence, in the order they fell.' },
    ],
  },

  ref: {
    title: 'Actions',
    rows: [
      ['Income · Foreign aid', 'take 1 · take 2 (Duke can block aid)'],
      ['Coup', 'pay 7: a player loses 1 influence; can’t be blocked'],
      ['Duke', 'take 3 from the treasury · blocks foreign aid'],
      ['Assassin', 'pay 3: a player loses 1 influence (Contessa blocks)'],
      ['Captain', 'steal 2 from a player · blocks stealing'],
      ['Ambassador', 'draw 2, return 2 to the deck · blocks stealing'],
    ],
  },

  example: 'Nora has 2 coins and claims **Duke** to take 3. Eli challenges. Nora reveals a real Duke, so Eli loses an influence; Nora shuffles her Duke into the deck, draws a new card and takes her 3 coins, now 5.',

  setup: [
    'Shuffle the 15 character cards (3 each of Duke, Assassin, Captain, Ambassador, Contessa).',
    'Deal **2 face-down** cards to each player; they are your influence. Look at them secretly.',
    'Give everyone **2 coins**; the rest form the treasury. The rest of the cards form the Court deck.',
  ],

  terms: [
    ['Influence', 'A face-down character card. Two is your life total.'],
    ['Claim', 'Saying you hold a character to use its power or block.'],
    ['Challenge', 'Calling a claim a lie. Wrong challenger or caught liar loses an influence.'],
    ['Court deck', 'The face-down pile of unused characters.'],
  ],

  gotchas: [
    'If you **start your turn with 10+ coins**, you must Coup.',
    'A player who wins a challenge reveals the card, shuffles it back and draws a **replacement**, so the reveal tells you less than you think.',
    'A blocked assassination still costs the 3 coins. If you are the target and falsely claim Contessa (or wrongly challenge), you can lose **both** influence in one turn.',
  ],

  tips: [
    'Pick one or two characters to “be” and claim them consistently.',
    'Don’t challenge early unless it really hurts you: losing a card halves your life.',
    'Watch the coins: whoever nears 7 is the threat; steal from them or assassinate first.',
  ],

  walk(A) {
    const C = A.C, gold = '#e2b33c', backC = '#5a2a2a';
    const chars = { Duke: '#7d55b5', Captain: '#2f6db5', Assassin: '#3b3b3b', Contessa: '#c8423b' };
    let board = A.bg('#3a2b26') + `<ellipse cx="160" cy="100" rx="156" ry="96" fill="#6e2f2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    board += A.person(36, 44, 28, '#6b7aa6', { face: '#d9b48f' }) + A.text(36, 66, 'Eli', { size: 8.5, weight: 700, fill: C.white });
    board += A.person(284, 44, 28, '#8a7a5b', { face: '#d9b48f' }) + A.text(284, 66, 'Tia', { size: 8.5, weight: 700, fill: C.white });
    board += A.person(46, 168, 30, '#a6846b', { face: '#d9b48f' }) + A.text(46, 192, 'Nora', { size: 8.5, weight: 700, fill: C.white });
    const W = 32, H = 44;
    const back = (x, y) => A.card(x, y, W, H, backC) + A.rect(x + 8, y + 8, W - 16, H - 16, 'none', { stroke: gold, sw: 1, rx: 2 });
    const face = (x, y, n, dead) => A.card(x, y, W, H, chars[n]) + A.crown(x + W / 2, y + 22, 12, gold) + A.rect(x + 3, y + 29, W - 6, 9, C.white, { sw: 0, rx: 2, opacity: 0.9 }) + A.text(x + W / 2, y + 33.5, n.toUpperCase(), { size: 4.8, weight: 800 }) + (dead ? A.rect(x, y, W, H, '#000', { sw: 0, rx: 5, opacity: 0.4 }) : '');
    const coin = (x, y) => A.circle(x, y, 5, gold, { sw: 1 });
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
      { step: 0, say: 'Nora has 2 coins and holds Duke + Captain (only she can see them). She claims **Duke**: “Tax, take 3.”', svg: board + tre + nora + eli1 + eli2() + A.k('duke', face(104, 148, 'Duke')) + cap + seen +
        A.bubble(34, 116, 70, 20, 'Duke: tax!', { size: 9 }) },
      { step: 1, say: '**Eli challenges**: he thinks she is bluffing. Now one of them will lose an influence.', svg: board + tre + nora + eli1 + eli2() + A.k('duke', face(104, 148, 'Duke')) + cap + seen +
        A.bubble(4, 2, 72, 18, 'Challenge!', { size: 9, color: C.red }) + A.glow(36, 40, 18, 'g-eli') },
      { step: 1, say: 'Nora **reveals a real Duke**. The challenge fails.', svg: board + tre + nora + eli1 + eli2() + A.k('duke', face(164, 76, 'Duke')) + cap + A.glow(180, 98, 30, 'g-duke') },
      { step: 1, say: 'Eli loses an influence and turns one card face up for good. Nora shuffles her Duke into the deck and **draws a new card**.', svg: board + tre + nora + eli1 + eli2(true) +
        A.k('duke', back(116, 85)) + A.k('new', face(104, 148, 'Assassin')) + cap + seen + A.glow(116, 44, 26, 'g-eli2') },
      { step: 3, say: 'Tax can’t be blocked, so the action resolves: **3 coins** from the treasury. Nora now has 5.', svg: board + nora + eli1 + eli2(true) + A.k('new', face(104, 148, 'Assassin')) + cap + seen +
        tc(0, [222, 164]) + tc(1, [233, 164]) + tc(2, [244, 164]) + A.glow(222, 164, 15, 'g-coins') },
    ];
  },

  art(A) {
    const C = A.C, gold = '#e2b33c', back = '#5a2a2a';
    const chars = { Duke: '#7d55b5', Captain: '#2f6db5', Assassin: '#3b3b3b', Contessa: '#c8423b', Ambassador: '#3c8d4f' };
    let o = A.bg('#3a2b26');
    o += `<ellipse cx="160" cy="104" rx="152" ry="92" fill="#6e2f2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    o += `<ellipse cx="160" cy="104" rx="140" ry="82" fill="#7d3a35"/>`;
    const backCard = (x, y, r) => A.group(A.card(-14, -20, 28, 40, back) + A.rect(-8, -13, 16, 26, 'none', { stroke: gold, sw: 1, rx: 2 }), `translate(${x} ${y}) rotate(${r})`);
    const faceCard = (x, y, r, name, o2 = {}) => {
      const f = chars[name];
      let g = A.card(-17, -24, 34, 48, f) + A.crown(0, -2, 14, gold) + A.rect(-14, 10, 28, 9, C.white, { sw: 0, rx: 2, opacity: 0.85 }) + A.text(0, 14.5, name, { size: 6, weight: 800 });
      if (o2.dead) g += A.rect(-17, -24, 34, 48, '#000', { sw: 0, rx: 5, opacity: 0.35 });
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
