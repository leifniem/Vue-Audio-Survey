<template>
	<div class="intro">
		<h1>About your privacy in this</h1>
		<div v-html="privacyPolicy" class="privacy-policy" />
		<div class="accept">
			<input type="checkbox" id="privacy-accept" v-model="checked" />
			<label for="privacy-accept">{{ privacyAcknowledgement }}</label>
		</div>
		<router-link to="/metadata">
			<button :disabled="!checked">
				{{ nextPageText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import {
	nextPageText,
	privacyPolicy,
	privacyAcknowledgement,
} from '@/config.js'

export default {
	name: 'PrivacyDisclaimer',
	data() {
		return {
			checked: false,
			nextPageText,
			privacyPolicy,
			privacyAcknowledgement,
		}
	},
}
</script>

<style lang="scss">
@import "@/scss/variables";

input,
label {
	cursor: pointer;
}

.accept {
	margin: 2rem 0;
	padding: 1rem;
	background: $light-background;
	border-radius: 5px;
}

.privacy-policy {
	display: block;
}
</style>
