<template>
    <main class="grid grid-cols-12">
        <div class="col-span-3">
            <SideBarLayout />
        </div>
        <div class="col-span-9">
            <div v-for="(gif, i) in gifs.trending" :key="i">
                <img :src="gif.images.original.url" />
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
