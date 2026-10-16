defineGame({
  id: 'tichu',
  name: 'Tichu',
  year: 1991,
  designer: 'Urs Hostettler',
  family: 'trick',
  players: [4, 4], best: '4',
  time: [60, 90],
  age: 10,
  mechanics: ['trick-taking', 'team', 'hand-management', 'press-your-luck', 'set-collection'],
  profile: { complexity: 3, luck: 3, interaction: 4, conflict: 3, talk: 3, planning: 3 },

  pitch: 'Climb with pairs, runs and bombs to empty your hand first, while you and your partner bet loudly that you can.',
  theme: 'You and your partner across the table race the other pair to shed your cards, with four odd special cards in the deck.',

  goal: { big: '1,000 points', text: 'First team to **1,000** wins. Points come from the cards in tricks you win, from finishing first and second, and from bold **Tichu** calls.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal 8', text: 'Look at your first 8 cards: you may call **Grand Tichu** now. Then take 6 more, for 14.' },
      { verb: 'Pass', text: 'Pass one card face down to **each** other player (3 out, 3 in).' },
      { verb: 'Climb', text: 'The Mah Jong holder leads any combination. In turn, play the **same kind and length**, but higher, or pass.' },
      { verb: 'Take trick', text: 'When the other 3 pass in a row, the last player to play takes the cards and leads anything new.' },
      { verb: 'Score', text: 'The hand ends when only one player has cards left. Count card points and settle Tichu bets.' },
    ],
  },

  tension: 'Your strong cards can either win point-rich tricks or get you out first, rarely both, and a Tichu call bets 100 points that you will be first.',

  flow: [
    { label: 'Call', items: ['Grand Tichu after 8 cards', 'Tichu before your first card', 'Pass 3 cards'] },
    { label: 'Climb', items: ['Singles, pairs, triples', 'Full houses, runs of 5+', 'Bombs beat everything'] },
    { label: 'Score', items: ['5s: 5, 10s and Ks: 10', 'Dragon +25, Phoenix −25', 'Tichu ±100, Grand ±200', '1st + 2nd: 200'] },
  ],

  end: { trigger: 'a team has 1,000 or more points at the end of a hand', detail: 'If both teams pass 1,000, the higher score wins.' },
  scoring: [
    { label: 'Card points', share: 5 },
    { label: 'Tichu calls', share: 3 },
    { label: 'Double victories', share: 2 },
  ],

  ref: {
    title: 'Special cards',
    rows: [
      ['Mah Jong (1)', 'Leads the first trick; may **wish** for a rank'],
      ['Dog', 'Lead it alone to pass the lead to your partner'],
      ['Phoenix', 'Wild in combinations; as a single, ½ above the last card; −25'],
      ['Dragon', 'Highest single, +25, but give the trick to an opponent'],
      ['Bomb', '4 of a kind or a 5+ straight flush; beats anything, any time'],
      ['Card points', '5s = 5, 10s and Ks = 10 (100 per hand)'],
    ],
  },

  example: 'Ana calls **Tichu** before her first card. Lee leads the run 4-5-6-7-8; Ana tops it with 6-7-8-9-10. Ben, Lee’s partner, drops a **bomb** of four 3s, everyone passes, and Ben takes the trick, including Ana’s 10.',

  setup: [
    'Use the 56-card deck: 2 to Ace in four suits, plus the Mah Jong, Dog, Phoenix and Dragon.',
    'Partners sit across. Deal 8 each, allow Grand Tichu calls, then deal the rest so everyone has 14.',
    'Each player passes 1 card to each of the other 3 before play.',
  ],

  terms: [
    ['Combination', 'Single, pair, triple, full house, run of 5+, or run of pairs (e.g. 33-44).'],
    ['Bomb', 'Four of a kind or a straight flush of 5+. Beats any non-bomb.'],
    ['Tichu', 'A call that you will go out first: +100 if you do, −100 if not.'],
    ['Grand Tichu', 'The same call made after seeing only 8 cards: ±200.'],
    ['Double victory', 'Partners go out 1st and 2nd: 200 points, no cards counted.'],
  ],

  gotchas: [
    'A **bomb** may be played at any time, even out of turn, and a longer straight-flush bomb beats a four-of-a-kind.',
    'The last player still holding cards gives their hand to the **opponents** and their won tricks to the player who went out first.',
    'While a Mah Jong **wish** is open, the next player who can legally play that rank must.',
  ],

  tips: [
    'Pass your partner a strong card (an ace or the Dog) and your opponents low ones.',
    'Only call Tichu with control: the Dragon, aces or a bomb, and few loose low singles.',
    'When your partner has called Tichu, **don’t** beat their tricks; help them get out first.',
  ],

  walk(A) {
    const C = A.C, gold = '#d6b25a', W = 26, H = 38;
    const suit = { j: ['#2f8a4f', 'c'], s: ['#2f5fb0', 'd'], p: ['#2a2420', 't'], t: ['#c8423b', 's'] };
    const pip = (x, y, k, f) => k === 'c' ? A.circle(x, y, 4, f, { sw: 0 }) : k === 'd' ? A.poly([[x, y - 5], [x + 4.5, y], [x, y + 5], [x - 4.5, y]], f, { sw: 0 }) : k === 't' ? A.poly([[x, y - 5], [x + 5, y + 4], [x - 5, y + 4]], f, { sw: 0 }) : A.star(x, y, 5.5, f, { sw: 0 });
    const face = (x, y, r, su) => {
      const [f, k] = suit[su];
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fdf7e6', { rx: 4, sw: 1.2 }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: f }) + pip(x + W / 2 + 1, y + H / 2 + 4, k, f);
    };
    const dragon = (x, y) => A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#b5262f', { rx: 4, sw: 1.4, stroke: gold }) +
      A.path(`M${x + 6} ${y + 30} q4 -10 8 -4 q4 6 8 -4 q3 -8 -2 -12 q-4 -3 -4 -8`, { stroke: gold, sw: 2 });
    const back = (x, y) => A.rect(x, y, 20, 28, '#7a1f2b', { rx: 3, sw: 1, stroke: gold }) + A.circle(x + 10, y + 14, 5, 'none', { sw: 0.8, stroke: gold });
    let board = A.bg('#0e3a39') + A.rect(5, 5, 310, 190, '#17605d', { rx: 20, sw: 2, stroke: gold });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 70) + back(272 + i * 6, 70) + back(136 + i * 7, 10);
    board += A.tag(38, 58, 'Lee') + A.tag(284, 58, 'Ben') + A.tag(92, 24, 'Partner') + A.tag(30, 182, 'Ana');
    const card = (id, x, y) => id === 'DR' ? A.k(id, dragon(x, y)) : A.k(id, face(x, y, id.slice(0, -1), id.slice(-1)));
    const row = (ids, y = 150, x0) => { const s = x0 ?? 176 - ids.length * 14; return ids.map((id, i) => card(id, s + i * 28, y)).join(''); };
    const first8 = ['2j', '6s', '7j', '8t', '9p', '10s', 'At', '2p'];
    const run = ['6s', '7j', '8t', '9p', '10s'];
    const handAfter = ['6s', '7j', '8t', '9p', '10s', 'Kj', 'DR'];
    const passed = card('2j', 44, 110) + card('2p', 252, 110) + card('At', 190, 8);
    const call = A.k('call', A.bubble(14, 116, 54, 22, 'Tichu!', { size: 10 }));
    const leeRun = ['4j', '5s', '6p', '7t', '8j'].map((id, i) => A.k('L' + id, face(70 + i * 18, 38, id.slice(0, -1), id.slice(-1)))).join('');
    const anaRun = run.map((id, i) => card(id, 112 + i * 18, 70)).join('');
    const bomb = ['3j', '3s', '3p', '3t'].map((id, i) => A.k('B' + id, face(206 + i * 18, 108, '3', id.slice(-1)))).join('');
    const pileAt = (x, y) => [...['4j', '5s', '6p', '7t', '8j'].map(id => 'L' + id), ...run, ...['3j', '3s', '3p', '3t'].map(id => 'B' + id)]
      .map((id, i) => A.k(id, id[0] === 'B' ? face(x + i * 0.6, y + i * 0.4, '3', id.slice(-1)) : id[0] === 'L' ? face(x + i * 0.6, y + i * 0.4, id.slice(1, -1), id.slice(-1)) : face(x + i * 0.6, y + i * 0.4, id.slice(0, -1), id.slice(-1)))).join('');
    return [
      { step: 0, say: 'Ana looks at her first **8 cards**. Not strong enough for a Grand Tichu (±200), so she takes her other 6.', svg: board + row(first8) },
      { step: 1, say: 'Everyone passes one card to **each** other player. Ana sends a 2 to each opponent and her ace to her partner.', svg: board + row(['6s', '7j', '8t', '9p', '10s', 'Kj', 'DR']) + passed },
      { step: 2, say: 'With a run and the Dragon, Ana calls **Tichu**: +100 if she goes out first, −100 if she doesn’t.', svg: board + row(handAfter) + call + A.glow(41, 127, 32) },
      { step: 2, say: 'Lee leads a 5-card run, **4-5-6-7-8**. Ana’s partner and Ben pass.', svg: board + row(handAfter) + call + leeRun },
      { step: 2, say: 'Ana plays **6-7-8-9-10**: the same kind of combination, the same length, but higher.', svg: board + row(['Kj', 'DR']) + call + leeRun + anaRun + A.glow(161, 89, 50) },
      { step: 2, say: 'Ben drops a **bomb**: four 3s. A bomb may be played at any time and beats any normal combination.', svg: board + row(['Kj', 'DR']) + call + leeRun + anaRun + bomb + A.glow(246, 127, 44) },
      { step: 3, say: 'Everyone passes, so Ben takes the trick, including Ana’s **10** (10 points), and leads next.', svg: board + row(['Kj', 'DR']) + call + pileAt(240, 120) + A.glow(260, 145, 32) },
    ];
  },

  art(A) {
    const C = A.C, gold = '#d6b25a';
    const suit = { j: ['#2f8a4f', 'c'], s: ['#2f5fb0', 'd'], p: ['#2a2420', 't'], t: ['#c8423b', 's'] };
    const pip = (x, y, k, f) => k === 'c' ? A.circle(x, y, 3.2, f, { sw: 0 }) : k === 'd' ? A.poly([[x, y - 4], [x + 3.5, y], [x, y + 4], [x - 3.5, y]], f, { sw: 0 }) : k === 't' ? A.poly([[x, y - 4], [x + 4, y + 3], [x - 4, y + 3]], f, { sw: 0 }) : A.star(x, y, 4.2, f, { sw: 0 });
    const pc = (x, y, r, su, o = {}) => {
      const w = o.w || 20, h = o.h || 28, [f, k] = suit[su];
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, o.dim ? '#e6dcc4' : '#fdf7e6', { rx: 3, sw: 1 }) +
        A.text(x + 5.5, y + 7, r, { size: 8, weight: 800, fill: f }) + pip(x + w / 2 + 1, y + h / 2 + 3, k, f);
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const sp = (x, y, fill, inner, rot) => {
      const g = A.rect(x + 1.5, y + 2, 24, 34, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, 24, 34, fill, { rx: 3, sw: 1.2, stroke: gold }) + inner;
      return A.group(g, `rotate(${rot} ${x + 12} ${y + 17})`);
    };
    const bk = (x, y, w, h) => A.rect(x, y, w, h, '#7a1f2b', { rx: 2.5, sw: 1, stroke: gold }) + A.circle(x + w / 2, y + h / 2, Math.min(w, h) / 4, 'none', { sw: 0.8, stroke: gold });
    let o = A.bg('#0e3a39') + A.rect(5, 5, 310, 190, '#17605d', { rx: 20, sw: 2, stroke: gold });
    // other hands
    for (let i = 0; i < 8; i++) o += bk(104 + i * 9, 12, 15, 21);
    for (let i = 0; i < 7; i++) o += bk(14, 48 + i * 9, 21, 15);
    for (let i = 0; i < 7; i++) o += bk(290, 58 + i * 9, 21, 15);
    o += A.bubble(192, 8, 50, 22, 'Tichu!', { size: 10 });
    // trick: older run underneath, higher run on top
    [['4', 'j'], ['5', 's'], ['6', 'p'], ['7', 't'], ['8', 'j']].forEach(([r, s], i) => { o += pc(94 + i * 15, 46, r, s, { dim: true }); });
    [['6', 's'], ['7', 'j'], ['8', 't'], ['9', 'p'], ['10', 's']].forEach(([r, s], i) => { o += pc(110 + i * 15, 68, r, s, { rot: 2 }); });
    // my hand: Dragon, Phoenix, Dog, then normal cards
    o += sp(88, 140, '#b5262f', A.path('M94 170 q4 -10 8 -4 q4 6 8 -4 q3 -8 -2 -12 q-4 -3 -4 -8', { stroke: gold, sw: 2 }) + A.circle(94, 147, 2.5, gold, { sw: 0 }), -9);
    o += sp(110, 138, '#e07b2e', A.bird(122, 156, 18, '#ffd36a'), -5);
    o += sp(132, 137, '#f4ecd8', A.circle(144, 153, 6, '#8a5a33', { sw: 1 }) + A.circle(140, 147, 2.5, '#8a5a33', { sw: 0 }) + A.circle(148, 147, 2.5, '#8a5a33', { sw: 0 }), -1);
    [['A', 'j'], ['A', 't'], ['K', 'p'], ['3', 's']].forEach(([r, s], i) => { o += pc(156 + i * 21, 138 + i * 1.5, r, s, { w: 24, h: 34, rot: 3 + i * 3 }); });
    o += A.note(168, 92, 226, 118, 'Beat: same combo, higher', { w: 128 });
    o += A.note(98, 165, 58, 190, 'Dragon: top single', { w: 106 });
    o += A.note(122, 168, 178, 190, 'Phoenix: wild card', { w: 104 });
    o += A.note(240, 20, 272, 40, 'Tichu = bet ±100', { w: 96 });
    return o;
  },
});
