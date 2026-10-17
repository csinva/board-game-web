// Bridges for KIN[40] to the end of KIN. Each record explains one game in terms of the other.

defineBridge({
  a: 'spirit-island', b: 'gloomhaven',
  same: [
    'Everyone plays together against enemies whose actions come from a card deck.',
    'Each player has a hand of unique cards that only their spirit or character can use.',
    'Getting played cards back costs you, so timing when you recover them matters.',
  ],
  diff: [
    ['Turn order', 'All players act together each round: Fast powers resolve, then the Invaders act, then Slow powers resolve.', 'Each round, every player picks 2 cards; the initiative number on your leading card sets when you act among the other players and the monsters.'],
    ['Playing cards', 'Pay each card’s Energy cost; play up to your card-play limit each round.', 'Play exactly 2 cards: the top half of one and the bottom half of the other.'],
    ['Recovering cards', 'Choosing Reclaim as your growth option returns all your played cards to your hand.', 'Resting returns your discarded cards to your hand, but you lose 1 card for the rest of the scenario.'],
    ['How you win', 'Raise Fear high enough, or clear the island of Invaders.', 'Meet the scenario’s goal, usually killing every monster.'],
    ['Between games', 'Each game stands alone; pick any spirit and adversary.', 'A campaign: between scenarios, your character keeps XP, gold, items and perks.'],
  ],
  terms: [['Spirit', 'Character'], ['Power cards', 'Ability cards'], ['Reclaim', 'Rest'], ['Invaders', 'Monsters']],
  toA: 'You defend a whole island, and the Invaders follow a fixed cycle (explore, then build, then ravage), so you can see where they will strike next.',
  toB: 'Your hand is your clock: each rest loses 1 card for the rest of the scenario, so you race to finish before you run out of cards.',
});

defineBridge({
  a: 'hanabi', b: 'the-crew',
  same: [
    'Everyone plays together, and you may not tell teammates which cards are in a hand.',
    'Information passes only through a strict, formal signal.',
    'What a teammate plays, or doesn’t play, hints at their hand.',
  ],
  diff: [
    ['What you see', 'You hold your hand facing away: you see every hand except your own.', 'Only your own hand.'],
    ['Communication', 'On your turn, spend 1 clue token to point out every card of one colour, or every card of one number, in one teammate’s hand.', 'Once per mission, each player may place 1 card face up and use their communication token to show it is their highest, only or lowest card of that colour.'],
    ['Your turn', 'Do 1 thing: give a clue, discard a card (regaining 1 clue token), or play a card onto a firework.', 'Play 1 card to the trick, following suit if you can.'],
    ['Goal', 'Together, build each of 5 colours in order from 1 to 5; score 1 point per card played, up to 25.', 'Each task card must be won in a trick by the player who took that task.'],
    ['Losing', 'A 3rd misplay ends the game at once with no score; otherwise you score the cards in your fireworks.', 'If any task card is won by the wrong player, the mission fails at once; play it again.'],
  ],
  terms: [['Clue token', 'Communication token']],
  toA: 'No tricks or tasks: you hold your cards facing away, so the game is giving and reading clues.',
  toB: 'It is trick-taking: you see your own hand, must follow suit, and steer specific cards into specific players’ tricks.',
});

defineBridge({
  a: 'the-crew', b: 'spades',
  same: [
    'Trick-taking: the leader plays any card; each other player in turn must **follow suit** if they can; the highest card of the suit led wins unless a trump is played.',
    'A trump beats every card of the other suits; you may play a trump on another suit’s lead only when you can’t follow suit.',
    'The winner of a trick leads the next one.',
  ],
  diff: [
    ['Deck', '40 cards: 4 colours numbered 1–9, plus 4 rockets numbered 1–4.', 'Standard 52 cards; each of the 4 players gets 13.'],
    ['Trump', 'Rockets; rocket 4 is the highest card.', 'Spades; the ace of spades is the highest card.'],
    ['Teams', 'All players are one team against the game.', 'Two teams of 2; partners sit opposite each other.'],
    ['Goal of a hand', 'Each task card must be won by the player who took that task.', 'Your team must take at least the number of tricks it bid, without many extra.'],
    ['Scoring', 'A mission succeeds (go on to the next) or fails (play it again).', 'If your team takes at least its bid, it scores 10 points per trick bid plus 1 per extra trick; if not, it loses 10 per trick bid. The first team to 500 wins.'],
  ],
  terms: [['Rockets', 'Spades (trump)']],
  toA: 'Forget trick counts: what matters is which player wins which card, and everyone is your partner, so you often lose a trick on purpose.',
  toB: 'Two teams compete, and your team must take at least the number of tricks it bid in advance; too few costs points, and every 10 extra tricks (bags) cost 100.',
});

