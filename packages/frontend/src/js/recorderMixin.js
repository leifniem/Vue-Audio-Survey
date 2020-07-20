import { recorderOptions, maxTakeLength } from '@/config'

export default {
	data() {
		return {
			isRecording: false,
			chunks: [],
			currentBlob: null,
			currentURL: null,
			timer: null,
		}
	},

	methods: {
		// get AudioStream from Browser API
		async getStream() {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false
			})
			return stream
		},
		// Fires when recording is stopped
		processStoppedRecording() {
			if (this.timer) clearTimeout(this.timer)
			this.timer = null
			this.isRecording = false
			this.currentBlob = new Blob(this.chunks, {
				type: recorderOptions.mimeType,
			})
			this.currentURL = URL.createObjectURL(this.currentBlob)
			this.chunks = []
		},
		// Initializes a MediaRecorder if a stream exists
		createRecorder() {
			if (!this.$_stream) return
			this.$_recorder = new MediaRecorder(this.$_stream, recorderOptions)
			this.$_recorder.ignoreMutedMedia = true
			this.$_recorder.addEventListener('start', () => {
				this.isRecording = true
				if (maxTakeLength && maxTakeLength > 0) {
					this.timer = setTimeout(
						() => this.$_recorder.stop(),
						maxTakeLength
					)
				}
			})
			this.$_recorder.addEventListener(
				'dataavailable',
				(e) => {
					if (e.data && e.data.size > 0) this.chunks.push(e.data)
				},
				true
			)
			this.$_recorder.addEventListener(
				'stop',
				this.processStoppedRecording,
				true
			)
		},
		async startRecording() {
			if (this.isRecording) return
			try {
				if (this.$_recorder == null) {
					this.createRecorder()
					this.$_recorder.start()
				} else {
					this.$_recorder.start()
				}
			} catch (err) {
				console.error(err)
			}
		},
		stopRecording() {
			if (!this.isRecording) return
			this.$_recorder.stop()
			this.$_stream.getTracks().forEach((track) => track.stop())
		},
	},

	async mounted() {
		try {
			this.$_stream = await this.getStream()
		} catch (e) {
			console.error(e);
			alert(`There was an issue detecting your microphone input.

Please make sure you accepted the request for microphone input and your browser is allowed to access your audio device.`)
		}
	},
}
