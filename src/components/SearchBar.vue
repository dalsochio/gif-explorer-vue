<template>
	<div
		class="w-full h-44 bg-cover bg-center rounded-md shadow-lg flex justify-center items-center"
		style="background-image: url(assets/img/backgroundImage.gif)"
	>
		<q-select
			borderless
			:dark="darkMode"
			v-model="text"
			use-input
			input-debounce="0"
			:label="`${$t('generic.search')}...`"
			:options="options"
			@filter="filterFn"
			@update:model-value="search"
			@keyup.enter="onEnter"
			class="w-11/12 backdrop-blur bg-white/90 text-zinc-900 dark:bg-zinc-800/90 dark:text-zinc-200 rounded-full shadow-sm px-8 py-4 capitalize"
		>
		</q-select>
	</div>
</template>

<script setup>
import { useDarkModeStore } from "stores/global";
import { api } from "boot/axios";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["new-search"]);
const router = useRouter();
const store = useDarkModeStore();
const { darkMode } = storeToRefs(store);

const options = ref([]);
const text = ref("");

function filterFn(val, update, abort) {
	update(() => {
		if (val === "") {
			options.value = options;
		} else {
			api.get(`search/tags`, {
				params: {
					q: val.toLowerCase().trim(),
					limit: 10,
					offset: 0,
				},
			})
				.then((res) => {
					options.value = res.data.data.map((d) => d.name);
				})
				.catch((e) => {
					abort();
				});
		}
	});
}

function onEnter(e) {
	search(e.target.value);
}

async function search(queryTerm) {
	if (queryTerm && queryTerm.length > 0) {
		await router.push({
			path: "/search",
			query: {
				term: queryTerm,
			},
		});
		emit("new-search", queryTerm);
	}
}
</script>
