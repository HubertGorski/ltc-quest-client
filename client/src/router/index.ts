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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksView,
    },
    {
      path: "/tasks/:id",
      name: "tasksDetails",
      component: TasksDetailsView,
    },
    {
      path: "/ranking",
      name: "ranking",
      component: RankingView,
    },
    {
      path: "/bingo",
      name: "bingo",
      component: BingoView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/addPoints",
      name: "addPoints",
      component: AddPointsView,
    },
  ],
});

export default router;
