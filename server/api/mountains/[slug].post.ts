export default defineEventHandler(async (event) => {
  // const body = await useBody(event);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { response: "ok" };
});
