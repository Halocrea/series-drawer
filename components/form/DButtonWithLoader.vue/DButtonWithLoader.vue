<template>
	<DButton
		ref="dLoadButton"
		:additionnal-classes="additionnalClasses"
		:type="type"
		:variant="getVariant"
		:size="size"
		:disabled="shadowState !== 'default'"
		@click="click"
	>
		<svg-icon
			:name="getIcon"
			:class="`w-4 h-4 ${state === 'loading' ? 'animate-spin' : ''}`"
		/>
		<span class="ml-2"> Send </span>
	</DButton>
</template>

<script src="./DButtonWithLoader.index.js"></script>
