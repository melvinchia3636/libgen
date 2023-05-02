<script lang="ts">
	import { downloadTypes, searchFields } from '$lib/store/constants';
	import {
		downloadType,
		query,
		resultsCount,
		searchField,
		searchWithMask,
		viewResults
	} from '$lib/store/search';
	import { theme } from '$lib/store/theme';
	import { onMount } from 'svelte';
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
	import Icon from '@iconify/svelte';
	import { navigating } from '$app/stores';

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

		theme.set((localStorage.getItem('theme') as 'light' | 'dark') ?? 'light');

		theme.subscribe((value) => {
			if (value === 'dark') {
				document.querySelector('html')!.classList.add('dark');
			} else {
				document.querySelector('html')!.classList.remove('dark');
			}

			localStorage.setItem('theme', value);
		});
	});
</script>

<div
	class="app bg-slate-200 dark:bg-zinc-800 w-full min-h-screen text-slate-700 dark:text-white flex flex-col"
	data-theme="light"
>
	<Header />

	<main class="flex-1 flex flex-col w-full">
		{#if $navigating}
			<div class="flex-1 flex items-center justify-center">
				<Icon icon="svg-spinners:90-ring" class="w-10 h-10 text-slate-700" />
			</div>
		{:else}
			<slot />
		{/if}
	</main>

	<footer
		class="mb-3 w-full flex items-center justify-center text-sm divide-x-[1.5px] divide-slate-600 font-light tracking-wider"
	>
		<a href="/letter-of-solidarity" class="block px-2">Letter of Solidarity</a>
		<a href="/desktop" class="block px-2">Libgen Desktop</a>
		<a href="/searching-guide" class="block px-2">Searching Guide</a>
	</footer>
</div>

<style global>
	* {
		@apply transition-colors duration-500;
	}
</style>
