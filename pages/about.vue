<script setup lang="ts">
definePageMeta({
  title: "About Page",
  middleware: "user-only",
});
</script>

<template>
  <div>
    <h1>About Page</h1>
    <Counter />
  </div>
</template>
