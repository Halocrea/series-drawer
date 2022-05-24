<template>
	<div class="d-import-csv">
		<d-button
			variant="success"
			@click="() => openModal = true"
		>
			<svg-icon
				name="file-text"
				class="w-3 h-3 mr-2"
			/>
			<span>IMPORT CSV</span>
		</d-button>
		<d-modal :open="openModal" @close="() => (openModal = false)">
			<template #title>
				<h3 class="py-2 text-xl uppercase">Import CSV File</h3>
			</template>
			<template #content>
				<transition name="d-transition--vertical" mode="out-in">
					<div
						v-if="error"
						class="w-full text-center my-2 py-2 bg-red-500 text-white"
					>
						{{ error }}
					</div>
				</transition>
				<p class="max-w-2xl text-sm pb-2">
					If you don't want things to be generated randomly at first, you can provide a CSV file.
				</p>
				<p class="max-w-2xl text-sm pb-2">
					You need to make sure of the following rules:
				</p>
				<ul class="max-w-2xl text-sm list-disc pl-2 ml-4 pb-2">
					<li>Map names (full) and mode names (abbreviated) must match those expected by this tool,</li>
					<li>Your cells must be comma-separated.</li>
				</ul>
				<p class="max-w-2xl text-sm pb-2">
					Here's an example:
				</p>
				<p class="example max-w-2xl text-sm pb-2 mb-4">
					,Game 1,,Game 2,,Game 3,,Game 4,,Game 5,<br>
					WR1,CTF,Catalyst,TS,Aquarius,SH,Recharge,OB,Streets,TS,Live Fire<br>
					WR2,KotH,Recharge,TS,Streets,CTF,Aquarius,SH,Live Fire,TS,Catalyst
				</p>
				<p class="max-w-2xl text-sm pb-2">
					Incorrect or malformatted CSV may result in incomplete data BUT you can still play with it: for example, you can prepare a CSV file containing only the gamemodes, so only maps would be randomly picked:
				</p>
				<p class="example max-w-2xl text-sm pb-2 mb-4">
					,Game 1,,Game 2,,Game 3,,Game 4,,Game 5,<br>
					WR1,CTF,,TS,,SH,,OB,,TS,<br>
					WR2,KotH,,TS,,CTF,,SH,,TS,<br>
					WR3,OB,,TS,,KotH,,CTF,,TS,
				</p>
				<label class="upload-btn">
					<input
						type="file"
						accept=".csv, text/csv"
						@change="onFile"
					>
					<div class="w-full text-center">
						Select file
					</div>
				</label>
				<div class="mb-4">
					<d-check
						:checked="hasHeaders"
						@change="() => hasHeaders = !hasHeaders"
					>
						My file has headers
					</d-check>
				</div>
			</template>
		</d-modal>
	</div>
</template>

<script src="./ImportCsv.index.js"></script>

<style lang="scss">
@import '~/assets/styles/utils/mixins';
.d-import-csv {
	.upload-btn {
		@apply inline-block relative w-full mt-8 mb-4 px-4 py-2 text-base rounded-md border-2 border-transparent overflow-hidden outline-none bg-green-600 text-white;

		&:disabled {
			@apply cursor-not-allowed;

			@include disabled-stripped-bg;
		}

		&::before {
			@apply absolute top-0 left-0 w-full h-full opacity-10;
			content: '';
		}

		&:not(:disabled) {
			@apply cursor-pointer;

			&:hover::before {
				@apply bg-white;
			}

			&:focus {
				@apply border-blue-500;
			}

			&:active {
				transform: scale(0.95);

				&::before {
					@apply bg-black;
				}
			}
		}

		input[type="file"] {
			@apply fixed top-0 left-0 pointer-events-none opacity-0;
		}
	}
	.example {
		@apply p-1 font-mono bg-gray-200;
	}
}
</style>
