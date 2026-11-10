export function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
	return response.json() as Promise<T>;
}

export * from './get-mega-menu';
export * from './get-topics.service';
export * from './get-content';
