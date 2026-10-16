// Bridges for KIN[0]..KIN[19]: explain one game in terms of a similar one the visitor already knows.

defineBridge({
  a: 'catan', b: 'ticket-to-ride',
  same: [
    'You collect coloured cards, then spend sets of them to claim spots on a shared map.',
    'A spot taken by one player is gone for everyone else, so blocking matters.',
    'A bonus goes to whoever has the longest continuous line of roads or trains.',
    'Simple turns and about an hour of play; most of the thinking is about what to collect next.',
  ],
  diff: [
    ['Getting cards', 'Dice decide which hexes pay out each turn, to every player built next to them.', 'You choose: draw 2 train cards, or take 1 face-up locomotive.'],
    ['Spending cards', 'Fixed recipes: a road is brick + lumber, a city is 3 ore + 2 grain.', 'A route of length N costs N cards of its colour; grey routes take any one colour.'],
    ['Trading', 'Trade freely with players, or 4:1 with the bank (better at ports).', 'No trading at all; locomotives are the wild cards.'],
    ['Goals', 'First to 10 victory points, from settlements, cities and bonuses.', 'Secret destination tickets: points if you link the cities, a penalty if not.'],
    ['Game end', 'Immediately, when someone reaches 10 points on their turn.', 'When someone has 2 or fewer trains left; everyone gets one last turn.'],
  ],
  terms: [['Resource cards', 'Train cards'], ['Longest Road', 'Longest Route']],
  toA: 'You no longer choose which cards you get: the dice hand them out, so where you build decides your income and trading fills the gaps.',
  toB: 'Your cards come from your own choices rather than dice, and most of your score depends on your secret destination tickets.',
});

defineBridge({
  a: 'catan', b: 'carcassonne',
  same: [
    'Everyone builds on one shared map, and the shape of that map is the whole game.',
    'Roads and cities are the main things you build or score.',
    'Light rules and under an hour of play; both work well as a first modern board game.',
  ],
  diff: [
    ['The map', 'Laid out fully at the start; it never changes during play.', 'Starts as one tile and grows by one tile every turn.'],
    ['Your turn', 'Roll for resources, trade, then spend cards to build.', 'Draw a tile, place it so edges match, maybe put a meeple on it.'],
    ['Owning things', 'Your pieces belong to you for good.', 'Whoever has the most meeples on a road, city or field scores it; ties both score.'],
    ['Scoring', 'Victory points from what you own; first to 10 wins.', 'Roads and cities score when finished; fields and unfinished ones score at the end.'],
    ['Interaction', 'Trading, the robber, and racing for building spots.', 'Joining rival roads or cities with your tiles to share or take their points.'],
  ],
  terms: [],
  toA: 'Here the map is fixed from turn one, and you need resource cards from dice and trades before you can build anything.',
  toB: 'There are no resources or costs: each turn you place one tile, and you score by deciding where to commit your few meeples.',
});

defineBridge({
  a: 'catan', b: 'monopoly',
  same: [
    'Roll two dice at the start of every turn; 7 is the most likely total.',
    'You trade with other players, and haggling over what a deal is worth is half the game.',
    'You start small and upgrade what you own so it pays more.',
  ],
  diff: [
    ['What the dice do', 'Every hex with the rolled number pays every player built next to it.', 'Move your token that many squares around the board.'],
    ['Income', 'Resource cards, on any player\'s roll, not just yours.', 'Rent from players who land on your properties, plus $200 for passing GO.'],
    ['Getting land', 'Spend resource cards to build settlements on free corners.', 'Buy the property you land on, or it goes to auction.'],
    ['Winning', 'First to 10 victory points.', 'Be the last player not bankrupt.'],
    ['Length', 'About an hour; nobody is knocked out.', 'Often 2+ hours; players drop out as they go bankrupt.'],
  ],
  terms: [['Settlement, upgraded to a city', 'Houses, upgraded to a hotel']],
  toA: 'There is no money and nobody goes broke: you race to 10 points, and you collect income on other players\' rolls too.',
  toB: 'You only earn when people land on your squares, and the goal is to bankrupt everyone else rather than reach a points total.',
});

