// Hand-curated "if you know X, you'll recognise Y" pairs, with the reason in plain words.
// These are the only lines drawn on the map. Pairs are symmetric.
// 'teach' marks pairs where knowing one genuinely makes the other easier to learn
// (most of the core rules carry over). Only those get the "Already know…" option.
window.KIN = [
  // Gateway games
  ['catan', 'ticket-to-ride', 'Collect cards, then spend sets of them to claim spots on a shared map.'],
  ['catan', 'carcassonne', 'Build roads and cities on a shared map, with light rules.'],
  ['catan', 'monopoly', 'Roll 2 dice each turn, trade with players, and upgrade property to earn more.'],
  ['ticket-to-ride', 'splendor', 'One action a turn: take from a face-up display, or spend what you hold.'],
  ['ticket-to-ride', 'brass-birmingham', 'Build links between cities on a map. Brass adds money, industries and 2 eras.'],
  ['monopoly', 'monopoly-deal', 'Same property sets, rent, houses and hotels, as a 15-minute card game.', 'teach'],
  ['monopoly', 'risk', 'Long, dice-driven games; players are knocked out until one is left.'],
  ['monopoly', 'clue', 'Roll dice and move your token around a fixed board.'],

  // Engine builders
  ['wingspan', 'terraforming-mars', 'Play cards into your own area; each card improves your later turns.'],
  ['wingspan', 'ark-nova', 'Play animal cards into your own engine. Ark Nova is longer and adds a zoo map.'],
  ['wingspan', 'splendor', 'Light engine builders: early buys make later turns stronger.'],
  ['wingspan', 'cascadia', 'Take from a face-up display to build your own area of animals. Little conflict.'],
  ['terraforming-mars', 'ark-nova', 'Long engine builders: hundreds of unique cards whose icons power other cards.'],
  ['splendor', 'dominion', 'Buy from an open market so later turns get richer.'],
  ['splendor', 'azul', 'Take coloured pieces from a shared supply, and deny others what they need.'],
  ['agricola', 'dune-imperium', 'Worker placement: an action space you take is blocked for others that round.'],
  ['agricola', 'patchwork', 'Same designer. Fill a personal grid; empty spaces cost points at the end.'],
  ['agricola', 'brass-birmingham', 'Heavy economies: few actions, and running short of food or money hurts.'],
  ['scythe', 'root', 'Factions with different powers share one map; fighting is one way to score.'],
  ['scythe', 'twilight-imperium', 'Faction powers, expansion and secret objectives. Scythe: 90–115 min; TI: 4–8 h.'],

  // Card games
  ['dominion', 'dune-imperium', 'Same deck-building core. Dune: Imperium adds worker placement and a fight each round.', 'teach'],
  ['dominion', 'magic-the-gathering', 'Card combos win. Dominion builds its deck during play; Magic, before the game.'],
  ['7-wonders', 'sushi-go', 'Pick one card, pass the rest, over 3 rounds; sets and majorities score.', 'teach'],
  ['7-wonders', 'magic-the-gathering', 'Same draft: pick 1 card, pass the rest; direction goes left, right, left.'],

  // Tiles & patterns
  ['carcassonne', 'kingdomino', 'Add one tile a turn so terrain matches; big connected areas score.'],
  ['kingdomino', 'cascadia', 'Take a tile from a shared display to grow your own map; big areas score.'],
  ['kingdomino', 'patchwork', 'Pick pieces from a shared offer and fit them into a small personal grid.'],
  ['azul', 'cascadia', 'Take from a shared display and arrange it into scoring patterns.'],

  // Classics & abstracts
  ['chess', 'go', 'Two players, no luck, nothing hidden; reading ahead is the core skill.'],
  ['scrabble', 'codenames', 'Word games: vocabulary and word association are the main skill.'],
  ['clue', 'love-letter', 'Deduce hidden cards by elimination. Love Letter’s Guard is a one-card accusation.'],

  // Hidden roles & bluffing
  ['secret-hitler', 'avalon', 'A leader proposes a team and all vote openly; a hidden evil team sabotages in secret.', 'teach'],
  ['avalon', 'werewolf', 'Hidden teams, accusations and a vote, and nobody is eliminated mid-game.'],
  ['avalon', 'coup', 'Secret roles and bluffing. Avalon is played in teams, Coup alone.'],
  ['werewolf', 'blood-on-the-clocktower', 'Night roles, day accusations, execution vote. One Night: 10 min; Clocktower: up to 2 h.'],
  ['secret-hitler', 'blood-on-the-clocktower', 'Hidden evil team with one key player: kill that player and good wins.'],
  ['coup', 'love-letter', 'Small card games of character powers, bluffing and knockouts.'],
  ['coup', 'skull', 'Pure bluffing: make a claim and dare someone to call it.'],

  // Cooperative
  ['pandemic', 'forbidden-island', 'Same designer and turn: act, draw 2 cards, spread the threat. Collect sets to win.', 'teach'],
  ['pandemic', 'spirit-island', 'Co-op against a threat that spreads by card draw. Spirit Island is far heavier.'],
  ['spirit-island', 'gloomhaven', 'Heavy co-ops: each player has a unique hand, and recovering cards costs you.'],
  ['hanabi', 'the-crew', 'Co-op card games where card information is shared only through formal clues.'],

  // Trick-taking
  ['the-crew', 'spades', 'Same follow-suit, trump trick-taking, but in The Crew the whole table is one team.', 'teach'],
  ['hearts', 'spades', 'Same deck and follow-suit tricks: Hearts avoids points, Spades bids tricks.', 'teach'],
  ['spades', 'euchre', 'Partnership trick-taking with a trump suit; partners sit opposite.', 'teach'],
  ['spades', 'bridge', 'Partners bid a trick target, then play 13 tricks. Bridge bids by auction.', 'teach'],
  ['spades', 'tichu', 'Partnership games where one player’s solo call (Nil, Tichu) scores ±100.'],

  // Classic card games
  ['capitalism', 'tichu', 'Same climbing and race to go out. Tichu adds partners, bombs and 4 special cards.', 'teach'],
  ['capitalism', 'uno', 'Shedding games: race to empty your hand first.'],
  ['cheat', 'coup', 'Claim cards you may not hold; anyone can call the bluff.'],
  ['texas-holdem', 'skull', 'Bet on what others can’t see; bluff them into dropping out or bidding wrong.'],
  ['gin-rummy', 'cribbage', 'Classic card games, mostly for two, built on runs and sets of one rank.'],

  // Party
  ['codenames', 'wavelength', 'One player gives a clue; the team argues over what they meant.'],
  ['codenames', 'dixit', 'Give a clue that is neither too obvious nor too obscure.'],
  ['dixit', 'wavelength', 'One player gives a free-form clue; the others guess the hidden target.'],

  // Conflict & epic strategy
  ['risk', 'king-of-tokyo', 'Dice decide fights and players get knocked out. King of Tokyo takes 20–30 minutes.'],
  ['risk', 'diplomacy', 'Conquer a map of territories. Diplomacy has no dice; negotiated support wins fights.'],
  ['risk', 'twilight-struggle', 'Control regions of a world map; dice settle attacks. Twilight Struggle is card-driven.'],
  ['root', 'dune', 'Each faction breaks the base rules differently, on one shared map.'],
  ['dune', 'cosmic-encounter', 'Same core designers. Every faction breaks a rule, and allies can win together.'],
  ['dune', 'dune-imperium', 'Same setting, different rules: Imperium is deck building; Dune is area control.'],
  ['cosmic-encounter', 'diplomacy', 'Win through alliances negotiated at the table; promises are not binding.'],
  ['cosmic-encounter', 'twilight-imperium', 'Faction powers that break rules, plus open deals that need not be kept.'],
  ['diplomacy', 'twilight-struggle', 'Historical map strategy: borders, key spaces and long-term positioning.'],
];
