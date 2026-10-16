// Bridges for KIN[20]..KIN[39]: explain one game in terms of a similar one.

defineBridge({
  a: 'dominion', b: 'dune-imperium',
  same: [
    'Everyone starts with the same weak 10-card deck and draws 5.',
    'Bought cards go to your discard pile; reshuffle it when your deck runs out.',
    'Trashing weak starting cards lets your good cards come up more often.',
    'The deck is your engine; you must switch to scoring points in time.',
  ],
  diff: [
    ['What a card does', 'Actions do their text when played; Treasures make coins.', 'Sends an agent to a matching space, or is revealed for its bottom box.'],
    ['Turn shape', 'One turn: play actions, buy, draw a new hand of 5.', 'Place agents one per turn, then one reveal turn to buy and fight.'],
    ['Market', '10 kingdom piles plus Treasure and Victory piles, visible all game.', 'A row of 5 face-up cards refilled from a deck, plus a few always-available cards.'],
    ['Interaction', 'Mostly your own deck; Attack cards hit others.', 'Agents block spaces, and every round ends in combat.'],
    ['Game end', 'Provinces or any 3 supply piles run out; count VP cards in your deck.', 'Someone reaches 10 VP (finish the round), or conflicts run out; VP on a track.'],
  ],
  terms: [['Coins', 'Persuasion'], ['Supply', 'Imperium Row'], ['Victory cards', 'Victory points on the track']],
  toA: 'No board: every card is played for its text in one turn, and points are cards you buy that clog your deck.',
  toB: 'Each card is played **either** as an agent (top, onto the board) **or** saved for your reveal turn (bottom box), never both.',
});

defineBridge({
  a: 'dominion', b: 'magic-the-gathering',
  same: [
    'Card combos win; single cards are weak.',
    'You draw from your own shuffled deck, so each hand is partly luck.',
    'Turns follow fixed phases: Action, Buy, Clean-up in Dominion; untap, draw, main, combat, second main, end in Magic.',
  ],
  diff: [
    ['Deck building', 'During play, from a shared supply.', 'Before the game, from your own collection (or by drafting).'],
    ['How you win', 'Most victory points at game end.', 'Take your opponent from 20 life to 0 (or they must draw from an empty deck).'],
    ['Paying', 'Treasures in hand make coins, then are discarded.', 'Lands stay in play and tap for mana each turn; play at most 1 land a turn.'],
    ['Empty deck', 'Shuffle your discard pile into a new deck.', 'No reshuffle; drawing from an empty library loses.'],
    ['Interaction', 'Mostly solitaire; a few Attack cards.', 'Constant: creatures fight, and instants can be cast on the opponent’s turn.'],
  ],
  terms: [['Treasure cards', 'Lands (mana)'], ['Trash', 'Exile'], ['Action cards', 'Spells']],
  toA: 'Everyone starts with the same 10 cards and builds a deck during play from one shared supply, racing for points, not life.',
  toB: 'You build your deck before the game, and play is a fight: creatures attack to take your opponent from 20 life to 0.',
});

defineBridge({
  a: '7-wonders', b: 'sushi-go',
  same: [
    'Everyone picks 1 card at once, reveals, and passes the rest.',
    'Watch what you pass to your neighbour.',
    '3 rounds of drafting; most points wins.',
    'Many cards score in sets or for having the most of something.',
  ],
  diff: [
    ['Playing a card', 'Pay its cost to build it, use it for a Wonder stage, or discard it for 3 coins.', 'Free: it goes in front of you.'],
    ['Passing direction', 'Left in Ages I and III, right in Age II.', 'Always left.'],
    ['What carries over', 'Buildings stay all game and help later Ages.', 'Everything except Pudding is discarded after each round.'],
    ['Interaction', 'Neighbours only: buy their resources, compare military.', 'Majorities (Maki, Pudding) are against the whole table.'],
    ['Last card', 'Hands start at 7; the 7th card is discarded.', 'Every card is played; hand size depends on player count.'],
  ],
  terms: [['Ages', 'Rounds'], ['Military (beat your neighbours)', 'Maki rolls (most at the table)']],
  toA: 'Most cards cost resources (yours or bought from neighbours) to build, and buildings help in later Ages.',
  toB: 'Cards are free, and all but Pudding are discarded after each round, so only that round’s sets count.',
});

