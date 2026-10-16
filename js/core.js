// Core data model: game registry, controlled vocabularies, similarity.
// Every game file calls defineGame({...}) with the schema documented in SCHEMA.md.

window.GAMES = [];
window.defineGame = function (g) { window.GAMES.push(g); };

// The manifest: one file per game in js/games/<id>.js
window.GAME_IDS = [
  // Trade, build & connect
  'catan', 'ticket-to-ride', 'monopoly',
  // Engine builders
  'wingspan', 'terraforming-mars', 'splendor', 'agricola',
  'brass-birmingham', 'ark-nova', 'scythe', 'dune-imperium',
  // Deck building & drafting
  'dominion', '7-wonders', 'sushi-go', 'magic-the-gathering', 'monopoly-deal',
  // Tiles & patterns
  'carcassonne', 'azul', 'kingdomino', 'cascadia', 'patchwork',
  // Classics
  'scrabble', 'chess', 'clue', 'go',
  // Hidden roles & bluffing
  'secret-hitler', 'avalon', 'werewolf', 'coup', 'love-letter', 'skull', 'blood-on-the-clocktower',
  // Cooperative
  'pandemic', 'hanabi', 'forbidden-island', 'the-crew', 'spirit-island', 'gloomhaven',
  // Trick-taking
  'hearts', 'spades', 'euchre', 'tichu', 'bridge',
  // Classic card games
  'capitalism', 'texas-holdem', 'gin-rummy', 'cribbage', 'uno', 'egyptian-ratscrew', 'cheat',
  // Party & communication
  'codenames', 'dixit', 'wavelength',
  // Conflict & area control
  'risk', 'root', 'king-of-tokyo',
  // Epic strategy & negotiation
  'cosmic-encounter', 'diplomacy', 'dune', 'twilight-struggle', 'twilight-imperium',
];

window.FAMILIES = {
  build:    { label: 'Trade, build & connect',   color: '#c2562b', blurb: 'Collect resources, spend them to claim spots on a shared map.' },
  engine:   { label: 'Engine builders',          color: '#2f7a55', blurb: 'Early purchases make later turns stronger.' },
  cards:    { label: 'Card games',               color: '#7a4fb3', blurb: 'Build a deck, draft a hand, or collect sets.' },
  tile:     { label: 'Tiles & patterns',         color: '#2867b2', blurb: 'Take a piece, place it on your own board to score patterns.' },
  classic:  { label: 'Classics',                 color: '#857563', blurb: 'Long-established games most people have played.' },
  hidden:   { label: 'Hidden roles & bluffing',  color: '#b3263e', blurb: 'Hidden teams; win by deducing who is lying.' },
  coop:     { label: 'Cooperative',              color: '#16807f', blurb: 'All players win or lose together against the game.' },
  party:    { label: 'Party & communication',    color: '#c98400', blurb: 'Large groups, few rules; give and guess clues.' },
  deck:     { label: 'Classic card games',       color: '#6b7a2a', blurb: 'Standard-deck games: empty your hand, make melds, bet, bluff or slap.' },
  trick:    { label: 'Trick-taking',             color: '#c2457a', blurb: 'Each player plays a card; the highest of the suit led wins the trick.' },
  conflict: { label: 'Conflict & area control',  color: '#4a4f6a', blurb: 'Attack other players to control territory.' },
  epic:     { label: 'Epic strategy & negotiation', color: '#9a5a1e', blurb: 'Long games won through alliances, negotiation and conflict.' },
};

