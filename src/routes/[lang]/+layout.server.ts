import { BASE_LOCALE, locales, type Locale } from '#lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	if (!Object.hasOwn(locales, params.lang)) {
		redirect(307, BASE_LOCALE);
	}

	const locale = params.lang && Object.hasOwn(locales, params.lang) ? params.lang : BASE_LOCALE;

	return { locale } as { locale: Locale };
};
