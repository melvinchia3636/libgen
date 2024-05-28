<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import {
		query,
		downloadType,
		viewResults,
		resultsCount,
		searchWithMask,
		searchField,
		sortBy,
		sortDirection
	} from '$lib/store/search';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const categories = [
		{ id: 1, name: 'Non-fiction / Sci-tech' },
		{ id: 2, name: 'Fiction' },
		{ id: 3, name: 'Scientific articles' },
		{ id: 4, name: 'Magazines' }
	];

	let selectedCategory = categories[0];
	export let isFilterOpen = false;

	function onSubmit(e: Event) {
		e.preventDefault();
		const targetQuery = encodeURIComponent($query.trim());
		if (targetQuery) {
			switch (selectedCategory.id) {
				case 1:
				goto(`/search?req=${targetQuery}&lg_topic=libgen&open=${
							$downloadType.id
						}&view=${$viewResults}&res=${$resultsCount}&column=${$searchField.id}&phrase=${Number(
							$searchWithMask
						)}${$sortBy ? `&sort=${$sortBy.id}&sortmode=${$sortDirection}` : ''}`);
					break;
				case 2:
					window.location = `https://libgen.is/fiction/?q=${targetQuery}`;
					break;
				case 3:
					window.location = `https://libgen.is/scimag/?q=${targetQuery}`;
					break;
				case 4:
					window.location = `https://magzdb.org/makelist?t=${targetQuery}`;
					break;
			}
		}
	}

	onMount(() => {
		document.getElementById('search-input')!.focus();
	});
</script>

<div class="flex flex-col lg:flex-row gap-2 relative z-[9998]">
	<div
		class="flex items-center w-full bg-white dark:bg-zinc-800 p-2 px-4 rounded-md drop-shadow-md gap-4"
	>
		<Icon icon="uil:search" class="text-orange-500 w-5 h-5 flex-shrink-0" />
		<Listbox class="hidden lg:block relative z-10" bind:value={selectedCategory}>
			<ListboxButton class="whitespace-nowrap flex items-center gap-2">
				{selectedCategory.name}
				<Icon icon="uil:angle-down" class="text-zinc-700 dark:text-white w-5 h-5" />
			</ListboxButton>
			<Transition
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<ListboxOptions
					class="absolute bg-white dark:bg-zinc-800 rounded-md top-16 left-0.5 overflow-hidden w-64"
				>
					{#each categories as category (category.id)}
						<div class="px-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-600 cursor-pointer">
							<ListboxOption
								value={category}
								class={({ selected }) =>
									'px-2 py-3 border-b border-zinc-300 dark:border-zinc-600 flex items-center gap-2 justify-between' +
									(selected ? ' font-medium' : ' font-light')}
								let:selected
							>
								{category.name}
								{#if selected}
									<Icon icon="uil:check" class="text-orange-500 w-5 h-5" />
								{/if}
							</ListboxOption>
						</div>
					{/each}
				</ListboxOptions>
			</Transition>
		</Listbox>
		<div class="w-0 h-8 hidden lg:block border-r-[1.5px] border-zinc-300 dark:border-zinc-700" />
		<input
			type="text"
			class="w-full p-2 pl-0 rounded-md bg-transparent placeholder-zinc-400 dark:placeholder-zinc-500 font-light focus:outline-none caret-orange-500"
			placeholder="Search..."
			id="search-input"
			bind:value={$query}
			on:keypress={(e) => {
				if (e.key === 'Enter') onSubmit(e);
			}}
		/>
		<button on:click={() => (isFilterOpen = !isFilterOpen)}>
			<Icon
				icon="material-symbols:filter-list-rounded"
				class="{isFilterOpen
					? 'text-orange-500'
					: 'text-zinc-700 dark:text-white'} transition-all\ w-5 h-5"
			/>
		</button>
	</div>
	<Listbox class="block lg:hidden" bind:value={selectedCategory}>
		<ListboxButton class="whitespace-nowrap flex items-center gap-2 py-3 px-4 rounded-md drop-shadow-md bg-white w-full justify-between">
			<div class="flex gap-4">
				<Icon icon="tabler:category" class="text-orange-500 w-5 h-5 flex-shrink-0" />
			{selectedCategory.name}
			</div>
			<Icon icon="uil:angle-down" class="text-zinc-700 dark:text-white w-5 h-5" />
		</ListboxButton>
		<Transition
			enter="transition-opacity duration-75"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<ListboxOptions
				class="absolute bg-white dark:bg-zinc-800 rounded-md top-16 left-0.5 overflow-hidden w-full lg:w-64"
			>
				{#each categories as category (category.id)}
					<div class="px-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-600 cursor-pointer">
						<ListboxOption
							value={category}
							class={({ selected }) =>
								'px-2 py-3 border-b border-zinc-300 dark:border-zinc-600 flex items-center gap-2 justify-between' +
								(selected ? ' font-medium' : ' font-light')}
							let:selected
						>
							{category.name}
							{#if selected}
								<Icon icon="uil:check" class="text-orange-500 w-5 h-5" />
							{/if}
						</ListboxOption>
					</div>
				{/each}
			</ListboxOptions>
		</Transition>
	</Listbox>
	<button
		on:click={onSubmit}
		class="bg-orange-500 text-[#f6f8fa] py-4 flex items-center justify-center pl-6 pr-5 rounded-md font-medium shadow-md"
	>
		Search <Icon icon="uil:arrow-right" class="w-6 h-6 ml-1" />
	</button>
</div>
