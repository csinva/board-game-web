defineGame({
  id: 'chess',
  name: 'Chess',
  year: 1475,
  designer: 'Traditional',
  family: 'classic',
  players: [2, 2], best: '2',
  time: [20, 90],
  age: 6,
  mechanics: ['grid-movement', 'spatial', 'take-that'],
  profile: { complexity: 3, luck: 1, interaction: 5, conflict: 5, talk: 1, planning: 5 },
  color: '#5b4632',

  pitch: 'Two armies, no dice, no secrets: out-think your opponent move by move until their king is trapped with nowhere to go.',
  theme: 'You are a general commanding a medieval army whose only real job is to protect its king.',

  goal: { big: 'Checkmate', text: '**Checkmate** the enemy king: attack it so that no move can save it. You never actually capture the king.' },

  turn: {
    type: 'choose',
    intro: 'White moves first. On your turn, move exactly one piece:',
    steps: [
      { verb: 'Move', text: 'Move **one** of your pieces the way that piece moves (see the table). Passing is not allowed.' },
      { verb: 'Capture', text: 'If you land on an enemy piece, it is captured and leaves the board.' },
      { verb: 'Stay safe', text: 'Your move may **never** leave your own king attacked. If you are in check, you must escape it now.' },
    ],
  },

  tension: 'Every attacking move also leaves something behind undefended, so you must weigh what you gain against what you expose.',

  flow: [
    { label: 'Opening', items: ['Control the centre', 'Develop knights & bishops', 'Castle the king'] },
    { label: 'Middlegame', items: ['Make threats', 'Trade pieces', 'Win material'] },
    { label: 'Endgame', items: ['Promote pawns', 'Activate the king', 'Deliver mate'] },
  ],

  end: {
    trigger: 'A king is checkmated, a player resigns, or the game is drawn',
    detail: 'Experienced players often resign when the position is clearly lost.',
    results: [
      { side: 'Win', text: 'if you checkmate the enemy king, or your opponent resigns.' },
      { side: 'Draw', text: 'on stalemate (player to move has no legal move but is not in check), the same position three times, 50 moves each with no capture or pawn move, not enough pieces to mate, or agreement.' },
    ],
  },

  ref: {
    title: 'How pieces move',
    rows: [
      ['King', '1 square, any direction'],
      ['Queen', 'any distance, straight or diagonal'],
      ['Rook', 'any distance, straight'],
      ['Bishop', 'any distance, diagonal'],
      ['Knight', 'L-shape (2 + 1); jumps over pieces'],
      ['Pawn', '1 forward (2 on its first move); captures 1 diagonally forward'],
    ],
  },

  example: 'Ana (White) moves her knight from f3 to g5, attacking Ben’s pawn on f7 with both the knight and her bishop on c4. Only Ben’s king defends f7, so Ben must react: he moves his queen to e7 to defend it a second time instead of developing another piece.',

  setup: [
    'Place the board so each player has a **light square** in the right-hand corner.',
    'Back row: rooks, knights, bishops; queen on her own colour, king beside her. Pawns fill the row in front.',
    'White moves first; swap colours between games.',
  ],

  terms: [
    ['Check', 'Your king is attacked. You must deal with it immediately.'],
    ['Checkmate', 'In check with no legal escape. The game is over.'],
    ['Stalemate', 'Not in check but no legal move. The game is a draw.'],
    ['Castling', 'King moves 2 squares toward a rook, and the rook hops over it.'],
    ['Material', 'The value of your remaining pieces (pawn 1, knight/bishop 3, rook 5, queen 9).'],
  ],

  gotchas: [
    '**Castling** is only legal if neither king nor that rook has moved, the squares between are empty, and the king is not in, through, or into check.',
    'A pawn reaching the far row **promotes** to a queen, rook, bishop or knight (almost always a queen).',
    '**En passant**: a pawn that advances 2 squares past an enemy pawn can be captured as if it moved 1, but only on the very next move.',
  ],

  tips: [
    'Before every move ask: **what does their last move threaten?**',
    'Get knights and bishops out early and castle; don’t move the same piece twice in the opening.',
    'Don’t hand out free pieces: count attackers and defenders before you capture.',
  ],

  art(A) {
    const C = A.C, s = 23, x0 = 8, y0 = 8;
    const light = '#f0d9b5', dark = '#b58863';
    let o = A.bg('#e8dcc4');
    o += A.rect(x0 - 4, y0 - 4, s * 8 + 8, s * 8 + 8, '#5b4632', { rx: 3, sw: 1.2 });
    o += A.grid(x0, y0, 8, 8, s, (i, j) => (i + j) % 2 ? dark : light, { sw: 0 });
    const sq = (sqr) => { const c = sqr.charCodeAt(0) - 97, r = +sqr[1]; return [x0 + c * s + s / 2, y0 + (8 - r) * s + s / 2]; };
    const V = '\uFE0E'; // text presentation, so iOS doesn't draw emoji pieces
    const G = { K: '♚' + V, Q: '♛' + V, R: '♜' + V, B: '♝' + V, N: '♞' + V, P: '♟' + V };
    const piece = (sqr, p, white) => {
      const [x, y] = sq(sqr);
      return `<text x="${x}" y="${y + 1}" font-size="${s * 0.86}" text-anchor="middle" dominant-baseline="central" font-family="'Apple Symbols','Segoe UI Symbol','DejaVu Sans',serif" fill="${white ? '#ffffff' : '#262220'}" stroke="${white ? '#262220' : '#262220'}" stroke-width="${white ? 1.1 : 0.6}" paint-order="stroke">${G[p]}</text>`;
    };
    const white = { g1: 'K', f1: 'R', a1: 'R', d1: 'Q', c4: 'B', c1: 'B', g5: 'N', c3: 'N', a2: 'P', b2: 'P', c2: 'P', e4: 'P', d3: 'P', f2: 'P', g2: 'P', h2: 'P' };
    const black = { g8: 'K', f8: 'R', a8: 'R', e7: 'Q', c5: 'B', c8: 'B', c6: 'N', f6: 'N', a7: 'P', b7: 'P', c7: 'P', d6: 'P', e5: 'P', f7: 'P', g7: 'P', h7: 'P' };
    // Highlight the knight move and the attacked square.
    const [fx, fy] = sq('f3'), [gx, gy] = sq('g5'), [tx, ty] = sq('f7');
    o += A.rect(fx - s / 2, fy - s / 2, s, s, '#f3e27a', { sw: 0, opacity: 0.75, rx: 0 });
    o += A.rect(gx - s / 2, gy - s / 2, s, s, '#f3e27a', { sw: 0, opacity: 0.75, rx: 0 });
    o += A.rect(tx - s / 2 + 1.5, ty - s / 2 + 1.5, s - 3, s - 3, 'none', { stroke: C.red, sw: 2.2, rx: 0 });
    for (const k in white) o += piece(k, white[k], true);
    for (const k in black) o += piece(k, black[k], false);
    o += A.path(`M${fx} ${fy} L${fx} ${gy + 7} `, { stroke: C.blue, sw: 2.2, dash: '3 2' });
    o += A.arrow(fx, gy + 4, gx - 7, gy + 4, { stroke: C.blue, sw: 2.2, head: 6 });
    const [bx, by] = sq('c4');
    o += A.arrow(bx + 6, by - 6, tx - 7, ty + 7, { stroke: C.red, sw: 1.8, head: 6, dash: '4 2' });
    // Captured pieces tray.
    o += A.rect(206, 150, 106, 38, '#f7efe0', { rx: 6, sw: 1 });
    o += `<text x="222" y="170" font-size="17" text-anchor="middle" dominant-baseline="central" font-family="'Apple Symbols','Segoe UI Symbol',serif" fill="#262220">${G.P}</text>`;
    o += `<text x="240" y="170" font-size="17" text-anchor="middle" dominant-baseline="central" font-family="'Apple Symbols','Segoe UI Symbol',serif" fill="#fff" stroke="#262220" stroke-width="1" paint-order="stroke">${G.P}</text>`;
    o += A.text(282, 170, 'captured', { size: 9, weight: 700, fill: C.gray });
    const [kx, ky] = sq('g8'), [px, py] = sq('d6');
    o += A.note(kx + 4, ky - 2, 262, 22, 'Protect your king');
    o += A.note(gx + 6, gy, 262, 70, 'Knight jumps in an L');
    o += A.note(tx + 8, ty - 4, 262, 46, 'f7: attacked twice');
    o += A.note(px, py + 6, 262, 120, 'Pawns push forward');
    return o;
  },
});
