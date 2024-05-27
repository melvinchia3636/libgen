<script>
	import SearchBox from '$lib/components/search/SearchBox.svelte';
	import SearchFilter from '$lib/components/search/SearchFilter.svelte';

	let isFilterOpen = false;
</script>

<svelte:head>
	<title>Library Genesis</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 md:px-32">
	<h1
		class="text-4xl md:text-5xl uppercase tracking-widest mb-4 {isFilterOpen &&
			'mt-32'} text-center"
	>
		Library <span class='text-orange-500'>Genesis</span>
	</h1>
	<p class="mb-8 font-light text-zinc-500 tracking-wide text-center text-base sm:text-lg">
		Enables free access to content that is otherwise paywalled or not digitized elsewhere
	</p>
	<div class="w-full px-0 xl:px-32">
		<SearchBox bind:isFilterOpen />
		<SearchFilter bind:isFilterOpen />
	</div>
</section>

<style>
</style>
