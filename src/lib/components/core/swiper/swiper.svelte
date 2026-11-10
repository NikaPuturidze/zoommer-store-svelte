<script lang="ts">
	import IconSliderLeft from '#lib/icons/icon-slider-left.svelte';
	import IconSliderRight from '#lib/icons/icon-slider-right.svelte';
	import { onMount, type Snippet } from 'svelte';

	const { children, gap = 20 }: { children: Snippet; gap?: number } = $props();

	let swiper: HTMLDivElement;
	let currentIndex = $state(0);

	function scrollTo(index: number) {
		const slide = swiper.querySelector<HTMLElement>(`:scope > [data-index="${index}"]`);
		if (!slide) return false;
		swiper.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
		currentIndex = index;
		return true;
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (!scrollTo(currentIndex + 1)) scrollTo(0);
		}, 4000);

		return () => clearInterval(interval);
	});
</script>

<div class="track">
	<div class="swiper">
		<div bind:this={swiper} style:--banner-gap={`${gap}px`} class="swiper-wrapper">
			{@render children()}
		</div>
		<div class="controls">
			<span onclick={() => scrollTo(currentIndex - 1)} role="presentation">
				<IconSliderLeft />
			</span>
			<span onclick={() => scrollTo(currentIndex + 1)} role="presentation">
				<IconSliderRight />
			</span>
		</div>
	</div>
</div>

<style lang="scss">
	.track {
		width: 100%;

		.swiper {
			--banner-gap: 30px;

			position: relative;
			width: 100%;
			height: 100%;

			.swiper-wrapper {
				display: flex;
				position: relative;
				transition-property: transform;
				box-sizing: content-box;
				width: 100%;
				height: 100%;
				overflow: scroll;

				> :global(*) {
					flex-shrink: 0;
					margin-right: var(--banner-gap);
				}
			}

			.controls {
				> :global(span) {
					display: flex;
					position: absolute;
					top: 50%;
					justify-content: center;
					align-items: center;
					transform: translateY(-50%);
					z-index: 1;
					cursor: pointer;
					box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
					border-radius: 50%;
					user-select: none;
				}

				> :global(span):first-of-type {
					left: 1%;
				}

				> :global(span):last-of-type {
					right: 1%;
				}
			}
		}
	}
</style>
