<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { KillGameCard } from "./models/KillGameCard";
import HubTooltip from "@/components/hubComponents/HubTooltip.vue";
import { computed } from "vue";

const { t } = useI18n();

const props = defineProps<{
  card: KillGameCard;
  isSelected: Boolean;
}>();

const infoIcon = computed(() => {
  const isAcquiredDirectlyIcon: infoIcon = {
    class: "text-grey-darken-2",
    icon: "mdi-card-account-details-outline",
    tooltipText: t("killGame.card.acquiredDirectly"),
    isVisible: props.card.isAcquiredDirectly,
  };
  const isAcquiredIndirectlyIcon: infoIcon = {
    class: "text-grey-darken-2",
    icon: "mdi-card-account-details-outline",
    tooltipText: `${t("killGame.card.acquiredIndirectly")} ${props.card.killerName}`,
    isVisible: props.card.isAcquiredIndirectly,
  };
  const xd = 'xd';
  const isExpectancyIcon: infoIcon = {
    class: "text-yellow-darken-3",
    icon: "mdi-clock-time-eight",
    tooltipText: t("isAwaitingConfirmation"),
    isVisible: props.card.isExpectancy,
  };
  return [
    isAcquiredDirectlyIcon,
    isAcquiredIndirectlyIcon,
    isExpectancyIcon,
  ].find((infoIcon) => infoIcon.isVisible);
});

interface infoIcon {
  class: string;
  icon: string;
  tooltipText: string;
  isVisible: boolean;
}
</script>

<template>
  <v-card class="mb-4" :class="{ 'bg-grey-lighten-5 elevation-1' : card.isInactive, 'elevation-3 scale-1' : card.isSelected, 'scale-098' : !card.isSelected}">
    <div>
      <div class="d-flex justify-space-between px-3 pt-2 pb-1">
        <v-card-title class="px-0 py-0">{{ card.targetPersonUserName }}</v-card-title>
        <hub-tooltip
          v-if="infoIcon"
          :class="infoIcon.class"
          :icon="infoIcon.icon"
          :tooltipText="infoIcon.tooltipText"
        />
      </div>
      <div class="d-flex justify-space-between">
        <v-card-subtitle class="px-3 py-0">{{
          $t("killGame.card.keyWord")
        }}</v-card-subtitle>
        <v-card-subtitle class="px-3 py-0">
          {{ $t("killGame.card.keyAction") }}
        </v-card-subtitle>
      </div>
      <div class="d-flex justify-space-between">
        <v-card-text class="xw-fit-content px-3 pt-0 pb-3">{{
          card.keyWord
        }}</v-card-text>
        <v-card-text class="xw-fit-content text-right px-3 pt-0 pb-3">{{
          card.keyAction
        }}</v-card-text>
      </div>
    </div>
  </v-card>
</template>