defineBridge({
  a: '7-wonders', b: 'magic-the-gathering',
  same: [
    'Pick 1 card from a hand (a pack in Magic), pass the rest.',
    'Passing goes left, right, then left across 3 rounds.',
    'Read what neighbours collect, and sometimes take a card to deny it.',
  ],
  diff: [
    ['What a pick does', 'Used now: build it, use it for a Wonder stage, or discard it for 3 coins.', 'Goes into your pool; you build a deck after the draft.'],
    ['After the draft', 'Nothing: the game ends with scoring after Age III.', 'Build a 40-card deck from your picks plus lands, then play matches.'],
    ['How you win', 'Most points across 7 scoring categories.', 'Take each opponent from 20 life to 0, one-on-one.'],
    ['Who you face', 'Your two neighbours, through military and trade.', 'One opponent at a time.'],
    ['Pack size', '7 cards per hand, one hand per player each Age.', 'About 14–15 cards per pack, 3 packs each.'],
  ],
  terms: [['Ages I–III', 'Packs 1–3'], ['Discarding for 3 coins', 'Taking a card just to deny it']],
  toA: 'The draft is the whole game: each pick is used immediately, and points are counted at the end with no matches.',
  toB: 'The draft only builds your card pool; then you make a deck and win head-to-head games.',
});

defineBridge({
  a: 'carcassonne', b: 'kingdomino',
  same: [
    'Add one tile a turn; it must match terrain already there.',
    'Big connected areas of one terrain are worth the most.',
    'No hidden hands: every board is visible.',
  ],
  diff: [
    ['Whose map', 'One shared map.', 'Your own 5×5 kingdom.'],
    ['Getting a tile', 'Draw a random tile from the bag.', 'Pick from a visible line; a better domino means picking later next round.'],
    ['Matching', 'Every touching edge must match.', 'Only one touching square must match (or touch your castle).'],
    ['Claiming', 'Place a meeple to own a road, city, monastery or field.', 'None: everything in your kingdom is yours.'],
    ['Scoring', 'When features finish, plus fields and unfinished ones at the end.', 'Only at the end: squares × crowns for each area.'],
  ],
  terms: [['Tile', 'Domino'], ['Feature (city, road, field)', 'Area of one terrain'], ['Meeple', 'King (your picking pawn)']],
  toA: 'The map is shared, and you score only what you claim with your 7 meeples, so where they sit matters.',
  toB: 'Your kingdom is private and you choose your domino, but a good pick means choosing late next round.',
});

defineBridge({
  a: 'kingdomino', b: 'cascadia',
  same: [
    'Take a piece from a small shared display and add it to your own area.',
    'Large connected areas of one terrain or habitat score.',
    'No attacks; interaction is taking the piece someone else wanted.',
  ],
  diff: [
    ['Pieces', 'Dominoes of two terrain squares, some with crowns.', 'Hex habitat tiles, each paired with a wildlife token.'],
    ['Placement', 'One touching square must match; stay within 5×5.', 'Touch one of your tiles; no matching or size limit.'],
    ['Scoring', 'Squares × crowns for each connected area.', 'Largest area of each habitat, plus wildlife patterns from scoring cards.'],
    ['Turn order', 'Set by which domino you picked.', 'Fixed, clockwise.'],
    ['Bad pieces', 'A domino you can’t place is discarded.', 'An unplaceable token goes back to the bag; nature tokens let you split pairs.'],
  ],
  terms: [['Terrain', 'Habitat'], ['Connected area', 'Habitat corridor']],
  toA: 'Placement is tight (match one terrain, stay within 5×5), and crowns, not size alone, make an area pay.',
  toB: 'Half your points come from wildlife tokens placed in the patterns the scoring cards set.',
});

