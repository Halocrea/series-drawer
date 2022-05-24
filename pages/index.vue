<template>
	<div
		class="fixed top-0 left-0 flex flex-col items-center w-screen h-screen overflow-auto"
	>
		<pretty-background />
		<div class="relative z-10 my-auto mx-auto flex flex-col items-stretch">
			<div class="mx-auto w-20 h-20">
				<img src="/halocrea-logo-sm.png" class="w-full h-full object-cover" alt="HaloCréa logo">
			</div>
			<content-box>
				<h1 class="mb-2 px-4 text-2xl font-bold shadow-text">
					Draw series for your Halo Infinite tournaments
				</h1>
				<p class="w-full max-w-2xl px-4 shadow-text">
					This tool is made to randomly draw games for your Halo
					Infinite competitive tournaments. You can then fine-tune it,
					and export the list as text for example or take a screenshot
					of the pretty table. It does its best to make it even, and
					it won't let the same map or mode show up in the same BoX
					series (unless it cannot do otherwise).
				</p>
			</content-box>
			<transition name="d-transition--horizontal" mode="out-in">
				<content-box
					v-if="!showSettings && (nbRounds < 0 || type < 0)"
					key="config-bracket"
				>
					<div class="w-full flex justify-between items-center pr-4">
						<h2 class="mx-6 my-4 text-xl font-bold shadow-text">
							Configure bracket
						</h2>
						<d-button
							variant="simple"
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
					/>
				</content-box>
				<content-box
					v-else-if="!showSettings"
					key="generated-bracket"
				>
					<div class="flex items-center gap-1">
						<d-button variant="simple" size="sm" @click="reset"> Back </d-button>
						<h2 class="mx-6 my-4 text-xl font-bold shadow-text">
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
				</content-box>
				<content-box
					v-else
					key="settings-bracket"
				>
					<bracket-settings
						@close="reset"
					/>
				</content-box>
			</transition>
			<p class="mb-4 text-white text-sm text-center shadow-text">
				© {{ new Date().getFullYear() }} HaloCréa.
				<br >
				Licensed under
				<a
					href="https://raw.githubusercontent.com/Halocrea/series-drawer/main/LICENSE?token=GHSAT0AAAAAABU3CEWT7IWKSEISA3HOMZR6YULLCBQ"
					target="_blank"
					class="underline text-yellow-400 hover:text-yellow-200"
				>GNU GPLv3</a
				>
				| Download the source
				<a
					href="https://github.com/Halocrea/series-drawer"
					target="_blank"
					class="underline text-yellow-400 hover:text-yellow-200"
				>here</a
				>
				.
			</p>
		</div>
		<import-csv
			@csv-imported="onCsvImport"
		/>
		<bracket-arbiter />
		<bracket-text />
		<client-only>
			<d-notifications />
		</client-only>
	</div>
</template>

<script>
import BracketArbiter   from '~/components/BracketArbiter/BracketArbiter.vue'
import BracketSettings  from '~/components/BracketSettings/BracketSettings.vue'
import BracketTable     from '~/components/BracketTable/BracketTable.vue'
import BracketText      from '~/components/BracketText/BracketText.vue'
import ConfigForm       from '~/components/ConfigForm/ConfigForm.vue'
import ContentBox       from '~/components/layout/ContentBox.vue'
import DButton          from '~/components/form/DButton/DButton.vue'
import ImportCsv        from '~/components/ImportCsv/ImportCsv.vue'
import PrettyBackground from '~/components/layout/PrettyBackground.vue'

export default {
	name      : 'IndexPage',
	components: {
		BracketArbiter,
		BracketSettings,
		BracketTable,
		BracketText,
		ConfigForm,
		ContentBox,
		DButton,
		ImportCsv,
		PrettyBackground
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
			this.importedCsv  = []
			this.nbRounds     = -1
			this.showSettings = false
			this.type         = -1
		}
	}
}
</script>
