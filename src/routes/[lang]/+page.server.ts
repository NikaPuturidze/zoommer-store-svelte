import { getMegaMenuService, type MegaMenuItem } from '#lib/services';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const megaMenu = await loadMegaMenu(fetch, parent);
	const heights = getMegaMenuHeights();
	return { megaMenu, heights } as { megaMenu: MegaMenuItem[]; heights: number[] };
};

async function loadMegaMenu(
	fetcher: typeof fetch,
	parent: () => Promise<unknown>
): Promise<MegaMenuItem[]> {
	await parent();
	return getMegaMenuService(fetcher);
}

function getMegaMenuHeights(): number[] {
	return [880, 659.5, 599, 743.5, 599, 649, 649, 599, 599, 599, 649, 599, 764];
}
