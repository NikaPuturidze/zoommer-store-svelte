<script lang="ts">
	import Swiper from '#lib/components/core/swiper/swiper.svelte';
	import type { Section } from '#lib/services';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';
	import ProductCard from '#lib/components/product-card/product-card.svelte';
	import { appContext } from '#lib/stores/app.store.svelte.ts';
	const { section }: { section: Section } = $props();
	const { getUrl } = localeContext.get();
	const appStore = appContext.get();
</script>

<div class="banner-default">
	<div>
		<a href={resolve(getUrl(section.route ?? ''))}>
			<h2>{section.title}</h2>
		</a>
	</div>
	<Swiper gap={appStore.isMobile ? 20 : 35}>
		{#each section.products as product, index (index)}
			<ProductCard data-index={index} {product} />
		{/each}
	</Swiper>
</div>

<style lang="scss">
	.banner-default {
		width: 100%;

		@include response-to-mobile {
			width: calc(100% + 15px);

			:global(.track) {
				width: calc(100% + 15px);
			}
		}

		> div {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30px;
			width: 100%;

			@include response-to-mobile {
				margin-bottom: 10px;
			}

			h2 {
				opacity: 0.8;
				color: var(--black-main);
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;
			}
		}
	}
</style>
