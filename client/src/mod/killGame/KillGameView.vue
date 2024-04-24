<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import { users } from "@/assets/data/users";
import { useI18n } from "vue-i18n";
import type { TabSummaryPanel } from "@/components/hubComponents/HubSummaryPanel.vue";
import HubSummaryPanel from "@/components/hubComponents/HubSummaryPanel.vue";
import type { KillGameStatus } from "./KillGameStatusPanel.vue";
import { KILL_GAME_USER_STATUS } from "./models/KillGameUser";
import { killGameData } from "@/assets/data/killGame";
import KillGameStatusPanel from "./KillGameStatusPanel.vue";
import { reactive } from "vue";

const { t } = useI18n();

const sendKillRequest = () => {
  console.log("Wyslalem zapytanie o zabicie");
};

const rejectStatus = () => {
  console.log("Odrzuciłem wniosek o mój zgon");
  actualStatus.value = statusBox.find(
    (status) => status.status === KILL_GAME_USER_STATUS.ALIVE,
  )!;
};

const acceptStatus = () => {
  console.log("Prawda to. Umarłem.");
  summaryPanelData.cardsOwned.value = 0;
  summaryPanelData.usersAlive.value--;
  
  actualStatus.value = statusBox.find(
    (status) => status.status === KILL_GAME_USER_STATUS.DEAD,
  )!;
};

const sendReport = () => {
  console.log("Panie admin. Czemu nie gram?");
};

const killerName = computed(() => {
  return killGameData.user.killerId
    ? users[killGameData.user.killerId].name
    : "";
});

const summaryPanelData = {
  cardsOwned: ref(killGameData.user.cardsOwned),
  killingsCommitted: ref(killGameData.user.killingsCommitted),
  usersAlive: ref(killGameData.usersAlive),
};

const summaryPanel: TabSummaryPanel[] = [
  {
    id: 1,
    icon: "mdi-cards-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.cardsOwned"),
    value: summaryPanelData.cardsOwned,
  },
  {
    id: 2,
    icon: "mdi-account-remove-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.killingsCommitted"),
    value: summaryPanelData.killingsCommitted,
  },
  {
    id: 3,
    icon: "mdi-account-heart-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.usersAlive"),
    value: summaryPanelData.usersAlive,
  },
];

const statusBox: KillGameStatus[] = [
  {
    id: 1,
    icon: "mdi-emoticon-cool-outline",
    color: "text-grey-darken-3",
    text: t("killGame.killGameStatus.youAreAlive"),
    status: KILL_GAME_USER_STATUS.ALIVE,
    actionBtns: [
      {
        id: 1,
        textBtn: "killGame.killHim",
        popupTitle: "killGame.aliveStatus.title",
        popupText: "killGame.aliveStatus.text",
        action: sendKillRequest,
      },
    ],
  },
  {
    id: 2,
    icon: "mdi-emoticon-frown-outline",
    color: "text-grey-darken-3",
    text: `${killerName.value} ${t("killGame.killGameStatus.waitingForConfirmation")}`,
    status: KILL_GAME_USER_STATUS.UNCERTAIN,
    actionBtns: [
      {
        id: 1,
        textBtn: "cancel",
        popupTitle: "killGame.rejectStatus.title",
        popupText: "killGame.rejectStatus.text",
        action: rejectStatus,
      },
      {
        id: 2,
        textBtn: "confirm",
        popupTitle: "killGame.acceptStatus.title",
        popupText: "killGame.acceptStatus.text",
        action: acceptStatus,
      },
    ],
  },
  {
    id: 3,
    icon: "mdi-emoticon-dead-outline",
    color: "text-grey-darken-3",
    text: `${t("killGame.killGameStatus.youAreDead")} ${killerName.value}`,
    status: KILL_GAME_USER_STATUS.DEAD,
    actionBtns: [],
  },
  {
    id: 4,
    icon: "mdi-emoticon-neutral-outline",
    color: "text-grey-darken-3",
    text: t("killGame.killGameStatus.notInGame"),
    status: KILL_GAME_USER_STATUS.NEUTRAL,
    actionBtns: [
      {
        id: 1,
        textBtn: "sendReport",
        popupTitle: "killGame.notInGameStatus.title",
        popupText: "killGame.notInGameStatus.text",
        action: sendReport,
      },
    ],
  },
];
const actualStatus: Ref<KillGameStatus> = ref(
  statusBox.find(
    (statusBox) => statusBox.status === killGameData.user.status,
  ) || statusBox[4],
);
</script>

<template>
  <div class="px-3 py-3 text-grey-darken-3">
    <div class="d-flex justify-space-between">
      <v-card class="px-2 py-2 text-grey-darken-2">
        <v-icon>mdi-information-variant</v-icon>
      </v-card>
      <hub-summary-panel :summaryPanel="summaryPanel" />
    </div>
    <kill-game-status-panel :actualStatus="actualStatus" />
  </div>
</template>
