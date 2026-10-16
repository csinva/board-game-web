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

  // Mana symbols ({=g}, {=2}), the tap symbol ({=t}) and card-type glyphs, reused on the lands in art + walk.
  icons: (() => {
    const ink = '#2a2420';
    const mana = (name, fill, inner) => ({ name, draw: A => A.circle(12, 12, 10.5, fill, { sw: 1.2 }) + inner(A) });
    const o = {
      w: mana('white mana', '#f8f0c8', A => A.circle(12, 12, 3.6, ink, { sw: 0 }) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return A.line(+(12 + 5.4 * Math.cos(a)).toFixed(1), +(12 + 5.4 * Math.sin(a)).toFixed(1), +(12 + 8 * Math.cos(a)).toFixed(1), +(12 + 8 * Math.sin(a)).toFixed(1), { stroke: ink, sw: 1.6 }); }).join('')),
      u: mana('blue mana', '#a9d2ef', A => A.path('M12 4 q6.5 7.5 6.5 11 a6.5 6.5 0 0 1 -13 0 q0 -3.5 6.5 -11 z', { fill: ink, sw: 0 })),
      b: mana('black mana', '#c9bfb8', A => A.circle(12, 10.5, 6, ink, { sw: 0 }) + A.rect(9, 13, 6, 5.5, ink, { rx: 1, sw: 0 }) + A.circle(9.7, 10.5, 1.7, '#c9bfb8', { sw: 0 }) + A.circle(14.3, 10.5, 1.7, '#c9bfb8', { sw: 0 })),
      r: mana('red mana', '#f3a38c', A => A.path('M12 3.5 q6 5.5 5.5 10.5 q-0.5 5.5 -5.5 6.5 q-5 -1 -5.5 -6.5 q0 -3.5 2.5 -5.5 q0 3 2 4 q-1.5 -5 1 -9 z', { fill: ink, sw: 0 })),
      g: mana('green mana', '#9bd3ae', A => A.circle(12, 9.5, 5.5, ink, { sw: 0 }) + A.rect(10.8, 12, 2.4, 7.5, ink, { rx: 0.5, sw: 0 }) + A.rect(8, 18.5, 8, 1.8, ink, { rx: 0.9, sw: 0 })),
      c: mana('colourless mana', '#cbc5c0', A => A.poly([[12, 4.5], [18.5, 12], [12, 19.5], [5.5, 12]], 'none', { stroke: ink, sw: 2 })),
      t: mana('tap', '#cbc5c0', A => A.path('M7.5 15.5 A6 6 0 1 1 13.5 18', { stroke: ink, sw: 2.2 }) + A.poly([[5, 13], [10.5, 13.5], [7.3, 18]], ink, { sw: 0 })),
      land: { name: 'land', draw: A => A.poly([[1.5, 20], [8.5, 6], [13, 13], [16.5, 8.5], [22.5, 20]], '#8a7350', { sw: 1.3 }) + A.poly([[8.5, 6], [6.3, 10.4], [10.6, 9.3]], '#fff', { sw: 0 }) },
      creature: { name: 'creature', draw: A => [5, 11, 17].map(x => A.path(`M${x} 3 q4 9 -1 18`, { stroke: '#8a5a33', sw: 2.8 })).join('') },
      instant: { name: 'instant', draw: A => A.poly([[14.5, 1.5], [5, 13.5], [11, 13.5], [8.5, 22.5], [19, 9.5], [13, 9.5], [16.5, 1.5]], '#e2b33c', { sw: 1.2 }) },
      sorcery: { name: 'sorcery', draw: A => A.path('M12 2.5 q6 5 5.5 9.5 q-0.5 4 -5.5 4.5 q-5 -0.5 -5.5 -4.5 q0 -3 2.5 -4.5 q0 2.5 2 3.5 q-1 -4.5 1 -8.5 z', { fill: '#9b6fc4', sw: 1.1 }) + A.path('M6 15.5 h12 l-2 6 h-8 z', { fill: '#8c877f', sw: 1.1 }) },
      enchantment: { name: 'enchantment', draw: A => A.path('M12 2 Q13.5 10.5 22 12 Q13.5 13.5 12 22 Q10.5 13.5 2 12 Q10.5 10.5 12 2 z', { fill: '#2a9a96', sw: 1.1 }) },
      artifact: { name: 'artifact', draw: A => A.path('M5 3 h14 q0 9 -7 10 q-7 -1 -7 -10 z', { fill: '#b7bec7', sw: 1.2 }) + A.rect(11, 13, 2, 5, '#b7bec7', { rx: 0, sw: 1 }) + A.rect(7, 18, 10, 3, '#b7bec7', { rx: 1, sw: 1.1 }) },
    };
    for (let n = 1; n <= 9; n++) o[n] = mana(n + ' generic mana', '#cbc5c0', A => A.text(12, 12.8, String(n), { size: 14, weight: 800 }));
    return o;
  })(),

  pitch: 'Two players play lands for mana, cast creatures and spells from their own deck, and attack until one hits 0 life.',

  goal: { big: '20 → 0 life', text: 'Both start at **20 life**. Reduce your opponent to 0, mostly with creature attacks and damage spells.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Untap, draw', text: 'Untap your cards, then **draw 1** (the first player skips this draw on turn 1).' },
      { verb: 'Main phase', text: 'Play **one** {=land} land. Cast creatures and other spells by tapping lands for mana.' },
      { verb: 'Combat', text: 'Tap {=t} creatures to **attack**. The opponent declares blockers; unblocked attackers damage the player.' },
      { verb: 'Main again', text: 'Cast more spells, or play your land if you haven’t.' },
      { verb: 'End', text: 'Discard down to **7** cards. Damage on creatures wears off.' },
    ],
  },

  tension: 'Every card is a threat or an answer, so each turn you choose between attacking now and holding mana and creatures back to block and respond.',

  structure: [
    { label: 'Setup', text: 'Shuffle your 60+ card deck, set life to 20, draw 7 (mulligan allowed).' },
    { label: 'Turns', repeat: 'alternating', text: 'Untap, draw → main → combat → main → end, then the opponent’s turn.' },
    { label: 'Game end', text: 'A player loses at 0 life, when drawing from an empty library, or at 10 poison counters.' },
    { label: 'Match', repeat: 'best of 3', text: 'The loser of each game chooses who goes first in the next.' },
  ],

  end: {
    trigger: 'a player hits 0 life', detail: 'Usually best of 3 games (a “match”).',
    results: [
      { side: 'You win', text: 'if the opponent hits 0 life, must draw from an empty library, or has 10 poison counters.' },
      { side: 'Concede', text: 'any player may concede at any time.' },
    ],
  },

  ref: {
    title: 'Card types',
    rows: [
      ['{=land} Land', 'one per turn; tap {=t} for mana'],
      ['{=creature} Creature', 'power / toughness; attacks and blocks'],
      ['{=sorcery} Sorcery', 'one-shot; your main phase only'],
      ['{=instant} Instant', 'one-shot; any time, even in combat'],
      ['{=enchantment}{=artifact} Enchantment / Artifact', 'stays in play; ongoing effect'],
      ['Mana cost', '{=2}{=g} = 1 green + 2 of any kind; tap {=t} lands to pay'],
    ],
  },

  example: 'Tap 3 Forests to cast a **3/3** Bear ({=2}{=g}). It can’t attack yet, so attack with last turn’s 2/2. The opponent blocks with a 1/4 Wall; no one would die, so tap 1 more land for an instant giving +3/+0, and 5 damage destroys the Wall.',

  setup: [
    'Each player brings a deck of 60+ cards, with at most 4 copies of any card except basic lands.',
    'Shuffle, set life to 20, draw 7. **London mulligan**: shuffle your hand back and draw 7 again, as often as you like; when you keep, put 1 card on the bottom per mulligan taken.',
    'A random player chooses who goes first; the first player skips their first draw.',
  ],

  terms: [
    ['{=t} Tap', 'Turn a card sideways to use it (attack, or make mana).'],
    ['Mana', 'Energy from lands that pays spell costs: {=w}{=u}{=b}{=r}{=g} colours, or {=2} generic (any kind).'],
    ['Power / toughness', 'Damage a creature deals / damage that destroys it. Damage clears at end of turn.'],
    ['Summoning sickness', 'A creature can’t attack or {=t} the turn it arrives.'],
    ['The stack', 'Spells wait here; the last one cast resolves first.'],
  ],

  gotchas: [
    '**Summoning sickness**: a new creature can’t attack or use {=t} abilities until your next turn, unless it has haste. It can still block.',
    'Attacking taps your creature, and tapped creatures **can’t block**.',
    'Responses go on **the stack** and resolve last-in, first-out: a reply happens before the thing it answers.',
  ],

  tips: [
    'Play a land every turn you can; missed land drops lose more games than anything else.',
    'Before attacking, check the opponent’s possible blockers and what their untapped mana could cast.',
    'New to deckbuilding? Try Limited: open boosters and build a 40-card deck on the spot.',
  ],

  extended: [
    { title: 'Card types', items: [
      '{=land} **Land**: not a spell. One per turn, in your main phase with an empty stack. A basic land taps for 1 mana of its colour.',
      '{=creature} **Creature**: a permanent with power/toughness that attacks and blocks. Cast at sorcery speed (your main phase, empty stack).',
      '{=sorcery} **Sorcery** / {=instant} **Instant**: one-shot effects, then to the graveyard. Sorceries only in your main phase; instants any time you have priority.',
      '{=enchantment} **Enchantment** / {=artifact} **Artifact**: permanents with ongoing effects. Auras attach to something; Equipment is an artifact you pay to attach to your creature.',
      '**Planeswalker**: has loyalty. Activate 1 loyalty ability per turn at sorcery speed. Opponents can attack it; damage removes loyalty.',
      '**Legendary**: you control at most 1 permanent with a given legendary name; if you get a second, keep one.',
    ] },
    { title: 'The stack & responding', text: 'Casting a spell or activating an ability puts it on **the stack**; it does nothing yet. Both players may respond with instants or abilities, which go on top. When both pass in a row, the **top** item resolves, then both get priority again. The last thing cast happens first: if your opponent casts removal on your creature, you can respond with a pump spell that resolves before it. Lands, mana abilities and combat damage don’t use the stack. A spell whose target is gone when it resolves does nothing.' },
    { title: 'Combat in detail', items: [
      'Steps: **beginning of combat** → **declare attackers** (tap them) → **declare blockers** → **combat damage** → end of combat. Players can cast instants in each step.',
      'Each blocker blocks 1 attacker; several blockers may gang up on one attacker, whose controller divides its damage among them.',
      '**First strike** deals damage in an earlier damage step; if it kills its opponent, it takes no damage back. **Double strike** deals damage in both steps.',
      '**Trample**: damage beyond lethal to the blockers goes through to the player.',
      '**Deathtouch**: any damage it deals is lethal. With trample, 1 damage per blocker counts as lethal.',
      '**Flying**: blockable only by flying or **reach** creatures. **Menace**: needs 2+ blockers. **Vigilance**: attacks without tapping.',
      'Damage stays on a creature until end of turn, so two small hits in one turn add up.',
    ] },
    { title: 'Common keywords', items: [
      '**Haste**: can attack and {=t} the turn it arrives.',
      '**Flash**: may be cast any time you could cast an instant.',
      '**Lifelink**: damage it deals also gains you that much life.',
      '**Defender**: can’t attack.',
      '**Hexproof**: opponents’ spells and abilities can’t target it. **Ward**: an opponent targeting it must pay the ward cost or the spell is countered.',
      '**Indestructible**: not destroyed by damage or “destroy” effects (it can still be exiled or shrunk to 0 toughness).',
      '**Counter** a spell: remove it from the stack before it resolves; it goes to the graveyard.',
    ] },
    { title: 'Mana & colours', items: [
      'Five colours: {=w} **white** (Plains), {=u} **blue** (Island), {=b} **black** (Swamp), {=r} **red** (Mountain), {=g} **green** (Forest), plus {=c} colourless.',
      'A cost of {=2}{=g} needs 1 green mana plus 2 of any kind. The total (3) is the card’s **mana value**.',
      'Unused mana empties at the end of each step and phase, so tap lands only when you need them.',
      'Colour strengths: {=w} protection and wide boards, {=u} card draw and counterspells, {=b} removal at a cost, {=r} fast damage, {=g} big creatures and extra lands.',
    ] },
    { title: 'Formats', items: [
      '**Standard**: 60+ card decks, up to 4 copies, sideboard of up to 15, only recent sets (older sets rotate out).',
      '**Pioneer / Modern / Legacy**: same deck rules with ever larger, non-rotating card pools.',
      '**Commander**: 100 cards, 1 copy of each (except basic lands), led by a legendary creature in the **command zone**. 40 life, usually 4 players. Cards must match the commander’s colours; each recast from the command zone costs {=2} more; 21 combat damage from one commander knocks a player out.',
      '**Limited** (draft or sealed): build a deck from boosters opened on the day. 40-card minimum, free basic lands, 20 life.',
    ] },
    { title: 'Building a deck', items: [
      'About **24 lands** in 60 cards (17 in 40-card Limited).',
      'Start with **1–2 colours** so your lands produce what your spells need.',
      'Watch your **mana curve**: many 2- and 3-mana cards so you have a play every turn, and only a few expensive ones.',
      'Typical mix: 15–20 creatures, some removal, a few tricks. Run 4 copies of your best card so it shows up more often.',
      '**Mulligan** (London): if your opening 7 are unplayable, shuffle them back and draw 7 again; when you keep, put 1 card on the bottom per mulligan taken.',
    ] },
    { title: 'Zones', text: 'Cards move between **library** (your deck), **hand**, **battlefield** (permanents in play), **graveyard** (used spells and dead creatures, face up and public), **exile** (removed from the game) and **the stack**. Commander adds the **command zone**. Many cards care about zones, e.g. returning a creature from your graveyard to the battlefield.' },
  ],

  walk(A) {
    const C = A.C, I = this.icons, G = '#3c8d4f', R = '#c8423b', U = '#2f6db5', SYM = { [G]: 'g', [R]: 'r', [U]: 'u' };
    let base = A.bg('#2f3b46') + A.rect(4, 4, 312, 92, '#3d4b58', { rx: 8, sw: 0 }) + A.rect(4, 104, 312, 92, '#45535f', { rx: 8, sw: 0 }) + A.line(10, 100, 310, 100, { stroke: '#c8b88a', sw: 1, dash: '4 4' });
    const land = (cx, cy, f, tap) => { const s = A.card(cx - 11, cy - 15, 22, 30, f, { face: '#1f1f1f' }) + A.use(I[SYM[f]].draw(A), cx - 7, cy - 7, 14); return tap ? A.group(s, `rotate(90 ${cx} ${cy})`) : s; };
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
      { step: 0, say: 'Your turn: **untap** everything, then **draw**. You draw an instant.', svg: base + opp('20') + lands([]) + wall(110, 58) +
        wolf(134, 132, '2/2') + elf(174, 132) + A.k('h-mtn', land(...HD(0), R)) + A.k('h-bear', spell(...HD(1), G, 'Bear', '3/3')) + strike(...HD(2)) + A.glow(246, 178, 20, 'g-draw') },
      { step: 1, say: 'Main phase: play **one land**. The Mountain goes onto the battlefield.', svg: base + opp('20') + lands([]) + wall(110, 58) +
        wolf(134, 132, '2/2') + elf(174, 132) + mtn(false) + A.k('h-bear', spell(...HD(1), G, 'Bear', '3/3')) + strike(...HD(2)) },
      { step: 1, say: 'Tap 3 Forests ({=g}{=g}{=g}) to cast a **3/3 Bear**. It is summoning sick: no attacking this turn.', svg: base + opp('20') + lands([0, 1, 2]) + wall(110, 58) +
        wolf(134, 132, '2/2') + elf(174, 132) + mtn(false) + bear + strike(...HD(2)) + A.glow(214, 132, 26, 'g-bear') },
      { step: 2, say: '**Attack** with the Wolf (2/2) and Elf (2/1); they tap. The opponent blocks the Wolf with a **1/4 Wall**.', svg: base + opp('20') + lands([0, 1, 2]) + wall(150, 50) +
        wolf(150, 88, '2/2', true) + elf(226, 88, true) + mtn(false) + bear + strike(...HD(2)) + A.arrow(244, 80, 274, 40, { stroke: '#e2b33c', sw: 2.4 }) },
      { step: 2, say: 'No one would die, so tap the Mountain ({=r}) for an **instant**: the Wolf gets +3/+0 and becomes 5/2.', svg: base + opp('20') + lands([0, 1, 2]) + wall(150, 50) +
        wolf(150, 88, '5/2', true, true) + elf(226, 88, true) + mtn(true) + bear + strike(80, 74) + A.arrow(94, 78, 130, 86, { stroke: '#e2b33c', sw: 2 }) },
      { step: 2, say: 'Damage: 5 destroys the Wall, its 1 damage doesn’t kill the Wolf, and the unblocked Elf hits for **2**: 20 → 18.', svg: base + opp('18') + lands([0, 1, 2]) +
        wolf(150, 88, '5/2', true, true) + elf(226, 88, true) + mtn(true) + bear + A.glow(290, 26, 20, 'g-life') },
      { step: 4, say: '**End**: +3/+0 and damage wear off. Your attackers stay tapped until your next untap.', svg: base + opp('18') + lands([0, 1, 2]) +
        wolf(134, 132, '2/2', true) + elf(176, 132, true) + mtn(true) + bear },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
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
      const s = A.card(x, y, 24, 32, f, { face: '#1f1f1f' }) + A.use(I[f === '#2f6db5' ? 'u' : 'g'].draw(A), x + 4.5, y + 8.5, 15);
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
