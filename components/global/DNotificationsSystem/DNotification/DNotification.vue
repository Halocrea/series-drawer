<template>
	<div
		:class="'d-notif ' + (params.type || 'default')"
		@mouseover="pause"
		@mouseleave="resume"
	>
		<button class="d-notif__close-btn" tabindex="-1" @click="close">
			&times;
		</button>
		<div class="d-notif__inner">
			<ul class="d-notif__icon-wrapper">
				<li />
				<li />
				<li>
					<span class="d-notif__icon">
						<svg-icon
							:name="params.icon1.name"
							:class="'w-6 h-6 ' + params.icon1.class"
						/>
					</span>
					<span v-if="params.icon2" class="d-notif__icon">
						<svg-icon
							:name="params.icon2.name"
							:class="'w-6 h-6 ' + params.icon2.class"
						/>
					</span>
				</li>
			</ul>
			<div class="d-notif__body">
				<p class="pb-1">
					<strong>
						{{ params.title }}
					</strong>
				</p>
				<p class="pb-1">
					{{ params.content }}
				</p>
			</div>
		</div>
		<template v-if="params.action">
			<a
				v-if="
					params.action.target &&
						typeof params.action.target === 'function'
				"
				class="d-notif__footer"
				href="#"
				@click.prevent="params.action.target"
			>
				{{ params.action.text }}
			</a>
			<a
				v-else
				:href="params.action.link"
				:target="params.action.target"
				class="d-notif__footer mt-2"
			>
				{{ params.action.text }}
			</a>
		</template>
	</div>
</template>

<script src="./DNotification.index.js"></script>

<style lang="scss" src="./DNotification.scss" />
