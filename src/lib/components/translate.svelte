<script lang="ts">
	import { localeContext, type TranslationKey } from '#lib';

	const { key }: { key: TranslationKey } = $props();
	const { t } = localeContext.get();
</script>

{t(key)}
