<script setup lang="ts">
import { notifications } from "@/assets/data/notifications";
import { computed } from "vue";
import { ref } from "vue";
import HubSupportBtn from "@/components/hubComponents/HubSupportBtn.vue";
import { noSelectedTeam } from "@/models/Team";
import { Notification } from "@/models/Notification";
import KillGameAdminNotification from "./KillGameAdminNotification.vue";

const isOpenNotificationsPanel = ref<boolean>(false);
const actualNotifications = ref<Notification[]>(notifications);

const isNewNotification = computed(() => {
  return actualNotifications.value.some(
    (notification) => !notification.displayed
  );
});

const notificationsIcon = computed(() => {
  return isNewNotification.value
    ? "mdi-bell-alert-outline"
    : "mdi-bell-outline";
});

const displayAllNotifications = () => {
  console.log("wyslanie do bazy ze wyeswietlono wszystkie info");
  actualNotifications.value.forEach((notification) => {
    notification.displayed = true;
  });
};
</script>

<template>
  <v-menu
    v-model="isOpenNotificationsPanel"
    :close-on-content-click="false"
    location="top"
  >
    <template v-slot:activator="{ props }">
      <hub-support-btn v-bind="props" :icon="notificationsIcon" />
    </template>
    <v-card center>
      <div class="notificationsHeader" :class="`bg-${noSelectedTeam.color}`">
        <v-card-title @click="isOpenNotificationsPanel = false">{{
          $t("notifications")
        }}</v-card-title>
        <v-btn
          v-if="isNewNotification"
          @click="displayAllNotifications"
          variant="text"
          class="notification_btn"
        >
          <v-icon class="mdi mdi-24px">mdi-check</v-icon>
        </v-btn>
        <div v-else class="pr-4">{{ actualNotifications.length }}</div>
      </div>
      <div class="notifications">
        <div v-for="notification in actualNotifications" :key="notification.id">
          <v-divider></v-divider>
          <kill-game-admin-notification :notification="notification" />
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<style scoped lang="scss">
.notifications {
  max-height: 380px;
  overflow-y: scroll;
}
.notificationsHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;

  .v-card-title {
    flex-grow: 1;
  }
}
</style>
