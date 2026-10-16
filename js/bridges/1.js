// Bridges for KIN[0]..KIN[19]: explain one game in terms of a similar one the visitor already knows.

defineBridge({
  a: 'catan', b: 'ticket-to-ride',
  same: [
    'Collect coloured cards, then spend sets of them to claim spots on a shared map.',
    'A spot one player takes is closed to everyone else, so blocking matters.',
    'A bonus goes to the longest continuous road or route.',
  ],
  diff: [
    ['Getting cards', 'Dice pick which hexes pay out each turn, to everyone built next to them.', 'Your choice: draw 2 train cards, or 1 face-up locomotive.'],
    ['Spending cards', 'Fixed costs: road = brick + lumber; city = 3 ore + 2 grain.', 'A route of N spaces costs N cards of its colour; grey routes take any one colour.'],
    ['Trading', 'Trade with players, or 4:1 with the bank (better at ports).', 'No trading; locomotives are wild.'],
    ['Goals', 'First to 10 victory points.', 'Secret destination tickets: points if you link the cities, minus if not.'],
    ['Game end', 'Immediately when someone reaches 10 points on their turn.', 'When someone has 2 or fewer trains; everyone gets one more turn.'],
  ],
  terms: [['Resource cards', 'Train cards'], ['Longest Road', 'Longest Route']],
  toA: 'Dice, not you, decide which cards you get: where you build sets your income, and trading fills the gaps.',
  toB: 'You choose your cards instead of rolling for them, and secret destination tickets are a big part of your score.',
});

defineBridge({
  a: 'catan', b: 'carcassonne',
  same: [
    'Everyone builds on one shared map.',
    'Roads and cities are the main things you build and score.',
  ],
  diff: [
    ['The map', 'Fully laid out at the start; fixed all game.', 'Starts as 1 tile and grows by 1 tile each turn.'],
    ['Your turn', 'Roll for resources, trade, then spend cards to build.', 'Draw a tile, place it so edges match, optionally put a meeple on it.'],
    ['Owning things', 'Your pieces are yours for good.', 'Most meeples on a road, city or field scores it; tied players all score.'],
    ['Scoring', 'Victory points from what you own; first to 10 wins.', 'Roads and cities score when finished; fields and unfinished features at the end.'],
    ['Interaction', 'Trading, the robber, and racing for building spots.', 'Joining rival roads or cities to share or steal their points.'],
  ],
  terms: [],
  toA: 'The map is fixed from turn one, and building costs resource cards from dice and trades.',
  toB: 'No resources or costs: place one tile a turn, and score by where you commit your 7 meeples.',
});

defineBridge({
  a: 'catan', b: 'monopoly',
  same: [
    'Roll 2 dice every turn; 7 is the most likely total.',
    'You trade with players, and haggling is a big part of play.',
    'Upgrade what you own so it pays more.',
  ],
  diff: [
    ['What the dice do', 'Every hex with the rolled number pays every player built next to it.', 'Move your token that many squares.'],
    ['Income', 'Resource cards, on every player’s roll.', 'Rent when players land on your property, plus $200 for passing GO.'],
    ['Getting land', 'Spend resource cards to build settlements on free corners.', 'Buy the property you land on, or it goes to auction.'],
    ['Winning', 'First to 10 victory points.', 'Be the last player not bankrupt.'],
    ['Length', '1–2 hours; nobody is knocked out.', '1–3 hours; bankrupt players are out.'],
  ],
  terms: [['Settlement, upgraded to a city', 'Houses, upgraded to a hotel']],
  toA: 'No money and no bankruptcy: race to 10 points, and collect income on other players’ rolls too.',
  toB: 'You earn only when players land on your squares, and you win by bankrupting everyone else.',
});

