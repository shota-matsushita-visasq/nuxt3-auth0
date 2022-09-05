<script setup lang="ts">
// Universal Login にリダイレクトするだけ
definePageMeta({
  layout: "blank",
  title: "Login Page",
});

const auth = useAuth();
const redirectPath = useRoute().redirectedFrom?.fullPath || "/";
auth.loginWithRedirect(redirectPath);
</script>

<template>
  <div>loading...</div>
</template>
