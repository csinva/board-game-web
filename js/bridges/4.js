// Bridges for the classic card games: capitalism/tichu, capitalism/uno, cheat/coup, texas-holdem/skull, gin-rummy/cribbage.

defineBridge({
  a: 'capitalism', b: 'tichu',
  same: [
    'Empty your hand before the others.',
    'The leader plays a combination; each next play must be the same type and higher, or a pass.',
    'When everyone passes, the last player to play takes the lead.',
  ],
  diff: [
    ['Teams', 'Every player for themselves.', 'Two teams of 2; partners sit opposite.'],
    ['Combinations', 'Singles, pairs, triples, four of a kind.', 'Singles, pairs, triples, runs of 5+, full houses and runs of pairs; four of a kind is a bomb.'],
    ['Top card', '2 is highest.', 'Ace is highest; the Dragon beats any single.'],
    ['Special cards', 'None (some groups add jokers).', 'Mah Jong, Dog, Phoenix, Dragon.'],
    ['Bombs', 'None.', 'Four of a kind or a straight flush beats anything, even out of turn.'],
    ['Card passing', 'From the second hand, Scum gives President their highest card; President returns any 1.', 'Before each hand, everyone passes 1 card to each other player.'],
    ['Scoring', 'Finishing order sets ranks for the next hand; optionally 2 points for President, 1 for Vice-President, to 11.', '5s, 10s and kings in won tricks, plus Tichu bets; first team to 1,000.'],
  ],
  terms: [['Clearing the pile', 'Winning the trick']],
  toA: 'No partners, bombs or special cards: plays are singles to four of a kind with 2s high, and finishing order sets ranks and a card swap for the next hand.',
  toB: 'Same climbing, plus a partner, runs and full houses, bombs that beat anything, 4 special cards, and points for 5s, 10s and kings in tricks you win.',
});

defineBridge({
  a: 'capitalism', b: 'uno',
  same: [
    'Empty your hand first.',
    'Each play must fit the top of the pile.',
    'Short rules; one hand takes a few minutes.',
  ],
  diff: [
    ['Deck', 'Standard 52 cards, all dealt.', '108 UNO cards; 7 each.'],
    ['Legal play', 'Same number of cards, higher rank.', 'One card matching colour, number or symbol.'],
    ['Can’t play', 'Pass. You may pass even if you could play.', 'Draw 1. You may draw even if you could play.'],
    ['Attacks', 'None: you only beat the current play.', 'Skip, Reverse, Draw Two and Wild Draw Four hit the next player.'],
    ['After the hand', 'Finishing order sets ranks; Scum gives President their highest card.', 'The first out scores the cards left in other hands; first to 500 wins.'],
  ],
  terms: [],
  toA: 'No colours or action cards: beat the last play with the same number of higher cards, and finishing order decides who swaps cards next hand.',
  toB: 'No ranks or swaps: match the top card by colour, number or symbol, draw when you can’t, and use action cards on the next player.',
});

defineBridge({
  a: 'cheat', b: 'coup',
  same: [
    'You may claim something you don’t have.',
    'Any player can call the bluff.',
    'A caught liar is punished; a wrong call punishes the caller.',
  ],
  diff: [
    ['The claim', 'Play cards face down, claiming they are the next rank in order.', 'Claim a character to take its action or block one.'],
    ['Calling', 'Anyone says “Cheat”; the last cards played are turned up.', 'Anyone challenges; the claimer must reveal that character.'],
    ['Penalty', 'The liar takes the whole pile; if honest, the caller does.', 'The loser of a challenge loses 1 of their 2 influence cards.'],
    ['Forced lies', 'You must claim the required rank, so missing it forces a lie.', 'Income, foreign aid and coup are always honest options.'],
    ['Goal', 'First to empty your hand.', 'Last player with influence left.'],
  ],
  terms: [['Calling “Cheat”', 'Challenging']],
  toA: 'No character powers: every play is a claim about the rank of face-down cards, and a caught liar picks up the pile.',
  toB: 'Claims are about character powers, not card ranks, and a lost challenge costs 1 of your 2 lives instead of a pile of cards.',
});

defineBridge({
  a: 'texas-holdem', b: 'skull',
  same: [
    'Bet on information others can’t see.',
    'Bluff to make others drop out or bid wrong.',
    'When betting comes to you: go higher or drop out (Hold’em also lets you call).',
  ],
  diff: [
    ['Hidden information', 'Your 2 hole cards; 5 shared cards revealed over time.', 'Face-down discs, each a rose or a skull.'],
    ['Luck', 'The shuffle decides your cards.', 'No deal: players choose every hidden disc.'],
    ['What you bet', 'Chips.', 'A number: how many discs you can flip without a skull.'],
    ['Winning a round', 'Best 5-card hand at showdown, or everyone else folds.', 'The highest bidder flips that many discs, their own first, without a skull.'],
    ['Losing a round', 'You lose the chips you bet.', 'The bidder who flips a skull loses 1 disc for good.'],
    ['Game end', 'One player has every chip.', 'Win 2 bids, or be the last player with discs.'],
  ],
  terms: [['Raise', 'Raise the bid'], ['Fold', 'Pass']],
  toA: 'The hidden information comes from a shuffled deck, you bet chips instead of a count, and the best poker hand wins the pot.',
  toB: 'No cards or chips: the hidden things are discs you chose, and you bid how many you can flip without finding a skull.',
});

defineBridge({
  a: 'gin-rummy', b: 'cribbage',
  same: [
    'One standard deck, usually two players (Cribbage also takes 3–4).',
    'Runs of consecutive cards and sets of one rank are what you build.',
    'Ace is low; face cards count 10.',
  ],
  diff: [
    ['Your hand', '10 cards; draw 1 and discard 1 each turn.', '6 cards; 2 go to the crib, then no drawing.'],
    ['Runs', 'Same suit only.', 'Any suits.'],
    ['What scores', 'Less deadwood than your opponent when someone knocks.', 'Combinations: 15s, pairs, runs, flushes.'],
    ['Play', 'Draw and discard until someone knocks.', 'Alternate cards toward a count of 31 (pegging), then count your hand.'],
    ['Extra hand', 'None.', 'The crib: 4 discards that score for the dealer.'],
    ['Score', 'On paper, to 100.', 'Pegs on a board, to 121.'],
  ],
  terms: [['Set of 3', 'Pair royal']],
  toA: 'Nothing scores for combinations: draw and discard to build sets and same-suit runs, and knock when your unmatched cards total 10 or less.',
  toB: 'No drawing: combinations (15s, pairs, runs) score as you play cards toward 31 and again when you count your hand, racing to 121.',
});
