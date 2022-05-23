export default {
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

		href: {
			type    : String,
			required: false,
			default : ''
		},

		size: {
			type     : String,
			required : false,
			default  : 'md',
			validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
		},

		to: {
			type    : [String, Object],
			required: false,
			default : ''
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
					'transparent',
					'warning',
					'danger'
				].includes(v)
		}
	},

	emits: ['click'],

	methods: {
		click (e) {
			this.$emit('click', e)
			this.$refs.dButton.blur()
		}
	}
}
