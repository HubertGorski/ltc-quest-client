<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
import HubSupportBtn from "@/components/hubComponents/HubSupportBtn.vue";
import KillGameAdminNotificationPanel from "./KillGameAdminNotificationPanel.vue";
import KillGameAdminHeaderPanel from "./KillGameAdminHeaderPanel.vue";
import { KillGameAdminNotification } from "@/models/notifications/KillGameNotification";

const props = defineProps({
  notifications: {
    type: Array<KillGameAdminNotification>,
    required: true,
  },
});

const isOpenNotificationsPanel = ref<boolean>(false);
const actualNotifications = ref<KillGameAdminNotification[]>(props.notifications);

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
      <kill-game-admin-header-panel
        v-model="isOpenNotificationsPanel"
        :isNewNotification="isNewNotification"
        :notificationsCounter="actualNotifications.length"
        :action="displayAllNotifications"
      />
      <div class="notifications">
        <div v-for="notification in actualNotifications" :key="notification.id">
          <v-divider></v-divider>
          <kill-game-admin-notification-panel :notification="notification" />
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
</style>
