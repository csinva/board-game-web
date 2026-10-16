// Print each game's three nearest neighbours: tools/similar.sh
var window = this; var document = {}; var console = { warn: print };
load('js/core.js'); load('js/art.js');
GAME_IDS.forEach(function (id) { load('js/games/' + id + '.js'); });
GAMES.forEach(function (g) {
  print((g.id + '                  ').slice(0, 18) + mostSimilar(g, 3).map(function (s) { return s.game.id + ' ' + s.score.toFixed(2); }).join(' | '));
});
