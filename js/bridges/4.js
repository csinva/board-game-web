// Bridges for the classic card games: capitalism/tichu, capitalism/uno, cheat/coup, texas-holdem/skull, gin-rummy/cribbage.

defineBridge({
  a: 'capitalism', b: 'tichu',
  same: [
    'Race to empty your hand before the other players.',
    'The leader plays a combination; going around, each player must play a higher combination of the same type, or pass.',
    'When every other player passes in a row, the last player to play wins the pile and leads the next combination.',
  ],
  diff: [
    ['Teams', 'Every player for themselves.', 'Two teams of 2; partners sit opposite each other.'],
    ['Combinations', 'Singles, pairs, triples and four of a kind.', 'Singles, pairs, triples, runs of 5 or more cards, full houses and runs of consecutive pairs; four of a kind is a bomb.'],
    ['Top card', '2 is the highest rank.', 'Ace is the highest rank; the Dragon beats any single card.'],
    ['Special cards', 'None (some groups add jokers).', 'Mah Jong, Dog, Phoenix, Dragon.'],
    ['Bombs', 'None.', 'A bomb (four of a kind, or a straight flush) beats any play, and may be played even when it isn’t your turn.'],
    ['Card passing', 'From the second hand on, the Scum (last out) gives the President (first out) their highest card; the President gives back any 1 card.', 'Before each hand, every player passes 1 card face down to each of the other 3 players.'],
    ['Scoring', 'Finishing order sets everyone’s rank for the next hand. Optional scoring: 2 points for President, 1 for Vice-President; the first to 11 wins.', 'Points for the 5s, 10s and kings in tricks your team wins, plus Tichu calls; the first team to 1,000 wins.'],
  ],
  terms: [['Clearing the pile', 'Winning the trick']],
  toA: 'No partners, bombs or special cards: plays are singles, pairs, triples or four of a kind, 2s are high, and finishing order sets ranks and a card swap for the next hand.',
  toB: 'The same climbing play (beat the last play with a higher combination of the same type), plus a partner, runs and full houses, bombs that beat anything, 4 special cards, and points for 5s, 10s and kings in tricks you win.',
});

defineBridge({
  a: 'capitalism', b: 'uno',
  same: [
    'Race to empty your hand first.',
    'Each play must fit the card or cards on top of the pile.',
    'Short rules; one hand takes a few minutes.',
  ],
  diff: [
    ['Deck', 'Standard 52 cards, all dealt out.', '108 UNO cards; each player is dealt 7, and the rest form a draw pile.'],
    ['Legal play', 'The same number of cards as the last play, all of one higher rank.', '1 card matching the top card’s colour, number or symbol, or a Wild card.'],
    ['Can’t play', 'Pass. You may also pass when you could play.', 'Draw 1 card. You may also draw when you could play.'],
    ['Attacks', 'None: you only beat the current play.', 'Skip, Draw Two and Wild Draw Four hit the next player; Reverse changes the direction of play.'],
    ['After the hand', 'Finishing order sets ranks; the Scum gives the President their highest card.', 'The first player out scores points for all cards left in the other players’ hands; the first to 500 points wins.'],
  ],
  terms: [],
  toA: 'No colours or action cards: beat the last play with the same number of cards of a higher rank, and finishing order decides who swaps cards next hand.',
  toB: 'No ranks or card swaps: match the top card by colour, number or symbol, draw when you can’t, and use action cards on the next player.',
});