defineBridge({
  a: 'kingdomino', b: 'patchwork',
  same: [
    'Fill a small personal grid with pieces from a shared offer.',
    'Taking the strong piece now costs you tempo later.',
    'Open information: you see what others build.',
  ],
  diff: [
    ['Players', '2–4.', 'Exactly 2.'],
    ['Cost of a piece', 'Free, but a better domino means picking later next round.', 'Buttons, plus time; whoever is behind on time moves next.'],
    ['Placement', 'One touching square must match a terrain, or touch your castle.', 'Anywhere on your 9×9 quilt; pieces rotate and flip.'],
    ['Scoring', 'Squares × crowns for each connected area.', 'Buttons, minus 2 per empty square; first to fill a 7×7 area earns +7.'],
    ['Empty spaces', 'No penalty in the basic rules.', 'Each costs 2 points at the end.'],
  ],
  terms: [['Kingdom', 'Quilt'], ['Domino', 'Patch'], ['Crowns', 'Buttons on patches']],
  toA: 'Pieces are free and holes don’t hurt; the trade-off is a better domino versus picking first next round.',
  toB: 'Every patch costs buttons and time, and each empty square costs 2 at the end.',
});

defineBridge({
  a: 'azul', b: 'cascadia',
  same: [
    'Take from a shared display, then place it on your own board.',
    'Scoring rewards patterns, so plan a piece’s spot before taking it.',
    'Interaction is indirect: you take what others want.',
  ],
  diff: [
    ['Taking', 'All tiles of one colour from one factory or the centre.', 'One of 4 tile + animal pairs (a nature token lets you split them).'],
    ['Leftovers', 'Tiles that don’t fit fall to your floor line and cost points.', 'An animal you can’t place goes back to the bag, no penalty.'],
    ['Board', 'A fixed 5×5 wall with set colour positions.', 'An open-ended map of hex tiles.'],
    ['When you score', 'Each round as tiles reach the wall, plus end bonuses.', 'Only at the end.'],
    ['Game end', 'After the round in which someone completes a row.', 'After 20 turns each.'],
  ],
  terms: [['Factories', 'The 4 tile + token pairs'], ['Pattern lines', 'Wildlife scoring cards']],
  toA: 'You must take **every** tile of your chosen colour, and anything that doesn’t fit costs points.',
  toB: 'Each pick is a habitat tile and an animal together, and the tile you want often comes with the wrong animal.',
});

defineBridge({
  a: 'chess', b: 'go',
  same: [
    'Two players, no luck, nothing hidden.',
    'Players alternate single moves.',
    'Openings and endgames are studied; reading ahead is the core skill.',
  ],
  diff: [
    ['Goal', 'Checkmate the enemy king.', 'Surround more empty points than your opponent (plus captures).'],
    ['Pieces', '6 types, each moving differently.', 'Identical stones that never move once placed.'],
    ['Capturing', 'Move onto an enemy piece.', 'Fill every liberty (adjacent empty point) of an enemy group.'],
    ['Board', '8×8, full army at the start.', '19×19 (9×9 or 13×13 to learn), starts empty.'],
    ['First move', 'White moves first; draws are common.', 'Black moves first; White gets komi (6.5 or 7.5), so no ties.'],
  ],
  terms: [['Check', 'Atari (one liberty left)'], ['Captured pieces', 'Prisoners']],
  toA: 'Pieces move and capture by landing on each other, and the game ends the moment a king is trapped.',
  toB: 'Nothing moves: you place stones to wall off territory, and you can lose a fight and still win on points.',
});

defineBridge({
  a: 'scrabble', b: 'codenames',
  same: [
    'Vocabulary and word association are the main skill.',
    'Short turns; a good word now beats long plans.',
  ],
  diff: [
    ['Players', '2–4, each for themselves.', 'Two teams, each with one spymaster.'],
    ['What you make', 'Real words from your 7 letter tiles, on a grid.', 'A one-word clue plus a number linking words on the table.'],
    ['Luck', 'Random tiles drawn from a bag.', 'Random 25-word grid and secret key card.'],
    ['Scoring', 'Letter values and premium squares; highest total wins.', 'First team to find all its agents wins; touching the assassin loses.'],
    ['Valid words', 'Must be in the agreed dictionary; plays can be challenged.', 'A clue can’t be a word on the table or part of one.'],
  ],
  terms: [],
  toA: 'No teams or clues: spell real words from random letter tiles and score their values on a board.',
  toB: 'You never spell: one player hints at several words at once, and teammates guess which.',
});

