defineGame({
  id: 'diplomacy',
  name: 'Diplomacy',
  year: 1959,
  designer: 'Allan B. Calhamer',
  family: 'epic',
  players: [2, 7], best: '7',
  time: [240, 420],
  age: 12,
  mechanics: ['negotiation', 'simultaneous', 'area-control', 'player-elimination'],
  profile: { complexity: 2, luck: 1, interaction: 5, conflict: 5, talk: 5, planning: 4 },

  // Units, supply centers and the four order types (drawn as on an order map). Units take a colour for the walk.
  icons: {
    army: { name: 'army', draw: (A, c = '#2f5fa8', st = '#2a2420') => A.rect(3, 5, 18, 14, c, { rx: 3, stroke: st, sw: 1.2 }) + A.text(12, 12.5, 'A', { size: 10, weight: 800, fill: '#fff' }) },
    fleet: { name: 'fleet', draw: (A, c = '#2f5fa8', st = '#2a2420') => A.path('M3 13 h18 l-4 7 h-10 z', { fill: c, stroke: st, sw: 1.2 }) + A.line(12, 13, 12, 4, { stroke: st, sw: 1.2 }) + A.poly([[12, 4], [18, 10], [12, 10]], c, { stroke: st, sw: 1 }) },
    sc: { name: 'supply center', draw: A => A.circle(12, 12, 8, '#2a2420', { sw: 0 }) + A.circle(12, 12, 5, 'none', { stroke: '#fff', sw: 1.6 }) },
    hold: { name: 'hold', draw: A => A.poly([[8.5, 3.5], [15.5, 3.5], [20.5, 8.5], [20.5, 15.5], [15.5, 20.5], [8.5, 20.5], [3.5, 15.5], [3.5, 8.5]], 'none', { sw: 2.2 }) + A.circle(12, 12, 2.6, '#2a2420', { sw: 0 }) },
    move: { name: 'move', draw: A => A.arrow(3, 12, 21, 12, { sw: 2.6, head: 8 }) },
    support: { name: 'support', draw: A => A.arrow(3, 12, 21, 12, { sw: 2, dash: '3 2.5', head: 7 }) },
    convoy: { name: 'convoy', draw: A => A.path('M2 20 q2.5 -2.5 5 0 t5 0 t5 0 t5 0', { stroke: '#4a8fc0', sw: 1.6 }) + A.curve(4, 15, 12, 1, 20, 15, { sw: 2, head: 6 }) },
  },

  pitch: 'Negotiate, then secretly order every unit; orders resolve at once, with no dice. Own 18 of 34 supply centers to win.',

  goal: { big: '18 centers', text: 'Own **18 of the 34 supply centers** after a Fall turn to win alone. Each center supports one army or fleet.' },

  turn: {
    type: 'simultaneous',
    intro: 'Each season (Spring, then Fall), everyone at once:',
    steps: [
      { verb: 'Negotiate', text: 'Talk privately with anyone. Promises are **not binding**.' },
      { verb: 'Write', text: 'Secretly write one order for **every** unit: {=hold} hold, {=move} move, {=support} support or {=convoy} convoy. No order or an illegal one means hold.' },
      { verb: 'Reveal', text: 'Read all orders and resolve them together: in each clash the highest strength (1 + supports) wins; ties **bounce**.' },
      { verb: 'Retreat', text: 'Each dislodged unit retreats to an adjacent empty province (not the attacker’s origin, not a bounce site) or is disbanded. Two retreats to one province: both disband.' },
    ],
    outro: 'After Fall: build or disband to match your supply centers',
  },

  tension: 'You can’t gain ground without an ally’s support, but your closest ally is best placed to stab you.',

  structure: [
    { label: 'Setup', text: 'Each power has 3 units on its home {=sc} (Russia 4); 12 centers start neutral. Year 1901.' },
    { label: 'Spring', repeat: 'each year', text: 'Negotiate, write orders, resolve, retreat.' },
    { label: 'Fall', repeat: 'each year', text: 'Same as Spring. Then each {=sc} you occupy becomes yours, and stays yours until someone else occupies it after a Fall.' },
    { label: 'Winter', repeat: 'each year', text: 'More centers than units: build in your empty, owned home centers ({=fleet} only on coastal ones). More units than centers: disband the difference.' },
    { label: 'Game end', text: 'A power owns **18** centers after Fall, or all survivors agree a draw.' },
  ],

  end: {
    trigger: 'one power owns 18 supply centers',
    detail: 'Most games end earlier in an agreed draw.',
    results: [
      { side: 'Solo win', text: 'own 18 centers after a Fall turn.' },
      { side: 'Draw', text: 'all remaining players agree to share the result.' },
    ],
  },

  ref: {
    title: 'Orders',
    rows: [
      ['{=hold} Hold', 'Stay put. Strength 1 + supports to hold.'],
      ['{=move} Move', 'To an adjacent province. Strength 1 + supports.'],
      ['{=support} Support', '+1 to a unit holding in, or moving into, a province this unit could move to.'],
      ['{=convoy} Convoy', 'Fleets in a chain of sea spaces (not coasts) carry an army across them; dislodge one and the convoy fails.'],
      ['Notation', 'A Par–Bur (move) · A Mar S A Par–Bur (support) · F Eng C A Lon–Bre (convoy) · A Mun H (hold)'],
      ['{=army} {=fleet} Units', '{=army} on land only; {=fleet} on seas and coasts. Units = supply centers owned.'],
    ],
  },

  example: 'Spring 1901. Germany promised France to leave Burgundy alone, but writes **A Mun–Bur**. France writes **A Par–Bur** and **A Mar S A Par–Bur**. France attacks with strength **2** against Germany’s **1**: France enters Burgundy; the German army bounces and stays in Munich.',

  setup: [
    'Assign the seven powers: England, France, Germany, Italy, Austria-Hungary, Russia, Turkey.',
    'Place starting units on home centers: 3 each, Russia 4. The other 12 centers start neutral.',
    'Talk time: 30 minutes before Spring 1901, 15 before each later season; orders are then written in silence.',
    'Fewer than 7 players: with 6, Italy’s units just hold; with 5, Italy and Germany. 4: one plays England, the others Austria+France, Germany+Turkey, Italy+Russia. 3: England+Germany+Austria, Russia+Italy, France+Turkey. 2: England+France+Russia vs Austria+Germany+Turkey; Italy is neutral and can’t be entered; play starts in 1914, a coin flip before the Fall 1914 builds picks Italy’s side, and the first to 24 centers wins. With 2–4 players, count centers and build per country.',
  ],

  terms: [
    ['{=sc} Supply center', 'A province with a dot. 34 in all; each supports 1 unit.'],
    ['Bounce', 'Equal strengths into the same province: none of them moves.'],
    ['Dislodged', 'Beaten by a stronger attack where it stands; must retreat or disband.'],
    ['Cut support', 'Attacking a supporting unit cancels its support.'],
    ['Stab', 'Breaking a promise to an ally.'],
  ],

  gotchas: [
    'Support is **cut** if the supporting unit is attacked from anywhere except the province it supports into, or is dislodged. Your own attacks never cut your support.',
    'Centers change owner only when occupied **after a Fall** turn; passing through in Spring does nothing.',
    'You can’t dislodge your own unit, and two units can’t swap places by moving into each other (only by convoy).',
    'Spain, Bulgaria and St Petersburg have **two coasts**: a fleet order there must name the coast, and the fleet can then only move along that coast.',
  ],

  tips: [
    'Secure one firm ally early: pick a neighbour and agree a border.',
    'Talk to everyone every season, even enemies; silence makes you a target.',
    'Before you stab, ask whether the extra centers are worth the enemy you create.',
  ],

  walk(A) {
    const C = A.C, FR = '#a9c1e6', DE = '#bdb6aa', NE = '#efe2bd', F = '#2f5fa8', G = '#3b3b3b';
    const prov = [
      [FR, [[30, 120], [70, 72], [90, 88], [80, 125], [45, 140]], 'Bre', 56, 124],
      [FR, [[90, 88], [110, 62], [140, 95], [120, 125], [80, 125]], 'Par', 100, 112],
      [FR, [[45, 140], [80, 125], [120, 125], [115, 160], [60, 175], [35, 160]], 'Gas', 70, 158],
      [FR, [[120, 125], [150, 140], [162, 176], [140, 180], [115, 160]], 'Mar', 138, 170],
      [FR, [[110, 62], [130, 32], [160, 40], [150, 75], [140, 95]], 'Pic', 136, 60],
      [NE, [[140, 95], [150, 75], [190, 80], [195, 125], [150, 140], [120, 125]], 'Bur', 160, 126],
      [NE, [[130, 32], [175, 22], [185, 45], [160, 40]], 'Hol', 166, 30],
      [DE, [[160, 40], [185, 45], [200, 50], [190, 80], [150, 75]], 'Ruh', 176, 66],
      [DE, [[190, 80], [200, 50], [250, 60], [255, 120], [195, 125]], 'Mun', 236, 114],
      [DE, [[175, 22], [205, 0], [250, 0], [250, 60], [200, 50], [185, 45]], 'Kie', 238, 46],
      [DE, [[250, 0], [320, 0], [320, 70], [255, 70], [250, 60]], 'Ber', 300, 60],
      [NE, [[255, 70], [320, 70], [320, 130], [255, 120]], 'Boh', 290, 100],
    ];
    let map = A.bg('#9cc3d9') + A.text(14, 104, 'MAO', { size: 7, fill: '#3e5f78' });
    for (const [f, p, n, lx, ly] of prov) map += A.poly(p, f, { stroke: '#6b5a3e', sw: 1 }) + A.text(lx, ly, n, { size: 7, fill: '#5a4a32' });
    const I = this.icons, sc = (x, y) => A.use(I.sc.draw(A), x - 4.5, y - 4.5, 9);
    map += sc(44, 112) + sc(88, 100) + sc(126, 158) + sc(250, 106) + sc(214, 40) + sc(290, 22) + sc(176, 38);
    const army = (x, y, c) => A.use(I.army.draw(A, c, '#fff'), x - 12, y - 12, 24);
    const fleet = (x, y, c) => A.use(I.fleet.draw(A, c, '#fff'), x - 12, y - 12, 24);
    const P0 = { par: [108, 84], mar: [140, 146], bre: [62, 100], mun: [222, 92], kie: [222, 24], ber: [286, 34] };
    const units = (p) => A.k('par', army(...p.par, F)) + A.k('mar', army(...p.mar, F)) + A.k('bre', fleet(...p.bre, F)) +
      A.k('mun', army(...p.mun, G)) + A.k('kie', fleet(...p.kie, G)) + A.k('ber', army(...p.ber, G));
    const P1 = { ...P0, par: [165, 104], bre: [16, 124], mun: [201, 100], kie: [156, 30], ber: [222, 26] };
    const P2 = { ...P1, mun: [222, 92] };
    const slip = (x, y, who, c, lines) => A.rect(x, y, 84, 48, '#fffdf4', { rx: 2 }) + A.rect(x, y, 84, 11, c, { rx: 2, sw: 0 }) + A.text(x + 42, y + 6, who, { size: 7, weight: 800, fill: '#fff' }) +
      lines.map((l, i) => A.text(x + 6, y + 19 + i * 10, l, { size: 7, weight: 700, serif: true, anchor: 'start' })).join('');
    const slips = A.k('slip-fr', slip(4, 148, 'France', F, ['A Par – Bur', 'A Mar S A Par – Bur', 'F Bre – MAO'])) +
      A.k('slip-de', slip(232, 148, 'Germany', G, ['A Mun – Bur', 'F Kie – Hol', 'A Ber – Kie']));
    const orders = A.k('ord', A.arrow(116, 88, 156, 100, { stroke: F, sw: 2.4 }) + A.curve(146, 136, 168, 128, 162, 112, { stroke: F, sw: 1.6, dash: '3 2' }) +
      A.arrow(212, 94, 178, 104, { stroke: G, sw: 2.4 }) + A.arrow(214, 26, 172, 30, { stroke: G, sw: 2 }) + A.arrow(276, 32, 232, 28, { stroke: G, sw: 2 }) + A.arrow(54, 102, 22, 118, { stroke: F, sw: 2 }));
    const badge = (x, y, n, c) => A.circle(x, y, 7, c, { stroke: '#fff', sw: 1.2 }) + A.text(x, y + 0.5, n, { size: 8, weight: 800, fill: '#fff' });
    return [
      { step: 0, say: 'Spring 1901. Germany privately promises France to stay out of **Burgundy**. Promises are not binding.',
        svg: map + units(P0) + A.k('bub', A.bubble(208, 52, 108, 24, 'I won’t enter Burgundy!', { size: 7.5 })) },
      { step: 1, say: 'Everyone secretly writes an order for **every** unit. Germany writes A Mun – Bur anyway.',
        svg: map + units(P0) + slips + A.k('g-stab', A.rect(235, 161, 52, 12, 'none', { stroke: '#e0a800', sw: 2, rx: 3 })) },
      { step: 2, say: 'Orders are revealed together. Burgundy: France attacks with **2** (1 + {=support} from Marseilles), Germany with **1**.',
        svg: map + units(P0) + slips + orders + badge(150, 88, 2, F) + badge(196, 112, 1, G) },
      { step: 2, say: 'All units move **at once**. The fleets and the Berlin army reach their new provinces…',
        svg: map + units(P1) + slips + A.glow(178, 102, 18, 'g-bur') },
      { step: 2, say: '…but 2 beats 1: France takes Burgundy; the German army **bounces** back to Munich.',
        svg: map + units(P2) + slips + A.glow(165, 104, 16, 'g-fr') },
      { step: 3, say: 'No unit was dislodged, so no retreats. Germany’s fleet is in Holland, but centers change owner only after **Fall**.',
        svg: map + units(P2) + A.glow(176, 38, 12, 'g-hol') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#9cc3d9');
    const FR = '#a9c1e6', DE = '#bdb6aa', NE = '#efe2bd';
    const prov = [
      [FR, [[30, 120], [70, 72], [90, 88], [80, 125], [45, 140]]],          // Brest
      [FR, [[90, 88], [110, 62], [140, 95], [120, 125], [80, 125]]],        // Paris
      [FR, [[45, 140], [80, 125], [120, 125], [115, 160], [60, 175], [35, 160]]], // Gascony
      [FR, [[120, 125], [150, 140], [162, 176], [140, 180], [115, 160]]],   // Marseilles
      [FR, [[110, 62], [130, 32], [160, 40], [150, 75], [140, 95]]],        // Picardy
      [NE, [[140, 95], [150, 75], [190, 80], [195, 125], [150, 140], [120, 125]]], // Burgundy
      [NE, [[130, 32], [175, 22], [185, 45], [160, 40]]],                   // Belgium
      [DE, [[160, 40], [185, 45], [200, 50], [190, 80], [150, 75]]],        // Ruhr
      [DE, [[190, 80], [200, 50], [250, 60], [255, 120], [195, 125]]],      // Munich
      [DE, [[175, 22], [205, 0], [250, 0], [250, 60], [200, 50], [185, 45]]], // Kiel
      [DE, [[250, 0], [320, 0], [320, 70], [255, 70], [250, 60]]],          // Berlin
      [NE, [[255, 70], [320, 70], [320, 130], [255, 120]]],                 // Bohemia
      [NE, [[150, 140], [195, 125], [255, 120], [320, 130], [320, 200], [218, 200], [186, 170], [162, 176]]], // Alps
    ];
    for (const [f, p] of prov) o += A.poly(p, f, { stroke: '#6b5a3e', sw: 1 });
    const I = this.icons, sc = (x, y) => A.use(I.sc.draw(A), x - 4.8, y - 4.8, 9.6);
    o += sc(52, 112) + sc(100, 98) + sc(132, 160) + sc(158, 32) + sc(230, 98) + sc(226, 26) + sc(296, 30);
    const army = (x, y, c) => A.use(I.army.draw(A, c, '#fff'), x - 10.67, y - 10.67, 21.33);
    const fleet = (x, y, c) => A.use(I.fleet.draw(A, c, '#fff'), x - 12, y - 15, 24);
    const F = '#2f5fa8', G = '#3b3b3b';
    o += army(108, 84, F) + army(140, 150, F) + fleet(58, 98, F);
    o += army(222, 82, G) + fleet(222, 14, G) + army(288, 46, G);
    // orders
    o += A.curve(116, 82, 140, 78, 160, 102, { stroke: F, sw: 2.4 });
    o += A.curve(146, 140, 168, 128, 154, 108, { stroke: F, sw: 1.6, dash: '3 2' });
    o += A.curve(212, 84, 196, 88, 176, 104, { stroke: G, sw: 2.4 });
    o += A.star(166, 104, 8, '#c8423b', { stroke: '#fff', sw: 1 });
    // written order slip
    o += A.rect(6, 160, 80, 34, '#fffdf4', { rx: 2 });
    o += A.text(46, 170, 'A Par–Bur', { size: 8, weight: 700, serif: true });
    o += A.text(46, 183, 'A Mar S A Par–Bur', { size: 7.5, weight: 700, serif: true });
    o += A.note(158, 32, 96, 14, 'Supply center');
    o += A.note(170, 108, 262, 150, 'Clash: 2 beats 1');
    o += A.note(156, 120, 214, 182, 'Support +1');
    o += A.note(46, 160, 60, 140, 'Secret orders');
    return o;
  },
});
