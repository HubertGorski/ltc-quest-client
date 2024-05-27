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
  icon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "setItem", value: IItem): void;
  (e: "isClicked", value: boolean): void;
}>();

const setItem = (item: IItem): void => {
  emit("setItem", item);
};
const isClicked = (): void => {
  if (props.isEditMode) {
    return;
  }

  emit("isClicked", true);
};

export interface IItem {
  id: number;
  name: string;
  icon?: string;
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <div v-bind="isEditMode ? props : {}">
        <hub-tooltip :tooltipText="item.name" :disabled="isEditMode || !!icon">
          <v-icon @click="isClicked" v-if="icon">{{ icon }}</v-icon>
          <input
            v-else
            :value="item.name"
            class="disabled-input text-grey-darken-3"
            :disabled="isEditMode"
          />
        </hub-tooltip>
      </div>
    </template>
    <v-list v-if="isEditMode">
      <v-list-item
        v-for="item in listItems"
        :key="item.id"
        @click="setItem(item)"
        :class="{ listItem: item.icon }"
      >
        <span>
          {{ item.name }}
        </span>
        <v-icon v-if="item.icon"> {{ item.icon }}</v-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.listItem {
  display: flex;
  justify-content: flex-end;
}
.listItem .v-icon {
  margin-left: 8px;
}
.v-list-item--density-default.v-list-item--one-line {
  min-height: auto;
}
input {
  max-width: 64px;

  &.disabled-input {
    pointer-events: none;
  }
}
</style>
