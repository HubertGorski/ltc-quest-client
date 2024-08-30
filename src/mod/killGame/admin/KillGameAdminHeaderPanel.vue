<script setup lang="ts">
import { noSelectedTeam } from "@/models/Team";

const props = defineProps({
  isNewNotification: {
    type: Boolean,
    required: true,
  },
  notificationsCounter: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    default: noSelectedTeam.color,
  },
  icon: {
    type: String,
    default: "mdi-check",
  },
  action: {
    type: Function,
    required: true,
  },
});
const isOpenNotificationsPanel = defineModel({ required: true });
</script>

<template>
  <div class="header" :class="`bg-${color}`">
    <v-card-title
      class="header_title"
      @click="isOpenNotificationsPanel = false"
      >{{ $t("notifications") }}</v-card-title
    >
    <v-btn
      v-if="isNewNotification"
      @click="action"
      variant="text"
      class="header_button"
    >
      <v-icon class="mdi mdi-24px">{{ icon }}</v-icon>
    </v-btn>
    <div v-else class="pr-4">{{ notificationsCounter }}</div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;

  &_title {
    flex-grow: 1;
  }

  &_button {
    min-height: 32px;
    min-width: 32px;
    height: 42px;
    width: 42px;
  }
}
</style>
