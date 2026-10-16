// Bridges for KIN[20]..KIN[39]: explain one game in terms of a similar one.

defineBridge({
  a: 'dominion', b: 'dune-imperium',
  same: [
    'You start with the same weak 10-card deck as everyone else and draw a hand of 5.',
    'Cards you buy go to your discard pile; when your deck runs out, shuffle the discards into a new deck.',
    'Trashing weak starting cards makes your deck draw your good cards more often.',
    'Deck building is the engine, but points come from something else you have to switch to in time.',
  ],
  diff: [
    ['What a card does', 'Action cards do their text when played; Treasures make coins.', 'A card either sends an agent to a matching space or is revealed for its bottom box.'],
    ['Shape of a turn', 'One turn: play actions, buy, then draw a fresh hand of 5.', 'A round is many turns: place agents one by one, then one reveal turn to buy and fight.'],
    ['What you can buy', '10 fixed kingdom piles plus Treasures and Victory cards, all visible all game.', 'A row of 5 face-up cards that refills from a deck, plus a few always-available cards.'],
    ['Interaction', 'Mostly your own deck; Attack cards hit others.', 'Agents block board spaces, and every round ends in a combat for rewards.'],
    ['Game end', 'Province pile or any 3 supply piles run out. Count VP cards in your deck.', 'Someone reaches 10 VP (finish the round) or the conflict deck runs out. VP on a track.'],
  ],
  terms: [['Coins', 'Persuasion'], ['Supply', 'Imperium Row'], ['Victory cards', 'Victory points on the track']],
  toA: 'Forget the board: in Dominion every card is played for its text in one turn, and points are cards you buy that clog your deck.',
  toB: 'Each card is played **either** as an agent (top half, onto the board) **or** saved for your reveal turn (bottom box), never both.',
});

defineBridge({
  a: 'dominion', b: 'magic-the-gathering',
  same: [
    'Card combos are the game: individual cards are weak, combinations win.',
    'You draw from a shuffled personal deck, so what you get each turn is partly luck.',
    'Turns follow phases: in Dominion Action, Buy, Clean-up; in Magic untap, draw, main, combat, end.',
  ],
  diff: [
    ['When the deck is built', 'During play, buying from a shared supply everyone can use.', 'Before the game, from your own collection (or by drafting packs).'],
    ['How you win', 'Most victory points when the game ends.', 'Bring your opponent from 20 life to 0 (or they must draw from an empty deck).'],
    ['Paying for things', 'Treasure cards in hand make coins; they are discarded and redrawn.', 'Lands stay on the table and tap for mana every turn; play at most one land a turn.'],
    ['Empty deck', 'Shuffle your discard pile into a new deck.', 'No reshuffle. Having to draw from an empty library loses you the game.'],
    ['Interaction', 'Mostly solitaire; a few Attack cards affect others.', 'Constant: creatures fight, and instants can be cast on the opponent’s turn.'],
  ],
  terms: [['Treasure cards', 'Lands (mana)'], ['Trash', 'Exile'], ['Action cards', 'Spells']],
  toA: 'Everyone starts with the same 10 cards and builds the deck during the game from one shared supply, racing for points, not life.',
  toB: 'The deck is built before the game starts, and the game is a fight: creatures attack to drop your opponent from 20 life to 0.',
});

defineBridge({
  a: '7-wonders', b: 'sushi-go',
  same: [
    'Everyone picks one card from their hand at the same time, reveals, and passes the rest.',
    'Hands shrink each pick, so watch what is heading to your neighbour.',
    'Three rounds of drafting, then the most points wins.',
    'Many cards score in sets or by having the most of something.',
  ],
  diff: [
    ['Playing a card', 'Pay its resource or coin cost to build it, use it for a Wonder stage, or sell for 3 coins.', 'Free: the card just goes in front of you.'],
    ['Passing direction', 'Left in Ages I and III, right in Age II.', 'Always left.'],
    ['What carries over', 'Buildings stay all game and feed later Ages (chains, resources).', 'Everything but Pudding is discarded after each round.'],
    ['Interaction', 'Neighbours only: buy their resources and compare military.', 'Majorities (Maki, Pudding) are against the whole table.'],
    ['Last card', 'Hands start at 7; the 7th card is discarded.', 'Every card is played; hand size depends on player count.'],
  ],
  terms: [['Ages', 'Rounds'], ['Military (beat your neighbours)', 'Maki rolls (most at the table)']],
  toA: 'Most cards cost something to build, so you also need resources (yours or bought from neighbours) to play what you pick.',
  toB: 'Cards are free to play and most are thrown away after each round, so only that round’s sets count (except Pudding).',
});

