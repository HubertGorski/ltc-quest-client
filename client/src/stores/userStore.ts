import { defineStore } from "pinia";
import { User } from "@/models/User";
import { users } from "@/assets/data/users";

interface MyState {
  user: User;
}

export const useUserStore = defineStore({
  id: "userStore",
  state: (): MyState => ({
    user: users[3],
  }),

  getters: {
    getUserPermissions: (state) => {
      return state.user.permissions;
    },
  },

  actions: {
    setUserPermissions(permissions: number[]) {
      this.user.permissions = permissions;
    },
  },
});
