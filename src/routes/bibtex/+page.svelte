<script lang="ts">
	//@ts-ignore
	import bibTeXParse from '@orcid/bibtex-parse-js';

	export let data;
	const parsed = bibTeXParse.toJSON(data.data)[0].entryTags;
</script>

<section class="flex-1 flex flex-col gap-8 items-center my-32 px-12">
	<h1 class="w-4/5 text-left text-3xl font-light">
		BibTeX Reference for <span class="font-medium">{parsed.title}</span>
	</h1>
	<code
		class="w-4/5 h-full flex flex-col items-center p-8 border-2 border-zinc-700 dark:border-white"
	>
		<pre class="text-base flex flex-col gap-2 w-full font-['JetBrains_Mono']">{data.data}</pre>
	</code>
</section>
