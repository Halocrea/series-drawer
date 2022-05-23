<template>
	<div
		:class="{
			'd-text-field__wrapper': true,
			'd-text-field__wrapper--error': !!error,
		}"
	>
		<input
			:id="id || defaultId"
			ref="input"
			:type="type"
			:class="{
				'd-text-field__input': true,
				'd-text-field__input--with-prefix': !!$slots.prefix,
				'd-text-field__input--with-suffix': !!$slots.suffix,
				'rounded-full': !!rounded,
			}"
			placeholder=" "
			:value="value"
			:required="required"
			:autocomplete="autocomplete"
			:disabled="
				disabled === 'true' ||
					(typeof disabled === 'boolean' && disabled)
			"
			tabindex="0"
			@input="(e) => updateValue(e.target.value)"
		>
		<label v-if="$slots.default" :for="id || defaultId">
			<slot />
		</label>
		<transition name="d-transition--vertical" mode="out-in">
			<div
				v-if="!!error && typeof error === 'string'"
				class="d-text-field__error"
			>
				<svg-icon name="alert-triangle" class="w-3 h-3 mr-1" />
				{{ error }}
			</div>
		</transition>
		<div v-if="!!$slots.prefix" class="d-text-field__prefix">
			<slot name="prefix" />
		</div>
		<div v-if="!!$slots.suffix" class="d-text-field__suffix">
			<slot name="suffix" />
		</div>
	</div>
</template>

<script src="./DTextField.index.js"></script>

<style scoped lang="scss" src="./DTextField.scss" />
