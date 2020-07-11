<template>
	<div class="intro">
		<h1>About your privacy in this</h1>
		<div v-html="privacyPolicy" class="privacy-policy" />
		<div class="accept">
			<input type="checkbox" id="privacy-accept" v-model="checked" />
			<label for="privacy-accept">{{ privacyAcknowledgement }}</label>
		</div>
		<router-link to="/question/0" v-if="checked">
			<button>
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
	name: 'Homepage',
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

<style>
input,
label {
	cursor: pointer;
}

.accept {
	margin-top: 2rem;
	padding: 1rem;
	background: #eee;
	border-radius: 5px;
}

.privacy-policy {
	display: block;
}
</style>
