<template>
	<div>
		<div class="recorder">
			<audio id="player" :src="currentURL" controls></audio>
			<button
				class="record-button"
				@click="switchRecordingState"
				:disabled="blockRecording"
			>
				{{ recordButtonText }}
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
	props: ['id', 'index'],
	mixins: [RecorderMixin],
	data() {
		return {
			// If recording exists for this question make it available
			// (default for  currentURL is null)
			currentURL: this.$store.getters.getQuestionById(this.id).recordURL,
		}
	},
	methods: {
		// Method to initiate recording the current Question
		switchRecordingState() {
			if (this.isRecording) {
				this.stopRecording()
			} else {
				this.startRecording()
				this.$store.commit('setRecordForQuestion', {
					id: this.id,
					recordURL: null,
					blob: null,
				})
			}
		},
	},
	computed: {
		recordButtonText() {
			if (this.isRecording) {
				return stopRecordingText
			} else if (
				!this.isRecording &&
				this.currentURL != null &&
				allowRetakes
			) {
				return retakeText
			} else {
				return startRecordingText
			}
		},
		// Block recording a new take if retakes aren't allowed and there is a take
		// (Be aware URLs go back to null on reload, duplicates can be caught on server)
		blockRecording() {
			return !allowRetakes && this.currentURL !== null
		},
	},
	watch: {
		// if currentURL changes (recording is available) notify store and upload
		currentURL(val) {
			if (
				this.$store.getters.getQuestionById(this.id).recordURL !== val
			) {
				this.$store.dispatch('writeAudio', {
					id: this.id,
					recordURL: val,
					blob: this.currentBlob,
					index: this.index,
				})
			}
		},
		// Triggers when navigating between questions and loads potential recordings
		id(val) {
			this.currentBlob = null
			this.currentURL = this.$store.getters.getQuestionById(val).recordURL
		},
	},
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
