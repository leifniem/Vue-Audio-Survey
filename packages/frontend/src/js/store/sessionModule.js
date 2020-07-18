export default {
	state: {
		sessionID: null,
		privacyPolicyAccepted: false
	},
	mutations: {
		setSessionID (state, id) {
			state.sessionID = id
		},
		setPrivacyAcknowledgement (state, accepted) {
			state.privacyPolicyAccepted = accepted
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
		},
		getPrivacyAcknowledgement (state) {
			return state.privacyPolicyAccepted
		}
	}
}