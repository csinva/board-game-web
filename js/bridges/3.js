// Bridges for KIN[40] to the end of KIN. Each record explains one game in terms of the other.

defineBridge({
  a: 'spirit-island', b: 'gloomhaven',
  same: [
    'Everyone plays together against enemies run by a deck of cards, so their behaviour is predictable if you read ahead.',
    'Each player has their own hand of unique cards that only their spirit or character can use.',
    'Getting your played cards back costs you something, so planning when to recover is half the game.',
    'Long, heavy turns where the team plans out loud and combos between players matter.',
  ],
  diff: [
    ['Turn order', 'Everyone acts at once: Fast powers, then the Invaders, then Slow powers.', 'Each round you pick 2 cards; their initiative numbers set the order with the monsters.'],
    ['Playing cards', 'Pay Energy to play power cards, up to your card-plays limit for the turn.', 'Play exactly 2 cards: the top half of one and the bottom half of the other.'],
    ['Getting cards back', 'Pick the Reclaim growth option to return all your played cards to hand.', 'Rest to return your discards, but one card is lost for the rest of the scenario.'],
    ['How you win', 'Push Fear high enough, or clear the island of Invaders.', 'Meet the scenario goal, usually killing every monster or reaching a spot.'],
    ['Between games', 'Each game stands alone; pick any spirit and adversary.', 'A campaign: your character keeps XP, gold, items and perks across scenarios.'],
  ],
  terms: [['Spirit', 'Character'], ['Power cards', 'Ability cards'], ['Reclaim', 'Rest'], ['Invaders', 'Monsters']],
  toA: 'Instead of fighting room by room, you are defending a whole island where the Invaders follow a fixed explore, build, ravage cycle, so you plan a turn or two ahead about where they will strike.',
  toB: 'Your hand is also your clock: every rest permanently loses a card, so a scenario is a race against running out of cards, not just against the monsters.',
});

defineBridge({
  a: 'hanabi', b: 'the-crew',
  same: [
    'Everyone wins or loses together, and you may not simply say what cards are in a hand.',
    'Information can only be shared through a strict, formal signal, so everyone learns to read meaning into what teammates do.',
    'A card played (or not played) by a teammate is itself a hint about their hand.',
  ],
  diff: [
    ['What you see', 'Your own hand faces away: you see everyone’s cards except yours.', 'You see only your own hand, as in any card game.'],
    ['Communication', 'Spend a clue token to point out all of one colour or one number in a teammate’s hand.', 'Once per mission, show one of your own cards and mark it as highest, only or lowest.'],
    ['On your turn', 'Give a clue, discard (regaining a clue), or play a card to a firework.', 'Play one card to the trick, following suit if you can.'],
    ['Goal', 'Build each of 5 colours from 1 to 5; score up to 25.', 'Make sure each task card is won by the player who holds that task.'],
    ['Losing', 'Three misplays end the game; otherwise you just score lower.', 'One task card going to the wrong player fails the mission; retry it.'],
  ],
  terms: [['Clue token', 'Communication token']],
  toA: 'There are no tricks and no task cards: you hold your cards backwards, so the whole game is giving and reading clues about what each person is holding.',
  toB: 'It is a trick-taking game: you know your own hand and must follow suit, and the puzzle is steering specific cards into specific players’ tricks.',
});

defineBridge({
  a: 'the-crew', b: 'spades',
  same: [
    'Ordinary trick-taking: lead any card, others must **follow suit** if they can, and the highest card of the suit led wins.',
    'A trump suit beats every other suit, and you may play trump only when you cannot follow.',
    'Whoever wins a trick leads the next one.',
  ],
  diff: [
    ['Deck', '40 cards in 4 colours (1–9) plus 4 rocket cards (1–4).', 'A standard 52-card deck, 13 cards each for 4 players.'],
    ['Trump', 'Rockets are trump; rocket 4 is the highest card in the game.', 'Spades are always trump; the ace of spades is highest.'],
    ['Who you play with', 'Everyone is on one team against the game.', 'Two teams of two, partners sitting opposite.'],
    ['Goal of a hand', 'Get specific task cards into specific players’ tricks.', 'Take at least as many tricks as your team bid, but not too many over.'],
    ['Scoring', 'A mission simply succeeds or fails; move on or retry.', '10 points per trick bid if you make it; minus that if not. Play to 500.'],
  ],
  terms: [['Rockets', 'Spades (trump)']],
  toA: 'Forget counting tricks: what matters is who wins which card, and every other player is your partner, so you often deliberately lose a trick to hand it to the right person.',
  toB: 'You are now competing against the other partnership, and the goal is a trick count you bid in advance: taking too few costs you, and extra tricks (bags) eventually cost you too.',
});

