<script setup lang="ts">
import { useRoute } from "vue-router";
import { tasksData } from "@/assets/data/tasks";
import { ref } from "vue";
import { teams } from "@/assets/data/teams";
import { hexColor } from "@/managers/styleManager";
import btnWithDropdown from "@/components/btnWithDropdown.vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const route = useRoute();
const taskId = Number(route.params.id);
const taskDetails = tasksData[taskId];
const teamColor = userStore.user.teamColor;
const fillBtn = ref(`bg-${teamColor}`);

const series = [1, 0, 0, 1];
const chartOptions = {
  labels: [teams[0].name, teams[1].name, teams[2].name, teams[3].name],
  colors: teams.map((team) => hexColor(team.color)),
  legend: { show: false },
};
</script>

<template>
  <div class="mx-4 my-2">
    <div class="manageButtons">
      <v-sheet class="d-flex ga-1 flex-grow-1">
        <v-btn @click="$router.go(-1)">
          <v-icon>mdi-arrow-left-bottom</v-icon>
        </v-btn>
        <v-btn v-if="!taskDetails.isDone" :class="fillBtn" class="flex-grow-1">
          <span>{{ $t("finishTask") }}</span>
        </v-btn>
        <v-btn v-else class="font-italic text-grey-darken-1 flex-grow-1 disable-events">
          <span>{{ $t("taskConfirmed") }}</span>
        </v-btn>
      </v-sheet>
      <v-sheet class="d-flex ga-1">
        <v-btn @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn @click="$router.go(-1)">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-sheet>
    </div>
  <v-card class="px-2 py-2">
    <span class="px-2 text-h6">{{ taskDetails.title }}</span>
    <v-card-text>{{ taskDetails.description }}</v-card-text>
  </v-card>
  <v-card class="my-4 px-2 py-2">
    <span class="px-2 text-subtitle-1">{{ $t("completedBy") }}</span>
    <div class="d-flex flex-wrap justify-center px-8 pt-4 ga-2">
      <btn-with-dropdown
        v-for="team of teams"
        :title="team.name"
        :color="team.color"
        :icon="team.logo"
        :items="['Kacper', 'Laura', 'Krzysiek']"
      ></btn-with-dropdown>
    </div>
    <apexchart
      class="py-4"
      type="pie"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div class="text-center text-subtitle-2 font-italic">
      {{ $t("taskAvailability.forSelected") }}
    </div>
  </v-card>
  </div>
</template>

<style scoped>
.manageButtons {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 4px 0 16px 0;
}
.manageButtons button {
  padding: 0 12px;
  height: 32px;
  min-width: 24px;
  font-size: 12px;
}
.disable-events {
  pointer-events: none
}
</style>
@/stores/userStore