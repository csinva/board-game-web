// Bridges for KIN[40] to the end of KIN. Each record explains one game in terms of the other.

defineBridge({
  a: 'spirit-island', b: 'gloomhaven',
  same: [
    'Co-op against enemies whose actions come from a card deck.',
    'Each player has a hand of unique cards only their spirit or character can use.',
    'Getting played cards back costs you, so timing recovery matters.',
  ],
  diff: [
    ['Turn order', 'Everyone acts at once: Fast powers, then the Invaders, then Slow powers.', 'Each round you pick 2 cards; their initiative sets your order among the monsters.'],
    ['Playing cards', 'Pay Energy for power cards, up to your card-play limit.', 'Play exactly 2: the top half of one and the bottom half of the other.'],
    ['Recovering cards', 'Reclaim (a growth option) returns all played cards to hand.', 'Rest to return your discards, but lose one card for the scenario.'],
    ['How you win', 'Raise Fear high enough, or clear the island of Invaders.', 'Meet the scenario goal, usually killing every monster.'],
    ['Between games', 'Each game stands alone; pick any spirit and adversary.', 'A campaign: your character keeps XP, gold, items and perks.'],
  ],
  terms: [['Spirit', 'Character'], ['Power cards', 'Ability cards'], ['Reclaim', 'Rest'], ['Invaders', 'Monsters']],
  toA: 'You defend a whole island; Invaders follow a fixed explore, build, ravage cycle, so you see their next strikes coming.',
  toB: 'Your hand is your clock: each rest loses a card for the rest of the scenario, so the scenario is a race against running out.',
});

defineBridge({
  a: 'hanabi', b: 'the-crew',
  same: [
    'Co-op; you may not freely say what cards are in a hand.',
    'Information passes only through a strict, formal signal.',
    'What a teammate plays, or doesn’t, hints at their hand.',
  ],
  diff: [
    ['What you see', 'Your hand faces away: you see every hand but yours.', 'Only your own hand.'],
    ['Communication', 'Spend a clue token to point out all of one colour or one number in a teammate’s hand.', 'Once per mission, show one of your cards and mark it as highest, only or lowest of its colour.'],
    ['Your turn', 'Give a clue, discard (regaining a clue), or play a card to a firework.', 'Play one card to the trick, following suit if you can.'],
    ['Goal', 'Build each of 5 colours from 1 to 5; score up to 25.', 'Each task card must be won by the player who holds that task.'],
    ['Losing', 'A 3rd misplay loses at once, with no score; otherwise you score your piles.', 'One task card going to the wrong player fails the mission; retry it.'],
  ],
  terms: [['Clue token', 'Communication token']],
  toA: 'No tricks or tasks: you hold your cards backwards, so the game is giving and reading clues.',
  toB: 'It is trick-taking: you see your own hand, must follow suit, and steer specific cards into specific players’ tricks.',
});

defineBridge({
  a: 'the-crew', b: 'spades',
  same: [
    'Trick-taking: lead any card; others must **follow suit** if they can; the highest card of the suit led wins.',
    'Trump beats every other suit; you may play trump only when you cannot follow.',
    'The trick winner leads next.',
  ],
  diff: [
    ['Deck', '40 cards in 4 colours (1–9) plus 4 rockets (1–4).', 'Standard 52 cards, 13 each for 4 players.'],
    ['Trump', 'Rockets; rocket 4 is the highest card.', 'Spades; the ace of spades is highest.'],
    ['Teams', 'Everyone against the game.', 'Two partnerships, partners opposite.'],
    ['Goal of a hand', 'Get specific task cards into specific players’ tricks.', 'Take at least your team’s bid, without too many extra.'],
    ['Scoring', 'A mission succeeds or fails; move on or retry.', '10 points per trick bid if made; minus that if not. Play to 500.'],
  ],
  terms: [['Rockets', 'Spades (trump)']],
  toA: 'Forget trick counts: what matters is who wins which card, and everyone is your partner, so you often lose a trick on purpose.',
  toB: 'Two partnerships compete, and you must hit a trick count bid in advance; too few costs you, and extra tricks (bags) eventually do too.',
});

