<script setup lang="ts">
import { ref } from "vue";
import { users } from "@/assets/data/users";
import HubPopup from "@/components/hubComponents/HubPopup.vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";

interface KillGameStatus {
  id: number;
  icon: string;
  color: string;
  text: string;
  status: KILL_GAME_STATUS;
  actionBtns: PopupSettings[];
}

interface PopupSettings {
  id: number;
  textBtn: string;
  popupTitle: string;
  popupText: string;
  action: Function;
}

interface SummaryPanel {
  id: number;
  icon: string;
  isTooltipActive: Ref<boolean>;
  tooltipText: string;
  value: Ref<number>;
}

enum KILL_GAME_STATUS {
  ALIVE = "alive",
  UNCERTAIN = "uncertain",
  DEAD = "dead",
  NEUTRAL = "neutral",
}

const { t } = useI18n();

const sendKillRequest = () => {
  console.log('Wyslalem zapytanie o zabicie');
}

const rejectStatus = () => {
  console.log('Odrzuciłem wniosek o mój zgon');
}

const acceptStatus = () => {
  console.log('Prawda to. Umarłem.');
}

const sendReport = () => {
  console.log('Panie admin. Czemu nie gram?');
}

const summaryPanel: SummaryPanel[] = [
  {
    id: 1,
    icon: "mdi-cards-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.cardsOwned"),
    value: ref(7),
  },
  {
    id: 2,
    icon: "mdi-account-remove-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.killingsCommitted"),
    value: ref(3),
  },
  {
    id: 3,
    icon: "mdi-account-heart-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.usersAlive"),
    value: ref(12),
  },
];

const statusBox: KillGameStatus[] = [
  {
    id: 1,
    icon: "mdi-emoticon-cool-outline",
    color: "text-grey-darken-3",
    text: t("killGame.killGameStatus.youAreAlive"),
    status: KILL_GAME_STATUS.ALIVE,
    actionBtns: [
      {
        id: 1,
        textBtn: "killGame.killHim",
        popupTitle: "killGame.aliveStatus.title",
        popupText: "killGame.aliveStatus.text",
        action: sendKillRequest
      }
    ]
  },
  {
    id: 2,
    icon: "mdi-emoticon-frown-outline",
    color: "text-grey-darken-3",
    text: `${users[1].name} ${t("killGame.killGameStatus.waitingForConfirmation")}`,
    status: KILL_GAME_STATUS.UNCERTAIN,
    actionBtns: [
      {
        id: 1,
        textBtn: "cancel",
        popupTitle: "killGame.rejectStatus.title",
        popupText: "killGame.rejectStatus.text",
        action: rejectStatus
      },
      {
        id: 2,
        textBtn: "confirm",
        popupTitle: "killGame.acceptStatus.title",
        popupText: "killGame.acceptStatus.text",
        action: acceptStatus
      },
    ]
  },
  {
    id: 3,
    icon: "mdi-emoticon-dead-outline",
    color: "text-grey-darken-3",
    text: `${t("killGame.killGameStatus.youAreDead")} ${users[1].name}`,
    status: KILL_GAME_STATUS.DEAD,
    actionBtns: []
  },
  {
    id: 4,
    icon: "mdi-emoticon-neutral-outline",
    color: "text-grey-darken-3",
    text: t("killGame.killGameStatus.notInGame"),
    status: KILL_GAME_STATUS.NEUTRAL,
    actionBtns: [
      {
        id: 1,
        textBtn: "sendReport",
        popupTitle: "killGame.notInGameStatus.title",
        popupText: "killGame.notInGameStatus.text",
        action: sendReport
      }
    ]
  },
];

const actualStatus: KillGameStatus =
  statusBox.find(
    (statusBox) => statusBox.status === KILL_GAME_STATUS.ALIVE,
  ) || statusBox[4];
</script>

<template>
  <div class="killGamePanel text-grey-darken-3">
    <div class="killGamePanel_header">
      <v-card class="px-2 py-2 text-grey-darken-2">
        <v-icon>mdi-information-variant</v-icon>
      </v-card>
      <v-card class="summaryPanel text-grey-darken-2">
        <div v-for="tab in summaryPanel" :key="tab.id" class="summaryPanel_tab">
          <v-tooltip v-model="tab.isTooltipActive.value" location="top" class="custom-tooltip">
            <template v-slot:activator="{ props }">
              <v-icon @click="tab.isTooltipActive.value = !tab.isTooltipActive.value" v-bind="props">{{ tab.icon
                }}</v-icon>
            </template>
            <span>{{ tab.tooltipText }}</span>
          </v-tooltip>
          <div>{{ tab.value.value }}</div>
        </div>
      </v-card>
    </div>
    <div>
      <div class="statusBox" :class="actualStatus.color">
        <v-icon class="statusBox_icon">{{ actualStatus.icon }}</v-icon>
        <span class="statusBox_text">{{ actualStatus.text }}</span>
      </div>
    </div>
    <v-divider />
    <div class="confirmStatus">
      <hub-popup v-for="actionBtn in actualStatus.actionBtns" :key="actionBtn.id" :text="actionBtn.popupText"
        :title="actionBtn.popupTitle" :action="actionBtn.action" class="confirmStatus_btn">
        <v-btn variant="text" class="confirmStatus_btn-content">{{
          $t(actionBtn.textBtn)
          }}</v-btn>
      </hub-popup>
    </div>
    <v-divider v-if="actualStatus.actionBtns.length > 0" />
  </div>
</template>

<style lang="scss" scoped>
.killGamePanel {
  padding: 12px;

  &_header {
    display: flex;
    justify-content: space-between;
  }
}

.summaryPanel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 4px;
  width: min-content;

  &_tab {
    display: flex;
    padding: 4px;
    align-items: center;
    gap: 4px;
  }
}

.statusBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;

  &_icon {
    font-size: 68px;
  }

  &_text {
    text-align: center;
    padding-top: 16px;
  }
}

.confirmStatus {
  display: flex;
  padding: 6px;
  gap: 6px;

  &_btn {
    flex-basis: 0;
    flex-grow: 1;

    &-content {
      width: 100%;
    }
  }
}
</style>
