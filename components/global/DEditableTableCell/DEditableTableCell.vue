<template>
	<div class="flex items-center">
		<d-text-field
			v-model="editableValue"
			class="d-editable-table-cell w-full"
			:disabled="disabled"
			@blur="resetIfNotModified"
		>
			<template #suffix>
				<d-button
					:variant="
						editableValue === baseValue ? 'normal' : 'success'
					"
					additionnal-classes="-mr-2 pointer-events-auto"
					:disabled="disabled || editableValue === baseValue"
					@click="submit"
				>
					<svg-icon name="check" class="w-4 h-4" />
				</d-button>
			</template>
		</d-text-field>
	</div>
</template>

<script>
import DButton    from '~/components/form/DButton/DButton.vue'
import DTextField from '~/components/form/DTextField/DTextField.vue'

export default {
	components: {
		DButton,
		DTextField
	},

	props: {
		baseValue: {
			type    : String,
			required: false,
			default : ''
		},

		disabled: {
			type    : Boolean,
			required: false,
			default : false
		}
	},

	emits: ['submit'],

	data: () => ({
		editableValue: ''
	}),

	watch: {
		// We cannot modify the "baseValue" variable as it is a prop
		// so we create a "editableValue", but it must be 1:1 with the baseValue at init and if it changes in the parent
		baseValue: {
			immediate: true,
			handler (val) {
				this.editableValue = val
			}
		}
	},

	methods: {
		resetIfNotModified () {
			setTimeout(() => {
				this.editableValue = this.baseValue
			}, 150)
		},

		submit () {
			this.$emit('submit', this.editableValue)
		}
	}
}
</script>

<style lang="scss">
.d-editable-table-cell {
	&.d-text-field__wrapper {
		@apply my-0 py-0;
	}
	&:not(:focus-within) .d-text-field__suffix {
		opacity: 0;
	}
	& > input {
		&:not(:hover) {
			background-color: transparent;
		}
	}
}
</style>
