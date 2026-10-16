defineGame({
  id: 'forbidden-island',
  name: 'Forbidden Island',
  year: 2010,
  designer: 'Matt Leacock',
  family: 'coop',
  players: [2, 4], best: '4',
  time: [30, 30],
  age: 10,
  mechanics: ['cooperative', 'action-points', 'set-collection', 'hand-management', 'variable-powers', 'grid-movement'],
  profile: { complexity: 1, luck: 3, interaction: 4, conflict: 1, talk: 5, planning: 3 },

  pitch: 'Grab four treasures from a sinking island and fly off together, before the tiles under your feet flood away.',
  theme: 'You are a team of adventurers looting a cursed island that is sinking into the sea.',

  goal: { big: '4 treasures', text: 'Capture all **4 treasures**, get everyone back to **Fools’ Landing**, and play a Helicopter Lift to fly away. Everyone wins or loses together.' },

  turn: {
    type: 'sequence',
    steps: [
      { verb: 'Act ×3', text: 'Take up to **3 actions**: move one tile, shore up a flooded tile, give a treasure card, or capture a treasure.' },
      { verb: 'Draw 2', text: 'Draw 2 treasure cards. **Waters Rise!** raises the water level and puts the flooded tiles back on top of the flood deck.' },
      { verb: 'Flood', text: 'Draw flood cards equal to the **water level**. Flip each tile to flooded; if it was already flooded, it sinks.' },
    ],
  },

  tension: 'Each action spent shoring up the tiles you need is an action not spent racing to the treasures, and the island shrinks every turn.',

  flow: [
    { label: 'Survive', items: ['Shore up tiles', 'Keep both temples', 'Keep Fools’ Landing'] },
    { label: 'Collect', items: ['Draw treasure cards', 'Give cards on same tile', 'Hand limit 5'] },
    { label: 'Escape', items: ['4 of a kind = treasure', 'Meet at Fools’ Landing', 'Helicopter Lift'] },
  ],

  end: {
    trigger: 'the team escapes with all 4 treasures, or the island beats you',
    results: [
      { side: 'Team wins', text: 'if everyone is on Fools’ Landing with all 4 treasures and someone plays Helicopter Lift.' },
      { side: 'Team loses', text: 'if both temples of an uncaptured treasure sink, Fools’ Landing sinks, a player can’t swim off a sinking tile, or the water hits the **skull**.' },
    ],
  },

  ref: {
    title: 'Roles',
    rows: [
      ['Pilot', 'once a turn, fly to any tile'],
      ['Engineer', 'shore up 2 tiles for 1 action'],
      ['Explorer', 'moves and shores up diagonally'],
      ['Diver', 'swims through flooded or sunk tiles'],
      ['Navigator', 'moves another player up to 2 tiles'],
      ['Messenger', 'gives cards from anywhere'],
    ],
  },

  example: 'Water level is 3. Sam, the Engineer, moves onto the Temple of the Moon (1 action), shores up two flooded tiles beside him (1 action), and moves again. He draws an Earth Stone card and **Waters Rise!**: the level goes to 4. He flips 4 flood cards; Coral Palace was already flooded, so it **sinks**.',

  setup: [
    'Shuffle the 24 island tiles into the island shape; place the 4 treasures around it.',
    'Flood 6 tiles: draw 6 flood cards and flip those tiles to their blue side.',
    'Deal roles; deal 2 treasure cards each (reshuffle any Waters Rise!). Set the water level by difficulty.',
  ],

  terms: [
    ['Shore up', 'Flip a flooded tile back to dry. Your tile or one next to you.'],
    ['Flooded', 'Blue side up. Still usable, but the next flood sinks it.'],
    ['Sunk', 'Tile removed forever, along with its flood card.'],
    ['Water level', 'Number of flood cards drawn each turn. Rises with Waters Rise!'],
  ],

  gotchas: [
    'Movement and shoring up are **orthogonal only** (no diagonals) unless you are the Explorer.',
    'To capture a treasure you discard **4 matching cards** while standing on one of **its two** temple tiles.',
    'Helicopter Lift and Sandbags can be played **at any time**, even on another player’s turn, and don’t cost an action.',
  ],

  tips: [
    'Keep **Fools’ Landing** and at least one temple of each treasure dry; those are the tiles that can lose you the game.',
    'After a Waters Rise!, the tiles just flooded will come up again: shore those up first.',
    'Discard extra treasure cards of a colour you’ve already captured.',
  ],

  art(A) {
    const C = A.C;
    let o = A.bg('#2f86b5');
    // waves
    for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) o += A.path(`M${8 + i * 36 + (j % 2) * 18} ${14 + j * 28} q4 -4 8 0 q4 4 8 0`, { stroke: '#8fd0ee', sw: 1.2, opacity: 0.6 });
    const rows = [2, 4, 6, 6, 4, 2], s = 23, g = 3, ox = 62, oy = 10;
    const sunk = { '1,1': 1, '4,4': 1 };
    const flooded = { '2,0': 1, '3,2': 1, '1,3': 1, '4,3': 1 };
    const treas = { '2,1': '#c9a227', '5,2': '#c94c3a', '0,3': '#3db0b0', '3,4': '#8a6a45' };
    const pos = {};
    rows.forEach((n, j) => {
      const start = (6 - n) / 2;
      for (let k = 0; k < n; k++) {
        const i = start + k, key = i + ',' + j, x = ox + i * (s + g), y = oy + j * (s + g);
        pos[key] = [x, y];
        if (sunk[key]) { o += A.rect(x, y, s, s, 'none', { stroke: '#bfe6f7', dash: '3 3', sw: 1, rx: 3 }); continue; }
        if (flooded[key]) o += A.rect(x, y, s, s, '#5aa9d6', { rx: 3, stroke: '#1d4e6e' }) + A.path(`M${x + 4} ${y + 13} q4 -4 8 0 q4 4 8 0`, { stroke: '#fff', sw: 1.2 });
        else o += A.rect(x, y, s, s, '#e3cf9a', { rx: 3, stroke: '#7a5a2e' }) + A.rect(x + 3, y + 3, s - 6, s - 6, '#a7c87a', { rx: 2, sw: 0, opacity: 0.55 });
        if (treas[key]) o += A.circle(x + s / 2, y + s / 2, 6, treas[key], { sw: 1 });
      }
    });
    // Fools' Landing marker
    const [fx, fy] = pos['2,5'];
    o += A.circle(fx + s / 2, fy + s / 2, 7, C.white, { sw: 1 }) + A.text(fx + s / 2, fy + s / 2 + 0.5, 'H', { size: 9, weight: 800 });
    // pawns
    const pawn = (k, c) => { const [x, y] = pos[k]; return A.pawn(x + s / 2, y + s / 2 - 2, 15, c); };
    o += pawn('3,1', C.red) + pawn('2,3', C.green) + pawn('4,2', C.yellow);
    // water meter
    o += A.rect(262, 30, 22, 140, '#e9f5fb', { rx: 6 });
    for (let i = 0; i < 9; i++) o += A.line(262, 40 + i * 14, 272, 40 + i * 14, { sw: 1 });
    o += A.rect(265, 100, 16, 68, '#2a6c96', { rx: 3, sw: 0 });
    o += A.text(273, 41, '☠', { size: 11 });
    o += A.poly([[256, 100], [262, 96], [262, 104]], C.red, { sw: 0 });
    const [ax, ay] = pos['3,2'], [bx, by] = pos['4,4'], [tx, ty] = pos['2,1'];
    o += A.note(ax + s / 2, ay + s - 3, 120, 186, 'Flooded: shore it up');
    o += A.note(bx + s / 2, by + s / 2, 246, 186, 'Sunk: gone for good');
    o += A.note(260, 100, 238, 14, 'Water level');
    o += A.note(tx + s / 2, ty + s / 2, 46, 14, 'Treasure temple');
    return o;
  },
});
