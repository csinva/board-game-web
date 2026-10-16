defineGame({
  id: 'agricola',
  name: 'Agricola',
  year: 2007,
  designer: 'Uwe Rosenberg',
  family: 'engine',
  players: [1, 4], best: '3–4',
  time: [30, 120],
  age: 12,
  mechanics: ['worker-placement', 'resource-management', 'engine-building', 'hand-management', 'tableau', 'spatial'],
  profile: { complexity: 4, luck: 2, interaction: 3, conflict: 2, talk: 1, planning: 5 },

  // Goods, animals and farm pieces, used inline ({wood}) and in the art and walkthrough.
  icons: {
    wood: { name: 'wood', draw: A => [[6.8, 16.5], [17.2, 16.5], [12, 7.5]].map(([x, y]) => A.circle(x, y, 5.6, '#d9a86a', { sw: 1.4, stroke: '#6b4224' }) + A.circle(x, y, 2.4, 'none', { sw: 0.9, stroke: '#9a6435' })).join('') },
    clay: { name: 'clay', draw: A => A.path('M3 19 Q3.5 10 9.5 9 Q12.5 4.5 16.5 8 Q21.5 9.5 21 19 Z', { fill: '#c06a3a', sw: 1.3 }) + A.path('M8 13 Q11 10 14.5 11.5', { stroke: '#e6a07a', sw: 1.4 }) },
    reed: { name: 'reed', draw: A => [[6.5, -8], [10.5, -3], [14, 3], [17.5, 8]].map(([x, r]) => A.rect(x - 1.4, 3, 2.8, 18, '#e3d9a4', { rx: 1.4, sw: 0.9, rotate: r })).join('') + A.rect(5, 13, 14, 3, '#8a5a33', { rx: 1, sw: 0.8 }) },
    stone: { name: 'stone', draw: A => A.poly([[3, 18], [5.5, 10], [11, 5], [18, 7.5], [21.5, 16], [15.5, 20.5], [7, 20.5]], '#8f939a', { sw: 1.3 }) + A.poly([[11, 5], [18, 7.5], [13.5, 12.5]], '#b9bdc2', { sw: 0 }) + A.poly([[5.5, 10], [11, 5], [13.5, 12.5], [8, 14]], '#a2a6ac', { sw: 0 }) },
    grain: { name: 'grain', draw: A => A.line(12, 22, 12, 5, { stroke: '#b58a12', sw: 1.5 }) + [5.5, 10, 14.5].map(y => A.path(`M12 ${y + 3.5} q-5.5 -1 -5.5 -5.5 q5.5 0 5.5 5.5 M12 ${y + 3.5} q5.5 -1 5.5 -5.5 q-5.5 0 -5.5 5.5`, { fill: '#e8c547', stroke: '#b58a12', sw: 0.9 })).join('') + A.path('M12 7 q-2 -3 0 -5.5 q2 2.5 0 5.5', { fill: '#e8c547', stroke: '#b58a12', sw: 0.9 }) },
    vegetable: { name: 'vegetable', draw: A => A.path('M12 9 q0 -4 3 -6', { stroke: '#3c8d4f', sw: 2.2 }) + A.circle(7.8, 14.5, 6.3, '#d96d22', { sw: 1.2 }) + A.circle(16.2, 14.5, 6.3, '#d96d22', { sw: 1.2 }) + A.circle(12, 14.5, 6.8, '#ef8b35', { sw: 1.2 }) },
    food: { name: 'food', draw: A => A.path('M2.5 17.5 Q2.5 6 12 6 Q21.5 6 21.5 17.5 Q12 20 2.5 17.5 Z', { fill: '#e7b44c', sw: 1.3 }) + [7.5, 12, 16.5].map(x => A.line(x - 1.5, 9.5, x + 1, 13.5, { stroke: '#a8743f', sw: 1.3 })).join('') },
    sheep: { name: 'sheep', draw: A => A.rect(7, 15, 2, 6, '#2b2b2b', { rx: 0.5, sw: 0 }) + A.rect(14, 15, 2, 6, '#2b2b2b', { rx: 0.5, sw: 0 }) + [[6.5, 12], [10.5, 9.5], [14.5, 10], [10.5, 14], [15, 14]].map(([x, y]) => A.circle(x, y, 3.8, '#fff', { sw: 1 })).join('') + A.circle(19.5, 9.5, 2.8, '#2b2b2b', { sw: 0 }) },
    boar: { name: 'wild boar', draw: A => A.rect(6, 15, 2.2, 6, '#2b2b2b', { rx: 0.5, sw: 0 }) + A.rect(14, 15, 2.2, 6, '#2b2b2b', { rx: 0.5, sw: 0 }) + A.rect(3, 8, 15, 10, '#3a3330', { rx: 5, sw: 1.2 }) + A.path('M5 9 l1.5 -2.5 l1.5 2 l1.5 -2.5 l1.5 2 l1.5 -2.5 l1.5 2', { stroke: '#3a3330', sw: 1.2 }) + A.poly([[16, 9], [22, 12], [22, 15.5], [16, 17]], '#3a3330', { sw: 1.2 }) + A.rect(21, 12, 2, 3.5, '#d98a8a', { rx: 0.8, sw: 0.6 }) + A.path('M19.5 16 q1.5 0.5 1.5 -1.8', { stroke: '#fff', sw: 1.1 }) },
    cattle: { name: 'cattle', draw: A => A.rect(5, 15, 2.2, 6, '#5a3a22', { rx: 0.5, sw: 0 }) + A.rect(13.5, 15, 2.2, 6, '#5a3a22', { rx: 0.5, sw: 0 }) + A.rect(2.5, 8.5, 15.5, 9, '#8a5a33', { rx: 3, sw: 1.2 }) + A.circle(9, 12, 2.6, '#f2e6cc', { sw: 0 }) + A.path('M16 7.5 q-1.5 -3.5 1 -4.5 M22.5 7.5 q1.5 -3.5 -1 -4.5', { stroke: '#f2e6cc', sw: 1.6 }) + A.rect(15.5, 6.5, 7.5, 8.5, '#8a5a33', { rx: 2.5, sw: 1.2 }) + A.rect(16.5, 12, 5.5, 3.5, '#d9a88a', { rx: 1.5, sw: 0.7 }) },
    person: { name: 'family member', draw: A => A.circle(12, 12, 9.5, '#2f6db5', { sw: 1.4 }) + A.circle(12, 8.8, 2.7, '#fff', { sw: 0 }) + A.path('M7.3 17 q0 -5.2 4.7 -5.2 q4.7 0 4.7 5.2 z', { fill: '#fff', sw: 0 }) },
    room: { name: 'room', draw: A => A.rect(4, 10, 16, 11, '#c99a62', { rx: 1, sw: 1.2 }) + A.line(5.5, 14, 18.5, 14, { stroke: '#8a5a33', sw: 0.8 }) + A.line(5.5, 17.5, 18.5, 17.5, { stroke: '#8a5a33', sw: 0.8 }) + A.poly([[2, 11], [12, 3], [22, 11]], '#d9b553', { sw: 1.2 }) },
    stable: { name: 'stable', draw: A => A.rect(5, 11, 14, 10, '#a8743f', { rx: 1, sw: 1.2 }) + A.rect(10, 15, 4, 6, '#5a3a22', { rx: 0.5, sw: 0.8 }) + A.poly([[3, 12], [12, 4.5], [21, 12]], '#c8423b', { sw: 1.2 }) },
    fence: { name: 'fence', draw: A => A.rect(2, 8.5, 20, 3, '#b07a45', { rx: 1, sw: 1 }) + A.rect(2, 14.5, 20, 3, '#b07a45', { rx: 1, sw: 1 }) + A.rect(4.5, 5, 3.2, 16, '#b07a45', { rx: 1, sw: 1.1 }) + A.rect(16.3, 5, 3.2, 16, '#b07a45', { rx: 1, sw: 1.1 }) },
    field: { name: 'field', draw: A => A.rect(3, 3, 18, 18, '#7a5233', { rx: 2, sw: 1.3 }) + [7.5, 12, 16.5].map(y => A.line(6, y, 18, y, { stroke: '#4a2f1b', sw: 1.4 })).join('') },
    fireplace: { name: 'fireplace', draw: A => A.rect(3.5, 6, 17, 15, '#a09a92', { rx: 1.5, sw: 1.3 }) + A.rect(2.5, 4, 19, 3.5, '#8c877f', { rx: 1, sw: 1.1 }) + A.path('M7 21 v-6 q0 -4 5 -4 q5 0 5 4 v6 z', { fill: '#3a3330', sw: 1 }) + A.path('M12 20.5 q-3.5 -2 -1.2 -6 q0.4 2.2 1.8 2.4 q-0.6 -2.3 1.2 -3.8 q2.6 3.6 -1.8 7.4 z', { fill: '#f08a2c', stroke: '#e2b33c', sw: 0.7 }) },
    begging: { name: 'begging marker', draw: A => A.rect(5, 2, 14, 20, '#e6ddc9', { rx: 2.5, sw: 1.3 }) + A.text(12, 12.5, '−3', { size: 8.5, weight: 800, fill: '#c8423b' }) },
  },

  pitch: 'Place workers to gather goods, build up your farm and feed your family; the most balanced farm scores most.',

  goal: { big: 'Best farm', text: 'Most points wins. Points come from a **balanced** farm: fields, pastures, grain, vegetables, sheep, boar, cattle, rooms and family. Each pasture, crop or animal type you lack scores −1, as do fewer than 2 fields.' },

  turn: {
    type: 'choose',
    intro: 'In turn order, place <b>one</b> family member on an empty action space and take its action:',
    outro: 'Next player · when everyone is placed, next round',
    steps: [
      { verb: 'Gather', text: 'Take **all** the goods {=wood}{=clay}{=reed}{=stone}{=food} or animals {=sheep}{=boar}{=cattle} piled on that space.' },
      { verb: 'Farm', text: 'Plow a {field}, sow {grain} or {vegetable}s, or bake bread.' },
      { verb: 'Build', text: 'Add {room}s, renovate wood → clay → stone, or build {stable}s and {fence}s.' },
      { verb: 'Grow family', text: 'Add a child if you have more {room}s than people: one more {=person} from next round.' },
      { verb: 'Play a card', text: 'Play an occupation, or buy an improvement such as a {fireplace} or oven.' },
    ],
  },

  tension: 'Actions are scarce: each placement weighs food for the next harvest against farm points later, and the space you need may be taken.',

  structure: [
    { label: 'Round start', repeat: '14 rounds', text: 'Reveal the next round card: one new action space. Collect goods that cards (e.g. the Well) placed on this round’s space. Add goods to every accumulating space. Round cards come in 6 stages: rounds 1–4, 5–7, 8–9, 10–11, 12–13, 14.' },
    { label: 'Work', repeat: 'every round', text: 'From the starting player, take turns placing one {=person} at a time until all are placed; a player with more people keeps placing. Then everyone returns home.' },
    { label: 'Harvest', repeat: 'after rounds 4, 7, 9, 11, 13, 14', text: '**Field**: take 1 crop from each sown {=field}. **Feed**: 2 {=food} per {=person} (newborn 1), 1 {=begging} per missing food. **Breed**: each animal type with 2+ gains 1, if it has room.' },
    { label: 'Final scoring', text: 'After the round-14 harvest, score every row of the scoring chart below. Most points wins.' },
  ],

  points: [
    ['{=field} Fields', '0–1 → −1 · 2 → 1 · 3 → 2 · 4 → 3 · 5+ → 4'],
    ['{=fence} Pastures', '0 → −1 · 1 → 1 · 2 → 2 · 3 → 3 · 4+ → 4 (fenced areas, not spaces)'],
    ['{=grain} Grain', '0 → −1 · 1–3 → 1 · 4–5 → 2 · 6–7 → 3 · 8+ → 4 (supply + on fields)'],
    ['{=vegetable} Vegetables', '0 → −1 · 1 → 1 · 2 → 2 · 3 → 3 · 4+ → 4 (supply + on fields)'],
    ['{=sheep} Sheep', '0 → −1 · 1–3 → 1 · 4–5 → 2 · 6–7 → 3 · 8+ → 4'],
    ['{=boar} Wild boar', '0 → −1 · 1–2 → 1 · 3–4 → 2 · 5–6 → 3 · 7+ → 4'],
    ['{=cattle} Cattle', '0 → −1 · 1 → 1 · 2–3 → 2 · 4–5 → 3 · 6+ → 4'],
    ['Unused spaces', '−1 per farmyard space with no room, field, stable or fence around it'],
    ['{=stable} Fenced stables', '+1 each (stable inside a pasture)'],
    ['{=room} Rooms', 'Clay +1 each, stone +2 each, wood 0'],
    ['{=person} Family members', '+3 each'],
    ['Cards', 'Points printed on improvements (occupations have none), plus bonus points from card text'],
    ['{=begging} Begging markers', '−3 each'],
  ],

  end: { trigger: 'Round 14’s harvest is done', detail: 'Every game lasts 14 rounds. Ties: most building resources ({=wood}{=clay}{=reed}{=stone}) left in supply wins; if still tied, share the rank.' },
  scoring: [
    { label: '{=grain}{=sheep} Crops & animals', share: 4 },
    { label: '{=person} Family members', share: 3 },
    { label: '{=field} Fields & pastures', share: 2 },
    { label: '{=room} House rooms', share: 1 },
    { label: 'Cards & bonuses', share: 2 },
  ],

  ref: {
    title: 'Costs & capacity',
    rows: [
      ['Goods', '{wood} {clay} {reed} {stone} {food}'],
      ['{=room} Wood room', '{=wood}{=wood}{=wood}{=wood}{=wood} {=reed}{=reed}'],
      ['{=stable} Stable · {=fence} Fence', '{=wood}{=wood} · {=wood} per segment'],
      ['{=fireplace} Fireplace', '{=clay}{=clay} or {=clay}{=clay}{=clay}; cooks {=sheep}{=boar}{=cattle}{=vegetable} into {=food}'],
      ['Feeding', '{=food}{=food} per {=person} each harvest (newborn {=food})'],
      ['Pasture', '{=sheep}{=sheep} per space, one type; ×2 per {=stable} inside'],
    ],
  },

  example: 'Round 5: your first {=person} goes to **Forest** and takes the 6 {wood} piled there. Your second goes to **Farm Expansion** and pays 5 {=wood} + 2 {=reed} for a third {=room}. You now have more rooms than people, so you can use **Basic Wish for Children** once it is out (round 5–7).',

  setup: [
    'Each player takes a farmyard with a 2-room wooden house {=room}{=room} and 1 {=person} in each room; the other 3 people, 4 {stable}s and 15 {fence}s are your supply. Random starting player gets 2 {food}, others 3.',
    'Deal each player 7 occupations (only those marked for your player count) and 7 minor improvements; omit both for the family game. Rules here are the 2016 revised edition.',
    'Attach the board extension for your player count and lay out the 10 major improvements. Shuffle each stage’s round cards and stack them, stage 1 on top.',
  ],

  terms: [
    ['Accumulating space', 'Goods are added every round until someone takes them.'],
    ['Starting player', 'Places first each round. Changes only when someone takes the Meeting Place (starting player) space.'],
    ['{=begging} Begging marker', 'Taken for each {=food} you can’t pay at a harvest; −3 points each.'],
    ['Occupation', 'Card from your hand, played on a Lessons space; gives you an ability.'],
    ['{=fireplace} Major improvement', 'One of 10 shared buildings (fireplace, oven, well…); first buyer gets it.'],
  ],

  gotchas: [
    'At each harvest every {=person} eats **2** {=food} (a newborn eats 1). Each missing food is a {=begging} worth **−3**.',
    'Each crop, animal or pasture category you have **none** of scores −1 (fields: fewer than **2**), and each unused farmyard space scores −1.',
    'Without a **cooking improvement**, animals can’t become food and a vegetable gives only 1.',
  ],

  tips: [
    'Build a **food engine** early (fireplace + animals, or baking) so harvests stop costing turns.',
    'Grow your family early: each person is one more action every round.',
    'Get at least one of **everything**: in most categories, going from none to one is worth 2 points.',
  ],

  extended: [
    { title: 'The harvest, step by step', items: [
      '**Field phase**: take 1 {=grain} or {=vegetable} from each sown {=field}.',
      '**Feeding phase**: pay 2 {=food} per family member (1 for a child born this round). You may convert goods to food at any time.',
      '**Breeding phase**: each animal type with 2+ animals gains exactly 1 newborn, if you have room for it. Parents and newborns can’t be cooked during this phase.',
    ] },
    { title: 'Turning goods into food', items: [
      'Raw, at any time: 1 {=grain} or 1 {=vegetable} = 1 {=food}. Animals need a cooking improvement.',
      '{=fireplace} **Fireplace** (2–3 clay): {=sheep} 2, {=boar} 2, {=cattle} 3, {=vegetable} 2 food; bake bread at 2 {=food} per {=grain}.',
      '**Cooking hearth** (4–5 clay, or return a fireplace): {=sheep} 2, {=boar} 3, {=cattle} 4, {=vegetable} 3 food; bread 3 {=food} per {=grain}.',
      '**Clay oven** (3 clay + 1 stone) bakes 1 {=grain} into 5 {=food}; **stone oven** (1 clay + 3 stone) bakes up to 2 {=grain} at 4 {=food} each. Baking needs a Bake bread action (Grain Utilization, or building an oven).',
      '**Joinery / Pottery / Basketmaker’s Workshop**: once per harvest turn 1 {=wood} / {=clay} / {=reed} into 2 / 2 / 3 {=food}; leftover goods of that type give up to 3 bonus points. **Well**: 1 {=food} at the start of each of the next 5 rounds.',
    ] },
    { title: 'Begging', text: 'Take one {=begging} per food you can’t pay at a harvest. Each is −3 points at the end and can’t be paid off.' },
    { title: 'Family growth', text: '**Basic Wish for Children** (appears in round 5–7) needs more rooms than people: the newborn moves into its own room at round end and works from next round. It eats 1 food at a harvest in its birth round, 2 after that. **Urgent Wish for Children** (round 12–13) needs no free room. Maximum 5 family members.' },
    { title: 'Fields, pastures and animals', items: [
      'Plow adds 1 {=field}: the first anywhere, later ones next to an existing field. Sow fills any number of empty fields: 1 {=grain} from your supply becomes 3 on the field (1 {=vegetable} becomes 2).',
      'A pasture is an area fully enclosed by {fence}s (1 wood each, max 15). Later pastures must border an existing one. It holds 2 animals per space, one type only; each {=stable} inside doubles that. Stables (2 wood, max 4, one per space) can go on any empty space.',
      'An unfenced {=stable} holds 1 animal; your house holds 1 pet. Animals may be rearranged any time; those with no space must be cooked or released.',
    ] },
    { title: 'House and rooms', text: 'All rooms share one material. A room costs 5 of that material + 2 reed and must touch an existing room; one action can build several. **Renovate** the whole house wood → clay (1 clay per room + 1 reed), then clay → stone (1 stone per room + 1 reed); you can’t skip clay. Clay rooms score 1 each, stone 2, wood 0.' },
    { title: 'Cards', text: '**Occupations** are played on a Lessons space. Main-board Lessons: your first occupation is free, each later one 1 {=food}. Extra Lessons space: 2 {=food} each (3 players); 1 {=food} for your first two, then 2 (4 players). **Minor improvements** come from your hand; some pass to the next player once played. The 10 **major improvements** are shared: first come, first served.' },
  ],

  walk(A) {
    const C = A.C, cs = 30, fx = 12, fy = 32;
    const ic = this.icons, I = (k, x, y, size) => A.use(ic[k].draw(A), x, y, size);
    const grass = '#9cc56a';
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
    const ax = 186, aw = 126, sp = ['Forest', 'Farm expansion', 'Wish for children'];
    sp.forEach((t, k) => { const y = 8 + k * 64; base += A.rect(ax, y, aw, 56, '#f7f0dc', { rx: 5, sw: 1.2 }) + A.text(ax + 8, y + 10, t, { size: 9, anchor: 'start', weight: 700 }); });
    base += A.text(ax + 8, 94, 'pay 5', { size: 8, anchor: 'start', weight: 700, fill: C.gray }) + I('wood', ax + 31, 87, 14) + A.text(ax + 50, 94, '+ 2', { size: 8, anchor: 'start', weight: 700, fill: C.gray }) + I('reed', ax + 64, 87, 14);
    base += A.text(ax + 8, 158, 'needs an empty room', { size: 7, anchor: 'start', weight: 600, fill: C.gray });
    // Same drawings as the inline icons.
    const wood = (i, x, y) => A.k('w' + i, I('wood', x - 3, y - 4, 16));
    const reed = (i, x, y) => A.k('r' + i, I('reed', x - 5, y - 1, 16));
    const person = (key, x, y) => A.k(key, I('person', x - 9, y - 9, 18));
    const home1 = [fx + cs / 2, fy + cs * 1.5], home2 = [fx + cs / 2, fy + cs * 2.5];
    const onSpace = (k) => [ax + aw - 18, 8 + k * 64 + 38];
    const woodOnForest = () => [0, 1, 2, 3, 4, 5].map(i => wood(i, ax + 7 + i * 15, 36 + (i % 2) * 4)).join('');
    const woodInSupply = (n = 6) => [...Array(n).keys()].map(i => wood(i, 18 + i * 17, 162)).join('');
    const reeds = [0, 1].map(i => reed(i, 132 + i * 16, 158)).join('');
    const newRoom = A.k('room3', room(0));
    const start = base + woodOnForest() + reeds;
    return [
      { step: 0, say: 'Round 5. **6 {=wood}** are piled on Forest, and you need wood for a {=room}.', svg: start + person('p1', ...home1) + person('p2', ...home2) + A.glow(ax + 50, 46, 24, 'g-forest') },
      { step: 0, say: 'Place your first {=person} on **Forest**.', svg: start + person('p1', ...onSpace(0)) + person('p2', ...home2) },
      { step: 0, say: 'Take **all** 6 {=wood}.', svg: base + woodInSupply() + reeds + person('p1', ...onSpace(0)) + person('p2', ...home2) },
      { step: 2, say: 'Your second {=person} goes to **Farm expansion**.', svg: base + woodInSupply() + reeds + person('p1', ...onSpace(0)) + person('p2', ...onSpace(1)) + A.glow(...onSpace(1), 14, 'g-build') },
      { step: 2, say: 'Pay **{=wood}{=wood}{=wood}{=wood}{=wood} + {=reed}{=reed}**: a third room joins your house. 1 {=wood} is left.', svg: base + wood(5, 103, 162) + newRoom + person('p1', ...onSpace(0)) + person('p2', ...onSpace(1)) + A.glow(fx + cs / 2, fy + cs / 2, 18, 'g-room') },
      { step: 3, say: 'Next round you have more rooms than people, so you can use **Wish for children**.', svg: base + wood(5, 103, 162) + newRoom + person('p1', ...home1) + person('p2', ...home2) + A.glow(...onSpace(2), 14, 'g-fam') },
      { step: 3, say: 'A **child** is born: it works from next round and eats at the next harvest.', svg: base + wood(5, 103, 162) + newRoom + person('p1', ...onSpace(2)) + person('p2', ...home2) + A.k('baby', I('person', fx + cs / 2 - 6.5, fy + cs / 2 - 4.5, 13)) + A.glow(fx + cs / 2, fy + cs / 2, 14, 'g-baby') },
    ];
  },

  art(A) {
    const C = A.C, cs = 38, fx = 8, fy = 44;
    const ic = this.icons, I = (k, x, y, size) => A.use(ic[k].draw(A), x, y, size);
    const grass = '#9cc56a', soil = '#7a5233', wood = '#b07a45';
    let o = A.bg('#e9dfc4');
    // Farmyard: 5 columns × 3 rows
    o += A.rect(fx - 4, fy - 4, cs * 5 + 8, cs * 3 + 8, '#6f8f45', { rx: 6 });
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) {
      const x = fx + i * cs, y = fy + j * cs;
      o += A.rect(x + 1.5, y + 1.5, cs - 3, cs - 3, grass, { rx: 3, sw: 0.8, stroke: '#5f7c3a' });
    }
    // Wooden rooms (column 0)
    for (let j = 0; j < 3; j++) {
      const x = fx + 3, y = fy + j * cs + 3;
      o += A.rect(x, y, cs - 6, cs - 6, '#c99a62', { rx: 2, sw: 1 });
      for (let k = 1; k < 4; k++) o += A.line(x + 2, y + k * 8, x + cs - 8, y + k * 8, { stroke: '#8a5a33', sw: 0.8 });
      o += A.poly([[x - 1, y + 8], [x + (cs - 6) / 2, y - 1], [x + cs - 5, y + 8]], '#d9b553', { sw: 1 });
    }
    o += I('person', fx + cs / 2 - 14, fy + cs * 1.5 - 2, 16);
    o += I('person', fx + cs / 2 - 2, fy + cs * 2.5 - 2, 16);
    // Fields (column 1)
    const field = (i, j, crop) => {
      const x = fx + i * cs + 3, y = fy + j * cs + 3;
      let s = A.rect(x, y, cs - 6, cs - 6, soil, { rx: 2, sw: 1 });
      for (let k = 1; k < 5; k++) s += A.line(x + 3, y + k * 6.4, x + cs - 9, y + k * 6.4, { stroke: '#5a3a22', sw: 1 });
      if (crop === 'g') for (let k = 0; k < 3; k++) s += I('grain', x + 1 + k * 9, y + 7, 16);
      if (crop === 'v') for (let k = 0; k < 2; k++) s += I('vegetable', x + 3 + k * 12, y + 8, 15);
      return s;
    };
    o += field(1, 0, 'g') + field(1, 1, 'v') + field(1, 2, null);
    // Fenced pasture over columns 3–4, rows 0–1, with a stable
    const px = fx + 3 * cs, py = fy;
    o += A.rect(px + 2, py + 2, cs * 2 - 4, cs * 2 - 4, '#b5d77d', { rx: 2, sw: 0 });
    o += A.rect(px + 2, py + 2, cs * 2 - 4, cs * 2 - 4, 'none', { rx: 1, stroke: wood, sw: 4 });
    o += I('stable', px + cs * 2 - 32, py + cs * 2 - 34, 28);
    for (const [dx, dy] of [[8, 8], [28, 18], [46, 6], [12, 36], [50, 26]]) o += I('sheep', px + dx, py + dy, 17);
    // Boar beside an unfenced stable (row 2, col 4)
    o += I('stable', fx + 4 * cs + 2, fy + 2 * cs + 4, 22) + I('boar', fx + 4 * cs + 17, fy + 2 * cs + 16, 18);
    // Action spaces on the right
    const ax = 222, aw = 92;
    const spaces = [['wood', 5, true], ['clay', 3, false], ['reed', 2, true], ['food', 4, false]];
    spaces.forEach(([key, n, worker], k) => {
      const y = 28 + k * 40;
      o += A.rect(ax, y, aw, 32, '#f7f0dc', { rx: 4, sw: 1.2 });
      for (let i = 0; i < n; i++) o += I(key, ax + 4 + i * 12, y + 8 + (i % 2) * 3, 14);
      if (worker) o += I('person', ax + aw - 25, y + 5, 22);
    });
    o += A.note(fx + 18, fy + 30, 60, 16, 'Rooms hold your family');
    o += A.note(fx + cs * 1.5, fy + cs * 2.6, 70, 188, 'Plowed field');
    o += A.note(px + cs, py + cs * 2 - 2, 180, 188, 'Fenced pasture');
    o += A.note(ax + 64, 34, 262, 11, 'Action spaces');
    return o;
  },
});
