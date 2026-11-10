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

export const BASE_LOCALE: Locale = T.KA;

export function translate(locale: Locale, key: TranslationKey) {
	return locale === T.KA ? ka[key] : en[key];
}
