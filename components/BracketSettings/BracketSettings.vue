<template>
	<div class="w-full">
		<div class="w-full my-4 px-4 py-2 text-center bg-yellow-600 text-white">
			<p class="font-bold">Notice</p>
			<p>Your modified settings will be kept only for this session.</p>
		</div>
		<div class="w-full my-4 p-4">
			<div class="max-w-2xl text-sm">
				<p class="font-bold">Special games in a round</p>
				<p>These are used by default to define which games in a round are Team Slayers.</p>
				<p>If you don't need this, you can delete the content of the text field hereafter.</p>
				<p>If you need to fine-tune this, write in the text field the game numbers that need to be Team Slayer games in your series (comma-separated).</p>
			</div>
			<d-text-field
				v-model="editableTSGames"
				:error="tSGamesError"
			>
				List of "special" games in a round
			</d-text-field>
		</div>
		<div class="w-full flex justify-between items-center mb-4 px-4">
			<d-button
				@click="$emit('close')"
			>
				Cancel
			</d-button>
			<d-button
				variant="primary"
				:disabled="!canSubmit"
				@click="submit"
			>
				Save
			</d-button>
		</div>
		<hr>
		<div class="w-full my-4 p-4">
			<p class="font-bold">Map-Mode combos for "regular" games</p>
			<div
				v-for="(combo, index) in editableObjectives"
				:key="`combo-${index}`"
				class="w-full flex items-center -mb-4"
			>
				<div class="px-2 w-5/12">
					<d-select
						:value="combo.mode"
						@change="v => combo.mode = v"
					>
						<option
							v-for="(m, i) in allModes"
							:key="`combo-${index}-mode-${i}`"
							:value="m.key"
						>
							{{ m.name }} ({{ m.key }})
						</option>
					</d-select>
				</div>
				<div class="px-2 w-5/12">
					<d-select
						:value="combo.map"
						@change="v => combo.map = v"
					>
						<option
							v-for="(m, i) in allMaps"
							:key="`combo-${index}-mode-${i}`"
							:value="m"
						>
							{{ m }}
						</option>
					</d-select>
				</div>
				<div class="flex justify-end px-2 w-1/6">
					<d-button
						size="sm"
						variant="danger"
						:disabled="editableObjectives.length <= 1"
						@click="() => removeObjective(index)"
					>
						<svg-icon
							name="trash-2"
							class="w-3 h-3"
						/>
					</d-button>
				</div>
			</div>
			<div
				v-if="editableObjectives[editableObjectives.length - 1].map && editableObjectives[editableObjectives.length - 1].mode"
				class="w-full flex justify-stretch mt-4"
			>
				<d-button
					size="sm"
					variant="success"
					additionnal-classes="w-full"
					@click="addObjective"
				>
					<span class="inline-block w-full text-center">
						Add combo
					</span>
				</d-button>
			</div>
		</div>
		<div class="w-full flex justify-between items-center mb-4">
			<d-button
				@click="$emit('close')"
			>
				Cancel
			</d-button>
			<d-button
				variant="primary"
				:disabled="!canSubmit"
				@click="submit"
			>
				Save
			</d-button>
		</div>
		<hr>
		<div class="w-full my-4 p-4">
			<p class="font-bold">Map-Mode combos for "special" games</p>
			<div class="w-full flex items-center gap-2">
				<div class="flex-none font-bold">
					Special mode:
				</div>
				<div class="flex-1">
					<d-select
						:value="editableSpeMode"
						@change="v => editableSpeMode = v"
					>
						<option
							v-for="(m, i) in allModes"
							:key="`spe-mode-mode-${i}`"
							:value="m.key"
						>
							{{ m.name }} ({{ m.key }})
						</option>
					</d-select>
				</div>
			</div>
			<div
				v-for="(combo, index) in editableSlayers"
				:key="`combo-${index}`"
				class="w-full flex items-center -mb-4"
			>
				<div class="px-2 w-5/12">
					<span class="px-4">
						{{ allModes.find(m => m.key === editableSpeMode).name }}
						({{ allModes.find(m => m.key === editableSpeMode).key }})
					</span>
				</div>
				<div class="px-2 w-5/12">
					<d-select
						:value="combo.map"
						@change="v => combo.map = v"
					>
						<option
							v-for="(m, i) in allMaps"
							:key="`combo-${index}-mode-${i}`"
							:value="m"
						>
							{{ m }}
						</option>
					</d-select>
				</div>
				<div class="flex justify-end px-2 w-1/6">
					<d-button
						size="sm"
						variant="danger"
						:disabled="editableSlayers.length <= 1"
						@click="() => removeSlayer(index)"
					>
						<svg-icon
							name="trash-2"
							class="w-3 h-3"
						/>
					</d-button>
				</div>
			</div>
			<div
				v-if="editableSlayers[editableSlayers.length - 1].map && editableSlayers[editableSlayers.length - 1].mode"
				class="w-full flex justify-stretch mt-4"
			>
				<d-button
					size="sm"
					variant="success"
					additionnal-classes="w-full"
					@click="addSlayer"
				>
					<span class="inline-block w-full text-center">
						Add Map
					</span>
				</d-button>
			</div>
		</div>
		<div class="w-full flex justify-between items-center">
			<d-button
				@click="$emit('close')"
			>
				Cancel
			</d-button>
			<d-button
				variant="primary"
				:disabled="!canSubmit"
				@click="submit"
			>
				Save
			</d-button>
		</div>
	</div>
</template>

<script src="./BracketSettings.index.js"></script>
