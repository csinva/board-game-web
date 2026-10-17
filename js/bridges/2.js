// Bridges for KIN[20]..KIN[39]: explain one game in terms of a similar one.

defineBridge({
  a: 'dominion', b: 'dune-imperium',
  same: [
    'Everyone starts with the same weak 10-card deck and draws a hand of 5.',
    'Cards you buy go to your discard pile; when you need to draw and your deck is empty, shuffle your discard pile into a new deck.',
    'Trashing (removing) weak starting cards lets your good cards come up more often.',
    'Your deck is your engine; you must switch to scoring points in time.',
  ],
  diff: [
    ['What a card does', 'An Action card does what its text says when you play it; a Treasure card makes coins.', 'Either play it to send an agent to a space with a matching icon, or keep it for your reveal turn, when its bottom box counts.'],
    ['Turn shape', 'Each turn: play Action cards, buy cards, then discard everything and draw a new hand of 5.', 'Players take turns placing 1 agent each; once you are out of agents, you take 1 reveal turn to buy cards and add strength to the conflict.'],
    ['Market', '10 Kingdom piles, plus the Treasure and Victory piles, all visible all game.', 'A row of 5 face-up cards, refilled from a deck, plus a few cards that are always available.'],
    ['Interaction', 'Mostly you play your own deck; Attack cards hurt other players.', 'Agents block spaces, and every round ends in a conflict.'],
    ['Game end', 'At the end of the turn in which the Province pile, or any 3 supply piles, run out; count the Victory cards in your deck.', 'After the round in which someone reaches 10 VP, or when the conflict deck runs out; VP are kept on a track.'],
  ],
  terms: [['Coins', 'Persuasion'], ['Supply', 'Imperium Row'], ['Victory cards', 'Victory points on the track']],
  toA: 'No board: you play every card for its text in a single turn, and points are cards you buy that clog your deck.',
  toB: 'You play each card **either** for its top (send an agent onto the board) **or** on your reveal turn (its bottom box), never both.',
});

defineBridge({
  a: 'dominion', b: 'magic-the-gathering',
  same: [
    'Combinations of cards win; single cards are weak.',
    'You draw from your own shuffled deck, so each hand is partly luck.',
    'Turns follow fixed phases: Action, Buy, Clean-up in Dominion; untap, draw, main, combat, second main, end in Magic.',
  ],
  diff: [
    ['Deck building', 'During play, by buying from a shared supply.', 'Before the game, from your own collection (or by drafting).'],
    ['How you win', 'Most victory points at game end.', 'Reduce your opponent from 20 life to 0, or make them have to draw from an empty deck.'],
    ['Paying', 'Treasures in your hand make coins, then are discarded.', 'Lands stay in play and each can be tapped for mana once per turn; you may play at most 1 land per turn.'],
    ['Empty deck', 'Shuffle your discard pile to make a new deck.', 'No reshuffle; a player who must draw from an empty deck loses.'],
    ['Interaction', 'Mostly you play your own deck; a few Attack cards hurt other players.', 'Constant: creatures fight, and instants can be cast during your opponent’s turn.'],
  ],
  terms: [['Treasure cards', 'Lands (mana)'], ['Trash', 'Exile'], ['Action cards', 'Spells']],
  toA: 'Everyone starts with the same 10 cards and builds a deck during play from one shared supply, racing for points, not life.',
  toB: 'You build your deck before the game, and play is a fight: your creatures attack to take your opponent from 20 life to 0.',
});

