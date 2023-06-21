<template>
  <q-layout
    class="max-w-screen min-h-screen bg-gradient-to-b from-acapulco-300 to-acapulco-100 dark:from-acapulco-400 dark:to-acapulco-600 text-zinc-900 dark:text-zinc-200 dark:bg-black">

    <NavBarLayout @submit="teste" />
    <q-page-container class="container mx-auto px-8 lg:px-44 pt-8">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBarLayout from "layouts/NavBarLayout.vue";

const teste = () => {
  console.log("teste");
};


const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.body.classList.toggle("dark");
};
</script>
