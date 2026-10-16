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
