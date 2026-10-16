// Hand-curated "if you know X, you'll recognise Y" pairs, with the reason in plain words.
// These are the only lines drawn on the map. Pairs are symmetric.
window.KIN = [
  // Gateway games
  ['catan', 'ticket-to-ride', 'The two classic gateway games: collect cards, then cash them in to claim the shared map.'],
  ['catan', 'carcassonne', 'The original 1990s gateway trio (with Ticket to Ride): build out a shared map with light rules.'],
  ['catan', 'monopoly', 'Dice, trading and haggling over property. Catan is where Monopoly players usually go next.'],
  ['ticket-to-ride', 'splendor', 'Same quick turn: take cards/chips or cash them in, and pick one action per turn.'],
  ['ticket-to-ride', 'brass-birmingham', 'Both are about building rail and canal links; Brass is the heavy economic version.'],
  ['monopoly', 'monopoly-deal', 'Same property sets and rent, squeezed into a 15-minute card game.'],
  ['monopoly', 'risk', 'Family-shelf classics: long, dice-driven, played until someone is knocked out.'],
  ['monopoly', 'clue', 'Roll-and-move family classics from the same era and shelf.'],

  // Engine builders
  ['wingspan', 'terraforming-mars', 'Play cards into your own tableau; each one powers up your later turns.'],
  ['wingspan', 'ark-nova', 'Animal cards in a personal engine. Ark Nova is the heavier, longer zoo version.'],
  ['wingspan', 'splendor', 'Engine building at its gentlest: early purchases make later turns stronger.'],
  ['wingspan', 'cascadia', 'Calm, friendly nature games. Cascadia is the lighter tile-laying cousin.'],
  ['terraforming-mars', 'ark-nova', 'Big card-driven engine builders with hundreds of unique cards and combos.'],
  ['splendor', 'dominion', 'Spend now so future turns get richer: Splendor with gems, Dominion with cards.'],
  ['splendor', 'azul', 'Pretty, quick abstract games about taking pieces from a shared supply.'],
  ['agricola', 'dune-imperium', 'Worker placement: grab an action space before someone else does.'],
  ['agricola', 'patchwork', 'Same designer (Uwe Rosenberg). Patchwork is his two-player puzzle about filling space.'],
  ['agricola', 'brass-birmingham', 'Heavy, tight euro economies where every single action counts.'],
  ['scythe', 'root', 'Asymmetric factions on a contested map, but with more economy than fighting.'],
  ['scythe', 'twilight-imperium', 'Explore, expand, exploit, exterminate. Scythe is the shorter, economy-first take on empire building.'],

  // Card games
  ['dominion', 'dune-imperium', 'Deck building at the core. Dune: Imperium adds worker placement and a fight every round.'],
  ['dominion', 'magic-the-gathering', 'Card combos are everything. Dominion builds the deck during play; Magic builds it beforehand.'],
  ['7-wonders', 'sushi-go', 'Pick one card, pass the rest. Sushi Go! is drafting at its simplest.'],
  ['7-wonders', 'magic-the-gathering', '7 Wonders brought Magic’s booster-draft format to the board-game table.'],

  // Tiles & patterns
  ['carcassonne', 'kingdomino', 'Draw a tile and add it to your land so the edges match.'],
  ['kingdomino', 'cascadia', 'Take a terrain tile and grow your own map; big connected regions score.'],
  ['kingdomino', 'patchwork', 'Fit pieces into a small personal grid without leaving gaps.'],
  ['azul', 'cascadia', 'Take from a shared market and arrange it into scoring patterns.'],

  // Classics & abstracts
  ['chess', 'go', 'The two great abstract strategy games: no luck, nothing hidden, endless depth.'],
  ['scrabble', 'codenames', 'Word games where your vocabulary is the strategy.'],
  ['clue', 'love-letter', 'Deduce hidden cards by elimination. Love Letter’s Guard is Clue in a single card.'],

  // Hidden roles & bluffing
  ['secret-hitler', 'avalon', 'Same skeleton: a hidden team sabotages missions or laws through secret votes.'],
  ['avalon', 'werewolf', 'Both distil classic Werewolf: hidden teams, accusations and a vote, and nobody sits out.'],
  ['avalon', 'coup', 'Same world and publisher (The Resistance). Coup is the fast, every-player-for-themselves bluffing take.'],
  ['werewolf', 'blood-on-the-clocktower', 'Two takes on Werewolf: One Night squeezes it into ten minutes; Clocktower stretches it into an evening with a Storyteller.'],
  ['secret-hitler', 'blood-on-the-clocktower', 'A hidden evil team, public accusations, and votes that execute.'],
  ['coup', 'love-letter', 'Tiny card games of character powers, bluffing and knockouts.'],
  ['coup', 'skull', 'Pure bluffing: make a claim and dare someone to call it.'],

  // Cooperative
  ['pandemic', 'forbidden-island', 'Same designer (Matt Leacock). Forbidden Island is the lighter little sibling.'],
  ['pandemic', 'spirit-island', 'Co-op against a spreading threat. Spirit Island is the heavy, asymmetric version.'],
  ['spirit-island', 'gloomhaven', 'Heavy co-ops where each player runs a deep, puzzly hand of unique cards.'],
  ['hanabi', 'the-crew', 'Co-op card games where you may not say what’s in your hand.'],

  // Trick-taking
  ['the-crew', 'spades', 'Ordinary trick-taking rules, but the table works together to win specific tricks.'],
  ['hearts', 'spades', 'Same deck and tricks: Hearts avoids points, Spades bids for them.'],
  ['spades', 'euchre', 'American partnership trick-takers with a trump suit.'],
  ['spades', 'bridge', 'Partnership bidding, then trick play. Bridge is the deep, lifelong version of Spades.'],
  ['spades', 'tichu', 'Partnership card games where bold calls (Nil, Tichu) swing the score.'],

  // Party
  ['codenames', 'wavelength', 'One player gives a clue; the team argues over what they meant.'],
  ['codenames', 'dixit', 'Find a clue that is not too obvious and not too obscure.'],
  ['dixit', 'wavelength', 'Read your friends’ minds through one clever clue.'],

  // Conflict & epic strategy
  ['risk', 'king-of-tokyo', 'Dice-chucking brawls. King of Tokyo is the 20-minute version.'],
  ['risk', 'diplomacy', 'Conquer the map. Diplomacy removes the dice and adds negotiation and betrayal.'],
  ['risk', 'twilight-struggle', 'World map, area control and dice, but driven by Cold War event cards.'],
  ['root', 'dune', 'Asymmetric factions that each break the rules differently on a shared map.'],
  ['dune', 'cosmic-encounter', 'Same designers (Eberle, Kittredge, Olotka). Every faction breaks a rule; alliances decide it.'],
  ['dune', 'dune-imperium', 'Same universe, very different games: Imperium is a euro, Dune is a cutthroat negotiation war.'],
  ['cosmic-encounter', 'diplomacy', 'Win through alliances you negotiate at the table. Promises are not binding.'],
  ['cosmic-encounter', 'twilight-imperium', 'Space empires and table politics; deals made, deals broken.'],
  ['diplomacy', 'twilight-struggle', 'Geopolitics as a game: influence, borders and long-term plans.'],
];
