import CopyToClipboard from '~/components/CopyToClipboard/CopyToClipboard.vue'
import DButton         from '~/components/form/DButton/DButton.vue'
import DModal          from '~/components/global/DModal/DModal.vue'
import DTextarea       from '~/components/form/DTextarea/DTextarea.vue'

import BRACKET_TYPES, {
	roundPrefixes,
	finalsPrefixes
} from '~/utils/bracketTypes'

export default {
	components: {
		CopyToClipboard,
		DButton,
		DModal,
		DTextarea
	},

	data: () => ({
		bracketType: -1,
		openModal  : false,
		rounds     : []
	}),

	computed: {
		generatedText () {
			let text = ''
			this.rounds.forEach((round, index) => {
				text +=
					round.reduce(
						(p, c) => (p += `\n${c.mode} ${c.map}`), // eslint-disable-line
						`**${this.getRoundName(index)}**`
					) + '\n'
			})

			return text
		}
	},

	watch: {
		open (val) {
			if (val) this.openModal = val
		}
	},

	mounted () {
		this.$root.$on('export-bracket-txt', ({ bracketType, rounds }) => {
			this.bracketType = bracketType
			this.rounds      = rounds
		})
	},

	methods: {
		close () {
			this.bracketType = -1
			this.rounds      = []
		},

		getRoundName (index) {
			switch (this.bracketType) {
				case BRACKET_TYPES.GRAND_FINALS.index:
					return index < this.rounds.length - 1
						? roundPrefixes.GRAND_FINALS
						: finalsPrefixes.GRAND_FINALS
				case BRACKET_TYPES.LOSERS_BRACKET.index:
					return index < this.rounds.length - 1
						? roundPrefixes.LOSERS_BRACKET + (index + 1)
						: finalsPrefixes.LOSERS_BRACKET
				case BRACKET_TYPES.WINNERS_BRACKET.index:
				default:
					return index < this.rounds.length - 1
						? roundPrefixes.WINNERS_BRACKET + (index + 1)
						: finalsPrefixes.WINNERS_BRACKET
			}
		}
	}
}
