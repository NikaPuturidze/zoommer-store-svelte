<script lang="ts">
	import type { TopicItem } from '#lib';
	import { IconPhone } from '#lib/icons/index.ts';
	import Translate from '../translate.svelte';
	import LanguageSwitcher from './language-switcher.svelte';

	type Props = {
		topMenu: TopicItem[];
	};

	let { topMenu }: Props = $props();
</script>

<header>
	<div>
		<div>
			<div class="phone">
				<IconPhone />
				<h4>*7007</h4>
			</div>
			<div class="items">
				{#each topMenu as item (item.id)}
					<h4>{item.title}</h4>
				{/each}
				<h4>
					<Translate key="branches" />
				</h4>
				<LanguageSwitcher />
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		position: relative;
		z-index: 12;
		margin-bottom: 0px;
		background-color: var(--orange-main);
		padding: 10px 0px;
		height: var(--header-height);

		@include response-to-mobile {
			display: none;
		}

		> div {
			@include container;

			> div {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.phone {
					display: flex;
					align-items: center;
					gap: 10px;
					cursor: pointer;

					h4 {
						margin: 0px;
						color: var(--white-main);
						font-weight: 500;
						font-size: 12px;
						line-height: 14px;
					}
				}

				.items {
					display: flex;
					align-items: center;
					gap: 20px;

					h4 {
						opacity: 0.7;
						transition: 0.21s;
						cursor: pointer;
						margin: 0px;
						color: var(--white-main);
						font-weight: 500;
						font-size: 12px;
						line-height: 14px;

						&:hover {
							transform: scale(1.01);
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
