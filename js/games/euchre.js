{
// Mini playing card in a 24×24 icon box: rank on top, suit below. o.gold frames a bower.
const mini = (A, r, s, o = {}) => {
  const col = (s === '♥' || s === '♦') ? '#c8423b' : '#2a2420';
  return A.rect(3.5, 0.5, 17, 23, '#fffaf0', { rx: 2.5, sw: o.gold ? 2.2 : 1.3, stroke: o.gold ? '#d9a514' : undefined }) +
    A.text(12, 7.2, r, { size: 12.5, weight: 800, fill: col }) + A.text(12, 17.2, s + '︎', { size: 14, weight: 400, fill: col });
};
const back = (A, x, y, w, h) => A.rect(x, y, w, h, '#2f5d50', { rx: 2, sw: 1.1, stroke: '#2a2420' }) + A.poly([[x + w / 2, y + 3], [x + w - 3, y + h / 2], [x + w / 2, y + h - 3], [x + 3, y + h / 2]], 'none', { sw: 0.9, stroke: '#a8cbb8' });

defineGame({
  id: 'euchre',
  name: 'Euchre',
  year: 'Early 1800s',
  designer: 'Traditional',
  family: 'trick',
  players: [4, 4], best: '4',
  time: [20, 45],
  age: 10,
  mechanics: ['trick-taking', 'team', 'auction', 'hand-management', 'press-your-luck'],
  profile: { complexity: 2, luck: 3, interaction: 4, conflict: 3, talk: 3, planning: 2 },

  icons: {
    right: { name: 'right bower', draw: A => mini(A, 'J', '♥', { gold: true }) },
    left: { name: 'left bower', draw: A => mini(A, 'J', '♦', { gold: true }) },
    upcard: { name: 'upcard', draw: A => back(A, 2, 6, 13, 17) + A.group(mini(A, '9', '♥'), 'translate(4 0) scale(0.85)') },
    alone: { name: 'go alone', draw: A => A.circle(12, 12, 10.5, '#f3ead6', { sw: 1.3 }) + A.person(12, 12.5, 15, '#7a4a26') + A.text(19, 5.5, '1', { size: 8, weight: 800 }) },
  },

  pitch: 'Partners name trump and try to win 3 of 5 tricks with a 24-card deck. First team to 10 points wins.',

  goal: { big: '10 points', text: 'Play in 2 teams of 2. Each hand, one team chooses the **trump** suit (the suit that beats all others); that team, the **makers**, must win at least 3 of the 5 tricks (rounds of 1 card from each player). First team to **10** points wins.' },

  turn: {
    type: 'round',
    intro: 'Each hand goes through these phases:',
    steps: [
      { verb: 'Deal', text: 'The dealer deals **5** cards to each player. Place the 4 left-over cards face down and turn the top one face up: this is the {upcard}.' },
      { verb: 'Make trump', text: 'Bidding round 1: starting with the player to the dealer’s left and going clockwise (dealer last), each player either passes or **orders up** the {=upcard}, making its suit trump; the dealer then adds the upcard to their hand and discards 1 card face down. If all 4 pass, turn the upcard face down. Bidding round 2: in the same order, each player either passes or names a different suit as trump. Bidding stops as soon as one player chooses trump; that player’s team are the makers.' },
      { verb: 'Go alone?', text: 'The player who chose trump may announce {=alone} **going alone**: their partner puts their cards face down and sits out this hand, for a bigger reward (see Scoring).' },
      { verb: 'Play tricks', text: 'In a **trick**, each player in the hand plays 1 card face up, clockwise. The player to the dealer’s left **leads** (plays first to) the first trick; if someone is going alone, the player to the loner’s left leads instead. Each other player must **follow suit** (play a card of the suit led) if able; otherwise they may play any card, including a trump. The highest trump wins the trick; if no trump was played, the highest card of the suit led wins. The winner leads the next trick. Play 5 tricks.' },
      { verb: 'Score', text: 'If the makers won 3 or more tricks, they score 1, 2 or 4 points (see Scoring). If they won fewer than 3, they are **euchred** and the other team (the **defenders**) scores 2.' },
    ],
  },

  tension: 'You choose trump seeing only 5 cards: pass and the opponents may pick a suit you are weak in; call too boldly and you get euchred for 2.',

  structure: [
    { label: 'Hand', repeat: 'until 10', text: 'Deal 5 cards each, choose trump (up to 2 bidding rounds), play 5 tricks, score. The player to the dealer’s left deals the next hand.' },
    { label: 'Game end', text: 'The first team to reach **10** points wins.' },
  ],

  points: [
    ['Makers win 3 or 4 tricks', '1 point to the makers'],
    ['Makers win all 5 (a march)', '2 points to the makers'],
    ['{=alone} Loner wins all 5', '4 points to the loner’s team'],
    ['{=alone} Loner wins 3 or 4', '1 point to the loner’s team'],
    ['Makers win 0–2 (euchred)', '2 points to the defenders'],
  ],

  end: { trigger: 'a team reaches 10 points' },
  scoring: [
    { label: 'Making trump (1)', share: 5 },
    { label: 'Marches (2)', share: 2 },
    { label: 'Euchres (2)', share: 2 },
    { label: '{=alone} Loners (4)', share: 1 },
  ],

  ref: {
    title: 'Card order, high to low (if hearts are trump)',
    rows: [
      ['{=heart} trump', '{=right} {=left} A K Q 10 9'],
      ['{=diamond} (same colour)', 'A K Q 10 9 (its J becomes the {=left}, a heart)'],
      ['{=spade} {=club}', 'A K Q J 10 9'],
    ],
  },

  example: 'Sam deals and turns up **9{=heart}**. Kim holds J{=heart} J{=diamond} A{=heart}, so she orders it up; Sam adds the 9{=heart} to his hand and discards a club. With {=heart} trump, Kim’s jacks are the top two cards. Her team wins 4 tricks: **1 point**.',

  setup: [
    'Use only 9, 10, J, Q, K, A of each suit: 24 cards. 4 players in 2 teams; partners sit across from each other.',
    'Choose a first dealer. The dealer deals 5 cards to each player in packets of 3 and 2. Put the last 4 cards face down and turn the top one face up.',
    'Each team keeps score with a spare 6 and 4 card, placing one over the other so that the number of suit symbols showing equals the team’s score.',
  ],

  terms: [
    ['Trump', 'The suit that beats all others this hand.'],
    ['Makers / defenders', 'The team that chose trump / the other team.'],
    ['{=right} Right bower', 'The jack of the trump suit: the highest card. (“Bower” means one of the two top jacks.)'],
    ['{=left} Left bower', 'The other jack of the same colour as trump: the second-highest card. It counts as a trump, not as its printed suit.'],
    ['Order up', 'Tell the dealer to pick up the {=upcard}, making its suit trump.'],
    ['Euchred', 'Makers won fewer than 3 tricks; defenders score 2.'],
    ['{=alone} Going alone', 'The player who chose trump plays without their partner; the loner’s team scores 4 for winning all 5 tricks.'],
  ],

  gotchas: [
    'The {=left} left bower **changes suit**: with {=heart} trump, J{=diamond} is a heart. When hearts are led it counts as a heart you hold; when diamonds are led it does not count as a diamond.',
    'In round 2 you **can’t** name the suit that was turned down.',
    'If all 4 players pass in both bidding rounds, the cards are collected and the player to the dealer’s left deals a new hand. Common variant, “stick the dealer”: if the other 3 pass in round 2, the dealer may not pass and must name a suit.',
  ],

  tips: [
    'Both bowers plus an ace is a strong call; 3 trumps and an off-suit ace usually make 3 tricks.',
    'As maker, lead trump early to force the opponents to play their trumps.',
    'Ordering up for an **opponent** dealer hands them a trump: you need a stronger hand than when partner deals.',
  ],

  walk(A) {
    const C = A.C, R = '#c8423b', W = 30, H = 42, gold = '#ffcf3f', ic = this.icons;
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
    // Bower badges above the two jacks, drawn from the same icons as the text.
    const bowers = A.k('bw', A.use(ic.right.draw(A), 100, 118, 22) + A.use(ic.left.draw(A), 134, 118, 22));
    const alone = A.k('alone', A.use(ic.alone.draw(A), 18, 118, 30) + A.text(56, 133, '?', { size: 18, weight: 800, fill: '#fff' }));
    return [
      { step: 0, say: 'Sam deals 5 each and turns up the {=upcard} **9{=heart}** on the 4 left-over cards.', svg: board + mine() + kitty + up + A.glow(179, 87, 28) },
      { step: 1, say: 'Kim speaks first. With {=heart} trump, J{=heart} and J{=diamond} become the top two cards ({=right} {=left}), so she **orders it up**.', svg: board + mine('', true) + kitty + up + bowers },
      { step: 1, say: 'Sam takes 9{=heart} into his hand and discards one face down. **Hearts** are trump.', svg: board + mine() + kitty + discard + A.k('up', face(274, 110, '9', '♥')) },
      { step: 2, say: 'Kim could go {=alone} **alone** for 4 points, but keeps partner Pat in.', svg: board + mine() + kitty + discard + A.k('up', face(274, 110, '9', '♥')) + alone + A.glow(153, 25, 24) },
      { step: 3, say: 'Kim leads J{=heart}, the {right}. Everyone who has a heart must play one; nothing beats the right bower.', svg: board + mine('J♥') + kitty + discard + played + A.glow(160, 121, 28) },
      { step: 4, say: 'Kim and Pat take **4** of 5 tricks: **1 point**. All 5 would score 2.', svg: board + A.k('hJ♦', face(96, 150, 'J', '♦')) + kitty + discard + tricks + A.glow(244, 155, 28) },
    ];
  },

  art(A) {
    const C = A.C, R = '#c8423b', gold = '#ffcf3f', ic = this.icons;
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
    // my hand: the two bowers are the bower icons, the rest plain cards
    const rot = (i) => (i - 2) * 4;
    [['J', '♥', 'right'], ['J', '♦', 'left'], ['A', '♥'], ['K', '♠'], ['10', '♣']].forEach(([r, s, b], i) => {
      const x = 112 + i * 28, y = 148 + Math.abs(i - 2) * 2;
      o += b ? A.group(A.use(ic[b].draw(A), x - 5.6, y - 0.8, 38.4), `rotate(${rot(i)} ${x + 13} ${y + 19})`) : pc(x, y, r, s, { w: 26, h: 38, rot: rot(i) });
    });
    // score cards: a 6 partly covered by a face-down 4
    o += pc(16, 148, '6', '♣', { w: 24, h: 34, rot: -4 }) + bk(26, 156, 24, 34, 70);
    o += A.note(166, 74, 250, 36, 'Order up this card?', { w: 112 });
    o += A.note(122, 176, 66, 130, 'Right bower: J of trump', { w: 128 });
    o += A.note(151, 176, 248, 136, 'Left bower: same-colour J', { w: 136 });
    o += A.note(26, 170, 56, 190, '6 and 4 cards keep score', { w: 132 });
    return o;
  },
});
}