defineBridge({
  a: 'hearts', b: 'spades',
  same: [
    'Standard 52-card deck; with 4 players, each gets 13 cards.',
    'Follow the suit led if you can; the highest card of the suit led wins the trick (in Spades, unless a spade is played), and the winner leads the next trick.',
    'One suit can’t be led until it is “broken”, meaning a card of that suit has been played on another suit’s lead: hearts in Hearts, spades in Spades.',
  ],
  diff: [
    ['Goal', 'Avoid taking points: each heart in the tricks you win is 1 point, and the queen of spades is 13.', 'Your team must take at least as many tricks as it bid.'],
    ['Trump', 'No trump suit.', 'Spades are always trump.'],
    ['Teams', 'Every player for themselves.', 'Two teams of 2; partners sit opposite each other.'],
    ['Before play', 'Each player passes 3 cards: to the left on the 1st hand, right on the 2nd, across on the 3rd, no pass on the 4th, then repeat.', 'Each player bids how many tricks they expect to take.'],
    ['Big gamble', 'Shoot the moon: if you take all 13 hearts and the Q♠, you score 0 and every other player scores 26.', 'Bid Nil: promise to take no tricks; your team gets +100 if you take none, −100 if you take any.'],
    ['Game end', 'When a player reaches 100 points; the lowest score wins.', 'When a team reaches 500 points; the highest score wins.'],
  ],
  terms: [['Hearts broken', 'Spades broken']],
  toA: 'No trump, no bidding, and points are bad: avoid winning tricks that contain hearts or the Q♠, so high cards are a liability.',
  toB: 'Winning tricks is the goal, spades are trump, and you have a partner: you each bid a trick count, and your team must take at least the total without many extra.',
});

defineBridge({
  a: 'spades', b: 'euchre',
  same: [
    'Four players in two teams of 2; partners sit opposite each other.',
    'Follow the suit led if you can; a trump beats any card of another suit.',
    'Your team is punished if it fails what it committed to: its bid (Spades), or 3 tricks after choosing trump (Euchre).',
  ],
  diff: [
    ['Deck and hand', '52 cards; 13 cards each, so 13 tricks per hand.', '24 cards (9 through ace in each suit); 5 cards each, so 5 tricks per hand.'],
    ['Trump', 'Spades, every hand.', 'Chosen each hand: going clockwise, each player may order up the face-up card’s suit as trump; if all pass, each player in turn may name a different suit.'],
    ['Top trumps', 'The ace of spades, then the king, queen and so on down.', 'The jack of trump (right bower), then the jack of the other suit of the same colour (left bower), then ace, king, queen, 10 and 9 of trump.'],
    ['Commitment', 'Every player bids a number of tricks; each team must take at least its partners’ total.', 'Only the team that chose trump commits: it must take at least 3 of the 5 tricks.'],
    ['Scoring', 'A team that makes its bid scores 10 per trick bid; extra tricks (bags) and Nil bids also count. The first team to 500 wins.', 'The team that chose trump scores 1 point for 3–4 tricks, 2 for all 5; if it takes fewer than 3, the other team scores 2. The first team to 10 wins.'],
  ],
  terms: [['Being set', 'Being euchred']],
  toA: 'Trump never changes and every player bids a number of tricks, so each hand is a 13-trick plan to reach your team’s total.',
  toB: 'Trump is chosen each hand, and the left bower (the jack of the other suit of trump’s colour) counts as a trump, not as its printed suit.',
});

