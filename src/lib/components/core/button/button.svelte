<script lang="ts">
	import { pressAction } from '#lib/actions/press.ts';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		children: Snippet;
		press?: boolean;
	};

	const { press = true, children, type = 'button', ...rest }: Props = $props();
</script>

<button {...rest} {type} use:pressAction={press}>
	{@render children()}
</button>

<style lang="scss">
	button {
		@include medium;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 2px 10px);
		transition: transform 150ms ease-in-out;
		cursor: pointer;
		border-radius: 12px;
		padding: 10px;

		&:global(.pressed) {
			transform: scale(0.95);
		}

		> :global(svg) {
			height: fit-content;
		}
	}
</style>