defineBridge({
  a: '7-wonders', b: 'sushi-go',
  same: [
    'Everyone chooses 1 card from their hand at the same time, reveals it, and passes the rest of the hand to a neighbour.',
    'Watch which cards you pass to your neighbour.',
    'There are 3 rounds of drafting; the most points wins.',
    'Many cards score in sets, or for having more of something than other players.',
  ],
  diff: [
    ['Playing a card', 'Pay its cost to build it, use it to build a Wonder stage, or discard it for 3 coins.', 'Free: put it face up in front of you.'],
    ['Passing direction', 'Left in Ages I and III, right in Age II.', 'Always left.'],
    ['What carries over', 'Buildings stay all game and help in later Ages.', 'Every card except Pudding is discarded after each round.'],
    ['Interaction', 'Only with your 2 neighbours: buy resources from them, and compare military strength with them.', 'Majorities (most Maki, most Pudding) are compared against every player.'],
    ['Last card', 'Hands start at 7 cards; you play 6, and the last card each Age is discarded.', 'Every card is played; hand size depends on the number of players.'],
  ],
  terms: [['Ages', 'Rounds'], ['Military (beat your neighbours)', 'Maki rolls (most at the table)']],
  toA: 'Most cards cost resources (your own, or bought from your neighbours) to build, and buildings help in later Ages.',
  toB: 'Cards are free, and every card except Pudding is discarded after each round, so only that round’s sets count.',
});

defineBridge({
  a: '7-wonders', b: 'magic-the-gathering',
  same: [
    'You take 1 card from a hand of cards (a booster pack, in Magic) and pass the rest to a neighbour.',
    'Across the 3 rounds you pass left, then right, then left.',
    'Watch what your neighbours collect; sometimes take a card just so they can’t have it.',
  ],
  diff: [
    ['What a pick does', 'Used at once: build it, use it to build a Wonder stage, or discard it for 3 coins.', 'It goes into your pool of picks; you build a deck after the draft.'],
    ['After the draft', 'Nothing: the game ends with scoring after Age III.', 'Build a deck of at least 40 cards from your picks plus basic lands, then play matches.'],
    ['How you win', 'Most points across 7 scoring categories.', 'Reduce each opponent from 20 life to 0, one match at a time.'],
    ['Who you face', 'Your 2 neighbours, through military and trade.', 'One opponent at a time.'],
    ['Pack size', 'Each player gets a hand of 7 cards each Age.', 'Each player opens 3 packs of about 14–15 cards, one per round.'],
  ],
  terms: [['Ages I–III', 'Packs 1–3'], ['Discarding for 3 coins', 'Taking a card just to deny it']],
  toA: 'The draft is the whole game: you use each pick at once, and points are counted at the end with no matches.',
  toB: 'The draft only builds your pool of cards; then you make a deck and win one-on-one matches.',
});

defineBridge({
  a: 'carcassonne', b: 'kingdomino',
  same: [
    'Each turn you add 1 tile; it must connect to matching terrain already placed.',
    'Big connected areas of one terrain are worth the most.',
    'No hidden hands: everything placed is visible.',
  ],
  diff: [
    ['Whose map', 'One shared map.', 'Your own kingdom, at most 5×5 squares.'],
    ['Getting a tile', 'Draw a random tile.', 'Choose from a face-up row of dominoes; the better the domino you choose, the later you choose next round.'],
    ['Matching', 'Every edge the tile touches must match.', 'At least 1 square must touch a square of the same terrain (or your castle, which matches anything).'],
    ['Claiming', 'You may place 1 meeple on the tile you just placed to claim its road, city, monastery or field.', 'None: everything in your kingdom is yours.'],
    ['Scoring', 'Roads, cities and monasteries score when completed; fields and unfinished features score at game end.', 'Only at game end: each connected area of one terrain scores its squares × its crowns.'],
  ],
  terms: [['Tile', 'Domino'], ['Feature (city, road, field)', 'Area of one terrain'], ['Meeple', 'King (your picking pawn)']],
  toA: 'The map is shared, and you score only the features you claim with your 7 meeples, so where you place them matters.',
  toB: 'Your kingdom is your own and you choose your domino, but choosing a good one means choosing late next round.',
});

