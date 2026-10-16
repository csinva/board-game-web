defineGame({
  id: 'chess',
  name: 'Chess',
  year: 'c. 1475',
  designer: 'Traditional',
  family: 'classic',
  players: [2, 2], best: '2',
  time: [20, 90],
  age: 6,
  mechanics: ['grid-movement', 'spatial', 'take-that'],
  profile: { complexity: 3, luck: 1, interaction: 5, conflict: 5, talk: 1, planning: 5 },
  color: '#5b4632',

  // Pieces as text glyphs: {=knight} is Black's solid piece (clearest in text), {=w-knight} White's; art + walk draw both from here.
  icons: (() => {
    const V = '︎'; // text presentation, so iOS doesn't draw emoji pieces
    const G = { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' };
    const glyph = (ch, white) => `<text x="12" y="12.5" font-size="25" text-anchor="middle" dominant-baseline="central" font-family="'Apple Symbols','Segoe UI Symbol','DejaVu Sans',serif" fill="${white ? '#ffffff' : '#262220'}" stroke="#262220" stroke-width="${white ? 1.2 : 0.6}" paint-order="stroke">${ch + V}</text>`;
    const o = {};
    for (const k in G) {
      o[k] = { name: k, draw: () => glyph(G[k], false) };
      o['w-' + k] = { name: 'white ' + k, draw: () => glyph(G[k], true) };
    }
    return o;
  })(),

  pitch: 'Move one piece per turn, capture enemy pieces, and checkmate the enemy king to win.',

  goal: { big: 'Checkmate', text: '**Checkmate** the enemy {king}: attack it so no move can save it. The king is never actually captured.' },

  turn: {
    type: 'choose',
    intro: 'White moves first. On your turn, make exactly one move:',
    steps: [
      { verb: 'Move', text: 'Move **one** piece the way it moves (see the table). Only the {=knight} jumps over pieces. No passing.' },
      { verb: 'Capture', text: 'Land on an enemy piece to capture it; it leaves the board.' },
      { verb: 'Stay safe', text: 'Your move may **never** leave your own {=king} attacked. If in check, you must escape now.' },
    ],
  },

  tension: 'Every attacking move leaves something undefended, so you weigh what you gain against what you expose.',

  structure: [
    { label: 'Setup', text: 'Light square in each player’s right-hand corner; pieces on the back two rows. White moves first.' },
    { label: 'Moves', repeat: 'alternating', text: 'One move each, no passing. A player in check must get out of it.' },
    { label: 'Game end', text: 'Checkmate or resignation wins. Otherwise it ends in a draw (see How it ends).' },
  ],

  end: {
    trigger: 'a king is checkmated, a player resigns, or the game is drawn',
    results: [
      { side: 'Win', text: 'if you checkmate the enemy king or your opponent resigns.' },
      { side: 'Draw', text: 'on stalemate (player to move has no legal move and is not in check), too few pieces to mate, or agreement; or claimed by a player when the same position occurs 3 times (same player to move) or after 50 moves each with no capture or pawn move.' },
    ],
  },

  ref: {
    title: 'How pieces move',
    rows: [
      ['{=king} King', '1 square, any direction'],
      ['{=queen} Queen', 'any distance, straight or diagonal'],
      ['{=rook} Rook', 'any distance, straight'],
      ['{=bishop} Bishop', 'any distance, diagonal'],
      ['{=knight} Knight', 'L-shape (2 + 1); jumps over pieces'],
      ['{=pawn} Pawn', '1 forward (2 from its start square); captures 1 diagonally forward'],
    ],
  },

  example: 'Ana (White) moves her {=w-knight} f3 → g5, attacking Ben’s pawn on f7 with both the knight and her {=w-bishop} on c4. Only Ben’s king defends f7, so Ben moves his {=queen} d8 → e7 to defend it a second time.',

  setup: [
    'Turn the board so each player has a **light square** in the right-hand corner.',
    'Back row, corners inward: {rook}, {knight}, {bishop}; the {queen} on her own colour, the {king} beside her. 8 {pawn}s fill the row in front.',
    'White moves first; swap colours between games.',
  ],

  terms: [
    ['Check', 'Your king is attacked. You must end the attack on this move.'],
    ['Checkmate', 'In check with no legal escape: game over.'],
    ['Stalemate', 'Not in check but no legal move: a draw.'],
    ['Castling', '{=king} moves 2 squares toward a {=rook}; the rook jumps to the king’s other side.'],
    ['Material', 'Piece values: {=pawn} 1, {=knight} 3, {=bishop} 3, {=rook} 5, {=queen} 9.'],
  ],

  gotchas: [
    '**Castling** is legal only if neither the king nor that rook has moved, the squares between are empty, and the king is not in, through or into check.',
    'A {=pawn} reaching the far row **must promote** to a queen, rook, bishop or knight of its colour (usually a queen), even if that piece is still on the board.',
    '**En passant**: if a pawn advances 2 squares and lands beside an enemy pawn, that pawn may capture it as if it had moved 1, but only on the very next move.',
  ],

  tips: [
    'Before every move ask: **what does their last move threaten?**',
    'Develop knights and bishops early and castle; don’t move one piece twice in the opening.',
    'Count attackers and defenders before you capture.',
  ],

  walk(A) {
    const C = A.C, I = this.icons, s = 22, x0 = 8, y0 = 12;
    const sq = (n) => [x0 + (n.charCodeAt(0) - 97) * s + s / 2, y0 + (8 - +n[1]) * s + s / 2];
    const NM = { K: 'king', Q: 'queen', R: 'rook', B: 'bishop', N: 'knight', P: 'pawn' };
    // Same glyph drawings as the inline icons; the icon's 25px glyph sits at (12, 12.5) in its 24 box.
    const glyph = (x, y, p, white, size = s * 0.86) => { const k = size / 25; return A.use(I[(white ? 'w-' : '') + NM[p]].draw(A), x - 12 * k, y + 1 - 12.5 * k, 24 * k); };
    const pc = (n, p, white) => glyph(...sq(n), p, white);
    let base = A.bg('#e8dcc4') + A.rect(x0 - 4, y0 - 4, s * 8 + 8, s * 8 + 8, '#5b4632', { rx: 3, sw: 1.2 });
    base += A.grid(x0, y0, 8, 8, s, (i, j) => (i + j) % 2 ? '#b58863' : '#f0d9b5', { sw: 0 });
    for (let i = 0; i < 8; i++) base += A.text(x0 + i * s + s - 3, y0 + 8 * s - 4, 'abcdefgh'[i], { size: 5, weight: 700, fill: '#5b4632' });
    const white = { e1: 'K', d1: 'Q', a1: 'R', h1: 'R', c1: 'B', c4: 'B', c3: 'N', a2: 'P', b2: 'P', c2: 'P', d3: 'P', e4: 'P', f2: 'P', g2: 'P', h2: 'P' };
    const black = { e8: 'K', a8: 'R', h8: 'R', c8: 'B', c5: 'B', c6: 'N', f6: 'N', a7: 'P', b7: 'P', c7: 'P', d6: 'P', e5: 'P', g7: 'P', h7: 'P' };
    for (const k in white) base += pc(k, white[k], true);
    for (const k in black) base += pc(k, black[k], false);
    base += A.tag(256, 20, 'Ben (Black)') + A.tag(256, 180, 'Ana (White)');
    base += A.rect(204, 84, 104, 34, '#f7efe0', { rx: 6, sw: 1 }) + A.text(256, 92, 'captured', { size: 7, weight: 700, fill: C.gray });
    const hl = (n, f = '#f3e27a') => { const [x, y] = sq(n); return A.rect(x - s / 2, y - s / 2, s, s, f, { sw: 0, opacity: 0.75, rx: 0 }); };
    const ring = (n, f = C.red) => { const [x, y] = sq(n); return A.rect(x - s / 2 + 1.5, y - s / 2 + 1.5, s - 3, s - 3, 'none', { stroke: f, sw: 2.2, rx: 0 }); };
    const knight = (n) => A.k('wN', pc(n, 'N', true));
    const queen = (n) => A.k('bQ', pc(n, 'Q', false));
    const pawn = A.k('bPf7', pc('f7', 'P', false));
    const toMove = (who) => A.text(256, 56, who + ' to move', { size: 9, weight: 700 });
    const ar = (a, b, f, dash) => { const [x1, y1] = sq(a), [x2, y2] = sq(b), d = Math.hypot(x2 - x1, y2 - y1), k = 8 / d; return A.arrow(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, { stroke: f, sw: 2, head: 6, dash }); };
    return [
      { step: 0, say: 'Ana (White) to move. Her knight on **f3** and bishop on c4 both aim at Black’s kingside.', svg: base + toMove('White') + knight('f3') + queen('d8') + pawn + A.glow(...sq('f3'), 14, 'g-n') },
      { step: 0, say: 'The {=w-knight} moves in an **L** (2 up, 1 right): f3 → g5. Knights jump over pieces.', svg: base + hl('f3') + hl('g5') + toMove('Black') + knight('g5') + queen('d8') + pawn },
      { step: 1, say: 'Now f7 is attacked **twice** ({=w-knight} and {=w-bishop}) and defended once, by Ben’s king.', svg: base + hl('f3') + hl('g5') + toMove('Black') + knight('g5') + queen('d8') + pawn + ring('f7') +
        ar('g5', 'f7', C.blue) + ar('c4', 'f7', C.red, '4 2') },
      { step: 1, say: 'If Ben ignored it, the knight would **capture** on f7 and attack his {=queen} and {=rook} at once.', svg: base + toMove('Black') + knight('f7') + queen('d8') +
        A.k('tray', glyph(222, 106, 'P', false, 17)) + ar('f7', 'd8', C.red) + ar('f7', 'h8', C.red) + A.text(256, 140, '(what if…)', { size: 10, weight: 700, fill: C.red, italic: true }) },
      { step: 2, say: 'His king couldn’t take back: the bishop guards f7, and a king may **never** move into check.', svg: base + toMove('Black') + knight('f7') + queen('d8') +
        A.k('tray', glyph(222, 106, 'P', false, 17)) + ring('f7') + ar('c4', 'f7', C.red, '4 2') + A.glow(...sq('e8'), 13, 'g-k') + A.text(256, 140, '(what if…)', { size: 10, weight: 700, fill: C.red, italic: true }) },
      { step: 0, say: 'So Ben defends: {=queen} **d8 → e7** guards f7 a second time.', svg: base + hl('d8') + hl('e7') + toMove('White') + knight('g5') + queen('e7') + pawn + ar('e7', 'f7', C.green) },
    ];
  },

  art(A) {
    const C = A.C, I = this.icons, s = 23, x0 = 8, y0 = 8;
    const light = '#f0d9b5', dark = '#b58863';
    let o = A.bg('#e8dcc4');
    o += A.rect(x0 - 4, y0 - 4, s * 8 + 8, s * 8 + 8, '#5b4632', { rx: 3, sw: 1.2 });
    o += A.grid(x0, y0, 8, 8, s, (i, j) => (i + j) % 2 ? dark : light, { sw: 0 });
    const sq = (sqr) => { const c = sqr.charCodeAt(0) - 97, r = +sqr[1]; return [x0 + c * s + s / 2, y0 + (8 - r) * s + s / 2]; };
    const NM = { K: 'king', Q: 'queen', R: 'rook', B: 'bishop', N: 'knight', P: 'pawn' };
    const icon = (x, y, p, white, size) => { const k = size / 25; return A.use(I[(white ? 'w-' : '') + NM[p]].draw(A), x - 12 * k, y + 1 - 12.5 * k, 24 * k); };
    const piece = (sqr, p, white) => icon(...sq(sqr), p, white, s * 0.86);
    const white = { g1: 'K', f1: 'R', a1: 'R', d1: 'Q', c4: 'B', c1: 'B', g5: 'N', c3: 'N', a2: 'P', b2: 'P', e4: 'P', d3: 'P', f2: 'P', g2: 'P', h2: 'P' };
    const black = { g8: 'K', f8: 'R', a8: 'R', e7: 'Q', c5: 'B', c8: 'B', c6: 'N', f6: 'N', a7: 'P', b7: 'P', d6: 'P', e5: 'P', f7: 'P', g7: 'P', h7: 'P' };
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
    o += icon(222, 169, 'P', false, 17) + icon(240, 169, 'P', true, 17);
    o += A.text(282, 170, 'captured', { size: 9, weight: 700, fill: C.gray });
    const [kx, ky] = sq('g8'), [px, py] = sq('d6');
    o += A.note(kx + 4, ky - 2, 262, 22, 'Protect your king');
    o += A.note(gx + 6, gy, 262, 70, 'Knight jumps in an L');
    o += A.note(tx + 8, ty - 4, 262, 46, 'f7: attacked twice');
    o += A.note(px, py + 6, 262, 120, 'Pawns push forward');
    return o;
  },
});
