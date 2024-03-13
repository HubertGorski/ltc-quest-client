<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher.vue";
import { teams } from "@/assets/data/teams";
import { computed, reactive, ref, watch } from "vue";
import type { Filters, SearchData } from "@/enums/enumTasks";
import { tasksData } from "@/assets/data/tasks";
import type { Task } from "@/models/Task";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const sortState = computed(() => {
  return route.query.sort ? Number(route.query.sort) : 0;
});
const tasks = ref<Task[]>(tasksData);
const selectedTeamId = route.hash ? teams.find(team => team.name === route.hash.substring(1)).teamId : 0;
const activeTab = ref<number>(selectedTeamId);

watch(activeTab, (newActiveTab) => {
  const query = {};
  if (sortState.value !== 0) {
    Object.assign(query, { sort: sortState.value });
  }

  if (newActiveTab === 0) {
    return router.push({ path: '/tasks', query:  query  });
  }
  if (typeof newActiveTab === 'number') {
    return router.push({ path: '/tasks', query: query , hash: `#${teams[newActiveTab - 1].name}` });
  }
});

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
  const query = {};
  if (sortState !== 0) {
    Object.assign(query, { sort: sortState });
  }

  router.push({ path: '/tasks', hash: route.hash, query: query });
  
  if (sortState === 1) {
    return [...tasks].sort((a, b) => a.points - b.points);
  } else if (sortState === 2) {
    return [...tasks].sort((a, b) => b.points - a.points);
  } else {
    return [...tasks];
  }
};
tasks.value = getSortTasks(sortState.value, tasks.value);
</script>

<template>
  <task-searcher
    @modifyTaskList="modifyTaskList"
    @changeFilters="changeFilters"
    :sortTasksState="sortState"
  ></task-searcher>
  <team-tasks v-model="activeTab" :tasks="tasks" :teams="teams"></team-tasks>
  <teams-selection-bar :teams="teams" v-model="activeTab"></teams-selection-bar>
</template>

<style scoped></style>
