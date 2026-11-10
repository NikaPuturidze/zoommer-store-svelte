import { resolve } from '$app/paths';
import type { Locale } from '#lib/i18n/i18n.ts';

export function getUrl(value: string, locale: Locale) {
	const path = value?.replace(/^https:\/\/zoommer\.ge(?=\/|$)/, '') ?? '';
	if (/^(https?:)?\/\//i.test(path)) return path;

	const relativePath = path.replace(/^\/+/, '');
	const localePrefix = /^(ka|en)(?=[/?#]|$)/.exec(relativePath)?.[0];
	if (localePrefix === 'ka' || localePrefix === 'en') {
		return resolve('/[lang]', { lang: localePrefix }) + relativePath.slice(localePrefix.length);
	}

	const home = resolve('/[lang]', { lang: locale });
	return relativePath ? `${home}/${relativePath}` : home;
}
