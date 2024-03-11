<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher.vue";
import { teams } from "@/assets/data/teams";
import { computed, reactive, ref } from "vue";
import type { Filters } from "@/enums/enumTasks";
import { tasksData } from "@/assets/data/tasks";
import type { Task } from "@/models/Task";

const searchPhrase = ref<String>("");
const activeSortState = ref<number>(0);
const activeTabRef = ref<number>(0);
const activeFilters: Filters = reactive({
  taskStatus: [],
  taskPoints: [],
  taskTypes: [],
});

const changeFilters = (filters: Filters) => {
  activeFilters.taskStatus = filters.taskStatus;
  activeFilters.taskPoints = filters.taskPoints;
  activeFilters.taskTypes = filters.taskTypes;
};

const setSearchPhrase = (phrase: String) => {
  searchPhrase.value = phrase;
};

const setSortState = (sortState: number) => {
  activeSortState.value = sortState;
};

const tasks = tasksData;
const filteredTasks = computed(() => {
  return searchPhrase.value === ""
    ? tasks
    : tasks.filter(
        (task: Task) =>
          task.title.toLowerCase().includes(searchPhrase.value.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(searchPhrase.value.toLowerCase())
      );
});
</script>

<template>
  <task-searcher
    @setSearchPhrase="setSearchPhrase"
    @setSortState="setSortState"
    @changeFilters="changeFilters"
  ></task-searcher>
  <team-tasks
    v-model="activeTabRef"
    :tasks="filteredTasks"
    :teams="teams"
    :activeSortState="activeSortState"
  ></team-tasks>
  <teams-selection-bar
    :teams="teams"
    v-model="activeTabRef"
  ></teams-selection-bar>
</template>

<style scoped></style>
