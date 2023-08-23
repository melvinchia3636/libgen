<script>
	export let href = '';
	export let inner = false;
	export let noNewWindow = false;
</script>

<a
	{href}
	target={noNewWindow ? '' : '_blank'}
	rel={noNewWindow ? '' : 'noopener noreferrer'}
	class="block rounded-sm relative {inner
		? 'px-4'
		: 'px-6'} py-4 hover:bg-slate-100 dark:hover:bg-zinc-600 group"
>
	<li
		class="w-full focus:outline-none rounded-md flex uppercase tracking-widest justify-between items-center gap-2 group-hover:font-medium"
	>
		<slot />
	</li>
</a>
