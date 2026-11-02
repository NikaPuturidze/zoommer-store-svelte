import type { Locale } from '../i18n/i18n';
import { createStoreContext } from './provide-store';

function createLocaleStore(getInitialLocale: () => Locale) {
	let locale = $state(getInitialLocale());

	return {
		get locale() {
			return locale;
		},
		set locale(value: Locale) {
			locale = value;
		}
	};
}

export const localeContext = createStoreContext(createLocaleStore);
