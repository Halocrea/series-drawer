import DButton from '~/components/form/DButton/DButton.vue'

export default {
	components: {
		DButton
	},

	props: {
		content: {
			type    : String,
			required: true
		}
	},

	data () {
		return {
			copied: false
		}
	},

	methods: {
		copyToClipboard () {
			const inp = document.createElement('textarea')
			document.body.appendChild(inp)

			inp.value = this.content

			inp.select()
			document.execCommand('copy', false)
			inp.remove()

			this.copied = true

			setTimeout(() => {
				this.copied = false
			}, 1000)
		}
	}
}
