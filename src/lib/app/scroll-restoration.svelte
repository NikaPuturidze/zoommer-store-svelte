<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const resetScroll = () => window.scrollTo(0, 0);

		resetScroll();
		requestAnimationFrame(resetScroll);
	});
</script>
