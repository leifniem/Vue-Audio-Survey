import Requests from './requests'

export default {
	putMeta (data) {
		return Requests.jsonRequest('meta', data, 'PUT')
	}
}