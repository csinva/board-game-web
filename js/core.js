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
  // Deck building & drafting
  'dominion', '7-wonders', 'sushi-go',
  // Tiles & patterns
  'carcassonne', 'azul', 'kingdomino', 'cascadia', 'patchwork',
  // Classics
  'scrabble', 'chess', 'clue',
  // Hidden roles & bluffing
  'secret-hitler', 'avalon', 'werewolf', 'coup', 'love-letter',
  // Cooperative
  'pandemic', 'hanabi', 'forbidden-island',
  // Party & communication
  'codenames', 'dixit', 'wavelength',
  // Conflict & area control
  'risk', 'root', 'king-of-tokyo',
];

window.FAMILIES = {
  build:    { label: 'Trade, build & connect',   color: '#c2562b', blurb: 'Gather resources, then spend them to claim space on a shared map.' },
  engine:   { label: 'Engine builders',          color: '#2f7a55', blurb: 'Early turns make later turns stronger: you build a machine that makes points.' },
  cards:    { label: 'Deck building & drafting', color: '#7a4fb3', blurb: 'The cards you choose to add are the strategy.' },
  tile:     { label: 'Tiles & patterns',         color: '#2867b2', blurb: 'Pick a piece, place it well. Spatial puzzles with light interaction.' },
  classic:  { label: 'Classics',                 color: '#7a6248', blurb: 'The family-shelf staples most people already half-know.' },
  hidden:   { label: 'Hidden roles & bluffing',  color: '#b3263e', blurb: 'Someone is lying. The game is the conversation.' },
  coop:     { label: 'Cooperative',              color: '#16807f', blurb: 'Everyone wins or loses together against the game itself.' },
  party:    { label: 'Party & communication',    color: '#c98400', blurb: 'Big groups, short rules; the fun is in what people say.' },
  conflict: { label: 'Conflict & area control',  color: '#4a4f6a', blurb: 'Fight over territory; attacking other players is the point.' },
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

window.loadGames = function () {
  return Promise.all(window.GAME_IDS.map(id => new Promise((res) => {
    const s = document.createElement('script');
    s.src = 'js/games/' + id + '.js';
    s.onload = res;
    s.onerror = () => { console.warn('missing game file', id); res(); };
    document.head.appendChild(s);
  }))).then(() => {
    const order = new Map(window.GAME_IDS.map((id, i) => [id, i]));
    window.GAMES.sort((a, b) => order.get(a.id) - order.get(b.id));
    window.GAME_BY_ID = Object.fromEntries(window.GAMES.map(g => [g.id, g]));
    return window.GAMES;
  });
};

// ---- Similarity ---------------------------------------------------------
// Blend of shared mechanics (Jaccard, 50%), closeness of the 6-axis profile (30%),
// overlapping player counts (5%), and a same-family bonus (15%).
window.similarity = function (a, b) {
  const A = new Set(a.mechanics), B = new Set(b.mechanics);
  const shared = [...A].filter(m => B.has(m));
  const jac = shared.length / new Set([...A, ...B]).size;
  let d = 0;
  for (const ax of window.PROFILE_AXES) d += Math.pow((a.profile[ax.key] - b.profile[ax.key]) / 4, 2);
  // Profile distances bunch up around 0.2–0.4, so stretch them to discriminate.
  const prof = Math.max(0, 1 - 1.8 * Math.sqrt(d / window.PROFILE_AXES.length));
  const pc = Math.min(a.players[1], b.players[1]) >= Math.max(a.players[0], b.players[0]) ? 1 : 0;
  const fam = a.family === b.family ? 1 : 0;
  return { score: 0.5 * jac + 0.3 * prof + 0.05 * pc + 0.15 * fam, shared };
};

window.mostSimilar = function (g, n = 3) {
  return window.GAMES.filter(o => o !== g)
    .map(o => Object.assign({ game: o }, window.similarity(g, o)))
    .sort((x, y) => y.score - x.score).slice(0, n);
};

window.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Inline emphasis: **bold** only.
window.md = s => window.esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
