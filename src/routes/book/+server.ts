/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { JSDOM } from 'jsdom';
import axios from 'axios';
import type { RequestEvent } from './$types';
import camelize from '../../utils/camelize';

const zip = (a: Array<string>, b: Array<string> | null) => {
	if (b) return Object.fromEntries(a.map((k, i) => [k, b[i]]).filter((e) => e[0]));
	return a;
};

export async function POST(req: RequestEvent) {
	const params = await req.request.json();

	const target = new URL('http://libgen.is/book/index.php');
	target.searchParams.set('md5', params.md5);

	try {
		const { data } = await axios({
			method: 'GET',
			url: target.href
		});
		const dom = new JSDOM(data);
		const document = dom.window.document;

		const final = Object.fromEntries(
			Array.from(document.querySelectorAll('body > table[rules="cols"] > tbody > tr'))
				.slice(2)
				.map((e) =>
					!e.querySelector('table')
						? Array.from(e.querySelectorAll('td'))
								.map((e) => e.textContent?.trim())
								.reduce((all: string[][], one, i) => {
									const ch = Math.floor(i / 2);
									all[ch] = ([] as string[]).concat(all[ch] || [], one as string);
									return all;
								}, [])
								.map((e) => [e[0].replace(/:$/, ''), e[1]])
						: [
								[
									e.querySelector('td')?.textContent?.trim(),
									zip(
										...(Array.from(e?.querySelectorAll('table > tbody > tr')).map((e) =>
											Array.from(e.querySelectorAll('td')).map((e) => e.textContent?.trim())
										) as [Array<string>, Array<string> | null])
									)
								]
						  ]
				)
				.flat()
				.filter((e) => e?.length === 2 && e[0] !== 'Table of contents' && e[1])
				.map((e) => [e[0] as string, e[1]]) as [string, any][]
		);

		final.image = document.querySelector('img')?.src ?? '';

		final.title =
			document
				.querySelector('body > table[rules="cols"] > tbody > tr:nth-child(2) > td:nth-child(3)')
				?.textContent?.trim() ?? '';

		final.hashes = Object.fromEntries(
			Array.from(document.querySelectorAll('table.hashes > tbody > tr'))
				.map((e) => [e.querySelector('th')?.textContent, e.querySelector('td')?.textContent])
				.filter((e) => e[0])
		);

		return new Response(JSON.stringify(final));
	} catch (e) {
		return new Response('{"hello": "world"}');
	}
}
