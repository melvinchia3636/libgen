<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { sortFields } from '$lib/store/constants';
	import { sortBy } from '$lib/store/search';
	import type { ISortField } from '$lib/store/types';

	export let sort: ISortField | null;
</script>

<li class="flex flex-col lg:flex-row items-center justify-between p-2 py-4 gap-6 lg:gap-12">
	<div class="w-full">
		<h2>Sort By</h2>
		<p class="text-zinc-400 dark:text-zinc-500 text-sm font-light">
			Select which fields to sort by.
		</p>
	</div>
	<Listbox bind:value={sort} class="relative">
		<ListboxButton
			class="whitespace-nowrap flex items-center gap-2 w-80 justify-between border-[1.5px] p-2 pl-3 border-zinc-200 dark:border-zinc-700 rounded-md"
		>
			{sort?.name ?? 'None'}
			<Icon icon="uil:angle-down" class="text-zinc-700 dark:text-zinc-500 w-5 h-5" />
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
				class="bg-white dark:bg-zinc-700 rounded-md shadow-md w-80 h-72 overflow-scroll"
			>
				<div class="px-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-500 cursor-pointer">
					<ListboxOption
						value={null}
						class={({ selected }) =>
							'px-2 py-3 border-zinc-200 dark:border-zinc-700 flex items-center gap-2 justify-between' +
							(selected ? ' font-medium' : ' font-light') +
							' border-b'}
						let:selected
					>
						None
						{#if selected}
							<Icon icon="uil:check" class="text-orange-500 w-5 h-5" />
						{/if}
					</ListboxOption>
				</div>
				{#each sortFields as sortField, idx (sortField.id)}
					<div class="px-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-500 cursor-pointer">
						<ListboxOption
							value={sortField}
							class={({ selected }) =>
								'px-2 py-3 border-zinc-200 dark:border-zinc-700 flex items-center gap-2 justify-between' +
								(selected ? ' font-medium' : ' font-light') +
								(idx === sortFields.length - 1 ? ' border-b-0' : ' border-b')}
							let:selected
						>
							{sortField.name}
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
