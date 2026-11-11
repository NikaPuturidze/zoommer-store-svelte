import { en } from './locales/en';
import { ka } from './locales/ka';

export enum T {
	KA = 'ka',
	EN = 'en'
}

export const locales = {
	[T.KA]: 'Georgian',
	[T.EN]: 'English'
} as const;

export type Locale = keyof typeof locales;

export type TranslationKey = keyof typeof ka;
export type TranslationParams = Record<string, string | number>;

export const BASE_LOCALE: Locale = T.KA;

export function translate(locale: Locale, key: TranslationKey, params: TranslationParams = {}) {
	const value = locale === T.KA ? ka[key] : en[key];

	return value.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
		return Object.hasOwn(params, name) ? String(params[name]) : placeholder;
	});
}
