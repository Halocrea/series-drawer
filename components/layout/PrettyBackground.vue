<template>
	<div class="fixed top-0 left-0 w-screen h-screen">
		<div class="pretty-bg__wrapper absolute top-0 left-0 w-full h-full bg-gray-900">
			<div
				id="pretty-bg"
				ref="prettyBg"
				class="pretty-bg"
			/>
		</div>
		<transition name="d-transition--fade" mode="out-in">
			<div
				v-if="loading"
				class="absolute top-0 left-0 w-full h-full bg-gray-900"
			/>
		</transition>
	</div>
</template>

<script>
export default {
	data: () => ({
		loading: true
	}),

	created () {
		this.setYTBackground()
	},

	methods: {
		setYTBackground () {
			const tag = document.createElement('script')
			tag.src   = 'https://www.youtube.com/iframe_api'

			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
			let player

			window.onYouTubeIframeAPIReady = () => {
				player = new YT.Player("pretty-bg", { // eslint-disable-line
					height    : Math.max(window.innerHeight, window.innerWidth * 0.5625) + 120,
					width     : Math.max(window.innerWidth, window.innerHeight * 1.78) + 120,
					videoId   : 'eCHFJJddr2o',
					playerVars: {
						autoplay: 1,
						controls: 0,
						mute    : 1,
						loop    : 1,
						playlist: 'eCHFJJddr2o',
						rel     : 0,
						showinfo: 0
					},
					events: {
						onReady      : onPlayerReady, // eslint-disable-line
						onStateChange: onPlayerStateChange // eslint-disable-line
					}
				})
			}

			window.onPlayerReady = event => {
				player.playVideoAt(0)
				event.target.playVideo()
				event.target.setPlaybackQuality('hd1080')
			}

			window.onPlayerStateChange = event => {
				if (event.data == YT.PlayerState.BUFFERING) // eslint-disable-line
			        event.target.setPlaybackQuality('hd1080')

				if (event.data === YT.PlayerState.PLAYING && this.loading) { // eslint-disable-line
					setTimeout(() => {
						this.loading = false
					}, 500)
				}
			}
		}
	}
}
</script>

<style lang="scss">
.pretty-bg {
	@apply absolute z-0 top-1/2 left-1/2 min-w-full min-h-full pointer-events-none;

	transform: translate3d(-50%, -50%, 0);

	&__wrapper::after {
		@apply absolute top-0 left-0 w-full h-full bg-black bg-opacity-30;
		content: ""
	}
}
</style>