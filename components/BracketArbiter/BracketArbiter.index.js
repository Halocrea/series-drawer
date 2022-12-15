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
		baseGameObj: {
			mapId        : '',
			modeId       : '',
			winner       : '',
			blueTeamScore: '',
			redTeamScore : ''
		},
		baseRoundObj: {
			name    : '',
			seriesId: '0000000003',
			rounds  : []
		},
		bracketType: -1,
		mapIds     : [
			{ name: 'Aquarius', id: 'cjZd6R3zR1' },
			{ name: 'Argyle', id: 'xhgAv7pgnp' },
			{ name: 'Bazaar', id: '7Yx0939r1' },
			{ name: 'Catalyst', id: 'sc-yRazeo2' },
			{ name: 'Detachment', id: 'zhNd7F5Uff' },
			{ name: 'Live Fire', id: '0WKsbDBTp1' },
			{ name: 'Recharge', id: 'WyrQgCgwtq1' },
			{ name: 'Streets', id: 'sc-yRcgfo1' },
			{ name: 'The Pit', id: 'hMvyhUav76' }
		],
		modeIds: [
			{ name: 'CTF', id: 'rjT-bcz3b1' },
			{ name: 'KotH', id: 'sc-oRcgfo1' },
			{ name: 'OB', id: '1234567890' },
			{ name: 'SH', id: 'FmzPtTcUfq' },
			{ name: 'TS', id: 'O7zx8gRQA' }
		],
		openModal: false,
		rounds   : []
	}),

	computed: {
		generatedJSON () {
			const res = []

			this.rounds.forEach((round, index) => {
				const thisRound = JSON.parse(JSON.stringify(this.baseRoundObj))

				thisRound.name   = this.getRoundName(index)
				thisRound.rounds = round.reduce((p, c) => {
					if (!c.map || !c.mode) return p

					const thisGame = JSON.parse(
						JSON.stringify(this.baseGameObj)
					)

					thisGame.mapId  = this.mapIds.find(
						(m) => m.name === c.map
					).id
					thisGame.modeId = this.modeIds.find(
						(m) => m.name === c.mode
					).id

					p.push(thisGame)

					return p
				}, [])

				res.push(thisRound)
			})

			return JSON.stringify(res)
		}
	},

	watch: {
		open (val) {
			if (val) this.openModal = val
		}
	},

	mounted () {
		this.$root.$on('export-bracket-arbiter', ({ bracketType, rounds }) => {
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
