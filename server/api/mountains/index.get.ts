import {
  ApiMouontain,
  fromApiMountain,
} from "@/server/api/mountains/[slug].get";

export default defineEventHandler(async (event) => {
  const response = await $fetch<ApiMouontain[]>(
    "https://api.nuxtjs.dev/mountains"
  );
  return response.map(fromApiMountain);
});
