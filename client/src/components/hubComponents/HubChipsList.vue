<script setup lang="ts">
import {
  getSelectedFilterObjects,
  type Filter,
  type SelectedFilterObject,
} from "@/models/Filter";
import { reactive, ref, watch } from "vue";

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
const objectLabels = ref<SelectedFilterObject[]>(
  getSelectedFilterObjects(props.filters)
);

const removeObjectLabel = (name: string) => {
  Object.values(filters).forEach((filter) => {
    if (filter.name === name) {
      filter.value = null;
    }
  });

  emit("changeFilters", filters);
};

watch(filters, (newValue, oldValue) => {
  objectLabels.value = getSelectedFilterObjects(props.filters);
});
</script>

<template>
  <div class="hubChipsList">
    <v-chip
      v-for="label in objectLabels"
      :key="label.name"
      @click:close="removeObjectLabel(label.name)"
      closable
    >
      {{ label.value }}
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