defineBridge({
  a: 'hearts', b: 'spades',
  same: [
    'A standard 52-card deck dealt out to 4 players, 13 cards each.',
    'You must follow the suit led if you can; the highest card of that suit wins the trick, and the winner leads next.',
    'One suit must be “broken” first: you cannot lead hearts (in Hearts) or spades (in Spades) until one has been played on another suit.',
  ],
  diff: [
    ['Goal', 'Avoid taking points: each heart is 1, the queen of spades is 13.', 'Take exactly as many tricks as your team bid.'],
    ['Trump', 'No trump suit at all.', 'Spades are always trump.'],
    ['Teams', 'Every player for themselves.', 'Two partnerships, partners sitting opposite.'],
    ['Before play', 'Pass 3 cards (left, right, across, then no pass, repeating).', 'Each player bids how many tricks they expect to take.'],
    ['Big gamble', 'Shoot the moon: take all hearts and the Q♠ to give everyone else 26.', 'Bid Nil: promise to take zero tricks, for +100 or −100.'],
    ['Game end', 'When someone reaches 100 points; lowest score wins.', 'When a team reaches 500 points; highest score wins.'],
  ],
  terms: [['Hearts broken', 'Spades broken']],
  toA: 'There is no trump and no bidding, and points are bad: you want to lose the tricks that hold hearts or the queen of spades, so high cards become a liability.',
  toB: 'Tricks are now the goal, spades trump everything, and you have a partner: you bid a trick count together and try to hit it without taking too many extra.',
});

defineBridge({
  a: 'spades', b: 'euchre',
  same: [
    'Four players in two partnerships, partners sitting opposite.',
    'You must follow suit if you can; a trump card beats any card of another suit.',
    'Falling short of what your side committed to (a bid in Spades, choosing trump in Euchre) is punished.',
  ],
  diff: [
    ['Deck and hand', 'Full 52-card deck, 13 cards each, 13 tricks.', '24 cards (9 to ace in each suit), 5 cards each, 5 tricks.'],
    ['Trump', 'Spades, every hand.', 'Chosen each hand: players in turn may order up the turned card’s suit, or name one.'],
    ['Top trumps', 'Ace of spades is highest, then king, queen and so on.', 'Jack of trump (right bower), then the other jack of the same colour (left bower).'],
    ['Commitment', 'Every player bids an exact number of tricks.', 'Only the team that picks trump commits: it must take at least 3 of 5.'],
    ['Scoring', '10 per trick bid if made; bags and Nil; play to 500.', '1 point for 3–4 tricks, 2 for all 5, 2 to defenders who stop you. Play to 10.'],
  ],
  terms: [['Being set', 'Being euchred']],
  toA: 'Trump never changes and every player bids an exact trick count, so a hand is a long 13-trick plan about hitting your number rather than grabbing a majority.',
  toB: 'Trump is decided fresh each hand, and the left bower (the other jack of the trump colour) counts as a trump, not as its printed suit, so follow suit with that in mind.',
});

defineBridge({
  a: 'spades', b: 'bridge',
  same: [
    'A 52-card deck, four players in two partnerships, 13 cards each and 13 tricks.',
    'You must follow suit if you can; the highest trump, or else the highest card of the suit led, wins.',
    'Bidding sets a trick target before play, and missing it costs your side points.',
  ],
  diff: [
    ['Bidding', 'Each player states how many tricks they expect; partners add them together.', 'An auction: each bid (1–7 plus a suit or no trump) must outrank the last.'],
    ['Trump', 'Always spades.', 'The suit named in the winning bid, or no trump at all.'],
    ['Who must make it', 'Both teams have a bid to make.', 'Only the side that won the auction; the other side tries to defeat it.'],
    ['Playing the hand', 'Everyone plays their own cards.', 'The declarer’s partner lays cards face up (dummy) and the declarer plays both hands.'],
    ['Scoring', '10 per trick bid; overtricks are bags; play to 500.', 'Trick points, bonuses for games and slams, penalties for going down.'],
  ],
  terms: [['Bid (team total)', 'Contract'], ['Being set', 'Going down']],
  toA: 'Bidding is just a number, not an auction: each player says how many tricks they expect, spades are always trump, and both teams have a target to hit.',
  toB: 'The auction picks the trump suit as well as the trick count, only the winning side must make its contract, and every bid is also a coded message to your partner about your hand.',
});

