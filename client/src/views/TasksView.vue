<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher.vue";
import { TEAM_ID } from "@/enums/enumTeams";

import { ref } from "vue";

const selectedTeamId = ref<number>(TEAM_ID.ALL_TEAMS);
const changeTeam = (teamId: number) => {
  selectedTeamId.value = teamId;
};
</script>

<template>
  <task-searcher></task-searcher>
  <team-tasks :selectedTeamId="selectedTeamId"></team-tasks>
  <teams-selection-bar @changeTeam="changeTeam"></teams-selection-bar>
</template>

<style scoped></style>
