import type { Action } from 'svelte/action';

export const pressAction: Action<HTMLElement, string> = (node, className = 'pressed') => {
	let currentClass = className;
	let releaseTimeout: ReturnType<typeof setTimeout> | undefined;

	const add = () => {
		if (releaseTimeout) clearTimeout(releaseTimeout);
		node.classList.add(currentClass);
	};

	const remove = () => {
		if (releaseTimeout) clearTimeout(releaseTimeout);
		releaseTimeout = setTimeout(() => node.classList.remove(currentClass), 150);
	};
	const isActivationKey = (event: KeyboardEvent) => event.key === 'Enter' || event.key === ' ';
	const handleKeyDown = (event: KeyboardEvent) => {
		if (isActivationKey(event)) add();
	};
	const handleKeyUp = (event: KeyboardEvent) => {
		if (isActivationKey(event)) remove();
	};

	node.addEventListener('pointerdown', add);
	node.addEventListener('pointerup', remove);
	node.addEventListener('pointercancel', remove);
	node.addEventListener('pointerleave', remove);
	node.addEventListener('keydown', handleKeyDown);
	node.addEventListener('keyup', handleKeyUp);

	return {
		update(newClassName = className) {
			if (releaseTimeout) clearTimeout(releaseTimeout);
			node.classList.remove(currentClass);
			currentClass = newClassName;
		},
		destroy() {
			if (releaseTimeout) clearTimeout(releaseTimeout);
			node.removeEventListener('pointerdown', add);
			node.removeEventListener('pointerup', remove);
			node.removeEventListener('pointercancel', remove);
			node.removeEventListener('pointerleave', remove);
			node.removeEventListener('keydown', handleKeyDown);
			node.removeEventListener('keyup', handleKeyUp);
		}
	};
};