defineBridge({
  a: 'hearts', b: 'spades',
  same: [
    'Standard 52-card deck; with 4 players, 13 cards each.',
    'Follow suit if you can; the highest card of that suit wins, and the winner leads next.',
    'One suit must be “broken” before it can be led: hearts in Hearts, spades in Spades.',
  ],
  diff: [
    ['Goal', 'Avoid points: each heart is 1, the queen of spades 13.', 'Take at least as many tricks as your team bid.'],
    ['Trump', 'None.', 'Spades, always.'],
    ['Teams', 'Every player for themselves.', 'Two partnerships, partners opposite.'],
    ['Before play', 'Pass 3 cards (left, right, across, then no pass, repeating).', 'Each player bids how many tricks they expect to take.'],
    ['Big gamble', 'Shoot the moon: take all hearts and the Q♠ to give everyone else 26.', 'Bid Nil: promise zero tricks, for +100 or −100.'],
    ['Game end', 'Someone reaches 100; lowest score wins.', 'A team reaches 500; highest score wins.'],
  ],
  terms: [['Hearts broken', 'Spades broken']],
  toA: 'No trump, no bidding, and points are bad: avoid tricks holding hearts or the Q♠, so high cards are a liability.',
  toB: 'Tricks are the goal, spades are trump, and you have a partner: bid a trick count together and hit it without many extra.',
});

defineBridge({
  a: 'spades', b: 'euchre',
  same: [
    'Four players in two partnerships, partners opposite.',
    'Follow suit if you can; trump beats any other suit.',
    'Failing what your side committed to (a bid, or choosing trump) is punished.',
  ],
  diff: [
    ['Deck and hand', '52 cards, 13 each, 13 tricks.', '24 cards (9 to ace), 5 each, 5 tricks.'],
    ['Trump', 'Spades, every hand.', 'Chosen each hand: players may order up the turned card’s suit, or later name one.'],
    ['Top trumps', 'Ace of spades, then king, queen and so on.', 'Jack of trump (right bower), then the other jack of the same colour (left bower).'],
    ['Commitment', 'Every player bids an exact number of tricks.', 'Only the team that picks trump commits: it must take 3 of 5.'],
    ['Scoring', '10 per trick bid if made; bags and Nil; play to 500.', '1 point for 3–4 tricks, 2 for all 5; 2 to defenders who stop you. Play to 10.'],
  ],
  terms: [['Being set', 'Being euchred']],
  toA: 'Trump never changes and every player bids an exact trick count, so a hand is a 13-trick plan to hit your number.',
  toB: 'Trump is chosen each hand, and the left bower (the other jack of trump’s colour) counts as trump, not its printed suit.',
});

defineBridge({
  a: 'spades', b: 'bridge',
  same: [
    '52 cards; four players in two partnerships; 13 cards and 13 tricks.',
    'Follow suit if you can; the highest trump, else the highest card of the suit led, wins.',
    'A bid sets a trick target before play; missing it costs your side.',
  ],
  diff: [
    ['Bidding', 'Each player states how many tricks they expect; partners add them.', 'An auction: each bid (1–7 plus a suit or no trump) must outrank the last.'],
    ['Trump', 'Always spades.', 'The suit in the winning bid, or none.'],
    ['Who must make it', 'Both teams.', 'Only the side that won the auction; the other side defends.'],
    ['Playing the hand', 'Everyone plays their own cards.', 'Declarer’s partner lays cards face up (dummy); declarer plays both hands.'],
    ['Scoring', '10 per trick bid; overtricks are bags; play to 500.', 'Trick points, bonuses for games and slams, penalties for going down.'],
  ],
  terms: [['Bid (team total)', 'Contract'], ['Being set', 'Going down']],
  toA: 'Bidding is a number, not an auction: each player says how many tricks they expect, spades are always trump, and both teams have a target.',
  toB: 'The auction picks trump as well as the trick count, only the winning side must make its contract, and each bid also tells your partner about your hand.',
});

