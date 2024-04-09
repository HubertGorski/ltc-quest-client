<script setup lang="ts">
import type { SelectedFilterObject } from "@/models/Filter";

const objectLabels = defineModel<Array<SelectedFilterObject>>();

const removeObjectLabel = (name: string) => {
  objectLabels.value = objectLabels.value?.filter(
    (label) => label.name != name
  );
};
</script>

<template>
  <v-chip
    v-for="label in objectLabels"
    :key="label.name"
    @click:close="removeObjectLabel(label.name)"
    closable
  >
    {{ label.value }}
  </v-chip>
</template>

<style scoped></style>
