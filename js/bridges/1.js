// Bridges for KIN[0]..KIN[19]: explain one game in terms of a similar one the visitor already knows.

defineBridge({
  a: 'catan', b: 'ticket-to-ride',
  same: [
    'You collect coloured cards, then spend sets of them to claim spots on one shared map.',
    'A spot one player claims is closed to everyone else, so blocking matters.',
    'A bonus goes to the player with the longest continuous road (Catan) or route (Ticket to Ride).',
  ],
  diff: [
    ['Getting cards', 'Each turn the dice total picks which hexes pay; every player built next to those hexes takes their cards.', 'On your turn you may draw 2 train cards, each from the 5 face-up cards or the deck; a face-up locomotive counts as both.'],
    ['Spending cards', 'Fixed costs: a road is 1 brick + 1 lumber; upgrading a settlement to a city is 3 ore + 2 grain.', 'A route of N spaces costs N cards of its colour; a grey route costs N cards of any one colour.'],
    ['Trading', 'On your turn, trade with other players, or give the bank 4 of one resource for 1 of any (less at a port you have built on).', 'No trading; locomotives are wild and count as any colour.'],
    ['Goals', 'Reach 10 victory points.', 'Secret destination tickets: you gain their points if you connect the 2 cities, and lose them if you don’t.'],
    ['Game end', 'A player who has 10 points on their own turn wins at once.', 'When a player ends a turn with 2 or fewer trains left, every player, including them, takes 1 final turn.'],
  ],
  terms: [['Resource cards', 'Train cards'], ['Longest Road', 'Longest Route']],
  toA: 'The dice, not you, decide which cards you get: where you build sets your income, and trading fills the gaps.',
  toB: 'You choose which cards to draw instead of rolling for them, and secret destination tickets are a big part of your score.',
});

defineBridge({
  a: 'catan', b: 'carcassonne',
  same: [
    'Everyone builds on one shared map.',
    'Roads and cities are the main things you build and score.',
  ],
  diff: [
    ['The map', 'Fully laid out before the game starts; it never changes.', 'Starts as 1 tile; each turn the active player adds 1 tile.'],
    ['Your turn', 'Roll for resources, trade, then spend resource cards to build.', 'Draw 1 tile and place it so every edge it touches matches; then you may put 1 of your meeples on that tile.'],
    ['Owning things', 'Every piece you build stays yours all game.', 'The player with the most meeples on a road, city or field scores it; tied players each score it in full.'],
    ['Scoring', 'Victory points for what you own; the first to 10 wins.', 'Roads and cities score when finished; fields and unfinished roads and cities score at game end.'],
    ['Interaction', 'Trading, the robber, and racing for building spots.', 'Joining a rival’s road or city so you share or take its points.'],
  ],
  terms: [],
  toA: 'The map is fixed from the first turn, and building costs resource cards that you get from dice rolls and trades.',
  toB: 'No resources or costs: you place 1 tile a turn, and score from where you commit your 7 meeples.',
});

defineBridge({
  a: 'catan', b: 'monopoly',
  same: [
    'The active player rolls 2 dice every turn; 7 is the most likely total.',
    'You trade with other players, and haggling is a big part of play.',
    'You upgrade what you own so it pays more.',
  ],
  diff: [
    ['What the dice do', 'Every hex showing the rolled number pays every player built next to it.', 'You move your token that many squares.'],
    ['Income', 'Resource cards, on every player’s roll, not just yours.', 'Rent when other players land on your property, plus $200 each time you pass GO.'],
    ['Getting land', 'Spend resource cards to build a settlement on a free corner.', 'When you land on an unowned property, you may buy it; if you don’t, it is auctioned.'],
    ['Winning', 'The first player to 10 victory points wins.', 'The last player who is not bankrupt wins.'],
    ['Length', '1–2 hours; nobody is knocked out.', '1–3 hours; a bankrupt player is out.'],
  ],
  terms: [['Settlement, upgraded to a city', 'Houses, upgraded to a hotel']],
  toA: 'No money and no bankruptcy: race to 10 points, and collect income on other players’ rolls too.',
  toB: 'You earn only when other players land on your squares, and you win by bankrupting everyone else.',
});

