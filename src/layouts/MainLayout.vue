<template>
  <q-layout
    class="max-w-screen min-h-screen grid grid-rows-[auto_1fr] pb-16 dark:bg-[#333] text-zinc-900 dark:text-zinc-200"
    v-if="isLanguageLoaded">
    <NavBarLayout />
    <q-page-container class="container mx-auto h-full px-8 lg:px-44 pt-8">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBarLayout from "layouts/NavBarLayout.vue";
import { useI18n } from 'vue-i18n'
import { nextTick, watch } from "vue";

// const { locale } = useI18n()
let isLanguageLoaded = true;

// watch(
//   () => locale.value,
//   () => {
//     isLanguageLoaded = false
//     nextTick(() => {
//       isLanguageLoaded = true
//     })
//   }
// )
</script>
