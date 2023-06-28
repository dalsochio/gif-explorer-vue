<template>
	<main class="flex flex-col gap-8">
		<SearchBar />
		<div class="flex flex-col gap-4">
			<p class="text-2xl font-extrabold capitalize">
				{{ $t("generic.trending") }}
			</p>

			<q-infinite-scroll @load="fetchTrendingsGifs">
				<div
					class="w-full min-h-80vh grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
				>
					<template v-for="(gif, i) in trending" :key="i">
						<ImageCard :gif="gif" />
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
import SearchBar from "components/SearchBar.vue";

const trending = ref([]);

let limit = 25;
let page = 0;

function fetchTrendingsGifs(_, done) {
	api.get("/trending", {
		params: {
			limit: 25,
			offset: page,
			rating: "g",
			bundle: "messaging_non_clips",
		},
	})
		.then((response) => {
			trending.value.push(...response.data.data);
			page += limit;
			done();
		})
		.catch((error) => {
			console.error(error);
		});
}
</script>
