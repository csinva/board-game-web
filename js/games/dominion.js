defineGame({
  id: 'dominion',
  name: 'Dominion',
  year: 2008,
  designer: 'Donald X. Vaccarino',
  family: 'cards',
  players: [2, 4], best: '3',
  time: [30, 45],
  age: 13,
  mechanics: ['deck-building', 'hand-management', 'engine-building', 'take-that'],
  profile: { complexity: 2, luck: 2, interaction: 2, conflict: 2, talk: 1, planning: 4 },

  pitch: 'Everyone starts with the same weak deck of 10 cards; buy better ones each turn and build a deck that buys the most land.',
  theme: 'You are a monarch growing a small kingdom into a great one, one card at a time.',

  goal: { big: 'Most VP in deck', text: 'When the game ends, the player with the most **victory points** among all their cards wins. Provinces (6 VP) are the big prize.' },

  turn: {
    type: 'sequence',
    intro: 'Draw 5 cards, then do the three phases in order (remember “A-B-C”):',
    steps: [
      { verb: 'Action', text: 'Play **one** Action card from your hand. If it gives “+Actions”, you may play more.' },
      { verb: 'Buy', text: 'Play your Treasures, add up the coins, and buy **one** card from the Supply (more with “+Buy”).' },
      { verb: 'Clean-up', text: 'Discard everything you played, bought and still hold, then draw a new hand of **5**.' },
    ],
  },

  tension: 'Every card you buy dilutes your deck: action cards make turns stronger, but victory cards are dead weight in your hand, so you must decide when to stop building and start buying points.',

  flow: [
    { label: 'Build', items: ['Silver & Gold', 'Draw cards (+Cards)', 'Chain actions (+Actions)'] },
    { label: 'Cycle', items: ['Bought cards go to discard', 'Shuffle when deck runs out', 'Better hands come round'] },
    { label: 'Score', items: ['Estate 1 VP', 'Duchy 3 VP', 'Province 6 VP', 'Curse −1 VP'] },
  ],

  end: { trigger: 'the Province pile is empty, or any 3 Supply piles are empty', detail: 'The game ends at the end of that turn. Count VP in your whole deck; on a tie, the player who had fewer turns wins.' },
  scoring: [
    { label: 'Provinces', share: 6 },
    { label: 'Duchies', share: 2 },
    { label: 'Estates', share: 1 },
  ],

  ref: {
    title: 'Basic Supply costs',
    rows: [
      ['Copper / Silver / Gold', '0 / 3 / 6 coins → worth 1 / 2 / 3'],
      ['Estate', '2 coins → 1 VP'],
      ['Duchy', '5 coins → 3 VP'],
      ['Province', '8 coins → 6 VP'],
      ['Kingdom cards', '2–6 coins, printed bottom-left'],
    ],
  },

  example: 'Your hand is Village, Smithy, Copper, Copper, Estate. You play **Village** (+1 Card, +2 Actions) and draw a Silver, then play **Smithy** (+3 Cards) and draw Gold, Copper, Estate. Your treasures total 1+1+2+3+1 = **8 coins**, so you buy a Province.',

  setup: [
    'Each player takes 7 Coppers and 3 Estates, shuffles them as their deck, and draws 5.',
    'Lay out 10 Kingdom piles (10 cards each) beside Treasure, Victory and Curse piles.',
    'Victory piles: 8 cards each with 2 players, 12 with 3–4. Curses: 10 per player after the first.',
  ],

  terms: [
    ['Supply', 'The face-up piles on the table that you buy from.'],
    ['Kingdom cards', 'The 10 piles of Action cards chosen for this game.'],
    ['+Actions', 'Lets you play further Action cards this turn.'],
    ['Trashing', 'Removing a card from the game, so it leaves your deck forever.'],
    ['Attack', 'Action that hurts other players (e.g. Militia makes them discard to 3).'],
  ],

  gotchas: [
    'Bought cards go to your **discard pile**, not your hand. You see them after your next shuffle.',
    'Playing an Action uses up your one Action. A card saying “+1 Action” only replaces it, so chain Villages before draw cards.',
    'Coins don’t carry over: unspent money is lost at Clean-up. Draw your new hand **before** the next player starts.',
  ],

  tips: [
    'A simple first plan: buy **Gold** at 6–7 coins, **Province** at 8, and one or two good actions early.',
    'Don’t buy Estates or Duchies early; they clog your hand. Start greening only when Provinces run low.',
    'Too many terminal actions (no +Action) collide in one hand. Pair them with Villages.',
  ],

  art(A) {
    const C = A.C;
    let o = A.bg('#d8c69c');
    o += A.rect(0, 0, 320, 106, '#cdb98b', { sw: 0, rx: 0 });
    const pile = (x, y, fill, cost, name, dark) => {
      let s = A.rect(x + 3, y - 3, 30, 40, '#efe6cf', { rx: 4, sw: 1 }) + A.rect(x + 1.5, y - 1.5, 30, 40, '#efe6cf', { rx: 4, sw: 1 });
      s += A.card(x, y, 30, 40, fill, {});
      s += A.text(x + 15, y + 15, name, { size: name.length > 6 ? 5.2 : 6, weight: 800, fill: dark ? C.ink : C.white });
      s += A.circle(x + 9, y + 32, 5, '#e8c547', { sw: 0.8 }) + A.text(x + 9, y + 32.5, cost, { size: 6.5, weight: 800 });
      return s;
    };
    const basics = [['#c08245', 0, 'Copper'], ['#b7bec7', 3, 'Silver', 1], ['#e2b33c', 6, 'Gold', 1], ['#8fbf6a', 2, 'Estate', 1], ['#5ea25a', 5, 'Duchy'], ['#2f7a3d', 8, 'Province']];
    basics.forEach(([f, c, n, d], i) => { o += pile(6 + i * 36, 12, f, c, n, d); });
    const kingdom = [['Village', 3], ['Smithy', 4], ['Market', 5], ['Militia', 4], ['Moat', 2], ['Witch', 5]];
    kingdom.forEach(([n, c], i) => { o += pile(6 + i * 36, 60, '#efe2c2', c, n, 1); });
    // deck + discard
    o += A.rect(252, 70, 30, 42, '#6f4a2c', { rx: 4, sw: 1 }) + A.card(250, 66, 30, 42, '#7d5532', {}) + A.rect(256, 72, 18, 30, 'none', { rx: 2, stroke: '#e8c547', sw: 1.2 });
    o += A.card(286, 64, 30, 42, '#c08245', { rotate: 8 }) + A.text(301, 85, '1', { size: 13, weight: 800, fill: C.white });
    // hand of 5
    const hand = [['#efe2c2', 'Village', '', 1], ['#efe2c2', 'Smithy', '', 1], ['#c08245', 'Copper', '1'], ['#b7bec7', 'Silver', '2', 1], ['#8fbf6a', 'Estate', '1VP', 1]];
    hand.forEach(([f, n, v, d], i) => {
      const t = i - 2, x = 125 + t * 34, y = 128 + Math.abs(t) * 5;
      let s = A.card(x, y, 40, 58, f, { title: n });
      if (v) s += A.circle(x + 20, y + 36, 11, f === '#8fbf6a' ? '#2f7a3d' : '#e8c547', { sw: 1 }) + A.text(x + 20, y + 36.5, v, { size: v.length > 1 ? 8 : 11, weight: 800, fill: f === '#8fbf6a' ? C.white : C.ink });
      else s += A.rect(x + 9, y + 24, 22, 18, d ? '#a7c4d9' : C.cream, { rx: 2, sw: 0.8 }) + A.text(x + 20, y + 49, n === 'Village' ? '+2 Act' : '+3 Card', { size: 6, weight: 700 });
      o += A.group(s, `rotate(${t * 6} ${x + 20} ${y + 58})`);
    });
    o += A.note(212, 42, 268, 14, 'Province = 6 VP');
    o += A.note(210, 84, 268, 42, 'Buy from Supply');
    o += A.note(265, 104, 276, 128, 'Draw & discard');
    o += A.note(62, 160, 44, 120, 'Hand of 5');
    return o;
  },
});
