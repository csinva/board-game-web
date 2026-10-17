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

  goal: { big: 'Checkmate', text: '**Checkmate** the enemy {king}: attack it so that no legal move can end the attack. The king is never actually captured.' },

  turn: {
    type: 'sequence',
    intro: 'White moves first; players alternate. Each turn is exactly one move:',
    steps: [
      { verb: 'Move', text: 'Move **1** of your pieces in the way that piece moves (see the table). Only the {=knight} may jump over other pieces. You may not skip your turn.' },
      { verb: 'Capture', text: 'If the piece you moved ended on an enemy piece’s square, that enemy piece is captured and removed from the game. A piece can’t end on a square holding your own piece.' },
      { verb: 'King safe?', text: 'The move is legal only if it leaves your own {=king} **not** under attack. If your king was attacked (in **check**), your move must end the attack: move the king, block, or capture the attacker.' },
    ],
  },

  tension: 'Every attacking move leaves something undefended, so you weigh what you gain against what you expose.',

  structure: [
    { label: 'Setup', text: 'Turn the board so each player has a light square in their right-hand corner. Each player’s 16 pieces fill the 2 rows nearest them. White moves first.' },
    { label: 'Moves', repeat: 'alternating', text: 'Players take turns making 1 move each; no one may skip. A player in check must end the check with that move.' },
    { label: 'Game end', text: 'Checkmate or resignation wins. Otherwise it ends in a draw (see How it ends).' },
  ],

  end: {
    trigger: 'a king is checkmated, a player resigns, or the game is drawn',
    results: [
      { side: 'Win', text: 'if you checkmate the enemy king or your opponent resigns.' },
      { side: 'Draw', text: 'on stalemate (the player to move has no legal move and is not in check), when neither side has enough pieces left to checkmate (e.g. king against king), or by agreement. A player may also claim a draw when the same position occurs 3 times with the same player to move, or after 50 moves by each player in a row with no capture and no pawn move.' },
    ],
  },

  ref: {
    title: 'How pieces move',
    rows: [
      ['{=king} King', '1 square, any direction'],
      ['{=queen} Queen', 'any number of squares in one line: along a row, a column or a diagonal'],
      ['{=rook} Rook', 'any number of squares along a row or column'],
      ['{=bishop} Bishop', 'any number of squares along a diagonal'],
      ['{=knight} Knight', 'L-shape: 2 squares along a row or column, then 1 square sideways; jumps over pieces'],
      ['{=pawn} Pawn', 'moves 1 square straight forward onto an empty square (or 2 on its first move, if both are empty); captures only 1 square diagonally forward'],
    ],
  },

  example: 'Ana (White) moves her {=w-knight} f3 → g5, attacking Ben’s pawn on f7 with both the knight and her {=w-bishop} on c4. Only Ben’s king defends f7, so Ben moves his {=queen} d8 → e7 to defend it a second time.',

  setup: [
    'Turn the board so each player has a **light square** in the right-hand corner.',
    'On your back row, from each corner inward: {rook}, {knight}, {bishop}. Your {queen} goes on the middle square of her own colour (White’s on light, Black’s on dark), your {king} on the last square, beside her. Your 8 {pawn}s fill the row in front.',
    'Choose colours at random for the first game; swap colours each game after. White moves first.',
  ],

  terms: [
    ['Square names', 'Columns are lettered a–h and rows numbered 1–8, both counted from White’s bottom-left corner: White’s queen starts on d1.'],
    ['Check', 'Your king is attacked. You must end the attack with your next move.'],
    ['Checkmate', 'Your king is in check and no legal move ends the attack: you lose.'],
    ['Stalemate', 'The player to move is not in check but has no legal move: the game is a draw.'],
    ['Castling', 'A single move: your {=king} moves 2 squares along the back row toward a {=rook}, and that rook moves to the square the king crossed.'],
    ['Material', 'Rough piece values for judging trades (not points): {=pawn} 1, {=knight} 3, {=bishop} 3, {=rook} 5, {=queen} 9.'],
  ],

  gotchas: [
    '**Castling** is legal only if neither the king nor that rook has moved, the squares between them are empty, the king is not in check, and the king does not cross or land on a square an enemy piece attacks.',
    'A {=pawn} that reaches the far row **must promote**: replace it with a queen, rook, bishop or knight of its colour (usually a queen), even if you still have that piece on the board.',
    '**En passant**: if a pawn moves 2 squares forward and lands right beside an enemy pawn, the enemy pawn may capture it by moving diagonally onto the square it skipped, as if it had moved only 1. This is allowed only on the very next move.',
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
      { step: 2, say: 'His king couldn’t capture the knight on f7: the bishop guards f7, and a king may **never** move into check.', svg: base + toMove('Black') + knight('f7') + queen('d8') +
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
