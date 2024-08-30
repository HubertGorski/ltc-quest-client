<script setup lang="ts">
import taskListElement from "@/components/taskListElement.vue";
import type { Task } from "@/models/Task";
import { Team } from "@/models/Team";

const props = defineProps({
  teams: {
    type: Array<Team>,
    required: true,
  },
  tasks: {
    type: Array<Task>,
    required: true,
  },
});
const selectedTab = defineModel({ required: true });
</script>

<template>
  <v-card>
    <v-card-text class="pt-0">
      <v-window v-model="selectedTab">
        <v-window-item>
          <task-list-element
            v-for="task of tasks"
            :key="task.teamTaskId"
            :task="task"
          />
        </v-window-item>
        <v-window-item
          v-for="team of teams"
          :key="team.teamId"
          :value="team.teamId"
        >
          <task-list-element
            v-for="task of tasks"
            :key="task.teamTaskId"
            :task="task"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
