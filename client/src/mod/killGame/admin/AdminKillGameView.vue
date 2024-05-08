<script setup lang="ts">
import { ref } from "vue";
import KillGameAdminNotificationsPanel from "./KillGameAdminNotificationsPanel.vue";

const tabs = [
  { id: 0, title: "killGame.killCards" },
  { id: 1, title: "killGame.gamers" },
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
        {{ selectedTab }}
      </v-window-item>
      <v-window-item>
        {{ selectedTab }}
      </v-window-item>
    </v-window>
    <kill-game-admin-notifications-panel />
  </div>
</template>