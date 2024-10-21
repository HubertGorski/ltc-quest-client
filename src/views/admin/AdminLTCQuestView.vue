<script setup lang="ts">
import { useLtcQuestStore } from '@/stores/ltcQuestStore';

const ltcQuestStore = useLtcQuestStore();
</script>

<template>
    <v-switch v-model="ltcQuestStore.isPointsBarsAvailable" :label="$t('ltcQuest.showPointsBars')" color="primary">
    </v-switch>
</template>