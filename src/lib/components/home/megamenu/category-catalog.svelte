<script lang="ts">
	import IconArrowDown from '#lib/icons/icon-arrow-down.svelte';
	import type { MegaMenuItem } from '#lib/services/get-mega-menu.ts';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';

	const {
		categories,
		heights,
		wrapperWidth
	}: { categories: MegaMenuItem[]; heights: number[]; wrapperWidth: number } = $props();

	const { getUrl } = localeContext.get();

	let activeCategoryId = $state<number | null>(null);
	let isActive = $derived(activeCategoryId !== null);

	let menuWidth = $derived(isActive ? `${wrapperWidth}px` : '246px');
	let menuHeight = $derived(isActive ? `${heights[activeCategoryId!] ?? 342}px` : '342px');
</script>

<div
	style:--menu-width={menuWidth}
	style:--menu-height={menuHeight}
	class="categories-wrapper"
	class:active={isActive}
	onmouseleave={() => (activeCategoryId = null)}
	role="presentation"
>
	<div class="categories-container">
		<div class="categories">
			<div class="categories-open">
				<div class="categories-items">
					{#each categories as parent, index (index)}
						<div class="items" onmouseenter={() => (activeCategoryId = index)} role="presentation">
							<a href={resolve(getUrl(parent.url))}>
								<div class="item-container">
									<img
										alt=""
										data-nimg="1"
										decoding="async"
										height="20"
										loading="lazy"
										src={parent.iconUrl}
										width="23"
									/>
									<h4>{parent.name}</h4>
								</div>
								<div class="sep"></div>
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="categories-catalog">
			{#key activeCategoryId}
				<div class="catalog-items">
					{#if activeCategoryId != null}
						{#each categories[activeCategoryId].childItems as child, index (index)}
							<div class="item">
								<a href={resolve(getUrl(child.url))}>
									<h4>{child.name}</h4>
								</a>
								<div>
									{#each child.childItems ?? [] as subChild (subChild.id)}
										<a href={resolve(getUrl(subChild.url))}>
											<h4>{subChild.name}</h4>
										</a>
									{/each}
								</div>
							</div>
						{/each}
						<img
							alt={categories[activeCategoryId].imageId.toString()}
							src={categories[activeCategoryId].imageUrl}
						/>
					{/if}
				</div>
			{/key}
		</div>
	</div>
	<span class="menu-arrow">
		<IconArrowDown />
	</span>
</div>

<style lang="scss">
	.categories-wrapper {
		--category-width: 246px;
		--default-height: 342px;
		--transition-duration: 200ms;

		display: none;
		position: relative;
		grid-column: 1;
		transition: width var(--transition-duration) ease;
		width: var(--menu-width, var(--category-width));
		height: var(--default-height);

		@include response-to-desktop {
			display: initial;
		}

		.categories-container {
			position: relative;
			z-index: 2;
			transition:
				height var(--transition-duration) ease,
				border-radius 0.3s ease;
			box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;
			border-radius: 12px;
			background: var(--white-main);
			width: 100%;
			height: var(--menu-height, var(--default-height));
			min-height: var(--default-height);
			overflow: hidden;

			.categories {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 3;
				background: var(--white-main);
				width: var(--category-width);
				overflow: hidden;

				.categories-open {
					position: relative;
					box-shadow: rgba(0, 0, 0, 0.08) -1px 0 8px 1px;
					background: var(--white-main);
					width: 100%;
					overflow: hidden;

					.categories-items {
						.items {
							display: block;
							height: fit-content;

							a {
								display: block;
								height: fit-content;

								.item-container {
									display: flex;
									align-items: center;
									gap: 11px;
									cursor: pointer;
									padding: 11.5px 10px 11.5px 15px;

									img {
										width: 23px;
										height: 20px;
									}

									h4 {
										opacity: 0.8;
										cursor: pointer;
										color: var(--black-08);
										font-weight: 500;
										font-size: 12px;
										line-height: 14px;
									}
								}

								.sep {
									margin-top: -1px;
									margin-left: 10px;
									background: var(--white-400);
									width: calc(100% - 20px);
									height: 1px;
								}
							}
						}
					}
				}
			}

			.categories-catalog {
				position: absolute;
				top: 0;
				left: var(--category-width);
				z-index: 3;
				box-shadow: rgba(0, 0, 0, 0.08) 4px 0 8px 1px;
				border-radius: 8px 0 8px 8px;
				background: var(--white-main);
				width: calc(100% - var(--category-width));
				height: 100%;
				overflow: hidden;

				@keyframes fade-in {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				.catalog-items {
					display: flex;
					flex-flow: column wrap;
					align-content: flex-start;
					gap: 30px;
					animation: fade-in 200ms ease;
					margin: 20px;
					height: var(--menu-height);

					> img {
						position: absolute;
						right: 0px;
						bottom: 0px;
						opacity: inherit;
						border-radius: 12px;
						max-width: 200px;
						max-height: 220px;
					}

					.item {
						max-width: 25%;

						> a {
							h4 {
								cursor: pointer;
								margin-bottom: 15px;
								color: var(--black-main);
								font-weight: 500;
								font-size: 16px;
								line-height: 19px;
							}
						}

						> div {
							display: flex;
							flex-direction: column;
							gap: 10px;

							> a {
								h4 {
									cursor: pointer;
									color: var(--black-08);
									font-weight: 500;
									font-size: 12px;
									line-height: 14px;
								}
							}
						}
					}
				}
			}
		}

		&.active {
			.categories-container {
				transition:
					height var(--transition-duration) ease,
					border-radius 0s;
				border-radius: 12px 0 0 12px;
			}
		}
	}

	.menu-arrow {
		position: absolute;
		bottom: -30px;
		left: 123px;
		transform: translateX(-50%);
		z-index: 1;
		height: 20px;
	}
</style>