defineBridge({
  a: 'kingdomino', b: 'cascadia',
  same: [
    'You take a piece from a small shared display and add it to your own area.',
    'Large connected areas of one terrain or habitat score.',
    'No attacks; the interaction is taking the piece another player wanted.',
  ],
  diff: [
    ['Pieces', 'Dominoes of 2 terrain squares, some squares with crowns.', 'Hex habitat tiles, each paired with a wildlife token.'],
    ['Placement', 'At least 1 square must touch matching terrain (or your castle), and your kingdom must fit within 5×5.', 'The tile must touch one of your tiles; terrains need not match and there is no size limit.'],
    ['Scoring', 'Each connected area of one terrain scores its squares × its crowns.', 'Your largest area of each habitat, plus wildlife patterns set by the public scoring cards.'],
    ['Turn order', 'Set by the dominoes picked: the player whose domino is first in the row goes first next round.', 'Fixed, clockwise.'],
    ['Bad pieces', 'A domino you can’t place is discarded.', 'A token you can’t place goes back to the bag; spending a nature token lets you take a tile and token that aren’t paired.'],
  ],
  terms: [['Terrain', 'Habitat'], ['Connected area', 'Habitat corridor']],
  toA: 'Placement is tight (match one terrain, stay within 5×5), and an area scores only if it has crowns: squares × crowns.',
  toB: 'About half your points come from wildlife tokens, placed in the patterns that the scoring cards ask for.',
});

defineBridge({
  a: 'kingdomino', b: 'patchwork',
  same: [
    'You fill a small grid of your own with pieces from a shared offer.',
    'Taking the strong piece now costs you time later: a later pick (Kingdomino) or a later turn (Patchwork).',
    'Open information: you see what other players build.',
  ],
  diff: [
    ['Players', '2–4.', 'Exactly 2.'],
    ['Cost of a piece', 'Free, but the better the domino you take, the later you pick next round.', 'Buttons, plus time; the player further behind on the time track moves next.'],
    ['Placement', 'At least 1 square must touch matching terrain, or your castle.', 'Anywhere it fits on your 9×9 quilt; you may rotate and flip it.'],
    ['Scoring', 'Each connected area of one terrain scores its squares × its crowns.', 'Your buttons, minus 2 per empty square; the first player to fill a 7×7 square gets a 7-point bonus.'],
    ['Empty spaces', 'No penalty in the basic rules.', 'Each empty square costs 2 points at the end.'],
  ],
  terms: [['Kingdom', 'Quilt'], ['Domino', 'Patch'], ['Crowns', 'Buttons on patches']],
  toA: 'Pieces are free and empty squares cost nothing; the trade-off is a better domino now versus picking first next round.',
  toB: 'Every patch costs buttons and time, and each empty square costs 2 points at the end.',
});

defineBridge({
  a: 'azul', b: 'cascadia',
  same: [
    'You take pieces from a shared display, then place them on your own board.',
    'Scoring rewards patterns, so plan where a piece will go before you take it.',
    'Interaction is indirect: you take what other players want.',
  ],
  diff: [
    ['Taking', 'Every tile of one colour from one factory, or from the centre.', 'One of 4 pairs of a habitat tile and a wildlife token (spending a nature token lets you split a pair).'],
    ['Leftovers', 'Tiles you can’t place go to your floor line and cost you points.', 'A token you can’t place goes back to the bag, with no penalty.'],
    ['Board', 'A fixed 5×5 wall where each colour has set spaces.', 'An open-ended map of hex tiles.'],
    ['When you score', 'Each round, as tiles reach your wall, plus bonuses at game end.', 'Only at game end.'],
    ['Game end', 'At the end of the round in which a player completes a horizontal row on their wall.', 'After each player has taken 20 turns.'],
  ],
  terms: [['Factories', 'The 4 tile + token pairs'], ['Pattern lines', 'Wildlife scoring cards']],
  toA: 'You must take **every** tile of the colour you choose, and any tile you can’t place costs points.',
  toB: 'Each pick is a habitat tile and an animal together, and the tile you want often comes with the wrong animal.',
});

