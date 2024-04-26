<script setup lang="ts">
import { ref, type Ref } from "vue";
import HubIconWithTooltip from "./HubIconWithTooltip.vue";

export interface TabSummaryPanel {
  id: number;
  icon: string;
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
      <hub-icon-with-tooltip :icon="tab.icon" :tooltipText="tab.tooltipText" />
      <Transition name="bounce" mode="out-in">
        <div :key="tab.value.value">{{ tab.value.value }}</div>
      </Transition>
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
