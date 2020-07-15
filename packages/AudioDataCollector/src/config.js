module.exports = {
	//
	title: 'Curious Cat Inc.',
	logo: require('./img/logo.svg'),
	apiURL: 'localhost:9000',
	individualApiEndpoints: false,
	startRecordingText: 'Start Recording',
	stopRecordingText: 'Stop Recording',
	allowRetakes: true,
	retakeText: 'Record another take',
	nextPageText: 'Proceed →',
	finishText: 'Complete Survey ✔',
	subtitle: 'Survey to train hoomans to obey',
	instructions: require('./assets/instructions'),
	privacyPolicy: require('./assets/privacyPolicy'),
	privacyAcknowledgement: 'I fully understand Privacy Policy above and acknowledge it.',
	maxTakeLength: 5000,
	/*
		Please see to https://github.com/ai/audio-recorder-polyfill for possible config
	*/
	recorderOptions: {
		mimeType: 'audio/wav',
		audioBitsPerSecond: 256000,
	}
}