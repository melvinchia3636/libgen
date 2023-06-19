/** @type {import('@sveltejs/kit').RequestHandler} */

import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch, url }: LoadEvent) {
	const searchParams = url.searchParams;

	if (!searchParams.get('req') || (searchParams.get('req')?.length ?? 0) < 2)
		return {
			status: 400,
			error: new Error('Invalid search request')
		};

	const response = await fetch('/search', {
		method: 'POST',
		body: JSON.stringify({
			req: searchParams.get('req') || '',
			open: searchParams.get('open') || '0',
			view: searchParams.get('view') || 'simple',
			res: searchParams.get('res') || '25',
			column: searchParams.get('column') || 'def',
			phrase: searchParams.get('phrase') || '0',
			page: searchParams.get('page') || '1'
		})
	});
	const _data = await response.json();
	return _data;
}
