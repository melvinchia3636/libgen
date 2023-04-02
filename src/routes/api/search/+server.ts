/** @type {import('@sveltejs/kit').Handle} */

import { JSDOM } from 'jsdom';
import axios from 'axios';

const cleanupTitle = (title: Element | null) => {
	if (title === null) return '';
	const el = title.querySelectorAll('font');
	if (el) {
		el.forEach((e) => e.remove());
	}
	return title.textContent;
};

export async function GET() {
	const { data } = await axios.get(
		'http://libgen.is/search.php?req=minecraft&lg_topic=libgen&open=0&view=simple&res=25&column=def'
	);
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
			resultsCount: document.querySelector("font[color='grey']")?.textContent,
			data: final
		})
	);
}
