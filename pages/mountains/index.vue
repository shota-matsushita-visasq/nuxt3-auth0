<script setup lang="ts">
definePageMeta({
  middleware: "user-only",
});
const { data, pending, error, refresh } = await useFetch("/api/mountains", {
  lazy: true,
  server: false,
});
</script>

<template>
  <div>
    <h1>Mountain List Page</h1>
    <p v-if="pending">pending...</p>
    <ul>
      <li v-for="mountain in data" :key="mountain.slug">
        <NuxtLink :to="`/mountains/${mountain.slug}`">{{
          mountain.title
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
