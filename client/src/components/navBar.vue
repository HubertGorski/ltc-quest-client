<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { noSelectedTeam } from "@/models/Team";
import { useI18n } from "vue-i18n";
import { hasAccess, privTypes } from "@/managers/permissionsManager";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";
import { ROUTE_DICT, ROUTE_PATH, ROUTE_NAME } from "@/router/routeEnums";

const { t } = useI18n();
const userStore = useUserStore();
const currentUser = userStore.user;
const isOpenMenu = ref<boolean>(false);
const translatedRouteNames: { [key: string]: string } = {};
const route = useRoute();
const menuOptions = [
  { path: ROUTE_PATH.RANKING, label: ROUTE_DICT.RANKING },
  { path: ROUTE_PATH.TASKS, label: ROUTE_DICT.TASKS },
  { path: ROUTE_PATH.BINGO, label: ROUTE_DICT.BINGO },
  { path: ROUTE_PATH.KILL_GAME, label: ROUTE_DICT.KILL_GAME },
  { path: ROUTE_PATH.SETTINGS, label: ROUTE_DICT.SETTINGS },
];
const menuSpecialOptions = [{ path: ROUTE_PATH.LOGIN, label: "logout" }];

const closeMenu = () => {
  isOpenMenu.value = false;
};
const setTranslatedRouteNames = () => {
  router.getRoutes().forEach((element) => {
    if (!element.name) {
      return;
    }

    const name: string = element.name.toString();
    translatedRouteNames[name] = t(`router.${name}`);
  });
};
const backRoute = () => {
  return router.go(-1);
};
const goToAddPointsPanel = () => {
  return router.push("/addPoints");
};

const currentRouteName = computed(() =>
  route.name ? route.name.toString() : "",
);
const isVisibleCurrentRouteName = computed(() => {
  return !translatedRouteNames[currentRouteName.value]?.includes("router.");
});
const currentTranslatedRouteName = computed(() => {
  return translatedRouteNames[currentRouteName.value];
});
const isAddPointsView = computed(() => {
  return currentRouteName.value === ROUTE_NAME.ADD_POINTS;
});
const isTasksView = computed(() => {
  return currentRouteName.value === ROUTE_NAME.TASKS;
});
const hasAccessToAddTask = computed(() => {
  return hasAccess(privTypes.usingModTask, currentUser.permissions);
});
const addPointsButton = computed(() => {
  return {
    isVisible:
      (isTasksView.value || isAddPointsView.value) && hasAccessToAddTask.value,
    action: isAddPointsView.value
      ? () => backRoute()
      : () => goToAddPointsPanel(),
    icon: isAddPointsView.value ? "mdi-keyboard-backspace" : "$plus",
  };
});

setTranslatedRouteNames();
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
            <div v-if="isVisibleCurrentRouteName" class="d-flex align-center">
              <span>
                {{ currentTranslatedRouteName }}
              </span>
              <span class="text-body-1 font-italic px-1" v-if="isTasksView">
                {{
                  `(${currentUser.completedTasks}/${currentUser.totalTasks})`
                }}
              </span>
            </div>
          </v-toolbar-title>
          <v-btn
            v-if="addPointsButton.isVisible"
            @click="addPointsButton.action"
            :icon="addPointsButton.icon"
            class="text-h6"
          />
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
          <v-list-item v-for="menuOption in menuOptions" :key="menuOption.path">
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              :to="menuOption.path"
              >{{ $t(menuOption.label) }}</RouterLink
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="menuSpecialOption in menuSpecialOptions"
            :key="menuSpecialOption.path"
          >
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              :to="menuSpecialOption.path"
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
