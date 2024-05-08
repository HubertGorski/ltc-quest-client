<script setup lang="ts">
import { KILL_GAME_INFO_TYPE, KillGameNotification, type KillGameData } from "@/models/notifications/KillGameNotification";
import { format } from "date-fns";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  notification: {
    type: KillGameNotification,
    required: true,
  },
});

const notificationIconMap: { [key in KILL_GAME_INFO_TYPE]: IconInfo } = {
  [KILL_GAME_INFO_TYPE.REJECTED]: {
    icon: "mdi-alert-circle",
    color: "text-red-accent-4",
  },
  [KILL_GAME_INFO_TYPE.EXPECTANCY]: {
    icon: "mdi-clock-time-eight",
    color: "text-yellow-darken-3",
  },
};

const displayIconInfo: IconInfo = {
  icon: "mdi-check",
  color: "text-grey-darken-3",
};

const getNotificationIcon = (notification: KillGameNotification): IconInfo => {
  const type = notification.data.infoType;
  const displayed = notification.displayed;
  const iconInfo = notificationIconMap[type] || displayIconInfo;
  if (displayed) {
    return iconInfo;
  } else {
    return displayIconInfo;
  }
};

const getNotificationMessage = (data: KillGameData) => {
  return data.infoType === KILL_GAME_INFO_TYPE.EXPECTANCY
    ? `${data.killer} ${t("killGame.notifications.expectancy")} ${data.user}`
    : `${data.user} ${t("killGame.notifications.rejected")} ${data.killer}`;
};

const displayNotification = (notification: KillGameNotification) => {
  console.log("wyslanie do bazy ze wyeswietlono podana notification");
  console.log(notification.id);
  notification.displayed = true;
};

interface IconInfo {
  icon: string;
  color: string;
}
</script>

<template>
  <div
    class="notification"
    :class="{ newNotification: !notification.displayed }"
  >
    <div class="notification_info">
      <p class="date">
        {{ format(notification.date, "dd/MM/yyyy hh:mm") }}
      </p>
      <p class="message">
        {{ getNotificationMessage(notification.data) }}
      </p>
    </div>
    <v-btn
      variant="text"
      class="notification_btn"
      :class="getNotificationIcon(notification).color"
      @click="displayNotification(notification)"
    >
      <v-icon class="mdi mdi-24px">{{
        getNotificationIcon(notification).icon
      }}</v-icon>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.notification {
  display: flex;
  align-items: center;
  padding: 8px 16px;

  &.newNotification {
    font-weight: 600;
  }

  &_info {
    width: 210px;

    .date {
      font-style: italic;
      font-size: 14px;
    }
    .message {
      font-size: 16px;
    }
  }

  &_btn {
    min-height: 32px;
    min-width: 32px;
    height: 42px;
    width: 42px;
  }
}
</style>
