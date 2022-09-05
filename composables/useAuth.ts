import { RedirectLoginResult, User } from "@auth0/auth0-spa-js";

export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const auth0 = nuxtApp.$auth0Client;

  const authUser = useAuthUser();

  const setUser = (user: User) => {
    authUser.value = user;
  };
  const clearUser = () => {
    authUser.value = null;
  };

  // Universal login
  const loginWithRedirect = async (redirectPath = "/") => {
    // see: https://community.auth0.com/t/how-do-i-set-up-a-dynamic-allowed-callback-url/60268
    await auth0.loginWithRedirect({
      appState: { redirectPath },
    });
  };

  // Universal login からのコールバック後ログイン
  const handleRedirectCallback = async () => {
    const result: RedirectLoginResult<{ redirectPath: string }> =
      await auth0.handleRedirectCallback();
    const user = await auth0.getUser();
    if (user) {
      setUser(user);
      return result.appState?.redirectPath || "";
    }
    throw new Error("login failed");
  };

  // ログアウト
  const logout = async () => {
    await auth0.logout();
    clearUser();
  };

  // 認証チェック（主にmiddlewareで使う）
  const isAuthenticated = async () => {
    // return await auth0.isAuthenticated();
    const user = await auth0.getUser();
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const getToken = async () => {
    return await auth0.getTokenSilently();
  };

  return {
    loginWithRedirect,
    handleRedirectCallback,
    logout,
    isAuthenticated,
    getToken,
  };
};
