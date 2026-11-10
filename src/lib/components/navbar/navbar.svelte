<script lang="ts">
	import { localeContext } from '#lib';
	import IconAvatar from '#lib/icons/icon-avatar.svelte';
	import IconCart from '#lib/icons/icon-cart.svelte';
	import IconMain from '#lib/icons/icon-main.svelte';
	import IconDots from '#lib/icons/icon-dots.svelte';
	import { IconMainSearchSnippet } from '#lib/icons/icon-main-search.svelte';
	import { resolve } from '$app/paths';
	import Button from '../core/button/button.svelte';
	import Input from '../core/input/input.svelte';
	import Translate from '../translate.svelte';
	import { appContext } from '#lib/stores/app.store.svelte.ts';

	let search = $state('');
	const { t } = localeContext.get();
	const appStore = appContext.get();
</script>

<div class="navbar-slot">
	<nav class="navbar" class:fixed={appStore.isNavbarDocked}>
		<div>
			<div>
				<a aria-label="Zoommer" href={resolve('/')}>
					<IconMain />
				</a>
				<div>
					<div class="items">
						<Button class="nav-button">
							<IconDots />
							<h4><Translate key="navigation" /></h4>
						</Button>
						<Input
							class="search-input"
							leadingIcon={IconMainSearchSnippet}
							placeholder={t('search')}
							type="text"
							bind:value={search}
						/>
					</div>
					<div class="actions">
						<Button class="side-button">
							<IconCart />
							<h4><Translate key="cart" /></h4>
						</Button>
						<Button class="side-button">
							<IconAvatar />
							<h4><Translate key="log_in" /></h4>
						</Button>
						<Button class="discount">%</Button>
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>

<style lang="scss">
	@keyframes navbar-animation {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}

	.navbar-slot {
		height: $navbar-height;
	}

	.navbar {
		position: relative;
		z-index: 11;
		backdrop-filter: blur(10px);
		background-color: rgba(237, 235, 235, 0.74);
		width: auto;
		height: $navbar-height;

		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			animation: 0.5s ease 0s 1 normal forwards running navbar-animation;
			width: 100%;
		}

		> div {
			@include container;

			> div {
				display: flex;
				align-items: center;
				gap: 100px;
				padding: 15px 0;
				height: $navbar-height;

				a {
					:global(svg) {
						cursor: pointer;
						width: 151px;
						height: 40px;
					}
				}

				> div {
					display: flex;
					flex: 1;
					justify-content: space-between;
					gap: 21px;

					.items {
						display: flex;
						flex: 1;
						gap: 20px;

						h4 {
							color: $white-main;
							font-weight: 500;
							font-size: 14px;
							line-height: 17px;
						}

						> :global(.search-input) {
							width: 100%;
							max-width: 400px;
						}

						> :global(.nav-button) {
							background-color: $orange-main;
							width: 130px;
							height: 40px;
							color: $white-main;
						}
					}

					.actions {
						display: flex;
						gap: 20px;

						h4 {
							color: $black-main;
							font-weight: 500;
							font-size: 14px;
							line-height: 17px;
						}

						> :global(.side-button) {
							opacity: 0.8;
							background-color: $white-main;
							width: 130px;
						}

						> :global(.discount) {
							background-color: $orange-main;
							width: 48px;
							color: $white-main;
							font-weight: 500;
							font-size: 20px;
							line-height: 24px;
						}
					}
				}
			}
		}
	}
</style>
