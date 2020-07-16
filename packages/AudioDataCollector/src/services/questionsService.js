import Requests from './requests'

export default {
	async uploadAudio(data) {
		return Requests.multipartFormDataRequest('/audio', data)
	},
}
