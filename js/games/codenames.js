defineGame({
  id: 'codenames',
  name: 'Codenames',
  year: 2015,
  designer: 'Vlaada Chvátil',
  family: 'party',
  players: [2, 8], best: '6–8',
  time: [15, 15],
  age: 10,
  mechanics: ['word', 'team', 'limited-communication', 'party', 'deduction'],
  profile: { complexity: 1, luck: 2, interaction: 4, conflict: 2, talk: 4, planning: 2 },
  color: '#c8423b',

  // Cover cards (laid on a word once it is guessed) and the spymasters' key card.
  icons: (() => {
    const KEY = ['nrrnb', 'bnbrr', 'rnbbr', 'rbrnk', 'nbnbr'], KEYC = { r: '#e8574f', b: '#2f6db5', n: '#ead9b0', k: '#141414' };
    const cover = (name, fill, fig) => ({ name, draw: A => A.rect(1.5, 5, 21, 14, fill, { rx: 2, sw: 1.3 }) + A.person(12, 11.5, 11, fig, { face: fig }) });
    return {
      red: cover('red agent', '#c8423b', '#f0b4ad'),
      blue: cover('blue agent', '#2f6db5', '#a9c4e8'),
      bystander: cover('bystander', '#d9c79c', '#a8946a'),
      assassin: cover('assassin', '#1f1f1f', '#8c877f'),
      key: { name: 'key card', draw: A => A.rect(2, 2, 20, 20, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.grid(4.5, 4.5, 5, 5, 3, (i, j) => KEYC[KEY[j][i]], { sw: 0.5 }) },
    };
  })(),

  pitch: 'Spymasters give one-word clues linking several grid words; teams race to touch all their agents and avoid the assassin.',

  goal: { big: 'Find your agents', text: 'Be the first team to reveal **all your agents**: 9 for the starting team, 8 for the other.' },

  turn: {
    type: 'round',
    intro: 'Teams alternate. On your team’s turn:',
    steps: [
      { verb: 'Clue', text: 'Your spymaster says **one word and one number**, e.g. “Ocean: 2”. No gestures or other hints.' },
      { verb: 'Guess', text: 'Operatives discuss and touch one word. The spymaster covers it: {red}, {blue}, {bystander} or {assassin}.' },
      { verb: 'Continue', text: 'Your agent: guess again, up to **number + 1** guesses; you may stop after any correct guess. Anything else ends the turn.' },
    ],
    outro: 'Other team’s turn',
  },

  tension: 'A clue linking more words gets you ahead faster, but each stretch makes a wrong card, or the assassin, likelier.',

  structure: [
    { label: 'Setup', text: '25 word cards in a 5×5 grid. Both spymasters see one secret {=key}.' },
    { label: 'Turns', repeat: 'teams alternate', text: 'Clue, then guesses until a miss, a stop, or number + 1 guesses.' },
    { label: 'Game end', text: 'A team’s last agent is covered: that team wins. The {=assassin} is touched: that team loses.' },
  ],

  end: {
    trigger: 'One team has all its agents covered, or someone touches the assassin',
    detail: 'An enemy agent you touch counts for them, so a team can win on the other team’s turn.',
    results: [
      { side: 'Win', text: 'when all your agents are covered.' },
      { side: 'Lose instantly', text: 'if your operatives touch the {=assassin}.' },
    ],
  },

  ref: {
    title: 'The 25 cards (key card)',
    rows: [
      ['{=red} {=blue} Agents', '9 for the starting team (the key card’s border colour), 8 for the other'],
      ['{bystander}', '7: touching one ends your turn'],
      ['{assassin}', '1: touching it loses the game'],
      ['Enemy agent', 'covered for the other team; ends your turn'],
    ],
  },

  example: 'Red’s spymaster Zoe says “**Ocean: 2**”, meaning SHARK and PORT. Her team touches SHARK: {=red}, so they continue. Then they touch BEACH: {=bystander}, so the turn ends with PORT still hidden.',

  setup: [
    'Split into two teams; each picks a **spymaster**. Spymasters sit together on one side.',
    'Lay out 25 word cards in a 5×5 grid.',
    'Put a random {key} in the stand; its border colour shows which team starts and has 9 agents.',
    '2–3 players: one team guesses and starts; on each enemy turn its spymaster covers 1 enemy agent of their choice. Lose if all enemy agents are covered first.',
  ],

  terms: [
    ['Spymaster', 'Sees the key card; gives clues, never guesses.'],
    ['Operatives', 'Everyone else; they guess from the clue.'],
    ['{=key} Key card', 'Secret map of which grid spot is red, blue, bystander or assassin.'],
    ['{=bystander} Bystander', 'Neutral card; touching it ends your turn.'],
  ],

  gotchas: [
    'The clue must be about **meaning** and can’t be any word visible on the table (or part of one). An illegal clue ends the turn, and the other spymaster covers one of their agents.',
    'You must make **at least one** guess. The “+1” lets you catch a word from an earlier clue.',
    'Clue numbers **0** and **unlimited** are legal: operatives may then guess with no limit.',
  ],

  tips: [
    'As spymaster, a safe 2 beats a risky 4. Check every clue against the assassin.',
    'As operatives, reason out loud so teammates catch mistakes.',
    'Spymasters: keep a poker face. Reactions are illegal clues.',
  ],

  walk(A) {
    const C = A.C, red = '#c8423b', blue = '#2f6db5', bys = '#d9c79c', tan = '#ead9b0';
    const words = [['PIANO', 'SHARK', 'MOON', 'BANK'], ['ICE', 'BEACH', 'RING', 'FORK'], ['LEMON', 'PORT', 'NIGHT', 'CAST'], ['ROSE', 'EGG', 'SPACE', 'TRUNK']];
    const key = ['brnr', 'bnrb', 'nrbk', 'rbnr'];
    const w = 46, h = 30, x0 = 8, y0 = 44;
    const cell = (i, j) => [x0 + i * (w + 5), y0 + j * (h + 5)];
    const ctr = (i, j) => { const [x, y] = cell(i, j); return [x + w / 2, y + h / 2]; };
    // Cover cards are the inline icons scaled to the word-card size.
    const cover = (x, y, t) => A.rect(x + 1.5, y + 2, w, h, 'rgba(0,0,0,.35)', { sw: 0, rx: 3 }) + A.use(this.icons[{ r: 'red', b: 'blue', n: 'bystander', k: 'assassin' }[t]].draw(A), x - 3.29, y - 10.95, 52.6);
    let board = A.bg('#3c3a44');
    words.forEach((row, j) => row.forEach((wd, i) => {
      const [x, y] = cell(i, j);
      board += A.rect(x + 1.5, y + 2, w, h, 'rgba(0,0,0,.35)', { sw: 0, rx: 3 }) + A.rect(x, y, w, h, tan, { rx: 3, sw: 1.2 });
      board += A.rect(x + 3, y + h - 13, w - 6, 10, C.white, { rx: 2, sw: 0.6 }) + A.text(x + w / 2, y + h - 8, wd, { size: 6, weight: 800, spacing: 0.3 });
    }));
    // Covered on earlier turns.
    board += cover(...cell(0, 1), 'b') + cover(...cell(0, 3), 'r');
    board += A.tag(58, 18, 'Red operatives', { fill: red });
    // Spymaster, key card, cover stacks.
    board += A.person(236, 66, 28, red, { face: '#e6c7a8' }) + A.tag(282, 66, 'Zoe', { fill: red });
    const kx = 236, ky = 92, ks = 10;
    board += A.rect(kx - 5, ky - 5, ks * 4 + 10, ks * 4 + 10, red, { rx: 4, sw: 1.4 });
    board += A.grid(kx, ky, 4, 4, ks, (i, j) => ({ r: red, b: blue, n: bys, k: '#141414' })[key[j][i]], { sw: 0.8 });
    board += A.text(298, 112, 'Key', { size: 8, fill: C.white }) + A.text(298, 121, 'card', { size: 8, fill: C.white });
    board += cover(222, 152, 'r') + cover(270, 152, 'n');
    board += A.text(245, 192, 'Red agents', { size: 7, fill: C.white }) + A.text(293, 192, 'Bystanders', { size: 7, fill: C.white });
    const clue = A.k('clue', A.bubble(222, 4, 92, 28, 'OCEAN: 2', { size: 12 }));
    const [sx, sy] = cell(1, 0), [bx, by] = cell(1, 1);
    const sharkCov = (on) => A.k('cov-shark', cover(...(on ? [sx, sy] : [222, 152]), 'r'));
    const beachCov = (on) => A.k('cov-beach', cover(...(on ? [bx, by] : [270, 152]), 'n'));
    return [
      { step: 0, say: 'Zoe checks the {key}: **SHARK** and **PORT** are red. She says “**Ocean: 2**”.',
        svg: board + clue + A.glow(kx + 20, ky + 20, 30, 'g-key') },
      { step: 1, say: 'Her team talks it over and touches **SHARK**.',
        svg: board + clue + sharkCov(false) + A.glow(...ctr(1, 0), 30, 'g-shark') },
      { step: 1, say: 'Zoe covers it with a {red}. Correct.',
        svg: board + clue + sharkCov(true) + beachCov(false) },
      { step: 2, say: 'A correct guess lets them continue (up to 2 + 1 = 3 guesses). They touch **BEACH**.',
        svg: board + clue + sharkCov(true) + beachCov(false) + A.glow(...ctr(1, 1), 30, 'g-beach') },
      { step: 2, say: 'BEACH is a {bystander}, so the turn ends. **PORT** stays hidden.',
        svg: board + clue + sharkCov(true) + beachCov(true) + A.glow(...ctr(1, 2), 30, 'g-port') },
      { step: 2, say: 'Blue’s spymaster gives a clue. Red can still get PORT later with a “+1” guess.',
        svg: board + sharkCov(true) + beachCov(true) + A.k('turn', A.tag(160, 18, 'Blue’s turn', { fill: blue })) },
    ];
  },

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
        const z = w * 24 / 21;
        o += A.rect(x + 1.5, y + 2, w, h, 'rgba(0,0,0,.35)', { sw: 0, rx: 3 }) + A.use(this.icons[{ r: 'red', b: 'blue', n: 'bystander' }[v]].draw(A), x - 1.5 * z / 24, y - 5 * z / 24 - (14 * z / 24 - h) / 2, z);
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