defineBridge({
  a: 'clue', b: 'love-letter',
  same: [
    'Deduce hidden cards by elimination.',
    'What others play or show reveals what they hold.',
    'Correctly naming a hidden card wins (Clue) or knocks a player out (Love Letter).',
  ],
  diff: [
    ['What is hidden', '3 cards in the envelope: suspect, weapon, room.', 'One card in each player’s hand, plus one removed from the deck.'],
    ['Getting info', 'Suggest; the next player who can shows you one card.', 'The Priest peeks at a hand; count the discards.'],
    ['Wrong guesses', 'Wrong accusation: you are out (but still show cards).', 'Wrong Guard guess: nothing happens.'],
    ['Length', 'One game, 45–60 minutes.', 'Several 5-minute rounds; win favor tokens.'],
    ['Knockouts', 'Only by a wrong accusation.', 'Cards like Guard and Baron knock others out of the round.'],
  ],
  terms: [['Being shown a card', 'Priest (look at a hand)'], ['Accusation', 'Guard (name their card)']],
  toA: 'Everyone hunts the same 3 hidden cards, and you get one accusation, so wait until your notes are sure.',
  toB: 'The hidden cards are in opponents’ hands and change every turn; a correct Guard guess knocks a player out.',
});

defineBridge({
  a: 'secret-hitler', b: 'avalon',
  same: [
    'A small evil team mostly knows each other (7+ players: Hitler doesn’t); the good majority doesn’t.',
    'A leader proposes, then everyone votes publicly at once.',
    'Evil sabotages with secret cards revealed without names.',
    'Too many failed votes in a row hurts good.',
  ],
  diff: [
    ['What is chosen', 'The President nominates one Chancellor.', 'The leader picks a whole quest team.'],
    ['Secret plays', 'Policies come from a mostly fascist deck; a liberal may be forced to pass a fascist one.', 'Good must play Success, so any Fail proves evil is on the team.'],
    ['Key character', 'Hitler: elected Chancellor after 3 fascist policies = fascists win; executed = liberals win.', 'Merlin knows evil; if the Assassin names him at the end, evil wins.'],
    ['Removing players', 'The President can execute players.', 'No one is ever out.'],
    ['Win', 'Liberals: 5 liberal policies; fascists: 6 fascist policies.', 'Good: 3 of 5 quests; evil: 3 failed quests.'],
  ],
  terms: [['President', 'Leader'], ['Ja! / Nein', 'Approve / Reject'], ['Liberals / Fascists', 'Good / Evil'], ['Election tracker', 'Vote track']],
  toA: 'The deck is stacked, so an honest government can still pass a fascist policy; a bad law proves nothing.',
  toB: 'Good players can only play Success, so any Fail proves evil was on the team.',
});

defineBridge({
  a: 'avalon', b: 'werewolf',
  same: [
    'A hidden evil team among a good majority; evil players know each other.',
    'A good role starts with secret information and must hint without being exposed.',
    'Most of the game is talk: claims, accusations and lies.',
  ],
  diff: [
    ['Length', 'Up to 5 quests, about 30 minutes.', 'One night and one vote, about 10 minutes.'],
    ['Your role', 'Fixed all game.', 'May be swapped at night; you are the card in front of you at the end.'],
    ['Evidence', 'Team votes and quest Fail counts.', 'What roles saw or did at night, and what people claim.'],
    ['Deciding vote', 'Many team votes; nobody dies.', 'One simultaneous vote; the most-voted player dies.'],
    ['Win', 'Good: 3 quests (and Merlin survives the Assassin); evil: 3 failed quests.', 'Village: a werewolf dies; werewolves: no werewolf dies.'],
  ],
  terms: [['Good team', 'Village team'], ['Minions of Mordred', 'Werewolves'], ['Merlin', 'Seer']],
  toA: 'Roles never change, and evidence builds over 5 quests from team votes and Fail counts.',
  toB: 'Your card may be swapped at night, so you can end on the other team without knowing.',
});

