<script setup lang="ts">
import { ref } from "vue";
import type { KillGameCard } from "../models/KillGameCard";
import { noSelectedTeam } from "@/models/Team";
import HubTooltip from "@/components/hubComponents/HubTooltip.vue";
import type { User } from "@/models/User";
import HubSelectInput, { type IItem } from "@/components/hubComponents/HubSelectInput.vue";

const props = defineProps({
  cards: {
    type: Array<KillGameCard>,
    required: true,
  },
  users: {
    type: Array<User>,
    required: true,
  },
});

const headers = [
  { key: "ownerName", title: "Właściciel" },
  { key: "targetPersonUserName", title: "Cel" },
  { key: "keyWord", title: "Słowo" },
  { key: "keyAction", title: "Czynność" },
];

const dataToDisplay = ref<Card[]>(
  props.cards.map((card) => {
    return {
      cardId: card.cardId,
      ownerName: card.ownerName,
      targetPersonUserName: card.targetPersonUserName,
      keyWord: card.keyWord,
      keyAction: card.keyAction,
      isEditMode: false,
    };
  })
);

const availableUsers = ref<IItem[]>(
  props.users.map((user) => {
    return {
      id: user.userId,
      name: user.name,
    };
  })
);

const setOwner = (item: IItem, index: number) => {
  dataToDisplay.value[index].ownerName = item.name;
};
const setTargetPerson = (item: IItem, index: number) => {
  dataToDisplay.value[index].targetPersonUserName = item.name;
};

interface Card {
  cardId: number;
  ownerName: string;
  targetPersonUserName: string;
  keyWord: string;
  keyAction: string;
  isEditMode: boolean;
}
</script>

<template>
  <div>
    <table class="killGameAdminCards_table">
      <thead>
        <tr :class="`bg-${noSelectedTeam.color}`">
          <td v-for="header in headers" :key="header.key" class="text-center">
            {{ header.title }}
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(card, index) in dataToDisplay"
          :key="card.cardId"
          class="border-b-sm"
          :class="{
            'font-italic border-t-md border-b-md border-red': card.isEditMode,
          }"
        >
          <hub-select-input
            :item="{ id: card.cardId, name: card.ownerName }"
            :listItems="availableUsers"
            :isEditMode="card.isEditMode"
            @setItem="setOwner($event, index)"
          />
          <hub-select-input
            :item="{ id: card.cardId, name: card.targetPersonUserName }"
            :listItems="availableUsers"
            :isEditMode="card.isEditMode"
            @setItem="setTargetPerson($event, index)"
          />
          <td>
            <hub-tooltip :tooltipText="card.keyWord">
              <input
                v-model="card.keyWord"
                class="text-grey-darken-3"
                :class="{ 'disabled-input': !card.isEditMode }"
              />
            </hub-tooltip>
          </td>
          <td>
            <hub-tooltip :tooltipText="card.keyAction">
              <input
                v-model="card.keyAction"
                class="text-grey-darken-3"
                :class="{ 'disabled-input': !card.isEditMode }"
              />
            </hub-tooltip>
          </td>
          <td class="text-center text-grey-darken-2">
            <v-icon @click="card.isEditMode = !card.isEditMode">{{
              card.isEditMode
                ? "mdi-check-circle-outline"
                : "mdi-pencil-circle-outline"
            }}</v-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.killGameAdminCards_table {
  width: 100%;
  border-collapse: collapse;
}

.killGameAdminCards_table td {
  padding: 8px;
  pointer-events: all;

  input {
    max-width: 64px;

    &.disabled-input {
      pointer-events: none;
    }
  }
}
</style>
