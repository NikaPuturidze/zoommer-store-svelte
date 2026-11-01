export const locales = {
	ka: 'Georgian',
	en: 'English'
} as const;

export type Locale = keyof typeof locales;

export const BASE_LOCALE: Locale = 'ka';
