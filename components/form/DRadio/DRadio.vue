<template>
	<label class="d-radio__wrapper">
		<input
			:id="id || defaultId"
			ref="input"
			type="radio"
			class="d-radio__input"
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
		<div class="d-radio__label">
			<slot />
		</div>
	</label>
</template>

<script src="./DRadio.index.js"></script>

<style lang="scss" scoped src="./DRadio.scss" />
