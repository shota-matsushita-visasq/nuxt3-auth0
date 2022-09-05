<script setup lang="ts">
const route = useRoute();

const authUser = useAuthUser();
const logout = async () => {
  const { logout } = useAuth();
  try {
    await logout();
  } catch (error) {
    console.log(error);
    alert("ログアウト失敗");
  }
};
useHead({
  meta: [{ name: "og:title", content: `App Name - ${route.meta.title}` }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
  },
});
</script>

<template>
  <div>
    <nav :class="$style.navigation">
      <p><NuxtLink to="/">Home</NuxtLink></p>
      <p><NuxtLink to="/about">About</NuxtLink></p>
      <p><NuxtLink to="/mountains">Mountains</NuxtLink></p>
      <div :class="$style.right">
        <p>{{ authUser?.email }}</p>
        <p><button @click="logout">ログアウト</button></p>
      </div>
    </nav>
    <hr />
    <slot />
  </div>
</template>

<style lang="scss" module>
.navigation {
  background-color: pink;
  display: flex;
  justify-content: space-around;
}
.right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  > p {
    margin-left: 20px;
  }
}
</style>
