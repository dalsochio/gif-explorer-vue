<template>
	<q-layout
		class="max-w-screen min-h-screen grid grid-rows-[auto_1fr] pb-16 dark:bg-[#333] text-zinc-900 dark:text-zinc-200"
	>
		<NavBarLayout />
		<q-page-container class="container mx-auto h-full px-8 lg:px-44 pt-8">
			<ImageModal v-if="imageModal" :image="imageModal" />
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import NavBarLayout from "layouts/NavBarLayout.vue";
import ImageModal from "components/ImageModal.vue";
import { useImageModal } from "src/stores/global";
import { storeToRefs } from "pinia";

const props = defineProps(["image", "id"]);
const store = useImageModal();
const { imageModal } = storeToRefs(store);
</script>
