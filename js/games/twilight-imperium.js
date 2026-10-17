defineGame({
  id: 'twilight-imperium',
  name: 'Twilight Imperium',
  year: 2017,
  designer: 'Beltrami, Konieczka & Petersen',
  family: 'epic',
  players: [3, 6], best: '6',
  time: [240, 480],
  age: 14,
  mechanics: ['variable-powers', 'area-control', 'negotiation', 'voting', 'trading', 'dice'],
  profile: { complexity: 5, luck: 3, interaction: 5, conflict: 4, talk: 4, planning: 5 },

  // Strategy cards 1–8 (card colours), command token, trade good, planet values, objectives, d10. Reused in art and walk.
  icons: (() => {
    const W = '#fff', cardf = (A, f) => A.rect(4, 1, 16, 22, f, { rx: 2.5, sw: 1.3 });
    const SC = [['Leadership', '#c8423b'], ['Diplomacy', '#e07b2e'], ['Politics', '#e2b33c'], ['Construction', '#3c8d4f'], ['Trade', '#2a9a96'], ['Warfare', '#4f8fc9'], ['Technology', '#2f4fa0'], ['Imperial', '#7d55b5']];
    const icons = {
      ct: { name: 'command token', draw: (A, c = '#c8423b', st = '#2a2420') => A.hex(12, 12, 10.5, c, { stroke: st, sw: 1.3 }) },
      tg: { name: 'trade good', draw: A => A.circle(12, 12, 9.5, '#e2b33c', { sw: 1.3 }) + A.circle(12, 12, 6.2, 'none', { stroke: '#a07a10', sw: 1 }) + A.text(12, 12.6, '1', { size: 8.5, weight: 800, fill: '#5a4210' }) },
      res: { name: 'resources', draw: A => A.circle(12, 12, 10, '#e2b33c', { sw: 1.3 }) + A.cube(6.5, 4.2, 11, '#8a5a33') },
      inf: { name: 'influence', draw: A => A.circle(12, 12, 10, '#2f6db5', { sw: 1.3 }) + A.crown(12, 16.5, 11, W) },
      obj1: { name: 'Stage I objective', draw: A => cardf(A, '#e2b33c') + A.text(12, 12.5, 'I', { size: 13, weight: 800, serif: true }) },
      obj2: { name: 'Stage II objective', draw: A => cardf(A, '#4f8fc9') + A.text(12, 12.5, 'II', { size: 12, weight: 800, fill: W, serif: true }) },
      secret: { name: 'secret objective', draw: A => cardf(A, '#c8423b') + A.text(12, 12.5, '?', { size: 13, weight: 800, fill: W }) },
      mecatol: { name: 'Mecatol Rex', draw: A => A.circle(12, 12, 9.5, '#e2b33c', { sw: 1.3 }) + A.path('M2 15 q10 -9 20 -6', { stroke: '#8a5a33', sw: 1.6 }) + A.circle(9, 8.5, 2, '#f4dc8a', { sw: 0 }) },
      d10: { name: 'd10', draw: (A, n = '10', f = '#fff') => A.poly([[12, 1.5], [21.5, 9.5], [12, 22.5], [2.5, 9.5]], f, { sw: 1.3 }) + A.text(12, 11.5, n, { size: 8.5, weight: 800 }) },
    };
    SC.forEach(([name, col], i) => { icons['sc' + (i + 1)] = { name, draw: A => A.rect(3, 1, 18, 22, col, { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, i + 1, { size: 14, weight: 800, fill: i === 2 ? '#2a2420' : W }) }; });
    return icons;
  })(),

  pitch: 'Take strategy cards, then move fleets, build, research and vote to score objectives; first to 10 points wins.',

  goal: { big: '10 points', text: 'First to **10 victory points** wins. Almost all points come from **objectives**: public ones everyone races for, plus your own secret ones.' },

  turn: {
    type: 'round',
    intro: 'Each game round has four phases:',
    steps: [
      { verb: 'Strategy', text: 'Starting with the speaker and going clockwise, each player picks a strategy card ({=sc1} to {=sc8}). The player holding the lowest number acts first this round.' },
      { verb: 'Action', text: 'In initiative order (lowest strategy card number first), each player takes **1 action**: a tactical action (place a {=ct} on a system to move, fight, invade and build there), your strategy card’s primary ability, or a component action. Keep going around in that order until every player has passed.' },
      { verb: 'Status', text: 'Each player may score up to **1 public and 1 secret** objective; reveal 1 new public objective; each player gains 2 {=ct}; ready all exhausted cards and planets.' },
      { verb: 'Agenda', text: 'Only after someone has taken {=mecatol} **Mecatol Rex**: vote on 2 agendas, casting votes by exhausting planets for their {=inf}.' },
    ],
  },

  tension: 'Command tokens pay for actions, fleet size and strategy plays, so every move, ship and favour competes for the same few tokens.',

  structure: [
    { label: 'Setup', text: 'Build the galaxy; each player takes their faction’s units, techs and 8 {=ct}. Reveal 2 {=obj1}; each player draws 2 {=secret} and keeps 1.' },
    { label: 'Strategy', repeat: 'each round', text: 'Starting with the speaker and going clockwise, each player picks a strategy card (2 cards each with 3–4 players). Each card left unpicked gets 1 {=tg} placed on it.' },
    { label: 'Action', repeat: 'each round', text: 'In initiative order (lowest strategy card number first), players take 1 action at a time until everyone has passed. You can’t pass until you have used your strategy card’s primary ability.' },
    { label: 'Status', repeat: 'each round', text: 'Score objectives, then reveal the next public one. Each player draws 1 action card, takes their {=ct} back off the board, gains 2 more and redistributes them among their pools. Ready all cards and planets; repair damaged units.' },
    { label: 'Agenda', repeat: 'each round', text: 'Only once someone has taken {=mecatol}: vote on 2 agendas with {=inf}, then ready all planets.' },
    { label: 'Game end', text: 'The game ends the moment a player reaches **10 VP**. It also ends when a public objective must be revealed and none are left; then the player with the most VP wins.' },
  ],

  points: [
    ['{=obj1} Stage I objective', '1 VP each; 2 revealed at setup, 1 more each Status phase'],
    ['{=obj2} Stage II objective', '2 VP each; revealed instead once all Stage I objectives are out'],
    ['{=secret} Secret objective', '1 VP each; you may hold at most 3, scored and unscored'],
    ['{=mecatol} Mecatol Rex', '1 VP to the first player to take it (they spend 6 {=inf} to remove the custodians token)'],
    ['{=sc8} Imperial', '+1 VP each time you play it while holding Mecatol Rex'],
    ['Other', 'Support for the Throne promissory notes and some agendas'],
  ],

  end: {
    trigger: 'someone reaches 10 VP',
    detail: 'The game ends immediately, even mid-round. It also ends if a public objective must be revealed and none are left: most VP wins. On a tie (including two players reaching 10 at once), the tied player earliest in initiative order wins.',
  },
  scoring: [
    { label: '{=obj1} Stage I objectives', share: 3 },
    { label: '{=obj2} Stage II objectives', share: 2 },
    { label: '{=secret} Secret objectives', share: 3 },
    { label: 'Mecatol / Imperial / other', share: 2 },
  ],

  ref: {
    title: 'The 8 strategy cards (primary ability)',
    rows: [
      ['{=sc1} Leadership · {=sc2} Diplomacy', 'gain 3 {=ct} · choose a system with your planet; other players can’t activate it'],
      ['{=sc3} Politics · {=sc4} Construction', 'pick a new speaker, draw 2 action cards · build a PDS or space dock'],
      ['{=sc5} Trade · {=sc6} Warfare', '+3 {=tg}, refill commodities · take a {=ct} back from the board'],
      ['{=sc7} Technology · {=sc8} Imperial', 'research a tech · score a public objective now (+1 {=vp} with Mecatol Rex)'],
      ['Secondary', 'After the primary, each other player may use the card’s weaker secondary ability by spending 1 {=ct} from their **strategy** pool.'],
    ],
  },

  example: 'You place a {=ct} on the system next to your home and move in 2 cruisers and a carrier with 4 infantry. A lone destroyer waits. Cruisers hit on **7+** on a {=d10}: you roll 8 and 3, and the destroyer dies. You land 2 infantry and take the planet. In the Status phase you control **6 planets outside your home system** and score that 1 VP public objective.',

  setup: [
    'Choose factions and build the galaxy: Mecatol Rex in the centre, home systems at the edge; players take turns placing the other tiles.',
    'Take your faction’s starting units and techs, and 8 {=ct} (3 tactic, 3 fleet, 2 strategy).',
    'Reveal 2 {=obj1} Stage I objectives; each player draws 2 {=secret} secret objectives and keeps 1.',
  ],

  terms: [
    ['{=ct} Command token', 'Your action budget, split into 3 pools: tactic (spent to activate systems), fleet (the most non-fighter ships you may have in one system) and strategy (spent on other players’ secondary abilities).'],
    ['Speaker', 'The player holding the speaker token: picks a strategy card first and breaks tied agenda votes. The Politics card changes who it is.'],
    ['Component action', 'An action printed on an action card, technology, faction sheet or other component.'],
    ['Activate', 'Put a token from your tactic pool on a system; you may then move ships into it and act there.'],
    ['{=res} {=inf} Planet values', 'Every planet has **resources** (spent to build and research) and **influence** (spent on votes and command tokens). To spend them, exhaust the planet: turn its card face down until it is readied.'],
    ['{=mecatol} Mecatol Rex', 'The central planet. The first player to take it pays 6 influence and scores 1 VP; from then on, every round includes an Agenda phase.'],
    ['{=tg} Trade goods', 'Money: each one can be spent as 1 resource or 1 influence. Commodities become trade goods when you give them to another player.'],
  ],

  gotchas: [
    'Ships can’t move **out of** a system holding your own command token.',
    'You must use your strategy card’s primary ability **before you can pass** (both cards in 3–4 player games).',
    'Hold at most **3 secret objectives** (scored and unscored); score only 1 public and 1 secret per Status phase.',
  ],

  extended: [
    { title: 'All 8 strategy cards (primary / secondary)', items: [
      '{=sc1} **Leadership**: gain 3 {=ct}, then buy more at 3 {=inf} each / buy tokens at 3 influence each (no strategy token needed).',
      '{=sc2} **Diplomacy**: choose a system with your planet (not Mecatol Rex); every other player puts 1 of their command tokens there, so they can’t activate it; ready up to 2 of your planets / ready up to 2 of your planets.',
      '{=sc3} **Politics**: choose any player except the current speaker to become speaker, draw 2 action cards, look at the top 2 agendas / draw 2 action cards.',
      '{=sc4} **Construction**: place 1 PDS or space dock on your planet, plus 1 PDS / place 1 command token from reinforcements in any system, then 1 PDS or space dock on your planet there.',
      '{=sc5} **Trade**: gain 3 {=tg}, refill your commodities, and let any players you choose use the secondary free / refill your commodities.',
      '{=sc6} **Warfare**: take 1 of your {=ct} back from the board, then redistribute your tokens / produce units at your home system’s space dock.',
      '{=sc7} **Technology**: research 1 tech, and a second for 6 {=res} / research 1 tech for 4 resources.',
      '{=sc8} **Imperial**: score a public objective now, then +1 VP if you hold Mecatol Rex (otherwise draw a {=secret}) / draw a secret objective.',
    ] },
    { title: 'Tactical action, step by step', items: [
      '**Activate**: place a tactic {=ct} in a system that doesn’t already hold one of yours.',
      '**Move**: any of your ships whose move value is enough to reach the system may move in (they can’t leave systems holding your tokens or pass through enemy ships), carrying fighters and ground forces up to their capacity.',
      '**Space cannon offense**: starting with the active player and going clockwise, each player **may** fire the space cannon of their units in the active system (with the PDS upgrade, also from adjacent systems). Other players’ hits must target the active player’s ships; the active player picks one player with ships there to target.',
      '**Space combat**, then **invasion**: bombardment, commit ground forces, space cannon defense against them, ground combat, establish control (gain the planet card exhausted).',
      '**Production**: your space docks in the activated system may build units.',
    ] },
    { title: 'Combat in detail', items: [
      'Each round: anti-fighter barrage (first round only: each destroyer rolls 2 dice and hits fighters on 9+); either side may announce a retreat; both sides roll 1 {=d10} per ship; each player assigns the hits they take to their own ships. Repeat until one side is gone.',
      'Base combat values (roll this or higher to hit): war sun 3 (rolls 3 dice), dreadnought 5, cruiser 7, carrier / destroyer / fighter 9; infantry 8 (mech 6 with the Prophecy of Kings expansion). Unit upgrades improve them.',
      '**Sustain damage**: a dreadnought or war sun (and some flagships) can cancel 1 hit by becoming damaged (turn it sideways); it is repaired in the Status phase.',
      'Ground combat works the same with ground forces. PDS on the planet fire space cannon defense at landing forces; planetary shields stop bombardment.',
    ] },
    { title: 'Building and fleet limits', items: [
      'A space dock produces up to its planet’s {=res} value + 2 units; fighters and infantry cost 1 resource per 2 units.',
      'Your **fleet pool** tokens cap the non-fighter ships you may have in any one system; excess ships are removed.',
      'Fighters and ground forces beyond your ships’ capacity are removed too.',
    ] },
    { title: 'Objectives and the throne', items: [
      '{=obj1} Stage I public objectives are worth 1 VP, {=obj2} Stage II 2 VP; 1 is revealed each Status phase. You may score them only in the Status phase or with Imperial.',
      'You may hold at most **3 {=secret}**. Some score in the Status phase, others the moment you achieve them in the action phase (e.g. destroy a ship in combat).',
      'The first player to land on **Mecatol Rex** spends 6 {=inf} to remove the custodians token, scores 1 VP, and from then on every round ends with an Agenda phase.',
      'Holding Mecatol Rex makes Imperial worth an extra point each time you play it. **Support for the Throne** notes from other players are worth 1 VP while you hold them.',
      'Variant: for a longer game, play to **14 VP** on the other side of the victory point track.',
    ] },
    { title: 'The Agenda phase', text: 'The speaker reveals an agenda (a permanent **law** or one-time **directive**). Starting left of the speaker, each player exhausts planets to cast votes equal to their influence for one outcome, or abstains; the speaker votes last and breaks ties. Trade goods can’t be spent as votes. A second agenda follows the same way, then everyone readies their planets. Promises, trade goods and promissory notes all change hands here.' },
    { title: 'Status phase checklist', items: [
      'Score up to 1 public and 1 secret objective, then reveal the next public objective.',
      'Draw 1 action card each; remove your command tokens from the board; gain 2 {=ct} and redistribute.',
      'Ready all cards and planets, repair damaged units, return strategy cards.',
    ] },
  ],

  tips: [
    'Points come from objectives, not conquest. Read the public objectives every round and plan two rounds ahead.',
    'Trade with your neighbours: commodity deals help both of you and keep borders quiet.',
    'Don’t run out of tactic tokens; Leadership is never a wasted pick.',
  ],

  walk(A) {
    const C = A.C, ME = C.red, EN = C.blue, s = 34;
    const at = (q, r) => A.hexAt(q, r, s, 66, 146);
    let sky = A.bg('#0b1024');
    for (const [x, y] of [[10, 14], [84, 8], [300, 104], [196, 192], [8, 98], [180, 30], [20, 60]]) sky += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.8 });
    for (const [q, r] of [[0, 0], [1, -1], [2, -2], [1, 0], [2, -1], [0, -1]]) { const [x, y] = at(q, r); sky += A.hex(x, y, s - 1, '#18224a', { stroke: '#4c5c99', sw: 1 }); }
    const H = at(0, 0), T = at(1, -1), M = at(2, -2);
    sky += A.circle(H[0] - 10, H[1] + 6, 9, ME, { stroke: '#fff', sw: 1 }) + A.circle(H[0] + 12, H[1] - 8, 6, ME, { stroke: '#fff', sw: 1 }) + A.text(H[0], H[1] + 26, 'home', { size: 7, fill: '#aab4e0' });
    sky += A.circle(...M, 13, '#e2b33c', { stroke: '#fff', sw: 1 }) + A.text(M[0], M[1] - 20, 'Mecatol Rex', { size: 7, fill: '#e2d29a' });
    const P = [T[0] + 12, T[1] + 12];
    sky += A.circle(...P, 9, '#7fbf6a', { stroke: '#fff', sw: 1 });
    sky += A.rect(196, 0, 124, 200, '#151c3a', { sw: 0, rx: 0 }) + A.line(196, 0, 196, 200, { stroke: '#4c5c99', sw: 1.5 });
    sky += A.text(258, 8, 'Strategy cards', { size: 7, fill: '#aab4e0' });
    for (let i = 0; i <= 10; i++) sky += A.rect(202 + i * 10.4, 182, 9.4, 12, '#22305e', { rx: 1, stroke: '#4c5c99', sw: 0.6 }) + A.text(206.7 + i * 10.4, 176, i % 5 === 0 ? i : '', { size: 6, fill: '#aab4e0' });
    sky += A.tag(258, 70, 'You (red)', { fill: ME }) + A.text(206, 92, 'tactic', { size: 6.5, fill: '#aab4e0', anchor: 'start' });
    const I = this.icons, sc = (n, name, f, x, y) => A.use(I['sc' + n].draw(A), x - 6, y - 2, 48) + A.text(x + 18, y + 37, name, { size: 5, weight: 700, fill: '#fff' });
    const cards = (picked) => A.k('sc1', picked ? sc(1, 'Leadership', '#c8423b', 278, 96) : sc(1, 'Leadership', '#c8423b', 200, 16)) + A.k('sc5', sc(5, 'Trade', '#2a9a96', 240, 16)) + A.k('sc8', sc(8, 'Imperial', '#7d55b5', 280, 16));
    const tok = (x, y, c) => A.use(I.ct.draw(A, c, '#fff'), x - 8, y - 8, 16);
    const toks = (n, used) => [0, 1, 2, 3, 4].slice(0, n).map(i => A.k('t' + i, used && i === 0 ? tok(T[0], T[1] - 24, ME) : tok(210 + i * 13, 106, ME))).join('');
    const vp = (n) => A.k('vp', A.circle(206.7 + n * 10.4, 188, 4, ME, { stroke: '#fff', sw: 1 }));
    const ship = (x, y, c, k = 1) => A.poly([[x - 7 * k, y + 3 * k], [x + 7 * k, y], [x - 7 * k, y - 3 * k], [x - 4 * k, y]], c, { stroke: '#fff', sw: 0.8 });
    const fleet = (atT) => {
      const [bx, by] = atT ? [T[0] - 16, T[1] - 2] : [H[0] - 6, H[1] - 14];
      return A.k('cr1', ship(bx, by - 8, ME, 1.2)) + A.k('cr2', ship(bx, by + 8, ME, 1.2)) + A.k('car', ship(bx + 16, by, ME, 1.6));
    };
    const inf = (i, where) => { const pos = where === 'carrier' ? null : where; return pos ? A.k('inf' + i, A.rect(pos[0] - 3, pos[1] - 3, 6, 6, ME, { rx: 1, stroke: '#fff', sw: 0.7 })) : ''; };
    const enemy = A.k('dd', ship(T[0] + 14, T[1] - 10, EN, 1.1));
    const d10 = (x, n, f = '#fff') => A.use(I.d10.draw(A, String(n), f), x - 2, 84, 20);
    const dice = (a, b, e) => A.k('dice', d10(134, a) + d10(152, b) + d10(174, e, '#9fc0ff'));
    const obj = A.k('obj', A.card(202, 128, 50, 40, '#e2b33c', {}) + A.text(227, 141, 'Stage I · 1 VP', { size: 5.5, weight: 800 }) + A.text(227, 150, '6 non-home', { size: 5.5 }) + A.text(227, 157, 'planets', { size: 5.5 }));
    const own = A.k('own', A.circle(P[0] + 10, P[1] - 8, 3.5, ME, { stroke: '#fff', sw: 0.8 }));
    return [
      { step: 0, say: '**Strategy phase**: starting with the speaker, each player takes a strategy card. You pick {=sc1} **Leadership**, so you act first this round.',
        svg: sky + cards(true) + toks(3) + vp(2) + fleet(false) + enemy + obj + A.glow(291, 119, 26, 'g-sc') },
      { step: 1, say: '**Tactical action**: place a tactic {=ct} on the system next door, **activating** it.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(false) + enemy + obj + A.glow(...T, 30, 'g-t') },
      { step: 1, say: 'Move in 2 cruisers and a carrier holding 4 infantry. A blue **destroyer** is waiting.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(true) + enemy + obj },
      { step: 1, say: '**Space combat**: cruisers hit on **7+** on a {=d10}. You roll 8 and 3: one hit. The destroyer rolls 4 and misses; it is destroyed.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(true) + obj + dice(8, 3, 4) },
      { step: 1, say: '**Invasion**: land 2 infantry on the undefended planet. You control it: take its card, exhausted.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(true) + obj + inf(0, [P[0] - 3, P[1]]) + inf(1, [P[0] + 4, P[1]]) + own + A.glow(...P, 15, 'g-p') },
      { step: 2, say: '**Status phase**: you now control 6 planets outside your home system and score the {=obj1} public objective (**+1 VP**). The {=ct} on the board returns to your supply; gain 2 into tactic: 2 + 2 = **4** tactic tokens.',
        svg: sky + cards(true) + toks(4) + vp(3) + fleet(true) + obj + inf(0, [P[0] - 3, P[1]]) + inf(1, [P[0] + 4, P[1]]) + own + A.glow(227, 148, 28, 'g-obj') },
      { step: 3, say: '**Agenda phase** happens only once someone has taken {=mecatol} **Mecatol Rex** (6 influence, +1 VP). Nobody has, so a new round starts.',
        svg: sky + cards(false) + toks(4) + vp(3) + fleet(true) + obj + inf(0, [P[0] - 3, P[1]]) + inf(1, [P[0] + 4, P[1]]) + own + A.glow(...M, 17, 'g-m') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#0b1024');
    const stars = [[10, 14], [40, 186], [84, 8], [300, 10], [312, 112], [196, 192], [8, 98], [140, 4], [250, 186]];
    for (const [x, y] of stars) o += A.circle(x, y, 1.1, '#fff', { sw: 0, opacity: 0.8 });
    const s = 23, ox = 128, oy = 100;
    const tiles = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [-1, 1], [2, -1], [-2, 1], [1, 1], [-1, -1], [2, -2], [-2, 2], [0, 2], [0, -2], [2, 0], [-2, 0], [1, -2], [-1, 2]];
    for (const [q, r] of tiles) { const [x, y] = A.hexAt(q, r, s, ox, oy); o += A.hex(x, y, s - 0.8, '#18224a', { stroke: '#4c5c99', sw: 1 }); }
    const at = (q, r) => A.hexAt(q, r, s, ox, oy);
    // planets
    const planet = (q, r, dx, dy, rad, f) => { const [x, y] = at(q, r); return A.circle(x + dx, y + dy, rad, f, { stroke: '#fff', sw: 0.8 }); };
    o += planet(0, 0, 0, 0, 12, '#e2b33c');
    o += planet(1, 0, -5, -4, 6, '#7fbf6a') + planet(-1, 1, 4, 3, 7, '#c98a4b') + planet(1, -1, 3, 4, 5, '#9fd2e8') + planet(-1, -1, 0, 0, 6, '#b48ad0') + planet(0, 2, 0, 0, 6, '#c98a4b') + planet(2, -1, -3, 3, 5, '#7fbf6a');
    // home systems: red (lower left), blue (upper right)
    o += planet(-2, 2, -5, -3, 7, C.red) + planet(-2, 2, 6, 5, 5, C.red);
    o += planet(2, -2, -5, -3, 7, C.blue) + planet(2, -2, 6, 5, 5, C.blue);
    const ship = (x, y, c, k = 1) => A.poly([[x - 7 * k, y + 3 * k], [x + 7 * k, y], [x - 7 * k, y - 3 * k], [x - 4 * k, y]], c, { stroke: '#fff', sw: 0.7 });
    let [x, y] = at(-1, 1); o += ship(x - 8, y - 8, C.red) + ship(x - 10, y + 2, C.red, 0.8);
    [x, y] = at(-1, 0); o += ship(x + 4, y + 6, C.red, 1.1);
    [x, y] = at(1, -1); o += ship(x - 6, y - 8, C.blue) + ship(x + 6, y - 2, C.blue, 0.8);
    [x, y] = at(1, 0); o += ship(x + 6, y + 8, C.blue);
    // command tokens
    const I = this.icons, tok = (q, r, c) => { const [tx, ty] = at(q, r); return A.use(I.ct.draw(A, c, '#fff'), tx + 9 - 6.86, ty - 8 - 6.86, 13.71); };
    o += tok(-1, 1, C.red) + tok(1, 0, C.blue);
    // attack arrow red -> center
    [x, y] = at(-1, 0); const [mx, my] = at(0, 0);
    o += A.arrow(x + 10, y + 2, mx - 14, my + 1, { stroke: '#ff8a7a', sw: 2 });
    // strategy cards
    [1, 5, 8].forEach((n, i) => { o += A.use(I['sc' + n].draw(A), 260, 26 + i * 52, 48); });
    o += A.note(mx + 6, my - 8, 120, 14, 'Mecatol Rex (centre)');
    let [hx, hy] = at(1, 0); o += A.note(hx + 9, hy - 8, 210, 172, 'Command token');
    [hx, hy] = at(-2, 2); o += A.note(hx - 5, hy - 3, 40, 186, 'Home system');
    o += A.note(262, 50, 230, 14, 'Strategy cards');
    return o;
  },
});