defineBridge({
  a: 'spades', b: 'tichu',
  same: [
    'Four players in two partnerships, partners sitting opposite.',
    'One player can make a bold personal call worth **100 points** to the team if it comes off, and minus 100 if it fails.',
    'Team scores add up over many hands to a high target.',
  ],
  diff: [
    ['Deck', 'Standard 52 cards.', '52 cards in 4 suits plus 4 specials: Mah Jong, Dog, Phoenix, Dragon.'],
    ['How a trick works', 'Each player plays one card, following suit if able.', 'Lead a combo (single, pair, straight…); others top it with the same type, or pass.'],
    ['Trump', 'Spades beat other suits.', 'No trump; bombs (four of a kind, straight flushes) beat anything.'],
    ['Goal of a hand', 'Take the number of tricks you bid.', 'Empty your hand early and capture point cards: 5s, 10s and kings.'],
    ['Bold call', 'Nil: you will take no tricks (±100).', 'Tichu: you will go out first (±100); Grand Tichu before seeing all cards (±200).'],
    ['Game end', 'First team to 500.', 'First team to 1,000.'],
  ],
  terms: [],
  toA: 'Tricks are one card each and you must follow suit, with spades as trump; the aim is to take exactly the tricks you bid, not to get rid of your cards.',
  toB: 'It is a climbing game, not a follow-suit game: you beat the last play with a higher combo of the same shape, a trick can go around many times, and going out first is what wins.',
});

defineBridge({
  a: 'codenames', b: 'wavelength',
  same: [
    'Two teams; on each turn one player knows a secret and gives a clue, and their teammates debate what it means.',
    'The clue-giver must stay silent and poker-faced while the team argues.',
    'A good clue depends on knowing how your particular friends think.',
  ],
  diff: [
    ['Secret', 'Which of 25 words on the table belong to your team.', 'Where a hidden target sits on a dial between two extremes, like Hot–Cold.'],
    ['Clue', 'One word plus a number: how many of your words it points to.', 'Any word or phrase that sits at that point on the spectrum.'],
    ['Guess', 'Teammates touch words one at a time until wrong or they stop.', 'The team turns the dial to one spot.'],
    ['Risk', 'A word that is not yours ends your turn; the assassin loses the game.', 'The other team can bet left or right of your guess for a bonus point.'],
    ['Winning', 'First team to find all its words.', 'First team to 10 points; nearer the target scores more (2–4).'],
  ],
  terms: [['Spymaster', 'Psychic']],
  toA: 'Your clue has to link several words at once without touching the other team’s words or the assassin, so you trade ambition (a bigger number) against safety.',
  toB: 'There is no list of right answers: you are placing an idea at a precise spot on a scale, and the score depends on how close your team turns the dial.',
});

defineBridge({
  a: 'codenames', b: 'dixit',
  same: [
    'One player gives a clue about something only they know, and others guess from it.',
    'The best clues are neither too obvious nor too obscure.',
    'Once the clue is given, the clue-giver says nothing more.',
  ],
  diff: [
    ['Teams', 'Two teams, each with a spymaster.', 'Every player for themselves; the storyteller role rotates.'],
    ['Cards', '25 words laid out in a grid.', 'Dreamlike picture cards held in hand.'],
    ['Clue', 'One word plus a number.', 'Anything: a word, a phrase, a sound, a song line.'],
    ['Decoys', 'The grid already holds the other team’s words and the assassin.', 'Other players add a card from their hand that also fits, to draw votes.'],
    ['Scoring', 'First team to find all its words wins.', '3 points if some but not all find your card; 0 if all or none do. Race to 30.'],
  ],
  terms: [['Spymaster', 'Storyteller']],
  toA: 'You are now on a team, and too vague a clue does not just score badly, it steers your teammates into the other team’s words or the assassin.',
  toB: 'Being too obvious is punished as hard as being too obscure: if everyone finds your card you score nothing, so aim for a clue only some players will get.',
});

