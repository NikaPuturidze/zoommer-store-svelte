import { handleResponse } from '.';

export interface MegaMenuItem {
	id: number;
	name: string;
	description: string | null;
	url: string;
	categoryId: number;
	imageId: number;
	imageUrl: string;
	iconId: number;
	iconUrl: string;
	parentItemId: number | null;
	isNew: boolean;
	forMain: boolean;
	isActive: boolean;
	order: number;
	isExpanded: boolean;
	childItems: MegaMenuItem[] | null;
}

export function getMegaMenuService(fetcher: typeof fetch): Promise<MegaMenuItem[]> {
	return fetcher('/api/zoommer/Content/mega-menu').then(handleResponse<MegaMenuItem[]>);
}
