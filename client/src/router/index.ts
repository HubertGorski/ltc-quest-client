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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "router.home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "router.profile",
      component: ProfileView,
    },
    {
      path: "/tasks",
      name: "router.tasks",
      component: TasksView,
    },
    {
      path: "/tasks/:id",
      name: "router.tasksDetails",
      component: TasksDetailsView,
    },
    {
      path: "/ranking",
      name: "router.ranking",
      component: RankingView,
    },
    {
      path: "/bingo",
      name: "router.bingo",
      component: BingoView,
    },
    {
      path: "/settings",
      name: "router.settings",
      component: SettingsView,
    },
    {
      path: "/login",
      name: "router.login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "router.register",
      component: RegisterView,
    },
  ],
});

export default router;
