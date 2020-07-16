export default {
	state: {
		sessionID: null,
	},
	mutations: {
		setSessionID (state, id) {
			state.sessionID = id
		}
	},
	actions: {
		createSessionID (context, metadata) {
			let idString = `${metadata.dateTime.replace(' ', '_')}_${metadata.lastName}_${metadata.firstName}`
			context.commit('setSessionID', idString)
		}
	},
	getters: {
		getSessionID (state) {
			return state.sessionID
		}
	}
}