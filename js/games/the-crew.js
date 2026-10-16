defineGame({
  id: 'the-crew',
  name: 'The Crew: The Quest for Planet Nine',
  year: 2019,
  designer: 'Thomas Sing',
  family: 'coop',
  players: [2, 5], best: '4',
  time: [15, 30],
  age: 10,
  mechanics: ['trick-taking', 'cooperative', 'limited-communication', 'hand-management', 'campaign'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 1, talk: 2, planning: 3 },
  color: '#2c3a6b',

  pitch: 'A trick-taking game where you all win or lose together: make sure the right person takes the right card, without being allowed to say what you hold.',
  theme: 'You are astronauts on a mission to find a ninth planet, completing tasks in silence across 50 short missions.',

  goal: { big: 'Finish all tasks', text: 'Each mission deals out **task cards**. The mission succeeds when every player has won the trick containing each card on their tasks, in any required order.' },

  turn: {
    type: 'round',
    intro: 'The whole table plays one trick at a time. The commander (holder of rocket 4) leads the first trick:',
    outro: 'The trick winner leads the next trick.',
    steps: [
      { verb: 'Signal?', text: 'Before the trick starts, anyone may use their **one** communication token for the mission (see below).' },
      { verb: 'Lead', text: 'The leader plays any card face up. Its colour is the suit for this trick.' },
      { verb: 'Follow', text: 'Clockwise, everyone plays one card and **must follow suit** if they can; if not, they play anything, including a rocket.' },
      { verb: 'Win trick', text: 'The highest **rocket** wins; if there are none, the highest card of the led colour wins. Check whether a task card was taken.' },
    ],
  },

  tension: 'You know exactly which card your teammate needs to win, but you can only guess what they hold, so every card you play is a silent bet on their hand.',

  flow: [
    { label: 'Brief', items: ['Read the mission', 'Draw task cards', 'Commander picks first'] },
    { label: 'Play tricks', items: ['Follow suit', 'Feed tasks to owners', 'Use your one signal'] },
    { label: 'Debrief', items: ['Success: next mission', 'Fail: retry', 'Log your attempts'] },
  ],

  end: {
    trigger: 'every task is fulfilled, or a task is ruined',
    detail: 'Missions take 5–10 minutes. Play them in order through the logbook; retry a failed one as often as you like.',
    results: [
      { side: 'Mission success', text: 'when every task card has been won by the player who holds that task, in the order its tokens demand.' },
      { side: 'Mission failed', text: 'the moment a task card is won by the **wrong player**, or a task is completed out of order.' },
    ],
  },

  ref: {
    title: 'Communication token',
    rows: [
      ['Token at top', 'this is my highest card of that colour'],
      ['Token in middle', 'this is my only card of that colour'],
      ['Token at bottom', 'this is my lowest card of that colour'],
      ['When', 'only before a trick starts, never mid-trick'],
      ['Not allowed', 'rockets, or any spoken hints'],
    ],
  },

  example: 'Ana holds the task **pink 7**. Before the trick, Cleo signals her pink 7 with the token in the middle: it is her **only** pink. Ben leads pink 3, so Cleo must follow with the 7, Ana plays pink 9 and wins the task. Dev has no pink and could trump with a rocket, which would steal the 7 and fail the mission, so he discards a green 2 instead.',

  setup: [
    'Shuffle the 40 cards (four colours 1–9 plus rockets 1–4) and deal them all out; with 3 players one person gets an extra card.',
    'Open the logbook to the next mission and draw that many task cards face up; the commander (rocket 4) picks one first, then clockwise.',
    'Place any order tokens the mission asks for on the task cards, and give everyone a communication token, green side up.',
  ],

  terms: [
    ['Trick', 'One card from each player; the winner takes them all.'],
    ['Task card', 'A small card naming one playing card that you must win in a trick.'],
    ['Rocket', 'The black trump suit (1–4). Any rocket beats any coloured card.'],
    ['Commander', 'Whoever holds rocket 4. Leads the first trick and picks the first task.'],
    ['Order tokens', '1, 2, 3… or > >> marks that force tasks to be done in a set order.'],
  ],

  gotchas: [
    'You **must follow suit** if you can. Playing a rocket is only allowed when you are out of the led colour (or when rockets are led).',
    'Communicating is **once per mission** each, only between tricks, and the card you show must still be true; you play it later like normal.',
    'Winning a task card that is **not yours** fails the mission instantly, even if the trick held other useful cards.',
  ],

  tips: [
    'Long colours are power: if you hold many of a colour, you can lead it repeatedly to draw out other players’ cards.',
    'Low cards are as valuable as high ones; a 1 is a safe way to lose a trick on purpose.',
    'Signal **early**. A signal used on trick 1 shapes every decision after it.',
  ],

  walk(A) {
    const C = A.C;
    const col = { p: '#e0679a', b: '#3b7fd1', g: '#3e9e5a', y: '#e8c43a', back: '#3c4c86' };
    const cw = 24, ch = 34;
    let board = A.bg('#141b33');
    for (const [x, y] of [[14, 12], [90, 8], [250, 30], [306, 14], [12, 150], [308, 160], [60, 186], [270, 186]]) board += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.7 });
    board += `<ellipse cx="160" cy="102" rx="104" ry="62" fill="#24315c" stroke="#3c4c86" stroke-width="2"/>`;
    const backs = (x, y, n, vert) => { let s = ''; for (let i = 0; i < n; i++) s += A.card(vert ? x : x + i * 9, vert ? y + i * 9 : y, 16, 22, col.back, { label: '✦', size: 7 }); return s; };
    // Seats clockwise: Ben (left) → Cleo (top) → Ana (right) → Dev (bottom).
    board += A.tag(30, 52, 'Ben') + backs(22, 64, 3, true);
    board += A.tag(112, 14, 'Cleo') + backs(132, 4, 3);
    board += A.tag(290, 52, 'Ana', { fill: '#b03a6a' }) + backs(282, 64, 3, true);
    board += A.tag(110, 186, 'Dev') + backs(176, 172, 4);
    // Ana's task card.
    const task = (done) => A.k('task', A.card(250, 150, 28, 22, col.p, { label: 7, size: 11 }) + A.text(264, 180, 'Ana’s task', { size: 6, fill: '#fff' }) +
      (done ? A.circle(276, 152, 6, '#52c46a', { stroke: '#fff', sw: 1.2 }) + A.text(276, 152.5, '✓', { size: 7, fill: '#fff', weight: 800 }) : ''));
    const face = (x, y, f, n) => A.card(x, y, cw, ch, f, { label: n, size: 14, labelFill: f === col.y ? C.ink : C.white });
    const T = { ben: [118, 86], cleo: [148, 58], ana: [178, 86], dev: [148, 114] };
    const ben = (t) => A.k('ben3', t ? face(...T.ben, col.p, 3) : A.card(22, 91, 16, 22, col.back, { label: '✦', size: 7 }));
    const cleoShown = A.k('cleo7', face(170, 6, col.p, 7)) + A.k('tok', A.circle(195, 23, 5.5, '#52c46a', { stroke: '#fff', sw: 1.2 }));
    const cleoPlayed = A.k('cleo7', face(...T.cleo, col.p, 7));
    const ana = (t) => A.k('ana9', t ? face(...T.ana, col.p, 9) : A.card(282, 100, 16, 22, col.back, { label: '✦', size: 7 }));
    const dev = (t) => A.k('dev2', t ? face(...T.dev, col.g, 2) : A.card(212, 172, 16, 22, col.back, { label: '✦', size: 7 }));
    const won = (k, f, n, i) => A.k(k, face(238 + i * 4, 62 + i * 3, f, n));
    return [
      { step: 0, say: 'Ana’s task is to win the trick holding the **pink 7**. Nobody may say what they hold.',
        svg: board + task() + ben() + ana() + dev() + A.glow(264, 160, 17) },
      { step: 0, say: 'Before the trick, Cleo uses her one signal: pink 7 face up, token in the **middle** = “my **only** pink”.',
        svg: board + task() + ben() + ana() + dev() + cleoShown + A.glow(185, 23, 22) },
      { step: 1, say: 'Ben **leads pink 3**. Pink is now the suit everyone must follow.',
        svg: board + task() + ben(1) + ana() + dev() + cleoShown },
      { step: 2, say: 'Cleo holds a pink, so she **must follow**: out comes her only pink, the 7. Ana plays **pink 9**, the highest so far.',
        svg: board + task() + ben(1) + cleoPlayed + ana(1) + dev() + A.glow(190, 103, 22) },
      { step: 2, say: 'Dev has no pink. A rocket would win the 7 and fail the mission, so he safely discards **green 2**.',
        svg: board + task() + ben(1) + cleoPlayed + ana(1) + dev(1) },
      { step: 3, say: 'No rockets, so the highest pink wins: **Ana’s 9**. She takes the trick with the pink 7: task done!',
        svg: board + task(true) + won('ben3', col.p, 3, 0) + won('cleo7', col.p, 7, 1) + won('dev2', col.g, 2, 2) + won('ana9', col.p, 9, 3) + A.glow(264, 160, 17) },
    ];
  },

  art(A) {
    const C = A.C;
    const col = { p: '#e0679a', b: '#3b7fd1', g: '#3e9e5a', y: '#e8c43a', r: '#2b2b2b' };
    let o = A.bg('#141b33');
    // starfield
    const stars = [[14, 12], [48, 30], [90, 8], [140, 20], [200, 10], [250, 26], [300, 14], [22, 70], [298, 66], [10, 130], [306, 120], [60, 100], [270, 96], [180, 40], [118, 44]];
    for (const [x, y] of stars) o += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.7 });
    // distant planet
    o += A.circle(292, 32, 16, '#6c5bb5', { sw: 0, opacity: 0.85 }) + A.path('M270 38 Q292 26 314 30', { stroke: '#b9b0e6', sw: 1.4, opacity: 0.8 });
    // table felt
    o += `<ellipse cx="160" cy="98" rx="118" ry="64" fill="#24315c" stroke="#3c4c86" stroke-width="2"/>`;
    // current trick: 4 cards around centre
    const cw = 26, ch = 38;
    o += A.card(118, 54, cw, ch, col.p, { label: 3, size: 15 });            // Ben led pink 3
    o += A.card(150, 46, cw, ch, col.p, { label: 7, size: 15 });            // Cleo's pink 7
    o += A.card(182, 54, cw, ch, col.p, { label: 9, size: 15 });            // Ana pink 9
    o += A.card(150, 98, cw, ch, col.g, { label: 2, size: 15 });            // Dev discards green 2
    // task card + order token (left)
    o += A.card(30, 96, 30, 22, col.p, { label: 7, size: 12 });
    o += A.circle(64, 98, 7, '#f4ede0', { sw: 1.1 }) + A.text(64, 98.5, '1', { size: 8, weight: 800 });
    // communication token on a revealed card (right)
    o += A.card(254, 92, 26, 38, col.b, { label: 9, size: 15 });
    o += A.circle(267, 96, 6, '#52c46a', { stroke: '#fff', sw: 1.2 });
    // hand fan at bottom
    o += A.fan(146, 176, 6, 24, 34, [col.y, col.b, col.g, col.r, col.p, col.y], { labels: [5, 2, 8, 4, 1, 6], size: 13, spread: 7, dx: 18 });
    // rocket icon on the black card in the fan is implied by colour; add one tiny rocket at the trump pile
    o += A.card(98, 120, 22, 32, col.r, { label: 1, size: 12 });
    o += A.path('M109 138 l-3 6 h6 z', { fill: '#ff8a3d', sw: 0 });
    o += A.note(45, 96, 64, 22, 'Task: Ana wins pink 7');
    o += A.note(267, 96, 262, 154, 'Signal: highest blue');
    o += A.note(176, 72, 214, 22, 'Must follow the led colour');
    o += A.note(98, 134, 48, 150, 'Rockets trump');
    return o;
  },
});
