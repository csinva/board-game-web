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

  goal: { big: 'Finish all tasks', text: 'Each mission deals out **task cards**. You win when each task card is taken in a trick by the player who holds that task, in any required order.' },

  turn: {
    type: 'round',
    intro: 'Play one trick at a time. The commander (holder of rocket 4) leads the first:',
    outro: 'The trick winner leads the next trick.',
    steps: [
      { verb: 'Signal?', text: 'Before the trick (never during one), anyone may place one card face up with their **one** {comm} for the mission (see below). That card stays in their hand and is played later as normal.' },
      { verb: 'Lead', text: 'The leader plays any card face up, rockets included. Its colour is the suit for this trick.' },
      { verb: 'Follow', text: 'Clockwise, each player plays 1 card and **must follow suit** if able; if not, anything, including a {=rocket}.' },
      { verb: 'Win trick', text: 'Highest {=rocket} wins; if none, the highest card of the led colour. Check whether a task card was taken.' },
    ],
  },

  tension: 'You know which card a teammate must win, but not what anyone holds, so every card you play is a bet on their hands.',

  structure: [
    { label: 'Mission setup', text: 'Deal all 40 cards. Reveal the mission’s {task}s; players pick them one at a time, commander first. Place any {order}s; {=comm} green side up. Optional **distress signal**: everyone passes 1 non-rocket card to the same-side neighbour.' },
    { label: 'Tricks', repeat: 'until tasks are done', text: 'Signal? → lead → follow suit → highest {=rocket}, else highest of the led colour, wins. The winner leads next.' },
    { label: 'Mission end', text: 'Success the moment every task is done, even with cards left. Fail the moment a task is taken by the wrong player or out of order.' },
    { label: 'Next mission', repeat: '50 missions', text: 'On success, write the attempts in the logbook (+1 if you used the distress signal) and go on; on failure, redeal, re-pick tasks and retry.' },
  ],

  end: {
    trigger: 'every task is done, or a task fails',
    detail: 'Play missions in logbook order; retry a failed one as often as needed.',
    results: [
      { side: 'Mission success', text: 'when every task card has been won by its owner, in the order its tokens demand.' },
      { side: 'Mission failed', text: 'the moment a task card is won by the **wrong player**, or a task is done out of order.' },
    ],
  },

  ref: {
    title: 'Deck and communication',
    rows: [
      ['Deck', '{=pink}{=blue}{=green}{=yellow} 1–9, {=rocket} 1–4 (trumps)'],
      ['{=sigtop} Top', 'my **highest** card of that colour'],
      ['{=sigmid} Middle', 'my **only** card of that colour'],
      ['{=sigbot} Bottom', 'my **lowest** card of that colour'],
      ['When', 'before a trick, once per mission; only if one of the 3 is true'],
      ['Not allowed', 'showing a {=rocket}, or spoken hints'],
    ],
  },

  example: 'Ana holds the task **7{=pink}**. Before the trick, Cleo shows her 7{=pink} with the token in the middle: her **only** pink. Ben leads 3{=pink}; Cleo must follow with the 7, and Ana plays 9{=pink} to win her task. Dev has no pink; a {=rocket} would steal the 7 and fail the mission, so he discards 2{=green}.',

  setup: [
    'Shuffle the 40 cards ({=pink}{=blue}{=green}{=yellow} 1–9, {=rocket} 1–4) and deal all; with 3 players one person gets an extra card. 2 players: use the rulebook’s JARVIS variant.',
    'Open the logbook to the next mission, apply its special rules, and reveal that many {task}s; the commander (rocket 4) picks first, then clockwise.',
    'Add any {order}s the mission lists; everyone takes a {comm}, green side up.',
  ],

  terms: [
    ['Trick', 'One card from each player; the winner takes all.'],
    ['{=task} Task card', 'Names one card you must win in a trick.'],
    ['{=rocket} Rocket', 'Black trump suit, 1–4. Any rocket beats any coloured card.'],
    ['Commander', 'Holder of rocket 4. Picks the first task and leads trick 1.'],
    ['{=order} Task tokens', '1–5: done in that order among the tasks; >, >>, >>>, >>>>: in arrow order; Ω: last of all.'],
  ],

  gotchas: [
    'You **must follow suit** if you can; a rocket is legal only when you’re out of the led colour (or rockets were led).',
    'Communicating is **once per mission**, only between tricks, and must be true when given; the shown card stays out and is played later as normal.',
    'Winning a task card that **isn’t yours** fails the mission at once.',
  ],

  tips: [
    'Long colours are power: lead one repeatedly to draw out others’ cards.',
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
      { step: 0, say: 'Ana’s task: win the trick holding **7{=pink}**. Nobody may say what they hold.',
        svg: board + task() + ben() + ana() + dev() + A.glow(264, 160, 17) },
      { step: 0, say: 'Before the trick, Cleo signals: 7{=pink} face up, {=comm} in the **middle** = “my **only** pink”.',
        svg: board + task() + ben() + ana() + dev() + cleoShown + A.glow(185, 23, 22) },
      { step: 1, say: 'Ben **leads 3{=pink}**. Everyone must follow pink.',
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
    o += A.note(176, 72, 214, 22, 'Must follow led colour');
    o += A.note(98, 134, 48, 150, 'Rockets trump');
    return o;
  },
});
