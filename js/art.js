// Tiny SVG drawing kit shared by every game illustration.
// Every game's art(A) returns SVG markup drawn in a 320 x 200 viewBox.
// All helpers return strings, so art functions are just concatenation.

(function () {
  const C = {
    ink: '#2a2420', paper: '#fbf6ec', line: '#2a2420', shadow: 'rgba(42,36,32,.18)',
    red: '#c8423b', blue: '#2f6db5', green: '#3c8d4f', yellow: '#e2b33c', purple: '#7d55b5',
    orange: '#e07b2e', teal: '#2a9a96', pink: '#d9668f', brown: '#8a5a33', gray: '#8c877f',
    black: '#2b2b2b', white: '#ffffff', cream: '#f2e6cc', sand: '#e9d6a7', sea: '#7fb7d9',
    forest: '#3f7a3a', wheat: '#e8c547', brick: '#b8562f', ore: '#8f939a', sheep: '#a6d36b', desert: '#e3cf9a',
  };

  const attrs = (o) => Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');

  const stroke = (o) => ({ stroke: o.stroke === undefined ? C.line : o.stroke, 'stroke-width': o.sw === undefined ? 1.5 : o.sw });

  const A = {
    C,

    // Full-bleed background.
    bg(fill = C.paper) { return `<rect x="0" y="0" width="320" height="200" fill="${fill}"/>`; },

    rect(x, y, w, h, fill, o = {}) {
      return `<rect ${attrs({ x, y, width: w, height: h, rx: o.rx ?? 3, fill, ...stroke(o), opacity: o.opacity, transform: o.rotate ? `rotate(${o.rotate} ${x + w / 2} ${y + h / 2})` : undefined, 'stroke-dasharray': o.dash })}/>`;
    },

    circle(cx, cy, r, fill, o = {}) {
      return `<circle ${attrs({ cx, cy, r, fill, ...stroke(o), opacity: o.opacity, 'stroke-dasharray': o.dash })}/>`;
    },

    line(x1, y1, x2, y2, o = {}) {
      return `<line ${attrs({ x1, y1, x2, y2, stroke: o.stroke || C.line, 'stroke-width': o.sw || 2, 'stroke-dasharray': o.dash, 'stroke-linecap': 'round', opacity: o.opacity })}/>`;
    },

    path(d, o = {}) {
      return `<path ${attrs({ d, fill: o.fill || 'none', ...stroke(o), 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: o.opacity, 'stroke-dasharray': o.dash })}/>`;
    },

    poly(points, fill, o = {}) {
      return `<polygon ${attrs({ points: points.map(p => p.join(',')).join(' '), fill, ...stroke(o), 'stroke-linejoin': 'round', opacity: o.opacity })}/>`;
    },

    text(x, y, str, o = {}) {
      return `<text ${attrs({ x, y, 'font-size': o.size || 12, 'font-weight': o.weight || 600, fill: o.fill || C.ink, 'text-anchor': o.anchor || 'middle', 'dominant-baseline': 'central', 'font-family': o.serif ? 'Fraunces, Georgia, serif' : 'Inter, system-ui, sans-serif', 'font-style': o.italic ? 'italic' : undefined, transform: o.rotate ? `rotate(${o.rotate} ${x} ${y})` : undefined, 'letter-spacing': o.spacing })}>${String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`;
    },

    group(content, transform) { return `<g transform="${transform}">${content}</g>`; },

    // Pointy-top hexagon centred on (cx, cy). o.label draws a number token.
    hex(cx, cy, r, fill, o = {}) {
      const pts = [];
      for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 30); pts.push([+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1)]); }
      let s = A.poly(pts, fill, o);
      if (o.label !== undefined) s += A.circle(cx, cy, r * 0.32, C.cream, { sw: 1 }) + A.text(cx, cy + 0.5, o.label, { size: r * 0.34, fill: (o.label == 6 || o.label == 8) ? C.red : C.ink, weight: 800 });
      return s;
    },
    // Centre of hex (q, r) in an axial pointy-top grid with size r, origin (ox, oy).
    hexAt(q, r, size, ox, oy) { return [ox + size * Math.sqrt(3) * (q + r / 2), oy + size * 1.5 * r]; },

    // Playing card. o.title draws a header band; o.label big centre text; o.rotate degrees.
    card(x, y, w, h, fill, o = {}) {
      let s = A.rect(x + 2, y + 3, w, h, C.shadow, { sw: 0, rx: 5 });
      s += A.rect(x, y, w, h, o.face || C.white, { rx: 5 });
      s += A.rect(x + 3, y + 3, w - 6, h - 6, fill, { rx: 3, sw: 0 });
      if (o.title) s += A.rect(x + 3, y + 3, w - 6, Math.min(16, h * 0.22), C.white, { rx: 2, sw: 0, opacity: 0.85 }) + A.text(x + w / 2, y + 3 + Math.min(8, h * 0.11), o.title, { size: Math.min(9, w / 6), weight: 700 });
      if (o.label !== undefined) s += A.text(x + w / 2, y + h / 2 + (o.title ? 5 : 0), o.label, { size: o.size || Math.min(w, h) * 0.38, weight: 800, fill: o.labelFill || C.white, serif: o.serif });
      if (o.corner !== undefined) s += A.text(x + 9, y + 11, o.corner, { size: 9, weight: 800, fill: o.labelFill || C.white });
      return o.rotate ? A.group(s, `rotate(${o.rotate} ${x + w / 2} ${y + h / 2})`) : s;
    },

    // A row of fanned cards: n cards centred at (cx, cy).
    fan(cx, cy, n, w, h, fills, o = {}) {
      let s = '';
      const spread = o.spread || 10;
      for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0 : i / (n - 1) - 0.5;
        const f = Array.isArray(fills) ? fills[i % fills.length] : fills;
        const lab = o.labels ? o.labels[i] : undefined;
        s += A.group(A.card(-w / 2, -h, w, h, f, { label: lab, size: o.size, labelFill: o.labelFill, title: o.titles ? o.titles[i] : undefined }), `translate(${cx + t * (o.dx ?? w * 0.7) * (n - 1)} ${cy + h / 2 + Math.abs(t) * 8}) rotate(${t * spread * 2})`);
      }
      return s;
    },

    // Square letter tile (Scrabble style). o.letter, o.sub for points.
    tile(x, y, s, fill, o = {}) {
      let r = A.rect(x + 1.5, y + 2, s, s, C.shadow, { sw: 0, rx: 3 }) + A.rect(x, y, s, s, fill, { rx: 3, sw: o.sw ?? 1.2 });
      if (o.letter) r += A.text(x + s / 2, y + s / 2, o.letter, { size: s * 0.55, weight: 800, fill: o.fill || C.ink });
      if (o.sub !== undefined) r += A.text(x + s * 0.8, y + s * 0.8, o.sub, { size: s * 0.24, weight: 700, fill: o.fill || C.ink });
      return r;
    },

    // Grid of squares; fillFn(i, j) -> fill colour or null to skip.
    grid(x, y, cols, rows, s, fillFn, o = {}) {
      let r = '';
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const f = fillFn(i, j);
        if (f) r += A.rect(x + i * s, y + j * s, s, s, f, { rx: o.rx ?? 0, sw: o.sw ?? 0.8, stroke: o.stroke });
      }
      return r;
    },

    meeple(x, y, s, fill) {
      const k = s / 20;
      const d = `M${x} ${y - 10 * k} c${3 * k} 0 ${4.5 * k} ${2 * k} ${4.5 * k} ${4.5 * k} c0 ${1.5 * k} -${0.7 * k} ${2.5 * k} -${1.5 * k} ${3 * k} l${6 * k} ${2.5 * k} c${1.5 * k} ${0.7 * k} ${1.5 * k} ${3 * k} 0 ${3 * k} l-${4 * k} -${0.5 * k} l${3 * k} ${7.5 * k} h-${5 * k} l-${2.5 * k} -${4 * k} l-${2.5 * k} ${4 * k} h-${5 * k} l${3 * k} -${7.5 * k} l-${4 * k} ${0.5 * k} c-${1.5 * k} 0 -${1.5 * k} -${2.3 * k} 0 -${3 * k} l${6 * k} -${2.5 * k} c-${0.8 * k} -${0.5 * k} -${1.5 * k} -${1.5 * k} -${1.5 * k} -${3 * k} c0 -${2.5 * k} ${1.5 * k} -${4.5 * k} ${4.5 * k} -${4.5 * k}z`;
      return A.path(d, { fill, sw: 1.2 });
    },

    pawn(x, y, s, fill) {
      const k = s / 20;
      return A.path(`M${x - 7 * k} ${y + 10 * k} h${14 * k} l-${3 * k} -${8 * k} a${5 * k} ${5 * k} 0 1 0 -${8 * k} 0 z`, { fill, sw: 1.2 });
    },

    cube(x, y, s, fill) {
      const h = s * 0.35;
      return A.poly([[x, y + h], [x + s / 2, y], [x + s, y + h], [x + s / 2, y + 2 * h]], C.white, { sw: 1, opacity: 1 }) +
        A.poly([[x, y + h], [x + s / 2, y + 2 * h], [x + s / 2, y + 2 * h + s * 0.6], [x, y + h + s * 0.6]], fill, { sw: 1 }) +
        A.poly([[x + s, y + h], [x + s / 2, y + 2 * h], [x + s / 2, y + 2 * h + s * 0.6], [x + s, y + h + s * 0.6]], fill, { sw: 1, opacity: 0.8 }) +
        A.poly([[x, y + h], [x + s / 2, y], [x + s, y + h], [x + s / 2, y + 2 * h]], fill, { sw: 1, opacity: 0.6 });
    },

    // Six-sided die with pips; v can be a number or a symbol string.
    die(x, y, s, v, fill = C.white, o = {}) {
      let r = A.rect(x + 1.5, y + 2, s, s, C.shadow, { sw: 0, rx: s * 0.18 }) + A.rect(x, y, s, s, fill, { rx: s * 0.18, sw: 1.4 });
      const pip = o.pip || C.ink;
      if (typeof v === 'number') {
        const P = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] }[v] || [];
        for (const [i, j] of P) r += A.circle(x + s * (0.25 + i * 0.25), y + s * (0.25 + j * 0.25), s * 0.08, pip, { sw: 0 });
      } else r += A.text(x + s / 2, y + s / 2, v, { size: s * 0.5, weight: 800, fill: pip });
      return r;
    },

    // A route of n rectangular segments from (x1,y1) to (x2,y2) (Ticket to Ride style).
    route(x1, y1, x2, y2, n, fill, o = {}) {
      const len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      const seg = len / n, w = o.w || 9;
      let s = '';
      for (let i = 0; i < n; i++) s += A.rect(i * seg + 2, -w / 2, seg - 4, w, fill, { rx: 1.5, sw: 1 });
      if (o.trains) for (let i = 0; i < n; i++) s += A.rect(i * seg + 4, -w / 2 + 1.5, seg - 8, w - 3, o.trains, { rx: 2, sw: 0.8 });
      return A.group(s, `translate(${x1} ${y1}) rotate(${ang})`);
    },

    arrow(x1, y1, x2, y2, o = {}) {
      const ang = Math.atan2(y2 - y1, x2 - x1), h = o.head || 7, col = o.stroke || C.ink;
      const p1 = [x2 - h * Math.cos(ang - 0.45), y2 - h * Math.sin(ang - 0.45)], p2 = [x2 - h * Math.cos(ang + 0.45), y2 - h * Math.sin(ang + 0.45)];
      return A.line(x1, y1, x2, y2, { stroke: col, sw: o.sw || 2, dash: o.dash }) + A.poly([[x2, y2], p1, p2], col, { sw: 0 });
    },

    // Curved arrow via quadratic bezier with control point (cx, cy).
    curve(x1, y1, cx, cy, x2, y2, o = {}) {
      const ang = Math.atan2(y2 - cy, x2 - cx), h = o.head || 7, col = o.stroke || C.ink;
      const p1 = [x2 - h * Math.cos(ang - 0.45), y2 - h * Math.sin(ang - 0.45)], p2 = [x2 - h * Math.cos(ang + 0.45), y2 - h * Math.sin(ang + 0.45)];
      return A.path(`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, { stroke: col, sw: o.sw || 2, dash: o.dash }) + A.poly([[x2, y2], p1, p2], col, { sw: 0 });
    },

    star(cx, cy, r, fill, o = {}) {
      const pts = [];
      for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; pts.push([+(cx + rr * Math.cos(a)).toFixed(1), +(cy + rr * Math.sin(a)).toFixed(1)]); }
      return A.poly(pts, fill, o);
    },

    heart(cx, cy, s, fill, o = {}) {
      return A.path(`M${cx} ${cy + s * 0.35} C${cx - s} ${cy - s * 0.3} ${cx - s * 0.4} ${cy - s * 0.9} ${cx} ${cy - s * 0.35} C${cx + s * 0.4} ${cy - s * 0.9} ${cx + s} ${cy - s * 0.3} ${cx} ${cy + s * 0.35}z`, { fill, ...o });
    },

    // Speech bubble with text (for social games).
    bubble(x, y, w, h, str, o = {}) {
      return A.path(`M${x + 6} ${y} h${w - 12} q6 0 6 6 v${h - 12} q0 6 -6 6 h-${w - 24} l-8 9 l1 -9 h-${5} q-6 0 -6 -6 v-${h - 12} q0 -6 6 -6z`, { fill: o.fill || C.white, sw: 1.4 }) +
        A.text(x + w / 2, y + h / 2, str, { size: o.size || 11, weight: 700, fill: o.color || C.ink, italic: o.italic });
    },

    // Simple person bust (for role / social games). o.hidden draws a "?" face.
    person(x, y, s, fill, o = {}) {
      const k = s / 20;
      let r = A.path(`M${x - 9 * k} ${y + 12 * k} q0 -9 ${9 * k} -9 q${9 * k} 0 ${9 * k} 9 z`, { fill, sw: 1.2 }) + A.circle(x, y - 3 * k, 5.5 * k, o.face || fill, { sw: 1.2 });
      if (o.mark) r += A.text(x, y - 3 * k, o.mark, { size: 7 * k, weight: 800, fill: o.markFill || C.white });
      return r;
    },

    // Bird silhouette (Wingspan etc.).
    bird(x, y, s, fill) {
      const k = s / 20;
      return A.path(`M${x - 9 * k} ${y} q${4 * k} -${7 * k} ${11 * k} -${5 * k} l${4 * k} -${3 * k} l${1 * k} ${3 * k} l${3 * k} ${1 * k} l-${3 * k} ${1 * k} q-${1 * k} ${7 * k} -${9 * k} ${7 * k} l-${5 * k} ${3 * k} l${1 * k} -${3 * k} z`, { fill, sw: 1.1 }) + A.circle(x + 4 * k, y - 4.5 * k, 0.9 * k, C.ink, { sw: 0 });
    },

    // Crown / castle / house quick icons.
    house(x, y, s, fill) { return A.poly([[x - s / 2, y], [x - s / 2, y - s * 0.6], [x, y - s], [x + s / 2, y - s * 0.6], [x + s / 2, y]], fill, { sw: 1.2 }); },
    city(x, y, s, fill) { return A.poly([[x - s * 0.7, y], [x - s * 0.7, y - s * 0.55], [x - s * 0.2, y - s * 0.55], [x - s * 0.2, y - s * 0.75], [x + s * 0.15, y - s * 1.05], [x + s * 0.5, y - s * 0.75], [x + s * 0.5, y]], fill, { sw: 1.2 }); },
    crown(x, y, s, fill) { return A.poly([[x - s / 2, y], [x - s / 2, y - s * 0.6], [x - s / 4, y - s * 0.3], [x, y - s * 0.7], [x + s / 4, y - s * 0.3], [x + s / 2, y - s * 0.6], [x + s / 2, y]], fill, { sw: 1.2 }); },

    // Labelled callout used to annotate illustrations: dot at target, text box at (tx, ty).
    note(px, py, tx, ty, str, o = {}) {
      const w = o.w || str.length * 5.6 + 12;
      tx = Math.max(w / 2 + 3, Math.min(320 - w / 2 - 3, tx)); ty = Math.max(11, Math.min(189, ty));
      return A.line(px, py, tx, ty, { sw: 1, stroke: C.ink, dash: '2 2' }) + A.circle(px, py, 2.2, C.ink, { sw: 0 }) +
        A.rect(tx - w / 2, ty - 8, w, 16, o.fill || '#fffdf7', { rx: 8, sw: 1 }) + A.text(tx, ty, str, { size: 9.5, weight: 700 });
    },
  };

  window.A = A;
})();
