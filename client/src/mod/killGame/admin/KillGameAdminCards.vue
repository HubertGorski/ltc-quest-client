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
import {
  deepEqual,
  hasEmptyValues,
} from "@/components/hubComponents/HubUtils.vue";
import router from "@/router";
import { ROUTE_PATH } from "@/router/routeEnums";

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

const editAll = (): void => {
  isEditAllMode.value = true;
  dataToDisplay.value.forEach((data: Card) => {
    const isInBackup = backupCards.some(item => item.cardId === data.cardId);
    if (!isInBackup) {
      data.isEditMode = true;
      const selectedCard = Object.assign({}, data);
      backupCards.push(selectedCard);
    }
  });
};

const saveAll = (): void => {
  isEditAllMode.value = false;
  dataToDisplay.value.forEach((_, idx) => {
    saveCard(idx);
  });
};

const goToAddNewCards = (): void => {
  router.push(ROUTE_PATH.ADMIN_ADD_CARDS_KILL_GAME);
}

const addNewCard = (): void => {
  const idCard: number = getNewIdCard();
  const newCard: Card = {
    cardId: idCard,
    ownerName: "",
    targetPersonUserName: "",
    keyWord: "",
    keyAction: "",
    isEditMode: true,
  };
  dataToDisplay.value.unshift(newCard);
  const selectedCard = Object.assign({}, newCard);
  backupCards.push(selectedCard);
};

const getNewIdCard = (): number => {
  //TODO: get available id for new card from database
  return dataToDisplay.value.length + 1;
};

const saveCard = (index: number): void => {
  const selectedCard = dataToDisplay.value[index];

  backupCards.forEach((card, idx) => {
    if (card.cardId !== selectedCard.cardId) {
      return;
    }

    if (!deepEqual(card, selectedCard) && !hasEmptyValues(selectedCard)) {
      console.log("save do bazy", dataToDisplay.value[index]);
    }

    if (!hasEmptyValues(selectedCard)) {
      selectedCard.isEditMode = false;
      backupCards.splice(idx, 1);
    }
  });
};

const setOwner = (item: IItem, index: number): void => {
  dataToDisplay.value[index].ownerName = item.name;
};
const setTargetPerson = (item: IItem, index: number): void => {
  dataToDisplay.value[index].targetPersonUserName = item.name;
};
const controlBtnHandle = (item: IItem, index: number): void => {
  if (item.id === 1) {
    dataToDisplay.value[index].isEditMode = true;
    const selectedCard = Object.assign({}, dataToDisplay.value[index]);
    backupCards.push(selectedCard);
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
    <div class="killGameAdminCards_addButtons">
      <v-btn @click="goToAddNewCards">
        <span>{{ $t("killGame.addManyCards") }}</span>
        <v-icon>mdi-plus-circle-multiple-outline</v-icon>
      </v-btn>
      <v-btn @click="addNewCard" :class="`bg-${noSelectedTeam.color}`">
        <span>{{ $t("killGame.addCard") }}</span>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
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
                :placeholder="`(${t('empty')})`"
              />
            </hub-tooltip>
          </td>
          <td>
            <hub-tooltip :tooltipText="card.keyAction">
              <input
                v-model="card.keyAction"
                class="text-grey-darken-3"
                :class="{ 'disabled-input': !card.isEditMode }"
                :placeholder="`(${t('empty')})`"
              />
            </hub-tooltip>
          </td>
          <td :class="[hasEmptyValues(card) ? 'text-grey' : 'text-grey-darken-2']" class="text-center">
            <hub-tooltip :tooltipText="t('fillEmptyInputs')" :disabled="!hasEmptyValues(card)">
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
            </hub-tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.killGameAdminCards_addButtons {
  display: flex;
  justify-content: space-around;
  padding: 8px 4px;
  .v-icon {
    padding-left: 8px;
  }
}

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
