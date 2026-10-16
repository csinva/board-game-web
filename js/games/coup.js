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
