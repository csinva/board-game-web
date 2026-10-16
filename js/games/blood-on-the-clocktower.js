defineGame({
  id: 'blood-on-the-clocktower',
  name: 'Blood on the Clocktower',
  year: 2022,
  designer: 'Steven Medway',
  family: 'hidden',
  players: [5, 20], best: '10–15',
  time: [60, 120],
  age: 14,
  mechanics: ['hidden-roles', 'deduction', 'voting', 'bluffing', 'variable-powers', 'team'],
  profile: { complexity: 4, luck: 2, interaction: 5, conflict: 4, talk: 5, planning: 3 },
  color: '#7a1f2e',

  pitch: 'A village hunts a hidden Demon by day while it kills by night. Everyone has a power, and the dead keep playing.',
  theme: 'You are a villager of Ravenswood Bluff, where a Demon and its Minions hide among your neighbours.',

  goal: { big: 'Kill the Demon', text: '**Good** wins by executing the Demon. **Evil** wins when only 2 players are left alive.' },

  turn: {
    type: 'round',
    intro: 'A Storyteller runs each day and night:',
    steps: [
      { verb: 'Night', text: 'Eyes closed. The Storyteller wakes characters one by one to use powers; the **Imp** picks someone to kill.' },
      { verb: 'Dawn', text: 'The Storyteller reveals who died in the night. The dead stay at the table.' },
      { verb: 'Talk', text: 'Everyone chats openly and privately, sharing (or inventing) what their character learned.' },
      { verb: 'Nominate', text: 'Living players nominate; everyone raises a hand to vote. The top vote with **half the living or more** is executed.' },
    ],
  },

  tension: 'Good players need to share information to find the Demon, but every claim you make also tells the Demon whom to kill next.',

  flow: [
    { label: 'Learn', items: ['Night information', 'Private chats', 'Claims & bluffs'] },
    { label: 'Narrow', items: ['Compare stories', 'Spot the lies', 'Account for poison & drunkenness'] },
    { label: 'Execute', items: ['Nominate', 'Vote', 'Max 1 execution a day'] },
  ],

  end: {
    trigger: 'the Demon dies, or only 2 players are left alive',
    detail: 'A few characters add other endings: executing the Saint makes evil win, and the Mayor can win for good with 3 alive and no execution.',
    results: [
      { side: 'Good wins', text: 'if the Demon dies (and no Minion becomes the new Demon).' },
      { side: 'Evil wins', text: 'if just 2 players are alive, or if good executes the Saint.' },
    ],
  },

  ref: {
    title: 'Trouble Brewing teams',
    rows: [
      ['Townsfolk (13)', 'good; helpful info or powers, e.g. Empath, Slayer'],
      ['Outsiders (4)', 'good, but with a drawback, e.g. Drunk, Saint'],
      ['Minions (4)', 'evil helpers, e.g. Poisoner, Scarlet Woman'],
      ['Demon: Imp', 'evil; kills one player each night after the first'],
      ['Execution', 'needs votes ≥ half the living, and more than any other nominee'],
    ],
  },

  example: 'On day 2 Mia (Empath) says one neighbour is evil. She nominates **Raj**; 6 of 11 living players vote, which meets the 6 needed. Raj is executed; the game goes on, so he wasn’t the Demon (secretly he was the Poisoner). Tonight the Imp kills Mia.',

  setup: [
    'The Storyteller picks characters from the script to match the player count and deals each player a **secret token**.',
    'Evil players learn each other; the Demon also learns 3 good characters **not in play** to bluff as.',
    'Start with the first night: some Townsfolk wake to receive starting information.',
  ],

  terms: [
    ['Storyteller', 'The non-player host who runs nights, tracks the Grimoire and may bend information.'],
    ['Grimoire', 'The Storyteller’s board showing every true character and status.'],
    ['Ghost vote', 'Dead players keep one vote to use once for the rest of the game.'],
    ['Drunk / poisoned', 'Your ability doesn’t work and your info may be false, but you aren’t told.'],
    ['Script', 'The set of characters in use; Trouble Brewing is the beginner one.'],
  ],

  gotchas: [
    'Dead players can still **talk** and win with their team, but cannot nominate and have only **one ghost vote** left.',
    'Each living player can **nominate once** and **be nominated once** per day. A tie for most votes means nobody dies.',
    'If the Imp dies with 5+ players alive, the **Scarlet Woman** becomes the new Imp; the Imp can also kill itself at night to pass the role to a Minion.',
  ],

  tips: [
    'Talk to lots of people privately; information wins the game for good.',
    'If you’re evil, pick one of the Demon’s bluffs and live it fully.',
    'Your information may be wrong if you are drunk or poisoned; compare it with others before trusting it.',
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
      'Team sizes (Townsfolk / Outsiders / Minions / Demon): 5 players 3/0/1/1, 7 players 5/0/1/1, 9 players 5/2/1/1, 10 players 7/0/2/1, 12 players 7/2/2/1, 15 players 9/2/3/1.',
    ] },
    { title: 'The night order', items: [
      '**First night**: Minions learn each other and the Demon; the Demon learns its Minions and 3 bluffs; then Poisoner, Washerwoman, Librarian, Investigator, Chef, Empath, Fortune Teller, Butler, Spy.',
      '**Other nights**: Poisoner, Monk, Scarlet Woman, Imp, then the information roles (Ravenkeeper, Undertaker, Empath, Fortune Teller), with the Butler and Spy last.',
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
    const C = A.C, gold = '#f2c14e';
    const seat = (i) => { const a = (-90 + i * 30) * Math.PI / 180; return [+(160 + 132 * Math.cos(a)).toFixed(1), +(104 + 72 * Math.sin(a)).toFixed(1)]; };
    const cols = ['#6b7aa6', '#8a6aa6', '#5f8f8a', '#a6846b', '#7e8f5f', '#6b8aa6', '#a66b7a', '#b07a4f', '#9a3a3a', '#8f7a5f', '#5f7a8f', '#7a5f8f'];
    const names = { 2: 'Tom', 6: 'Lin', 7: 'Mia', 8: 'Raj' };
    const scene = (night, dead, away) => {
      let s = A.bg(night ? '#1d1a33' : '#6f86a8');
      s += night ? A.circle(296, 18, 10, '#f2e6cc', { sw: 0 }) + A.circle(291, 14, 9, '#1d1a33', { sw: 0 }) : A.circle(296, 18, 10, '#f6d36b', { sw: 1 });
      s += `<ellipse cx="160" cy="104" rx="118" ry="60" fill="${night ? '#4a3c44' : '#8a6e5e'}" stroke="${C.ink}" stroke-width="1.4"/>`;
      s += A.rect(146, 66, 28, 18, '#6b2a2a', { rx: 2 }) + A.line(160, 67, 160, 83, { stroke: '#e2b33c', sw: 1 }) + A.text(160, 92, 'Grimoire', { size: 6.5, fill: '#f2e6cc' });
      for (let i = 0; i < 12; i++) {
        if (i === away) continue;
        const [x, y] = seat(i);
        s += A.k('p' + i, A.person(x, y, 25, dead.includes(i) ? '#3a3540' : cols[i], { face: dead.includes(i) ? '#7c7686' : '#d9b48f' }));
        if (names[i]) s += A.text(x, y + 17, names[i], { size: 7.5, weight: 700, fill: '#f2e6cc' });
      }
      return s;
    };
    const shroud = (i) => { const [x, y] = seat(i); return A.k('sh' + i, A.path(`M${x - 10} ${y + 12} L${x} ${y - 14} L${x + 10} ${y + 12} Z`, { fill: '#1d1a22', sw: 1, opacity: 0.85 }) + A.circle(x + 11, y + 9, 3.5, C.white, { sw: 1 })); };
    const hand = (i) => { const [x, y] = seat(i); return A.k('h' + i, A.line(x + 7, y + 3, x + 12, y - 10, { stroke: gold, sw: 3 }) + A.circle(x + 12, y - 11, 3, gold, { sw: 0.8 })); };
    const voters = [0, 1, 4, 6, 7, 10].map(hand).join('');
    const rajCentre = A.k('p8', A.person(160, 130, 24, '#9a3a3a', { face: '#d9b48f' })) + A.text(160, 148, 'Raj', { size: 7.5, weight: 700, fill: '#f2e6cc' });
    const [mx, my] = seat(7);
    return [
      { step: 0, say: 'Night 2, eyes closed. The Storyteller wakes the **Empath**: Mia is shown **1**, so one of her two living neighbours is evil.', svg: scene(true, []) +
        A.k('emp', A.circle(mx + 18, my - 14, 7, gold, { sw: 1 }) + A.text(mx + 18, my - 14, '1', { size: 8, weight: 800 })) + A.tag(160, 112, 'only Mia sees', { fill: '#5d4b7a' }) + A.glow(mx, my - 2, 13, 'g-mia') },
      { step: 0, say: 'The **Imp** wakes and points at Tom. Only the Storyteller sees who the Imp is.', svg: scene(true, []) + A.k('kill', A.circle(...seat(2), 15, 'none', { stroke: '#e0484f', sw: 3 })) },
      { step: 1, say: 'Dawn. The Storyteller announces that **Tom died** in the night, but not his character. 11 players are alive.', svg: scene(false, [2]) + shroud(2) },
      { step: 2, say: 'Day 2. Mia shares her info: one of her neighbours, **Raj** or **Lin**, is evil.', svg: scene(false, [2]) + shroud(2) +
        A.bubble(mx - 2, 118, 124, 18, 'One of Raj or Lin is evil!', { size: 7.5 }) + A.glow(seat(8)[0], seat(8)[1] - 2, 13, 'g-raj') + A.glow(seat(6)[0], seat(6)[1] - 2, 13, 'g-lin') },
      { step: 3, say: 'Mia **nominates Raj**. Hands go up: **6 votes**, and 6 is half of 11 living, rounded up. Raj is about to die.', svg: scene(false, [2], 8) + shroud(2) + rajCentre + voters +
        A.k('count', A.rect(122, 97, 76, 16, '#fffdf7', { rx: 8, sw: 1 }) + A.text(160, 105, '6 votes · need 6', { size: 7.5 })) },
      { step: 3, say: 'Raj is executed. The game goes on, so he **wasn’t the Demon** (secretly he was the Poisoner). Now 10 are alive.', svg: scene(false, [2, 8]) + shroud(2) + shroud(8) },
      { step: 0, say: 'Night 3. The Imp strikes the loudest good voice: at dawn, **Mia** is dead. She keeps one ghost vote.', svg: scene(true, [2, 8, 7]) + shroud(2) + shroud(8) + shroud(7) + A.glow(mx, my - 2, 13, 'g-mia') },
    ];
  },

  art(A) {
    const C = A.C, dusk = '#2a2440';
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
        o += A.path(`M${x - 12} ${y + 16} L${x} ${y - 17} L${x + 12} ${y + 16} Z`, { fill: '#1d1a22', sw: 1, opacity: 0.85 });
        o += A.circle(x + 14, y + 12, 4.5, C.white, { sw: 1 });
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
    o += A.rect(104, 176, 30, 18, '#6b2a2a', { rx: 2 }) + A.line(119, 177, 119, 193, { stroke: '#e2b33c', sw: 1 });
    o += A.circle(111, 183, 2.4, '#e2b33c', { sw: 0 }) + A.circle(127, 187, 2.4, '#b3263e', { sw: 0 });
    o += A.note(160, 150, 236, 140, 'Nominated: vote now');
    o += A.note(285, 128, 270, 70, 'Dead: 1 ghost vote');
    o += A.note(110, 182, 54, 148, 'Storyteller’s Grimoire');
    o += A.note(160, 44, 64, 64, 'Night, then day');
    return o;
  },
});
