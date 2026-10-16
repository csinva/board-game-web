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

  pitch: 'A full-day space opera: race to complete objectives through war, trade, research and politics as one of 17 alien factions.',
  theme: 'You are an alien empire competing to take the empty throne of a fallen galactic empire.',

  goal: { big: '10 points', text: 'First to **10 victory points** wins. Almost all points come from **objectives**: public goals everyone races for, plus your own secret ones.' },

  turn: {
    type: 'round',
    intro: 'Each game round has four phases:',
    steps: [
      { verb: 'Strategy', text: 'In turn, each player picks a **strategy card**. Its number sets turn order this round.' },
      { verb: 'Action', text: 'Take turns doing **one action** each: a tactical action (move, fight, invade, build), your strategy card, or a card ability. Repeat until all pass.' },
      { verb: 'Status', text: 'Score up to **1 public + 1 secret** objective, reveal a new public objective, gain 2 command tokens.' },
      { verb: 'Agenda', text: 'Once someone has landed on **Mecatol Rex**, vote on two laws, using your planets’ influence as votes.' },
    ],
  },

  tension: 'Command tokens are your actions for the round and your fleet size and your strategy plays, so every move, ship and favour you sell competes for the same few tokens.',

  flow: [
    { label: 'Expand', items: ['Activate a system', 'Move ships', 'Invade planets'] },
    { label: 'Build up', items: ['Spend resources on units', 'Research technology', 'Trade goods with neighbours'] },
    { label: 'Score', items: ['Stage I objectives (1 VP)', 'Stage II objectives (2 VP)', 'Secret objectives (1 VP)'] },
  ],

  end: {
    trigger: 'someone reaches 10 VP',
    detail: 'The game ends at once, even mid-round. It also ends if a public objective must be revealed and none are left: most VP wins.',
  },
  scoring: [
    { label: 'Stage I objectives', share: 3 },
    { label: 'Stage II objectives', share: 2 },
    { label: 'Secret objectives', share: 3 },
    { label: 'Mecatol / Imperial / other', share: 2 },
  ],

  ref: {
    title: 'The 8 strategy cards (primary ability)',
    rows: [
      ['1 Leadership · 2 Diplomacy', 'Gain command tokens · lock a system against attack'],
      ['3 Politics · 4 Construction', 'Become speaker, draw action cards · build PDS / space dock'],
      ['5 Trade · 6 Warfare', 'Gain trade goods · reuse a command token'],
      ['7 Technology · 8 Imperial', 'Research a tech · score an objective now (+1 VP on Mecatol)'],
      ['Secondary', 'Others may use a weaker version by spending a **strategy** token.'],
    ],
  },

  example: 'On your action you place a tactic token on the system next to your home, move in 2 cruisers and a carrier with 4 infantry, and fight its lone destroyer: cruisers hit on **7+** on a ten-sided die, you roll 8 and 3, the destroyer dies. You land 2 infantry and take the planet. In the Status phase that makes **6 planets**, and you score a 1 VP public objective.',

  setup: [
    'Choose factions, then build the galaxy: Mecatol Rex in the centre, home systems at the edge, players place the other tiles in turns.',
    'Take your faction’s starting units, techs and 8 command tokens (3 tactic, 3 fleet, 2 strategy).',
    'Reveal 2 Stage I public objectives; each player draws 2 secret objectives and keeps 1.',
  ],

  terms: [
    ['Command token', 'Your action budget, split into tactic, fleet (max ships per system) and strategy pools.'],
    ['Activate', 'Put a tactic token on a system to move into it and act there.'],
    ['Resources / Influence', 'The two values on every planet: build with one, vote and buy tokens with the other.'],
    ['Mecatol Rex', 'Central planet. First to land pays 6 influence and scores 1 VP; starts the Agenda phase.'],
    ['Trade goods', 'Spendable money. Commodities become trade goods when given to another player.'],
  ],

  gotchas: [
    'Ships in a system holding **your own command token** cannot move out of it this round.',
    'You must use your strategy card’s primary ability **before you can pass**.',
    'You can keep at most **3 secret objectives** (scored and unscored), and score only one public and one secret per Status phase.',
  ],

  extended: [
    { title: 'All 8 strategy cards (primary / secondary)', items: [
      '**1 Leadership**: gain 3 command tokens, then buy more at 3 influence each / buy tokens at 3 influence each (no strategy token needed).',
      '**2 Diplomacy**: pick a system with your planet (not Mecatol Rex); every other player puts a token there, so nobody can activate it; ready 2 planets / ready 2 planets.',
      '**3 Politics**: give the speaker token to another player, draw 2 action cards, look at the top 2 agendas / draw 2 action cards.',
      '**4 Construction**: place a PDS or space dock, plus a PDS / place one in a system you put a token in.',
      '**5 Trade**: gain 3 trade goods, refill commodities, refill any others’ for free / refill your commodities.',
      '**6 Warfare**: take back a command token from the board and redistribute tokens / produce at a home space dock.',
      '**7 Technology**: research a tech, and a second for 6 resources / research a tech for 4 resources.',
      '**8 Imperial**: score a public objective now, then +1 VP if you hold Mecatol Rex (otherwise draw a secret) / draw a secret objective.',
    ] },
    { title: 'Tactical action, step by step', items: [
      '**Activate**: place a tactic token in a system that doesn’t already hold one of yours.',
      '**Move**: ships with enough move value come in (they can’t leave systems holding your tokens or pass through enemy ships), carrying fighters and ground forces up to capacity.',
      '**Space cannon offense**: PDS in or next to the system fire at the arriving ships.',
      '**Space combat**, then **invasion**: bombardment, space cannon defense against landing troops, commit ground forces, ground combat.',
      '**Production**: your space docks in the activated system may build units.',
    ] },
    { title: 'Combat in detail', items: [
      'Each round: anti-fighter barrage (first round only, destroyers 9 ×2), either side may announce a retreat, both roll one d10 per ship, assign hits, repeat until one side is gone.',
      'Base combat values: war sun 3 (×3), dreadnought 5, cruiser 7, carrier / destroyer / fighter 9; infantry 8, mech 6. Higher techs improve them.',
      '**Sustain damage**: dreadnoughts, war suns and mechs can cancel one hit by turning sideways; repaired in the Status phase.',
      'Ground combat works the same with infantry and mechs; PDS on the planet fire space cannon defense at landing forces, and planetary shields stop bombardment.',
    ] },
    { title: 'Building and fleet limits', items: [
      'A space dock produces up to its planet’s resources +2 units; fighters and infantry come 2 for 1 resource.',
      'Your **fleet pool** tokens cap the non-fighter ships you may have in any one system; excess ships are removed.',
      'Fighters and ground forces beyond your ships’ capacity are removed too.',
    ] },
    { title: 'Objectives and the throne', items: [
      'Stage I public objectives are worth 1 VP, Stage II 2 VP; one new one is revealed each Status phase. You score them only in the Status phase or with the Imperial card.',
      'You may hold **3 secret objectives**. Some are scored in the Status phase, others the moment you achieve them during the action phase (e.g. destroy a ship in combat).',
      'First to land on **Mecatol Rex** must spend 6 influence to remove the custodians token: +1 VP, and the Agenda phase begins every round after.',
      'Holding Mecatol Rex makes the Imperial card worth an extra point every time you play it; **Support for the Throne** notes from other players are worth 1 VP while you hold them.',
    ] },
    { title: 'The Agenda phase', text: 'The speaker reveals an agenda (a permanent **law** or one-time **directive**). Starting left of the speaker, each player exhausts planets to cast votes equal to their influence, for one outcome (or abstains); the speaker votes last and breaks ties. Then a second agenda is voted on the same way, after which everyone readies their planets. Promises, trade goods and promissory notes all change hands here.' },
    { title: 'Status phase checklist', items: [
      'Score up to 1 public and 1 secret objective, then reveal the next public objective.',
      'Draw 1 action card each, remove your command tokens from the board, gain 2 command tokens and redistribute.',
      'Ready all cards and planets, repair damaged units, return strategy cards.',
    ] },
  ],

  tips: [
    'Points come from objectives, not conquest. Read the public objectives every round and plan two rounds ahead.',
    'Trade with your neighbours: commodity deals help you both and keep borders quiet.',
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
    const sc = (n, name, f, x, y) => A.card(x, y, 36, 42, f, { label: n, size: 15 }) + A.text(x + 18, y + 35, name, { size: 5, weight: 700, fill: '#fff' });
    const cards = (picked) => A.k('sc1', picked ? sc(1, 'Leadership', '#c8423b', 278, 96) : sc(1, 'Leadership', '#c8423b', 200, 16)) + A.k('sc5', sc(5, 'Trade', '#2a9a96', 240, 16)) + A.k('sc8', sc(8, 'Imperial', '#7d55b5', 280, 16));
    const tok = (x, y, c) => A.hex(x, y, 7, c, { stroke: '#fff', sw: 1 });
    const toks = (n, used) => [0, 1, 2, 3, 4].slice(0, n).map(i => A.k('t' + i, used && i === 0 ? tok(T[0], T[1] - 24, ME) : tok(210 + i * 13, 106, ME))).join('');
    const vp = (n) => A.k('vp', A.circle(206.7 + n * 10.4, 188, 4, ME, { stroke: '#fff', sw: 1 }));
    const ship = (x, y, c, k = 1) => A.poly([[x - 7 * k, y + 3 * k], [x + 7 * k, y], [x - 7 * k, y - 3 * k], [x - 4 * k, y]], c, { stroke: '#fff', sw: 0.8 });
    const fleet = (atT) => {
      const [bx, by] = atT ? [T[0] - 16, T[1] - 2] : [H[0] - 6, H[1] - 14];
      return A.k('cr1', ship(bx, by - 8, ME, 1.2)) + A.k('cr2', ship(bx, by + 8, ME, 1.2)) + A.k('car', ship(bx + 16, by, ME, 1.6));
    };
    const inf = (i, where) => { const pos = where === 'carrier' ? null : where; return pos ? A.k('inf' + i, A.rect(pos[0] - 3, pos[1] - 3, 6, 6, ME, { rx: 1, stroke: '#fff', sw: 0.7 })) : ''; };
    const enemy = A.k('dd', ship(T[0] + 14, T[1] - 10, EN, 1.1));
    const dice = (a, b, e) => A.k('dice', A.die(134, 86, 15, String(a), '#fff') + A.die(152, 86, 15, String(b), '#fff') + A.die(174, 86, 15, String(e), '#9fc0ff'));
    const obj = A.k('obj', A.card(202, 128, 50, 40, '#e2b33c', {}) + A.text(227, 141, 'Stage I · 1 VP', { size: 5.5, weight: 800 }) + A.text(227, 150, 'Control', { size: 5.5 }) + A.text(227, 157, '6 planets', { size: 5.5 }));
    const own = A.k('own', A.circle(P[0] + 10, P[1] - 8, 3.5, ME, { stroke: '#fff', sw: 0.8 }));
    return [
      { step: 0, say: '**Strategy phase**: in turn, each player takes a strategy card. You pick **1 Leadership**, so you act first this round.',
        svg: sky + cards(true) + toks(3) + vp(2) + fleet(false) + enemy + obj + A.glow(291, 119, 26, 'g-sc') },
      { step: 1, say: '**Tactical action**: place a tactic token from your pool on the system next door, **activating** it.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(false) + enemy + obj + A.glow(...T, 30, 'g-t') },
      { step: 1, say: 'Move in 2 cruisers and a carrier holding 4 infantry. A blue **destroyer** is waiting.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(true) + enemy + obj },
      { step: 1, say: '**Space combat**: cruisers hit on **7+** on a d10. You roll 8 and 3: one hit. The destroyer rolls 4 and misses, so it is destroyed.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(true) + obj + dice(8, 3, 4) },
      { step: 1, say: '**Invasion**: land 2 infantry on the undefended planet. You control it: flip its card to you, exhausted.',
        svg: sky + cards(true) + toks(3, true) + vp(2) + fleet(true) + obj + inf(0, [P[0] - 3, P[1]]) + inf(1, [P[0] + 4, P[1]]) + own + A.glow(...P, 15, 'g-p') },
      { step: 2, say: '**Status phase**: you now control 6 planets and score the public objective (**+1 VP**). Everyone gains 2 command tokens.',
        svg: sky + cards(true) + toks(5) + vp(3) + fleet(true) + obj + inf(0, [P[0] - 3, P[1]]) + inf(1, [P[0] + 4, P[1]]) + own + A.glow(227, 148, 28, 'g-obj') },
      { step: 3, say: '**Agenda phase** only happens once someone has landed on **Mecatol Rex** (6 influence, +1 VP). Nobody has yet, so a new round starts.',
        svg: sky + cards(false) + toks(5) + vp(3) + fleet(true) + obj + inf(0, [P[0] - 3, P[1]]) + inf(1, [P[0] + 4, P[1]]) + own + A.glow(...M, 17, 'g-m') },
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
    const tok = (q, r, c) => { const [tx, ty] = at(q, r); return A.hex(tx + 9, ty - 8, 6, c, { stroke: '#fff', sw: 1 }); };
    o += tok(-1, 1, C.red) + tok(1, 0, C.blue);
    // attack arrow red -> center
    [x, y] = at(-1, 0); const [mx, my] = at(0, 0);
    o += A.arrow(x + 10, y + 2, mx - 14, my + 1, { stroke: '#ff8a7a', sw: 2 });
    // strategy cards
    const sc = [['1', '#c8423b'], ['5', '#2a9a96'], ['8', '#7d55b5']];
    sc.forEach(([n, f], i) => { o += A.card(262, 28 + i * 52, 44, 44, f, { label: n, size: 20 }); });
    o += A.note(mx + 6, my - 8, 120, 14, 'Mecatol Rex (centre)');
    let [hx, hy] = at(1, 0); o += A.note(hx + 9, hy - 8, 210, 172, 'Command token');
    [hx, hy] = at(-2, 2); o += A.note(hx - 5, hy - 3, 40, 186, 'Home system');
    o += A.note(262, 50, 230, 14, 'Strategy cards');
    return o;
  },
});
