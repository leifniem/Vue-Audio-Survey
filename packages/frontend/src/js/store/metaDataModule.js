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
		sessionID: null,
	},
	actions: {
		async createSessionID({commit}, metadata) {
			const idString = `${metadata.dateTime.replace(' ', '_')}_${
				metadata.lastName
			}_${metadata.firstName}`
			commit('setSessionID', idString)
		},
		async writeMetaData({commit, dispatch, getters}, data) {
			// add current time to meta for sessionID / verification
			var m = new Date()
			data.dateTime = `${m
				.toISOString()
				.replace('T', '_')
				.replace(/:/g, '-')
				.slice(0, -5)}`
			// Create and append sessionID
			await dispatch('createSessionID', data)
			data.sessionID = getters.getSessionID
			try {
				commit('setMetaData', data)
				// Uploading Meta to server to receive token
				let res = await MetaDataService.putMeta(data)
				if (res.token) {
					setToken(res.token)
					return
				} else if (typeof res === Number) {
					throw new Error(
						'Your request was rejected with the code ' + res
					)
				} else {
					throw new Error('You were not authorized to upload data')
				}
			} catch (e) {
				alert(e.msg)
			}
		},
	},
	mutations: {
		setMetaData(state, data) {
			state.metaData = data
		},
		setSessionID(state, idString) {
			state.sessionID = idString
		},
	},
	getters: {
		getMeta(state) {
			return state.metaData
		},
		getSessionID(state) {
			return state.sessionID
		},
	},
}
