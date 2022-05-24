import { mapGetters } from 'vuex'

import DButton from '~/components/form/DButton/DButton.vue'
import DCheck  from '~/components/form/DCheck/DCheck.vue'
import DModal  from '~/components/global/DModal/DModal.vue'

import BRACKET_TYPES, { finalsPrefixes, roundPrefixes } from '~/utils/bracketTypes'

export default {
	components: {
		DButton,
		DCheck,
		DModal
	},
	data: () => ({
		error     : false,
		file      : null,
		hasHeaders: true,
		openModal : false
	}),

	computed: {
		canSubmit () {
			return false // TBD
		},

		...mapGetters({
			objectives : 'config/getObjectives',
			slayers    : 'config/getSlayers',
			specialMode: 'config/getSpecialMode',
			tSGames    : 'config/getTSGames'
		})
	},

	methods: {
		guessBracketType (roundName) {
			let matchIdx = Object.values(roundPrefixes).find(v => roundName.startsWith(v))
			if (matchIdx >= 0)
				return BRACKET_TYPES[Object.keys(roundPrefixes)[matchIdx]].index
			else {
				matchIdx = Object.values(finalsPrefixes).find(v => roundName.startsWith(v))
				if (matchIdx >= 0)
					return BRACKET_TYPES[Object.keys(finalsPrefixes)[matchIdx]].index
			}

			// default "failsafe"
			return BRACKET_TYPES.WINNERS_BRACKET.index
		},

		onFile (e) {
			const files = e.target.files || e.dataTransfer.files

			if (files.length < 1)
				return

			const reader  = new FileReader()
			reader.onload = evt => this.tryProcessFile(evt.target.result)
			reader.readAsText(files[0])
		},

		tryProcessFile (str) {
			this.error = ''
			const rows = str.split('\n')

			if (this.hasHeaders && rows.length < 2) {
				this.error = 'There does not seem to be round data here; uncheck "My file has headers" if necessary.'
				return
			}

			let type   = null
			const data = []

			roundsLoop:
			for (let i = this.hasHeaders ? 1 : 0; i < rows.length; i++) {
				const formattedRow = []
				const splittedRow  = rows[i].split(',')
				if (splittedRow.length < 3) { // minimum would be <round name>,<mode>,<map>
					this.error = 'Data provided seems to be incomplete'
					return
				}

				cellsLoop:
				for (let j = 0; j < splittedRow.length; j++) {
					let formattedGame = { map: '', mode: '' }
					if (j === 0)
						type = this.guessBracketType(splittedRow[j])
					else if (j % 2 === 1) {
						// should be mode
						// check if we're supposed to be in an objective game or TS game
						let arrayToPickFrom = this.objectives
						if (this.tSGames.includes(Math.round((j - 1) / 2))) // TS Game
							arrayToPickFrom = this.slayers

						// check if the gametype can be found
						const modeMatches = arrayToPickFrom.filter(m => m.mode === splittedRow[j])
						if (modeMatches.length > 0) { // we had at least a match
							// make sure the j+1 cell is a map
							if (j + 1 < splittedRow.length) {
								// make sure that map is OK with that mode
								const mapMatches = modeMatches.filter(m => m.map === splittedRow[j + 1])
								if (mapMatches.length > 0 )
									formattedGame = { map: splittedRow[j + 1], mode: splittedRow[j] }
								else
									formattedGame.mode = splittedRow[j]
							}
						}
						formattedRow.push(formattedGame)
					} else
						continue
				}
				data.push(formattedRow)
			}

			// check we're having the same length of all rows
			let count = 0
			data.forEach((round, index) => {
				if (index < 1)
					count = round.length
				else if (round.length > count) {
					count = round.length
					for (let i = index - 1; i >= 0; i--)
						data[i].push(...new Array(count - data[i].length).fill({ map: '', mode: '' }))
				}
			})

			if (type === null || data.length < 1)
				this.error = 'Data could not be imported.'
			else {
				this.openModal = false
				this.$emit('csv-imported', { type, data })
			}
		}
	}
}
