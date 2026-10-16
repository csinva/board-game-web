defineGame({
  id: 'avalon',
  name: 'The Resistance: Avalon',
  year: 2012,
  designer: 'Don Eskridge',
  family: 'hidden',
  players: [5, 10], best: '7–10',
  time: [30, 45],
  age: 13,
  mechanics: ['hidden-roles', 'voting', 'bluffing', 'deduction', 'team'],
  profile: { complexity: 2, luck: 1, interaction: 5, conflict: 3, talk: 5, planning: 2 },
  color: '#2c4f8a',

  pitch: 'Loyal knights must send the right teams on quests while hidden traitors vote, lie and quietly sabotage from inside.',
  theme: 'You are knights of Arthur’s court, and some of you secretly serve Mordred.',

  goal: { big: '3 of 5 quests', text: 'Good wins by succeeding **3 quests**, as long as the Assassin then fails to identify Merlin. Evil wins by failing 3 quests.' },

  turn: {
    type: 'round',
    intro: 'Each round is one quest. The leader role passes left after every team vote.',
    steps: [
      { verb: 'Propose', text: 'The **leader** picks a team of the size shown for this quest (they may include themselves).' },
      { verb: 'Vote', text: 'Everyone reveals approve or reject at once. **Majority** approves; a tie rejects and the next leader proposes.' },
      { verb: 'Quest', text: 'Team members secretly play Success or Fail. Good players **must** play Success.' },
      { verb: 'Reveal', text: 'Shuffle and reveal: a single Fail sinks the quest (two on quest 4 with 7+ players).' },
    ],
    outro: 'Next quest',
  },

  tension: 'Merlin knows exactly who is evil, but every hint that steers good to victory also tells the Assassin who to stab.',

  flow: [
    { label: 'Talk', items: ['Claim & accuse', 'Read reactions'] },
    { label: 'Vote', items: ['Approve or reject', 'Votes are public', '5 rejects = evil wins'] },
    { label: 'Quest', items: ['Secret Success / Fail', 'Count the fails', 'Track who was on it'] },
  ],

  end: {
    trigger: 'One side has 3 quest results, or 5 team proposals in a row are rejected',
    detail: 'If good reaches 3 successes, evil players confer and the Assassin names one player as Merlin.',
    results: [
      { side: 'Good wins', text: 'with 3 successful quests, if the Assassin then names the wrong person as Merlin.' },
      { side: 'Evil wins', text: 'with 3 failed quests, 5 rejected teams in one round, or by assassinating Merlin.' },
    ],
  },

  ref: {
    title: 'Team size per quest',
    rows: [
      ['5 players (3 good, 2 evil)', '2 · 3 · 2 · 3 · 3'],
      ['6 players (4 v 2)', '2 · 3 · 4 · 3 · 4'],
      ['7 players (4 v 3)', '2 · 3 · 3 · 4* · 4'],
      ['8 players (5 v 3)', '3 · 4 · 4 · 5* · 5'],
      ['9 players (6 v 3)', '3 · 4 · 4 · 5* · 5'],
      ['10 players (6 v 4)', '3 · 4 · 4 · 5* · 5'],
    ],
  },

  example: 'With 7 players, leader Sam proposes himself, Jo and Kim for quest 2. The vote is 4 approve, 3 reject, so it goes. One **Fail** comes back. Jo and Kim both swear innocence, and everyone notes that Ray voted to approve a team that failed.',

  setup: [
    'Deal roles face down: Merlin + loyal servants for good, the Assassin + minions for evil (see table).',
    'Night: all close eyes; evil open eyes to see each other; then evil raise thumbs and **Merlin** opens eyes to see them.',
    'Place the quest board for your player count; pick a random first leader.',
  ],

  terms: [
    ['Merlin', 'Good player who knows the evil players. Must stay hidden.'],
    ['Assassin', 'Evil player who gets one final guess at Merlin.'],
    ['Leader', 'Proposes the team this round; passes left each vote.'],
    ['Vote track', 'Counts rejected proposals. The 5th reject in a row hands evil the game.'],
  ],

  gotchas: [
    'Evil players **may** play Success to stay hidden; good players can never play Fail.',
    'Quest 4 in 7+ player games needs **two** Fail cards to fail.',
    'The reject counter resets after each quest is attempted, not after each vote.',
  ],

  tips: [
    'Remember who sat on each failed team and who voted for it: the **votes** are your best evidence.',
    'As Merlin, nudge quietly. As good, act a little like Merlin to protect them.',
    'As evil, fail early quests sparingly; being caught on a team costs you more than one quest.',
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
    const crown = (i) => { const [x, y] = seat(i); return A.k('crown', A.crown(x - 18, y - 4, 12, gold)); };
    const tok = (k, i) => { const [x, y] = seat(i); return A.k('t' + k, A.circle(x + 17, y + 4, 5.5, gold, { sw: 1.1 })); };
    const pile = [0, 1, 2].map(k => A.k('t' + k, A.circle(150 + k * 10, 116, 5.5, gold, { sw: 1.1 }))).join('');
    const team = tok(0, 0) + tok(1, 1) + tok(2, 2);
    const votes = [1, 1, 1, 1, 0, 0, 0].map((v, i) => { const [x, y] = seat(i, 0.56); return A.k('v' + i, A.rect(x - 7, y - 5, 14, 10, v ? C.white : C.black, { rx: 2, sw: 1, stroke: v ? C.ink : '#cfc6b6' })); }).join('');
    const qcard = (k, x, y, face) => A.k('q' + k, face ? A.card(x, y, 32, 40, face === 'S' ? good : evil, { label: face === 'S' ? 'SUCCESS' : 'FAIL', size: 5 }) : A.card(x, y, 22, 30, '#3a3a48'));
    const mark = A.k('mark2', A.circle(140, 81, 8, evil, { sw: 1.2 }) + A.text(140, 81, '✗', { size: 10, weight: 800, fill: C.white }));
    return [
      { step: 0, say: 'Quest 2 needs a team of **3**. Leader **Sam** takes the team tokens.', svg: board + crown(0) + pile + A.glow(140, 81, 12, 'g-q2') },
      { step: 0, say: 'Sam proposes himself, **Jo** and **Kim**, then the table argues about it.', svg: board + crown(0) + team },
      { step: 1, say: 'Everyone reveals a vote at once: **4 approve, 3 reject**. Majority approves; note that Ray approved too.', svg: board + crown(0) + team + votes + A.glow(...seat(3), 18, 'g-ray') },
      { step: 2, say: 'Sam, Jo and Kim each secretly pick **Success or Fail** and play it face down. Good players must play Success.', svg: board + crown(0) + team +
        qcard(0, 108, 4, null) + qcard(1, 226, 26, null) + qcard(2, 286, 68, null) },
      { step: 2, say: 'The three cards are gathered and **shuffled**, so no one can tell whose card is whose.', svg: board + crown(0) + team +
        qcard(1, 136, 108, null) + qcard(0, 144, 112, null) + qcard(2, 152, 108, null) },
      { step: 3, say: 'Flip them: **one Fail**. A single Fail sinks the quest, so evil scores quest 2.', svg: board + crown(0) + team +
        qcard(1, 108, 106, 'S') + qcard(0, 144, 106, 'F') + qcard(2, 180, 106, 'S') + mark },
      { step: 3, say: 'Jo and Kim both swear innocence. Ray approved a failed team: suspicious. Leadership passes to **Jo**.', svg: board + crown(1) + team + mark +
        A.bubble(252, 4, 62, 18, 'Not me!', { size: 8.5 }) + A.bubble(272, 80, 44, 18, 'Me too!', { size: 8 }) + A.glow(...seat(3), 18, 'g-ray') },
    ];
  },

  art(A) {
    const C = A.C, gold = '#d4a63a', good = '#2f6db5', evil = '#c8423b';
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
      o += A.rect(x - 7, y - 5, 14, 10, votes[i] ? C.white : C.black, { rx: 2, sw: 1, stroke: votes[i] ? C.ink : '#cfc6b6' });
    });
    // Leader crown and team tokens.
    const [lx, ly] = seats[0];
    o += A.crown(lx, ly - 15, 13, gold);
    for (const i of [0, 1, 3]) { const [x, y, a] = seats[i]; o += A.circle(x - 16 * Math.cos(a) + 13, y - 6 * Math.sin(a) + 2, 5.5, gold, { sw: 1.1 }); }
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
