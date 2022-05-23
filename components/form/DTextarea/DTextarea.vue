<template>
	<div
		:class="{
			'd-textarea__wrapper': true,
			'd-textarea__wrapper--error': !!error,
		}"
	>
		<textarea
			:id="id || defaultId"
			ref="input"
			class="d-textarea__input"
			placeholder=" "
			:value="value"
			:rows="rows"
			:cols="cols"
			:minlength="minlength"
			:maxlength="maxlength"
			:required="required"
			:disabled="
				disabled === 'true' ||
					(typeof disabled === 'boolean' && disabled)
			"
			tabindex="0"
			@input="(e) => updateValue(e.target.value)"
		/>
		<label
			v-if="$slots.default"
			class="d-textarea__label"
			:for="id || defaultId"
		>
			<slot />
		</label>
		<transition name="d-transition--vertical" mode="out-in">
			<div
				v-if="!!error && typeof error === 'string'"
				class="d-textarea__error"
			>
				<svg-icon name="alert-triangle" class="w-3 h-3 mr-1" />
				{{ error }}
			</div>
		</transition>
	</div>
</template>

<script src="./DTextarea.index.js"></script>

<style scoped lang="scss" src="./DTextarea.scss" />
