import { mapGetters } from 'vuex'
import DButton        from '~/components/form/DButton/DButton.vue'
import DSelect        from '~/components/form/DSelect/DSelect.vue'

import BRACKET_TYPES, {
	roundPrefixes,
	finalsPrefixes
} from '~/utils/bracketTypes'

export default {
	components: {
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

		importedCsv: {
			type    : Array,
			required: false
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
		generating     : false,
		highlightedMap : 'none',
		highlightedMode: 'none',
		roundPrefixes  : {
			WINNERS_BRACKET: 'WB ',
			LOSERS_BRACKET : 'LB ',
			GRAND_FINALS   : 'Finals'
		},
		finalsPrefixes: {
			WINNERS_BRACKET: 'WF',
			LOSERS_BRACKET : 'LF',
			GRAND_FINALS   : 'Reset'
		},
		takingScreenshot: false,
		usedMaps        : [],
		usedModes       : []
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
					.filter((p) => p.name !== this.specialMode)
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
				return p + c.filter((m) => !['', this.specialMode].includes(m.mode)).length
			}, 0)

			return Math.round(nbNonSlayerGames / nbModes)
		},

		...mapGetters({
			mapsWithCount : 'config/getMapsWithCount',
			modesWithCount: 'config/getModesWithCount',
			objectives    : 'config/getObjectives',
			slayers       : 'config/getSlayers',
			specialMode   : 'config/getSpecialMode',
			tSGames       : 'config/getTSGames',
			weLoveBTB     : 'config/getWeLoveBTB'
		})
	},

	beforeMount () {
		if (this.importedCsv?.length <= 0)
			this.generateBracket()
		else
			this.generated = JSON.parse(JSON.stringify(this.importedCsv))
	},

	methods: {
		checkMapsAndModes (round) {
			const maps  = []
			const modes = []

			for (let i = 0; i < round.length; i++) {
				if (!round[i].map || !round[i].mode) continue

				if (!maps.includes(round[i].map)) maps.push(round[i].map)
				else return false

				if (round[i].mode !== this.specialMode && !modes.includes(round[i].mode))
					modes.push(round[i].mode)
				else if (round[i].mode !== this.specialMode) return false
			}

			return true
		},

		generateBracket () {
			this.generating = true
			const res       = []

			for (let i = 0; i < this.nbRounds; i++) {
				const nbGames   = i === this.nbRounds - 1
					? this.nbGamesFinals
					: this.nbGamesNormal
				const thisRound = []

				for (let j = 0; j < nbGames; j++) {
					const weighedArray = this._shuffle(this.getWeighedSelection(thisRound, j))

					const game = weighedArray[
						Math.floor(Math.random() * weighedArray.length)
					]
					this.usedMaps.push(game.map)
					if (!this.tSGames.includes(j)) this.usedModes.push(game.mode)

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

			this.generated  = JSON.parse(JSON.stringify(res))
			this.usedMaps   = []
			this.usedModes  = []
			this.generating = false
		},

		getMapsForMode (mode) {
			const arrayToPickFrom = JSON.parse(
				JSON.stringify(mode === this.specialMode ? this.slayers : this.objectives)
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

		getWeighedSelection (thisRound, currentIndex, attempt = 0) {
			let weighedArray = []
			if (this.tSGames.includes(currentIndex)) { // slayer
				this.slayers.filter(o =>
					!this.usedMaps.includes(o.map)
				).forEach(c => {
					const mapWeight =
						Math.round(1 + (this.mapsWithCount.find(o => o.name === c.map).count / this.mapsWithCount.length))
					weighedArray.push(...new Array(mapWeight).fill(c))
				})
			} else {
				this.objectives.filter(o =>
					!this.usedMaps.includes(o.map) && !this.usedModes.includes(o.mode)
				).forEach(c => {
					const mapWeight =
						Math.round(1 + (this.mapsWithCount.find(o => o.name === c.map).count / this.mapsWithCount.length)) +
						Math.round(1 + (this.modesWithCount.find(o => o.name === c.mode).count / this.modesWithCount.length))
					weighedArray.push(...new Array(mapWeight).fill(c))
				})
			}

			if (weighedArray.length < 1 && attempt < 1) { // when we're stuck
				this.usedMaps  = []
				this.usedModes = []
				for (let h = currentIndex - 1; h >= 0; h--) {
					this.usedMaps.push(thisRound[h].map)

					if (thisRound[h].mode !== this.specialMode)
						this.usedModes.push(thisRound[h].mode)
				}

				weighedArray = this.getWeighedSelection(thisRound, currentIndex, 1)
			} else if (weighedArray.length < 1 && attempt > 0) {
				this.usedMaps  = []
				this.usedModes = []
				weighedArray   = this.getWeighedSelection(thisRound, currentIndex)
			}

			return weighedArray
		},

		setMap (roundIndex, gameIndex, value) {
			let arrayToPickFrom = JSON.parse(
				JSON.stringify(
					this.tSGames.includes(gameIndex)
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
					this.tSGames.includes(gameIndex)
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
		},

		async takeScreenshot () {
			this.takingScreenshot = true

			const res = await this.$html2canvas(this.$refs.printable, { type: 'dataURL' })
			const a   = document.createElement('a')
			a.setAttribute('href', res)
			a.setAttribute('download', `screenshot-${new Date().toLocaleDateString()}_${new Date().getTime()}.jpeg`)
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)

			this.takingScreenshot = false
		},

		// https://stackoverflow.com/a/2450976
		_shuffle (array) {
			let currentIndex = array.length
			let randomIndex

			// While there remain elements to shuffle.
			while (currentIndex !== 0) {
			  // Pick a remaining element.
			  randomIndex = Math.floor(Math.random() * currentIndex)
			  currentIndex--

			  // And swap it with the current element.
			  [array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]
				]
			}

			return array
		}
	}
}
