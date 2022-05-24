<template>
	<div class="w-full">
		<div class="mb-4">
			<div class="flex items-center">
				<div class="w-24 font-bold text-right shadow-text mr-2">Map count:</div>
				<div
					v-for="(m, i) in getMapStats"
					:key="`map-${i}`"
					:class="{
						'm-1 p-1 bg-opacity-30 shadow-text': true,
						'bg-yellow-300':
							mapCountAvg - m.count === 1 ||
							mapCountAvg - m.count === -1,
						'bg-yellow-500':
							mapCountAvg - m.count === 2 ||
							mapCountAvg - m.count === -2,
						'bg-red-400':
							mapCountAvg - m.count === 3 ||
							mapCountAvg - m.count === -3,
						'bg-red-500 bg-opacity-60':
							mapCountAvg - m.count > 3 ||
							mapCountAvg - m.count < -3,
					}"
					@mouseenter="() => (highlightedMap = m.name)"
					@mouseleave="() => (highlightedMap = 'none')"
				>
					{{ m.name }}: {{ m.count }}
				</div>
			</div>
			<div class="flex items-center">
				<div class="w-24 font-bold text-right shadow-text mr-2">Obj count:</div>
				<div
					v-for="(m, i) in getModeStats"
					:key="`map-${i}`"
					:class="{
						'm-1 p-1 bg-opacity-30 shadow-text': true,
						'bg-yellow-300':
							modeCountAvg - m.count === 1 ||
							modeCountAvg - m.count === -1,
						'bg-yellow-500':
							modeCountAvg - m.count === 2 ||
							modeCountAvg - m.count === -2,
						'bg-red-400':
							modeCountAvg - m.count === 3 ||
							modeCountAvg - m.count === -3,
						'bg-red-500 bg-opacity-60':
							modeCountAvg - m.count > 3 ||
							modeCountAvg - m.count < -3,
					}"
					@mouseenter="() => (highlightedMode = m.name)"
					@mouseleave="() => (highlightedMode = 'none')"
				>
					{{ m.name }}: {{ m.count }}
				</div>
			</div>
		</div>
		<div class="w-full flex justify-end items-center gap-2 mb-4">
			<d-button
				size="sm"
				variant="primary"
				title="regenerate"
				@click="takeScreenshot"
			>
				<svg-icon name="camera" class="w-4 h-4" />
			</d-button>
			<d-button
				variant="simple"
				size="sm"
				title="regenerate"
				@click="generateBracket"
			>
				<svg-icon name="refresh-cw" class="w-4 h-4 mr-2" />
				REGEN
			</d-button>
			<d-button
				variant="simple"
				size="sm"
				@click="() => {
					$root.$emit('export-bracket-txt', {
						bracketType,
						rounds: generated
					})
				}"
			>
				<svg-icon name="download" class="w-4 h-4 mr-2" />
				TXT
			</d-button>
			<d-button
				variant="simple"
				size="sm"
				@click="() => {
					$root.$emit('export-bracket-arbiter', {
						bracketType,
						rounds: generated
					})
				}"
			>
				<svg-icon name="download" class="w-4 h-4 mr-2" />
				ARBITER
			</d-button>
		</div>
		<table
			:ref="`printable`"
			:class="{
				'c-bracket-table': true,
				'taking-screenshot': takingScreenshot,
				'shadow-text': !takingScreenshot
			}"
		>
			<thead>
				<tr>
					<th colspan="2" />
					<th v-for="m in nbGamesFinals" :key="`th-${m}`">
						Game {{ m }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(round, index) in generated" :key="`round-${index}`">
					<td>
						{{ checkMapsAndModes(round) || takingScreenshot ? '&nbsp;' : '⚠️' }}
					</td>
					<td>{{ getRoundName(index) }}</td>
					<td
						v-for="(game, idx) in round"
						:key="`round-${index}-game-${idx}`"
						:class="{
							highlighted:
								game.map === highlightedMap ||
								game.mode === highlightedMode,
						}"
						:data-setting="game.mode"
					>
						<div class="flex items-center">
							<span
								v-if="game.mode === 'TS'"
								class="px-2 cursor-not-allowed"
							>
								TS
							</span>
							<d-select
								v-else
								:value="game.mode"
								:class="
									round.filter((m) => m.mode === game.mode)
										.length > 1 && !takingScreenshot
										? 'wrong'
										: ''
								"
								@change="v => setMode(index, idx, v)"
							>
								<option
									v-for="mode in allObjectives"
									:key="`gamemode-${mode}`"
									:selected="mode === game.mode"
									:class="{
										warning: !getModesForMap(
											game.map
										).includes(mode),
										danger: !!round.find(
											(m, i) =>
												m.mode === mode && i !== idx
										),
									}"
								>
									{{ mode }}
								</option>
							</d-select>
							<d-select
								:value="game.map"
								:class="
									round.filter((m) => m.map === game.map)
										.length > 1 && !takingScreenshot
										? 'wrong'
										: ''
								"
								@change="v => setMap(index, idx, v)"
							>
								<option
									v-for="map in game.mode === 'TS'
										? allSlayerMaps
										: allObjectiveMaps"
									:key="`map-${map}`"
									:selected="map === game.map"
									:class="{
										warning: !getMapsForMode(
											game.mode
										).includes(map),
									}"
								>
									{{ map }}
								</option>
							</d-select>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script src="./BracketTable.index.js"></script>

<style lang="scss" src="./BracketTable.scss" />
