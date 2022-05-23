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
		this.defaultId = `d-switch-${this._uid}`
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
