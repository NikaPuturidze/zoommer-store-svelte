<script lang="ts">
	import Container from '#lib/components/core/button/container.svelte';
	import Swiper from '#lib/components/core/swiper/swiper.svelte';
	import ProductCard from '#lib/components/product-card/product-card.svelte';
	import { SectionType, type Section } from '#lib/services';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';

	const { sections }: { sections: Section[] } = $props();
	const { getUrl } = localeContext.get();
</script>

<Container>
	<div class="sections-wrapper">
		<div class="sections">
			{#each sections as section, index (index)}
				{@const isDefault =
					section.sectionType == SectionType.First || section.sectionType == SectionType.Fifth}
				{#if isDefault}
					<div class:banner-default={isDefault}>
						<div>
							<a href={resolve(getUrl(section.route ?? ''))}>
								<h2>{section.title}</h2>
							</a>
						</div>
						<Swiper gap={35}>
							{#each section.products as product, index (index)}
								<ProductCard data-index={index} {product} />
							{/each}
						</Swiper>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</Container>

<style lang="scss">
	.sections-wrapper {
		display: flex;
		flex-direction: column;
		gap: 60px;
		margin-top: 40px;

		.sections {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 25px;
			margin-top: 30px;
			width: 100%;

			.banner-default {
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
			}
		}
	}
</style>
