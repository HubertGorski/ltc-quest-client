<script setup lang="ts">
import { computed, ref, watch } from "vue";

export interface SearchData {
  sortState: Number;
  searchPhrase: string;
}

const props = defineProps({
  sortTasksState: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits<{
  (e: "modifyTaskList", value: SearchData): void;
}>();

const searchTaskPhrase = ref<string>("");
const sortTasksState = ref<number>(props.sortTasksState);

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
watch(searchTaskPhrase, (newSearchTaskPhrase) => {
  emit("modifyTaskList", {
    sortState: sortTasksState.value,
    searchPhrase: newSearchTaskPhrase,
  });
});
</script>

<template>
  <v-sheet class="d-flex pt-2">
    <v-sheet class="flex-grow-1 align-center">
      <v-text-field
        class="pr-2"
        v-model="searchTaskPhrase"
        :label="$t('filters.taskLabels.task')"
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
