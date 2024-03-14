<script setup lang="ts">
import { useRoute } from "vue-router";
import { tasksData } from "@/assets/data/tasks";
import { ref } from "vue";
import { teams } from "@/assets/data/teams";
import { hexColor } from "@/managers/styleManager";

const route = useRoute();
const taskId = Number(route.params.id);
const taskDetails = tasksData[taskId];
const fillBtn = ref(`bg-${taskDetails.teamTaskColor}`);

const series = [1, 0, 0, 1];
const chartOptions = {
  labels: [teams[0].name, teams[1].name, teams[2].name, teams[3].name],
  colors: teams.map((team) => hexColor(team.color)),
  legend: { position: 'bottom' },
}

</script>

<template>

<v-card
        class="mx-4 my-4"
        :title="taskDetails.title"
      >
        <v-card-text>{{ taskDetails.description }}</v-card-text>
        <div class="text-center text-subtitle-2 font-italic">{{ $t('taskAvailability.forSelected') }}</div>
        <apexchart class="pb-4" type="pie" :options="chartOptions" :series="series"></apexchart>
        <v-card-actions class="d-flex justify-space-around">
          <v-btn @click="$router.go(-1)">
            Wstecz
          </v-btn>
          <v-btn :class="fillBtn">
            <span>{{ $t('finishTask') }}</span>
          </v-btn>
          </v-card-actions>
      </v-card>

</template>

<style scoped></style>