defineBridge({
  a: 'dixit', b: 'wavelength',
  same: [
    'One player knows a secret target and gives a single clue; the others try to land on it.',
    'Clues are free-form and creative, and reading your friends is the real skill.',
    'The clue-giver role rotates around the table.',
  ],
  diff: [
    ['Teams', 'Every player for themselves.', 'Two teams take turns.'],
    ['Target', 'A picture card from your own hand.', 'A hidden point on a dial between two extremes.'],
    ['Clue limits', 'Anything at all.', 'Must place a concept on the card’s spectrum, like Hot–Cold.'],
    ['Too obvious?', 'Bad: if everyone finds your card you score 0.', 'Fine: the closer your team lands, the more points (up to 4).'],
    ['Winning', 'First to 30 points (or most when the deck runs out).', 'First team to 10 points.'],
  ],
  terms: [['Storyteller', 'Psychic']],
  toA: 'You want only some players to find your card, and the others are adding their own cards to confuse everyone, so aim for a clue that is deliberately half-clear.',
  toB: 'You want your team to land exactly on the target, so be as precise as you can; the challenge is that the spectrum, not you, sets the theme of the clue.',
});

defineBridge({
  a: 'risk', b: 'king-of-tokyo',
  same: [
    'Dice decide every fight, and you can be knocked out of the game.',
    'Holding a key position gives you a reward each turn, but makes you the target.',
  ],
  diff: [
    ['Dice', 'Attacker rolls up to 3, defender up to 2; compare highest pairs.', 'Roll 6 special dice, then reroll any of them up to twice.'],
    ['Map', 'A world of 42 territories across 6 continents.', 'One spot: Tokyo. You are either in it or outside it.'],
    ['Attacking', 'Choose a neighbouring territory and battle it out.', 'Claws hit everyone outside Tokyo if you are in it, or the monster in Tokyo if not.'],
    ['Winning', 'Conquer every territory (or complete your mission, in some editions).', 'Reach 20 victory points, or be the last monster standing.'],
    ['Length', 'Often 2 to 4 hours.', 'About 20–30 minutes.'],
  ],
  terms: [['Holding a continent', 'Holding Tokyo']],
  toA: 'You fight over many territories with armies you reinforce each turn, and the only way to win is to keep expanding until you hold the whole map.',
  toB: 'You never pick a target: whether you are in Tokyo decides who your claws hit, and you can also win by points without beating anyone.',
});

defineBridge({
  a: 'risk', b: 'diplomacy',
  same: [
    'Conquer a map split into territories; the more you hold, the more forces you get.',
    'Players are knocked out when they lose all their land.',
    'Alliances are informal and can be broken at any time.',
  ],
  diff: [
    ['Luck', 'Every battle is decided by dice.', 'No dice and no cards: nothing random at all.'],
    ['Turns', 'One player at a time attacks as much as they like.', 'Everyone writes secret orders; all are revealed and resolved at once.'],
    ['Combat', 'Pile up armies and roll; bigger stacks usually win.', 'One unit per space, all strength 1; the side with more support moves in, ties bounce.'],
    ['Growing', 'Reinforce each turn based on territories, continents and card sets.', 'In winter, units equal the supply centers you own.'],
    ['Talking', 'Optional table talk.', 'Negotiating before each turn is the main activity.'],
    ['Winning', 'Take every territory.', 'Own 18 of 34 supply centers; shared draws are common.'],
  ],
  terms: [['Territory', 'Province'], ['Reinforcements', 'Builds']],
  toA: 'Battles are dice rolls you make on your own turn, and you can stack many armies in one territory, so raw numbers and luck carry more weight than persuasion.',
  toB: 'Without dice you cannot win a fight alone against an equal force: every gain comes from another player agreeing to support you, so your words matter as much as your moves.',
});

defineBridge({
  a: 'risk', b: 'twilight-struggle',
  same: [
    'A world map split into regions, where controlling a region is worth much more than a scattered presence.',
    'A die roll decides attacks on territory, so you weigh odds before you strike.',
    'Long-term positioning across several continents at once.',
  ],
  diff: [
    ['Players', '2 to 6, every player for themselves.', 'Exactly 2: the USA and the USSR.'],
    ['On the map', 'Armies that fight and are destroyed.', 'Influence markers; a country is controlled when yours beats its stability plus theirs.'],
    ['Your turn', 'Reinforce, attack, then fortify.', 'Play one card: use its operations points, or trigger its historical event.'],
    ['Fighting', 'Many dice per battle, repeated until one side stops.', 'A coup rolls one die plus ops against twice the country’s stability.'],
    ['Winning', 'Take every territory.', 'Reach +20 VP, control Europe, or lead after turn 10; trigger nuclear war and you lose.'],
  ],
  terms: [['Armies', 'Influence'], ['Continent bonus', 'Region scoring card']],
  toA: 'Everything happens through armies you place and battle with, there are no event cards to manage, and you win only by wiping everyone else off the map.',
  toB: 'Your hand drives everything, and cards carrying your opponent’s events still trigger them when you play them for points, so much of the game is choosing which harm to take.',
});

