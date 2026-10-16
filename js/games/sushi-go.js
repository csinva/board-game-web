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
