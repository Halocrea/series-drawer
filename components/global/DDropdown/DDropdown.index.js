export default {
	data: () => ({ open: false }),

	mounted () {
		document.addEventListener('click', this.closeIfNeeded)
	},

	beforeDestroy () {
		document.removeEventListener('click', this.closeIfNeeded)
	},

	methods: {
		closeIfNeeded (event) {
			let preventClosing = false
			let node           = event.target

			while (node !== document.body) {
				if (node) {
					if (
						event &&
						node.classList &&
						node.classList.contains('js-prevent-dropdown-close')
					) {
						preventClosing = true
						break
					}
					node = node.parentNode
				} else break
			}

			if (!preventClosing) this.open = false
		},

		toggle () {
			this.open = !this.open
		}
	}
}
