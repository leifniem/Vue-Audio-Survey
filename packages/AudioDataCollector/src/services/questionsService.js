import Requests from './requests'

export default {
	uploadAudio(data) {
		return Requests.multipartFormDataRequest('audio', data)
	},
}
