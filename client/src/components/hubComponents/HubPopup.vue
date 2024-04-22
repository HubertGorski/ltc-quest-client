<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  textYes: {
    type: String,
    default: "confirm",
  },
  textNo: {
    type: String,
    default: "back",
  },
});

const dialog = ref(false);
</script>

<template>
  <div>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <div class="w-100" v-bind="activatorProps">
          <slot></slot>
        </div>
      </template>
      <v-card :prepend-icon="icon" :text="$t(text)" :title="$t(title)">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">
            {{ $t(textNo) }}
          </v-btn>
          <v-btn @click="dialog = false">
            {{ $t(textYes) }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
