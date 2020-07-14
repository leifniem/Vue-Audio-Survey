<template>
	<!-- <audio-recorder
			class="recorder"
			bit-rate="256"
			sample-rate="16000"
			format="wav"
			:time=0.1
			:filename="'time and date goes here' + id + '_' + 'session_id'"
			successful-upload="console.log('meow')"
			failed-upload="console.log('sad meow')"
			mic-failed="console.log('sad meow')"
			upload-url="" -->
	<div>
		<div class="recorder">
			<audio id="player" :src="currentURL" controls></audio>
			<button class="record-button" @click="switchRecordingState">
				{{ buttonText }}
			</button>
			<div :class="{ 'record-dot': true, animating: isRecording }"></div>
		</div>
	</div>
</template>

<script>
import {
	maxTakeLength,
	recorderOptions,
	allowRetakes,
	startRecordingText,
	stopRecordingText,
	retakeText,
} from '@/config.js'
import RecorderMixin from '@/js/recorderMixin'

let recorder
let chunks = []
let audioBlob
let audioUrl

export default {
	name: 'Recorder',
	props: ['id'],
	mixins: [RecorderMixin],
	methods: {
		/*
			Method to initiate recording the current Question
		*/
		switchRecordingState() {
			this.isRecording ? this.stopRecording() : this.startRecording()
		},
	},
	computed: {
		buttonText () {
			if (this.isRecording) {
				return stopRecordingText
			} else if (!this.isRecording && this.currentURL != null && allowRetakes) {
				return retakeText
			} else {
				return startRecordingText
			}
		}
	}
}
</script>

<style lang="scss">
.recorder {
	display: grid;
	grid-gap: 1rem;
	width: 100%;
	grid-template-columns: 1fr 3fr 1fr;
	grid-template-areas:
		'x player y'
		'z button dot';
	justify-content: center;
	align-items: center;
}

#player {
	grid-area: player;
}

@keyframes pulse {
	0% {
		opacity: 0;
	}

	0% {
		opacity: 1;
	}
}

.record-button {
	grid-area: button;
}

.record-dot {
	grid-area: dot;
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
