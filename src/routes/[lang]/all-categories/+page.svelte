<script lang="ts">
	import { localeContext } from '#lib';
	import Container from '#lib/components/core/button/container.svelte';
	import PageWrapper from '#lib/components/core/page-wrapper.svelte';
	import Translate from '#lib/components/translate.svelte';
	import type { Categories } from '#lib/services/get-all-categories.ts';
	import { resolve } from '$app/paths';

	const { data }: { data: { categories: Categories[] } } = $props();
	const { getUrl } = localeContext.get();
</script>

<PageWrapper>
	<Container>
		<div class="categories">
			<div class="title">
				<h1><Translate key="all_categories" /></h1>
			</div>
			<div class="list">
				{#each data.categories as category, index (category.id)}
					<div style:animation-delay={`${index * 0.1}s`} class="parent">
						<a href={resolve(getUrl(category.url))}>
							<h4>{category.name}</h4>
						</a>
						{#each category?.childCategories ?? [] as child (child)}
							<div class="child">
								<a href={resolve(getUrl(child.url))}>
									<p>{child.name}</p>
								</a>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</Container>
</PageWrapper>

<style lang="scss">
	@keyframes slide {
		from {
			transform: translateY(30px);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			transform: translateY(15px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.categories {
		animation: slide 300ms ease-out forwards;

		.title {
			margin-bottom: 30px;
			border-bottom: 2px solid var(--white-400);
			padding-bottom: 24px;
			> h1 {
				color: rgb(10, 50, 81);
				font-weight: 500;
				font-size: 16px;
				line-height: 24px;
			}
		}
		.list {
			display: grid;
			grid-template-columns: repeat(4, calc(25% - 15px));
			gap: 30px;
			width: 100%;
			min-height: 110vh;

			@include response-to-mobile {
				display: flex;
				flex-direction: column;
			}

			.parent {
				display: flex;
				flex-direction: column;
				gap: 10px;
				opacity: 0;
				animation: fadeIn 300ms ease-out both;

				> a {
					margin-bottom: 10px;
					h4 {
						transition: 0.2s ease-in-out;
						cursor: pointer;
						color: rgb(10, 50, 81);
						font-weight: 600;
						font-size: 18px;

						&:hover {
							color: var(--orange-main);
						}
					}
				}

				.child {
					> a {
						p {
							transition: 0.2s ease-in-out;
							cursor: pointer;
							color: rgb(10, 50, 81);
							font-size: 14px;

							&:hover {
								color: var(--orange-main);
							}
						}
					}
				}
			}
		}
	}
</style>
