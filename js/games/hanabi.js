defineGame({
  id: 'hanabi',
  name: 'Hanabi',
  year: 2010,
  designer: 'Antoine Bauza',
  family: 'coop',
  players: [2, 5], best: '3–4',
  time: [25, 25],
  age: 8,
  mechanics: ['cooperative', 'limited-communication', 'hand-management', 'deduction', 'memory'],
  profile: { complexity: 1, luck: 3, interaction: 4, conflict: 1, talk: 2, planning: 3 },

  // Components drawn once, used inline in text ({clue}) and in the art / walkthrough.
  icons: (() => {
    const firework = (name, fill, ray) => ({ name, draw: A => A.rect(4, 1, 16, 22, fill, { rx: 2.5, sw: 1.3 }) +
      Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return A.line(12 + 2.6 * Math.cos(a), 12 + 2.6 * Math.sin(a), 12 + 6.2 * Math.cos(a), 12 + 6.2 * Math.sin(a), { stroke: ray, sw: 1.5 }); }).join('') + A.circle(12, 12, 1.4, ray, { sw: 0 }) });
    const num = (n) => ({ name: String(n), draw: A => A.rect(4, 1, 16, 22, '#dfe3f0', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, n, { size: 14, weight: 800, fill: '#1a1d3a' }) });
    return {
      red: firework('red', '#e0473c', '#fff'), yellow: firework('yellow', '#f2c230', '#2a2420'), green: firework('green', '#3fae5a', '#fff'),
      blue: firework('blue', '#3d7fe0', '#fff'), white: firework('white', '#f4f1ea', '#8c877f'),
      n1: num(1), n2: num(2), n3: num(3), n4: num(4), n5: num(5),
      back: { name: 'card back', draw: A => A.rect(4, 1, 16, 22, '#3b3f6e', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '?', { size: 13, weight: 800, fill: '#b8bce8' }) },
      clue: { name: 'clue token', draw: A => A.circle(12, 12, 9.5, '#4f8ff0', { sw: 1.3 }) + A.circle(12, 12, 5.3, 'none', { stroke: '#d6e5ff', sw: 1.4 }) },
      fuse: { name: 'fuse token', draw: A => A.circle(12, 12, 9.5, '#e0473c', { sw: 1.3 }) + A.poly([[13.6, 4.6], [7.6, 13.2], [11.4, 13.2], [10, 19.6], [16.4, 10.6], [12.6, 10.6]], '#fff3c4', { sw: 0.8 }) },
    };
  })(),

  pitch: 'Build 5 colour piles from 1 to 5 using cards you can’t see, guided by scarce clues; score up to 25 together.',

  goal: { big: '25 points', text: 'Together, build one pile per colour (**5 colours**), playing each pile’s cards in order from 1 up to 5. Your shared score is the sum of the top card on each pile; 25 is perfect.' },

  turn: {
    type: 'choose',
    intro: 'On your turn, do exactly ONE:',
    steps: [
      { verb: 'Give a clue', text: 'Only if at least 1 {clue} is available: spend 1, choose one other player, and name one colour or one number. Point at **every** card in their hand that matches (at least 1 must match).' },
      { verb: 'Discard', text: 'Only if fewer than 8 {=clue} are available: put 1 card from your hand face up on the discard pile, regain 1 {=clue}, then draw 1 card.' },
      { verb: 'Play', text: 'Put 1 card from your hand face up. If it is the **next number** on its colour’s pile (a {=n1} starts a pile), it joins that pile; if not, discard it and lose 1 {fuse}. Completing a pile with its {=n5} regains 1 {=clue} if fewer than 8 are available. Then draw 1 card.' },
    ],
  },

  tension: 'Clues are scarce, so each must imply more than it says, and each discard may lose a card for good.',

  structure: [
    { label: 'Setup', text: 'Deal 5 cards each with 2–3 players, 4 each with 4–5. Hold your cards facing away from you. Put 8 {=clue} and 3 {=fuse} in the middle.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Any player starts; play passes to the left. Each turn: give a clue, discard, or play. After a discard or a play, draw 1 card if the deck has any.' },
    { label: 'Last round', text: 'Once someone draws the last card, every player takes exactly 1 more turn, starting with the next player and ending with the player who drew it.' },
    { label: 'Score', text: 'Add up the number on the top card of each colour pile (0–25). Playing all five 5s ends the game at once with 25.' },
  ],
  points: [
    ['Each colour', 'the number on its pile’s top card: {=n1}–{=n5}; 0 if the pile is empty'],
    ['Total', 'sum of the 5 piles; 25 is perfect'],
    ['Rating', '0–5 horrible, 6–10 mediocre, 11–15 honourable, 16–20 excellent, 21–24 amazing, 25 legendary'],
    ['3rd {=fuse} lost', 'the game ends at once and the team loses; nothing is scored'],
  ],

  end: {
    trigger: 'the 3rd fuse is lost, all five 5s are played, or the last round after the deck runs out is over',
    detail: 'Once someone draws the last card, every player takes exactly 1 more turn, ending with the player who drew it.',
    results: [
      { side: 'Five 5s played or last round over', text: 'add up the top card of each colour pile, 0–25.' },
      { side: 'Everyone loses', text: 'at once when the 3rd {fuse} is lost; the piles are not scored.' },
    ],
  },

  ref: {
    title: 'Each colour (10 cards)',
    rows: [
      ['Colours', '{=red} {=yellow} {=green} {=blue} {=white}'],
      ['{=n1}', '3 copies: {=n1}{=n1}{=n1}'],
      ['{=n2} {=n3} {=n4}', '2 copies each'],
      ['{=n5}', '1 copy only: once discarded, that colour can’t reach 5'],
      ['Hand size', '5 cards each with 2–3 players; 4 each with 4–5'],
    ],
  },

  example: 'The red pile’s top card is a 2. Lee spends a {=clue}, points at 2 of Mia’s cards and says, “These two are **3s**.” Mia knows the red pile needs a 3, takes the clue as a hint to play, and plays one of them: it is the red 3. Ben has no card he knows is playable, so he discards his oldest card and regains 1 {=clue}.',

  setup: [
    'Shuffle the 50 cards into a face-down deck. Put 8 {clue}s and 3 {fuse}s in the middle.',
    'Deal 5 cards each with 2–3 players, 4 each with 4–5.',
    'Hold your hand with the faces pointing **away** from you: you see only {=back} backs, and everyone else sees your cards. Never look at your own cards.',
  ],

  terms: [
    ['{=clue} Clue token', 'Spend 1 to give a clue. Regain 1 when you discard, or when you play a 5. At most 8 are ever available.'],
    ['{=fuse} Fuse token', 'The team loses 1 each time a played card can’t join its pile. Losing the 3rd ends the game at once.'],
    ['Critical card', 'The last copy of a card still needed, e.g. any {=n5}.'],
    ['Chop', 'Player convention, not a rule: your oldest card that no clue has pointed at; discard it first.'],
  ],

  gotchas: [
    'A clue must point at **every** matching card in that player’s hand (“these two are blue”), and at least 1 card must match.',
    'Clues are the only information allowed: no hints by tone, faces or “are you sure?”.',
    'You **can’t discard** while all 8 {=clue} are available (none spent).',
  ],

  tips: [
    'Clue cards playable **now** first; players tend to play what was just pointed at.',
    'Protect {n5}s and last copies with a quick number clue.',
    'Discard your oldest card that no clue has pointed at; keep clued cards in place so the table can track them.',
  ],

  walk(A) {
    const C = A.C;
    const F = { r: '#e0473c', y: '#f2c230', g: '#3fae5a', b: '#3d7fe0', w: '#f4f1ea' };
    const ink = (c) => (c === 'y' || c === 'w') ? C.ink : C.white;
    const W = 28, H = 40;
    const face = (x, y, c, n) => A.card(x, y, W, H, F[c], { label: n, labelFill: ink(c), size: 16 });
    const back = (x, y) => A.card(x, y, W, H, '#3b3f6e', { label: '?', size: 14, labelFill: '#b8bce8' });
    const fuses = A.text(36, 128, 'Fuses', { size: 7.5, fill: '#cfd8ff' }) + [0, 1, 2].map(i => A.use(this.icons.fuse.draw(A), 12 + i * 16, 134, 15)).join('');
    const hx = (i) => 78 + i * 33;
    const MY = 8, BY = 152;
    // Fixed table: tags, piles, deck, discard, token area.
    let board = A.bg('#1a1d3a');
    board += A.tag(36, 28, 'Mia') + A.tag(36, 172, 'Ben') + A.tag(30, 100, 'Lee', { fill: C.purple });
    const px = (i) => 66 + i * 35, PY = 78;
    const piles = [['r', 2], ['y', 1], ['g', 2], ['b', 1], ['w', 0]];
    piles.forEach(([c, n], i) => {
      board += n ? face(px(i), PY, c, n) : A.rect(px(i), PY, W, H, 'none', { stroke: F.w, dash: '3 3', sw: 1.2, rx: 4 });
    });
    board += A.text(px(2) + W / 2, PY + H + 10, 'Played piles', { size: 7.5, fill: '#cfd8ff' });
    board += back(250, 146) + A.text(264, 194, 'Deck', { size: 7.5, fill: '#cfd8ff' });
    board += A.rect(286, 146, W, H, 'none', { stroke: '#cfd8ff', dash: '3 3', sw: 1.2, rx: 4 }) + A.text(300, 194, 'Discard', { size: 7.5, fill: '#cfd8ff' });
    board += A.text(282, 48, 'Clue tokens', { size: 7.5, fill: '#cfd8ff' });
    // Clue tokens: 8 slots; tokens 0..6 always available, token 7 moves between "available" and "spent".
    const slot = (i) => [258 + (i % 4) * 16, 62 + Math.floor(i / 4) * 16];
    let toks = '';
    const clue = this.icons.clue.draw(A);
    for (let i = 0; i < 7; i++) { const [x, y] = slot(i); toks += A.use(clue, x - 8, y - 8, 16); }
    board += toks + fuses + A.text(282, 104, 'Spent', { size: 7.5, fill: '#cfd8ff' });
    const tok = (spent) => { const [x, y] = spent ? [282, 118] : slot(7); return A.k('tok', spent ? A.circle(x, y, 6.5, '#2a2f55', { stroke: '#cfd8ff', sw: 1 }) : A.use(clue, x - 8, y - 8, 16)); };
    // Hands.
    const mia = [['r', 3], ['b', 1], ['y', 3], ['g', 4]];
    const ben = [['r', 5], ['b', 4], ['w', 3], ['g', 4]];
    const miaHand = (skip) => mia.map(([c, n], i) => i === skip ? '' : A.k('m' + i, face(hx(i), MY, c, n))).join('');
    const benHand = (skip) => ben.map(([c, n], i) => i === skip ? '' : A.k('b' + i, face(hx(i), BY, c, n))).join('');
    const chip = (i) => A.k('chip' + i, A.circle(hx(i) + W / 2, MY + H + 9, 6, '#fff7d6', { stroke: C.ink, sw: 1 }) + A.text(hx(i) + W / 2, MY + H + 9, '3', { size: 8, weight: 800 }));
    const bubble = A.k('clue', A.bubble(2, 50, 62, 26, '“These are 3s”', { size: 7.5 }));
    const newMia = A.k('mnew', face(hx(0), MY, 'b', 2));
    return [
      { step: 0, say: 'The red pile is on **2**. Lee spends a {=clue}, points at 2 of Mia’s cards and says: “These two are **3s**.”',
        svg: board + miaHand() + benHand() + tok(true) + bubble + chip(0) + chip(2) + A.glow(hx(0) + W / 2, MY + H / 2, 22, 'g1') + A.glow(hx(2) + W / 2, MY + H / 2, 22, 'g2') },
      { step: 2, say: 'Mia can’t see her cards, but she knows the red pile needs a 3 and that Lee clued now for a reason. She **plays** her leftmost 3.',
        svg: board + miaHand(0) + benHand() + tok(true) + chip(2) + A.k('m0', face(px(0), PY - 4, 'r', 3)) + A.glow(px(0) + W / 2, PY + H / 2 - 4, 26, 'gp') },
      { step: 2, say: 'It’s the **red 3**: it goes on the red pile. Mia draws 1 card.',
        svg: board + miaHand(0) + benHand() + tok(true) + chip(2) + A.k('m0', face(px(0), PY - 4, 'r', 3)) + newMia },
      { step: 1, say: 'No clue has pointed at any of Ben’s cards, so no play is safe. He **discards** his oldest card: green 4.',
        svg: board + miaHand(0) + newMia + benHand(3) + tok(true) + chip(2) + A.k('m0', face(px(0), PY - 4, 'r', 3)) + A.k('b3', face(286, 146, 'g', 4)) + A.glow(300, 166, 18, 'gd') },
      { step: 1, say: 'Discarding regains **1** {=clue}; Ben draws 1 card. Lee can give a clue again.',
        svg: board + miaHand(0) + newMia + benHand(3) + tok(false) + chip(2) + A.k('m0', face(px(0), PY - 4, 'r', 3)) + A.k('b3', face(286, 146, 'g', 4)) + A.k('bnew', face(hx(3), BY, 'y', 2)) + A.glow(slot(7)[0], slot(7)[1], 11, 'gt') },
    ];
  },

  art(A) {
    const C = A.C;
    const F = { r: '#e0473c', y: '#f2c230', g: '#3fae5a', b: '#3d7fe0', w: '#f4f1ea' };
    let o = A.bg('#1a1d3a');
    // sparkles / bursts
    const burst = (cx, cy, r, c) => { let s = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += A.line(cx + r * 0.35 * Math.cos(a), cy + r * 0.35 * Math.sin(a), cx + r * Math.cos(a), cy + r * Math.sin(a), { stroke: c, sw: 1.6, opacity: 0.7 }); } return s; };
    o += burst(28, 100, 15, F.y) + burst(298, 72, 13, F.r) + burst(40, 145, 10, F.b);
    // teammate's hand (visible faces)
    const hand = [['r', 3], ['b', 1], ['y', 5], ['g', 2]];
    hand.forEach(([c, n], i) => { o += A.card(150 + i * 32, 10, 28, 40, F[c], { label: n, labelFill: c === 'w' || c === 'y' ? C.ink : C.white, size: 17 }); });
    // played piles
    const piles = [['r', 2], ['y', 1], ['g', 3], ['b', 4], ['w', 0]];
    piles.forEach(([c, n], i) => {
      const x = 54 + i * 38, y = 70;
      if (n === 0) { o += A.rect(x, y, 30, 44, 'none', { stroke: F.w, dash: '3 3', sw: 1.2, rx: 4 }); return; }
      for (let k = 0; k < Math.min(n, 3); k++) o += A.rect(x + 1, y - 2 * k + 2 * (Math.min(n, 3) - 1), 30, 44, F[c], { rx: 4, sw: 1 });
      o += A.card(x, y - 4, 30, 44, F[c], { label: n, labelFill: c === 'y' ? C.ink : C.white, size: 18 });
    });
    // your hand: backs facing you
    for (let i = 0; i < 4; i++) {
      o += A.card(98 + i * 32, 140, 28, 40, '#3b3f6e', { label: '?', size: 16, labelFill: '#b8bce8' });
    }
    // tokens
    const ic = this.icons;
    for (let i = 0; i < 8; i++) { const x = 272 + (i % 2) * 18, y = 138 + Math.floor(i / 2) * 15; o += i < 5 ? A.use(ic.clue.draw(A), x - 8, y - 8, 16) : A.circle(x, y, 6.5, '#2a2f55', { stroke: '#cfd8ff', sw: 1 }); }
    for (let i = 0; i < 3; i++) o += i < 1 ? A.circle(32 + i * 18, 178, 7, '#3a2020', { stroke: '#ffd1c8', sw: 1 }) : A.use(ic.fuse.draw(A), 32 + i * 18 - 8.5, 169.5, 17);
    o += A.note(151, 44, 70, 28, 'You see teammates’ cards');
    o += A.note(158, 160, 248, 186, 'Your hand faces away');
    o += A.note(90, 108, 130, 128, 'Played piles, 1 → 5');
    o += A.note(281, 138, 282, 116, 'Clue tokens');
    return o;
  },
});