defineBridge({
  a: 'root', b: 'dune',
  same: [
    'Each faction has its own rules, its own way to grow, and powers that break the base rules.',
    'Factions fight over spaces on a shared map, and the table has to gang up on whoever is about to win.',
    'Learning what the other factions can do is as important as learning your own.',
  ],
  diff: [
    ['Players', '2 to 4 in the base game (more with expansions).', 'Up to 6, and best with all 6 factions.'],
    ['Combat', 'Roll two 12-sided dice; attacker deals the higher, defender the lower.', 'Secret battle wheel: dial forces, add a leader and cards; no dice.'],
    ['Winning', 'First to 30 victory points, scored differently by each faction.', 'Hold 3 of 5 strongholds at the end of a turn (4 with an ally).'],
    ['Economy', 'Each faction runs its own engine from cards and buildings.', 'Everyone needs spice, and much of what you pay goes to another faction.'],
    ['Alliances', 'Informal; everyone wins alone.', 'Formal alliances that share abilities and win together.'],
  ],
  terms: [['Clearing', 'Territory']],
  toA: 'Everyone races to 30 points along their own scoring path, and fights are settled by dice rather than hidden plans, so expect fewer bluffs and more steady engine building.',
  toB: 'There are no points: you win by holding strongholds at the end of a turn, and battles are secret bids of troops and leaders where a hidden traitor can wipe you out.',
});

defineBridge({
  a: 'dune', b: 'cosmic-encounter',
  same: [
    'Same designers: every faction has a power that breaks one of the rules.',
    'Several players can win together through an alliance.',
    'Battles are settled by committing forces and revealing a hidden card choice, not by dice.',
    'Forces lost in battle go to a holding area and must be recovered.',
  ],
  diff: [
    ['Turn', 'All players go through each phase together.', 'One player is the offense; a destiny card picks who they attack.'],
    ['Alliances', 'Formal pacts that last, and allies win together at 4 strongholds.', 'Invited fresh for each encounter; allies who join a winning attack get colonies.'],
    ['Combat', 'Dial forces and add a leader; weapon and defense cards; traitors.', 'Ships plus an attack card number; higher total wins, defender wins ties.'],
    ['Winning', 'Hold 3 of 5 strongholds at the end of a turn.', 'Have colonies on 5 planets outside your home system.'],
    ['Economy', 'Spice buys cards, ships forces and revives the dead.', 'No currency; your hand of encounter cards is your resource.'],
  ],
  terms: [['Faction', 'Alien'], ['Forces', 'Ships'], ['Tleilaxu Tanks', 'Warp']],
  toA: 'Expect a long war where alliances are locked in and spice drives everything; fights are a one-shot secret battle plan in which a leader can be killed or turn traitor.',
  toB: 'Turns are quick encounters between two players that anyone can join as an ally, and shared wins are normal, so you invite help while watching who it brings close to 5 colonies.',
});

defineBridge({
  a: 'dune', b: 'dune-imperium',
  same: [
    'Set on Arrakis, where spice is the currency everyone wants.',
    'The Emperor, Spacing Guild, Bene Gesserit and Fremen all matter, and alliances with them are key.',
    'Fights over territory are won by committing more troops than rivals.',
  ],
  diff: [
    ['Core play', 'Move forces, bid for cards and battle on a map of Arrakis.', 'Deck-building plus worker placement: play a card to send an agent to a space.'],
    ['Factions', 'Each player is a faction with its own rule-breaking powers.', 'Same rules for all; leaders have small abilities and factions are tracks to climb.'],
    ['Combat', 'Secret battle wheel per territory: forces, leader, cards, traitors.', 'One conflict each round; most troop strength takes 1st prize, then 2nd, 3rd.'],
    ['Alliances', 'Players form alliances and can win together.', 'Reach 4 influence with a faction first to take its alliance.'],
    ['Winning', 'Hold 3 strongholds at the end of a turn.', 'First to 10 victory points (or most when the game ends).'],
  ],
  terms: [['Treachery cards', 'Intrigue cards'], ['Forces', 'Troops']],
  toA: 'It is not a euro: there are no victory points, every faction plays by different rules, and you win by holding strongholds through deals, bluffs and betrayals.',
  toB: 'Think of it as an efficient euro: everyone plays by the same rules, and you race to 10 points by building your deck, placing agents and winning each round’s conflict.',
});

