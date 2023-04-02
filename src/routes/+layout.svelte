<script>
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
</script>

<div class="app bg-slate-200 w-full min-h-screen text-slate-700 flex flex-col" data-theme="light">
	<Header />

	<main class="flex-1 flex flex-col w-full">
		<slot />
	</main>

	<footer
		class="mb-3 w-full flex items-center justify-center text-sm divide-x-[1.5px] divide-slate-600 font-light tracking-wider"
	>
		<a href="/letter-of-solidarity" class="block px-2">Letter of Solidarity</a>
		<a href="/desktop" class="block px-2">Libgen Desktop</a>
		<a href="/searching-guide" class="block px-2">Searching Guide</a>
	</footer>
</div>

<style>
</style>
