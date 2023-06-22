<template>
    <q-header
        class="sticky top-0 h-16 z-20 backdrop-blur bg-white/90 text-zinc-900 dark:bg-zinc-800/90 border-b border-zinc-200 dark:border-zinc-500 dark:text-zinc-200">
        <q-toolbar class="container mx-auto h-full px-4 lg:px-24 flex flex-row-3 justify-between items-center">
            <q-toolbar-title>
                <router-link to="/" class="flex flex-row gap-4 items-center">
                    <q-img src="https://media.giphy.com/avatars/default3.gif" class="w-10 h-10 rounded-full dark:invert" />
                    <p>
                        <b>GIF</b> Explorer
                    </p>
                </router-link>
            </q-toolbar-title>
            <q-btn round flat :icon="darkMode ? 'light_mode' : 'dark_mode'" @click="toggle"></q-btn>
        </q-toolbar>
    </q-header>
</template>

<script setup>
import { useDarkModeStore } from 'stores/global';
import { storeToRefs } from 'pinia';

const store = useDarkModeStore();
const { darkMode } = storeToRefs(store);
const { toggle } = store;

</script>