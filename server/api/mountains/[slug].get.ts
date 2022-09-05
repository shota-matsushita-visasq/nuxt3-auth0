export type ApiMouontain = {
  title: string;
  description: string;
  image: string;
  path: string;
  slug: string;
  updatedAt: string;
};

export type Mountain = {
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  slug: string;
  updatedAt: Date;
};

export default defineEventHandler(async (event) => {
  // 本来はtokenをAuthorizationに付与する
  const data = await $fetch<ApiMouontain>(
    `https://api.nuxtjs.dev/mountains/${event.context.params.slug}`
  );
  return fromApiMountain(data);
});

export const fromApiMountain = (mountain: ApiMouontain): Mountain => ({
  title: mountain.title,
  description: mountain.description,
  imageUrl: mountain.image,
  path: mountain.path,
  slug: mountain.slug,
  updatedAt: new Date(mountain.updatedAt),
});
