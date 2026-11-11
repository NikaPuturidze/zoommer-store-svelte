<script lang="ts">
	import { optimizedImage } from '#lib/helpers/optimized-image.ts';
	import Swiper from '#lib/components/core/swiper/swiper.svelte';
	import type { Section } from '#lib/services';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';

	const { section }: { section: Section } = $props();
	const { getUrl } = localeContext.get();
</script>

<div class="wrapper-fourth">
	<div>
		<a href={resolve(getUrl(section.route ?? ''))}>
			<h2>{section.title}</h2>
		</a>
	</div>
	<Swiper auto={false} gap={35}>
		{#each section.brands as brand, index (index)}
			<div class="banner-fourth" data-index={index}>
				<a href={resolve(getUrl(brand.route))}>
					<img
						alt={brand.name}
						{...optimizedImage(brand.imageUrl, 160)}
						decoding="async"
						height="80"
						loading="lazy"
						width="160"
					/>
				</a>
			</div>
		{/each}
	</Swiper>
</div>

<style lang="scss">
	.wrapper-fourth {
		width: 100%;

		> div {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30px;
			width: 100%;

			h2 {
				opacity: 0.8;
				color: var(--black-main);
				font-weight: 600;
				font-size: 16px;
				line-height: 20px;
			}
		}

		.banner-fourth {
			> a {
				display: block;
				border-radius: 12px;
				background: rgba(111, 111, 111, 0.082);
				width: 160px;
				height: 80px;
				overflow: hidden;

				img {
					cursor: pointer;
					width: 160px;
					height: 80px;
					object-fit: cover;
				}
			}
		}
	}
</style>
