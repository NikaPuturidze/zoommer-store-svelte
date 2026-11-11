import { translate, type Locale, type TranslationKey, type TranslationParams } from '../i18n/i18n';
import { getUrl as getLocalizedUrl } from '../helpers/get-url';
import { createStoreContext } from './provide-store';

function createLocaleStore(getLocale: () => Locale) {
	const t = (key: TranslationKey, params?: TranslationParams) =>
		translate(getLocale(), key, params);
	const getUrl = (value: string) => getLocalizedUrl(value, getLocale());

	return {
		get locale() {
			return getLocale();
		},
		getUrl,
		t
	};
}

export const localeContext = createStoreContext(createLocaleStore);
