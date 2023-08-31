<script>
	import SearchBox from '$lib/components/search/SearchBox.svelte';
	import SearchFilter from '$lib/components/search/SearchFilter.svelte';

	let isFilterOpen = false;
</script>

<svelte:head>
	<title>Library Genesis</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex-1 flex flex-col items-center justify-center">
	<h1
		class="text-[2.5rem] uppercase font-light tracking-widest pb-2 {isFilterOpen &&
			'mt-32'} transition-all"
	>
		Library Genesis
	</h1>
	<p class="mb-8 font-light tracking-wide">
		Enables free access to content that is otherwise paywalled or not digitized elsewhere
	</p>
	<div class="w-3/5">
		<SearchBox bind:isFilterOpen />
		<SearchFilter bind:isFilterOpen />
	</div>
</section>

<style>
</style>
