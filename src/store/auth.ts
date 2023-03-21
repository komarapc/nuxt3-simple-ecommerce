import type { UserProps } from "@/src/interface/user";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: {} as UserProps,
    isAuthenticated: false,
  }),
  actions: {
    login(user: UserProps) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = {} as UserProps;
      this.isAuthenticated = false;
    },
  },
});
