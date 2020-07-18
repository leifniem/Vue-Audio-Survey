import { apiURL } from '@/config.js'
import { getToken } from '@/js/tokenHandler'

export default {
	async jsonRequest(endpoint, data, method) {
		let headers = {
			'Content-Type': 'application/json',
		}
		if (getToken() != null) headers['Authorization'] = 'Bearer ' + getToken()
		try {
			const res = await fetch(`${apiURL}/${endpoint}`, {
				method,
				headers,
				body: JSON.stringify(data),
			})
			const resParse = await res.json()
			return resParse
		} catch (error) {
			console.error(error)
			return null
		}
	},
	async multipartFormDataRequest(endpoint, data) {
		let formData = new FormData()
		for (let key in data) {
			formData.append(key, data[key])
		}
		headers = {}
		if (getToken() != null) headers['Authorization'] = 'Bearer ' + getToken()
		try {
			const res = await fetch(`${apiURL}/${endpoint}`, {
				headers,
				method: 'POST',
				body: formData,
			})
		} catch (error) {}
	},
}
