<script lang="ts">
	import { Switch } from '@rgossiaux/svelte-headlessui';
	import { searchWithMask } from '$lib/store/search';

	export let srchWithMask: boolean;
</script>

<li class="flex items-center justify-between p-2 py-4">
	<div>
		<h2>Search with mask (word*)</h2>
		<p class="text-slate-400 dark:text-zinc-500 text-sm font-light">
			Select whether to perform wildcard searches or not.
		</p>
	</div>
	<div class="w-80">
		<Switch
			checked={srchWithMask}
			on:change={(e) => searchWithMask.set(e.detail)}
			class={srchWithMask ? 'switch switch-enabled' : 'switch switch-disabled'}
		>
			<span class="toggle" class:toggle-on={srchWithMask} class:toggle-off={!srchWithMask} />
		</Switch>
	</div>
</li>

<style>
	:global(.switch) {
		position: relative;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		height: 1.5rem;
		width: 2.75rem;
		transition: all 0.2s ease;
		@apply shadow-sm;
	}

	:global(.switch-enabled) {
		background-color: rgb(249 115 22) !important;
	}

	:global(.switch-disabled) {
		background-color: rgb(226 232 240) !important;
	}

	:global(.dark .switch-disabled) {
		background-color: rgb(82 82 91) !important;
	}

	.toggle {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background-color: #f6f8fa;
		border-radius: 9999px;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: transform;
	}

	.toggle-on {
		transform: translateX(1.5rem);
	}

	.toggle-off {
		transform: translateX(0.25rem);
	}
</style>
