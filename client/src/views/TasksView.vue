<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";

import { ref } from "vue";

const selectedTeamId = ref<number>(0);
const changeTeam = (teamId: number) => {
  selectedTeamId.value = teamId;
};
</script>

<template>
  <team-tasks :selectedTeamId="selectedTeamId"></team-tasks>
  <teams-selection-bar @changeTeam="changeTeam"></teams-selection-bar>
</template>

<style scoped></style>
