defineGame({
  id: 'wavelength',
  name: 'Wavelength',
  year: 2019,
  designer: 'Alex Hague, Justin Vickers & Wolfgang Warsch',
  family: 'party',
  players: [2, 12], best: '6–8',
  time: [30, 45],
  age: 14,
  mechanics: ['party', 'team', 'deduction', 'limited-communication'],
  profile: { complexity: 1, luck: 2, interaction: 4, conflict: 2, talk: 5, planning: 1 },

  // Target bands use the device's colours: blue 4, orange 3, yellow 2.
  icons: (() => {
    const band = (n, fill) => ({ name: n + '-point band', draw: A => A.path('M12 22.5 L22.5 4.3 A21 21 0 0 0 1.5 4.3 Z', { fill, sw: 1.3 }) + A.text(12, 10.5, n, { size: 11, weight: 800, fill: '#fff' }) });
    const fan = (A, cx, cy, r, a1, a2, fill) => { const p = (a) => [+(cx + r * Math.cos(a * Math.PI / 180)).toFixed(2), +(cy - r * Math.sin(a * Math.PI / 180)).toFixed(2)]; const [x1, y1] = p(a1), [x2, y2] = p(a2); return A.path(`M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 0 ${x2} ${y2} Z`, { fill, sw: 0.7 }); };
    return {
      band4: band('4', '#3e8fd4'),
      band3: band('3', '#e86a3a'),
      band2: band('2', '#f2c230'),
      target: { name: 'target', draw: A => A.path('M1 19 A11 11 0 0 1 23 19 Z', { fill: '#f3ead6', sw: 1.2 }) +
        [['#f2c230', 40], ['#e86a3a', 60], ['#3e8fd4', 80], ['#e86a3a', 100], ['#f2c230', 120]].map(([f, a]) => fan(A, 12, 19, 10.5, a, a + 20, f)).join('') },
      dial: { name: 'dial', draw: A => A.path('M1 19 A11 11 0 0 1 23 19 Z', { fill: '#f3ead6', sw: 1.2 }) + A.line(12, 19, 18, 9.5, { stroke: '#2a2420', sw: 3.2 }) + A.line(12, 19, 18, 9.5, { stroke: '#d8323a', sw: 1.6 }) + A.circle(12, 19, 2.6, '#d8323a', { sw: 1 }) },
      spectrum: { name: 'spectrum card', draw: A => A.rect(1, 6, 22, 12, '#fff', { rx: 2, sw: 1.3 }) + A.rect(2.5, 7.5, 9.5, 9, '#7fc6e8', { rx: 1, sw: 0 }) + A.rect(12, 7.5, 9.5, 9, '#f08a5a', { rx: 1, sw: 0 }) },
      psychic: { name: 'Psychic', draw: A => A.person(12, 10, 22, '#7d55b5', { face: '#e6c7a8' }) },
    };
  })(),

  pitch: 'A Psychic gives one clue for a hidden spot on a spectrum; their team turns the dial to it. First team to 10 points wins.',

  goal: { big: '10 points', text: 'Two teams take turns. The first team to **10 points** wins.' },

  turn: {
    type: 'round',
    intro: 'Each round, one team is active:',
    steps: [
      { verb: 'Spin', text: 'The active team’s {psychic} draws 1 {spectrum} (e.g. Cold ↔ Hot), spins the {target} with the screen closed, then opens the screen so that only they see where it is.' },
      { verb: 'Clue', text: 'The Psychic closes the screen and says **one clue**: something that belongs at the target’s spot on that card’s scale (“coffee” for a spot fairly far toward Hot).' },
      { verb: 'Dial', text: 'The Psychic’s teammates discuss and turn the {dial} to where they think the target’s centre is.' },
      { verb: 'Left/right', text: 'The **other team** then calls whether the target’s centre is to the left or the right of the dial.' },
      { verb: 'Reveal', text: 'The Psychic opens the screen; both teams score (see Scoring).' },
    ],
    outro: 'Other team’s turn, with a new Psychic',
  },

  tension: 'The best clue is the one your team will read the way you do, and that depends on who is listening.',

  structure: [
    { label: 'Setup', text: 'Two teams sit on opposite sides of the device. The team that takes the second turn starts with **1 point**.' },
    { label: 'Rounds', repeat: 'teams alternate', text: 'Spin, clue, dial, left/right call, reveal and score. Each turn, the active team picks a new Psychic.' },
    { label: 'Game end', text: 'When a team reaches **10**, the team with the higher score wins. If tied, each team takes one more turn; repeat until the tie breaks.' },
  ],

  points: [
    ['{=band4} Centre band', 'dial in this band: 4 to the Psychic’s team, and the other team’s left/right call scores nothing'],
    ['{=band3} Next band out', 'dial in either of these bands: 3 to the Psychic’s team'],
    ['{=band2} Outer band', 'dial in either of these bands: 2 to the Psychic’s team. A dial on the line between two bands scores the higher one'],
    ['Miss', 'dial outside the target: 0'],
    ['Left/right call', '+1 to the other team if its call was correct (not on a centre-band hit)'],
  ],

  end: { trigger: 'a team reaches 10 points', detail: 'The team with the higher score wins. If tied, each team takes one more turn (left/right calls still score); repeat until the tie breaks.' },
  scoring: [
    { label: '{=band4} Bullseyes', share: 4 },
    { label: '{=band3} {=band2} Near misses', share: 4 },
    { label: 'Left/right calls', share: 2 },
  ],

  example: 'The card reads **Cold ↔ Hot**; the target sits two-thirds toward Hot. Priya says “coffee.” Her team argues about iced coffee, then sets the dial two-thirds toward Hot. The rivals call “right.” The dial is in the {=band3} band with the target just to its right: 3 points to Priya’s team, 1 to the rivals.',

  setup: [
    'Split into two teams and sit on opposite sides of the device.',
    'The team that goes second starts with **1 point**.',
    'Give the first team’s {psychic} the {spectrum}s and the device, screen closed.',
    '2–3 players: everyone plays together as one team through 7 {spectrum}s, with no left/right call. A bullseye scores 3 and adds 1 more card to play. Try for the highest total score.',
  ],

  terms: [
    ['{=psychic} Psychic', 'The active team’s clue-giver this round. Sees the target, says one clue, then stays quiet until the reveal.'],
    ['{=spectrum} Spectrum', 'Two-ended card that sets the scale (Overrated ↔ Underrated).'],
    ['{=target} Target', 'The hidden scoring wedge: 5 side-by-side bands worth 2, 3, 4, 3, 2 points. The spin puts it at a random spot each round.'],
    ['{=band4} Bullseye', 'The dial ends in the centre 4-point band.'],
  ],

  gotchas: [
    'The Psychic gives **only one clue** and must not react to the team’s debate.',
    'Catch-up: if a team scores a {=band4} bullseye and is **still behind**, it takes another turn at once with a new Psychic.',
    'The clue must be about the spectrum’s subject, not a number or position (“about 70%”).',
  ],

  tips: [
    'Pick clues that are **obvious to your team**, not clever to you.',
    'For targets near an edge, name something everyone agrees is extreme.',
    'As the other team, argue out loud: it rattles them and sharpens your left/right call.',
  ],

  walk(A) {
    const C = A.C, cx = 160, cy = 148, R = 92;
    const pt = (deg, r) => [+(cx + r * Math.cos(deg * Math.PI / 180)).toFixed(1), +(cy - r * Math.sin(deg * Math.PI / 180)).toFixed(1)];
    const wedge = (a1, a2, r, fill) => { const p1 = pt(a1, r), p2 = pt(a2, r); return A.path(`M${cx} ${cy} L${p1[0]} ${p1[1]} A${r} ${r} 0 0 0 ${p2[0]} ${p2[1]} Z`, { fill, sw: 0.8 }); };
    let board = A.bg('#25304f');
    board += A.path(`M${cx - R - 10} ${cy + 4} A${R + 10} ${R + 10} 0 0 1 ${cx + R + 10} ${cy + 4} Z`, { fill: '#3a4a7a', sw: 2 });
    board += wedge(0, 180, R, '#f3ead6');
    // Spectrum card.
    board += A.rect(80, 158, 160, 32, C.white, { rx: 5 });
    board += A.rect(83, 161, 77, 26, '#7fc6e8', { rx: 3, sw: 0 }) + A.rect(160, 161, 77, 26, '#f08a5a', { rx: 3, sw: 0 });
    board += A.text(121, 174, '← COLD', { size: 10, weight: 800 }) + A.text(199, 174, 'HOT →', { size: 10, weight: 800 });
    // Teams.
    board += A.tag(44, 12, 'Priya’s team', { fill: C.purple }) + A.tag(286, 12, 'Rivals', { fill: C.red });
    board += A.use(this.icons.psychic.draw(A), 26 - 14.2, 140 - 11.8, 28.4) + A.text(26, 162, 'Priya', { size: 8, fill: C.white });
    board += A.person(294, 140, 26, C.red);
    // Hidden target, centred at 50° (toward Hot).
    const t = 48, w = 11;
    let tg = wedge(t - 2.5 * w, t - 1.5 * w, R - 4, '#f2c230') + wedge(t + 1.5 * w, t + 2.5 * w, R - 4, '#f2c230') +
      wedge(t - 1.5 * w, t - 0.5 * w, R - 4, '#e86a3a') + wedge(t + 0.5 * w, t + 1.5 * w, R - 4, '#e86a3a') + wedge(t - 0.5 * w, t + 0.5 * w, R - 4, '#3e8fd4');
    for (const [a, n] of [[t - 2 * w, '2'], [t - w, '3'], [t, '4'], [t + w, '3'], [t + 2 * w, '2']]) { const [x, y] = pt(a, R - 14); tg += A.text(x, y, n, { size: 8, weight: 800, fill: C.white }); }
    const target = A.k('target', tg);
    const screen = A.k('screen', wedge(0, 180, R + 1, '#4b5d94') + A.text(...pt(140, 52), 'screen closed', { size: 9, fill: '#cfd8ff' }));
    const dial = (deg) => {
      const [nx, ny] = pt(deg, R - 2);
      return A.line(cx, cy, nx, ny, { stroke: '#2a2420', sw: 5 }) + A.line(cx, cy, nx, ny, { stroke: '#d8323a', sw: 2.5 }) +
        A.k('knob', A.circle(nx, ny, 6, '#d8323a', { sw: 1.5 })) + A.circle(cx, cy, 8, '#d8323a', { sw: 1.5 });
    };
    const clue = A.k('clue', A.bubble(4, 64, 66, 28, '“Coffee”', { size: 11 }));
    const debate = A.k('debate', A.bubble(84, 2, 116, 26, '“But iced coffee…?”', { size: 9 }));
    const call = A.k('call', A.bubble(250, 64, 66, 28, '“Right!”', { size: 11 }));
    const [ax, ay] = pt(60, R + 16), [bx, by] = pt(30, R + 16);
    const arrow = A.k('arrow', A.curve(ax, ay, ...pt(45, R + 26), bx, by, { stroke: '#ffcf3f', sw: 2.5 }));
    const score = (x, y, s, key) => A.k(key, A.rect(x - 14, y - 9, 28, 18, '#fff7d6', { rx: 9, sw: 1.2 }) + A.text(x, y, s, { size: 11, weight: 800 }));
    return [
      { step: 0, say: 'Priya draws **Cold ↔ Hot**, spins and peeks: the target sits two-thirds toward **Hot**. Only she sees it.',
        svg: board + target + dial(90) + A.k('note', A.note(...pt(t, R - 48), 186, 30, 'Hidden target')) },
      { step: 1, say: 'She closes the screen and gives one clue: “**Coffee**.” Then she stays silent.',
        svg: board + target + screen + dial(90) + clue },
      { step: 2, say: 'Her team argues about iced coffee, then turns the dial **two-thirds toward Hot**.',
        svg: board + target + screen + dial(60) + debate + A.glow(...pt(60, R - 2), 12, 'g-d') },
      { step: 3, say: 'The rivals call **right**: the target’s centre is right of the dial.',
        svg: board + target + screen + dial(60) + call + arrow },
      { step: 4, say: 'The screen opens: the dial is in the {=band3} band, with the bullseye just to its right.',
        svg: board + target + dial(60) + call + A.k('note', A.note(...pt(t, R - 40), 110, 32, 'Bullseye (4)')) },
      { step: 4, say: '**3 points** to Priya’s team, **1** to the rivals for calling right. Next, the rivals take a turn.',
        svg: board + target + dial(60) + score(44, 34, '+3', 's1') + score(286, 34, '+1', 's2') },
    ];
  },

  art(A) {
    const C = A.C, cx = 160, cy = 140, R = 112;
    const pt = (deg, r) => [+(cx + r * Math.cos(deg * Math.PI / 180)).toFixed(1), +(cy - r * Math.sin(deg * Math.PI / 180)).toFixed(1)];
    const wedge = (a1, a2, r, fill) => { const p1 = pt(a1, r), p2 = pt(a2, r); return A.path(`M${cx} ${cy} L${p1[0]} ${p1[1]} A${r} ${r} 0 0 0 ${p2[0]} ${p2[1]} Z`, { fill, sw: 0.8 }); };
    let o = A.bg('#25304f');
    // device body
    o += A.path(`M${cx - R - 12} ${cy + 6} A${R + 12} ${R + 12} 0 0 1 ${cx + R + 12} ${cy + 6} Z`, { fill: '#3a4a7a', sw: 2 });
    o += wedge(0, 180, R, '#f3ead6');
    // target bands centred at 52°
    const t = 50, w = 9;
    o += wedge(t - 2.5 * w, t - 1.5 * w, R - 4, '#f2c230') + wedge(t + 1.5 * w, t + 2.5 * w, R - 4, '#f2c230');
    o += wedge(t - 1.5 * w, t - 0.5 * w, R - 4, '#e86a3a') + wedge(t + 0.5 * w, t + 1.5 * w, R - 4, '#e86a3a');
    o += wedge(t - 0.5 * w, t + 0.5 * w, R - 4, '#3e8fd4');
    const lab = [[t - 2 * w, '2'], [t - w, '3'], [t, '4'], [t + w, '3'], [t + 2 * w, '2']];
    for (const [a, n] of lab) { const [x, y] = pt(a, R - 16); o += A.text(x, y, n, { size: 9, weight: 800, fill: C.white }); }
    // dial needle
    const [nx, ny] = pt(64, R + 2);
    o += A.line(cx, cy, nx, ny, { stroke: '#2a2420', sw: 5 }) + A.line(cx, cy, nx, ny, { stroke: '#d8323a', sw: 2.5 }) + A.circle(cx, cy, 9, '#d8323a', { sw: 1.5 });
    // spectrum card
    o += A.rect(70, 160, 180, 32, C.white, { rx: 5 });
    o += A.rect(73, 163, 87, 26, '#7fc6e8', { rx: 3, sw: 0 }) + A.rect(160, 163, 87, 26, '#f08a5a', { rx: 3, sw: 0 });
    o += A.text(116, 176, 'COLD', { size: 11, weight: 800 }) + A.text(204, 176, 'HOT', { size: 11, weight: 800 });
    // psychic clue
    o += A.use(this.icons.psychic.draw(A), 290 - 14.2, 150 - 11.8, 28.4);
    o += A.bubble(248, 104, 64, 26, '“Coffee”', { size: 11 });
    o += A.note(pt(t, R - 50)[0], pt(t, R - 50)[1], 270, 14, 'Hidden target');
    o += A.note(pt(64, 50)[0], pt(64, 50)[1], 80, 14, 'Dial your team turns');
    o += A.note(73, 168, 36, 140, 'Spectrum card');
    return o;
  },
});
