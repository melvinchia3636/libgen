import { JSDOM } from 'jsdom';
import axios from 'axios';
import type { RequestEvent } from './$types';

const cleanupTitle = (title: Element | null) => {
	if (title === null) return '';
	const el = title.querySelectorAll('font');
	if (el) {
		el.forEach((e) => e.remove());
	}
	return title.textContent;
};

export async function POST(hmm: RequestEvent) {
	const params = await hmm.request.json();
	console.log(params);

	const target = new URL('http://libgen.is/search.php');
	target.searchParams.set('req', params.req);
	target.searchParams.set('lg_topic', 'libgen');
	target.searchParams.set('open', params.open);
	target.searchParams.set('view', params.view);
	target.searchParams.set('res', params.res);
	target.searchParams.set('column', params.column);

	try {
		const { data } = await axios.get(target.toString());
		const dom = new JSDOM(data);
		const document = dom.window.document;
		const table = document.querySelector('table.c');

		const final = Array.from(table!.querySelectorAll('tr'))
			.slice(1)
			.map((row) => {
				const cells = row.querySelectorAll('td');
				return {
					id: cells[0].textContent,
					author: cells[1].textContent,
					title: cleanupTitle(cells[2].querySelector('[title]')),
					publisher: cells[3].textContent,
					year: cells[4].textContent,
					pages: cells[5].textContent,
					language: cells[6].textContent,
					size: cells[7].textContent,
					extension: cells[8].textContent,
					mirror1: cells[9].querySelector('a')?.href,
					mirror2: cells[10].querySelector('a')?.href
				};
			});

		return new Response(
			JSON.stringify({
				query: params.req,
				resultsCount: document.querySelector("font[color='grey']")?.textContent,
				data: final
			})
		);
	} catch {
		return new Response(
			JSON.stringify({
				query: params.req,
				resultsCount: '0',
				data: []
			})
		);
	}
}
