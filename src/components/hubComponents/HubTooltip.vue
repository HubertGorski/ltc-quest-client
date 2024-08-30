<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  class: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  tooltipText: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isTooltipActive = ref<boolean>(false);
const toggleTooltip = () => {
  if (props.disabled) {
    return;
  }
  
  isTooltipActive.value = !isTooltipActive.value;
};
</script>

<template>
  <v-tooltip v-model="isTooltipActive" location="top">
    <template v-slot:activator="{ props }">
      <div @click="toggleTooltip" v-bind="props">
        <slot></slot>
        <v-icon v-if="icon" :class="class">{{ icon }}</v-icon>
      </div>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>