// Controlled vocabulary of mechanics. Similarity is computed over these.
window.MECHANICS = {
  'dice':                  'Dice rolling',
  'trading':               'Trading',
  'negotiation':           'Negotiation',
  'network':               'Network / route building',
  'set-collection':        'Set collection',
  'hand-management':       'Hand management',
  'deck-building':         'Deck building',
  'drafting':              'Drafting',
  'engine-building':       'Engine building',
  'tableau':               'Tableau building',
  'worker-placement':      'Worker placement',
  'tile-placement':        'Tile placement',
  'pattern-building':      'Pattern building',
  'area-control':          'Area control',
  'hidden-roles':          'Hidden roles',
  'voting':                'Voting',
  'bluffing':              'Bluffing',
  'deduction':             'Deduction',
  'cooperative':           'Cooperative',
  'limited-communication': 'Limited communication',
  'word':                  'Word play',
  'player-elimination':    'Player elimination',
  'take-that':             'Take-that / direct attack',
  'auction':               'Auctions / bidding',
  'press-your-luck':       'Press your luck',
  'variable-powers':       'Asymmetric / variable powers',
  'simultaneous':          'Simultaneous turns',
  'roll-and-move':         'Roll and move',
  'resource-management':   'Resource management',
  'team':                  'Teams',
  'spatial':               'Spatial puzzle',
  'grid-movement':         'Moving pieces on a grid',
  'memory':                'Memory',
  'party':                 'Party / guessing',
  'action-points':         'Action points',
  'trick-taking':          'Trick-taking',
  'card-driven':           'Card-driven events',
  'campaign':              'Campaign / legacy',
  'deck-construction':     'Deck construction (build before play)',
  'shedding':              'Shedding / climbing (empty your hand)',
  'melding':               'Melding (sets and runs)',
  'betting':               'Betting',
  'speed':                 'Real-time / reflexes',
};

// Six standardized profile axes, each scored 1–5.
window.PROFILE_AXES = [
  { key: 'complexity',  label: 'Rules',       lo: 'few rules',           hi: 'many rules' },
  { key: 'luck',        label: 'Luck',        lo: 'pure skill',          hi: 'swingy' },
  { key: 'interaction', label: 'Interaction', lo: 'play your own board', hi: 'every move affects others' },
  { key: 'conflict',    label: 'Meanness',    lo: 'friendly',            hi: 'attack each other' },
  { key: 'talk',        label: 'Table talk',  lo: 'quiet & thinky',      hi: 'loud & social' },
  { key: 'planning',    label: 'Planning',    lo: 'turn by turn',        hi: 'long-term plans' },
];

window.loadScript = src => new Promise(res => {
  const s = document.createElement('script');
  s.src = src; s.onload = res;
  s.onerror = () => { console.warn('missing', src); res(); };
  document.head.appendChild(s);
});

window.loadGames = function () {
  const files = window.GAME_IDS.map(id => 'js/games/' + id + '.js')
    .concat(['js/kin.js'], window.BRIDGE_FILES.map(f => 'js/bridges/' + f + '.js'));
  return Promise.all(files.map(window.loadScript)).then(() => {
    const order = new Map(window.GAME_IDS.map((id, i) => [id, i]));
    window.GAMES = window.GAMES.filter(g => order.has(g.id)).sort((a, b) => order.get(a.id) - order.get(b.id));
    window.GAME_BY_ID = Object.fromEntries(window.GAMES.map(g => [g.id, g]));
    return window.GAMES;
  });
};

// ---- Similarity ---------------------------------------------------------
// Two signals:
//  1. KIN (js/kin.js): hand-curated pairs with a plain-English reason. These are
//     the only links drawn on the map and always rank first.
//  2. A computed score for everything else: mechanics weighted by rarity (a shared
//     rare mechanic like trick-taking means much more than shared "hand management";
//     the first two listed mechanics define the game and count double), plus the
//     6-axis feel profile and family.
window.BRIDGES = [];
window.defineBridge = function (b) { window.BRIDGES.push(b); };
window.BRIDGE_FILES = ['1', '2', '3', '4'];

let IDF = null;
function idf() {
  if (IDF) return IDF;
  const df = {};
  window.GAMES.forEach(g => new Set(g.mechanics).forEach(m => df[m] = (df[m] || 0) + 1));
  IDF = {};
  for (const m in df) IDF[m] = Math.log(1 + window.GAMES.length / df[m]);
  return IDF;
}
function mechVec(g) {
  const w = idf(), v = {};
  g.mechanics.forEach((m, i) => v[m] = (w[m] || 1) * (i < 2 ? 2 : 1));
  return v;
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (const k in a) { na += a[k] * a[k]; if (b[k]) dot += a[k] * b[k]; }
  for (const k in b) nb += b[k] * b[k];
  return dot / (Math.sqrt(na * nb) || 1);
}
window.kinOf = function (id) {
  return (window.KIN || []).filter(k => k[0] === id || k[1] === id)
    .map(k => ({ id: k[0] === id ? k[1] : k[0], why: k[2], teach: k[3] === 'teach' }))
    .filter(k => window.GAME_BY_ID && window.GAME_BY_ID[k.id]);
};
window.isKin = (a, b) => (window.KIN || []).some(k => (k[0] === a && k[1] === b) || (k[0] === b && k[1] === a));

