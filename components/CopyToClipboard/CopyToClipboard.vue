<template>
	<d-button
		:variant="copied ? 'success' : 'primary'"
		@click="copyToClipboard"
	>
		<svg-icon v-if="!copied" name="clipboard" class="w-4 h-4" />
		<svg-icon v-else name="check" class="w-4 h-4" />
	</d-button>
</template>

<script src="./CopyToClipboard.index.js"></script>
