<script setup lang="ts">
import { ref, watch } from "vue";
import SearchAndSortBar, {
  type SearchData,
} from "@/components/taskSearcher/SearchAndSortBar.vue";
import FiltersPanel from "./FiltersPanel.vue";
import { useRoute } from "vue-router";
import {
  Filter,
  getSelectedFilterObjects,
  type SelectedFilterObject,
} from "@/models/Filter";
import HubChipsList from "../hubComponents/HubChipsList.vue";

const route = useRoute();
const props = defineProps({
  sortTasksState: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "changeFilters", value: SelectedFilterObject[]): void;
  (e: "modifyTaskList", value: SearchData): void;
}>();
const filters: Filter[] = [
  new Filter(
    "status",
    route.query.status,
    [
      { title: "filters.taskStatus.confirmed", value: "confirmed" },
      { title: "filters.taskStatus.expectancy", value: "expectancy" },
      { title: "filters.taskStatus.undone", value: "undone" },
      { title: "filters.taskStatus.rejected", value: "rejected" },
      { title: "filters.taskStatus.disabled", value: "disabled" },
    ],
    "filters.taskLabels.taskStatus",
    false,
    true
  ),
  new Filter(
    "points",
    route.query.points,
    [
      { title: "filters.taskPoints.positive", value: "positive" },
      { title: "filters.taskPoints.negative", value: "negative" },
    ],
    "filters.taskLabels.taskPoints"
  ),
  new Filter(
    "type",
    route.query.types,
    [
      { title: "filters.taskType.basic", value: "basic" },
      { title: "filters.taskType.special", value: "special" },
    ],
    "filters.taskLabels.taskType"
  ),
  new Filter(
    "advantage",
    route.query.advantage,
    [
      { title: "filters.taskTeamAdvantage.win", value: "win" },
      { title: "filters.taskTeamAdvantage.lose", value: "lose" },
    ],
    "filters.taskLabels.taskTeamAdvantage"
  ),
  new Filter(
    "availability",
    route.query.availability,
    [
      { title: "filters.availability.forAll", value: "forAll" },
      {
        title: "filters.availability.onlySelectedTeams",
        value: "onlySelectedTeams",
      },
    ],
    "filters.taskLabels.taskAvailability"
  ),
  new Filter(
    "taskStartDate",
    route.query.taskStartDate,
    [],
    "filters.taskLabels.taskStartDate",
    true
  ),
  new Filter(
    "taskExpiredDate",
    route.query.taskEndDate,
    [],
    "filters.taskLabels.taskExpiredDate",
    true
  ),
];

const sortTasksState = ref<number>(props.sortTasksState);
const chipsFilters = ref<SelectedFilterObject[]>(
  getSelectedFilterObjects(filters)
);

const changeFilters = (filterObjects: SelectedFilterObject[]) => {
  emit("changeFilters", filterObjects);
  chipsFilters.value = getSelectedFilterObjects(filters);
};
const modifyTaskList = (data: SearchData) => {
  emit("modifyTaskList", data);
};
</script>

<template>
  <div class="taskSearcher bg-white">
    <FiltersPanel :filters="filters" @changeFilters="changeFilters" />
    <SearchAndSortBar
      :sortTasksState="sortTasksState"
      @modifyTaskList="modifyTaskList"
    />
    <HubChipsList v-model="chipsFilters" />
  </div>
</template>

<style scoped>
.taskSearcher {
  position: sticky;
  top: 64px;
  padding: 16px;
  z-index: 2;
}
</style>
