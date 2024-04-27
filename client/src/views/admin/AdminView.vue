<script setup lang="ts">
import router from "@/router";
import { ROUTE_PATH } from "@/router/routeEnums";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const appModules: appModule[] = [
  {
    id: 1,
    name: "LTC Quest",
    icon: "mdi-application-outline",
    isActive: false,
    url: ''
  },
  { id: 2, name: "Kill Game", icon: "mdi-axe", isActive: true, url: ROUTE_PATH.ADMIN_KILL_GAME },
  {
    id: 3,
    name: "Cyborg Bingo",
    icon: "mdi-alpha-c-box-outline",
    isActive: false,
    url: ''
  },
  { id: 3, name: t("settings"), icon: "mdi-cog-outline", isActive: false, url: '' },
];

const goToSelectedPanel = (url: string) => {
  router.push(url);
}

interface appModule {
  id: number;
  name: string;
  icon: string;
  isActive: boolean;
  url: string;
}
</script>

<template>
  <div class="adminPanel">
    <div class="adminPanel_header text-grey-darken-3">
      {{t("admin.menu.manageApplicationModules")}}
    </div>
    <div class="adminPanel_menuItems">
      <div
        v-for="appModule in appModules"
        :key="appModule.id"
        class="menuItem"
        :class="[
          appModule.isActive
            ? 'elevation-3 text-grey-darken-3'
            : 'elevation-1 text-grey-darken-1 bg-grey-lighten-5',
        ]"
        @click="goToSelectedPanel(appModule.url)"
      >
        <v-icon class="menuItem_icon">{{ appModule.icon }}</v-icon>
        <span class="menuItem_name">{{ appModule.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adminPanel {
  &_header {
    text-align: center;
    font-size: 20px;
    padding-top: 16px;
  }

  &_menuItems {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 16px;

    .menuItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px;
      gap: 8px;

      &_icon {
        font-size: 36px;
      }
      &_name {
        font-size: 16px;
      }
    }
  }
}
</style>
