import type { ka } from './locales/ka';

export const locales = {
	ka: 'Georgian',
	en: 'English'
} as const;

export type Locale = keyof typeof locales;

export type TranslationKey = keyof typeof ka;

export const BASE_LOCALE: Locale = 'ka';
