<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex-1 flex flex-col items-center justify-center my-32">
	<div class="w-4/5 flex flex-col items-center justify-center gap-4 mt-6">
		<span class="text-orange-500 text-[10rem]">;-;</span>
		<p class="text-xl">
			{$page.error?.message !== 'Internal Error' ? $page.error?.message : 'Something went wrong'}
		</p>
	</div>
</section>
