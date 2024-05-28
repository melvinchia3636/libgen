<script lang="ts">
	import Icon from '@iconify/svelte';

	export let data: {
		[key: string]: any;
		hashes: {
			[key: string]: string;
		};
	};
</script>

<svelte:head>
	<title>
		{data.title} - {data['Author(s)']}
	</title>
</svelte:head>
<section class="flex-1 flex flex-col md:flex-row gap-8 md:gap-16 justify-center my-32 px-8 lg:px-12">
	<div class="w-full md:w-2/5 md:sticky top-24 lg:w-1/5 h-full flex flex-col">
		{#if data.image !== '../img/blank.png'}
			<img
				src="http://libgen.is{data.image}"
				class="w-full h-full object-contain max-w-[16rem]"
				referrerpolicy="no-referrer"
				alt=""
			/>
		{:else}
			<Icon
				icon="iconamoon:file-document-light"
				class="w-64 h-full text-zinc-400 dark:text-zinc-600"
			/>
		{/if}
		<h2 class="mt-4 mb-2 w-full text-left font-medium hidden md:block">Hashes</h2>
		<div class="text-xs hidden md:flex flex-col gap-2 w-full">
			{#each Object.entries(data.hashes) as [key, value]}
				<div class="flex flex-col">
					<span class="text-zinc-400 dark:text-zinc-400">{key}</span>
					{#each value.split(' ') as hash}
						<span class="font-['JetBrains_Mono'] break-all">{hash}</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<div class="w-full md:w-3/5 lg:w-4/5 h-full flex flex-col">
		<h1 class="text-3xl font-medium">{data.title}</h1>
		<div class="flex flex-wrap mt-2">
			{#each (data['Author(s)'] || '').split(/,|;/) as author, i}
				<a
					href="/search?req={encodeURIComponent(author.trim())}&column=author"
					class="text-orange-500 hover:text-orange-600"
				>
					{author.trim()}
				</a>
				{#if i < (data['Author(s)']?.split(/,|;/) || '')?.length - 1}
					,&nbsp;
				{/if}
			{/each}
		</div>
		<table class="mt-6">
			<tbody>
				{#each Object.entries(data) as [key, value]}
					{#if value && !['image', 'title', 'Author(s)', 'hashes', 'toc', 'descriptions'].includes(key)}
						<tr
							class="even:bg-zinc-300/40 even:dark:bg-zinc-800/50 border-b border-zinc-300 dark:border-zinc-700"
						>
							<td class="py-4 px-5">{key.split('|')[key.split('|').length - 1]}</td>
							<td class="font-light">
								{#if typeof value === 'string'}
									{value}
								{:else if key.startsWith('islink|')}
									{#if Object.entries(value).length == 1}
										<a
											href={Object.entries(value)[0][1]}
											class="text-orange-500 break-all hover:text-orange-600"
										>
											{Object.entries(value)[0][0]}
										</a>
									{:else}
										<ul class="list-disc list-inside">
											{#each Object.entries(value) as [k, v]}
												<li>
													<a href={v} class="text-orange-500 hover:text-orange-600">
														{k}
													</a>
												</li>
											{/each}
										</ul>
									{/if}
								{:else if Array.isArray(value)}
									<ul class="py-2 list-disc list-inside">
										{#each value as v}
											<li class="py-2">
												{#if Array.isArray(v)}
													<a
														href={v[1]}
														class="text-orange-500 break-all hover:text-orange-600"
														target="_blank"
														rel="noopener noreferrer"
													>
														{v[0]}
													</a>
												{:else}
													{v}
												{/if}
											</li>
										{/each}
									</ul>
								{:else}
									<div class="py-4 pr-4">
										<table class="border-2 border-zinc-300 dark:border-zinc-700 w-full">
											<tbody>
												{#each Object.entries(value) as [k, v]}
													<tr class="border-b-2 border-zinc-300 dark:border-zinc-700">
														<td class="py-2 px-3 break-all border-r-2 border-zinc-300 dark:border-zinc-700">{k}</td>
														<td class="px-3 break-all">{v || '-'}</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
		{#each Object.entries( { descriptions: 'Descriptions', toc: 'Table of Contents' } ) as [key, value]}
			{#if data[key]}
				<h2 class="mt-8 mb-3 font-medium text-2xl">{value}</h2>
				<div class="font-light">
					{@html data[key]}
				</div>
			{/if}
		{/each}
	</div>
</section>
