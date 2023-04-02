/** @type {import('@sveltejs/kit').RequestHandler} */

export async function load({ fetch }) {
    const response = await fetch('/api/search');
    const data = await response.json();
    return data;
}
