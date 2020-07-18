<template>
	<div id="app">
		<header class="wrapper site-header">
			<router-link to="/">
				<div class="logo">
					<img :src="logo.default" alt="" />
				</div>
			</router-link>
			<div class="title">
				<router-link to="/">
					<h1 v-if="title">{{ title }}</h1>
				</router-link>
				<h2 v-if="subtitle">{{ subtitle }}</h2>
			</div>
		</header>
		<article class="wrapper">
			<router-view></router-view>
		</article>
	</div>
</template>

<script>
import { title, subtitle, logo } from '@/config.js'

export default {
	name: 'AppWrapper',
	data() {
		return {
			logo,
			title,
			subtitle,
		}
	},
}
</script>

<style lang="scss">
@import '@/scss/variables';
@import '@/scss/fonts';

*,
*:after,
*:before {
	box-sizing: border-box;
}

body {
	background: $background-color;
	line-height: 1.8;
	font-size: 1rem;
	color: $text-color;
	font-family: $font-family;
}

@supports (font-variation-settings: normal) {
	font-family: $font-family-variable;
}

.wrapper {
	width: 100%;
	max-width: 36rem;
	padding: 2rem;
	margin: 0 auto;
}

.site-header {
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-areas: 'logo title title';
	grid-gap: 1rem;
	align-items: center;

	a {
		text-decoration: none;
	}
}

.logo {
	grid-area: 'logo';
	img {
		max-height: 100px;
	}
}

.title {
	grid-area: 'title';
	display: inline-block;

	h1,
	h2 {
		line-height: 1;
		margin: 0 0 1rem;
	}

	h1 {
		color: $primary-color;
	}

	h2 {
		font-weight: normal;
		font-size: 1.2rem;
	}
}

article {
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	a {
		color: $primary-color;
	}
}

button,
input[type="submit"] {
	background: $primary-color;
	padding: 0.75rem;
	border-radius: 5px;
	font-weight: bold;
	color: $button-text-color;
	border: none;

	&:not(:disabled):hover {
		box-shadow: inset 0 3px 0 $primary-dark;
	}

	&:active {
		background: $primary-dark;
	}

	&:focus {
		background: mix($primary-color, $primary-dark, 50%);
	}

	&:disabled {
		background: $light-background;
		color: #bbb;
	}
}
</style>
