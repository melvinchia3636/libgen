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
		searchField
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
		if ($query) {
			goto(
				`/search?req=${$query}&lg_topic=libgen&open=${
					$downloadType.id
				}&view=${$viewResults}&res=${$resultsCount}&column=${$searchField.id}&phrase=${Number(
					$searchWithMask
				)}`
			);
		}
	}

	onMount(() => {
		document.getElementById('search-input')!.focus();
	});
</script>

<div class="flex gap-2">
	<div class="flex items-center w-full bg-[#f6f8fa] p-2 px-4 rounded-md drop-shadow-md gap-4">
		<Icon icon="uil:search" class="text-orange-500 w-5 h-5 flex-shrink-0" />
		<Listbox value={selectedCategory} on:change={(e) => (selectedCategory = e.detail)}>
			<ListboxButton class="whitespace-nowrap flex items-center gap-2">
				{selectedCategory.name}
				<Icon icon="uil:angle-down" class="text-slate-700 w-5 h-5" />
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
					class="absolute bg-[#f6f8fa] rounded-md top-16 left-0.5 overflow-hidden w-64"
				>
					{#each categories as category (category.id)}
						<div class="px-2 hover:bg-slate-200/50 cursor-pointer">
							<ListboxOption
								value={category}
								class={({ selected }) =>
									'px-2 py-3 border-b border-slate-300 flex items-center gap-2 justify-between' +
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
		<div class="w-0 h-8 border-r-[1.5px] border-slate-300" />
		<input
			type="text"
			class="w-full p-2 pl-0 rounded-md bg-transparent placeholder-slate-400 font-light focus:outline-none caret-orange-500"
			placeholder="Search..."
			id="search-input"
			bind:value={$query}
		/>
		<button on:click={() => (isFilterOpen = !isFilterOpen)}>
			<Icon
				icon="material-symbols:filter-list-rounded"
				class="{isFilterOpen ? 'text-orange-500' : 'text-slate-700'} transition-all\ w-5 h-5"
			/>
		</button>
	</div>
	<button on:click={onSubmit} class="bg-orange-500 text-[#f6f8fa] px-6 rounded-md shadow-md">
		Search
	</button>
</div>
