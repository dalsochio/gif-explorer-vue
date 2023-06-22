<template>
    <main v-if="image"
        class="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-12 w-full lg:h-full rounded-md shadow-md overflow-hidden">
        <div class="col-span-8 bg-zinc-300 dark:bg-[#242424] flex">
            <img :src="image.images.original.url" class="self-center max-w-full max-h-full mx-auto" />
        </div>
        <div class="col-span-4 bg-zinc-200 dark:bg-[#383838]">
            <div class="p-4">
                <h1 class="text-2xl font-bold">{{ image.title }}</h1>
                <p class="text-sm text-gray-500">{{ image.username }}</p>
                <p class="text-sm text-gray-500">{{ image.import_datetime }}</p>
                <p class="text-sm text-gray-500">{{ image.rating }}</p>
            </div>
            <!-- <p><img :src="image.user.avatar_url" /> {{ image.user.display_name }}</p> -->
        </div>
    </main>

    <main v-if="image === null">
        Carregando...
    </main>

    <main v-if="image === false">
        Não encontrado
    </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { api } from "boot/axios";

const route = useRoute()
const router = useRouter()
const image = ref(null)

watch(
    () => route.params.id,
    async (id) => {
        image.value = await fetchImageGif(id)
        console.log(image)
    },
    { immediate: true }
)

async function fetchImageGif(id) {
    let response = false;
    await api.get(`/${id}`, {
        params: {
            rating: "g"
        },
    }).then((res => {
        response = res.data.data;
    }))

    return response;
}
</script>
