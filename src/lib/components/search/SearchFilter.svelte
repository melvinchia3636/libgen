<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Transition,
		Switch
	} from '@rgossiaux/svelte-headlessui';
	import Icon from '@iconify/svelte';
	import {
		downloadType,
		viewResults,
		resultsCount,
		searchWithMask,
		searchField
	} from '$lib/store/search';
	import { downloadTypes, searchFields } from '$lib/store/constants';
	import type { IDownloadType, ISearchField } from '$lib/store/types';

	export let isFilterOpen = false;

	let selectedDownloadType: IDownloadType;
	let selectedViewResults: string;
	let resPerPage: number;
	let srchWithMask: boolean;
	let selectedSearchField: ISearchField;

	downloadType.subscribe((value) => {
		selectedDownloadType = value;
	});

	viewResults.subscribe((value) => {
		selectedViewResults = value;
	});

	resultsCount.subscribe((value) => {
		resPerPage = value;
	});

	searchWithMask.subscribe((value) => {
		srchWithMask = value;
	});

	searchField.subscribe((value) => {
		selectedSearchField = value;
	});
</script>

<div
	class="bg-zinc-700 w-full rounded-md px-4 mt-4 shadow-md overflow-hidden transition-all duration-500 {isFilterOpen
		? 'max-h-[30rem] py-2'
		: 'max-h-0 py-0'}"
