<template>
	<div class="paginated-list w-full">
		<d-text-field v-model="searchValue" :rounded="true">
			Search
			<template #prefix>
				<svg-icon name="search" class="w-4 h-4" />
			</template>
		</d-text-field>
		<div
			v-for="(item, index) in paginatedData"
			:key="`item-${index}`"
			:class="{
				'w-full px-4 py-2': true,
				'cursor-pointer hover:bg-gray-200 active:bg-gray-300':
					!isActive(item),
				'bg-green-600 text-white': isActive(item),
			}"
			@click="() => clickOnItem(item)"
		>
			{{ item[labelKey] }}
		</div>
		<div class="w-full flex justify-between items-center mt-4">
			<div>
				Showing {{ displayOffset + 1 }}-{{ displayLimit }} of
				{{ displayData.length }} items
			</div>
			<div class="flex-none flex items-center">
				<d-button
					size="xs"
					:disabled="pageNb === 1"
					@click="() => (pageNb -= 1)"
				>
					&lt;
				</d-button>
				<d-button
					size="xs"
					:disabled="pageNb > displayData.length / resultsPerPage"
					@click="() => (pageNb += 1)"
				>
					&gt;
				</d-button>
			</div>
		</div>
	</div>
</template>

<script src="./PaginatedList.index.js"></script>

<style lang="scss" src="./PaginatedList.scss" />
