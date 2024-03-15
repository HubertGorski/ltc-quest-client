<script setup lang="ts">
import { useRoute } from "vue-router";
import { tasksData } from "@/assets/data/tasks";
import { ref } from "vue";
import { teams } from "@/assets/data/teams";
import { hexColor } from "@/managers/styleManager";
import btnWithDropdown from "@/components/btnWithDropdown.vue";

const route = useRoute();
const taskId = Number(route.params.id);
const taskDetails = tasksData[taskId];
const fillBtn = ref(`bg-${taskDetails.teamTaskColor}`);

const series = [1, 0, 0, 1];
const chartOptions = {
  labels: [teams[0].name, teams[1].name, teams[2].name, teams[3].name],
  colors: teams.map((team) => hexColor(team.color)),
  legend: { show: false },

}

</script>

<template>
  <v-card class="mx-4 my-4 px-2 py-2">
    <span class="px-2 text-h6">{{ taskDetails.title }}</span>
    <v-card-text>{{ taskDetails.description }}</v-card-text>
  </v-card>
  <v-card class="mx-4 my-4 px-2 py-2">
    <span class="px-2 text-subtitle-1">{{ $t('completedBy') }}</span>
    <div class="d-flex flex-wrap justify-center px-8 pt-4 ga-2">
      <btn-with-dropdown v-for="team of teams" :title="team.name" :color="team.color" :icon="team.logo" :items="['Kacper', 'Laura', 'Krzysiek']"></btn-with-dropdown>
    </div>
    <apexchart class="py-4" type="pie" :options="chartOptions" :series="series"></apexchart>
    <div class="text-center text-subtitle-2 font-italic">{{ $t('taskAvailability.forSelected') }}</div>
    <v-card-actions class="d-flex justify-space-between px-8">
      <v-btn @click="$router.go(-1)">
        <span>{{ $t('back') }}</span>
      </v-btn>
      <v-btn v-if="!taskDetails.isDone" :class="fillBtn">
        <span>{{ $t('finishTask') }}</span>
      </v-btn>
      <div v-else disabled class="font-italic text-grey-darken-2">
        <span>{{ $t('taskConfirmed') }}</span>
      </div>
     </v-card-actions>
  </v-card>
</template>

<style scoped></style>
