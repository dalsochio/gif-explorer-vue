<template>
    <main v-if="image" class="grid grid-cols-12 w-full lg:h-full border rounded-md overflow-hidden">
        <div class="col-span-8 bg-zinc-200">
            <img :src="image.images.original.url" class="max-w-full max-h-full mx-auto" />
        </div>
        <div class="col-span-4">
            b
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
