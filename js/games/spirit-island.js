defineGame({
  id: 'spirit-island',
  name: 'Spirit Island',
  year: 2017,
  designer: 'R. Eric Reuss',
  family: 'coop',
  players: [1, 4], best: '2',
  time: [90, 120],
  age: 13,
  mechanics: ['cooperative', 'area-control', 'variable-powers', 'hand-management', 'engine-building', 'simultaneous'],
  profile: { complexity: 4, luck: 2, interaction: 4, conflict: 1, talk: 4, planning: 5 },
  color: '#3f7a3a',

  // Pieces, tokens and elements, drawn once and reused inline ({town}) and in art / walk.
  icons: {
    explorer: { name: 'explorer', draw: A => A.line(12, 10, 12, 2.5, { sw: 2 }) + A.circle(12, 15.5, 6.5, '#d9d2c3', { sw: 1.4 }) },
    town: { name: 'town', draw: A => A.house(12, 21.5, 19, '#c8423b') },
    city: { name: 'city', draw: A => A.city(13.2, 21.5, 18, '#c8423b') },
    dahan: { name: 'Dahan', draw: A => A.person(12, 10.5, 19, '#a0603a') },
    blight: { name: 'blight', draw: A => A.star(12, 12.5, 11.5, '#3b2b3e', { stroke: '#d9c6e8', sw: 1 }) },
    presence: { name: 'presence', draw: A => A.circle(12, 12, 10, '#fff', { sw: 1 }) + A.circle(12, 12, 7.5, '#3d8ee0', { sw: 0 }) },
    fear: { name: 'Fear', draw: A => A.circle(12, 12, 10, '#9a6fd6', { sw: 1.3 }) + A.circle(8.6, 10, 2, '#2a1d3a', { sw: 0 }) + A.circle(15.4, 10, 2, '#2a1d3a', { sw: 0 }) + A.path('M8.2 17 q3.8 -3.6 7.6 0', { stroke: '#2a1d3a', sw: 1.6 }) },
    energy: { name: 'energy', draw: A => A.circle(12, 12, 10, '#e2b33c', { sw: 1.3 }) + A.path('M12 6.5 a5.5 5.5 0 1 1 -5.5 5.5 a2.8 2.8 0 0 1 5.5 0', { stroke: '#7a5a10', sw: 1.5 }) },
    fast: { name: 'Fast', draw: A => A.circle(12, 12, 10, '#e07b2e', { sw: 1.3 }) + A.poly([[13.5, 3.8], [7, 13.5], [11.4, 13.5], [10, 20.2], [17, 10.4], [12.6, 10.4]], '#fff', { sw: 0.7 }) },
    slow: { name: 'Slow', draw: A => A.circle(12, 12, 10, '#2f6db5', { sw: 1.3 }) + A.poly([[8, 6.5], [16, 6.5], [12, 12], [16, 17.5], [8, 17.5], [12, 12]], '#fff', { sw: 0.7 }) },
    sun: { name: 'Sun', draw: A => [0, 45, 90, 135, 180, 225, 270, 315].map(d => { const r = d * Math.PI / 180; return A.line(+(12 + 7.5 * Math.cos(r)).toFixed(2), +(12 + 7.5 * Math.sin(r)).toFixed(2), +(12 + 10.8 * Math.cos(r)).toFixed(2), +(12 + 10.8 * Math.sin(r)).toFixed(2), { stroke: '#d99a12', sw: 2 }); }).join('') + A.circle(12, 12, 5.6, '#f5c732', { sw: 1.2 }) },
    moon: { name: 'Moon', draw: A => A.path('M15 2.8 A9.6 9.6 0 1 0 21.4 16.2 A7.4 7.4 0 0 1 15 2.8z', { fill: '#aab3dd', sw: 1.2 }) },
    fire: { name: 'Fire', draw: A => A.path('M12 22 C6.5 22 4.5 17 7.2 12.2 C8 14.8 9.6 15.2 10 14 C9 10 11 6 14.6 2.5 C14.4 7.4 19.6 10.4 19 16.2 C18.6 19.8 15.6 22 12 22z', { fill: '#e2552b', sw: 1.2 }) + A.path('M12 21 C9.6 21 8.6 18.6 10 16.4 C10.6 17.6 11.6 17.6 11.6 16.6 C11.4 14.6 12.4 13 14 11.6 C14 14.2 16 15.6 15.6 18 C15.2 20 13.8 21 12 21z', { fill: '#f7c843', sw: 0 }) },
    air: { name: 'Air', draw: A => A.path('M2.5 9 h11.5 a3.2 3.2 0 1 0 -3.2 -3.2', { stroke: '#8f7cc4', sw: 2.2 }) + A.path('M2.5 14 h15.5 a3.2 3.2 0 1 1 -3.2 3.2', { stroke: '#8f7cc4', sw: 2.2 }) + A.path('M4.5 19 h6', { stroke: '#8f7cc4', sw: 2.2 }) },
    water: { name: 'Water', draw: A => A.path('M12 2.5 C12 2.5 5 11.2 5 15.5 a7 7 0 0 0 14 0 C19 11.2 12 2.5 12 2.5z', { fill: '#3a8fd6', sw: 1.2 }) + A.path('M8.6 15.6 a3.4 3.4 0 0 0 3 3.4', { stroke: '#cfe6f8', sw: 1.4 }) },
    earth: { name: 'Earth', draw: A => A.poly([[2.5, 20.5], [8, 9], [11, 13], [15, 4.5], [21.5, 20.5]], '#8c7a62', { sw: 1.2 }) + A.poly([[15, 4.5], [17, 9.5], [13.8, 7.4]], '#d8cdb8', { sw: 0 }) },
    plant: { name: 'Plant', draw: A => A.path('M4.5 19.5 C4.5 9.5 11 3.5 20.5 3.5 C20.5 13 14 19.5 4.5 19.5z', { fill: '#4f9a3c', sw: 1.2 }) + A.line(4.5, 19.5, 15.5, 8.5, { stroke: '#d6ecc8', sw: 1.2 }) },
    animal: { name: 'Animal', draw: A => A.circle(12, 16.5, 4.8, '#c0473a', { sw: 1.1 }) + [[5.8, 11], [9.6, 6.4], [14.4, 6.4], [18.2, 11]].map(([x, y]) => A.circle(x, y, 2.4, '#c0473a', { sw: 1 })).join('') },
  },

  pitch: 'Co-op: play power cards to destroy invaders and earn Fear until they leave, before blight overruns the island.',

  goal: { big: 'Drive them out', text: 'Destroy invaders and earn **Fear** cards. You win the moment the island meets the goal for the current Terror level: level 1, no invaders at all; level 2, no {=town} or {=city}; level 3, no {=city}. Earning the last Fear card also wins.' },

  turn: {
    type: 'round',
    intro: 'Each round has these phases, in order. In the spirit steps, all players act at the same time:',
    outro: 'Then a new round starts.',
    steps: [
      { verb: 'Grow', text: 'Each spirit picks 1 **Growth** option (e.g. add a {=presence}, gain a Power card, reclaim cards), gains {energy} equal to the highest number uncovered on its Energy track, then chooses Power cards to play (up to its Card Plays number) and pays their energy costs.' },
      { verb: 'Fast powers', text: 'Resolve every {fast} power (played cards and unlocked innate powers) **before** the invaders act, in any order the players choose.' },
      { verb: 'Invaders', text: 'Resolve earned {=fear} Fear cards. Then invaders **Ravage** in the lands named by the Ravage card, **Build** in the lands on the Build card, and **Explore** in the lands on a newly flipped card. Then each invader card slides 1 slot left.' },
      { verb: 'Slow powers', text: 'Resolve every {slow} power **after** the invaders act, in any order.' },
      { verb: 'Time passes', text: 'Discard the Power cards played this round; all damage on invaders and {=dahan} heals.' },
    ],
  },

  tension: 'Each round: grow your spirit for later, or spend everything now to stop the next Ravage.',

  structure: [
    { label: 'Setup', text: 'Set out island boards, starting pieces, the Blight card, the Fear pool, and the invader and Fear decks. Flip the first invader card, **Explore**, then move that card to the Build slot.' },
    { label: 'Spirits', repeat: 'round', text: 'All at once, each spirit: picks 1 Growth option; gains {=energy} equal to the highest uncovered Energy track number; chooses Power cards from hand, no more than its Card Plays number, and pays their energy costs.' },
    { label: 'Fast', repeat: 'round', text: 'Resolve {fast} Power cards and Fast innate powers, in any order the players choose.' },
    { label: 'Invaders', repeat: 'round', text: 'Blighted Island effect (if flipped) → earned {=fear} Fear cards → **Ravage** → **Build** → **Explore** → invader cards slide 1 slot left.' },
    { label: 'Slow, cleanup', repeat: 'round', text: 'Resolve {slow} Power cards and Slow innate powers. Time passes: discard played cards; all damage heals.' },
    { label: 'Game end', text: 'Win or lose the **moment** a condition below is met, even mid-round.' },
  ],

  end: {
    trigger: 'the invaders are driven off, or the island falls',
    detail: 'The Fear pool starts with 4 {=fear} per player. Each time its last token is taken, the team earns 1 Fear card and the pool refills. After every 3 Fear cards earned, the Terror level rises by 1.',
    results: [
      { side: 'Spirits win', text: 'at once: at Terror level 1 when no invaders are on the island; at level 2 when no {=town} or {=city} are; at level 3 when no {=city} are; or on earning the last Fear card.' },
      { side: 'Spirits lose', text: 'at once if **{=blight} runs out** on the Blight card after it has been flipped to Blighted Island, any spirit has no {=presence} left on the island, or an invader card must be flipped and the deck is empty.' },
    ],
  },

  ref: {
    title: 'Pieces',
    rows: [
      ['{explorer}', '1 health · deals 1 damage'],
      ['{town}', '2 health · deals 2 damage · destroying one earns 1 {=fear}'],
      ['{city}', '3 health · deals 3 damage · destroying one earns 2: {=fear}{=fear}'],
      ['{dahan}', '2 health · each one that survives a Ravage deals 2 damage back'],
      ['{blight}', '1 is added to a land that takes 2 or more damage in one Ravage'],
      ['Elements', '{=sun}{=moon}{=fire}{=air}{=water}{=earth}{=plant}{=animal}'],
    ],
  },

  example: 'The card in the Ravage slot shows Wetland, where {=explorer}, {=town} and {=dahan}{=dahan} stand. A spirit plays a {=fast} power: 2 damage destroys the **town** (1 {=fear} is earned). The Ravage then deals only 1 damage (from the explorer), so **no blight** is added and no Dahan is destroyed; both Dahan strike back for 2 damage each, destroying the explorer.',

  setup: [
    'Pick spirits (first game: Lightning’s Swift Strike, River Surges in Sunlight, Vital Strength of the Earth or Shadows Flicker Like Flame); lay out 1 island board per player. Each spirit takes its 4 unique Power cards into hand, places its starting {=presence} as shown on the back of its panel, and puts its other presence discs on the spaces of its 2 presence tracks.',
    'Place the invaders, {=dahan} and {=blight} printed on each land. Put as many {=blight} on the Blight card as it shows, and 4 {=fear} per player in the Fear pool.',
    'Build the face-down invader deck: shuffle each stage’s cards **separately**, take 3 stage I, 4 stage II and 5 stage III at random (return the 1 left over of each stage to the box), and stack them with stage I on top, then II, then III. Build the Fear deck: 9 face-down Fear cards, with a Terror level divider under the 3rd card and another under the 6th. Flip the top invader card, **Explore** its lands, and move the card to the Build slot.',
  ],

  terms: [
    ['{=presence} Presence', 'Your discs on the island. Your powers target lands within range of them. Each disc taken off a track and placed uncovers a space giving more energy or more card plays.'],
    ['{=dahan} Dahan', 'Neutral pieces that strike back at invaders after a Ravage in their land.'],
    ['{=fear} Fear', 'Tokens earned by destroying towns and cities, and from some powers. Each time the Fear pool empties, the team earns a Fear card, which hampers the invaders once.'],
    ['{=blight} Blight', 'Added to a land that takes 2 or more damage in one Ravage. If the Blight card runs out after being flipped, you lose.'],
    ['Elements', 'Symbols on Power cards ({=sun}{=water}{=plant}…). Having enough of them among the cards you played this round unlocks your spirit’s **innate** powers.'],
  ],

  gotchas: [
    'In the invader phase, Ravage resolves first, then Build, then Explore. Then each card **slides 1 slot left**, so the Build card shows where next round’s Ravage will hit.',
    'Blight added to a land that already has blight **cascades**: add 1 more {=blight} to an adjacent land. Each blight added to a land also destroys 1 {=presence} of each spirit in that land.',
    'Played Power cards go to your discard pile and stay there until you pick a Growth option that says **Reclaim**.',
  ],

  tips: [
    'Spend the first 2–3 rounds mostly **growing**; spirits start weak.',
    'The Build card shows where next round’s Ravage will hit.',
    'Push invaders into lands with {=dahan}; it is often cheaper than destroying them yourself.',
  ],

  extended: [
    { title: 'Invader cards and the Explore → Build → Ravage cycle', items: [
      'The invader deck has **3 stage I**, **4 stage II** and **5 stage III** cards, after removing 1 card of each stage at random. Stage I and II cards name 1 terrain (one stage II card names Coastal Lands instead); stage III cards name 2 terrains. Ignore escalation symbols unless playing an adversary.',
      '**Explore**: flip the top card into the Explore slot. Add 1 {=explorer} to each land of the named terrain that is **coastal** (touches the ocean), has a {=town} or {=city}, or is next to a land with a {=town} or {=city}.',
      '**Build**: in each land of the named terrain that has **at least 1** invader, add a {=city} if that land has more towns than cities; otherwise add a {=town}.',
      '**Ravage**: in each land of the named terrain that has invaders, add up their damage ({=explorer} 1, {=town} 2, {=city} 3). That total is dealt to the **land**, and the same total is dealt to the {=dahan} there.',
      'After Explore, every card **slides 1 slot left** (Explore slot → Build slot → Ravage slot → discard pile), so you always see 1 round ahead.',
    ] },
    { title: 'Ravage in detail', items: [
      'If the land takes **2 or more** damage, add 1 {=blight}. **Defend X**: for the rest of the turn, whenever invaders deal damage in that land, reduce the damage to the land by X and the damage to the {=dahan} by X. Several Defends in one land add up.',
      'Invader damage to {=dahan} is assigned to destroy as many as possible; each has **2 health**.',
      'Each surviving Dahan then **strikes back** for 2 damage to invaders in that land; the players choose how to split it among the invaders.',
      'Damage lasts until Time Passes: a {=fast} power that deals 1 damage to a {=town} leaves 1 health for the Dahan to finish.',
    ] },
    { title: 'Fear and Terror levels', items: [
      'The Fear pool holds **4 {=fear} per player**. A destroyed {=town} gives **1**, a {=city} **2**; many powers give Fear directly.',
      'Each time the pool empties, move the top Fear card face down to the **earned** pile and refill the pool. Earned cards resolve in the Fear step at the start of the next invader phase.',
      'The Fear deck has 9 cards, split into **Terror levels 1–3** (3 / 3 / 3 by default). Each Fear card has a stronger effect at higher Terror.',
      'Victory: at Terror level 1, no invaders on the island; at level 2, no {=town} or {=city}; at level 3, no {=city}. Earning the last Fear card wins at once.',
    ] },
    { title: 'Blight and the Blighted Island', items: [
      'The Blight card starts with as many {=blight} as it shows. Each time blight is added to a land, also **destroy 1 {=presence}** of each spirit in that land.',
      'Adding blight to a land that already has blight **cascades**: add 1 more to an adjacent land of your choice (which can cascade again).',
      'When the last {=blight} leaves the Blight card, follow its text: usually **flip it** to the Blighted Island side, put on it the number of blight printed there, and apply any harsher rule it adds. If it empties again, the spirits lose.',
      'Blight removed from the island returns to the Blight card.',
    ] },
    { title: 'Presence, tracks and Growth', items: [
      'Each spirit has 2 **presence tracks**: Energy (gain the highest uncovered {=energy} value each round) and Card Plays (how many Power cards you may play).',
      'Taking a {=presence} off a track to place it on the island uncovers that track space. Some uncovered spaces grant an **element** every round or a one-time Reclaim.',
      'A land with 2 or more of one spirit’s presence is that spirit’s **sacred site**, which some powers require or reward.',
      'Pick **1** Growth option per round (some spirits pick 2). Reclaim returns your discarded Power cards to your hand. Gaining a power: choose the Minor or Major deck, draw 4 cards, keep 1 in your hand and put the other 3 on that deck’s discard pile; taking a Major also makes you forget (permanently remove) 1 of your Power cards.',
    ] },
    { title: 'Elements and innate powers', items: [
      'Power cards show **elements**: {sun}, {moon}, {fire}, {air}, {water}, {earth}, {plant}, {animal}. Count those on the cards you played this round plus any from your tracks.',
      'Your spirit board’s **innate powers** list thresholds such as "2 {=water} 1 {=plant}". Meeting a threshold unlocks that tier this round, at no energy cost.',
      'Innates have their own speed and resolve once per round, using every tier you unlocked.',
    ] },
    { title: 'Fast vs Slow, range and targeting', items: [
      '{fast} powers resolve **before** the invaders (stop the coming Ravage); {slow} powers resolve **after** (set-up and clean-up). Pay for all cards at once, then resolve by speed.',
      'Range is the most land-to-land steps the target may be from one of your **{=presence}** (or from your sacred site if the power says so); **range 0** means a land where you have presence; Oceans are not lands unless a spirit says otherwise.',
      'Push moves pieces from the target land to adjacent lands of your choice; Gather moves pieces from adjacent lands into the target land. Build needs at least 1 invader, so pushing every invader out of a land before its Build stops that Build.',
    ] },
    { title: 'Optional score (to compare games)', items: [
      'Win: 5 × difficulty + 10 + 2 per card left in the invader deck. Loss: 2 × difficulty + 1 per invader card out of the deck (discarded or face up in the slots).',
      'Either way, with X = number of players: +1 for every X {=dahan} on the island, −1 for every X {=blight} on the island.',
    ] },
  ],

  walk(A) {
    const C = A.C, I = this.icons;
    // Icon centred at (x, y), `s` px wide: same drawings as the inline icons.
    const at = (k, x, y, s) => A.use(I[k].draw(A), x - s / 2, y - s / 2, s);
    const T = { wet: '#5aa8a0', jun: '#3f7a3a', mtn: '#9a9389' };
    let base = A.bg('#4f8fb8');
    base += A.poly([[12, 18], [96, 10], [104, 82], [18, 92]], T.wet, { stroke: '#f3ead2', sw: 2 });
    base += A.poly([[96, 10], [188, 22], [184, 92], [104, 82]], T.jun, { stroke: '#f3ead2', sw: 2 });
    base += A.poly([[18, 92], [104, 82], [184, 92], [168, 140], [28, 140]], T.mtn, { stroke: '#f3ead2', sw: 2 });
    const lab = (x, y, s) => A.text(x, y, s, { size: 7.5, fill: '#fff', weight: 800, spacing: 0.5 });
    base += lab(34, 24, 'Wetland') + lab(168, 30, 'Jungle') + lab(60, 132, 'Mountain');
    // Invader board + fear + blight (right panel).
    base += A.rect(200, 4, 116, 142, '#2a3d4f', { rx: 6, sw: 1.2 });
    const pl = (x, y, s, o = {}) => A.text(x, y, s, { size: o.size || 6.5, fill: '#e8eef4', weight: 700, anchor: o.anchor });
    base += pl(220, 13, 'Ravage') + pl(258, 13, 'Build') + pl(296, 13, 'Explore');
    base += A.rect(279, 21, 34, 38, '#3c4c5c', { rx: 4, sw: 1, stroke: '#7d8c99' }) + pl(296, 40, 'deck', { size: 6 });
    base += A.line(204, 67, 312, 67, { stroke: '#4d6175', sw: 1 });
    base += pl(222, 76, 'Fear pool') + pl(292, 76, 'Generated');
    base += A.line(204, 110, 312, 110, { stroke: '#4d6175', sw: 1 });
    base += at('blight', 220, 128, 18) + pl(234, 128, 'Blight left: 5', { size: 7.5, anchor: 'start' });
    // Spirit panel (bottom).
    base += A.rect(0, 148, 320, 52, '#f3ead2', { rx: 0, sw: 0 }) + A.line(0, 148, 320, 148, { sw: 1.5 });
    base += A.tag(32, 158, 'Your spirit', { fill: C.blue });
    base += A.text(14, 175, 'Energy', { size: 6, anchor: 'start' }) + A.text(14, 191, 'Plays', { size: 6, anchor: 'start' });
    const tr = (i, row) => [44 + i * 15, row ? 191 : 175];
    for (let i = 0; i < 4; i++) {
      base += A.circle(...tr(i, 0), 6, '#e2b33c', { sw: 0.8 }) + A.text(...tr(i, 0), [1, 2, 2, 3][i], { size: 6.5, weight: 800 });
      base += A.circle(...tr(i, 1), 6, '#cfc6b2', { sw: 0.8 }) + A.text(...tr(i, 1), [1, 2, 2, 3][i], { size: 6.5, weight: 800 });
    }
    base += A.text(124, 160, 'Energy', { size: 6 });

    const pres = (x, y) => at('presence', x, y, 13);
    const explorer = (x, y) => at('explorer', x, y - 3.5, 16);
    const town = (x, y) => at('town', x, y - 7, 18);
    const dahan = (x, y) => at('dahan', x, y, 18);
    const fear = (x, y) => at('fear', x, y, 12);
    const inv = (x, fill, s) => A.card(x - 2, 21, 34, 38, fill, { label: s, size: 5.2, labelFill: '#fff' });
    const dmg = (x, y, s) => A.rect(x - 17, y - 6, 34, 12, '#ffcf3f', { rx: 6, sw: 1 }) + A.text(x, y, s, { size: 7, weight: 800 });
    const coin = (n) => A.circle(124, 177, 10, '#e2b33c', { sw: 1.2 }) + A.text(124, 177.5, n, { size: 10, weight: 800 });
    const power = (x, fast) => {
      const y = 153, col = fast ? '#e07b2e' : '#2f6db5';
      return A.rect(x + 1.5, y + 2, 40, 42, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, 40, 42, '#fbf6ec', { rx: 4, sw: 1.2 }) +
        A.rect(x + 2, y + 2, 36, 11, col, { rx: 3, sw: 0 }) + A.text(x + 20, y + 7.5, fast ? 'FAST' : 'SLOW', { size: 5.6, fill: '#fff', weight: 800 }) +
        A.circle(x + 8, y + 7.5, 4.5, '#e2b33c', { sw: 0.8 }) + A.text(x + 8, y + 8, fast ? 1 : 2, { size: 6, weight: 800 }) +
        at(fast ? 'fast' : 'slow', x + 33, y + 7.5, 9) +
        A.text(x + 20, y + 22, fast ? '2 Damage' : 'Push 1', { size: 6, weight: 800 }) + A.text(x + 20, y + 30, fast ? 'range 1' : 'explorer', { size: 6, weight: 600 }) +
        at(fast ? 'fire' : 'air', x + 14, y + 37, 8) + at(fast ? 'water' : 'moon', x + 26, y + 37, 8);
    };
    const hand = (i) => 228 + i * 46, played = (i) => 146 + i * 44;

    const presOld = A.k('p0', pres(132, 60)) + A.k('pE1', pres(...tr(1, 0))) + A.k('pE2', pres(...tr(2, 0))) + A.k('pE3', pres(...tr(3, 0))) + A.k('pC2', pres(...tr(2, 1))) + A.k('pC3', pres(...tr(3, 1)));
    const pC1track = A.k('pC1', pres(...tr(1, 1)));
    const pC1land = A.k('pC1', pres(148, 64));
    const wetland = A.k('d1', dahan(46, 72)) + A.k('d2', dahan(76, 70));
    const wExp = A.k('wexp', explorer(40, 50)), wTown = A.k('wtown', town(66, 58));
    const mExp = A.k('mexp', explorer(130, 118));
    const pool = (n) => [0, 1, 2, 3].slice(0, n).map(i => A.k('f' + i, fear(214 + i * 13, 92))).join('');
    const earned = A.k('f3', fear(292, 92));
    const cardsStart = A.k('c-wet', inv(205, T.wet, 'Wetland')) + A.k('c-mtn', inv(243, T.mtn, 'Mountain'));
    const cardsNext = A.k('c-mtn', inv(205, T.mtn, 'Mountain')) + A.k('c-jun', inv(243, T.jun, 'Jungle'));
    const handCards = A.k('fast', power(hand(0), true)) + A.k('slow', power(hand(1), false));
    const playCards = A.k('fast', power(played(0), true)) + A.k('slow', power(played(1), false));
    const after = base + presOld + pC1land + wetland;

    return [
      { step: 0, say: 'Round start. Your Card Plays track shows **1**, so you may play 1 card. The Wetland card is in the **Ravage** slot: invaders in the Wetland ravage this round.',
        svg: base + presOld + pC1track + wetland + wTown + wExp + mExp + pool(4) + cardsStart + handCards + A.k('coin', coin(2)) + A.glow(220, 40, 20, 'g-card') },
      { step: 0, say: '**Grow:** take a {=presence} off the Card Plays track and place it in the Jungle. That uncovers a 2, so you may play **2** cards. Gain 1 {=energy}: the highest uncovered Energy space shows 1.',
        svg: after + wTown + wExp + mExp + pool(4) + cardsStart + handCards + A.k('coin', coin(3)) + A.glow(148, 64, 11, 'g-pres') + A.glow(...tr(1, 1), 8, 'g-track') },
      { step: 0, say: 'Choose and pay for both cards at once (3 {=energy} total): a {=fast} 2-damage power (cost 1) and a {=slow} push (cost 2).',
        svg: after + wTown + wExp + mExp + pool(4) + cardsStart + playCards + A.k('coin', coin(0)) + A.glow(124, 177, 13, 'g-coin') },
      { step: 1, say: '{=fast} powers resolve before the invaders. 2 damage destroys the Wetland {=town}: 1 {=fear} moves from the pool to Generated.',
        svg: after + wExp + mExp + pool(3) + earned + cardsStart + playCards + A.k('coin', coin(0)) + A.k('dmg', dmg(66, 40, '2 dmg')) + A.glow(60, 52, 26, 'g-wet') + A.glow(292, 92, 9, 'g-fear') },
      { step: 2, say: '**Ravage** the Wetland: 1 {=explorer} deals 1 damage to the land and the {=dahan}. That is under 2, so **no blight**, and no Dahan dies. Both strike back for 2 damage each, destroying the explorer.',
        svg: after + mExp + pool(3) + earned + cardsStart + playCards + A.k('coin', coin(0)) + A.k('dmg2', dmg(62, 38, 'Dahan: 4')) + A.glow(220, 40, 20, 'g-card') + A.glow(62, 70, 22, 'g-wet') },
      { step: 2, say: '**Build** in the Mountain: it has an {=explorer} and no towns, so add a {=town}. Flip the next invader card: **Explore** the Jungle. Then every invader card slides 1 slot left.',
        svg: after + mExp + A.k('mtown', town(108, 122)) + A.k('jexp', explorer(162, 76)) + pool(3) + earned + cardsNext + playCards + A.k('coin', coin(0)) + A.glow(116, 118, 20, 'g-mtn') + A.glow(162, 72, 13, 'g-jun') },
      { step: 3, say: '{=slow} Your push moves the Jungle explorer into the Wetland, so next round’s Jungle **Build** finds no invaders. Time passes: played cards are discarded and damage heals.',
        svg: after + mExp + A.k('mtown', town(108, 122)) + A.k('jexp', explorer(84, 46)) + pool(3) + earned + cardsNext + A.k('coin', coin(0)) + A.glow(84, 44, 14, 'g-push') + A.glow(258, 40, 20, 'g-card2') },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons;
    const at = (k, x, y, s) => A.use(I[k].draw(A), x - s / 2, y - s / 2, s);
    const T = { mtn: '#9a9389', jun: '#3f7a3a', wet: '#5aa8a0', snd: '#e3cf9a' };
    let o = A.bg('#4f8fb8');
    // waves
    for (const [x, y] of [[14, 160], [200, 178], [236, 12], [10, 22], [120, 186]]) o += A.path(`M${x} ${y} q5 -4 10 0 q5 4 10 0`, { stroke: '#cfe6f2', sw: 1.2, opacity: 0.7 });
    // island lands
    const L = [
      [T.mtn, [[30, 40], [90, 22], [110, 62], [70, 86], [26, 76]]],
      [T.jun, [[90, 22], [160, 16], [172, 56], [110, 62]]],
      [T.wet, [[160, 16], [222, 30], [228, 82], [172, 56]]],
      [T.snd, [[26, 76], [70, 86], [80, 142], [34, 130]]],
      [T.jun, [[70, 86], [110, 62], [172, 56], [150, 112], [80, 142]]],
      [T.mtn, [[172, 56], [228, 82], [212, 136], [150, 112]]],
      [T.wet, [[80, 142], [150, 112], [212, 136], [184, 162], [100, 168]]],
    ];
    for (const [f, pts] of L) o += A.poly(pts, f, { stroke: '#f3ead2', sw: 2 });
    // pieces (same drawings as the inline icons)
    const explorer = (x, y) => at('explorer', x, y - 3, 14);
    const blight = (x, y) => at('blight', x, y, 16);
    const dahan = (x, y) => at('dahan', x, y, 16);
    const pres = (x, y) => at('presence', x, y, 14);
    const town = (x, y, s) => at('town', x, y - s / 2, s * 1.2);
    // wetland top-right: ravage target
    o += explorer(190, 46) + town(206, 58, 13) + dahan(196, 66) + dahan(212, 70);
    // jungle centre: presence + sacred site
    o += pres(118, 88) + pres(130, 92) + pres(150, 30);
    // mountain right: city + blight
    o += at('city', 196, 104, 20) + blight(178, 102);
    // sands: dahan + explorer
    o += dahan(52, 108) + explorer(60, 124);
    // mountain left: town
    o += town(64, 56, 12) + explorer(48, 54);
    // lower wetland: blight
    o += blight(122, 148) + explorer(150, 140);
    // invader board
    o += A.rect(238, 8, 76, 160, '#2a3d4f', { rx: 6, sw: 1.2 });
    const slot = (y, lab, fill) => A.text(276, y, lab, { size: 8.5, fill: '#e8eef4', weight: 700 }) + A.card(252, y + 7, 48, 32, fill, {});
    o += slot(18, 'RAVAGE', T.wet) + slot(64, 'BUILD', T.mtn) + slot(110, 'EXPLORE', '#4a5a6a');
    o += A.text(276, 133, '?', { size: 16, fill: '#e8eef4', weight: 800 });
    o += A.arrow(276, 104, 276, 74, { stroke: '#e8eef4', sw: 1.5, head: 5 }) + A.arrow(276, 58, 276, 28, { stroke: '#e8eef4', sw: 1.5, head: 5 });
    // spirit presence track strip
    o += A.rect(164, 175, 150, 21, '#f3ead2', { rx: 5, sw: 1 });
    for (let i = 0; i < 7; i++) {
      const x = 176 + i * 15;
      o += A.circle(x, 185.5, 5.5, '#e2b33c', { stroke: C.ink, sw: 0.8 });
      if (i >= 2) o += at('presence', x, 185.5, 12);
    }
    o += A.text(292, 185.5, 'energy', { size: 8, fill: C.gray, weight: 700 });
    o += A.note(206, 58, 150, 9, 'Invaders ravage here');
    o += A.note(124, 90, 50, 162, 'Your presence');
    o += A.note(212, 74, 214, 154, 'Dahan strike back');
    o += A.note(126, 150, 70, 186, 'Blight');
    return o;
  },
});
