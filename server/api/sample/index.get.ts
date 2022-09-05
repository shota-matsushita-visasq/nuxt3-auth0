/* eslint import/default: 0 */
/* eslint import/no-named-as-default-member: 0 */
export default defineEventHandler(async ({ req }) => {
  console.log("header check");
  console.log(req.headers.favorite_color);
  console.log(req.headers.title);
  // TODO: 外部API呼び出し

  return { response: "ok" };
});
