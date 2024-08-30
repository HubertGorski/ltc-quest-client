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
  disabled: {
    type: Boolean,
    default: false,
  },
  action: {
    type: Function,
    required: true,
  },
});

const dialog = ref(false);

const acceptAction = () => {
  dialog.value = false;
  props.action();
};

const rejectAction = () => {
  dialog.value = false;
};
</script>

<template>
  <div>
    <div @click="dialog = !disabled" class="w-100">
      <slot></slot>
    </div>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card :prepend-icon="icon" :text="$t(text)" :title="$t(title)">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="rejectAction">
            {{ $t(textNo) }}
          </v-btn>
          <v-btn @click="acceptAction">
            {{ $t(textYes) }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
