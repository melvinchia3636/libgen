<script>
	import { downloadTypes, searchFields } from '$lib/store/constants';
	import {
		downloadType,
		query,
		resultsCount,
		searchField,
		searchWithMask,
		viewResults
	} from '$lib/store/search';
	import { onMount } from 'svelte';
	import Header from '../lib/components/Header.svelte';
	import './styles.css';

	onMount(() => {
		const rawSearchParams = location.search;
		const searchParams = new URLSearchParams(rawSearchParams);
		if (searchParams.has('req') && (searchParams.get('req')?.length ?? 0) > 2) {
			query.set(searchParams.get('req') ?? '');
		}
		if (searchParams.has('open')) {
			downloadType.set(downloadTypes[parseInt(searchParams.get('open') ?? '0')]);
		}
		if (searchParams.has('view')) {
			viewResults.set(searchParams.get('view') ?? '');
		}
		if (searchParams.has('res')) {
			resultsCount.set(parseInt(searchParams.get('res') ?? '0'));
		}
		if (searchParams.has('phrase')) {
			searchWithMask.set(Boolean(parseInt(searchParams.get('phrase') ?? '0')));
		}
		if (searchParams.has('column')) {
			searchField.set(
				searchFields.find((field) => field.id === searchParams.get('column')) || searchFields[0]
			);
		}
	});
</script>

<div class="app bg-slate-200 w-full min-h-screen text-slate-700 flex flex-col" data-theme="light">
	<Header />

	<main class="flex-1 flex flex-col w-full">
		<slot />
	</main>

	<footer
		class="mb-3 w-full flex items-center justify-center text-sm divide-x-[1.5px] divide-slate-600 font-light tracking-wider"
	>
		<a href="/letter-of-solidarity" class="block px-2">Letter of Solidarity</a>
		<a href="/desktop" class="block px-2">Libgen Desktop</a>
		<a href="/searching-guide" class="block px-2">Searching Guide</a>
	</footer>
</div>

<style>
</style>