defineBridge({
  a: '7-wonders', b: 'magic-the-gathering',
  same: [
    'Open a hand (a pack in Magic), pick one card, pass the rest.',
    'Passing goes left, then right, then left again across three rounds.',
    'Good drafting means reading what neighbours collect and sometimes taking a card to deny it.',
  ],
  diff: [
    ['What a pick does', 'Built immediately: pay its cost, use it for a Wonder stage, or sell it for 3 coins.', 'Goes into your pool; nothing happens until you build a deck afterwards.'],
    ['After the draft', 'Nothing: the game ends with scoring after the third Age.', 'Build a 40-card deck from your picks plus lands, then play matches.'],
    ['How you win', 'Most points from seven scoring categories.', 'Beat opponents one-on-one by taking them from 20 life to 0.'],
    ['Who you face', 'Your two neighbours, through military and trade.', 'One opponent at a time in head-to-head games.'],
    ['Pack size', '7 cards per hand, one per player each Age.', 'About 14–15 cards per pack, three packs each.'],
  ],
  terms: [['Ages I–III', 'Packs 1–3'], ['Discarding for 3 coins', 'Taking a card just to deny it']],
  toA: 'The draft is the whole game: each pick is built on the spot, and points are counted at the end with no matches to play.',
  toB: 'Drafting only builds your card pool; afterwards you make a deck from it and win by beating opponents in head-to-head games.',
});

defineBridge({
  a: 'carcassonne', b: 'kingdomino',
  same: [
    'Each turn you add one tile, and its edges must line up with terrain already there.',
    'Big connected areas of the same terrain are worth the most.',
    'No hidden hands: everyone can see every board.',
  ],
  diff: [
    ['Whose map', 'One shared map everyone builds together.', 'Your own 5×5 kingdom (7×7 in 2-player).'],
    ['Getting a tile', 'Draw a random tile from the bag.', 'Pick from a visible line; better dominoes mean you pick later next round.'],
    ['Matching', 'Every touching edge must match.', 'Only one touching square needs to match (or touch your castle).'],
    ['Claiming', 'Place a meeple to own a road, city, monastery or field.', 'No claiming: everything in your kingdom is yours.'],
    ['Scoring', 'During play when features finish, plus fields and leftovers at the end.', 'Only at the end: squares × crowns for each area.'],
  ],
  terms: [['Tile', 'Domino'], ['Feature (city, road, field)', 'Area of one terrain'], ['Meeple', 'King (your picking pawn)']],
  toA: 'The map is shared and you only score what you claim with your 7 meeples, so it matters where they are tied up.',
  toB: 'Your kingdom is private and you choose your domino, but picking a good one makes you choose late next round.',
});

defineBridge({
  a: 'kingdomino', b: 'cascadia',
  same: [
    'Take a piece from a small shared display and add it to your own area.',
    'Large connected areas of one terrain or habitat score.',
    'No direct attacks; interaction is taking the piece someone else wanted.',
  ],
  diff: [
    ['Pieces', 'Square dominoes with two terrain halves, some with crowns.', 'Hex habitat tiles, each paired with a wildlife token.'],
    ['Placement rule', 'One touching square must match; must fit in 5×5.', 'Just touch one of your tiles; no matching or size limit.'],
    ['Scoring areas', 'Squares × crowns for each connected area.', 'Your largest area of each habitat, plus wildlife patterns from scoring cards.'],
    ['Turn order', 'Set by which domino you picked.', 'Fixed, clockwise.'],
    ['Bad pieces', 'A domino you can’t place is discarded.', 'An animal you can’t use goes back to the bag; spend nature tokens to unpair.'],
  ],
  terms: [['Terrain', 'Habitat'], ['Connected area', 'Habitat corridor']],
  toA: 'Placement is tight (match one terrain, stay in 5×5), and crowns, not size alone, make an area pay.',
  toB: 'Half the points come from wildlife tokens arranged in patterns set by the scoring cards, not just from terrain.',
});

