<script setup lang="ts">
import { ref } from "vue";
import type { KillGameCard } from "../models/KillGameCard";
import { noSelectedTeam } from "@/models/Team";
import HubTooltip from "@/components/hubComponents/HubTooltip.vue";
import type { User } from "@/models/User";

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

const availableUsers = ref<UserInList[]>(
  props.users.map((user) => {
    return {
      userId: user.userId,
      name: user.name,
    };
  })
);

interface UserInList {
  userId: number;
  name: string;
}

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
          v-for="card in dataToDisplay"
          :key="card.cardId"
          class="border-b-sm"
          :class="{
            'font-italic border-t-md border-b-md border-red': card.isEditMode,
          }"
        >
          <v-menu>
            <template v-slot:activator="{ props }">
              <td v-bind="props">
                <hub-tooltip
                  :tooltipText="card.ownerName"
                  :disabled="card.isEditMode"
                >
                  <input
                    v-model="card.ownerName"
                    class="disabled-input text-grey-darken-3"
                    :disabled="card.isEditMode"
                  />
                </hub-tooltip>
              </td>
            </template>
            <v-list v-if="card.isEditMode">
              <v-list-item
                v-for="user in availableUsers"
                :key="user.userId"
                class="listItem"
              >
                {{ user.name }}</v-list-item
              >
            </v-list>
          </v-menu>
          <td>
            <hub-tooltip :tooltipText="card.targetPersonUserName">
              <input
                v-model="card.targetPersonUserName"
                class="text-grey-darken-3"
                :class="{ 'disabled-input': !card.isEditMode }"
              />
            </hub-tooltip>
          </td>
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

.listItem.v-list-item--density-default.v-list-item--one-line {
  min-height: auto;
}
</style>
