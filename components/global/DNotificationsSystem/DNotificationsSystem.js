import DNotifications from './DNotifications.vue'

const Plugin = {
	install (Vue, options = {}) {
		/**
		 * Making sure the plugin is installed only once
		 */
		if (this.installed) return

		this.installed   = true
		this.event       = new Vue()
		this.translation = {
			$store: options.store
		}

		this.store = new Vue({
			data: {
				notifList: null
			}
		})

		Vue.component('DNotifications', DNotifications)

		this.initPlugin()

		/**
		 * Plugin API
		 */
		Vue.prototype.$notif = {
			emit (notif) {
				notif.stamp  = new Date().getTime()
				notif.unread = true
				Plugin.event.$emit('notification:add', notif)
			},

			get count () {
				return Plugin.store.notifList.length
			},

			get store () {
				return Plugin.store.$data
			},

			get unread () {
				return Plugin.store.notifList.filter((n) => n.unread === true)
					.length
			}
		}
	},

	initPlugin () {}
}

export default Plugin
