<script setup lang="ts">
import { ref } from "vue";
import { users } from "@/assets/data/users";
import HubPopup from "@/components/hubComponents/HubPopup.vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface KillGameStatus {
  id: number;
  icon: string;
  color: string;
  text: string;
  status: KILL_GAME_STATUS;
}

interface SummaryPanel {
  id: number;
  icon: string;
  isTooltipActive: Ref<boolean>;
  tooltipText: string;
  value: number;
}

enum KILL_GAME_STATUS {
  ALIVE = "alive",
  UNCERTAIN = "uncertain",
  DEAD = "dead",
  NEUTRAL = "neutral",
}

const summaryPanel: SummaryPanel[] = [
  {
    id: 1,
    icon: "mdi-cards-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.cardsOwned"),
    value: 7,
  },
  {
    id: 2,
    icon: "mdi-account-remove-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.killingsCommitted"),
    value: 3,
  },
  {
    id: 3,
    icon: "mdi-account-heart-outline",
    isTooltipActive: ref(false),
    tooltipText: t("killGame.summaryPanel.usersAlive"),
    value: 12,
  },
];

const statusBox: KillGameStatus[] = [
  {
    id: 1,
    icon: "mdi-emoticon-cool-outline",
    color: "text-grey-darken-3",
    text: t("killGame.killGameStatus.youAreAlive"),
    status: KILL_GAME_STATUS.ALIVE,
  },
  {
    id: 2,
    icon: "mdi-emoticon-frown-outline",
    color: "text-grey-darken-3",
    text: `${users[1].name} ${t("killGame.killGameStatus.waitingForConfirmation")}`,
    status: KILL_GAME_STATUS.UNCERTAIN,
  },
  {
    id: 3,
    icon: "mdi-emoticon-dead-outline",
    color: "text-grey-darken-3",
    text: `${t("killGame.killGameStatus.youAreDead")} ${users[1].name}`,
    status: KILL_GAME_STATUS.DEAD,
  },
  {
    id: 4,
    icon: "mdi-emoticon-neutral-outline",
    color: "text-grey-darken-3",
    text: t("killGame.killGameStatus.notInGame"),
    status: KILL_GAME_STATUS.NEUTRAL,
  },
];

const actualStatus: KillGameStatus =
  statusBox.find(
    (statusBox) => statusBox.status === KILL_GAME_STATUS.UNCERTAIN,
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
          <v-tooltip
            v-model="tab.isTooltipActive.value"
            location="top"
            class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <v-icon
                @click="tab.isTooltipActive.value = !tab.isTooltipActive.value"
                v-bind="props"
                >{{ tab.icon }}</v-icon
              >
            </template>
            <span>{{ tab.tooltipText }}</span>
          </v-tooltip>
          <div>{{ tab.value }}</div>
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
    <div v-if="actualStatus.status === KILL_GAME_STATUS.UNCERTAIN">
      <div class="confirmStatus">
        <hub-popup
          class="confirmStatus_btn"
          text="killGame.declineStatus.text"
          title="killGame.declineStatus.title"
        >
          <v-btn variant="text" class="confirmStatus_btn-content">{{
            $t("cancel")
          }}</v-btn>
        </hub-popup>
        <hub-popup
          class="confirmStatus_btn"
          text="killGame.acceptStatus.text"
          title="killGame.acceptStatus.title"
        >
          <v-btn variant="text" class="confirmStatus_btn-content">{{
            $t("confirm")
          }}</v-btn>
        </hub-popup>
      </div>
      <v-divider />
    </div>
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
