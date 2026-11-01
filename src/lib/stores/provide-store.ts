import { createContext } from 'svelte';

export type StoreContext<TStore, TArgs extends unknown[]> = {
	get: () => TStore;
	set: (store: TStore) => TStore;
	has: () => boolean;
	provide: (...args: TArgs) => TStore;
};

export function createStoreContext<TStore, TArgs extends unknown[] = []>(
	createStore: (...args: TArgs) => TStore
): StoreContext<TStore, TArgs> {
	const [get, set, has] = createContext<TStore>();

	function provide(...args: TArgs): TStore {
		const store = createStore(...args);
		set(store);
		return store;
	}

	return { get, set, has, provide };
}
