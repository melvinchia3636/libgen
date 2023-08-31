<script lang="ts">
	import { resultsCount } from '$lib/store/search';

	export let resPerPage: number;
</script>

<li class="flex items-center justify-between p-2 py-4">
	<div>
		<h2>Results per page</h2>
		<p class="text-slate-400 dark:text-zinc-500 text-sm font-light">
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
