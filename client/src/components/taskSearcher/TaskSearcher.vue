<script setup lang="ts">
import { ref } from "vue";
import SearchAndSortBar, {
  type SearchData,
} from "@/components/taskSearcher/SearchAndSortBar.vue";
import FiltersPanel from "./FiltersPanel.vue";
import { useRoute } from "vue-router";
import { Filter, type SelectedFilterObject } from "@/models/Filter";
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
    route.query.type,
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
    route.query.taskExpiredDate,
    [],
    "filters.taskLabels.taskExpiredDate",
    true
  ),
];

const sortTasksState = ref<number>(props.sortTasksState);

const changeFilters = (filterObjects: SelectedFilterObject[]) => {
  emit("changeFilters", filterObjects);
};
const modifyTaskList = (data: SearchData) => {
  emit("modifyTaskList", data);
};
const isVisiblePanel = ref(false);
</script>

<template>
  <div class="taskSearcher bg-white border border-b-md">
    <FiltersPanel
      :filters="filters"
      @changeFilters="changeFilters"
      v-model="isVisiblePanel"
    />
    <SearchAndSortBar
      v-if="!isVisiblePanel"
      :sortTasksState="sortTasksState"
      @modifyTaskList="modifyTaskList"
    />
    <HubChipsList
      v-if="!isVisiblePanel"
      :filters="filters"
      @changeFilters="changeFilters"
    />
  </div>
</template>

<style scoped>
.taskSearcher {
  position: sticky;
  top: 64px;
  padding: 16px 16px 8px 16px;
  z-index: 2;
}
</style>
