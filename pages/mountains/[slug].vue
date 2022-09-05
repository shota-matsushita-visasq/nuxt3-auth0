<script setup lang="ts">
import { Mountain } from "~/server/api/mountains/[slug].get";
definePageMeta({
  middleware: "user-only",
});

const route = useRoute();

// $fetchでも良さそう
// const data = await $fetch<Mountain>(`/api/mountains/${route.params.slug}`);

const { data, pending, error, refresh } = await useFetch<Mountain>(
  `/api/mountains/${route.params.slug}`,
  {
    initialCache: false,
  }
);

// アクセストークン付与してリクエストするサンプル
const auth = useAuth();
const token = await auth.getToken();
await useFetch("/api/sample", {
  headers: { Authorization: `Bearer ${token}` },
  initialCache: false,
});

const submit = async () => {
  await useFetch(`/api/mountains/${route.params.slug}`, {
    method: "post",
    body: { hoge: "fuga", piyo: "aaa" },
  });
};
</script>

<template>
  <div>
    <h1>Mountain Detail Page</h1>
    <div v-if="!error">
      <p>Title: {{ data?.title }}</p>
      <p>Description: {{ data?.description }}</p>
      <p>Image: <img :src="data?.imageUrl" /></p>
      <p>UpdatedAt: {{ data?.updatedAt }}</p>
      <p><button @click="submit">PostTest</button></p>
    </div>
    <div v-else>Not found.</div>
  </div>
</template>