defineBridge({
  a: 'ticket-to-ride', b: 'splendor',
  same: [
    'You take exactly 1 action per turn, usually taking resources or spending them.',
    'You take from a face-up display, so others see what you want.',
    'There is a wild resource: locomotives in Ticket to Ride, gold tokens in Splendor.',
    'Few rules; 30–60 minutes.',
  ],
  diff: [
    ['Taking', 'Draw 2 train cards, each from the 5 face-up cards or the deck; a face-up locomotive counts as both.', 'Take 3 gems of different colours, or 2 gems of one colour if that pile has 4 or more.'],
    ['Spending', 'Claim a route by discarding cards matching its colour and length.', 'Buy a card from the face-up rows (or your reserved cards) by paying its gem cost.'],
    ['Long-term growth', 'None: spent cards are discarded.', 'Each card you buy is a permanent 1-gem discount on later purchases.'],
    ['Saving for later', 'No hand limit.', 'As your action, you may reserve a card and take 1 gold token; you may hold at most 3 reserved cards and 10 tokens.'],
    ['Game end', 'When a player ends a turn with 2 or fewer trains left, every player takes 1 final turn.', 'When a player reaches 15 points, finish the round so everyone has had the same number of turns.'],
  ],
  terms: [['Locomotive', 'Gold token'], ['Claim a route', 'Buy a card']],
  toA: 'Spent cards are discarded, so nothing builds up: you race for specific routes on a map.',
  toB: 'Purchases keep paying: each card is a permanent discount, so early cheap buys make later buys cheaper.',
});

defineBridge({
  a: 'ticket-to-ride', b: 'brass-birmingham',
  same: [
    'You build links between cities on a map.',
    'Most connections hold only one player’s link, so you race for key routes.',
    'You spend cards from your hand to act.',
  ],
  diff: [
    ['Turn', '1 action: draw train cards, claim a route, or draw destination tickets.', '2 actions (1 in the game’s first round); each action discards 1 card, and Build needs a card matching the location or industry.'],
    ['What links score', 'Points as soon as you build them, by length (1 to 15).', 'At the end of each era: the link icons on the 2 locations each link connects.'],
    ['Money', 'None.', 'Every build costs money; you collect income each round and may take loans.'],
    ['Goals', 'Secret tickets: connect 2 named cities, or lose their points.', 'No tickets; your links decide where you may build and where coal and beer can travel.'],
    ['Structure', 'One continuous game.', 'A canal era, then a rail era; all canal links are removed between them.'],
  ],
  terms: [['Route', 'Link (canal or rail)']],
  toA: 'Links are the whole point: each scores by its length when built, with no money, industries or market.',
  toB: 'Links serve an economy: they score from the locations they connect, and cost money (plus coal for rail links).',
});

defineBridge({
  a: 'monopoly', b: 'monopoly-deal',
  same: [
    'You collect colour sets of the same properties (Boardwalk, the railroads and so on).',
    'A full set charges much more rent; houses and hotels raise it further.',
    'Rent must be paid; a player who can’t pay in full hands over what they have.',
  ],
  diff: [
    ['Your turn', 'Roll 2 dice and move that many squares.', 'Draw 2 cards, then play up to 3 cards from your hand.'],
    ['Getting property', 'When you land on an unowned property, you may buy it; if you don’t, it is auctioned.', 'Play property cards from your hand, or take other players’ properties with Sly Deal or Deal Breaker.'],
    ['Charging rent', 'Automatic whenever another player lands on your property.', 'On your turn, you may play a Rent card for a colour you own; every other player pays you (only 1 chosen player for a wild Rent card).'],
    ['Paying', 'With cash; you get change.', 'With cards from your bank or your properties on the table; you get no change.'],
    ['Winning', 'The last player who is not bankrupt wins.', 'The first player with 3 complete sets, each of a different colour, wins.'],
  ],
  terms: [['Passing GO ($200)', 'Pass Go card (draw 2)'], ['Chance and Community Chest', 'Action cards']],
  toA: 'No hand of cards: the dice decide where you land, rent is collected automatically, and you win by bankrupting everyone.',
  toB: 'Nobody goes bankrupt: the first player with 3 full sets wins, and action cards take properties from other players.',
});