defineBridge({
  a: 'ticket-to-ride', b: 'splendor',
  same: [
    'One action per turn, usually taking resources or spending them.',
    'You take from a face-up display, so others see what you want.',
    'There is a wild resource: locomotives or gold tokens.',
    'Few rules; 30–60 minutes.',
  ],
  diff: [
    ['Taking', 'Draw 2 train cards, face-up or from the deck.', 'Take 3 different gems, or 2 of one colour if 4+ are in that pile.'],
    ['Spending', 'Claim a route with matching coloured cards.', 'Buy a face-up card by paying its gem cost.'],
    ['Long-term growth', 'None: spent cards are gone.', 'Each bought card is a permanent 1-gem discount.'],
    ['Saving for later', 'No hand limit.', 'Reserve up to 3 cards (taking a gold); hold at most 10 tokens.'],
    ['Game end', 'Someone has 2 or fewer trains; one more turn each.', 'Someone reaches 15 points; finish the round.'],
  ],
  terms: [['Locomotive', 'Gold token'], ['Claim a route', 'Buy a card']],
  toA: 'Spent cards are gone, so there is no engine: you race for specific routes on a map.',
  toB: 'Purchases keep paying: each card is a permanent discount, so early cheap buys build an engine.',
});

defineBridge({
  a: 'ticket-to-ride', b: 'brass-birmingham',
  same: [
    'Build links between cities on a map.',
    'Most connections hold one player’s link, so you race for key routes.',
    'You spend cards from your hand to act.',
  ],
  diff: [
    ['Turn', 'One action: draw cards, claim a route, or draw tickets.', 'Two actions (one in round 1), each discarding a card; Build needs a matching card.'],
    ['What links score', 'Points when built, by length (1 to 15).', 'At each era’s end: the VP icons of the places they touch.'],
    ['Money', 'None.', 'Everything costs money; income and loans matter.'],
    ['Goals', 'Secret tickets: connect two cities or lose points.', 'No tickets; links extend where you can build and move coal and beer.'],
    ['Structure', 'One continuous game.', 'Canal era, then rail era; canal links are removed in between.'],
  ],
  terms: [['Route', 'Link (canal or rail)']],
  toA: 'Links are the whole point: they score by length when built, with no money, industries or market.',
  toB: 'Links serve an economy: they score from what they touch, and cost money (plus coal for rail).',
});

defineBridge({
  a: 'monopoly', b: 'monopoly-deal',
  same: [
    'Collect colour sets of the same properties (Boardwalk, the railroads and so on).',
    'A full set charges much more rent; houses and hotels raise it further.',
    'Rent must be paid; if you can’t, you hand over what you have.',
  ],
  diff: [
    ['Your turn', 'Roll 2 dice and move.', 'Draw 2 cards, then play up to 3.'],
    ['Getting property', 'Buy the square you land on, or it goes to auction.', 'Play property cards from hand, or steal with Sly Deal or Deal Breaker.'],
    ['Charging rent', 'Automatic when someone lands on your property.', 'Play a Rent card on one of your colours when you choose.'],
    ['Paying', 'Cash, with change given.', 'Cards from your bank or properties; no change given.'],
    ['Winning', 'Last player not bankrupt.', 'First to 3 complete sets of different colours.'],
  ],
  terms: [['Passing GO ($200)', 'Pass Go card (draw 2)'], ['Chance and Community Chest', 'Action cards']],
  toA: 'No hand of cards: dice decide where you land, rent is automatic, and you win by bankrupting everyone.',
  toB: 'Nobody goes bankrupt: first to 3 full sets wins, and action cards steal properties outright.',
});

defineBridge({
  a: 'monopoly', b: 'risk',
  same: [
    'Dice drive every turn.',
    'Owning a complete group (colour set or continent) gives a big ongoing bonus.',
    'Players are knocked out one by one; the last one left wins.',
    'Long games: Monopoly 1–3 hours, Risk 2–4.',
  ],
  diff: [
    ['What you own', 'Properties, bought with money.', 'Territories, held by the armies on them.'],
    ['Income each turn', '$200 for passing GO, plus rent.', 'Armies: territories ÷ 3 (min 3), plus continent bonuses and card sets.'],
    ['Using the dice', 'Roll 2 and move that far.', 'Choose where to attack; attacker rolls up to 3 dice, defender up to 2.'],
    ['Interaction', 'Trading and rent.', 'Direct attacks; the defender wins ties.'],
    ['Knocked out', 'When you cannot pay a debt.', 'When you lose your last territory; your conqueror takes your cards.'],
  ],
  terms: [['Monopoly (full colour set)', 'Holding a whole continent']],
  toA: 'The dice move you, and you hurt opponents by owning the squares they land on, not by attacking.',
  toB: 'You choose every attack; dice only settle battles, so where to push and what to defend is the game.',
});

