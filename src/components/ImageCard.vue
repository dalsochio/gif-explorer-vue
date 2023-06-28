<template>
	<div
		class="mb-4 rounded-md border dark:border-zinc-600 overflow-hidden cursor-pointer"
		@click="showModal"
	>
		<img
			:src="props.gif.images.fixed_height_downsampled.webp"
			class="w-full h-52 object-cover hover:scale-105 ease-in duration-200"
		/>
	</div>
</template>

<script setup>
import { useImageModal } from "src/stores/global";
const props = defineProps(["gif"]);
const store = useImageModal();
const { toggle } = store;

function showModal() {
	toggle(props.gif);
}
</script>
