import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { BASE_LOCALE } from '#lib/i18n/i18n.ts';

const proxy: RequestHandler = async ({ params, url, request, fetch }) => {
	try {
		const targetUrl = new URL(`https://zoommer.ge/api/proxy/v1/${params.path}`);

		targetUrl.search = url.search;

		const response = await fetch(targetUrl, {
			headers: {
				'accept-language': request.headers.get('accept-language') ?? BASE_LOCALE
			},
			method: request.method,
			body:
				request.method === 'GET' || request.method === 'HEAD' || request.body === null
					? undefined
					: await request.arrayBuffer()
		});

		return new Response(request.method === 'HEAD' ? null : response.body, {
			status: response.status,
			headers: new Headers({
				'Content-Type': response.headers.get('content-type') ?? 'application/json'
			})
		});
	} catch (err) {
		throw error(502, err instanceof Error ? err.message : 'Upstream request failed');
	}
};

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
