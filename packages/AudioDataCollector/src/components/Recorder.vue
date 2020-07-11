<template>
	<!-- <audio-recorder
			class="recorder"
			bit-rate="256"
			sample-rate="16000"
			format="wav"
			:time=0.1
		/> -->
	<!-- :filename="'time and date goes here' + id + '_' + 'session_id'"
			successful-upload="console.log('meow')"
			failed-upload="console.log('sad meow')"
			mic-failed="console.log('sad meow')"
			upload-url="" -->
	<div>
		<audio id="player"></audio>
		<button class="record" @click="switchRecordingState">
			{{ isRecording ? 'Stop recording' : 'Start recording' }}
		</button>
	</div>
</template>

<script>
import Recorder from '@/js/recorder'

export default {
	name: 'Recorder',
	props: ['id'],
	data() {
		return {
			isRecording: false,
		}
	},
	methods: {
		/*
			Method to initiate recording the current Question
		*/
		switchRecordingState() {
			if (!this.isRecording) {
				recorder.start()
				/* If a max length is set for takes invoke it */
				if (maxTakeLength) setTimeout(() => {
					recorder.stop()
				}, maxTakeLength);
			} else {
				player.src = recorder.stop()
			}
		},
	},
	beforeMount () {
		const recorder = new Recorder()
	}
}
</script>
