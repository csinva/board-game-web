defineGame({
  id: 'dixit',
  name: 'Dixit',
  year: 2008,
  designer: 'Jean-Louis Roubira',
  family: 'party',
  players: [3, 8], best: '5–6',
  time: [30, 30],
  age: 8,
  mechanics: ['party', 'voting', 'bluffing', 'hand-management', 'simultaneous'],
  profile: { complexity: 1, luck: 2, interaction: 3, conflict: 1, talk: 3, planning: 1 },
  color: '#8a5bb0',

  pitch: 'Describe a dreamlike picture with a clue that is not too obvious and not too obscure, then spot the real card among the decoys.',
  theme: 'You are storytellers sharing riddles about strange, beautiful pictures.',

  goal: { big: '30 points', text: 'Score the most points, usually by **guessing** the storyteller’s card and by **fooling** others into picking yours.' },

  turn: {
    type: 'round',
    intro: 'Each round one player is the storyteller (it rotates left):',
    steps: [
      { verb: 'Tell', text: 'The storyteller picks a card from their hand of 6 and says a **clue**: a word, sound, phrase or song.' },
      { verb: 'Match', text: 'Everyone else secretly gives the storyteller the card from their hand that best fits the clue.' },
      { verb: 'Vote', text: 'Shuffle and lay the cards out face up. Everyone but the storyteller **secretly votes** for the storyteller’s card.' },
      { verb: 'Score', text: 'Reveal votes, score, and refill hands to 6.' },
    ],
    outro: 'Next storyteller',
  },

  tension: 'The storyteller scores only if **some but not all** players find their card, so the clue must be exactly half-obvious.',

  flow: [
    { label: 'Tell', items: ['Pick a card', 'Give a clue', 'Not too clear, not too vague'] },
    { label: 'Fool', items: ['Pick a decoy', 'Match the clue’s mood'] },
    { label: 'Score', items: ['Find the real card', 'Votes on your decoy', 'Move your rabbit'] },
  ],

  end: { trigger: 'A player reaches 30 points, or the draw deck runs out', detail: 'Most points wins.' },
  scoring: [
    { label: 'Finding the storyteller’s card', share: 4 },
    { label: 'Votes on your decoys', share: 2 },
    { label: 'Your own clues', share: 2 },
  ],

  ref: {
    title: 'Scoring each round',
    rows: [
      ['Everyone or no one finds it', 'storyteller 0, everyone else 2'],
      ['Otherwise', 'storyteller and each correct guesser 3'],
      ['Decoy card', 'its owner gets 1 per vote it attracted'],
    ],
  },

  example: 'Lea plays a lighthouse card and says “**Lonely**.” Five others add cards. Two of them find the lighthouse, so Lea and those two score 3 each. Tom guessed wrong, but Kai and Sam voted for his decoy, so Tom still scores 2.',

  setup: [
    'Each player takes a rabbit on the score track at 0 and a set of numbered voting tokens.',
    'Shuffle the cards and deal **6** to each player.',
    'Choose a first storyteller; it passes left each round.',
  ],

  terms: [
    ['Storyteller', 'The active player who gives the clue this round.'],
    ['Clue', 'Anything you can say or hum about your card.'],
    ['Decoy', 'A card another player adds to mislead the voters.'],
  ],

  gotchas: [
    'You may **not vote** for your own card.',
    'If **everybody** finds the storyteller’s card, it scores 0 for the storyteller (a too-easy clue).',
    'Decoy bonuses go to non-storytellers only, and you still get them even if you guessed wrong.',
  ],

  tips: [
    'Aim for clues that one or two people will get, such as an in-joke, a film line or a feeling.',
    'Pick decoys that match the clue’s **mood**, not just its literal meaning.',
    'Think about who at the table will “get” a clue; tailor it to them.',
  ],

  walk(A) {
    const C = A.C, W = 44, H = 60;
    // Little card pictures drawn in the 38×54 inner area at (x, y).
    const pics = {
      light: (x, y) => A.rect(x, y, 38, 54, '#283a6b', { sw: 0, rx: 2 }) + A.poly([[x + 16, y + 18], [x + 38, y + 10], [x + 38, y + 26]], '#f5e6b0', { sw: 0, opacity: 0.7 }) + A.rect(x + 11, y + 18, 9, 28, '#f2efe6', { sw: 0.8, rx: 1 }) + A.poly([[x + 9, y + 18], [x + 15.5, y + 10], [x + 22, y + 18]], '#c8423b', { sw: 0.8 }) + A.path(`M${x} ${y + 49} q9 -5 19 0 t19 0`, { stroke: '#7fb7d9', sw: 2 }),
      moon: (x, y) => A.rect(x, y, 38, 54, '#3b2c5c', { sw: 0, rx: 2 }) + A.circle(x + 19, y + 24, 11, '#f5e6b0', { sw: 0 }) + A.circle(x + 24, y + 20, 10, '#3b2c5c', { sw: 0 }) + A.star(x + 8, y + 10, 2.5, '#f5e6b0', { sw: 0 }) + A.star(x + 30, y + 44, 2.5, '#f5e6b0', { sw: 0 }),
      stairs: (x, y) => A.rect(x, y, 38, 54, '#f0b8c4', { sw: 0, rx: 2 }) + [0, 1, 2, 3].map(i => A.rect(x + 4 + i * 7, y + 44 - i * 9, 9, 4, '#8a5a33', { sw: 0.6, rx: 0.5 })).join('') + A.circle(x + 30, y + 10, 6, C.white, { sw: 0 }) + A.circle(x + 24, y + 12, 5, C.white, { sw: 0 }),
      tree: (x, y) => A.rect(x, y, 38, 54, '#a6c98a', { sw: 0, rx: 2 }) + A.rect(x + 17, y + 26, 4, 22, '#5b3a20', { sw: 0 }) + A.circle(x + 19, y + 20, 11, '#3f7a3a', { sw: 0.8 }) + A.line(x, y + 48, x + 38, y + 48, { stroke: '#5b3a20', sw: 1.2 }),
      boat: (x, y) => A.rect(x, y, 38, 54, '#f2a65a', { sw: 0, rx: 2 }) + A.rect(x, y + 34, 38, 20, '#2f6db5', { sw: 0, rx: 2 }) + A.path(`M${x + 10} ${y + 33} h18 l-4 5 h-10 z`, { fill: '#8a5a33', sw: 0.8 }) + A.poly([[x + 19, y + 14], [x + 19, y + 31], [x + 29, y + 31]], C.white, { sw: 0.8 }),
      balloon: (x, y) => A.rect(x, y, 38, 54, '#9fd3cf', { sw: 0, rx: 2 }) + A.circle(x + 19, y + 18, 11, '#e07b2e', { sw: 1 }) + A.path(`M${x + 10} ${y + 24} L${x + 16} ${y + 38} M${x + 28} ${y + 24} L${x + 22} ${y + 38}`, { sw: 0.8 }) + A.rect(x + 15, y + 38, 8, 6, '#8a5a33', { sw: 0.8, rx: 1 }),
    };
    const face = (x, y, pic, n) => {
      let s = A.rect(x + 2, y + 3, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, C.white, { rx: 4, sw: 1.2 }) + pics[pic](x + 3, y + 3);
      if (n) s += A.circle(x + W - 3, y + H - 3, 6.5, C.ink, { sw: 0 }) + A.text(x + W - 3, y + H - 3, n, { size: 7, weight: 800, fill: C.white });
      return s;
    };
    const back = (x, y) => A.rect(x + 2, y + 3, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#8a5bb0', { rx: 4, sw: 1.2 }) + A.star(x + W / 2, y + H / 2, 9, '#f2c14e', { sw: 0.8 });
    // Players: Lea (storyteller) top-left; the five others along the bottom.
    const P = { Lea: [22, 34, C.red], Tom: [48, 172, C.blue], Kai: [104, 172, C.green], Sam: [160, 172, C.yellow], Ana: [216, 172, C.purple], Ben: [272, 172, C.orange] };
    let board = A.bg('#efe7da');
    for (const [n, [x, y, f]] of Object.entries(P)) board += A.person(x, y, n === 'Lea' ? 24 : 20, f) + A.text(x, y + (n === 'Lea' ? 21 : 18), n, { size: 8 });
    const bubble = A.k('clue', A.bubble(42, 4, 76, 28, '“Lonely”', { size: 12, italic: true }));
    // Who played which card, and where it lands in the shuffled row.
    const cards = [['Tom', 'moon'], ['Ana', 'stairs'], ['Lea', 'light'], ['Kai', 'tree'], ['Ben', 'boat'], ['Sam', 'balloon']];
    const rowX = (i) => 10 + i * 51, RY = 66;
    const pile = (i) => [130 + i * 3, 60 + i * 2];
    const order = ['Lea', 'Tom', 'Kai', 'Sam', 'Ana', 'Ben'];
    const inPile = (faceUpLea) => order.map((n, j) => A.k('c-' + n, (n === 'Lea' && faceUpLea) ? face(...pile(j), 'light') : back(...pile(j)))).join('');
    const inRow = cards.map(([n, pic], i) => A.k('c-' + n, face(rowX(i), RY, pic, i + 1))).join('');
    const votes = { Ana: 2, Ben: 2, Kai: 0, Sam: 0, Tom: 3 };
    const tokens = (placed) => Object.entries(votes).map(([n, i], j) => {
      const [px, py, f] = P[n];
      const slotOn = Object.entries(votes).filter(([, v]) => v === i).findIndex(([m]) => m === n);
      const [x, y] = placed ? [rowX(i) + 12 + slotOn * 18, RY + 46] : [px + 14, py - 12];
      return A.k('v-' + n, A.circle(x, y, 7, f, { sw: 1.2 }) + A.text(x, y, n[0], { size: 7, weight: 800, fill: C.white }));
    }).join('');
    const owner = (i, n) => { const x = rowX(i) + W / 2; return A.k('o-' + n, A.rect(x - 14, RY + H + 4, 28, 11, P[n][2], { rx: 5.5, sw: 0 }) + A.text(x, RY + H + 9.5, n, { size: 6, fill: C.white })); };
    const pts = (n, v) => { const [x, y] = P[n]; const [tx, ty] = n === 'Lea' ? [44, 52] : [x + 18, y + 4]; return A.k('p-' + n, A.rect(tx - 2, ty - 7, 22, 14, '#fff7d6', { rx: 7, sw: 1 }) + A.text(tx + 9, ty, '+' + v, { size: 8, weight: 800 })); };
    return [
      { step: 0, say: 'Lea is the storyteller. She picks her **lighthouse** card (shown here), lays it face down and says: “**Lonely**.”',
        svg: board + bubble + A.k('c-Lea', face(...pile(0), 'light')) + A.glow(pile(0)[0] + W / 2, pile(0)[1] + H / 2, 38, 'g-l') },
      { step: 1, say: 'Everyone else secretly picks the card from their hand that best fits “Lonely” and passes it to Lea face down.',
        svg: board + bubble + inPile(false) },
      { step: 2, say: 'Lea shuffles the six cards and lays them out face up. Which one is hers?',
        svg: board + bubble + inRow + tokens(false) },
      { step: 2, say: 'Everyone but Lea **votes** in secret. Ana and Ben pick the lighthouse; Kai and Sam fall for Tom’s moon; Tom picks Kai’s tree.',
        svg: board + bubble + inRow + tokens(true) },
      { step: 3, say: 'Some but not all found it: **Lea, Ana and Ben score 3**. Tom gets **2**, one per vote on his decoy; Kai gets 1.',
        svg: board + inRow + tokens(true) + owner(0, 'Tom') + owner(2, 'Lea') + owner(3, 'Kai') +
          pts('Lea', 3) + pts('Ana', 3) + pts('Ben', 3) + pts('Tom', 2) + pts('Kai', 1) + A.glow(rowX(2) + W / 2, RY + H / 2, 36, 'g-l') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#efe7da');
    // Score track: a winding path of numbered stones.
    const track = [];
    for (let i = 0; i <= 15; i++) {
      const col = Math.floor(i / 4), k = i % 4, down = col % 2 === 0;
      track.push([16 + col * 26, 74 + (down ? k : 3 - k) * 30]);
    }
    for (let i = 0; i < track.length - 1; i++) o += A.line(track[i][0], track[i][1], track[i + 1][0], track[i + 1][1], { stroke: '#c9b48e', sw: 6 });
    track.forEach(([x, y], i) => { o += A.circle(x, y, 9, i % 5 === 0 ? '#e9d6a7' : '#f8f1e3', { sw: 1 }) + A.text(x, y, i, { size: 7, weight: 700, fill: '#7a6248' }); });
    o += A.meeple(16, 102, 16, C.red) + A.meeple(42, 134, 16, C.blue) + A.meeple(68, 74, 16, C.green) + A.meeple(94, 132, 16, C.yellow);
    // Storyteller clue.
    o += A.bubble(8, 6, 96, 30, '“Lonely”', { size: 13, italic: true });
    // Six face-up cards in two rows.
    const W = 52, H = 72, xs = [122, 186, 250], ys = [8, 100];
    const art = [
      (x, y) => A.rect(x, y, W - 6, H - 6, '#283a6b', { sw: 0, rx: 2 }) + A.circle(x + 30, y + 16, 7, '#f5e6b0', { sw: 0 }) + A.circle(x + 33, y + 14, 6, '#283a6b', { sw: 0 }) + A.rect(x + 8, y + 26, 8, 30, '#f2efe6', { sw: 0.8, rx: 1 }) + A.poly([[x + 6, y + 26], [x + 12, y + 18], [x + 18, y + 26]], '#c8423b', { sw: 0.8 }) + A.path(`M${x} ${y + 58} q12 -6 23 0 t23 0`, { stroke: '#7fb7d9', sw: 2 }),
      (x, y) => A.rect(x, y, W - 6, H - 6, '#f0b8c4', { sw: 0, rx: 2 }) + [0, 1, 2, 3, 4].map(i => A.rect(x + 6 + i * 6, y + 54 - i * 9, 9, 4, '#8a5a33', { sw: 0.6, rx: 0.5 })).join('') + A.circle(x + 36, y + 12, 8, C.white, { sw: 0 }) + A.circle(x + 30, y + 14, 6, C.white, { sw: 0 }),
      (x, y) => A.rect(x, y, W - 6, H - 6, '#a6c98a', { sw: 0, rx: 2 }) + A.line(x + 22, y + 22, x + 22, y + 60, { stroke: '#5b3a20', sw: 1.4 }) + A.path(`M${x + 22} ${y + 22} l-10 8 M${x + 22} ${y + 22} l10 6`, { stroke: '#5b3a20', sw: 1.2 }) + A.rect(x + 16, y + 44, 12, 3, '#5b3a20', { sw: 0 }) + A.line(x + 17, y + 22, x + 17, y + 44, { stroke: '#5b3a20', sw: 0.8 }) + A.line(x + 27, y + 22, x + 27, y + 44, { stroke: '#5b3a20', sw: 0.8 }),
      (x, y) => A.rect(x, y, W - 6, H - 6, '#9fd3cf', { sw: 0, rx: 2 }) + A.circle(x + 23, y + 22, 13, '#e07b2e', { sw: 1 }) + A.path(`M${x + 12} ${y + 28} L${x + 20} ${y + 44} M${x + 34} ${y + 28} L${x + 26} ${y + 44}`, { sw: 0.8 }) + A.rect(x + 19, y + 44, 8, 6, '#8a5a33', { sw: 0.8, rx: 1 }),
      (x, y) => A.rect(x, y, W - 6, H - 6, '#6e4f8f', { sw: 0, rx: 2 }) + A.rect(x + 10, y + 14, 26, 52, '#5b3a20', { sw: 0.8, rx: 10 }) + A.rect(x + 17, y + 34, 12, 18, '#f2c14e', { sw: 0.8, rx: 5 }) + A.star(x + 8, y + 8, 3, '#f5e6b0', { sw: 0 }),
      (x, y) => A.rect(x, y, W - 6, H - 6, '#f2a65a', { sw: 0, rx: 2 }) + `<ellipse cx="${x + 22}" cy="${y + 28}" rx="13" ry="7" fill="#2f6db5" stroke="#2a2420"/>` + A.poly([[x + 34, y + 28], [x + 42, y + 21], [x + 42, y + 35]], '#2f6db5', { sw: 1 }) + A.circle(x + 15, y + 26, 1.5, C.ink, { sw: 0 }) + A.path(`M${x} ${y + 56} h46`, { stroke: '#c8423b', sw: 3 }),
    ];
    let n = 0;
    for (const y of ys) for (const x of xs) {
      o += A.rect(x + 2, y + 3, W, H, C.shadow, { sw: 0, rx: 5 }) + A.rect(x, y, W, H, C.white, { rx: 5, sw: 1.2 });
      o += art[n](x + 3, y + 3);
      o += A.circle(x + W - 3, y + H - 3, 7, C.ink, { sw: 0 }) + A.text(x + W - 3, y + H - 3, n + 1, { size: 8, weight: 800, fill: C.white });
      n++;
    }
    // Votes placed on the storyteller's card (1) and a decoy (5).
    o += A.circle(140, 74, 6, C.blue, { sw: 1 }) + A.circle(154, 74, 6, C.yellow, { sw: 1 });
    o += A.circle(210, 166, 6, C.green, { sw: 1 }) + A.circle(224, 166, 6, C.purple, { sw: 1 });
    o += A.note(150, 40, 100, 52, 'Storyteller’s card');
    o += A.note(218, 166, 248, 190, 'Votes on a decoy');
    o += A.note(42, 134, 52, 189, 'Score track to 30');
    return o;
  },
});