defineBridge({
  a: 'monopoly', b: 'risk',
  same: [
    'The active player rolls dice every turn.',
    'Owning a complete group (a colour set; a continent) gives a big bonus every turn.',
    'Players are knocked out one by one; the last one left wins.',
    'Long games: Monopoly 1–3 hours, Risk 2–4.',
  ],
  diff: [
    ['What you own', 'Properties, bought with money.', 'Territories; you hold each one while you have armies on it.'],
    ['Income each turn', '$200 each time you pass GO, plus rent from other players.', 'New armies: your territories ÷ 3, rounded down (minimum 3), plus continent bonuses and any card set you trade in.'],
    ['Using the dice', 'Roll 2 and move that many squares.', 'You choose where to attack; the attacker rolls up to 3 dice, the defender up to 2.'],
    ['Interaction', 'Trading and rent.', 'Direct attacks; the defender wins tied dice.'],
    ['Knocked out', 'When you cannot pay a debt.', 'When you lose your last territory; the player who took it gets your cards.'],
  ],
  terms: [['Monopoly (full colour set)', 'Holding a whole continent']],
  toA: 'The dice move your token, and you hurt opponents by owning the squares they land on, not by attacking.',
  toB: 'You choose every attack, and the dice only settle battles, so where to push and what to defend is the game.',
});

defineBridge({
  a: 'monopoly', b: 'clue',
  same: [
    'Each turn you roll and move your token around a fixed board.',
    'You can be knocked out before the game ends.',
  ],
  diff: [
    ['Moving', 'Exactly the number rolled, always clockwise.', 'The number rolled, in any direction but never diagonally; entering a room ends your move.'],
    ['Goal', 'Bankrupt every other player.', 'Be the first to name the suspect, weapon and room cards hidden in the envelope.'],
    ['Interaction', 'Trading and rent.', 'Suggestions: the first player to your left who holds a named card must privately show you 1 of them.'],
    ['Hidden information', 'None; money and deeds are public.', 'Your hand is secret; you deduce the envelope by crossing off cards you have seen.'],
    ['Knocked out', 'When you run out of money.', 'When you make a wrong accusation; you still show cards to disprove other players’ suggestions.'],
  ],
  terms: [],
  toA: 'Nothing to deduce: everything is public, and the game is buying the right properties and making deals.',
  toB: 'Moving only gets you into rooms; the game is tracking which cards other players have shown you.',
});

defineBridge({
  a: 'wingspan', b: 'terraforming-mars',
  same: [
    'You play cards into your own area; each card improves your later turns.',
    'Cards carry tags (habitats in Wingspan; Plant, Space and others in Terraforming Mars) that other cards reward.',
    'Shared goals: end-of-round goals in Wingspan; milestones and awards in Terraforming Mars.',
    'Hundreds of unique cards, so every game differs.',
  ],
  diff: [
    ['Your turn', 'Place 1 action cube on 1 of 4 actions: play a bird, or use 1 of your 3 habitat rows.', 'Take 1 or 2 actions; players keep taking turns in order until everyone has passed.'],
    ['Paying for cards', 'The food tokens shown on the bird, plus 1 egg for column 2 or 3 and 2 eggs for column 4 or 5.', 'MegaCredits (MC); steel helps pay for Building cards and titanium for Space cards.'],
    ['Getting cards', 'The wetland action draws cards, each from the 3 face-up birds or the deck.', 'Each generation, everyone draws 4 cards and pays 3 MC for each one they keep.'],
    ['Engine payoff', 'Using a habitat triggers the brown powers of the birds in that row, from right to left.', 'Production pays out every generation; blue cards add actions you can use.'],
    ['Game end', 'Always after 4 rounds; you get fewer action cubes (so fewer turns) each round.', 'After the generation in which oxygen, temperature and oceans have all reached their maximum.'],
  ],
  terms: [['Brown "when activated" powers', 'Blue card actions'], ['End-of-round goals', 'Milestones and awards']],
  toA: 'Your cards pay off when you use a habitat action, not as income each round, and the game always ends after 4 rounds.',
  toB: 'Your cards pay off mostly as production every generation, and the game lasts until all 3 global parameters are at their maximum.',
});

