defineGame({
  id: 'blood-on-the-clocktower',
  name: 'Blood on the Clocktower',
  year: 2022,
  designer: 'Steven Medway',
  family: 'hidden',
  players: [5, 20], best: '9–12',
  time: [30, 120],
  age: 15,
  mechanics: ['hidden-roles', 'deduction', 'voting', 'bluffing', 'variable-powers', 'team'],
  profile: { complexity: 4, luck: 2, interaction: 5, conflict: 4, talk: 5, planning: 3 },
  color: '#7a1f2e',

  // Character tokens: blue = good, red = evil. The shroud and ghost-vote token match the art.
  icons: {
    townsfolk: { name: 'Townsfolk', draw: A => A.circle(12, 12, 10.5, '#2f6db5', { sw: 1.3 }) + A.person(12, 10.5, 14, '#fff', { face: '#fff' }) },
    outsider: { name: 'Outsider', draw: A => A.circle(12, 12, 10.5, '#9fcde6', { sw: 1.3 }) + A.person(12, 10.5, 14, '#2f6db5', { face: '#2f6db5' }) },
    minion: { name: 'Minion', draw: A => A.circle(12, 12, 10.5, '#e58a6a', { sw: 1.3 }) + A.person(12, 10.5, 14, '#7a1f2e', { face: '#7a1f2e' }) },
    demon: { name: 'Demon', draw: A => A.circle(12, 12, 10.5, '#7a1f2e', { sw: 1.3 }) + A.person(12, 11.5, 13, '#f2e6cc', { face: '#f2e6cc' }) + A.poly([[7.6, 6.5], [6.5, 2.5], [10, 5.2]], '#f2e6cc', { sw: 0.6 }) + A.poly([[16.4, 6.5], [17.5, 2.5], [14, 5.2]], '#f2e6cc', { sw: 0.6 }) },
    ghost: { name: 'ghost vote', draw: A => A.circle(12, 12, 10, '#fff', { sw: 1.4 }) + A.path('M7.8 17.5 v-6 a4.2 4.2 0 0 1 8.4 0 v6 l-1.4 -1.4 l-1.4 1.4 l-1.4 -1.4 l-1.4 1.4 l-1.4 -1.4z', { fill: '#8c877f', sw: 0.6 }) + A.circle(10.6, 11.2, 0.8, '#fff', { sw: 0 }) + A.circle(13.4, 11.2, 0.8, '#fff', { sw: 0 }) },
    shroud: { name: 'shroud', draw: A => A.path('M4 22.5 L12 1.5 L20 22.5 Z', { fill: '#1d1a22', sw: 1.2 }) + A.line(12, 6, 12, 19, { stroke: '#7c7686', sw: 0.8 }) },
    grimoire: { name: 'Grimoire', draw: A => A.rect(2, 5, 20, 14, '#6b2a2a', { rx: 2, sw: 1.3 }) + A.line(12, 5.5, 12, 18.5, { stroke: '#e2b33c', sw: 1.2 }) + A.circle(7, 10, 2, '#e2b33c', { sw: 0 }) + A.circle(17, 14, 2, '#b3263e', { sw: 0.6 }) },
  },

  pitch: 'Good players hunt a hidden Demon through talk and daily executions; evil wins if only 2 players remain alive.',

  goal: { big: 'Kill the Demon', text: '**Good** wins when the Demon dies. **Evil** wins when only 2 players are alive.' },

  turn: {
    type: 'round',
    intro: 'A Storyteller runs each night and day:',
    steps: [
      { verb: 'Night', text: 'Eyes closed. The Storyteller wakes characters in night order to use abilities; from night 2 the {demon} kills.' },
      { verb: 'Dawn', text: 'The Storyteller announces who died, not their character. The dead stay at the table.' },
      { verb: 'Talk', text: 'Open and private chats: share, or invent, what your character learned.' },
      { verb: 'Nominate', text: 'Living players nominate; all vote by raising a hand. The top nominee with votes ≥ **half the living** is executed.' },
    ],
  },

  tension: 'Good must share information to find the Demon, but every claim also tells the Demon whom to kill next.',

  structure: [
    { label: 'Setup', text: 'The Storyteller deals secret characters (see table) and sets up the {=grimoire}.' },
    { label: 'First night', text: 'With 7+ players, {minion}s and the {demon} learn each other and the Demon gets 3 bluffs. Some {=townsfolk} get starting info. No kill.' },
    { label: 'Day', repeat: 'until a team wins', text: 'Dawn deaths, then talk and nominations. At most **1** execution.' },
    { label: 'Night', repeat: 'then day again', text: 'Poisoner and Monk act, the {=demon} kills, then information roles wake.' },
    { label: 'Game end', text: 'Demon dead: good wins. Only 2 alive: evil wins.' },
  ],

  end: {
    trigger: 'the Demon dies, or only 2 players are alive',
    detail: 'Some characters add endings: executing the Saint makes evil win; the Mayor wins for good with 3 alive and no execution.',
    results: [
      { side: 'Good wins', text: 'if the Demon dies (and no Minion becomes the new Demon).' },
      { side: 'Evil wins', text: 'if only 2 players are alive, or if good executes the Saint.' },
    ],
  },

  ref: {
    title: 'Characters by player count (Trouble Brewing)',
    rows: [
      ['Types', '{townsfolk} {outsider} good · {minion} {demon} evil'],
      ['5–6 players', '3 {=townsfolk} · 0–1 {=outsider} · 1 {=minion} · 1 {=demon}'],
      ['7–9 players', '5 {=townsfolk} · 0–2 {=outsider} · 1 {=minion} · 1 {=demon}'],
      ['10–12 players', '7 {=townsfolk} · 0–2 {=outsider} · 2 {=minion} · 1 {=demon}'],
      ['13–15 players', '9 {=townsfolk} · 0–2 {=outsider} · 3 {=minion} · 1 {=demon}'],
      ['Execution', 'votes ≥ half the living (round up), and more than any other nominee that day'],
    ],
  },

  example: 'On day 2 Mia (Empath) says a neighbour is evil. She nominates **Raj**; 6 of 11 living players vote, meeting the 6 needed. Raj is executed and the game goes on, so he wasn’t the Demon (he was the Poisoner). That night the Imp kills Mia.',

  setup: [
    'The Storyteller picks characters for the player count (see table; each player above a bracket’s minimum adds 1 {=outsider}) and deals each a **secret token**.',
    'First night (7+ players only): evil learn each other; the {=demon} also learns 3 good characters **not in play** to bluff as.',
    'Above 15 players, the extra players are Travellers (a separate set of characters).',
    'Players sit in a circle; seat order matters for many abilities.',
  ],

  terms: [
    ['Storyteller', 'The non-playing host: runs nights, keeps the Grimoire, chooses what drunk or poisoned players learn.'],
    ['{=grimoire} Grimoire', 'The Storyteller’s board showing every true character and status.'],
    ['{=ghost} Ghost vote', 'Dead players keep one vote to use once for the rest of the game.'],
    ['Drunk / poisoned', 'Your ability doesn’t work and your info may be false, but you aren’t told.'],
    ['Script', 'The set of characters in use; Trouble Brewing is the beginner one.'],
  ],

  gotchas: [
    'Dead players get a {shroud}. They still **talk** and win with their team, but can’t nominate and have only **one** {ghost} left.',
    'Each living player may **nominate once** per day, and each player may **be nominated once** per day. A tie for most votes means nobody dies.',
    'If the Imp dies with 5+ players alive, the **Scarlet Woman** becomes the Imp; the Imp can also kill itself at night to make a Minion the new Imp.',
  ],

  tips: [
    'Talk privately with many players; information is good’s only weapon.',
    'As evil, pick one of the Demon’s bluffs and play it fully.',
    'You may be drunk or poisoned: check your info against others’ before trusting it.',
  ],

  extended: [
    { title: 'Trouble Brewing: the Townsfolk', items: [
      '**Washerwoman / Librarian / Investigator** (first night): learn that one of two players is a particular Townsfolk / Outsider / Minion.',
      '**Chef** (first night): how many pairs of evil players sit next to each other. **Empath** (each night): how many of your 2 living neighbours are evil.',
      '**Fortune Teller** (each night): pick 2 players and learn if either is the Demon; one good player is a “red herring” who also reads as the Demon.',
      '**Undertaker**: learn the character of today’s executed player. **Ravenkeeper**: if killed at night, pick a player and learn their character.',
      '**Monk**: protect another player from the Demon each night. **Soldier**: safe from the Demon. **Slayer**: once per game, publicly pick a player; if it’s the Demon, it dies.',
      '**Virgin**: the first time you are nominated, if the nominator is a Townsfolk, they are executed at once. **Mayor**: with 3 alive and no execution, good wins; if the Mayor would die at night, someone else might die instead.',
    ] },
    { title: 'Outsiders, Minions and the Demon', items: [
      'Outsiders (good, with a drawback): **Butler** may only vote if their chosen master votes; **Drunk** thinks they are a Townsfolk but has no power; **Recluse** may register as evil or as a Minion/Demon; **Saint**: if executed, good loses.',
      'Minions: **Poisoner** poisons a player each night (their ability fails, info may be false); **Spy** sees the Grimoire and may register as good; **Scarlet Woman** becomes the Imp if it dies with 5+ alive; **Baron** adds 2 Outsiders to the game.',
      'Demon: the **Imp** kills one player each night except the first. If it kills itself, a Minion becomes the new Imp.',
    ] },
    { title: 'The night order', items: [
      '**First night**: with 7+ players, Minions learn each other and the Demon, and the Demon learns its Minions and 3 bluffs; then Poisoner, Washerwoman, Librarian, Investigator, Chef, Empath, Fortune Teller, Butler, Spy.',
      '**Other nights**: Poisoner, Monk, Scarlet Woman, Imp, then Ravenkeeper, Empath, Fortune Teller, Undertaker, with the Butler and Spy last.',
      'The order matters: the Poisoner acts first, so anyone woken later that night gets possibly false info; the Monk protects before the Imp attacks.',
      'At dawn the Storyteller announces only **who** died, never how or what character they were.',
    ] },
    { title: 'Nominations and voting', items: [
      'Each living player may **nominate once** per day, and each player may **be nominated once** per day.',
      'After the nominee and nominator speak, the Storyteller’s hand moves around the circle starting next to the nominee; raise your hand when it reaches you. Votes are final once counted.',
      'To be **about to die**, a nominee needs votes equal to at least **half the living players** (rounded up), and more than any earlier nominee that day. A tie with the leader means neither is about to die.',
      'At the end of the day the player about to die (if any) is executed: at most **one execution** per day. Executing nobody is a valid choice.',
    ] },
    { title: 'Dead players and ghost votes', items: [
      'Dead players lose their ability but stay in the game: they talk, share info, and still win or lose with their team.',
      'They cannot nominate, and get **one ghost vote** for the rest of the game; spend it by raising your hand, then turn your token over.',
      'Ghost votes count toward the total, but the threshold is still half of the **living** players, so late game a few dead votes swing everything.',
      'Evil wins when just **2 players** are alive, so the endgame often hinges on whether to execute at all.',
    ] },
    { title: 'The Storyteller’s job', items: [
      'Keeps the **Grimoire**: true characters, reminder tokens (poisoned, protected, red herring), and who is dead.',
      'Wakes characters in night order, gives information, and chooses what drunk or poisoned players learn (often false) and how the Spy and Recluse register.',
      'Is a referee and a host, not a player: aims for a tense, close game rather than for either side to win.',
      'Answers rules questions privately, runs nominations and counts votes, and announces deaths and the end of the game.',
    ] },
    { title: 'Bluffs and information tricks', items: [
      'The Demon’s 3 bluffs are characters **not in play**: safe for evil to claim, since no real player can contradict them.',
      'Good players can hide too: a Soldier or Monk may claim something juicy to draw the Imp’s attack; a Virgin may fish for a Townsfolk nomination.',
      'Trade info in pairs or threes (“I’ll tell you mine if you tell me yours”), and track who claimed what to whom; evil stories drift over time.',
      'When info clashes, consider drunkenness and poison before calling someone a liar. A Recluse can make an innocent look evil; a Spy can make a Minion look good.',
    ] },
  ],

  walk(A) {
    const C = A.C, gold = '#f2c14e', I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x, y, size);
    const seat = (i) => { const a = (-90 + i * 30) * Math.PI / 180; return [+(160 + 132 * Math.cos(a)).toFixed(1), +(104 + 72 * Math.sin(a)).toFixed(1)]; };
    const cols = ['#6b7aa6', '#8a6aa6', '#5f8f8a', '#a6846b', '#7e8f5f', '#6b8aa6', '#a66b7a', '#b07a4f', '#9a3a3a', '#8f7a5f', '#5f7a8f', '#7a5f8f'];
    const names = { 2: 'Tom', 6: 'Lin', 7: 'Mia', 8: 'Raj' };
    const scene = (night, dead, away) => {
      let s = A.bg(night ? '#1d1a33' : '#6f86a8');
      s += night ? A.circle(296, 18, 10, '#f2e6cc', { sw: 0 }) + A.circle(291, 14, 9, '#1d1a33', { sw: 0 }) : A.circle(296, 18, 10, '#f6d36b', { sw: 1 });
      s += `<ellipse cx="160" cy="104" rx="118" ry="60" fill="${night ? '#4a3c44' : '#8a6e5e'}" stroke="${C.ink}" stroke-width="1.4"/>`;
      s += A.use(I.grimoire.draw(A), 144, 59, 32) + A.text(160, 92, 'Grimoire', { size: 6.5, fill: '#f2e6cc' });
      for (let i = 0; i < 12; i++) {
        if (i === away) continue;
        const [x, y] = seat(i);
        s += A.k('p' + i, A.person(x, y, 25, dead.includes(i) ? '#3a3540' : cols[i], { face: dead.includes(i) ? '#7c7686' : '#d9b48f' }));
        if (names[i]) s += A.text(x, y + 17, names[i], { size: 7.5, weight: 700, fill: '#f2e6cc' });
      }
      return s;
    };
    const shroud = (i) => { const [x, y] = seat(i); return A.k('sh' + i, `<g opacity="0.88">${ic('shroud', x - 12, y - 15, 28)}</g>` + ic('ghost', x + 5, y + 2, 13)); };
    const hand = (i) => { const [x, y] = seat(i); return A.k('h' + i, A.line(x + 7, y + 3, x + 12, y - 10, { stroke: gold, sw: 3 }) + A.circle(x + 12, y - 11, 3, gold, { sw: 0.8 })); };
    const voters = [0, 1, 4, 6, 7, 10].map(hand).join('');
    const rajCentre = A.k('p8', A.person(160, 130, 24, '#9a3a3a', { face: '#d9b48f' })) + A.text(160, 148, 'Raj', { size: 7.5, weight: 700, fill: '#f2e6cc' });
    const [mx, my] = seat(7);
    return [
      { step: 0, say: 'Night 2. The {=demon} **Imp** wakes and points at Tom. Only the Storyteller sees who the Imp is.', svg: scene(true, []) + A.k('kill', A.circle(...seat(2), 15, 'none', { stroke: '#e0484f', sw: 3 })) },
      { step: 0, say: 'Later that night the Storyteller wakes the **Empath**: Mia is shown **1**, so one of her two living neighbours is evil.', svg: scene(true, []) +
        A.k('emp', A.circle(mx + 18, my - 14, 7, gold, { sw: 1 }) + A.text(mx + 18, my - 14, '1', { size: 8, weight: 800 })) + A.tag(160, 112, 'only Mia sees', { fill: '#5d4b7a' }) + A.glow(mx, my - 2, 13, 'g-mia') },
      { step: 1, say: 'Dawn. The Storyteller announces that **Tom died**, not his character. 11 players are alive.', svg: scene(false, [2]) + shroud(2) },
      { step: 2, say: 'Day 2. Mia shares her info: **Raj** or **Lin** is evil.', svg: scene(false, [2]) + shroud(2) +
        A.bubble(mx - 2, 118, 124, 18, 'One of Raj or Lin is evil!', { size: 7.5 }) + A.glow(seat(8)[0], seat(8)[1] - 2, 13, 'g-raj') + A.glow(seat(6)[0], seat(6)[1] - 2, 13, 'g-lin') },
      { step: 3, say: 'Mia **nominates Raj**. **6 votes**: half of 11 living, rounded up. Raj is about to die.', svg: scene(false, [2], 8) + shroud(2) + rajCentre + voters +
        A.k('count', A.rect(122, 97, 76, 16, '#fffdf7', { rx: 8, sw: 1 }) + A.text(160, 105, '6 votes · need 6', { size: 7.5 })) },
      { step: 3, say: 'Raj is executed. The game goes on, so he **wasn’t the Demon** (secretly, the Poisoner). 10 are alive.', svg: scene(false, [2, 8]) + shroud(2) + shroud(8) },
      { step: 0, say: 'Night 3. The Imp kills **Mia**. She gets a {shroud} and keeps one {ghost}.', svg: scene(true, [2, 8, 7]) + shroud(2) + shroud(8) + shroud(7) + A.glow(mx, my - 2, 13, 'g-mia') },
    ];
  },

  art(A) {
    const C = A.C, dusk = '#2a2440', I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x, y, size);
    let o = A.bg(dusk);
    for (const [x, y] of [[20, 14], [56, 30], [96, 10], [232, 12], [270, 30], [304, 16]]) o += A.star(x, y, 2.4, '#f2e6cc', { sw: 0 });
    o += A.circle(300, 46, 10, '#f2e6cc', { sw: 0 }) + A.circle(295, 42, 9, dusk, { sw: 0 });
    // Clock tower.
    o += A.rect(140, 26, 40, 66, '#5a4a5e', { rx: 1 });
    o += A.poly([[134, 28], [160, 2], [186, 28]], '#3c3046', { sw: 1.3 });
    o += A.circle(160, 44, 12, '#f2e6cc', { sw: 1.3 });
    o += A.line(160, 44, 160, 35, { sw: 1.6 }) + A.line(160, 44, 167, 44, { sw: 1.6 });
    o += A.rect(153, 66, 14, 26, '#2b2233', { rx: 6 });
    // Town square.
    o += `<ellipse cx="160" cy="138" rx="150" ry="56" fill="#6a5048" stroke="${C.ink}" stroke-width="1.5"/>`;
    o += `<ellipse cx="160" cy="138" rx="104" ry="32" fill="#7a5c52" stroke="${C.ink}" stroke-width="1" opacity="0.8"/>`;
    // Players in a circle: [x, y, colour, dead?, handUp?]
    const seats = [[38, 120, '#6b7aa6', false, true], [74, 98, '#8a6aa6', true, false], [118, 90, '#5f8f8a', false, true],
      [210, 90, '#a6846b', false, false], [248, 98, '#7e8f5f', false, true], [284, 120, '#6b8aa6', true, false],
      [262, 170, '#a66b7a', false, true], [58, 170, '#8f7a5f', false, false]];
    for (const [x, y, col, dead, hand] of seats) {
      if (dead) {
        o += A.person(x, y, 27, '#3a3540', { face: '#7c7686' });
        o += `<g opacity="0.88">${ic('shroud', x - 14.5, y - 18, 34)}</g>` + ic('ghost', x + 7, y + 4, 15);
      } else {
        o += A.person(x, y, 27, col, { face: '#d9b48f' });
        if (hand) o += A.line(x + 9, y + 5, x + 14, y - 14, { stroke: '#d9b48f', sw: 3.4 }) + A.circle(x + 14, y - 15, 3, '#d9b48f', { sw: 0.8 });
      }
    }
    // Nominee in the middle of the square.
    o += A.person(160, 146, 26, '#9a3a3a', { face: '#d9b48f' });
    o += A.circle(160, 168, 8, '#7a1f2e', { sw: 1 }) + A.text(160, 168, '?', { size: 9, weight: 800, fill: C.white });
    o += A.curve(212, 176, 196, 172, 176, 156, { stroke: '#f2c14e', sw: 1.8, head: 6 });
    // Storyteller with the Grimoire.
    o += A.person(160, 192, 20, '#2b2233', { face: '#d9b48f' });
    o += ic('grimoire', 102, 167, 34);
    o += A.note(160, 150, 236, 140, 'Nominated: vote now');
    o += A.note(285, 128, 270, 70, 'Dead: 1 ghost vote');
    o += A.note(110, 182, 54, 148, 'Storyteller’s Grimoire');
    o += A.note(160, 44, 64, 64, 'Night, then day');
    return o;
  },
});
