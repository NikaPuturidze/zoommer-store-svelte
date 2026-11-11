<script lang="ts">
	import { localeContext, type TranslationKey, type TranslationParams } from '#lib';

	const { key, params }: { key: TranslationKey; params?: TranslationParams } = $props();
	const { t } = localeContext.get();

	const parts = $derived(
		t(key)
			.split(/(\{\w+\})/g)
			.filter(Boolean)
			.map((value) => {
				const name = /^\{(\w+)\}$/.exec(value)?.[1];
				if (!name || !params || !Object.hasOwn(params, name)) {
					return { isParameter: false, value };
				}

				return { isParameter: true, value: String(params[name]) };
			})
	);
</script>

{#each parts as part, index (index)}
	{#if part.isParameter}
		<span class="parameter">{part.value}</span>
	{:else}
		{part.value}
	{/if}
{/each}
