<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

const isPlayersListComplete = ref<boolean>(false);
const isActionsListComplete = ref<boolean>(false);
const isWordsListComplete = ref<boolean>(false);
const isGenerateBtnAvailable = computed((): boolean => {
  return (
    isPlayersListComplete.value &&
    isActionsListComplete.value &&
    isWordsListComplete.value
  );
});
</script>

<template>
  <v-expansion-panels class="killGameAddCards">
    <v-expansion-panel>
      <v-expansion-panel-title
        >Wybierz graczy
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="!expanded ? 'teal' : ''"
            :icon="expanded ? 'mdi-pencil' : 'mdi-check'"
          ></v-icon></template
      ></v-expansion-panel-title>
      <v-expansion-panel-text> Tutaj lista graczy</v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title
        >Wybierz czynności
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="!expanded ? 'teal' : ''"
            :icon="expanded ? 'mdi-pencil' : 'mdi-check'"
          ></v-icon> </template
      ></v-expansion-panel-title>
      <v-expansion-panel-text> Tutaj lista czynności </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title
        >Wybierz słowa
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="!expanded ? 'teal' : ''"
            :icon="expanded ? 'mdi-pencil' : 'mdi-check'"
          ></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text> Tutaj lista słów </v-expansion-panel-text>
    </v-expansion-panel>
    <v-btn :disabled="!isGenerateBtnAvailable" class="mt-2 w-100">
      <span>Generuj grę</span>
    </v-btn>
  </v-expansion-panels>
</template>

<style scoped lang="scss">
.killGameAddCards {
  padding: 8px;
}
</style>
