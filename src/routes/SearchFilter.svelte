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

	export let isFilterOpen = false;

	const downloadTypes = [
		{ id: 1, name: 'Resumed dl with original filename' },
		{ id: 2, name: 'Resumed dl with transit filename' },
		{ id: 3, name: 'Resumed dl with md5 filename' },
		{ id: 4, name: 'Open file in browser' }
	];

	const searchFields = [
		{ id: 1, name: 'Default' },
		{ id: 2, name: 'Title' },
		{ id: 3, name: 'Author(s)' },
		{ id: 4, name: 'Series' },
		{ id: 5, name: 'Publisher' },
		{ id: 6, name: 'Year' },
		{ id: 7, name: 'ISBN' },
		{ id: 8, name: 'Language' },
		{ id: 9, name: 'MD5' },
		{ id: 10, name: 'Tags' },
		{ id: 11, name: 'Extension' }
	];

	let selectedDownloadType = downloadTypes[0];
	let resPerPage = 25;
	let searchWithMask = false;
	let selectedSearchField = searchFields[0];
</script>

<div
	class="bg-[#f6f8fa] w-3/5 rounded-md px-4 mt-4 shadow-md overflow-hidden transition-all duration-500 {isFilterOpen
		? 'max-h-[30rem] py-2'
		: 'max-h-0 py-0'}"
>
	<ul class="flex flex-col divide-y divide-slate-200">
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Download type</h2>
				<p class="text-slate-400 text-sm font-light">
					Select the type of download you want to perform.
				</p>
			</div>
			<Listbox
				value={selectedDownloadType}
				on:change={(e) => (selectedDownloadType = e.detail)}
				class="relative"
			>
				<ListboxButton
					class="whitespace-nowrap flex items-center gap-2 w-80 justify-between border-[1.5px] p-2 pl-3 border-slate-200 rounded-md"
				>
					{selectedDownloadType.name}
					<Icon icon="uil:angle-down" class="text-slate-700 w-5 h-5" />
				</ListboxButton>
				<Transition
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					class="absolute top-8 right-0 z-[9999]"
				>
					<ListboxOptions class="bg-[#f6f8fa] rounded-md shadow-md overflow-hidden w-80">
						{#each downloadTypes as category, idx (category.id)}
							<div class="px-2 hover:bg-slate-200/50 cursor-pointer">
								<ListboxOption
									value={category}
									class={({ selected }) =>
										'px-2 py-3 border-slate-200 flex items-center gap-2 justify-between' +
										(selected ? ' font-medium' : ' font-light') +
										(idx === downloadTypes.length - 1 ? ' border-b-0' : ' border-b')}
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
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>View results</h2>
				<p class="text-slate-400 text-sm font-light">
					Select whether to show results in more detail or not.
				</p>
			</div>
			<div class="w-80 flex items-center gap-12">
				<div class="block min-h-[1.5rem] pl-[1.5rem]">
					<input
						class="relative float-left mt-[0.2rem] mr-1 -ml-[1.5rem] h-[1.2rem] w-[1.2rem] appearance-none rounded-full border-2 border-solid border-slate-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-slate-600 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500 dark:checked:focus:border-orange-500"
						type="radio"
						name="flexRadioDefault"
						id="radioDefault01"
						checked
					/>
					<label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault01">
						Simple
					</label>
				</div>
				<div class="block min-h-[1.5rem] pl-[1.5rem]">
					<input
						class="relative float-left mt-[0.2rem] mr-1 -ml-[1.5rem] h-[1.2rem] w-[1.2rem] appearance-none rounded-full border-2 border-solid border-slate-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-slate-600 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500 dark:checked:focus:border-orange-500"
						type="radio"
						name="flexRadioDefault"
						id="radioDefault02"
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
				<p class="text-slate-400 text-sm font-light">
					Select how many results to show on each page.
				</p>
			</div>
			<div class="flex items-center justify-start w-80 gap-10">
				{#each [25, 50, 100] as number}
					<button
						class={resPerPage === number ? 'font-semibold text-orange-500' : ''}
						on:click={() => (resPerPage = number)}
					>
						{number}
					</button>
				{/each}
			</div>
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Search with mask (word*)</h2>
				<p class="text-slate-400 text-sm font-light">
					Select whether to perform wildcard searches or not.
				</p>
			</div>
			<div class="w-80">
				<Switch
					checked={searchWithMask}
					on:change={(e) => (searchWithMask = e.detail)}
					class={searchWithMask ? 'switch switch-enabled' : 'switch switch-disabled'}
				>
					<span
						class="toggle"
						class:toggle-on={searchWithMask}
						class:toggle-off={!searchWithMask}
					/>
				</Switch>
			</div>
		</li>
		<li class="flex items-center justify-between p-2 py-4">
			<div>
				<h2>Search field</h2>
				<p class="text-slate-400 text-sm font-light">Select which fields to search in.</p>
			</div>
			<Listbox
				value={selectedSearchField}
				on:change={(e) => (selectedSearchField = e.detail)}
				class="relative"
			>
				<ListboxButton
					class="whitespace-nowrap flex items-center gap-2 w-80 justify-between border-[1.5px] p-2 pl-3 border-slate-200 rounded-md"
				>
					{selectedSearchField.name}
					<Icon icon="uil:angle-down" class="text-slate-700 w-5 h-5" />
				</ListboxButton>
				<Transition
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					class="absolute bottom-8 right-0 z-[9999]"
				>
					<ListboxOptions
						class="bg-[#f6f8fa] rounded-md shadow-md w-80 h-72 overflow-scroll border border-slate-200"
					>
						{#each searchFields as searchField, idx (searchField.id)}
							<div class="px-2 hover:bg-slate-200/50 cursor-pointer">
								<ListboxOption
									value={searchField}
									class={({ selected }) =>
										'px-2 py-3 border-slate-200 flex items-center gap-2 justify-between' +
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
