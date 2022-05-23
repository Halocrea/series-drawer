<template>
	<div
		class="inline-block pb-2 border border-gray-300 dark:border-white rounded-lg"
	>
		<div class="w-full flex justify-between">
			<div class="mt-1">
				<d-table-infos
					:table-data="displayedData"
					:limit="displayLimit"
					:offset="displayOffset"
					:results-per-page="resultsPerPage"
					:show-pagination="false"
				/>
			</div>
			<div class="px-2">
				<d-text-field v-model="searchValue" :rounded="true">
					Search
					<template #prefix>
						<svg-icon name="search" class="w-4 h-4" />
					</template>
				</d-text-field>
			</div>
		</div>
		<table class="table-auto w-full -mt-4">
			<thead>
				<tr
					class="border-b border-gray-300 dark:border-white dark:border-opacity-30"
				>
					<th
						v-for="column in columnsDefinition"
						:key="column.key"
						class="p-2"
						@click="
							() =>
								column.searchable
									? toggleSort(column.key)
									: true
						"
					>
						<div
							:class="{
								'w-full flex justify-start items-center p-2 text-left rounded-md': true,
								'bg-blue-100 hover:bg-blue-200 active:bg-blue-300':
									sortBy === column.key,
								'cursor-pointer': column.searchable,
								'hover:bg-gray-100 active:bg-gray-200':
									column.searchable && sortBy !== column.key,
							}"
						>
							<span>{{ column.label }}</span>
							<svg-icon
								v-if="column.searchable"
								:name="
									sortBy !== column.key ||
										sortOrder === 'desc'
										? 'chevron-down'
										: 'chevron-up'
								"
								:class="{
									'w-3 h-3 ml-2': true,
									'text-gray-400': sortBy !== column.key,
								}"
							/>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, index) in paginatedData"
					:key="`row-${displayOffset}-${displayLimit}-${index}-${timestamp}`"
					class="border-b border-gray-300 dark:border-white dark:border-opacity-30 hover:bg-gray-100"
				>
					<template v-for="{ key } in columnsDefinition">
						<td
							v-if="Object.keys(row).includes(key)"
							:key="`row-${index}-cell-${key}-${timestamp}`"
							class="p-2 text-left"
						>
							<template v-if="!!$scopedSlots[key]">
								<slot
									:name="key"
									:row="row"
									:column-name="key"
								/>
							</template>
							<template v-else>
								{{ row[key] }}
							</template>
						</td>
					</template>
				</tr>
			</tbody>
		</table>
		<d-table-infos
			:table-data="displayedData"
			:limit="displayLimit"
			:offset="displayOffset"
			:page-nb="pageNb"
			:results-per-page="resultsPerPage"
			@change-page="(v) => (pageNb = v)"
		/>
	</div>
</template>

<script src="./DTable.index.js"></script>
