<script setup lang="ts">
import { ref } from "vue";
import KillGameAdminNotificationsPanel from "./KillGameAdminNotificationsPanel.vue";
import { adminKillGameNotifications } from "@/assets/data/notifications";
import { killersData, cardsData } from "@/assets/data/killGame";

const tabs = [
  { id: 0, title: "killGame.killCards" },
  { id: 1, title: "killGame.gamers" },
];
const selectedTab = ref<number>(tabs[0].id);

const headersKillersTable = ref([
  { title: "Imię", key: "killerName", sortable: true },
  { title: "Karty", key: "cardsOwned", align: "center", sortable: true },
  {
    title: "Zabójstwa",
    key: "killingsCommitted",
    align: "center",
    sortable: true,
  },
]);

const headersCardsTable = ref([
  { title: "Zabójca", key: "killerName" },
  { title: "Ofiara", key: "userName" },
  { title: "Akcja", key: "action" },
  { title: "Hasło", key: "word" },
]);

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
        <v-data-table
          :headers="headersCardsTable"
          :items="cardsData"
          class="mobile-table"
        >
        </v-data-table>
      </v-window-item>
      <v-window-item>
        <v-data-table
          :headers="headersKillersTable"
          :items="killersData"
          class="mobile-table"
        >
        </v-data-table>
      </v-window-item>
    </v-window>
    <kill-game-admin-notifications-panel :notifications="adminKillGameNotifications" />
  </div>
</template>

<style scoped>
.mobile-table .v-data-table__wrapper {
  overflow-x: auto;
}
.mobile-table .v-data-table__wrapper table {
  width: auto !important;
}
</style>
