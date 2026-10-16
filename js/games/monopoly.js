defineGame({
  id: 'monopoly',
  name: 'Monopoly',
  year: 1935,
  designer: 'Lizzie Magie & Charles Darrow',
  family: 'classic',
  players: [2, 8], best: '4',
  time: [60, 180],
  age: 8,
  mechanics: ['roll-and-move', 'dice', 'trading', 'negotiation', 'auction', 'set-collection', 'player-elimination'],
  profile: { complexity: 1, luck: 5, interaction: 4, conflict: 4, talk: 4, planning: 2 },

  // Money, deeds, buildings and the two card decks: used inline and drawn the same way in art + walk.
  icons: {
    cash: { name: 'cash', draw: A => A.rect(2, 4, 20, 11, '#f0c27a', { rx: 1.5, sw: 1.1 }) + A.rect(1, 8, 21, 12, '#9fd2f2', { rx: 1.5, sw: 1.3 }) + A.circle(11.5, 14, 4.2, '#fff', { sw: 0.8 }) + A.text(11.5, 14.4, '$', { size: 7.5, weight: 800 }) },
    deed: { name: 'title deed', draw: A => A.rect(4, 1, 16, 22, '#fff', { rx: 2, sw: 1.3 }) + A.rect(6, 3, 12, 6, '#f29a1e', { rx: 0.8, sw: 0.8 }) + A.line(8, 13, 16, 13, { sw: 1.2, stroke: '#8c877f' }) + A.line(8, 16.5, 16, 16.5, { sw: 1.2, stroke: '#8c877f' }) + A.line(8, 20, 14, 20, { sw: 1.2, stroke: '#8c877f' }) },
    house: { name: 'house', draw: A => A.house(12, 20, 16, '#2fa84f') },
    hotel: { name: 'hotel', draw: A => A.rect(2, 10, 20, 10, '#e0312c', { rx: 1, sw: 1.3 }) + A.poly([[1.5, 10.5], [12, 4], [22.5, 10.5]], '#e0312c', { sw: 1.3 }) },
    chance: { name: 'Chance', draw: A => A.rect(1, 5, 22, 14, '#f29a1e', { rx: 2, sw: 1.3 }) + A.text(12, 12.5, '?', { size: 12, weight: 800, fill: '#fff' }) },
    chest: { name: 'Community Chest', draw: A => A.rect(1, 5, 22, 14, '#f4df2f', { rx: 2, sw: 1.3 }) + A.rect(7.5, 11, 9, 6, '#a0602f', { rx: 0.8, sw: 0.9 }) + A.path('M7.5 11 v-1.5 q4.5 -3.5 9 0 v1.5 z', { fill: '#c07a3c', sw: 0.9 }) + A.rect(11, 12, 2, 2, '#f4df2f', { rx: 0.3, sw: 0 }) },
  },

  pitch: 'Roll and move, buy streets, trade for colour sets and build houses; the last player not bankrupt wins.',

  goal: { big: 'Last one solvent', text: 'Be the **last player** not bankrupt. Rent from your properties drains everyone else.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Roll', text: 'Roll {=die}{=die} and move clockwise. Landing on or passing **GO** pays $200. Doubles: roll again after this move.' },
      { verb: 'Resolve', text: 'Unowned property: **buy** its {deed} at the printed price, or the bank auctions it. Owned: pay the rent on its deed. Other spaces: draw a {=chance}{=chest} card, pay the tax shown or go to jail.' },
      { verb: 'Deal', text: 'Any time: trade, mortgage, or build {house}s evenly on colour sets you fully own.' },
    ],
  },

  tension: 'Cash protects you from rent, but only property and houses earn, so you decide how close to broke you dare to build.',

  structure: [
    { label: 'Setup', text: '$1,500 each; all tokens on GO.' },
    { label: 'Turns', repeat: 'clockwise', text: 'Roll, move, resolve the space, then trade or build. Doubles: go again. Third doubles in a row: go to jail.' },
    { label: 'Bankruptcy', text: 'Owe more than you can raise: you are out. Owed to a player: they get your cash, deeds and half the cost of your buildings. Owed to the bank: it auctions your deeds.' },
    { label: 'Game end', text: 'The last player not bankrupt wins.' },
  ],

  end: {
    trigger: 'all but one player are bankrupt',
    detail: 'You are bankrupt when you owe more than you can raise by selling buildings and mortgaging.',
    results: [{ side: 'Winner:', text: 'the last player left.' }],
  },

  ref: {
    title: 'Numbers to know',
    rows: [
      ['Passing GO', '+$200 {=cash}'],
      ['{=deed} Streets', 'rent, house price and mortgage value printed on the deed'],
      ['Leave jail', 'pay $50, use a card, or roll doubles {=d3}{=d3} (3 tries, then pay $50 and move)'],
      ['{=deed}{=deed}{=deed} Full set', 'double rent on streets without buildings; {=hotel} = {=house}{=house}{=house}{=house} + hotel price'],
      ['Railroads', '$25 / 50 / 100 / 200 rent for 1 / 2 / 3 / 4 owned'],
      ['Utilities', 'rent = 4× the dice roll, 10× if one owner has both'],
    ],
  },

  example: 'You roll {=d4}{=d4} onto an unowned orange street ($180). You decline, it goes to auction, and you win it for $120. Doubles, so you roll again: 7, onto Maya’s B&O Railroad. She owns two railroads, so you pay **$50**.',

  setup: [
    'Give each player $1,500 {=cash}; the Banker keeps the rest, the deeds, 32 {house}s and 12 {hotel}s.',
    'Shuffle the {chance} and {chest} decks face down on their spaces.',
    'Everyone puts a token on GO; highest roll starts.',
  ],

  terms: [
    ['{=deed} Colour set', 'All streets of one colour. Required to build.'],
    ['Mortgage', 'Flip a deed to take its mortgage value (half its price); it earns no rent until you repay that plus 10%.'],
    ['Auction', 'A property the lander declines goes to the highest bidder, the lander included.'],
    ['Jail', 'Up to 3 turns; you still collect rent, trade and build.'],
  ],

  gotchas: [
    '**Free Parking** pays nothing. Collecting tax money there is a house rule that lengthens the game.',
    'A property you decline must be **auctioned**; anyone may bid, you included, from any price. Skipping auctions is another house rule.',
    '{house}s go up and come down **evenly** across a set, at most 4 per street before a {hotel}. No building on a set with a mortgaged street. Buildings sell back to the bank at **half** price.',
    '**Housing shortage**: when the bank has no {house}s left, nobody can build until some are sold back. If more players want buildings than remain, auction them.',
    'Three doubles in a row: go straight to jail, no $200. Doubles that free you from jail move you but give no extra roll.',
    'Buying a mortgaged deed from a player: pay the bank 10% at once; if you lift the mortgage later, pay another 10%.',
    'Players can’t lend each other money. An owner who forgets to ask for rent before the second player after you rolls loses it.',
  ],

  tips: [
    'Buy almost everything early, then trade hard to finish a set.',
    'Orange and red are landed on most (jail feeds them). The third house is the biggest rent jump.',
    'Late game, roll for doubles instead of paying to leave jail: you avoid rivals’ hotels and still collect rent.',
  ],

  walk(A) {
    const C = A.C, col = { pk: '#d4408f', or: '#f29a1e', rd: '#e0312c', ye: '#f4df2f' }, maya = C.purple, you = C.blue;
    // The real stretch of board: Jail (p0) up the left side (St. Charles … New York) to Free Parking (p10), then along the top to B&O Railroad (p15).
    const cell = (i) => i === 0 ? [6, 176, 34, 20] : i <= 9 ? [6, 176 - i * 15, 34, 15] : i === 10 ? [6, 6, 34, 35] : [40 + (i - 11) * 32, 6, 32, 35];
    const mid = (i) => { const [x, y, w, h] = cell(i); return i === 0 ? [15, 186] : [x + w / 2, y + h / 2]; };
    const kinds = ['jail', 'pk', 'util', 'pk', 'pk', 'rr', 'or', '?', 'or', 'or', 'free', 'rd', '?', 'rd', 'rd', 'rr'];
    let board = A.bg('#e8e0cc') + A.rect(40, 40, 160, 156, '#c8e4cb', { rx: 0, sw: 1 });
    kinds.forEach((k, i) => {
      const [x, y, w, h] = cell(i);
      board += A.rect(x, y, w, h, '#d5ead6', { rx: 0, sw: 0.8 });
      if (col[k]) board += i <= 9 ? A.rect(x + w - 6, y, 6, h, col[k], { rx: 0, sw: 0.8 }) : A.rect(x, y + h - 7, w, 7, col[k], { rx: 0, sw: 0.8 });
      if (k === 'rr') board += A.rect(x + w / 2 - 4, y + h / 2 - 3, 8, 6, C.black, { rx: 1, sw: 0 });
      if (k === '?') board += A.text(x + w / 2 - (i <= 9 ? 3 : 0), y + h / 2, '?', { size: 9, weight: 800, fill: C.orange });
      if (k === 'util') board += A.text(x + w / 2 - 3, y + h / 2, '⚡', { size: 8 });
      if (k === 'jail') board += A.text(x + 25, y + h / 2, 'JAIL', { size: 6, weight: 800 });
      if (k === 'free') board += A.text(x + w / 2, y + 13, 'FREE', { size: 6.5, weight: 800 }) + A.text(x + w / 2, y + 22, 'PARKING', { size: 5, weight: 800 });
    });
    // Maya owns both railroads shown.
    for (const i of [5, 15]) { const [x, y] = mid(i); board += A.circle(x + (i === 15 ? 0 : -10), y + (i === 15 ? 11 : 0), 3.5, maya, { sw: 1 }); }
    board += A.pawn(...mid(12), 15, maya);
    board += A.tag(262, 22, 'Maya', { fill: maya }) + A.tag(262, 108, 'You', { fill: you });
    const cash = (who, y, n) => A.k(who + n, A.text(262, y, '$' + n.toLocaleString('en-US'), { size: 11, weight: 800 }));
    const pawn = (i) => { const [x, y] = mid(i); return A.k('pawn', A.pawn(x, y - 2, 16, you)); };
    const dice = (a, b) => A.k('dice' + a + b, A.die(92, 104, 24, a) + A.die(122, 104, 24, b));
    // The deed is the same drawing as the {deed} icon, with its price written on.
    const deed = (x, y) => A.k('deed', A.rect(x + 2, y + 3, 36, 49, C.shadow, { sw: 0, rx: 3 }) + A.use(this.icons.deed.draw(A), x - 9, y - 2.25, 54) + A.rect(x + 6, y + 22, 24, 12, C.white, { sw: 0, rx: 1 }) +
      A.text(x + 18, y + 28, '$180', { size: 8, weight: 800 }));
    const bill = (x, y) => A.k('bill', A.rect(x, y, 34, 16, '#9fd2f2', { rx: 2, sw: 1 }) + A.text(x + 17, y + 8, '$50', { size: 8, weight: 800 }));
    const base = board + cash('m', 42, 1200);
    return [
      { step: 0, say: 'You are on Jail (just visiting). Roll {=d4}{=d4}: **8**.', svg: base + cash('y', 128, 1500) + pawn(0) + dice(4, 4) },
      { step: 0, say: 'Move 8 spaces clockwise onto an unowned **orange street**. Price: $180.', svg: base + cash('y', 128, 1500) + pawn(8) + dice(4, 4) + A.glow(...mid(8), 14, 'g8') },
      { step: 1, say: 'You decline, so the bank **auctions** it. Maya bids $110; you win at **$120**.', svg: base + cash('y', 128, 1500) + pawn(8) + dice(4, 4) + deed(102, 50) +
        A.bubble(52, 148, 60, 20, 'Maya $110', { size: 8.5 }) + A.bubble(128, 148, 60, 20, 'You $120', { size: 8.5 }) },
      { step: 1, say: 'Pay $120 and take the {deed}. It now earns you rent.', svg: base + cash('y', 128, 1380) + pawn(8) + dice(4, 4) + deed(244, 146) },
      { step: 0, say: '**Doubles**, so roll again: {=d4}{=d3} = **7**. Move past Free Parking onto Maya’s **B&O Railroad**.', svg: base + cash('y', 128, 1380) + pawn(15) + dice(4, 3) + deed(244, 146) + A.glow(...mid(15), 15, 'g15') },
      { step: 1, say: 'Maya owns **two** railroads: rent is **$50**.', svg: base + cash('y', 128, 1380) + pawn(15) + dice(4, 3) + deed(244, 146) + bill(280, 160) + A.glow(...mid(15), 15, 'g15') },
      { step: 1, say: 'Pay Maya $50 {=cash}. No doubles, so your turn ends.', svg: board + cash('m', 42, 1250) + cash('y', 128, 1330) + pawn(15) + dice(4, 3) + deed(244, 146) + bill(245, 60) },
    ];
  },

  art(A) {
    const C = A.C, X = 72, Y = 12, S = 176, K = 25, n = 9, e = (S - 2 * K) / n;
    const col = { br: '#8b4a2b', lb: '#a8dcf2', pk: '#d4408f', or: '#f29a1e', rd: '#e0312c', ye: '#f4df2f', gr: '#1f9e4b', db: '#1f55a6' };
    // spaces from GO going clockwise (bottom right → left)
    const bottom = ['br', '', 'br', '', 'rr', 'lb', '', 'lb', 'lb'];
    const left = ['pk', '', 'pk', 'pk', 'rr', 'or', '', 'or', 'or'];
    const top = ['rd', '', 'rd', 'rd', 'rr', 'ye', 'ye', '', 'ye'];
    const right = ['gr', 'gr', '', 'gr', 'rr', '', 'db', '', 'db'];
    let o = A.bg('#e8e0cc');
    o += A.rect(X, Y, S, S, '#d5ead6', { rx: 2, sw: 1.6 });
    o += A.rect(X + K, Y + K, S - 2 * K, S - 2 * K, '#c8e4cb', { rx: 0, sw: 1 });
    const space = (x, y, w, h, c, side) => {
      let s = A.rect(x, y, w, h, '#d5ead6', { rx: 0, sw: 0.8 });
      if (c === 'rr') s += A.rect(x + w / 2 - 3, y + h / 2 - 3, 6, 6, C.black, { rx: 1, sw: 0 });
      else if (c) {
        const b = 7;
        if (side === 'b') s += A.rect(x, y, w, b, col[c], { rx: 0, sw: 0.8 });
        if (side === 't') s += A.rect(x, y + h - b, w, b, col[c], { rx: 0, sw: 0.8 });
        if (side === 'l') s += A.rect(x + w - b, y, b, h, col[c], { rx: 0, sw: 0.8 });
        if (side === 'r') s += A.rect(x, y, b, h, col[c], { rx: 0, sw: 0.8 });
      }
      return s;
    };
    for (let i = 0; i < n; i++) {
      o += space(X + S - K - (i + 1) * e, Y + S - K, e, K, bottom[i], 'b');
      o += space(X, Y + S - K - (i + 1) * e, K, e, left[i], 'l');
      o += space(X + K + i * e, Y, e, K, top[i], 't');
      o += space(X + S - K, Y + K + i * e, K, e, right[i], 'r');
    }
    // corners
    o += A.rect(X + S - K, Y + S - K, K, K, '#d5ead6', { rx: 0, sw: 1 }) + A.arrow(X + S - 4, Y + S - 6, X + S - K + 4, Y + S - 6, { stroke: C.red, sw: 3, head: 6 });
    o += A.rect(X, Y + S - K, K, K, '#d5ead6', { rx: 0, sw: 1 }) + A.rect(X + 9, Y + S - K, K - 9, K - 9, C.orange, { rx: 0, sw: 1 });
    for (let i = 0; i < 3; i++) o += A.line(X + 13 + i * 4.5, Y + S - K + 1, X + 13 + i * 4.5, Y + S - 10, { stroke: C.black, sw: 1.2 });
    o += A.rect(X, Y, K, K, '#d5ead6', { rx: 0, sw: 1 }) + A.circle(X + K / 2, Y + K / 2, 6, C.red, { sw: 1 });
    o += A.rect(X + S - K, Y, K, K, '#d5ead6', { rx: 0, sw: 1 }) + A.pawn(X + S - K / 2, Y + K / 2 - 2, 14, C.blue);
    // card decks in the middle
    const I = this.icons, deck = (key, x, y) => A.group(A.rect(x + 3, y + 10, 37, 23, C.shadow, { sw: 0, rx: 3 }) + A.use(I[key].draw(A), x, y, 40), `rotate(-25 ${x + 20} ${y + 20})`);
    o += deck('chance', X + 44, Y + 38) + deck('chest', X + S - 86, Y + S - 82);
    // houses on the green set and a hotel on dark blue
    const rx = X + S - K;
    for (const i of [0, 1, 3]) for (let h = 0; h < (i === 3 ? 2 : 3); h++) o += A.use(I.house.draw(A), rx + 7.5 + (h % 2) * 7, Y + K + i * e - 1 + Math.floor(h / 2) * 6, 9);
    for (const i of [6, 8]) o += A.use(I.hotel.draw(A), rx + 9, Y + K + i * e + 0.5, 15);
    // tokens
    o += A.pawn(X + K + 5.5 * e, Y + 13, 16, C.purple);
    o += A.pawn(X + 12, Y + K + 2.5 * e, 16, C.teal);
    // money and dice on the sides
    const bills = [['#f4f1e6', 1], ['#f3b4c8', 5], ['#e6d36a', 20], ['#9fd2f2', 50], ['#f0c27a', 100]];
    bills.forEach(([c], i) => { o += A.rect(8, 60 + i * 9, 54, 26, c, { rx: 1.5, sw: 1 }); });
    o += A.circle(35, 109, 7, 'none', { sw: 1 });
    o += A.die(262, 82, 22, 4) + A.die(288, 92, 22, 4);
    o += A.note(rx + 14, Y + K + 1.5 * e, 282, 34, 'Full set: build houses');
    o += A.note(X + S - K / 2, Y + S - 8, 284, 160, 'Pass GO: +$200');
    o += A.note(X + 14, Y + S - 14, 34, 168, 'Jail');
    o += A.note(X + 58, Y + 58, 36, 30, 'Draw a card');
    return o;
  },
});
