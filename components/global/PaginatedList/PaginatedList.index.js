import DButton    from '~/components/form/DButton/DButton.vue'
import DTextField from '~/components/form/DTextField/DTextField.vue'

export default {
	components: {
		DButton,
		DTextField
	},

	emits: ['item-clicked'],

	props: {
		activeKey: {
			type    : String,
			required: false,
			default : 'id'
		},

		data: {
			type    : Array,
			required: false,
			default : () => []
		},

		labelKey: {
			type    : String,
			required: true
		},

		resultsPerPage: {
			type    : Number,
			required: false,
			default : 5
		}
	},

	data: () => ({
		pageNb     : 1,
		searchValue: '',
		selected   : null
	}),

	watch: {
		searchValue () {
			this.pageNb = 1
		}
	},

	computed: {
		displayData () {
			const tmp = JSON.parse(JSON.stringify(this.data))
			return tmp.filter((i) =>
				i[this.labelKey]
					.toString()
					.toLowerCase()
					.includes(this.searchValue.toLowerCase())
			)
		},

		displayLimit () {
			return Math.min(
				this.displayOffset + this.resultsPerPage,
				this.displayData.length
			)
		},

		displayOffset () {
			return (this.pageNb - 1) * this.resultsPerPage
		},

		paginatedData () {
			const tmp = JSON.parse(JSON.stringify(this.displayData))
			return tmp.splice(this.displayOffset, this.resultsPerPage)
		}
	},

	methods: {
		clickOnItem (item) {
			this.selected = item
			this.$emit('item-clicked', item)
		},

		isActive (item) {
			return item?.[this.activeKey] === this.selected?.[this.activeKey]
		}
	}
}
