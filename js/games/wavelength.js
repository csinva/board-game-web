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

  pitch: 'One player gives a single clue to place a hidden target on a spectrum like Hot to Cold, and their team argues where to point the dial.',
  theme: 'You are trying to read your friends’ minds and find out whether you are on the same wavelength.',

  goal: { big: '10 points', text: 'Two teams take turns. The first team to **10 points** wins.' },

  turn: {
    type: 'round',
    intro: 'Each round, the active team does this:',
    steps: [
      { verb: 'Spin', text: 'The team’s **Psychic** draws a spectrum card (e.g. Cold ↔ Hot), then secretly spins and peeks at the hidden target.' },
      { verb: 'Clue', text: 'The Psychic says **one clue** that sits where the target is on that spectrum (“coffee”).' },
      { verb: 'Dial', text: 'The team debates and turns the dial to where they think the target is.' },
      { verb: 'Left/right', text: 'The **other team** guesses whether the target is left or right of the dial.' },
      { verb: 'Reveal', text: 'Open the screen. Score 4, 3 or 2 for the bands; the other team scores 1 if their left/right call was right.' },
    ],
    outro: 'Teams alternate; pick a new Psychic',
  },

  tension: 'The best clue is the one your team will read the way you do, and the right clue depends on who is listening.',

  flow: [
    { label: 'Clue', items: ['Read the spectrum', 'Find the target', 'Pick one idea'] },
    { label: 'Debate', items: ['Argue the scale', 'Read the Psychic', 'Commit the dial'] },
    { label: 'Score', items: ['Bullseye 4', 'Near 3 / outer 2', 'Rivals: left/right +1'] },
  ],

  end: { trigger: 'a team reaches 10 points', detail: 'If both teams pass 10 on the same round, the higher score wins; a tie goes to a sudden-death round.' },
  scoring: [
    { label: 'Bullseyes (4)', share: 4 },
    { label: 'Near misses (3, 2)', share: 4 },
    { label: 'Left/right steals', share: 2 },
  ],

  ref: {
    title: 'Points per round',
    rows: [
      ['Centre band', '4 to the clue team'],
      ['Next band out', '3'],
      ['Outer band', '2'],
      ['Miss', '0'],
      ['Left/right call', '+1 to the other team if right'],
    ],
  },

  example: 'The card reads **Cold ↔ Hot** and the target sits fairly far toward Hot. Priya says “coffee.” Her team argues about iced coffee, then sets the dial two-thirds toward Hot. The other team calls “right,” the screen opens, and the dial is in the 3 band with the target just to the right: 3 points to Priya’s team, 1 to the rivals.',

  setup: [
    'Split into two teams and sit on opposite sides of the device.',
    'The team that goes second starts with **1 point**.',
    'Hand the first team’s Psychic the spectrum cards and the screened dial.',
  ],

  terms: [
    ['Psychic', 'The clue-giver this round. Sees the target, says one clue, then stays quiet.'],
    ['Spectrum', 'The two-ended card that sets the scale (Overrated ↔ Underrated).'],
    ['Target', 'The hidden 2-3-4-3-2 wedge on the wheel.'],
    ['Bullseye', 'Dial lands in the centre 4 band.'],
  ],

  gotchas: [
    'The Psychic gives **only one clue** and can’t react to the debate.',
    'Catch-up rule: if a team scores a **bullseye and is still behind**, it takes another turn at once.',
    'The clue has to be on the spectrum’s subject, not a number or a hint about position (“about 70%”).',
  ],

  tips: [
    'Pick clues that are **obvious to your team**, not clever to you.',
    'Use the extremes: for targets near an edge, name something everyone agrees is extreme.',
    'As the guessing team, argue out loud: it rattles the other team and gets your left/right call right.',
  ],

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
    o += A.person(290, 150, 26, C.purple);
    o += A.bubble(248, 104, 64, 26, '“Coffee”', { size: 11 });
    o += A.note(pt(t, R - 50)[0], pt(t, R - 50)[1], 270, 14, 'Hidden target');
    o += A.note(pt(64, 50)[0], pt(64, 50)[1], 80, 14, 'Dial your team turns');
    o += A.note(73, 168, 36, 140, 'Spectrum card');
    return o;
  },
});
