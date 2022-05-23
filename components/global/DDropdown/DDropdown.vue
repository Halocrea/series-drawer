<template>
	<div
		:class="{
			'd-dropdown relative inline-block': true,
			'd-dropdown--open': open,
		}"
	>
		<button
			type="button"
			class="d-dropdown__btn js-prevent-dropdown-close"
			@mousedown.stop="toggle"
		>
			<slot name="button" />
		</button>
		<div class="d-dropdown__content-wrapper">
			<div class="d-dropdown__content">
				<slot name="content" />
			</div>
		</div>
	</div>
</template>

<script src="./DDropdown.index.js"></script>

<style lang="scss" scoped src="./DDropdown.scss" />
