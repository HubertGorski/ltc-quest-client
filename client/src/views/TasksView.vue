<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher.vue";
import { teams } from "@/assets/data/teams";
import { computed, ref, watch } from "vue";
import { tasksData } from "@/assets/data/tasks";
import type { Task } from "@/models/Task";
import { useRoute } from "vue-router";
import router from "@/router";
import { Filters, type SearchData } from "@/models/Filters";

const route = useRoute();

const sortState = computed(() => {
  return route.query.sort ? Number(route.query.sort) : 0;
});

const filters: Filters = new Filters();
filters.status = route.query.status ? [String(route.query.status)] : [];
filters.points = route.query.points ? String(route.query.points) : null;
filters.types = route.query.types ? String(route.query.types) : null;
filters.advantage = route.query.advantage
  ? String(route.query.advantage)
  : null;
filters.availability = route.query.availability
  ? String(route.query.availability)
  : null;

const tasks = ref<Task[]>(tasksData);
const selectedTeamId =
  teams.find((team) => team.name === route.hash.substring(1))?.teamId || 0;
const activeTab = ref<number>(selectedTeamId);

watch(activeTab, (newActiveTab) => {
  if (newActiveTab > 0) {
    return router.push({
      path: "/tasks",
      query: route.query,
      hash: `#${teams[newActiveTab - 1].name}`,
    });
  }

  return router.push({ path: "/tasks", query: route.query, hash: "" });
});

const updateFiltersQuery = (newFilters: Filters) => {
  const queryObject = {};
  Object.entries(newFilters).forEach(([key, value]) => {
    if (
      (value && typeof value === "string") ||
      (Array.isArray(value) && value.length > 0)
    ) {
      Object.assign(queryObject, { [key]: value });
    } else {
      Object.assign(queryObject, { [key]: undefined });
    }
  });

  router.push({
    path: "/tasks",
    query: {
      ...route.query,
      ...queryObject,
    },
    hash: route.hash,
  });
};

const updateSortQuery = (sortState: Number) => {
  const sortQuery = sortState !== 0 ? String(sortState) : undefined;
  return router.push({
    path: "/tasks",
    query: { ...route.query, sort: sortQuery },
    hash: route.hash,
  });
};

const modifyTaskList = (data: SearchData) => {
  tasks.value = getFilteredTasks(data.searchPhrase, tasksData);
  tasks.value = getSortTasks(data.sortState, tasks.value);
  updateSortQuery(data.sortState);
};

const getTaskListWithFilters = (newFilters: Filters) => {
  // get new data
  updateFiltersQuery(newFilters);
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
tasks.value = getSortTasks(sortState.value, tasks.value);
</script>

<template>
  <task-searcher
    @modifyTaskList="modifyTaskList"
    @changeFilters="getTaskListWithFilters"
    :sortTasksState="sortState"
    :filters="filters"
  ></task-searcher>
  <team-tasks v-model="activeTab" :tasks="tasks" :teams="teams"></team-tasks>
  <teams-selection-bar :teams="teams" v-model="activeTab"></teams-selection-bar>
</template>

<style scoped></style>