defineBridge({
  a: 'monopoly', b: 'clue',
  same: [
    'Roll and move a token around a fixed board.',
    'You can be knocked out before the game ends.',
  ],
  diff: [
    ['Moving', 'Exactly the roll, always clockwise.', 'The roll, in any direction (no diagonals); entering a room stops you.'],
    ['Goal', 'Bankrupt everyone else.', 'Be first to name the suspect, weapon and room in the envelope.'],
    ['Interaction', 'Trading and rent.', 'Suggestions: the next player who can must privately show you one named card.'],
    ['Hidden information', 'None; money and deeds are public.', 'Your hand is secret; deduce the envelope by crossing off cards.'],
    ['Knocked out', 'Run out of money.', 'Make a wrong accusation; you still show cards to disprove suggestions.'],
  ],
  terms: [],
  toA: 'Nothing to deduce: everything is public, and the game is buying the right properties and making deals.',
  toB: 'Moving only gets you to rooms; the game is tracking which cards others have shown.',
});

defineBridge({
  a: 'wingspan', b: 'terraforming-mars',
  same: [
    'Play cards into your own area; each card improves later turns.',
    'Cards carry tags (habitats in Wingspan; Plant, Space and others in Terraforming Mars) that other cards reward.',
    'Shared goals: end-of-round goals in Wingspan; milestones and awards in Terraforming Mars.',
    'Hundreds of unique cards, so every game differs.',
  ],
  diff: [
    ['Your turn', 'Place 1 cube on 1 of 4 actions.', 'Take 1 or 2 actions, repeating turns until you pass.'],
    ['Paying for cards', 'Food tokens, plus eggs in columns 2–5.', 'MegaCredits, plus steel or titanium for some tags.'],
    ['Getting cards', 'Wetland action: take from 3 face-up birds or the deck.', 'Each generation, draw 4 and pay 3 MC for each one kept.'],
    ['Engine payoff', 'An action triggers the brown powers in that row, right to left.', 'Production pays every generation; blue cards add actions.'],
    ['Game end', 'Always 4 rounds, with fewer cubes each round.', 'After the generation in which oxygen, temperature and oceans are all maxed.'],
  ],
  terms: [['Brown "when activated" powers', 'Blue card actions'], ['End-of-round goals', 'Milestones and awards']],
  toA: 'Your engine fires when you pick a habitat action, not as income, and the game always ends after 4 rounds.',
  toB: 'Your engine is mostly production paid every generation, and the game lasts until all 3 global parameters are maxed.',
});

defineBridge({
  a: 'wingspan', b: 'ark-nova',
  same: [
    'Play animal cards into your own area for points and powers.',
    'Card icons (habitats, continents, animal types) are rewarded by other cards and goals.',
    'Bonus and final scoring cards reward specific collections.',
  ],
  diff: [
    ['Choosing actions', 'Pick a habitat; power grows with birds in that row.', 'Pick 1 of 5 action cards; strength is its slot (1–5), then it resets to 1.'],
    ['Paying for animals', 'Food tokens, plus eggs in columns 2–5.', 'Money, plus an enclosure big enough for the animal.'],
    ['Space', '3 rows of 5 slots; no map.', 'A zoo map where you fit enclosures and kiosks like a puzzle.'],
    ['Scoring', 'Add points from birds, eggs, bonuses and goals.', 'Appeal and conservation tracks; how far they have crossed decides it.'],
    ['Length', '40–70 minutes; always 4 rounds.', '1.5–2.5 hours; ends when someone’s tracks cross.'],
  ],
  terms: [['Bird cards', 'Animal cards'], ['Food', 'Money'], ['Bonus cards', 'Final scoring cards']],
  toA: 'No zoo map, money or action slots: pick a habitat each turn, play birds, and stop after 4 rounds.',
  toB: 'Much heavier: animals need money and an enclosure, and each action card drops to strength 1 after use.',
});

