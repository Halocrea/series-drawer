<template>
	<div
		class="fixed top-0 left-0 flex flex-col items-center w-screen h-screen overflow-auto bg-gray-900"
	>
		<div class="my-auto mx-auto flex flex-col items-stretch">
			<div class="w-full mt-4 p-4 bg-white shadow-lg rounded-md">
				<h1 class="mb-2 px-4 text-2xl font-bold">
					Draw series for your Halo Infinite tournaments
				</h1>
				<p class="w-full max-w-2xl px-4">
					This tool is made to randomly draw games for your Halo
					Infinite competitive tournaments. You can then fine-tune it,
					and export the list as text for example or take a screenshot
					of the pretty table. It does its best to make it even, and
					it won't let the same map or mode show up in the same BoX
					series (unless it cannot do otherwise).
				</p>
			</div>
			<transition name="d-transition--horizontal" mode="out-in">
				<div
					v-if="!showSettings && (nbRounds < 0 || type < 0)"
					key="config-bracket"
					class="my-4 p-4 w-auto bg-white shadow-lg rounded-md"
				>
					<div class="w-full flex justify-between items-center pr-4">
						<h2 class="mx-6 my-4 text-xl font-bold">
							Configure bracket
						</h2>
						<d-button
							size="sm"
							@click="() => showSettings = true"
						>
							<svg-icon
								name="settings"
								class="w-4 h-4 mr-2"
							/>
							Settings
						</d-button>
					</div>
					<config-form
						@configured="onConfigured"
						@csv-imported="onCsvImport"
					/>
				</div>
				<div
					v-else-if="!showSettings"
					key="generated-bracket"
					class="my-4 p-4 w-auto bg-white shadow-lg rounded-md"
				>
					<div class="flex items-center gap-1">
						<d-button size="sm" @click="reset"> Back </d-button>
						<h2 class="mx-6 my-4 text-xl font-bold">
							Generated Bracket
						</h2>
					</div>
					<bracket-table
						:bracket-type="type"
						:imported-csv="importedCsv"
						:nb-games-finals="nbGamesFinals"
						:nb-games-normal="nbGamesNormal"
						:nb-rounds="nbRounds"
					/>
				</div>
				<div
					v-else
					key="settings-bracket"
					class="my-4 p-4 w-auto bg-white shadow-lg rounded-md"
				>
					<bracket-settings
						@close="reset"
					/>
				</div>
			</transition>
			<p class="mb-4 text-white text-sm text-center">
				© {{ new Date().getFullYear() }} HaloCréa.
				<br >
				Licensed under
				<a
					href="https://raw.githubusercontent.com/Halocrea/series-drawer/main/LICENSE?token=GHSAT0AAAAAABU3CEWT7IWKSEISA3HOMZR6YULLCBQ"
					target="_blank"
					class="underline text-blue-400 hover:text-blue-100"
				>GNU GPLv3</a
				>
				| Download the source
				<a
					href="https://github.com/Halocrea/series-drawer"
					target="_blank"
					class="underline text-blue-400 hover:text-blue-100"
				>here</a
				>
				.
			</p>
		</div>
		<client-only>
			<d-notifications />
		</client-only>
	</div>
</template>

<script>
import BracketSettings from '~/components/BracketSettings/BracketSettings.vue'
import BracketTable    from '~/components/BracketTable/BracketTable.vue'
import ConfigForm      from '~/components/ConfigForm/ConfigForm.vue'
import DButton         from '~/components/form/DButton/DButton.vue'

export default {
	name      : 'IndexPage',
	components: {
		BracketSettings,
		BracketTable,
		ConfigForm,
		DButton
	},

	data: () => ({
		importedCsv  : [],
		nbGamesFinals: 5,
		nbGamesNormal: 3,
		nbRounds     : -1,
		showSettings : false,
		type         : -1
	}),

	methods: {
		goToSettings () {

		},

		onConfigured ({ type, nbRounds, nbGamesNormal, nbGamesFinals }) {
			this.type          = parseInt(type)
			this.nbRounds      = parseInt(nbRounds)
			this.nbGamesNormal = parseInt(nbGamesNormal)
			this.nbGamesFinals = parseInt(nbGamesFinals)
		},

		onCsvImport ({ type, data }) {
			this.importedCsv   = data
			this.nbGamesFinals = Math.max(data[0].filter(m => m.map || m.mode).length, data[data.length - 1].filter(m => m.map || m.mode).length)
			this.nbGamesNormal = data[0].filter(m => m.map || m.mode).length
			this.nbRounds      = parseInt(data.length)
			this.type          = parseInt(type)
		},

		reset () {
			this.nbRounds     = -1
			this.showSettings = false
			this.type         = -1
		}
	}
}
</script>
