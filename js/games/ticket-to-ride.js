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

  // Train cards, trains and tickets: used inline in text and drawn the same way in art + walk.
  icons: (() => {
    const tc = (fill, name) => ({ name, draw: A => A.rect(4, 1, 16, 22, fill, { rx: 2.5, sw: 1.3 }) + A.rect(7, 8.5, 10, 6, 'rgba(255,255,255,.8)', { rx: 1.5, sw: 0.7 }) + A.circle(9.2, 15.5, 1.3, '#2a2420', { sw: 0 }) + A.circle(14.8, 15.5, 1.3, '#2a2420', { sw: 0 }) });
    return {
      red: tc('#c8423b', 'red card'), orange: tc('#e07b2e', 'orange card'), yellow: tc('#e2b33c', 'yellow card'), green: tc('#3c8d4f', 'green card'),
      blue: tc('#2f6db5', 'blue card'), pink: tc('#d9668f', 'pink card'), black: tc('#2b2b2b', 'black card'), white: tc('#ffffff', 'white card'),
      loco: { name: 'locomotive', draw: A => A.rect(4, 1, 16, 22, '#fff', { rx: 2.5, sw: 1.3 }) + ['#c8423b', '#e07b2e', '#e2b33c', '#3c8d4f', '#2f6db5', '#7d55b5'].map((c, i) => A.rect(6, 3 + i * 3, 12, 3, c, { rx: 0, sw: 0 })).join('') + A.rect(4, 1, 16, 22, 'none', { rx: 2.5, sw: 1.3 }) },
      train: { name: 'train', draw: A => A.rect(2, 7, 20, 9, '#c8423b', { rx: 2.5, sw: 1.3 }) + A.rect(5, 9.5, 6, 3.5, 'rgba(255,255,255,.6)', { rx: 0.8, sw: 0 }) + A.rect(13, 9.5, 6, 3.5, 'rgba(255,255,255,.6)', { rx: 0.8, sw: 0 }) + A.circle(7, 17.5, 2.2, '#2a2420', { sw: 0 }) + A.circle(17, 17.5, 2.2, '#2a2420', { sw: 0 }) },
      ticket: { name: 'destination ticket', draw: A => A.rect(1, 4, 22, 16, '#efe4c6', { rx: 2, sw: 1.3 }) + A.path('M6 9 Q8 17 17 15', { stroke: '#c8423b', sw: 1.3, dash: '2 1.6' }) + A.circle(6, 9, 2.4, '#c8423b', { sw: 0.9 }) + A.circle(17, 15, 2.4, '#c8423b', { sw: 0.9 }) },
    };
  })(),

  pitch: 'Collect sets of train cards to claim routes between cities; long routes and completed tickets score most.',

  goal: { big: 'Most points', text: 'Score the most points from routes you claim, destination tickets you complete, and the longest continuous path. Each ticket you have not completed at the end **subtracts** its value.' },

  turn: {
    type: 'choose',
    steps: [
      { verb: 'Draw cards', text: 'Take **2** train cards {=orange}{=green}, one at a time, each from the 5 face-up cards (refill the gap at once) or from the top of the deck. Taking a face-up {loco} uses your whole draw.' },
      { verb: 'Claim route', text: 'Claim **one** unclaimed route: discard one card of its colour per space ({=blue}{=blue}{=blue} for a 3-space blue route; a gray route takes cards of any **one** colour). Put one of your {train}s on each space and score it now.' },
      { verb: 'Tickets', text: 'Draw the top **3** {ticket}s; keep at least 1, secretly. Put the rest on the bottom of the ticket pile.' },
    ],
  },

  tension: 'Every turn spent drawing cards is a turn a rival can take the one route you need.',

  structure: [
    { label: 'Setup', text: 'Deal each player 4 train cards and 3 {ticket}s; each player keeps at least 2 of those tickets. Turn 5 train cards face up.' },
    { label: 'Turns', repeat: 'clockwise', text: 'On your turn, do exactly one: draw train cards, claim one route, or draw tickets. Play passes clockwise; there are no rounds or phases.' },
    { label: 'Last round', text: 'When a player ends a turn with **0, 1 or 2** {=train} left, every player, including that player, takes one more turn.' },
    { label: 'Final scoring', text: 'Everyone reveals their tickets: add each completed ticket’s value and subtract each incomplete one’s. The longest continuous path scores +10.' },
  ],

  points: [
    ['{=train} Route', 'scored when you claim it, by its number of spaces (see table)'],
    ['{=ticket} Completed ticket', '+ its value at game end'],
    ['{=ticket} Incomplete ticket', '− its value at game end'],
    ['Longest path', '+10 for the longest continuous line of your own trains. It may loop and pass through a city more than once, but no train counts twice. If tied, every tied player scores 10.'],
  ],

  end: { trigger: 'a player ends a turn with 2 or fewer trains left', detail: 'Everyone, including that player, takes **one final turn**. Then reveal and score tickets. If tied, the player who completed the most tickets wins; if still tied, the one with the longest-path bonus wins.' },
  scoring: [
    { label: '{=train} Routes', share: 5 },
    { label: '{=ticket} Tickets', share: 4 },
    { label: 'Longest path', share: 1 },
  ],

  ref: {
    title: 'Route points by length',
    rows: [
      ['{=train}', '1'],
      ['{=train}{=train}', '2'],
      ['{=train}{=train}{=train}', '4'],
      ['{=train}{=train}{=train}{=train}', '7'],
      ['{=train}{=train}{=train}{=train}{=train}', '10'],
      ['{=train}{=train}{=train}{=train}{=train}{=train}', '15'],
    ],
  },

  example: 'Your {=ticket} is **Denver–El Paso (4)**. You discard {=orange}{=orange} to claim the gray 2-space Denver–Santa Fe route, place {=train}{=train} and score **2**. Claiming Santa Fe–El Paso (2 spaces) later would complete the ticket.',

  setup: [
    'Each player takes 45 {train}s of one colour. Shuffle the train cards and deal 4 to each player.',
    'Shuffle the {ticket}s and deal 3 to each player. Each player secretly keeps at least 2 and returns the rest to the bottom of the ticket pile.',
    'Each player puts their scoring marker on the start of the score track.',
    'Turn 5 train cards face up beside the deck.',
    'The most experienced traveller goes first; turns then pass clockwise.',
  ],

  terms: [
    ['{=red} Train card', 'Coloured card spent to claim routes.'],
    ['{=loco} Locomotive', 'Wild: counts as any colour.'],
    ['{=ticket} Destination ticket', 'Secret card naming two cities. If your own routes connect them by game end, add its points; if not, subtract them.'],
    ['Double route', 'Two parallel routes between the same two cities.'],
  ],

  gotchas: [
    'A face-up {loco} is your **whole draw**, and you can’t take one as your second card. A {loco} drawn blind from the deck counts as one card.',
    'Gray routes take any **one** colour; coloured routes need that colour. A {loco} can replace a card of any colour.',
    'A claimed route need not connect to your other routes.',
    'No player may claim both routes of a double route. With 2–3 players, once one route of a double is claimed, the other is **closed** to everyone.',
    'If 3 {=loco} are ever face up at the same time, discard all 5 face-up cards and turn up 5 new ones.',
    'When the deck runs out, shuffle the discards into a new deck. If there are none, you can’t draw cards.',
    'If fewer than 3 {ticket}s remain, draw all that are left.',
  ],

  tips: [
    'Finish your first tickets before drawing more; an unfinished big ticket can erase your lead.',
    'Claim first the routes on your path that have no alternative; draw cards for the rest.',
    'Long routes pay more per train: one 6-space route scores 15, but six 1-space routes score only 6.',
  ],

  walk(A) {
    const C = A.C, gray = '#9a958c';
    const P = { den: [70, 40], sf: [118, 108], ep: [96, 172], phx: [26, 130], okc: [176, 92] };
    const NM = { den: 'Denver', sf: 'Santa Fe', ep: 'El Paso', phx: 'Phoenix', okc: 'Okla. City' };
    const ends = (a, b) => { const [x1, y1] = P[a], [x2, y2] = P[b], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d; return [x1 + ux * 9, y1 + uy * 9, x2 - ux * 9, y2 - uy * 9]; };
    const R = [['den', 'sf', 2, gray], ['sf', 'ep', 2, gray], ['sf', 'okc', 3, C.blue], ['phx', 'sf', 3, gray], ['phx', 'ep', 3, gray]];
    let board = A.bg('#e8dab4') + A.rect(200, 0, 120, 200, '#f6efe0', { sw: 0, rx: 0 }) + A.line(200, 0, 200, 200, { sw: 2 });
    for (const [a, b, n, f] of R) board += A.route(...ends(a, b), n, f, { w: 9 });
    for (const k in P) board += A.circle(P[k][0], P[k][1], 6.5, C.red, { sw: 1.5 }) + A.circle(P[k][0], P[k][1], 2.5, C.cream, { sw: 0 });
    board += A.text(70, 26, NM.den, { size: 8 }) + A.text(146, 116, NM.sf, { size: 8 }) + A.text(130, 178, NM.ep, { size: 8 }) + A.text(26, 116, NM.phx, { size: 8 }) + A.text(178, 108, NM.okc, { size: 8 });
    board += A.text(260, 10, 'Face-up cards', { size: 8, fill: '#6d5a3a' });
    board += A.text(218, 92, 'Deck', { size: 7, fill: '#6d5a3a' }) + A.card(208, 52, 20, 28, '#4a4a6a', { label: '?', size: 10 });
    // Ticket
    board += A.card(240, 50, 72, 40, '#efe4c6', { face: '#efe4c6' }) + A.text(274, 62, 'Denver – El Paso', { size: 6.5, weight: 700 }) + A.text(274, 76, '4', { size: 12, weight: 800 });
    board += A.tag(260, 118, 'Your hand', { fill: C.red });
    // Same drawings as the inline card icons (20×27 here).
    const tc = (x, y, f) => A.rect(x + 2, y + 3, 20, 27.5, C.shadow, { sw: 0, rx: 3 }) + A.use(this.icons[f].draw(A), x - 5, y - 1.25, 30);
    const disp = (i) => [206 + i * 22, 18], hand = (i) => [206 + i * 22, 132];
    const show = ['blue', 'or', 'loco', 'green', 'pink'], F = { blue: 'blue', or: 'orange', loco: 'loco', green: 'green', pink: 'pink' };
    const display = (skip, extra = '') => show.map((c, i) => i === skip ? '' : A.k('d-' + c, tc(...disp(i), F[c]))).join('') + extra;
    const h0 = A.k('h-or', tc(...hand(0), 'orange')) + A.k('h-pink', tc(...hand(1), 'pink')) + A.k('h-blue', tc(...hand(2), 'blue'));
    const score = (n) => A.k('score' + n, A.rect(206, 170, 56, 18, C.white, { rx: 9, sw: 1 }) + A.text(234, 179, 'Score ' + n, { size: 8.5, weight: 800 }));
    const [a1, b1, a2, b2] = ends('den', 'sf'), mid = [(a1 + a2) / 2, (b1 + b2) / 2];
    const refill = A.k('d-new', tc(...disp(1), 'yellow')), top = A.k('deck', A.card(208, 52, 20, 28, '#4a4a6a', { label: '?', size: 10 }));
    return [
      { step: 0, say: 'Your secret {=ticket}: **Denver – El Paso** (4 points). Connect them with your trains.', svg: board + display() + top + h0 + score(0) + A.glow(...P.den, 12, 'g-den') + A.glow(...P.ep, 12, 'g-ep') },
      { step: 0, say: '**Draw cards.** Take the face-up {=orange}. A new card fills its slot.', svg: board + display(1, refill) + top + h0 + A.k('d-or', tc(...hand(3), 'orange')) + score(0) },
      { step: 0, say: 'Second card, from the top of the deck: {=green}. Your turn is over.', svg: board + display(1, refill) + h0 + A.k('d-or', tc(...hand(3), 'orange')) + A.k('deck', tc(...hand(4), 'green')) + score(0) },
      { step: 1, say: '**Next turn: claim.** Gray Denver – Santa Fe takes 2 cards of any one colour: play {=orange}{=orange}.', svg: board + display(1, refill) + A.k('h-pink', tc(...hand(0), 'pink')) + A.k('h-blue', tc(...hand(1), 'blue')) + A.k('deck', tc(...hand(2), 'green')) +
        A.k('h-or', tc(mid[0] - 22, mid[1] - 14, 'orange')) + A.k('d-or', tc(mid[0] + 2, mid[1] - 14, 'orange')) + score(0) },
      { step: 1, say: 'Discard the cards and place 2 {train}s. A 2-train route scores **2 points**.', svg: board + display(1, refill) + A.k('h-pink', tc(...hand(0), 'pink')) + A.k('h-blue', tc(...hand(1), 'blue')) + A.k('deck', tc(...hand(2), 'green')) +
        A.k('trains', A.route(a1, b1, a2, b2, 2, gray, { w: 9, trains: C.red })) + score(2) + A.glow(mid[0], mid[1], 22, 'g-route') },
      { step: 1, say: '**Santa Fe – El Paso** (2 trains) would complete the ticket: +4 at game end.', svg: board + display(1, refill) + A.k('h-pink', tc(...hand(0), 'pink')) + A.k('h-blue', tc(...hand(1), 'blue')) + A.k('deck', tc(...hand(2), 'green')) +
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
    // Face-up train cards: the same drawings as the inline icons.
    ['blue', 'orange', 'loco', 'green', 'pink'].forEach((k, i) => {
      const x = 150 + i * 33, y = 150;
      o += A.rect(x + 2, y + 3, 30, 41, C.shadow, { sw: 0, rx: 4 }) + A.use(this.icons[k].draw(A), x - 7.5, y - 1.9, 45);
    });
    o += A.note(83, 86, 70, 60, 'Claimed route');
    o += A.note(40, 168, 104, 146, 'Secret ticket', { w: 80 });
    o += A.note(222, 152, 272, 118, 'Locomotive = wild');
    o += A.note(152, 172, 104, 178, 'Face-up cards');
    return o;
  },
});