defineBridge({
  a: 'wingspan', b: 'splendor',
  same: [
    'Cards you own make later turns stronger.',
    'You choose from a face-up display others also want.',
    'One simple choice per turn; little conflict; 30–70 minutes.',
  ],
  diff: [
    ['Your turn', 'Play a bird, or use a habitat: gain food, lay eggs or draw cards.', 'Take gems, reserve a card, or buy a card.'],
    ['What cards give', 'Powers (most fire when you use their row), plus points.', 'A permanent gem discount, sometimes points.'],
    ['Paying', 'Food from a shared feeder, plus eggs.', 'Gem tokens from a shared supply.'],
    ['Extra goals', 'Secret bonus cards and public end-of-round goals.', 'Nobles: 3 points each, gained automatically when you qualify.'],
    ['Game end', 'After 4 rounds.', 'Someone reaches 15 points; finish the round.'],
  ],
  terms: [['Food', 'Gem tokens'], ['Bird tray', 'Face-up card rows']],
  toA: 'Cards do more than discount: each bird has its own power, fired along a row when you use that habitat.',
  toB: 'Cards have no powers: each is a permanent gem discount, so the game is a race to buy faster.',
});

defineBridge({
  a: 'wingspan', b: 'cascadia',
  same: [
    'Build your own area of animals and habitats.',
    'Pick from a small face-up display that everyone sees.',
    'Little direct conflict; solo modes included.',
  ],
  diff: [
    ['Your turn', 'Choose 1 of 4 actions.', 'Take 1 tile-and-animal pair and place both.'],
    ['Animals', 'Hundreds of unique bird cards with powers.', '5 animal types as tokens; no powers.'],
    ['Where things go', 'Birds go into 3 rows of 5 slots.', 'Hex tiles join your map; tokens go on tiles that show their animal.'],
    ['Scoring', 'Birds, eggs, bonus cards and round goals.', 'One public pattern card per animal, plus your largest habitat areas.'],
    ['Length', '4 rounds, with fewer actions each round.', 'Exactly 20 turns each.'],
  ],
  terms: [],
  toA: 'Each card is a unique bird with its own power, so you build combos instead of arranging a map.',
  toB: 'No powers or resources: the puzzle is placing tiles and animals to fit the scoring patterns.',
});

defineBridge({
  a: 'terraforming-mars', b: 'ark-nova',
  same: [
    'Engine builders with hundreds of unique cards.',
    'Card icons (tags; continents and animal types) unlock and power other cards.',
    'Money is the main currency, and income grows with one main score track.',
    'Long games: about 2 hours (Ark Nova 1.5–2.5).',
  ],
  diff: [
    ['Your turn', 'Take 1 or 2 actions, repeating turns until you pass.', 'Use 1 of 5 action cards; its slot (1–5) sets its strength.'],
    ['Getting cards', 'Draw 4 each generation; pay 3 MC per card kept.', 'Cards action: draw more at higher strength, or take from the display.'],
    ['Income', 'Every generation: TR plus MC production.', 'At each break, mainly from appeal.'],
    ['Map', 'One shared Mars board; tiles compete for space and bonuses.', 'Your own zoo map; conservation projects are the main shared race.'],
    ['Game end', 'After the generation in which all 3 global parameters are maxed.', 'When one player’s appeal and conservation markers cross.'],
  ],
  terms: [['MegaCredits', 'Money'], ['Tags', 'Icons'], ['Terraform Rating', 'Appeal']],
  toA: 'Take many small actions per generation instead of one fixed-strength action; the game ends when Mars is terraformed.',
  toB: 'One action card per turn, and it drops to strength 1 after use, so timing your cards is the main skill.',
});

