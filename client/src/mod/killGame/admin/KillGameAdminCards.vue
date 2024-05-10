<script setup lang="ts">
import { ref } from "vue";
import type { KillGameCard } from "../models/KillGameCard";

const props = defineProps({
  cards: {
    type: Array<KillGameCard>,
    required: true,
  },
});

const headers = [
  { key: "ownerName", title: "Właściciel" },
  { key: "targetPersonUserName", title: "Cel" },
  { key: "keyWord", title: "Słowo" },
  { key: "keyAction", title: "Czynność" },
];
</script>

<template>
  <div>
    <table class="killGameAdminCards_table">
      <thead>
        <tr>
          <td v-for="header in headers" :key="header.key">
            {{ header.title }}
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in cards" :key="card.cardId">
          <td>{{ card.ownerName }}</td>
          <td>{{ card.targetPersonUserName }}</td>
          <td>{{ card.keyWord }}</td>
          <td>{{ card.keyAction }}</td>
          <td class="edit"><v-icon>mdi-pencil</v-icon></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

.killGameAdminCards_table {
  width: 100%;
  border-collapse: collapse;
}

.killGameAdminCards_table td {
  padding: 8px;
}

.edit{
  text-align: center;
}
</style>
