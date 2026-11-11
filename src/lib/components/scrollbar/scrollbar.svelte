<script lang="ts">
	let thumbHeight = $state(0);
	let thumbTop = $state(0);
	let visible = $state(false);
	let dragging = $state(false);
	let dragStartY = 0;
	let dragStartScrollTop = 0;

	$effect(() => {
		const target = document.documentElement;

		function syncScroll() {
			const { scrollTop, scrollHeight, clientHeight } = target;

			visible = scrollHeight > clientHeight;
			thumbHeight = (clientHeight / scrollHeight) * clientHeight;
			thumbTop =
				scrollHeight > clientHeight
					? (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight)
					: 0;
		}

		syncScroll();

		window.addEventListener('scroll', syncScroll, { passive: true });

		const observer = new ResizeObserver(syncScroll);
		observer.observe(target);

		return () => {
			window.removeEventListener('scroll', syncScroll);
			observer.disconnect();
		};
	});

	function startDrag(event: PointerEvent) {
		const target = document.documentElement;

		event.preventDefault();
		dragging = true;
		dragStartY = event.clientY;
		dragStartScrollTop = target.scrollTop;

		window.addEventListener('pointermove', drag);
		window.addEventListener('pointerup', stopDrag, { once: true });
	}

	function drag(event: PointerEvent) {
		const target = document.documentElement;

		const maxScrollTop = target.scrollHeight - target.clientHeight;
		const draggableHeight = target.clientHeight - thumbHeight;

		if (draggableHeight > 0) {
			target.scrollTop = Math.max(
				0,
				Math.min(
					maxScrollTop,
					dragStartScrollTop + ((event.clientY - dragStartY) * maxScrollTop) / draggableHeight
				)
			);
		}
	}

	function stopDrag() {
		dragging = false;
		window.removeEventListener('pointermove', drag);
	}
</script>

{#if visible}
	<div
		style:height={`${thumbHeight}px`}
		style:top={`${thumbTop}px`}
		class="scrollbar"
		class:dragging
		aria-hidden="true"
		onpointerdown={startDrag}
	></div>
{/if}

<style lang="scss">
	.scrollbar {
		position: fixed;
		right: 3px;
		opacity: 0.5;
		z-index: 9999;
		transition: width 0.1s ease-in-out;
		border-radius: 9px;
		background-color: var(--orange-main);
		width: 4px;
		touch-action: none;
		user-select: none;

		&:hover {
			width: 10px;
		}

		&.dragging {
			width: 10px;
		}
	}
</style>
