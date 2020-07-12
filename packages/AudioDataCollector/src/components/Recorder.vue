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
		<div class="recorder">
			<button class="record" @click="switchRecordingState">
				{{ isRecording ? stopRecordingText : startRecordingText }}
			</button>
			<div :class="{ 'record-dot': true, animating: isRecording }"></div>
		</div>
	</div>
</template>

<script>
import {
	maxTakeLength,
	recorderOptions,
	startRecordingText,
	stopRecordingText,
} from '@/config.js'
import RecorderMixin from '@/js/recorderMixin'

let recorder
let chunks = []
let audioBlob
let audioUrl

export default {
	name: 'Recorder',
	props: ['id'],
	data() {
		return {
			startRecordingText,
			stopRecordingText
		}
	},
	mixins: [RecorderMixin],
	methods: {
		/*
			Method to initiate recording the current Question
		*/
		switchRecordingState() {
			this.isRecording ? stopRecording() : startRecording()
		},
		createAudioFile() {
			console.log(chunks)
			this.audioBlob = new Blob(this.chunks, {
				type: recorderOptions.mimeType,
			})
			this.audioUrl = windows.URL.createObjectURL(blob)
			this.chunks = []
		},
	},
}
</script>

<style lang="scss" scoped>
.recorder {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding-left: 1.5rem;
}

@keyframes pulse {
	0% {
		opacity: 0;
	}

	0% {
		opacity: 1;
	}
}

.record-dot {
	&:after {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		display: block;
		content: '';
		margin-left: 1rem;
		opacity: 0;
		background: rgb(233, 67, 67);
	}

	&.animating:after {
		animation: pulse 1s alternate infinite;
	}
}
</style>
