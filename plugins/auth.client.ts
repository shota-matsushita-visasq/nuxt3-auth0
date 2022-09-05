import createAuth0Client from "@auth0/auth0-spa-js";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const auth = await createAuth0Client({
    domain: config.public.auth0Domain,
    client_id: config.public.auth0ClientId,
    redirect_uri: `${window.location.origin}/login/callback`,
    audience: config.public.auth0Audience,
  });
  return {
    provide: {
      auth0Client: auth,
    },
  };
});
