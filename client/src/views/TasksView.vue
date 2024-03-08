<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher.vue";
import { teams } from "@/assets/data/teams";
import { tasks } from "@/assets/data/tasks";

import { ref } from "vue";
import type { Team } from "@/models/Team";

const selectedTeam = ref<Team>(teams[0]);
const changeTeam = (teamId: number) => {
  selectedTeam.value = teams[teamId];
};
</script>

<template>
  <task-searcher></task-searcher>
  <team-tasks :tasks="tasks" :selectedTeam="selectedTeam"></team-tasks>
  <teams-selection-bar @changeTeam="changeTeam"></teams-selection-bar>
</template>

<style scoped></style>