defineBridge({
  a: 'ticket-to-ride', b: 'splendor',
  same: [
    'Each turn you do exactly one thing: take resources, or spend them.',
    'You pick from a face-up display, so you can see (and take) what others want.',
    'There is a wild resource: locomotives in one, gold tokens in the other.',
    'Short turns, few rules, under an hour.',
  ],
  diff: [
    ['Taking', 'Draw 2 train cards, face-up or from the deck.', 'Take 3 different gems, or 2 of one colour if 4+ are in that pile.'],
    ['Spending', 'Claim a route on the map with matching coloured cards.', 'Buy a card from the face-up rows by paying its gem cost.'],
    ['Long-term growth', 'None: cards are used up when you claim a route.', 'Every bought card is a permanent gem discount on later buys.'],
    ['Saving for later', 'Hold as many cards in hand as you like.', 'Reserve a card (max 3) and take a gold; hold at most 10 tokens.'],
    ['Game end', 'Someone has 2 or fewer trains; one more turn each.', 'Someone reaches 15 points; finish the round.'],
  ],
  terms: [['Locomotive', 'Gold token'], ['Claim a route', 'Buy a card']],
  toA: 'Cards are spent and gone when you use them, so instead of building an engine you are racing for specific routes on a map.',
  toB: 'What you buy keeps paying: each card permanently discounts future cards, so early cheap buys turn into an engine.',
});

defineBridge({
  a: 'ticket-to-ride', b: 'brass-birmingham',
  same: [
    'You build links between real cities on a map (USA or Europe; the English Midlands).',
    'Most connections can hold only one player\'s link, so you race for key routes.',
    'You spend cards from your hand to do things.',
  ],
  diff: [
    ['Turn', 'One action: draw cards, claim a route, or take tickets.', 'Two actions, each costing a discarded card (Build needs a matching one).'],
    ['What links score', 'Points right away, by length (1 to 15).', 'At each era\'s end, a link scores the VP icons of the places it touches.'],
    ['Money', 'None.', 'Everything costs money; income, loans and spending order matter.'],
    ['Goals', 'Secret tickets: connect two cities or lose points.', 'No tickets; links let you build further out and move coal and beer.'],
    ['Structure', 'One continuous game.', 'Canal era, then rail era; canals are removed in between.'],
  ],
  terms: [['Route', 'Link (canal or rail)']],
  toA: 'Here links are the whole point: they score by length the moment you build them, and there is no money, industry or market to manage.',
  toB: 'Links are the backbone of an economy rather than the goal itself: they score only from the industries next to them, and cost money and coal.',
});

defineBridge({
  a: 'monopoly', b: 'monopoly-deal',
  same: [
    'You collect colour sets of the same properties (Boardwalk, Park Place, the railroads and so on).',
    'A full set lets you charge much higher rent, and houses and hotels raise it further.',
    'Rent must be paid; if you cannot pay, you hand over what you have.',
  ],
  diff: [
    ['Your turn', 'Roll two dice and move around the board.', 'Draw 2 cards, then play up to 3 cards.'],
    ['Getting property', 'Buy the square you land on, or bid at auction.', 'Play property cards from your hand, or steal with Sly Deal or Deal Breaker.'],
    ['Charging rent', 'Automatic when someone lands on your property.', 'Play a Rent card on one of your colours whenever you choose.'],
    ['Paying', 'Cash, and change is given.', 'Cards from your bank or your properties; no change given.'],
    ['Winning', 'Last player who is not bankrupt.', 'First to 3 complete property sets in different colours.'],
  ],
  terms: [['Passing GO ($200)', 'Pass Go card (draw 2)'], ['Chance and Community Chest', 'Action cards']],
  toA: 'There is no hand to play from: the dice decide where you land, rent is charged automatically, and you win by bankrupting everyone.',
  toB: 'Nobody goes bankrupt: you win by completing 3 sets first, and you can steal properties outright with action cards.',
});

