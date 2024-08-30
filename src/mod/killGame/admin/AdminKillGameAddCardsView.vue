<script setup lang="ts">
import { computed, watch } from "vue";
import { ref } from "vue";
import { actionsKeyData } from "@/assets/data/killGame";
import { wordsKeyData } from "@/assets/data/killGame";
import { killersData } from "@/assets/data/killGame";
import type { KillGameActionKey } from "../models/KillGameActionKey";
import type { KillGameWordKey } from "../models/KillGameWordKey";
import { noSelectedTeam } from "@/models/Team";

const minimumRequiredPlayers: number = 2;

const actionsKey = ref<KillGameActionKey[]>(actionsKeyData);
const wordsKey = ref<KillGameWordKey[]>(wordsKeyData);
const panel = ref(null);

const isSelectedAllUsers = ref<boolean>(true);

const selectedActions = ref<KillGameActionKey[]>([]);
const selectedWords = ref<KillGameWordKey[]>([]);
const selectedPlayers = ref<number[]>(
  killersData.map((killer) => killer.userId)
);

watch(isSelectedAllUsers, (newIsSelectedAllUsers) => {
  if (newIsSelectedAllUsers) {
    selectedPlayers.value = killersData.map((killer) => killer.userId);
  } else {
    selectedPlayers.value = [];
  }
});

const isActionsListComplete = computed((): boolean => {
  return selectedActions.value.length >= selectedPlayers.value.length;
});
const isWordsListComplete = computed((): boolean => {
  return selectedWords.value.length >= selectedPlayers.value.length;
});
const isPlayersListComplete = computed((): boolean => {
  return selectedPlayers.value.length > minimumRequiredPlayers;
});
const isExpandedTab0 = computed((): boolean => {
  return panel.value !== null ? panel.value === 0 : false;
});
const isExpandedTab1 = computed((): boolean => {
  return panel.value ? panel.value === 1 : false;
});
const isExpandedTab2 = computed((): boolean => {
  return panel.value ? panel.value === 2 : false;
});
const isGenerateBtnAvailable = computed((): boolean => {
  return (
    isPlayersListComplete.value &&
    isActionsListComplete.value &&
    isWordsListComplete.value
  );
});

const addUserIdToArray = (id: number) => {
  console.log(id);
};
</script>

<template>
  <v-expansion-panels class="killGameAddCards" v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-title
        :class="[isExpandedTab0 ? `bg-${noSelectedTeam.color}` : '']"
      >
        <span
          >{{ $t("killGame.selectPlayers") }} ({{
            selectedPlayers.length
          }})</span
        >
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="expanded ? '' : isPlayersListComplete ? 'teal' : 'red'"
            :icon="
              expanded
                ? 'mdi-pencil'
                : isPlayersListComplete
                  ? 'mdi-check'
                  : 'mdi-close'
            "
          ></v-icon></template
      ></v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-text-field
          class="pt-2"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Wyszukaj użytkownika"
          variant="solo"
          hide-details
          single-line
        ></v-text-field>
        <v-list>
          <v-list-item
            v-for="killer in killersData"
            :key="killer.userId"
            @click="addUserIdToArray(killer.userId)"
          >
            <v-list-item-title class="pl-2">{{
              killer.userName
            }}</v-list-item-title>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
        <div class="">
          <v-btn>
            <span class="pr-2">Zaznacz</span>
            <v-icon>mdi-expand-all-outline</v-icon>
          </v-btn>
          <v-btn>
            <span class="pr-2">Odznacz</span>
            <v-icon>mdi-collapse-all-outline</v-icon>
          </v-btn>
          <v-btn>
            <span class="pr-2">Wylosuj</span>
            <v-icon>mdi-dice-multiple-outline</v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title
        :class="[isExpandedTab1 ? `bg-${noSelectedTeam.color}` : '']"
      >
        <span
          >{{ $t("killGame.selectActions") }} ({{ selectedActions.length }}/{{
            selectedPlayers.length
          }})</span
        >
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="expanded ? '' : isActionsListComplete ? 'teal' : 'red'"
            :icon="
              expanded
                ? 'mdi-pencil'
                : isActionsListComplete
                  ? 'mdi-check'
                  : 'mdi-close'
            "
          ></v-icon> </template
      ></v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-for="action in actionsKey" :key="action.keyId">
          <v-checkbox
            v-model="selectedActions"
            :label="action.text"
            :value="action.keyId"
            hide-details
          ></v-checkbox>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title
        :class="[isExpandedTab2 ? `bg-${noSelectedTeam.color}` : '']"
      >
        <span
          >{{ $t("killGame.selectWords") }} ({{ selectedWords.length }}/{{
            selectedPlayers.length
          }})</span
        >
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="expanded ? '' : isWordsListComplete ? 'teal' : 'red'"
            :icon="
              expanded
                ? 'mdi-pencil'
                : isWordsListComplete
                  ? 'mdi-check'
                  : 'mdi-close'
            "
          ></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-for="word in wordsKey" :key="word.keyId">
          <v-checkbox
            v-model="selectedWords"
            :label="word.text"
            :value="word.keyId"
            hide-details
          ></v-checkbox>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-btn :disabled="!isGenerateBtnAvailable" class="mt-2 w-100">
      <span>{{ $t("killGame.generateGame") }}</span>
    </v-btn>
  </v-expansion-panels>
</template>

<style scoped lang="scss">
.killGameAddCards {
  padding: 8px;
}
</style>
