<template>
  <q-layout
    class="max-w-screen min-h-screen grid grid-rows-[auto_1fr] pb-16 bg-gradient-to-b from-acapulco-300 to-acapulco-100 dark:from-acapulco-400 dark:to-acapulco-600 text-zinc-900 dark:text-zinc-200 dark:bg-black">

    <NavBarLayout />
    <q-page-container class="container mx-auto h-full px-8 lg:px-44 pt-8">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBarLayout from "layouts/NavBarLayout.vue";
</script>
