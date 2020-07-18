<template>
	<div class="four-oh-four">
		<img :src="logo.default" alt="" />
		<h2>
			Oopsies!
		</h2>
		<p>This page seems non-existent. Maybe the cats got it.</p>
		<router-link to="/">
			Start over ↩
		</router-link>
	</div>
</template>

<script>
import { logo } from '@/config'
export default {
	name: '404',
	data() {
		return {
			logo
		}
	},
}
</script>

<style lang="scss">
	.four-oh-four{
		width: 100%;
		text-align: center;
	}

	h2 {
		font-size: 3rem;
	}
</style>
