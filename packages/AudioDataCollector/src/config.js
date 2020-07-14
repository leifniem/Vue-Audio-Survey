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
	introduction: `
		In this app you'll be asked to record a few samples of your voice in order to train cats to listen to humans.
	`,
	privacyPolicy: `
	<h3>Foo</h3>

	<h4>Bar</h4>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia nostrum consequuntur earum nobis consectetur laboriosam. Non quo autem repellendus repudiandae soluta consectetur sint maxime dignissimos alias! Officia, distinctio. Voluptatibus exercitationem quas expedita?

	<h4>Baz</h4>
	Eum ullam deserunt accusantium voluptatum illum ad doloribus beatae aliquam soluta molestias? Deserunt eveniet, nesciunt natus dolorem nihil sed itaque quis. Incidunt, officiis debitis dolore perferendis esse, voluptas molestias odit suscipit repellendus quia amet mollitia nobis quod, harum praesentium asperiores earum cum iste eveniet eum. Est excepturi quod eius atque autem deleniti quisquam saepe vero nostrum ipsum. Perspiciatis mollitia iure, obcaecati tenetur ipsa repudiandae dolore aspernatur veniam ab!
	`,
	privacyAcknowledgement: 'I fully understand Privacy Policy above and acknowledge it.',
	maxTakeLength: 5000,
	/*
		Please see to https://github.com/ai/audio-recorder-polyfill for possible config
	*/
	recorderOptions: {
		// mimeType: 'audio/webm',
		audioBitsPerSecond: 256000,
	}
}