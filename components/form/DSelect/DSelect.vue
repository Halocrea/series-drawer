<template>
	<label class="d-select__wrapper">
		<select
			ref="select"
			:value="value"
			class="d-select__input"
			:required="required"
			:disabled="
				disabled === 'true' ||
					(typeof disabled === 'boolean' && disabled)
			"
			@change="change"
		>
			<option selected disabled style="display: none" />
			<slot />
		</select>
		<span class="d-field__label">
			<slot name="label" />
		</span>
	</label>
</template>

<script src="./DSelect.index.js"></script>

<style lang="scss" scoped src="./DSelect.scss" />
