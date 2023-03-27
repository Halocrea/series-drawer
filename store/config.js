import {
	btbObjectives,
	btbSlayers,
	objectives,
	slayers
} from '~/utils/mapModeCombos'

export const state = () => ({
	objectives,
	slayers,
	specialMode: 'TS',
	tSGames    : [1, 4, 6, 8],
	weLoveBTB  : false
})

export const getters = {
	getMapsWithCount: state =>
		state.slayers.reduce((p, c) => count(p, c, 'map'), state.objectives.reduce((p, c) => count(p, c, 'map'), [])),
	getModesWithCount: state =>
		state.slayers.reduce((p, c) => count(p, c, 'mode'), state.objectives.reduce((p, c) => count(p, c, 'mode'), [])),
	getObjectives : state => state.objectives,
	getSlayerMaps : state => state.slayers.map(s => s.map),
	getSlayers    : state => state.slayers,
	getSpecialMode: state => state.specialMode,
	getTSGames    : state => state.tSGames,
	getWeLoveBTB  : state => state.weLoveBTB
}

export const mutations = {
	setBTBSettings (state) {
		state.weLoveBTB  = true
		state.objectives = btbObjectives
		state.slayers    = btbSlayers
	},

	setDefaultSettings (state) {
		state.weLoveBTB  = false
		state.objectives = objectives
		state.slayers    = slayers
	},

	setObjectives (state, objectives) {
		state.objectives = objectives
	},

	setSlayers (state, slayers) {
		state.slayers = slayers
	},

	setSpecialMode (state, specialMode) {
		state.specialMode = specialMode
	},

	setTSGames (state, tSGames) {
		state.tSGames = tSGames
	}
}

const count = (p, c, type) => {
	const exists = p.find(m => m.name === c[type])
	if(!exists) p.push({ name: c[type], count: 1 })
	else exists.count += 1
	return p
}