defineBridge({
  a: 'spades', b: 'bridge',
  same: [
    '52 cards; four players in two teams of 2; 13 cards each and 13 tricks per hand.',
    'Follow the suit led if you can; the highest trump played wins the trick, or, if no trump is played, the highest card of the suit led.',
    'A bid sets a trick target before play; missing it costs your team.',
  ],
  diff: [
    ['Bidding', 'Each player says how many tricks they expect to take; partners add their bids together.', 'An auction: going clockwise, each player bids or passes; a bid is a number 1–7 (the target is that number + 6 tricks) plus a suit or no trump, and must outrank the previous bid.'],
    ['Trump', 'Always spades.', 'The suit named in the final bid, or none if that bid was no trump.'],
    ['Who must make it', 'Both teams.', 'Only the team that won the auction; the other team defends.'],
    ['Playing the hand', 'Every player plays their own cards.', 'After the first card is led, the declarer’s partner (dummy) lays all their cards face up, and the declarer plays both hands.'],
    ['Scoring', 'A team that makes its bid scores 10 per trick bid; each extra trick is a bag. The first team to 500 wins.', 'Points per trick bid and made, bonuses for game and slam contracts; the defenders score if the contract fails.'],
  ],
  terms: [['Bid (team total)', 'Contract'], ['Being set', 'Going down']],
  toA: 'Bidding is a number, not an auction: each player says how many tricks they expect, spades are always trump, and both teams have a target.',
  toB: 'The auction picks trump as well as the trick target, only the team that wins the auction must make its contract, and each bid also tells your partner about your hand.',
});

defineBridge({
  a: 'spades', b: 'tichu',
  same: [
    'Four players in two teams of 2; partners sit opposite each other.',
    'One player can make a solo call that wins the team **100 points** if it succeeds, and loses 100 if it fails.',
    'Team scores build up over many hands toward a high target.',
  ],
  diff: [
    ['Deck', 'Standard 52 cards.', '52 cards plus 4 special cards: Mah Jong, Dog, Phoenix, Dragon.'],
    ['Tricks', 'Each player plays 1 card, following suit if able.', 'The leader plays a combination (single, pair, straight and so on); going around, each player beats it with a higher combination of the same type, or passes.'],
    ['Trump', 'Spades beat every other suit.', 'None; a bomb (four of a kind, or a straight flush) beats any play.'],
    ['Goal of a hand', 'Your team must take at least the number of tricks it bid.', 'Empty your hand early, and win tricks holding point cards: 5s (5 points), 10s and kings (10 each).'],
    ['Solo call', 'Nil: take no tricks (+100 or −100).', 'Tichu: call it before playing your first card, then be first to go out (+100 or −100). Grand Tichu: call it after seeing only your first 8 cards (+200 or −200).'],
    ['Game end', 'The first team to 500 wins.', 'The first team to 1,000 wins.'],
  ],
  terms: [],
  toA: 'Each player plays 1 card per trick, you must follow suit, spades are trump, and the aim is to take your team’s bid, not to empty your hand.',
  toB: 'Each trick is a climb: beat the last play with a higher combination of the same type; play goes round until the other 3 players pass in a row, and you race to empty your hand first.',
});

defineBridge({
  a: 'codenames', b: 'wavelength',
  same: [
    'Two teams; on each team’s turn, one player who knows a secret gives a clue, and their teammates discuss it.',
    'The clue-giver stays silent while the team argues.',
    'Good clues depend on how your friends think.',
  ],
  diff: [
    ['Secret', 'Which of the 25 words on the table belong to your team.', 'Where a hidden target sits on a dial between two extremes printed on a card, like Hot–Cold.'],
    ['Clue', 'One word plus a number: how many of your team’s words it points to.', 'Any word or phrase that, to the clue-giver, sits at the target’s spot between the 2 extremes.'],
    ['Guess', 'Teammates touch words one at a time; they may stop at any point, and may touch at most the clue’s number + 1.', 'The team agrees on one spot and turns the dial to it.'],
    ['Risk', 'Touching a word that isn’t your team’s ends your turn; touching the assassin loses the game.', 'The other team then guesses whether the target is left or right of your dial; if they are right, they score 1 point.'],
    ['Winning', 'The first team to touch all its words wins.', 'The first team to 10 points wins; your team scores 2, 3 or 4 points the closer the dial is to the target.'],
  ],
  terms: [['Spymaster', 'Psychic']],
  toA: 'One clue must link several of your words without pointing to the other team’s words or the assassin, so a bigger number means more risk.',
  toB: 'There is no list of right answers: you place an idea at a precise spot on a scale, and points depend on how close your team turns the dial.',
});

