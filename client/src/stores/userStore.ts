import { defineStore } from "pinia";
import { User } from "@/models/User";
import { users } from "@/assets/data/users";

interface UserState {
  user: User;
}

export const useUserStore = defineStore({
  id: "userStore",
  state: (): UserState => ({
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
