<script setup lang="ts">
import { useRoute } from "vue-router";
import { tasksData } from "@/assets/data/tasks";
import { users } from "@/assets/data/users";
import { teams } from "@/assets/data/teams";
import { hexColor } from "@/managers/styleManager";
import btnWithDropdown from "@/components/btnWithDropdown.vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import userMiniCard from "@/components/userMiniCard.vue";
import type { User } from "@/models/User";
import { TASK_STATUS, type Task } from "@/models/Task";
import goToTopBtn from "@/components/goToTopBtn.vue";

const { t } = useI18n();
const userStore = useUserStore();
const route = useRoute();

const taskId = Number(route.params.id);
const teamColor: string = userStore.user.teamColor;
const taskDetails: Task = tasksData[taskId];
const additionalImages: string[] = taskDetails.additionalImages;
const createrDetails: User = users[2];
const accepterDetails: User = users[1];

const series = [1, 0, 0, 1];
const chartOptions = {
  labels: [teams[0].name, teams[1].name, teams[2].name, teams[3].name],
  colors: teams.map((team) => hexColor(team.color)),
  legend: { show: false },
};
const statusButtonDisabledClass =
  "font-italic text-grey-darken-1 disable-events";

const statusButton = computed(() => {
  const isUndoneBtn: TaskStatusButton = {
    text: taskDetails.isActive
      ? t("taskDetails.taskStatusBtn.taskUndone")
      : t("taskDetails.taskStatusBtn.taskExpired"),
    class: taskDetails.isActive ? `bg-${teamColor}` : statusButtonDisabledClass,
    state: TASK_STATUS.UNDONE,
    action: finishTask,
  };
  const isConfirmedBtn: TaskStatusButton = {
    text: t("taskDetails.taskStatusBtn.taskConfirmed"),
    class: statusButtonDisabledClass,
    state: TASK_STATUS.CONFIRMED,
  };
  const isExpectancyBtn: TaskStatusButton = {
    text: t("taskDetails.taskStatusBtn.taskExpectancy"),
    class: statusButtonDisabledClass,
    state: TASK_STATUS.EXPECTANCY,
  };
  const isRejectedBtn: TaskStatusButton = {
    text: t("taskDetails.taskStatusBtn.taskRejected"),
    class: "text-black",
    state: TASK_STATUS.REJECTED,
    action: refreshTask,
  };
  const isDisabledBtn: TaskStatusButton = {
    text: t("taskDetails.taskStatusBtn.taskDisabled"),
    class: statusButtonDisabledClass,
    state: TASK_STATUS.DISABLED,
  };
  return [
    isUndoneBtn,
    isConfirmedBtn,
    isExpectancyBtn,
    isRejectedBtn,
    isDisabledBtn,
  ].filter(
    (TaskStatusButton) => TaskStatusButton.state === taskDetails.status,
  )[0];
});

const finishTask = () => {
  console.log("koncze zadanie elo");
};

const refreshTask = () => {
  console.log("rozumiem, sprobuje jeszcze raz");
};

interface TaskStatusButton {
  text: string;
  class: string;
  state: TASK_STATUS;
  action?: Function;
}
window.scrollTo({ top: 0, behavior: "smooth" });
</script>

<template>
  <div class="mx-4 my-2">
    <go-to-top-btn />
    <div class="manageButtons">
      <v-sheet class="d-flex ga-1 flex-grow-1">
        <v-btn @click="$router.go(-1)">
          <v-icon>mdi-arrow-left-bottom</v-icon>
        </v-btn>
        <v-btn @click="statusButton.action" :class="statusButton.class" class="flex-grow-1">
          <span>{{ statusButton.text }}</span>
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
    <div class="d-flex">
      <v-card class="px-4 py-2 flex-grow-1">
        <span class="text-h6">{{ taskDetails.title }}</span>
        <v-card-text>{{ taskDetails.description }}</v-card-text>
      </v-card>
      <div class="pointsTemplate-container">
        <v-sheet class="pointsTemplate ml-4">
          {{ taskDetails.points }}
          <v-tooltip activator="parent" location="bottom">Liczba punktów do
            zdobycia.</v-tooltip>
        </v-sheet>
      </div>
    </div>
    <v-card class="my-4 px-2 py-2">
      <span class="px-2 text-subtitle-1">{{
        $t("taskDetails.additionalInfo")
      }}</span>
      <v-card-text>{{ taskDetails.additionalDescription }}</v-card-text>
    </v-card>
    <v-card v-for="(image, attachment) of additionalImages" :key="attachment" class="px-2 py-2 my-2">
      <span class="px-2 text-subtitle-2">{{ $t("taskDetails.attachment") }} {{ attachment + 1 }}</span>
      <img class="h-100 w-100 pt-2" :src="image" />
    </v-card>
    <user-mini-card :user="createrDetails" :date="taskDetails.creationDate" dateText="taskDetails.taskCreationDate" />
    <user-mini-card v-if="taskDetails.acceptDate" :user="accepterDetails" :date="taskDetails.acceptDate"
      dateText="taskDetails.taskAcceptedDate" reverse />
    <v-card class="my-4 px-2 py-2">
      <span class="px-2 text-subtitle-1">{{
        $t("taskDetails.completedByUsers")
      }}</span>
      <div class="d-flex flex-wrap justify-center px-8 pt-4 ga-2">
        <btn-with-dropdown v-for="team of teams" :key="team.teamId" :title="team.name" :color="team.color"
          :icon="team.logo" :items="['Kacper', 'Laura', 'Krzysiek']"></btn-with-dropdown>
      </div>
      <apexchart class="py-4" type="pie" :options="chartOptions" :series="series"></apexchart>
      <div class="text-center text-subtitle-2 font-italic">
        {{ $t("taskDetails.taskAvailability.forSelected") }}
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
  pointer-events: none;
}

.pointsTemplate-container {
  position: relative;
  width: 150px;
  height: 100px;
}

.pointsTemplate {
  position: relative;
  width: 130px;
  height: 80px;
  background-color: #3498db;
  text-align: center;
  line-height: 100px;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 30px;
}

.pointsTemplate::after {
  content: '';
  position: absolute;
  bottom: -25px;
  left: 0;
  width: 0;
  height: 0;
  border-left: 65px solid transparent;
  border-right: 65px solid transparent;
  border-top: 25px solid #3498db;
}
</style>
