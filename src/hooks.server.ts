import type { Handle, HandleFetch } from '@sveltejs/kit/hooks';
import setCookieParser from 'set-cookie-parser';

const ZOOMMER_ORIGIN = 'https://zoommer.ge';
const ZOOMMER_COOKIE = 'zoommer-access_token';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(ZOOMMER_COOKIE);

	if (!token) {
		const response = await fetch(ZOOMMER_ORIGIN);

		if (response.ok) {
			const cookie = setCookieParser(response.headers.getSetCookie()).find(
				(cookie) => cookie.name === ZOOMMER_COOKIE
			);

			if (cookie) {
				event.cookies.set(ZOOMMER_COOKIE, cookie.value, {
					path: '/',
					httpOnly: true,
					secure: false,
					sameSite: 'lax',
					...(cookie.maxAge !== undefined && {
						maxAge: cookie.maxAge
					})
				});
			}
		}
	}

	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const target = new URL(request.url);

	if (target.origin === ZOOMMER_ORIGIN) {
		request.headers.set('origin', ZOOMMER_ORIGIN);

		const token = event.cookies.get(ZOOMMER_COOKIE);

		if (token) {
			request.headers.set('cookie', `${ZOOMMER_COOKIE}=${encodeURIComponent(token)}`);
		}
	}

	return fetch(request);
};
