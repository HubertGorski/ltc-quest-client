<script setup lang="ts">
import { Task } from "@/models/Task";

const props = defineProps({
  task: {
    type: Task,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    :to="{ path: `/tasks/${task.taskId}` }"
    :class="[task.isDisabled ? 'text-grey-lighten-1' : 'text-grey-darken-3']"
    class="task"
  >
    <div class="task_info">
      <div class="title">
        <v-icon
          v-if="task.isRejected"
          class="pb-1 mr-2 text-red-accent-4"
          size="20"
          >mdi-alert-circle</v-icon
        >
        <v-icon
          v-if="task.isExpectancy"
          class="pb-1 mr-2 text-yellow-accent-4"
          size="20"
          >mdi-clock-time-eight</v-icon
        >
        <v-icon
          v-if="task.isDone"
          class="pb-1 mr-2 text-green-accent-4"
          size="20"
          >mdi-checkbox-marked-circle</v-icon
        >
        <span> {{ task.title }}</span>
      </div>
      <div
        v-if="!task.isDone"
        class="description"
        :class="[task.isDisabled ? 'text-grey-lighten-1' : 'text-grey-darken-2']"
      >
        {{ task.description }}
      </div>
    </div>
    <div class="task_points">{{ task.points }}</div>
  </RouterLink>
  <v-divider></v-divider>
</template>

<style scoped>
.task {
  display: flex;
  padding: 12px 4px;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
}
.task_points {
  padding: 8px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.task_info {
  padding-left: 8px;
}
.title {
  font-size: 16px;
  font-weight: 600;
}
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