defineBridge({
  a: 'codenames', b: 'dixit',
  same: [
    'One player knows something the others don’t and gives a clue; the others guess from it.',
    'The best clues are neither too obvious nor too obscure.',
    'After giving the clue, the clue-giver says nothing.',
  ],
  diff: [
    ['Teams', 'Two teams, each with a spymaster.', 'Every player for themselves; the storyteller role passes clockwise each round.'],
    ['Cards', '25 word cards laid out in a 5×5 grid.', 'Picture cards; each player holds a hand of them.'],
    ['Clue', 'One word plus a number.', 'Anything: a word, a phrase, a sound, a line from a song.'],
    ['Decoys', 'The grid also holds the other team’s words, neutral words and the assassin.', 'Each other player adds 1 card from their hand that also fits the clue, to draw votes away from yours.'],
    ['Scoring', 'The first team to touch all its words wins.', 'The storyteller scores 3 points if some but not all players find their card, 0 if all or none do. The game ends when someone reaches 30.'],
  ],
  terms: [['Spymaster', 'Storyteller']],
  toA: 'You play on a team, and a vague clue doesn’t just score badly: it can lead your teammates to the other team’s words or the assassin.',
  toB: 'Too obvious is punished just like too obscure: if every player finds your card you score 0, so aim for a clue that only some will get.',
});

defineBridge({
  a: 'dixit', b: 'wavelength',
  same: [
    'One player knows a secret target and gives one clue; the others try to find the target.',
    'Clues can be anything you like; reading your friends is the skill.',
    'The clue-giver role passes to another player each round.',
  ],
  diff: [
    ['Teams', 'Every player for themselves.', 'Two teams take turns.'],
    ['Target', 'A picture card from your hand.', 'A hidden spot on a dial between two extremes.'],
    ['Clue limits', 'None: anything at all.', 'The clue must name something that sits at the target’s spot between the card’s two extremes, like Hot–Cold.'],
    ['Too obvious?', 'Bad: if every player finds your card, you score 0.', 'Fine: the closer your team turns the dial to the target, the more points (up to 4).'],
    ['Winning', 'The game ends after the round in which someone reaches 30 points; the most points wins.', 'The first team to 10 points wins.'],
  ],
  terms: [['Storyteller', 'Psychic']],
  toA: 'You want only some players to find your card, and the others add decoy cards, so make your clue deliberately half-clear.',
  toB: 'You want your team to land exactly on the target, so be precise; the card’s two extremes, not you, set the clue’s topic.',
});

defineBridge({
  a: 'risk', b: 'king-of-tokyo',
  same: [
    'Dice decide every fight, and you can be knocked out.',
    'Holding a key position (a continent; Tokyo) pays every turn but makes you a target.',
  ],
  diff: [
    ['Dice', 'The attacker rolls up to 3 dice and the defender up to 2; compare the highest die of each, then the second highest; each loss removes 1 army.', 'Roll 6 special dice, then reroll any of them, up to 2 more times.'],
    ['Map', '42 territories across 6 continents.', 'One spot, Tokyo: each monster is either in it or outside it.'],
    ['Attacking', 'Choose a territory next to one of yours and battle for it.', 'Each claw you roll deals 1 damage: to every monster outside Tokyo if you are in Tokyo, or to the monster in Tokyo if you are outside.'],
    ['Winning', 'Conquer every territory (or complete a secret mission, in some editions).', 'Reach 20 victory points, or be the last monster standing.'],
    ['Length', 'Often 2–4 hours.', '20–30 minutes.'],
  ],
  terms: [['Holding a continent', 'Holding Tokyo']],
  toA: 'You fight over many territories, with new armies each turn, and you win only by taking the whole map.',
  toB: 'You never choose a target: being in or out of Tokyo decides whom your claws hit, and you can win on points without defeating anyone.',
});