defineBridge({
  a: 'avalon', b: 'coup',
  same: [
    'Bluffing and reading bluffs decide the game.',
    'Your role is secret.',
  ],
  diff: [
    ['Teams', 'Good vs evil.', 'Every player for themselves.'],
    ['Your cards', 'One fixed role.', 'Two influence cards; you may claim any character, true or not.'],
    ['Calling lies', 'Reject teams and argue.', 'Challenge a claim; whoever is wrong loses an influence.'],
    ['Removing players', 'No one is out.', 'Lose both influence and you are out.'],
    ['Win', 'Your team wins 3 of 5 quests.', 'Last player with influence wins.'],
  ],
  terms: [],
  toA: 'You bluff about which team you are on, and you win or lose with that team.',
  toB: 'Claim any character’s power, true or not; anyone can challenge, and whoever is wrong loses a card.',
});

defineBridge({
  a: 'werewolf', b: 'blood-on-the-clocktower',
  same: [
    'Good players hunt hidden evil players, who lie about who they are.',
    'Roles act secretly at night; the day is open talk and claims.',
    'The group votes on who dies.',
  ],
  diff: [
    ['Length', 'One night, one vote, about 10 minutes.', 'Several days and nights, 30 minutes to 2 hours.'],
    ['Who runs it', 'An app or narrator script calls the night roles.', 'A Storyteller runs the night and makes some choices.'],
    ['Roles', 'Cards can be swapped, so you may change teams.', 'Roles rarely change; drunk or poisoned players get false info.'],
    ['Death', 'The one vote ends the game.', 'Dead players stay in, keep talking, and get one more vote.'],
    ['Win', 'Village wins if any werewolf dies.', 'Good wins when the Demon dies; evil wins when only 2 players are alive.'],
  ],
  terms: [['Werewolf', 'Demon (Imp)'], ['Village team', 'Good team'], ['Narrator', 'Storyteller']],
  toA: 'One night and one vote is the whole game, and your card may have been swapped, so you may not know your team.',
  toB: 'Many days: the Demon kills each night and dead players keep talking, so information builds up.',
});

defineBridge({
  a: 'secret-hitler', b: 'blood-on-the-clocktower',
  same: [
    'A hidden evil team, outnumbered by good players who don’t know each other.',
    'Evil has one key player; kill them and good wins.',
    'Public accusations and claims; votes decide big decisions.',
  ],
  diff: [
    ['Running the game', 'No moderator.', 'A Storyteller runs the nights and can change some outcomes.'],
    ['Who dies', 'The President decides executions alone, via a power.', 'The group nominates and votes to execute.'],
    ['Dead players', 'Out: no talking or voting.', 'Stay in, talk, and keep one vote.'],
    ['Information', 'Policy draws and loyalty investigations.', 'Night abilities, which may be false if you are drunk or poisoned.'],
    ['Win', 'Policies, Hitler elected, or Hitler killed.', 'Demon dies (good) or only 2 players alive (evil).'],
  ],
  terms: [['Liberals', 'Good team'], ['Fascists', 'Minions'], ['Hitler', 'Demon']],
  toA: 'Evidence comes from laws passed and who picked whom, and only the President can execute.',
  toB: 'Players vote to execute, dead players keep talking, and your info can be wrong if you are drunk or poisoned.',
});

