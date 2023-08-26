<script lang="ts">
	import Pagination from '$lib/components/search/Pagination.svelte';
	import SearchBox from '$lib/components/search/SearchBox.svelte';
	import SearchFilter from '$lib/components/search/SearchFilter.svelte';
	import { onMount } from 'svelte';

	export let data;

	let isFilterOpen = false;
	let urlParams: URLSearchParams | undefined;
	let currentPage = data.page;

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
	<Pagination {data} {currentPage} {urlParams} />
	{#if !data.data || data.data?.length === 0}
		<div class="w-4/5 flex flex-col items-center justify-center gap-4 mt-6">
			<span class="text-orange-500 text-[10rem]">;-;</span>
			<p class="text-xl">No results found</p>
		</div>
	{:else if urlParams?.get('view') !== 'detailed'}
		<table class="w-4/5">
			<thead class="border-b border-slate-300 dark:border-zinc-600 !font-light">
				<tr>
					<th class="p-4 text-left">Title</th>
					<th class="p-4 text-left">Author(s)</th>
					<th class="p-4 text-center">Year</th>
					<th class="p-4 text-center">Pages</th>
					<th class="p-4 text-center">Language</th>
					<th class="p-4 text-center">Size</th>
					<th class="p-4 text-center">Extension</th>
					<th class="p-4 text-center">Download</th>
				</tr>
			</thead>
			<tbody>
				{#each data.data as book}
					<tr
						class="border-b border-slate-300 dark:border-zinc-600 odd:bg-slate-300/30 dark:odd:bg-zinc-700/50"
					>
						<td class="p-4 flex flex-col gap-1">
							{#if book.series}
								<div>
									<a
										href="/search?req={encodeURIComponent(book.series)}&column=series"
										class="text-sm text-orange-500 hover:text-orange-600">{book.series}</a
									>
								</div>
							{/if}
							<a
								href="/book?md5={book.md5}"
								class="flex flex-col gap-1 hover:underline hover:decoration-slate-600 hover:text-slate-800 dark:hover:decoration-zinc-500 dark:hover:text-zinc-300"
							>
								{book?.title?.title}
								{#if book?.title?.edition}
									<span class="text-sm text-slate-500 dark:text-zinc-500"
										>{book?.title?.edition}</span
									>
								{/if}
							</a>
						</td>
						<td class="p-4 font-light">
							<span class="flex flex-wrap"
								>{#each (book.author || '').split(/,|;/) as author, i}
									<a
										href="/search?req={encodeURIComponent(author.trim())}&column=author"
										class="text-orange-500 hover:text-orange-600"
									>
										{author.trim()}
									</a>
									{#if i < (book.author?.split(/,|;/) || '')?.length - 1}
										,&nbsp;
									{/if}
								{/each}
							</span>
						</td>
						<td class="p-4 font-light text-center">{book.year}</td>
						<td class="p-4 font-light text-center">{book.pages}</td>
						<td class="p-4 font-light text-center">{book.language}</td>
						<td class="whitespace-nowrap p-4 font-light text-center">{book.size}</td>
						<td class="p-4 font-light text-center">{book.extension}</td>
						<td class="p-4 font-light text-center">
							<a
								href={book.mirror1}
								target="_blank"
								rel="noopener noreferrer"
								class="text-orange-500 hover:text-orange-600"
							>
								Mirror 1
							</a>
							<a
								href={book.mirror2}
								target="_blank"
								rel="noopener noreferrer"
								class="text-orange-500 hover:text-orange-600"
							>
								Mirror 2
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="w-4/5 flex flex-col gap-4 mb-2">
			{#each data.data as book}
				<div class="flex p-8 gap-8 bg-white dark:bg-zinc-700/50 rounded-md shadow-md items-start">
					<img
						src="http://libgen.is{book.image}"
						class="w-64 h-full object-contain"
						referrerpolicy="no-referrer"
						alt=""
					/>
					<div class="w-full">
						<a href="/book?md5={book.md5}" class="text-2xl">{book.Title}</a>
						<p class="font-light flex flex-wrap mt-1">
							{#each book['Author(s)'].split(/,|;/) as author, i}
								<a
									href="/search?req={encodeURIComponent(author.trim())}&column=author"
									class="text-orange-500 hover:text-orange-600"
								>
									{author.trim()}
								</a>
								{#if i < book['Author(s)'].split(/,|;/).length - 1}
									,&nbsp;
								{/if}
							{/each}
						</p>
						<div class="grid grid-cols-[repeat(auto-fit,minmax(33%,1fr))] w-full gap-y-4 mt-6">
							{#each Object.entries(book) as [key, value]}
								{#if value && !['image', 'Title', 'Author(s)', 'md5'].includes(key)}
									<div class="flex flex-col gap-1">
										<p class="font-light text-zinc-400">{key}</p>
										<p class="font-light">
											{#if key == 'series'}
												<a
													href="/search?req={encodeURIComponent(value)}&column=series&view=detailed"
													class="text-orange-500 hover:text-orange-600">{value}</a
												>
											{:else}
												{value}
											{/if}
										</p>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<Pagination {data} {currentPage} {urlParams} />
</section>
