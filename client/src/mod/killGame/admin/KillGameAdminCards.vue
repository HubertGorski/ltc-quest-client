<script setup lang="ts">
import { ref } from "vue";
import type { KillGameCard } from "../models/KillGameCard";
import { noSelectedTeam } from "@/models/Team";
import HubTooltip from "@/components/hubComponents/HubTooltip.vue";
import type { User } from "@/models/User";
import HubSelectInput, {
  type IItem,
} from "@/components/hubComponents/HubSelectInput.vue";
import { useI18n } from "vue-i18n";
import { deepClone, deepEqual } from "@/components/hubComponents/HubUtils.vue";

const { t } = useI18n();

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
  { key: "ownerName", title: t("killGame.owner") },
  { key: "targetPersonUserName", title: t("killGame.target") },
  { key: "keyWord", title: t("killGame.keyWord") },
  { key: "keyAction", title: t("killGame.keyAction") },
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

let backupCards: Card[] = [];

const cardOptions: IItem[] = [
  { id: 1, name: t("edit"), icon: "mdi-pencil-circle-outline" },
  { id: 2, name: t("remove"), icon: "mdi-minus-circle-outline" },
  { id: 3, name: t("kill"), icon: "mdi-close-circle-outline" },
];

const isEditAllMode = ref<boolean>(false);

const editAll = () => {
  isEditAllMode.value = true;
  backupCards = deepClone(dataToDisplay.value);
  dataToDisplay.value.forEach((data) => {
    data.isEditMode = true;
  });
};

const saveAll = () => {
  isEditAllMode.value = false;
  dataToDisplay.value.forEach((_, idx) => {
    saveCard(idx);
  });
};
const saveCard = (index: number) => {
  const selectedCard = dataToDisplay.value[index];
  selectedCard.isEditMode = false;

  backupCards.forEach((card, idx) => {
    if (card.cardId === selectedCard.cardId) {
      backupCards.splice(idx, 1);
      !deepEqual(card, selectedCard)
        ? console.log("save do bazy", dataToDisplay.value[index])
        : null;
    }
  });
};

const setOwner = (item: IItem, index: number) => {
  dataToDisplay.value[index].ownerName = item.name;
};
const setTargetPerson = (item: IItem, index: number) => {
  dataToDisplay.value[index].targetPersonUserName = item.name;
};
const controlBtnHandle = (item: IItem, index: number): void => {
  if (item.id === 1) {
    const selectedCard = Object.assign({}, dataToDisplay.value[index]);
    backupCards.push(selectedCard);
    dataToDisplay.value[index].isEditMode = true;
    return;
  }

  if (item.id === 2) {
    console.log("usuwam", dataToDisplay.value[index]);
  }

  if (item.id === 3) {
    console.log("zabijam", dataToDisplay.value[index]);
  }

  dataToDisplay.value.splice(index, 1);
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
          <td>
            <v-icon @click="isEditAllMode ? saveAll() : editAll()">{{
              isEditAllMode
                ? "mdi-check-circle-outline"
                : "mdi-pencil-circle-outline"
            }}</v-icon>
          </td>
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
          <td>
            <hub-select-input
              :item="{ id: card.cardId, name: card.ownerName }"
              :listItems="availableUsers"
              :isEditMode="card.isEditMode"
              @setItem="setOwner($event, index)"
            />
          </td>
          <td>
            <hub-select-input
              :item="{ id: card.cardId, name: card.targetPersonUserName }"
              :listItems="availableUsers"
              :isEditMode="card.isEditMode"
              @setItem="setTargetPerson($event, index)"
            />
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
            <hub-select-input
              :item="{ id: 0, name: '' }"
              :listItems="cardOptions"
              :isEditMode="!card.isEditMode"
              :icon="
                card.isEditMode
                  ? 'mdi-check-circle-outline'
                  : 'mdi-dots-horizontal-circle-outline'
              "
              @isClicked="saveCard(index)"
              @setItem="controlBtnHandle($event, index)"
            />
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
