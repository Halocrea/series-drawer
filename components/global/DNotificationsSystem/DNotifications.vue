<template>
	<div id="d-notifications" ref="notifContainer" />
</template>

<script>
import Vue from 'vue'

import DNotification from './DNotification/DNotification.vue'
import DNotifSystem  from './DNotificationsSystem.js'

export default {
	data () {
		return {
			busy          : false,
			destroyTimeout: null,
			instance      : null,
			notifList     : null,
			queue         : []
		}
	},

	beforeMount () {
		DNotifSystem.event.$on('notification:add', this.addNotif)
		DNotifSystem.event.$on('notification:close', () => {
			clearTimeout(this.destroyTimeout)
			this.instance.destroyElement()
			this.$refs.notifContainer.classList.toggle('active', false)
			this.$refs.notifContainer.classList.toggle('inactive', false)
			this.destroyTimeout = null
			this.instance       = null
			this.busy           = false
		})
	},

	methods: {
		addNotif (arg, nbTry) {
			nbTry = nbTry || 0
			if (this.busy && nbTry < 3) {
				// Retry in 2 seconds
				setTimeout(() => {
					this.addNotif(arg, ++nbTry)
				}, 2000)
			} else if (this.$refs.notifContainer && !this.instance) {
				const ComponentClass = Vue.extend(DNotification)
				this.instance        = new ComponentClass({
					propsData: { settings: arg }
				})
				this.instance.$mount()
				this.bindEventListeners()

				this.busy = true
				this.$refs.notifContainer.appendChild(this.instance.$el)
				setTimeout(() => {
					this.display()
				}, 10)
				this.planDestroy()
			}
		},

		bindEventListeners () {
			this.instance.$on('notification:pause', () => {
				clearTimeout(this.destroyTimeout)
			})
			this.instance.$on('notification:resume', () => {
				this.planDestroy()
			})
		},

		display () {
			if (!this.$refs.notifContainer) return

			setTimeout(() => {
				if (this.$refs.notifContainer)
					this.$refs.notifContainer.classList.toggle('inactive', true)
			}, 10)
			setTimeout(() => {
				if (this.$refs.notifContainer) {
					this.$refs.notifContainer.classList.toggle('active', true)
					this.$refs.notifContainer.classList.toggle(
						'inactive',
						false
					)
				}
			}, 1500)
		},

		hide () {
			if (!this.$refs.notifContainer) return

			this.$refs.notifContainer.classList.toggle('active', false)
			this.$refs.notifContainer.classList.toggle('inactive', true)
			setTimeout(() => {
				if (this.$refs.notifContainer) {
					this.$refs.notifContainer.classList.toggle(
						'inactive',
						false
					)
				}
			}, 1000)
		},

		planDestroy () {
			this.destroyTimeout = self.setTimeout(() => {
				this.hide()
				setTimeout(() => {
					this.instance.destroyElement()
					clearTimeout(this.destroyTimeout)
					this.destroyTimeout = null
					this.instance       = null
					this.busy           = false
				}, 2000)
			}, 5000)
		}
	}
}
</script>

<style scoped lang="scss">
#d-notifications {
	@apply fixed bottom-0 md:bottom-6 left-1/2 z-50;
	transform: translate3d(-50%, 0, 0);
}
</style>
