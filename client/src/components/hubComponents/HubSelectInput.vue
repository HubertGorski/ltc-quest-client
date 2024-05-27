<script setup lang="ts">
import HubTooltip from "@/components/hubComponents/HubTooltip.vue";

const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object as () => IItem,
    required: true,
  },
  listItems: {
    type: Array<IItem>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "setItem", value: IItem): void;
}>();

const setItem = (item: IItem): void => {
  emit("setItem", item);
}

export interface IItem {
  id: number;
  name: string;
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <td v-bind="props">
        <hub-tooltip :tooltipText="item.name" :disabled="isEditMode">
          <input
            :value="item.name"
            class="disabled-input text-grey-darken-3"
            :disabled="isEditMode"
          />
        </hub-tooltip>
      </td>
    </template>
    <v-list v-if="isEditMode">
      <v-list-item
        v-for="item in listItems"
        :key="item.id"
        @click="setItem(item)"
        class="listItem"
      >
        {{ item.name }}</v-list-item
      >
    </v-list>
  </v-menu>
</template>

<style scoped>
.listItem.v-list-item--density-default.v-list-item--one-line {
  min-height: auto;
}
input {
  max-width: 64px;

  &.disabled-input {
    pointer-events: none;
  }
}
</style>
