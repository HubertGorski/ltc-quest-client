<script setup lang="ts">
import {
  getChips,
  type Filter,
  type SelectedFilterObject,
  type SelectedFilterObjectChips,
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

const removeObjectLabel = (label: SelectedFilterObjectChips) => {
  Object.values(filters).forEach((filter) => {
    if (
      typeof filter.value === "object" &&
      filter.value?.includes(label.value)
    ) {
      let index = filter.value.indexOf(label.value);
      filter.value.splice(index, 1);
    } else if (filter.name === label.name) {
      filter.value = null;
    }
  });

  emit("changeFilters", filters);
};

const objectLabelsChips = ref<SelectedFilterObjectChips[]>(
  getChips(props.filters)
);
</script>

<template>
  <div class="hubChipsList">
    <v-chip
      v-for="label in objectLabelsChips"
      :key="label.id"
      @click:close="removeObjectLabel(label)"
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
