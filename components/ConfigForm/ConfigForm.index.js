import DButton    from '~/components/form/DButton/DButton.vue'
import DSelect    from '~/components/form/DSelect/DSelect.vue'
import DTextField from '~/components/form/DTextField/DTextField.vue'

import BRACKET_TYPES from '~/utils/bracketTypes'

export default {
	components: {
		DButton,
		DSelect,
		DTextField
	},

	data: () => ({
		nbGamesFinals: 5,
		nbGamesNormal: 3,
		nbTeams      : 16,
		selectedType : 0,
		types        : BRACKET_TYPES
	}),

	computed: {
		nbRounds () {
			const range           = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
			const adjustedNbTeams = range[range.findIndex(n => n >= this.nbTeams)]
			const nbMatches       = adjustedNbTeams / 2

			switch (this.selectedType) {
				case this.types.GRAND_FINALS.index:
					return 2
				case this.types.LOSERS_BRACKET.index:
					return Math.ceil(Math.log2(nbMatches) + 1) * 2
				case this.types.POOL_PLAY.index:
					return adjustedNbTeams - 1
				case this.types.WINNERS_BRACKET.index:
				default:
					return Math.ceil(Math.log2(nbMatches) + 1)
			}
		},

		canSubmit () {
			return this.nbRounds > 0 && this.nbGamesFinals >= this.nbGamesNormal
		}
	},

	watch: {
		selectedType (val) {
			console.log(val)
			if (val === this.types.GRAND_FINALS.index)
				this.nbTeams = 2
		}
	},

	methods: {
		submit () {
			this.$emit('configured', {
				type         : this.selectedType,
				nbRounds     : this.nbRounds,
				nbGamesNormal: this.nbGamesNormal,
				nbGamesFinals: this.nbGamesFinals
			})
		}
	}
}