defineBridge({
  a: 'spades', b: 'tichu',
  same: [
    'Four players in two partnerships, partners opposite.',
    'One player can make a solo call worth **100 points** to the team if it succeeds, minus 100 if not.',
    'Team scores build over many hands to a high target.',
  ],
  diff: [
    ['Deck', 'Standard 52 cards.', '52 cards plus 4 specials: Mah Jong, Dog, Phoenix, Dragon.'],
    ['Tricks', 'One card each, following suit if able.', 'Lead a combo (single, pair, straight…); others beat it with the same type, or pass.'],
    ['Trump', 'Spades beat other suits.', 'None; bombs (four of a kind, straight flushes) beat anything.'],
    ['Goal of a hand', 'Take the number of tricks you bid.', 'Empty your hand early and capture point cards: 5s, 10s and kings.'],
    ['Solo call', 'Nil: take no tricks (±100).', 'Tichu: go out first (±100); Grand Tichu, called before seeing all your cards (±200).'],
    ['Game end', 'First team to 500.', 'First team to 1,000.'],
  ],
  terms: [],
  toA: 'Tricks are one card each, you must follow suit, spades are trump, and the aim is your bid, not emptying your hand.',
  toB: 'It’s a climbing game: beat the last play with a higher combo of the same shape; a trick can go round many times, and you race to go out first.',
});

defineBridge({
  a: 'codenames', b: 'wavelength',
  same: [
    'Two teams; each turn one player knows a secret and gives a clue, and teammates debate it.',
    'The clue-giver stays silent while the team argues.',
    'Good clues depend on how your friends think.',
  ],
  diff: [
    ['Secret', 'Which of 25 words on the table are your team’s.', 'Where a hidden target sits on a dial between two extremes, like Hot–Cold.'],
    ['Clue', 'One word plus a number: how many of your words it points to.', 'Any word or phrase that sits at that point on the spectrum.'],
    ['Guess', 'Teammates touch words one at a time until wrong or they stop.', 'The team turns the dial to one spot.'],
    ['Risk', 'A word that isn’t yours ends your turn; the assassin loses the game.', 'The other team bets left or right of your guess for a bonus point.'],
    ['Winning', 'First team to find all its words.', 'First team to 10 points; closer to the target scores more (2–4).'],
  ],
  terms: [['Spymaster', 'Psychic']],
  toA: 'One clue must link several words without touching the other team’s words or the assassin, so you trade a bigger number against safety.',
  toB: 'No list of right answers: you place an idea at a precise spot on a scale, and points depend on how close your team turns the dial.',
});

defineBridge({
  a: 'codenames', b: 'dixit',
  same: [
    'One player clues something only they know; others guess from it.',
    'The best clues are neither too obvious nor too obscure.',
    'After the clue, the clue-giver says nothing.',
  ],
  diff: [
    ['Teams', 'Two teams, each with a spymaster.', 'Every player for themselves; the storyteller rotates.'],
    ['Cards', '25 words in a grid.', 'Picture cards held in hand.'],
    ['Clue', 'One word plus a number.', 'Anything: a word, a phrase, a sound, a song line.'],
    ['Decoys', 'The grid holds the other team’s words and the assassin.', 'Other players add a card from hand that also fits, to draw votes.'],
    ['Scoring', 'First team to find all its words wins.', '3 points if some but not all find your card; 0 if all or none do. Race to 30.'],
  ],
  terms: [['Spymaster', 'Storyteller']],
  toA: 'You play on a team, and a vague clue doesn’t just score badly: it steers teammates into the other team’s words or the assassin.',
  toB: 'Too obvious is punished like too obscure: if everyone finds your card you score 0, so aim for a clue only some will get.',
});

