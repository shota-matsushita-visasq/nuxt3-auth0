import { User } from "@auth0/auth0-spa-js";

export const useAuthUser = () => {
  return useState<User | null>("user", () => null);
};
