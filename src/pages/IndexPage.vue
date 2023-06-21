<template>
	<main class="flex flex-col gap-8">
		<div class="w-full h-44 bg-cover bg-center rounded-md shadow-lg flex justify-center items-center"
			style="background-image: url(assets/img/backgroundImage.gif);">
			<div
				class="backdrop-invert w-11/12 h-fit backdrop-blur bg-white/90 text-zinc-900 dark:bg-zinc-800/90 dark:text-zinc-200 rounded-full shadow-sm px-8 py-4">
				Procurar
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-2xl font-extrabold">Em alta</p>
			<div class="columns-2 md:columns-3 lg:columns-4">
				<div v-for="(gif, i) in gifs.trending" :key="i"
					class="mb-4 rounded-md border dark:border-zinc-600 overflow-hidden cursor-pointer">
					<img :src="gif.images.original.url" class="hover:scale-105 ease-in duration-200" />
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "boot/axios";
import SideBarLayout from "layouts/SideBarLayout.vue";

const gifs = ref({
	trending: [],
});

async function fetchTrendingsGifs() {
	try {
		const response = await api.get("/trending");
		gifs.value.trending = response.data.data;
	} catch (error) {
		alert(error);
		console.log(error);
	}
}

onMounted(async () => {
	fetchTrendingsGifs();
});
</script>
