// Run with: tools/validate.sh   (uses macOS JavaScriptCore, no node needed)
// Loads every game file and checks it against the schema in SCHEMA.md.
var window = this;
var document = { currentScript: null };
var console = { warn: print, log: print };
load('js/core.js');
load('js/art.js');
var errors = 0;
function err(id, msg) { print('✗ ' + id + ': ' + msg); errors++; }
function warn(id, msg) { print('· ' + id + ': ' + msg); }
var only = typeof arguments !== 'undefined' && arguments.length ? arguments : null;
var ids = only ? Array.prototype.slice.call(only) : GAME_IDS;
ids.forEach(function (id) {
  var before = GAMES.length;
  try { load('js/games/' + id + '.js'); } catch (e) { err(id, 'failed to load: ' + e); return; }
  if (GAMES.length !== before + 1) { err(id, 'file must call defineGame exactly once'); return; }
  var g = GAMES[GAMES.length - 1];
  if (g.id !== id) err(id, 'id mismatch: ' + g.id);
  ['name', 'designer', 'family', 'pitch', 'tension', 'example'].forEach(function (k) { if (typeof g[k] !== 'string' || !g[k]) err(id, 'missing string ' + k); });
  if (typeof g.year !== 'number' && typeof g.year !== 'string') err(id, 'year must be a number, or text like "Traditional" / "c. 1630" when no exact year is documented');
  if (!FAMILIES[g.family]) err(id, 'unknown family ' + g.family);
  ['players', 'time'].forEach(function (k) { if (!Array.isArray(g[k]) || g[k].length !== 2) err(id, k + ' must be [min, max]'); });
  if (typeof g.age !== 'number') err(id, 'age must be a number');
  (g.mechanics || []).forEach(function (m) { if (!MECHANICS[m]) err(id, 'unknown mechanic ' + m); });
  if (!g.mechanics || g.mechanics.length < 3) err(id, 'need at least 3 mechanics');
  PROFILE_AXES.forEach(function (ax) { var v = g.profile && g.profile[ax.key]; if (!(v >= 1 && v <= 5)) err(id, 'profile.' + ax.key + ' must be 1–5'); });
  if (!g.goal || !g.goal.big || !g.goal.text) err(id, 'goal needs big + text');
  if (g.goal && g.goal.big && g.goal.big.length > 18) err(id, 'goal.big too long (max 18 chars): ' + g.goal.big);
  if (!g.turn || ['sequence', 'choose', 'simultaneous', 'round'].indexOf(g.turn.type) < 0) err(id, 'turn.type invalid');
  if (!g.turn || !g.turn.steps || g.turn.steps.length < 2 || g.turn.steps.length > 5) err(id, 'turn needs 2–5 steps');
  (g.turn && g.turn.steps || []).forEach(function (s) { if (!s.verb || !s.text) err(id, 'turn step needs verb + text'); if (s.verb && s.verb.length > 12) err(id, 'turn verb too long (max 12): ' + s.verb); });
  if (!Array.isArray(g.structure) || g.structure.length < 2 || g.structure.length > 6) err(id, 'structure needs 2–6 stages (game timeline)');
  (g.structure || []).forEach(function (st, i) { if (!st.label || !st.text) err(id, 'structure[' + i + '] needs label + text'); });
  if (g.flow) warn(id, 'flow is no longer shown: fold anything needed into structure/points, then delete it');
  if (g.scoring && !g.points) err(id, 'points game: add points [[source, how it scores], …] listing every way to score');
  if (!g.end || !g.end.trigger) err(id, 'end.trigger missing');
  if (!g.scoring && !(g.end && g.end.results)) err(id, 'need scoring[] or end.results[]');
  if (g.ref && (!g.ref.title || !g.ref.rows)) err(id, 'ref needs title + rows');
  [['setup', 2, 7], ['gotchas', 2, 7], ['tips', 2, 4]].forEach(function (r) { var v = g[r[0]]; if (!Array.isArray(v) || v.length < r[1] || v.length > r[2]) err(id, r[0] + ' needs ' + r[1] + '–' + r[2] + ' items'); });
  if (!Array.isArray(g.terms) || g.terms.length < 2 || g.terms.length > 8) err(id, 'terms needs 2–8 [term, def] pairs');
  if (g.pitch && g.pitch.length > 130) err(id, 'pitch too long (' + g.pitch.length + ' > 130)');
  if (g.theme) warn(id, 'theme field is no longer used: delete it (rules only, no flavor)');
  if (typeof g.walk !== 'function') warn(id, 'walk(A) missing (animated turn walkthrough)');
  else {
    try {
      var fr = g.walk(A);
      if (!Array.isArray(fr) || fr.length < 3 || fr.length > 8) err(id, 'walk must return 3–8 slides');
      (fr || []).forEach(function (f, i) {
        if (typeof f.step !== 'number' || f.step < 0 || f.step >= g.turn.steps.length) err(id, 'walk slide ' + i + ': step must index turn.steps');
        if (!f.say || !f.svg) err(id, 'walk slide ' + i + ': needs say + svg');
        if (f.svg && f.svg.indexOf('NaN') >= 0) err(id, 'walk slide ' + i + ' produced NaN');
        var keys = (f.svg || '').match(/data-k="[^"]+"/g) || [], seen = {};
        keys.forEach(function (k) { if (seen[k]) err(id, 'walk slide ' + i + ': duplicate key ' + k); seen[k] = 1; });
      });
    } catch (e) { err(id, 'walk threw: ' + e); }
  }
  if (g.profile && g.profile.complexity >= 4 && !g.extended) warn(id, 'heavy game: add extended details');
  if (g.extended) g.extended.forEach(function (x) { if (!x.title || !(x.text || x.items)) err(id, 'extended section needs title + text/items'); });
  // Inline icon tokens: {key} / {=key} must resolve to g.icons or A.ICONS.
  if (g.icons) Object.keys(g.icons).forEach(function (k) {
    var ic = g.icons[k];
    if (!ic.name || typeof ic.draw !== 'function') { err(id, 'icon ' + k + ' needs name + draw(A)'); return; }
    try { var sv = ic.draw(A); if (sv.indexOf('NaN') >= 0) err(id, 'icon ' + k + ' produced NaN'); } catch (e) { err(id, 'icon ' + k + ' threw: ' + e); }
  });
  (function scan(v, path) {
    if (typeof v === 'string') {
      (v.match(/\{=?[a-z0-9-]+\}/g) || []).forEach(function (t) {
        var k = t.replace(/[{}=]/g, '');
        if (!((g.icons && g.icons[k]) || A.ICONS[k])) err(id, 'unknown icon token ' + t + ' in ' + path);
        if (/^(pitch|theme|name|goal\.big)$/.test(path)) err(id, 'no icon tokens in ' + path);
      });
    } else if (Array.isArray(v)) v.forEach(function (x, i) { scan(x, path + '[' + i + ']'); });
    else if (v && typeof v === 'object' && path.indexOf('icons') !== 0) Object.keys(v).forEach(function (k) { scan(v[k], path ? path + '.' + k : k); });
  })(g, '');
  if (typeof g.walk === 'function') { try { g.walk(A).forEach(function (f, i) { (f.say.match(/\{=?[a-z0-9-]+\}/g) || []).forEach(function (t) { var k = t.replace(/[{}=]/g, ''); if (!((g.icons && g.icons[k]) || A.ICONS[k])) err(id, 'unknown icon token ' + t + ' in walk slide ' + i); }); }); } catch (e) {} }
  if (typeof g.art !== 'function') err(id, 'art(A) missing');
  else { try { var svg = g.art(A); if (svg.indexOf('NaN') >= 0) err(id, 'art produced NaN'); if (svg.length < 400) err(id, 'art suspiciously small'); } catch (e) { err(id, 'art threw: ' + e); } }
});
print(errors ? errors + ' problem(s)' : '✓ ' + ids.length + ' game(s) valid');
