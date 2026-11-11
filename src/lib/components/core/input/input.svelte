<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes & {
		leadingIcon?: Snippet;
		class?: string;
		value?: string;
	};

	let { leadingIcon, value = $bindable(''), class: className = '', ...rest }: Props = $props();
</script>

<div class={className}>
	<div class="input-container">
		{#if leadingIcon}
			{@render leadingIcon()}
		{/if}
		<input bind:value {...rest} />
	</div>
</div>

<style lang="scss">
	.input-container {
		display: flex;
		gap: 15px;
		filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 2px 10px);
		cursor: pointer;
		border: 1px solid rgba(236, 94, 42, 0.5);
		border-radius: 12px;
		background-color: var(--white-main);
		padding: 11px;
		width: 100%;
		height: 100%;

		> input {
			@include regular;
			outline: none;
			border-width: medium;
			border-style: none;
			border-color: currentcolor;
			border-image: none;
			width: 90%;
		}
	}
</style>
