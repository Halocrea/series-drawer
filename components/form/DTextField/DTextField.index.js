export default {
	props: {
		autocomplete: {
			type    : String,
			required: false,
			default : 'on'
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

		rounded: {
			type    : Boolean,
			required: false,
			default : false
		},

		tabindex: {
			type    : Number,
			required: false,
			default : 0
		},

		type: {
			type     : String,
			required : false,
			default  : 'text',
			validator: (v) =>
				['text', 'number', 'password', 'email'].includes(v)
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
		passOnEvent (event) {
			this.$emit(event.type, event)
		},

		updateValue (value) {
			this.$emit('input', value)
		}
	}
}
