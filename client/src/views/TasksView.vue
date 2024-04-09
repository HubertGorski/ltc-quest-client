<script setup lang="ts">
import teamsSelectionBar from "@/components/teamsSelectionBar.vue";
import teamTasks from "@/components/teamTasks.vue";
import taskSearcher from "@/components/taskSearcher/TaskSearcher.vue";
import { teams } from "@/assets/data/teams";
import { computed, ref, watch } from "vue";
import { tasksData } from "@/assets/data/tasks";
import type { Task } from "@/models/Task";
import { useRoute } from "vue-router";
import router from "@/router";
import type { SearchData } from "@/components/taskSearcher/SearchAndSortBar.vue";
import type { SelectedFilterObject } from "@/models/Filter";

const route = useRoute();

const sortState = computed(() => {
  return route.query.sort ? Number(route.query.sort) : 0;
});

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

const updateFiltersQuery = (newFilters: SelectedFilterObject[]) => {
  const queryObject = {};
  newFilters.forEach((filter) => {
    if (filter.value && typeof filter.value === "string") {
      Object.assign(queryObject, { [filter.name]: filter.value });
    } else if (filter.value && typeof filter.value === "object") {
      if (filter.value.length === 0) {
        Object.assign(queryObject, { [filter.name]: undefined });
      }
      const strings: string[] = [];
      const stringDates: string[] = [];
      Object.values(filter.value).forEach((element) => {
        if (!element) {
          return;
        }

        if (typeof element === "string") {
          strings.push(element);
          Object.assign(queryObject, { [filter.name]: strings });
        }

        if (typeof element === "object") {
          stringDates.push(Date.parse(element).toString());
          Object.assign(queryObject, { [filter.name]: stringDates });
        }
      });
    } else {
      Object.assign(queryObject, { [filter.name]: undefined });
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

const getTaskListWithFilters = (newFilters: SelectedFilterObject[]) => {
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
  ></task-searcher>
  <team-tasks v-model="activeTab" :tasks="tasks" :teams="teams"></team-tasks>
  <teams-selection-bar :teams="teams" v-model="activeTab"></teams-selection-bar>
</template>

<style scoped></style>
