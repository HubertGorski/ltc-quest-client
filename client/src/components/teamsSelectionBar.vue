<script setup lang="ts">
import { Team } from "@/models/Team";
import { noSelectedTeam } from "@/models/Team";
import { computed, watch } from "vue";

const props = defineProps({
  teams: {
    type: Array<Team>,
    required: true,
  },
});

const activeTab = defineModel({ required: true });
const colors: string[] = [];
colors.push(noSelectedTeam.color);
props.teams.forEach((team) => {
  colors.push(team.color);
});

watch(activeTab, (newActiveTab) => {
  activeTab.value = newActiveTab ? newActiveTab : 0;
});

const color = computed(() => {
  return typeof activeTab.value === "number"
    ? colors[activeTab.value]
    : colors[noSelectedTeam.teamId];
});
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="activeTab" :bg-color="color" mode="shift">
      <v-btn v-show="false">noSelectedTeam</v-btn>
      <v-btn v-for="team of teams" :key="team.teamId">
        <v-icon>{{ team.logo }}</v-icon>
        <span>{{ team.name }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
