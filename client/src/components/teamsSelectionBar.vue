<script setup lang="ts">
import { Team } from "@/models/Team";
import { noSelectedTeam } from "@/models/Team";
import { watch } from "vue";

const props = defineProps({
  teams: {
    type: Array<Team>,
    required: true,
  },
});

const selectedTab = defineModel({ required: true, type: Number });
const colors: string[] = [];
colors.push(noSelectedTeam.color);
props.teams.forEach((team) => {
  colors.push(team.color);
});

watch(selectedTab, (newSelectedTab) => {
  selectedTab.value = newSelectedTab ? newSelectedTab : 0;
});
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation
      v-model="selectedTab"
      :bg-color="colors[selectedTab]"
      mode="shift"
    >
      <v-btn v-show="false">noSelectedTeam</v-btn>
      <v-btn v-for="team of teams" :key="team.teamId">
        <v-icon>{{ team.logo }}</v-icon>
        <span>{{ team.name }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
