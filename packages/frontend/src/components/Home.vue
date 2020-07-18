<template>
	<div class="intro">
		<h1>Welcome and thank you</h1>
		<p>{{ instructions }}</p>
		<router-link to='/privacy'>
			<button>
				{{ nextPageText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import {instructions, nextPageText} from '@/config.js'
export default {
	name: 'Homepage',
	data () {
		return {
			instructions,
			nextPageText
		}
	}
}
</script>