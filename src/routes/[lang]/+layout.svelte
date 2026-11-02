<script lang="ts">
	import { localeContext, type Locale } from '#lib';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';

	const { data, children }: LayoutProps = $props();

	const localeStore = localeContext.provide(() => data.locale as Locale);

	onMount(() => {
		localeStore.locale = data.locale;
	});
</script>

{@render children()}