defineBridge({
  a: 'risk', b: 'diplomacy',
  same: [
    'You conquer a map of territories; more land means more forces.',
    'A player who loses all their land is knocked out.',
    'Alliances are unofficial, and anyone may break one at any time.',
  ],
  diff: [
    ['Luck', 'Dice decide every battle.', 'None: no dice and no cards.'],
    ['Turns', 'Players take turns; on your turn you may attack as many times as you like.', 'Everyone secretly writes orders for all their units; then all orders are revealed and carried out at the same time.'],
    ['Combat', 'Any number of armies can share a territory; both sides roll dice, and bigger stacks usually win.', 'At most 1 unit per space, each with strength 1; a move succeeds only with more support than any opposing unit, and on a tie no unit moves (a bounce).'],
    ['Growing', 'At the start of each turn, get new armies for your territories, continents and card sets.', 'Each winter, add or remove units until you have 1 per supply center you own.'],
    ['Talking', 'Optional.', 'Negotiating before each turn is the main activity.'],
    ['Winning', 'Take every territory.', 'Own 18 of the 34 supply centers; otherwise the surviving players may agree to a shared draw, which is common.'],
  ],
  terms: [['Territory', 'Province'], ['Reinforcements', 'Builds']],
  toA: 'Battles are dice rolls on your own turn and armies stack, so numbers and luck matter more than persuasion.',
  toB: 'Without dice, you can’t beat an equal force alone: every gain needs another player’s support, so your words matter as much as your moves.',
});

defineBridge({
  a: 'risk', b: 'twilight-struggle',
  same: [
    'A world map divided into regions; controlling a whole region is worth far more than a scattered presence.',
    'A die roll decides attacks, so weigh the odds before you attack.',
    'You plan across several continents at once.',
  ],
  diff: [
    ['Players', '2–5, each for themselves.', 'Exactly 2: the USA and the USSR.'],
    ['On the map', 'Armies that fight and are destroyed.', 'Influence markers; you control a country when your influence there is at least your opponent’s influence plus the country’s stability number.'],
    ['Your turn', 'Place new armies, attack as often as you like, then make 1 fortifying move.', 'Play 1 card, either for its operations points (ops) or for its event.'],
    ['Fighting', 'Each battle is a series of dice rolls, repeated until the attacker stops or one side runs out of armies.', 'A coup: roll 1 die and add the card’s ops; if the total beats twice the country’s stability, remove enemy influence equal to the difference.'],
    ['Winning', 'Take every territory.', 'Reach 20 VP, control Europe when Europe is scored, or lead in VP after turn 10; the player who causes nuclear war loses.'],
  ],
  terms: [['Armies', 'Influence'], ['Continent bonus', 'Region scoring card']],
  toA: 'Everything runs through armies you place and fight with, there are no event cards, and you win only by taking the whole map.',
  toB: 'Your hand of cards drives everything; when you play a card showing your opponent’s event for its ops, that event still happens, so you choose which harm to take.',
});

