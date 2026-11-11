<script lang="ts">
	const { children } = $props();
</script>

<div class="page-wrapper">
	{@render children()}
</div>

<style lang="scss">
	.page-wrapper {
		@include page;
	}
</style>
