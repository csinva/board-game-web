defineGame({
  id: 'sushi-go',
  name: 'Sushi Go!',
  year: 2013,
  designer: 'Phil Walker-Harding',
  family: 'cards',
  players: [2, 5], best: '4–5',
  time: [15, 20],
  age: 8,
  mechanics: ['drafting', 'set-collection', 'simultaneous', 'hand-management'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 2, talk: 2, planning: 2 },

  pitch: 'Grab one dish from the hand of cards, pass the rest along like a conveyor belt, and build the tastiest-scoring combos.',
  theme: 'You are diners at a sushi conveyor-belt restaurant, grabbing the best dishes as they go by.',

  goal: { big: 'Most points', text: 'After **3 rounds**, the player with the most points wins. Each dish scores in its own way, mostly in sets.' },

  turn: {
    type: 'simultaneous',
    intro: 'Everyone does this at the same time:',
    steps: [
      { verb: 'Pick', text: 'Choose **one** card from your hand and place it face-down in front of you.' },
      { verb: 'Reveal', text: 'Everyone flips their chosen card face-up at once, next to their earlier picks.' },
      { verb: 'Pass', text: 'Pass the rest of your hand to the **left**.' },
    ],
    outro: 'Repeat until all cards are played, then score the round.',
  },

  tension: 'You see exactly which cards are heading to your neighbour, so each pick is a choice between finishing your own set and taking the card someone else needs.',

  flow: [
    { label: 'Draft', items: ['Pick 1, pass the rest', 'Hands shrink each turn'] },
    { label: 'Combine', items: ['Pairs and triples', 'Wasabi under Nigiri', 'Chopsticks for 2 picks'] },
    { label: 'Score', items: ['Score each round', 'Discard all but Pudding', 'Pudding at game end'] },
  ],

  end: { trigger: 'the third round has been scored', detail: 'Then score Pudding: most Pudding cards gain 6, fewest lose 6 (no loss in a 2-player game). Ties go to whoever has more Pudding.' },
  scoring: [
    { label: 'Nigiri + Wasabi', share: 3 },
    { label: 'Sets (Tempura, Sashimi, Dumplings)', share: 4 },
    { label: 'Maki rolls', share: 2 },
    { label: 'Pudding', share: 1 },
  ],

  ref: {
    title: 'How dishes score',
    rows: [
      ['Tempura', '5 per pair'],
      ['Sashimi', '10 per set of 3'],
      ['Dumplings', '1 / 3 / 6 / 10 / 15 for 1–5+'],
      ['Maki rolls', 'Most icons 6, second 3'],
      ['Nigiri', 'Egg 1, Salmon 2, Squid 3 (×3 on Wasabi)'],
      ['Pudding', 'End of game: most +6, fewest −6'],
    ],
  },

  example: 'You hold a **Squid Nigiri** and already have an empty **Wasabi** in front of you. You take the Squid and put it on the Wasabi: 3 × 3 = **9 points**. You pass the rest left, including a Tempura that would have completed your neighbour’s pair.',

  setup: [
    'Shuffle the whole deck.',
    'Deal hands: 10 cards each with 2 players, 9 with 3, 8 with 4, 7 with 5.',
    'Keep a scorepad handy; deal a fresh hand at the start of each round.',
  ],

  terms: [
    ['Draft', 'Pick a card, then pass the hand on.'],
    ['Wasabi', 'Triples the next Nigiri you put on it.'],
    ['Chopsticks', 'On a later turn, swap them back into the hand to take 2 cards.'],
    ['Maki', 'Rolls with 1–3 icons; compete for the most each round.'],
  ],

  gotchas: [
    'Incomplete sets score **nothing**: one Tempura or two Sashimi are worth 0.',
    'Wasabi only boosts a Nigiri played **after** it; an empty Wasabi scores 0.',
    'Pudding cards stay out all game; everything else is discarded after each round.',
  ],

  tips: [
    'Sashimi is a gamble: only start it early in the round when there’s time to finish.',
    'Dumplings scale fast and nobody can block a set you have started.',
    'Look at what your left neighbour has collected before you pass.',
  ],

  walk(A) {
    const C = A.C, W = 34, H = 46;
    const D = {
      tempura: ['#9b74c9', 'Tempura'], dumpling: ['#4aa3d8', 'Dumpling'], maki: ['#e0524a', 'Maki'], squid: ['#f2c14e', 'Squid Nigiri'],
      salmon: ['#f2c14e', 'Salmon Nigiri'], wasabi: ['#86b84a', 'Wasabi'], pudding: ['#f19bb4', 'Pudding'], sashimi: ['#93c45e', 'Sashimi'], chop: ['#4fbfae', 'Chopsticks'],
    };
    const dish = (x, y, k) => {
      const [f, t] = D[k];
      let s = A.card(x, y, W, H, f, {}) + A.rect(x + 3, y + 3, W - 6, 10, C.white, { rx: 2, sw: 0, opacity: 0.9 }) + A.text(x + W / 2, y + 8, t, { size: Math.min(5.5, 46 / t.length), weight: 800 });
      const cx = x + W / 2, cy = y + H / 2 + 6;
      if (k === 'squid' || k === 'salmon') s += A.rect(cx - 9, cy, 18, 7, '#fbf6ec', { rx: 3, sw: 1 }) + A.rect(cx - 10, cy - 5, 20, 6, k === 'squid' ? '#f4efe6' : '#e85d3a', { rx: 3, sw: 1 });
      else if (k === 'maki') s += A.circle(cx, cy, 8, '#2b2b2b', { sw: 1 }) + A.circle(cx, cy, 5, '#fbf6ec', { sw: 0 }) + A.circle(cx, cy, 2, '#e85d3a', { sw: 0 });
      else if (k === 'dumpling') s += A.path(`M${cx - 9} ${cy + 4} q9 -15 18 0 z`, { fill: '#fbf6ec', sw: 1 });
      else if (k === 'tempura') s += A.path(`M${cx - 8} ${cy + 5} q4 -13 8 -9 q4 -4 8 9 z`, { fill: '#e8b04a', sw: 1 });
      else if (k === 'sashimi') s += A.rect(cx - 9, cy - 4, 18, 8, '#f08a6a', { rx: 3, sw: 1 });
      else if (k === 'pudding') s += A.path(`M${cx - 7} ${cy + 6} l3 -11 h8 l3 11 z`, { fill: '#f6d27a', sw: 1 }) + A.rect(cx - 4, cy - 7, 8, 4, '#8a5a33', { rx: 2, sw: 0.8 });
      else if (k === 'wasabi') s += A.path(`M${cx - 7} ${cy + 5} q7 -14 14 0 z`, { fill: '#b7dc6a', sw: 1 });
      else s += A.line(cx - 7, cy + 6, cx + 5, cy - 7, { sw: 2, stroke: '#8a5a33' }) + A.line(cx - 3, cy + 7, cx + 8, cy - 5, { sw: 2, stroke: '#8a5a33' });
      return s;
    };
    const back = (x, y) => A.card(x, y, W, H, '#d9503f', {}) + A.circle(x + W / 2, y + H / 2, 8, '#fbf6ec', { sw: 1 }) + A.text(x + W / 2, y + H / 2, '?', { size: 6, weight: 800 });
    const KH = (i) => [146 + i * 12, 8], YH = (i) => [10 + i * 40, 144], MH = (i) => [236 + i * 12, 144];
    let base = A.bg('#f7e3cf') + A.rect(0, 0, 320, 62, '#efd3b6', { sw: 0, rx: 0 }) + A.line(0, 62, 320, 62, { stroke: '#c9a988', sw: 1 });
    base += A.tag(296, 50, 'Kai') + A.tag(296, 92, 'You') + A.tag(296, 132, 'Mo');
    base += dish(10, 8, 'tempura') + dish(48, 8, 'maki') + dish(10, 70, 'wasabi') + dish(48, 70, 'dumpling');
    const kaiHand = [0, 1, 2].map(i => A.k('k' + i, back(...KH(i)))).join('');
    const moHand = [0, 1, 2].map(i => A.k('m' + i, back(...MH(i)))).join('');
    const rest = (pos) => A.k('tem', dish(...pos(0), 'tempura')) + A.k('mak', dish(...pos(1), 'maki')) + A.k('pud', dish(...pos(2), 'pudding'));
    const YR = (i) => YH(i + 1), KR = (i) => [96 + i * 40, 8];
    const squidOn = A.k('squid', dish(14, 86, 'squid'));
    return [
      { step: 0, say: 'You hold Squid Nigiri, Tempura, Maki and Pudding. An empty **Wasabi** waits in front of you.', svg: base + kaiHand + moHand +
        A.k('kp', back(...KH(3))) + A.k('squid', dish(...YH(0), 'squid')) + rest(YR) + A.glow(27, 167, 26, 'g1') + A.glow(27, 93, 26, 'g2') },
      { step: 0, say: 'Everyone picks one card at the same time and lays it face-down. You take the **Squid**.', svg: base + kaiHand + moHand +
        A.k('kp', back(96, 8)) + A.k('squid', back(96, 70)) + rest(YR) },
      { step: 1, say: 'Reveal together. Your Squid goes on the Wasabi: 3 × 3 = **9 points**. Kai revealed a Dumpling.', svg: base + kaiHand + moHand +
        A.k('kp', dish(96, 8, 'dumpling')) + squidOn + rest(YR) + A.k('pts', A.bubble(60, 104, 66, 24, '3 × 3 = 9', { size: 9 })) },
      { step: 2, say: 'Pass the rest **left** to Kai (top), including a Tempura that completes Kai’s pair. You couldn’t take both.', svg: base + moHand +
        A.k('kp', dish(96, 8, 'dumpling')) + squidOn + A.k('tem', dish(146, 8, 'tempura')) + A.k('mak', dish(184, 8, 'maki')) + A.k('pud', dish(222, 8, 'pudding')) +
        A.glow(27, 31, 24, 'g3') + A.glow(163, 31, 24, 'g4') },
      { step: 2, say: 'At the same time Mo, on your right, passes you 3 cards. Pick again: Salmon now scores just 2, as your Wasabi is used.', svg: base +
        A.k('kp', dish(96, 8, 'dumpling')) + squidOn + A.k('tem', dish(146, 8, 'tempura')) + A.k('mak', dish(184, 8, 'maki')) + A.k('pud', dish(222, 8, 'pudding')) +
        A.k('m0', dish(...YH(0), 'salmon')) + A.k('m1', dish(...YH(1), 'sashimi')) + A.k('m2', dish(...YH(2), 'chop')) },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#f7e3cf');
    // conveyor belt
    o += A.rect(-4, 10, 328, 74, '#5b5f6b', { rx: 0, sw: 0 });
    o += A.rect(-4, 16, 328, 62, '#7d8290', { rx: 0, sw: 0 });
    for (let x = 4; x < 320; x += 24) o += A.line(x, 16, x, 78, { stroke: '#6b707d', sw: 1.4 });
    const D = {
      tempura: ['#9b74c9', 'Tempura'], sashimi: ['#93c45e', 'Sashimi'], dumpling: ['#4aa3d8', 'Dumpling'], maki: ['#e0524a', 'Maki'],
      nigiri: ['#f2c14e', 'Nigiri'], wasabi: ['#86b84a', 'Wasabi'], pudding: ['#f19bb4', 'Pudding'], chop: ['#4fbfae', 'Chopsticks'],
    };
    const dish = (x, y, k, w, h) => {
      const [f, t] = D[k];
      let s = A.card(x, y, w, h, f, { title: t });
      const cx = x + w / 2, cy = y + h / 2 + 6;
      if (k === 'nigiri') s += A.rect(cx - 10, cy - 1, 20, 9, '#fbf6ec', { rx: 4, sw: 1 }) + A.rect(cx - 11, cy - 6, 22, 7, '#e85d3a', { rx: 3, sw: 1 });
      else if (k === 'maki') s += A.circle(cx, cy, 9, '#2b2b2b', { sw: 1 }) + A.circle(cx, cy, 6, '#fbf6ec', { sw: 0 }) + A.circle(cx, cy, 2.5, '#e85d3a', { sw: 0 });
      else if (k === 'dumpling') s += A.path(`M${cx - 10} ${cy + 4} q10 -16 20 0 z`, { fill: '#fbf6ec', sw: 1 });
      else if (k === 'tempura') s += A.path(`M${cx - 9} ${cy + 5} q4 -14 9 -10 q5 -4 9 10 z`, { fill: '#e8b04a', sw: 1 });
      else if (k === 'sashimi') s += A.rect(cx - 10, cy - 4, 20, 9, '#f08a6a', { rx: 3, sw: 1 });
      else if (k === 'pudding') s += A.path(`M${cx - 8} ${cy + 6} l3 -12 h10 l3 12 z`, { fill: '#f6d27a', sw: 1 }) + A.rect(cx - 5, cy - 8, 10, 4, '#8a5a33', { rx: 2, sw: 0.8 });
      else if (k === 'wasabi') s += A.path(`M${cx - 8} ${cy + 5} q8 -16 16 0 z`, { fill: '#b7dc6a', sw: 1 });
      else s += A.line(cx - 8, cy + 6, cx + 6, cy - 8, { sw: 2.2, stroke: '#8a5a33' }) + A.line(cx - 4, cy + 7, cx + 9, cy - 6, { sw: 2.2, stroke: '#8a5a33' });
      return s;
    };
    // hand passing along the belt
    ['maki', 'nigiri', 'tempura', 'dumpling', 'sashimi', 'pudding', 'chop'].forEach((k, i) => { o += dish(14 + i * 43, 22, k, 38, 52); });
    o += A.arrow(300, 96, 250, 96, { sw: 2.2, stroke: '#5b5f6b' });
    // your tableau
    o += A.rect(8, 112, 304, 82, '#e8c9a8', { rx: 8, sw: 1.2 });
    const mine = [['tempura', 18], ['tempura', 30], ['wasabi', 80], ['nigiri', 100], ['dumpling', 150], ['dumpling', 162], ['dumpling', 174], ['pudding', 238]];
    for (const [k, x] of mine) o += dish(x, 124, k, 40, 56);
    o += A.note(110, 48, 160, 96, 'Pick 1, pass the rest', { w: 126 });
    o += A.note(40, 150, 40, 106, 'Pair = 5', { w: 56 });
    o += A.note(116, 160, 106, 194, 'Wasabi ×3 Nigiri', { w: 104 });
    o += A.note(258, 160, 280, 194, 'Kept till game end', { w: 110 });
    return o;
  },
});
