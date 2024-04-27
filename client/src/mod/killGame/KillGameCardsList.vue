<script setup lang="ts">
import type { KillGameCard } from "./models/KillGameCard";
import KillGameKillCard from "./KillGameKillCard.vue";

const props = defineProps<{
  cards: KillGameCard[];
}>();

const inactiveCards = props.cards.filter((card) => card.isInactive);
const activeCards = props.cards.filter(
  (card) => card.isActive || card.isExpectancy
);
</script>

<template>
  <div class="pt-3 pb-2 text-center font-18">
    {{ $t("killGame.activeOrders") }}
  </div>
  <kill-game-kill-card
    v-for="card in activeCards"
    :key="card.cardId"
    :card="card"
  />
  <div v-if="inactiveCards.length > 0">
    <v-divider />
    <div class="pt-3 pb-2 text-center font-18">
      {{ $t("killGame.cardsGained") }}
    </div>
    <kill-game-kill-card
      v-for="card in inactiveCards"
      :key="card.cardId"
      :card="card"
    />
  </div>
</template>
