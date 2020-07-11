import { maxTakeLength, audioMimeType, audioBitrate } from '@/config.js'

export default class Recorder {
	constructor() {
		/*
		Request Access to microphone by the native browser Media API
	*/
		if (MediaRecorder.notSupported) {
			console.error('MediaRecorder API is not supported')
		}
		this.recorderOptions = {
			mimeType: audioMimeType || 'audio/webm',
			audioBitsPerSecond: audioBitrate || 256000,
		}
		this.recorder = null
		this.chunks = []
		this.audioBlob = null
		this.audioUrl = null

		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: false,
			})
			.then(this.microPhoneAccessGranted)
			.catch((e) => {
				console.error(e)
			})
	}

	createAudioFile() {
		this.audioBlob = new Blob(this.chunks, {
			type: this.recorderOptions.mimeType,
		})
		this.audioUrl = windows.URL.createObjectURL(blob)
		this.chunks = []
	}

	/*
		Handles Access to the granted microphone permission and initialize recorder
	*/
	microPhoneAccessGranted(stream) {
		this.recorder = new MediaRecorder(stream, this.recorderOptions)
		/* Push available data to buffer */
		this.recorder.ondataavailable = (e) => {
			this.chunks.push(e.data)
		}
		this.recorder.onstart = () => {
			this.isRecording = true
		}
		this.recorder.onstop = () => {
			this.isRecording = false
		}
	}

	start() {
		this.recorder.start()
	}

	stop() {
		this.recorder.stop()
		// initiateUpload(audioBlob)
		return createAudioFile()
	}
}
