<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { downloadTypes } from '$lib/store/constants';
	import { downloadType } from '$lib/store/search';
	import type { IDownloadType } from '$lib/store/types';

	export let selectedDownloadType: IDownloadType;
</script>

<li class="flex items-center justify-between p-2 py-4">
	<div>
		<h2>Download type</h2>
		<p class="text-slate-400 dark:text-zinc-500 text-sm font-light">
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
			<ListboxOptions class="bg-white dark:bg-zinc-600 rounded-md shadow-md overflow-hidden w-80">
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
