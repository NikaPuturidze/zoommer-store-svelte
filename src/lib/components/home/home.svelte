<script lang="ts">
	import type { ContentResponse, MegaMenuItem } from '#lib/services';
	import PageWrapper from '../core/page-wrapper.svelte';
	import MegaMenu from './megamenu/megamenu.svelte';
	import Sections from './sections/sections.svelte';

	const {
		megaMenu,
		content,
		heights
	}: { megaMenu: MegaMenuItem[]; content: ContentResponse; heights: number[] } = $props();
</script>

<PageWrapper>
	<MegaMenu categories={megaMenu} {heights} mainBanner={content.section[0]} />
	<Sections sections={content.section} />
</PageWrapper>
