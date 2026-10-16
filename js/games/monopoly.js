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

  pitch: 'Roll around the board buying streets, trade to complete colour sets, then build houses and charge rent until rivals go broke.',
  theme: 'You are a property speculator buying up a city one street at a time.',

  goal: { big: 'Last one solvent', text: 'Be the **last player** not bankrupt. You win by collecting so much rent that everyone else runs out of money and property.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Roll', text: 'Roll 2 dice and move clockwise. Passing **GO** pays you $200. Doubles mean you roll again after this move.' },
      { verb: 'Resolve', text: 'Unowned property: **buy** it at the printed price or the bank auctions it. Owned: pay rent. Otherwise follow the space (card, tax, Go to Jail).' },
      { verb: 'Deal', text: 'Trade, mortgage, or build houses evenly on colour sets you fully own.' },
    ],
  },

  tension: 'Cash in hand keeps you safe from rent, but only property and houses earn money, so you must decide how close to broke you dare to build.',

  flow: [
    { label: 'Collect', items: ['$200 for passing GO', 'Rent from others', 'Cards & trades'] },
    { label: 'Spend', items: ['Buy property', 'Win auctions', 'Houses & hotels'] },
    { label: 'Squeeze', items: ['Complete colour sets', 'Rent doubles, then climbs', 'Rivals mortgage & sell'] },
  ],

  end: {
    trigger: 'all but one player have gone bankrupt',
    detail: 'You are bankrupt when you owe more than you can raise by selling buildings and mortgaging. The official rules also give a timed short-game option.',
    results: [{ side: 'Winner:', text: 'the last player left in the game.' }],
  },

  ref: {
    title: 'Numbers to know',
    rows: [
      ['Starting cash', '$1,500 each'],
      ['Passing GO', '+$200'],
      ['Leave jail', 'pay $50, use a card, or roll doubles'],
      ['Full colour set', 'double rent before building'],
      ['Hotel', '4 houses + hotel price'],
      ['Mortgage', 'get half price; repay +10% interest'],
    ],
  },

  example: 'You roll **4 + 4** and land on an orange street nobody owns. You decline to pay $180, so it goes to auction and you win it for $120. Because you rolled doubles you roll again: 5, onto Maya’s railroad, and you pay her **$50** since she owns two.',

  setup: [
    'Give each player $1,500; one player is the Banker and keeps the rest.',
    'Shuffle the two card decks and place them face down on their spaces.',
    'Everyone puts a token on GO; highest roll starts.',
  ],

  terms: [
    ['Colour set', 'All streets of one colour. You need the whole set to build.'],
    ['Mortgage', 'Flip a property for half its price; it collects no rent until repaid.'],
    ['Auction', 'Any property a player declines goes to the highest bidder, including them.'],
    ['Jail', 'Stuck up to 3 turns; you still collect rent and can trade.'],
  ],

  gotchas: [
    '**Free Parking** pays nothing: putting tax money in the middle is a house rule and makes the game much longer.',
    'If you don’t buy a property you land on, it must be **auctioned**. Skipping auctions is another house rule.',
    'Houses go up **evenly** across a set, rent on a full unbuilt set is double, and three doubles in a row send you to jail.',
  ],

  tips: [
    'Buy almost everything early, then trade hard to finish a set.',
    'Orange and red sets are landed on most (jail sends people there). Three houses per street is the big jump in rent.',
    'Late in the game, staying in jail is good: you skip landing on rivals’ hotels while still collecting rent.',
  ],

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
    o += A.card(X + 46, Y + 46, 38, 26, C.orange, { rotate: -25, label: '?', size: 16 });
    o += A.card(X + S - 84, Y + S - 72, 38, 26, C.yellow, { rotate: -25 });
    // houses on the green set and a hotel on dark blue
    const rx = X + S - K;
    for (const i of [0, 1, 3]) for (let h = 0; h < (i === 3 ? 2 : 3); h++) o += A.house(rx + 12 + (h % 2) * 7, Y + K + i * e + 7 + Math.floor(h / 2) * 6, 6, '#2fa84f');
    o += A.rect(rx + 11, Y + K + 8 * e + 4, 12, 9, C.red, { rx: 1, sw: 1 });
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
