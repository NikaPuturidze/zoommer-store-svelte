import type { Action } from 'svelte/action';

export const pressAction: Action<HTMLElement, string | boolean | undefined> = (
	node,
	param = 'pressed'
) => {
	let currentClass: string | undefined;
	let releaseTimeout: ReturnType<typeof setTimeout> | undefined;

	const resolveClass = (value: string | boolean | undefined): string | undefined => {
		if (!value) return undefined;
		return typeof value === 'string' ? value : 'pressed';
	};

	const add = () => {
		if (!currentClass) return;
		if (releaseTimeout) clearTimeout(releaseTimeout);
		node.classList.add(currentClass);
	};

	const remove = () => {
		if (!currentClass) return;
		if (releaseTimeout) clearTimeout(releaseTimeout);
		const classToRemove = currentClass;
		releaseTimeout = setTimeout(() => node.classList.remove(classToRemove), 150);
	};

	const isActivationKey = (event: KeyboardEvent) => event.key === 'Enter' || event.key === ' ';
	const handleKeyDown = (event: KeyboardEvent) => {
		if (isActivationKey(event)) add();
	};
	const handleKeyUp = (event: KeyboardEvent) => {
		if (isActivationKey(event)) remove();
	};

	const attach = () => {
		node.addEventListener('pointerdown', add);
		node.addEventListener('pointerup', remove);
		node.addEventListener('pointercancel', remove);
		node.addEventListener('pointerleave', remove);
		node.addEventListener('keydown', handleKeyDown);
		node.addEventListener('keyup', handleKeyUp);
	};

	const detach = () => {
		if (releaseTimeout) clearTimeout(releaseTimeout);
		if (currentClass) node.classList.remove(currentClass);
		node.removeEventListener('pointerdown', add);
		node.removeEventListener('pointerup', remove);
		node.removeEventListener('pointercancel', remove);
		node.removeEventListener('pointerleave', remove);
		node.removeEventListener('keydown', handleKeyDown);
		node.removeEventListener('keyup', handleKeyUp);
	};

	currentClass = resolveClass(param);
	if (currentClass) attach();

	return {
		update(newParam = 'pressed') {
			detach();
			currentClass = resolveClass(newParam);
			if (currentClass) attach();
		},
		destroy() {
			detach();
		}
	};
};