defineBridge({
  a: 'cosmic-encounter', b: 'diplomacy',
  same: [
    'You win through alliances you negotiate at the table.',
    'Promises are not binding: you can say one thing and do another.',
    'Supporting someone else’s attack is how alliances actually show up in play.',
  ],
  diff: [
    ['Luck', 'A destiny deck picks your target and your hand of cards varies.', 'No luck at all.'],
    ['Turn', 'One encounter at a time between offense and defense.', 'Everyone writes orders secretly; they resolve together.'],
    ['Deals', 'Any time, plus 1 minute to strike a deal when both sides play Negotiate.', 'A set talking phase before every turn.'],
    ['Powers', 'Every player has a unique alien power.', 'Same rules for all seven powers; only position differs.'],
    ['Winning', 'Colonies on 5 foreign planets; shared wins are normal.', 'Own 18 of 34 supply centers alone; otherwise agree a shared draw.'],
    ['Length', 'About 1 to 2 hours.', 'Often 4 hours or more.'],
  ],
  terms: [['Allying ships into an encounter', 'Support order']],
  toA: 'Alliances are short-term and rebuilt every encounter, and several players can win together, so deals are frequent, casual and rarely final.',
  toB: 'With no luck and no special powers, your position on the map and the trust you build over many turns decide everything, and only one player normally wins outright.',
});

defineBridge({
  a: 'cosmic-encounter', b: 'twilight-imperium',
  same: [
    'Space empires where every faction has abilities that break the normal rules.',
    'Deals are made openly at the table and are often broken.',
    'Who you help and when is as important as your own position.',
  ],
  diff: [
    ['Length', 'About 1 to 2 hours.', 'Often 6 to 10 hours.'],
    ['Winning', 'Colonies on 5 planets outside your home system.', 'First to 10 victory points from public and secret objectives.'],
    ['Combat', 'Ships plus a hidden attack card; higher total wins.', 'Each unit rolls dice to hit; fight in rounds until one side is gone or retreats.'],
    ['Economy', 'None: your cards are your resources.', 'Planets give resources and influence; buy units, technology and votes.'],
    ['Politics', 'Allies are invited into each fight.', 'Choose a strategy card each round; vote on laws in the agenda phase.'],
  ],
  terms: [['Alien', 'Faction'], ['Ships', 'Units']],
  toA: 'There is no economy or tech tree: each turn is one quick encounter decided by ships plus a card, and the 5-colony race can end in a shared win.',
  toB: 'Combat is dice per unit and the real engine is your economy: planets give resources and influence, and points come from objectives, not from conquering planets alone.',
});

defineBridge({
  a: 'diplomacy', b: 'twilight-struggle',
  same: [
    'Geopolitics on a historical map, where adjacency and borders shape every plan.',
    'Long-term positioning matters more than any single turn.',
    'Key spaces (supply centers, battleground countries) are what really count.',
  ],
  diff: [
    ['Players', 'Seven European powers.', 'Exactly two: the USA and the USSR.'],
    ['Luck', 'None.', 'Card draws, and a die roll on coups and war events.'],
    ['Turn', 'Secret orders for all units, revealed together.', 'Players alternate, playing one card for its operations points or its event.'],
    ['What you move', 'Armies and fleets, one per space.', 'Influence points placed in countries; no units on the map.'],
    ['Talking', 'Negotiation is the core of the game.', 'None: your opponent is always your enemy.'],
    ['Winning', 'Own 18 of 34 supply centers.', 'Reach +20 VP, control Europe, or lead after turn 10.'],
  ],
  terms: [['Supply center', 'Battleground country']],
  toA: 'There are no cards or dice to manage, but there are six other players, and you need their support to move forward, so persuasion is your main tool.',
  toB: 'You have one opponent and no one to negotiate with; the challenge is your hand, where many cards help your rival, and you must decide when to play them for points instead.',
});
