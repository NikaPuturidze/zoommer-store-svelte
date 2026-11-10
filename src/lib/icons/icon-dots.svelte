<script module>
	export { IconDotsSnippet };
</script>

{#snippet IconDotsSnippet()}
	<svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
		<rect fill="white" height="4" width="4" />
		<rect fill="white" height="4" width="4" x="8" />
		<rect fill="white" height="4" width="4" x="16" />
		<rect fill="white" height="4" width="4" y="8" />
		<rect fill="white" height="4" width="4" x="8" y="8" />
		<rect fill="white" height="4" width="4" x="16" y="8" />
		<rect fill="white" height="4" width="4" y="16" />
		<rect fill="white" height="4" width="4" x="8" y="16" />
		<rect fill="white" height="4" width="4" x="16" y="16" />
	</svg>
{/snippet}

{@render IconDotsSnippet()}
