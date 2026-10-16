defineGame({
  id: 'secret-hitler',
  name: 'Secret Hitler',
  year: 2016,
  designer: 'Mike Boxleiter, Tommy Maranges, Max Temkin',
  family: 'hidden',
  players: [5, 10], best: '8–10',
  time: [45, 45],
  age: 13,
  mechanics: ['hidden-roles', 'voting', 'bluffing', 'deduction', 'team', 'player-elimination'],
  profile: { complexity: 2, luck: 2, interaction: 5, conflict: 4, talk: 5, planning: 2 },

  icons: {
    liberal: { name: 'liberal policy', draw: A => A.rect(4, 1, 16, 22, '#3e7ea8', { rx: 2.5, sw: 1.3 }) + A.circle(12, 12, 6, '#e8f1f7', { sw: 0 }) + A.path('M7.5 12 q4.5 -6.5 9 0 q-4.5 4.5 -9 0', { fill: '#3e7ea8', sw: 0.6 }) },
    fascist: { name: 'fascist policy', draw: A => A.rect(4, 1, 16, 22, '#c45a32', { rx: 2.5, sw: 1.3 }) + A.circle(12, 12, 6, '#f7e3d8', { sw: 0 }) + A.circle(12, 10.8, 3.3, '#c45a32', { sw: 0 }) + A.rect(10, 12.8, 4, 3.2, '#c45a32', { sw: 0, rx: 0.8 }) },
    ja: { name: 'Ja!', draw: A => A.rect(1, 5, 22, 14, '#f4ecd6', { rx: 2, sw: 1.3 }) + A.text(12, 12.3, 'JA!', { size: 9, weight: 800 }) },
    nein: { name: 'Nein', draw: A => A.rect(1, 5, 22, 14, '#2b2b2b', { rx: 2, sw: 1.3 }) + A.text(12, 12.3, 'NEIN', { size: 7, weight: 800, fill: '#f4ecd6' }) },
    president: { name: 'President', draw: A => A.rect(1, 5, 22, 14, '#2b2b2b', { rx: 2, sw: 1.3 }) + A.star(6.5, 12, 3.2, '#e2b33c', { sw: 0 }) + A.text(15, 12.4, 'P', { size: 11, weight: 800, fill: '#e8c9a8' }) },
    chancellor: { name: 'Chancellor', draw: A => A.rect(1, 5, 22, 14, '#2b2b2b', { rx: 2, sw: 1.3 }) + A.circle(6.5, 12, 2.6, 'none', { stroke: '#e2b33c', sw: 1.3 }) + A.text(15, 12.4, 'C', { size: 11, weight: 800, fill: '#e8c9a8' }) },
    'lib-role': { name: 'Liberal', draw: A => A.person(12, 10, 22, '#3e7ea8', { face: '#e8c9a8' }) },
    'fas-role': { name: 'Fascist', draw: A => A.person(12, 10, 22, '#c45a32', { face: '#e8c9a8' }) },
    hitler: { name: 'Hitler', draw: A => A.person(12, 10, 22, '#6b2416', { face: '#6b2416', mark: 'H' }) },
    investigate: { name: 'investigate', draw: A => A.line(15, 15, 21.5, 21.5, { sw: 3.6, stroke: '#2b2b2b' }) + A.circle(10, 10, 7, '#e8f1f7', { sw: 2 }) },
    peek: { name: 'policy peek', draw: A => A.path('M1.5 12 Q12 2 22.5 12 Q12 22 1.5 12z', { fill: '#fff', sw: 1.5 }) + A.circle(12, 12, 4.2, '#5d6b78', { sw: 0 }) + A.circle(12, 12, 1.8, '#2b2b2b', { sw: 0 }) },
    election: { name: 'special election', draw: A => A.rect(6, 9, 17, 11, '#2b2b2b', { rx: 2, sw: 1.2 }) + A.text(14.5, 14.7, 'P', { size: 9, weight: 800, fill: '#e8c9a8' }) + A.curve(2, 18, 1, 3, 13, 5.5, { sw: 1.8, head: 5, stroke: '#c45a32' }) },
    execute: { name: 'execution', draw: A => A.circle(12, 12, 8.5, '#f7e3d8', { stroke: '#9b2a1a', sw: 1.8 }) + A.line(12, 1, 12, 23, { stroke: '#9b2a1a', sw: 1.6 }) + A.line(1, 12, 23, 12, { stroke: '#9b2a1a', sw: 1.6 }) + A.circle(12, 12, 2.6, '#9b2a1a', { sw: 0 }) },
  },

  pitch: 'Elect governments to enact laws while hidden Fascists lie; pass your team’s laws, or elect or kill Hitler, to win.',

  goal: { big: 'Win as a team', text: 'Your **secret team** wins together. Liberals: enact 5 liberal policies or execute Hitler. Fascists: enact 6 fascist policies or elect Hitler Chancellor.' },

  turn: {
    type: 'round',
    intro: 'Each round is one election:',
    steps: [
      { verb: 'Nominate', text: 'The {president} (passes clockwise each round) nominates an eligible player as {chancellor}.' },
      { verb: 'Vote', text: 'Everyone reveals {ja} or {nein} at once. A **majority** of Ja elects them (a tie fails); otherwise the election tracker moves up 1.' },
      { verb: 'Legislate', text: 'The {=president} draws 3 policies, discards 1 face down and passes 2; the {=chancellor} discards 1 and **enacts** the other.' },
      { verb: 'Use power', text: 'If the new {fascist} lands on a power, the {=president} uses it: {investigate}, {peek}, {election} or {execute}.' },
    ],
  },

  tension: 'Liberals judge players only by votes and enacted policies, but the deck is 11 fascist to 6 liberal, so an honest government can be forced to enact a fascist law.',

  structure: [
    { label: 'Setup', text: 'Deal roles. Eyes closed, Fascists see each other. A random player takes the {=president} placard.' },
    { label: 'Elections', repeat: 'until a team wins', text: 'Nominate, vote {=ja} / {=nein}, enact 1 policy, use any power. The {=president} moves clockwise. Under 3 policies left: shuffle in the discards.' },
    { label: 'Escalation', text: 'Fascist track slots grant powers: {=investigate} {=peek} {=election} {=execute}. After 5 {=fascist}, veto is allowed.' },
    { label: 'Game end', text: '5 {=liberal} or {=hitler} executed: Liberals win. 6 {=fascist} or {=hitler} elected Chancellor after 3 {=fascist}: Fascists win.' },
  ],

  end: {
    trigger: 'a team meets a win condition',
    results: [
      { side: 'Liberals win', text: 'when **5** {=liberal} are enacted, or {=hitler} is executed.' },
      { side: 'Fascists win', text: 'when **6** {=fascist} are enacted, or {=hitler} is elected Chancellor after 3+ {=fascist}.' },
    ],
  },

  ref: {
    title: 'Teams and powers',
    rows: [
      ['Roles', '{lib-role} {fas-role} {hitler}'],
      ['5–6 players', '{=hitler} {=fas-role}, rest {=lib-role}; Hitler knows his team'],
      ['7–8 players', '{=hitler} {=fas-role}{=fas-role}, rest {=lib-role}'],
      ['9–10 players', '{=hitler} {=fas-role}{=fas-role}{=fas-role}, rest {=lib-role}'],
      ['Policy deck', '6 × {=liberal}  11 × {=fascist}'],
      ['{investigate}', 'Slot 2 (7–8), slots 1–2 (9–10): President sees 1 player’s party card; never the same player twice'],
      ['{peek}', 'Slot 3 (5–6): President sees the top 3 policies, keeps their order'],
      ['{election}', 'Slot 3 (7–10): President picks the next President; then order resumes from the left of the President who picked'],
      ['{execute}', 'Slots 4 and 5 (all counts): President kills 1 player (if Hitler: Liberals win)'],
    ],
  },

  example: '{=president} Ana nominates Ben; the vote passes 5–2. Ana draws {=fascist}{=fascist}{=liberal}, discards a {=fascist} and passes Ben {=fascist}{=liberal}. Ben enacts the {=fascist} and says “I got two fascists.” Ana knows he lied but can’t prove it.',

  setup: [
    'Deal each player a secret role card and party card (see table).',
    'Eyes closed: Fascists open theirs to see each other; Hitler raises a thumb (with 5–6 players Hitler also opens his eyes).',
    'Use the fascist track for your player count (its slots show the powers). Shuffle 6 {=liberal} + 11 {=fascist} as the deck. Give a random player the {president} placard.',
  ],

  terms: [
    ['{=president} President', 'Nominates a Chancellor, then passes 2 of 3 policies. Rotates clockwise.'],
    ['{=chancellor} Chancellor', 'Enacts 1 of the 2 policies the President passed.'],
    ['Election tracker', 'After 3 failed elections in a row, the top policy is enacted with no power; term limits reset. Any enacted policy resets the tracker.'],
    ['Term limits', 'The last elected Chancellor (and President, with 6+ players alive) can’t be nominated Chancellor.'],
    ['Veto', 'After 5 {=fascist}, the Chancellor may propose discarding both; if the President agrees, nothing is enacted and the election tracker moves up 1. If not, the Chancellor must enact one.'],
  ],

  gotchas: [
    'With 7–10 players **Hitler doesn’t know** the Fascists; with 5–6 he does.',
    'An executed player is **out**: no talking, voting or office. Their role stays secret unless they were Hitler.',
    'After 3 {=fascist}, electing Hitler Chancellor ends the game at once. Hitler must reveal himself only when elected then or executed; before that he may lie.',
    'President and Chancellor may not talk or signal while choosing policies. Discards are never shown; both may lie about what they saw.',
  ],

  tips: [
    'As a Liberal, track who voted {=ja} on governments that enacted {=fascist}.',
    'As a Fascist, enact {=liberal} early to earn trust.',
    'As Hitler, play a quiet Liberal until 3 {=fascist} are out, then get elected.',
  ],

  walk(A) {
    const C = A.C, lib = '#3e7ea8', fas = '#c45a32', backC = '#b9a77c';
    const names = ['Eve', 'Ana', 'Cal', 'Ben', 'Dot', 'Fin', 'Gil'];
    const px = (i) => 26 + i * 44.7, py = 168;
    // Tracks: 1 liberal and 1 fascist policy already enacted.
    let board = A.bg('#efe2c4');
    board += A.rect(6, 4, 146, 40, '#a9cbe0', { rx: 5, sw: 1.3 }) + A.rect(158, 4, 156, 40, '#e9a98a', { rx: 5, sw: 1.3 });
    for (let i = 0; i < 5; i++) board += A.rect(12 + i * 28, 9, 24, 31, 'rgba(255,255,255,.45)', { rx: 3, sw: 0.8, dash: '3 2' });
    for (let i = 0; i < 6; i++) board += A.rect(162 + i * 25, 9, 23, 31, 'rgba(255,255,255,.45)', { rx: 3, sw: 0.8, dash: '3 2' });
    board += A.circle(162 + 25 + 11, 22, 4, 'none', { stroke: '#9b4a2a', sw: 1.3 }) + A.line(201, 25, 204, 29, { stroke: '#9b4a2a', sw: 1.5 });
    board += A.text(237, 51, 'Deck', { size: 7.5, fill: '#7a6248' }) + A.text(287, 51, 'Discard', { size: 7.5, fill: '#7a6248' });
    board += A.rect(227, 60, 20, 28, 'none', { rx: 4, sw: 0.8, dash: '3 2' }) + A.rect(277, 60, 20, 28, 'none', { rx: 4, sw: 0.8, dash: '3 2' });
    for (let i = 0; i < 3; i++) board += A.card(227 - i, 60 - i * 1.5, 20, 28, backC);
    names.forEach((n, i) => { board += A.person(px(i), py, 30, ['#7a6a58', '#5d6b78', '#8a5a33', '#6c5a7a', '#4f6e5a', '#7a4f4f', '#5a5a5a'][i], { face: '#e8c9a8' }) + A.text(px(i), 194, n, { size: 8.5, weight: 700 }); });
    const I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x, y, size);
    // Policies, votes and placards are the same drawings as the inline icons.
    const pol = (x, y, t) => ic(t === 'L' ? 'liberal' : 'fascist', x - 5, y - 1.25, 30);
    const back = (x, y) => A.card(x, y, 20, 28, backC);
    const done = A.k('lib1', pol(14, 10.5, 'L')) + A.k('fas1', pol(163.5, 10.5, 'F'));
    const pres = (i) => A.k('pres', ic('president', px(i) - 13, 130, 26));
    const chanc = (x, y) => A.k('chanc', ic('chancellor', x - 13, y - 11, 26));
    const vote = (i, ja) => A.k('v' + i, ic(ja ? 'ja' : 'nein', px(i) - 12, 116, 24));
    const votes = [1, 1, 0, 1, 1, 1, 0].map((v, i) => vote(i, v)).join('');
    const secret = (x, who, y = 101) => A.tag(x, y, 'only ' + who + ' sees', { fill: '#5d6b78' });
    // Ana's 3 policies: p1 fascist (discarded), p2 fascist (enacted), p3 liberal.
    const ana = [44, 70, 96].map(x => [x, 62]);
    const ben = [140, 166].map(x => [x, 62]);
    return [
      { step: 0, say: 'The {=president} placard passes to **Ana**. She nominates **Ben** for Chancellor.', svg: board + done + pres(1) + chanc(px(3), 141) + A.bubble(64, 104, 96, 20, 'Ben, Chancellor?', { size: 9 }) + A.glow(px(3), 168, 15, 'g-ben') },
      { step: 1, say: 'Everyone reveals a vote: **5** {=ja}, **2** {=nein}. Majority, so Ana and Ben are elected.', svg: board + done + pres(1) + chanc(px(3), 141) + votes },
      { step: 2, say: 'Ana draws **3 policies** and sees them alone: {=fascist}{=fascist}{=liberal}.', svg: board + done + pres(1) + chanc(px(3), 141) + secret(70, 'Ana') +
        A.k('p1', pol(...ana[0], 'F')) + A.k('p2', pol(...ana[1], 'F')) + A.k('p3', pol(...ana[2], 'L')) + A.glow(px(1), 168, 15, 'g-ana') },
      { step: 2, say: 'Ana discards a {=fascist} face down and passes Ben {=fascist}{=liberal}.', svg: board + done + pres(1) + chanc(px(3), 141) + secret(153, 'Ben') +
        A.k('p1', back(277, 60)) + A.k('p2', pol(...ben[0], 'F')) + A.k('p3', pol(...ben[1], 'L')) + A.glow(px(3), 168, 15, 'g-ben') },
      { step: 2, say: 'Ben discards the {=liberal} and **enacts** the {=fascist}. He claims he drew two fascists. Ana knows he lied.', svg: board + done + pres(1) + chanc(px(3), 141) +
        A.k('p1', back(277, 60)) + A.k('p3', back(278.5, 57.5)) + A.k('p2', pol(188.5, 10.5, 'F')) + A.bubble(150, 104, 110, 20, 'I got 2 fascists!', { size: 9 }) },
      { step: 3, say: 'With 7 players, the 2nd {=fascist} slot grants {investigate}: Ana secretly sees Ben’s party card.', svg: board + done + pres(1) + chanc(px(3), 141) +
        A.k('p1', back(277, 60)) + A.k('p3', back(278.5, 57.5)) + A.k('p2', pol(188.5, 10.5, 'F')) + A.glow(198, 25, 15, 'g-pow') +
        A.k('party', A.card(px(3) - 17, 108, 34, 22, '#7a4f4f', { label: 'PARTY', size: 6 })) },
      { step: 3, say: 'Ben is a **Fascist**. Only Ana saw the card, so the table must decide whether to believe her.', svg: board + done + pres(1) + chanc(px(3), 141) +
        A.k('p1', back(277, 60)) + A.k('p3', back(278.5, 57.5)) + A.k('p2', pol(188.5, 10.5, 'F')) + secret(70, 'Ana', 92) +
        A.k('party', A.card(53, 54, 34, 26, fas, { label: 'FASCIST', size: 6 })) + A.bubble(60, 106, 84, 18, 'Ben lied!', { size: 9 }) },
    ];
  },

  art(A) {
    const C = A.C, lib = '#3e7ea8', fas = '#c45a32', I = this.icons, ic = (k, x, y, size) => A.use(I[k].draw(A), x, y, size);
    let o = A.bg('#efe2c4');
    // liberal track
    o += A.rect(10, 6, 186, 48, '#a9cbe0', { rx: 5, sw: 1.4 });
    for (let i = 0; i < 5; i++) {
      const x = 17 + i * 35;
      o += i < 2 ? ic('liberal', x - 3.5, 11, 38) : A.rect(x, 12, 31, 36, 'rgba(255,255,255,.4)', { rx: 3, sw: 0.8, dash: '3 2' });
    }
    // fascist track
    o += A.rect(10, 62, 220, 48, '#e9a98a', { rx: 5, sw: 1.4 });
    for (let i = 0; i < 6; i++) {
      const x = 17 + i * 35;
      if (i < 3) o += ic('fascist', x - 3.5, 67, 38);
      else o += A.rect(x, 68, 31, 36, 'rgba(255,255,255,.4)', { rx: 3, sw: 0.8, dash: '3 2' }) + (i < 5 ? ic('execute', x + 5.5, 76, 20) : '');
    }
    // players
    const ppl = ['#7a6a58', '#5d6b78', '#8a5a33', '#6c5a7a', '#4f6e5a', '#7a4f4f', '#5a5a5a'];
    ppl.forEach((f, i) => {
      const x = 30 + i * 42, y = 164;
      o += A.person(x, y, 26, f, { face: '#e8c9a8' });
      o += A.group(ic(i === 2 ? 'nein' : 'ja', x - 14, y - 41, 28), `rotate(${i % 2 ? 6 : -6} ${x} ${y - 27})`);
    });
    o += ic('president', 227, 176, 26) + ic('chancellor', 269, 176, 26);
    o += A.note(184, 30, 262, 30, 'Liberals need 5', { w: 92 });
    o += A.note(218, 86, 272, 86, 'Fascists need 6', { w: 92 });
    o += A.note(114, 132, 84, 118, 'Ja / Nein votes', { w: 92 });
    o += A.note(240, 150, 280, 118, 'President + Chancellor', { w: 126 });
    return o;
  },
});
