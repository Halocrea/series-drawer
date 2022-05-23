<template>
	<div class="w-full flex justify-between items-center mt-4 px-2">
		<div>
			Showing {{ offset + 1 }}-{{ limit }} of
			{{ tableData.length }} results
		</div>
		<div v-if="showPagination">
			<d-button
				v-for="n in Math.ceil(tableData.length / resultsPerPage)"
				:key="`btn-page-${n}`"
				size="xs"
				:disabled="n === pageNb"
				@click="() => $emit('change-page', n)"
			>
				{{ n }}
			</d-button>
		</div>
	</div>
</template>

<script>
import DButton from '~/components/form/DButton/DButton.vue'

export default {
	components: {
		DButton
	},

	props: {
		tableData: {
			type    : Array,
			required: false,
			default : () => []
		},

		limit: {
			type    : Number,
			required: false,
			default : 0
		},

		offset: {
			type    : Number,
			required: false,
			default : 0
		},

		pageNb: {
			type    : Number,
			required: false,
			default : 1
		},

		resultsPerPage: {
			type    : Number,
			required: true
		},

		showPagination: {
			type    : Boolean,
			required: false,
			default : true
		}
	},

	emits: ['change-page']
}
</script>
