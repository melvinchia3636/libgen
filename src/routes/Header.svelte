<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	onMount(() => {
		const arrow = document.querySelector(".arrow")! as HTMLElement;
		const currentPage = document.querySelector(`header > nav > ul > li[aria-current="page"]`)! as HTMLElement;
		arrow.style.left = `${currentPage.offsetLeft + currentPage.offsetWidth / 2 - 6}px`;

		Array.from(document.querySelectorAll("header > nav > ul > li") as any as HTMLCollectionOf<HTMLElement>)
			.forEach((li) => {
			li.addEventListener("mouseenter", (e) => {
				arrow.style.left = `${li.offsetLeft + li.offsetWidth / 2 - 6}px`;
			});
		});

		document.querySelector("header > nav > ul")!.addEventListener("mouseleave", (e) => {
			arrow.style.left = `${currentPage.offsetLeft + currentPage.offsetWidth / 2 - 6}px`;
		});
	})
</script>

<header>
	<a href="https://kit.svelte.dev" class="flex items-center gap-2 p-4 text-lg font-light">
		<Icon icon="mdi:book-open-page-variant-outline" class="w-7 h-7 text-orange-500 flex-shrink-0" />
		Libgen.is
	</a>

	<nav class="drop-shadow-md absolute top-0 left-1/2 -translate-x-1/2">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul class="flex items-center gap-12 px-6 bg-[#f6f8fa] uppercase font-light tracking-widest text-sm">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class='relative h-full flex items-center justify-center font-medium'>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class='relative h-full flex items-center justify-center'>
				<a href="/">Topics</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined} class='relative h-full flex items-center justify-center'>
				<a href="/about">Forum</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined} class='relative h-full flex items-center justify-center'>
				<a href="/sverdle">Download</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined} class='relative h-full flex items-center justify-center'>
				<a href="/sverdle">Latest</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined} class='relative h-full flex items-center justify-center'>
				<a href="/sverdle">Others</a>
			</li>
			<span class="arrow"></span>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<a href="https://github.com/sveltejs/kit">
		<Icon icon="mdi:github" class="w-7 h-7 text-slate-700 flex-shrink-0 m-4" />
	</a>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: #f6f8fa;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
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

</style>
