<script lang="ts">
	import Icon from '@iconify/svelte';
	import Navbar from './navbar/Navbar.svelte';
	import ThemeToggleButton from './navbar/ThemeToggleButton/index.svelte';
	import { onMount } from 'svelte';

	let backgroundOpacity = 0;

	onMount(() => {
		const updateStyle = (e) => {
			if (window.scrollY <= 50) {
				backgroundOpacity = 0;
			} else {
				backgroundOpacity = Math.min(1, (window.scrollY - 50) / 50);
			}
		};

		window.addEventListener("scroll", updateStyle)
	});
</script>

<header class="fixed top-0 w-full z-[9999] {backgroundOpacity === 1 && "shadow-md"}" style="background-color: rgba(255, 255, 255, {backgroundOpacity})">
	<a href="/" class="flex items-center gap-2 p-4 px-5 text-lg font-light relative z-[9999]">
		<Icon icon="mdi:book-open-page-variant-outline" class="w-7 h-7 text-orange-500 flex-shrink-0" />
		<span>Libgen <span class="text-orange-500 font-medium">Remade</span> </span>
	</a>

	<Navbar />
	<div class="flex items-center gap-4 relative z-[9999]">
		<ThemeToggleButton />
		<a href="https://github.com/melvinchia3636/libgen" target="_blank">
			<Icon
				icon="mdi:github"
				class="w-7 h-7 text-zinc-700 dark:text-white flex-shrink-0 m-4 ml-0"
			/>
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
</style>
