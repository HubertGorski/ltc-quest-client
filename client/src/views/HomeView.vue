<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import navBar from "@/components/navBar.vue";
import { ref } from "vue";

const selectedTeamId = ref<number>(0);
const changeTeam = (teamId: number) => {
  selectedTeamId.value = teamId;
};
</script>

<template>
  <main>
    <nav-bar />
    <team-tasks :selectedTeamId="selectedTeamId"></team-tasks>
    <teams-selection-bar @changeTeam="changeTeam"></teams-selection-bar>
  </main>
</template>
