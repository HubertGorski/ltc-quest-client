<script setup lang="ts">
import { Task } from "@/models/Task";
import { Team } from "@/models/Team";

const props = defineProps({
  team: {
    type: Team,
    required: true,
  },
  task: {
    type: Task,
    required: true,
  },
});
</script>

<template>
  <div :class="{ isDone: task.isDone }" class="task text-grey-darken-3">
    <div class="task_info">
      <div class="title">{{ task.title }}</div>
      <div v-if="!task.isDone" class="description text-grey-darken-2">
        {{ task.description }}
      </div>
    </div>
    <div class="task_points">{{ task.points }}</div>
  </div>
  <v-divider></v-divider>
</template>

<style scoped>
.task {
  display: flex;
  padding: 12px 4px;
  align-items: center;
  justify-content: space-between;
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
.isDone .title {
  font-weight: 800;
}
.isDone .task_points {
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
