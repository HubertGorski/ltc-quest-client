<script setup lang="ts">
import {
  KILL_GAME_USER_INFO_TYPE,
  type KillGameUserNotification,
} from "@/models/notifications/KillGameNotification";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  notifications: {
    type: Array<KillGameUserNotification>,
    required: true,
  },
});

const notifications = ref(props.notifications);

const isNewNotification = computed((): boolean => {
  return notifications.value.length > 0;
});
const isNewMultiNotification = computed((): boolean => {
  return notifications.value.length > 1;
});

const actualNotification = ref<number>(0);

const getMessageNotification = (
  notification: KillGameUserNotification
): string => {
  return notification.data.infoType === KILL_GAME_USER_INFO_TYPE.REJECTED
    ? `${notification.data.user} ${t("killGame.notifications.userRejected")}`
    : `${t("killGame.notifications.userKillPart1")} ${notification.data.user}${t("killGame.notifications.userKillPart2")} ${notification.data.newCards} ${t("killGame.notifications.userKillPart3")}`;
};

const displayNotification = () => {
  notifications.value.splice(actualNotification.value, 1);
  if (actualNotification.value > 0) {
    actualNotification.value--;
  }
};

const displayAllNotifications = () => {
  notifications.value = [];
};
</script>

<template>
  <div v-if="isNewNotification" class="kill-game-user-notification-popup">
    <div
      class="kill-game-user-notification-popup_bg bg-blue-grey-lighten-5"
    ></div>
    <div class="kill-game-user-notification-popup_content">
      <div v-if="isNewMultiNotification" class="pagination">
        <v-card class="pagination_counter">
          {{ notifications.length }}
        </v-card>
        <div class="pagination_selectBtns">
          <v-btn
            @click="actualNotification--"
            :disabled="actualNotification === 0"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            @click="actualNotification++"
            :disabled="actualNotification === notifications.length - 1"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
      <div
        v-for="(notification, index) in notifications"
        :key="notification.id"
      >
        <v-card v-if="index === actualNotification" class="info">
          <v-card-title
            >{{ $t("killGame.notifications.hi") }}
            {{ notification.data.owner }}</v-card-title
          >
          <v-card-text>{{ getMessageNotification(notification) }}</v-card-text>
        </v-card>
      </div>
      <div class="confirmBtns">
        <v-btn v-if="isNewMultiNotification" @click="displayAllNotifications"
          >Potwierdź wszystkie</v-btn
        >
        <v-btn class="confirmBtns_confirmBtn" @click="displayNotification"
          >Potwierdź</v-btn
        >
      </div>
    </div>
  </div>
  <div
    :class="{ 'kill-game-user-notification-popup_disabled': isNewNotification }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.kill-game-user-notification-popup {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  &_bg {
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }

  &_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 320px;

    .pagination {
      display: flex;
      justify-content: space-between;
      width: 100%;

      &_counter {
        height: 36px;
        width: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
      }

      &_selectBtns {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding-bottom: 8px;
        width: 100%;
      }
    }

    .info {
      padding: 16px;
      margin-bottom: 8px;
    }

    .confirmBtns {
      display: flex;
      gap: 8px;
      width: 100%;

      &_confirmBtn {
        flex-grow: 1;
      }
    }
  }

  &_disabled {
    pointer-events: none;
    filter: blur(2px);
  }
}
</style>
