import { BASE_LOCALE } from '#lib/i18n/i18n.ts';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	redirect(307, BASE_LOCALE);
};
