<template>
	<div class="meta-collection">
		<form class="task" @submit.prevent="metaSubmit">
			<!-- Generate metadata inputs from the given metadata config -->
			<div v-for="meta of metaData" :key="meta.id" class="meta-input">
				<label :for="meta.id">{{
					meta.name + (meta.required ? '*' : '')
				}}</label>
				<input :type="meta.type" :id="meta.id" :ref="meta.id" />
				<span class="error">{{ meta.error }}</span>
			</div>
			<p class="footnote">Fields annotated with a * are non-optional.</p>
			<input type="submit" content="Submit form" hidden>
		</form>
		<button @click="metaSubmit" type="submit">
			Submit
		</button>
	</div>
</template>

<script>
import { metaData } from '@/config'

// initialize the error field for displaying errors
for (let metaKey in metaData) {
	metaData[metaKey].error = ''
}

export default {
	name: 'Metadata',
	data() {
		return {
			metaData,
		}
	},
	methods: {
		metaSubmit() {
			let errors = false

			// Validate meta field with its validator function and add error if given
			for (let meta of this.metaData) {
				meta.error = ''
				if (!meta.validator(this.$refs[meta.id.toString()][0].value)) {
					errors = true
					meta.error = meta.errorMessage
				}
			}

			// if there are no errors present construct the metadata state object
			if (!errors) {
				let finalMeta = {}
				for (let meta of this.metaData) {
					finalMeta[meta.id] = this.$refs[meta.id.toString()][0].value
				}
				try {
					this.$store.dispatch('writeMetaData', finalMeta)
					this.$router.push('/microphone')
				} catch (error) {
					alert(error.msg)
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

label {
	display: block;
}

.meta-input {
	margin-bottom: 1rem;
}

input {
	border: 3px solid $primary-light;
	padding: 0.5rem;
	border-radius: 5px;
	width: 100%;

	&:focus,
	&:active {
		border-color: $primary-color;
	}
}

.footnote,
.error {
	font-size: 0.8rem;
}

.error {
	color: $color-error;
}
</style>
