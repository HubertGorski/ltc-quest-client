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
      name: "Strona główna",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "Profil",
      component: ProfileView,
    },
    {
      path: "/tasks",
      name: "Zadania",
      component: TasksView,
    },
    {
      path: "/tasks/:id",
      name: "Szczegóły zadania",
      component: TasksDetailsView,
    },
    {
      path: "/ranking",
      name: "Ranking",
      component: RankingView,
    },
    {
      path: "/bingo",
      name: "Cyborg bingo",
      component: BingoView,
    },
    {
      path: "/settings",
      name: "Ustawienia konta",
      component: SettingsView,
    },
    {
      path: "/login",
      name: "Logowanie",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Rejestracja",
      component: RegisterView,
    },
  ],
});

export default router;
