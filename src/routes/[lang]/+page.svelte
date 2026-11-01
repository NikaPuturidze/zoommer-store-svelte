<script lang="ts">
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';

	const localeStore = localeContext.get();
</script>

<div>
	{localeStore.locale}
</div>
