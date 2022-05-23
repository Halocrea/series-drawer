<template>
	<label class="d-check__wrapper">
		<input
			:id="id || defaultId"
			ref="input"
			type="checkbox"
			class="d-check__input"
			:value="value"
			:checked="checked"
			:required="required"
			:disabled="
				disabled === 'true' ||
					(typeof disabled === 'boolean' && disabled)
			"
			:tabindex="tabindex"
			@input="(e) => updateValue(e.target.value)"
		>
		<div
			:class="{
				'd-check__label': true,
				'check-before': labelPos === 'after',
				'check-after': labelPos !== 'after',
			}"
		>
			<slot />
		</div>
	</label>
</template>

<script src="./DCheck.index.js"></script>

<style lang="scss" scoped src="./DCheck.scss" />
