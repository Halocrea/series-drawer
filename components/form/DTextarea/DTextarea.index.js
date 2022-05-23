export default {
	props: {
		cols: {
			type    : [String, Number],
			required: false,
			default : ''
		},

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

		id: {
			type    : String,
			required: false,
			default : ''
		},

		minlength: {
			type    : [String, Number],
			required: false,
			default : ''
		},

		maxlength: {
			type    : [String, Number],
			required: false,
			default : ''
		},

		placeholder: {
			type    : String,
			required: false,
			default : ' '
		},

		required: {
			type    : Boolean,
			required: false,
			default : false
		},

		rows: {
			type    : [String, Number],
			required: false,
			default : 2
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

	data () {
		return {
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
		}
	},

	mounted () {
		this.defaultId = `d-textarea-${this._uid}`
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
		passOnEvent (event) {
			this.$emit(event.type, event)
		},

		updateValue (value) {
			this.$emit('input', value)
		}
	}
}
