import DButton     from '~/components/form/DButton/DButton.vue'
import DTableInfos from '~/components/global/DTable/DTableInfos/DTableInfos.vue'
import DTextField  from '~/components/form/DTextField/DTextField.vue'

export default {
	components: {
		DButton,
		DTableInfos,
		DTextField
	},

	props: {
		/* data
		 *
		 * The array of data to display
		 * Use only if the table should not handle lazy-loading and so on.
		 *
		 */
		tableData: {
			type    : Array,
			required: false,
			default : () => []
		},

		/* loadFrom
		 *
		 * the URL from which the data should be lazy-loaded
		 * Use only if the table should handle the data and serverside pagination and so on.
		 *
		 */
		loadFrom: {
			type    : String,
			required: false,
			default : ''
		},

		resultsPerPage: {
			type    : Number,
			required: false,
			default : 20
		},

		/* columnsDefinition
		 *
		 * [{ key: 'col1', label: 'Column 1', searchable: true, sortable: false }]
		 *
		 */
		columnsDefinition: {
			type    : Array,
			required: true
		},

		originalSortBy: {
			type    : String,
			required: false,
			default : ''
		}
	},

	emits: ['loading', 'loaded'],

	data: () => ({
		currentData  : [],
		displayedData: [],
		loading      : false,
		sortBy       : '',
		sortOrder    : 'desc',
		pageNb       : 1,
		searchValue  : '',
		searchBuffer : null,
		timestamp    : new Date().toISOString(),
		total        : 0
	}),

	computed: {
		paginatedData () {
			const tmp = JSON.parse(JSON.stringify(this.displayRows))
			return tmp.splice(this.displayOffset, this.resultsPerPage)
		},

		displayLimit () {
			return Math.min(
				this.displayOffset + this.resultsPerPage,
				this.displayedData.length
			)
		},

		displayOffset () {
			return (this.pageNb - 1) * this.resultsPerPage
		},

		displayRows () {
			// ⚠️ this will have to change for lazy loaded data
			const tmp = this.displayedData
			tmp.sort((a, b) => {
				if (this.sortOrder === 'asc') {
					if (
						!isNaN(parseFloat(a[this.sortBy])) &&
						!isNaN(parseFloat(b[this.sortBy]))
					) {
						return (
							parseFloat(a[this.sortBy]) -
							parseFloat(b[this.sortBy])
						)
					} else {
						return (a[this.sortBy] + '').localeCompare(
							b[this.sortBy] + ''
						)
					}
				} else if (
					!isNaN(parseFloat(a[this.sortBy])) &&
					!isNaN(parseFloat(b[this.sortBy]))
				) {
					return (
						parseFloat(b[this.sortBy]) - parseFloat(a[this.sortBy])
					)
				} else {
					return (b[this.sortBy] + '').localeCompare(
						a[this.sortBy] + ''
					)
				}
			})
			return tmp
		}
	},

	watch: {
		currentData () {
			this.displayedData = []
			setTimeout(() => {
				this.search(false)
			}, 10)
		},

		originalSortBy: {
			immediate: true,
			handler (val) {
				this.sortBy = val
			}
		},

		searchValue (val) {
			if (val.length > 0) {
				clearTimeout(this.searchBuffer)
				this.searchBuffer = null
			}
			this.searchBuffer = setTimeout(() => {
				this.search()
			}, 500)
		},

		tableData: {
			immediate: true,
			handler (val) {
				this.currentData = JSON.parse(JSON.stringify(val))
				this.timestamp   = new Date().toISOString()
			}
		}
	},

	created () {
		this.displayedData = JSON.parse(JSON.stringify(this.tableData))
	},

	methods: {
		search (forceFirstPage = true) {
			this.loading = true
			if (forceFirstPage) this.pageNb = 1

			if (!this.loadFrom) {
				const res = this.currentData.filter((row) => {
					let res = false
					for (const key in row) {
						const column = this.columnsDefinition.find(
							(col) => col.key === key
						)
						if (!column) continue

						if (
							column.searchable &&
							(row[key] || '')
								.toString()
								.toLowerCase()
								.includes(
									this.searchValue.toString().toLowerCase()
								)
						)
							res = true
					}
					return res
				})
				this.displayedData = res
				this.total         = res.length
			} else {
				// TBD lazyload
			}
			this.loading = false
		},

		toggleSort (key) {
			this.sortBy    = key
			this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc'
		}
	}
}
