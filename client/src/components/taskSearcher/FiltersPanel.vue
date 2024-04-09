<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import HubDatePicker from "@/components/hubComponents/HubDatePicker.vue";
import { getTranslatedFilterOptions } from "../hubComponents/HubUtils.vue";
import { Filter, type SelectedFilterObject } from "@/models/Filter";

const props = defineProps({
  filters: {
    type: Array<Filter>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "changeFilters", value: SelectedFilterObject[]): void;
}>();
const panelActive = ref<boolean>(false);
const filters: Filter[] = reactive(props.filters);
const isEmptyFilters = computed(() => {
  let isEmptyFilters = true;
  Object.values(filters).forEach((filter) => {
    if (
      (Array.isArray(filter.value) && filter.value.length > 0) ||
      (!Array.isArray(filter.value) && filter.value)
    ) {
      isEmptyFilters = false;
      return;
    }
  });
  return isEmptyFilters;
});
const showFilters = () => {
  panelActive.value = !panelActive.value;
};

const resetFilters = () => {
  Object.values(filters).forEach((filter) => {
    if (Array.isArray(filter.value)) {
      filter.value = [];
    } else {
      filter.value = null;
    }
  });
};

const setFilters = () => {
  const filterObjects: SelectedFilterObject[] = [];
  Object.values(filters).forEach((filter) => {
    filterObjects.push({ name: filter.name, value: filter.value });
  });
  emit("changeFilters", filterObjects);
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
      <div v-for="filter in filters">
        <hub-date-picker
          v-if="filter.isDate"
          v-model="filter.value"
          :label="$t(filter.label)"
        />
        <v-select
          v-else
          item-title="title"
          item-value="value"
          v-model="filter.value"
          :items="getTranslatedFilterOptions(filter.options)"
          :label="$t(filter.label)"
          :multiple="filter.multipleSelect"
          :hide-details="filter.hideDetails"
          :clearable="filter.clearable"
        ></v-select>
      </div>
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
