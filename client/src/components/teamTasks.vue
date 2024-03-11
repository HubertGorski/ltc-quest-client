<script setup lang="ts">
import taskListElement from "@/components/taskListElement.vue";
import type { Task } from "@/models/Task";
import { Team } from "@/models/Team";
import { ref, watch } from "vue";

const props = defineProps({
  teams: {
    type: Array<Team>,
    required: true,
  },
  tasks: {
    type: Array<Task>,
    required: true,
  },
  activeSortState: {
    type: Number,
    required: true,
  },
});
const selectedTab = defineModel({ required: true });
const filteredTasks = ref<Task[]>(props.tasks);
const sortedTasks = ref<Task[]>(props.tasks);

const sortTasks = (activeSortState: Number, tasks: Task[]) => {
  if (activeSortState === 1) {
    sortedTasks.value = [...tasks].sort((a, b) => a.points - b.points);
  } else if (activeSortState === 2) {
    sortedTasks.value = [...tasks].sort((a, b) => b.points - a.points);
  } else {
    sortedTasks.value = [...tasks];
  }
};
watch(
  () => props.activeSortState,
  () => {
    sortTasks(props.activeSortState, filteredTasks.value);
  }
);
watch(
  () => props.tasks,
  () => {
    filteredTasks.value = props.tasks;
    sortTasks(props.activeSortState, filteredTasks.value);
  }
);
</script>

<template>
  <v-card>
    <v-card-text>
      <v-window v-model="selectedTab">
        <v-window-item>
          all
          <task-list-element
            v-for="task of sortedTasks"
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
            v-for="task of sortedTasks"
            :key="task.teamTaskId"
            :task="task"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
