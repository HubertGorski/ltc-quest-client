import { createRouter, createWebHistory } from "vue-router";
import TasksView from "@/views/TasksView.vue";
import HomeView from "@/views/HomeView.vue";
import RankingView from "@/views/RankingView.vue";
import BingoView from "@/views/BingoView.vue";
import SettingsView from "@/views/SettingsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import TasksDetailsView from "@/views/TasksDetailsView.vue";
import AddPointsView from "@/views/AddPointsView.vue";
import KillGameView from "@/mod/killGame/KillGameView.vue";
import ConfirmView from "@/views/ConfirmView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AdminKillGameView from "@/mod/killGame/AdminKillGameView.vue";
import NoAccessView from "@/views/NoAccessView.vue";
import { ROUTE_NAME, ROUTE_PATH } from "./routeEnums";
import { useUserStore } from "@/stores/userStore";
import { hasAccess, privTypes } from "@/managers/permissionsManager";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_PATH.NO_ACCESS,
      name: ROUTE_NAME.NO_ACCESS,
      component: NoAccessView,
    },
    {
      path: ROUTE_PATH.CONFIRM,
      name: ROUTE_NAME.CONFIRM,
      component: ConfirmView,
    },
    {
      path: ROUTE_PATH.HOME,
      name: ROUTE_NAME.HOME,
      component: HomeView,
    },
    {
      path: ROUTE_PATH.PROFILE,
      name: ROUTE_NAME.PROFILE,
      component: ProfileView,
    },
    {
      path: ROUTE_PATH.TASKS,
      name: ROUTE_NAME.TASKS,
      component: TasksView,
    },
    {
      path: ROUTE_PATH.TASK_DETAILS,
      name: ROUTE_NAME.TASK_DETAILS,
      component: TasksDetailsView,
    },
    {
      path: ROUTE_PATH.RANKING,
      name: ROUTE_NAME.RANKING,
      component: RankingView,
    },
    {
      path: ROUTE_PATH.BINGO,
      name: ROUTE_NAME.BINGO,
      component: BingoView,
    },
    {
      path: ROUTE_PATH.SETTINGS,
      name: ROUTE_NAME.SETTINGS,
      component: SettingsView,
    },
    {
      path: ROUTE_PATH.LOGIN,
      name: ROUTE_NAME.LOGIN,
      component: LoginView,
    },
    {
      path: ROUTE_PATH.REGISTER,
      name: ROUTE_NAME.REGISTER,
      component: RegisterView,
    },
    {
      path: ROUTE_PATH.ADD_POINTS,
      name: ROUTE_NAME.ADD_POINTS,
      component: AddPointsView,
    },
    {
      path: ROUTE_PATH.KILL_GAME,
      name: ROUTE_NAME.KILL_GAME,
      component: KillGameView,
      meta: {
        requiresConfirmation: true,
      },
    },
    {
      path: ROUTE_PATH.ADMIN,
      name: ROUTE_NAME.ADMIN,
      component: AdminView,
      meta: { requiresAuth: true },
    },
    {
      path: ROUTE_PATH.ADMIN_KILL_GAME,
      name: ROUTE_NAME.ADMIN_KILL_GAME,
      component: AdminKillGameView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAccepted = sessionStorage.getItem("isAccepted") === "true";
  if (to.meta.requiresConfirmation && !isAccepted) {
    sessionStorage.setItem("targetUrl", to.fullPath);
    next(ROUTE_PATH.CONFIRM);
  } else if (to.meta.requiresAuth && !isAuthenticated()) {
    next(ROUTE_PATH.NO_ACCESS);
  } else {
    sessionStorage.removeItem("isAccepted");
    next();
  }
});

function isAuthenticated() {
  return hasAccess(privTypes.adminPanel, useUserStore().user.permissions);
}

export default router;