defineBridge({
  a: 'dixit', b: 'wavelength',
  same: [
    'One player knows a secret target and gives one clue; the others try to find it.',
    'Clues are free-form; reading your friends is the skill.',
    'The clue-giver role rotates.',
  ],
  diff: [
    ['Teams', 'Every player for themselves.', 'Two teams take turns.'],
    ['Target', 'A picture card from your hand.', 'A hidden point on a dial between two extremes.'],
    ['Clue limits', 'Anything at all.', 'Must place a concept on the card’s spectrum, like Hot–Cold.'],
    ['Too obvious?', 'Bad: if everyone finds your card you score 0.', 'Fine: the closer your team lands, the more points (up to 4).'],
    ['Winning', 'After a round ends with anyone on 30+, most points wins.', 'First team to 10 points.'],
  ],
  terms: [['Storyteller', 'Psychic']],
  toA: 'You want only some players to find your card, and others add decoy cards, so make the clue deliberately half-clear.',
  toB: 'You want your team to land exactly on the target, so be precise; the spectrum, not you, sets the clue’s topic.',
});

defineBridge({
  a: 'risk', b: 'king-of-tokyo',
  same: [
    'Dice decide every fight, and you can be knocked out.',
    'Holding a key position pays each turn but makes you the target.',
  ],
  diff: [
    ['Dice', 'Attacker rolls up to 3, defender up to 2; compare highest pairs.', 'Roll 6 special dice, then reroll any of them up to twice.'],
    ['Map', '42 territories across 6 continents.', 'One spot, Tokyo: you are in it or outside it.'],
    ['Attacking', 'Choose a neighbouring territory and battle.', 'Claws hit everyone outside Tokyo if you are in it, or the monster in Tokyo if not.'],
    ['Winning', 'Conquer every territory (or complete a secret mission, in some editions).', 'Reach 20 victory points, or be the last monster standing.'],
    ['Length', 'Often 2–4 hours.', '20–30 minutes.'],
  ],
  terms: [['Holding a continent', 'Holding Tokyo']],
  toA: 'You fight over many territories with armies reinforced each turn, and win only by taking the whole map.',
  toB: 'You never pick a target: being in or out of Tokyo decides who your claws hit, and you can win on points without beating anyone.',
});

defineBridge({
  a: 'risk', b: 'diplomacy',
  same: [
    'Conquer a map of territories; more land means more forces.',
    'Players are knocked out when they lose all their land.',
    'Alliances are informal and can be broken any time.',
  ],
  diff: [
    ['Luck', 'Dice decide every battle.', 'None: no dice, no cards.'],
    ['Turns', 'One player at a time attacks as much as they like.', 'Everyone writes secret orders; all resolve at once.'],
    ['Combat', 'Pile up armies and roll; bigger stacks usually win.', 'One unit per space, all strength 1; more support wins, ties bounce.'],
    ['Growing', 'Reinforce each turn from territories, continents and card sets.', 'Each winter, units equal your supply centers.'],
    ['Talking', 'Optional.', 'Negotiating before each turn is the main activity.'],
    ['Winning', 'Take every territory.', 'Own 18 of 34 supply centers; shared draws are common.'],
  ],
  terms: [['Territory', 'Province'], ['Reinforcements', 'Builds']],
  toA: 'Battles are dice rolls on your own turn and armies stack, so numbers and luck matter more than persuasion.',
  toB: 'Without dice, you can’t beat an equal force alone: every gain needs another player’s support, so words matter as much as moves.',
});

defineBridge({
  a: 'risk', b: 'twilight-struggle',
  same: [
    'A world map split into regions; controlling a region is worth far more than a scattered presence.',
    'A die roll decides attacks, so weigh the odds first.',
    'Plan across several continents at once.',
  ],
  diff: [
    ['Players', '2–5, each for themselves.', 'Exactly 2: the USA and the USSR.'],
    ['On the map', 'Armies that fight and are destroyed.', 'Influence markers; you control a country when your influence is at least theirs plus its stability.'],
    ['Your turn', 'Reinforce, attack, then fortify.', 'Play one card: for its operations points, or its event.'],
    ['Fighting', 'Many dice per battle, repeated until one side stops.', 'A coup: one die plus ops against twice the country’s stability.'],
    ['Winning', 'Take every territory.', 'Reach +20 VP, control Europe, or lead after turn 10; cause nuclear war and you lose.'],
  ],
  terms: [['Armies', 'Influence'], ['Continent bonus', 'Region scoring card']],
  toA: 'Everything runs through armies you place and fight with, there are no event cards, and you win only by taking the whole map.',
  toB: 'Your hand drives everything; cards with your opponent’s events still trigger them when you play them for ops, so you choose which harm to take.',
});

