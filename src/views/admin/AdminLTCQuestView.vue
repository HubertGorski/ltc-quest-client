<script setup lang="ts">
import { useltcQuestStore } from '@/stores/ltcQuestStore';

const ltcQuestStore = useltcQuestStore();
</script>

<template>
    <v-switch v-model="ltcQuestStore.isPointsBarsAvailable" label="Show points bars" color="primary">
    </v-switch>
</template>