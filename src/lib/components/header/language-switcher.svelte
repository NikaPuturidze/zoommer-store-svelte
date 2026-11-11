<script lang="ts">
	import { T, type Locale } from '#lib/i18n/i18n.ts';
	import { localeContext } from '#lib/stores/locale.store.svelte.ts';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let isActive = $state(false);
	const localeStore = localeContext.get();

	function handleLocaleSwitch(locale: Locale) {
		goto(resolve('/[lang]', { lang: locale }));
		isActive = false;
	}
</script>

<div class="wrapper">
	<button class="flag" onclick={() => (isActive = !isActive)} type="button">
		<img class:active={localeStore.locale == T.KA} alt="Georgian flag" src="/images/flag-geo.png" />
		<img class:active={localeStore.locale == T.EN} alt="Usa flag" src="/images/flag-eng.png" />
	</button>
	<div class="lang" class:active={isActive}>
		<button onclick={() => handleLocaleSwitch(T.KA)} type="button"> GEO </button>
		<button onclick={() => handleLocaleSwitch(T.EN)} type="button"> ENG </button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		position: relative;
		align-items: center;
		gap: 10px;
		filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 2px 10px);
		border-radius: 12px;
		background-color: var(--white-main);
		padding: 7px 10px;
		min-width: 48px;
		min-height: 38px;

		@include response-to-mobile {
			filter: none;
			border: 1px solid rgba(0, 0, 0, 0.075);
			border-radius: 6px;
			background-color: transparent;
			padding: 6px 7px;
		}

		.flag {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			width: 100%;
			height: 100%;

			@include response-to-mobile {
				width: 32px;
				height: 17.5px;
			}

			> img {
				display: none;
				box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
				border-radius: 4px;
				width: 28px;
				object-fit: contain;
				user-select: inherit;

				&.active {
					display: flex;
				}

				@include response-to-mobile {
					box-shadow: none;
				}
			}
		}

		.lang {
			display: flex;
			position: absolute;
			top: 100%;
			left: 0px;
			flex-direction: column;
			scale: 0.95;
			opacity: 0;
			filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 2px 10px);
			transition: all 0.1s ease;
			margin-top: 10px;
			border-radius: 12px;
			background: var(--white-main);
			width: 100%;
			overflow: hidden;
			pointer-events: none;

			&.active {
				transform: none;
				scale: 1;
				opacity: 1;
				pointer-events: auto;
			}

			button {
				display: inline-block;
				transition: inherit;
				cursor: pointer;
				padding-block: 7px;
				text-align: center;

				&:hover {
					background: var(--white-300);
				}
			}
		}
	}
</style>
