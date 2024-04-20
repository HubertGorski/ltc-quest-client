<script setup lang="ts">
import {
  getChips,
  type Filter,
  type FilterObjectLabel,
  type SelectedFilterObject,
  type SelectedFilterObjectChips,
} from "@/models/Filter";
import { reactive, ref } from "vue";
import { getTranslatedFilterOptions } from "./HubUtils.vue";
import { format, isValid } from "date-fns";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  filters: {
    type: Array<Filter>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "changeFilters", value: SelectedFilterObject[]): void;
}>();

const filters: Filter[] = reactive(props.filters);

const removeObjectLabel = (label: SelectedFilterObjectChips) => {
  Object.values(filters).forEach((filter) => {
    if (
      typeof filter.value === "object" &&
      filter.value?.includes(label.value)
    ) {
      const nullCount = filter.value.filter((item) => item === null).length;
      let index = filter.value.indexOf(label.value);
      filter.value.length === 2 && nullCount === 1
        ? (filter.value = [])
        : filter.value.splice(index, 1);
    } else if (filter.name === label.name) {
      filter.value = null;
    }
  });

  emit("changeFilters", filters);
};

const objectLabelsChips = ref<SelectedFilterObjectChips[]>(
  getChips(props.filters)
);

const getAllTranslatedLabels = () => {
  const allTranslatedLabels: FilterObjectLabel[] = [];
  filters.forEach((element) => {
    const options = getTranslatedFilterOptions(element.options);
    options.forEach((option) => {
      allTranslatedLabels.push(option);
    });
  });
  return allTranslatedLabels;
};

const getTranslatedLabel = (label: SelectedFilterObjectChips) => {
  let actualLabel: string = "";
  getAllTranslatedLabels().forEach((translatedLabel) => {
    if (label.value === translatedLabel.value) {
      actualLabel = translatedLabel.title;
      return;
    }
    if (label.value !== null && isValid(label.value)) {
      const date = format(label.value, "dd/MM/yyyy");
      const title = label.name === "taskStartDate" ? t("start") : t("end");
      actualLabel = `${title} ${date}`;
      return;
    }
  });
  return actualLabel;
};
</script>

<template>
  <div class="hubChipsList">
    <v-chip
      v-for="label in objectLabelsChips"
      :key="label.id"
      @click:close="removeObjectLabel(label)"
      closable
    >
      {{ getTranslatedLabel(label) }}
    </v-chip>
  </div>
</template>

<style scoped>
.hubChipsList {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  padding: 8px 8px 0 8px;
}
</style>
