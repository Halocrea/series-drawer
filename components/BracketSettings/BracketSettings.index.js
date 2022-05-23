import { mapGetters, mapMutations } from 'vuex'

import DButton    from '~/components/form/DButton/DButton.vue'
import DSelect    from '~/components/form/DSelect/DSelect.vue'
import DTextField from '~/components/form/DTextField/DTextField.vue'

import { allMaps, allModes } from '~/utils/allMapsAndModes'

export default {
	components: {
		DButton,
		DSelect,
		DTextField
	},

	data: () => ({
		allMaps,
		allModes,
		editableObjectives: [],
		editableSlayers   : [],
		editableSpeMode   : '',
		editableTSGames   : ''
	}),

	computed: {
		areObjsModified () {
			return JSON.stringify(this.editableObjectives.filter(o => !!o.map && !!o.mode)) !== JSON.stringify(this.objectives)
		},

		areSlayersModified () {
			return JSON.stringify(this.editableSlayers.filter(s => !!s.map)) !== JSON.stringify(this.slayers)
		},

		canSubmit () {
			const checkTSGames = !this.tSGamesError && this.editableTSGames.trim().localeCompare(this.tSGames.map(v => v + 1).join(','))

			return (
				checkTSGames || this.areSlayersModified || this.areObjsModified || this.editableSpeMode !== this.specialMode
			)
		},

		tSGamesError () {
			return !this.isTSGamesValid ? 'Malformatted; it must look like "1,2,3".' : false
		},

		isTSGamesValid () {
			return this.editableTSGames.length < 1 || !isNaN(this.editableTSGames.trim().split(',').map(v => parseInt(v)).reduce((p, c) => p + c, 0))
		},

		...mapGetters({
			objectives : 'config/getObjectives',
			slayers    : 'config/getSlayers',
			specialMode: 'config/getSpecialMode',
			tSGames    : 'config/getTSGames'
		})
	},

	watch: {
		editableSpeMode (val) {
			this.editableSlayers.forEach((c) => {
				c.mode = val
			})
		},

		objectives: {
			immediate: true,
			handler (val) {
				this.editableObjectives = JSON.parse(JSON.stringify(val))
			}
		},

		slayers: {
			immediate: true,
			handler (val) {
				this.editableSlayers = JSON.parse(JSON.stringify(val))
			}
		},

		specialMode: {
			immediate: true,
			handler (val) {
				this.editableSpeMode = val + ''
			}
		},

		tSGames: {
			immediate: true,
			handler (val) {
				this.editableTSGames = val.map(v => v + 1).join(',')
			}
		}
	},

	methods: {
		addObjective () {
			this.editableObjectives.push({
				mode: '', map: ''
			})
		},

		addSlayer () {
			this.editableSlayers.push({
				mode: '', map: ''
			})
		},

		removeObjective (index) {
			this.editableObjectives.splice(index, 1)
		},

		removeSlayer (index) {
			this.editableSlayers.splice(index, 1)
		},

		submit () {
			if (this.areObjsModified)
				this.updateObjectives(this.editableObjectives.filter(o => !!o.map && !!o.mode))

			if (this.areSlayersModified)
				this.updateSlayers(this.editableSlayers.filter(s => !!s.map))

			if (this.editableSpeMode !== this.specialMode)
				this.updateSpecialMode(this.editableSpeMode)

			if(!this.tSGamesError && this.editableTSGames.trim().localeCompare(this.tSGames.map(v => v + 1).join(',')))
				this.updateTSGames(this.editableTSGames.trim().split(',').map(v => parseInt(v) - 1))

			this.$notif.emit({
				content: 'Your settings have been saved, you can play with them now!',
				title  : 'Settings saved'
			})
			this.$emit('close')
		},

		...mapMutations({
			updateObjectives : 'config/setObjectives',
			updateSlayers    : 'config/setSlayers',
			updateSpecialMode: 'config/setSpecialMode',
			updateTSGames    : 'config/setTSGames'
		})
	}
}
