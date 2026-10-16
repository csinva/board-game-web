defineGame({
  id: 'gloomhaven',
  name: 'Gloomhaven',
  year: 2017,
  designer: 'Isaac Childres',
  family: 'coop',
  players: [1, 4], best: '3',
  time: [60, 120],
  age: 14,
  mechanics: ['cooperative', 'hand-management', 'campaign', 'grid-movement', 'variable-powers'],
  profile: { complexity: 4, luck: 2, interaction: 3, conflict: 1, talk: 3, planning: 4 },
  color: '#7a3b2e',

  pitch: 'Mercenaries fight through dungeon scenarios using a shrinking hand of cards: each turn play two, and every card spent brings exhaustion closer.',
  theme: 'You are a band of mercenaries taking jobs out of a grim frontier city, one dungeon at a time.',

  goal: { big: 'Beat the scenario', text: 'Complete the scenario goal, usually **kill all enemies**, before every character is exhausted. The scenario is won at the end of that round.' },

  turn: {
    type: 'round',
    intro: 'Each round, every player picks cards in secret, then everyone acts in initiative order:',
    outro: 'At round end, elements wane and players may short rest.',
    steps: [
      { verb: 'Pick 2', text: 'Each player secretly picks **two cards** from hand (or declares a long rest) and chooses one as the leading card.' },
      { verb: 'Reveal', text: 'Reveal them and flip one ability card per monster type; every figure acts in **initiative** order, lowest first.' },
      { verb: 'Act', text: 'On your turn use the **top** half of one card and the **bottom** half of the other, in either order.' },
      { verb: 'Monsters', text: 'Each monster picks a **focus** (the enemy it can reach in the fewest moves) and follows its ability card: move, attack, maybe more.' },
    ],
  },

  tension: 'Your strongest actions are one-shot "lost" cards that shrink your hand for good, so every big play brings your own exhaustion closer.',

  flow: [
    { label: 'Plan', items: ['Pick 2 cards', 'Choose initiative', 'Hint, don’t reveal'] },
    { label: 'Fight', items: ['Top of one card', 'Bottom of the other', 'Draw attack modifiers'] },
    { label: 'Endure', items: ['Rest to recover cards', 'Lose a card each rest', 'Avoid exhaustion'] },
  ],

  end: {
    trigger: 'the scenario goal is met at the end of a round, or every character is exhausted',
    detail: 'Between scenarios you keep XP, gold and items, level up, open new locations on the map, and follow a branching story; characters retire when their personal quest is done.',
    results: [
      { side: 'Scenario won', text: 'at the end of the round in which the goal (often "kill all enemies") is met.' },
      { side: 'Scenario lost', text: 'when **every character is exhausted**: out of hit points, or unable to play two cards or rest.' },
    ],
  },

  ref: {
    title: 'Card flow',
    rows: [
      ['Played card', 'goes to discard'],
      ['Lost icon', 'goes to the lost pile for this scenario'],
      ['Short rest', 'end of round: lose 1 random discard, return the rest'],
      ['Long rest', 'initiative 99: lose 1 chosen card, heal 2, refresh items'],
      ['Block damage', 'lose 1 card from hand or 2 from discard'],
    ],
  },

  example: 'Ana’s Brute leads with a card marked **initiative 15**, so she acts before the Bandit Guards (30). She uses the top of one card, Attack 3, on the adjacent elite guard and flips a **+1** modifier for 4 damage. Then she uses the bottom of the other, Move 3, to step out of the guards’ reach. The first card has a lost icon, so it is gone for this scenario.',

  setup: [
    'Pick a scenario from the scenario book, build the map tiles of the first room, and place the monsters shown for your player count.',
    'Each player takes a class, sets hit points for their level, and chooses their hand (the class card limit, e.g. 10 for the Brute).',
    'Shuffle each player’s attack modifier deck and each monster type’s ability deck.',
  ],

  terms: [
    ['Initiative', 'The number on your leading card. Lower acts earlier in the round.'],
    ['Lost', 'A card with this icon is removed for the rest of the scenario after use.'],
    ['Exhausted', 'Out of the scenario: hit points at 0, or you cannot play two cards or rest.'],
    ['Elite', 'A tougher version of a monster, shown with a gold base.'],
    ['Attack modifier', 'A card drawn for every attack instead of rolling dice (+1, −1, ×2, miss…).'],
  ],

  gotchas: [
    'Any card can be played as a basic **Attack 2** (top) or **Move 2** (bottom), even if its own action would be useless.',
    'You may not share exact card names or numbers with the table; say "I’ll go early" rather than "I’m playing initiative 12".',
    'Monsters focus the enemy they can reach in the **fewest moves**, with initiative order as the tiebreak, not simply the closest hex.',
  ],

  tips: [
    'Count your cards: your hand size roughly sets how many rounds you can last, so do not burn lost cards early.',
    'Use the default Move 2 / Attack 2 freely when it keeps a stronger card for later.',
    'Kill monsters before they act: a low initiative attack can stop a hit you would otherwise take.',
  ],

  extended: [
    { title: 'Initiative in detail', items: [
      'Your initiative is the number on your **leading** card. You must choose which of your two cards leads when you select them, before the reveal.',
      'Ties between players: compare the initiatives of the **second** cards; still tied, the players decide. Players act before monsters on an exact tie, and summons act right before their summoner.',
      'Each monster **type** acts on its own ability card’s initiative: elites first, then normals, each group in ascending standee number.',
      'A **long rest** has initiative 99, so you act last that round.',
    ] },
    { title: 'Monster focus and the AI', items: [
      'A monster first picks a **focus**: the enemy it can attack using the fewest movement points (it may plan through traps only if no other path exists).',
      'Tiebreaks in order: the enemy **closest by range** (hexes), then the one with the **earliest initiative** this round.',
      'It moves only as far as needed to attack its focus with as many targets as possible, staying at range if it is ranged and avoiding disadvantage when it can. No focus means no move and no attack.',
      'Ranged monsters adjacent to an enemy attack with **disadvantage**; they will step away first if their move allows it.',
      'Monster ability decks reshuffle at the end of a round in which a card with a shuffle icon was drawn.',
    ] },
    { title: 'Conditions', items: [
      '**Poison**: attacks against you get +1; heals remove poison instead of healing. **Wound**: suffer 1 damage at the start of each of your turns until healed.',
      '**Immobilize**: cannot move. **Disarm**: cannot attack. **Stun**: no actions at all (you still play two cards). These end at the end of your next turn.',
      '**Muddle**: your attacks have disadvantage. Positive conditions: **Strengthen** (advantage), **Invisible** (cannot be focused or targeted by enemies).',
    ] },
    { title: 'Elements', items: [
      'Six elements: Fire, Ice, Air, Earth, Light, Dark. An action that **infuses** an element moves it to Strong at the end of that figure’s turn.',
      'At the end of every round each element **wanes** one step: Strong → Waning → Inert.',
      'An ability that **consumes** an element needs it Strong or Waning; it gains the bonus and the element becomes Inert. Monsters consume elements too.',
    ] },
    { title: 'Resting, damage and exhaustion', items: [
      '**Short rest** (end of round): shuffle the discard back into your hand, losing 1 **random** card. **Long rest** (your turn, initiative 99): lose 1 card of your choice, heal 2, refresh spent items.',
      'You need at least 2 cards in your discard pile to rest.',
      'Instead of taking damage from one source, you may **lose** 1 card from hand or 2 from discard to negate it all.',
      'You are **exhausted** at 0 hit points, or at the start of a round when you cannot play 2 cards and cannot rest. An exhausted character keeps the XP and money gathered so far.',
    ] },
    { title: 'Loot and scenario goals', items: [
      'Coins and treasure must be **looted**: end a move on the hex, or use a Loot action. Each coin is worth gold by scenario level at the end.',
      'At the end of **your** turn you automatically loot the hex you stand on. Monsters never loot; coins dropped by killed monsters wait on their hex.',
      'Scenario goals vary: kill all enemies, reach a hex, protect an NPC, loot treasure. The scenario ends at the end of the round the goal is met; failing still keeps XP and gold, but not the reward.',
    ] },
    { title: 'Campaign, perks and retirement', items: [
      'Between scenarios: spend gold on items in town, gain levels from XP (add stronger cards), and gain **perks** from check marks to improve your attack modifier deck.',
      'Every character has a secret **personal quest**. Completing it forces **retirement**: the character leaves, unlocks new content (often a new class), and you start a new character.',
      'City and road events, global achievements and party reputation shape which scenarios and shop items become available.',
    ] },
  ],

  walk(A) {
    const C = A.C;
    let base = A.bg('#2b2622');
    const R = 16, W = R * Math.sqrt(3), ox = 24, oy = 24;
    const at = (c, r) => [+(ox + c * W + (r % 2) * W / 2).toFixed(1), oy + r * 24];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) {
      const [x, y] = at(c, r);
      base += A.hex(x, y, R - 0.5, (c + r) % 3 ? '#8a8170' : '#7f7665', { stroke: '#4a433a', sw: 1.2 });
    }
    const [px, py] = at(4, 4);
    base += A.circle(px, py, 9, '#5d564c', { stroke: '#2a2420', sw: 1.4 }) + A.circle(px - 2, py - 2, 4, '#77706a', { sw: 0 });
    // Right panel.
    base += A.rect(196, 0, 124, 200, '#3a332d', { rx: 0, sw: 0 }) + A.line(196, 0, 196, 200, { stroke: '#1d1916', sw: 2 });
    base += A.text(204, 14, 'Order', { size: 7, fill: '#e9dcc2', anchor: 'start' });
    base += A.text(213, 170, 'Hand', { size: 6.5, fill: '#e9dcc2' }) + A.text(266, 170, 'Discard', { size: 6.5, fill: '#e9dcc2' }) + A.text(299, 170, 'Lost', { size: 6.5, fill: '#e9dcc2' });
    base += A.rect(254, 174, 24, 22, 'none', { stroke: '#8a7a5a', dash: '2 2', sw: 1 }) + A.rect(288, 174, 22, 22, 'none', { stroke: '#8a7a5a', dash: '2 2', sw: 1 });

    const fig = (c, r, b, body) => { const [x, y] = at(c, r); return A.circle(x, y + 5, 9, b, { stroke: C.ink, sw: 1.2 }) + A.person(x, y + 1, 15, body); };
    const brute = (c, r) => A.k('brute', fig(c, r, '#3a4f8a', '#5b7fd1'));
    const elite = (c, r) => A.k('elite', fig(c, r, '#e2b33c', '#b8433b'));
    const guard = (c, r) => A.k('guard', fig(c, r, '#f3efe6', '#b8433b'));
    const back = (x, y, w, h) => A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#6a4026', { rx: 3, stroke: '#e9dcc2', sw: 1 }) + A.circle(x + w / 2, y + h / 2, Math.min(w, h) * 0.22, 'none', { stroke: '#e9dcc2', sw: 1 });
    // Player ability card: top / bottom halves with initiative in the middle.
    const pcard = (x, y, init, top, bot, lost, hi) => {
      let s = A.rect(x + 2, y + 3, 54, 80, C.shadow, { sw: 0, rx: 5 }) + A.rect(x, y, 54, 80, '#efe3c6', { rx: 5, sw: 1.3 });
      if (hi === 'top') s += A.rect(x + 3, y + 3, 48, 32, '#f4c66b', { rx: 3, sw: 0 });
      if (hi === 'bot') s += A.rect(x + 3, y + 45, 48, 32, '#f4c66b', { rx: 3, sw: 0 });
      s += A.text(x + 27, y + 19, top, { size: 8, weight: 800 }) + A.text(x + 27, y + 61, bot, { size: 8, weight: 800 });
      s += A.line(x + 4, y + 40, x + 50, y + 40, { stroke: '#8a7a5a', sw: 1 });
      s += A.circle(x + 27, y + 40, 8.5, '#3a4f8a', { stroke: C.ink, sw: 1 }) + A.text(x + 27, y + 40.5, init, { size: 8, weight: 800, fill: '#fff' });
      if (lost) s += A.circle(x + 46, y + 10, 4.5, C.red, { sw: 0 }) + A.text(x + 46, y + 10.5, '✕', { size: 6, weight: 800, fill: '#fff' });
      return s;
    };
    const slotA = [200, 78], slotB = [260, 78];
    const cA = (hi, xy = slotA) => A.k('cardA', pcard(...xy, '15', 'Attack 3', 'Move 2', true, hi));
    const cB = (hi, xy = slotB) => A.k('cardB', pcard(...xy, '62', 'Shield 1', 'Move 3', false, hi));
    const handBacks = (n) => [0, 1, 2].slice(0, n).map(i => A.k('h' + i, back(200 + i * 9, 174, 16, 22))).join('');
    const mon = (open) => open
      ? A.k('mon-open', A.rect(200, 22, 116, 46, '#e9dcc2', { rx: 4, sw: 1.2 }) + A.circle(216, 45, 11, '#b8433b', { stroke: C.ink, sw: 1 }) + A.text(216, 45.5, '30', { size: 9, weight: 800, fill: '#fff' }) +
        A.text(270, 30, 'Bandit Guard', { size: 7, weight: 800 }) + A.text(270, 45, 'Move 1', { size: 8, weight: 700 }) + A.text(270, 58, 'Attack 2', { size: 8, weight: 700 }))
      : A.k('mon-back', back(200, 22, 116, 46) + A.text(258, 60, 'monster deck', { size: 6.5, fill: '#e9dcc2' }));
    const order = A.k('o-brute', A.circle(238, 13, 7.5, '#3a4f8a', { stroke: '#fff', sw: 1 }) + A.text(238, 13.5, '15', { size: 7, weight: 800, fill: '#fff' })) +
      A.text(254, 13, '→', { size: 9, fill: '#e9dcc2' }) +
      A.k('o-mon', A.circle(270, 13, 7.5, '#b8433b', { stroke: '#fff', sw: 1 }) + A.text(270, 13.5, '30', { size: 7, weight: 800, fill: '#fff' }));
    const [ex, ey] = at(2, 2);
    const mini = (x, y, init, lost) => A.rect(x, y, 18, 20, '#efe3c6', { rx: 2, sw: 1 }) + A.circle(x + 9, y + 10, 6, '#3a4f8a', { sw: 0.8 }) + A.text(x + 9, y + 10.5, init, { size: 6, weight: 800, fill: '#fff' }) +
      (lost ? A.circle(x + 15, y + 3, 3, C.red, { sw: 0 }) : '');
    const piles = A.k('cardA', mini(290, 175, '15', true)) + A.k('cardB', mini(257, 175, '62'));

    return [
      { step: 0, say: '**Pick 2.** Ana’s Brute is next to an elite Bandit Guard. She secretly picks two cards from her hand, one face down to lead.',
        svg: base + brute(1, 3) + elite(2, 2) + guard(3, 1) + mon(false) + handBacks(3) + A.k('pickA', back(slotA[0] + 9, slotA[1] + 14, 36, 52)) + A.k('pickB', back(slotB[0] + 9, slotB[1] + 14, 36, 52)) + A.glow(227, 118, 12, 'g-pickA') + A.glow(287, 118, 12, 'g-pickB') },
      { step: 1, say: '**Reveal.** Her leading card shows **15**; the monster card shows **30**. Lower goes first, so the Brute acts before the guards.',
        svg: base + brute(1, 3) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + cA() + cB() + order + A.glow(227, 118, 11, 'g-init') + A.glow(216, 45, 14, 'g-mon') },
      { step: 2, say: '**Top half** of the first card: Attack 3 on the elite. She flips a **+1** modifier, so it deals **4** damage.',
        svg: base + brute(1, 3) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + cA('top') + cB() + order + A.glow(238, 13, 10, 'g-o') +
          A.k('mod', A.card(ex + 12, ey + 6, 22, 30, '#d6c7a3', { label: '+1', size: 10, labelFill: C.ink })) + A.k('dmg', A.circle(ex - 12, ey - 10, 8, '#c8423b', { stroke: '#fff', sw: 1.2 }) + A.text(ex - 12, ey - 9.5, '4', { size: 9, weight: 800, fill: '#fff' })) },
      { step: 2, say: '**Bottom half** of the other card: Move 3 to step out of the guards’ reach.',
        svg: base + brute(0, 6) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + cA() + cB('bot') + order + A.glow(238, 13, 10, 'g-o') +
          A.k('dmg', A.circle(ex - 12, ey - 10, 8, '#c8423b', { stroke: '#fff', sw: 1.2 }) + A.text(ex - 12, ey - 9.5, '4', { size: 9, weight: 800, fill: '#fff' })) + A.glow(...at(0, 6), 14, 'g-move') },
      { step: 2, say: 'Her turn ends. The attack had a **lost** icon, so that card is gone for the scenario; the other goes to the discard pile.',
        svg: base + brute(0, 6) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + piles + order + A.glow(299, 185, 14, 'g-lost') +
          A.k('dmg', A.circle(ex - 12, ey - 10, 8, '#c8423b', { stroke: '#fff', sw: 1.2 }) + A.text(ex - 12, ey - 9.5, '4', { size: 9, weight: 800, fill: '#fff' })) },
      { step: 3, say: '**Monsters** at 30: each focuses the Brute and moves 1 toward her, but neither can reach her, so they **cannot attack**.',
        svg: base + brute(0, 6) + elite(1, 3) + guard(2, 2) + mon(true) + handBacks(3) + piles + order + A.glow(270, 13, 10, 'g-o2') + A.glow(...at(1, 3), 14, 'g-move1') +
          A.k('dmg', A.circle(at(1, 3)[0] - 12, at(1, 3)[1] - 10, 8, '#c8423b', { stroke: '#fff', sw: 1.2 }) + A.text(at(1, 3)[0] - 12, at(1, 3)[1] - 9.5, '4', { size: 9, weight: 800, fill: '#fff' })) },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#2b2622');
    const R = 16, W = R * Math.sqrt(3), ox = 26, oy = 26;
    const at = (c, r) => [+(ox + c * W + (r % 2) * W / 2).toFixed(1), oy + r * 24];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) {
      const [x, y] = at(c, r);
      o += A.hex(x, y, R - 0.5, (c + r) % 3 ? '#8a8170' : '#7f7665', { stroke: '#4a433a', sw: 1.2 });
    }
    // obstacle + treasure + door
    const [px, py] = at(3, 4);
    o += A.circle(px, py, 9, '#5d564c', { stroke: '#2a2420', sw: 1.4 }) + A.circle(px - 2, py - 2, 4, '#77706a', { sw: 0 });
    const [gx, gy] = at(5, 5);
    o += A.circle(gx, gy, 6, '#e2b33c', { stroke: '#7a5a10', sw: 1.2 }) + A.text(gx, gy + 0.5, '$', { size: 7, weight: 800, fill: '#7a5a10' });
    const [dx, dy] = at(4, 0);
    o += A.rect(dx - 9, dy - 7, 18, 14, '#6a4026', { rx: 2, stroke: '#2a2420', sw: 1.2 });
    // figures
    const fig = (c, r, base, body) => { const [x, y] = at(c, r); return A.circle(x, y + 5, 9, base, { stroke: C.ink, sw: 1.2 }) + A.person(x, y + 1, 15, body); };
    o += fig(1, 4, '#3a4f8a', '#5b7fd1');     // Brute
    o += fig(1, 5, '#5b3a8a', '#9a6fd6');     // Spellweaver
    o += fig(2, 3, '#e2b33c', '#b8433b');     // elite guard
    o += fig(3, 2, '#f3efe6', '#b8433b');     // normal guard
    o += fig(4, 3, '#f3efe6', '#b8433b');     // normal guard
    // attack arrow
    const [bx, by] = at(1, 4), [ex, ey] = at(2, 3);
    o += A.arrow(bx + 5, by - 6, ex - 6, ey + 6, { stroke: '#f08a2a', sw: 2.2, head: 6 });
    // monster ability card
    o += A.rect(214, 8, 98, 36, '#e9dcc2', { rx: 4, sw: 1.2 });
    o += A.circle(230, 26, 11, '#b8433b', { stroke: C.ink, sw: 1 }) + A.text(230, 26.5, '30', { size: 9, weight: 800, fill: '#fff' });
    o += A.text(272, 20, 'Move 1', { size: 8, weight: 700 }) + A.text(272, 33, 'Attack 2', { size: 8, weight: 700 });
    // two player ability cards: top/bottom split with initiative
    const pcard = (x, y, init, top, bot, useTop) => {
      let s = A.rect(x + 2, y + 3, 48, 92, C.shadow, { sw: 0, rx: 5 }) + A.rect(x, y, 48, 92, '#efe3c6', { rx: 5, sw: 1.3 });
      s += A.rect(x + 3, useTop ? y + 3 : y + 50, 42, 39, '#f4c66b', { rx: 3, sw: 0, opacity: 0.85 });
      s += A.text(x + 24, y + 24, top, { size: 8.5, weight: 700 }) + A.text(x + 24, y + 70, bot, { size: 8.5, weight: 700 });
      s += A.line(x + 4, y + 46, x + 44, y + 46, { stroke: '#8a7a5a', sw: 1 });
      s += A.circle(x + 24, y + 46, 9, '#3a4f8a', { stroke: C.ink, sw: 1 }) + A.text(x + 24, y + 46.5, init, { size: 8.5, weight: 800, fill: '#fff' });
      return s;
    };
    o += pcard(212, 82, '15', 'Attack 3', 'Move 2', true);
    o += pcard(264, 82, '62', 'Heal 2', 'Move 3', false);
    // lost icon on first card
    o += A.text(254, 90, '✕', { size: 8, weight: 800, fill: C.red });
    o += A.note(262, 44, 262, 62, 'Monster AI card');
    o += A.note(236, 128, 122, 188, 'Initiative: low goes first');
    o += A.note(ex + 8, ey, 100, 12, 'Elite = gold base');
    o += A.note(300, 164, 266, 188, 'Use top + bottom');
    return o;
  },
});
