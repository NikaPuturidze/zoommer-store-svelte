<script lang="ts">
	import { getUrl } from '#lib/helpers/get-url.ts';
	import type { Section } from '#lib/services';
	import type { MegaMenuItem } from '#lib/services/get-mega-menu.ts';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';
	import Swiper from '../core/swiper/swiper.svelte';
	import CategoryCatalog from './category-catalog.svelte';

	const {
		categories,
		mainBanner,
		heights,
		wrapperWidth
	}: { categories: MegaMenuItem[]; mainBanner: Section; heights: number[]; wrapperWidth: number } =
		$props();

	const localeStore = localeContext.get();
</script>

<CategoryCatalog {categories} {heights} {wrapperWidth} />

<Swiper>
	{#each mainBanner.banners as banner, index (index)}
		<div class="banner-item" class:large={banner.largeBanner} data-index={index}>
			<a href={resolve(getUrl(banner.route, localeStore.locale))}>
				<img alt={banner.title} src={banner.webImageUrl} />
			</a>
		</div>
	{/each}
</Swiper>

<style lang="scss">
	.banner-item {
		border-radius: 12px;
		width: 220px;
		height: 340px;

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
