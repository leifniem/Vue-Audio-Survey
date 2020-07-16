import Requests from './requests'
import { setToken } from '@/js/tokenHandler'

export default {
	async putMeta (data) {
		return Requests.jsonRequest('/meta', data, 'PUT')
	}
}