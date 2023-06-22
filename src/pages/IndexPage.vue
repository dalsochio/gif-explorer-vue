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

			<q-infinite-scroll @load="fetchTrendingsGifs" :offset="250">
				<div class="w-full min-h-80vh columns-2 md:columns-3 lg:columns-4">
					<template v-for="(gif, i) in trending" :key="i">
						<ImageCard :id="gif.id" :image="gif.images.original.url" />
					</template>
				</div>
				<template v-slot:loading>
					<div class="row justify-center q-my-md">
						<q-spinner-dots color="primary" size="40px" />
					</div>
				</template>
			</q-infinite-scroll>
		</div>
	</main>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import ImageCard from "components/ImageCard.vue";

const trending = ref([])

let limit = 25;
let page = 0

function reorder(arr, columns) {
	const cols = columns;
	const out = [];
	let col = 0;
	while (col < cols) {
		for (let i = 0; i < arr.length; i += cols) {
			let _val = arr[i + col];
			if (_val !== undefined)
				out.push(_val);
		}
		col++;
	}
	return out;
}

function fetchTrendingsGifs(index, done) {
	api.get("/trending", {
		params: {
			limit: 25,
			offset: page,
			rating: "g",
			bundle: "messaging_non_clips"
		},
	}).then((response => {
		trending.value.push(...reorder(response.data.data, 4));
		page += limit
		done()
	})).catch(error => {
		console.error(error)
	});
}
</script>
