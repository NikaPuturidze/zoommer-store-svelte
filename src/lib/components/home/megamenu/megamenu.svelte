<script lang="ts">
	import Container from '#lib/components/core/button/container.svelte';
	import type { Section } from '#lib/services';
	import type { MegaMenuItem } from '#lib/services/get-mega-menu.ts';
	import { appContext } from '#lib/stores/app.store.svelte.ts';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';
	import Swiper from '../../core/swiper/swiper.svelte';
	import CategoryCatalog from './category-catalog.svelte';

	const {
		categories,
		mainBanner,
		heights
	}: { categories: MegaMenuItem[]; mainBanner: Section; heights: number[] } = $props();

	const { getUrl } = localeContext.get();
	const appStore = appContext.get();
	let wrapperWidth = $state(0);
</script>

<Container>
	<div class="mega-menu" bind:clientWidth={wrapperWidth}>
		<CategoryCatalog {categories} {heights} {wrapperWidth} />

		<Swiper auto={true} gap={appStore.isMobile ? 11 : 30}>
			{#each mainBanner.banners as banner, index (index)}
				<div class="banner-item" class:large={banner.largeBanner} data-index={index}>
					<a href={resolve(getUrl(banner.route))}>
						{#if appStore.isMobile}
							<img alt={banner.title} src={banner.mobileImageUrl} />
						{:else}
							<img alt={banner.title} src={banner.webImageUrl} />
						{/if}
					</a>
				</div>
			{/each}
		</Swiper>
	</div>
</Container>

<style lang="scss">
	.mega-menu {
		display: grid;
		position: relative;
		grid-template-columns: 246px minmax(0, 1fr);
		column-gap: 30px;
		width: 100%;

		@include response-to-mobile {
			display: block;
		}
	}

	.banner-item {
		border-radius: 12px;
		width: 220px;
		height: 340px;

		@include response-to-mobile {
			width: 291px !important;
			height: 135px !important;
		}

		&.large {
			width: 895px;
		}

		> a {
			display: block;
			border-radius: inherit;
			width: 100%;
			height: inherit;

			> img {
				display: block;
				border-radius: inherit;
				width: 100%;
				height: inherit;
			}
		}
	}
</style>
