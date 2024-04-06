<script setup lang="ts">
import { reactive, ref } from "vue";
import { Filters } from "@/models/Filters";
import SearchAndSortBar, { type SearchData } from "@/components/taskSearcher/SearchAndSortBar.vue";
import FiltersPanel from "./FiltersPanel.vue";

const props = defineProps({
  sortTasksState: {
    type: Number,
    required: true,
  },
  filters: {
    type: Filters,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "changeFilters", value: Filters): void;
  (e: "modifyTaskList", value: SearchData): void;
}>();

const filters: Filters = reactive(props.filters);
const sortTasksState = ref<number>(props.sortTasksState);

const changeFilters = (filters: Filters) => {
  emit("changeFilters", filters);
};
const modifyTaskList = (data: SearchData) => {
  emit("modifyTaskList", data);
};
</script>

<template>
  <div class="taskSearcher bg-white">
    <FiltersPanel :filters="filters" @changeFilters="changeFilters"/>
    <SearchAndSortBar :sortTasksState="sortTasksState" @modifyTaskList="modifyTaskList"/>
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
