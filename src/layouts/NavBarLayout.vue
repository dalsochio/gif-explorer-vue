<template>
	<q-header
		class="sticky top-0 h-16 z-20 backdrop-blur bg-white/90 text-zinc-900 dark:bg-[#222]/90 dark:text-zinc-200 shadow-md"
	>
		<q-toolbar
			class="container mx-auto h-full px-4 lg:px-24 flex flex-row-3 gap-4 lg:gap-8 justify-between items-center"
		>
			<q-toolbar-title>
				<router-link
					to="/"
					class="flex flex-row gap-2 lg:gap-4 items-center"
				>
					<q-img
						src="https://media.giphy.com/avatars/default3.gif"
						class="w-0 lg:w-10 h-10 rounded-full dark:invert"
					/>
					<p><b>GIF</b> Explorer</p>
				</router-link>
			</q-toolbar-title>
			<div class="flex flex-row gap-4 text-lg">
				<router-link
					to="/"
					:class="[
						route.name == 'trending'
							? 'font-extrabold border-b-2 border-zinc-600'
							: '',
					]"
					class="capitalize"
					>{{ $t(`menu.trending`) }}</router-link
				>
			</div>
			<q-btn round flat icon="translate">
				<q-menu
					fit
					anchor="bottom left"
					self="top left"
					max-width="50px"
					class="overflow-hidden"
				>
					<q-list style="min-width: 100px">
						<q-item clickable v-close-popup @click="switchLanguage">
							<q-item-section>en</q-item-section>
						</q-item>
						<q-item clickable v-close-popup @click="switchLanguage">
							<q-item-section>pt</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</q-btn>
			<q-btn
				round
				flat
				:icon="darkMode ? 'light_mode' : 'dark_mode'"
				@click="toggle"
			></q-btn>
		</q-toolbar>
	</q-header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useDarkModeStore } from "stores/global";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const route = useRoute();
const store = useDarkModeStore();
const { darkMode } = storeToRefs(store);
const { toggle } = store;

function switchLanguage(obj) {
	locale.value = obj.target.innerText;
}
</script>