defineBridge({
  a: 'monopoly', b: 'risk',
  same: [
    'Dice drive the game every turn.',
    'Owning a complete group (a colour set, or a continent) gives you a big ongoing bonus.',
    'Players are knocked out one by one; the last one standing wins.',
    'Games often run several hours.',
  ],
  diff: [
    ['What you own', 'Properties, bought with money.', 'Territories, held by the armies on them.'],
    ['Each turn\'s income', '$200 for passing GO, plus rent from others.', 'Armies: territories ÷ 3 (min 3), plus continent bonuses and card sets.'],
    ['Using the dice', 'Roll two and move that far; where you land is luck.', 'Choose where to attack; attacker rolls up to 3 dice, defender up to 2.'],
    ['Interaction', 'Trading and charging rent.', 'Direct attacks; the defender wins ties on each pair of dice compared.'],
    ['Knocking out', 'You go out when you cannot pay a debt.', 'You go out when you lose your last territory; your conqueror takes your cards.'],
  ],
  terms: [['Monopoly (full colour set)', 'Holding a whole continent']],
  toA: 'You do not choose where you go: the dice move you, and you hurt opponents by owning the squares they land on rather than attacking them.',
  toB: 'You choose every attack: the dice only settle battles, so planning where to push and what to defend is the real game.',
});

defineBridge({
  a: 'monopoly', b: 'clue',
  same: [
    'Roll and move your token around a fixed board.',
    'Family classics with a short rules sheet, played for an hour or more.',
    'You can be knocked out of the race before the game ends.',
  ],
  diff: [
    ['Moving', 'Move exactly the roll, always clockwise.', 'Move up to the roll in any direction; entering a room stops you.'],
    ['Goal', 'Bankrupt everyone else.', 'Be first to name the murderer, weapon and room in the envelope.'],
    ['Interaction', 'Trading and charging rent.', 'Suggestions: others must privately show a card that disproves them.'],
    ['Hidden information', 'None; all money and deeds are public.', 'Your hand is secret; you deduce the envelope by crossing off cards.'],
    ['Getting knocked out', 'Run out of money.', 'Make a wrong accusation; you still show cards to disprove suggestions.'],
  ],
  terms: [],
  toA: 'There is nothing to deduce: everything is public, and the game is about buying the right properties and making deals.',
  toB: 'Moving is only how you reach rooms; the real game is the notes you keep on which cards other players have shown.',
});

defineBridge({
  a: 'wingspan', b: 'terraforming-mars',
  same: [
    'You play cards into your own personal area, and each card makes later turns better.',
    'Cards have types or tags (habitats in one, tags like Plant or Space in the other) that other cards care about.',
    'Shared goals compete for bonuses: end-of-round goals in one, milestones and awards in the other.',
    'Hundreds of unique cards, so every game plays out differently.',
  ],
  diff: [
    ['Your turn', 'Place one cube on one of 4 actions.', 'Take 1 or 2 actions, again and again until you pass.'],
    ['Paying for cards', 'Food from the bird feeder dice, plus eggs for later columns.', 'MegaCredits, plus steel or titanium for some tags.'],
    ['Getting cards', 'Wetland action: take from 3 face-up birds or the deck.', 'Each generation, draw 4 and pay 3 MC for each one you keep.'],
    ['Engine payoff', 'Using an action triggers birds in that row, right to left.', 'Production pays out once per generation, plus blue card actions.'],
    ['Game end', 'Always 4 rounds, with fewer action cubes each round.', 'When oxygen, temperature and oceans are all maxed.'],
  ],
  terms: [['Brown "when activated" powers', 'Blue card actions'], ['End-of-round goals', 'Milestones and awards']],
  toA: 'Instead of income arriving between rounds, your engine fires when you choose a habitat action, and the game always ends after 4 rounds.',
  toB: 'Your engine is mostly income: cards raise production that pays every generation, and the game lasts until Mars is fully terraformed.',
});

defineBridge({
  a: 'wingspan', b: 'ark-nova',
  same: [
    'You collect animal cards into your own personal area, and they score points and give powers.',
    'Many cards have icons (habitats, continents, animal types) that other cards and goals reward.',
    'How strong an action is depends on what you have built up.',
    'Bonus and end-game scoring cards reward specific collections.',
  ],
  diff: [
    ['Choosing actions', 'Pick a habitat; power grows with birds in that row.', 'Pick one of 5 action cards; power is its slot (1–5), then it resets to 1.'],
    ['Paying for animals', 'Food from the feeder, plus eggs for later columns.', 'Money, plus a built enclosure big enough for the animal.'],
    ['Space', 'Three rows of 5 slots; no map.', 'A zoo map where you fit enclosures and kiosks like a puzzle.'],
    ['Scoring', 'Add up points from birds, eggs, bonuses and goals.', 'Appeal and conservation tracks; how far they cross decides it.'],
    ['Length', 'About an hour, fixed at 4 rounds.', 'Two to three hours; ends when someone\'s tracks cross.'],
  ],
  terms: [['Bird cards', 'Animal cards'], ['Food', 'Money'], ['Bonus cards', 'Final scoring cards']],
  toA: 'There is no zoo map, money or action slots: you choose a habitat each turn and lay down birds, and the game always ends after 4 rounds.',
  toB: 'Expect a much heavier game: animals need money and an enclosure on your map, and each action card gets weak again the moment you use it.',
});

