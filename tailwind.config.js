module.exports = {
	// mode   : 'jit',
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}'
	],
	darkMode: 'class', // or 'media'
	theme   : {
		extend: {}
	},
	variants: {
		extend: {
			backgroundColor: ['disabled']
		}
	},
	plugins: []
}
