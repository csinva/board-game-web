defineGame({
  id: 'euchre',
  name: 'Euchre',
  year: 1820,
  designer: 'Traditional',
  family: 'trick',
  players: [4, 4], best: '4',
  time: [20, 45],
  age: 10,
  mechanics: ['trick-taking', 'team', 'auction', 'hand-management', 'press-your-luck'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 3, talk: 3, planning: 2 },

  pitch: 'A fast partnership game with a tiny 24-card deck where two jacks become the top trumps and one bold call can win the hand.',
  theme: 'You and your partner across the table decide which suit is trump, then try to win at least 3 of the 5 tricks.',

  goal: { big: '10 points', text: 'First team to **10** points wins. The team that chose trump (the **makers**) must take at least 3 of the 5 tricks.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'Deal **5 cards** each. Turn the top card of the 4 left over face up.' },
      { verb: 'Make trump', text: 'Round 1: each player may **order up** that card (dealer takes it and discards one) or pass. Round 2: name a different suit or pass.' },
      { verb: 'Go alone?', text: 'The maker may play **alone**: partner lays their cards down for a bigger reward.' },
      { verb: 'Play tricks', text: 'Left of dealer leads. Follow suit if you can; the highest trump wins, otherwise the highest card of the suit led.' },
      { verb: 'Score', text: 'Makers take 3–4 tricks: 1 point; all 5: 2; alone and all 5: 4. Fewer than 3: defenders score 2.' },
    ],
  },

  tension: 'You must decide on trump with just 5 cards and a partner’s hand you can’t see: pass and the opponents may pick a suit you’re weak in, call too boldly and you get euchred for 2.',

  flow: [
    { label: 'Call', items: ['Order up the upcard', 'Or name another suit', 'Or go alone'] },
    { label: 'Play', items: ['Bowers on top', 'Follow suit', 'Lead trump as maker'] },
    { label: 'Score', items: ['3–4 tricks: 1', 'March (5): 2', 'Alone march: 4', 'Euchre: 2 to defenders'] },
  ],

  end: { trigger: 'a team reaches 10 points', detail: 'Hands are quick (about 3 minutes), so a game is usually 10–15 hands.' },
  scoring: [
    { label: 'Making trump (1)', share: 5 },
    { label: 'Marches (2)', share: 2 },
    { label: 'Euchres (2)', share: 2 },
    { label: 'Loners (4)', share: 1 },
  ],

  ref: {
    title: 'Trump order & scoring',
    rows: [
      ['Trump, high to low', 'J of trump, J of same colour, A K Q 10 9'],
      ['Other suits', 'A K Q J 10 9'],
      ['Makers take 3–4', '1 point'],
      ['Makers take all 5', '2 points (a march)'],
      ['Alone, takes all 5', '4 points (alone 3–4: 1)'],
      ['Makers take 0–2', 'euchred: defenders get 2'],
    ],
  },

  example: 'Sam deals and turns up the **9♥**. Kim, on his left, holds J♥, J♦ and A♥, so she orders it up; Sam adds the 9♥ to his hand and discards a club. With hearts as trump, Kim’s two jacks are the top two cards. Her team takes 4 tricks for **1 point**.',

  setup: [
    'Use only the 9, 10, J, Q, K and A of each suit: 24 cards. Partners sit across.',
    'Deal 5 each in packets of 3 and 2; put the last 4 face down and turn the top one up.',
    'Each team keeps score with a spare 6 and 4, sliding one over the other to show pips.',
  ],

  terms: [
    ['Trump', 'The suit that beats all others this hand.'],
    ['Right bower', 'The jack of trump: the highest card.'],
    ['Left bower', 'The other jack of the same colour: second highest, and it counts as a trump.'],
    ['Order up', 'Tell the dealer to pick up the turned card, making its suit trump.'],
    ['Euchred', 'The makers took fewer than 3 tricks; defenders score 2.'],
  ],

  gotchas: [
    'The left bower **changes suit**: with hearts trump, the J♦ is a heart, so it must follow a heart lead and can’t follow diamonds.',
    'In round 2 you **can’t** name the suit that was turned down.',
    'If everyone passes twice, the hand is thrown in and the deal moves on (or play “stick the dealer”: the dealer must name a suit).',
  ],

  tips: [
    'Two bowers plus an ace is a strong call; three trumps with an off-suit ace usually makes 3 tricks.',
    'As the maker, lead trump early to pull the opponents’ trumps.',
    'Ordering up the **opponents’** dealer hands them a trump, so you need a stronger hand than when partner deals.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', W = 30, H = 42, gold = '#ffcf3f';
    const face = (x, y, r, s, hi) => {
      const col = (s === '♥' || s === '♦') ? R : C.ink;
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fffaf0', { rx: 4, sw: hi ? 2.4 : 1.2, stroke: hi ? gold : C.ink }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: col }) + A.text(x + W / 2 + 1, y + H / 2 + 4, s, { size: 18, fill: col });
    };
    const back = (x, y, w = 22, h = 30) => A.rect(x, y, w, h, '#2f5d50', { rx: 3, sw: 1.1, stroke: '#f3ead6' }) + A.poly([[x + w / 2, y + 4], [x + w - 4, y + h / 2], [x + w / 2, y + h - 4], [x + 4, y + h / 2]], 'none', { sw: 0.8, stroke: '#a8cbb8' });
    let board = A.bg('#7a4a26');
    for (let i = 0; i < 6; i++) board += A.line(0, 18 + i * 34, 320, 18 + i * 34, { sw: 1.2, stroke: '#5f3818', opacity: 0.7 });
    for (let i = 0; i < 4; i++) board += back(14 + i * 6, 74) + back(270 + i * 6, 74) + back(130 + i * 8, 10);
    board += A.tag(40, 62, 'Lee') + A.tag(266, 62, 'Sam (dealer)') + A.tag(84, 24, 'Pat (partner)') + A.tag(44, 178, 'You (Kim)');
    const hand = [['J', '♥', 1], ['J', '♦', 1], ['A', '♥'], ['K', '♠'], ['10', '♣']];
    const mine = (skip, hi) => hand.filter(c => c[0] + c[1] !== skip).map(([r, s, b], i) => A.k('h' + r + s, face(96 + i * 34, 150, r, s, hi && b))).join('');
    const kitty = A.k('k1', back(140, 76, 26, 36)) + A.k('k2', back(143, 73, 26, 36)) + A.k('k3', back(146, 70, 26, 36));
    const up = A.k('up', face(164, 66, '9', '♥'));
    const discard = A.k('disc', back(149, 67, 26, 36));
    const played = A.k('pat', face(145, 50, 'Q', '♥')) + A.k('lee', face(110, 80, '10', '♥')) + A.k('up', face(180, 80, '9', '♥')) + A.k('hJ♥', face(145, 100, 'J', '♥', true));
    const tricks = A.k('won', [0, 1, 2, 3].map(i => back(206 + i * 18, 140, 22, 30)).join('') + A.text(242, 186, '4 tricks', { size: 9, weight: 800, fill: '#fff' }));
    return [
      { step: 0, say: 'Sam deals 5 cards each and turns up the **9♥** on the 4 left-over cards.', svg: board + mine() + kitty + up + A.glow(179, 87, 28) },
      { step: 1, say: 'Kim speaks first. With hearts as trump, her **J♥ and J♦** would be the top two cards, so she **orders it up**.', svg: board + mine('', true) + kitty + up },
      { step: 1, say: 'Sam takes the 9♥ into his hand and discards one card face down. **Hearts** are trump.', svg: board + mine() + kitty + discard + A.k('up', face(274, 110, '9', '♥')) },
      { step: 2, say: 'Kim could go **alone** for 4 points, but she keeps her partner Pat in the hand.', svg: board + mine() + kitty + discard + A.k('up', face(274, 110, '9', '♥')) + A.glow(153, 25, 24) },
      { step: 3, say: 'Kim leads the J♥, the **right bower**. Everyone must follow with hearts, and nothing can beat it.', svg: board + mine('J♥') + kitty + discard + played + A.glow(160, 121, 28) },
      { step: 4, say: 'Kim and Pat take **4** of the 5 tricks: **1 point**. All 5 would have scored 2.', svg: board + A.k('hJ♦', face(96, 150, 'J', '♦')) + kitty + discard + tricks + A.glow(244, 155, 28) },
    ];
  },

  art(A) {
    const C = A.C, R = '#c8423b', gold = '#ffcf3f';
    const pc = (x, y, r, s, o = {}) => {
      const w = o.w || 22, h = o.h || 31, col = (s === '♥' || s === '♦') ? R : C.ink;
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#fffaf0', { rx: 3, sw: o.hi ? 2.4 : 1, stroke: o.hi ? gold : C.ink }) +
        A.text(x + 6, y + 7, r, { size: 8.5, weight: 800, fill: col }) + A.text(x + w / 2 + 1, y + h / 2 + 3, s, { size: w * 0.6, fill: col });
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    const bk = (x, y, w, h, rot) => {
      const g = A.rect(x, y, w, h, '#2f5d50', { rx: 2.5, sw: 1, stroke: '#f3ead6' }) + A.poly([[x + w / 2, y + 4], [x + w - 4, y + h / 2], [x + w / 2, y + h - 4], [x + 4, y + h / 2]], 'none', { sw: 0.8, stroke: '#a8cbb8' });
      return rot ? A.group(g, `rotate(${rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    let o = A.bg('#7a4a26');
    for (let i = 0; i < 6; i++) o += A.line(0, 18 + i * 34, 320, 18 + i * 34, { sw: 1.2, stroke: '#5f3818', opacity: 0.7 });
    for (let i = 0; i < 9; i++) o += A.path(`M${(i * 47) % 300 + 10} ${(i * 29) % 170 + 8} q20 -4 40 0`, { stroke: '#94603a', sw: 1 });
    // other hands
    for (let i = 0; i < 5; i++) o += bk(124 + i * 13, 8, 18, 25);
    for (let i = 0; i < 5; i++) o += bk(14, 56 + i * 10, 24, 17);
    for (let i = 0; i < 5; i++) o += bk(282, 56 + i * 10, 24, 17);
    o += A.circle(110, 20, 8, '#f3ead6', { sw: 1.2 }) + A.text(110, 20.5, 'D', { size: 9, weight: 800 });
    // kitty with upcard
    o += bk(128, 66, 26, 36, -6) + bk(131, 64, 26, 36, -2) + pc(150, 60, '9', '♥', { w: 26, h: 36, rot: 10 });
    // my hand with the two bowers
    [['J', '♥', 1], ['J', '♦', 1], ['A', '♥'], ['K', '♠'], ['10', '♣']].forEach(([r, s, hi], i) => { o += pc(112 + i * 28, 148 + Math.abs(i - 2) * 2, r, s, { w: 26, h: 38, rot: (i - 2) * 4, hi }); });
    // score cards: a 6 partly covered by a face-down 4
    o += pc(16, 148, '6', '♣', { w: 24, h: 34, rot: -4 }) + bk(26, 156, 24, 34, 70);
    o += A.note(166, 74, 250, 36, 'Order up this card?', { w: 112 });
    o += A.note(122, 176, 66, 130, 'Right bower: J of trump', { w: 128 });
    o += A.note(151, 176, 248, 136, 'Left bower: same-colour J', { w: 136 });
    o += A.note(26, 170, 56, 190, '6 + 4 keep score', { w: 100 });
    return o;
  },
});
