<template>
	<div class="d-import-csv">
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
					<div class="d-button__hover" />
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
		@apply inline-block relative w-full mt-8 mb-4 px-4 py-2 border border-transparent outline-none border-gray-400;
		box-shadow: 0 0 30px 0 rgba(16, 185, 129, .25) inset;

		&:disabled {
			@apply cursor-not-allowed;

			@include disabled-stripped-bg;
		}

		&::before,
		&::after {
			@apply absolute h-2 border-l border-r border-gray-400 pointer-events-none;

			content: "";
			left: -4px;
			width: calc(100% + 8px);
			transition: top .1s var(--transition-easing),
			            left .1s var(--transition-easing),
			            bottom .1s var(--transition-easing),
			            width .1s var(--transition-easing),
						opacity .1s linear;
		}

		&::before {
			@apply border-t opacity-80;
			top: -5px;
		}

		&::after {
			@apply border-green-500 border-l-2 border-r-2 border-b-2;
			bottom: -5px;
		}

		&:not(:disabled) {
			@apply cursor-pointer;

			&:hover {
				&::before,
				&::after {
					@apply left-0 w-full opacity-0;
				}
				&::before {
					@apply top-0;
				}
				&::after {
					@apply bottom-0;
				}

				.d-button__hover {
					@apply h-full;
					transition: height .2s var(--transition-easing);
				}
			}

			&:active {
				transform: scale(.95);
			}
		}

		.d-button__hover {
			@apply absolute top-1/2 left-0 w-full h-0 bg-white pointer-events-none;

			mix-blend-mode: difference;
			transform: translate3d(0, -50%, 0);
			transition: height .08s linear;
		}

		input[type="file"] {
			@apply fixed top-0 left-0 pointer-events-none opacity-0;
		}
	}
	.example {
		@apply p-2 font-mono bg-gray-900;
	}
}
</style>
