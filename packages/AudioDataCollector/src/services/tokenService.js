import Requests from './requests'

export default {
	async requestToken (sessionID) {
		return Requests.jsonRequest('/auth', {
			sessionID
		})
	}
}