<template>
	<div class="microphone-hint">
		<h2>Permissions</h2>
		<p class="hint-text">
			When you proceed to the next screen you'll be asked to provide us
			with the permission to access your microphone. Of course this will
			be necessary for this survey to create recordings, so please pay
			attention to the according pop-ups. If you run into issues please
			make sure that your browser overall has access to your audio device.
			Thank you.
		</p>
		<router-link to="/question/1">
			<button>
				{{ nextPageText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import { nextPageText } from '@/config.js'
export default {
	name: 'MicrophoneHint',
	data () {
		return {
			nextPageText
		}
	}
}
</script>

<style lang="scss">
.hint-text {
	padding-bottom: 2rem;
}
</style>