>
	<ul class="flex flex-col divide-y divide-slate-200 dark:divide-zinc-600">
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Download type</h2>
				<p class="text-slate-400 dark:text-zinc-500 dark:text-zinc-500text-sm font-light">
					Select the type of download you want to perform.
				</p>
			</div>
			<Listbox
				value={selectedDownloadType}
				on:change={(e) => downloadType.set(e.detail)}
				class="relative"
			>
				<ListboxButton
					class="whitespace-nowrap flex items-center gap-2 w-80 justify-between border-[1.5px] p-2 pl-3 border-slate-200 dark:border-zinc-500 rounded-md"
				>
					{selectedDownloadType.name}
					<Icon icon="uil:angle-down" class="text-slate-700 dark:text-zinc-500 w-5 h-5" />
				</ListboxButton>
				<Transition
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					class="absolute top-12 right-0 z-[9999]"
				>
					<ListboxOptions
						class="bg-white dark:bg-zinc-600 rounded-md shadow-md overflow-hidden w-80"
					>
						{#each downloadTypes as downloadType, idx (downloadType.id)}
							<div class="px-2 hover:bg-slate-200/50 dark:hover:bg-zinc-500 cursor-pointer">
								<ListboxOption
									value={downloadType}
									class={({ selected }) =>
										'px-2 py-3 border-slate-200 dark:border-zinc-500 flex items-center gap-2 justify-between' +
										(selected ? ' font-medium' : ' font-light') +
										(idx === downloadTypes.length - 1 ? ' border-b-0' : ' border-b')}
									let:selected
								>
									{downloadType.name}
									{#if selected}
										<Icon icon="uil:check" class="text-orange-500 w-5 h-5" />
									{/if}
								</ListboxOption>
							</div>
						{/each}
					</ListboxOptions>
				</Transition>
			</Listbox>
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>View results</h2>
				<p class="text-slate-400 dark:text-zinc-500 dark:text-zinc-500text-sm font-light">
					Select whether to show results in more detail or not.
				</p>
			</div>
			<div class="w-80 flex items-center gap-12">
				<div class="block min-h-[1.5rem] pl-[1.5rem]">
					<input
						class="relative float-left mt-[0.2rem] mr-1 -ml-[1.5rem] h-[1.2rem] w-[1.2rem] appearance-none rounded-full border-2 border-solid border-slate-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-zinc-500 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500 dark:checked:focus:border-orange-500"
						type="radio"
						name="flexRadioDefault"
						id="radioDefault01"
						checked
						on:click={() => viewResults.set('simple')}
					/>
					<label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault01">
						Simple
					</label>
				</div>
				<div class="block min-h-[1.5rem] pl-[1.5rem]">
					<input
						class="relative float-left mt-[0.2rem] mr-1 -ml-[1.5rem] h-[1.2rem] w-[1.2rem] appearance-none rounded-full border-2 border-solid border-slate-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-zinc-500 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500 dark:checked:focus:border-orange-500"
						type="radio"
						name="flexRadioDefault"
						id="radioDefault02"
						on:click={() => viewResults.set('detailed')}
					/>
					<label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault02">
						Detailed
					</label>
				</div>
			</div>
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Results per page</h2>
				<p class="text-slate-400 dark:text-zinc-500 dark:text-zinc-500text-sm font-light">
					Select how many results to show on each page.
				</p>
			</div>
			<div class="flex items-center justify-start w-80 gap-10">
				{#each [25, 50, 100] as number}
					<button
						class={resPerPage === number ? 'font-semibold text-orange-500' : 'dark:text-zinc-500'}
						on:click={() => resultsCount.set(number)}
					>
						{number}
					</button>
				{/each}
			</div>
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Search with mask (word*)</h2>
				<p class="text-slate-400 dark:text-zinc-500 dark:text-zinc-500text-sm font-light">
					Select whether to perform wildcard searches or not.
				</p>
			</div>
			<div class="w-80">
				<Switch
					checked={srchWithMask}
					on:change={(e) => searchWithMask.set(e.detail)}
					class={srchWithMask ? 'switch switch-enabled' : 'switch switch-disabled'}
				>
					<span class="toggle" class:toggle-on={srchWithMask} class:toggle-off={!srchWithMask} />
				</Switch>
			</div>
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Search field</h2>
				<p class="text-slate-400 dark:text-zinc-500 dark:text-zinc-500text-sm font-light">
					Select which fields to search in.
				</p>
			</div>
			<Listbox
				value={selectedSearchField}
				on:change={(e) => searchField.set(e.detail)}
				class="relative"
			>
				<ListboxButton
					class="whitespace-nowrap flex items-center gap-2 w-80 justify-between border-[1.5px] p-2 pl-3 border-slate-200 dark:border-zinc-500 rounded-md"
				>
					{selectedSearchField.name}
					<Icon icon="uil:angle-down" class="text-slate-700 dark:text-zinc-500 w-5 h-5" />
				</ListboxButton>
				<Transition
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					class="absolute bottom-12 right-0 z-[9999]"
				>
					<ListboxOptions
						class="bg-white dark:bg-zinc-600 rounded-md shadow-md w-80 h-72 overflow-scroll"
					>
						{#each searchFields as searchField, idx (searchField.id)}
							<div class="px-2 hover:bg-slate-200/50 dark:hover:bg-zinc-500 cursor-pointer">
								<ListboxOption
									value={searchField}
									class={({ selected }) =>
										'px-2 py-3 border-slate-200 dark:border-zinc-500 flex items-center gap-2 justify-between' +
										(selected ? ' font-medium' : ' font-light') +
										(idx === searchFields.length - 1 ? ' border-b-0' : ' border-b')}
									let:selected
								>
									{searchField.name}
									{#if selected}
										<Icon icon="uil:check" class="text-orange-500 w-5 h-5" />
									{/if}
								</ListboxOption>
							</div>
						{/each}
					</ListboxOptions>
				</Transition>
			</Listbox>
		</li>
	</ul>
</div>

<style>
	:global(.switch) {
		position: relative;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		height: 1.5rem;
		width: 2.75rem;
		transition: all 0.2s ease;
		@apply shadow-sm;
	}

	:global(.switch-enabled) {
		background-color: rgb(249 115 22) !important;
	}

	:global(.switch-disabled) {
		background-color: rgb(226 232 240) !important;
	}

	:global(.dark .switch-disabled) {
		background-color: rgb(82 82 91) !important;
	}

	.toggle {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background-color: #f6f8fa;
		border-radius: 9999px;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: transform;
	}

	.toggle-on {
		transform: translateX(1.5rem);
	}

	.toggle-off {
		transform: translateX(0.25rem);
	}
</style>
