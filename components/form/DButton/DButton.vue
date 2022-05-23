<template>
	<nuxt-link
		v-if="to.length > 0 || typeof to === 'object'"
		ref="dButton"
		:class="`d-button ${size} ${variant} ${additionnalClasses}`"
		:to="to"
		:disabled="disabled"
		tabindex="0"
		@click="click"
	>
		<div class="relative flex items-center">
			<slot />
		</div>
	</nuxt-link>
	<a
		v-else-if="href.length > 0"
		ref="dButton"
		:class="`d-button ${size} ${variant} ${additionnalClasses}`"
		:href="href"
		target="_blank"
		:disabled="disabled"
		tabindex="0"
		@click="click"
	>
		<div class="relative flex items-center">
			<slot />
		</div>
	</a>
	<button
		v-else
		ref="dButton"
		:class="`d-button ${size} ${variant} ${additionnalClasses}`"
		:type="type"
		:disabled="disabled"
		tabindex="0"
		@click="click"
	>
		<div class="relative flex items-center">
			<slot />
		</div>
	</button>
</template>

<script src="./DButton.index.js"></script>

<style scoped lang="scss" src="./DButton.scss" />
