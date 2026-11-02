export interface TopicsResponse {
	firstFooter: TopicItem[];
	secondFooter: TopicItem[];
	showInTopMenu: TopicItem[];
}

export interface TopicItem {
	h1: string;
	id: number;
	metaDescription: string;
	metaTitle: string;
	orderNo: number;
	title: string;
	urlName: string;
}

export function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
	return response.json() as Promise<T>;
}

export function getTopicsService(fetcher: typeof fetch): Promise<TopicsResponse> {
	return fetcher('api/zoommer/Topics/get-topics').then(handleResponse<TopicsResponse>);
}
