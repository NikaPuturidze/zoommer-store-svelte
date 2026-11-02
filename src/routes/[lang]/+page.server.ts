import { getTopicsService } from '#lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const topics = await getTopicsService(fetch);
	return { topics };
};
