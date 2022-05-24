export default {
	WINNERS_BRACKET: {
		label: 'Winner\'s Bracket',
		index: 0
	},

	LOSERS_BRACKET: {
		label: 'Loser\'s Bracket',
		index: 1
	},

	GRAND_FINALS: {
		label: 'Grand Finals',
		index: 2
	},

	POOL_PLAY: {
		label: 'Pool Plays',
		index: 3
	}
}

export const roundPrefixes = {
	WINNERS_BRACKET: 'WR',
	LOSERS_BRACKET : 'LR',
	GRAND_FINALS   : 'GF',
	POOL_PLAY      : 'Match '
}

export const finalsPrefixes = {
	WINNERS_BRACKET: 'WF',
	LOSERS_BRACKET : 'LF',
	GRAND_FINALS   : 'Reset',
	POOL_PLAY      : 'Match '
}
