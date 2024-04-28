<script setup lang="ts">
import type { KillGameCard } from "./models/KillGameCard";
import KillGameKillCard from "./KillGameKillCard.vue";
import { ref } from "vue";

const props = defineProps<{
  cards: KillGameCard[];
}>();

const emit = defineEmits<{
  (e: "selectCard", value: KillGameCard): void;
}>();

const inactiveCards = props.cards.filter((card) => card.isInactive);
const activeCards = ref(props.cards.filter(
  (card) => card.isActive || card.isExpectancy
));

const selectCard = (selectedCard: KillGameCard) => {
  activeCards.value.forEach(card => {
    card.isSelected = card.cardId === selectedCard.cardId ? true : false;
  });
  emit("selectCard", selectedCard);
};

</script>

<template>
  <div class="pt-3 pb-2 text-center font-18">
    <kill-game-kill-card
      v-for="card in activeCards"
      @click="selectCard(card)"
      :key="card.cardId"
      :card="card"
      :isSelected="card.isSelected"
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
        :isSelected="card.isSelected"
      />
    </div>
  </div>
</template>
