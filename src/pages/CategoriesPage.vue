<template>
    <main class="grid grid-cols-12">
        categories {{ $t('teste.sublink') }}
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

console.log(route.name)
</script>
