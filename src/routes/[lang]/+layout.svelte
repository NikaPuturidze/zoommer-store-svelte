<script lang="ts">
	import type { LayoutProps } from './$types';
	import { localeContext } from '#lib';
	import { NavigationProgress, ScrollRestoration } from '#lib/app';
	import { Header, Navbar, Scrollbar } from '#lib/components';
	import { appContext } from '#lib/stores/app.store.svelte.ts';

	const { data, children }: LayoutProps = $props();

	localeContext.provide(() => data.locale);
	const appStore = appContext.provide();
</script>

<div>
	<ScrollRestoration />
	<NavigationProgress />

	<Header topMenu={data.topics.showInTopMenu} />
	<Navbar />

	<main>
		{@render children()}
	</main>
	{#if !appStore.isMobile}
		<Scrollbar />
	{/if}
</div>
