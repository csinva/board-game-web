defineGame({
  id: 'pandemic',
  name: 'Pandemic',
  year: 2008,
  designer: 'Matt Leacock',
  family: 'coop',
  players: [2, 4], best: '4',
  time: [45, 45],
  age: 8,
  mechanics: ['cooperative', 'action-points', 'hand-management', 'set-collection', 'network', 'variable-powers'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 1, talk: 5, planning: 4 },

  // Components drawn once, used inline in text ({red}) and in the art / walkthrough.
  icons: {
    blue: { name: 'blue cube', draw: A => A.cube(4, 2, 16, '#3d7bd9') },
    yellow: { name: 'yellow cube', draw: A => A.cube(4, 2, 16, '#f0c419') },
    black: { name: 'black cube', draw: A => A.cube(4, 2, 16, '#3a3a3a') },
    red: { name: 'red cube', draw: A => A.cube(4, 2, 16, '#d8403a') },
    station: { name: 'research station', draw: A => A.house(12, 21.5, 19, '#ffffff') + A.rect(10.6, 10.5, 2.8, 8, '#d8403a', { rx: 0, sw: 0 }) + A.rect(8, 13.1, 8, 2.8, '#d8403a', { rx: 0, sw: 0 }) },
    cure: { name: 'cure', draw: A => A.rect(8.5, 1.5, 7, 4, '#b9c3cf', { rx: 1, sw: 1.2 }) + A.rect(6.5, 5, 11, 17.5, '#eef4fb', { rx: 4.5, sw: 1.4 }) + A.rect(8, 11.5, 8, 9.5, '#3c9a6a', { rx: 3.2, sw: 0 }) + A.line(9.5, 8, 9.5, 10, { stroke: '#fff', sw: 1.4 }) },
    outbreak: { name: 'outbreak', draw: A => A.poly(Array.from({ length: 16 }, (_, i) => { const a = Math.PI / 8 * i - Math.PI / 2, r = i % 2 ? 5.2 : 11.3; return [+(12 + r * Math.cos(a)).toFixed(1), +(12.3 + r * Math.sin(a)).toFixed(1)]; }), '#f08a2a', { sw: 1.2 }) + A.circle(12, 12.3, 3.6, '#d8403a', { sw: 0 }) },
    citycard: { name: 'city card', draw: A => A.rect(4, 1, 16, 22, '#d8403a', { rx: 2.5, sw: 1.3 }) + A.circle(12, 10, 3.6, '#fff', { sw: 1 }) + A.rect(7.5, 16, 9, 2, '#fff', { rx: 1, sw: 0 }) },
    epidemic: { name: 'Epidemic', draw: A => A.rect(4, 1, 16, 22, '#5a9a3a', { rx: 2.5, sw: 1.3 }) + A.poly([[12, 5.5], [18, 17], [6, 17]], '#fff', { sw: 1 }) + A.rect(11.2, 9.3, 1.6, 4.4, '#c8423b', { rx: 0.6, sw: 0 }) + A.circle(12, 15.2, 0.95, '#c8423b', { sw: 0 }) },
    infection: { name: 'infection card', draw: A => A.rect(4, 1, 16, 22, '#3c6e47', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '\u2623\uFE0E', { size: 14, weight: 400, fill: '#e9e2d0' }) },
  },

  pitch: 'Spend up to 4 actions a turn moving, treating cubes and trading cards; cure all 4 diseases together to win.',

  goal: { big: 'Cure 4 diseases', text: 'Everyone wins the moment the **4th cure** is found. Cubes may stay on the board.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Act ×4', text: 'Take **up to 4** actions, in any mix (the same one may repeat): move, build a {station}, treat (remove cubes from your city), share a {citycard}, or discover a {cure}. See the action table below.' },
      { verb: 'Draw 2', text: 'Draw the top 2 player cards into your hand. If one is an {epidemic}, resolve it immediately, discard it, and do not draw a replacement. If you now hold more than 7 cards, discard cards or play Event cards until you hold 7.' },
      { verb: 'Infect', text: 'Flip {infection}s from the top of the infection deck, equal to the **infection rate** (2–4, shown by the rate marker). For each, place 1 cube of that city’s colour on that city (none if that colour is eradicated), then put the card on the infection discard pile.' },
    ],
    outro: 'Then the player to your left takes a turn.',
  },

  tension: 'Each action spent treating cubes is one not spent collecting cards for cures, and only cures win.',

  structure: [
    { label: 'Setup', text: 'Infect 9 cities, deal roles and hands, shuffle {epidemic} cards into the player deck. All pawns start in Atlanta.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Up to 4 actions → draw 2 player cards → flip {infection}s equal to the infection rate. Then the player to the left goes.' },
    { label: 'Epidemic', text: 'When one is drawn, do all 3 in order. 1: move the rate marker 1 space right. 2: take the **bottom** infection card, put 3 cubes on that city (if the city already has cubes of that colour, add only enough to reach 3; then it outbreaks), and put the card on the infection discard pile. 3: shuffle the infection discard pile (including that card) and put it on **top** of the infection deck. Then discard the {=epidemic}.' },
    { label: 'Outbreak', text: 'When a city would get a 4th cube of one colour: place no cube there; instead every city connected to it by a line gets 1 cube of that colour, and the {=outbreak} marker moves 1 space. If that gives another city a 4th cube, it outbreaks too, but each city outbreaks at most once per chain.' },
    { label: 'Game end', text: 'Win when the 4th {=cure} is discovered. Lose when the outbreak marker reaches 8, when a cube must be placed and none of that colour are left, or when a player must draw 2 player cards and fewer remain.' },
  ],

  end: {
    trigger: 'the 4th disease is cured, or the team meets a loss condition',
    results: [
      { side: 'Team wins', text: 'immediately when the 4th disease is cured.' },
      { side: 'Team loses', text: 'immediately when the {outbreak} marker reaches **8**, when a cube must be placed and none of that colour are left in the supply, or when a player must draw 2 player cards and fewer than 2 remain.' },
    ],
  },

  ref: {
    title: 'Actions (each uses 1 of your 4)',
    rows: [
      ['Drive / Shuttle', 'Drive: move to a city connected to yours by a line. Shuttle: move from a {=station} to any other {=station}.'],
      ['Direct / Charter flight', 'Direct: discard any {=citycard}; move to that city. Charter: discard the {=citycard} of the city you are in; move to any city.'],
      ['Treat', 'Remove 1 cube from your city. If that colour is cured, remove **all** cubes of that colour from your city.'],
      ['Share', 'You and another player in the same city: one of you gives the other the {=citycard} of **that** city.'],
      ['{=station} Build', 'Discard the {=citycard} of your city; put a {=station} there. If all 6 are on the board, move one of them.'],
      ['{=cure} Cure', 'At a {=station}, discard 5 {=citycard} of one colour: {=citycard}{=citycard}{=citycard}{=citycard}{=citycard}.'],
    ],
  },

  example: 'Hong Kong has {=red}{=red}{=red}. Ana (Medic) discards her Hong Kong card to fly there (1 action) and treats (1 action), removing **all 3**: a Medic’s treat removes every cube of one colour from her city. She drives to Manila (1 action) and treats again (1 action). She draws Tokyo and an {epidemic}: Lagos is the bottom infection card, so it gets {=yellow}{=yellow}{=yellow}, and the infection rate marker moves 1 space.',

  setup: [
    'Put a {station} in Atlanta. Shuffle the infection deck. Flip 3 cards: put 3 cubes on each city shown. Flip 3 more: 2 cubes each. Flip 3 more: 1 cube each. Put these 9 cards face up on the infection discard pile.',
    'Give each player a role card and its pawn; all pawns start in Atlanta. Shuffle the 48 city cards with the 5 event cards and deal hands: 4 cards each with 2 players, 3 each with 3, 2 each with 4. The player whose hand holds the city with the highest population goes first.',
    'Choose 4, 5 or 6 {=epidemic} cards (introductory / standard / heroic). Split the rest of the player deck into that many piles, as equal in size as possible, shuffle 1 {=epidemic} into each, and stack the piles with the **smaller** piles at the bottom. Put the infection rate marker on its first space (2) and the outbreak marker on 0.',
  ],

  terms: [
    ['Connected', 'Two cities joined by a line on the board.'],
    ['{=outbreak} Outbreak', 'A city would get a 4th cube of one colour: instead, each connected city gets 1 cube of that colour. Can chain to other cities.'],
    ['{=epidemic} Epidemic', 'Rate marker moves 1 space; the bottom infection card’s city gets 3 cubes and that card is discarded; the infection discard pile (including that card) is shuffled and put back on top of the infection deck.'],
    ['{=cure} Eradicated', 'A cured colour with no cubes of it left on the board: cubes of that colour are never placed again.'],
    ['Event card', 'A player card any player may play at any time, even on another player’s turn, without using an action, except while a drawn card is being resolved. Discard it after use.'],
  ],

  gotchas: [
    'Share Knowledge moves only **the card of the city both players are in**. Exception: the Researcher may give any city card from her hand.',
    'After an Epidemic, the reshuffled infection discards go **on top** of the infection deck: those same cities are infected again soon.',
    'Each city outbreaks at most **once per chain**, but the outbreak marker moves 1 space for every outbreak in the chain.',
  ],

  tips: [
    'Use roles: Scientist cures with 4 cards, Medic clears cities, Dispatcher moves other pawns.',
    'Watch cities with {=black}{=black}{=black} whose cards are in the infection discard pile: they come back on top after the next Epidemic.',
    'Plan the next player’s turn aloud; funnel cards to one curer.',
  ],

  walk(A) {
    const C = A.C;
    const col = { b: '#3d7bd9', y: '#f0c419', r: '#d8403a' };
    const P = { lag: [34, 118, 'y', 'Lagos'], kha: [80, 92, 'y', 'Khartoum'], bkk: [118, 112, 'r', 'Bangkok'], hk: [152, 82, 'r', 'Hong Kong'],
      sha: [150, 34, 'r', 'Shanghai'], tok: [196, 46, 'r', 'Tokyo'], man: [196, 118, 'r', 'Manila'] };
    const E = [['lag', 'kha'], ['bkk', 'hk'], ['hk', 'sha'], ['sha', 'tok'], ['hk', 'man']];
    let board = A.bg('#17324f');
    board += A.path('M8 70 Q50 60 100 70 L104 140 Q60 150 20 140 Z', { fill: '#24466b', sw: 0 });
    board += A.path('M110 20 Q170 10 214 24 L214 140 Q160 150 112 130 Z', { fill: '#24466b', sw: 0 });
    for (const [a, b] of E) board += A.line(P[a][0], P[a][1], P[b][0], P[b][1], { stroke: '#e9e2d0', sw: 1.3, opacity: 0.6 });
    for (const k in P) { const [x, y, c, n] = P[k]; board += A.circle(x, y, 5.5, col[c], { stroke: '#fff', sw: 1.3 }) + A.text(x, y + 11, n, { size: 6.5, fill: '#fff' }); }
    // Right panel: infection + player decks, rate track. Bottom strip: Ana's hand.
    board += A.rect(222, 0, 98, 200, '#0f2238', { sw: 0, rx: 0 }) + A.rect(0, 152, 222, 48, '#0f2238', { sw: 0, rx: 0 });
    board += A.text(271, 9, 'Infection deck / discard', { size: 6, fill: '#e9e2d0' });
    const ic = this.icons;
    board += A.use(ic.infection.draw(A), 225, 14.5, 40) + A.rect(276, 16, 28, 36, 'none', { stroke: '#e9e2d0', dash: '2 2', sw: 1 });
    board += A.text(271, 66, 'Infection rate', { size: 6, fill: '#e9e2d0' });
    [2, 2, 2, 3, 3, 4, 4].forEach((v, i) => { board += A.circle(237 + i * 12.5, 80, 5, '#2c4a6e', { stroke: '#e9e2d0', sw: 1 }) + A.text(237 + i * 12.5, 80.5, v, { size: 6, fill: '#fff' }); });
    board += A.text(271, 100, 'Player deck / discard', { size: 6, fill: '#e9e2d0' });
    board += A.card(232, 108, 28, 36, '#2c4a6e', { label: '✚', size: 12 }) + A.rect(276, 108, 28, 36, 'none', { stroke: '#e9e2d0', dash: '2 2', sw: 1 });
    board += A.tag(30, 176, 'Ana', { fill: C.orange });
    const card = (x, y, c, lab) => A.card(x, y, 30, 38, c, { label: lab, size: 5, labelFill: c === col.y ? C.ink : C.white });
    const hand = (i) => [60 + i * 36, 157];
    const rate = (i) => A.k('rate', A.circle(237 + i * 12.5, 80, 7.5, 'none', { stroke: C.orange, sw: 2.2 }));
    const cubes = (city, n, from = 0) => {
      const [x, y, c] = P[city]; let s = '';
      for (let i = from; i < from + n; i++) s += A.k(city + i, A.cube(x - 13 + i * 8.5, y - 19, 7, col[c]));
      return s;
    };
    const pawn = (city) => A.k('ana', A.pawn(P[city][0] + 11, P[city][1] - 3, 15, C.orange));
    const base = cubes('kha', 1) + cubes('tok', 1) + cubes('bkk', 1);
    const keep = A.k('c-par', card(...hand(1), col.b, 'Paris')) + A.k('c-lim', card(...hand(2), col.y, 'Lima'));
    const hkCard = A.k('c-hk', card(...hand(0), col.r, 'H. Kong'));
    const hkDisc = A.k('c-hk', card(276, 108, col.r, 'H. Kong'));
    const tokHand = A.k('c-tok', card(...hand(3), col.r, 'Tokyo'));
    return [
      { step: 0, say: 'Ana (Medic, orange) is in Khartoum. Hong Kong has {=red}{=red}{=red}: a 4th {=red} there would cause an {outbreak}.',
        svg: board + base + cubes('hk', 3) + cubes('man', 2) + pawn('kha') + hkCard + keep + rate(0) + A.glow(P.hk[0], P.hk[1] - 12, 20) },
      { step: 0, say: '**Action 1: direct flight.** She discards the Hong Kong {=citycard} and moves to Hong Kong.',
        svg: board + base + cubes('hk', 3) + cubes('man', 2) + pawn('hk') + hkDisc + keep + rate(0) },
      { step: 0, say: '**Action 2: treat.** A Medic’s treat removes **all** cubes of one colour from her city: all 3 go.',
        svg: board + base + cubes('man', 2) + pawn('hk') + hkDisc + keep + rate(0) + A.glow(P.hk[0], P.hk[1] - 12, 20) },
      { step: 0, say: '**Action 3:** drive along the line to Manila. **Action 4:** treat; both {=red} there go.',
        svg: board + base + pawn('man') + hkDisc + keep + rate(0) + A.glow(P.man[0], P.man[1] - 8, 18) },
      { step: 1, say: '**Draw 2:** the first card, Tokyo, goes to her hand; the second is an {epidemic}.',
        svg: board + base + pawn('man') + hkDisc + keep + rate(0) + tokHand + A.k('epi', A.use(ic.epidemic.draw(A), 225.5, 106.5, 41)) + A.glow(246, 126, 24) },
      { step: 1, say: 'The rate marker moves 1 space. The bottom infection card is **Lagos**: it gets {=yellow}{=yellow}{=yellow}. Then the infection discard pile is shuffled and put on top of the infection deck.',
        svg: board + base + pawn('man') + A.k('c-hk', card(276, 108, col.r, 'H. Kong')) + A.k('epi', A.use(ic.epidemic.draw(A), 273.5, 110.5, 41)) + keep + tokHand + rate(1) + cubes('lag', 3) + A.glow(P.lag[0], P.lag[1] - 12, 20) },
      { step: 2, say: '**Infect:** the rate is still 2, so flip 2 {infection}s. Tokyo and Bangkok get 1 {=red} each.',
        svg: board + base + pawn('man') + A.k('c-hk', card(276, 108, col.r, 'H. Kong')) + A.k('epi', A.use(ic.epidemic.draw(A), 273.5, 110.5, 41)) + keep + tokHand + rate(1) + cubes('lag', 3) +
          A.k('i-tok', A.card(276, 12, 30, 30, '#3c6e47', { title: 'Tokyo' })) + A.k('i-bkk', A.card(282, 26, 30, 30, '#3c6e47', { title: 'Bangkok' })) + cubes('tok', 1, 1) + cubes('bkk', 1, 1) },
    ];
  },

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
    o += A.use(this.icons.station.draw(A), P.atl[0] + 1, P.atl[1] - 2, 15);
    // pawns
    o += A.pawn(P.par[0] + 8, P.par[1] - 2, 14, C.orange) + A.pawn(P.hk[0] - 13, P.hk[1] + 2, 14, C.pink);
    // bottom strip: outbreak track + cures
    o += A.rect(0, 160, 320, 40, '#0f2238', { sw: 0, rx: 0 });
    for (let i = 0; i <= 8; i++) {
      const x = 16 + i * 15;
      o += A.circle(x, 182, 6, i === 8 ? '#7a1c1c' : '#2c4a6e', { stroke: '#e9e2d0', sw: 1 });
      if (i === 3) o += A.use(this.icons.outbreak.draw(A), x - 7, 175, 14);
    }
    const vials = [['b', true], ['y', false], ['k', false], ['r', false]];
    vials.forEach(([c, done], i) => {
      const x = 220 + i * 22;
      o += A.rect(x, 168, 14, 24, done ? col[c] : '#2c4a6e', { rx: 6, stroke: col[c], sw: 2 });
      if (done) o += A.text(x + 7, 180, '✓', { size: 10, fill: '#fff', weight: 800 });
    });
    o += A.note(P.bag[0] + 4, P.bag[1] - 16, 214, 16, '3 cubes: a 4th = outbreak');
    o += A.note(P.atl[0] + 9, P.atl[1] + 7, 60, 16, 'Research station');
    o += A.note(61, 182, 90, 146, 'Outbreaks (reach 8 = lose)');
    o += A.note(242, 168, 258, 146, 'Cures: 1 of 4');
    return o;
  },
});
