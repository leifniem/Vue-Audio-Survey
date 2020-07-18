import Requests from './requests'

export default {
	requestToken (sessionID) {
		return Requests.jsonRequest('/auth', {
			sessionID
		})
	}
}