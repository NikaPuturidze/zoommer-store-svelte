<script lang="ts">
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import type { Locale } from '#lib/i18n/i18n.ts';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';

	const { data, children }: LayoutProps = $props();

	const localeStore = localeContext.provide(() => data.locale as Locale);

	onMount(() => {
		localeStore.locale = data.locale;
	});
</script>

{@render children()}
