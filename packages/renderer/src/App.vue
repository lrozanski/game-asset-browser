<script lang="ts" setup>
import {loadImages} from '#preload';
import {reactive} from 'vue';

const store = reactive<{images: string[]}>({images: []});

loadImages()
  .then(data => {
    store.images = data as string[];
    console.log(data);
  });
</script>

<template>
  <img
    v-for="image in store.images"
    :key="image"
    :src="image"
    :alt="image"
  />
</template>

<style>
</style>
