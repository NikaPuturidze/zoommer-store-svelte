import { handleResponse } from '.';

export interface Categories {
	childCategories?: Categories[];
	googleCategoryId: null | string;
	id: number;
	name: string;
	orderNo: number;
	url: string;
}

export function getAllCategories(fetcher: typeof fetch): Promise<Categories[]> {
	return fetcher('/api/zoommer/Categories/all-categories').then(handleResponse<Categories[]>);
}
