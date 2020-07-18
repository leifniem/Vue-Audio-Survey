import metaData from '@/assets/metaData'
import MetaDataService from '@/services/metaDataService'
import Router from '@/js/router.js'
import { setToken } from '@/js/tokenHandler'

let meta = Object.keys(metaData).reduce((obj, key) => {
	obj[metaData[key].id] = null
	return obj
}, {})

export default {
	state: {
		metaData: meta,
	},
	actions: {
		async writeMetaData(context, data) {
			var m = new Date()
			data.dateTime = `${m
				.toISOString()
				.replace('T', '_')
				.replace(/:/g, '-')
				.slice(0, -5)}`
			try {
				context.commit('setMetaData', data)
				let res = await MetaDataService.putMeta(data)
				if (res) setToken(res.token)
			} catch (e) {
				// TODO Error Handling on failed upload
				console.error(e)
			}
		},
	},
	mutations: {
		setMetaData(state, data) {
			state.metaData = data
		},
	},
	getters: {
		getMeta(state) {
			return state.metaData
		},
	},
}
