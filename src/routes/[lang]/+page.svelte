<script lang="ts">
	import type { ContentResponse, MegaMenuItem } from '#lib/services';
	import { Home } from '#lib/components';

	const {
		data
	}: { data: { megaMenu: MegaMenuItem[]; content: ContentResponse; heights: number[] } } = $props();
</script>

<Home content={data.content} heights={data.heights} megaMenu={data.megaMenu} />
