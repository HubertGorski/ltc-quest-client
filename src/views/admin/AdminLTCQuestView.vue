<script setup lang="ts">
import { useLtcQuestStore } from '@/stores/ltcQuestStore';

const ltcQuestStore = useLtcQuestStore();
</script>

<template>
    <v-switch v-model="ltcQuestStore.isPointsBarsAvailable" :label="$t('Show points bars')" color="primary">
    </v-switch>
</template>