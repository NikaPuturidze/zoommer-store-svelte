<script lang="ts">
	import Header from '#lib/components/header/header.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div>
	<Header topMenu={data.topics.showInTopMenu} />
</div>
