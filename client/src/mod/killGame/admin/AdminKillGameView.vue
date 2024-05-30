<script setup lang="ts">
import { ref } from "vue";
import KillGameAdminNotificationsPanel from "./KillGameAdminNotificationsPanel.vue";
import { adminKillGameNotifications } from "@/assets/data/notifications";
import { killersData, cardsData } from "@/assets/data/killGame";
import KillGameAdminKillers from "./KillGameAdminKillers.vue";
import KillGameAdminCards from "./KillGameAdminCards.vue";
import { users } from "@/assets/data/users";

const tabs = [
  { id: 0, title: "killGame.killCards" },
  { id: 1, title: "killGame.players" },
];
const selectedTab = ref<number>(tabs[0].id);
</script>

<template>
  <div>
    <v-tabs v-model="selectedTab" fixed-tabs>
      <v-tab v-for="tab in tabs" :key="tab.id" :value="tab.id">{{
        $t(tab.title)
      }}</v-tab>
    </v-tabs>
    <v-window v-model="selectedTab">
      <v-window-item>
        <kill-game-admin-cards :cards="cardsData" :users="users" />
      </v-window-item>
      <v-window-item>
        <kill-game-admin-killers :killers="killersData" />
      </v-window-item>
    </v-window>
    <kill-game-admin-notifications-panel
      :notifications="adminKillGameNotifications"
    />
  </div>
</template>
