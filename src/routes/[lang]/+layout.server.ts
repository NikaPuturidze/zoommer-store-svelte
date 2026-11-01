import { BASE_LOCALE, locales, type Locale } from '#lib/i18n/i18n.ts';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const requestedLocale = params.lang;

	if (!Object.hasOwn(locales, requestedLocale)) {
		redirect(307, BASE_LOCALE);
	}

	const locale =
		requestedLocale && Object.hasOwn(locales, requestedLocale) ? requestedLocale : BASE_LOCALE;

	return { locale } as { locale: Locale };
};
