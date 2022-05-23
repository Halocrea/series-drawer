import Vue                  from 'vue'
import DNotificationsSystem from '~/components/global/DNotificationsSystem/DNotificationsSystem'

export default ({ store }) => {
	Vue.use(DNotificationsSystem, {
		store
	})
}
