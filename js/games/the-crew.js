defineGame({
  id: 'the-crew',
  name: 'The Crew: The Quest for Planet Nine',
  year: 2019,
  designer: 'Thomas Sing',
  family: 'coop',
  players: [2, 5], best: '4',
  time: [20, 20],
  age: 10,
  mechanics: ['trick-taking', 'cooperative', 'limited-communication', 'hand-management', 'campaign'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 1, talk: 2, planning: 3 },
  color: '#2c3a6b',

  // Components drawn once, used inline in text ({rocket}, 7{=pink}) and in the art / walkthrough.
  icons: (() => {
    const suit = (name, fill) => ({ name, draw: A => A.rect(4, 1, 16, 22, fill, { rx: 2.5, sw: 1.3 }) + A.rect(6.5, 3.5, 11, 17, 'none', { stroke: '#ffffff', sw: 1, rx: 1.5, opacity: 0.75 }) });
    const sig = (name, y) => ({ name, draw: A => A.rect(6, 1, 12, 22, '#3b7fd1', { rx: 2.5, sw: 1.3 }) + A.circle(12, y, 3.8, '#52c46a', { sw: 1.1 }) });
    return {
      pink: suit('pink', '#e0679a'), blue: suit('blue', '#3b7fd1'), green: suit('green', '#3e9e5a'), yellow: suit('yellow', '#e8c43a'),
      rocket: { name: 'rocket', draw: A => A.rect(4, 1, 16, 22, '#2b2b2b', { rx: 2.5, sw: 1.3 }) + A.poly([[9, 12], [6.8, 17.5], [9.3, 15.6]], '#ff8a3d', { sw: 0 }) + A.poly([[15, 12], [17.2, 17.5], [14.7, 15.6]], '#ff8a3d', { sw: 0 }) + A.poly([[10.2, 15.6], [13.8, 15.6], [12, 20.5]], '#ffc23d', { sw: 0 }) + A.path('M12 4 q3.8 3.6 3 11.6 h-6 q-0.8 -8 3 -11.6z', { fill: '#fff', sw: 0.8 }) + A.circle(12, 9.6, 1.4, '#3b7fd1', { sw: 0 }) },
      task: { name: 'task card', draw: A => A.rect(2, 5, 20, 14, '#f4ede0', { rx: 2, sw: 1.3 }) + A.path('M7 12 l3.2 3.2 l6.6 -6.6', { stroke: '#3e9e5a', sw: 2.3 }) },
      comm: { name: 'communication token', draw: A => A.circle(12, 12, 9.5, '#52c46a', { sw: 1.3 }) + A.circle(12, 12, 1.9, '#fff', { sw: 0 }) + A.path('M8.6 8.4 a5 5 0 0 0 0 7.2 M15.4 8.4 a5 5 0 0 1 0 7.2', { stroke: '#fff', sw: 1.5 }) },
      sigtop: sig('token on top', 5.5), sigmid: sig('token in middle', 12), sigbot: sig('token on bottom', 18.5),
      order: { name: 'task token', draw: A => A.circle(12, 12, 9.5, '#f4ede0', { sw: 1.3 }) + A.text(12, 12.5, '1', { size: 12, weight: 800 }) },
    };
  })(),

  pitch: 'Cooperative trick-taking: get each task card won by the right player, with almost no talk about your hand.',

  goal: { big: 'Finish all tasks', text: 'Each mission hands out **task cards**; each names one playing card. You win the mission when, for every task card, its owner wins the trick containing the named card, in the order any task tokens require.' },

  turn: {
    type: 'round',
    intro: 'Play one trick at a time. The commander (the player holding rocket 4) leads the first trick:',
    outro: 'The trick winner leads the next trick.',
    steps: [
      { verb: 'Signal?', text: 'Before the trick starts (never during one), any player who has not yet used their {comm} this mission may place 1 card from their hand face up in front of them and put the token on it (top, middle or bottom; see the table). That card still counts as part of their hand and is played later as normal.' },
      { verb: 'Lead', text: 'The leader plays any 1 card face up, a {=rocket} included. Its colour (or rockets) is the **led suit** for this trick.' },
      { verb: 'Follow', text: 'Going clockwise, each other player plays 1 card. You **must play the led suit** if you have it; if you have none, play any card, a {=rocket} included.' },
      { verb: 'Win trick', text: 'If any {=rocket} was played, the highest rocket wins; otherwise the highest card of the led suit wins. The winner takes all the cards. If one of them is named on a task card, check that its owner won it.' },
    ],
  },

  tension: 'You know which card a teammate must win, but not what anyone holds, so every card you play is a bet on their hands.',

  structure: [
    { label: 'Mission setup', text: 'Deal all 40 cards. Reveal the mission’s {task}s; starting with the commander and going clockwise, each player takes 1 until all are taken. Place any {order}s the mission lists; everyone puts their {=comm} green side up. Optional **distress signal**, after all tasks are taken and before anyone communicates or trick 1 starts: the team picks left or right, and everyone passes 1 non-rocket card to that neighbour.' },
    { label: 'Tricks', repeat: 'until tasks are done', text: 'Signal? → lead → follow suit → the highest {=rocket} wins, or if none, the highest card of the led suit. The winner leads the next trick.' },
    { label: 'Mission end', text: 'Success the moment every task is done, even if players still hold cards. Failure the moment a task’s card is won by the wrong player, or a task is done out of order.' },
    { label: 'Next mission', repeat: '50 missions', text: 'On success, write in the logbook how many attempts it took (add 1 if you used the distress signal) and go on to the next mission. On failure, reshuffle, deal again, hand out the tasks again and retry.' },
  ],

  end: {
    trigger: 'every task is done, or a task fails',
    detail: 'Play missions in logbook order; retry a failed one as often as needed.',
    results: [
      { side: 'Mission success', text: 'when, for every task card, its owner has won the named card, in the order the task tokens require.' },
      { side: 'Mission failed', text: 'the moment a task’s named card is won by the **wrong player**, or a task is done out of order.' },
    ],
  },

  ref: {
    title: 'Deck and communication',
    rows: [
      ['Deck', '{=pink}{=blue}{=green}{=yellow} 1–9, {=rocket} 1–4 (trumps)'],
      ['{=sigtop} Top', 'this is my **highest** card of that colour'],
      ['{=sigmid} Middle', 'this is my **only** card of that colour'],
      ['{=sigbot} Bottom', 'this is my **lowest** card of that colour'],
      ['When', 'before a trick, at most once per player per mission; only if the token’s statement is true'],
      ['Not allowed', 'signalling with a {=rocket}, or any spoken hint about your hand'],
    ],
  },

  example: 'Ana holds the task card **7{=pink}**. Before the trick, Cleo places her 7{=pink} face up with the token in the middle: it is her **only** pink. Ben leads 3{=pink}; Cleo must follow with the 7, and Ana plays 9{=pink} to win the trick and her task. Dev has no pink; if he played a {=rocket}, Dev would win the 7 and the mission would fail, so he discards 2{=green}.',

  setup: [
    'Shuffle the 40 cards ({=pink}{=blue}{=green}{=yellow} 1–9, {=rocket} 1–4) and deal all; with 3 players one person gets an extra card. 2 players: use the rulebook’s JARVIS variant.',
    'Open the logbook to the next mission and apply its special rules. Reveal as many {task}s as it lists; the commander (the player holding rocket 4) takes 1 first, then the others take 1 each going clockwise, around again until all are taken.',
    'Put any {order}s the mission lists on the task cards; everyone takes a {comm} and places it green side up.',
  ],

  terms: [
    ['Trick', 'One card from each player, played clockwise; the winner takes all of them.'],
    ['{=task} Task card', 'Names one playing card. The player who took the task card must win the trick containing that card.'],
    ['{=rocket} Rocket', 'Black trump suit, 1–4. Any rocket beats any coloured card.'],
    ['Commander', 'Holder of rocket 4. Picks the first task and leads trick 1.'],
    ['{=order} Task tokens', '1–5: counted among **all** tasks: the task marked 1 must be the 1st task done, 2 the 2nd, and so on. >, >>, >>>, >>>>: only their order among each other counts (> before >>, and so on); other tasks may be done before, between or after them. Ω: that task must be the last task done.'],
  ],

  gotchas: [
    'You **must follow suit** if you can; you may play a rocket only when you have no card of the led suit (or rockets were led).',
    'Each player may communicate **once per mission**, only before a trick starts (trick 1 included, once all tasks are taken), never during a trick, and the statement must be true when given; the shown card stays face up in front of you until you play it.',
    'Winning a trick that contains **another player’s** task card fails the mission at once.',
  ],

  tips: [
    'A colour you hold many cards of is strong: lead it repeatedly to draw out others’ cards.',
    'Low cards matter as much as high: a 1 loses a trick on purpose.',
    'Signal **early**: a trick-1 signal shapes every later play.',
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
    const cleoShown = A.k('cleo7', face(170, 6, col.p, 7)) + A.k('tok', A.use(this.icons.comm.draw(A), 188, 16, 14));
    const cleoPlayed = A.k('cleo7', face(...T.cleo, col.p, 7));
    const ana = (t) => A.k('ana9', t ? face(...T.ana, col.p, 9) : A.card(282, 100, 16, 22, col.back, { label: '✦', size: 7 }));
    const dev = (t) => A.k('dev2', t ? face(...T.dev, col.g, 2) : A.card(212, 172, 16, 22, col.back, { label: '✦', size: 7 }));
    const won = (k, f, n, i) => A.k(k, face(238 + i * 4, 62 + i * 3, f, n));
    return [
      { step: 0, say: 'Ana’s task: she must win the trick that contains **7{=pink}**. Nobody may say what they hold.',
        svg: board + task() + ben() + ana() + dev() + A.glow(264, 160, 17) },
      { step: 0, say: 'Before the trick, Cleo signals: 7{=pink} face up, {=comm} in the **middle** = “my **only** pink”.',
        svg: board + task() + ben() + ana() + dev() + cleoShown + A.glow(185, 23, 22) },
      { step: 1, say: 'Ben **leads 3{=pink}**. Everyone who has a pink card must play pink.',
        svg: board + task() + ben(1) + ana() + dev() + cleoShown },
      { step: 2, say: 'Cleo **must follow** with her only pink, the 7. Ana plays **9{=pink}**, highest so far.',
        svg: board + task() + ben(1) + cleoPlayed + ana(1) + dev() + A.glow(190, 103, 22) },
      { step: 2, say: 'Dev has no pink. A {=rocket} would win the 7 and fail the mission, so he discards **2{=green}**.',
        svg: board + task() + ben(1) + cleoPlayed + ana(1) + dev(1) },
      { step: 3, say: 'No rockets, so the highest pink wins: **Ana’s 9**. She takes the 7{=pink}: task done.',
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
    const ic = this.icons;
    o += A.use(ic.order.draw(A), 56, 90, 16);
    // communication token on a revealed card (right)
    o += A.card(254, 92, 26, 38, col.b, { label: 9, size: 15 });
    o += A.use(ic.comm.draw(A), 260, 89, 14);
    // hand fan at bottom
    o += A.fan(146, 176, 6, 24, 34, [col.y, col.b, col.g, col.r, col.p, col.y], { labels: [5, 2, 8, 4, 1, 6], size: 13, spread: 7, dx: 18 });
    // a rocket (trump) card, same drawing as the {rocket} icon
    o += A.use(ic.rocket.draw(A), 92.5, 118.6, 33);
    o += A.note(45, 96, 64, 22, 'Task: Ana wins pink 7');
    o += A.note(267, 96, 262, 154, 'Signal: highest blue');
    o += A.note(176, 72, 214, 22, 'Must follow the led suit');
    o += A.note(98, 134, 48, 150, 'Rockets trump');
    return o;
  },
});
