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

  pitch: 'Play island spirits who grow, gain strange powers, and work together with the native Dahan to scare colonising invaders off the island.',
  theme: 'You are ancient spirits of an island, and invaders from overseas are spreading across your land and blighting it.',

  goal: { big: 'Drive them out', text: 'Generate **Fear** until the invaders flee. Early on you must clear every invader; as Terror rises, the bar drops until you only need to remove the cities.' },

  turn: {
    type: 'round',
    intro: 'Every round, all spirits act at once, then the invaders respond:',
    outro: 'Then start a new round.',
    steps: [
      { verb: 'Grow', text: 'Each spirit picks one **Growth** option (add presence, gain cards, reclaim), gains Energy, then pays for the Power cards it will play.' },
      { verb: 'Fast powers', text: 'Resolve **Fast** powers, before the invaders act.' },
      { verb: 'Invaders', text: 'Resolve earned Fear cards, then invaders **Ravage**, **Build** and **Explore** in the lands on their cards; the cards slide one step.' },
      { verb: 'Slow powers', text: 'Resolve **Slow** powers, after the invaders have acted.' },
      { verb: 'Time passes', text: 'Discard played cards; all damage on invaders and Dahan heals.' },
    ],
  },

  tension: 'Every round you choose between growing your spirit for a bigger future or spending everything to stop the Ravage that is coming next turn.',

  flow: [
    { label: 'Grow', items: ['Add presence', 'Unlock energy & card plays', 'Gain new powers'] },
    { label: 'Defend', items: ['Fast powers stop Ravage', 'Push and destroy invaders', 'Empower the Dahan'] },
    { label: 'Terrify', items: ['Destroy towns & cities', 'Earn Fear cards', 'Raise the Terror level'] },
  ],

  end: {
    trigger: 'the invaders are driven off, or the island falls',
    detail: 'Each player adds 4 to the Fear pool; filling it earns a Fear card. Every few Fear cards the Terror level rises and the win condition gets easier.',
    results: [
      { side: 'Spirits win', text: 'Terror 1: no invaders on the island. Terror 2: no towns or cities. Terror 3: no cities. Or earn every Fear card.' },
      { side: 'Spirits lose', text: 'if **Blight runs out**, any spirit loses all its presence, or the invader deck runs out.' },
    ],
  },

  ref: {
    title: 'Invaders',
    rows: [
      ['Explorer', '1 health, deals 1 damage'],
      ['Town', '2 health, deals 2; destroying it = 1 Fear'],
      ['City', '3 health, deals 3; destroying it = 2 Fear'],
      ['Dahan', '2 health; survivors strike back for 2 each'],
      ['Blight', 'added when a Ravage deals 2+ damage to a land'],
    ],
  },

  example: 'The Ravage card shows Wetlands, where 1 explorer, 1 town and 2 Dahan stand. River plays a Fast power for 2 damage on that coastal wetland, destroying the **town** (1 Fear). In the Ravage the lone explorer deals only 1 damage, so **no blight**, and both Dahan survive to strike back for 4, wiping out the explorer.',

  setup: [
    'Pick spirits (start with the four marked low complexity) and lay out one island board per player.',
    'Place the starting invaders, Dahan and blight printed on the boards; put 2 blight per player +1 on the Blight card and 4 Fear per player in the pool.',
    'Build the invader deck (stage I, II, III) and Fear deck, then do the first **Explore** before round 1.',
  ],

  terms: [
    ['Presence', 'Your spirit’s discs on the island. Powers reach out from them; removing them from your tracks gives more energy and card plays.'],
    ['Dahan', 'The island’s native people. They fight back when invaders ravage.'],
    ['Fear', 'Earned by destroying towns and cities and by some powers. Fear cards weaken the invaders.'],
    ['Blight', 'Damage to the land. Too much and the island is lost.'],
    ['Elements', 'Symbols on power cards; enough of them unlock your spirit’s Innate powers.'],
  ],

  gotchas: [
    'Ravage, Build and Explore resolve in that order, and each card **moves one step** left every round, so you can see what is coming next round.',
    'Blight added to a land that already has blight **cascades** to an adjacent land, and blight destroys one presence where it lands.',
    'Unplayed or discarded cards do not come back on their own; you must choose a **Reclaim** growth option.',
  ],

  tips: [
    'Spend the first rounds mostly **growing**; your spirit starts weak and gets much stronger.',
    'Look one card ahead: the Build card shows where the next Ravage will hit.',
    'Let the Dahan fight for you; pushing a few invaders into Dahan lands is often cheaper than destroying them yourself.',
  ],

  extended: [
    { title: 'Invader cards and the Explore → Build → Ravage cycle', items: [
      'The invader deck is built in stages: **3 stage I**, **4 stage II**, **5 stage III** cards. Stage I and II cards name one terrain (stage II adds an **escalation** effect); stage III cards name two terrains, and one stage II card names coastal lands.',
      '**Explore**: flip the top card into the Explore slot. One explorer goes into each matching land that is **coastal**, or has or is next to a town or city.',
      '**Build**: in each matching land that already has **any** invaders, add a town if it has no towns or as many cities as towns; otherwise add a city.',
      '**Ravage**: in each matching land with invaders, they deal damage equal to their total (explorer 1, town 2, city 3) to the **land** and to the **Dahan** there.',
      'After Explore, every card **slides one slot left** (Explore → Build → Ravage → discard), so you always see one round ahead.',
    ] },
    { title: 'Ravage in detail', items: [
      'If the land takes **2 or more** damage, add 1 blight. Defend reduces the damage dealt by invaders in that land, which can stop the blight.',
      'Invader damage to Dahan kills as many as possible; each Dahan has **2 health**.',
      'Surviving Dahan then **strike back**: each deals 2 damage to invaders in that land, split as the players choose.',
      'Damage lasts until Time Passes: a Fast power that deals 1 damage to a town leaves it only 1 health for the Dahan to finish.',
    ] },
    { title: 'Fear and Terror levels', items: [
      'The Fear pool holds **4 Fear per player**. Destroying a town gives **1 Fear**, a city **2**, and many powers generate Fear directly.',
      'Each time the pool empties, take the top Fear card face down into the **earned** pile and refill the pool. Earned cards resolve at the start of the next invader phase.',
      'The Fear deck has 9 cards split by dividers into **Terror levels 1–3** (3 / 3 / 3 by default). Each Fear card has a stronger effect at higher Terror.',
      'Victory gets easier with Terror: TL1 no invaders at all, TL2 no towns or cities, TL3 no cities. Earning the last Fear card wins at once.',
    ] },
    { title: 'Blight and the Blighted Island', items: [
      'The Blight card starts with **2 blight per player + 1**. Each time blight is added to a land, also **destroy one presence** there.',
      'Adding blight to a land that already has blight **cascades**: add one more blight to an adjacent land of your choice (which can cascade again).',
      'When the Blight card empties, **flip it**: the island becomes Blighted and the card refills with more blight (printed on its back), sometimes with a harsher rule. If it empties again, the spirits lose.',
      'Removing blight from the island returns it to the Blight card, buying back time.',
    ] },
    { title: 'Presence, tracks and Growth', items: [
      'Each spirit has two **presence tracks**: Energy (gain the highest uncovered value each round) and Card Plays (how many Power cards you may play this round).',
      'Placing presence uncovers track spaces, so growing on the island makes you stronger. Some spaces grant an **element** every round or a one-time Reclaim.',
      'Two or more presence in one land make it a **sacred site**, which some powers require or reward.',
      'Pick **one** Growth option per round (some spirits pick two). Reclaim returns discarded Power cards to hand; gaining a Power card means choosing 1 of 4 minor or 4 major powers (taking a major makes you forget a card).',
    ] },
    { title: 'Elements and innate powers', items: [
      'Each Power card shows **elements** (Sun, Moon, Fire, Air, Water, Earth, Plant, Animal). Count the elements on the cards you played this round plus any from your tracks.',
      'Your spirit board’s **innate powers** list thresholds such as "2 Water, 1 Plant". Meeting a threshold unlocks that tier for free this round.',
      'Innates have their own speed and resolve once per round, using every tier you have unlocked.',
    ] },
    { title: 'Fast vs Slow, range and targeting', items: [
      'Fast powers resolve **before** the invaders (stop the coming Ravage); Slow powers resolve **after** (set-up and clean-up). Pay for all cards at once, then resolve by speed.',
      'Range counts land by land from one of your **presence** (or a sacred site if the power says so). Oceans are not lands unless a spirit says otherwise.',
      'Push moves pieces to an adjacent land of your choice; Gather pulls them in. Pushing the only invader out of a land stops next round’s Build there.',
    ] },
  ],

  walk(A) {
    const C = A.C;
    const T = { wet: '#5aa8a0', jun: '#3f7a3a', mtn: '#9a9389' };
    let base = A.bg('#4f8fb8');
    base += A.poly([[12, 18], [96, 10], [104, 82], [18, 92]], T.wet, { stroke: '#f3ead2', sw: 2 });
    base += A.poly([[96, 10], [188, 22], [184, 92], [104, 82]], T.jun, { stroke: '#f3ead2', sw: 2 });
    base += A.poly([[18, 92], [104, 82], [184, 92], [168, 140], [28, 140]], T.mtn, { stroke: '#f3ead2', sw: 2 });
    const lab = (x, y, s) => A.text(x, y, s, { size: 7.5, fill: '#fff', weight: 800, spacing: 0.5 });
    base += lab(34, 24, 'Wetland') + lab(168, 30, 'Jungle') + lab(60, 132, 'Mountain');
    // Invader board + fear + blight (right panel).
    base += A.rect(200, 4, 116, 142, '#2a3d4f', { rx: 6, sw: 1.2 });
    const pl = (x, y, s, o = {}) => A.text(x, y, s, { size: o.size || 6.5, fill: '#e8eef4', weight: 700 });
    base += pl(220, 13, 'Ravage') + pl(258, 13, 'Build') + pl(296, 13, 'Explore');
    base += A.rect(279, 21, 34, 38, '#3c4c5c', { rx: 4, sw: 1, stroke: '#7d8c99' }) + pl(296, 40, 'deck', { size: 6 });
    base += A.line(204, 67, 312, 67, { stroke: '#4d6175', sw: 1 });
    base += pl(222, 76, 'Fear pool') + pl(292, 76, 'Earned');
    base += A.line(204, 110, 312, 110, { stroke: '#4d6175', sw: 1 });
    base += A.star(218, 128, 8, '#3b2b3e', { stroke: '#d9c6e8', sw: 0.8 }) + pl(264, 128, 'Blight left: 5', { size: 7.5 });
    // Spirit panel (bottom).
    base += A.rect(0, 148, 320, 52, '#f3ead2', { rx: 0, sw: 0 }) + A.line(0, 148, 320, 148, { sw: 1.5 });
    base += A.tag(32, 158, 'River (you)', { fill: C.blue });
    base += A.text(14, 175, 'Energy', { size: 6, anchor: 'start' }) + A.text(14, 191, 'Plays', { size: 6, anchor: 'start' });
    const tr = (i, row) => [44 + i * 15, row ? 191 : 175];
    for (let i = 0; i < 4; i++) {
      base += A.circle(...tr(i, 0), 6, '#e2b33c', { sw: 0.8 }) + A.text(...tr(i, 0), [1, 2, 2, 3][i], { size: 6.5, weight: 800 });
      base += A.circle(...tr(i, 1), 6, '#cfc6b2', { sw: 0.8 }) + A.text(...tr(i, 1), [1, 2, 2, 3][i], { size: 6.5, weight: 800 });
    }
    base += A.text(124, 160, 'Energy', { size: 6 });

    const pres = (x, y) => A.circle(x, y, 5.5, '#3d8ee0', { stroke: '#fff', sw: 1.8 });
    const explorer = (x, y) => A.circle(x, y, 4.5, '#d9d2c3', { stroke: C.ink, sw: 1 }) + A.line(x, y - 4.5, x, y - 10, { sw: 1.3 });
    const town = (x, y) => A.house(x, y, 15, '#c8423b');
    const dahan = (x, y) => A.person(x, y, 14, '#a0603a');
    const fear = (x, y) => A.circle(x, y, 5, '#9a6fd6', { stroke: '#fff', sw: 1 });
    const inv = (x, fill, s) => A.card(x - 2, 21, 34, 38, fill, { label: s, size: 5.2, labelFill: '#fff' });
    const dmg = (x, y, s) => A.rect(x - 17, y - 6, 34, 12, '#ffcf3f', { rx: 6, sw: 1 }) + A.text(x, y, s, { size: 7, weight: 800 });
    const coin = (n) => A.circle(124, 177, 10, '#e2b33c', { sw: 1.2 }) + A.text(124, 177.5, n, { size: 10, weight: 800 });
    const power = (x, fast) => {
      const y = 153, col = fast ? '#e07b2e' : '#2f6db5';
      return A.rect(x + 1.5, y + 2, 40, 42, C.shadow, { sw: 0, rx: 4 }) + A.rect(x, y, 40, 42, '#fbf6ec', { rx: 4, sw: 1.2 }) +
        A.rect(x + 2, y + 2, 36, 11, col, { rx: 3, sw: 0 }) + A.text(x + 23, y + 7.5, fast ? 'FAST' : 'SLOW', { size: 6, fill: '#fff', weight: 800 }) +
        A.circle(x + 8, y + 7.5, 4.5, '#e2b33c', { sw: 0.8 }) + A.text(x + 8, y + 8, fast ? 1 : 2, { size: 6, weight: 800 }) +
        A.text(x + 20, y + 24, fast ? '2 Damage' : 'Push 1', { size: 6, weight: 800 }) + A.text(x + 20, y + 33, fast ? 'range 1' : 'explorer', { size: 6, weight: 600 });
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
      { step: 0, say: 'Round start. River can play only **1** card, and the Wetland card sits in the **Ravage** slot: trouble is coming there.',
        svg: base + presOld + pC1track + wetland + wTown + wExp + mExp + pool(4) + cardsStart + handCards + A.k('coin', coin(2)) + A.glow(220, 40, 20, 'g-card') },
      { step: 0, say: '**Grow:** add a presence. The disc leaves the Card Plays track for the Jungle, so River can now play **2** cards, and gains 1 energy.',
        svg: after + wTown + wExp + mExp + pool(4) + cardsStart + handCards + A.k('coin', coin(3)) + A.glow(148, 64, 11, 'g-pres') + A.glow(...tr(1, 1), 8, 'g-track') },
      { step: 0, say: 'Pay for both cards at once: a **Fast** 2-damage power (cost 1) and a **Slow** push (cost 2).',
        svg: after + wTown + wExp + mExp + pool(4) + cardsStart + playCards + A.k('coin', coin(0)) + A.glow(124, 177, 13, 'g-coin') },
      { step: 1, say: '**Fast powers** hit before the invaders. 2 damage on the Wetland destroys the **town**: 1 Fear moves to the earned pile.',
        svg: after + wExp + mExp + pool(3) + earned + cardsStart + playCards + A.k('coin', coin(0)) + A.k('dmg', dmg(66, 40, '2 dmg')) + A.glow(60, 52, 26, 'g-wet') + A.glow(292, 92, 9, 'g-fear') },
      { step: 2, say: '**Ravage** the Wetland: the lone explorer deals just 1 damage, so **no blight**. Both Dahan survive and strike back for 4.',
        svg: after + mExp + pool(3) + earned + cardsStart + playCards + A.k('coin', coin(0)) + A.k('dmg2', dmg(62, 38, 'Dahan: 4')) + A.glow(220, 40, 20, 'g-card') + A.glow(62, 70, 22, 'g-wet') },
      { step: 2, say: '**Build** in the Mountain (it has an explorer, so add a town). Flip the next card and **Explore** the Jungle. Then the cards slide left.',
        svg: after + mExp + A.k('mtown', town(108, 122)) + A.k('jexp', explorer(162, 76)) + pool(3) + earned + cardsNext + playCards + A.k('coin', coin(0)) + A.glow(116, 118, 20, 'g-mtn') + A.glow(162, 72, 13, 'g-jun') },
      { step: 3, say: '**Slow:** River pushes the Jungle explorer into the Wetland, so next round’s Jungle **Build** finds no invaders. Time passes; cards are discarded.',
        svg: after + mExp + A.k('mtown', town(108, 122)) + A.k('jexp', explorer(84, 46)) + pool(3) + earned + cardsNext + A.k('coin', coin(0)) + A.glow(84, 44, 14, 'g-push') + A.glow(258, 40, 20, 'g-card2') },
    ];
  },

  art(A) {
    const C = A.C;
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
    // pieces
    const explorer = (x, y) => A.circle(x, y, 4, '#d9d2c3', { stroke: C.ink, sw: 1 }) + A.line(x, y - 4, x, y - 9, { sw: 1.2 });
    const blight = (x, y) => A.star(x, y, 7, '#3b2b3e', { stroke: '#d9c6e8', sw: 0.8 });
    const dahan = (x, y) => A.person(x, y, 13, '#a0603a');
    const pres = (x, y) => A.circle(x, y, 6, '#3d8ee0', { stroke: '#fff', sw: 2 });
    // wetland top-right: ravage target
    o += explorer(190, 46) + A.house(206, 58, 13, '#c8423b') + dahan(196, 66) + dahan(212, 70);
    // jungle centre: presence + sacred site
    o += pres(118, 88) + pres(130, 92) + pres(150, 30);
    // mountain right: city + blight
    o += A.city(196, 112, 16, '#c8423b') + blight(178, 102);
    // sands: dahan + explorer
    o += dahan(52, 108) + explorer(60, 122);
    // mountain left: town
    o += A.house(64, 56, 12, '#c8423b') + explorer(48, 54);
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
      if (i >= 2) o += pres(x, 185.5);
    }
    o += A.text(292, 185.5, 'energy', { size: 8, fill: C.gray, weight: 700 });
    o += A.note(206, 58, 150, 9, 'Invaders ravage here');
    o += A.note(124, 90, 50, 162, 'Your presence');
    o += A.note(212, 74, 214, 154, 'Dahan fight back');
    o += A.note(126, 150, 70, 186, 'Blight');
    return o;
  },
});
