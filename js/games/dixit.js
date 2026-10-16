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
