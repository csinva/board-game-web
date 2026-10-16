// Run with: tools/validate.sh   (uses macOS JavaScriptCore, no node needed)
// Loads every game file and checks it against the schema in SCHEMA.md.
var window = this;
var document = { currentScript: null };
var console = { warn: print, log: print };
load('js/core.js');
load('js/art.js');
var errors = 0;
function err(id, msg) { print('✗ ' + id + ': ' + msg); errors++; }
var only = typeof arguments !== 'undefined' && arguments.length ? arguments : null;
var ids = only ? Array.prototype.slice.call(only) : GAME_IDS;
ids.forEach(function (id) {
  var before = GAMES.length;
  try { load('js/games/' + id + '.js'); } catch (e) { err(id, 'failed to load: ' + e); return; }
  if (GAMES.length !== before + 1) { err(id, 'file must call defineGame exactly once'); return; }
  var g = GAMES[GAMES.length - 1];
  if (g.id !== id) err(id, 'id mismatch: ' + g.id);
  ['name', 'designer', 'family', 'pitch', 'theme', 'tension', 'example'].forEach(function (k) { if (typeof g[k] !== 'string' || !g[k]) err(id, 'missing string ' + k); });
  if (typeof g.year !== 'number') err(id, 'year must be a number');
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
  if (!g.flow || g.flow.length < 2 || g.flow.length > 4) err(id, 'flow needs 2–4 stages');
  if (!g.end || !g.end.trigger) err(id, 'end.trigger missing');
  if (!g.scoring && !(g.end && g.end.results)) err(id, 'need scoring[] or end.results[]');
  if (g.ref && (!g.ref.title || !g.ref.rows)) err(id, 'ref needs title + rows');
  ['setup', 'gotchas', 'tips'].forEach(function (k) { if (!Array.isArray(g[k]) || g[k].length !== 3) err(id, k + ' must have exactly 3 items'); });
  if (!Array.isArray(g.terms) || g.terms.length < 3 || g.terms.length > 5) err(id, 'terms needs 3–5 [term, def] pairs');
  if (g.pitch && g.pitch.length > 150) err(id, 'pitch too long (' + g.pitch.length + ' > 150)');
  if (typeof g.art !== 'function') err(id, 'art(A) missing');
  else { try { var svg = g.art(A); if (svg.indexOf('NaN') >= 0) err(id, 'art produced NaN'); if (svg.length < 400) err(id, 'art suspiciously small'); } catch (e) { err(id, 'art threw: ' + e); } }
});
print(errors ? errors + ' problem(s)' : '✓ ' + ids.length + ' game(s) valid');
