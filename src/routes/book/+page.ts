/** @type {import('@sveltejs/kit').RequestHandler} */

import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch, url }: LoadEvent) {
	const searchParams = url.searchParams;

	if (!searchParams.get('md5') || (searchParams.get('md5')?.length ?? 0) !== 32)
		throw {
			status: 400,
			error: new Error('Invalid search request')
		};

	const response = await fetch('/book', {
		method: 'POST',
		body: JSON.stringify({
			md5: searchParams.get('md5') || '',
			tlm: searchParams.get('tlm') || ''
		})
	});
	const _data = await response.json();
	return _data;
}
