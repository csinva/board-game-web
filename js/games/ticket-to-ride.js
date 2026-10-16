defineGame({
  id: 'ticket-to-ride',
  name: 'Ticket to Ride',
  year: 2004,
  designer: 'Alan R. Moon',
  family: 'build',
  players: [2, 5], best: '4',
  time: [30, 60],
  age: 8,
  mechanics: ['network', 'set-collection', 'hand-management', 'drafting'],
  profile: { complexity: 1, luck: 3, interaction: 3, conflict: 2, talk: 2, planning: 3 },

  pitch: 'Collect sets of coloured train cards and spend them to claim railway routes, linking the cities on your secret tickets.',
  theme: 'You are a rail baron racing across America to connect cities before your rivals block the lines.',

  goal: { big: 'Most points', text: 'Score the **most points** from claimed routes, completed destination tickets and the longest continuous path. Unfinished tickets cost you points.' },

  turn: {
    type: 'choose',
    steps: [
      { verb: 'Draw cards', text: 'Take **2** train cards, face-up or from the deck. A face-up locomotive counts as both picks.' },
      { verb: 'Claim route', text: 'Play cards of **one colour** equal to a route’s length and place your trains on it. Score it at once.' },
      { verb: 'Tickets', text: 'Draw **3** destination tickets and keep at least 1.' },
    ],
  },

  tension: 'Each turn you either draw cards to build a hand or claim a route before someone else does, and waiting too long can see a rival block the only line you need.',

  flow: [
    { label: 'Collect', items: ['Train cards', 'Sets of one colour', 'Locomotives (wild)'] },
    { label: 'Claim', items: ['Routes of 1–6 trains', 'Gray: any one colour', 'Link your ticket cities'] },
    { label: 'Score', items: ['Route points', 'Completed tickets +', 'Failed tickets −', 'Longest path +10'] },
  ],

  end: { trigger: 'a player ends a turn with 2 or fewer trains left', detail: 'Everyone, including that player, takes **one final turn**. Then reveal and score tickets.' },
  scoring: [
    { label: 'Routes', share: 5 },
    { label: 'Tickets', share: 4 },
    { label: 'Longest path', share: 1 },
  ],

  ref: {
    title: 'Route points',
    rows: [
      ['1 train', '1 point'],
      ['2 trains', '2 points'],
      ['3 trains', '4 points'],
      ['4 trains', '7 points'],
      ['5 trains', '10 points'],
      ['6 trains', '15 points'],
    ],
  },

  example: 'Your secret ticket is **Denver–El Paso (4 points)**. You play 2 orange cards to claim the gray 2-train Denver–Santa Fe route (gray takes any one colour), place 2 trains and score **2 points**. One more 2-train route, Santa Fe–El Paso, will complete the ticket.',

  setup: [
    'Each player takes 45 trains of one colour and 4 train cards.',
    'Deal 3 destination tickets each; keep at least 2.',
    'Turn 5 train cards face-up beside the deck.',
  ],

  terms: [
    ['Train card', 'Coloured card you spend to claim routes.'],
    ['Locomotive', 'Rainbow wild card; can stand in for any colour.'],
    ['Destination ticket', 'Secret goal: link two cities for its points, or lose them.'],
    ['Double route', 'Two parallel routes between the same cities.'],
  ],

  gotchas: [
    'If you take a face-up locomotive, that is your **whole draw**. You also can’t take one as your second card.',
    'In 2–3 player games only **one** track of each double route can be used.',
    'If 3 locomotives are ever face-up at once, discard all 5 and deal 5 new cards.',
  ],

  tips: [
    'Keep your first tickets and finish them; a big unfinished ticket can wipe out your lead.',
    'Claim the scarce, bottleneck routes on your path first; draw cards for the rest.',
    'Long routes are worth far more per train: a 6-route scores 15, six 1-routes only 6.',
  ],

  walk(A) {
    const C = A.C, gray = '#9a958c';
    const P = { den: [70, 40], sf: [118, 108], ep: [96, 172], phx: [26, 130], okc: [176, 92] };
    const NM = { den: 'Denver', sf: 'Santa Fe', ep: 'El Paso', phx: 'Phoenix', okc: 'Okla. City' };
    const ends = (a, b) => { const [x1, y1] = P[a], [x2, y2] = P[b], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d; return [x1 + ux * 9, y1 + uy * 9, x2 - ux * 9, y2 - uy * 9]; };
    const R = [['den', 'sf', 2, gray], ['sf', 'ep', 2, gray], ['den', 'okc', 4, C.yellow], ['sf', 'okc', 3, C.blue], ['phx', 'sf', 3, gray], ['phx', 'ep', 3, C.green]];
    let board = A.bg('#e8dab4') + A.rect(200, 0, 120, 200, '#f6efe0', { sw: 0, rx: 0 }) + A.line(200, 0, 200, 200, { sw: 2 });
    for (const [a, b, n, f] of R) board += A.route(...ends(a, b), n, f, { w: 9 });
    for (const k in P) board += A.circle(P[k][0], P[k][1], 6.5, C.red, { sw: 1.5 }) + A.circle(P[k][0], P[k][1], 2.5, C.cream, { sw: 0 });
    board += A.text(70, 26, NM.den, { size: 8 }) + A.text(146, 116, NM.sf, { size: 8 }) + A.text(130, 178, NM.ep, { size: 8 }) + A.text(26, 116, NM.phx, { size: 8 }) + A.text(178, 108, NM.okc, { size: 8 });
    board += A.text(260, 10, 'Face-up cards', { size: 8, fill: '#6d5a3a' });
    board += A.text(218, 92, 'Deck', { size: 7, fill: '#6d5a3a' }) + A.card(208, 52, 20, 28, '#4a4a6a', { label: '?', size: 10 });
    // Ticket
    board += A.card(240, 50, 72, 40, '#efe4c6', { face: '#efe4c6' }) + A.text(274, 62, 'Denver – El Paso', { size: 6.5, weight: 700 }) + A.text(274, 76, '4', { size: 12, weight: 800 });
    board += A.tag(260, 118, 'Your hand', { fill: C.red });
    const tc = (x, y, f) => {
      if (f !== 'loco') return A.card(x, y, 20, 28, f, {}) + A.rect(x + 5, y + 11, 10, 6, 'rgba(255,255,255,.75)', { rx: 1.5, sw: 0.6 });
      let s = A.card(x, y, 20, 28, C.white, {});
      ['#c8423b', '#e07b2e', '#e2b33c', '#3c8d4f', '#2f6db5', '#7d55b5'].forEach((c, i) => { s += A.rect(x + 3, y + 3 + i * 3.67, 14, 3.67, c, { sw: 0, rx: 0 }); });
      return s;
    };
    const disp = (i) => [206 + i * 22, 18], hand = (i) => [206 + i * 22, 132];
    const show = ['blue', 'or', 'loco', 'green', 'pink'], F = { blue: C.blue, or: C.orange, loco: 'loco', green: C.green, pink: C.pink };
    const display = (skip, extra = '') => show.map((c, i) => i === skip ? '' : A.k('d-' + c, tc(...disp(i), F[c]))).join('') + extra;
    const h0 = A.k('h-or', tc(...hand(0), C.orange)) + A.k('h-pink', tc(...hand(1), C.pink)) + A.k('h-blue', tc(...hand(2), C.blue));
    const score = (n) => A.k('score' + n, A.rect(206, 170, 56, 18, C.white, { rx: 9, sw: 1 }) + A.text(234, 179, 'Score ' + n, { size: 8.5, weight: 800 }));
    const [a1, b1, a2, b2] = ends('den', 'sf'), mid = [(a1 + a2) / 2, (b1 + b2) / 2];
    const refill = A.k('d-new', tc(...disp(1), C.yellow)), top = A.k('deck', A.card(208, 52, 20, 28, '#4a4a6a', { label: '?', size: 10 }));
    return [
      { step: 0, say: 'Your secret ticket is **Denver – El Paso** (4 points). You need a line of your trains between them.', svg: board + display() + top + h0 + score(0) + A.glow(...P.den, 12, 'g-den') + A.glow(...P.ep, 12, 'g-ep') },
      { step: 0, say: '**Draw cards.** Take the face-up **orange** card. A new card is turned up to replace it.', svg: board + display(1, refill) + top + h0 + A.k('d-or', tc(...hand(3), C.orange)) + score(0) },
      { step: 0, say: 'Your second card comes blind from the deck: green. That was your whole turn.', svg: board + display(1, refill) + h0 + A.k('d-or', tc(...hand(3), C.orange)) + A.k('deck', tc(...hand(4), C.green)) + score(0) },
      { step: 1, say: '**Next turn, claim a route.** The gray Denver – Santa Fe route takes 2 cards of any one colour: play your 2 oranges.', svg: board + display(1, refill) + A.k('h-pink', tc(...hand(0), C.pink)) + A.k('h-blue', tc(...hand(1), C.blue)) + A.k('deck', tc(...hand(2), C.green)) +
        A.k('h-or', tc(mid[0] - 22, mid[1] - 14, C.orange)) + A.k('d-or', tc(mid[0] + 2, mid[1] - 14, C.orange)) + score(0) },
      { step: 1, say: 'The cards are discarded and 2 of your trains go on the route. A 2-train route scores **2 points**.', svg: board + display(1, refill) + A.k('h-pink', tc(...hand(0), C.pink)) + A.k('h-blue', tc(...hand(1), C.blue)) + A.k('deck', tc(...hand(2), C.green)) +
        A.k('trains', A.route(a1, b1, a2, b2, 2, gray, { w: 9, trains: C.red })) + score(2) + A.glow(mid[0], mid[1], 22, 'g-route') },
      { step: 1, say: 'One more 2-train route, **Santa Fe – El Paso**, completes the ticket for +4 at the end.', svg: board + display(1, refill) + A.k('h-pink', tc(...hand(0), C.pink)) + A.k('h-blue', tc(...hand(1), C.blue)) + A.k('deck', tc(...hand(2), C.green)) +
        A.k('trains', A.route(a1, b1, a2, b2, 2, gray, { w: 9, trains: C.red })) + score(2) + A.glow(107, 140, 22, 'g-next') },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#e8dab4');
    o += A.path('M0 140 Q80 128 160 136 T320 132 V200 H0 Z', { fill: '#d8c79a', sw: 0 });
    const P = { sea: [26, 26], hel: [104, 18], dul: [196, 24], tor: [294, 34], sf: [40, 92], den: [138, 80], chi: [236, 84], la: [96, 126], ep: [176, 124] };
    const R = [
      ['sea', 'hel', 6, '#9a958c'], ['sea', 'sf', 5, C.green], ['hel', 'den', 4, C.yellow], ['sf', 'den', 5, C.white],
      ['hel', 'dul', 6, C.orange], ['dul', 'tor', 6, C.pink], ['dul', 'den', 4, C.red], ['den', 'chi', 4, C.blue],
      ['tor', 'chi', 4, C.white], ['sf', 'la', 3, C.yellow], ['la', 'ep', 3, C.black], ['den', 'ep', 4, C.blue], ['ep', 'chi', 4, C.orange],
    ];
    const claimed = { 'sea-sf': C.red, 'sf-den': C.red, 'den-ep': C.blue, 'hel-dul': C.yellow, 'den-chi': C.green };
    for (const [a, b, n, f] of R) {
      const [x1, y1] = P[a], [x2, y2] = P[b], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
      const t = claimed[a + '-' + b];
      o += A.route(x1 + ux * 8, y1 + uy * 8, x2 - ux * 8, y2 - uy * 8, n, f, { w: 8, trains: t });
    }
    for (const k in P) o += A.circle(P[k][0], P[k][1], 6, '#c8423b', { sw: 1.5 }) + A.circle(P[k][0], P[k][1], 2.5, C.cream, { sw: 0 });
    // ticket
    o += A.card(10, 146, 50, 44, '#efe4c6', { face: '#efe4c6' });
    o += A.circle(22, 160, 3, C.red, { sw: 1 }) + A.circle(48, 178, 3, C.red, { sw: 1 }) + A.path('M22 160 Q28 176 48 178', { stroke: C.red, sw: 1.4, dash: '2 2' });
    o += A.text(49, 157, '9', { size: 11, weight: 800 });
    // face-up train cards
    const cards = [C.blue, C.orange, 'loco', C.green, C.pink];
    cards.forEach((f, i) => {
      const x = 150 + i * 33, y = 150;
      if (f === 'loco') {
        o += A.card(x, y, 30, 42, C.white, {});
        ['#c8423b', '#e07b2e', '#e2b33c', '#3c8d4f', '#2f6db5', '#7d55b5'].forEach((c, k) => { o += A.rect(x + 3, y + 3 + k * 6, 24, 6, c, { sw: 0, rx: 0 }); });
      } else o += A.card(x, y, 30, 42, f, {});
      o += A.rect(x + 7, y + 17, 16, 8, 'rgba(255,255,255,.75)', { rx: 2, sw: 0.8 }) + A.circle(x + 10, y + 26, 2, C.ink, { sw: 0 }) + A.circle(x + 20, y + 26, 2, C.ink, { sw: 0 });
    });
    o += A.note(83, 86, 70, 60, 'Claimed route');
    o += A.note(40, 168, 104, 146, 'Secret ticket', { w: 80 });
    o += A.note(222, 152, 272, 118, 'Locomotive = wild');
    o += A.note(152, 172, 104, 178, 'Face-up cards');
    return o;
  },
});
