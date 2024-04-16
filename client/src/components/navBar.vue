<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { noSelectedTeam } from "@/models/Team";
import { useI18n } from "vue-i18n";
import { hasAccess, privTypes } from "@/managers/permissionsManager";
import { useUserStore } from "@/stores/userStore";

const { t } = useI18n();
const userStore = useUserStore();
const currentUser = userStore.user;
const isOpenMenu = ref<boolean>(false);
const closeMenu = () => {
  isOpenMenu.value = false;
};

const translatedRouteNames: { [key: string]: string } = {
  home: t("router.home"),
  profile: t("router.profile"),
  tasks: t("router.tasks"),
  tasksDetails: t("router.tasksDetails"),
  ranking: t("router.ranking"),
  bingo: t("router.bingo"),
  settings: t("router.settings"),
  login: t("router.login"),
  register: t("router.register"),
  addPoints: t("router.addPoints"),
};
const route = useRoute();
const currentRouteName = computed(() =>
  route.name ? route.name.toString() : ""
);
const currentTranslatedRouteName = computed(() => {
  return translatedRouteNames[currentRouteName.value];
});
const isAddPointsView = computed(() => {
  return currentRouteName.value === 'addPoints';
});
const isTasksView = computed(() => {
  return currentRouteName.value === 'tasks';
});
const hasAccessToAddTask = computed(() => {
  return hasAccess(privTypes.usingModTask, currentUser.permissions);
});
</script>

<template>
  <div class="navBar_shadow"></div>
  <div class="navBar">
    <v-menu
      v-model="isOpenMenu"
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-toolbar :color="noSelectedTeam.color">
          <v-toolbar-title>
            <div class="d-flex align-center">
              <span>
                {{ currentTranslatedRouteName }}
              </span>
              <span
                class="text-body-1 font-italic px-1"
                v-if="isTasksView"
              >
                {{
                  `(${currentUser.completedTasks}/${currentUser.totalTasks})`
                }}
              </span>
            </div>
          </v-toolbar-title>
            <v-btn v-if="(isTasksView || isAddPointsView) && hasAccessToAddTask" @click="isAddPointsView ? $router.go(-1) : $router.push('/addPoints')" :icon="isAddPointsView ? 'mdi-keyboard-backspace': '$plus'" class="text-h6" />
          <v-btn class="mx-2 px-0" v-bind="props">
            <v-icon size="32">mdi-menu</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <v-card center max-width="270">
        <v-list>
          <RouterLink
            class="text-decoration-none text-grey-darken-2"
            @click="closeMenu"
            to="/profile"
          >
            <v-list-item
              :prepend-avatar="currentUser.avatar"
              :subtitle="currentUser.teamName"
              :title="currentUser.name"
            >
              <template v-slot:append>
                <v-icon>{{ currentUser.teamLogo }}</v-icon>
              </template>
            </v-list-item>
          </RouterLink>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/ranking"
              >{{ $t("router.ranking") }}</RouterLink
            >
          </v-list-item>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/tasks"
              >{{ $t("router.tasks") }}</RouterLink
            >
          </v-list-item>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/bingo"
              >{{ $t("router.bingo") }}</RouterLink
            >
          </v-list-item>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/settings"
              >{{ $t("router.settings") }}</RouterLink
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/login"
              >{{ $t("logout") }}</RouterLink
            >
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.navBar_shadow {
  height: 64px;
}
.navBar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>
