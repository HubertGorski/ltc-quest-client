<script setup lang="ts">
import { TEAM_ID } from "@/enums/enumTeams";
import taskListElement from "@/components/taskListElement.vue";
import { Team } from "@/models/Team";
import { Task } from "@/models/Task";

const props = defineProps({
  selectedTeam: {
    type: Team,
    required: true,
  },
  tasks: {
    type: Array<Task>,
    required: true,
  },
});
</script>

<template>
  <v-card>
    <v-card-text>
      <v-window v-model="selectedTeam.teamId">
        <v-window-item :value="TEAM_ID.TEAM_1">
          <task-list-element :task="tasks[0]" :team="selectedTeam" />
        </v-window-item>
        <v-window-item :value="TEAM_ID.TEAM_2"> </v-window-item>
        <v-window-item :value="TEAM_ID.TEAM_3"> </v-window-item>
        <v-window-item :value="TEAM_ID.TEAM_4"> </v-window-item>
        <v-window-item :value="TEAM_ID.ALL_TEAMS"> </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
