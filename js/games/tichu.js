{
// Special-card frame in a 24×24 icon box (17×23 card, gold edge like the art).
const sc = (A, fill, inner) => A.rect(3.5, 0.5, 17, 23, fill, { rx: 2.5, sw: 1.6, stroke: '#a8842e' }) + inner;

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

  icons: {
    dragon: { name: 'Dragon', draw: A => sc(A, '#b5262f', A.path('M7 19.5 q3 -7 5.5 -3 q3 4 5 -3 q2 -5 -1.5 -8 q-3 -2 -3 -4.5', { stroke: '#f2cf6b', sw: 2.2 }) + A.circle(8, 5, 1.6, '#f2cf6b', { sw: 0 })) },
    phoenix: { name: 'Phoenix', draw: A => sc(A, '#e07b2e', A.bird(13, 13, 15, '#ffd36a')) },
    dog: { name: 'Dog', draw: A => sc(A, '#f4ecd8', A.circle(8.3, 9, 2.6, '#8a5a33', { sw: 0 }) + A.circle(15.7, 9, 2.6, '#8a5a33', { sw: 0 }) + A.circle(12, 13.5, 5, '#8a5a33', { sw: 1 }) + A.circle(12, 15.6, 1.3, '#2a2420', { sw: 0 })) },
    mahjong: { name: 'Mah Jong', draw: A => sc(A, '#e3f0dc', A.text(12, 8.5, '1', { size: 13, weight: 800, fill: '#2f8a4f' }) + A.bird(12.5, 17.5, 10, '#2f8a4f')) },
    bomb: { name: 'bomb', draw: A => A.circle(11, 14, 8, '#2a2420', { sw: 1.2 }) + A.circle(8.5, 11.5, 2, '#6b6560', { sw: 0 }) + A.path('M16 8 q2 -4 5 -4', { stroke: '#8a5a33', sw: 2 }) + A.star(21, 3.5, 3.4, '#ffb52e', { sw: 0.6 }) },
    jade: { name: 'jade', draw: A => A.circle(12, 12, 7, '#2f8a4f', { sw: 0 }) },
    sword: { name: 'swords', draw: A => A.poly([[12, 3], [19.5, 12], [12, 21], [4.5, 12]], '#2f5fb0', { sw: 0 }) },
    pagoda: { name: 'pagodas', draw: A => A.poly([[12, 3.5], [20.5, 19], [3.5, 19]], '#2a2420', { sw: 0 }) },
    star: { name: 'stars', draw: A => A.star(12, 12.5, 10, '#c8423b', { sw: 0 }) },
    tichu: { name: 'Tichu call', draw: A => A.path('M4 3 h16 q2.5 0 2.5 2.5 v9 q0 2.5 -2.5 2.5 h-9 l-5 5 v-5 h-2 q-2.5 0 -2.5 -2.5 v-9 q0 -2.5 2.5 -2.5z', { fill: '#fff', sw: 1.3 }) + A.text(12, 10, 'T!', { size: 10, weight: 800, fill: '#7a1f2b' }) },
  },

  pitch: 'Partners race to empty their hands, beating each play with a higher combination of the same kind. First to 1,000 wins.',

  goal: { big: '1,000 points', text: 'Play in 2 teams of 2. **Going out** means playing your last card. Points come from point cards in the tricks (piles of played cards) your team wins, from both partners going out 1st and 2nd, and from **Tichu** bets that you will go out first. First team to **1,000** wins.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal 8', text: 'Deal 8 cards to each player. After looking at only these 8, any player may call **Grand Tichu** (a bet of 200 that they go out first). Then deal 6 more to each player, for 14.' },
      { verb: 'Pass', text: 'At the same time, each player passes 1 card face down to **each** of the other 3 players (3 cards out, 3 cards in).' },
      { verb: 'Climb', text: 'The holder of the {=mahjong} **leads** (plays first) any **combination**: a single card, a pair, a triple, a full house, a run of 5+ cards, or a run of pairs (see Key terms). Play goes to the **right** (counter-clockwise). On your turn, either play a combination of the **same kind and the same number of cards**, but higher, or pass. Passing does not stop you from playing later in the same trick.' },
      { verb: 'Take trick', text: 'When every other player still holding cards passes in a row, the last player to play wins the **trick**: they take all cards played since the lead, face down, and lead any combination to start the next trick. If they have already gone out, the next player in turn who still has cards leads.' },
      { verb: 'Score', text: 'The hand ends when only one player still has cards. Count card points and add or subtract {=tichu} bets (see How the game flows).' },
    ],
  },

  tension: 'Strong cards either win point-rich tricks or get you out first, rarely both, and a Tichu call bets 100 that you go out first.',

  structure: [
    { label: 'Deal & pass', repeat: 'each hand', text: 'Deal 8 cards each; players may call Grand Tichu. Deal 6 more each; each player passes 1 card to each other player.' },
    { label: 'Play', repeat: 'each hand', text: 'The holder of the {=mahjong} leads. Play tricks until only 1 player has cards left.' },
    { label: 'End of hand', text: 'The last player with cards gives the cards left in their hand to the opposing team, and the tricks they won to the player who went out first. Each team counts the card points in its tricks, then adds or subtracts {=tichu} bets.' },
    { label: 'Game end', text: 'When a team has **1,000** or more points at the end of a hand, the game ends; the higher score wins.' },
  ],

  points: [
    ['Card points', 'In the tricks your team won: each 5 = 5 points; each 10 and K = 10'],
    ['{=dragon} Dragon', '+25 to the team whose tricks hold it at the end of the hand'],
    ['{=phoenix} Phoenix', '−25 to the team whose tricks hold it at the end of the hand'],
    ['{=tichu} Tichu', '+100 to the caller’s team if the caller goes out first; −100 if not'],
    ['Grand Tichu', '+200 if the caller goes out first; −200 if not'],
    ['Double victory', 'Partners go out 1st and 2nd: their team scores 200, and no card points are counted for either team'],
  ],

  end: { trigger: 'a team has 1,000 or more points at the end of a hand', detail: 'If both teams reach 1,000 in the same hand, the higher score wins.' },
  scoring: [
    { label: 'Card points', share: 5 },
    { label: '{=tichu} Tichu calls', share: 3 },
    { label: 'Double victories', share: 2 },
  ],

  ref: {
    title: 'Special cards',
    rows: [
      ['{=mahjong} Mah Jong (1)', 'Its holder leads the first trick. Whoever plays it may **wish** for a rank (see Rules people miss)'],
      ['{=dog} Dog', 'Can only be led, by itself. Your partner then leads the next trick (if your partner is out, the player to your partner’s right leads)'],
      ['{=phoenix} Phoenix', 'In a combination (not a bomb) it stands in for any normal card. Played as a single card, it ranks ½ above the card it is played on (1½ if led). Worth −25'],
      ['{=dragon} Dragon', 'The highest single card; it can only be played as a single. Worth +25, but if it wins the trick, you give that trick to an opponent of your choice'],
      ['{=bomb} Bomb', '4 cards of one rank, or a run of 5+ cards all in one suit. Beats any non-bomb; may be played at any time, even out of turn'],
      ['Rank, low → high', '{=mahjong} 2 3 … 10 J Q K A, then {=dragon}'],
    ],
  },

  example: 'Ana calls {=tichu} **Tichu** before her first card. Lee leads the run 4-5-6-7-8; Ana, on his right, plays 6-7-8-9-10. Ben, Lee’s partner, plays a {=bomb} of four 3s; the other 3 players pass, and Ben wins the trick, including Ana’s 10.',

  setup: [
    '56 cards: 2 to Ace in 4 suits ({=jade}{=sword}{=pagoda}{=star}) plus {=mahjong}{=dog}{=phoenix}{=dragon}.',
    '4 players in 2 teams; partners sit across from each other. Deal 8 cards each, allow Grand Tichu calls, then deal 6 more each.',
    'Each player passes 1 card to each of the other 3.',
  ],

  terms: [
    ['Combination', 'A single card, a pair, a triple, a full house (a triple plus a pair), a run of 5+ consecutive ranks in any suits, or a run of 2+ consecutive pairs (e.g. 33-44).'],
    ['Trick', 'All cards played from a lead until everyone else passes; the last player to play wins it.'],
    ['{=bomb} Bomb', 'Four of a kind or a straight flush of 5+. Beats any non-bomb.'],
    ['{=tichu} Tichu', 'A bet that you go out first, called any time before you play your first card: +100 if you do, −100 if not.'],
    ['Grand Tichu', 'The same bet made after seeing only 8 cards: ±200.'],
    ['Double victory', 'Partners go out 1st and 2nd: the hand ends at once; 200 points, no cards counted.'],
  ],

  gotchas: [
    'A {=bomb} may be played **any time**, even out of turn. Bombs rank by card count, then rank: any straight flush beats any four of a kind.',
    'The {=dog} can only be **led**, never played on a trick, and can’t be bombed. The {=dragon} plays only as a single, and the {=phoenix} can’t beat it.',
    'While a {=mahjong} **wish** is open, the next player who holds the wished rank and can legally play it on their turn must play it (even in a {=bomb}). The wish stays open until a card of that rank is played. Wishes are for ranks 2–A only.',
  ],

  tips: [
    'Pass your partner a strong card (an ace or the {=dog}) and your opponents low ones.',
    'Call Tichu only with control: the {=dragon}, aces or a {=bomb}, and few low singles.',
    'When your partner has called Tichu, **don’t** beat their plays; help them go out first.',
  ],

  walk(A) {
    const C = A.C, gold = '#d6b25a', W = 26, H = 38, ic = this.icons;
    const suit = { j: ['#2f8a4f', 'c'], s: ['#2f5fb0', 'd'], p: ['#2a2420', 't'], t: ['#c8423b', 's'] };
    const pip = (x, y, k, f) => k === 'c' ? A.circle(x, y, 4, f, { sw: 0 }) : k === 'd' ? A.poly([[x, y - 5], [x + 4.5, y], [x, y + 5], [x - 4.5, y]], f, { sw: 0 }) : k === 't' ? A.poly([[x, y - 5], [x + 5, y + 4], [x - 5, y + 4]], f, { sw: 0 }) : A.star(x, y, 5.5, f, { sw: 0 });
    const face = (x, y, r, su) => {
      const [f, k] = suit[su];
      return A.rect(x + 1.5, y + 2, W, H, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, W, H, '#fdf7e6', { rx: 4, sw: 1.2 }) +
        A.text(x + 8, y + 9, r, { size: 10, weight: 800, fill: f }) + pip(x + W / 2 + 1, y + H / 2 + 4, k, f);
    };
    // The Dragon is the Dragon icon, scaled to card size.
    const k = W / 17;
    const dragon = (x, y) => A.rect(x + 1.5, y + 2, W, 23 * k, C.shadow, { sw: 0, rx: 4 }) + A.use(ic.dragon.draw(A), x - 3.5 * k, y - 0.5 * k, 24 * k);
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
    const bomb = ['3j', '3s', '3p', '3t'].map((id, i) => A.k('B' + id, face(206 + i * 18, 108, '3', id.slice(-1)))).join('') + A.k('bombic', A.use(ic.bomb.draw(A), 268, 86, 30));
    const pileAt = (x, y) => [...['4j', '5s', '6p', '7t', '8j'].map(id => 'L' + id), ...run, ...['3j', '3s', '3p', '3t'].map(id => 'B' + id)]
      .map((id, i) => A.k(id, id[0] === 'B' ? face(x + i * 0.6, y + i * 0.4, '3', id.slice(-1)) : id[0] === 'L' ? face(x + i * 0.6, y + i * 0.4, id.slice(1, -1), id.slice(-1)) : face(x + i * 0.6, y + i * 0.4, id.slice(0, -1), id.slice(-1)))).join('');
    return [
      { step: 0, say: 'Ana sees her first **8 cards**. Too weak for Grand Tichu (±200), so she takes her other 6.', svg: board + row(first8) },
      { step: 1, say: 'Everyone passes 1 card to **each** other player. Ana sends a 2 to each opponent and an ace to her partner.', svg: board + row(['6s', '7j', '8t', '9p', '10s', 'Kj', 'DR']) + passed },
      { step: 2, say: 'With a run and the {dragon}, Ana calls {=tichu} **Tichu**: +100 if she goes out first, −100 if not.', svg: board + row(handAfter) + call + A.glow(41, 127, 32) },
      { step: 2, say: 'Lee leads a 5-card run, **4-5-6-7-8**. Play goes right: Ana is next.', svg: board + row(handAfter) + call + leeRun },
      { step: 2, say: 'Ana plays **6-7-8-9-10**: same kind, same length, higher.', svg: board + row(['Kj', 'DR']) + call + leeRun + anaRun + A.glow(161, 89, 50) },
      { step: 2, say: 'Ben plays a {bomb}: four 3s. A bomb may be played any time and beats any non-bomb combination.', svg: board + row(['Kj', 'DR']) + call + leeRun + anaRun + bomb + A.glow(246, 127, 44) },
      { step: 3, say: 'The next 3 players pass, so Ben takes the trick, including Ana’s **10** (10 points), and leads next.', svg: board + row(['Kj', 'DR']) + call + pileAt(240, 120) + A.glow(260, 145, 32) },
    ];
  },

  art(A) {
    const C = A.C, gold = '#d6b25a', ic = this.icons;
    const suit = { j: ['#2f8a4f', 'c'], s: ['#2f5fb0', 'd'], p: ['#2a2420', 't'], t: ['#c8423b', 's'] };
    const pip = (x, y, k, f) => k === 'c' ? A.circle(x, y, 3.2, f, { sw: 0 }) : k === 'd' ? A.poly([[x, y - 4], [x + 3.5, y], [x, y + 4], [x - 3.5, y]], f, { sw: 0 }) : k === 't' ? A.poly([[x, y - 4], [x + 4, y + 3], [x - 4, y + 3]], f, { sw: 0 }) : A.star(x, y, 4.2, f, { sw: 0 });
    const pc = (x, y, r, su, o = {}) => {
      const w = o.w || 20, h = o.h || 28, [f, k] = suit[su];
      const g = A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, o.dim ? '#e6dcc4' : '#fdf7e6', { rx: 3, sw: 1 }) +
        A.text(x + 5.5, y + 7, r, { size: 8, weight: 800, fill: f }) + pip(x + w / 2 + 1, y + h / 2 + 3, k, f);
      return o.rot ? A.group(g, `rotate(${o.rot} ${x + w / 2} ${y + h / 2})`) : g;
    };
    // Special cards are the inline icons scaled to 24-wide cards.
    const sp = (x, y, key, rot) => {
      const k = 24 / 17;
      const g = A.rect(x + 1.5, y + 2, 24, 23 * k, C.shadow, { sw: 0, rx: 3 }) + A.use(ic[key].draw(A), x - 3.5 * k, y - 0.5 * k, 24 * k);
      return A.group(g, `rotate(${rot} ${x + 12} ${y + 16})`);
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
    o += sp(88, 140, 'dragon', -9) + sp(110, 138, 'phoenix', -5) + sp(132, 137, 'dog', -1);
    [['A', 'j'], ['A', 't'], ['K', 'p'], ['3', 's']].forEach(([r, s], i) => { o += pc(156 + i * 21, 138 + i * 1.5, r, s, { w: 24, h: 34, rot: 3 + i * 3 }); });
    o += A.note(168, 92, 226, 118, 'Beat: same combo, higher', { w: 128 });
    o += A.note(98, 165, 58, 190, 'Dragon: top single', { w: 106 });
    o += A.note(122, 168, 178, 190, 'Phoenix: wild card', { w: 104 });
    o += A.note(240, 20, 272, 40, 'Tichu = bet ±100', { w: 96 });
    return o;
  },
});
}
