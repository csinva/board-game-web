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
