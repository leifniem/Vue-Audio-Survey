import metaData from '@/assets/metaData'
import MetaDataService from '@/services/metaDataService'
import Router from '@/js/router.js'

let meta = Object.keys(metaData).reduce((obj, key) => {
	obj[metaData[key].id] = null
	return obj
}, {})

export default {
	state: {
		metaData: meta,
	},
	actions: {
		async writeMetaData (context, data) {
			var m = new Date();
			data.dateTime = `${m.getUTCFullYear()}-(${m.getUTCMonth()})-${m.getUTCDate()} ${m.getUTCHours()}:${m.getUTCMinutes()}`
			try {
				context.commit('setMetaData', data)
				let res = await MetaDataService.putMeta(data)
				console.log(res);
				if (res.status === 200) Router.push('/microphone')
			} catch (e) {
				// TODO Error Handling on failed upload
				console.error(e)
			}
		}
	},
	mutations: {
		setMetaData(state, data) {
			state.metaData = data
		},
	},
	getters: {
		getMeta (state) {
			return state.metaData
		}
	}
}
