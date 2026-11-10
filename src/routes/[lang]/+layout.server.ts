import { BASE_LOCALE, getTopicsService, locales, type Locale, type TopicsResponse } from '#lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch, parent }) => {
	const locale = resolveLocale(params.lang);
	const topics = await loadLayoutData(fetch, parent);

	return { locale, topics } as { locale: Locale; topics: TopicsResponse };
};

function resolveLocale(lang: string): Locale {
	if (!Object.hasOwn(locales, lang)) {
		redirect(307, BASE_LOCALE);
	}

	return lang as Locale;
}

async function loadLayoutData(
	fetcher: typeof fetch,
	parent: () => Promise<unknown>
): Promise<TopicsResponse> {
	await parent();
	return getTopicsService(fetcher);
}
