<script setup lang="ts">
import { notifications } from "@/assets/data/notifications";
import { computed } from "vue";
import { ref } from "vue";
import HubSupportBtn from "@/components/hubComponents/HubSupportBtn.vue";
import { noSelectedTeam } from "@/models/Team";
import {
  KILL_GAME_INFO_TYPE,
  Notification,
  type KillGameData,
} from "@/models/Notification";
import { format } from "date-fns";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const tabs = [
  { id: 0, title: "killGame.killCards" },
  { id: 1, title: "killGame.gamers" },
];

const selectedTab = ref<number>(tabs[0].id);
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

const getNotificationIcon = (notification: Notification) => {
  if (
    notification.data.infoType === KILL_GAME_INFO_TYPE.REJECTED &&
    notification.displayed
  ) {
    return {
      icon: "mdi-alert-circle",
      color: "text-red-accent-4",
    };
  }

  if (
    notification.data.infoType === KILL_GAME_INFO_TYPE.EXPECTANCY &&
    notification.displayed
  ) {
    return {
      icon: "mdi-clock-time-eight",
      color: "text-yellow-darken-3",
    };
  }

  return {
    icon: "mdi-check",
    color: "text-grey-darken-3",
  };
};

const getNotificationMessage = (data: KillGameData) => {
  return data.infoType === KILL_GAME_INFO_TYPE.EXPECTANCY
    ? `${data.killer} ${t("killGame.notifications.expectancy")} ${data.user}`
    : `${data.user} ${t("killGame.notifications.rejected")} ${data.killer}`;
};

const displayAllNotifications = () => {
  console.log("wyslanie do bazy ze wyeswietlono wszystkie info");
  actualNotifications.value.forEach((notification) => {
    notification.displayed = true;
  });
};
const displayNotification = (notification: Notification) => {
  console.log("wyslanie do bazy ze wyeswietlono podana notification");
  console.log(notification.id);
};
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
          <div
            v-for="notification in actualNotifications"
            :key="notification.id"
          >
            <v-divider></v-divider>
            <div
              class="notification"
              :class="{ newNotification: !notification.displayed }"
            >
              <div class="notification_info">
                <p class="font-italic text-body-2">
                  {{ format(notification.date, "dd/MM/yyyy hh:mm") }}
                </p>
                {{ getNotificationMessage(notification.data) }}
              </div>
              <v-btn
                variant="text"
                class="notification_btn"
                :class="getNotificationIcon(notification).color"
                @click="notification.displayed = true"
              >
                <v-icon class="mdi mdi-24px">{{
                  getNotificationIcon(notification).icon
                }}</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-menu>
  </div>
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
.notification {
  display: flex;
  align-items: center;
  padding: 8px 16px;

  &.newNotification {
    font-weight: 600;
  }

  .notification_info {
    width: 210px;
  }
}
.notification_btn {
  min-height: 32px;
  min-width: 32px;
  height: 42px;
  width: 42px;
}
</style>
