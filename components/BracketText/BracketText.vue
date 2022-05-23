<template>
	<div>
		<d-button variant="success" size="sm" @click="() => (openModal = true)">
			<svg-icon name="download" class="w-4 h-4 mr-2" />
			TXT
		</d-button>
		<d-modal :open="openModal" @close="() => (openModal = false)">
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