defineBridge({
  a: 'root', b: 'dune',
  same: [
    'Each faction has its own rules, growth and powers that break the base rules.',
    'Factions fight over spaces on one shared map, and the other players need to gang up on whoever is leading.',
    'Learning the other factions’ powers matters as much as learning your own.',
  ],
  diff: [
    ['Players', '2–4 in the base game (more with expansions).', '2–6; best with all 6 factions.'],
    ['Combat', 'Roll 2 twelve-sided dice: the attacker deals hits equal to the higher roll, the defender equal to the lower.', 'Each side secretly dials a number of forces on a battle wheel and adds a leader and cards; no dice.'],
    ['Winning', 'The first player to 30 victory points wins; each faction scores them in its own way.', 'Hold 3 of the 5 strongholds at the end of a turn (allies hold 4 between them).'],
    ['Economy', 'Each faction runs its own economy of cards and buildings.', 'Every faction needs spice, and much of the spice you pay goes to another faction.'],
    ['Alliances', 'Informal; each player wins alone.', 'Formal alliances: allies share some abilities and win together.'],
  ],
  terms: [['Clearing', 'Territory']],
  toA: 'Everyone races to 30 points in their own way, and dice settle fights, so expect fewer bluffs and more steady building.',
  toB: 'No points: you win by holding strongholds at the end of a turn; battles are secret bids of forces and leaders, and if your opponent holds the traitor card for your leader, you lose the battle.',
});

defineBridge({
  a: 'dune', b: 'cosmic-encounter',
  same: [
    'Every faction has a power that breaks a rule.',
    'Several players can win together as allies.',
    'In a battle, each side commits forces and reveals a secretly chosen card; no dice.',
    'Forces lost in battle go to a holding area (the Tleilaxu Tanks; the warp) and must be recovered.',
  ],
  diff: [
    ['Turn', 'All players go through each phase together.', 'Players take turns as the offense; the offense draws a destiny card, which picks whom they attack.'],
    ['Alliances', 'Formal pacts that last; allies win together by holding 4 strongholds between them.', 'Before each encounter, the offense and defense invite allies; allies on the winning offense also gain colonies.'],
    ['Combat', 'Each side secretly dials forces and adds a leader plus weapon and defense cards; a leader may turn out to be a traitor.', 'Each side adds its ships to its attack card’s number; the higher total wins, and the defender wins ties.'],
    ['Winning', 'Hold 3 of the 5 strongholds at the end of a turn.', 'Have colonies on 5 planets outside your home system.'],
    ['Economy', 'Spice pays to buy cards, to ship forces onto the map and to revive lost forces.', 'No currency; your hand of encounter cards is your resource.'],
  ],
  terms: [['Faction', 'Alien'], ['Forces', 'Ships'], ['Tleilaxu Tanks', 'Warp']],
  toA: 'A long war: alliances are locked in, spice pays for everything, and each battle is a one-shot secret plan in which a leader can be killed or turn traitor.',
  toB: 'Turns are quick encounters between 2 players that others can join as allies, and shared wins are normal, so watch whom your help brings close to 5 colonies.',
});

defineBridge({
  a: 'dune', b: 'dune-imperium',
  same: [
    'Spice is the main currency.',
    'The Emperor, Spacing Guild, Bene Gesserit and Fremen all matter, and allying with them is key.',
    'Each fight goes to whoever commits more strength.',
  ],
  diff: [
    ['Core play', 'Move forces, bid for cards, and battle on a map.', 'Deck building plus worker placement: play a card to send an agent to a board space.'],
    ['Factions', 'Each player is a faction with powers that break the rules.', 'The same rules for every player; leaders have small abilities, and the 4 factions are influence tracks that every player climbs.'],
    ['Combat', 'A separate battle in each contested territory, using a secret battle wheel: forces, leader, cards, and possible traitors.', 'One conflict per round; the player with the most strength takes 1st prize, the next 2nd (and the next 3rd with 4 players).'],
    ['Alliances', 'Players ally with each other and can win together.', 'The first player to reach 4 influence with a faction takes its alliance.'],
    ['Winning', 'Hold 3 of the 5 strongholds at the end of a turn.', 'The game ends after the round in which someone reaches 10 VP (or when the conflict deck runs out); most VP wins.'],
  ],
  terms: [['Treachery cards', 'Intrigue cards'], ['Forces', 'Troops']],
  toA: 'No victory points, every faction has its own rules, and you win by holding strongholds through deals, bluffs and betrayals.',
  toB: 'The same rules for everyone, and you race toward 10 points by building your deck, placing agents and winning each round’s conflict.',
});

