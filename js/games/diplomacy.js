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

  pitch: 'No dice, no luck: seven powers carve up 1901 Europe with secret deals, then write orders that reveal who was lying.',
  theme: 'You are one of the seven Great Powers of pre-war Europe, fighting for control of the continent.',

  goal: { big: '18 centers', text: 'Own **18 of the 34 supply centers** after a Fall turn to win alone. Each center you own supports one army or fleet.' },

  turn: {
    type: 'simultaneous',
    intro: 'Every season (Spring, then Fall) all players do the same thing at once:',
    steps: [
      { verb: 'Negotiate', text: 'Talk in private with anyone. Promises are **not binding**.' },
      { verb: 'Write', text: 'Secretly write one order for **every** unit you own: hold, move, support or convoy.' },
      { verb: 'Reveal', text: 'All orders are read out together and resolved: the side with more **support** wins each clash; ties bounce.' },
      { verb: 'Retreat', text: 'Dislodged units retreat to an empty neighbour or are destroyed.' },
    ],
    outro: 'After Fall: adjust units to match your supply-center count.',
  },

  tension: 'You cannot gain ground without an ally’s support, but the ally you trust most is the one best placed to stab you.',

  flow: [
    { label: 'Ally', items: ['Agree borders', 'Promise supports', 'Coordinate attacks'] },
    { label: 'Take', items: ['Move into centers', 'Hold them through Fall', 'Dislodge rivals'] },
    { label: 'Grow', items: ['Winter: build 1 unit per new center', 'Remove units if you lost centers'] },
  ],

  end: {
    trigger: 'one power owns 18 supply centers',
    detail: 'Most games end earlier, when the survivors agree to a draw.',
    results: [
      { side: 'Solo win', text: 'own 18 centers after a Fall turn.' },
      { side: 'Draw', text: 'all remaining players agree to share the result.' },
    ],
  },

  ref: {
    title: 'Orders',
    rows: [
      ['Hold', 'Stay put. Strength 1, plus any support to hold.'],
      ['Move', 'Into an adjacent province. Strength 1 + supports.'],
      ['Support', 'Add +1 to a unit holding or moving into a province you could move to.'],
      ['Convoy', 'A fleet at sea carries an army across that sea space.'],
      ['Build / Disband', 'Winter only: units = centers owned.'],
    ],
  },

  example: 'Spring 1901. Germany promised France to leave Burgundy alone, but writes **A Mun–Bur**. France writes **A Par–Bur** and **A Mar S A Par–Bur**. Orders are read: France moves with strength **2** against Germany’s **1**, so France enters Burgundy and the German army bounces back to Munich.',

  setup: [
    'Assign the seven powers: England, France, Germany, Italy, Austria-Hungary, Russia, Turkey.',
    'Place starting units on home centers (3 each; Russia 4). The other 12 centers start neutral.',
    'Agree on talk time per season (often 15 minutes) and start in Spring 1901.',
  ],

  terms: [
    ['Supply center', 'A province with a dot. 34 in all; each supports 1 unit.'],
    ['Army / Fleet', 'Armies move on land; fleets move on sea and coasts.'],
    ['Bounce', 'Equal-strength moves into the same place: nobody moves.'],
    ['Cut support', 'An attack on a supporting unit cancels its support.'],
    ['Stab', 'Breaking a promise to an ally. Expected, never forgiven.'],
  ],

  gotchas: [
    'Support is **cut** if the supporting unit is attacked from anywhere except the province it is supporting into.',
    'Centers change owner only if you occupy them **after a Fall** move; passing through in Spring does nothing.',
    'You may build only in your **original home centers**, and only if they are empty and still yours.',
  ],

  tips: [
    'You need at least one firm ally early. Pick a neighbour and agree a border.',
    'Talk to everyone, every season, even enemies: silence makes you a target.',
    'Before you stab, count: will the extra centers be worth the enemy you create?',
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
    const sc = (x, y) => A.circle(x, y, 3, '#2a2420', { stroke: '#fff', sw: 1 });
    map += sc(44, 112) + sc(88, 100) + sc(126, 158) + sc(250, 106) + sc(214, 40) + sc(290, 22) + sc(176, 38);
    const army = (x, y, c) => A.rect(x - 9, y - 7, 18, 14, c, { rx: 3, stroke: '#fff', sw: 1.2 }) + A.text(x, y + 0.5, 'A', { size: 8, weight: 800, fill: '#fff' });
    const fleet = (x, y, c) => A.path(`M${x - 9} ${y + 1} h18 l-4 7 h-10 z`, { fill: c, stroke: '#fff', sw: 1.2 }) + A.line(x, y + 1, x, y - 8, { stroke: '#fff', sw: 1.2 }) + A.poly([[x, y - 8], [x + 6, y - 2], [x, y - 2]], c, { stroke: '#fff', sw: 1 });
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
      { step: 0, say: 'Spring 1901. Germany privately promises France: “I’ll stay out of **Burgundy**.” Promises are not binding.',
        svg: map + units(P0) + A.k('bub', A.bubble(208, 52, 108, 24, 'I won’t enter Burgundy!', { size: 7.5 })) },
      { step: 1, say: 'Everyone secretly writes an order for **every** unit. Germany writes A Mun – Bur anyway.',
        svg: map + units(P0) + slips + A.k('g-stab', A.rect(235, 161, 52, 12, 'none', { stroke: '#e0a800', sw: 2, rx: 3 })) },
      { step: 2, say: 'All orders are revealed at once. Burgundy: France moves with **2** (1 + Marseilles’ support), Germany with **1**.',
        svg: map + units(P0) + slips + orders + badge(150, 88, 2, F) + badge(196, 112, 1, G) },
      { step: 2, say: 'Every unit moves **at the same time**. The fleets and the Berlin army slip into their new provinces…',
        svg: map + units(P1) + slips + A.glow(178, 102, 18, 'g-bur') },
      { step: 2, say: '…but 2 beats 1: France takes Burgundy and the German army **bounces** back to Munich.',
        svg: map + units(P2) + slips + A.glow(165, 104, 16, 'g-fr') },
      { step: 3, say: 'Nobody was dislodged, so no retreats. Germany’s fleet sits in Holland, but centers only change owner after a **Fall** move.',
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
    const sc = (x, y) => A.circle(x, y, 3.2, '#2a2420', { stroke: '#fff', sw: 1 });
    o += sc(52, 112) + sc(100, 98) + sc(132, 160) + sc(158, 32) + sc(230, 98) + sc(226, 26) + sc(296, 30);
    const army = (x, y, c) => A.rect(x - 8, y - 6, 16, 12, c, { rx: 3, stroke: '#fff', sw: 1.2 }) + A.text(x, y + 0.5, 'A', { size: 8, weight: 800, fill: '#fff' });
    const fleet = (x, y, c) => A.path(`M${x - 9} ${y - 2} h18 l-4 7 h-10 z`, { fill: c, stroke: '#fff', sw: 1.2 }) + A.line(x, y - 2, x, y - 10, { stroke: '#fff', sw: 1.2 }) + A.poly([[x, y - 10], [x + 6, y - 4], [x, y - 4]], c, { stroke: '#fff', sw: 1 });
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
    o += A.note(46, 160, 60, 140, 'Secret written orders');
    return o;
  },
});
