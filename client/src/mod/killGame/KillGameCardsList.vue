<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { KillGameCard } from "./models/KillGameCard";
import HubIconWithTooltip from "@/components/hubComponents/HubIconWithTooltip.vue";

const { t } = useI18n();

const props = defineProps<{
  cards: KillGameCard[];
}>();

const acquiredIndirectly = (card: KillGameCard) =>
  `${t("killGame.card.acquiredIndirectly")} ${card.killerName}`;
</script>

<template>
  <div v-for="(card, index) in cards" :key="card.cardId">
    <v-card class="my-4 elevation-5">
      <div>
        <div class="d-flex justify-space-between px-3 pt-2 pb-1">
          <v-card-title class="px-0 py-0">{{ card.userName }}</v-card-title>
          <hub-icon-with-tooltip
            v-if="card.isAcquiredDirectly"
            class="text-grey-darken-2"
            icon="mdi-card-account-details-outline"
            tooltipText="killGame.card.acquiredDirectly"
          />
          <hub-icon-with-tooltip
            v-if="card.isAcquiredIndirectly"
            class="text-grey-darken-2"
            icon="mdi-card-account-details-outline"
            :tooltipText="acquiredIndirectly(card)"
          />
          <hub-icon-with-tooltip
            v-if="card.isExpectancy"
            class="text-yellow-accent-4"
            icon="mdi-clock-time-eight"
            tooltipText="isAwaitingConfirmation"
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
    <v-divider v-if="index === 0"></v-divider>
  </div>
</template>