defineBridge({
  a: 'cosmic-encounter', b: 'diplomacy',
  same: [
    'You win through alliances negotiated at the table.',
    'Promises are not binding.',
    'An alliance shows on the board as forces you commit to support another player.',
  ],
  diff: [
    ['Luck', 'A destiny card picks whom you attack, and the cards you draw vary.', 'None: no dice and no cards.'],
    ['Turn', 'Players take turns; each turn is an encounter between the active player (the offense) and one defender.', 'Everyone secretly writes orders; all orders are carried out at the same time.'],
    ['Deals', 'Talk is allowed at any time; when both main players play Negotiate cards, they get 1 minute to make a deal.', 'A set negotiation period before each turn’s orders are written.'],
    ['Powers', 'Every player has a unique alien power.', 'All 7 great powers use the same rules; only their starting positions differ.'],
    ['Winning', 'Have colonies on 5 planets outside your home system; several players can win together.', 'Own 18 of the 34 supply centers alone; otherwise the surviving players may agree to a shared draw.'],
    ['Length', '1–2 hours.', '4–7 hours.'],
  ],
  terms: [['Allying ships into an encounter', 'Support order']],
  toA: 'An alliance lasts one encounter and several players can win together, so deals are frequent, casual and rarely final.',
  toB: 'No luck and no special powers: map position and trust built over many turns decide everything, and usually one player wins alone.',
});

defineBridge({
  a: 'cosmic-encounter', b: 'twilight-imperium',
  same: [
    'Every faction has abilities that break the normal rules.',
    'Deals are made openly at the table and need not be kept.',
    'Whom you help, and when, matters as much as your own position.',
  ],
  diff: [
    ['Length', '1–2 hours.', '4–8 hours.'],
    ['Winning', 'Have colonies on 5 planets outside your home system.', 'The first player to 10 victory points wins; points come from public and secret objectives.'],
    ['Combat', 'Each side adds its ships to a secretly chosen attack card’s number; the higher total wins.', 'Each unit rolls a 10-sided die to hit; rounds repeat until one side is destroyed or retreats.'],
    ['Economy', 'None: your cards are your resources.', 'Planets you control produce resources and influence, which you spend on units, technology and votes.'],
    ['Politics', 'The 2 main players invite allies into each encounter.', 'Each round, every player picks a strategy card; once a player first takes Mecatol Rex, everyone votes on laws each round.'],
  ],
  terms: [['Alien', 'Faction'], ['Ships', 'Units']],
  toA: 'No economy or technology: each turn is one quick encounter decided by ships plus a card, and the race to 5 colonies can end in a shared win.',
  toB: 'In combat every unit rolls a die, and planets pay for everything with resources and influence; points come from objectives, not from conquest alone.',
});

defineBridge({
  a: 'diplomacy', b: 'twilight-struggle',
  same: [
    'A historical map; which spaces border which shapes every plan.',
    'Long-term positioning matters more than any single turn.',
    'Key spaces (supply centers; battleground countries) are what count.',
  ],
  diff: [
    ['Players', '2–7; with 7 players, each plays one European great power.', 'Exactly 2: the USA and the USSR.'],
    ['Luck', 'None.', 'Card draws, plus dice for coups, realignments, war events and the Space Race.'],
    ['Turn', 'Everyone secretly writes orders for all their units; all orders are revealed and carried out together.', 'Players alternate, each playing 1 card per action round, for its operations points (ops) or for its event.'],
    ['What you move', 'Armies and fleets, at most 1 per space.', 'Influence markers placed in countries; no armies.'],
    ['Talking', 'Negotiation is the core of the game.', 'None: your only opponent is always your enemy.'],
    ['Winning', 'Own 18 of the 34 supply centers.', 'Reach 20 VP, control Europe when Europe is scored, or lead in VP after turn 10.'],
  ],
  terms: [['Supply center', 'Battleground country']],
  toA: 'No cards or dice, but up to 6 other players: you need their support to advance, so persuasion is your main tool.',
  toB: 'One opponent and no one to negotiate with; many of your cards carry your rival’s events, which still happen when you play them for ops, so you choose when to take that harm.',
});
