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

  // Card symbols, figures, conditions and elements, drawn once and reused inline ({attack}) and in art / walk.
  icons: {
    initiative: { name: 'initiative', draw: A => A.circle(12, 12, 10, '#3a4f8a', { sw: 1.3 }) + A.circle(12, 12, 6.5, 'none', { stroke: '#fff', sw: 1.4 }) + A.line(12, 12, 12, 7.6, { stroke: '#fff', sw: 1.6 }) + A.line(12, 12, 15.2, 13.8, { stroke: '#fff', sw: 1.6 }) },
    move: { name: 'Move', draw: A => A.path('M7.5 2.5 h7 v9.5 l5.8 3.6 q1.7 1 1.7 3 v2.4 H3.5 v-3.4 q0 -2 2 -2.4 L7.5 14.5z', { fill: '#8a5a33', sw: 1.3 }) + A.line(3.8, 20.6, 21.6, 20.6, { stroke: '#4a2f18', sw: 2.2 }) },
    attack: { name: 'Attack', draw: A => A.group(A.poly([[12, 0.5], [15, 4], [15, 14.6], [9, 14.6], [9, 4]], '#b9c1ca', { sw: 1.3 }) + A.line(12, 3, 12, 13.5, { stroke: '#7d8792', sw: 1 }) + A.rect(5.5, 14.6, 13, 3, '#8a5a33', { rx: 1, sw: 1.1 }) + A.rect(10.8, 17.4, 2.4, 4, '#5a3a20', { rx: 0.5, sw: 0.9 }) + A.circle(12, 22.2, 1.5, '#8a5a33', { sw: 0.9 }), 'rotate(45 12 12)') },
    range: { name: 'Range', draw: A => A.path('M4.5 3.5 Q20.5 3.5 20.5 19.5', { stroke: '#8a5a33', sw: 2.4 }) + A.line(4.5, 3.5, 20.5, 19.5, { stroke: '#6b625a', sw: 0.9 }) + A.arrow(3, 21, 19.5, 4.5, { sw: 1.8, head: 5.5 }) + A.line(3, 21, 3, 17.5, { sw: 1.4 }) + A.line(3, 21, 6.5, 21, { sw: 1.4 }) },
    shield: { name: 'Shield', draw: A => A.path('M12 2 L20.5 5.2 V11 C20.5 16.6 16.8 20.2 12 22.2 C7.2 20.2 3.5 16.6 3.5 11 V5.2 Z', { fill: '#8f9bb0', sw: 1.3 }) + A.path('M12 5 L17.5 7 V11 C17.5 14.8 15.2 17.4 12 18.9', { stroke: '#e6eaf0', sw: 1.4 }) },
    heal: { name: 'Heal', draw: A => A.poly([[9, 2.5], [15, 2.5], [15, 9], [21.5, 9], [21.5, 15], [15, 15], [15, 21.5], [9, 21.5], [9, 15], [2.5, 15], [2.5, 9], [9, 9]], '#3c9a4f', { sw: 1.3 }) },
    lost: { name: 'lost', draw: A => A.circle(12, 12, 10, '#c8423b', { sw: 1.3 }) + A.line(8, 8, 16, 16, { stroke: '#fff', sw: 2.6 }) + A.line(16, 8, 8, 16, { stroke: '#fff', sw: 2.6 }) },
    modifier: { name: 'attack modifier', draw: A => A.rect(4.5, 1.5, 15, 21, '#d6c7a3', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '+1', { size: 9, weight: 800 }) },
    normal: { name: 'normal', draw: A => A.circle(12, 17, 7.5, '#f3efe6', { sw: 1.3 }) + A.person(12, 10.5, 15.5, '#b8433b') },
    elite: { name: 'elite', draw: A => A.circle(12, 17, 7.5, '#e2b33c', { sw: 1.3 }) + A.person(12, 10.5, 15.5, '#b8433b') },
    // Conditions: round tokens.
    poison: { name: 'Poison', draw: A => A.circle(12, 12, 10, '#4f8a3a', { sw: 1.3 }) + A.path('M12 5.5 C12 5.5 7.8 10.6 7.8 13.6 a4.2 4.2 0 0 0 8.4 0 C16.2 10.6 12 5.5 12 5.5z', { fill: '#fff', sw: 0 }) },
    wound: { name: 'Wound', draw: A => A.circle(12, 12, 10, '#a8322b', { sw: 1.3 }) + [[-4, 0], [0, 0], [4, 0]].map(([d]) => A.line(8 + d, 17, 13 + d, 6.5, { stroke: '#fff', sw: 1.8 })).join('') },
    immobilize: { name: 'Immobilize', draw: A => A.circle(12, 12, 10, '#7a5a3a', { sw: 1.3 }) + A.rect(4.5, 9.5, 8.5, 5, 'none', { rx: 2.5, stroke: '#fff', sw: 1.7 }) + A.rect(11, 9.5, 8.5, 5, 'none', { rx: 2.5, stroke: '#fff', sw: 1.7 }) },
    disarm: { name: 'Disarm', draw: A => A.circle(12, 12, 10, '#6f6b66', { sw: 1.3 }) + A.line(12, 5, 12, 18, { stroke: '#fff', sw: 2 }) + A.line(8.8, 14.6, 15.2, 14.6, { stroke: '#fff', sw: 1.6 }) + A.line(6, 18, 18, 6, { stroke: '#f2a3a0', sw: 2 }) },
    stun: { name: 'Stun', draw: A => A.circle(12, 12, 10, '#d9a520', { sw: 1.3 }) + A.star(12, 12.4, 6.5, '#fff', { sw: 0 }) },
    muddle: { name: 'Muddle', draw: A => A.circle(12, 12, 10, '#7d55b5', { sw: 1.3 }) + A.text(12, 12.6, '?', { size: 14, weight: 800, fill: '#fff' }) },
    strengthen: { name: 'Strengthen', draw: A => A.circle(12, 12, 10, '#e07b2e', { sw: 1.3 }) + A.arrow(12, 18.5, 12, 5.8, { stroke: '#fff', sw: 2.4, head: 5.5 }) },
    invisible: { name: 'Invisible', draw: A => A.circle(12, 12, 10, '#3a3f4a', { sw: 1.3 }) + A.path('M5 12 Q12 5.5 19 12 Q12 18.5 5 12z', { stroke: '#fff', sw: 1.4, dash: '2 1.4' }) + A.circle(12, 12, 2.2, '#fff', { sw: 0 }) },
    // Elements.
    fire: { name: 'Fire', draw: A => A.path('M12 22 C6.5 22 4.5 17 7.2 12.2 C8 14.8 9.6 15.2 10 14 C9 10 11 6 14.6 2.5 C14.4 7.4 19.6 10.4 19 16.2 C18.6 19.8 15.6 22 12 22z', { fill: '#e2552b', sw: 1.2 }) + A.path('M12 21 C9.6 21 8.6 18.6 10 16.4 C10.6 17.6 11.6 17.6 11.6 16.6 C11.4 14.6 12.4 13 14 11.6 C14 14.2 16 15.6 15.6 18 C15.2 20 13.8 21 12 21z', { fill: '#f7c843', sw: 0 }) },
    ice: { name: 'Ice', draw: A => [0, 60, 120].map(d => { const r = d * Math.PI / 180, dx = +(9.5 * Math.cos(r)).toFixed(2), dy = +(9.5 * Math.sin(r)).toFixed(2); return A.line(12 - dx, 12 - dy, 12 + dx, 12 + dy, { stroke: '#3f8fc4', sw: 2.4 }); }).join('') + A.circle(12, 12, 2.4, '#bfe3f7', { sw: 1 }) },
    air: { name: 'Air', draw: A => A.path('M2.5 9 h11.5 a3.2 3.2 0 1 0 -3.2 -3.2', { stroke: '#8f9aa6', sw: 2.2 }) + A.path('M2.5 14 h15.5 a3.2 3.2 0 1 1 -3.2 3.2', { stroke: '#8f9aa6', sw: 2.2 }) + A.path('M4.5 19 h6', { stroke: '#8f9aa6', sw: 2.2 }) },
    earth: { name: 'Earth', draw: A => A.path('M4.5 19.5 C4.5 9.5 11 3.5 20.5 3.5 C20.5 13 14 19.5 4.5 19.5z', { fill: '#6a9a3a', sw: 1.2 }) + A.line(4.5, 19.5, 15.5, 8.5, { stroke: '#dcecc8', sw: 1.2 }) },
    light: { name: 'Light', draw: A => [0, 45, 90, 135, 180, 225, 270, 315].map(d => { const r = d * Math.PI / 180; return A.line(+(12 + 7.5 * Math.cos(r)).toFixed(2), +(12 + 7.5 * Math.sin(r)).toFixed(2), +(12 + 10.8 * Math.cos(r)).toFixed(2), +(12 + 10.8 * Math.sin(r)).toFixed(2), { stroke: '#d99a12', sw: 2 }); }).join('') + A.circle(12, 12, 5.6, '#f5c732', { sw: 1.2 }) },
    dark: { name: 'Dark', draw: A => A.path('M15 2.8 A9.6 9.6 0 1 0 21.4 16.2 A7.4 7.4 0 0 1 15 2.8z', { fill: '#4a3a6a', sw: 1.2 }) },
  },

  pitch: 'Co-op: each round play 2 cards to move and fight; meet the scenario goal before your shrinking hands run out.',

  goal: { big: 'Beat the scenario', text: 'Meet the scenario goal, usually **kill all enemies**, before every character is exhausted. You win at the end of that round.' },

  turn: {
    type: 'round',
    intro: 'Each round, everyone picks cards in secret, then all figures act in initiative order:',
    outro: 'Round end: elements wane; players may short rest.',
    steps: [
      { verb: 'Pick 2', text: 'Each player secretly picks **2 cards** (or declares a long rest) and marks one as leading: its number is your {initiative}.' },
      { verb: 'Reveal', text: 'Reveal; flip 1 ability card per monster type. Every figure acts in {=initiative} order, **lowest first**.' },
      { verb: 'Act', text: 'On your turn use the **top** half of one card (often {=attack}) and the **bottom** half of the other (often {=move}), in either order.' },
      { verb: 'Monsters', text: 'Each monster picks a **focus** (the enemy it can reach in the fewest moves) and follows its ability card, whose {=move} / {=attack} values **modify** its stat card.' },
    ],
  },

  tension: 'The strongest actions are {lost} cards that leave your hand for good, so every big play brings exhaustion closer.',

  structure: [
    { label: 'Setup', text: 'Build the first room; place its monsters with their stat cards at scenario level. Each player: class, hit points, hand, {=modifier} deck.' },
    { label: 'Pick cards', repeat: 'round', text: 'Each player secretly picks 2 cards and which one leads, or declares a long rest. Can’t do either: exhausted.' },
    { label: 'Initiative', repeat: 'round', text: 'Reveal. Flip 1 ability card per monster type on the board. Order all figures by {=initiative}, lowest first.' },
    { label: 'Turns', repeat: 'round', text: 'Players: top of one card + bottom of the other (or long rest). Monsters: pick a focus, follow their card. Loot your hex at the end of your turn.' },
    { label: 'Round end', repeat: 'round', text: 'Elements wane 1 step. Reshuffle any deck that drew a shuffle card (monsters) or ×2 / miss ({=modifier}). Players may **short rest**.' },
    { label: 'Scenario end', text: 'Won at the end of the round the goal is met; lost when every character is exhausted. Keep XP, gold and items either way.' },
  ],

  end: {
    trigger: 'the scenario goal is met at the end of a round, or every character is exhausted',
    detail: 'Between scenarios you keep XP, gold and items, level up, unlock new locations and follow a branching story. Characters retire when their personal quest is done.',
    results: [
      { side: 'Scenario won', text: 'at the end of the round the goal is met.' },
      { side: 'Scenario lost', text: 'when **every character is exhausted**: 0 hit points, or unable to play 2 cards or rest.' },
    ],
  },

  ref: {
    title: 'Symbols and card flow',
    rows: [
      ['Actions', '{move} {attack} {range} {shield} {heal}'],
      ['Played card', 'to discard; with {=lost}, lost for the scenario'],
      ['Short rest', 'round end: lose 1 random discard, return the rest to hand'],
      ['Long rest', '{=initiative} 99: lose 1 chosen card, {=heal} 2, refresh items'],
      ['Block damage', 'lose 1 card from hand or 2 from discard'],
      ['Elements', '{=fire}{=ice}{=air}{=earth}{=light}{=dark}'],
    ],
  },

  example: 'Ana’s Brute leads with {=initiative} **15**, so she acts before the Bandit Guards (50). Top of one card: {=attack} 3 on the adjacent {=elite} elite guard (Shield 1 at level 1); she draws a **+1** {=modifier}: 4 − 1 = **3** damage. Bottom of the other: {=move} 3, out of the guards’ reach. The first card has {=lost}, so it is gone for this scenario.',

  setup: [
    'Pick a scenario, build its first room from map tiles, and place the monsters shown for your player count. Scenario level = average character level ÷ 2, rounded up; it sets monster stats.',
    'Each player takes a class, sets hit points for their level, and chooses a hand up to the class card limit (Brute: 10).',
    'Shuffle each player’s {=modifier} attack modifier deck and each monster type’s ability deck.',
  ],

  terms: [
    ['{=initiative} Initiative', 'The number on your leading card. Lower acts first.'],
    ['{=lost} Lost', 'A card with this icon leaves play for the rest of the scenario after use.'],
    ['Exhausted', 'Out of the scenario: 0 hit points, or unable to play 2 cards or rest.'],
    ['{=elite} Elite', 'Tougher monster on a gold base; {=normal} normal monsters have a white base.'],
    ['{=modifier} Modifier', 'Attack modifier card, drawn for every attack instead of a die roll: +1, −1, ×2, miss…'],
  ],

  gotchas: [
    'Any card can be played as a basic **{=attack} Attack 2** (top) or **{=move} Move 2** (bottom).',
    'Don’t share exact card names or numbers: say "I’ll go early", not "I’m playing initiative 12".',
    'Monsters focus the enemy they can reach in the **fewest moves**, then the closest, then the earliest initiative; not simply the closest hex.',
  ],

  tips: [
    'Your hand size sets how many rounds you last; don’t burn {=lost} cards early.',
    'Use the default {=move} 2 / {=attack} 2 freely to save stronger cards.',
    'Kill monsters before they act: a low-{=initiative} attack can prevent a hit.',
  ],

  extended: [
    { title: 'Initiative in detail', items: [
      'Your {=initiative} is the number on your **leading** card. Choose which card leads when you pick them, before the reveal.',
      'Ties between players: compare the **second** cards; still tied, the players decide. Players act before monsters on an exact tie; summons act just before their summoner.',
      'Each monster **type** acts on its ability card’s initiative: {=elite} elites first, then {=normal} normals, each group by ascending standee number.',
      'A **long rest** has initiative 99, so you act last.',
    ] },
    { title: 'Monster focus and the AI', items: [
      'A monster’s **focus** is the enemy it can attack using the fewest movement points (it paths through traps only if no other path exists).',
      'Tiebreaks: the enemy **closest by range** (hexes), then the one with the **earliest initiative** this round.',
      'It moves only as far as needed to attack its focus with as many targets as possible, stays at {=range} if ranged, and avoids disadvantage when it can. No focus: no move, no attack.',
      'Ranged monsters adjacent to an enemy attack with **disadvantage**; they step away first if their move allows.',
      'Monster ability decks reshuffle at the end of a round in which a card with a shuffle icon was drawn.',
    ] },
    { title: 'Attacks and movement', items: [
      'Damage = {=attack} value + 1 drawn {=modifier}, minus the target’s {=shield}. A figure at 0 hit points is removed (a character is exhausted).',
      'Melee attacks hit an adjacent hex; {=range} attacks reach up to that many hexes. **Advantage**: draw 2 modifiers, use the better; **disadvantage**: use the worse.',
      'Modifiers with a rolling icon add on: draw again and add the next one too. A ×2 or miss card makes that deck reshuffle at round end.',
      '{=move} costs 1 per hex; difficult terrain costs 2. You can’t move through enemies, obstacles or walls; a figure entering a trap hex (without Jump or Flying) springs it.',
      'Entering a closed door hex opens it: set up the next room and its monsters right away.',
    ] },
    { title: 'Conditions', items: [
      '{poison}: attacks against you get +1; heals remove poison instead of healing. {wound}: suffer 1 damage at the start of each of your turns until healed.',
      '{immobilize}: cannot move. {disarm}: cannot attack. {stun}: no actions (you still play 2 cards). These end at the end of your next turn.',
      '{muddle}: your attacks have disadvantage. Positive: {strengthen} (advantage), {invisible} (enemies cannot focus or target you).',
    ] },
    { title: 'Elements', items: [
      '6 elements: {fire}, {ice}, {air}, {earth}, {light}, {dark}. An action that **infuses** an element sets it to Strong at the end of that figure’s turn.',
      'At the end of every round each element **wanes** 1 step: Strong → Waning → Inert.',
      'An ability that **consumes** an element needs it Strong or Waning; it gains the bonus and the element becomes Inert. Monsters consume elements too.',
    ] },
    { title: 'Resting, damage and exhaustion', items: [
      '**Short rest** (end of round): shuffle the discard back into your hand, losing 1 **random** card. **Long rest** (your turn, initiative 99): lose 1 card of your choice, {=heal} 2, refresh spent items.',
      'You need at least 2 cards in your discard pile to rest.',
      'Instead of taking damage from one source, you may **lose** 1 card from hand or 2 from discard to negate it all.',
      'You are **exhausted** at 0 hit points, or at the start of a round when you cannot play 2 cards and cannot rest. You keep the XP and money gathered so far.',
    ] },
    { title: 'Loot and scenario goals', items: [
      '{coin} and treasure must be **looted**: end a move on the hex, or use a Loot action. Each coin is worth gold by scenario level at the end.',
      'At the end of **your** turn you loot the hex you stand on. Monsters never loot; killed monsters drop a coin on their hex.',
      'Goals vary: kill all enemies, reach a hex, protect an NPC, loot treasure. A lost scenario still keeps XP and gold, but not the reward.',
    ] },
    { title: 'Campaign, perks and retirement', items: [
      'Between scenarios: buy items with gold, level up from XP (add stronger cards), and gain **perks** from check marks to improve your {=modifier} deck.',
      'Each character has a secret **personal quest**. Completing it forces **retirement**: the character leaves, unlocks new content (often a new class), and you start a new character.',
      'City and road events, global achievements and party reputation decide which scenarios and shop items become available.',
    ] },
  ],

  walk(A) {
    const C = A.C, I = this.icons;
    const ic = (k, x, y, s) => A.use(I[k].draw(A), x - s / 2, y - s / 2, s);
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

    // Figures: the same standee drawings as the {normal} / {elite} icons (Brute recoloured blue).
    const standee = (svg, c, r) => { const [x, y] = at(c, r); return A.use(svg, x - 13.5, y - 14, 27); };
    const bruteSvg = I.normal.draw(A).replace('#f3efe6', '#3a4f8a').replace(/#b8433b/g, '#5b7fd1');
    const brute = (c, r) => A.k('brute', standee(bruteSvg, c, r));
    const elite = (c, r) => A.k('elite', standee(I.elite.draw(A), c, r));
    const guard = (c, r) => A.k('guard', standee(I.normal.draw(A), c, r));
    const back = (x, y, w, h) => A.rect(x + 1.5, y + 2, w, h, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, w, h, '#6a4026', { rx: 3, stroke: '#e9dcc2', sw: 1 }) + A.circle(x + w / 2, y + h / 2, Math.min(w, h) * 0.22, 'none', { stroke: '#e9dcc2', sw: 1 });
    // Player ability card: top / bottom halves (icon + value) with initiative in the middle.
    const act = (k, n, cx, cy) => ic(k, cx - 8, cy, 17) + A.text(cx + 9, cy + 0.5, n, { size: 12, weight: 800 });
    const pcard = (x, y, init, top, bot, lost, hi) => {
      let s = A.rect(x + 2, y + 3, 54, 80, C.shadow, { sw: 0, rx: 5 }) + A.rect(x, y, 54, 80, '#efe3c6', { rx: 5, sw: 1.3 });
      if (hi === 'top') s += A.rect(x + 3, y + 3, 48, 32, '#f4c66b', { rx: 3, sw: 0 });
      if (hi === 'bot') s += A.rect(x + 3, y + 45, 48, 32, '#f4c66b', { rx: 3, sw: 0 });
      s += act(...top, x + 25, y + 20) + act(...bot, x + 25, y + 61);
      s += A.line(x + 4, y + 40, x + 50, y + 40, { stroke: '#8a7a5a', sw: 1 });
      s += A.circle(x + 27, y + 40, 8.5, '#3a4f8a', { stroke: C.ink, sw: 1 }) + A.text(x + 27, y + 40.5, init, { size: 8, weight: 800, fill: '#fff' });
      if (lost) s += ic('lost', x + 46, y + 9, 10);
      return s;
    };
    const slotA = [200, 78], slotB = [260, 78];
    const cA = (hi, xy = slotA) => A.k('cardA', pcard(...xy, '15', ['attack', 3], ['move', 2], true, hi));
    const cB = (hi, xy = slotB) => A.k('cardB', pcard(...xy, '62', ['shield', 1], ['move', 3], false, hi));
    const handBacks = (n) => [0, 1, 2].slice(0, n).map(i => A.k('h' + i, back(200 + i * 9, 174, 16, 22))).join('');
    const mon = (open) => open
      ? A.k('mon-open', A.rect(200, 22, 116, 46, '#e9dcc2', { rx: 4, sw: 1.2 }) + A.circle(216, 45, 11, '#b8433b', { stroke: C.ink, sw: 1 }) + A.text(216, 45.5, '50', { size: 9, weight: 800, fill: '#fff' }) +
        A.text(270, 30, 'Guard', { size: 7, weight: 800 }) + ic('move', 248, 50, 17) + A.text(263, 50.5, '+0', { size: 11, weight: 800 }) + ic('attack', 283, 50, 17) + A.text(299, 50.5, '+0', { size: 11, weight: 800 }))
      : A.k('mon-back', back(200, 22, 116, 46) + A.text(258, 60, 'monster deck', { size: 6.5, fill: '#e9dcc2' }));
    const order = A.k('o-brute', A.circle(238, 13, 7.5, '#3a4f8a', { stroke: '#fff', sw: 1 }) + A.text(238, 13.5, '15', { size: 7, weight: 800, fill: '#fff' })) +
      A.text(254, 13, '→', { size: 9, fill: '#e9dcc2' }) +
      A.k('o-mon', A.circle(270, 13, 7.5, '#b8433b', { stroke: '#fff', sw: 1 }) + A.text(270, 13.5, '50', { size: 7, weight: 800, fill: '#fff' }));
    const [ex, ey] = at(2, 2);
    const mini = (x, y, init, lost) => A.rect(x, y, 18, 20, '#efe3c6', { rx: 2, sw: 1 }) + A.circle(x + 9, y + 10, 6, '#3a4f8a', { sw: 0.8 }) + A.text(x + 9, y + 10.5, init, { size: 6, weight: 800, fill: '#fff' }) +
      (lost ? ic('lost', x + 15, y + 3, 7) : '');
    const piles = A.k('cardA', mini(290, 175, '15', true)) + A.k('cardB', mini(257, 175, '62'));
    const dmg = (x, y) => A.k('dmg', A.circle(x - 12, y - 10, 8, '#c8423b', { stroke: '#fff', sw: 1.2 }) + A.text(x - 12, y - 9.5, '3', { size: 9, weight: 800, fill: '#fff' }));

    return [
      { step: 0, say: '**Pick 2.** Ana’s Brute stands next to an {=elite} elite Bandit Guard. She secretly picks 2 cards and chooses one to lead.',
        svg: base + brute(1, 3) + elite(2, 2) + guard(3, 1) + mon(false) + handBacks(3) + A.k('pickA', back(slotA[0] + 9, slotA[1] + 14, 36, 52)) + A.k('pickB', back(slotB[0] + 9, slotB[1] + 14, 36, 52)) + A.glow(227, 118, 12, 'g-pickA') + A.glow(287, 118, 12, 'g-pickB') },
      { step: 1, say: '**Reveal.** Her leading card shows {=initiative} **15**; the Guard ability card shows **50**. Lower goes first.',
        svg: base + brute(1, 3) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + cA() + cB() + order + A.glow(227, 118, 11, 'g-init') + A.glow(216, 45, 14, 'g-mon') },
      { step: 2, say: '**Top half** of the first card: {=attack} 3 on the elite. She draws a **+1** {=modifier}: 4, minus its {=shield} 1 = **3** damage.',
        svg: base + brute(1, 3) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + cA('top') + cB() + order + A.glow(238, 13, 10, 'g-o') +
          A.k('mod', A.use(I.modifier.draw(A), ex + 6, ey + 2, 34)) + dmg(ex, ey) },
      { step: 2, say: '**Bottom half** of the other card: {=move} 3, out of the guards’ reach.',
        svg: base + brute(0, 6) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + cA() + cB('bot') + order + A.glow(238, 13, 10, 'g-o') + dmg(ex, ey) + A.glow(...at(0, 6), 14, 'g-move') },
      { step: 2, say: 'Turn over. The attack card has {=lost}, so it is gone for the scenario; the other goes to discard.',
        svg: base + brute(0, 6) + elite(2, 2) + guard(3, 1) + mon(true) + handBacks(3) + piles + order + A.glow(299, 185, 14, 'g-lost') + dmg(ex, ey) },
      { step: 3, say: '**Monsters** at 50: {=move} +0 and {=attack} +0 to their stat cards. Both focus the Brute; the elite moves 2, the guard 3. Neither reaches her, so neither attacks.',
        svg: base + brute(0, 6) + elite(1, 4) + guard(2, 4) + mon(true) + handBacks(3) + piles + order + A.glow(270, 13, 10, 'g-o2') + A.glow(...at(1, 4), 14, 'g-move1') + dmg(...at(1, 4)) },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
    const ic = (k, x, y, s) => A.use(I[k].draw(A), x - s / 2, y - s / 2, s);
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
    o += A.use(A.ICONS.coin.draw(A), gx - 7, gy - 7, 14);
    const [dx, dy] = at(4, 0);
    o += A.rect(dx - 9, dy - 7, 18, 14, '#6a4026', { rx: 2, stroke: '#2a2420', sw: 1.2 });
    // figures: same standees as the {normal} / {elite} icons
    const standee = (svg, c, r) => { const [x, y] = at(c, r); return A.use(svg, x - 13.5, y - 14, 27); };
    const hero = (b, body) => I.normal.draw(A).replace('#f3efe6', b).replace(/#b8433b/g, body);
    o += standee(hero('#3a4f8a', '#5b7fd1'), 1, 4);     // Brute
    o += standee(hero('#5b3a8a', '#9a6fd6'), 1, 5);     // Spellweaver
    o += standee(I.elite.draw(A), 2, 3);                // elite guard
    o += standee(I.normal.draw(A), 3, 2);               // normal guard
    o += standee(I.normal.draw(A), 4, 3);               // normal guard
    // attack arrow
    const [bx, by] = at(1, 4), [ex, ey] = at(2, 3);
    o += A.arrow(bx + 5, by - 6, ex - 6, ey + 6, { stroke: '#f08a2a', sw: 2.2, head: 6 });
    // monster ability card
    o += A.rect(214, 8, 98, 36, '#e9dcc2', { rx: 4, sw: 1.2 });
    o += A.circle(230, 26, 11, '#b8433b', { stroke: C.ink, sw: 1 }) + A.text(230, 26.5, '30', { size: 9, weight: 800, fill: '#fff' });
    o += ic('move', 254, 26, 16) + A.text(268, 26.5, '+1', { size: 10, weight: 800 }) + ic('attack', 284, 26, 16) + A.text(299, 26.5, '−1', { size: 10, weight: 800 });
    // two player ability cards: top/bottom split with initiative
    const act = (k, n, cx, cy) => ic(k, cx - 8, cy, 18) + A.text(cx + 9, cy + 0.5, n, { size: 12, weight: 800 });
    const pcard = (x, y, init, top, bot, useTop) => {
      let s = A.rect(x + 2, y + 3, 48, 92, C.shadow, { sw: 0, rx: 5 }) + A.rect(x, y, 48, 92, '#efe3c6', { rx: 5, sw: 1.3 });
      s += A.rect(x + 3, useTop ? y + 3 : y + 50, 42, 39, '#f4c66b', { rx: 3, sw: 0, opacity: 0.85 });
      s += act(...top, x + 23, y + 24) + act(...bot, x + 23, y + 70);
      s += A.line(x + 4, y + 46, x + 44, y + 46, { stroke: '#8a7a5a', sw: 1 });
      s += A.circle(x + 24, y + 46, 9, '#3a4f8a', { stroke: C.ink, sw: 1 }) + A.text(x + 24, y + 46.5, init, { size: 8.5, weight: 800, fill: '#fff' });
      return s;
    };
    o += pcard(212, 82, '15', ['attack', 3], ['move', 2], true);
    o += pcard(264, 82, '62', ['heal', 2], ['move', 3], false);
    // lost icon on first card
    o += ic('lost', 252, 90, 10);
    o += A.note(262, 44, 262, 62, 'Monster card: ± its stats');
    o += A.note(236, 128, 122, 188, 'Initiative: low goes first');
    o += A.note(ex + 8, ey, 100, 12, 'Elite = gold base');
    o += A.note(300, 164, 266, 188, 'Use top + bottom');
    return o;
  },
});
