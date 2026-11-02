<script lang="ts">
	import type { TopicItem } from '#lib';
	import { IconPhoneSnippet } from '#lib/icons/icon-phone.svelte';

	type Props = {
		topMenu: TopicItem[];
	};

	let { topMenu }: Props = $props();
</script>

<header>
	<div>
		<div>
			<div>
				<div class="phone">
					{@render IconPhoneSnippet()}
					<h4>*7007</h4>
				</div>
				<div class="items">
					{#each topMenu as item (item.id)}
						<h4>{item.title}</h4>
					{/each}
				</div>
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	header > div {
		position: relative;
		z-index: 12;
		margin-bottom: 0px;
		background-color: $orange-main;
		padding: 10px 0px;

		> div {
			margin: 0px auto;
			padding: 0px 15px;
			width: 100%;
			max-width: 1200px;

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
						color: $white-main;
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
						color: $white-main;
						font-weight: 500;
						font-size: 12px;
						line-height: 14px;
					}
				}
			}
		}
	}
</style>
