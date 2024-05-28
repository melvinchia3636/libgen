<script lang="ts">
	import { goto } from '$app/navigation';
	import { resultsCount } from '$lib/store/search';
	import Icon from '@iconify/svelte';

	export let data: { [key: string]: any } = {};
	export let currentPage = 1;
	export let urlParams: URLSearchParams | undefined;

	function goToPage(page: number) {
		if (urlParams) {
			urlParams.set('page', page.toString());
			goto(`?${urlParams.toString()}`);
		}
	}
</script>

<ul class="list-style-none flex w-4/5 justify-between my-4">
	<li>
		{#if parseInt(data.resultsCount) > parseInt(urlParams?.get('res') || '25')}
			<button
				disabled={currentPage <= 1}
				class="relative flex items-center rounded-md bg-transparent px-4 py-2.5 pl-2 transition-all duration-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 disabled:hover:bg-transparent disabled:text-zinc-300 disabled:dark:text-zinc-600 disabled:cursor-default"
				on:click={() => {
					if (currentPage > 1) {
						goToPage(currentPage - 1);
					}
				}}
			>
				<Icon icon="uil:angle-left" class="w-6 h-6 mt-[1px] flex-shrink-0" />
				Previous
			</button>
		{/if}
	</li>
	<ul class="list-style-none hidden md:flex gap-4 items-center">
		{#if parseInt(data.resultsCount) > 0}
			{#each Array.from( { length: Math.ceil(parseInt(data.resultsCount) / parseInt(urlParams?.get('res') || '25')) } )
				.map((_, i) => i)
				.slice(Math.max(currentPage > Math.ceil(parseInt(data.resultsCount) / parseInt(urlParams?.get('res') || '25')) - 5 ? -9 + Math.ceil(parseInt(data.resultsCount) / parseInt(urlParams?.get('res') || '25')) : currentPage - 5, 0), currentPage + (currentPage < 5 ? 5 - currentPage : 0) + 4) as i}
				<li>
					<button
						class="relative block rounded px-3 py-1.5 transition-all duration-300 {i + 1 ===
						currentPage
							? 'dark:bg-orange-500 text-orange-500 dark:text-zinc-100 text-xl'
							: 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}"
						on:click={() => goToPage(i + 1)}
					>
						{i + 1}
					</button>
				</li>
			{/each}
		{/if}
	</ul>
	<p class="mt-3 block md:hidden">
		Page {currentPage} of {Math.ceil(parseInt(data.resultsCount) / parseInt(urlParams?.get('res') || '25'))}
	</p>
	<li>
		{#if parseInt(data.resultsCount) > parseInt(urlParams?.get('res') || '25')}
			<button
				disabled={currentPage >=
					Math.ceil(parseInt(data.resultsCount) / parseInt(urlParams?.get('res') || '25'))}
				class="relative flex items-center rounded-md bg-transparent px-4 pr-2.5 py-2 transition-all duration-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 disabled:hover:bg-transparent disabled:text-zinc-300 disabled:dark:text-zinc-600 disabled:cursor-default"
				on:click={() => {
					if (
						currentPage <
						Math.ceil(parseInt(data.resultsCount) / parseInt(urlParams?.get('res') || '25'))
					) {
						goToPage(currentPage + 1);
					}
				}}
			>
				Next
				<Icon icon="uil:angle-right" class="w-6 h-6 mt-[1px] flex-shrink-0" />
			</button>
		{/if}
	</li>
</ul>