defineBridge({
  a: 'wingspan', b: 'splendor',
  same: [
    'You buy cards, and cards you already own make your later turns stronger.',
    'You choose from a face-up display that other players are also eyeing.',
    'Each turn is one simple choice; low conflict, and about an hour or less.',
  ],
  diff: [
    ['Your turn', 'Choose a habitat: play a bird, gain food, lay eggs or draw cards.', 'Take gems, reserve a card, or buy a card.'],
    ['What cards give', 'Powers that trigger when you use their row, and points.', 'A permanent gem discount, and sometimes points.'],
    ['Paying', 'Food dice from a shared feeder, plus eggs.', 'Gem tokens from a shared supply.'],
    ['Extra goals', 'Secret bonus cards and public end-of-round goals.', 'Nobles: 3 points each, visiting you automatically when you qualify.'],
    ['Game end', 'After 4 rounds.', 'When someone reaches 15 points; finish the round.'],
  ],
  terms: [['Food', 'Gem tokens'], ['Bird tray', 'Face-up card rows']],
  toA: 'Cards here do much more than discount: each bird has its own power, and they fire along a row when you take that habitat\'s action.',
  toB: 'Cards have no powers to read: every card is a permanent gem discount, so the whole game is a race to buy faster than everyone else.',
});

defineBridge({
  a: 'wingspan', b: 'cascadia',
  same: [
    'Calm nature theme with little direct conflict between players.',
    'You build a personal tableau of animals and habitats.',
    'You pick from a small face-up display, so you can see what others might want.',
    'Good solo modes, and about an hour or less to play.',
  ],
  diff: [
    ['Your turn', 'Choose one of 4 habitat actions.', 'Take one tile-and-animal pair and place both.'],
    ['Animals', 'Hundreds of unique bird cards with powers.', '5 animal types as tokens; no powers.'],
    ['Where things go', 'Birds go into 3 rows of 5 slots.', 'Hex tiles join your growing map; tokens go on matching tiles.'],
    ['Scoring', 'Points on birds, eggs, bonus cards and round goals.', 'One public pattern card per animal, plus your largest habitat areas.'],
    ['Game length', '4 rounds, with fewer actions each round.', 'Exactly 20 turns each.'],
  ],
  terms: [],
  toA: 'Each card is a unique bird with its own power, so you build an engine of combos instead of arranging a map.',
  toB: 'There are no powers or resources: the whole puzzle is where you place tiles and animals to fit the scoring patterns.',
});

defineBridge({
  a: 'terraforming-mars', b: 'ark-nova',
  same: [
    'Big card-driven engine builders with hundreds of unique cards.',
    'Card icons (tags in one, continent and animal icons in the other) unlock and power up other cards.',
    'Money is the main currency, and your income grows with one main score track.',
    'Long, thinky games of two hours or more.',
  ],
  diff: [
    ['Your turn', 'Take 1 or 2 actions, repeating until you pass the generation.', 'Use one of 5 action cards; its slot (1–5) sets its strength.'],
    ['Getting cards', 'Draw 4 each generation, pay 3 MC per card you keep.', 'Cards action: draw more at higher strength, or take from the display.'],
    ['Income', 'Paid every generation from TR plus production.', 'Paid at each break, mainly from your appeal.'],
    ['Map', 'One shared Mars board; tiles compete for space and bonuses.', 'Your own zoo map; conservation projects are the main shared race.'],
    ['Game end', 'When all three global parameters are maxed.', 'When one player\'s appeal and conservation tracks cross.'],
  ],
  terms: [['MegaCredits', 'Money'], ['Tags', 'Icons'], ['Terraform Rating', 'Appeal']],
  toA: 'You take many small actions each generation instead of one action of fixed strength, and the end comes when the planet is finished.',
  toB: 'You use one action card per turn and it drops to strength 1 after use, so timing which card to use when is the main skill.',
});