defineBridge({
  a: 'coup', b: 'love-letter',
  same: [
    'Small card games where each character has a power.',
    'Knock players out until one remains.',
    'What you play hints at what you hold.',
  ],
  diff: [
    ['Cards held', '2 face-down influence cards (your lives).', '1 card; draw a second, then play one.'],
    ['Bluffing', 'Claim any character, held or not.', 'Play only cards you hold; bluff through what you keep.'],
    ['Resources', 'Coins pay for Assassin (3) and Coup (7).', 'None; only the cards.'],
    ['Knockouts', 'Lose influence to challenges, Assassin or Coup.', 'Guard guesses or Baron duels; out for that round only.'],
    ['Length', 'One game; last player standing.', 'Several rounds; first to the favor token target.'],
  ],
  terms: [['Influence', 'Your hand card'], ['Ambassador (exchange with deck)', 'Chancellor (draw 2, keep 1)']],
  toA: 'You need not hold a character to use it; you lose a card only if challenged while lying.',
  toB: 'You can play only cards you hold, and a knockout costs you just that round.',
});

defineBridge({
  a: 'coup', b: 'skull',
  same: [
    'Pure bluffing: make a claim and dare others to call it.',
    'Losing a challenge costs a card or disc; run out and you are out.',
    'Reading people matters more than card text.',
  ],
  diff: [
    ['What you claim', 'Which character you hold.', 'How many roses you can flip.'],
    ['Calling a bluff', 'Anyone challenges; whoever is wrong loses an influence.', 'Others raise or pass; the top bidder must flip that many.'],
    ['Pieces', '2 character cards and coins.', '3 roses and 1 skull.'],
    ['Win', 'Last player with influence.', '2 successful challenges, or last player with discs.'],
  ],
  terms: [['Challenge (call someone’s claim)', 'Challenge (try to make your bid)'], ['Influence', 'Discs']],
  toA: 'Bluffs are claims of a character power, and anyone at the table can call them.',
  toB: 'You bid how many roses you can flip, and must flip your own stack first.',
});

defineBridge({
  a: 'pandemic', b: 'forbidden-island',
  same: [
    'Everyone wins or loses together.',
    'Each turn: take actions, draw 2 cards, then the threat spreads from its own deck.',
    'Trade cards to collect sets of one colour.',
    'Each player has a role with a special power.',
  ],
  diff: [
    ['Actions per turn', '4.', '3.'],
    ['Threat', 'Disease cubes spread; outbreaks chain to neighbours.', 'Tiles flood, then sink if flooded again.'],
    ['Progress', '5 cards of one colour at a research station cures a disease.', '4 treasure cards on that treasure’s tile captures it.'],
    ['Winning', 'Cure 4 diseases.', 'Capture 4 treasures, meet at Fools’ Landing, play Helicopter Lift.'],
    ['Losing', '8 outbreaks, or run out of cubes or cards.', 'Key tiles sink, a player drowns, or the water reaches the skull.'],
  ],
  terms: [['Infection deck', 'Flood deck'], ['Epidemic', 'Waters Rise!'], ['Infection rate', 'Water level'], ['Discover a cure', 'Capture a treasure']],
  toA: 'One more action per turn, and the threat is chain-reaction outbreaks, not a shrinking board.',
  toB: 'The board shrinks as tiles sink, and you must escape together at the end, not just collect 4 sets.',
});

defineBridge({
  a: 'pandemic', b: 'spirit-island',
  same: [
    'Co-op against a spreading threat.',
    'A card deck shows where the threat grows next.',
    'Too much damage in one spot spills into neighbouring areas.',
  ],
  diff: [
    ['Your character', 'A role with 1–2 powers.', 'A spirit with its own board, powers and play style.'],
    ['Turn shape', 'Players take turns.', 'Everyone acts at once each round.'],
    ['Actions', '4 per turn from a shared list.', 'Grow, then pay energy to play power cards.'],
    ['Winning', 'Cure 4 diseases.', 'Raise fear high enough, or clear the island of invaders.'],
    ['Fighting back', 'Treat Disease removes cubes.', 'Push and destroy invaders; the Dahan fight with you.'],
  ],
  terms: [['Infection cards', 'Invader cards'], ['Disease cubes', 'Invaders'], ['Outbreak', 'Blight cascade'], ['Roles', 'Spirits']],
  toA: 'Take turns with 4 simple actions, and win by collecting cards for cures, not by fighting the threat.',
  toB: 'Everyone plays at once, each spirit plays very differently, and you win mainly by raising fear.',
});
