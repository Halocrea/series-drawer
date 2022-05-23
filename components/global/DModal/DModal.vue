<template>
	<transition name="d-transition--fade" mode="out-in">
		<div
			v-if="open"
			ref="modalwrapper"
			class="d-modal"
			@click="(e) => onClose(overlayClose, e)"
		>
			<transition name="d-transition--vertical" mode="out-in">
				<div
					v-show="showModal"
					class="d-modal__modal js-prevent-modal-close"
				>
					<slot name="title" />
					<div class="py-2">
						<slot name="content" />
					</div>
					<div class="flex justify-between items-center pt-2">
						<div>
							<d-button
								type="button"
								tabindex="-1"
								@click="() => onClose()"
							>
								Close
							</d-button>
						</div>
						<div>
							<slot name="actions" />
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script src="./DModal.index.js"></script>

<style lang="scss" src="./DModal.scss"></style>
