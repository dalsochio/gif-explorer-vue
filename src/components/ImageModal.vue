<template>
	<div
		class="fixed top-0 left-0 w-screen h-screen z-50 p-10 backdrop-blur bg-black/50"
	>
		<section
			v-if="props.image"
			class="container mx-auto grid grid-rows-[1fr_auto] lg:flex flex-col justify-center w-full h-full rounded-md shadow-md overflow-hidden"
		>
			<div class="h-full lg:h-full bg-zinc-300 dark:bg-[#242424] flex">
				<img
					:src="props.image.images.original.url"
					class="self-center max-w-full max-h-full mx-auto"
					:class="[fullScreen ? 'h-full object-cover' : '']"
				/>
			</div>
			<div
				class="h-fit lg:absolute lg:right-28 lg:top-20 w-full lg:w-96 lg:h-fit bg-zinc-200 dark:bg-[#383838] flex flex-col p-2 lg:rounded-lg"
			>
				<div class="w-full flex justify-between">
					<q-btn
						round
						:flat="!fullScreen"
						:color="fullScreen ? 'primary' : 'black'"
						icon="open_in_full"
						class="self-end"
						@click="toggleFullScreen"
						title="Full screen"
					></q-btn>
					<q-btn
						round
						flat
						icon="close"
						class="self-end"
						@click="closeModal"
					></q-btn>
				</div>
				<div class="p-4">
					<h1 class="text-2xl font-bold uppercase">
						{{ props.image.title }}
					</h1>
					<div class="flex flex-row gap-1">
						<p class="text-sm">
							{{ $t("generic.published") }}
						</p>
						<p v-if="props.image.username.length > 0">
							{{ $t("generic.by") }}
							<a
								:href="`https://giphy.com/channel/${props.image.username}`"
								target="_blank"
								class="font-bold hover:text-slate-800"
							>
								{{ props.image.username }}
							</a>
						</p>
						<p>
							{{ $t("generic.on") }}
							{{
								new Date(
									props.image.import_datetime
								).toLocaleDateString()
							}}
						</p>
					</div>
				</div>
				<input
					class="rounded-md border-2 border-slate-500 border-dotted px-4 py-2 mx-4 mb-4 dark:text-slate-600"
					readonly
					:value="props.image.embed_url"
					@click="copyValue"
				/>
			</div>
		</section>
	</div>
</template>

<script setup>
import { useImageModal } from "src/stores/global";
import { ref } from "vue";
const store = useImageModal();
const props = defineProps(["image"]);

const fullScreen = ref(true);

function closeModal() {
	store.$reset();
}

function toggleFullScreen() {
	fullScreen.value = !fullScreen.value;
}

function copyValue(elm) {
	elm.target.select();
	document.execCommand("copy");
}
</script>
