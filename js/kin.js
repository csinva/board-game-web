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
  ['wingspan', 'ark-nova', 'Play animal cards into your own area for points and powers. Ark Nova adds a zoo map.'],
  ['wingspan', 'splendor', 'Light card games where early purchases make your later turns stronger.'],
  ['wingspan', 'cascadia', 'Take from a face-up display to build your own area of animals. Little conflict.'],
  ['terraforming-mars', 'ark-nova', 'Long games with hundreds of unique cards whose icons power other cards.'],
  ['splendor', 'dominion', 'Buy cards from a face-up market so that your later turns get richer.'],
  ['splendor', 'azul', 'Take coloured pieces from a shared supply, and deny others what they need.'],
  ['agricola', 'dune-imperium', 'Worker placement: a space you take is closed to other players for that round.'],
  ['agricola', 'patchwork', 'Same designer. Fill a personal grid; empty spaces cost points at the end.'],
  ['agricola', 'brass-birmingham', 'Heavy economic games: few actions, and running short of food or money costs you.'],
  ['scythe', 'root', 'Factions with different powers share one map; fighting is one of several ways to score.'],
  ['scythe', 'twilight-imperium', 'Factions with unique powers expand on a map and chase secret objectives. TI is far longer.'],

  // Card games
  ['dominion', 'dune-imperium', 'Build a deck during play. Dune: Imperium adds worker placement and a fight each round.', 'teach'],
  ['dominion', 'magic-the-gathering', 'Card combinations win. Dominion builds its deck during play; Magic, before the game.'],
  ['7-wonders', 'sushi-go', 'Pick 1 card, pass the rest, for 3 rounds; sets and having the most of a type score.', 'teach'],
  ['7-wonders', 'magic-the-gathering', 'Same draft: pick 1 card and pass the rest; pass left, then right, then left.'],

  // Tiles & patterns
  ['carcassonne', 'kingdomino', 'Add 1 tile a turn so its terrain matches; big connected areas score.'],
  ['kingdomino', 'cascadia', 'Take a tile from a shared display to grow your own map; big connected areas score.'],
  ['kingdomino', 'patchwork', 'Pick pieces from a shared offer and fit them into a small personal grid.'],
  ['azul', 'cascadia', 'Take from a shared display and arrange it into scoring patterns.'],

  // Classics & abstracts
  ['chess', 'go', 'Two players, no luck, nothing hidden; reading ahead is the core skill.'],
  ['scrabble', 'codenames', 'Word games: vocabulary and word association are the main skill.'],
  ['clue', 'love-letter', 'Deduce hidden cards by elimination. Love Letter’s Guard is a one-card accusation.'],

  // Hidden roles & bluffing
  ['secret-hitler', 'avalon', 'A leader proposes a team and all vote openly; a hidden evil team sabotages in secret.', 'teach'],
  ['avalon', 'werewolf', 'Hidden teams, accusations and votes; nobody is out partway through the game.'],
  ['avalon', 'coup', 'Secret roles and bluffing. Avalon is played in teams, Coup alone.'],
  ['werewolf', 'blood-on-the-clocktower', 'Secret night roles, day accusations, a vote to kill. Werewolf: 10 min; Clocktower: 2 h.'],
  ['secret-hitler', 'blood-on-the-clocktower', 'Hidden evil team with one key player: kill that player and good wins.'],
  ['coup', 'love-letter', 'Small card games: each character has a power; bluff, and knock players out.'],
  ['coup', 'skull', 'Pure bluffing: make a claim and dare other players to call it.'],

  // Cooperative
  ['pandemic', 'forbidden-island', 'Same designer and turn: act, draw 2 cards, spread the threat. Collect sets to win.', 'teach'],
  ['pandemic', 'spirit-island', 'Co-op against a threat that card draws spread. Spirit Island is far heavier.'],
  ['spirit-island', 'gloomhaven', 'Heavy co-ops: each player has a unique hand of cards, and getting cards back costs you.'],
  ['hanabi', 'the-crew', 'Co-op card games: you may share what cards are in hands only through strict signals.'],

  // Trick-taking
  ['the-crew', 'spades', 'Same trick-taking (follow suit; trump wins), but in The Crew everyone is one team.', 'teach'],
  ['hearts', 'spades', 'Same deck and tricks (follow suit): Hearts avoids points; Spades bids how many tricks.', 'teach'],
  ['spades', 'euchre', 'Trick-taking in teams of 2 with a trump suit; partners sit opposite each other.', 'teach'],
  ['spades', 'bridge', 'Partners bid a trick target, then play 13 tricks. Bridge bids by auction.', 'teach'],
  ['spades', 'tichu', 'Teams of 2; one player’s solo call (Nil; Tichu) wins or loses the team 100 points.'],

  // Classic card games
  ['capitalism', 'tichu', 'Beat the last play with higher cards to empty your hand first. Tichu adds partners.', 'teach'],
  ['capitalism', 'uno', 'Race to be the first to empty your hand.'],
  ['cheat', 'coup', 'Claim cards you may not hold; anyone can call the bluff.'],
  ['texas-holdem', 'skull', 'Bet on what others can’t see; bluff them into dropping out or bidding wrong.'],
  ['gin-rummy', 'cribbage', 'Classic card games, mostly for 2, built on runs and sets of one rank.'],

  // Party
  ['codenames', 'wavelength', 'One player gives a clue; their team argues over what it meant.'],
  ['codenames', 'dixit', 'One player gives a clue that must be neither too obvious nor too obscure.'],
  ['dixit', 'wavelength', 'One player gives a free-form clue; the others guess the hidden target.'],

  // Conflict & epic strategy
  ['risk', 'king-of-tokyo', 'Dice decide fights, and players get knocked out. King of Tokyo takes 20–30 minutes.'],
  ['risk', 'diplomacy', 'Conquer a map of territories. Diplomacy has no dice; negotiated support wins fights.'],
  ['risk', 'twilight-struggle', 'Control regions of a world map; dice settle attacks. Twilight Struggle is card-driven.'],
  ['root', 'dune', 'Each faction breaks the base rules differently, on one shared map.'],
  ['dune', 'cosmic-encounter', 'Same designers. Every faction breaks a rule, and allies can win together.'],
  ['dune', 'dune-imperium', 'Same setting, different rules: Imperium builds a deck; Dune fights over a map.'],
  ['cosmic-encounter', 'diplomacy', 'Win through alliances negotiated at the table; promises are not binding.'],
  ['cosmic-encounter', 'twilight-imperium', 'Faction powers that break rules, plus open deals that need not be kept.'],
  ['diplomacy', 'twilight-struggle', 'Historical map strategy: borders, key spaces and long-term positioning.'],
];
