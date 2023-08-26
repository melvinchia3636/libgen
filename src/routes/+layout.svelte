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

	function updateStores() {
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
	}

	onMount(() => {
		updateStores();

		theme.set((localStorage.getItem('theme') as 'light' | 'dark') ?? 'light');

		theme.subscribe((value) => {
			if (value === 'dark') {
				document.querySelector('html')!.classList.add('dark');
			} else {
				document.querySelector('html')!.classList.remove('dark');
			}

			localStorage.setItem('theme', value);
		});

		navigating.subscribe((value) => {
			updateStores();
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
				<Icon icon="svg-spinners:90-ring" class="w-10 h-10 text-slate-700 dark:text-orange-500" />
			</div>
		{:else}
			<slot />
		{/if}
	</main>

	<footer class="mb-3 w-full flex flex-col gap-6">
		<p class="w-full px-8 text-xs text-center">
			<span
				class="inline-block text-base font-['JetBrains_Mono'] tracking-widest font-semibold opacity-50 mb-2"
				>&lt;CODEBLOG/&gt;</span
			>
			<br />
			Made with 🧡 by
			<a href="https://thecodeblog.net" class="underline text-orange-500">Melvin Chia</a>. Project
			under MIT License.
		</p>
	</footer>
</div>

<style global>
	* {
		@apply transition-colors duration-500;
	}
</style>