defineBridge({
  a: 'chess', b: 'go',
  same: [
    'Two players, no luck, nothing hidden.',
    'Players take turns, making 1 move per turn.',
    'Openings and endgames are studied; reading ahead is the core skill.',
  ],
  diff: [
    ['Goal', 'Checkmate the enemy king.', 'Score more points: the empty points you surround, plus stones you capture.'],
    ['Pieces', '6 types, each moving differently.', 'Identical stones that never move once placed.'],
    ['Capturing', 'Move onto an enemy piece’s square.', 'Fill every liberty (empty point next to it) of an enemy group; the group is removed.'],
    ['Board', '8×8; each player starts with 16 pieces on the board.', '19×19 (9×9 or 13×13 to learn); it starts empty.'],
    ['First move', 'White moves first; draws are common.', 'Black moves first; White gets komi, 6.5 or 7.5 bonus points, so there are no ties.'],
  ],
  terms: [['Check', 'Atari (one liberty left)'], ['Captured pieces', 'Prisoners']],
  toA: 'Pieces move and capture by landing on each other, and the game ends the moment a king is trapped.',
  toB: 'Nothing moves: you place stones to wall off territory, and you can lose a fight and still win on points.',
});

defineBridge({
  a: 'scrabble', b: 'codenames',
  same: [
    'Vocabulary and word association are the main skills.',
    'Short turns; a good word now beats long plans.',
  ],
  diff: [
    ['Players', '2–4, each for themselves.', 'Two teams, each with one spymaster.'],
    ['What you make', 'Real words from the 7 letter tiles on your rack, placed on the board.', 'The spymaster gives a one-word clue plus a number: how many of the team’s words on the table it links.'],
    ['Luck', 'Random letter tiles drawn from a bag.', 'A random grid of 25 words, and a random key card that only the spymasters see.'],
    ['Scoring', 'Each word scores its letter values, boosted by premium squares; the highest total wins.', 'The first team to touch all its words wins; a team that touches the assassin loses at once.'],
    ['Valid words', 'Must be in the agreed dictionary; any player may challenge a play.', 'A clue can’t be a word on the table or part of one.'],
  ],
  terms: [],
  toA: 'No teams or clues: you spell real words from random letter tiles and score their values on a board.',
  toB: 'You never spell: one player hints at several words with one clue, and teammates guess which words they are.',
});

defineBridge({
  a: 'clue', b: 'love-letter',
  same: [
    'You deduce hidden cards by elimination.',
    'What other players play or show reveals what they hold.',
    'Correctly naming a hidden card wins the game (Clue) or knocks a player out of the round (Love Letter).',
  ],
  diff: [
    ['What is hidden', '3 cards in the envelope: a suspect, a weapon and a room.', '1 card in each player’s hand, plus 1 card set aside face down at the start of each round.'],
    ['Getting info', 'Make a suggestion; the first player to your left who holds a named card privately shows you 1 of them.', 'Play the Priest to look at another player’s hand; track the face-up discards.'],
    ['Wrong guesses', 'A wrong accusation puts you out of the game (you still show cards to disprove suggestions).', 'A wrong Guard guess: nothing happens.'],
    ['Length', 'One game, 45–60 minutes.', 'Several rounds of about 5 minutes; each round’s winner gets a favor token.'],
    ['Knockouts', 'Only by your own wrong accusation.', 'Cards like the Guard and Baron knock a player out of the current round.'],
  ],
  terms: [['Being shown a card', 'Priest (look at a hand)'], ['Accusation', 'Guard (name their card)']],
  toA: 'Everyone hunts the same 3 hidden cards, and you get only 1 accusation, so wait until your notes are certain.',
  toB: 'The hidden cards are in your opponents’ hands and change every turn; a correct Guard guess knocks that player out of the round.',
});

