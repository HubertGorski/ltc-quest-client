<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-btn class="btn elevation-2">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<style scoped>
.btn {
  position: fixed;
  bottom: 12px;
  right: 12px;
  min-width: 42px;
  min-height: 42px;
  z-index: 1;
}
</style>
