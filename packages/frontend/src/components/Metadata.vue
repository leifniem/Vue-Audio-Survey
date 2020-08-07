<template>
	<div class="meta-collection">
		<form class="task" @submit.prevent="metaSubmit">
			<!-- Generate metadata inputs from the given metadata config -->
			<div v-for="meta of metaData" :key="meta.id" class="meta-input">
				<label :for="meta.id">{{
					meta.name + (meta.required ? '*' : '')
				}}</label>
				<span class="description" v-if="meta.description">{{
					meta.description
				}}</span>

				<!-- Create a select with given options if type is 'select' -->
				<select
					:name="meta.name"
					:id="meta.id"
					v-if="meta.type === 'select'"
					v-model="viewModelValues[meta.id]"
				>
					<option
						v-for="option in meta.options"
						:key="option"
						:value="option"
					>
						{{ option }}
					</option>
				</select>

				<!-- Create a fieldset for radio buttons with the according v-model if metadata type is 'radio' -->
				<fieldset
					:name="meta.name"
					:id="meta.id"
					v-else-if="meta.type === 'radio'"
				>
					<div v-for="option in meta.options" :key="option">
						<input type="radio" :value="option" :id="option" v-model="viewModelValues[meta.id]" :name="meta.id"/>
						<label :for="option">
							{{ option }}
						</label>
					</div>
				</fieldset>

				<!-- V-Else for all inputs that only support single input -->
				<input
					:type="meta.type"
					:id="meta.id"
					v-model="viewModelValues[meta.id]"
					v-else
				/>

				<span class="error">{{ meta.error }}</span>
			</div>
			<p class="footnote">Fields annotated with a * are non-optional.</p>
			<input type="submit" content="Submit form" hidden />
		</form>
		<button @click="metaSubmit" type="submit">
			Submit
		</button>
	</div>
</template>

<script>
import { metaData } from '@/config'

let viewModelValues = {}
// initialize the error field for displaying errors
for (let metaKey in metaData) {
	metaData[metaKey].error = ''
	viewModelValues[metaData[metaKey].id] = ""
}

export default {
	name: 'Metadata',
	data() {
		return {
			metaData,
			viewModelValues,
		}
	},
	methods: {
		metaSubmit() {
			let errors = false

			// Validate meta field with its validator function and add error if given
			for (let meta of this.metaData) {
				meta.error = ''
				if (
					meta.hasOwnProperty('validator') &&
					!meta.validator(this.viewModelValues[meta.id])
				) {
					errors = true
					meta.error = meta.errorMessage
				}
			}

			// if there are no errors present construct the metadata state object
			if (!errors) {
				let finalMeta = {}
				for (let meta of this.metaData) {
					finalMeta[meta.id] = this.viewModelValues[meta.id]
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

input,
select {
	border: 3px solid $primary-light;
	padding: 0.5rem;
	border-radius: 5px;
	width: 100%;

	&:focus,
	&:active {
		border-color: $primary-color;
	}
}

input[type='radio'] {
	display: inline;
	width: initial;
}

fieldset {
	border: none;
	padding: 0.5rem 0.25rem;
	border-left: 3px solid $primary-light;

	label {
		display: inline;
	}
}

.description,
.footnote,
.error {
	font-size: 0.8rem;
}

.error {
	color: $color-error;
}
</style>