defineBridge({
  a: 'secret-hitler', b: 'avalon',
  same: [
    'The evil players know each other (except in Secret Hitler with 7+ players, where Hitler doesn’t know the fascists); the larger good team doesn’t know who anyone is.',
    'A leader proposes, then everyone votes on the proposal openly, at the same time.',
    'Evil players sabotage by secretly playing cards that are revealed without saying who played them.',
    'Rejected proposals hurt good: after 3 in a row, Secret Hitler enacts the top policy; after 5 in a row, Avalon’s evil team wins.',
  ],
  diff: [
    ['What is chosen', 'The President nominates 1 Chancellor.', 'The leader picks a whole quest team.'],
    ['Secret plays', 'The President draws 3 policies and discards 1; the Chancellor enacts 1 of the other 2. The deck is mostly fascist, so even 2 liberals may be forced to enact a fascist policy.', 'Good players must play Success; evil players may play Success or Fail, so any Fail proves evil is on the team.'],
    ['Key character', 'Hitler: if elected Chancellor after 3 fascist policies are enacted, fascists win; if executed, liberals win.', 'Merlin knows who is evil; if good wins 3 quests, the Assassin then names one player, and if that is Merlin, evil wins.'],
    ['Removing players', 'After certain fascist policies, the President must execute a player.', 'No one is ever out.'],
    ['Win', 'Liberals win by enacting 5 liberal policies; fascists by enacting 6 fascist policies.', 'Good wins by succeeding on 3 of 5 quests; evil wins when 3 quests fail.'],
  ],
  terms: [['President', 'Leader'], ['Ja! / Nein', 'Approve / Reject'], ['Liberals / Fascists', 'Good / Evil'], ['Election tracker', 'Vote track']],
  toA: 'The policy deck is mostly fascist, so an honest government can still be forced to enact a fascist policy; one bad policy proves nothing.',
  toB: 'Good players can only play Success, so any Fail proves an evil player was on the team.',
});

defineBridge({
  a: 'avalon', b: 'werewolf',
  same: [
    'A hidden evil team plays among a larger good team; the evil players know each other.',
    'One good role starts with secret information (Merlin knows who is evil; the Seer looks at cards) and must hint at it without being exposed.',
    'Most of the game is talk: claims, accusations and lies.',
  ],
  diff: [
    ['Length', 'Up to 5 quests, about 30 minutes.', 'One night and one vote, about 10 minutes.'],
    ['Your role', 'Fixed all game.', 'Other roles may swap your card at night; at the end, your team is whatever card is in front of you.'],
    ['Evidence', 'How players voted on teams, and how many Fail cards each quest got.', 'What roles saw or did at night, and what people claim.'],
    ['Deciding vote', 'Many votes on teams; nobody dies.', 'One vote, everyone pointing at once; the player with the most votes dies.'],
    ['Win', 'Good: succeed on 3 quests, then Merlin must survive the Assassin’s guess. Evil: 3 quests fail.', 'The village wins if at least 1 werewolf dies; the werewolves win if none does.'],
  ],
  terms: [['Good team', 'Village team'], ['Minions of Mordred', 'Werewolves'], ['Merlin', 'Seer']],
  toA: 'Roles never change, and evidence builds over 5 quests from team votes and Fail counts.',
  toB: 'Your card may be swapped at night, so you can end the game on the other team without knowing it.',
});

defineBridge({
  a: 'avalon', b: 'coup',
  same: [
    'Bluffing and reading other players’ bluffs decide the game.',
    'Your role is secret.',
  ],
  diff: [
    ['Teams', 'Good against evil.', 'Every player for themselves.'],
    ['Your cards', '1 role card, fixed all game.', '2 face-down influence cards; you may claim to hold any character, true or not.'],
    ['Calling lies', 'Vote to reject teams, and argue.', 'Any player may challenge a claim; if it was false, the claimer loses 1 influence card; if true, the challenger does.'],
    ['Removing players', 'No one is ever out.', 'A player who loses both influence cards is out.'],
    ['Win', 'Your team wins: good by succeeding on 3 of 5 quests, evil when 3 quests fail.', 'The last player with any influence wins.'],
  ],
  terms: [],
  toA: 'You bluff about which team you are on, and you win or lose with that team.',
  toB: 'You may claim any character’s power, true or not; any player can challenge, and whoever is wrong loses 1 influence card.',
});

