<template>
	<div class="meta-collection">
		<form class="task" @submit.prevent="metaSubmit">
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

			for (let meta of this.metaData) {
				meta.error = ''
				if (!meta.validator(this.$refs[meta.id.toString()][0].value)) {
					errors = true
					meta.error = meta.errorMessage
				}
			}

			if (!errors) {
				let finalMeta = {}
				for (let meta of this.metaData) {
					finalMeta[meta.id] = this.$refs[meta.id.toString()][0].value
				}
				try {
					this.$store.dispatch('writeMetaData', finalMeta)
					this.$router.push('/microphone')
				} catch (error) {

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
