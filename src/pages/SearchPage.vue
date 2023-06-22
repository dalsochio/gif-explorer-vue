<template>
    <main class="flex flex-row gap-8">
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
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-4">
                <div class="sticky top-24 bg-zinc-200 dark:bg-[#383838] rounded-md p-4">fixed</div>
            </div>
            <div class="col-span-8">
                <q-infinite-scroll @load="callFetchSearch" :offset="250" v-if="infiniteScroll">
                    <div class="w-full min-h-80vh columns-2 md:columns-2 lg:columns-3">
                        <template v-for="(gif, i) in state.results" :key="i">
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
        </div>

    </main>
</template>

<script setup>
import ImageCard from 'src/components/ImageCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, ref, watch } from 'vue';
import { api } from 'src/boot/axios';

const { locale } = useI18n()
const router = useRouter();
const route = useRoute();
const { query } = route;

const options = ref([])
const infiniteScroll = ref(true)
const state = reactive({
    results: []
})
const text = ref(query.term.slice())
const term = ref("")

let limit = 25;
let page = 0
let fetching = false;

function filterFn(val, update, abort) {
    // call abort() at any time if you can't retrieve data somehow

    update(() => {
        if (val === '') {
            options.value = []
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

async function search(queryTerm) {
    if (queryTerm.length > 0) {
        term.value = queryTerm
        await router.replace({
            query: {
                term: queryTerm
            }
        })
        state.results = []
        await fetchSearch(queryTerm)
    }
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

async function callFetchSearch(index, done) {
    await fetchSearch(term)
    done()
}

async function fetchSearch(term) {
    if (!fetching) {
        fetching == true;
        await api.get("/search", {
            params: {
                q: term && term.length > 0 ? term : query.term,
                limit: limit,
                offset: page,
                rating: "g",
                lang: locale.value.split("-")[0],
                bundle: "messaging_non_clips"
            },
        }).then((response => {
            infiniteScroll.value = false;
            let newResults = [...state.results, response.data.data]
            state.results = reorder(newResults, 3);
            page += limit
            infiniteScroll.value = true;
        })).catch(error => {
            console.error(error)
        })
        fetching = false;
    }

}

onMounted(() => {
    fetchSearch()
})

</script>