defineBridge({
  a: 'cheat', b: 'coup',
  same: [
    'You may claim something you don’t have.',
    'Any player can call the bluff.',
    'A liar who is caught is punished; if the claim was true, the player who called it is punished instead.',
  ],
  diff: [
    ['The claim', 'Play 1 or more cards face down, claiming they are all the next rank in order.', 'Claim a character to take its action, or to block another player’s action.'],
    ['Calling', 'Any player says “Cheat”; the cards just played are turned face up.', 'Any player challenges; the claimer must reveal that character card or lose the challenge.'],
    ['Penalty', 'If any of the cards is not the claimed rank, the player who played them takes the whole pile; otherwise the caller takes it.', 'The loser of the challenge loses 1 influence card.'],
    ['Forced lies', 'You must play the required rank, so if you don’t have it you must lie.', 'Income, Foreign Aid and Coup need no character claim, so you never have to lie.'],
    ['Goal', 'Be the first to empty your hand.', 'Be the last player with any influence left.'],
  ],
  terms: [['Calling “Cheat”', 'Challenging']],
  toA: 'No character powers: every play is a claim about the rank of face-down cards, and a liar who is caught picks up the whole pile.',
  toB: 'Claims are about character powers, not card ranks, and a lost challenge costs 1 of your influence cards (you have 2) instead of a pile of cards.',
});

defineBridge({
  a: 'texas-holdem', b: 'skull',
  same: [
    'You bet on information other players can’t see.',
    'You bluff to make other players drop out or bid wrong.',
    'When the betting reaches you, raise or drop out (in Hold’em you may also call: match the current bet).',
  ],
  diff: [
    ['Hidden information', 'Your 2 face-down hole cards; 5 face-up shared cards are revealed in stages (3, then 1, then 1).', 'Face-down discs, each a rose or a skull.'],
    ['Luck', 'The shuffle decides your cards.', 'No deal: each player chooses which of their discs to play.'],
    ['What you bet', 'Chips.', 'A number: how many discs you can flip without revealing a skull.'],
    ['Winning a round', 'Have the best 5-card hand at the showdown, or be the last player left after everyone else folds.', 'The highest bidder flips that many discs, all of their own first, without revealing a skull.'],
    ['Losing a round', 'You lose the chips you bet.', 'A bidder who flips a skull loses 1 of their discs for the rest of the game.'],
    ['Game end', 'When one player has every chip.', 'When a player wins 2 bids, or only one player has any discs left.'],
  ],
  terms: [['Raise', 'Raise the bid'], ['Fold', 'Pass']],
  toA: 'The hidden information comes from a shuffled deck, you bet chips instead of a number, and the best poker hand wins the pot.',
  toB: 'No cards or chips: the hidden things are discs the players chose, and you bid how many you can flip without finding a skull.',
});

defineBridge({
  a: 'gin-rummy', b: 'cribbage',
  same: [
    'One standard deck, usually 2 players (Cribbage also works with 3–4).',
    'You build runs of consecutive cards and sets of one rank.',
    'Aces are low (count 1); jacks, queens and kings count 10.',
  ],
  diff: [
    ['Your hand', '10 cards; each turn, draw 1 (from the deck or the top of the discard pile), then discard 1.', '6 cards (with 2 players); each player puts 2 in the crib, and there is no drawing after that.'],
    ['Runs', 'Same suit only.', 'Any mix of suits.'],
    ['What scores', 'When a player knocks, the player whose unmatched cards (deadwood) total less scores the difference.', 'Combinations: cards totalling 15, pairs, runs and flushes.'],
    ['Play', 'Draw and discard until a player knocks, which they may do once their deadwood totals 10 or less.', 'Players take turns laying cards, keeping a running total up to 31 and scoring as they go (pegging); then each player counts their hand.'],
    ['Extra hand', 'None.', 'The crib: the 4 discarded cards form an extra hand that scores for the dealer.'],
    ['Score', 'Kept on paper; the first to 100 wins.', 'Moved with pegs on a board; the first to 121 wins.'],
  ],
  terms: [['Set of 3', 'Pair royal']],
  toA: 'Combinations score nothing on their own: draw and discard to build sets and same-suit runs, and knock when your unmatched cards total 10 or less.',
  toB: 'No drawing: combinations (cards totalling 15, pairs, runs) score as you lay cards toward 31, and again when you count your hand; the race is to 121.',
});
