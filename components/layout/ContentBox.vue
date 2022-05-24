<template>
	<div class="c-content-box">
		<slot />
	</div>
</template>

<style lang="scss">
.c-content-box {
	@apply w-full my-2 p-4 bg-black bg-opacity-30 backdrop-blur-2xl border border-gray-300 text-white;
}
</style>
