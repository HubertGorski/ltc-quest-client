<script setup lang="ts">
const taskTitles: string[] = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
];
</script>

<template>
  <v-sheet class="d-flex flex-wrap align-center mx-2 my-2">
    <v-sheet class="flex-1-0">
      <v-autocomplete
        hide-details
        label="Autocomplete"
        :items="taskTitles"
        variant="solo-filled"
      ></v-autocomplete>
    </v-sheet>
    <v-btn height="56" class="mx-2">
      <v-icon>mdi-adjust</v-icon>
    </v-btn>
  </v-sheet>
  <v-sheet class="d-flex flex-wrap mx-2 my-2">
    <v-sheet class="flex-1-0">
      <v-btn class="w-100 h-100">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-sheet>
    <v-btn height="24" class="mx-2">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-sheet>
</template>

<style scoped></style>