window.similarity = function (a, b) {
  const A = new Set(a.mechanics);
  const shared = b.mechanics.filter(m => A.has(m)).sort((x, y) => (idf()[y] || 0) - (idf()[x] || 0));
  const mech = cosine(mechVec(a), mechVec(b));
  let d = 0;
  for (const ax of window.PROFILE_AXES) d += Math.pow((a.profile[ax.key] - b.profile[ax.key]) / 4, 2);
  const prof = Math.max(0, 1 - 1.8 * Math.sqrt(d / window.PROFILE_AXES.length));
  const fam = a.family === b.family ? 1 : 0;
  let score = 0.55 * mech + 0.3 * prof + 0.15 * fam;
  const kin = window.isKin(a.id, b.id);
  if (kin) score = 0.7 + 0.3 * score;
  return { score, shared, kin };
};

// Curated kin first (with reasons), then computed matches that clear a bar.
window.mostSimilar = function (g, n = 3, minScore = 0.6) {
  const kin = window.kinOf(g.id).map(k => Object.assign({ game: window.GAME_BY_ID[k.id], why: k.why }, window.similarity(g, window.GAME_BY_ID[k.id])))
    .sort((x, y) => y.score - x.score);
  const rest = window.GAMES.filter(o => o !== g && !window.isKin(g.id, o.id))
    .map(o => Object.assign({ game: o }, window.similarity(g, o)))
    .filter(s => s.score >= minScore)
    .sort((x, y) => y.score - x.score);
  return kin.concat(rest).slice(0, Math.max(n, 1));
};

window.bridgeFor = function (learnId, knownId) {
  const b = window.BRIDGES.find(x => (x.a === learnId && x.b === knownId) || (x.b === learnId && x.a === knownId));
  if (!b) return null;
  const flip = b.a !== learnId; // normalise so side "learn" is the game on this page
  return {
    same: b.same,
    diff: b.diff.map(([topic, x, y]) => ({ topic, learn: flip ? y : x, known: flip ? x : y })),
    terms: (b.terms || []).map(([x, y]) => ({ learn: flip ? y : x, known: flip ? x : y })),
    headline: flip ? b.toB : b.toA,
  };
};

// Games the visitor has said they know (remembered across pages).
window.knownGames = {
  get() { try { return JSON.parse(localStorage.getItem('bgfg-known') || '[]'); } catch (e) { return []; } },
  set(list) { try { localStorage.setItem('bgfg-known', JSON.stringify(list)); } catch (e) {} },
  toggle(id, on) { const s = new Set(this.get()); on ? s.add(id) : s.delete(id); this.set([...s]); },
};

window.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Inline emphasis: **bold** only.
// Inline icons: {key} renders a game component's icon followed by its name,
// {=key} renders the icon alone. Icons come from the game being shown
// (window.CURRENT_GAME.icons) or the shared set (A.ICONS).
window.CURRENT_GAME = null;
window.iconFor = function (k, g) {
  g = g || window.CURRENT_GAME;
  const def = (g && g.icons && g.icons[k]) || (window.A && window.A.ICONS[k]);
  if (!def) return null;
  if (!def._svg) def._svg = def.draw(window.A);
  return def;
};
window.iconHTML = (def, withName) => `<span class="gi" title="${window.esc(def.name)}"><svg viewBox="0 0 24 24" aria-hidden="true">${def._svg}</svg></span>${withName ? `<span class="gi-l">${window.esc(def.name)}</span>` : ''}`;
window.md = s => window.esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/\{(=?)([a-z0-9-]+)\}/g, (m, only, k) => { const d = window.iconFor(k); return d ? window.iconHTML(d, !only) : m; });
