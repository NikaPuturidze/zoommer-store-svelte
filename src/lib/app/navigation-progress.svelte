<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { appContext } from '#lib/stores/app.store.svelte.ts';

	const minimumDuration = 220;
	const appStore = appContext.get();
	let startedAt = 0;
	let completionTimeout: ReturnType<typeof setTimeout> | undefined;

	NProgress.configure({ minimum: 0.16 });

	beforeNavigate(({ type }) => {
		if (type === 'leave') return;

		if (completionTimeout) clearTimeout(completionTimeout);
		startedAt = performance.now();
		NProgress.start();
	});

	afterNavigate(() => {
		const elapsed = performance.now() - startedAt;
		const remaining = Math.max(0, minimumDuration - elapsed);

		completionTimeout = setTimeout(() => NProgress.done(), remaining);
	});

	$effect(() => {
		const root = document.documentElement;

		root.classList.toggle('nprogress-white', appStore.isHeaderVisible);

		return () => root.classList.remove('nprogress-white');
	});

	onDestroy(() => {
		if (completionTimeout) clearTimeout(completionTimeout);
		NProgress.done();
	});
</script>

<style lang="scss">
	@include nprogress();

	:global(html.nprogress-white #nprogress .bar) {
		background-color: $white-main;
	}

	:global(html.nprogress-white #nprogress .peg) {
		box-shadow:
			0 0 10px $white-main,
			0 0 5px $white-main;
	}
</style>