defineBridge({
  a: 'splendor', b: 'dominion',
  same: [
    'Spend now so future turns get richer.',
    'Each turn you buy from a shared market everyone can see.',
    'Points cards are the goal, but buying them too early slows your engine.',
  ],
  diff: [
    ['What you buy', 'Development cards from 3 face-up rows of 4.', 'Cards from 10 Kingdom piles plus Treasure and Victory piles.'],
    ['How purchases help', 'A permanent gem discount, usable right away.', 'Cards go to your discard pile and turn up in later hands.'],
    ['Paying', 'Gem tokens you collected on earlier turns.', 'Treasure cards in this turn\'s hand of 5; unspent value is lost.'],
    ['Points', 'Cards and nobles give points with no downside.', 'Victory cards do nothing in your hand and clog your deck.'],
    ['Game end', 'Someone reaches 15 points; finish the round.', 'Provinces run out, or any 3 supply piles are empty.'],
  ],
  terms: [['Card bonus (permanent gem)', 'Treasure card'], ['Prestige points', 'Victory cards']],
  toA: 'There is no deck or shuffling: every card you buy gives a permanent discount from then on, and points never get in your way.',
  toB: 'What you buy goes into a deck you reshuffle, so each card helps only when you draw it, and points cards make your hands worse.',
});

defineBridge({
  a: 'splendor', b: 'azul',
  same: [
    'You take coloured pieces from a shared supply each turn.',
    'Taking what someone else needs is a big part of the game.',
    'Quick turns, few rules, about 30–45 minutes.',
  ],
  diff: [
    ['Taking', '3 different gems, or 2 of one colour if 4+ are left.', 'All tiles of one colour from one factory or the centre.'],
    ['Using what you take', 'Spend gems to buy cards that give lasting discounts.', 'Fill pattern lines; full lines move one tile to your wall.'],
    ['Too much', 'You may hold at most 10 tokens.', 'Tiles that do not fit drop to the floor line for minus points.'],
    ['Scoring', 'Points on cards and nobles.', 'Wall tiles score for adjacent tiles; bonuses for rows, columns and colours.'],
    ['Game end', 'Someone reaches 15 points; finish the round.', 'Someone completes a horizontal wall row; finish the round.'],
  ],
  terms: [['Gem tokens', 'Tiles']],
  toA: 'You do not have to take a whole colour and nothing is wasted: gems buy cards whose discounts build up into an engine.',
  toB: 'You must take every tile of the colour you pick and extras become penalties, so leaving bad choices for others matters as much as your own pick.',
});

defineBridge({
  a: 'agricola', b: 'dune-imperium',
  same: [
    'Worker placement: put a worker on an action space, and nobody else can use it this round.',
    'You start with 2 workers and can gain more.',
    'Cards you own give special powers and combos.',
  ],
  diff: [
    ['Placing workers', 'Any free action space.', 'Play a card; its icons decide which spaces your agent may go to.'],
    ['Cards', 'Occupations and improvements, played once and kept.', 'A deck you build and reshuffle; buy new cards with persuasion.'],
    ['Each round\'s pressure', 'Harvests: feed 2 food per person or take begging cards.', 'A conflict: commit troops and swords to win its rewards.'],
    ['Interaction', 'Mostly blocking spaces and taking major improvements first.', 'Blocking, combat, and racing for faction alliances.'],
    ['Winning', 'Most points after 14 rounds; minus points for gaps.', 'First to 10 VP at round end, or most when conflicts run out.'],
  ],
  terms: [['Family members', 'Agents'], ['Occupations and improvements', 'Cards in your deck']],
  toA: 'There is no deck or combat: you can go to any free space, and the pressure is feeding your family at each harvest.',
  toB: 'You cannot go anywhere you like: the card you play decides where your agent can go, and each round ends with a fight.',
});

