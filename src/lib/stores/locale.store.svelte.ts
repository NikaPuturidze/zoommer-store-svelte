import { translate, type Locale, type TranslationKey } from '../i18n/i18n';
import { createStoreContext } from './provide-store';

function createLocaleStore(getLocale: () => Locale) {
	const t = (key: TranslationKey) => translate(getLocale(), key);

	return {
		get locale() {
			return getLocale();
		},
		t
	};
}

export const localeContext = createStoreContext(createLocaleStore);
