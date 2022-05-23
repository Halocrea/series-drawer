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
		nbRounds     : 1,
		selectedType : 0,
		types        : BRACKET_TYPES
	}),

	computed: {
		canSubmit () {
			return this.nbRounds > 0 && this.nbGamesFinals >= this.nbGamesNormal
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
