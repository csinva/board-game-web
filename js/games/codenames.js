defineGame({
  id: 'codenames',
  name: 'Codenames',
  year: 2015,
  designer: 'Vlaada Chvátil',
  family: 'party',
  players: [4, 8], best: '6–8',
  time: [15, 20],
  age: 10,
  mechanics: ['word', 'team', 'limited-communication', 'party', 'deduction'],
  profile: { complexity: 1, luck: 2, interaction: 4, conflict: 2, talk: 4, planning: 2 },
  color: '#c8423b',

  pitch: 'Two spymasters give one-word clues to link several words on the grid. Their teams guess which cards are theirs, and dodge the assassin.',
  theme: 'You are rival spy teams; your spymaster knows the secret identities of 25 agents, but can only speak in codes.',

  goal: { big: 'Find your agents', text: 'Be the first team to reveal **all your agents** (9 for the starting team, 8 for the other) without touching the assassin.' },

  turn: {
    type: 'round',
    intro: 'Teams alternate. On your team’s turn:',
    steps: [
      { verb: 'Clue', text: 'Your spymaster says **one word and one number**, e.g. “Ocean: 2”. Nothing else: no gestures, no faces.' },
      { verb: 'Guess', text: 'Operatives discuss and touch a card. The spymaster covers it with its true colour.' },
      { verb: 'Continue', text: 'If it was yours, you may guess again, up to **number + 1** guesses in total. Stop any time after one.' },
    ],
    outro: 'Other team’s turn',
  },

  tension: 'A clue that links more words gets you ahead faster, but every stretch makes it likelier your team picks a wrong card, or the assassin.',

  flow: [
    { label: 'Clue', items: ['Link 2–4 words', 'Avoid enemy words', 'Steer clear of the assassin'] },
    { label: 'Guess', items: ['Talk it through', 'Touch one card', 'Stop or push on'] },
    { label: 'Reveal', items: ['Your agent: keep going', 'Bystander: turn ends', 'Enemy agent: theirs + turn ends'] },
  ],

  end: {
    trigger: 'One team has all its agents revealed, or someone touches the assassin',
    detail: 'If you reveal an enemy agent, it counts for them, so a team can win on the other team’s turn.',
    results: [
      { side: 'Win', text: 'when every one of your agents is covered.' },
      { side: 'Lose instantly', text: 'if your operatives touch the **assassin**.' },
    ],
  },

  ref: {
    title: 'The 25 cards (key card)',
    rows: [
      ['Starting team', '9 agents'],
      ['Other team', '8 agents'],
      ['Innocent bystanders', '7: guessing one ends your turn'],
      ['Assassin', '1: guessing it loses the game'],
    ],
  },

  example: 'Red’s spymaster Zoe says “**Ocean: 2**”, meaning SHARK and PORT. Her team touches SHARK: a red agent, so they keep going. Then they touch BEACH: a bystander, so the turn ends with PORT still hidden.',

  setup: [
    'Split into two teams; each picks a **spymaster**. Spymasters sit together on one side.',
    'Lay out 25 word cards in a 5×5 grid.',
    'Draw a key card for the stand; its border lights show which team starts (and has 9 agents).',
  ],

  terms: [
    ['Spymaster', 'Sees the key card; gives clues but never guesses.'],
    ['Operatives', 'Everyone else; they guess from the clue.'],
    ['Key card', 'Secret map of which grid spot is red, blue, bystander or assassin.'],
    ['Bystander', 'A neutral card; touching it ends your turn.'],
  ],

  gotchas: [
    'The clue must be about **meaning** and can’t be any word visible on the table (or part of one).',
    'You must make **at least one** guess, and may stop after any correct one.',
    'Extra guesses can target words from earlier clues; that is why “+1” exists.',
  ],

  tips: [
    'As spymaster, a safe 2 beats a risky 4. Check every clue against the assassin.',
    'As operatives, say your reasoning out loud so teammates catch mistakes.',
    'Spymasters: keep a poker face. Your reaction is not allowed to be a clue.',
  ],

  art(A) {
    const C = A.C, red = '#c8423b', blue = '#2f6db5', bys = '#d9c79c', tan = '#ead9b0';
    let o = A.bg('#3c3a44');
    const grid = [
      ['PIANO', 'r', 'SHARK', 'n', 'MOON'],
      ['b', 'BANK', 'ICE', 'r', 'RING'],
      ['FORK', 'BEACH', 'b', 'LEMON', 'NIGHT'],
      ['r', 'CAST', 'PORT', 'n', 'EGG'],
      ['ROSE', 'b', 'SPACE', 'TRUNK', 'r'],
    ];
    const w = 42, h = 28, g = 3.5, x0 = 8, y0 = 24;
    const cell = (i, j) => [x0 + i * (w + g), y0 + j * (h + g)];
    grid.forEach((row, j) => row.forEach((v, i) => {
      const [x, y] = cell(i, j);
      if (v === 'r' || v === 'b' || v === 'n') {
        const f = v === 'r' ? red : v === 'b' ? blue : bys;
        o += A.rect(x + 1.5, y + 2, w, h, 'rgba(0,0,0,.35)', { sw: 0, rx: 3 }) + A.rect(x, y, w, h, f, { rx: 3, sw: 1.2 });
        o += A.person(x + w / 2, y + h / 2 + 1, 15, v === 'n' ? '#a8946a' : 'rgba(255,255,255,.35)', { face: v === 'n' ? '#a8946a' : 'rgba(255,255,255,.35)' });
      } else {
        o += A.rect(x + 1.5, y + 2, w, h, 'rgba(0,0,0,.35)', { sw: 0, rx: 3 }) + A.rect(x, y, w, h, tan, { rx: 3, sw: 1.2 });
        o += A.rect(x + 3, y + h - 13, w - 6, 10, C.white, { rx: 2, sw: 0.6 });
        o += A.text(x + w / 2, y + h - 8, v, { size: 6.6, weight: 800, spacing: 0.3 });
        o += A.rect(x + 3, y + 3, w - 6, 13, 'none', { rx: 2, sw: 0.6, stroke: '#b9a57a' });
      }
    }));
    // Spymaster and clue.
    o += A.person(298, 40, 30, red, { face: '#e6c7a8' });
    o += A.bubble(240, 4, 70, 24, 'OCEAN: 2', { size: 11 });
    // Key card on its stand.
    const kx = 250, ky = 108, ks = 11;
    o += A.rect(kx - 6, ky - 6, ks * 5 + 12, ks * 5 + 12, red, { rx: 4, sw: 1.4 });
    const key = ['nrrnb', 'bnbrr', 'rnbbr', 'rbrnk', 'nbnbr'];
    o += A.grid(kx, ky, 5, 5, ks, (i, j) => ({ r: red, b: blue, n: bys, k: '#141414' })[key[j][i]], { sw: 0.8 });
    // Highlight the two target words.
    { const [x, y] = cell(2, 0); o += A.rect(x - 2, y - 2, w + 4, h + 4, 'none', { stroke: '#f2c14e', sw: 2.2, rx: 4 }); }
    o += A.note(276, 22, 268, 84, '1 word + number');
    o += A.note(kx + 3.5 * ks, ky + 3.5 * ks, 274, 184, 'Key card');
    o += A.note(cell(2, 0)[0] + w / 2, cell(2, 0)[1] + 4, 120, 10, 'Team guesses by touching');
    o += A.note(cell(4, 4)[0] + w / 2, cell(4, 4)[1] + h / 2, 140, 190, 'Revealed: covered by colour');
    return o;
  },
});
