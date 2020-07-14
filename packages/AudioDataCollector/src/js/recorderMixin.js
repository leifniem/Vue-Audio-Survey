import { recorderOptions, maxTakeLength } from '@/config'

export default {
	data() {
		return {
			hasPermission: false,
			isRecording: false,
			chunks: [],
			currentBlob: null,
			currentURL: null,
			timer: null,
		}
	},

	methods: {
		async getStream() {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true
			})
			return stream
		},
		createRecorder() {
			if (!this.$_stream) return
			this.$_recorder = new MediaRecorder(this.$_stream, recorderOptions)
			this.$_recorder.ignoreMutedMedia = true
			this.$_recorder.addEventListener('start', () => {
				this.isRecording = true
				if (maxTakeLength && maxTakeLength > 0) {
					this.timer = setTimeout(() => this.$_recorder.stop(), maxTakeLength)
				}
				console.log('Started recording')
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
				() => {
					console.log('Stopped recording')
					if (this.timer) clearTimeout(this.timer)
					this.timer = null
					this.isRecording = false
					this.currentBlob = new Blob(this.chunks)
					this.currentURL = URL.createObjectURL(this.currentBlob)
					this.chunks = []
				},
				true
			)
		},
		async startRecording() {
			if (this.isRecording) return
			try {
				if (this.$_recorder == null) {
					this.$_stream = await this.getStream()
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

	mounted() {
		if (MediaRecorder.notSupported) {
			console.error('MediaRecorder API is not supported')
		}
	},
}
