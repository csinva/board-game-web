defineGame({
  id: 'magic-the-gathering',
  name: 'Magic: The Gathering',
  year: 1993,
  designer: 'Richard Garfield',
  family: 'cards',
  players: [2, 2], best: '2',
  time: [20, 60],
  age: 13,
  mechanics: ['deck-construction', 'take-that', 'hand-management', 'resource-management', 'tableau'],
  profile: { complexity: 4, luck: 3, interaction: 5, conflict: 5, talk: 2, planning: 3 },

  pitch: 'Duel a friend as rival wizards: play lands for mana, cast creatures and spells from a deck you built, and attack until their life hits 0.',
  theme: 'You are planeswalkers, wizards who summon creatures and hurl spells at each other, powered by the lands you control.',

  goal: { big: '20 → 0 life', text: 'Each player starts at **20 life**. Reduce your opponent to 0, mostly by attacking with creatures and casting damaging spells.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Untap, draw', text: 'Untap all your cards, then **draw 1** card (the player who goes first skips this draw on turn 1).' },
      { verb: 'Main phase', text: 'Play **one land**, and cast creatures and other spells by tapping lands for mana.' },
      { verb: 'Combat', text: 'Tap creatures to **attack**; your opponent assigns blockers; unblocked attackers damage the player.' },
      { verb: 'Main again', text: 'Cast more spells or play your land if you haven’t yet.' },
      { verb: 'End', text: 'Discard down to **7** cards; damage on creatures wears off.' },
    ],
  },

  tension: 'Every card is either a threat or an answer, so each turn you decide whether to spend your mana and creatures on attacking now or hold them back to block and respond.',

  flow: [
    { label: 'Mana', items: ['One land per turn', 'Tap lands for mana', 'Five colours'] },
    { label: 'Cast', items: ['Creatures stay in play', 'Sorceries on your turn', 'Instants any time'] },
    { label: 'Fight', items: ['Attack the player', 'Blockers trade damage', 'Creatures die at toughness'] },
  ],

  end: {
    trigger: 'a player hits 0 life', detail: 'Usually best of three games (a “match”).',
    results: [
      { side: 'You win', text: 'if your opponent reaches 0 life, has to draw from an empty library, or gets 10 poison counters.' },
      { side: 'Concede', text: 'a player may concede at any time.' },
    ],
  },

  ref: {
    title: 'Card types',
    rows: [
      ['Land', 'one per turn; tap for mana'],
      ['Creature', 'power / toughness; attacks and blocks'],
      ['Sorcery', 'one-shot, your main phase only'],
      ['Instant', 'one-shot, any time, even in combat'],
      ['Enchantment / Artifact', 'stays in play with an ongoing effect'],
    ],
  },

  example: 'You tap 3 lands to cast a **3/3** bear. It can’t attack yet, so you attack with last turn’s 2/2. Your opponent blocks it with a 1/4 wall: no one dies, so you tap 1 more land for an instant giving your creature +3/+0, and the 5‑power hit destroys the wall.',

  setup: [
    'Each player brings a deck of at least 60 cards (no more than 4 copies of any card except basic lands).',
    'Shuffle, set life to 20 and draw 7. You may mulligan: reshuffle, draw 7, then put cards on the bottom.',
    'Choose who goes first; that player skips their first draw.',
  ],

  terms: [
    ['Tap', 'Turn a card sideways to use it (attacking, or making mana).'],
    ['Mana', 'Coloured energy from lands that pays a spell’s cost.'],
    ['Power / toughness', 'A creature’s damage dealt / damage it can take this turn.'],
    ['Summoning sickness', 'A creature can’t attack or tap the turn it arrives.'],
    ['The stack', 'Spells wait here; the last one cast resolves first.'],
  ],

  gotchas: [
    '**Summoning sickness**: a new creature can’t attack (or use a tap ability) until your next turn, unless it has haste. It can still block.',
    'Tapped creatures **can’t block**, and attacking taps your creature, so attacking leaves you open.',
    'Responding uses **the stack**: spells and abilities resolve last-in, first-out, so a reply happens before the thing it answers.',
  ],

  tips: [
    'Play a land every turn you can; missing land drops is the most common way to lose.',
    'Before attacking, check what your opponent could block with and what they could cast with untapped mana.',
    'Want a fresh start? Try Limited: draft or open booster packs and build a 40-card deck on the spot.',
  ],

  extended: [
    { title: 'Card types', items: [
      '**Land**: not a spell. One per turn, in your main phase when the stack is empty. Basic lands tap for one mana of their colour.',
      '**Creature**: a permanent with power/toughness that can attack and block. Cast at sorcery speed (your main phase, empty stack).',
      '**Sorcery** / **Instant**: one-shot effects that go to the graveyard. Sorceries only in your main phase; instants any time you have priority.',
      '**Enchantment** and **Artifact**: permanents with ongoing effects. Auras attach to something; Equipment is an artifact you pay to attach to your creature.',
      '**Planeswalker**: has loyalty. Activate one loyalty ability per turn at sorcery speed. Opponents can attack it, and damage removes loyalty.',
      '**Legendary**: you can control only one permanent with a given legendary name; if you get a second, choose one to keep.',
    ] },
    { title: 'The stack & responding', text: 'Casting a spell or activating an ability puts it on **the stack**; it does nothing yet. Both players then get a chance to respond with instants or abilities, which go on top. When both pass in a row, the **top** item resolves, then both get priority again. So the last thing cast happens first: if your opponent casts a removal spell on your creature, you can respond with a pump spell that resolves before it. Lands, mana abilities and combat damage do not use the stack. A spell whose target is gone when it tries to resolve does nothing.' },
    { title: 'Combat in detail', items: [
      'Steps: **beginning of combat** → **declare attackers** (tap them) → **declare blockers** → **combat damage** → end of combat. Players can cast instants in each step.',
      'Each blocker blocks one attacker; several blockers may gang up on one attacker, and its controller divides its damage among them.',
      '**First strike** deals damage in an earlier damage step; if it kills its opponent, it takes no damage back. **Double strike** deals damage in both steps.',
      '**Trample**: damage beyond what is lethal to the blockers goes through to the player.',
      '**Deathtouch**: any damage it deals is lethal. With trample, 1 damage per blocker counts as lethal.',
      '**Flying** can only be blocked by flying or **reach** creatures. **Menace** needs two or more blockers. **Vigilance** attacks without tapping.',
      'Damage stays on a creature until end of turn, so two small hits in one turn add up.',
    ] },
    { title: 'Common keywords', items: [
      '**Haste**: can attack and tap the turn it arrives.',
      '**Flash**: may be cast any time you could cast an instant.',
      '**Lifelink**: damage it deals also gains you that much life.',
      '**Defender**: can’t attack.',
      '**Hexproof**: can’t be targeted by opponents’ spells or abilities. **Ward**: an opponent targeting it must pay the ward cost or the spell is countered.',
      '**Indestructible**: not destroyed by damage or “destroy” effects (it can still be exiled or shrunk to 0 toughness).',
      '**Counter** a spell: it is removed from the stack before it resolves and goes to the graveyard.',
    ] },
    { title: 'Mana & colours', items: [
      'Five colours: **white** (Plains), **blue** (Island), **black** (Swamp), **red** (Mountain), **green** (Forest), plus colourless.',
      'A cost like {2}{G} needs one green mana plus 2 of any kind. The total is the card’s **mana value**.',
      'Unused mana empties from your pool at the end of each step and phase, so tap lands only when you need them.',
      'Colour styles: white teamwork and protection, blue cards and counterspells, black removal at a price, red fast damage, green big creatures and extra lands.',
    ] },
    { title: 'Formats', items: [
      '**Standard**: 60+ card decks, up to 4 copies, 15-card sideboard, only recent sets (older sets rotate out).',
      '**Pioneer / Modern / Legacy**: same deck rules with ever larger, non-rotating card pools.',
      '**Commander**: 100 cards, one copy of each (except basic lands), led by a legendary creature in the **command zone**. 40 life, usually 4 players. Cards must match the commander’s colours; each recast from the command zone costs 2 more; 21 combat damage from one commander knocks a player out.',
      '**Limited** (draft or sealed): build a deck from boosters you open on the day. 40-card minimum, free basic lands, 20 life.',
    ] },
    { title: 'Building a deck', items: [
      'About **24 lands** in 60 cards (17 in 40-card Limited).',
      'Stick to **one or two colours** at first so your lands produce what your spells need.',
      'Watch your **mana curve**: plenty of 2- and 3-cost cards so you have something to do every turn, and just a few expensive ones.',
      'A typical mix: 15–20 creatures, some removal, a few tricks. Four copies of your best card make it show up more often.',
      '**Mulligan**: if your opening 7 are unplayable, shuffle and draw 7 again, then put one card on the bottom per mulligan taken.',
    ] },
    { title: 'Zones', text: 'Cards move between **library** (your deck), **hand**, **battlefield** (permanents in play), **graveyard** (discard pile for used spells and dead creatures, face up and public), **exile** (removed from the game) and **the stack**. Commander adds the **command zone**. Many cards care about zones, such as returning a creature from your graveyard to the battlefield.' },
  ],

  walk(A) {
    const C = A.C, G = '#3c8d4f', R = '#c8423b', U = '#2f6db5';
    let base = A.bg('#2f3b46') + A.rect(4, 4, 312, 92, '#3d4b58', { rx: 8, sw: 0 }) + A.rect(4, 104, 312, 92, '#45535f', { rx: 8, sw: 0 }) + A.line(10, 100, 310, 100, { stroke: '#c8b88a', sw: 1, dash: '4 4' });
    const land = (cx, cy, f, tap) => { const s = A.card(cx - 11, cy - 15, 22, 30, f, { face: '#1f1f1f' }) + A.circle(cx, cy, 4.5, 'rgba(255,255,255,.6)', { sw: 0 }); return tap ? A.group(s, `rotate(90 ${cx} ${cy})`) : s; };
    const crit = (cx, cy, f, name, pt, tap, hot) => {
      const s = A.card(cx - 15, cy - 20, 30, 40, f, { face: '#1f1f1f' }) + A.rect(cx - 12, cy - 17, 24, 8, 'rgba(255,255,255,.88)', { rx: 1.5, sw: 0 }) + A.text(cx, cy - 13, name, { size: 5, weight: 800 }) +
        A.rect(cx - 10, cy - 7, 20, 12, 'rgba(255,255,255,.3)', { rx: 2, sw: 0 }) + A.rect(cx - 2, cy + 8, 15, 9, hot ? '#ffcf3f' : '#f2e6cc', { rx: 2, sw: 0.6 }) + A.text(cx + 5.5, cy + 12.5, pt, { size: 6, weight: 800 });
      return tap ? A.group(s, `rotate(90 ${cx} ${cy})`) : s;
    };
    const spell = (cx, cy, f, name, sub) => A.card(cx - 12, cy - 17, 24, 34, f, { face: '#1f1f1f' }) + A.rect(cx - 9, cy - 14, 18, 7, 'rgba(255,255,255,.88)', { rx: 1.5, sw: 0 }) +
      A.text(cx, cy - 10.5, name, { size: 4.5, weight: 800 }) + (sub ? A.text(cx, cy + 5, sub, { size: 5, weight: 800, fill: C.white }) : '');
    const life = (cx, cy, v) => A.circle(cx, cy, 15, '#f2e6cc', { sw: 1.4 }) + A.text(cx, cy, v, { size: 13, weight: 800 });
    for (let i = 0; i < 4; i++) base += land(22 + i * 26, 24, U, false);
    base += A.card(280, 159, 24, 34, '#6b4a2c', { face: '#1f1f1f' }) + A.text(292, 196, 'Library', { size: 6, weight: 700, fill: C.white });
    base += A.tag(290, 56, 'Opponent') + A.tag(290, 112, 'You') + life(290, 140, '20');
    const L = (i) => [24 + i * 32, 178], HD = (i) => [190 + i * 28, 178];
    const lands = (tapped) => [G, G, G, R].map((f, i) => A.k('land' + i, land(...L(i), f, tapped.includes(i)))).join('');
    const mtn = (tap) => A.k('mtn', land(...L(4), R, tap));
    const wolf = (cx, cy, pt, tap, hot) => A.k('wolf', crit(cx, cy, G, 'Wolf', pt, tap, hot));
    const elf = (cx, cy, tap) => A.k('elf', crit(cx, cy, G, 'Elf', '2/1', tap));
    const bear = A.k('bear', crit(214, 132, G, 'Bear', '3/3'));
    const wall = (cx, cy) => A.k('wall', crit(cx, cy, U, 'Wall', '1/4'));
    const strike = (cx, cy) => A.k('strike', spell(cx, cy, R, 'Rage', '+3/+0'));
    const opp = (v) => A.k('opp-life', life(290, 26, v));
    return [
      { step: 0, say: 'Your turn: **untap** everything, then **draw** a card. You draw an instant.', svg: base + opp('20') + lands([]) + wall(110, 58) +
        wolf(134, 132, '2/2') + elf(174, 132) + A.k('h-mtn', land(...HD(0), R)) + A.k('h-bear', spell(...HD(1), G, 'Bear', '3/3')) + strike(...HD(2)) + A.glow(246, 178, 20, 'g-draw') },
      { step: 1, say: 'Main phase: play **one land**. The Mountain goes from your hand onto the battlefield.', svg: base + opp('20') + lands([]) + wall(110, 58) +
        wolf(134, 132, '2/2') + elf(174, 132) + mtn(false) + A.k('h-bear', spell(...HD(1), G, 'Bear', '3/3')) + strike(...HD(2)) },
      { step: 1, say: 'Tap 3 Forests for 3 mana and cast a **3/3 Bear**. It is summoning sick, so it can’t attack this turn.', svg: base + opp('20') + lands([0, 1, 2]) + wall(110, 58) +
        wolf(134, 132, '2/2') + elf(174, 132) + mtn(false) + bear + strike(...HD(2)) + A.glow(214, 132, 26, 'g-bear') },
      { step: 2, say: '**Attack** with the Wolf (2/2) and Elf (2/1): they tap. Your opponent blocks the Wolf with a **1/4 Wall**.', svg: base + opp('20') + lands([0, 1, 2]) + wall(150, 50) +
        wolf(150, 88, '2/2', true) + elf(226, 88, true) + mtn(false) + bear + strike(...HD(2)) + A.arrow(244, 80, 274, 40, { stroke: '#e2b33c', sw: 2.4 }) },
      { step: 2, say: 'No one would die, so you tap the Mountain for an **instant**: Wolf gets +3/+0 and becomes a 5/2.', svg: base + opp('20') + lands([0, 1, 2]) + wall(150, 50) +
        wolf(150, 88, '5/2', true, true) + elf(226, 88, true) + mtn(true) + bear + strike(80, 74) + A.arrow(94, 78, 130, 86, { stroke: '#e2b33c', sw: 2 }) },
      { step: 2, say: 'Damage: 5 destroys the Wall, its 1 damage doesn’t kill the Wolf, and the unblocked Elf hits for **2**: 20 → 18.', svg: base + opp('18') + lands([0, 1, 2]) +
        wolf(150, 88, '5/2', true, true) + elf(226, 88, true) + mtn(true) + bear + A.glow(290, 26, 20, 'g-life') },
      { step: 4, say: '**End**: the +3/+0 and damage wear off. Your attackers stay tapped until your next untap. Opponent’s turn.', svg: base + opp('18') + lands([0, 1, 2]) +
        wolf(134, 132, '2/2', true) + elf(176, 132, true) + mtn(true) + bear },
    ];
  },

  art(A) {
    const C = A.C;
    let o = A.bg('#2f3b46');
    // table halves
    o += A.rect(4, 4, 312, 92, '#3d4b58', { rx: 8, sw: 0 });
    o += A.rect(4, 104, 312, 92, '#45535f', { rx: 8, sw: 0 });
    o += A.line(10, 100, 310, 100, { stroke: '#c8b88a', sw: 1, dash: '4 4' });
    const creature = (x, y, f, pt, o2 = {}) => {
      let s = A.card(x, y, 34, 46, f, { face: '#1f1f1f' });
      s += A.rect(x + 5, y + 7, 24, 18, 'rgba(255,255,255,.35)', { rx: 2, sw: 0 });
      s += A.rect(x + 16, y + 35, 16, 9, '#f2e6cc', { rx: 2, sw: 0.6 }) + A.text(x + 24, y + 39.5, pt, { size: 7, weight: 800 });
      return o2.rotate ? A.group(s, `rotate(${o2.rotate} ${x + 17} ${y + 23})`) : s;
    };
    const land = (x, y, f, tapped) => {
      const s = A.card(x, y, 24, 32, f, { face: '#1f1f1f' }) + A.circle(x + 12, y + 16, 5, 'rgba(255,255,255,.55)', { sw: 0 });
      return tapped ? A.group(s, `rotate(90 ${x + 12} ${y + 16})`) : s;
    };
    // opponent: lands at top, creatures below
    for (let i = 0; i < 4; i++) o += land(12 + i * 28, 10, '#2f6db5', false);
    o += creature(140, 44, '#2f6db5', '1/4');
    o += creature(180, 44, '#2f6db5', '2/1');
    // opponent life
    o += A.circle(286, 32, 20, '#f2e6cc', { sw: 1.4 }) + A.text(286, 32, '14', { size: 16, weight: 800 });
    // your side: creatures above lands
    o += creature(126, 108, '#3c8d4f', '3/3');
    o += creature(196, 112, '#3c8d4f', '2/2', { rotate: 90 });
    o += A.arrow(213, 106, 160, 94, { stroke: '#e2b33c', sw: 2.4 });
    for (let i = 0; i < 5; i++) o += land(14 + i * 34, 158, '#3c8d4f', i < 3);
    // hand at bottom right
    o += A.fan(270, 160, 3, 26, 36, ['#7d55b5', '#c8423b', '#3c8d4f'], { dx: 16 });
    // your life
    o += A.circle(286, 126, 20, '#f2e6cc', { sw: 1.4 }) + A.text(286, 126, '20', { size: 16, weight: 800 });
    o += A.note(30, 172, 54, 118, 'Tapped land = mana', { w: 104 });
    o += A.note(213, 136, 232, 190, 'Attacker (tapped)', { w: 98 });
    o += A.note(157, 60, 108, 74, 'Blocker', { w: 52 });
    o += A.note(286, 52, 248, 80, 'Life total', { w: 62 });
    return o;
  },
});
