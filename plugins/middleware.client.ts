export default defineNuxtPlugin(() => {
  // ログイン済みユーザ用pageに利用するmiddleware
  addRouteMiddleware("user-only", async (to, from) => {
    const { isAuthenticated } = useAuth();
    // ログイン済みならOK
    if (await isAuthenticated()) return;
    // 未ログインならログイン画面に遷移
    return navigateTo("/login", { replace: true });
  });

  // 未ログインユーザ用pageに利用するmiddleware
  addRouteMiddleware("guest-only", async () => {
    const { isAuthenticated } = useAuth();
    if (await isAuthenticated()) {
      // ログイン済みならTOP画面に遷移
      return navigateTo("/");
    }
  });

  // ログインページ用
  addRouteMiddleware("login-callback", async (to) => {
    const auth = useAuth();
    const query = to?.query;
    if (query && query.code && query.state) {
      try {
        const redirectUrl = await auth.handleRedirectCallback();
        // ログイン成功したらリダイレクト先に遷移
        return navigateTo(redirectUrl, { replace: true });
      } catch (e) {
        console.error(e);
      }
    } else {
      // 直接アクセスされた等、codeとstateがクエリに無かったらログインページにリダイレクト
      await auth.loginWithRedirect();
    }
  });
});