defineBridge({
  a: 'root', b: 'dune',
  same: [
    'Each faction has its own rules, growth and powers that break the base rules.',
    'Factions fight over spaces on a shared map, and the table must gang up on the leader.',
    'Learning other factions’ powers matters as much as learning your own.',
  ],
  diff: [
    ['Players', '2–4 in the base game (more with expansions).', 'Up to 6; best with all 6 factions.'],
    ['Combat', 'Roll two 12-sided dice; attacker deals the higher, defender the lower.', 'Secret battle wheel: dial forces, add a leader and cards; no dice.'],
    ['Winning', 'First to 30 victory points, scored differently by each faction.', 'Hold 3 of 5 strongholds at the end of a turn (4 with an ally).'],
    ['Economy', 'Each faction runs its own engine from cards and buildings.', 'Everyone needs spice, and much of what you pay goes to another faction.'],
    ['Alliances', 'Informal; everyone wins alone.', 'Formal alliances that share abilities and win together.'],
  ],
  terms: [['Clearing', 'Territory']],
  toA: 'Everyone races to 30 points by their own path, and dice settle fights, so expect fewer bluffs and more steady engine building.',
  toB: 'No points: hold strongholds at the end of a turn; battles are secret bids of troops and leaders, and a hidden traitor can wipe you out.',
});

defineBridge({
  a: 'dune', b: 'cosmic-encounter',
  same: [
    'Every faction has a power that breaks a rule.',
    'Several players can win together as allies.',
    'Battles: commit forces and reveal a hidden card choice; no dice.',
    'Forces lost in battle go to a holding area and must be recovered.',
  ],
  diff: [
    ['Turn', 'All players go through each phase together.', 'One player is the offense; a destiny card picks whom they attack.'],
    ['Alliances', 'Formal, lasting pacts; allies win together at 4 strongholds.', 'Invited each encounter; allies on a winning attack gain colonies.'],
    ['Combat', 'Dial forces, add a leader, weapon and defense cards; traitors.', 'Ships plus an attack card number; higher total wins, defender wins ties.'],
    ['Winning', 'Hold 3 of 5 strongholds at the end of a turn.', 'Have colonies on 5 planets outside your home system.'],
    ['Economy', 'Spice buys cards, ships forces and revives the dead.', 'No currency; your hand of encounter cards is your resource.'],
  ],
  terms: [['Faction', 'Alien'], ['Forces', 'Ships'], ['Tleilaxu Tanks', 'Warp']],
  toA: 'A long war: alliances are locked in, spice drives everything, and battles are one-shot secret plans where a leader can be killed or turn traitor.',
  toB: 'Turns are quick two-player encounters anyone can join as an ally, and shared wins are normal, so watch whom your help brings close to 5 colonies.',
});

defineBridge({
  a: 'dune', b: 'dune-imperium',
  same: [
    'Spice is the main currency.',
    'The Emperor, Spacing Guild, Bene Gesserit and Fremen all matter; allying with them is key.',
    'Fights go to whoever commits more strength.',
  ],
  diff: [
    ['Core play', 'Move forces, bid for cards and battle on a map.', 'Deck building plus worker placement: play a card to send an agent to a space.'],
    ['Factions', 'Each player is a faction with rule-breaking powers.', 'Same rules for all; leaders have small abilities, and factions are tracks to climb.'],
    ['Combat', 'Secret battle wheel per territory: forces, leader, cards, traitors.', 'One conflict per round; most strength takes 1st prize, then 2nd (and 3rd with 4 players).'],
    ['Alliances', 'Players ally and can win together.', 'First to 4 influence with a faction takes its alliance.'],
    ['Winning', 'Hold 3 strongholds at the end of a turn.', 'Most VP after a round ends with someone on 10+ (or after the 10th conflict).'],
  ],
  terms: [['Treachery cards', 'Intrigue cards'], ['Forces', 'Troops']],
  toA: 'Not a euro: no victory points, every faction has its own rules, and you win by holding strongholds through deals, bluffs and betrayals.',
  toB: 'An efficient euro: same rules for all, and you race toward 10 points by building your deck, placing agents and winning each round’s conflict.',
});

