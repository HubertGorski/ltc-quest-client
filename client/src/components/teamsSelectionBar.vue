<script setup lang="ts">
import {
  TEAM_COLOR,
  TEAM_ID,
  TEAM_NAME,
  TEAM_LOGO,
  teamIds,
} from "@/enums/enumTeams";
import { computed, ref, watch } from "vue";

const emit = defineEmits<{
  (e: "changeTeam", value: number): void;
}>();

const selectedTeamId = ref<number>(TEAM_ID.ALL_TEAMS);
const color = computed(() => {
  switch (selectedTeamId.value) {
    case TEAM_ID.TEAM_1:
      return TEAM_COLOR.TEAM_1;
    case TEAM_ID.TEAM_2:
      return TEAM_COLOR.TEAM_2;
    case TEAM_ID.TEAM_3:
      return TEAM_COLOR.TEAM_3;
    case TEAM_ID.TEAM_4:
      return TEAM_COLOR.TEAM_4;
    default:
      return TEAM_COLOR.ALL_TEAMS;
  }
});

watch(selectedTeamId, (newSelectedTeamId) => {
  newSelectedTeamId = teamIds.includes(newSelectedTeamId)
    ? newSelectedTeamId
    : TEAM_ID.ALL_TEAMS;
  emit("changeTeam", newSelectedTeamId);
});
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation
      v-model="selectedTeamId"
      :bg-color="color"
      mode="shift"
    >
      <v-btn>
        <v-icon>{{ TEAM_LOGO.TEAM_1 }}</v-icon>
        <span>{{ TEAM_NAME.TEAM_1 }}</span>
      </v-btn>
      <v-btn>
        <v-icon>{{ TEAM_LOGO.TEAM_2 }}</v-icon>
        <span>{{ TEAM_NAME.TEAM_2 }}</span>
      </v-btn>
      <v-btn>
        <v-icon>{{ TEAM_LOGO.TEAM_3 }}</v-icon>
        <span>{{ TEAM_NAME.TEAM_3 }}</span>
      </v-btn>
      <v-btn>
        <v-icon>{{ TEAM_LOGO.TEAM_4 }}</v-icon>
        <span>{{ TEAM_NAME.TEAM_4 }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
