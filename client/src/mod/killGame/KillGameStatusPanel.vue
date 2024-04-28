<script setup lang="ts">
import { computed } from "vue";
import type { KillGameCard } from "./models/KillGameCard";
import { KILL_GAME_USER_STATUS } from "./models/KillGameUser";
import HubPopup from "@/components/hubComponents/HubPopup.vue";

interface PopupSettings {
  id: number;
  textBtn: string;
  popupTitle: string;
  popupText: string;
  action: Function;
}

export interface KillGameStatus {
  id: number;
  icon: string;
  color: string;
  text: string;
  status: KILL_GAME_USER_STATUS;
  actionBtns: PopupSettings[];
}

const props = defineProps<{
  actualStatus: KillGameStatus;
  selectedCard: KillGameCard | null;
}>();

const isExpectancyBtn = computed(() => {
  return (
    props.selectedCard?.isExpectancy &&
    props.actualStatus.status === KILL_GAME_USER_STATUS.ALIVE
  );
});
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="actualStatus.id" class="status" :class="actualStatus.color">
        <v-icon class="status_icon">{{ actualStatus.icon }}</v-icon>
        <span class="status_text">{{ actualStatus.text }}</span>
      </div>
    </Transition>
    <v-divider />
    <Transition name="fade" mode="out-in">
      <div :key="actualStatus.id" class="confirmStatus">
        <hub-popup
          v-for="actionBtn in actualStatus.actionBtns"
          :key="actionBtn.id"
          :text="actionBtn.popupText"
          :title="actionBtn.popupTitle"
          :action="actionBtn.action"
          :disabled="isExpectancyBtn"
          class="confirmStatus_btn"
        >
          <v-btn
            v-if="isExpectancyBtn"
            variant="text"
            class="confirmStatus_btn-content"
            >{{ $t("killGame.cardExpectancy") }}</v-btn
          >
          <v-btn v-else variant="text" class="confirmStatus_btn-content">{{
            $t(actionBtn.textBtn)
          }}</v-btn>
        </hub-popup>
      </div>
    </Transition>
    <v-divider v-if="actualStatus.actionBtns.length > 0" />
  </div>
</template>

<style lang="scss" scoped>
.status {
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
  gap: 6px;

  &_btn {
    flex-basis: 0;
    flex-grow: 1;

    &-content {
      padding: 12px;
      height: auto;
      width: 100%;
    }
  }
}
</style>
