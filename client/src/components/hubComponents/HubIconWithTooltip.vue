<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  class: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
    required: true,
  },
});

const isTooltipActive = ref<boolean>(false);
</script>

<template>
  <v-tooltip v-model="isTooltipActive" location="top">
    <template v-slot:activator="{ props }">
      <v-icon
        @click="isTooltipActive = !isTooltipActive"
        v-bind="props"
        :class="class"
        >{{ icon }}</v-icon
      >
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>
