module.exports = {
	sharedSecretKey: 'm1uqfiDG.!KcgS%;E+QSrY%2+:m+6V',
	title: 'Curious Cat Inc.',
	logo: require('./img/logo.svg'),
	apiURL: 'http://0.0.0.0:9000',
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
	metaData: require('./assets/metaData'),
	maxTakeLength: 5000,
	/*
		Please see to https://github.com/ai/audio-recorder-polyfill for possible config
	*/
	recorderOptions: {
		mimeType: 'audio/wav',
		audioBitsPerSecond: 256000,
	}
}