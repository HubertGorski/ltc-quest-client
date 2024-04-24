<script setup lang="ts">
import { ref, type Ref } from "vue";

export interface TabSummaryPanel {
  id: number;
  icon: string;
  isTooltipActive: Ref<boolean>;
  tooltipText: string;
  value: Ref<number>;
}

const props = defineProps<{
  summaryPanel: TabSummaryPanel[];
}>();
</script>

<template>
  <v-card class="summaryPanel text-grey-darken-2">
    <div v-for="tab in summaryPanel" :key="tab.id" class="summaryPanel_tab">
      <v-tooltip v-model="tab.isTooltipActive.value" location="top">
        <template v-slot:activator="{ props }">
          <v-icon
            @click="tab.isTooltipActive.value = !tab.isTooltipActive.value"
            v-bind="props"
            >{{ tab.icon }}</v-icon
          >
        </template>
        <span>{{ tab.tooltipText }}</span>
      </v-tooltip>
      <div>{{ tab.value.value }}</div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.summaryPanel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 4px;
  width: min-content;

  &_tab {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
  }
}
</style>
