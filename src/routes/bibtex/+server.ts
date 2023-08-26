/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { JSDOM } from 'jsdom';
import axios from 'axios';
import type { RequestEvent } from './$types';

export async function POST(req: RequestEvent) {
	const params = await req.request.json();

	const target = new URL('http://libgen.is/book/bibtex.php');
	target.searchParams.set('md5', params.md5);

	try {
		const { data } = await axios({
			method: 'GET',
			url: target.href
		});
		const dom = new JSDOM(data);
		const document = dom.window.document;

		return new Response(
			JSON.stringify({
				data:
					document
						.querySelector('body > textarea#bibtext')
						?.textContent?.trim()
						.replace(
							'http://gen.lib.rus.ec/book/index.php',
							'https://libgen.thecodeblog.net/book'
						) || ''
			})
		);
	} catch (e) {
		console.log(e);
		return new Response('{"hello": "world"}');
	}
}
