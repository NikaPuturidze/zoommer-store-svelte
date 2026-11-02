<script lang="ts">
	import type { TranslationKey } from '#lib';
	import { ka } from '#lib/i18n/locales/ka.ts';

	const { key }: { key: TranslationKey } = $props();
</script>

{ka[key]}
