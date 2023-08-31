<script lang="ts">
	import { viewResults } from '$lib/store/search';
</script>

<li class="flex items-center justify-between p-2 py-4">
	<div>
		<h2>View results</h2>
		<p class="text-slate-400 dark:text-zinc-500 text-sm font-light">
			Select whether to show results in more detail or not.
		</p>
	</div>
	<div class="w-80 flex items-center gap-12">
		<div class="block min-h-[1.5rem] pl-[1.5rem]">
			<input
				class="relative float-left mt-[0.2rem] mr-1 -ml-[1.5rem] h-[1.2rem] w-[1.2rem] appearance-none rounded-full border-2 border-solid border-slate-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-zinc-500 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500 dark:checked:focus:border-orange-500"
				type="radio"
				name="flexRadioDefault"
				id="radioDefault01"
				checked={$viewResults === 'simple'}
				on:click={() => viewResults.set('simple')}
			/>
			<label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault01">
				Simple
			</label>
		</div>
		<div class="block min-h-[1.5rem] pl-[1.5rem]">
			<input
				class="relative float-left mt-[0.2rem] mr-1 -ml-[1.5rem] h-[1.2rem] w-[1.2rem] appearance-none rounded-full border-2 border-solid border-slate-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-zinc-500 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500 dark:checked:focus:border-orange-500"
				type="radio"
				name="flexRadioDefault"
				id="radioDefault02"
				checked={$viewResults === 'detailed'}
				on:click={() => viewResults.set('detailed')}
			/>
			<label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault02">
				Detailed
			</label>
		</div>
	</div>
</li>
