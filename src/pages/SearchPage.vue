<template>
	<main class="flex flex-row gap-8">
		<SearchBar @new-search="newSearch" />
		<div class="flex flex-col gap-4" v-if="state.term.length > 0">
			<div class="flex flex-row gap-1">
				<p class="text-2xl font-extrabold capitalize">
					{{ $t("generic.found") }}
				</p>
				<p class="text-2xl font-extrabold">{{ state.total_count }}</p>
				<p class="text-2xl font-extrabold">{{ $t("generic.results") }}</p>
				<p class="text-2xl font-extrabold">{{ $t("generic.of") }}</p>
				<p class="text-2xl font-extrabold">"{{ state.term }}"</p>
			</div>

			<q-infinite-scroll
				@load="callFetchSearch"
				v-if="state.total_count > 0"
			>
				<div
					class="w-full min-h-80vh grid grid-cols-2 lg:grid-cols-3 gap-4"
				>
					<template v-for="(gif, i) in state.results" :key="i">
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
import SearchBar from "src/components/SearchBar.vue";
import ImageCard from "src/components/ImageCard.vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, reactive, ref, watch } from "vue";
import { api } from "src/boot/axios";

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const { query } = route;

const state = reactive({
	results: [],
	total_count: 0,
	term: "",
});

let limit = 25;
let page = 0;

watch(
	() => route.query,
	(newTerm) => {
		console.log("oi");
		if (newTerm && newTerm.length > 0) {
			newSearch(newTerm);
		}
	},
	{ deep: true }
);

async function newSearch(newTerm) {
	state.term = newTerm;
	state.results = [];
	await fetchSearch(newTerm);
}

async function callFetchSearch(index, done) {
	await fetchSearch(state.term);
	done();
}

async function fetchSearch(term) {
	await api
		.get("/search", {
			params: {
				q: term && term.length > 0 ? term : query.term,
				limit: limit,
				offset: page,
				rating: "g",
				lang: locale.value.split("-")[0],
				bundle: "messaging_non_clips",
			},
		})
		.then((response) => {
			state.total_count = response.data.pagination.total_count;
			state.results.push(...response.data.data);
			page += limit;
		})
		.catch((error) => {
			console.error(error);
		});
}

onMounted(() => {
	if (query.term && query.term.length > 0) {
		state.term = query.term;
		fetchSearch();
	} else {
		router.push({ path: "/" });
	}
});
</script>
