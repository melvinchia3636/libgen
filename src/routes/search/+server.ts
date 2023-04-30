/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

function camelize(str: string) {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, '');
}

export async function POST(hmm: RequestEvent) {
	const params = await hmm.request.json();

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
		let final = [];

		if (params.view !== 'detailed') {
			const table = document.querySelector('table.c');

			final = Array.from(table!.querySelectorAll('tr'))
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
		} else {
			const table = Array.from(document.querySelectorAll('table[rules="cols"]'));
			final = table
				.map(
					(item) =>
						({
							...Object.fromEntries(
								(
									Array.from(item.querySelectorAll('tr'))
										.map((e) => e.textContent?.trim())
										.filter((e) => e)
										.map((e) => e?.split('\n'))
										.map((e) => (e!.length % 2 ? e?.concat(['']) : e))
										.map((e) =>
											e!.reduce((all, one, i) => {
												const ch = Math.floor(i / 2);
												// @ts-ignore
												all[ch] = [].concat(all[ch] || [], one);
												return all;
											}, [])
										) as never as [string, string][]
								)
									.flat()
									.map((e) => [camelize(e[0].split(':')[0]), e[1] || e[0].split(':')[1].trim()])
							),
							image: item.querySelector('img')?.src
						} as never as Record<string, string | undefined>)
				)
				.filter((e) => Object.keys(e).length > 1);

			final.forEach((e) => {
				e['author'] = e['author(S)'];
				delete e['author(S)'];
			});
		}

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
