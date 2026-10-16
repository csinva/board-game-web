defineGame({
  id: 'secret-hitler',
  name: 'Secret Hitler',
  year: 2016,
  designer: 'Mike Boxleiter, Tommy Maranges, Max Temkin',
  family: 'hidden',
  players: [5, 10], best: '7–8',
  time: [45, 45],
  age: 13,
  mechanics: ['hidden-roles', 'voting', 'bluffing', 'deduction', 'team', 'player-elimination'],
  profile: { complexity: 2, luck: 2, interaction: 5, conflict: 4, talk: 5, planning: 2 },

  pitch: 'Elect governments, pass laws and work out who is lying: the secret fascists win if their hidden leader takes power.',
  theme: 'You are politicians in 1930s Germany. The liberal majority must stop a hidden fascist minority and its leader.',

  goal: { big: 'Win as a team', text: 'You win with your **secret team**. Liberals want to pass liberal policies or kill Hitler; Fascists want fascist policies or to get Hitler elected.' },

  turn: {
    type: 'round',
    intro: 'Each round is one election:',
    steps: [
      { verb: 'Nominate', text: 'The President (passed clockwise each round) nominates an eligible player as **Chancellor**.' },
      { verb: 'Vote', text: 'Everyone votes **Ja!** or **Nein** at once. A majority of Ja forms the government; otherwise the election tracker moves up.' },
      { verb: 'Legislate', text: 'President draws 3 policies, secretly discards 1, passes 2; the Chancellor discards 1 and **enacts** the other face-up.' },
      { verb: 'Use power', text: 'If a fascist policy unlocks a power, the President uses it (investigate, peek, special election or execute).' },
    ],
  },

  tension: 'Liberals can only learn who to trust from how players vote and which policies come out, but the deck is mostly fascist, so an honest government can still be forced to pass a fascist law and look guilty.',

  flow: [
    { label: 'Elect', items: ['President rotates', 'Nominate a Chancellor', 'Ja / Nein vote'] },
    { label: 'Legislate', items: ['Draw 3, discard 1', 'Chancellor enacts 1', 'Claims may be lies'] },
    { label: 'Escalate', items: ['Fascist laws unlock powers', 'Investigate, peek, execute', 'Veto after 5 fascist'] },
  ],

  end: {
    trigger: 'a team meets one of its win conditions',
    results: [
      { side: 'Liberals win', text: 'when **5 liberal** policies are enacted, or Hitler is executed.' },
      { side: 'Fascists win', text: 'when **6 fascist** policies are enacted, or Hitler is elected Chancellor after 3+ fascist policies.' },
    ],
  },

  ref: {
    title: 'Teams by player count',
    rows: [
      ['5–6 players', 'Hitler + 1 Fascist; Hitler knows his team'],
      ['7–8 players', 'Hitler + 2 Fascists'],
      ['9–10 players', 'Hitler + 3 Fascists'],
      ['Policy deck', '6 liberal, 11 fascist'],
    ],
  },

  example: 'President Ana nominates Ben, and the vote passes 5–2. Ana draws 2 fascist and 1 liberal, discards a fascist and hands Ben one of each. Ben enacts a **fascist** policy and says “I got two fascists.” Ana knows that’s a lie, and now has to convince the table.',

  setup: [
    'Deal secret role and party cards (see table); everyone looks at their own.',
    'Eyes closed: Fascists open theirs to see each other and Hitler’s raised thumb (with 5–6 players Hitler opens his eyes too).',
    'Pick the track board for your player count and give a random player the President placard.',
  ],

  terms: [
    ['President', 'Rotating leader who nominates and passes 2 of 3 policies.'],
    ['Chancellor', 'Elected partner who enacts 1 of the 2 policies.'],
    ['Election tracker', 'After 3 failed votes, the top policy is enacted automatically.'],
    ['Term limits', 'The last elected Chancellor (and President, with 6+ players) can’t be Chancellor next.'],
    ['Veto', 'After 5 fascist policies, a government may agree to discard both.'],
  ],

  gotchas: [
    'In 7–10 player games **Hitler doesn’t know** who the Fascists are; only in 5–6 does he.',
    'A policy enacted by the election tracker grants **no power**, and term limits reset.',
    'Once 3 fascist policies are out, electing Hitler as Chancellor ends the game, so ask “are you Hitler?”',
  ],

  tips: [
    'As a Liberal, watch the votes: who supported the government that passed a fascist law?',
    'As a Fascist, pass liberal policies early to build trust.',
    'As Hitler, act like the most boring liberal at the table, then wait to be elected.',
  ],

  art(A) {
    const C = A.C, lib = '#3e7ea8', fas = '#c45a32';
    let o = A.bg('#efe2c4');
    // liberal track
    o += A.rect(10, 6, 186, 48, '#a9cbe0', { rx: 5, sw: 1.4 });
    for (let i = 0; i < 5; i++) {
      const x = 17 + i * 35;
      o += A.rect(x, 12, 31, 36, i < 2 ? lib : 'rgba(255,255,255,.4)', { rx: 3, sw: i < 2 ? 1.2 : 0.8, dash: i < 2 ? undefined : '3 2' });
      if (i < 2) o += A.circle(x + 15.5, 30, 8, '#e8f1f7', { sw: 0 }) + A.path(`M${x + 10.5} ${30} q5 -7 10 0 q-5 5 -10 0`, { fill: lib, sw: 0.8 });
    }
    // fascist track
    o += A.rect(10, 62, 220, 48, '#e9a98a', { rx: 5, sw: 1.4 });
    for (let i = 0; i < 6; i++) {
      const x = 17 + i * 35;
      o += A.rect(x, 68, 31, 36, i < 3 ? fas : 'rgba(255,255,255,.4)', { rx: 3, sw: i < 3 ? 1.2 : 0.8, dash: i < 3 ? undefined : '3 2' });
      if (i < 3) o += A.circle(x + 15.5, 86, 8, '#f7e3d8', { sw: 0 }) + A.circle(x + 15.5, 84, 4, fas, { sw: 0 }) + A.rect(x + 12.5, 87, 6, 4, fas, { sw: 0, rx: 1 });
      else o += A.circle(x + 15.5, 86, 7, 'none', { sw: 1, stroke: '#9b4a2a' }) + A.text(x + 15.5, 86, i === 5 ? '!' : 'P', { size: 8, weight: 800, fill: '#9b4a2a' });
    }
    // players
    const ppl = ['#7a6a58', '#5d6b78', '#8a5a33', '#6c5a7a', '#4f6e5a', '#7a4f4f', '#5a5a5a'];
    ppl.forEach((f, i) => {
      const x = 30 + i * 42, y = 164;
      o += A.person(x, y, 26, f, { face: '#e8c9a8' });
      const vote = i === 2 ? 'NEIN' : 'JA!';
      o += A.rect(x - 13, y - 34, 26, 15, vote === 'JA!' ? '#f4ecd6' : '#2b2b2b', { rx: 2, sw: 1, rotate: (i % 2 ? 6 : -6) }) + A.text(x, y - 26.5, vote, { size: 7, weight: 800, fill: vote === 'JA!' ? C.ink : '#f4ecd6', rotate: (i % 2 ? 6 : -6) });
    });
    o += A.rect(222, 180, 36, 12, '#2b2b2b', { rx: 2, sw: 1 }) + A.text(240, 186, 'PRES', { size: 7, weight: 800, fill: '#e8c9a8' });
    o += A.rect(264, 180, 36, 12, '#2b2b2b', { rx: 2, sw: 1 }) + A.text(282, 186, 'CHANC', { size: 7, weight: 800, fill: '#e8c9a8' });
    o += A.note(184, 30, 262, 30, 'Liberals need 5', { w: 92 });
    o += A.note(218, 86, 272, 86, 'Fascists need 6', { w: 92 });
    o += A.note(114, 132, 84, 118, 'Everyone votes Ja / Nein', { w: 140 });
    o += A.note(240, 150, 280, 118, 'President + Chancellor', { w: 126 });
    return o;
  },
});