defineBridge({
  a: 'wingspan', b: 'ark-nova',
  same: [
    'You play animal cards into your own area for points and powers.',
    'Card icons (habitats, continents, animal types) are rewarded by other cards and goals.',
    'Bonus cards (Wingspan) and final scoring cards (Ark Nova) reward specific collections.',
  ],
  diff: [
    ['Choosing actions', 'Use 1 habitat; its action gets stronger with each bird in that row.', 'Use 1 of your 5 action cards; its slot (1–5) sets its strength, and after use it moves back to slot 1.'],
    ['Paying for animals', 'The food tokens shown on the bird, plus eggs in columns 2–5.', 'Money, plus an empty enclosure big enough for the animal.'],
    ['Space', '3 rows of 5 slots; no map.', 'A zoo map on which you fit enclosures and kiosks like a puzzle.'],
    ['Scoring', 'Add up points from birds, eggs, bonus cards and round goals.', 'Your appeal and conservation markers move toward each other on one track; your score is how far they have passed each other.'],
    ['Length', '40–70 minutes; always 4 rounds.', '1.5–2.5 hours; ends when one player’s 2 markers cross.'],
  ],
  terms: [['Bird cards', 'Animal cards'], ['Food', 'Money'], ['Bonus cards', 'Final scoring cards']],
  toA: 'No zoo map, money or action slots: each turn you play a bird or use a habitat, and the game stops after 4 rounds.',
  toB: 'Much heavier: each animal needs money and an enclosure, and each action card drops to strength 1 after you use it.',
});

defineBridge({
  a: 'wingspan', b: 'splendor',
  same: [
    'Cards you own make your later turns stronger.',
    'You choose from a face-up display that other players also want.',
    'One simple choice per turn; little conflict; 30–70 minutes.',
  ],
  diff: [
    ['Your turn', 'Play a bird, or use a habitat to gain food, lay eggs or draw cards.', 'Take gems, reserve a card, or buy a card.'],
    ['What cards give', 'A power (most trigger when you use that bird’s row), plus points.', 'A permanent 1-gem discount, and sometimes points.'],
    ['Paying', 'Food from a shared bird feeder, plus eggs.', 'Gem tokens from a shared supply.'],
    ['Extra goals', 'Secret bonus cards and public end-of-round goals.', 'Nobles: a noble joins you automatically, worth 3 points, once your cards show the gems it requires.'],
    ['Game end', 'After 4 rounds.', 'When a player reaches 15 points, finish the round so everyone has had the same number of turns.'],
  ],
  terms: [['Food', 'Gem tokens'], ['Bird tray', 'Face-up card rows']],
  toA: 'Cards do more than discount: each bird has its own power, which triggers when you use that bird’s habitat row.',
  toB: 'Cards have no powers: each is a permanent gem discount, so the game is a race to buy faster.',
});

