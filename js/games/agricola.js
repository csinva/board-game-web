defineGame({
  id: 'agricola',
  name: 'Agricola',
  year: 2007,
  designer: 'Uwe Rosenberg',
  family: 'engine',
  players: [1, 4], best: '3–4',
  time: [60, 150],
  age: 12,
  mechanics: ['worker-placement', 'resource-management', 'engine-building', 'hand-management', 'tableau', 'spatial'],
  profile: { complexity: 4, luck: 2, interaction: 3, conflict: 2, talk: 1, planning: 5 },

  pitch: 'Grow a 17th-century farm from a two-room hut: grab the actions you need before rivals do, and keep your family fed every harvest.',
  theme: 'You are a farming family in 1670 turning a muddy plot into a thriving farm.',

  goal: { big: 'Best farm', text: 'Score the most points for a **balanced** farm: fields, pastures, crops, three kinds of animals, a big house and a big family. Anything you lack costs points.' },

  turn: {
    type: 'choose',
    intro: 'Taking turns, place <b>one</b> family member on an empty action space and do it:',
    outro: 'Next player · when everyone is placed, next round',
    steps: [
      { verb: 'Gather', text: 'Take **all** the wood, clay, reed, stone, food or animals that have piled up on that space.' },
      { verb: 'Farm', text: 'Plow a field, sow grain or vegetables, or bake bread.' },
      { verb: 'Build', text: 'Add rooms, renovate to clay or stone, or build stables and fences.' },
      { verb: 'Grow family', text: 'Have a child if you have an empty room: one more worker from next round on.' },
      { verb: 'Play a card', text: 'Play an occupation or buy an improvement such as a fireplace or oven.' },
    ],
  },

  tension: 'There are never enough actions: each placement chooses between food you need for the next harvest and the farm that scores later, and the space you need may already be taken.',

  flow: [
    { label: 'Gather', items: ['Wood, clay, reed, stone', 'Grain & vegetables', 'Sheep, boar, cattle'] },
    { label: 'Build up', items: ['Rooms → more people', 'Fields & pastures', 'Cooking improvements'] },
    { label: 'Harvest', items: ['Fields yield crops', 'Feed 2 food / person', 'Animal pairs breed'] },
    { label: 'Score', items: ['Every farm category', '3 per family member', 'House & card points'] },
  ],

  end: { trigger: 'Round 14 ends, after its harvest', detail: 'Harvests come after rounds 4, 7, 9, 11, 13 and 14. A new action space appears each round, so the game gets richer as it goes.' },
  scoring: [
    { label: 'Crops & animals', share: 4 },
    { label: 'Family members', share: 3 },
    { label: 'Fields & pastures', share: 2 },
    { label: 'House rooms', share: 1 },
    { label: 'Cards & bonuses', share: 2 },
  ],

  ref: {
    title: 'Costs & capacity',
    rows: [
      ['Wood room', '5 wood + 2 reed'],
      ['Stable', '2 wood'],
      ['Fence', '1 wood per segment'],
      ['Fireplace', '2–3 clay (cooks animals & veg)'],
      ['Feeding', '2 food per person (newborn 1)'],
      ['Pasture', '2 animals per space, ×2 with a stable'],
    ],
  },

  example: 'Round 5: you place your first person on **Forest**, where 6 wood has piled up, and take it all. Your second goes to **Build rooms**: you pay 5 wood + 2 reed for a third room, so next round you can take Family growth.',

  setup: [
    'Each player takes a farmyard with a 2-room wooden house, 2 family members in it, and food (first player 2, others 3).',
    'Deal each player 7 occupations and 7 minor improvements (or leave them out for a simpler family game).',
    'Lay out the action boards and shuffle each stage’s round cards so one new action is revealed per round.',
  ],

  terms: [
    ['Accumulating space', 'Goods pile up there every round until someone takes them.'],
    ['Harvest', 'Collect crops, feed your family, then animals breed.'],
    ['Begging card', 'Taken for each food you can’t pay at harvest: −3 points.'],
    ['Occupation', 'Personal card giving an ongoing ability.'],
    ['Major improvement', 'Shared buildings (fireplace, oven, well…) anyone can buy.'],
  ],

  gotchas: [
    'At every harvest each person eats **2 food** (a newborn eats 1). Each missing food is a begging card worth **−3**.',
    'Every scoring category you have **none** of scores −1, and every unused farmyard space is −1.',
    'Without a **cooking improvement** you can’t turn animals or vegetables into food, and a new child needs an empty room first.',
  ],

  tips: [
    'Get a **food engine** early (fireplace + animals, or baking), so harvests stop eating your turns.',
    'Grow your family as soon as you can: more people means more actions every round.',
    'Aim for a little of **everything**: the first animal or vegetable in a category is worth the most.',
  ],

  extended: [
    { title: 'The harvest, step by step', items: [
      '**Field phase**: take 1 grain or vegetable from every sown field into your supply.',
      '**Feeding phase**: pay 2 food per family member; a child born this round eats only 1. You may convert goods to food at any time to pay.',
      '**Breeding phase**: each animal type you have 2+ of gives 1 newborn, but only if you have room for it. A newborn can’t be cooked the moment it is born.',
    ] },
    { title: 'Turning goods into food', items: [
      'Raw, without any improvement: 1 grain or 1 vegetable = 1 food. Animals can’t be eaten raw.',
      '**Fireplace** (2–3 clay): sheep 2, boar 2, cattle 3, vegetable 2; bake bread at 2 food per grain.',
      '**Cooking hearth** (4–5 clay, or return a fireplace): sheep 2, boar 3, cattle 4, vegetable 3; bread 3 per grain.',
      '**Clay oven** bakes 1 grain into 5 food; **stone oven** bakes up to 2 grain at 4 each. Baking needs a Bake bread action (or Sow and bake).',
    ] },
    { title: 'Begging', text: 'If you can’t pay all the food at a harvest, take one **begging card** per missing food. Each is −3 points at the end and can’t be paid off later. One begging card is often cheaper than wrecking two turns for food, but more adds up fast.' },
    { title: 'Family growth', text: 'Basic **Family growth** needs a room with no one living in it: the newborn moves in and works from next round. It eats 1 food at a harvest in the round it was born, 2 after that. Later round cards add “Family growth even without room”. You can have at most 5 family members.' },
    { title: 'Fields, pastures and animals', items: [
      'New fields must be plowed next to your existing fields. Sowing turns 1 grain into 3 on the field (1 vegetable into 2).',
      'A pasture is any area fully enclosed by fences (1 wood each, at most 15). It holds 2 animals per space, of one type only; each stable inside doubles that.',
      'An unfenced stable holds 1 animal, and your house holds 1 pet. Animals with nowhere to go must be cooked or released.',
    ] },
    { title: 'House and rooms', text: 'All rooms are the same material. A room costs 5 of that material + 2 reed. **Renovate** wood → clay (1 clay per room + 1 reed) and later clay → stone (1 stone per room + 1 reed); you can’t skip clay. Clay rooms score 1 each, stone rooms 2, wood rooms 0.' },
    { title: 'Cards', text: '**Occupations** are played on a Lessons space and cost food (typically 1–2; the first is often cheaper). **Minor improvements** come from your hand and some pass to the next player once used. The 10 **major improvements** are shared: first come, first served.' },
    { title: 'Final scoring', items: [
      'Each of fields, pastures, grain, vegetables, sheep, boar and cattle scores −1 for none, up to +4 for plenty (e.g. 8 grain, 4 vegetables, 6 cattle).',
      '+1 per fenced stable, +1 per clay room, +2 per stone room, +3 per family member, plus card points.',
      '−1 per unused farmyard space and −3 per begging card. Ties go to the most building resources left.',
    ] },
  ],

  walk(A) {
    const C = A.C, cs = 30, fx = 12, fy = 32;
    const grass = '#9cc56a', woodC = '#8a5a33', reedC = '#d9cf9a';
    let base = A.bg('#e9dfc4');
    base += A.rect(fx - 4, fy - 4, cs * 5 + 8, cs * 3 + 8, '#6f8f45', { rx: 6 });
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) base += A.rect(fx + i * cs + 1.5, fy + j * cs + 1.5, cs - 3, cs - 3, grass, { rx: 3, sw: 0.8, stroke: '#5f7c3a' });
    const room = (j) => {
      const x = fx + 3, y = fy + j * cs + 3;
      let s = A.rect(x, y, cs - 6, cs - 6, '#c99a62', { rx: 2, sw: 1 });
      for (let k = 1; k < 3; k++) s += A.line(x + 2, y + k * 8, x + cs - 8, y + k * 8, { stroke: '#8a5a33', sw: 0.8 });
      return s;
    };
    base += room(1) + room(2);
    base += A.tag(88, 14, 'Your farm');
    // Supply
    base += A.rect(8, 136, 166, 56, '#f7f0dc', { rx: 6, sw: 1.2 }) + A.text(16, 146, 'Your supply', { size: 8, anchor: 'start' });
    // Action spaces
    const ax = 186, aw = 126, sp = ['Forest', 'Build rooms', 'Family growth'];
    sp.forEach((t, k) => { const y = 8 + k * 64; base += A.rect(ax, y, aw, 56, '#f7f0dc', { rx: 5, sw: 1.2 }) + A.text(ax + 8, y + 10, t, { size: 9, anchor: 'start', weight: 700 }); });
    base += A.text(ax + 8, 94, 'pay 5 wood + 2 reed', { size: 7, anchor: 'start', weight: 600, fill: C.gray });
    base += A.text(ax + 8, 158, 'needs an empty room', { size: 7, anchor: 'start', weight: 600, fill: C.gray });
    const wood = (i, x, y) => A.k('w' + i, A.rect(x, y, 10, 10, woodC, { rx: 1.5, sw: 0.9 }));
    const reed = (i, x, y) => A.k('r' + i, A.rect(x, y, 6, 14, reedC, { rx: 2, sw: 0.9 }));
    const person = (key, x, y, fill = C.blue) => A.k(key, A.circle(x, y, 7, fill, { sw: 1.4 }));
    const home1 = [fx + cs / 2, fy + cs * 1.5], home2 = [fx + cs / 2, fy + cs * 2.5];
    const onSpace = (k) => [ax + aw - 18, 8 + k * 64 + 38];
    const woodOnForest = () => [0, 1, 2, 3, 4, 5].map(i => wood(i, ax + 10 + i * 14, 38 + (i % 2) * 4)).join('');
    const woodInSupply = (n = 6) => [...Array(n).keys()].map(i => wood(i, 16 + i * 14, 160)).join('');
    const reeds = [0, 1].map(i => reed(i, 110 + i * 10, 158)).join('');
    const newRoom = A.k('room3', room(0));
    const start = base + woodOnForest() + reeds;
    return [
      { step: 0, say: 'Round 5. **6 wood** has piled up on Forest, and you need wood for a room.', svg: start + person('p1', ...home1) + person('p2', ...home2) + A.glow(ax + 44, 46, 20, 'g-forest') },
      { step: 0, say: 'Place your first person on **Forest**.', svg: start + person('p1', ...onSpace(0)) + person('p2', ...home2) },
      { step: 0, say: 'Take **all** of it: 6 wood into your supply.', svg: base + woodInSupply() + reeds + person('p1', ...onSpace(0)) + person('p2', ...home2) },
      { step: 2, say: 'Your second person goes to **Build rooms**.', svg: base + woodInSupply() + reeds + person('p1', ...onSpace(0)) + person('p2', ...onSpace(1)) + A.glow(...onSpace(1), 14, 'g-build') },
      { step: 2, say: 'Pay **5 wood + 2 reed**: a third room appears next to your house. 1 wood is left over.', svg: base + wood(5, 16, 160) + newRoom + person('p1', ...onSpace(0)) + person('p2', ...onSpace(1)) + A.glow(fx + cs / 2, fy + cs / 2, 18, 'g-room') },
      { step: 3, say: 'Next round your family is home and the new room is **empty**, so you can take Family growth.', svg: base + wood(5, 16, 160) + newRoom + person('p1', ...home1) + person('p2', ...home2) + A.glow(...onSpace(2), 14, 'g-fam') },
      { step: 3, say: 'A **child** moves into the new room: three workers from now on (it eats too).', svg: base + wood(5, 16, 160) + newRoom + person('p1', ...onSpace(2)) + person('p2', ...home2) + A.k('baby', A.circle(fx + cs / 2, fy + cs / 2 + 2, 5, C.blue, { sw: 1.2 })) + A.glow(fx + cs / 2, fy + cs / 2, 14, 'g-baby') },
    ];
  },

  art(A) {
    const C = A.C, cs = 38, fx = 8, fy = 44;
    const grass = '#9cc56a', soil = '#7a5233', wood = '#b07a45';
    let o = A.bg('#e9dfc4');
    // Farmyard: 5 columns × 3 rows
    o += A.rect(fx - 4, fy - 4, cs * 5 + 8, cs * 3 + 8, '#6f8f45', { rx: 6 });
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) {
      const x = fx + i * cs, y = fy + j * cs;
      o += A.rect(x + 1.5, y + 1.5, cs - 3, cs - 3, grass, { rx: 3, sw: 0.8, stroke: '#5f7c3a' });
    }
    // Wooden rooms (column 0, rows 1–2) and a third room (row 0)
    for (let j = 0; j < 3; j++) {
      const x = fx + 3, y = fy + j * cs + 3;
      o += A.rect(x, y, cs - 6, cs - 6, '#c99a62', { rx: 2, sw: 1 });
      for (let k = 1; k < 4; k++) o += A.line(x + 2, y + k * 8, x + cs - 8, y + k * 8, { stroke: '#8a5a33', sw: 0.8 });
      o += A.poly([[x - 1, y + 8], [x + (cs - 6) / 2, y - 1], [x + cs - 5, y + 8]], '#d9b553', { sw: 1 });
    }
    o += A.circle(fx + cs / 2 - 6, fy + cs * 1.5 + 6, 6, C.blue, { sw: 1.2 });
    o += A.circle(fx + cs / 2 + 6, fy + cs * 2.5 + 6, 6, C.blue, { sw: 1.2 });
    // Fields (column 1)
    const field = (i, j, crop) => {
      const x = fx + i * cs + 3, y = fy + j * cs + 3;
      let s = A.rect(x, y, cs - 6, cs - 6, soil, { rx: 2, sw: 1 });
      for (let k = 1; k < 5; k++) s += A.line(x + 3, y + k * 6.4, x + cs - 9, y + k * 6.4, { stroke: '#5a3a22', sw: 1 });
      if (crop === 'g') for (let k = 0; k < 3; k++) s += A.circle(x + 9 + k * 7, y + 16, 3.2, C.wheat, { sw: 0.8 });
      if (crop === 'v') for (let k = 0; k < 2; k++) s += A.circle(x + 12 + k * 9, y + 16, 4, C.orange, { sw: 0.8 });
      return s;
    };
    o += field(1, 0, 'g') + field(1, 1, 'v') + field(1, 2, null);
    // Fenced pasture over columns 3–4, rows 0–1, with a stable
    const px = fx + 3 * cs, py = fy;
    o += A.rect(px + 2, py + 2, cs * 2 - 4, cs * 2 - 4, '#b5d77d', { rx: 2, sw: 0 });
    o += A.rect(px + 2, py + 2, cs * 2 - 4, cs * 2 - 4, 'none', { rx: 1, stroke: wood, sw: 4 });
    o += A.rect(px + cs * 2 - 26, py + cs * 2 - 24, 18, 14, '#a8743f', { rx: 1, sw: 1 }) + A.poly([[px + cs * 2 - 28, py + cs * 2 - 24], [px + cs * 2 - 17, py + cs * 2 - 32], [px + cs * 2 - 6, py + cs * 2 - 24]], C.red, { sw: 1 });
    for (const [dx, dy] of [[14, 14], [30, 22], [48, 12], [20, 40], [56, 34]]) o += A.rect(px + dx, py + dy, 9, 9, C.white, { rx: 2.5, sw: 1 });
    // Boar in an unfenced stable cell (row 2, col 4)
    o += A.rect(fx + 4 * cs + 10, fy + 2 * cs + 12, 18, 14, '#a8743f', { rx: 1, sw: 1 }) + A.rect(fx + 4 * cs + 14, fy + 2 * cs + 16, 9, 9, C.black, { rx: 2.5, sw: 1 });
    // Action spaces on the right
    const ax = 222, aw = 92;
    const spaces = [
      ['wood', '#8a5a33', 5, C.yellow],
      ['clay', '#c06a3a', 3, null],
      ['reed', '#d9cf9a', 2, C.blue],
      ['food', '#e7b44c', 4, null],
    ];
    spaces.forEach(([, col, n, worker], k) => {
      const y = 28 + k * 40;
      o += A.rect(ax, y, aw, 32, '#f7f0dc', { rx: 4, sw: 1.2 });
      for (let i = 0; i < n; i++) o += A.rect(ax + 8 + i * 11, y + 11 + (i % 2) * 3, 9, 9, col, { rx: k === 3 ? 4.5 : 1.5, sw: 0.9 });
      if (worker) o += A.circle(ax + aw - 14, y + 16, 9, worker, { sw: 1.4 });
    });
    o += A.note(fx + 18, fy + 30, 60, 16, 'Rooms house your family');
    o += A.note(fx + cs * 1.5, fy + cs * 2.6, 70, 188, 'Plowed field');
    o += A.note(px + cs, py + cs * 2 - 2, 180, 188, 'Fenced pasture');
    o += A.note(ax + 64, 34, 262, 11, 'Action spaces');
    return o;
  },
});
