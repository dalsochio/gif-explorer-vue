<template>
  <div class="mb-4 rounded-md border dark:border-zinc-600 overflow-hidden cursor-pointer">
    <router-link :to="`/image/${props.id}`">
      <img :src="props.image" class="hover:scale-105 ease-in duration-200" />
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps(['image', 'id'])
</script>