defineBridge({
  a: 'wingspan', b: 'cascadia',
  same: [
    'You build your own area of animals and habitats.',
    'You pick from a small face-up display that everyone sees.',
    'Little direct conflict; solo modes are included.',
  ],
  diff: [
    ['Your turn', 'Choose 1 of 4 actions.', 'Take 1 habitat tile and the wildlife token paired with it; place the tile, then you may place the token.'],
    ['Animals', 'Hundreds of unique bird cards, each with a power.', '5 animal types as tokens, with no powers.'],
    ['Where things go', 'Birds go into 3 habitat rows of 5 slots.', 'Each hex tile must touch your map; a token goes on one of your empty tiles that shows its animal.'],
    ['Scoring', 'Birds, eggs, bonus cards and round goals.', 'One public scoring card per animal type rewards a pattern; each habitat also scores your largest connected area of it.'],
    ['Length', '4 rounds; you get fewer actions each round.', 'Exactly 20 turns per player.'],
  ],
  terms: [],
  toA: 'Each card is a unique bird with its own power, so you build combinations of powers instead of arranging a map.',
  toB: 'No powers or resources: the puzzle is placing tiles and animals so they fit the scoring patterns.',
});

defineBridge({
  a: 'terraforming-mars', b: 'ark-nova',
  same: [
    'Hundreds of unique cards; each card you play improves your later turns.',
    'Card icons (tags in Terraforming Mars; continents and animal types in Ark Nova) unlock and power other cards.',
    'Money is the main currency, and your income rises with one main score track (Terraform Rating; appeal).',
    'Long games: about 2 hours (Ark Nova 1.5–2.5).',
  ],
  diff: [
    ['Your turn', 'Take 1 or 2 actions; players keep taking turns in order until everyone has passed.', 'Use 1 of your 5 action cards; its slot (1–5) sets its strength.'],
    ['Getting cards', 'Each generation, draw 4 cards and pay 3 MegaCredits (MC) for each one you keep.', 'The Cards action: draw more cards the higher its strength, or take from the face-up display.'],
    ['Income', 'Every generation: MC equal to your Terraform Rating (TR) plus your MC production.', 'At each break: money, mainly set by your appeal.'],
    ['Map', 'One shared Mars board; players compete for tile spaces and their bonuses.', 'Your own zoo map; conservation projects are the main shared race.'],
    ['Game end', 'After the generation in which oxygen, temperature and oceans have all reached their maximum.', 'When one player’s appeal and conservation markers cross.'],
  ],
  terms: [['MegaCredits', 'Money'], ['Tags', 'Icons'], ['Terraform Rating', 'Appeal']],
  toA: 'You take many small actions each generation instead of one action of set strength, and the game ends when Mars is fully terraformed.',
  toB: 'You use 1 action card per turn, and it drops to strength 1 after use, so timing your cards is the main skill.',
});

defineBridge({
  a: 'splendor', b: 'dominion',
  same: [
    'You spend now so your later turns get richer.',
    'You buy from a shared market that everyone can see.',
    'Buying points too early slows down your later turns.',
  ],
  diff: [
    ['What you buy', 'Cards from 3 face-up rows of 4.', 'Cards from 10 Kingdom piles, plus the Treasure and Victory piles.'],
    ['How purchases help', 'A permanent 1-gem discount, usable from your next purchase on.', 'A bought card goes to your discard pile and shows up in a later hand.'],
    ['Paying', 'Gem tokens you have saved from earlier turns.', 'Treasures in this turn’s hand of 5; coins you don’t spend are lost.'],
    ['Points', 'Cards and nobles give points with no downside.', 'Victory cards do nothing in your hand and take up space in your deck.'],
    ['Game end', 'When a player reaches 15 points, finish the round so everyone has had the same number of turns.', 'At the end of the turn in which the Province pile, or any 3 supply piles, run out.'],
  ],
  terms: [['Card bonus (permanent gem)', 'Treasure card'], ['Prestige points', 'Victory cards']],
  toA: 'No deck or shuffling: each card you buy is a permanent discount, and points never get in your way.',
  toB: 'Purchases go into a deck you reshuffle, so a card helps only when you draw it, and Victory cards clog your hands.',
});

