<script setup lang="ts">
import { TEAM_ID } from "@/enums/enumTeams";
const props = defineProps({
  selectedTeamId: Number,
});
</script>

<template>
  <v-card>
    <v-card-text>
      <v-window v-model="props.selectedTeamId">
        <v-window-item :value="TEAM_ID.TEAM_1"> One </v-window-item>
        <v-window-item :value="TEAM_ID.TEAM_2"> Two </v-window-item>
        <v-window-item :value="TEAM_ID.TEAM_3"> Three </v-window-item>
        <v-window-item :value="TEAM_ID.TEAM_4"> Four </v-window-item>
        <v-window-item :value="TEAM_ID.ALL_TEAMS"> ALL </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
