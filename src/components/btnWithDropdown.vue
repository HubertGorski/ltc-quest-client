<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  direction: {
    type: String,
    default: "bottom",
  },
  items: {
    type: Array<String>,
    required: true,
  },
});
</script>
<template>
  <div class="text-center">
    <v-menu :location="direction">
      <template v-slot:activator="{ props }">
        <v-btn :color="color" dark v-bind="props">
          <div>
            <v-icon class="pr-4">{{ icon }}</v-icon>
            <span>
              {{ title }}
            </span>
          </div>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<style scoped></style>