defineBridge({
  a: 'splendor', b: 'azul',
  same: [
    'Each turn you take coloured pieces from a shared supply.',
    'Taking what another player needs is a big part of play.',
    'Few rules; 30–45 minutes.',
  ],
  diff: [
    ['Taking', '3 gems of different colours, or 2 of one colour if that pile has 4 or more.', 'Every tile of one colour from one factory, or from the centre.'],
    ['Using them', 'Spend gems on cards that give permanent discounts.', 'Place tiles on your pattern lines; at the end of the round, each full line moves 1 tile onto your wall.'],
    ['Too much', 'You may hold at most 10 tokens.', 'Tiles you can’t place go to your floor line and cost you points.'],
    ['Scoring', 'Points on cards and nobles.', 'Each tile scores when it reaches your wall, more for each tile it touches in its row and column; end bonuses for full rows, columns and colours.'],
    ['Game end', 'When a player reaches 15 points, finish the round so everyone has had the same number of turns.', 'At the end of the round in which a player completes a horizontal row on their wall.'],
  ],
  terms: [['Gem tokens', 'Tiles']],
  toA: 'You never have to take every piece of a colour, and nothing is wasted: gems buy cards whose discounts make later cards cheaper.',
  toB: 'You must take every tile of the colour you pick, and tiles you can’t use cost points, so what you leave for others matters as much as what you take.',
});

defineBridge({
  a: 'agricola', b: 'dune-imperium',
  same: [
    'Worker placement: once a worker is on an action space, no other player may use that space this round.',
    'You start with 2 workers and can gain more.',
    'Cards you own give special powers and combinations.',
  ],
  diff: [
    ['Placing workers', 'Any free action space.', 'Play a card from your hand; your agent may go only to a space whose icon is on that card.'],
    ['Cards', 'Occupations and improvements, each played once and kept for the rest of the game.', 'A deck you build and reshuffle; you buy cards with persuasion.'],
    ['Recurring pressure', 'At each harvest, pay 2 food per family member; take 1 begging card for each food you are short.', 'Every round has a conflict: commit troops to win its rewards.'],
    ['Interaction', 'Mostly blocking action spaces and taking major improvements first.', 'Blocking spaces, combat, and racing for faction alliances.'],
    ['Winning', 'Most points after 14 rounds; you lose points for missing farm categories.', 'The game ends after the round in which someone reaches 10 VP (or when the conflict deck runs out); most VP wins.'],
  ],
  terms: [['Family members', 'Agents'], ['Occupations and improvements', 'Cards in your deck']],
  toA: 'No deck or combat: you send workers to any free space, and the pressure is feeding your family at each harvest.',
  toB: 'The card you play limits where your agent can go, and each round ends with a conflict.',
});

defineBridge({
  a: 'agricola', b: 'patchwork',
  same: [
    'You fill your own grid; empty spaces cost points at the end.',
    'Payouts come at fixed times in the game: harvests in Agricola, button income in Patchwork.',
  ],
  diff: [
    ['Players', '1–4 (more with an expansion).', 'Exactly 2.'],
    ['Your turn', 'Place 1 family member on a free action space.', 'Buy 1 of the 3 patches just after the neutral token, or move your time token just past your opponent’s and take 1 button per space moved.'],
    ['Turn order', 'Players take turns clockwise, placing 1 family member each.', 'The player further behind on the time track goes next, possibly several times in a row.'],
    ['Pressure', 'At each harvest, pay 2 food per family member.', 'You spend buttons and time; there is no feeding.'],
    ['Empty space penalty', '−1 point per unused farmyard space.', '−2 points per empty square on your 9×9 quilt.'],
  ],
  terms: [['Harvest', 'Button income'], ['Unused farmyard space', 'Empty quilt square']],
  toA: 'Instead of one puzzle you juggle fields, fences, animals and family, and you must have food at every harvest.',
  toB: 'A pure 2-player space puzzle: each patch’s time cost decides who moves next, so a cheap patch can buy you several turns in a row.',
});

