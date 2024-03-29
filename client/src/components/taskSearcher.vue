<script setup lang="ts">
import {
  taskPointsItems,
  taskStatusItems,
  taskTypesItems,
  taskTeamAdvantageItems,
  taskAvailabilityItems,
} from "@/enums/enumTasks";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { FilterTasks, Filters, type SearchData } from "@/models/Filters";
import HubDatePicker from "./hubComponents/HubDatePicker.vue";

const { t } = useI18n();
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

const searchTaskPhrase = ref<string>("");
const sortTasksState = ref<number>(props.sortTasksState);
const filters: Filters = reactive(props.filters);

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
  return Object.values(filters).every(
    (value) => value === null || (Array.isArray(value) && value.length === 0)
  );
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
const panelActive = ref<boolean>(false);
const showFilters = () => {
  panelActive.value = !panelActive.value;
};
const getTranslatedFilterOptions = (filterOptions: FilterTasks[]) => {
  const translatedOptions: FilterTasks[] = [];
  Object.values(filterOptions).forEach((option, index) => {
    translatedOptions[index] = {
      title: t(option.title),
      value: option.value,
    };
  });
  return translatedOptions;
};

const resetFilters = () => {
  Object.keys(filters).forEach((key) => {
    if (Array.isArray(filters[key])) {
      filters[key] = [];
    } else {
      filters[key] = null;
    }
  });
};

const setFilters = () => {
  emit("changeFilters", filters);
  panelActive.value = false;
};
</script>

<template>
  <div class="searcher bg-white">
    <v-btn
      @click="showFilters"
      class="w-100 h-25 bg-grey-lighten-4"
      :class="[
        isEmptyFilters ? 'text-grey-darken-1' : 'text-black',
        panelActive ? 'elevation-4' : ' elevation-1',
      ]"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <div v-if="panelActive" class="searcher_inputs">
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.status"
        :items="getTranslatedFilterOptions(taskStatusItems)"
        :label="$t('filters.taskLabels.taskStatus')"
        multiple
        hide-details
        clearable
      ></v-select>
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.points"
        :items="getTranslatedFilterOptions(taskPointsItems)"
        :label="$t('filters.taskLabels.taskPoints')"
        hide-details
        clearable
      ></v-select>
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.types"
        :items="getTranslatedFilterOptions(taskTypesItems)"
        :label="$t('filters.taskLabels.taskType')"
        hide-details
        clearable
      ></v-select>
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.advantage"
        :items="getTranslatedFilterOptions(taskTeamAdvantageItems)"
        :label="$t('filters.taskLabels.taskTeamAdvantage')"
        hide-details
        clearable
      ></v-select>
      <v-select
        item-title="title"
        item-value="value"
        v-model="filters.availability"
        :items="getTranslatedFilterOptions(taskAvailabilityItems)"
        :label="$t('filters.taskLabels.taskAvailability')"
        hide-details
        clearable
      ></v-select>
      <hub-date-picker v-model="filters.taskStartDate" label="filters.taskLabels.taskStartDate" />
      <hub-date-picker v-model="filters.taskEndDate" label="filters.taskLabels.taskExpiredDate" />
      <v-sheet class="d-flex justify-center ga-2">
        <v-btn
          @click="setFilters"
          class="elevation-1 bg-grey-lighten-4 flex-grow-1"
        >
          <p>{{ $t("filters.search") }}</p>
        </v-btn>
        <v-btn
          @click="resetFilters"
          :class="[isEmptyFilters ? 'text-grey-darken-1' : 'text-black']"
          class="elevation-1 bg-grey-lighten-4"
        >
          <p>{{ $t("filters.resetFilters") }}</p>
        </v-btn>
      </v-sheet>
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
.searcher_inputs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 8px;
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
