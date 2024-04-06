<script setup lang="ts">
import {
  taskPointsItems,
  taskStatusItems,
  taskTypesItems,
  taskTeamAdvantageItems,
  taskAvailabilityItems,
} from "@/enums/enumTasks";
import { computed, reactive, ref } from "vue";
import { Filters } from "@/models/Filters";
import HubDatePicker from "@/components/hubComponents/HubDatePicker.vue";
import { getTranslatedFilterOptions } from "../hubComponents/HubUtils.vue";

const props = defineProps({
  filters: {
    type: Filters,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "changeFilters", value: Filters): void;
}>();
const panelActive = ref<boolean>(false);
const filters: Filters = reactive(props.filters);
const isEmptyFilters = computed(() => {
  return Object.values(filters).every(
    (value) => value === null || (Array.isArray(value) && value.length === 0)
  );
});
const showFilters = () => {
  panelActive.value = !panelActive.value;
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
  <div>
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
    <div v-if="panelActive" class="filtersPanel">
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
  </div>
</template>

<style scoped>
.filtersPanel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 8px;
}
</style>
