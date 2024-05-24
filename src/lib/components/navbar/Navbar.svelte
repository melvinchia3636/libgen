<script lang="ts">
	import { page } from '$app/stores';
	import topics from '$lib/data/topics.json';
	import DropDownButton from '$lib/components/navbar/DropDownButton.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';

	const updateNavbar = () => {
		const arrow = document.querySelector('.arrow')! as HTMLElement;
		const middle = document.querySelector('.middle')! as HTMLElement;
		const currentPage =
			(document.querySelector(`nav > div > ul > li[aria-current="page"]`) as HTMLElement) || middle;
		arrow.style.left = `${currentPage.offsetLeft + currentPage.offsetWidth / 2 - 6}px`;

		Array.from(
			document.querySelectorAll('nav > div > ul > li') as any as HTMLCollectionOf<HTMLElement>
		).forEach((li) => {
			if (li.querySelector('a')) {
				li.querySelector('a').style.fontWeight = '300';
			}
		});

		if (currentPage.querySelector('a')) currentPage.querySelector('a')!.style.fontWeight = '500';

		Array.from(
			document.querySelectorAll('nav > div > ul > li') as any as HTMLCollectionOf<HTMLElement>
		).forEach((li) => {
			li.addEventListener('mouseenter', (e) => {
				arrow.style.left = `${li.offsetLeft + li.offsetWidth / 2 - 6}px`;
				if (currentPage.querySelector('a'))
					currentPage.querySelector('a')!.style.fontWeight = '300';
				li.querySelector('a')!.style.fontWeight = '500';
			});

			li.addEventListener('mouseleave', (e) => {
				li.querySelector('a')!.style.fontWeight = '300';
			});
		});

		document.querySelector('header > nav > div > ul')!.addEventListener('mouseleave', (e) => {
			arrow.style.left = `${currentPage.offsetLeft + currentPage.offsetWidth / 2 - 6}px`;
			if (currentPage.querySelector('a')) currentPage.querySelector('a')!.style.fontWeight = '500';
		});
	};

	let navWidth = 56;

	onMount(() => {
		updateNavbar();

		navigating.subscribe(() => {
			updateNavbar();
		});

		document.onscroll = (e) => {
			if (window.scrollY <= 50) {
				navWidth = 56;
			} else {
				navWidth = Math.min(100, 56 + (window.scrollY - 50) / 2);
			}
		};
	});
</script>

