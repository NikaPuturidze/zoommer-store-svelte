<script lang="ts">
	import { optimizedImage } from '#lib/helpers/optimized-image.ts';
	import IconCartSecond from '#lib/icons/icon-cart-second.svelte';
	import IconCompare from '#lib/icons/icon-compare.svelte';
	import type { Product } from '#lib/services';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { resolve } from '$app/paths';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '..';
	import Translate from '../translate.svelte';

	const {
		product,
		isInCart = false,
		...rest
	}: { product: Product; isInCart?: boolean } & HTMLAttributes<HTMLDivElement> = $props();
	const { getUrl } = localeContext.get();
</script>

<div class="card" {...rest}>
	<a href={resolve(getUrl(product.route))}>
		<img
			alt={product.name}
			{...optimizedImage(product.imageUrl, 160)}
			decoding="async"
			height="160"
			loading="lazy"
			width="160"
		/>
		{#if product.labelText}
			<div style:color={product.labelText}>{product.labelText}</div>
		{/if}
	</a>
	<div class="info">
		<div class="price-row">
			<h4 class="price" class:discounted={product.discountAmount}>
				{product.price} ₾
			</h4>
			{#if product.previousPrice}
				<span>
					{product.previousPrice} ₾
				</span>
			{/if}
		</div>
		<div class="installment">
			<p>
				<Translate key="per_month" params={{ amount: `${Math.floor(product.price / 36)} ₾` }} />
			</p>
		</div>
		<a href={resolve(getUrl(product.route))}>
			{product.name}
		</a>
	</div>
	<div class="buttons">
		<Button>
			<IconCompare />
		</Button>
		<Button>
			{#if !isInCart}
				<IconCartSecond />
				<h4>
					<Translate key="add" />
				</h4>
			{:else}
				<h4>
					<Translate key="in_cart" />
				</h4>
			{/if}
		</Button>
	</div>
</div>

<style lang="scss">
	.card {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		gap: 8px;
		transition: 0.2s;
		cursor: pointer;
		border-radius: 4%;
		background: var(--white-main);
		max-width: 160px;
		height: 303px;

		> a {
			border-radius: 8px;
			background: white;
			overflow: hidden;

			> img {
				width: 100%;
				height: 160px;
				object-fit: contain;
			}

			> div {
				position: absolute;
				bottom: 130px;
				left: 0px;
				border-radius: 20px;
				background-color: rgb(247, 144, 9);
				padding: 5px 8px;
				color: rgb(255, 255, 255);
				font-weight: 500;
				font-size: 9px;
				line-height: 16px;
				font-feature-settings: 'case';
				text-transform: uppercase;
				@include medium;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
			min-height: 70px;

			.price-row {
				display: flex;
				align-items: center;
				gap: 12px;

				.price {
					color: var(--black-main);
					font-weight: 600;
					font-size: 16px;
					line-height: 19px;
					text-wrap: nowrap;

					&.discounted {
						color: var(--orange-main);
					}
				}

				> span {
					position: relative;
					padding-left: 3px;
					color: var(--product-black-07);
					font-size: 12px;

					&::after {
						position: absolute;
						top: 40%;
						left: 0px;
						background-color: var(--orange-main);
						width: 95%;
						height: 1px;
						content: '';
					}
				}
			}

			.installment {
				p {
					display: -webkit-box;
					height: 16px;
					color: var(--product-black);
					font-weight: 400;
					font-size: 8px;
					line-height: 16px;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					overflow: hidden;

					> :global(span) {
						color: var(--orange-main);
					}
				}
			}

			> a {
				opacity: 0.8;
				max-height: 36px;
				overflow: hidden;
				color: var(--product-black);
				font-weight: 500;
				font-size: 12px;
				line-height: 18px;
			}
		}

		.buttons {
			display: grid;
			position: relative;
			grid-template-columns: 40px calc(100% - 50px);
			column-gap: 10px;
			width: 100%;
			max-height: 40px;

			> :global(button:first-of-type) {
				display: flex;
				justify-content: center;
				align-items: center;
				filter: none;
				box-shadow: none;
				border-radius: 4px;
				background-color: var(--productCard-compare-white-400);
				padding: 14px;
				height: 40px;
			}

			> :global(button:last-of-type) {
				display: flex;
				position: relative;
				justify-content: center;
				align-items: center;
				gap: 8px;
				opacity: 1;
				cursor: pointer;
				border-radius: 4px;
				background: var(--orange-primary);
				padding: 10px 4px;
				overflow: hidden;
				pointer-events: auto;
			}

			> :global(button:last-of-type > h4) {
				position: relative;
				opacity: 0.8;
				z-index: 1;
				color: var(--black-main);
				font-weight: 600;
				font-size: 12px;
				line-height: 20px;
			}
		}
	}
</style>