defineBridge({
  a: 'werewolf', b: 'blood-on-the-clocktower',
  same: [
    'Good players hunt hidden evil players, who lie about who they are.',
    'Roles act secretly at night; in the day, everyone talks openly and makes claims.',
    'The group votes on whom to kill.',
  ],
  diff: [
    ['Length', 'One night and one vote, about 10 minutes.', 'Several days and nights, 30 minutes to 2 hours.'],
    ['Who runs it', 'An app, or a narrator reading a script, wakes each night role in turn.', 'A Storyteller runs the nights and makes some of the choices.'],
    ['Roles', 'Your card may be swapped at night, so you may end on the other team.', 'Roles rarely change; a drunk or poisoned player may be given false information.'],
    ['Death', 'The one vote ends the game.', 'Dead players stay in the game, keep talking, and keep 1 vote for the rest of the game.'],
    ['Win', 'The village wins if at least 1 werewolf dies.', 'Good wins when the Demon dies; evil wins when only 2 players are left alive.'],
  ],
  terms: [['Werewolf', 'Demon (Imp)'], ['Village team', 'Good team'], ['Narrator', 'Storyteller']],
  toA: 'One night and one vote is the whole game, and your card may have been swapped, so you may not know your own team.',
  toB: 'Many days: the Demon kills each night and dead players keep talking, so information builds up over the game.',
});

defineBridge({
  a: 'secret-hitler', b: 'blood-on-the-clocktower',
  same: [
    'A hidden evil team is outnumbered by good players who don’t know who anyone is.',
    'Evil has one key player (Hitler; the Demon); if that player is killed, good wins.',
    'Players make public accusations and claims; votes decide the big decisions.',
  ],
  diff: [
    ['Running the game', 'No moderator.', 'A Storyteller runs the nights and can change some outcomes.'],
    ['Who dies', 'Only the President, alone, using the execution power some fascist policies give.', 'Players nominate, and the whole group votes to execute.'],
    ['Dead players', 'Out of the game: no talking or voting.', 'Stay in the game, keep talking, and keep 1 vote for the rest of the game.'],
    ['Information', 'Which policies were enacted, and the President’s loyalty investigations.', 'Night abilities, which may give false information if you are drunk or poisoned.'],
    ['Win', 'Liberals: 5 liberal policies, or Hitler executed. Fascists: 6 fascist policies, or Hitler elected Chancellor after 3 fascist policies.', 'Good wins when the Demon dies; evil wins when only 2 players are left alive.'],
  ],
  terms: [['Liberals', 'Good team'], ['Fascists', 'Minions'], ['Hitler', 'Demon']],
  toA: 'Evidence comes from which policies were enacted and who nominated whom, and only the President can execute.',
  toB: 'Players vote to execute, dead players keep talking, and your information can be false if you are drunk or poisoned.',
});

defineBridge({
  a: 'coup', b: 'love-letter',
  same: [
    'Small card games where each character has a power.',
    'Players are knocked out until 1 remains.',
    'What you play hints at what you hold.',
  ],
  diff: [
    ['Cards held', '2 face-down influence cards (your lives).', '1 card; on your turn, draw a second card, then play 1 of the 2.'],
    ['Bluffing', 'You may claim any character, whether you hold it or not.', 'You can play only cards you hold; you bluff only through which card you keep.'],
    ['Resources', 'Coins: an assassination costs 3 coins, a Coup 7.', 'None; only the cards.'],
    ['Knockouts', 'You lose 1 influence card to a lost challenge, an assassination or a Coup; lose both and you are out of the game.', 'A correct Guard guess or a lost Baron comparison knocks you out, but only of the current round.'],
    ['Length', 'One game; the last player standing wins.', 'Several rounds; the first player to the target number of favor tokens wins.'],
  ],
  terms: [['Influence', 'Your hand card'], ['Ambassador (exchange with deck)', 'Chancellor (draw 2, keep 1)']],
  toA: 'You need not hold a character to use its power; a lie costs you a card only if someone challenges it.',
  toB: 'You can play only cards you hold, and being knocked out costs you only the current round.',
});