defineBridge({
  a: 'kingdomino', b: 'patchwork',
  same: [
    'You fill a small personal grid with pieces chosen from a shared offer.',
    'Taking the strong piece now costs you tempo later.',
    'Short, open-information games; you can see what the others are building.',
  ],
  diff: [
    ['Players', '2–4.', 'Exactly 2.'],
    ['Cost of a piece', 'Free, but a better domino means you pick later next round.', 'Buttons, plus time on the track; whoever is behind on time moves next.'],
    ['Placement', 'One touching square must match a terrain, or touch your castle.', 'Any spot on your 9×9 quilt; pieces can rotate and flip.'],
    ['Scoring', 'Squares × crowns for each connected terrain area.', 'Buttons, minus 2 per empty square; first 7×7 square earns +7.'],
    ['Empty spaces', 'No penalty in the basic rules.', 'Each costs 2 points at the end.'],
  ],
  terms: [['Kingdom', 'Quilt'], ['Domino', 'Patch'], ['Crowns', 'Buttons on patches']],
  toA: 'Pieces are free and holes don’t hurt; the trade-off is picking a better domino versus choosing first next round.',
  toB: 'Every patch costs buttons and time, and every empty square at the end costs you 2, so filling the quilt matters.',
});

defineBridge({
  a: 'azul', b: 'cascadia',
  same: [
    'Take from a shared display, then place what you took on your own board.',
    'Scoring rewards patterns, so plan where each piece will go before you take it.',
    'Interaction is mostly indirect: you take what others want.',
  ],
  diff: [
    ['Taking', 'All tiles of one colour from one factory or the centre.', 'One of 4 tile + animal pairs (a nature token lets you split them).'],
    ['Leftovers', 'Tiles that don’t fit fall to your floor line and cost points.', 'An animal you can’t place goes back to the bag, no penalty.'],
    ['Board', 'A fixed 5×5 wall with set colour positions.', 'An open-ended map of hex tiles.'],
    ['When you score', 'Each round as tiles reach the wall, plus end bonuses.', 'Only at the end.'],
    ['Game end', 'After the round in which someone completes a row.', 'After a fixed number of turns (20 each).'],
  ],
  terms: [['Factories', 'The 4 tile + token pairs'], ['Pattern lines', 'Wildlife scoring cards']],
  toA: 'You must take **every** tile of the colour you choose, and anything that doesn’t fit costs you points.',
  toB: 'Each pick is a habitat tile and an animal at once, and the tile you want often comes with the wrong animal.',
});

defineBridge({
  a: 'chess', b: 'go',
  same: [
    'Two players, no luck, nothing hidden.',
    'Players alternate one move at a time.',
    'Openings and endgames are studied; reading ahead is the core skill.',
  ],
  diff: [
    ['Goal', 'Checkmate the enemy king.', 'Surround more empty points than your opponent (plus captures).'],
    ['Pieces', 'Six types with different moves.', 'Identical stones that never move once placed.'],
    ['Capturing', 'Land on an enemy piece to take it.', 'Fill every liberty (adjacent empty point) of an enemy group.'],
    ['Board', '8×8, full army at the start.', '19×19 (9×9 or 13×13 to learn), starts empty.'],
    ['Draws and fairness', 'White moves first; draws are common.', 'Black moves first; White gets komi (6.5 or 7.5), so no ties.'],
  ],
  terms: [['Check', 'Atari (one liberty left)'], ['Captured pieces', 'Prisoners'], ],
  toA: 'Pieces move and capture by landing on each other, and the game ends the moment one king is trapped.',
  toB: 'Nothing ever moves: you place stones to wall off territory, and you can lose a fight and still win on points.',
});