defineBridge({
  a: 'agricola', b: 'patchwork',
  same: [
    'Same designer, Uwe Rosenberg.',
    'Fill a personal grid; empty spaces cost you points at the end.',
    'Payouts come at fixed points in the game (harvests, button income).',
  ],
  diff: [
    ['Players', '1–4 (more with an expansion).', 'Exactly 2.'],
    ['Your turn', 'Place a family member on a free action space.', 'Buy one of the next 3 patches, or move ahead and take buttons.'],
    ['Turn order', 'Everyone places one worker at a time, in turn.', 'Whoever is behind on the time track goes next, maybe several turns.'],
    ['Pressure', 'Feed 2 food per person at each harvest.', 'Spend buttons and time; no feeding.'],
    ['Empty space penalty', '−1 per unused farmyard space.', '−2 per empty square on your 9×9 quilt.'],
  ],
  terms: [['Harvest', 'Button income'], ['Unused farmyard space', 'Empty quilt square']],
  toA: 'Instead of one puzzle you juggle many: fields, fences, animals and family, with food you must find every harvest.',
  toB: 'It is a pure 2-player space puzzle: the time each patch costs decides who moves next, so a cheap patch can give you several turns in a row.',
});

defineBridge({
  a: 'agricola', b: 'brass-birmingham',
  same: [
    'Heavy, tight euro games where every action counts.',
    'Other players can block what you need, so watch their plans.',
    'Running short (of food, or money) is a constant danger.',
  ],
  diff: [
    ['Your turn', 'Place one worker on a free action space.', 'Two actions, each costing a discarded card.'],
    ['Main resources', 'Food, wood, clay, reed and stone.', 'Money, coal, iron and beer.'],
    ['Map', 'Your own farmyard board.', 'One shared map of towns, links and industries.'],
    ['Running short', 'Take begging cards: −3 points each.', 'Take a £30 loan, dropping your income 3 levels.'],
    ['Structure', '14 rounds, with harvests in between.', 'Canal era, then rail era; links and flipped tiles score at each era end.'],
  ],
  terms: [],
  toA: 'There is no shared map or market: you build your own farm, and the pressure is food at each harvest rather than money.',
  toB: 'You share one map and one market with everyone, so building industries others use for coal, iron or beer is a big part of play.',
});

defineBridge({
  a: 'scythe', b: 'root',
  same: [
    'Different factions on one shared map, each with its own board and powers.',
    'Pieces leave your faction board as you put them on the map, unlocking abilities or points.',
    'You can fight, but fighting is only one way to win.',
  ],
  diff: [
    ['How different factions are', 'Same actions for all; each faction has one power and mech abilities.', 'Each faction plays by entirely different rules.'],
    ['Your turn', 'Pick a section of your mat that differs from last turn.', 'Follow your faction\'s own turn structure.'],
    ['Combat', 'Secret power dial plus combat cards; no dice.', 'Two dice: the attacker deals the higher roll, the defender the lower.'],
    ['Winning', 'Game ends when someone places a 6th star; most coins wins.', 'First to 30 victory points, or win with a dominance card.'],
    ['Map', 'Hex territories with resources, and the Factory in the centre.', 'Clearings with suits that match your cards.'],
  ],
  terms: [['Faction mat', 'Faction board'], ['Territory', 'Clearing']],
  toA: 'Everyone takes the same kinds of actions, so you learn one shared set of rules; combat is a secret power bid instead of dice.',
  toB: 'Each faction has completely different rules, so you must learn what the other factions want just to see the threats coming.',
});

defineBridge({
  a: 'scythe', b: 'twilight-imperium',
  same: [
    'Explore, expand, exploit and exterminate: empire building on a shared map.',
    'Each faction has its own special powers.',
    'Secret objectives give hidden ways to score.',
  ],
  diff: [
    ['Length', '2–3 hours.', '4–8 hours.'],
    ['Your turn', 'One mat section: its top action, then its bottom action.', 'One action: activate a system, use a strategy card, or a component.'],
    ['Combat', 'Secret power dial plus combat cards; no dice.', 'Roll d10s; each unit hits on its combat value or higher.'],
    ['Politics', 'Little negotiation; no rules for trading between players.', 'Trades and deals are central; laws (agendas) are voted on by all.'],
    ['Winning', 'Game ends at someone\'s 6th star; most coins wins.', 'First to 10 victory points, mainly from objectives.'],
  ],
  terms: [['Stars', 'Victory points'], ['Factory', 'Mecatol Rex']],
  toA: 'Combat has no dice and there is little table talk; you win on coins and popularity once someone places their 6th star.',
  toB: 'Expect a much longer game where negotiation, trades and voting on laws matter as much as your fleet.',
});
