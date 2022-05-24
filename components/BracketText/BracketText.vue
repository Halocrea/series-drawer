<template>
	<div>
		<d-modal :open="rounds.length > 0 && bracketType >= 0" @close="close">
			<template #title>
				<div class="flex justify-between items-center">
					<h3 class="py-2 text-xl uppercase">Generated text</h3>
					<copy-to-clipboard :content="generatedText" />
				</div>
			</template>
			<template #content>
				<d-textarea v-model="generatedText" rows="50" cols="50" />
			</template>
			<template #actions>
				<copy-to-clipboard :content="generatedText" />
			</template>
		</d-modal>
	</div>
</template>

<script src="./BracketText.index.js"></script>
