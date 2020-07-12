export default {
	data () {
		return {
			hasPermission: false,
			isRecording: false,
			chunks: [],
			currentBlob: null
		}
	},

	methods: {
		async getStream () {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			})
			return stream
		},
		createRecorder () {
			if(!this.$_stream) return
			this.$_recorder.ignoreMutedMedia = true
			this.$_recorder.addEventListener('start', () => {
				this.isRecording = true
			})
			this.$_recorder.addEventListener('dataavailable', (e) => {
				if (e.data && e.data.size > 0) this.chunks.push(e.data)
			}, true)
			this.$_recorder.addEventListener('stop', () => {
				this.isRecording = false
				this.currentBlob = new Blob(this.chunks)
				this,chunks = []
			}, true)
		},
		async startRecording () {
			if (this.isRecording) return
			try {
				if (this.$_recorder = null) {
					this.$_stream = await getStream()
					this.createRecorder()
				}
				this.$_recorder.start()
			} catch (err) {
				console.error(err);
			}
		},
		stopRecording () {
			if (!this.isRecording) return
			this.$_recorder.stop()
			this.$_stream.getTracks().forEach(track => track.stop())
		},
	},

	mounted () {
		if (MediaRecorder.notSupported) {
			console.error('MediaRecorder API is not supported')
		}
	}
}