<script lang="ts">
	import { optimizedImage } from '#lib/helpers/optimized-image.ts';
	import Swiper from '#lib/components/core/swiper/swiper.svelte';
	import type { Section } from '#lib/services';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';

	const { section }: { section: Section } = $props();
	const { getUrl } = localeContext.get();
	const isGrid = $derived(
		!section.isScroll && section.bannerTemplateRowNumber > 0 && (section.banners?.length ?? 0) > 1
	);
	const backgroundColor = $derived(
		section.colorValue != '#000000' ? section.colorValue : 'inherit'
	);
</script>

{#snippet banners()}
	{#each section.banners ?? [] as banner, index (index)}
		<div class="banner-three" data-index={index}>
			<a href={resolve(getUrl(banner.route))}>
				<img
					alt={banner.title}
					height={banner.webDimensions?.heightInPixels}
					{...optimizedImage(banner.webImageUrl, banner.webDimensions?.widthInPixels ?? 1200)}
					decoding="async"
					loading="lazy"
					width={banner.webDimensions?.widthInPixels}
				/>
			</a>
		</div>
	{/each}
{/snippet}

<div
	style:--section-background={backgroundColor}
	class={['wrapper-three', { grid: isGrid, 'no-scroll': !isGrid && !section.isScroll }]}
>
	{#if !section.isScroll}
		{@render banners()}
	{:else}
		<Swiper auto={false} gap={35} navigation={!!section.isScroll}>
			{@render banners()}
		</Swiper>
	{/if}
</div>

<style lang="scss">
	.wrapper-three {
		border-radius: 13px;
		background-color: var(--section-background);
		padding: 25px 0px 25px 25px;
		width: 100%;

		&.no-scroll {
			padding: 0;

			.banner-three > a > img {
				width: 100%;
				height: auto;
			}
		}

		&.grid {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 24px;
			box-sizing: border-box;
			border-radius: 14px;
			background-color: rgb(255, 209, 245);
			padding: 25px 28px;

			.banner-three {
				min-width: 0;

				> a > img {
					width: 100%;
					height: auto;
				}
			}
		}

		.banner-three {
			> a {
				display: contents;
				width: fit-content;
				height: fit-content;

				> img {
					display: block;
					border-radius: 15px;
				}
			}
		}
	}
</style>
