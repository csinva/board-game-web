defineGame({
  id: 'avalon',
  name: 'The Resistance: Avalon',
  year: 2012,
  designer: 'Don Eskridge',
  family: 'hidden',
  players: [5, 10], best: '7–8',
  time: [30, 30],
  age: 13,
  mechanics: ['hidden-roles', 'voting', 'bluffing', 'deduction', 'team'],
  profile: { complexity: 2, luck: 1, interaction: 5, conflict: 3, talk: 5, planning: 2 },
  color: '#2c4f8a',

  icons: {
    success: { name: 'Success', draw: A => A.rect(4, 1, 16, 22, '#2f6db5', { rx: 2.5, sw: 1.3 }) + A.path('M7.5 12.5 l3 3.2 l6 -7', { stroke: '#fff', sw: 2.6 }) },
    fail: { name: 'Fail', draw: A => A.rect(4, 1, 16, 22, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.path('M8 8 l8 8 M16 8 l-8 8', { stroke: '#fff', sw: 2.6 }) },
    approve: { name: 'approve', draw: A => A.rect(2, 5, 20, 14, '#fff', { rx: 2.5, sw: 1.4 }) + A.path('M7.5 12 l3 3 l6 -6', { stroke: '#3c8d4f', sw: 2.4 }) },
    reject: { name: 'reject', draw: A => A.rect(2, 5, 20, 14, '#2b2b2b', { rx: 2.5, sw: 1.4 }) + A.path('M8.5 8.5 l7 7 M15.5 8.5 l-7 7', { stroke: '#f2e6cc', sw: 2.4 }) },
    team: { name: 'team token', draw: A => A.circle(12, 12, 9.5, '#d4a63a', { sw: 1.4 }) + A.circle(12, 12, 5.5, 'none', { stroke: '#a07a1f', sw: 1.2 }) },
    leader: { name: 'leader', draw: A => A.crown(12, 19, 20, '#d4a63a') },
    good: { name: 'loyal servant', draw: A => A.person(12, 10, 22, '#2f6db5', { face: '#e8c9a6' }) },
    evil: { name: 'minion', draw: A => A.person(12, 10, 22, '#c8423b', { face: '#e8c9a6' }) },
    merlin: { name: 'Merlin', draw: A => A.person(12, 11.5, 19, '#2f6db5', { face: '#e8c9a6' }) + A.poly([[5.5, 7], [18.5, 7], [12, -1]], '#5a3f9a', { sw: 1.1 }) + A.star(12, 3.6, 1.6, '#e2b33c', { sw: 0 }) },
    assassin: { name: 'Assassin', draw: A => A.person(11, 10, 22, '#c8423b', { face: '#e8c9a6' }) + A.line(19, 3, 22, 14, { stroke: '#c9ced6', sw: 2.4 }) + A.line(17, 13.5, 22.5, 12, { stroke: '#2b2b2b', sw: 1.8 }) },
  },

  pitch: 'Vote teams onto 5 quests while hidden evil players sabotage them; good wins 3 quests, evil fails 3 or finds Merlin.',

  goal: { big: '3 of 5 quests', text: 'Good wins by succeeding **3 quests**, unless the Assassin then names Merlin. Evil wins by failing 3 quests.' },

  turn: {
    type: 'round',
    intro: 'Each round is one quest. The leader passes left after every team vote.',
    steps: [
      { verb: 'Propose', text: 'The {leader} hands out {team}s to the number of players shown for this quest (may include themselves).' },
      { verb: 'Vote', text: 'Everyone reveals {approve} or {reject} at once. A **majority** approves; a tie rejects and the next leader proposes.' },
      { verb: 'Quest', text: 'Team members each play {success} or {fail} face down. Good players **must** play Success.' },
      { verb: 'Reveal', text: 'Shuffle and flip: one {=fail} fails the quest (quest 4 with 7+ players needs {=fail}{=fail}).' },
    ],
    outro: 'Next quest',
  },

  tension: 'Merlin knows every evil player, but each hint that steers good also shows the Assassin who Merlin is.',

  structure: [
    { label: 'Setup', text: 'Deal roles. Eyes closed, evil see each other; {=merlin} sees the evil players.' },
    { label: 'Quests', repeat: 'up to 5', text: 'The {=leader} proposes a team; all vote. If approved, the team plays {=success} / {=fail}. If rejected, the next leader proposes.' },
    { label: 'Assassination', text: 'If good wins 3 quests, the {=assassin} names one player. Naming Merlin wins for evil.' },
  ],

  end: {
    trigger: 'One side has 3 quests, or 5 proposals in a row are rejected',
    detail: 'If good reaches 3 successes, evil players confer and the {=assassin} names one player as Merlin.',
    results: [
      { side: 'Good wins', text: 'with 3 successful quests, if the {=assassin} then names the wrong player.' },
      { side: 'Evil wins', text: 'with 3 failed quests, 5 rejected teams in a row, or by naming {=merlin} Merlin.' },
    ],
  },

  ref: {
    title: 'Team size per quest (* needs 2 Fails)',
    rows: [
      ['5 players: 3 {=good} 2 {=evil}', '2 · 3 · 2 · 3 · 3'],
      ['6 players: 4 {=good} 2 {=evil}', '2 · 3 · 4 · 3 · 4'],
      ['7 players: 4 {=good} 3 {=evil}', '2 · 3 · 3 · 4* · 4'],
      ['8 players: 5 {=good} 3 {=evil}', '3 · 4 · 4 · 5* · 5'],
      ['9 players: 6 {=good} 3 {=evil}', '3 · 4 · 4 · 5* · 5'],
      ['10 players: 6 {=good} 4 {=evil}', '3 · 4 · 4 · 5* · 5'],
    ],
  },

  example: 'With 7 players, {=leader} Sam proposes himself, Jo and Kim for quest 2. The vote is 4 {=approve}, 3 {=reject}, so they go. One {=fail} comes back. Jo and Kim both deny it, and the table notes that Ray approved a team that failed.',

  setup: [
    'Deal roles face down: {merlin} + {good}s for good; {assassin} + {evil}s for evil (counts in table).',
    'Eyes closed: evil open eyes to see each other. Then evil raise thumbs and {=merlin} opens eyes to see them.',
    'Use the quest board for your player count. Give each player an {approve} and a {reject} token. Pick a random first {leader}.',
  ],

  terms: [
    ['{=merlin} Merlin', 'Good. Knows the evil players. Must stay hidden.'],
    ['{=assassin} Assassin', 'Evil. Gets one guess at Merlin if good wins 3 quests.'],
    ['{=leader} Leader', 'Proposes the team. Passes left after each vote.'],
    ['Vote track', 'Counts rejected proposals in a row. The 5th reject wins for evil.'],
  ],

  gotchas: [
    'Evil players **may** play {=success} to stay hidden; good players can never play {=fail}.',
    'Quest 4 with 7+ players needs **two** {=fail} to fail.',
    'The reject count resets when a quest goes, not after each vote.',
  ],

  tips: [
    'Remember who sat on each failed team and who **voted** for it.',
    'As Merlin, hint quietly. As good, act a little like Merlin to hide them.',
    'As evil, fail early quests rarely: getting caught on a team costs more than one quest.',
  ],

  walk(A) {
    const C = A.C, gold = '#d4a63a', good = '#2f6db5', evil = '#c8423b';
    const names = ['Sam', 'Jo', 'Kim', 'Ray', 'Ann', 'Lu', 'Max'];
    const cols = ['#5b6f99', '#6e5b99', '#5b8a99', '#8a7a5b', '#5b996e', '#995b6e', '#a07848'];
    const seat = (i, f = 1) => { const a = (-90 + i * 360 / 7) * Math.PI / 180; return [+(160 + 138 * f * Math.cos(a)).toFixed(1), +(100 + 76 * f * Math.sin(a)).toFixed(1)]; };
    let board = A.bg('#273552') + `<ellipse cx="160" cy="102" rx="118" ry="60" fill="#7a4e2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    board += A.rect(104, 64, 112, 34, '#efe0bb', { rx: 6, sw: 1.3 });
    const sizes = ['2', '3', '3', '4*', '4'];
    for (let i = 0; i < 5; i++) board += A.circle(120 + i * 20, 81, 8, i === 0 ? good : '#e6cf9b', { sw: 1.2 }) + A.text(120 + i * 20, 81, i === 0 ? '✓' : sizes[i], { size: i === 0 ? 10 : 8, weight: 800, fill: i === 0 ? C.white : C.ink });
    names.forEach((n, i) => { const [x, y] = seat(i); board += A.person(x, y, 26, cols[i], { face: '#e8c9a6' }) + A.text(x, y + 22, n, { size: 8, weight: 700, fill: '#f2e6cc' }); });
    // Crown, team tokens, votes and quest cards reuse the inline icon drawings.
    const I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x, y, size);
    const crown = (i) => { const [x, y] = seat(i); return A.k('crown', ic('leader', x - 28, y - 20, 19)); };
    const tok = (k, i) => { const [x, y] = seat(i); return A.k('t' + k, ic('team', x + 10, y - 3, 14)); };
    const pile = [0, 1, 2].map(k => A.k('t' + k, ic('team', 143 + k * 10, 109, 14))).join('');
    const team = tok(0, 0) + tok(1, 1) + tok(2, 2);
    const votes = [1, 1, 1, 1, 0, 0, 0].map((v, i) => { const [x, y] = seat(i, 0.56); return A.k('v' + i, ic(v ? 'approve' : 'reject', x - 9.6, y - 9.6, 19.2)); }).join('');
    const qcard = (k, x, y, face) => A.k('q' + k, face ? ic(face === 'S' ? 'success' : 'fail', x - 8, y - 2, 48) : A.card(x, y, 22, 30, '#3a3a48'));
    const mark = A.k('mark2', A.circle(140, 81, 8, evil, { sw: 1.2 }) + A.text(140, 81, '✗', { size: 10, weight: 800, fill: C.white }));
    return [
      { step: 0, say: 'Quest 2 needs **3** players. {=leader} **Sam** takes the {team}s.', svg: board + crown(0) + pile + A.glow(140, 81, 12, 'g-q2') },
      { step: 0, say: 'Sam proposes himself, **Jo** and **Kim**. The table debates.', svg: board + crown(0) + team },
      { step: 1, say: 'Everyone reveals a vote: **4** {=approve}, **3** {=reject}. Majority approves. Ray approved too.', svg: board + crown(0) + team + votes + A.glow(...seat(3), 18, 'g-ray') },
      { step: 2, say: 'Sam, Jo and Kim each play {=success} or {=fail} face down. Good players must play Success.', svg: board + crown(0) + team +
        qcard(0, 108, 4, null) + qcard(1, 226, 26, null) + qcard(2, 286, 68, null) },
      { step: 2, say: 'The cards are **shuffled**, so no one knows who played which.', svg: board + crown(0) + team +
        qcard(1, 136, 108, null) + qcard(0, 144, 112, null) + qcard(2, 152, 108, null) },
      { step: 3, say: 'Flip: {=success}{=fail}{=success}. **One** Fail fails the quest; evil takes quest 2.', svg: board + crown(0) + team +
        qcard(1, 108, 106, 'S') + qcard(0, 144, 106, 'F') + qcard(2, 180, 106, 'S') + mark },
      { step: 3, say: 'Jo and Kim both deny it. Ray approved a failed team: suspicious. The {=leader} passes to **Jo**.', svg: board + crown(1) + team + mark +
        A.bubble(252, 4, 62, 18, 'Not me!', { size: 8.5 }) + A.bubble(272, 80, 44, 18, 'Me too!', { size: 8 }) + A.glow(...seat(3), 18, 'g-ray') },
    ];
  },

  art(A) {
    const C = A.C, gold = '#d4a63a', good = '#2f6db5', evil = '#c8423b', I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x, y, size);
    let o = A.bg('#273552');
    o += A.star(22, 18, 3, '#f2e6cc', { sw: 0 }) + A.star(300, 60, 2.5, '#f2e6cc', { sw: 0 }) + A.star(40, 186, 2.5, '#f2e6cc', { sw: 0 });
    // Round table.
    o += `<ellipse cx="160" cy="106" rx="122" ry="70" fill="#7a4e2c" stroke="${C.ink}" stroke-width="1.5"/>`;
    o += `<ellipse cx="160" cy="106" rx="110" ry="61" fill="#9c6a3e"/>`;
    // Quest board for 7 players.
    o += A.rect(98, 70, 124, 58, '#efe0bb', { rx: 6, sw: 1.4 });
    const sizes = ['2', '3', '3', '4*', '4'], res = [good, evil, null, null, null];
    for (let i = 0; i < 5; i++) {
      const x = 114 + i * 23;
      o += A.circle(x, 90, 10, res[i] || '#e6cf9b', { sw: 1.3 });
      o += A.text(x, 90, res[i] ? (res[i] === good ? '✓' : '✗') : sizes[i], { size: res[i] ? 11 : 9, weight: 800, fill: res[i] ? C.white : C.ink });
    }
    for (let i = 0; i < 5; i++) o += A.circle(118 + i * 11, 116, 3.6, i < 1 ? C.ink : '#d8c08c', { sw: 1 });
    o += A.text(192, 116, 'rejects', { size: 7.5, weight: 700, fill: '#7a6248' });
    // Seven players around the table.
    const cols = ['#5b6f99', '#6e5b99', '#5b8a99', '#8a7a5b', '#5b996e', '#995b6e', '#a07848'];
    const seats = [];
    for (let i = 0; i < 7; i++) {
      const a = (-90 + 180 / 7 + i * 360 / 7) * Math.PI / 180;
      const x = 160 + 142 * Math.cos(a), y = 100 + 80 * Math.sin(a);
      seats.push([x, y, a]);
      o += A.person(x, y, 30, cols[i], { face: '#e8c9a6' });
    }
    // Vote tokens: white = approve, black = reject.
    const votes = [1, 1, 0, 1, 1, 0, 0];
    seats.forEach(([, , a], i) => {
      const x = 160 + 100 * Math.cos(a), y = 106 + 50 * Math.sin(a);
      o += ic(votes[i] ? 'approve' : 'reject', x - 9.6, y - 9.6, 19.2);
    });
    // Leader crown and team tokens.
    const [lx, ly] = seats[0];
    o += ic('leader', lx - 10, ly - 31, 20);
    for (const i of [0, 1, 3]) { const [x, y, a] = seats[i]; o += ic('team', x - 16 * Math.cos(a) + 6, y - 6 * Math.sin(a) - 5, 14); }
    // Quest cards played face down.
    o += A.card(136, 136, 15, 21, '#3a3a48', { rotate: -10 }) + A.card(153, 138, 15, 21, '#3a3a48') + A.card(170, 136, 15, 21, '#3a3a48', { rotate: 10 });
    o += A.note(lx + 6, ly - 12, 266, 56, 'Leader picks team');
    o += A.note(160, 80, 160, 42, 'Quest track: 3 wins');
    const [vx, vy, va] = seats[5];
    o += A.note(160 + 100 * Math.cos(va), 106 + 50 * Math.sin(va), 46, 66, 'Public vote');
    o += A.note(177, 146, 252, 160, 'Secret Success / Fail');
    return o;
  },
});
