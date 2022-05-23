<template>
	<label class="d-switch__wrapper">
		<input
			:id="id || defaultId"
			ref="input"
			type="checkbox"
			class="d-switch__input"
			:checked="checked"
			:required="required"
			:disabled="
				disabled === 'true' ||
					(typeof disabled === 'boolean' && disabled)
			"
			:tabindex="tabindex"
			@input="(e) => updateValue(e.target.checked)"
		>
		<div class="d-switch__label">
			<slot />
		</div>
	</label>
</template>

<script src="./DSwitch.index.js"></script>

<style lang="scss" scoped src="./DSwitch.scss" />