defineBridge({
  a: 'coup', b: 'skull',
  same: [
    'Pure bluffing: make a claim and dare the other players to call it.',
    'Losing a challenge costs you 1 card (Coup) or 1 disc (Skull); a player with none left is out.',
    'Reading people matters more than card text.',
  ],
  diff: [
    ['What you claim', 'Which character you hold.', 'How many discs you can flip without revealing a skull.'],
    ['Calling a bluff', 'Any player may challenge; whoever is wrong loses 1 influence card.', 'Each other player in turn raises the bid or passes; the highest bidder must flip that many discs.'],
    ['Pieces', '2 character cards, and coins.', '4 discs: 3 roses and 1 skull.'],
    ['Win', 'The last player with any influence.', 'Win 2 challenges, or be the last player with any discs.'],
  ],
  terms: [['Challenge (call someone’s claim)', 'Challenge (try to make your bid)'], ['Influence', 'Discs']],
  toA: 'Each bluff is a claim to hold a character, and any player at the table can call it.',
  toB: 'You bid how many roses you can flip, and must flip all of your own discs first.',
});

defineBridge({
  a: 'pandemic', b: 'forbidden-island',
  same: [
    'Everyone wins or loses together.',
    'On your turn: take your actions, draw 2 cards, then draw from a separate threat deck (infection; flood) to spread the threat.',
    'Players give cards to each other to collect sets of one colour.',
    'Each player has a role with a special power.',
  ],
  diff: [
    ['Actions per turn', 'Up to 4.', 'Up to 3.'],
    ['Threat', 'Infection cards add disease cubes to cities; a 4th cube in a city causes an outbreak, adding 1 cube to each connected city, which can set off more outbreaks.', 'Flood cards flip tiles to their flooded side; a flooded tile that is drawn again sinks and is removed.'],
    ['Progress', 'While in a city with a research station, discard 5 cards of one colour to cure that disease.', 'While on one of that treasure’s 2 tiles, discard 4 matching treasure cards to capture it.'],
    ['Winning', 'Cure all 4 diseases.', 'Capture all 4 treasures, then gather every player on Fools’ Landing and play a Helicopter Lift card.'],
    ['Losing', 'The 8th outbreak, or a disease cube or player card is needed and none are left.', 'Both tiles of an uncaptured treasure sink, Fools’ Landing sinks, a player can’t swim off a sinking tile, or the water level reaches the skull.'],
  ],
  terms: [['Infection deck', 'Flood deck'], ['Epidemic', 'Waters Rise!'], ['Infection rate', 'Water level'], ['Discover a cure', 'Capture a treasure']],
  toA: 'You get 4 actions per turn instead of 3, and the threat is chain-reaction outbreaks, not a shrinking board.',
  toB: 'The board shrinks as tiles sink, and after collecting the 4 treasures you must all escape together from Fools’ Landing.',
});

defineBridge({
  a: 'pandemic', b: 'spirit-island',
  same: [
    'Everyone plays together against a spreading threat.',
    'A card deck shows where the threat grows next.',
    'Too much damage in one place spills into neighbouring places.',
  ],
  diff: [
    ['Your character', 'A role with 1–2 special powers.', 'A spirit with its own board, powers and play style.'],
    ['Turn shape', 'Players take turns, one at a time.', 'All players act at the same time each round.'],
    ['Actions', 'Up to 4 per turn, chosen from a list everyone shares.', 'Each round, choose a growth option, then pay energy to play power cards.'],
    ['Winning', 'Cure all 4 diseases.', 'Raise fear high enough, or clear the island of invaders.'],
    ['Fighting back', 'The Treat Disease action removes cubes.', 'Powers push and destroy invaders; the Dahan (the island’s people) fight alongside you.'],
  ],
  terms: [['Infection cards', 'Invader cards'], ['Disease cubes', 'Invaders'], ['Outbreak', 'Blight cascade'], ['Roles', 'Spirits']],
  toA: 'Players take turns with up to 4 simple actions, and you win by collecting cards for cures, not by fighting the threat.',
  toB: 'Everyone acts at the same time, each spirit plays very differently, and you win mainly by raising fear.',
});
