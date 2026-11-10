import { createStoreContext } from './provide-store';

function createAppStore() {
	let isHeaderVisible = $state(true);
	let isNavbarDocked = $state(false);
	let isMobile = $state(false);
	let previousScrollY = 0;

	function updateHeaderVisibility() {
		const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
		const navbarHeight = document.querySelector('.navbar')?.getBoundingClientRect().height ?? 0;
		const scrollY = Math.max(0, window.scrollY);

		isHeaderVisible = scrollY < headerHeight;

		if (scrollY > previousScrollY && scrollY > headerHeight + navbarHeight) {
			isNavbarDocked = true;
		} else if (scrollY <= headerHeight) {
			isNavbarDocked = false;
		}

		previousScrollY = scrollY;
	}

	if (typeof window !== 'undefined') {
		const mobileQuery = window.matchMedia('(max-width: 1023px)');

		isMobile = mobileQuery.matches;
		mobileQuery.addEventListener('change', (event) => {
			isMobile = event.matches;
		});

		requestAnimationFrame(updateHeaderVisibility);
		window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
		window.addEventListener('resize', updateHeaderVisibility);
	}

	return {
		get isHeaderVisible() {
			return isHeaderVisible;
		},
		get isNavbarDocked() {
			return isNavbarDocked;
		},
		get isMobile() {
			return isMobile;
		}
	};
}

export const appContext = createStoreContext(createAppStore);
