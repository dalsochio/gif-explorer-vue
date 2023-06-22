<template>
	<main class="flex flex-col gap-8">
		<div class="w-full h-44 bg-cover bg-center rounded-md shadow-lg flex justify-center items-center"
			style="background-image: url(assets/img/backgroundImage.gif);">
			<!-- <q-input :dark="darkMode" borderless v-model="text"
				class="w-11/12 backdrop-blur bg-white/90 text-zinc-900 dark:bg-zinc-800/90 dark:text-zinc-200 rounded-full shadow-sm px-8 py-4 capitalize"
				input-class="w-11/12 text-left text-xl" :placeholder="`${$t('generic.search')}...`">
				<template v-slot:append>
					<q-icon v-if="text === ''" name="search" icon="search" />
					<q-icon v-else name="clear" icon="clear" class="cursor-pointer" @click="text = ''" />
				</template>
			</q-input> -->
			<!-- <q-input standout :v-model="$t('generic.search')" label="Rounded standout"
				class="backdrop-invert w-11/12 h-fit backdrop-blur bg-white/90 text-zinc-900 dark:bg-zinc-800/90 dark:text-zinc-200 rounded-full shadow-sm px-8 py-4 capitalize" /> -->
			<q-select borderless :dark="darkMode" v-model="text" use-input input-debounce="0"
				:label="`${$t('generic.search')}...`" :options="options" @filter="filterFn" @filter-abort="abortFilterFn"
				@update:model-value="search"
				class="w-11/12 backdrop-blur bg-white/90 text-zinc-900 dark:bg-zinc-800/90 dark:text-zinc-200 rounded-full shadow-sm px-8 py-4 capitalize">
			</q-select>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-2xl font-extrabold capitalize">{{ $t('generic.trending') }}</p>

			<q-infinite-scroll @load="fetchTrendingsGifs" :offset="250">
				<div class="w-full min-h-80vh columns-2 md:columns-3 lg:columns-4">
					<template v-for="(  gif, i  ) in   trending  " :key="i">
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
import { useDarkModeStore } from 'stores/global';
import { storeToRefs } from 'pinia';
import ImageCard from "components/ImageCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useDarkModeStore();
const { darkMode } = storeToRefs(store);

const trending = ref([])
const text = ref("")

const options = ref([])

let limit = 25;
let page = 0

function filterFn(val, update, abort) {
	// call abort() at any time if you can't retrieve data somehow

	update(() => {
		if (val === '') {
			options.value = options
		}
		else {
			api.get(`search/tags`, {
				params: {
					q: val.toLowerCase().trim(),
					limit: 10,
					offset: 0,
				}
			}).then((res => {
				options.value = res.data.data.map(d => d.name);
				console.log(options.value)
			})).catch(e => {
				abort()
			})
		}
	})

}

async function search(term) {
	console.log("term", term)
	await router.push({ path: '/search', query: { term } })
}

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
