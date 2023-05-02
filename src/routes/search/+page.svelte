<script lang="ts">
	import SearchBox from '$lib/components/search/SearchBox.svelte';
	import SearchFilter from '$lib/components/search/SearchFilter.svelte';
	import { onMount } from 'svelte';

	export let data;

	let isFilterOpen = false;
	let urlParams: URLSearchParams | undefined;

	onMount(() => {
		urlParams = new URLSearchParams(window.location.search);
	});
</script>

<svelte:head>
	<title>Library Genesis</title>
</svelte:head>

<section class="flex-1 flex flex-col items-center justify-center my-32">
	<h1 class="text-4xl text-left w-4/5">Search results for: {data.query}</h1>
	<p class="text-left w-4/5 mb-8 mt-2">{data.resultsCount}</p>
	<div class="w-4/5">
		<SearchBox bind:isFilterOpen />
		<SearchFilter bind:isFilterOpen />
	</div>
	{#if urlParams?.get('view') !== 'detailed'}
		<table class="w-4/5">
			<thead class="border-b border-slate-300 !font-light">
				<tr>
					<th class="p-4 text-left">Title</th>
					<th class="p-4 text-left">Author</th>
					<th class="p-4 text-left">Year</th>
					<th class="p-4 text-left">Pages</th>
					<th class="p-4 text-left">Language</th>
					<th class="p-4 text-left">Size</th>
					<th class="p-4 text-left">Extension</th>
				</tr>
			</thead>
			<tbody>
				{#each data.data as book}
					<tr class="border-b border-slate-300 odd:bg-slate-300/30 dark:odd:bg-zinc-700/50">
						<td class="p-4">{book.title}</td>
						<td class="p-4 font-light">{book.author}</td>
						<td class="p-4 font-light">{book.year}</td>
						<td class="p-4 font-light">{book.pages}</td>
						<td class="p-4 font-light">{book.language}</td>
						<td class="whitespace-nowrap p-4 font-light">{book.size}</td>
						<td class="p-4 font-light">{book.extension}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="w-4/5 flex flex-col gap-4">
			{#each data.data as book}
				<div class="flex p-8 gap-4 bg-white rounded-md shadow-md">
					<img src="http://libgen.is{book.image}" class="w-64" referrerpolicy="no-referrer" />
					<div>
						<h2 class="text-2xl">{book.title}</h2>
						<p class="font-light">{book.author}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
