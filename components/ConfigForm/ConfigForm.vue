<template>
	<form @submit.prevent="submit">
		<div class="flex flex-wrap items-center">
			<div class="m-4">
				<d-select
					v-model="selectedType"
					@change="(v) => (selectedType = v)"
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
			<div class="m-4">
				<d-text-field v-model="nbRounds" type="number">
					How many rounds
				</d-text-field>
			</div>
		</div>
		<div class="flex flex-wrap items-center">
			<div class="m-4">
				<d-text-field v-model="nbGamesNormal" type="number">
					Games per round (normal)
				</d-text-field>
			</div>
			<div class="m-4">
				<d-text-field v-model="nbGamesFinals" type="number">
					Games per round (finals)
				</d-text-field>
			</div>
		</div>
		<div class="m-4 flex justify-end">
			<d-button variant="primary" type="submit" :disabled="!canSubmit">
				Generate Bracket
			</d-button>
		</div>
	</form>
</template>

<script src="./ConfigForm.index.js"></script>