<nav class="drop-shadow-md absolute top-0 left-1/2 -translate-x-1/2 h-full">
	<svg viewBox="0 0 2 3" aria-hidden="true" class="translate-x-[1px] flex-shrink-0 w-full">
		<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="fill-white dark:fill-zinc-700" />
	</svg>
	<div
		class="bg-white dark:bg-zinc-700 relative flex justify-center transition-all"
		style="width: {navWidth}vw"
	>
		<ul
			class="flex relative items-center h-full gap-12 px-6 bg-white dark:bg-zinc-700 uppercase font-light tracking-widest text-sm"
		>
			<li
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="relative h-full flex items-center justify-center"
			>
				<a href="/">Home</a>
			</li>
			<li
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="relative h-full flex items-center justify-center"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="rounded-sm flex items-center [all:inherit] !gap-2">
					topics
					<Icon icon="mdi:chevron-down" class="w-4 h-4" />
				</a>
				<ul
					id="menu"
					class="bg-white dark:bg-zinc-700 p-4 grid grid-cols-2 xl:grid-cols-3 rounded-md transform scale-0 group-hover:scale-100 absolute top-12 !-left-[400%] xl:!-left-[500%] transition duration-150 ease-in-out origin-top min-w-32 w-max"
				>
					{#each Object.keys(topics) as topic}
						<li class="rounded-md relative group">
							<a
								href="/search?req=topicid{topic.split('|')[0]}&column=topic"
								aria-haspopup="true"
								aria-controls="menu-lang"
								class="w-full focus:outline-none px-6 py-4 hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-md flex uppercase tracking-widest justify-between items-center gap-2 group-hover:font-medium"
							>
								{topic.split('|')[1]}
								<Icon icon="mdi:chevron-right" class="w-4 h-4" />
							</a>
							<ul
								class="subcategory max-h-96 overflow-scroll p-4 shadow-md z-[9999] bg-white dark:bg-zinc-700 rounded-md absolute top-0 right-2 origin-top-left"
							>
								{#each Object.entries(topics[topic]) as [id, subtopic]}
									<a href="/search?req=topicid{id}&column=topic">
										<li
											class="rounded-md relative px-6 py-4 hover:bg-gray-100 dark:hover:bg-zinc-600 hover:font-medium"
										>
											{subtopic}
										</li>
									</a>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</li>
			<li
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="relative h-full flex items-center justify-center"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="rounded-sm flex items-center [all:inherit] !gap-2">
					download
					<Icon icon="mdi:chevron-down" class="w-4 h-4" />
				</a>
				<ul
					id="menu"
					class="bg-white dark:bg-zinc-700 overflow-hidden flex gap-4 rounded-md p-6 transform scale-0 group-hover:scale-100 absolute top-12 transition duration-150 ease-in-out origin-top min-w-32 w-max"
				>
					<div class="flex flex-col">
						<header class="flex flex-col">
							<h3 class="text-base font-medium pb-3 px-4">Mirrors</h3>
							<div class="w-full border-b border-slate-200" />
						</header>
						<DropDownButton inner={true} href="http://libgen.is/">Libgen.is</DropDownButton>
						<DropDownButton inner={true} href="http://libgen.rs/">Libgen.rs</DropDownButton>
						<DropDownButton inner={true} href="http://libgen.gs/">Libgen.gs</DropDownButton>
						<DropDownButton
							inner={true}
							href="http://libgenfrialc7tguyjywa36vtrdcplwpxaw43h6o63dmmwhvavo5rqqd.onion/"
						>
							Tor mirror (files only)
						</DropDownButton>
					</div>
					<div class="flex flex-col">
						<header class="flex flex-col">
							<h3 class="text-base font-medium pb-3 px-4">Public datasets</h3>
							<div class="w-full border-b border-slate-200" />
						</header>
						<DropDownButton inner={true} href="https://data.library.bz/dbdumps/">
							Database dumps (library's catalogue)
						</DropDownButton>
						<DropDownButton inner={true} href="http://libgen.rs/repository_torrent/">
							Torrents (library's content)
						</DropDownButton>
						<DropDownButton inner={true} href="https://phillm.net/libgen-stats-table.php">
							Torrent health tracker
						</DropDownButton>
					</div>
				</ul>
			</li>
			<li
				aria-current={['last', 'modified'].includes($page.url.searchParams.get('mode') || '')
					? 'page'
					: undefined}
				class="relative h-full flex items-center justify-center"
			>
				<a href="/search?mode=last" class="rounded-sm flex items-center [all:inherit] !gap-2">
					latest
					<Icon icon="mdi:chevron-down" class="w-4 h-4" />
				</a>
				<ul
					id="menu"
					class="bg-white dark:bg-zinc-700 overflow-hidden rounded-md transform scale-0 group-hover:scale-100 absolute top-12 transition duration-150 ease-in-out origin-top min-w-32 w-max"
				>
					<DropDownButton noNewWindow href="/search?mode=last">last added</DropDownButton>
					<DropDownButton noNewWindow href="/search?mode=modified">last modified</DropDownButton>
					<DropDownButton href="http://libgen.is/rss/index.php">RSS Feed</DropDownButton>
					<DropDownButton href="https://libgen.gs/json.php">API</DropDownButton>
				</ul>
			</li>
			<li
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				class="relative h-full flex items-center justify-center"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="rounded-sm flex items-center [all:inherit] !gap-2">
					Others
					<Icon icon="mdi:chevron-down" class="w-4 h-4" />
				</a>
				<ul
					id="menu"
					class="bg-white dark:bg-zinc-700 overflow-hidden rounded-md transform scale-0 group-hover:scale-100 absolute top-12 transition duration-150 ease-in-out origin-top min-w-32 w-max"
				>
					<DropDownButton href="https://libgen.is/fiction/?">Fictions</DropDownButton>
					<DropDownButton href="http://libgen.is/scimag/">Scientific articles</DropDownButton>
					<DropDownButton href="http://magzdb.org/">Magazines</DropDownButton>
					<DropDownButton noNewWindow={true} href="/letter-of-solidarity">
						Letter of Solidarity
					</DropDownButton>
					<DropDownButton href="https://forum.mhut.org/viewtopic.php?p=9000">Sitemap</DropDownButton
						>
						<DropDownButton href="https://forum.mhut.org/viewtopic.php?t=6423">
							Report an error
						</DropDownButton>
				</ul>
			</li>
			<li class="middle absolute left-1/2 -translate-x-1/2" />
			<span class="arrow" />
		</ul>
	</div>
	<svg viewBox="0 0 2 3" aria-hidden="true" class="-translate-x-[1px] flex-shrink-0">
		<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="fill-white dark:fill-zinc-700" />
	</svg>
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		--background: #f6f8fa;
	}

	svg {
		width: 40px;
		height: 60px;
		display: block;
	}

	.arrow {
		--size: 6px;
		--orange-500: #f97316;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--orange-500);
		transition: left 0.2s ease;
	}

	li > ul {
		transform: translatex(0%) scale(0);
	}
	li:hover > ul {
		transform: translatex(1%) scale(1);
	}

	li:hover > ul.subcategory {
		transform: translatex(100%) scale(0);
	}

	li:hover > ul.subcategory {
		transform: translatex(101%) scale(1);
	}
</style>
