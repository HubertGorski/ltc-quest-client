<script setup lang="ts">
import {
  taskPointsItems,
  taskStatusItems,
  taskTypesItems,
  TASK_LABELS,
  type Filters,
  type SearchData,
} from "@/enums/enumTasks";
import { computed, reactive, ref, watch } from "vue";

const emit = defineEmits<{
  (e: "changeFilters", value: Filters): void;
  (e: "modifyTaskList", value: SearchData): void;
}>();

const searchTaskPhrase = ref<string>("");
const sortTasksState = ref<number>(0);

const filters: Filters = reactive({
  taskStatus: [],
  taskPoints: [],
  taskTypes: [],
});

const sortTasks = () => {
  if (sortTasksState.value === 2) {
    sortTasksState.value = 0;
  } else {
    sortTasksState.value++;
  }
};

const btnSortClass = computed(() => {
  return sortTasksState.value === 0
    ? "elevation-1 bg-grey-lighten-4 text-grey-darken-1"
    : `elevation-4 bg-grey-lighten-4 text-black active`;
});

watch(sortTasksState, (state) => {
  emit("modifyTaskList", {
    sortState: state,
    searchPhrase: searchTaskPhrase.value,
  });
});
watch(filters, (newFilters) => {
  emit("changeFilters", newFilters);
});
watch(searchTaskPhrase, (newSearchTaskPhrase) => {
  emit("modifyTaskList", {
    sortState: sortTasksState.value,
    searchPhrase: newSearchTaskPhrase,
  });
});
</script>

<template>
  <div class="px-4 py-4">
    <v-select
      item-title="title"
      item-value="value"
      v-model="filters.taskStatus"
      :items="taskStatusItems"
      :label="TASK_LABELS.TASK_STATUS"
      multiple
      hide-details
      clearable
    ></v-select>
    <v-select
      class="my-2"
      item-title="title"
      item-value="value"
      v-model="filters.taskPoints"
      :items="taskPointsItems"
      :label="TASK_LABELS.TASK_POINTS"
      hide-details
      clearable
    ></v-select>
    <v-select
      item-title="title"
      item-value="value"
      v-model="filters.taskTypes"
      :items="taskTypesItems"
      :label="TASK_LABELS.TASK_TYPE"
      hide-details
      clearable
    ></v-select>
    <v-sheet class="d-flex pt-2">
      <v-sheet class="flex-grow-1 align-center">
        <v-text-field
          class="pr-2"
          v-model="searchTaskPhrase"
          :label="TASK_LABELS.TASK"
          hide-details
        ></v-text-field>
      </v-sheet>
      <v-sheet class="d-flex align-center justify-center">
        <v-btn @click="sortTasks" size="50" :class="btnSortClass">
          <v-icon class="icon" :class="{ desc: sortTasksState === 2 }"
            >mdi-menu-up</v-icon
          >
        </v-btn>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<style scoped>
.active .icon {
  font-size: 32px;
}
.icon {
  font-size: 26px;
  transition: all 0.3s;
}
.desc {
  transform: rotate(180deg);
}
</style>
