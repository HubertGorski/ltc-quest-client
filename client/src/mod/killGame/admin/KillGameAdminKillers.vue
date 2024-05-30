<script setup lang="ts">
import { KILL_GAME_USER_STATUS, type KillGameUser } from "../models/KillGameUser";
import { noSelectedTeam } from "@/models/Team";
import HubTooltip from "@/components/hubComponents/HubTooltip.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  killers: {
    type: Array<KillGameUser>,
    required: true,
  },
});

const headers: { key: keyof KillGameUser; title: string }[] = [
  { key: "userName", title: t("gamer") },
  { key: "cardsOwned", title: t("killGame.numberOfCards") },
  { key: "killingsCommitted", title: t("killGame.kills") },
  { key: "status", title: t("status") },
];

const killerStatus = [
  {
    status: KILL_GAME_USER_STATUS.ALIVE,
    text: t('killGame.alive'),
    icon: "mdi-emoticon-cool-outline",
  },
  {
    status: KILL_GAME_USER_STATUS.UNCERTAIN,
    text: t('killGame.uncertain'),
    icon: "mdi-emoticon-frown-outline",
  },
  {
    status: KILL_GAME_USER_STATUS.DEAD,
    text: t('killGame.dead'),
    icon: "mdi-emoticon-dead-outline",
  },
];

const getIconStatus = (actualStatus: KILL_GAME_USER_STATUS): string => {
  return killerStatus.find(status => status.status === actualStatus)!.icon;
}
const getTextStatus = (actualStatus: KILL_GAME_USER_STATUS): string => {
  return killerStatus.find(status => status.status === actualStatus)!.text;
}
</script>

<template>
  <div>
    <table class="killGameAdminKillers_table">
      <thead>
        <tr :class="`bg-${noSelectedTeam.color}`">
          <td v-for="header in headers" :key="header.key" class="text-center">
            {{ header.title }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="killer in killers"
          :key="killer.userId"
          class="border-b-sm"
        >
          <td>
            <hub-tooltip :tooltipText="killer.userName">
              <span>{{ killer.userName }}</span>
            </hub-tooltip>
          </td>
          <td class="text-center">
            <span>{{ killer.cardsOwned }}</span>
          </td>
          <td class="text-center">
            <span>{{ killer.killingsCommitted }}</span>
          </td>
          <td class="text-center text-grey-darken-3">
            <hub-tooltip :tooltipText="getTextStatus(killer.status)">  
              <v-icon>{{ getIconStatus(killer.status) }}</v-icon>
            </hub-tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.killGameAdminKillers_table {
  width: 100%;
  border-collapse: collapse;
}

.killGameAdminKillers_table td {
  padding: 8px;
  max-width: 92px;
  white-space: nowrap;
  overflow: hidden;
}
</style>