defineBridge({
  a: 'cosmic-encounter', b: 'diplomacy',
  same: [
    'You win through alliances negotiated at the table.',
    'Promises are not binding.',
    'Alliances show in play as support committed to someone else’s attack.',
  ],
  diff: [
    ['Luck', 'A destiny deck picks your target; your hand of cards varies.', 'None.'],
    ['Turn', 'One encounter at a time between offense and defense.', 'Everyone writes orders secretly; they resolve together.'],
    ['Deals', 'Any time, plus 1 minute to strike a deal when both sides play Negotiate.', 'A set talking phase before every turn.'],
    ['Powers', 'Every player has a unique alien power.', 'Same rules for all 7 powers; only position differs.'],
    ['Winning', 'Colonies on 5 foreign planets; shared wins are normal.', 'Own 18 of 34 supply centers alone; otherwise agree a shared draw.'],
    ['Length', '1–2 hours.', '4–7 hours.'],
  ],
  terms: [['Allying ships into an encounter', 'Support order']],
  toA: 'Alliances last one encounter and several players can win together, so deals are frequent, casual and rarely final.',
  toB: 'No luck and no special powers: map position and trust built over many turns decide everything, and usually one player wins outright.',
});

defineBridge({
  a: 'cosmic-encounter', b: 'twilight-imperium',
  same: [
    'Every faction has abilities that break the normal rules.',
    'Deals are made openly and often broken.',
    'Whom you help, and when, matters as much as your own position.',
  ],
  diff: [
    ['Length', '1–2 hours.', '4–8 hours.'],
    ['Winning', 'Colonies on 5 planets outside your home system.', 'First to 10 victory points from public and secret objectives.'],
    ['Combat', 'Ships plus a hidden attack card; higher total wins.', 'Each unit rolls to hit; fight in rounds until one side is gone or retreats.'],
    ['Economy', 'None: your cards are your resources.', 'Planets give resources and influence; spend them on units, technology and votes.'],
    ['Politics', 'Allies are invited into each fight.', 'Pick a strategy card each round; vote on laws in the agenda phase.'],
  ],
  terms: [['Alien', 'Faction'], ['Ships', 'Units']],
  toA: 'No economy or tech tree: each turn is one quick encounter decided by ships plus a card, and the 5-colony race can end in a shared win.',
  toB: 'Combat is dice per unit, and planets fund everything with resources and influence; points come from objectives, not conquest alone.',
});

defineBridge({
  a: 'diplomacy', b: 'twilight-struggle',
  same: [
    'Historical map; adjacency and borders shape every plan.',
    'Long-term positioning matters more than any single turn.',
    'Key spaces (supply centers, battleground countries) are what count.',
  ],
  diff: [
    ['Players', '2–7; with 7, one European power each.', 'Exactly 2: the USA and the USSR.'],
    ['Luck', 'None.', 'Card draws, plus dice for coups, realignments, war events and the Space Race.'],
    ['Turn', 'Secret orders for all units, revealed together.', 'Players alternate, playing one card for its operations points or its event.'],
    ['What you move', 'Armies and fleets, one per space.', 'Influence placed in countries; no units.'],
    ['Talking', 'Negotiation is the core of the game.', 'None: your opponent is always your enemy.'],
    ['Winning', 'Own 18 of 34 supply centers.', 'Reach +20 VP, control Europe, or lead after turn 10.'],
  ],
  terms: [['Supply center', 'Battleground country']],
  toA: 'No cards or dice, but up to 6 other players: you need their support to advance, so persuasion is your main tool.',
  toB: 'One opponent and no one to negotiate with; many of your cards help your rival, so you choose when to play them for ops.',
});