defineBridge({
  a: 'agricola', b: 'brass-birmingham',
  same: [
    'Heavy games where every action counts.',
    'Other players can block what you need.',
    'Running short of food (Agricola) or money (Brass) is a constant danger.',
  ],
  diff: [
    ['Your turn', 'Place 1 family member on a free action space.', 'Take 2 actions, each discarding 1 card.'],
    ['Main resources', 'Food, wood, clay, reed and stone.', 'Money, coal, iron and beer.'],
    ['Map', 'Your own farmyard.', 'One shared map of towns, links and industries.'],
    ['Running short', 'Take a begging card for each missing food: −3 points each.', 'Take a £30 loan, which lowers your income by 3 levels.'],
    ['Structure', '14 rounds; 6 of them end with a harvest.', 'A canal era, then a rail era; links and flipped industry tiles score at the end of each era.'],
  ],
  terms: [],
  toA: 'No shared map or market: you build your own farm, and the pressure is food at each harvest, not money.',
  toB: 'Everyone shares one map and market, so building industries whose coal, iron or beer other players need is key.',
});

defineBridge({
  a: 'scythe', b: 'root',
  same: [
    'Each player is a faction on one shared map, with its own board and powers.',
    'Pieces leave your faction board as you place them, unlocking abilities or points.',
    'Fighting is one way to win among several.',
  ],
  diff: [
    ['Factions', 'All factions take the same actions; each has 1 unique power and 4 mech abilities.', 'Each faction plays by entirely different rules.'],
    ['Your turn', 'Choose 1 section of your player mat; it must differ from the section you chose last turn.', 'Follow your faction’s own turn steps.'],
    ['Combat', 'Each side secretly sets a power dial and may add combat cards; no dice.', 'Roll 2 twelve-sided dice: the attacker deals hits equal to the higher roll, the defender equal to the lower.'],
    ['Winning', 'The game ends as soon as a player places their 6th star; the most coins wins.', 'The first player to 30 victory points wins; a player who has played a dominance card instead wins by meeting its condition.'],
    ['Map', 'Hex territories that produce resources, with the Factory in the centre.', 'Clearings, each with a suit that matches your cards.'],
  ],
  terms: [['Faction mat', 'Faction board'], ['Territory', 'Clearing']],
  toA: 'Every faction takes the same actions, so you learn one rule set, and combat is a secret power bid, not dice.',
  toB: 'Each faction has its own rules, so learn what the other factions want in order to see threats coming.',
});

defineBridge({
  a: 'scythe', b: 'twilight-imperium',
  same: [
    'You explore, expand, build an economy and fight on one shared map.',
    'Each faction has its own powers.',
    'Secret objectives give each player hidden ways to score.',
  ],
  diff: [
    ['Length', '90–115 minutes.', '4–8 hours.'],
    ['Your turn', 'Choose 1 section of your player mat and take its top action, its bottom action, or both.', '1 action: activate a system, play your strategy card, or use a card’s component action.'],
    ['Combat', 'Each side secretly sets a power dial and may add combat cards; no dice.', 'Each unit rolls a 10-sided die and hits on its combat value or higher.'],
    ['Politics', 'Little negotiation; players cannot trade with each other.', 'Deals and trades are central; once a player first takes Mecatol Rex, everyone votes on laws (agendas) each round.'],
    ['Winning', 'The game ends as soon as a player places their 6th star; the most coins wins.', 'The first player to 10 victory points wins; most points come from objectives.'],
  ],
  terms: [['Stars', 'Victory points'], ['Factory', 'Mecatol Rex']],
  toA: 'No dice and little table talk; as soon as someone places a 6th star, the player with the most coins wins.',
  toB: 'A far longer game where deals, trades and votes on laws matter as much as your fleet.',
});
