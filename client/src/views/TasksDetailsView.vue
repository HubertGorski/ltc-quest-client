<script setup lang="ts">
import { useRoute } from "vue-router";
import { tasksData } from "@/assets/data/tasks";
import { ref } from "vue";

const route = useRoute();
const taskId = Number(route.params.id);
const taskDetails = tasksData[taskId];
const fillBtn = ref(`bg-${taskDetails.teamTaskColor}`);
</script>

<template>

<v-card
        class="mx-4 my-4"
        :title="taskDetails.title"
      >
        <template v-slot:prepend>
          <v-icon class="mr-2">{{ taskDetails.teamLogoTaskOwner }}</v-icon>
        </template>
        <v-card-text>{{ taskDetails.description }}</v-card-text>
        <v-card-actions class="d-flex justify-space-around">
            <v-btn @click="$router.go(-1)">
                Wstecz
            </v-btn>
            <v-btn :class="fillBtn">
                Zakończ zadanie
            </v-btn>
          </v-card-actions>
      </v-card>

</template>

<style scoped></style>
