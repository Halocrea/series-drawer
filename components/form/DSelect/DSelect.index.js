export default {
	props: {
		disabled: {
			type    : [String, Boolean],
			required: false,
			default : false
		},

		error: {
			type    : [String, Boolean],
			required: false,
			default : false
		},

		required: {
			type    : Boolean,
			required: false,
			default : false
		},

		tabindex: {
			type    : Number,
			required: false,
			default : 0
		},

		value: {
			type    : [String, Number],
			required: false,
			default : ''
		}
	},

	emits: ['change'],

	methods: {
		change (e) {
			this.$emit('change', e.target.value)
		}
	}
}
