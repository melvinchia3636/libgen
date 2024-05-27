<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let urlParams: URLSearchParams | undefined;

	onMount(() => {
		urlParams = new URLSearchParams(window.location.search);
	});

	export let sort: string;
	export let name: string;
</script>

<th class="py4 px-2 text-center">
	<button
		on:click={() => {
			if (urlParams?.get('sort') !== sort || urlParams?.get('sortmode') === 'DESC') {
				urlParams?.set('sort', sort);
				urlParams?.set('sortmode', urlParams.get('sortmode') === 'DESC' ? 'ASC' : 'DESC');
			} else {
				urlParams?.delete('sort');
				urlParams?.delete('sortmode');
			}

			const newURL = `/search?${urlParams?.toString()}`;
			goto(newURL);
		}}
		class="flex items-center gap-2"
	>
		{name}
		<Icon
			icon={urlParams?.get('sort') === sort
				? urlParams.get('sortmode') === 'DESC'
					? 'fluent:text-sort-descending-16-filled'
					: 'fluent:text-sort-ascending-16-filled'
				: 'icon-park-outline:sort-two'}
			class="{urlParams?.get('sort') === sort ? 'text-orange-500 dark:text-zinc-100' : 'text-zinc-500'} stroke-bold"
		/>
	</button>
</th>
