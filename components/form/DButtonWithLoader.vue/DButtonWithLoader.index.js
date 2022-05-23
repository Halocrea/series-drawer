import DButton from '../DButton/DButton.vue'

export default {
	components: {
		DButton
	},

	props: {
		additionnalClasses: {
			type    : String,
			required: false,
			default : ''
		},

		disabled: {
			type    : Boolean,
			required: false,
			default : false
		},

		size: {
			type     : String,
			required : false,
			default  : 'md',
			validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
		},

		state: {
			type     : String,
			required : false,
			default  : 'default',
			validator: (v) =>
				['default', 'loading', 'success', 'error'].includes(v)
		},

		type: {
			type     : String,
			required : false,
			default  : 'button',
			validator: (v) => ['button', 'submit'].includes(v)
		},

		variant: {
			type     : String,
			required : false,
			default  : 'normal',
			validator: (v) =>
				[
					'normal',
					'primary',
					'secondary',
					'success',
					'warning',
					'danger'
				].includes(v)
		}
	},

	emits: ['click'],

	data: () => ({
		shadowState: 'default'
	}),

	computed: {
		getIcon () {
			switch (this.shadowState) {
				case 'error':
					return 'alert-triangle'
				case 'loading':
					return 'loader'
				case 'success':
					return 'check'
				default:
					return 'arrow-right'
			}
		},

		getVariant () {
			switch (this.shadowState) {
				case 'error':
					return 'danger'
				case 'success':
					return 'success'
				default:
					return this.variant
			}
		}
	},

	watch: {
		state (v) {
			this.shadowState = v
			if (['success', 'error'].includes(v)) {
				setTimeout(() => {
					this.shadowState = 'default'
				}, 3000)
			}
		}
	},

	methods: {
		click (e) {
			this.$emit('click', e)
		}
	}
}