defineBridge({
  a: 'splendor', b: 'dominion',
  same: [
    'Spend now so later turns get richer.',
    'You buy from a shared market everyone can see.',
    'Buying points too early slows your engine.',
  ],
  diff: [
    ['What you buy', 'Cards from 3 face-up rows of 4.', 'Cards from 10 Kingdom piles plus Treasure and Victory piles.'],
    ['How purchases help', 'A permanent gem discount, usable right away.', 'Cards go to your discard pile and show up in later hands.'],
    ['Paying', 'Gem tokens saved from earlier turns.', 'Treasures in this turn’s hand of 5; unspent coins are lost.'],
    ['Points', 'Cards and nobles give points with no downside.', 'Victory cards do nothing in hand and clog your deck.'],
    ['Game end', 'Someone reaches 15 points; finish the round.', 'Provinces run out, or any 3 supply piles are empty.'],
  ],
  terms: [['Card bonus (permanent gem)', 'Treasure card'], ['Prestige points', 'Victory cards']],
  toA: 'No deck or shuffling: each card is a permanent discount, and points never get in your way.',
  toB: 'Purchases go into a deck you reshuffle, so a card helps only when drawn, and points cards clog your hands.',
});

defineBridge({
  a: 'splendor', b: 'azul',
  same: [
    'Take coloured pieces from a shared supply each turn.',
    'Taking what someone else needs is a big part of play.',
    'Few rules; 30–45 minutes.',
  ],
  diff: [
    ['Taking', '3 different gems, or 2 of one colour if 4+ are left.', 'All tiles of one colour from one factory or the centre.'],
    ['Using them', 'Spend gems on cards that give lasting discounts.', 'Fill pattern lines; each full line moves one tile to your wall.'],
    ['Too much', 'Hold at most 10 tokens.', 'Tiles that don’t fit drop to the floor line for minus points.'],
    ['Scoring', 'Points on cards and nobles.', 'Wall tiles score for adjacent tiles; bonuses for rows, columns and colours.'],
    ['Game end', 'Someone reaches 15 points; finish the round.', 'Someone completes a horizontal wall row; finish the round.'],
  ],
  terms: [['Gem tokens', 'Tiles']],
  toA: 'You need not take a whole colour, and nothing is wasted: gems buy cards whose discounts build an engine.',
  toB: 'You must take every tile of your colour and extras cost points, so what you leave for others matters as much as your pick.',
});

defineBridge({
  a: 'agricola', b: 'dune-imperium',
  same: [
    'Worker placement: an occupied action space is closed to others this round.',
    'You start with 2 workers and can gain more.',
    'Cards you own give special powers and combos.',
  ],
  diff: [
    ['Placing workers', 'Any free action space.', 'Play a card; its icons decide which spaces your agent may visit.'],
    ['Cards', 'Occupations and improvements, played once and kept.', 'A deck you build and reshuffle; buy cards with persuasion.'],
    ['Recurring pressure', 'Harvests: feed 2 food per person or take begging cards.', 'Every round, a conflict: commit troops to win its rewards.'],
    ['Interaction', 'Mostly blocking spaces and taking major improvements first.', 'Blocking, combat, and racing for faction alliances.'],
    ['Winning', 'Most points after 14 rounds; minus points for gaps.', 'Ends after the round someone reaches 10 VP (or conflicts run out); most VP wins.'],
  ],
  terms: [['Family members', 'Agents'], ['Occupations and improvements', 'Cards in your deck']],
  toA: 'No deck or combat: send workers to any free space, and the pressure is feeding your family at each harvest.',
  toB: 'The card you play limits where your agent can go, and each round ends with a fight.',
});

