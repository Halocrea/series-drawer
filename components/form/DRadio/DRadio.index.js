export default {
	props: {
		checked: {
			type    : Boolean,
			required: false,
			default : false
		},

		disabled: {
			type    : [String, Boolean],
			required: false,
			default : false
		},

		id: {
			type    : String,
			required: false,
			default : ''
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
			type    : [String, Number, Boolean, Array],
			required: false,
			default : false
		}
	},

	emits: [
		'input',
		'mouseup',
		'mousedown',
		'keyup',
		'keydown',
		'keypress',
		'focus',
		'blur',
		'change'
	],

	data: () => ({
		defaultId: '',
		eventList: [
			'keyup',
			'mouseup',
			'mousedown',
			'keydown',
			'keypress',
			'focus',
			'blur',
			'change'
		]
	}),

	mounted () {
		this.defaultId = `d-text-field-${this._uid}`
		this.eventList.map((e) =>
			this.$refs.input.addEventListener(e, this.passOnEvent)
		)
	},

	beforeDestroy () {
		this.eventList.map((e) =>
			this.$refs.input.removeEventListener(e, this.passOnEvent)
		)
	},

	methods: {
		updateValue (value) {
			this.$emit('change', value)
		}
	}
}
