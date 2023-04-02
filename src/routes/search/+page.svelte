<script>
	export let data;
</script>

<svelte:head>
	<title>Library Genesis</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex-1 flex flex-col items-center justify-center my-32">
	<h1 class="text-4xl text-left w-4/5">Search results for: Minecraft</h1>
	<p class="text-left w-4/5 mb-8 mt-2">{data.resultsCount}</p>
	<table class="w-4/5">
		<thead class="border-b border-slate-300">
			<tr>
				<th class="p-4 text-left">Title</th>
				<th class="p-4 text-left">Author</th>
				<th class="p-4 text-left">Year</th>
				<th class="p-4 text-left">Pages</th>
				<th class="p-4 text-left">Language</th>
				<th class="p-4 text-left">Size</th>
				<th class="p-4 text-left">Extension</th>
			</tr>
		</thead>
		<tbody>
			{#each data.data as book}
				<tr class="border-b border-slate-300 odd:bg-slate-300/30">
					<td class="p-4">{book.title}</td>
					<td class="p-4 font-light">{book.author}</td>
					<td class="p-4 font-light">{book.year}</td>
					<td class="p-4 font-light">{book.pages}</td>
					<td class="p-4 font-light">{book.language}</td>
					<td class="whitespace-nowrap p-4 font-light">{book.size}</td>
					<td class="p-4 font-light">{book.extension}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