defineBridge({
  a: 'scrabble', b: 'codenames',
  same: [
    'Your vocabulary and word associations are the main skill.',
    'Turns are short; a good word now matters more than long plans.',
  ],
  diff: [
    ['Players', '2–4 each for themselves.', 'Two teams, each with one spymaster.'],
    ['What you make', 'Real words from your 7 letter tiles, built onto a grid.', 'One-word clue plus a number linking several words on the table.'],
    ['Luck', 'Random tiles drawn from a bag.', 'Random 25-word grid and secret key card.'],
    ['Scoring', 'Letter values and premium squares; highest total wins.', 'First team to find all its agents wins; touch the assassin and you lose.'],
    ['Ruling on words', 'Must be in the agreed dictionary; plays can be challenged.', 'Clue can’t be a word on the table or part of one.'],
  ],
  terms: [],
  toA: 'There are no teams or clues: you spell real words from random letter tiles and score their values on a board.',
  toB: 'You never spell anything; one player hints at several words at once and teammates guess which ones they meant.',
});

defineBridge({
  a: 'clue', b: 'love-letter',
  same: [
    'You deduce hidden cards by elimination.',
    'Watching what others play or show tells you what they hold.',
    'Naming the right card is how you win; naming the wrong one can hurt.',
  ],
  diff: [
    ['What is hidden', 'Three cards in the envelope (suspect, weapon, room).', 'One card in each player’s hand, plus one removed from the deck.'],
    ['Getting info', 'Suggest; the next player who can shows you one card.', 'Priest peeks at a hand; count the discards.'],
    ['Wrong guesses', 'Wrong accusation: you are out (but still show cards).', 'Wrong Guard guess: nothing happens.'],
    ['Length', 'One long game, roll-and-move.', 'Several 5-minute rounds; win favor tokens.'],
    ['Knockouts', 'Only by a wrong accusation.', 'Cards like Guard and Baron knock others out of the round.'],
  ],
  terms: [['Being shown a card', 'Priest (look at a hand)'], ['Accusation', 'Guard (name their card)']],
  toA: 'Everyone hunts the same three hidden cards, and you only get one accusation, so wait until your notes are sure.',
  toB: 'The hidden cards are in each opponent’s hand and change every turn; the Guard lets you guess one and knock them out.',
});

defineBridge({
  a: 'secret-hitler', b: 'avalon',
  same: [
    'A small hidden evil team knows each other; the good majority doesn’t.',
    'A leader proposes, then everyone votes publicly at once.',
    'Evil sabotages through secret plays that are revealed without names.',
    'Too many failed votes in a row hurts the good side.',
  ],
  diff: [
    ['What is chosen', 'President nominates one Chancellor.', 'Leader picks a whole team for the quest.'],
    ['Secret plays', 'Policies come from a mostly fascist deck; good players may be forced to pass one.', 'Good players must play Success, so any Fail proves evil is on the team.'],
    ['Key character', 'Hitler: elected Chancellor late = fascists win; executed = liberals win.', 'Merlin: knows evil, but if the Assassin finds him, evil wins.'],
    ['Removing players', 'The President can execute players.', 'No one is ever out.'],
    ['Win', 'Liberals: 5 liberal policies; fascists: 6 fascist policies.', 'Good: 3 of 5 quests; evil: 3 failed quests.'],
  ],
  terms: [['President', 'Leader'], ['Ja! / Nein', 'Approve / Reject'], ['Liberals / Fascists', 'Good / Evil'], ['Election tracker', 'Vote track']],
  toA: 'An honest government can still pass a fascist policy because the deck is stacked, so a bad law does not prove anyone is evil.',
  toB: 'Good players can only play Success, so any Fail is proof that evil was on the team.',
});

defineBridge({
  a: 'avalon', b: 'werewolf',
  same: [
    'A hidden evil team among a good majority; the evil players know each other.',
    'A special good role starts with information and must hint without exposing themselves.',
    'Most of the game is talking: claims, accusations and lies.',
  ],
  diff: [
    ['Length', '5 quests over about 30 minutes.', 'One night and one vote; about 10 minutes.'],
    ['Your role', 'Fixed for the whole game.', 'May be swapped at night; you are the card in front of you at the end.'],
    ['Evidence', 'Team votes and quest Fail counts.', 'Only what roles saw or did at night, and what people claim.'],
    ['Deciding vote', 'Many team votes; nobody is killed.', 'One simultaneous point; the most-voted player dies.'],
    ['Win', 'Good: 3 quests (and Merlin survives the Assassin); evil: 3 failed quests.', 'Village: a werewolf dies; werewolves: no werewolf dies.'],
  ],
  terms: [['Good team', 'Village team'], ['Minions of Mordred', 'Werewolves'], ['Merlin', 'Seer']],
  toA: 'Roles never change, and evidence builds up over five quests from who voted for which team and how many Fails came out.',
  toB: 'Your card may have been swapped in the night, so you can end up on the other team without knowing it.',
});

