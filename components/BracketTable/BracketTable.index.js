import BracketArbiter from '~/components/BracketArbiter/BracketArbiter.vue'
import BracketText    from '~/components/BracketText/BracketText.vue'
import DButton        from '~/components/form/DButton/DButton.vue'
import DSelect        from '~/components/form/DSelect/DSelect.vue'

import BRACKET_TYPES, {
	roundPrefixes,
	finalsPrefixes
} from '~/utils/bracketTypes'

export default {
	components: {
		BracketArbiter,
		BracketText,
		DButton,
		DSelect
	},

	props: {
		bracketType: {
			type     : Number,
			required : true,
			validator: (val) =>
				Object.values(BRACKET_TYPES)
					.map((bt) => bt.index)
					.includes(val)
		},

		nbGamesFinals: {
			type    : Number,
			required: true
		},

		nbGamesNormal: {
			type    : Number,
			required: true
		},

		nbRounds: {
			type    : Number,
			required: true
		}
	},

	data: () => ({
		generated      : [],
		generating     : true,
		highlightedMap : '',
		highlightedMode: '',
		objectives     : [
			{ mode: 'CTF', map: 'Aquarius' },
			{ mode: 'OB', map: 'Live Fire' },
			{ mode: 'KotH', map: 'Recharge' },
			{ mode: 'SH', map: 'Streets' },
			{ mode: 'CTF', map: 'Bazaar' },
			{ mode: 'SH', map: 'Recharge' },
			{ mode: 'OB', map: 'Streets' },
			{ mode: 'KotH', map: 'Live Fire' },
			{ mode: 'CTF', map: 'Catalyst' },
			{ mode: 'OB', map: 'Recharge' },
			{ mode: 'KotH', map: 'Streets' },
			{ mode: 'SH', map: 'Live Fire' }
		],
		slayers: [
			{ mode: 'TS', map: 'Aquarius' },
			{ mode: 'TS', map: 'Catalyst' },
			{ mode: 'TS', map: 'Live Fire' },
			{ mode: 'TS', map: 'Recharge' },
			{ mode: 'TS', map: 'Streets' }
		],
		roundPrefixes: {
			WINNERS_BRACKET: 'WB ',
			LOSERS_BRACKET : 'LB ',
			GRAND_FINALS   : 'Finals'
		},
		finalsPrefixes: {
			WINNERS_BRACKET: 'WF',
			LOSERS_BRACKET : 'LF',
			GRAND_FINALS   : 'Reset'
		}
	}),

	computed: {
		allObjectiveMaps () {
			return this.objectives.reduce((p, c) => {
				if (!p.includes(c.map)) p.push(c.map)
				return p
			}, [])
		},

		allObjectives () {
			return this.objectives.reduce((p, c) => {
				if (!p.includes(c.mode)) p.push(c.mode)
				return p
			}, [])
		},

		allSlayerMaps () {
			return this.slayers.reduce((p, c) => {
				if (!p.includes(c.map)) p.push(c.map)
				return p
			}, [])
		},

		getMapStats () {
			const allMaps = this.objectives.reduce((p, c) => {
				if (!p.find((m) => m.name === c.map))
					p.push({ name: c.map, count: 0 })

				return p
			}, [])

			this.slayers.forEach((s) => {
				if (!allMaps.find((m) => m.name === s.map))
					allMaps.push({ name: s.map, count: 0 })
			})

			return this.generated.reduce((p, c) => {
				c.forEach((g) => {
					if (!g.map || !g.mode) return

					const ifExists = p.find((m) => m.name === g.map)
					if (ifExists) ifExists.count += 1
					else p.push({ name: g.map, count: 1 })
				})
				return p.sort((a, b) => a.name.localeCompare(b.name))
			}, allMaps)
		},

		getModeStats () {
			const allModes = this.objectives.reduce((p, c) => {
				if (!p.find((m) => m.name === c.mode))
					p.push({ name: c.mode, count: 0 })

				return p
			}, [])

			return this.generated.reduce((p, c) => {
				c.forEach((g) => {
					if (!g.map || !g.mode) return

					const ifExists = p.find((m) => m.name === g.mode)
					if (ifExists) ifExists.count += 1
					else p.push({ name: g.mode, count: 1 })
				})
				return p
					.filter((p) => p.name !== 'TS')
					.sort((a, b) => a.name.localeCompare(b.name))
			}, allModes)
		},

		mapCountAvg () {
			const nbMaps  = this.getMapStats.length
			const nbGames =
				this.nbGamesNormal * (this.nbRounds - 1) + this.nbGamesFinals

			return Math.round(nbGames / nbMaps)
		},

		modeCountAvg () {
			const nbModes          = this.getModeStats.length
			const nbNonSlayerGames = this.generated.reduce((p, c) => {
				return p + c.filter((m) => !['', 'TS'].includes(m.mode)).length
			}, 0)

			return Math.round(nbNonSlayerGames / nbModes)
		}
	},

	beforeMount () {
		this.generateBracket()
	},

	methods: {
		checkMapsAndModes (round) {
			const maps  = []
			const modes = []

			for (let i = 0; i < round.length; i++) {
				if (!round[i].map || !round[i].mode) continue

				if (!maps.includes(round[i].map)) maps.push(round[i].map)
				else return false

				if (round[i].mode !== 'TS' && !modes.includes(round[i].mode))
					modes.push(round[i].mode)
				else if (round[i].mode !== 'TS') return false
			}

			return true
		},

		generateBracket () {
			this.generating = true
			const res       = []
			let usedMaps    = []
			let usedModes   = []

			for (let i = 0; i < this.nbRounds; i++) {
				const nbGames   = i === this.nbRounds - 1
					? this.nbGamesFinals
					: this.nbGamesNormal
				const thisRound = []

				for (let j = 0; j < nbGames; j++) {
					let arrayToPickFrom = JSON.parse(
						JSON.stringify(
							[1, 4, 6].includes(j)
								? this.slayers
								: this.objectives
						)
					).filter((g) => !usedMaps.includes(g.map))

					if (![1, 4, 6].includes(j))
					{arrayToPickFrom = arrayToPickFrom.filter(
						(g) => !usedModes.includes(g.mode)
					)}

					if (arrayToPickFrom.length < 1) {
						// when we're stuck
						usedMaps  = []
						usedModes = []
						for (let h = j - 1; h >= 0; h--) {
							usedMaps.push(thisRound[h].map)

							if (thisRound[h].mode !== 'TS')
								usedModes.push(thisRound[h].mode)
						}

						arrayToPickFrom = JSON.parse(
							JSON.stringify(
								[1, 4, 6].includes(j)
									? this.slayers
									: this.objectives
							)
						).filter((g) => !usedMaps.includes(g.map))

						if (![1, 4, 6].includes(j)) {
							const check = arrayToPickFrom.filter(
								(g) => !usedModes.includes(g.mode)
							)
							if (check.length > 0)
								// doing that because sometimes we can run in an impossible pick
								arrayToPickFrom = check
						}
					}

					const game =
						arrayToPickFrom[
							Math.floor(Math.random() * arrayToPickFrom.length)
						]
					usedMaps.push(game.map)
					if (![1, 4].includes(j)) usedModes.push(game.mode)

					thisRound.push(game)
				}
				res.push(thisRound)
			}

			res.forEach((row) => {
				if (row.length < this.nbGamesFinals) {
					for (
						let i = 0;
						i < this.nbGamesFinals - this.nbGamesNormal;
						i++
					)
						row.push({ map: '', mode: '' })
				}
			})

			this.generated  = res
			this.generating = false
		},

		getMapsForMode (mode) {
			const arrayToPickFrom = JSON.parse(
				JSON.stringify(mode === 'TS' ? this.slayers : this.objectives)
			)

			return arrayToPickFrom
				.filter((m) => m.mode === mode)
				.map((m) => m.map)
		},

		getModesForMap (map) {
			const arrayToPickFrom = JSON.parse(JSON.stringify(this.objectives))

			return arrayToPickFrom
				.filter((m) => m.map === map)
				.map((m) => m.mode)
		},

		getRoundName (index) {
			switch (this.bracketType) {
				case BRACKET_TYPES.GRAND_FINALS.index:
					return index < this.nbRounds - 1
						? roundPrefixes.GRAND_FINALS
						: finalsPrefixes.GRAND_FINALS
				case BRACKET_TYPES.LOSERS_BRACKET.index:
					return index < this.nbRounds - 1
						? roundPrefixes.LOSERS_BRACKET + (index + 1)
						: finalsPrefixes.LOSERS_BRACKET
				case BRACKET_TYPES.WINNERS_BRACKET.index:
				default:
					return index < this.nbRounds - 1
						? roundPrefixes.WINNERS_BRACKET + (index + 1)
						: finalsPrefixes.WINNERS_BRACKET
			}
		},

		setMap (roundIndex, gameIndex, value) {
			let arrayToPickFrom = JSON.parse(
				JSON.stringify(
					[1, 4, 6].includes(gameIndex)
						? this.slayers
						: this.objectives
				)
			)

			if (value === 'RAND') {
				const game =
					arrayToPickFrom[
						Math.floor(Math.random() * arrayToPickFrom.length)
					]
				value      = game.map
			}

			if (
				arrayToPickFrom.filter(
					(m) =>
						m.mode === this.generated[roundIndex][gameIndex].mode &&
						m.map === value
				).length < 1
			) {
				// must set a new mode for this game
				arrayToPickFrom = arrayToPickFrom.filter((m) => m.map === value)
				const game      = arrayToPickFrom[
					Math.floor(Math.random() * arrayToPickFrom.length)
				]
				this.$set(
					this.generated[roundIndex][gameIndex],
					'mode',
					game.mode
				)
			}

			this.$set(this.generated[roundIndex][gameIndex], 'map', value)
		},

		setMode (roundIndex, gameIndex, value) {
			let arrayToPickFrom = JSON.parse(
				JSON.stringify(
					[1, 4, 6].includes(gameIndex)
						? this.slayers
						: this.objectives
				)
			)

			if (value === 'RAND') {
				const game =
					arrayToPickFrom[
						Math.floor(Math.random() * arrayToPickFrom.length)
					]
				value      = game.map
			}
			if (
				arrayToPickFrom.filter(
					(m) =>
						m.map === this.generated[roundIndex][gameIndex].map &&
						m.mode === value
				).length < 1
			) {
				// must set a new mode for this game
				arrayToPickFrom = arrayToPickFrom.filter(
					(m) => m.mode === value
				)
				const game      = arrayToPickFrom[
					Math.floor(Math.random() * arrayToPickFrom.length)
				]
				this.$set(
					this.generated[roundIndex][gameIndex],
					'map',
					game.map
				)
			}

			this.$set(this.generated[roundIndex][gameIndex], 'mode', value)
		}
	}
}
