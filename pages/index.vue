<script setup lang="ts">
definePageMeta({
  title: "TOP Page",
  middleware: "user-only",
});
</script>

<template>
  <div>
    <h1>Index Page</h1>
    <Counter />
  </div>
</template>
