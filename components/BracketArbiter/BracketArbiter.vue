<template>
	<div class="c-bracket-arbiter-export">
		<d-modal :open="rounds.length > 0 && bracketType >= 0" @close="close">
			<template #title>
				<div class="flex justify-between items-center">
					<h3 class="py-2 text-xl uppercase">Generated JSON</h3>
					<copy-to-clipboard :content="generatedJSON" />
				</div>
			</template>
			<template #content>
				<d-textarea v-model="generatedJSON" rows="20" cols="150" />
			</template>
			<template #actions>
				<copy-to-clipboard :content="generatedJSON" />
			</template>
		</d-modal>
	</div>
</template>

<script src="./BracketArbiter.index.js"></script>

<style lang="scss">
.c-bracket-arbiter-export {
	textarea {
		@apply font-mono break-all;
	}
}
</style>
