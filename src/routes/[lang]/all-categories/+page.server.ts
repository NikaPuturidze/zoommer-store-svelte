import { getAllCategories, type Categories } from '#lib/services/get-all-categories.ts';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const categories = await loadAllCategories(fetch, parent);

	return { categories } as {
		categories: Categories[];
	};
};

async function loadAllCategories(
	fetcher: typeof fetch,
	parent: () => Promise<unknown>
): Promise<Categories[]> {
	await parent();
	return getAllCategories(fetcher);
}