defineBridge({
  a: 'avalon', b: 'coup',
  same: [
    'Same Resistance world and publisher.',
    'Winning depends on bluffing and reading bluffs.',
    'Your role is secret.',
  ],
  diff: [
    ['Teams', 'Good vs evil teams.', 'Every player for themselves.'],
    ['Your cards', 'One fixed role.', 'Two influence cards; you may claim any character, true or not.'],
    ['Calling lies', 'Reject teams and argue.', 'Challenge a claim: whoever is wrong loses an influence.'],
    ['Removing players', 'No one is out.', 'Lose both influence and you are out.'],
    ['Win', 'Team wins 3 of 5 quests.', 'Last player with influence left wins.'],
  ],
  terms: [],
  toA: 'Bluffing is about which team you are on, and you win with that team, not alone.',
  toB: 'You may claim any character’s power, true or not, and anyone can challenge it; whoever is wrong loses a card.',
});

defineBridge({
  a: 'werewolf', b: 'blood-on-the-clocktower',
  same: [
    'Good villagers hunt hidden evil players while evil lies about who they are.',
    'There is a night when roles secretly act, then a day of open talk and claims.',
    'The group decides who dies by a vote.',
  ],
  diff: [
    ['Length', 'One night, one vote, about 10 minutes.', 'Several days and nights, 1–2 hours.'],
    ['Who runs it', 'An app or narrator script reads the night roles.', 'A Storyteller who runs the night and also makes choices.'],
    ['Roles', 'Cards can be swapped, so you may change teams.', 'Roles never swap; but drunk or poisoned players get false info.'],
    ['Death', 'The game ends with the one vote.', 'Dead players stay in, keep talking and get one more vote.'],
    ['Win', 'Village wins if any werewolf dies.', 'Good wins by executing the Demon; evil wins with 2 left alive.'],
  ],
  terms: [['Werewolf', 'Demon (Imp)'], ['Minion', 'Minion'], ['Village team', 'Good team'], ['Narrator', 'Storyteller']],
  toA: 'The whole game is one night and one vote, and your card may have been swapped, so you may not know your team.',
  toB: 'It runs many days: the Demon kills each night and dead players keep talking, so information builds up over the game.',
});

defineBridge({
  a: 'secret-hitler', b: 'blood-on-the-clocktower',
  same: [
    'A hidden evil team outnumbered by good players who don’t know each other.',
    'Evil has one key player: kill them and good wins.',
    'Public accusations and claims, with votes deciding big decisions.',
  ],
  diff: [
    ['Running the game', 'No moderator; players run the rules.', 'A Storyteller runs nights and can change some outcomes.'],
    ['Who dies', 'The President decides executions alone (via a power).', 'The group nominates and votes to execute.'],
    ['Dead players', 'Out: no talking or voting.', 'Stay in, talk and keep one vote.'],
    ['Information', 'Policy draws and loyalty investigations.', 'Night abilities, which may be false if drunk or poisoned.'],
    ['Win', 'Policies, Hitler elected, or Hitler killed.', 'Demon executed (good) or only 2 left alive (evil).'],
  ],
  terms: [['Liberals', 'Good team'], ['Fascists', 'Minions'], ['Hitler', 'Demon']],
  toA: 'Evidence comes from laws passed and who chose whom, and only the President can execute.',
  toB: 'Players vote to execute; dead players keep talking, and your info can be wrong if you are drunk or poisoned.',
});

