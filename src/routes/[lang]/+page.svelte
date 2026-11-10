<script lang="ts">
	import type { ContentResponse, MegaMenuItem } from '#lib/services';
	import { MegaMenu } from '#lib/components';

	const {
		data
	}: { data: { megaMenu: MegaMenuItem[]; content: ContentResponse; heights: number[] } } = $props();

	let wrapperWidth = $state(0);
</script>

<div class="page-wrapper">
	<div>
		<div bind:clientWidth={wrapperWidth}>
			<MegaMenu
				categories={data.megaMenu}
				heights={data.heights}
				mainBanner={data.content.section[0]}
				{wrapperWidth}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		@include page;
		height: 500vh;

		> div {
			@include container;

			> div {
				display: grid;
				position: relative;
				grid-template-columns: 246px minmax(0, 1fr);
				column-gap: 30px;
				width: 100%;
			}
		}
	}
</style>
