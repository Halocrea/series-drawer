<template>
	<form @submit.prevent="submit">
		<div class="flex flex-wrap items-center">
			<div class="w-1/2 p-4">
				<d-select
					v-model="selectedType"
					@change="v => selectedType = parseInt(v)"
				>
					<template #label> Type of Bracket </template>
					<option
						v-for="type in types"
						:key="`bracket-type-${type.index}`"
						:value="type.index"
					>
						{{ type.label }}
					</option>
				</d-select>
			</div>
			<div class="w-1/2 p-4">
				<d-text-field
					v-model="nbTeams"
					type="number"
					:disabled="selectedType === types.GRAND_FINALS.index"
				>
					How many teams
				</d-text-field>
			</div>
		</div>
		<div class="flex flex-wrap items-center">
			<div class="w-1/2 p-4">
				<d-text-field v-model="nbGamesNormal" type="number">
					Games per round (normal)
				</d-text-field>

			</div>
			<div class="w-1/2 p-4">
				<d-text-field
					v-model="nbGamesFinals"
					type="number"
					:disabled="[types.GRAND_FINALS.index, types.POOL_PLAY.index].includes(selectedType)"
				>
					Games per round (finals)
				</d-text-field>
			</div>
		</div>
		<transition name="d-transition--vertical" mode="out-in">
			<div
				v-if="nbTeams <= 1024 && nbRounds > 0"
				class="w-full"
			>
				<div
					v-if="![types.GRAND_FINALS.index, types.POOL_PLAY.index].includes(selectedType) && nbGamesNormal !== nbGamesFinals"
					class="m-4"
				>
					The tool will generate
					<span class="font-bold">
						{{ nbRounds - 1 }}
					</span>
					Bo{{ nbGamesNormal }} series, and
					<span class="font-bold">
						1
					</span>
					Bo{{ nbGamesFinals }} series.
				</div>
				<div
					v-else
					class="m-4"
				>
					The tool will generate
					<span class="font-bold">
						{{ nbRounds }}
					</span>
					Bo{{ nbGamesNormal }} series.
				</div>
			</div>
		</transition>
		<div class="m-4 flex justify-end">
			<d-button variant="primary" type="submit" :disabled="!canSubmit">
				Generate Bracket
			</d-button>
		</div>
	</form>
</template>

<script src="./ConfigForm.index.js"></script>