defineBridge({
  a: 'coup', b: 'love-letter',
  same: [
    'Small card games where each character has a power.',
    'Knock other players out until only one remains.',
    'Plays tell others what you might hold.',
  ],
  diff: [
    ['Cards held', '2 face-down influence (lives).', '1 card in hand; draw a second and play one.'],
    ['Bluffing', 'Claim any character, whether you hold it or not.', 'Play only the cards you hold; bluff by what you keep.'],
    ['Resources', 'Coins pay for Assassin (3) and Coup (7).', 'No currency; only the cards.'],
    ['Knockouts', 'Lose influence through challenges, Assassin or Coup.', 'Guard guesses or Baron duels; out for that round only.'],
    ['Game length', 'One game, last player standing.', 'Several rounds; first to the favor token target.'],
  ],
  terms: [['Influence', 'Your hand card'], ['Ambassador (exchange with deck)', 'Chancellor (draw 2, keep 1)']],
  toA: 'You do not have to hold a character to use it; you only lose if someone challenges you and you lied.',
  toB: 'You must play cards you actually hold, and being knocked out only costs you that round.',
});

defineBridge({
  a: 'coup', b: 'skull',
  same: [
    'Pure bluffing: say something and dare people to call it.',
    'Losing a challenge costs you a card or disc, and running out knocks you out.',
    'Reading people matters more than card text.',
  ],
  diff: [
    ['What you claim', 'Which character you hold.', 'How many roses you can flip.'],
    ['Calling a bluff', 'Anyone challenges; whoever is wrong loses an influence.', 'Nobody calls it; others raise or pass, and the top bidder must flip.'],
    ['Pieces', 'Two character cards and coins.', 'Three roses and one skull.'],
    ['Win', 'Last player with influence.', 'Two successful challenges, or last player with discs.'],
  ],
  terms: [['Challenge (call someone’s claim)', 'Challenge (try to make your bid)'], ['Influence', 'Discs']],
  toA: 'Your bluffs are claims of a character power, and anyone at the table can call them.',
  toB: 'You bluff about how many roses you can flip, and must flip your own stack first.',
});

defineBridge({
  a: 'pandemic', b: 'forbidden-island',
  same: [
    'Everyone wins or loses together against the game.',
    'Each turn: take actions, draw 2 cards, then the threat spreads from its own deck.',
    'Trade cards to collect sets of the same colour to win.',
    'Each player has a role with a special power.',
  ],
  diff: [
    ['Actions per turn', '4.', '3.'],
    ['Threat', 'Disease cubes spread; outbreaks chain to neighbours.', 'Tiles flood, then sink if flooded again.'],
    ['Making progress', '5 cards of one colour at a research station cures a disease.', '4 treasure cards on that treasure’s tile captures it.'],
    ['Winning', 'Cure 4 diseases.', 'Capture 4 treasures, meet at Fools’ Landing, Helicopter Lift away.'],
    ['Losing', '8 outbreaks, out of cubes, or out of cards.', 'Key tiles sink, a player drowns, or the water reaches the skull.'],
  ],
  terms: [['Infection deck', 'Flood deck'], ['Epidemic', 'Waters Rise!'], ['Infection rate', 'Water level'], ['Discover a cure', 'Capture a treasure']],
  toA: 'You get one more action, and the threat is chain-reaction outbreaks rather than a shrinking board.',
  toB: 'The board shrinks as tiles sink, and you must escape together at the end, not just collect 4 sets.',
});

defineBridge({
  a: 'pandemic', b: 'spirit-island',
  same: [
    'Co-op: the table wins or loses together against a spreading threat.',
    'A card deck tells you where the threat will grow next.',
    'Too much damage in one spot spills into neighbouring areas.',
  ],
  diff: [
    ['Your character', 'A role with one or two powers.', 'A spirit with its own board, powers and play style.'],
    ['Turn shape', 'Players take turns.', 'Everyone acts at once each round.'],
    ['Actions', '4 actions per turn from a shared list.', 'Grow, then pay energy to play power cards.'],
    ['Winning', 'Cure 4 diseases.', 'Raise fear until the remaining invaders give up.'],
    ['Fighting back', 'Treat removes cubes.', 'Push and destroy invaders; Dahan locals fight with you.'],
  ],
  terms: [['Infection cards', 'Invader cards'], ['Disease cubes', 'Invaders'], ['Outbreak', 'Blight cascade'], ['Roles', 'Spirits']],
  toA: 'You take turns with 4 simple actions, and you win by collecting cards for cures, not by fighting the threat away.',
  toB: 'Everyone plays at once, each spirit plays very differently, and you win by scaring invaders off with fear.',
});
