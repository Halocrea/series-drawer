export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title    : 'HaloCrea - Draw series for tournament (HCS settings)',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name   : 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{
				rel  : 'apple-touch-icon',
				sizes: '180x180',
				href : '/apple-touch-icon.png'
			},
			{
				rel  : 'icon',
				type : 'image/png',
				sizes: '32x32',
				href : '/favicon-32x32.png'
			},
			{
				rel  : 'icon',
				type : 'image/png',
				sizes: '16x16',
				href : '/favicon-16x16.png'
			},
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'manifest', href: '/site.manifest' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [{ src: '~assets/styles/main.scss', lang: 'scss' }],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ mode: 'client', src: '~plugins/notifications' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: false,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://github.com/nuxt-community/svg-sprite-module#readme
		'@nuxtjs/svg-sprite',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	svgSprite: {
		input : '~/assets/icons/svg',
		output: '~/assets/icons/gen'
	}
}
