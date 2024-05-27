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
		searchField,
		sortBy,
		sortDirection
	} from '$lib/store/search';
	import { downloadTypes, searchFields } from '$lib/store/constants';
	import type { IDownloadType, ISearchField } from '$lib/store/types';
	import SortDirection from './fields/SortDirection.svelte';
	import SortBy from './fields/SortBy.svelte';
	import SearchField from './fields/SearchField.svelte';
	import SearchWithMask from './fields/SearchWithMask.svelte';
	import ResultsPerPage from './fields/ResultsPerPage.svelte';
	import ViewResults from './fields/ViewResults.svelte';
	import DownloadType from './fields/DownloadType.svelte';

	export let isFilterOpen = false;

	let selectedDownloadType: IDownloadType;
	let selectedViewResults: string;
	let resPerPage: number;
	let srchWithMask: boolean;
	let selectedSearchField: ISearchField;
	let sort: ISearchField | null;
	let sortMode: 'ASC' | 'DESC';

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

	sortBy.subscribe((value) => {
		sort = value;
	});

	sortDirection.subscribe((value) => {
		sortMode = value;
	});
</script>

<div
	class="bg-white dark:bg-zinc-800 w-full rounded-md px-4 mt-4 shadow-md overflow-hidden transition-all duration-700 {isFilterOpen
		? 'max-h-[80rem] py-2'
		: 'max-h-0 py-0'}"
>
	<ul class="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-700">
		<DownloadType {selectedDownloadType} />
		<ViewResults />
		<ResultsPerPage {resPerPage} />
		<SearchWithMask {srchWithMask} />
		<SearchField {selectedSearchField} />
		<SortBy {sort} />
		<SortDirection />
	</ul>
</div>
