/* eslint import/default: 0 */
/* eslint import/no-named-as-default-member: 0 */
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const config = useRuntimeConfig();

const customClaims = {
  FAVORITE_COLOR: `${config.auth0CustomNamespace}/favorite_color`,
  TITLE: `${config.auth0CustomNamespace}/title`,
} as const;

type CustomClaims = typeof customClaims[keyof typeof customClaims];

type AccessTokenClaim = jwt.JwtPayload & {
  [key in CustomClaims]: string;
};

export default defineEventHandler(async ({ req }) => {
  // APIは認証必須になるはず
  if (!req.url?.startsWith("/api/sample")) return;
  const jwks = jwksClient({
    jwksUri: `https://${config.public.auth0Domain}/.well-known/jwks.json`,
  });

  // Authorization Bearer
  const bearToken = req.headers.authorization;
  if (!bearToken) {
    throw new Error("login required.");
  }
  const bearer = bearToken.split(" ");
  const token = bearer[1];

  // 送られたトークンのkidが一致する公開鍵を取得
  const decoded = jwt.decode(token, { complete: true });
  const key = await jwks.getSigningKey(decoded?.header.kid);
  const publicKey = key.getPublicKey();
  // 公開鍵を使ってjwtを検証
  try {
    const verified = <AccessTokenClaim>jwt.verify(token, publicKey);
    // Actionsで設定したカスタムクレームをアクセストークンから取り出せる
    // see: https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims
    req.headers.favorite_color = verified[`${customClaims.FAVORITE_COLOR}`];
    req.headers.title = verified[`${customClaims.TITLE}`];
  } catch (err) {
    console.log(err);
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
});
