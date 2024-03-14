<script setup lang="ts">
import {
  taskPointsItems,
  taskStatusItems,
  taskTypesItems,
  type Filters,
  type SearchData,
  type FilterTasks,
} from "@/enums/enumTasks";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  sortTasksState: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "changeFilters", value: Filters): void;
  (e: "modifyTaskList", value: SearchData): void;
}>();

const searchTaskPhrase = ref<string>("");
const sortTasksState = ref<number>(props.sortTasksState);

const filters: Filters = reactive({
  taskStatus: [],
  taskPoints: null,
  taskTypes: null,
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

const isEmptyFilters = computed(() => {
  return (
    filters.taskPoints === null &&
    filters.taskStatus.length === 0 &&
    filters.taskTypes === null
  );
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
const panelActive = ref<boolean>(false);
const showFilters = () => {
  panelActive.value = !panelActive.value;
};
const getTranslatedFilterOptions = (filterOptions: FilterTasks[]) => {
  const translatedOptions: FilterTasks[] = [];
  Object.values(filterOptions).forEach((option, index) => {
    translatedOptions[index] = {
      title: t(option.title),
      value: option.value
    };
  });
  return translatedOptions;
}
</script>

<template>
  <div class="searcher bg-white">
    <v-btn
      @click="showFilters"
      class="w-100 h-25 elevation-1 bg-grey-lighten-4"
      :class="[isEmptyFilters ? 'text-grey-darken-1' : 'text-black']"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <div v-if="panelActive" class="pt-2">
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.taskStatus"
        :items="getTranslatedFilterOptions(taskStatusItems)"
        :label="$t('filters.taskLabels.taskStatus')"
        multiple
        hide-details
        clearable
      ></v-select>
      <v-select
        class="my-2"
        item-title="title"
        item-value="value"
        v-model="filters.taskPoints"
        :items="getTranslatedFilterOptions(taskPointsItems)"
        :label="$t('filters.taskLabels.taskPoints')"
        hide-details
        clearable
      ></v-select>
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.taskTypes"
        :items="getTranslatedFilterOptions(taskTypesItems)"
        :label="$t('filters.taskLabels.taskType')"
        hide-details
        clearable
      ></v-select>
    </div>
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
  </div>
</template>

<style scoped>
.searcher {
  position: sticky;
  top: 64px;
  padding: 16px;
  z-index: 2;
}
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
