import NotifSystem from '../DNotificationsSystem.js'

export default {
	props: {
		settings: {
			type    : Object,
			required: true
		}
	},

	data () {
		return {
			params  : null,
			defaults: {
				icon1: {
					name : 'bell',
					class: 'ring-animation'
				},
				icon2: {
					name : 'help-circle',
					class: 'floating-animation'
				},
				successIcon2: {
					name : 'smile',
					class: ''
				},
				errorIcon2: {
					name : 'frown',
					class: ''
				},
				warningIcon2: {
					name : 'flash',
					class: ''
				}
			}
		}
	},

	beforeMount () {
		this.params = this.settings
		if (!this.params.icon1) this.params.icon1 = this.defaults.icon1
		if (!this.params.icon2) {
			if (!this.params.type || this.params.type === 'default')
				this.params.icon2 = this.defaults.icon2
			else if (
				this.params.type === 'success' ||
				this.params.type === 'green'
			)
				this.params.icon2 = this.defaults.successIcon2
			else if (
				this.params.type === 'warning' ||
				this.params.type === 'yellow'
			)
				this.params.icon2 = this.defaults.warningIcon2
			else if (
				this.params.type === 'error' ||
				this.params.type === 'danger' ||
				this.params.type === 'red'
			)
				this.params.icon2 = this.defaults.errorIcon2
		}
	},

	methods: {
		close () {
			NotifSystem.event.$emit('notification:close', this.settings)
		},

		destroyElement () {
			this.$el.parentNode.removeChild(this.$el)

			this.$destroy()
		},

		pause () {
			this.$emit('notification:pause', {})
		},

		resume () {
			this.$emit('notification:resume', {})
		}
	}
}
