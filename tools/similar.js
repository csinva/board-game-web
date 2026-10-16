// Print each game's three nearest neighbours: tools/similar.sh
var window = this; var document = {}; var console = { warn: print };
load('js/core.js'); load('js/art.js');
GAME_IDS.forEach(function (id) { load('js/games/' + id + '.js'); }); load('js/kin.js'); GAME_BY_ID = {}; GAMES.forEach(function (g) { GAME_BY_ID[g.id] = g; });
GAMES.forEach(function (g) {
  print((g.id + '                  ').slice(0, 18) + mostSimilar(g, 4).map(function (s) { return (s.kin ? '*' : '') + s.game.id + ' ' + s.score.toFixed(2); }).join(' | '));
});