defineBridge({
  a: 'agricola', b: 'patchwork',
  same: [
    'Fill a personal grid; empty spaces cost points at the end.',
    'Payouts come at fixed points in the game: harvests, button income.',
  ],
  diff: [
    ['Players', '1–4 (more with an expansion).', 'Exactly 2.'],
    ['Your turn', 'Place a family member on a free action space.', 'Buy 1 of the next 3 patches, or move ahead and take buttons.'],
    ['Turn order', 'Players alternate, placing one worker each.', 'Whoever is behind on the time track goes next, possibly several times in a row.'],
    ['Pressure', 'Feed 2 food per person at each harvest.', 'Spend buttons and time; no feeding.'],
    ['Empty space penalty', '−1 per unused farmyard space.', '−2 per empty square on your 9×9 quilt.'],
  ],
  terms: [['Harvest', 'Button income'], ['Unused farmyard space', 'Empty quilt square']],
  toA: 'Instead of one puzzle you juggle fields, fences, animals and family, and must find food every harvest.',
  toB: 'A pure 2-player space puzzle: each patch’s time cost decides who moves next, so a cheap patch can buy several turns in a row.',
});

defineBridge({
  a: 'agricola', b: 'brass-birmingham',
  same: [
    'Heavy games where every action counts.',
    'Other players can block what you need.',
    'Running short of food or money is a constant danger.',
  ],
  diff: [
    ['Your turn', 'Place one worker on a free action space.', 'Two actions, each discarding a card.'],
    ['Main resources', 'Food, wood, clay, reed and stone.', 'Money, coal, iron and beer.'],
    ['Map', 'Your own farmyard.', 'One shared map of towns, links and industries.'],
    ['Running short', 'Take begging cards: −3 points each.', 'Take a £30 loan, dropping your income 3 levels.'],
    ['Structure', '14 rounds; 6 of them end in a harvest.', 'Canal era, then rail era; links and flipped tiles score at each era’s end.'],
  ],
  terms: [],
  toA: 'No shared map or market: you build your own farm, and the pressure is food at each harvest, not money.',
  toB: 'Everyone shares one map and market, so building industries others use for coal, iron or beer is key.',
});

defineBridge({
  a: 'scythe', b: 'root',
  same: [
    'Factions on one shared map, each with its own board and powers.',
    'Pieces leave your faction board as you place them, unlocking abilities or points.',
    'Fighting is one way to win among several.',
  ],
  diff: [
    ['Factions', 'Same actions for all; each has one power and mech abilities.', 'Each faction plays by entirely different rules.'],
    ['Your turn', 'Pick a mat section different from your last turn.', 'Follow your faction’s own turn structure.'],
    ['Combat', 'Secret power dial plus combat cards; no dice.', 'Two dice: attacker deals the higher roll, defender the lower.'],
    ['Winning', 'Game ends at someone’s 6th star; most coins wins.', 'First to 30 victory points, or win with a dominance card.'],
    ['Map', 'Hex territories with resources, and the Factory in the centre.', 'Clearings with suits that match your cards.'],
  ],
  terms: [['Faction mat', 'Faction board'], ['Territory', 'Clearing']],
  toA: 'Everyone takes the same actions, so you learn one rule set; combat is a secret power bid, not dice.',
  toB: 'Each faction has its own rules, so learn what the others want to see threats coming.',
});

defineBridge({
  a: 'scythe', b: 'twilight-imperium',
  same: [
    'Explore, expand, build an economy and fight on a shared map.',
    'Each faction has its own powers.',
    'Secret objectives give hidden ways to score.',
  ],
  diff: [
    ['Length', '90–115 minutes.', '4–8 hours.'],
    ['Your turn', 'One mat section: its top action, its bottom action, or both.', 'One action: activate a system, play your strategy card, or a component action.'],
    ['Combat', 'Secret power dial plus combat cards; no dice.', 'Roll d10s; each unit hits on its combat value or higher.'],
    ['Politics', 'Little negotiation; no trading between players.', 'Deals and trades are central; once Mecatol Rex is taken, everyone votes on laws (agendas).'],
    ['Winning', 'Game ends at someone’s 6th star; most coins wins.', 'First to 10 victory points, mainly from objectives.'],
  ],
  terms: [['Stars', 'Victory points'], ['Factory', 'Mecatol Rex']],
  toA: 'No dice and little table talk; once someone places a 6th star, most coins wins.',
  toB: 'A far longer game where deals, trades and votes on laws matter as much as your fleet.',
});
