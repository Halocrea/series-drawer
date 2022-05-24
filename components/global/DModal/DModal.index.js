import ContentBox from '~/components/layout/ContentBox.vue'
import DButton    from '~/components/form/DButton/DButton.vue'

export default {
	components: {
		ContentBox,
		DButton
	},

	props: {
		open: {
			type    : Boolean,
			required: true
		},

		overlayClose: {
			type    : Boolean,
			required: false,
			default : true
		}
	},

	data: () => ({ showModal: false }),

	watch: {
		open (val) {
			setTimeout(() => {
				this.showModal = val
			}, 50)
		}
	},

	beforeMount () {
		this.$root.$on('closeModals', () => {
			this.onClose()
		})
	},

	methods: {
		closeIfNeeded (event) {
			// Please refer to the call of this method in mounted()
			let preventClosing = false
			let node           = event.target

			while (node !== document.body) {
				if (node) {
					if (
						event &&
						node.classList &&
						node.classList.contains('js-prevent-modal-close')
					) {
						preventClosing = true
						break
					}
					node = node.parentNode
				} else break
			}

			return preventClosing
		},

		onClose (check = true, e = null) {
			if (!check) return

			if ((check && !e) || !this.closeIfNeeded(e)) this.$emit('close')
		}
	}
}
