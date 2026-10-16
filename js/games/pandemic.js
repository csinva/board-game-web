defineGame({
  id: 'pandemic',
  name: 'Pandemic',
  year: 2008,
  designer: 'Matt Leacock',
  family: 'coop',
  players: [2, 4], best: '4',
  time: [45, 60],
  age: 8,
  mechanics: ['cooperative', 'action-points', 'hand-management', 'set-collection', 'network', 'variable-powers'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 1, talk: 5, planning: 4 },

  pitch: 'Fly a team of specialists around the world, treating outbreaks while you race to cure four diseases before they spiral out of control.',
  theme: 'You are a CDC-style response team trying to stop four deadly diseases at once.',

  goal: { big: 'Cure 4 diseases', text: 'Everyone wins together the moment the **4th cure** is discovered. You do not need to wipe the cubes off the board.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Act ×4', text: 'Take **4 actions**: move, build a research station, treat (remove a cube), share a city card, or discover a cure.' },
      { verb: 'Draw 2', text: 'Draw 2 player cards. An **Epidemic** card makes things worse at once. Hand limit is 7.' },
      { verb: 'Infect', text: 'Flip infection cards equal to the **infection rate** (2 to 4) and add 1 cube to each city shown.' },
    ],
  },

  tension: 'Every action spent putting out today’s fire is an action not spent collecting cards for the cures that actually win.',

  flow: [
    { label: 'Contain', items: ['Treat cubes', 'Prevent outbreaks', 'Move to hot spots'] },
    { label: 'Collect', items: ['Draw city cards', 'Share Knowledge', 'Build stations'] },
    { label: 'Cure', items: ['5 same-colour cards', 'At a station', 'Cured = treat all cubes'] },
  ],

  end: {
    trigger: 'the 4th disease is cured, or the team hits one of three loss conditions',
    results: [
      { side: 'Team wins', text: 'as soon as all 4 diseases are cured.' },
      { side: 'Team loses', text: 'on the **8th outbreak**, when a colour runs out of cubes, or when a player cannot draw 2 player cards.' },
    ],
  },

  ref: {
    title: 'Actions (each costs 1)',
    rows: [
      ['Drive / Ferry', 'move along a red line'],
      ['Direct flight', 'discard a city card, fly there'],
      ['Charter flight', 'discard the card of your city, fly anywhere'],
      ['Shuttle flight', 'station to station'],
      ['Build station', 'discard the card of your city'],
      ['Discover cure', 'at a station, discard 5 cards of one colour'],
    ],
  },

  example: 'Hong Kong has 3 red cubes. Ana, the Medic, discards her Hong Kong card to fly there (1 action) and treats (1 action), removing **all 3** because Medics clear a whole colour. She drives to Manila and treats again. Then she draws Tokyo and an **Epidemic**: Lagos gets 3 yellow cubes and the infection rate rises.',

  setup: [
    'Infect 9 cities: 3 get 3 cubes, 3 get 2, 3 get 1. Put a research station in Atlanta.',
    'Deal roles and starting hands (4/3/2 cards each for 2/3/4 players); everyone starts in Atlanta.',
    'Split the rest of the player deck into 4–6 piles, shuffle an Epidemic into each, and stack them.',
  ],

  terms: [
    ['Outbreak', 'A city would get a 4th cube: instead, each connected city gets 1 cube. Can chain.'],
    ['Epidemic', 'Raise the infection rate, put 3 cubes on a new city, reshuffle the infection discards on top.'],
    ['Research station', 'Where cures are made; lets you shuttle between stations.'],
    ['Eradicated', 'Cured with no cubes left: that colour is never placed again.'],
  ],

  gotchas: [
    'Share Knowledge only moves **the card of the city you are both in**, and only on the giver or taker’s turn (Researcher excepted).',
    'After an Epidemic the reshuffled cities go **back on top**, so the same hot cities come up again soon.',
    'A city can outbreak only **once per chain**; mark it so you don’t loop.',
  ],

  tips: [
    'Use your roles: the Scientist cures with 4 cards, the Medic sweeps cities, the Dispatcher moves others.',
    'Watch cities with **3 cubes** that are in the infection discard: they come back after the next Epidemic.',
    'Plan the next player’s turn out loud; funnelling cards to one curer is usually fastest.',
  ],

  art(A) {
    const C = A.C;
    const col = { b: '#3d7bd9', y: '#f0c419', k: '#3a3a3a', r: '#d8403a' };
    let o = A.bg('#17324f');
    // faint continents
    o += A.path('M12 40 Q40 25 95 35 L120 60 Q100 85 85 95 L70 150 Q50 140 52 110 L18 90 Z', { fill: '#24466b', sw: 0 });
    o += A.path('M135 30 Q190 20 300 30 L312 120 Q290 150 255 125 L225 110 Q200 150 175 150 L150 110 Q140 80 135 30 Z', { fill: '#24466b', sw: 0 });
    const P = {
      sf: [30, 62, 'b'], chi: [62, 50, 'b'], atl: [72, 80, 'b'], ny: [108, 52, 'b'], lon: [148, 40, 'b'], par: [165, 64, 'b'],
      la: [34, 98, 'y'], mex: [58, 116, 'y'], bog: [88, 128, 'y'], lag: [160, 122, 'y'],
      cai: [192, 96, 'k'], bag: [218, 74, 'k'], mos: [208, 44, 'k'], del: [246, 90, 'k'],
      bei: [262, 52, 'r'], tok: [298, 62, 'r'], hk: [272, 108, 'r'], man: [298, 128, 'r'],
    };
    const E = [['sf', 'chi'], ['sf', 'la'], ['chi', 'atl'], ['chi', 'ny'], ['atl', 'ny'], ['ny', 'lon'], ['lon', 'par'], ['lon', 'mos'], ['par', 'cai'],
      ['la', 'mex'], ['mex', 'bog'], ['atl', 'mex'], ['bog', 'lag'], ['lag', 'cai'], ['cai', 'bag'], ['bag', 'mos'], ['bag', 'del'], ['mos', 'bei'],
      ['del', 'hk'], ['bei', 'tok'], ['bei', 'hk'], ['hk', 'man'], ['tok', 'man'], ['par', 'bag']];
    for (const [a, b] of E) o += A.line(P[a][0], P[a][1], P[b][0], P[b][1], { stroke: '#e9e2d0', sw: 1.2, opacity: 0.55 });
    for (const k in P) { const [x, y, c] = P[k]; o += A.circle(x, y, 5.5, col[c], { stroke: '#fff', sw: 1.3 }); }
    const cubes = (k, n, c) => { let s = ''; const [x, y] = P[k]; for (let i = 0; i < n; i++) s += A.cube(x - 13 + i * 8.5, y - 18, 7, col[c]); return s; };
    o += cubes('bag', 3, 'k') + cubes('cai', 2, 'k') + cubes('hk', 3, 'r') + cubes('tok', 1, 'r') + cubes('lag', 1, 'y') + cubes('chi', 1, 'b');
    // research station in Atlanta
    o += A.house(P.atl[0] + 9, P.atl[1] + 12, 11, C.white);
    // pawns
    o += A.pawn(P.par[0] + 8, P.par[1] - 2, 14, C.orange) + A.pawn(P.hk[0] - 13, P.hk[1] + 2, 14, C.pink);
    // bottom strip: outbreak track + cures
    o += A.rect(0, 160, 320, 40, '#0f2238', { sw: 0, rx: 0 });
    for (let i = 0; i <= 8; i++) {
      const x = 16 + i * 15;
      o += A.circle(x, 182, 6, i === 8 ? '#7a1c1c' : '#2c4a6e', { stroke: '#e9e2d0', sw: 1 });
      if (i === 3) o += A.circle(x, 182, 4, '#f08a2a', { sw: 0 });
    }
    const vials = [['b', true], ['y', false], ['k', false], ['r', false]];
    vials.forEach(([c, done], i) => {
      const x = 220 + i * 22;
      o += A.rect(x, 168, 14, 24, done ? col[c] : '#2c4a6e', { rx: 6, stroke: col[c], sw: 2 });
      if (done) o += A.text(x + 7, 180, '✓', { size: 10, fill: '#fff', weight: 800 });
    });
    o += A.note(P.bag[0] + 4, P.bag[1] - 16, 214, 16, '3 cubes: next = outbreak');
    o += A.note(P.atl[0] + 9, P.atl[1] + 7, 60, 16, 'Research station');
    o += A.note(61, 182, 90, 146, 'Outbreak track (8 = lose)');
    o += A.note(242, 168, 258, 146, 'Cures found 1 of 4');
    return o;
  },
});
