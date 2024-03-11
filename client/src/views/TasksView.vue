<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher.vue";
import { teams } from "@/assets/data/teams";
import { reactive, ref } from "vue";
import type { Filters, SearchData } from "@/enums/enumTasks";
import { tasksData } from "@/assets/data/tasks";
import type { Task } from "@/models/Task";

const tasks = ref<Task[]>(tasksData);
const activeTab = ref<number>(0);
const activeFilters: Filters = reactive({
  taskStatus: [],
  taskPoints: null,
  taskTypes: null,
});

const changeFilters = (filters: Filters) => {
  activeFilters.taskStatus = filters.taskStatus;
  activeFilters.taskPoints = filters.taskPoints;
  activeFilters.taskTypes = filters.taskTypes;
};

const modifyTaskList = (data: SearchData) => {
  tasks.value = getFilteredTasks(data.searchPhrase, tasksData);
  tasks.value = getSortTasks(data.sortState, tasks.value);
};

const getFilteredTasks = (searchPhrase: String, tasks: Task[]) => {
  return searchPhrase === ""
    ? tasks
    : tasks.filter(
        (task: Task) =>
          task.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          task.description.toLowerCase().includes(searchPhrase.toLowerCase())
      );
};

const getSortTasks = (sortState: Number, tasks: Task[]) => {
  if (sortState === 1) {
    return [...tasks].sort((a, b) => a.points - b.points);
  } else if (sortState === 2) {
    return [...tasks].sort((a, b) => b.points - a.points);
  } else {
    return [...tasks];
  }
};
</script>

<template>
  <task-searcher
    @modifyTaskList="modifyTaskList"
    @changeFilters="changeFilters"
  ></task-searcher>
  <team-tasks v-model="activeTab" :tasks="tasks" :teams="teams"></team-tasks>
  <teams-selection-bar :teams="teams" v-model="activeTab"></teams-selection-bar>
</template>

<style scoped></style>
