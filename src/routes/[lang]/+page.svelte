<script lang="ts">
	import type { ContentResponse, MegaMenuItem } from '#lib/services';
	import PageWrapper from '#lib/components/core/page-wrapper.svelte';
	import MegaMenu from '#lib/components/home/megamenu/megamenu.svelte';
	import Sections from '#lib/components/home/sections/sections.svelte';

	const {
		data
	}: { data: { megaMenu: MegaMenuItem[]; content: ContentResponse; heights: number[] } } = $props();
</script>

<PageWrapper>
	<MegaMenu
		categories={data.megaMenu}
		heights={data.heights}
		mainBanner={data.content.section[0]}
	/>
	<Sections sections={data.content.section} />
</PageWrapper>
