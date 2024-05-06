<script setup lang="ts">
import { notifications } from "@/assets/data/notifications";
import { computed } from "vue";
import { ref } from "vue";
import HubSupportBtn from "@/components/hubComponents/HubSupportBtn.vue";
import { Notification } from "@/models/Notification";

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

const notificationIcon = computed(() => {
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
        <hub-support-btn v-bind="props" :icon="notificationIcon" />
      </template>
      <v-card center>
        <v-btn @click="displayAllNotifications">Odczytaj wszystkie</v-btn>
        <div>
          <div
            v-for="notification in actualNotifications"
            :key="notification.id"
          >
            {{ notification.data }}
            {{ notification.displayed }}
          </div>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
